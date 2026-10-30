import logging
import os

import voluptuous as vol

from datetime import date

from homeassistant.config_entries import ConfigEntry
from homeassistant.core import HomeAssistant, ServiceCall, callback
from homeassistant.helpers import config_validation as cv
from homeassistant.helpers.dispatcher import async_dispatcher_send
from homeassistant.helpers.event import async_track_time_change
from homeassistant.helpers.storage import Store
from homeassistant.loader import async_get_integration
from homeassistant.util import dt as dt_util

from .const import (
    CARD_FILENAME,
    CONF_DAILY_KCAL,
    CONF_PEOPLE,
    CONF_WARNING_DAYS,
    DEFAULT_DAILY_KCAL,
    DEFAULT_PEOPLE,
    DEFAULT_WARNING_DAYS,
    CARD_URL_BASE,
    DOMAIN,
    SERVICE_UPDATE_STOCK,
    SIGNAL_ITEMS_UPDATED,
    STORAGE_KEY,
    STORAGE_VERSION,
)

_LOGGER = logging.getLogger(__name__)

PLATFORMS = ["sensor"]
CONFIG_SCHEMA = cv.config_entry_only_config_schema(DOMAIN)

UPDATE_STOCK_SCHEMA = vol.Schema(
    {vol.Required("items"): vol.All(cv.ensure_list, [dict])}
)


def _to_number(value) -> float:
    try:
        return float(value)
    except (TypeError, ValueError):
        return 0.0


def _parse_date(value) -> date | None:
    try:
        return date.fromisoformat(str(value)[:10])
    except ValueError:
        return None


class StockData:
    """Wspólny magazyn danych dla sensorów i serwisu."""

    def __init__(self, hass: HomeAssistant, entry: ConfigEntry) -> None:
        self.hass = hass
        self.entry = entry
        self.store = Store(hass, STORAGE_VERSION, STORAGE_KEY)
        self.items: list[dict] = []

    @property
    def warning_days(self) -> int:
        return int(self.entry.options.get(CONF_WARNING_DAYS, DEFAULT_WARNING_DAYS))

    @property
    def people(self) -> int:
        return int(self.entry.options.get(CONF_PEOPLE, DEFAULT_PEOPLE))

    @property
    def daily_kcal(self) -> int:
        return int(self.entry.options.get(CONF_DAILY_KCAL, DEFAULT_DAILY_KCAL))

    def summary(self) -> dict:
        """Statystyki zapasów liczone względem dzisiejszej daty."""
        today = dt_util.now().date()
        total_kcal = 0.0
        usable_kcal = 0.0
        expired: list[dict] = []
        expiring: list[dict] = []

        for item in self.items:
            qty = _to_number(item.get("qty"))
            kcal = _to_number(item.get("calories")) * qty
            total_kcal += kcal
            expiry = _parse_date(item.get("expiry"))
            if expiry is None or qty <= 0:
                usable_kcal += kcal
                continue
            days_left = (expiry - today).days
            entry = {
                "name": item.get("name"),
                "brand": item.get("brand"),
                "category": item.get("category"),
                "expiry": expiry.isoformat(),
                "days_left": days_left,
                "qty": item.get("qty"),
            }
            if days_left < 0:
                expired.append(entry)
            else:
                usable_kcal += kcal
                if days_left <= self.warning_days:
                    expiring.append(entry)

        expiring.sort(key=lambda i: i["days_left"])
        expired.sort(key=lambda i: i["days_left"])
        daily_need = self.people * self.daily_kcal
        return {
            "total_kcal": round(total_kcal),
            "usable_kcal": round(usable_kcal),
            "expired": expired,
            "expiring": expiring,
            "supply_days": round(usable_kcal / daily_need, 1) if daily_need else None,
        }

    async def async_load(self) -> None:
        stored = await self.store.async_load()
        self.items = stored.get("items", []) if stored else []

    async def async_set_items(self, items: list[dict]) -> None:
        self.items = items
        await self.store.async_save({"items": self.items})
        async_dispatcher_send(self.hass, SIGNAL_ITEMS_UPDATED)


async def async_setup(hass: HomeAssistant, config: dict) -> bool:
    """Konfiguracja statycznej ścieżki i wersjonowanie zasobów."""
    from homeassistant.components.http import StaticPathConfig

    # 1. Wersja z manifest.json (bez blokującego odczytu pliku w pętli zdarzeń)
    integration = await async_get_integration(hass, DOMAIN)
    version = str(integration.version or "1.0.0")

    # 2. Rejestracja fizycznej ścieżki do plików
    await hass.http.async_register_static_paths([
        StaticPathConfig(
            CARD_URL_BASE,
            os.path.join(os.path.dirname(__file__), "www"),
            True,
        )
    ])

    # 3. Automatyczna rejestracja karty w zasobach Lovelace z wersją
    url_with_version = f"{CARD_URL_BASE}/{CARD_FILENAME}?v={version}"
    try:
        await _register_frontend_resource(hass, url_with_version)
    except Exception as err:  # noqa: BLE001 - brak zasobów nie może blokować integracji
        _LOGGER.warning(
            "Nie udało się zarejestrować karty w zasobach Lovelace (%s). "
            "Dodaj ręcznie zasób: %s",
            err,
            url_with_version,
        )

    return True


async def _register_frontend_resource(hass: HomeAssistant, url: str) -> None:
    """Rejestruje plik JS w zasobach, usuwając stare wersje."""
    lovelace = hass.data.get("lovelace")
    resources = getattr(lovelace, "resources", None)
    if resources is None and isinstance(lovelace, dict):
        resources = lovelace.get("resources")

    # Tryb YAML nie pozwala na edycję zasobów z poziomu integracji
    if resources is None or not hasattr(resources, "async_create_item"):
        _LOGGER.info(
            "Lovelace w trybie YAML - dodaj ręcznie zasób (module): %s", url
        )
        return

    if not resources.loaded:
        await resources.async_load()

    items = resources.async_items()
    if any(r.get("url") == url for r in items):
        return

    # Usuwamy stare wpisy naszej karty (cache busting)
    for item in list(items):
        if f"{CARD_URL_BASE}/{CARD_FILENAME}" in item.get("url", ""):
            await resources.async_delete_item(item.get("id"))

    await resources.async_create_item({"res_type": "module", "url": url})


async def async_setup_entry(hass: HomeAssistant, entry: ConfigEntry) -> bool:
    """To wywołuje HA podczas ładowania integracji z UI."""
    data = StockData(hass, entry)
    await data.async_load()
    hass.data.setdefault(DOMAIN, {})[entry.entry_id] = data

    # Statusy dat ważności zmieniają się z dnia na dzień - przelicz po północy
    @callback
    def _midnight_refresh(_now) -> None:
        async_dispatcher_send(hass, SIGNAL_ITEMS_UPDATED)

    entry.async_on_unload(
        async_track_time_change(hass, _midnight_refresh, hour=0, minute=0, second=5)
    )
    entry.async_on_unload(entry.add_update_listener(_async_options_updated))

    async def handle_update_stock(call: ServiceCall) -> None:
        await data.async_set_items(call.data["items"])

    hass.services.async_register(
        DOMAIN, SERVICE_UPDATE_STOCK, handle_update_stock, schema=UPDATE_STOCK_SCHEMA
    )

    await hass.config_entries.async_forward_entry_setups(entry, PLATFORMS)
    return True


async def _async_options_updated(hass: HomeAssistant, entry: ConfigEntry) -> None:
    """Zmiana opcji - odśwież sensory."""
    async_dispatcher_send(hass, SIGNAL_ITEMS_UPDATED)


async def async_unload_entry(hass: HomeAssistant, entry: ConfigEntry) -> bool:
    """To wywołuje HA podczas usuwania integracji."""
    unloaded = await hass.config_entries.async_unload_platforms(entry, PLATFORMS)
    if unloaded:
        hass.data[DOMAIN].pop(entry.entry_id, None)
        if not hass.data[DOMAIN]:
            hass.services.async_remove(DOMAIN, SERVICE_UPDATE_STOCK)
    return unloaded
