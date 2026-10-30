from homeassistant import config_entries
from homeassistant.core import callback
import voluptuous as vol

from .const import (
    CONF_DAILY_KCAL,
    CONF_PEOPLE,
    CONF_WARNING_DAYS,
    DEFAULT_DAILY_KCAL,
    DEFAULT_PEOPLE,
    DEFAULT_WARNING_DAYS,
    DOMAIN,
)


class ApocalypseStockConfigFlow(config_entries.ConfigFlow, domain=DOMAIN):
    """Obsługa okna konfiguracji integracji."""
    VERSION = 1

    async def async_step_user(self, user_input=None):
        """Pierwszy krok konfiguracji przez UI."""
        if self._async_current_entries():
            return self.async_abort(reason="single_instance_allowed")

        if user_input is not None:
            return self.async_create_entry(title="Apocalypse Stock", data={})

        return self.async_show_form(step_id="user")

    @staticmethod
    @callback
    def async_get_options_flow(config_entry):
        return ApocalypseStockOptionsFlow()


class ApocalypseStockOptionsFlow(config_entries.OptionsFlow):
    """Ustawienia: próg ostrzeżeń o dacie ważności i dzienne zapotrzebowanie."""

    async def async_step_init(self, user_input=None):
        if user_input is not None:
            return self.async_create_entry(title="", data=user_input)

        options = self.config_entry.options
        schema = vol.Schema(
            {
                vol.Required(
                    CONF_WARNING_DAYS,
                    default=options.get(CONF_WARNING_DAYS, DEFAULT_WARNING_DAYS),
                ): vol.All(vol.Coerce(int), vol.Range(min=1, max=365)),
                vol.Required(
                    CONF_PEOPLE,
                    default=options.get(CONF_PEOPLE, DEFAULT_PEOPLE),
                ): vol.All(vol.Coerce(int), vol.Range(min=1, max=50)),
                vol.Required(
                    CONF_DAILY_KCAL,
                    default=options.get(CONF_DAILY_KCAL, DEFAULT_DAILY_KCAL),
                ): vol.All(vol.Coerce(int), vol.Range(min=500, max=10000)),
            }
        )
        return self.async_show_form(step_id="init", data_schema=schema)
