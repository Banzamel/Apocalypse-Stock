# 🧟 Apocalypse Stock - Home Assistant Integration

[![hacs_badge](https://img.shields.io/badge/HACS-Custom-41BDF5.svg)](https://github.com/hacs/integration)
[![GitHub release](https://img.shields.io/github/release/banzamel/apocalypse-stock.svg)](https://github.com/banzamel/apocalypse-stock/releases)
[![License](https://img.shields.io/github/license/banzamel/apocalypse-stock.svg)](LICENSE)

A comprehensive supply management integration for Home Assistant. Track your emergency food stocks, monitor expiration dates, and calculate total available calories - all within your Home Assistant dashboard.

![Apocalypse Stock Card](https://via.placeholder.com/800x400?text=Screenshot+Coming+Soon)

## ✨ Features

- **📦 Complete Inventory Management** - Add, edit, and remove items with detailed information (name, brand, weight, calories, expiration date)
- **🔍 Smart Search & Filtering** - Quickly find items by name, brand, or filter by category
- **📊 Real-time Calorie Tracking** - Automatic calculation of total available calories based on quantities
- **📅 Expiration Date Monitoring** - Keep track of expiration dates for all your supplies
- **🏷️ Category Organization** - Organize items into 11 collapsible categories
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

### Manual Installation

1. Download the [latest release](https://github.com/banzamel/apocalypse-stock/releases)
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
3. Point your phone camera at the product barcode (EAN-13, EAN-8, UPC-A, UPC-E, CODE-128, CODE-39 supported)
4. The form will be automatically filled with product data from Open Food Facts:
   - Product name and brand
   - Weight in grams
   - Calories (calculated per unit based on kcal/100g)
   - Auto-mapped category
5. Review and adjust the data, then click **"ZAPISZ"** (Save)

> **Note**: Camera scanning requires the native BarcodeDetector API (Android / Chrome / Edge). On **iOS (Safari)** camera scanning is not available — use the manual barcode input field instead.

### Managing Inventory

- **Adjust Quantity**: Use **+** / **-** buttons next to each item
- **Delete Item**: Click the **✕** button
- **Search**: Type in the search box to filter by name or brand
- **Filter by Category**: Use the dropdown to show only specific categories
- **Expand/Collapse**: Click category headers to show/hide items

### Understanding the Display

- **Total Calories**: Displayed in the header (e.g., "(25,000 kcal)")
- **Category Counts**: Shows number of items in each category badge
- **Item Details**: Each item shows name, brand, weight, calories, expiry date
- **Auto-expand**: Categories automatically expand when searching

## 🔧 Technical Details

### Created Entities

- **Sensor**: `sensor.apocalypse_stock_data`
  - State: Total number of items
  - Attributes: Array of all items with details

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
├── manifest.json              # Integration metadata
├── sensor.py                  # Sensor entity
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

### Version 1.8.0 (Current)
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
