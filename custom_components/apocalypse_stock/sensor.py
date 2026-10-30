import logging

from homeassistant.components.sensor import SensorEntity
from homeassistant.core import callback
from homeassistant.helpers.dispatcher import async_dispatcher_connect

from .const import DOMAIN, SIGNAL_ITEMS_UPDATED

_LOGGER = logging.getLogger(__name__)


async def async_setup_entry(hass, entry, async_add_entities):
    """Konfiguracja sensora na podstawie wpisu z UI."""
    data = hass.data[DOMAIN][entry.entry_id]
    async_add_entities([ApocalypseStockSensor(data)])


class ApocalypseStockSensor(SensorEntity):
    _attr_name = "Apocalypse Stock Data"
    _attr_unique_id = "apocalypse_stock_data_sensor"
    _attr_icon = "mdi:shield-alert"
    _attr_native_unit_of_measurement = "zasobów"
    _attr_should_poll = False
    # Lista produktów może być duża - nie zapisujemy jej w historii (recorder)
    _unrecorded_attributes = frozenset({"items"})

    def __init__(self, data):
        self._data = data

    async def async_added_to_hass(self):
        self.async_on_remove(
            async_dispatcher_connect(
                self.hass, SIGNAL_ITEMS_UPDATED, self._handle_items_updated
            )
        )

    @callback
    def _handle_items_updated(self):
        self.async_write_ha_state()

    @property
    def native_value(self):
        return len(self._data.items)

    @property
    def extra_state_attributes(self):
        return {"items": self._data.items}
