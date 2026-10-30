import logging

from homeassistant.components.sensor import SensorEntity, SensorStateClass
from homeassistant.core import callback
from homeassistant.helpers.dispatcher import async_dispatcher_connect

from .const import DOMAIN, SIGNAL_ITEMS_UPDATED

_LOGGER = logging.getLogger(__name__)


async def async_setup_entry(hass, entry, async_add_entities):
    """Konfiguracja sensorów na podstawie wpisu z UI."""
    data = hass.data[DOMAIN][entry.entry_id]
    async_add_entities(
        [
            ApocalypseStockSensor(data),
            ApocalypseCaloriesSensor(data),
            ApocalypseExpiredSensor(data),
            ApocalypseExpiringSoonSensor(data),
            ApocalypseSupplyDaysSensor(data),
        ]
    )


class _BaseStockSensor(SensorEntity):
    _attr_should_poll = False

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


class ApocalypseStockSensor(_BaseStockSensor):
    _attr_name = "Apocalypse Stock Data"
    _attr_unique_id = "apocalypse_stock_data_sensor"
    _attr_icon = "mdi:shield-alert"
    _attr_native_unit_of_measurement = "zasobów"
    # Lista produktów może być duża - nie zapisujemy jej w historii (recorder)
    _unrecorded_attributes = frozenset({"items"})

    @property
    def native_value(self):
        return len(self._data.items)

    @property
    def extra_state_attributes(self):
        return {"items": self._data.items}


class ApocalypseCaloriesSensor(_BaseStockSensor):
    _attr_name = "Apocalypse Stock Calories"
    _attr_unique_id = "apocalypse_stock_calories"
    _attr_icon = "mdi:fire"
    _attr_native_unit_of_measurement = "kcal"
    _attr_state_class = SensorStateClass.MEASUREMENT

    @property
    def native_value(self):
        return self._data.summary()["total_kcal"]

    @property
    def extra_state_attributes(self):
        return {"usable_kcal": self._data.summary()["usable_kcal"]}


class ApocalypseExpiredSensor(_BaseStockSensor):
    _attr_name = "Apocalypse Stock Expired"
    _attr_unique_id = "apocalypse_stock_expired"
    _attr_icon = "mdi:calendar-remove"
    _attr_native_unit_of_measurement = "zasobów"
    _unrecorded_attributes = frozenset({"items"})

    @property
    def native_value(self):
        return len(self._data.summary()["expired"])

    @property
    def extra_state_attributes(self):
        return {"items": self._data.summary()["expired"]}


class ApocalypseExpiringSoonSensor(_BaseStockSensor):
    _attr_name = "Apocalypse Stock Expiring Soon"
    _attr_unique_id = "apocalypse_stock_expiring_soon"
    _attr_icon = "mdi:calendar-alert"
    _attr_native_unit_of_measurement = "zasobów"
    _unrecorded_attributes = frozenset({"items"})

    @property
    def native_value(self):
        return len(self._data.summary()["expiring"])

    @property
    def extra_state_attributes(self):
        return {
            "warning_days": self._data.warning_days,
            "items": self._data.summary()["expiring"],
        }


class ApocalypseSupplyDaysSensor(_BaseStockSensor):
    _attr_name = "Apocalypse Stock Supply Days"
    _attr_unique_id = "apocalypse_stock_supply_days"
    _attr_icon = "mdi:calendar-clock"
    _attr_native_unit_of_measurement = "d"
    _attr_state_class = SensorStateClass.MEASUREMENT

    @property
    def native_value(self):
        return self._data.summary()["supply_days"]

    @property
    def extra_state_attributes(self):
        return {
            "people": self._data.people,
            "daily_kcal": self._data.daily_kcal,
        }
