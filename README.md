<p align="center"><img src="custom_components/apocalypse_stock/brand/icon@2x.png" width="120" alt="Apocalypse Stock"></p>

# Apocalypse Stock

[![hacs_badge](https://img.shields.io/badge/HACS-Custom-41BDF5.svg)](https://github.com/hacs/integration)
[![GitHub release](https://img.shields.io/github/release/banzamel/apocalypse-stock.svg)](https://github.com/banzamel/apocalypse-stock/releases)

Home Assistant integration + dashboard card for tracking emergency food supplies: quantities, expiry dates and calories. Add products by scanning a barcode with your phone.

## Install

1. HACS → ⋮ → **Custom repositories** → add `https://github.com/Banzamel/apocalypse-stock` as **Integration**
2. Search **Apocalypse Stock** in HACS → **Download** → restart Home Assistant
3. Settings → Devices & Services → **Add Integration** → **Apocalypse Stock**
4. Edit a dashboard → **Add card** → **Apocalypse Stock Card**

Requires Home Assistant 2024.11 or newer. To update: HACS → Apocalypse Stock → **Update** → restart → refresh the browser (Ctrl+Shift+R).

## Use

- **＋ Add** — fill in the form, or tap 📷 to scan a barcode (product data comes from Open Food Facts)
- **+ / −** — change quantity · ✏️ edit · 📋 add another batch with a different date · ✕ delete
- **Search** — name, brand, barcode or date (`05.2026`, `15.05.2026`)
- **⇅ Sort** — name, expiry date, quantity, calories, recently added
- **⚙ Filters** — expired / expiring soon / no date, or an expiry date range
- **⚠️ / ⏳ badges** in the header show expired and soon-expiring items — tap to filter
- **⬇ CSV** — export the visible list

Expired rows are red, soon-expiring rows orange. The header shows total calories and how many days the stock lasts.

## Settings

Settings → Devices & Services → Apocalypse Stock → **Configure**: days before expiry to warn (30), number of people (1), calories per person per day (2000).

Optional card options:

```yaml
type: custom:apocalypse-stock-card
title: Pantry
people: 4
```

## Sensors

| Entity | Value |
|---|---|
| `sensor.apocalypse_stock_data` | number of products (list in attributes) |
| `sensor.apocalypse_stock_calories` | total kcal |
| `sensor.apocalypse_stock_expired` | expired products |
| `sensor.apocalypse_stock_expiring_soon` | products expiring soon |
| `sensor.apocalypse_stock_supply_days` | days the stock lasts |

Example — daily notification about expiring products:

```yaml
automation:
  - alias: Expiring supplies
    trigger:
      - platform: time
        at: "09:00:00"
    condition:
      - condition: numeric_state
        entity_id: sensor.apocalypse_stock_expiring_soon
        above: 0
    action:
      - service: notify.notify
        data:
          message: >
            {% for i in state_attr('sensor.apocalypse_stock_expiring_soon', 'items') %}
            {{ i.name }}: {{ i.expiry }}
            {% endfor %}
```

## Notes

- Data is stored in `/config/.storage/apocalypse_stock.storage` — back it up, it survives updates and reinstalls.
- Card not showing after an update? Refresh with Ctrl+Shift+R (in the mobile app: Settings → Companion App → Debugging → Reset frontend cache).
- Card and UI are in English and Polish (follows your Home Assistant language).
- Changes in each version: [Releases](https://github.com/banzamel/apocalypse-stock/releases).

## License

MIT — see [LICENSE](LICENSE). Not affiliated with Home Assistant.
