import logging
import json
import os
from homeassistant.config_entries import ConfigEntry
from homeassistant.core import HomeAssistant

_LOGGER = logging.getLogger(__name__)
DOMAIN = "apocalypse_stock"

async def async_setup(hass: HomeAssistant, config: dict) -> bool:
    """Konfiguracja statycznej ścieżki i wersjonowanie zasobów."""
    from homeassistant.components.http import StaticPathConfig

    # 1. Pobierz wersję z manifest.json
    manifest_path = hass.config.path("custom_components/apocalypse_stock/manifest.json")
    try:
        with open(manifest_path, 'r') as f:
            manifest = json.load(f)
        version = manifest.get("version", "1.0.0")
    except Exception as e:
        _LOGGER.error("Błąd podczas odczytu manifest.json: %s", e)
        version = "1.0.0"

    # 2. Rejestracja fizycznej ścieżki do plików
    await hass.http.async_register_static_paths([
        StaticPathConfig(
            "/apocalypse_stock_local",
            hass.config.path("custom_components/apocalypse_stock/www"),
            True
        )
    ])

    # 3. Automatyczna rejestracja karty w zasobach Lovelace z wersją
    url_with_version = f"/apocalypse_stock_local/apocalypse-card.js?v={version}"
    await _register_frontend_resource(hass, url_with_version)
    
    return True

async def _register_frontend_resource(hass: HomeAssistant, url: str):
    """Rejestruje plik JS w zasobach, usuwając stare wersje."""
    lovelace = hass.data.get("lovelace")
    if lovelace and hasattr(lovelace, "resources"):
        resources = lovelace.resources
        if not resources.loaded:
            await resources.async_load()
            
        # Sprawdzamy czy ta wersja już istnieje
        items = resources.async_items()
        exists = any(url in r.get("url", "") for r in items)
        
        if not exists:
            # Usuwamy stare wpisy naszej karty (cache busting)
            for item in items:
                if "/apocalypse_stock_local/apocalypse-card.js" in item.get("url", ""):
                    await resources.async_delete_item(item.get("id"))
            
            # Dodajemy nowy URL z aktualną wersją
            await resources.async_create_item({
                "res_type": "module",
                "url": url
            })

# --- TYCH FUNKCJI BRAKOWAŁO (NAPRAWA BŁĘDU) ---

async def async_setup_entry(hass: HomeAssistant, entry: ConfigEntry) -> bool:
    """To wywołuje HA podczas ładowania integracji z UI."""
    await hass.config_entries.async_forward_entry_setups(entry, ["sensor"])
    return True

async def async_unload_entry(hass: HomeAssistant, entry: ConfigEntry) -> bool:
    """To wywołuje HA podczas usuwania integracji."""
    return await hass.config_entries.async_forward_entry_unload(entry, "sensor")