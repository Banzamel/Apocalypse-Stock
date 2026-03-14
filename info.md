# 🧟 Apocalypse Stock Integration

Comprehensive supply management for Home Assistant - track your emergency food stocks, monitor expiration dates, and calculate total calories.

## ✨ Features

- **📦 Inventory Management** - Add, edit, and remove items with detailed information
- **🔍 Smart Search & Filtering** - Quickly find items by name, brand, or category
- **📊 Calorie Tracking** - Automatic calculation of total available calories
- **📅 Expiration Monitoring** - Keep track of expiration dates for all items
- **🏷️ Category Organization** - Organize items into collapsible categories:
  - Instant foods
  - Dry goods
  - Sweets
  - Ready meals
  - Canned foods
  - Preserves
  - Tomatoes
  - Spices
  - Medications
  - Energy foods
  - Other

- **📷 Barcode Scanner** - Scan product barcodes with your phone camera (Open Food Facts integration)
- **💾 Persistent Storage** - All data is saved automatically
- **🎨 Beautiful UI** - Custom Lovelace card with modern design
- **🌐 Multi-language** - English and Polish translations included

## 📥 Installation

### Via HACS (Recommended)

1. Open HACS in your Home Assistant
2. Go to "Integrations"
3. Click the three dots in the top right corner
4. Select "Custom repositories"
5. Add this repository URL: `https://github.com/banzamel/apocalypse-stock`
6. Select category "Integration"
7. Click "Add"
8. Find "Apocalypse Stock" in the integration list
9. Click "Download"
10. Restart Home Assistant

### Manual Installation

1. Download the latest release
2. Copy the `apocalypse_stock` folder to your `custom_components` directory
3. Restart Home Assistant

## ⚙️ Configuration

1. Go to **Settings** → **Devices & Services**
2. Click **"+ Add Integration"**
3. Search for **"Apocalypse Stock"**
4. Click to add
5. The sensor `sensor.apocalypse_stock_data` will be created

## 🎴 Adding the Card

The Lovelace card is registered automatically. Add it to your dashboard:

### Method 1: Visual Editor
1. Edit your dashboard
2. Click "Add Card"
3. Search for "Apocalypse Stock Card"
4. Add the card

### Method 2: YAML
```yaml
type: custom:apocalypse-stock-card
```

## 📱 Usage

### Adding Items
1. Click the **"+ DODAJ"** button
2. Fill in the item details:
   - Category
   - Product name
   - Brand
   - Weight (grams)
   - Expiration date
   - Calories per unit
3. Click **"ZAPISZ"**

### Managing Quantities
- Use **+** and **-** buttons to adjust quantities
- Click **✕** to delete an item
- Quantities update in real-time

### Search and Filter
- Use the search box to find items by name or brand
- Use the category dropdown to filter by type
- Categories automatically expand when searching

## 🔧 Technical Details

- Creates a sensor: `sensor.apocalypse_stock_data`
- Service available: `apocalypse_stock.update_stock`
- Data stored in: `.storage/apocalypse_stock.storage`
- Custom card served from: `/apocalypse_stock_local/apocalypse-card.js`

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License.

## 🐛 Issues

Found a bug or have a feature request? Please open an issue on [GitHub](https://github.com/banzamel/apocalypse-stock/issues).
