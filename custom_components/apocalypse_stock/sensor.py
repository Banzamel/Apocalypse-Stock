import logging
from homeassistant.components.sensor import SensorEntity
from homeassistant.helpers.storage import Store

_LOGGER = logging.getLogger(__name__)

DOMAIN = "apocalypse_stock"
STORAGE_KEY = f"{DOMAIN}.storage"
STORAGE_VERSION = 1

async def async_setup_entry(hass, entry, async_add_entities):
    """Konfiguracja sensora na podstawie wpisu z UI."""
    store = Store(hass, STORAGE_VERSION, STORAGE_KEY)
    stored_data = await store.async_load()
    items = stored_data.get("items", []) if stored_data else []
    
    sensor = ApocalypseStockSensor(hass, store, items)
    async_add_entities([sensor], True)

    async def handle_update_stock(call):
        new_items = call.data.get("items")
        await sensor.async_update_items(new_items)

    hass.services.async_register(DOMAIN, "update_stock", handle_update_stock)

class ApocalypseStockSensor(SensorEntity):
    def __init__(self, hass, store, items):
        self._hass = hass
        self._store = store
        self._items = items
        self._attr_name = "Apocalypse Stock Data"
        self._attr_unique_id = "apocalypse_stock_data_sensor"
        self._attr_icon = "mdi:shield-alert"

    @property
    def state(self):
        return len(self._items)

    @property
    def unit_of_measurement(self):
        return "zasobów"

    @property
    def extra_state_attributes(self):
        return {"items": self._items}

    async def async_update_items(self, new_items):
        self._items = new_items
        await self._store.async_save({"items": self._items})
        self.async_write_ha_state()