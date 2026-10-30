"""Stałe integracji Apocalypse Stock."""

DOMAIN = "apocalypse_stock"
STORAGE_KEY = f"{DOMAIN}.storage"
STORAGE_VERSION = 1

SERVICE_UPDATE_STOCK = "update_stock"
SIGNAL_ITEMS_UPDATED = f"{DOMAIN}_items_updated"

CARD_URL_BASE = "/apocalypse_stock_local"
CARD_FILENAME = "apocalypse-card.js"
