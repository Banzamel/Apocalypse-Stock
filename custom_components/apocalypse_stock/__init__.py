import logging
import os

import voluptuous as vol

from homeassistant.config_entries import ConfigEntry
from homeassistant.core import HomeAssistant, ServiceCall, callback
from homeassistant.helpers import config_validation as cv
from homeassistant.helpers.dispatcher import async_dispatcher_send
from homeassistant.helpers.storage import Store
from homeassistant.loader import async_get_integration

from .const import (
    CARD_FILENAME,
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


class StockData:
    """Wspólny magazyn danych dla sensorów i serwisu."""

    def __init__(self, hass: HomeAssistant) -> None:
        self.hass = hass
        self.store = Store(hass, STORAGE_VERSION, STORAGE_KEY)
        self.items: list[dict] = []

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
    data = StockData(hass)
    await data.async_load()
    hass.data.setdefault(DOMAIN, {})[entry.entry_id] = data

    async def handle_update_stock(call: ServiceCall) -> None:
        await data.async_set_items(call.data["items"])

    hass.services.async_register(
        DOMAIN, SERVICE_UPDATE_STOCK, handle_update_stock, schema=UPDATE_STOCK_SCHEMA
    )

    await hass.config_entries.async_forward_entry_setups(entry, PLATFORMS)
    return True


async def async_unload_entry(hass: HomeAssistant, entry: ConfigEntry) -> bool:
    """To wywołuje HA podczas usuwania integracji."""
    unloaded = await hass.config_entries.async_unload_platforms(entry, PLATFORMS)
    if unloaded:
        hass.data[DOMAIN].pop(entry.entry_id, None)
        if not hass.data[DOMAIN]:
            hass.services.async_remove(DOMAIN, SERVICE_UPDATE_STOCK)
    return unloaded
