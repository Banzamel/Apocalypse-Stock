// Kategorie: "value" jest zapisywane w danych, etykiety są tylko do wyświetlania
const CATEGORIES = [
  { value: 'Instant', icon: '🍜', pl: 'Instant', en: 'Instant foods' },
  { value: 'Suche', icon: '🌾', pl: 'Suche', en: 'Dry goods' },
  { value: 'Słodkie', icon: '🍫', pl: 'Słodkie', en: 'Sweets' },
  { value: 'Gotowe', icon: '🍱', pl: 'Gotowe D.', en: 'Ready meals' },
  { value: 'Konserwy', icon: '🥫', pl: 'Konserwy', en: 'Canned foods' },
  { value: 'Przetwory', icon: '🫙', pl: 'Przetwory', en: 'Preserves' },
  { value: 'Pomidory', icon: '🍅', pl: 'Pomidory', en: 'Tomatoes' },
  { value: 'Przyprawy', icon: '🧂', pl: 'Przyprawy', en: 'Spices' },
  { value: 'Medykamenty', icon: '💊', pl: 'Medykamenty', en: 'Medications' },
  { value: 'Energetyczne', icon: '⚡', pl: 'Energetyczne', en: 'Energy foods' },
  { value: 'Napoje', icon: '🥤', pl: 'Napoje', en: 'Beverages' },
  { value: 'Alkohol', icon: '🍷', pl: 'Alkohol', en: 'Alcohol' },
  { value: 'Inne', icon: '📦', pl: 'Inne', en: 'Other' },
];

const STRINGS = {
  pl: {
    title: 'Zapasy',
    add: '＋ DODAJ',
    search: 'Szukaj: nazwa, marka, kod, data (np. 05.2026)…',
    allCategories: 'Wszystkie kategorie',
    sort_name_asc: 'Nazwa A→Z',
    sort_name_desc: 'Nazwa Z→A',
    sort_expiry_asc: 'Data ważności: najbliższa',
    sort_expiry_desc: 'Data ważności: najdalsza',
    sort_qty_desc: 'Ilość: najwięcej',
    sort_kcal_desc: 'Kalorie: najwięcej',
    sort_added_desc: 'Ostatnio dodane',
    group: 'Kategorie',
    groupTitle: 'Grupuj według kategorii',
    filters: 'Filtry',
    export: 'CSV',
    exportTitle: 'Eksportuj widoczne produkty do CSV',
    status: 'Status',
    status_all: 'Wszystkie',
    status_expired: 'Przeterminowane',
    status_soon: 'Kończy się termin',
    status_ok: 'Ważne',
    status_nodate: 'Bez daty',
    status_empty: 'Ilość 0',
    expiryFrom: 'Ważne od',
    expiryTo: 'Ważne do',
    clearFilters: 'Wyczyść filtry',
    empty: 'Brak pasujących zasobów...',
    colProduct: 'Produkt',
    colExpiry: 'Ważność',
    colQty: 'Ilość',
    today: 'dziś',
    inDays: (n) => `za ${n} ${n === 1 ? 'dzień' : 'dni'}`,
    daysAgo: (n) => `${n} ${n === 1 ? 'dzień' : 'dni'} po terminie`,
    expiredBadge: (n) => `⚠️ ${n} przeterminowane`,
    soonBadge: (n) => `⏳ ${n} kończy się`,
    supply: (d, p) => `≈ ${d} dni dla ${p} ${p === 1 ? 'osoby' : 'osób'}`,
    shown: (a, b) => `${a} z ${b}`,
    addTitle: 'Dodaj nowy zasób',
    editTitle: 'Edytuj produkt',
    barcode: 'Wpisz kod kreskowy...',
    name: 'Nazwa produktu',
    brand: 'Marka',
    weight: 'Gramatura (g)',
    calories: 'Kalorie (kcal na sztukę)',
    qty: 'Ilość',
    expiry: 'Data ważności',
    save: 'ZAPISZ',
    cancel: 'ANULUJ',
    nameRequired: 'Podaj nazwę produktu',
    confirmDelete: 'Usunąć ten zasób?',
    confirmMerge: (n, e) => `Produkt „${n}” z datą ${e} już istnieje. Zwiększyć jego ilość zamiast dodawać nową pozycję?`,
    copyTitle: 'Dodaj kolejną partię (inna data)',
    editBtn: 'Edytuj',
    deleteBtn: 'Usuń',
    scanLoading: 'Ładowanie skanera...',
    scanning: 'Skanowanie...',
    scanGuide: 'Umieść kod kreskowy w ramce',
    scanRead: (c, n) => `Odczytano: ${c} (${n}/2)`,
    scanError: 'Błąd skanera: ',
    torch: '🔦 LATARKA',
    close: '✕ ZAMKNIJ',
    eanOnly: (c) => `Kod: ${c} — wyszukiwanie tylko dla kodów EAN-13 (13 cyfr)`,
    lookingUp: (c) => `Kod: ${c} — szukam produktu...`,
    notFound: (c) => `Nie znaleziono produktu (kod: ${c})`,
    found: (n) => `Znaleziono: ${n}`,
    noSensor: 'Brak sensora sensor.apocalypse_stock_data — dodaj integrację Apocalypse Stock.',
  },
  en: {
    title: 'Supplies',
    add: '＋ ADD',
    search: 'Search: name, brand, barcode, date (e.g. 2026-05)…',
    allCategories: 'All categories',
    sort_name_asc: 'Name A→Z',
    sort_name_desc: 'Name Z→A',
    sort_expiry_asc: 'Expiry: soonest',
    sort_expiry_desc: 'Expiry: latest',
    sort_qty_desc: 'Quantity: most',
    sort_kcal_desc: 'Calories: most',
    sort_added_desc: 'Recently added',
    group: 'Categories',
    groupTitle: 'Group by category',
    filters: 'Filters',
    export: 'CSV',
    exportTitle: 'Export visible items to CSV',
    status: 'Status',
    status_all: 'All',
    status_expired: 'Expired',
    status_soon: 'Expiring soon',
    status_ok: 'Valid',
    status_nodate: 'No date',
    status_empty: 'Quantity 0',
    expiryFrom: 'Expires from',
    expiryTo: 'Expires to',
    clearFilters: 'Clear filters',
    empty: 'No matching items...',
    colProduct: 'Product',
    colExpiry: 'Expiry',
    colQty: 'Qty',
    today: 'today',
    inDays: (n) => `in ${n} ${n === 1 ? 'day' : 'days'}`,
    daysAgo: (n) => `expired ${n} ${n === 1 ? 'day' : 'days'} ago`,
    expiredBadge: (n) => `⚠️ ${n} expired`,
    soonBadge: (n) => `⏳ ${n} expiring`,
    supply: (d, p) => `≈ ${d} days for ${p} ${p === 1 ? 'person' : 'people'}`,
    shown: (a, b) => `${a} of ${b}`,
    addTitle: 'Add new item',
    editTitle: 'Edit item',
    barcode: 'Enter barcode...',
    name: 'Product name',
    brand: 'Brand',
    weight: 'Weight (g)',
    calories: 'Calories (kcal per unit)',
    qty: 'Quantity',
    expiry: 'Expiry date',
    save: 'SAVE',
    cancel: 'CANCEL',
    nameRequired: 'Enter a product name',
    confirmDelete: 'Delete this item?',
    confirmMerge: (n, e) => `"${n}" with expiry ${e} already exists. Increase its quantity instead of adding a new entry?`,
    copyTitle: 'Add another batch (different date)',
    editBtn: 'Edit',
    deleteBtn: 'Delete',
    scanLoading: 'Loading scanner...',
    scanning: 'Scanning...',
    scanGuide: 'Place the barcode inside the frame',
    scanRead: (c, n) => `Read: ${c} (${n}/2)`,
    scanError: 'Scanner error: ',
    torch: '🔦 TORCH',
    close: '✕ CLOSE',
    eanOnly: (c) => `Code: ${c} — lookup works only for EAN-13 codes (13 digits)`,
    lookingUp: (c) => `Code: ${c} — looking up product...`,
    notFound: (c) => `Product not found (code: ${c})`,
    found: (n) => `Found: ${n}`,
    noSensor: 'Sensor sensor.apocalypse_stock_data not found — add the Apocalypse Stock integration.',
  },
};

const SORTS = ['name_asc', 'name_desc', 'expiry_asc', 'expiry_desc', 'qty_desc', 'kcal_desc', 'added_desc'];
const STATUSES = ['all', 'expired', 'soon', 'ok', 'nodate', 'empty'];
const PREFS_KEY = 'apocalypse-stock-card-prefs';
const DAY_MS = 24 * 60 * 60 * 1000;

class ApocalypseStockCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this._modalOpen = false;
    this._searchQuery = '';
    this._filterCategory = 'all';
    this._statusFilter = 'all';
    this._dateFrom = '';
    this._dateTo = '';
    this._showFilters = false;
    this._sortBy = 'name_asc';
    this._groupByCategory = true;
    this._openCategories = new Set(); // Pamięć otwartych sekcji
    this._editingItemId = null;
    this.items = [];
    this._scannerActive = false;
    this._stream = null;
    this._scanTimer = null;
    this._loadPrefs();
  }

  setConfig(config) {
    this.config = config || {};
  }

  static getStubConfig() {
    return {};
  }

  getCardSize() {
    return 8;
  }

  get _entityId() {
    return this.config.entity || 'sensor.apocalypse_stock_data';
  }

  set hass(hass) {
    const firstRender = !this._hass;
    this._hass = hass;
    const stateObj = hass.states[this._entityId];

    if (!this.shadowRoot.innerHTML) this._createSkeleton();
    if (firstRender) this._applyTranslations();

    // HA wywołuje setter przy każdej zmianie dowolnej encji - reagujemy tylko na nasze sensory
    const deps = [stateObj, hass.states['sensor.apocalypse_stock_expiring_soon'], hass.states['sensor.apocalypse_stock_supply_days']];
    if (this._lastDeps && deps.every((d, i) => d === this._lastDeps[i])) return;
    this._lastDeps = deps;

    // Kopia danych z sensora - nie modyfikujemy obiektu stanu HA bezpośrednio
    this._sensorMissing = !stateObj;
    if (stateObj && Array.isArray(stateObj.attributes.items)) {
      this.items = JSON.parse(JSON.stringify(stateObj.attributes.items));
    }

    // Odświeżaj listę tylko gdy nie wypełniasz właśnie formularza
    if (!this._modalOpen) {
      this._updateDynamicContent();
    }
  }

  // ---------- Pomocnicze ----------

  get _lang() {
    const lang = (this._hass && ((this._hass.locale && this._hass.locale.language) || this._hass.language)) || 'pl';
    return String(lang).toLowerCase().startsWith('pl') ? 'pl' : 'en';
  }

  _t(key, ...args) {
    const value = STRINGS[this._lang][key] ?? STRINGS.pl[key] ?? key;
    return typeof value === 'function' ? value(...args) : value;
  }

  _esc(value) {
    return String(value ?? '').replace(/[&<>"']/g, c => ({
      '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
    }[c]));
  }

  _catLabel(value) {
    const cat = CATEGORIES.find(c => c.value === value);
    return cat ? cat[this._lang] : String(value ?? '');
  }

  _catIcon(value) {
    const cat = CATEGORIES.find(c => c.value === value);
    return cat ? cat.icon : '📦';
  }

  _catOptions() {
    return CATEGORIES.map(c => `<option value="${this._esc(c.value)}">${c.icon} ${this._esc(c[this._lang])}</option>`).join('');
  }

  _num(value) {
    const n = parseFloat(String(value ?? '').replace(',', '.'));
    return Number.isFinite(n) ? n : 0;
  }

  _hasValue(value) {
    return value !== undefined && value !== null && value !== '' && value !== '-';
  }

  // Ustawienia: konfiguracja karty > opcje integracji (atrybuty sensorów) > domyślne
  get _warningDays() {
    const s = this._hass && this._hass.states['sensor.apocalypse_stock_expiring_soon'];
    return Number(this.config.warning_days) || (s && Number(s.attributes.warning_days)) || 30;
  }

  get _people() {
    const s = this._hass && this._hass.states['sensor.apocalypse_stock_supply_days'];
    return Number(this.config.people) || (s && Number(s.attributes.people)) || 1;
  }

  get _dailyKcal() {
    const s = this._hass && this._hass.states['sensor.apocalypse_stock_supply_days'];
    return Number(this.config.daily_kcal) || (s && Number(s.attributes.daily_kcal)) || 2000;
  }

  _today() {
    const d = new Date();
    return Date.UTC(d.getFullYear(), d.getMonth(), d.getDate());
  }

  _parseDate(value) {
    const m = /^(\d{4})-(\d{2})-(\d{2})/.exec(String(value ?? ''));
    return m ? Date.UTC(+m[1], +m[2] - 1, +m[3]) : null;
  }

  _formatDate(value) {
    const m = /^(\d{4})-(\d{2})-(\d{2})/.exec(String(value ?? ''));
    if (!m) return this._hasValue(value) ? String(value) : '-';
    return this._lang === 'pl' ? `${m[3]}.${m[2]}.${m[1]}` : `${m[1]}-${m[2]}-${m[3]}`;
  }

  _daysLeft(item) {
    const t = this._parseDate(item.expiry);
    return t === null ? null : Math.round((t - this._today()) / DAY_MS);
  }

  _expiryStatus(item) {
    const days = this._daysLeft(item);
    if (days === null) return 'nodate';
    if (days < 0) return 'expired';
    if (days <= this._warningDays) return 'soon';
    return 'ok';
  }

  // "05.2026" -> "2026-05", "1.5.2026" -> "2026-05-01" (wyszukiwanie po dacie w zapisie polskim)
  _normalizeToken(token) {
    let m = /^(\d{1,2})[./](\d{1,2})[./](\d{4})$/.exec(token);
    if (m) return `${m[3]}-${m[2].padStart(2, '0')}-${m[1].padStart(2, '0')}`;
    m = /^(\d{1,2})[./](\d{4})$/.exec(token);
    if (m) return `${m[2]}-${m[1].padStart(2, '0')}`;
    return token;
  }

  _loadPrefs() {
    try {
      const prefs = JSON.parse(localStorage.getItem(PREFS_KEY) || '{}');
      if (SORTS.includes(prefs.sortBy)) this._sortBy = prefs.sortBy;
      if (typeof prefs.groupByCategory === 'boolean') this._groupByCategory = prefs.groupByCategory;
    } catch (_) {}
  }

  _savePrefs() {
    try {
      localStorage.setItem(PREFS_KEY, JSON.stringify({ sortBy: this._sortBy, groupByCategory: this._groupByCategory }));
    } catch (_) {}
  }

  // Komunikacja z serwisem w Pythonie
  _saveToHA() {
    this._hass.callService('apocalypse_stock', 'update_stock', {
      items: this.items
    });
  }

  // Zapamiętywanie stanu otwarcia sekcji
  _handleToggle(e) {
    const cat = e.target.dataset && e.target.dataset.cat;
    if (cat === undefined) return;
    if (e.target.open) {
      this._openCategories.add(cat);
    } else {
      this._openCategories.delete(cat);
    }
  }

  // ---------- Szkielet ----------

  _createSkeleton() {
    this.shadowRoot.innerHTML = `
      <style>
        ha-card { padding: 16px; position: relative; max-height: 800px; display: flex; flex-direction: column; }
        .header { display: flex; justify-content: space-between; align-items: flex-start; gap: 8px; margin-bottom: 12px; }
        .title { font-size: 1.2em; font-weight: 500; display: flex; align-items: center; gap: 8px; flex-wrap: wrap; }
        #stats-container { font-weight: bold; color: var(--primary-color, #03a9f4); font-size: 0.9em; }
        .substats { display: flex; gap: 6px; flex-wrap: wrap; margin-top: 4px; font-size: 0.8em; color: var(--secondary-text-color); }
        .badge { border: none; border-radius: 12px; padding: 2px 8px; font-size: 0.95em; cursor: pointer; font-weight: bold; }
        .badge.expired { background: var(--error-color, #db4437); color: white; }
        .badge.soon { background: var(--warning-color, #ff9800); color: white; }
        .badge.active { outline: 2px solid var(--primary-text-color); }

        .controls { display: flex; gap: 8px; margin-bottom: 8px; width: 100%; box-sizing: border-box; flex-wrap: wrap; }
        .controls input, .controls select, .filters input, .filters select { min-width: 0; padding: 10px; border-radius: 4px; border: 1px solid var(--divider-color); background: var(--secondary-background-color); color: var(--primary-text-color); box-sizing: border-box; }
        #search-input { flex: 2 1 180px; }
        #filter-category { flex: 1 1 120px; }
        #sort-by { flex: 2 1 160px; }
        .btn-toggle { flex: 0 0 auto; padding: 8px 12px; border-radius: 4px; border: 1px solid var(--divider-color); background: var(--secondary-background-color); color: var(--primary-text-color); cursor: pointer; }
        .btn-toggle.on { background: var(--primary-color, #03a9f4); color: white; border-color: var(--primary-color, #03a9f4); }

        .filters { display: none; gap: 8px; margin-bottom: 8px; flex-wrap: wrap; align-items: flex-end; }
        .filters.open { display: flex; }
        .filters label { display: flex; flex-direction: column; font-size: 0.75em; color: var(--secondary-text-color); flex: 1 1 120px; gap: 2px; }
        .filters .btn-toggle { flex: 0 0 auto; }

        .list-container { overflow-y: auto; max-height: 550px; padding-right: 4px; }

        details { border: 1px solid var(--divider-color); border-radius: 8px; margin-bottom: 8px; background: var(--card-background-color); }
        summary { padding: 12px; cursor: pointer; font-weight: bold; display: flex; justify-content: space-between; align-items: center; outline: none; gap: 8px; }
        summary:hover { background: var(--secondary-background-color); }
        .cat-meta { display: flex; gap: 6px; align-items: center; }
        .cat-count { background: var(--primary-color, #03a9f4); color: white; border-radius: 12px; padding: 2px 8px; font-size: 0.8em; }
        .dot { width: 10px; height: 10px; border-radius: 50%; display: inline-block; }
        .dot.expired { background: var(--error-color, #db4437); }
        .dot.soon { background: var(--warning-color, #ff9800); }

        table { width: 100%; border-collapse: collapse; }
        td { padding: 10px; border-bottom: 1px solid var(--divider-color); font-size: 0.9em; vertical-align: middle; }
        th { text-align: left; font-size: 0.7em; color: var(--secondary-text-color); text-transform: uppercase; padding: 8px 10px; }
        tr.st-expired td:first-child { box-shadow: inset 4px 0 0 var(--error-color, #db4437); }
        tr.st-soon td:first-child { box-shadow: inset 4px 0 0 var(--warning-color, #ff9800); }
        tr.qty-zero { opacity: 0.5; }
        .exp-note { display: block; font-size: 0.8em; }
        .exp-note.expired { color: var(--error-color, #db4437); font-weight: bold; }
        .exp-note.soon { color: var(--warning-color, #ff9800); font-weight: bold; }
        .meta { color: var(--secondary-text-color); }

        .qty-controls { display: flex; align-items: center; gap: 8px; }
        .btn-qty { background: var(--primary-color, #03a9f4); border: none; color: white; border-radius: 4px; cursor: pointer; width: 26px; height: 26px; font-weight: bold; }
        .btn-add { background: var(--accent-color, #ff9800); color: white; border: none; padding: 10px 20px; border-radius: 25px; cursor: pointer; font-weight: bold; white-space: nowrap; }
        .actions { white-space: nowrap; }
        .btn-icon { cursor: pointer; background: none; border: none; font-size: 1em; padding: 0 4px; }
        .btn-del { color: var(--error-color, #db4437); font-size: 1.1em; }

        #add-modal { display: none; position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; background: rgba(0,0,0,0.7); z-index: 10000; align-items: center; justify-content: center; backdrop-filter: blur(3px); }
        .modal-content { background: var(--ha-card-background, var(--card-background-color, white)); padding: 25px; border-radius: 12px; width: 90%; max-width: 400px; max-height: 90vh; overflow-y: auto; box-shadow: 0 8px 25px rgba(0,0,0,0.5); box-sizing: border-box; }
        .modal-content input, .modal-content select { width: 100%; margin: 6px 0; padding: 10px; box-sizing: border-box; border-radius: 4px; border: 1px solid var(--divider-color); background: var(--secondary-background-color); color: var(--primary-text-color); }
        .modal-content label { font-size: 0.75em; color: var(--secondary-text-color); display: block; margin-top: 4px; }
        .row { display: flex; gap: 8px; }
        .row > div { flex: 1; min-width: 0; }

        .list-container::-webkit-scrollbar { width: 4px; }
        .list-container::-webkit-scrollbar-thumb { background: var(--divider-color); border-radius: 4px; }

        .btn-scan { background: #607d8b; color: white; border: none; padding: 10px 15px; border-radius: 25px; cursor: pointer; font-weight: bold; font-size: 0.95em; }
        .btn-scan:active { background: #455a64; }
        .scan-status { text-align: center; font-size: 0.85em; color: var(--secondary-text-color); margin-bottom: 8px; min-height: 1.2em; }
        .warning { padding: 12px; color: var(--error-color, #db4437); }
      </style>

      <ha-card>
        <div class="header">
          <div>
            <div class="title">🧟 <span id="card-title"></span> <span id="stats-container"></span></div>
            <div class="substats" id="substats"></div>
          </div>
          <button class="btn-add" id="open-modal"></button>
        </div>

        <div class="controls">
          <input type="search" id="search-input">
          <select id="filter-category"></select>
        </div>
        <div class="controls">
          <select id="sort-by"></select>
          <button class="btn-toggle" id="toggle-group"></button>
          <button class="btn-toggle" id="toggle-filters"></button>
          <button class="btn-toggle" id="export-csv"></button>
        </div>
        <div class="filters" id="filters">
          <label><span data-t="status"></span><select id="filter-status"></select></label>
          <label><span data-t="expiryFrom"></span><input type="date" id="filter-from"></label>
          <label><span data-t="expiryTo"></span><input type="date" id="filter-to"></label>
          <button class="btn-toggle" id="clear-filters" data-t="clearFilters"></button>
        </div>

        <div class="list-container" id="list-container"></div>

        <div id="add-modal">
          <div class="modal-content">
            <h3 id="modal-title"></h3>
            <div style="display: flex; gap: 8px; margin-bottom: 4px;">
              <input type="text" id="in-barcode" inputmode="numeric" style="flex: 1; margin: 0;">
              <button class="btn-scan" id="btn-barcode-search">🔍</button>
              <button class="btn-scan" id="btn-scan">📷</button>
            </div>
            <div class="scan-status" id="scan-status"></div>
            <select id="in-cat"></select>
            <input type="text" id="in-name">
            <input type="text" id="in-brand">
            <div class="row">
              <div><label for="in-weight" data-t="weight"></label><input type="text" id="in-weight" inputmode="decimal"></div>
              <div><label for="in-cal" data-t="calories"></label><input type="number" id="in-cal" min="0"></div>
            </div>
            <div class="row">
              <div><label for="in-expiry" data-t="expiry"></label><input type="date" id="in-expiry"></div>
              <div><label for="in-qty" data-t="qty"></label><input type="number" id="in-qty" min="0" step="1"></div>
            </div>
            <div style="display: flex; gap: 10px; margin-top: 15px;">
              <button class="btn-add" id="save-item" style="flex: 2;"></button>
              <button id="close-modal" style="flex: 1; cursor: pointer; background:none; border: 1px solid var(--divider-color); color:var(--primary-text-color); border-radius: 25px;"></button>
            </div>
          </div>
        </div>
      </ha-card>
    `;

    this._setupEventListeners();
  }

  _applyTranslations() {
    const root = this.shadowRoot;
    const $ = (id) => root.getElementById(id);
    $('card-title').textContent = this.config.title || this._t('title');
    $('open-modal').textContent = this._t('add');
    $('search-input').placeholder = this._t('search');
    $('filter-category').innerHTML = `<option value="all">${this._esc(this._t('allCategories'))}</option>${this._catOptions()}`;
    $('filter-category').value = this._filterCategory;
    $('in-cat').innerHTML = this._catOptions();
    $('sort-by').innerHTML = SORTS.map(s => `<option value="${s}">⇅ ${this._esc(this._t('sort_' + s))}</option>`).join('');
    $('sort-by').value = this._sortBy;
    $('filter-status').innerHTML = STATUSES.map(s => `<option value="${s}">${this._esc(this._t('status_' + s))}</option>`).join('');
    $('filter-status').value = this._statusFilter;
    $('toggle-group').textContent = `🗂 ${this._t('group')}`;
    $('toggle-group').title = this._t('groupTitle');
    $('export-csv').textContent = `⬇ ${this._t('export')}`;
    $('export-csv').title = this._t('exportTitle');
    $('in-barcode').placeholder = this._t('barcode');
    $('in-name').placeholder = this._t('name');
    $('in-brand').placeholder = this._t('brand');
    $('in-weight').placeholder = this._t('weight');
    $('in-cal').placeholder = this._t('calories');
    $('save-item').textContent = this._t('save');
    $('close-modal').textContent = this._t('cancel');
    root.querySelectorAll('[data-t]').forEach(el => { el.textContent = this._t(el.dataset.t); });
    this._updateControlsState();
  }

  _activeFilterCount() {
    return (this._statusFilter !== 'all' ? 1 : 0) + (this._dateFrom ? 1 : 0) + (this._dateTo ? 1 : 0);
  }

  _updateControlsState() {
    const root = this.shadowRoot;
    root.getElementById('toggle-group').classList.toggle('on', this._groupByCategory);
    const count = this._activeFilterCount();
    const btn = root.getElementById('toggle-filters');
    btn.textContent = `⚙ ${this._t('filters')}${count ? ` (${count})` : ''}`;
    btn.classList.toggle('on', this._showFilters || count > 0);
    root.getElementById('filters').classList.toggle('open', this._showFilters);
  }

  // ---------- Filtrowanie i sortowanie ----------

  _filteredItems() {
    const tokens = this._searchQuery.toLowerCase().split(/\s+/).filter(Boolean).map(t => this._normalizeToken(t));
    const from = this._parseDate(this._dateFrom);
    const to = this._parseDate(this._dateTo);

    return this.items.filter(i => {
      if (this._filterCategory !== 'all' && i.category !== this._filterCategory) return false;

      if (tokens.length) {
        const haystack = [i.name, i.brand, i.barcode, i.expiry, this._formatDate(i.expiry), this._catLabel(i.category)]
          .filter(v => v !== undefined && v !== null)
          .join(' ')
          .toLowerCase();
        if (!tokens.every(t => haystack.includes(t))) return false;
      }

      if (from !== null || to !== null) {
        const t = this._parseDate(i.expiry);
        if (t === null) return false;
        if (from !== null && t < from) return false;
        if (to !== null && t > to) return false;
      }

      switch (this._statusFilter) {
        case 'empty': return this._num(i.qty) <= 0;
        case 'all': return true;
        default: return this._expiryStatus(i) === this._statusFilter;
      }
    });
  }

  _compare(a, b) {
    const byName = () => String(a.name ?? '').localeCompare(String(b.name ?? ''), this._lang, { sensitivity: 'base' });
    const byExpiry = (dir) => {
      const ta = this._parseDate(a.expiry);
      const tb = this._parseDate(b.expiry);
      // Produkty bez daty zawsze na końcu
      if (ta === null && tb === null) return 0;
      if (ta === null) return 1;
      if (tb === null) return -1;
      return (ta - tb) * dir;
    };
    let result = 0;
    switch (this._sortBy) {
      case 'name_desc': result = -byName(); break;
      case 'expiry_asc': result = byExpiry(1); break;
      case 'expiry_desc': result = byExpiry(-1); break;
      case 'qty_desc': result = this._num(b.qty) - this._num(a.qty); break;
      case 'kcal_desc': result = this._num(b.calories) * this._num(b.qty) - this._num(a.calories) * this._num(a.qty); break;
      case 'added_desc': result = this._num(b.id) - this._num(a.id); break;
      default: result = byName();
    }
    return result || byName();
  }

  // ---------- Renderowanie ----------

  _updateDynamicContent() {
    const root = this.shadowRoot;
    const container = root.getElementById('list-container');
    const stats = root.getElementById('stats-container');
    const substats = root.getElementById('substats');

    this._updateControlsState();

    if (this._sensorMissing) {
      stats.textContent = '';
      substats.innerHTML = '';
      container.innerHTML = `<div class="warning">${this._esc(this._t('noSensor'))}</div>`;
      return;
    }

    const filtered = this._filteredItems().sort((a, b) => this._compare(a, b));
    this._visibleItems = filtered;

    // Suma kalorii widocznych produktów
    const totalKcal = filtered.reduce((sum, i) => sum + this._num(i.calories) * this._num(i.qty), 0);
    stats.textContent = `(${Math.round(totalKcal).toLocaleString(this._lang)} kcal)`;

    // Podsumowanie całego magazynu: przeterminowane, kończące się, na ile dni wystarczy
    let expired = 0;
    let soon = 0;
    let usableKcal = 0;
    for (const i of this.items) {
      const st = this._expiryStatus(i);
      const hasQty = this._num(i.qty) > 0;
      if (hasQty && st === 'expired') expired++;
      if (hasQty && st === 'soon') soon++;
      if (st !== 'expired') usableKcal += this._num(i.calories) * this._num(i.qty);
    }
    const people = this._people;
    const days = Math.floor(usableKcal / (people * this._dailyKcal));
    const parts = [];
    if (this.items.length && filtered.length !== this.items.length) {
      parts.push(`<span>${this._esc(this._t('shown', filtered.length, this.items.length))}</span>`);
    }
    if (usableKcal > 0) parts.push(`<span>${this._esc(this._t('supply', days, people))}</span>`);
    if (expired) parts.push(`<button class="badge expired ${this._statusFilter === 'expired' ? 'active' : ''}" data-action="status" data-status="expired">${this._esc(this._t('expiredBadge', expired))}</button>`);
    if (soon) parts.push(`<button class="badge soon ${this._statusFilter === 'soon' ? 'active' : ''}" data-action="status" data-status="soon">${this._esc(this._t('soonBadge', soon))}</button>`);
    substats.innerHTML = parts.join('');

    if (filtered.length === 0) {
      container.innerHTML = `<div style="text-align:center; padding: 20px; color: var(--secondary-text-color);">${this._esc(this._t('empty'))}</div>`;
      return;
    }

    if (!this._groupByCategory) {
      container.innerHTML = this._renderTable(filtered);
      return;
    }

    const groups = filtered.reduce((acc, item) => {
      const key = item.category ?? 'Inne';
      if (!acc[key]) acc[key] = [];
      acc[key].push(item);
      return acc;
    }, {});

    // Rozwiń automatycznie, jeśli użytkownik szuka lub filtruje
    const autoOpen = this._searchQuery.trim().length > 0 || this._activeFilterCount() > 0;

    container.innerHTML = Object.keys(groups)
      .sort((a, b) => this._catLabel(a).localeCompare(this._catLabel(b), this._lang))
      .map(cat => {
        const list = groups[cat];
        const isOpen = autoOpen || this._openCategories.has(cat);
        const hasExpired = list.some(i => this._num(i.qty) > 0 && this._expiryStatus(i) === 'expired');
        const hasSoon = list.some(i => this._num(i.qty) > 0 && this._expiryStatus(i) === 'soon');
        return `
          <details ${isOpen ? 'open' : ''} data-cat="${this._esc(cat)}">
            <summary>
              <span>${this._catIcon(cat)} ${this._esc(this._catLabel(cat))}</span>
              <span class="cat-meta">
                ${hasExpired ? '<span class="dot expired"></span>' : hasSoon ? '<span class="dot soon"></span>' : ''}
                <span class="cat-count">${list.length}</span>
              </span>
            </summary>
            ${this._renderTable(list)}
          </details>
        `;
      }).join('');
  }

  _renderTable(list) {
    return `
      <table>
        <thead>
          <tr>
            <th style="width: 45%;">${this._esc(this._t('colProduct'))}</th>
            <th>${this._esc(this._t('colExpiry'))}</th>
            <th>${this._esc(this._t('colQty'))}</th>
            <th></th>
          </tr>
        </thead>
        <tbody>${list.map(item => this._renderRow(item)).join('')}</tbody>
      </table>
    `;
  }

  _renderRow(item) {
    const id = this._esc(item.id);
    const status = this._expiryStatus(item);
    const days = this._daysLeft(item);
    let note = '';
    if (days !== null) {
      const text = days === 0 ? this._t('today') : days > 0 ? this._t('inDays', days) : this._t('daysAgo', -days);
      note = `<span class="exp-note ${status}">${this._esc(text)}</span>`;
    }
    const meta = [
      this._hasValue(item.brand) ? this._esc(item.brand) : null,
      this._hasValue(item.weight) ? `${this._esc(item.weight)} g` : null,
      `${this._esc(this._num(item.calories))} kcal`,
    ].filter(Boolean).join(' · ');
    const catPrefix = this._groupByCategory ? '' : `${this._catIcon(item.category)} `;
    const qty = this._num(item.qty);

    return `
      <tr class="st-${status} ${qty <= 0 ? 'qty-zero' : ''}">
        <td>
          <strong>${catPrefix}${this._esc(item.name)}</strong><br/>
          <small class="meta">${meta}</small>
        </td>
        <td><small>${this._esc(this._formatDate(item.expiry))}</small>${note}</td>
        <td>
          <div class="qty-controls">
            <button class="btn-qty" data-action="qty" data-delta="-1" data-id="${id}">-</button>
            <span>${this._esc(qty)}</span>
            <button class="btn-qty" data-action="qty" data-delta="1" data-id="${id}">+</button>
          </div>
        </td>
        <td class="actions">
          <button class="btn-icon" data-action="copy" data-id="${id}" title="${this._esc(this._t('copyTitle'))}">📋</button>
          <button class="btn-icon" data-action="edit" data-id="${id}" title="${this._esc(this._t('editBtn'))}">✏️</button>
          <button class="btn-icon btn-del" data-action="delete" data-id="${id}" title="${this._esc(this._t('deleteBtn'))}">✕</button>
        </td>
      </tr>
    `;
  }

  // ---------- Zdarzenia ----------

  _setupEventListeners() {
    const root = this.shadowRoot;
    const $ = (id) => root.getElementById(id);

    // Delegacja zdarzenia toggle (nie bubbluje, więc nasłuchujemy w fazie capture)
    $('list-container').addEventListener('toggle', (e) => this._handleToggle(e), true);

    // Delegacja kliknięć w akcje produktów i odznaki statusu
    root.addEventListener('click', (e) => {
      const btn = e.target.closest('[data-action]');
      if (!btn) return;
      const id = btn.dataset.id;
      switch (btn.dataset.action) {
        case 'qty': this._updateQty(id, Number(btn.dataset.delta)); break;
        case 'edit': this._openForm({ editId: id }); break;
        case 'copy': this._openForm({ copyId: id }); break;
        case 'delete': this._deleteItem(id); break;
        case 'status':
          this._statusFilter = this._statusFilter === btn.dataset.status ? 'all' : btn.dataset.status;
          $('filter-status').value = this._statusFilter;
          this._updateDynamicContent();
          break;
      }
    });

    $('search-input').addEventListener('input', (e) => {
      this._searchQuery = e.target.value;
      this._updateDynamicContent();
    });

    $('filter-category').addEventListener('change', (e) => {
      this._filterCategory = e.target.value;
      this._updateDynamicContent();
    });

    $('sort-by').addEventListener('change', (e) => {
      this._sortBy = e.target.value;
      this._savePrefs();
      this._updateDynamicContent();
    });

    $('toggle-group').onclick = () => {
      this._groupByCategory = !this._groupByCategory;
      this._savePrefs();
      this._updateDynamicContent();
    };

    $('toggle-filters').onclick = () => {
      this._showFilters = !this._showFilters;
      this._updateControlsState();
    };

    $('filter-status').addEventListener('change', (e) => {
      this._statusFilter = e.target.value;
      this._updateDynamicContent();
    });

    $('filter-from').addEventListener('change', (e) => {
      this._dateFrom = e.target.value;
      this._updateDynamicContent();
    });

    $('filter-to').addEventListener('change', (e) => {
      this._dateTo = e.target.value;
      this._updateDynamicContent();
    });

    $('clear-filters').onclick = () => {
      this._statusFilter = 'all';
      this._dateFrom = '';
      this._dateTo = '';
      this._searchQuery = '';
      this._filterCategory = 'all';
      $('filter-status').value = 'all';
      $('filter-from').value = '';
      $('filter-to').value = '';
      $('search-input').value = '';
      $('filter-category').value = 'all';
      this._updateDynamicContent();
    };

    $('export-csv').onclick = () => this._exportCsv();

    $('open-modal').onclick = () => this._openForm({});
    $('close-modal').onclick = () => this._closeForm();
    $('add-modal').addEventListener('click', (e) => {
      if (e.target.id === 'add-modal') this._closeForm();
    });
    $('add-modal').addEventListener('keydown', (e) => {
      if (e.key === 'Escape') this._closeForm();
    });

    $('btn-scan').onclick = () => {
      this._startScanner();
    };

    $('btn-barcode-search').onclick = () => {
      const code = $('in-barcode').value.trim();
      if (code) this._lookupBarcode(code);
    };

    $('in-barcode').addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        const code = e.target.value.trim();
        if (code) this._lookupBarcode(code);
      }
    });

    $('save-item').onclick = () => this._saveForm();
  }

  // ---------- Formularz dodawania / edycji ----------

  _findItem(id) {
    return this.items.find(i => String(i.id) === String(id));
  }

  _openForm({ editId = null, copyId = null }) {
    const root = this.shadowRoot;
    const $ = (id) => root.getElementById(id);
    const source = this._findItem(editId ?? copyId);
    this._editingItemId = editId !== null && source ? source.id : null;
    this._modalOpen = true;

    $('modal-title').textContent = this._t(this._editingItemId !== null ? 'editTitle' : 'addTitle');
    this._setScanStatus('');
    const value = (v) => (this._hasValue(v) ? String(v) : '');
    $('in-barcode').value = value(source && source.barcode);
    $('in-cat').value = (source && source.category) || (this._filterCategory !== 'all' ? this._filterCategory : 'Instant');
    $('in-name').value = value(source && source.name);
    $('in-brand').value = value(source && source.brand);
    $('in-weight').value = value(source && source.weight);
    $('in-cal').value = source ? this._num(source.calories) : '';
    // Kopia = nowa partia tego samego produktu, więc data do uzupełnienia
    $('in-expiry').value = this._editingItemId !== null ? value(source.expiry) : '';
    $('in-qty').value = this._editingItemId !== null ? this._num(source.qty) : 1;
    $('add-modal').style.display = 'flex';
    (copyId !== null ? $('in-expiry') : $('in-name')).focus();
  }

  _closeForm() {
    this._modalOpen = false;
    this._editingItemId = null;
    this._stopScanner();
    this.shadowRoot.getElementById('add-modal').style.display = 'none';
    this._updateDynamicContent();
  }

  _saveForm() {
    const $ = (id) => this.shadowRoot.getElementById(id);
    const name = $('in-name').value.trim();
    if (!name) {
      this._setScanStatus(this._t('nameRequired'));
      $('in-name').focus();
      return;
    }
    const data = {
      category: $('in-cat').value,
      name,
      brand: $('in-brand').value.trim() || '-',
      weight: $('in-weight').value.trim() || '-',
      expiry: $('in-expiry').value || '-',
      calories: Math.max(0, parseInt($('in-cal').value, 10) || 0),
      qty: Math.max(0, parseInt($('in-qty').value, 10) || 0),
    };
    const barcode = $('in-barcode').value.trim();
    if (barcode) data.barcode = barcode;

    if (this._editingItemId !== null) {
      const item = this._findItem(this._editingItemId);
      if (item) {
        Object.assign(item, data);
        if (!barcode) delete item.barcode;
      }
    } else {
      // Ten sam kod kreskowy i ta sama data ważności - zaproponuj zwiększenie ilości
      const existing = barcode && this.items.find(i => i.barcode === barcode && i.expiry === data.expiry);
      if (existing && confirm(this._t('confirmMerge', existing.name, this._formatDate(existing.expiry)))) {
        existing.qty = this._num(existing.qty) + (data.qty || 1);
      } else {
        const maxId = this.items.reduce((m, i) => Math.max(m, this._num(i.id)), 0);
        this.items.push({ id: Math.max(Date.now(), maxId + 1), ...data });
      }
    }

    this._closeForm();
    this._saveToHA(); // Zapis do sensora
  }

  _updateQty(id, delta) {
    const item = this._findItem(id);
    if (item) {
      item.qty = Math.max(0, this._num(item.qty) + delta);
      this._updateDynamicContent();
      this._saveToHA();
    }
  }

  _deleteItem(id) {
    if (confirm(this._t('confirmDelete'))) {
      this.items = this.items.filter(i => String(i.id) !== String(id));
      this._updateDynamicContent();
      this._saveToHA();
    }
  }

  _exportCsv() {
    const rows = this._visibleItems || this.items;
    const header = ['name', 'brand', 'category', 'weight_g', 'calories_kcal', 'qty', 'expiry', 'barcode'];
    const cell = (v) => {
      const s = String(v ?? '');
      return /[",;\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
    };
    const csv = [header.join(',')].concat(rows.map(i => [
      i.name, this._hasValue(i.brand) ? i.brand : '', i.category, this._hasValue(i.weight) ? i.weight : '',
      this._num(i.calories), this._num(i.qty), this._hasValue(i.expiry) ? i.expiry : '', i.barcode || ''
    ].map(cell).join(','))).join('\n');
    const blob = new Blob(['﻿' + csv], { type: 'text/csv;charset=utf-8' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `apocalypse-stock-${new Date().toISOString().slice(0, 10)}.csv`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(a.href), 1000);
  }

  // ---------- Skaner kodów kreskowych ----------

  async _getBarcodeDetector() {
    if ('BarcodeDetector' in window) {
      try {
        const formats = await window.BarcodeDetector.getSupportedFormats();
        if (formats.includes('ean_13')) return window.BarcodeDetector;
      } catch (_) {}
    }
    const module = await import('https://fastly.jsdelivr.net/npm/barcode-detector@2/dist/es/pure.min.js');
    return module.default || module.BarcodeDetector;
  }

  async _startScanner() {
    // Nakładka skanera
    this._scannerOverlay = document.createElement('div');
    this._scannerOverlay.style.cssText = 'position:fixed;top:0;left:0;width:100vw;height:100vh;background:#000;z-index:99999;display:flex;flex-direction:column;align-items:center;justify-content:center;';

    const videoContainer = document.createElement('div');
    videoContainer.style.cssText = 'position:relative;width:100%;max-width:500px;';

    const video = document.createElement('video');
    video.setAttribute('playsinline', '');
    video.setAttribute('autoplay', '');
    video.setAttribute('muted', '');
    video.style.cssText = 'width:100%;border-radius:8px;object-fit:contain;';

    // Ramka celownika — prostokąt wskazujący gdzie umieścić kod
    const guide = document.createElement('div');
    guide.style.cssText = 'position:absolute;left:10%;right:10%;top:40%;height:20%;border:2px solid #f44336;border-radius:4px;box-shadow:0 0 0 9999px rgba(0,0,0,0.4);pointer-events:none;';

    const guideLabel = document.createElement('div');
    guideLabel.textContent = this._t('scanGuide');
    guideLabel.style.cssText = 'position:absolute;left:0;right:0;bottom:-24px;text-align:center;color:#f44336;font-size:0.75em;font-weight:bold;';
    guide.appendChild(guideLabel);

    const statusInfo = document.createElement('div');
    statusInfo.style.cssText = 'color:#aaa;font-size:0.8em;margin-top:8px;text-align:center;min-height:1.5em;';

    const btnRow = document.createElement('div');
    btnRow.style.cssText = 'display:flex;gap:12px;margin-top:12px;';

    let torchOn = false;
    const torchBtn = document.createElement('button');
    torchBtn.textContent = this._t('torch');
    torchBtn.style.cssText = 'padding:12px 24px;font-size:1em;background:#607d8b;color:white;border:none;border-radius:25px;cursor:pointer;font-weight:bold;';
    torchBtn.onclick = async () => {
      try {
        const track = this._stream && this._stream.getVideoTracks()[0];
        if (!track) return;
        const caps = track.getCapabilities ? track.getCapabilities() : {};
        if (!caps.torch) return;
        torchOn = !torchOn;
        await track.applyConstraints({ advanced: [{ torch: torchOn }] });
        torchBtn.style.background = torchOn ? '#ff9800' : '#607d8b';
      } catch (_) {}
    };

    const cancelBtn = document.createElement('button');
    cancelBtn.textContent = this._t('close');
    cancelBtn.style.cssText = 'padding:12px 24px;font-size:1em;background:#f44336;color:white;border:none;border-radius:25px;cursor:pointer;font-weight:bold;';
    cancelBtn.onclick = () => this._stopScanner();

    videoContainer.appendChild(video);
    videoContainer.appendChild(guide);
    btnRow.appendChild(torchBtn);
    btnRow.appendChild(cancelBtn);
    this._scannerOverlay.appendChild(videoContainer);
    this._scannerOverlay.appendChild(statusInfo);
    this._scannerOverlay.appendChild(btnRow);
    document.body.appendChild(this._scannerOverlay);

    this._scannerActive = true;
    statusInfo.textContent = this._t('scanLoading');

    try {
      // Ładuj BarcodeDetector i otwieraj kamerę równolegle
      const [DetectorClass] = await Promise.all([
        this._getBarcodeDetector(),
        (async () => {
          this._stream = await navigator.mediaDevices.getUserMedia({
            video: { facingMode: 'environment' },
            audio: false
          });

          const track = this._stream.getVideoTracks()[0];

          // Maksymalna rozdzielczość kamery + autofocus
          try {
            const caps = track.getCapabilities ? track.getCapabilities() : {};
            const constraints = {};
            if (caps.width && caps.width.max) constraints.width = { ideal: caps.width.max };
            if (caps.height && caps.height.max) constraints.height = { ideal: caps.height.max };
            if (caps.focusMode && caps.focusMode.includes('continuous')) {
              constraints.focusMode = 'continuous';
            }
            if (Object.keys(constraints).length > 0) {
              await track.applyConstraints(constraints);
            }
          } catch (_) {}

          video.srcObject = this._stream;
          video.muted = true;
          await video.play();
        })()
      ]);

      const detector = new DetectorClass({ formats: ['ean_13', 'ean_8', 'upc_a', 'code_128'] });

      const settings = this._stream.getVideoTracks()[0].getSettings();
      statusInfo.textContent = `${this._t('scanning')} (${settings.width || video.videoWidth}x${settings.height || video.videoHeight})`;

      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');

      let confirmCode = null;
      let confirmCount = 0;

      const scanLoop = async () => {
        if (!this._scannerActive) return;
        try {
          if (video.readyState >= 2) {
            const vw = video.videoWidth;
            const vh = video.videoHeight;
            if (vw && vh) {
              canvas.width = vw;
              canvas.height = vh;
              ctx.drawImage(video, 0, 0, vw, vh);

              const barcodes = await detector.detect(canvas);
              for (const barcode of barcodes) {
                const code = barcode.rawValue;
                if (code && this._validateBarcode(code)) {
                  if (code === confirmCode) {
                    confirmCount++;
                  } else {
                    confirmCode = code;
                    confirmCount = 1;
                  }
                  statusInfo.textContent = this._t('scanRead', code, confirmCount);
                  if (confirmCount >= 2) {
                    this._stopScanner();
                    this.shadowRoot.getElementById('in-barcode').value = code;
                    this._lookupBarcode(code);
                    return;
                  }
                }
              }
            }
          }
        } catch (_) {}
        this._scanTimer = setTimeout(scanLoop, 250);
      };

      video.onloadeddata = () => scanLoop();
      if (video.readyState >= 2) scanLoop();
    } catch (err) {
      this._stopScanner();
      this._setScanStatus(this._t('scanError') + err.message);
    }
  }

  _stopScanner() {
    this._scannerActive = false;

    if (this._scanTimer) {
      clearTimeout(this._scanTimer);
      this._scanTimer = null;
    }

    try {
      if (this._stream) {
        this._stream.getTracks().forEach(t => { try { t.stop(); } catch (_) {} });
        this._stream = null;
      }
    } catch (_) {}

    try {
      if (this._scannerOverlay) {
        this._scannerOverlay.remove();
        this._scannerOverlay = null;
      }
    } catch (_) {}
  }

  _setScanStatus(msg) {
    const el = this.shadowRoot.getElementById('scan-status');
    if (el) el.textContent = msg;
  }

  _validateBarcode(code) {
    // EAN-13: walidacja cyfry kontrolnej
    if (/^\d{13}$/.test(code)) {
      let sum = 0;
      for (let i = 0; i < 12; i++) sum += parseInt(code[i]) * (i % 2 === 0 ? 1 : 3);
      return (10 - (sum % 10)) % 10 === parseInt(code[12]);
    }
    // EAN-8: walidacja cyfry kontrolnej
    if (/^\d{8}$/.test(code)) {
      let sum = 0;
      for (let i = 0; i < 7; i++) sum += parseInt(code[i]) * (i % 2 === 0 ? 3 : 1);
      return (10 - (sum % 10)) % 10 === parseInt(code[7]);
    }
    // UPC-A (12 cyfr): walidacja cyfry kontrolnej
    if (/^\d{12}$/.test(code)) {
      let sum = 0;
      for (let i = 0; i < 11; i++) sum += parseInt(code[i]) * (i % 2 === 0 ? 3 : 1);
      return (10 - (sum % 10)) % 10 === parseInt(code[11]);
    }
    // Inne formaty - akceptuj jeśli niepusty
    return code.length > 0;
  }

  async _lookupBarcode(barcode) {
    this.shadowRoot.getElementById('in-barcode').value = barcode;

    // Wyszukuj w API tylko kody EAN-13 (dokładnie 13 cyfr)
    if (!/^\d{13}$/.test(barcode)) {
      this._setScanStatus(this._t('eanOnly', barcode));
      return;
    }

    this._setScanStatus(this._t('lookingUp', barcode));

    const p = await this._fetchProduct(barcode);
    if (!p) {
      this._setScanStatus(this._t('notFound', barcode));
      return;
    }

    const root = this.shadowRoot;

    root.getElementById('in-name').value = p.product_name || p.product_name_pl || '';
    root.getElementById('in-brand').value = p.brands || '';
    const weight = p.product_quantity || p.quantity || '';
    root.getElementById('in-weight').value = String(weight).replace(/[^\d.,]/g, '');
    const kcal100 = p.nutriments && p.nutriments['energy-kcal_100g'];
    const weightNum = parseFloat(String(weight).replace(/[^\d.,]/g, '').replace(',', '.'));
    if (kcal100 && weightNum) {
      root.getElementById('in-cal').value = Math.round(kcal100 * weightNum / 100);
    } else if (kcal100) {
      root.getElementById('in-cal').value = Math.round(kcal100);
    }

    const category = this._mapCategory(p.categories_tags || [], p.categories || '');
    if (category) {
      root.getElementById('in-cat').value = category;
    }

    this._setScanStatus(this._t('found', p.product_name || barcode));
  }

  async _fetchProduct(code) {
    try {
      const resp = await fetch(`https://world.openfoodfacts.org/api/v2/product/${code}.json`);
      const data = await resp.json();
      if (data.status === 1 && data.product) return data.product;
    } catch (_) {}
    return null;
  }

  _mapCategory(tags, categoriesStr) {
    const all = [...tags, ...categoriesStr.toLowerCase().split(',')].map(c => c.toLowerCase());
    const map = [
      { keywords: ['instant', 'noodle', 'zupk'], category: 'Instant' },
      { keywords: ['dried', 'dry', 'rice', 'pasta', 'flour', 'cereal', 'grain', 'suche', 'ryż', 'makaron', 'mąka', 'kasza', 'płatki'], category: 'Suche' },
      { keywords: ['chocolate', 'candy', 'sweet', 'sugar', 'biscuit', 'cookie', 'wafer', 'czekolad', 'cukier', 'słodycz', 'ciastk', 'wafel'], category: 'Słodkie' },
      { keywords: ['ready', 'meal', 'prepared', 'gotowe', 'danie'], category: 'Gotowe' },
      { keywords: ['canned', 'can:', 'conserve', 'konserw', 'puszk'], category: 'Konserwy' },
      { keywords: ['preserve', 'jam', 'pickl', 'przetwor', 'dżem', 'marynat', 'kompot'], category: 'Przetwory' },
      { keywords: ['tomato', 'pomidor', 'ketchup', 'passata'], category: 'Pomidory' },
      { keywords: ['spice', 'herb', 'seasoning', 'przypraw', 'zioł'], category: 'Przyprawy' },
      { keywords: ['medicine', 'pharma', 'supplement', 'vitamin', 'medic', 'lek', 'witamin', 'suplement'], category: 'Medykamenty' },
      { keywords: ['energy', 'bar:', 'protein', 'sport', 'energet', 'baton'], category: 'Energetyczne' },
      { keywords: ['beverage', 'drink', 'water', 'juice', 'soda', 'tea', 'coffee', 'napój', 'napoj', 'woda', 'sok', 'herbat', 'kawa'], category: 'Napoje' },
      { keywords: ['alcohol', 'beer', 'wine', 'vodka', 'whisky', 'rum', 'liquor', 'spirit', 'alkohol', 'piwo', 'wino', 'wódka', 'whiskey'], category: 'Alkohol' },
    ];

    for (const { keywords, category } of map) {
      if (all.some(c => keywords.some(k => c.includes(k)))) {
        return category;
      }
    }
    return 'Inne';
  }
}

if (!customElements.get('apocalypse-stock-card')) {
  customElements.define('apocalypse-stock-card', ApocalypseStockCard);
}

// Rejestracja w wyborze kart edytora wizualnego
window.customCards = window.customCards || [];
if (!window.customCards.some(c => c.type === 'apocalypse-stock-card')) {
  window.customCards.push({
    type: 'apocalypse-stock-card',
    name: 'Apocalypse Stock Card',
    description: 'Zarządzanie zapasami żywności, datami ważności i kaloriami.'
  });
}
