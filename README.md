<p align="center"><img src="custom_components/apocalypse_stock/brand/icon@2x.png" width="160" alt="Apocalypse Stock icon"></p>

# 🧟 Apocalypse Stock - Home Assistant Integration

[![hacs_badge](https://img.shields.io/badge/HACS-Custom-41BDF5.svg)](https://github.com/hacs/integration)
[![GitHub release](https://img.shields.io/github/release/banzamel/apocalypse-stock.svg)](https://github.com/banzamel/apocalypse-stock/releases)
[![License](https://img.shields.io/github/license/banzamel/apocalypse-stock.svg)](LICENSE)

A comprehensive supply management integration for Home Assistant. Track your emergency food stocks, monitor expiration dates, and calculate total available calories - all within your Home Assistant dashboard.

![Apocalypse Stock Card](https://via.placeholder.com/800x400?text=Screenshot+Coming+Soon)

## ✨ Features

- **📦 Complete Inventory Management** - Add, edit, and remove items with detailed information (name, brand, weight, calories, expiration date)
- **🔍 Smart Search & Filtering** - Search by name, brand, barcode or expiry date (`05.2026`, `2026-05`), filter by category, expiry status or date range
- **↕️ Sorting** - Sort by name (A→Z / Z→A), expiry date (soonest / latest), quantity, calories or recently added — grouped by category or as a flat list
- **⚠️ Expiry Warnings** - Expired and soon-to-expire items are highlighted, with "in X days" / "X days ago" hints and clickable counters
- **🧮 Supply Estimate** - Shows how many days your stock lasts for N people (expired items excluded)
- **📡 Automation-ready Sensors** - Calories, expired, expiring-soon and supply-days sensors for notifications and automations
- **⬇️ CSV Export** - Export the currently visible list to a spreadsheet
- **📊 Real-time Calorie Tracking** - Automatic calculation of total available calories based on quantities
- **📅 Expiration Date Monitoring** - Keep track of expiration dates for all your supplies
- **🏷️ Category Organization** - Organize items into 13 collapsible categories
- **✏️ Edit Products** - Edit every field of an item (name, brand, weight, calories, expiry, quantity, category, barcode)
- **📋 New Batch** - Copy an item to add another batch with a different expiry date; scanning the same barcode with the same date increases quantity instead of duplicating
- **💾 Persistent Storage** - All data is automatically saved and persists across restarts
- **🎨 Beautiful Custom Card** - Modern, responsive Lovelace card with intuitive UI
- **📷 Barcode Scanner** - Scan product barcodes with your phone camera to quickly add items using Open Food Facts database
- **🌐 Multi-language Support** - Fully translated into English and Polish

## 📦 Categories

Items can be organized into the following categories:
- 🍜 Instant foods
- 🌾 Dry goods
- 🍫 Sweets
- 🍱 Ready meals
- 🥫 Canned foods
- 🫙 Preserves
- 🍅 Tomatoes
- 🧂 Spices
- 💊 Medications
- ⚡ Energy foods
- 🥤 Beverages (Napoje)
- 🍷 Alcohol (Alkohol)
- 📦 Other

## 📥 Installation

### HACS Installation (Recommended)

1. Make sure you have [HACS](https://hacs.xyz/) installed
2. Open HACS → Integrations
3. Click the three dots menu (⋮) in the top right
4. Select "Custom repositories"
5. Add this repository:
   - **URL**: `https://github.com/banzamel/apocalypse-stock`
   - **Category**: Integration
6. Click "Add"
7. Find "Apocalypse Stock" in the integration list and click "Download"
8. Restart Home Assistant
9. Go to Settings → Devices & Services → Add Integration
10. Search for "Apocalypse Stock" and add it

### Updating

- **HACS**: HACS → Integrations → Apocalypse Stock → **Update** (or ⋮ → *Redownload* and pick the version), then restart Home Assistant. If the new version is not listed yet, use ⋮ → *Update information*.
- **Manual**: download `apocalypse_stock.zip` from the [latest release](https://github.com/banzamel/apocalypse-stock/releases/latest), replace `/config/custom_components/apocalypse_stock/` with its contents and restart Home Assistant.
- After the restart the card URL gets a new `?v=<version>` automatically. If the browser/app still shows the old card, refresh with Ctrl+Shift+R (or clear the companion app cache).

### Manual Installation

1. Download `apocalypse_stock.zip` from the [latest release](https://github.com/banzamel/apocalypse-stock/releases)
2. Extract the `apocalypse_stock` folder
3. Copy it to your Home Assistant's `custom_components` directory:
   ```
   /config/custom_components/apocalypse_stock/
   ```
4. Restart Home Assistant
5. Add the integration via UI (Settings → Devices & Services)

## ⚙️ Configuration

### Adding the Integration

1. Navigate to **Settings** → **Devices & Services**
2. Click **"+ Add Integration"**
3. Search for **"Apocalypse Stock"**
4. Click to add the integration
5. The sensor `sensor.apocalypse_stock_data` will be created automatically

### Adding the Lovelace Card

The custom card is automatically registered. Add it to your dashboard:

#### Visual Editor Method:
1. Edit your dashboard
2. Click "Add Card"
3. Scroll down or search for "Apocalypse Stock Card"
4. Click to add

#### YAML Method:
```yaml
type: custom:apocalypse-stock-card
```

#### Card options (all optional)

| Option | Default | Description |
|---|---|---|
| `title` | `Zapasy` / `Supplies` | Card title |
| `warning_days` | integration option (30) | Days before expiry an item is marked as "expiring soon" |
| `people` | integration option (1) | Number of people for the supply estimate |
| `daily_kcal` | integration option (2000) | Daily calories per person |
| `entity` | `sensor.apocalypse_stock_data` | Stock data sensor |

```yaml
type: custom:apocalypse-stock-card
title: Piwnica
people: 4
```

The card language follows your Home Assistant language (Polish or English).

### Integration options

Settings → Devices & Services → Apocalypse Stock → **Configure**:
- **Warn about expiry (days before)** — default 30
- **Number of people** — default 1
- **Daily calories per person** — default 2000

These are used by the sensors and, unless overridden in the card config, by the card.

## 📱 Usage Guide

### Adding New Items

1. Click the **"+ DODAJ"** (Add) button in the card
2. Fill in the item details:
   - **Category**: Select from dropdown
   - **Product name**: e.g., "Rice"
   - **Brand**: e.g., "Uncle Ben's"
   - **Weight**: Weight in grams
   - **Expiration date**: Select from calendar
   - **Calories**: Calories per unit
3. Click **"ZAPISZ"** (Save)

### Barcode Scanner

1. Click **"+ DODAJ"** to open the add item modal
2. Click **"📷"** to scan or type the barcode manually in the input field and click **"🔍"**
3. Point your phone camera at the **barcode** — position it inside the red guide frame
4. The scanner detects the barcode using BarcodeDetector (native API or ZXing WASM polyfill) and validates the checksum
5. For **13-digit EAN codes**, the form will be automatically filled with product data from Open Food Facts:
   - Product name and brand
   - Weight in grams
   - Calories (calculated per unit based on kcal/100g)
   - Auto-mapped category
6. Review and adjust the data, then click **"ZAPISZ"** (Save)

> **Note**: Barcode scanning uses the native BarcodeDetector API (Chrome/Android) with automatic ZXing WASM fallback for other browsers. Use the torch button for better illumination if needed.

### Managing Inventory

- **Adjust Quantity**: Use **+** / **-** buttons next to each item
- **Edit Item**: Click **✏️** to change any field
- **New Batch**: Click **📋** to add the same product with another expiry date
- **Delete Item**: Click the **✕** button
- **Expand/Collapse**: Click category headers to show/hide items

### Search, Sorting & Filters

- **Search** matches name, brand, barcode, category and expiry date. Several words must all match. Dates can be typed as `2026-05`, `05.2026` or `15.05.2026`
- **Sort** (⇅ dropdown): name A→Z / Z→A, expiry soonest / latest (items without a date go last), quantity, total calories, recently added
- **🗂 Categories** toggles between grouped view and a flat list (sort and grouping are remembered per browser)
- **⚙ Filters** opens: status (expired / expiring soon / valid / no date / quantity 0) and an expiry date range (from–to)
- Click the **⚠️ expired** or **⏳ expiring** badge in the header to filter quickly
- **⬇ CSV** downloads the currently visible items

### Understanding the Display

- **Total Calories**: Displayed in the header (e.g., "(25,000 kcal)")
- **Category Counts**: Shows number of items in each category badge
- **Item Details**: Each item shows name, brand, weight, calories, expiry date
- **Auto-expand**: Categories automatically expand when searching

## 🔧 Technical Details

### Created Entities

| Entity | State | Attributes |
|---|---|---|
| `sensor.apocalypse_stock_data` | number of items | `items` — all items (used by the card) |
| `sensor.apocalypse_stock_calories` | total kcal (all items × qty) | `usable_kcal` — without expired items |
| `sensor.apocalypse_stock_expired` | number of expired items (qty > 0) | `items` — name, expiry, days_left… |
| `sensor.apocalypse_stock_expiring_soon` | items expiring within `warning_days` | `warning_days`, `items` |
| `sensor.apocalypse_stock_supply_days` | days the usable stock lasts | `people`, `daily_kcal` |

Expiry-based sensors are recalculated after every change and right after midnight.

#### Example automation — expiry notification

```yaml
automation:
  - alias: "Zapasy: kończy się data ważności"
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
          title: "🧟 Apocalypse Stock"
          message: >
            {% for i in state_attr('sensor.apocalypse_stock_expiring_soon', 'items') %}
            {{ i.name }} — {{ i.expiry }} ({{ i.days_left }} d)
            {% endfor %}
```

### Available Services

- **Service**: `apocalypse_stock.update_stock`
  - Updates the stock data (called automatically by the card)

### Storage

- Data stored in: `.storage/apocalypse_stock.storage`
- Automatically saved on every change
- Survives restarts and updates

### File Structure

```
custom_components/apocalypse_stock/
├── __init__.py                 # Integration setup
├── config_flow.py             # Configuration flow
├── const.py                   # Shared constants
├── manifest.json              # Integration metadata
├── sensor.py                  # Sensor entity
├── services.yaml              # Service definitions
├── brand/
│   ├── icon.png              # Integration icon 256×256 (HA 2026.3+)
│   └── icon@2x.png           # Integration icon 512×512
├── translations/
│   ├── en.json               # English translations
│   └── pl.json               # Polish translations
└── www/
    └── apocalypse-card.js    # Custom Lovelace card
```

## 🎨 Customization

The card automatically adapts to your Home Assistant theme, using CSS variables:
- `--primary-color`
- `--accent-color`
- `--card-background-color`
- `--primary-text-color`
- `--secondary-text-color`
- `--divider-color`

## 🐛 Troubleshooting

### Card doesn't appear
1. Check browser console for errors (F12)
2. Clear browser cache (Ctrl+Shift+R)
3. Verify the integration is installed correctly
4. Restart Home Assistant

### Data not saving
1. Check Home Assistant logs for errors
2. Verify write permissions in `.storage/` directory
3. Check that the sensor entity exists

### Card not updating
1. The card updates automatically when the modal is closed
2. Check browser console for JavaScript errors
3. Try refreshing the page

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Setup

```bash
# Clone the repository
git clone https://github.com/banzamel/apocalypse-stock.git

# Create a symlink to your Home Assistant config
ln -s $(pwd)/custom_components/apocalypse_stock /path/to/homeassistant/custom_components/

# Restart Home Assistant
```

## 📝 Changelog

### Version 2.1.1 (Current)
- Added integration icon (`brand/icon.png`, `brand/icon@2x.png`) — shown in Home Assistant 2026.3+ (Settings → Devices & Services)

### Version 2.1.0
- Sorting: name A→Z / Z→A, expiry soonest / latest, quantity, calories, recently added
- Grouped (by category) or flat list view; sort and view are remembered per browser
- Search by name, brand, barcode, category and expiry date (`2026-05`, `05.2026`, `15.05.2026`), multi-word
- Filters: expiry status (expired / expiring soon / valid / no date / quantity 0) and expiry date range
- Expiry highlighting with "in X days" / "X days ago" hints, warning dots on categories, clickable counters
- Supply estimate (days for N people, expired items excluded)
- Full item editing (all fields) in a single add/edit form, quantity on add, barcode stored with item
- "New batch" button and quantity merge when the same barcode + expiry is added again
- CSV export of the visible list
- Card UI in Polish and English (follows Home Assistant language)
- New sensors: calories, expired, expiring soon, supply days (recalculated at midnight)
- Integration options: warning days, number of people, daily calories
- Minimum Home Assistant version raised to 2024.11.0

### Version 2.0.3
- Fixed HTML injection — product names/brands (e.g. from Open Food Facts) are now escaped before rendering
- Fixed card crash when an item has no brand or name
- Fixed "Apocalypse Stock Card" missing from the visual card picker (registered in `window.customCards`)
- Card no longer mutates Home Assistant state objects and re-renders only when the stock sensor changes
- Edit modal no longer gets overwritten by background state updates
- Fixed blocking file I/O in the event loop when reading `manifest.json`
- Lovelace resource registration no longer fails in YAML mode (logs the URL to add manually)
- `update_stock` service is now validated, documented (`services.yaml`) and removed on unload
- Items list is excluded from the recorder database (prevents oversized-attribute warnings)
- Minimum Home Assistant version raised to 2024.7.0 (required by `StaticPathConfig`)

### Version 2.0.2
- Alphabetical sorting of products within categories
- Added new categories: Napoje (Beverages) and Alkohol (Alcohol)
- Fixed category selection bug — internal values now match display names (Owoce → Instant)
- Added product editing — change name and category of existing items via edit button
- Auto-mapping for new categories from Open Food Facts data

### Version 1.9.1
- Replaced Tesseract.js OCR with BarcodeDetector library (native API + ZXing WASM polyfill)
- Proper barcode scanning from camera instead of OCR digit recognition
- Supports EAN-13, EAN-8, UPC-A, Code 128 formats
- Barcode checksum validation after each read
- API product lookup restricted to 13-digit EAN codes only
- Faster scan loop (250ms vs 800ms) thanks to native barcode detection
- Double-read confirmation still active for reliable scanning

### Version 1.9.0
- Replaced BarcodeDetector with OCR digit recognition (Tesseract.js)
- Reads 13-digit EAN code from numbers printed below barcode
- Visual guide frame showing where to position the barcode digits
- Image preprocessing (grayscale + high contrast) for better OCR accuracy
- Double-read confirmation (same code recognized 2x) before accepting
- Camera and OCR engine load in parallel for faster startup
- Works in all browsers and WebViews (no native API dependency)

### Version 1.8.2
- Rewritten camera scanner — single stream with applyConstraints for native max resolution
- Fixed camera showing snowy/low-quality image (was reopening stream with lost deviceId)
- Fixed scanner not closing (robust cleanup with try-catch on every step)
- Canvas-based barcode detection at native resolution instead of scaled video element
- Added `object-fit: contain` to prevent image distortion/zoom
- Shows actual camera resolution in scanner overlay for debugging
- Torch button with proper on/off toggle state

### Version 1.8.1
- Fixed low camera resolution in WebView — two-step stream init to request max resolution
- Improved camera autofocus for barcode scanning (close-range focus distance)
- Added tap-to-focus — tap the camera preview to re-trigger autofocus
- Added torch/flashlight button for better barcode illumination
- Added double-read confirmation to eliminate false barcode reads from blurry frames

### Version 1.7.1
- Fixed camera preview not showing in WebView (Android companion app)

### Version 1.7.0
- Replaced barcode scanner with native BarcodeDetector API for accurate reads
- Removed html5-qrcode (ZXing-js) library — fixed incorrect barcode values
- Added barcode checksum validation (EAN-13, EAN-8, UPC-A)
- iOS: camera scanning not supported, use manual barcode input

### Version 1.6.x
- Added manual barcode input field with search button
- Improved barcode scanner accuracy and reliability
- Fixed UPC-A to EAN-13 conversion for barcode lookup
- Enabled continuous autofocus for barcode scanner camera
- Barcode scanner with html5-qrcode library
- Open Food Facts API integration for automatic product lookup
- Auto-category mapping from product data

### Version 1.5.8
- Initial public release
- Full inventory management
- Category organization
- Search and filtering
- Calorie tracking
- Persistent storage
- English and Polish translations

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built for the [Home Assistant](https://www.home-assistant.io/) community
- Inspired by the need for better emergency preparedness tracking
- Thanks to all contributors and testers

## 📞 Support

- 🐛 **Bug Reports**: [GitHub Issues](https://github.com/banzamel/apocalypse-stock/issues)
- 💡 **Feature Requests**: [GitHub Issues](https://github.com/banzamel/apocalypse-stock/issues)
- 💬 **Discussions**: [GitHub Discussions](https://github.com/banzamel/apocalypse-stock/discussions)
- ⭐ **Show Support**: Star this repository!

---

Made with ❤️ for the Home Assistant community

**Note**: This integration is not affiliated with or endorsed by Home Assistant. It's a community project.
