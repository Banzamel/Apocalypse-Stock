class ApocalypseStockCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this._modalOpen = false;
    this._searchQuery = '';
    this._filterCategory = 'all';
    this.sortBy = 'expiry';
    this._openCategories = new Set(); // Pamięć otwartych sekcji
    this.items = [];
    this._scannerActive = false;
    this._stream = null;
    this._scanTimer = null;
  }

  setConfig(config) {
    this.config = config;
  }

  set hass(hass) {
    this._hass = hass;
    const entityId = 'sensor.apocalypse_stock_data';
    const stateObj = hass.states[entityId];
    
    // Pobieranie danych z sensora nowej integracji
    if (stateObj && stateObj.attributes.items) {
      this.items = stateObj.attributes.items;
    }

    if (!this.shadowRoot.innerHTML) this._createSkeleton();
    
    // Odświeżaj listę tylko gdy nie wypełniasz właśnie formularza
    if (!this._modalOpen) {
      this._updateDynamicContent();
    }
  }

  // Komunikacja z nowym serwisem w Pythonie
  _saveToHA() {
    this._hass.callService("apocalypse_stock", "update_stock", {
      items: this.items
    });
  }

  // Zapamiętywanie stanu otwarcia sekcji
  _handleToggle(e, cat) {
    if (e.target.open) {
      this._openCategories.add(cat);
    } else {
      this._openCategories.delete(cat);
    }
  }

  _createSkeleton() {
    this.shadowRoot.innerHTML = `
      <style>
        ha-card { padding: 16px; position: relative; max-height: 800px; display: flex; flex-direction: column; }
        .header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; }
        .title { font-size: 1.2em; font-weight: 500; display: flex; align-items: center; gap: 8px; }
        #stats-container { font-weight: bold; color: var(--primary-color); font-size: 0.9em; }
        
        .controls { display: flex; gap: 8px; margin-bottom: 12px; width: 100%; box-sizing: border-box; }
        .controls input { flex: 2; min-width:0; padding: 10px; border-radius: 4px; border: 1px solid var(--divider-color); background: var(--secondary-background-color); color: var(--primary-text-color); }
		.controls select { flex: 1; min-width:0; padding: 10px; border-radius: 4px; border: 1px solid var(--divider-color); background: var(--secondary-background-color); color: var(--primary-text-color); }
        
        .list-container { overflow-y: auto; max-height: 550px; padding-right: 4px; }
        
        details { border: 1px solid var(--divider-color); border-radius: 8px; margin-bottom: 8px; background: var(--card-background-color); }
        summary { padding: 12px; cursor: pointer; font-weight: bold; display: flex; justify-content: space-between; align-items: center; outline: none; }
        summary:hover { background: var(--secondary-background-color); }
        .cat-count { background: var(--primary-color); color: white; border-radius: 12px; padding: 2px 8px; font-size: 0.8em; }

        table { width: 100%; border-collapse: collapse; }
        td { padding: 10px; border-bottom: 1px solid var(--divider-color); font-size: 0.9em; }
        th { text-align: left; font-size: 0.7em; color: var(--secondary-text-color); text-transform: uppercase; padding: 8px 10px; }
        
        .qty-controls { display: flex; align-items: center; gap: 8px; }
        .btn-qty { background: var(--primary-color); border: none; color: white; border-radius: 4px; cursor: pointer; width: 26px; height: 26px; font-weight: bold; }
        .btn-add { background: var(--accent-color); color: white; border: none; padding: 10px 20px; border-radius: 25px; cursor: pointer; font-weight: bold; }
        .btn-del { color: var(--error-color); cursor: pointer; background: none; border: none; font-size: 1.1em; padding: 0 5px; }

        #add-modal { display: none; position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; background: rgba(0,0,0,0.7); z-index: 10000; align-items: center; justify-content: center; backdrop-filter: blur(3px); }
        .modal-content { background: var(--ha-card-background, var(--card-background-color, white)); padding: 25px; border-radius: 12px; width: 90%; max-width: 400px; box-shadow: 0 8px 25px rgba(0,0,0,0.5); }
        .modal-content input, .modal-content select { width: 100%; margin: 8px 0; padding: 10px; box-sizing: border-box; border-radius: 4px; border: 1px solid var(--divider-color); background: var(--secondary-background-color); color: var(--primary-text-color); }
        
        .list-container::-webkit-scrollbar { width: 4px; }
        .list-container::-webkit-scrollbar-thumb { background: var(--divider-color); border-radius: 4px; }

        .btn-scan { background: #607d8b; color: white; border: none; padding: 10px; border-radius: 25px; cursor: pointer; font-weight: bold; width: 100%; margin-bottom: 10px; font-size: 0.95em; }
        .btn-scan:active { background: #455a64; }
        .scan-status { text-align: center; font-size: 0.85em; color: var(--secondary-text-color); margin-bottom: 8px; min-height: 1.2em; }
      </style>

      <ha-card>
        <div class="header">
          <div class="title">
            🧟 Supplies <span id="stats-container"></span> 
          </div>
          <button class="btn-add" id="open-modal">＋ DODAJ</button>
        </div>

        <div class="controls">
          <input type="text" id="search-input" placeholder="Szukaj...">
          <select id="filter-category">
            <option value="all">Wszystkie kategorie</option>
            <option value="Owoce">Instant</option>
            <option value="Suche">Suche</option>
            <option value="Słodkie">Słodkie</option>
			<option value="Gotowe">Gotowe D.</option>
			<option value="Konserwy">Konserwy</option>
			<option value="Przetwory">Przetwory</option>
			<option value="Pomidory">Pomidory</option>
			<option value="Przyprawy">Przyprawy</option>
			<option value="Medykamenty">Medykamenty</option>
			<option value="Energetyczne">Energetyczne</option>
            <option value="Inne">Inne</option>
          </select>
        </div>

        <div class="list-container" id="list-container"></div>

        <div id="add-modal">
          <div class="modal-content">
            <h3>Dodaj nowy zasób</h3>
            <div style="display: flex; gap: 8px; margin-bottom: 4px;">
              <input type="text" id="in-barcode" placeholder="Wpisz kod kreskowy..." style="flex: 1;">
              <button class="btn-scan" id="btn-barcode-search" style="width: auto; margin: 0; padding: 10px 15px;">🔍</button>
              <button class="btn-scan" id="btn-scan" style="width: auto; margin: 0; padding: 10px 15px;">📷</button>
            </div>
            <div class="scan-status" id="scan-status"></div>
            <select id="in-cat">
				<option value="Owoce">Instant</option>
				<option value="Suche">Suche</option>
				<option value="Słodkie">Słodkie</option>
				<option value="Gotowe">Gotowe D.</option>
				<option value="Konserwy">Konserwy</option>
				<option value="Przetwory">Przetwory</option>
				<option value="Pomidory">Pomidory</option>
				<option value="Przyprawy">Przyprawy</option>
				<option value="Medykamenty">Medykamenty</option>
				<option value="Energetyczne">Energetyczne</option>
				<option value="Inne">Inne</option>
            </select>
            <input type="text" id="in-name" placeholder="Nazwa produktu">
            <input type="text" id="in-brand" placeholder="Marka">
			<input type="text" id="in-weight" placeholder="Gramatura">
            <input type="date" id="in-expiry">
            <input type="number" id="in-cal" placeholder="Kalorie">
            <div style="display: flex; gap: 10px; margin-top: 15px;">
              <button class="btn-add" id="save-item" style="flex: 2;">ZAPISZ</button>
              <button id="close-modal" style="flex: 1; cursor: pointer; background:none; border: 1px solid var(--divider-color); color:var(--primary-text-color); border-radius: 25px;">ANULUJ</button>
            </div>
          </div>
        </div>
      </ha-card>
    `;

    this._setupEventListeners();
  }

  _updateDynamicContent() {
    const root = this.shadowRoot;
    const container = root.getElementById('list-container');
    const stats = root.getElementById('stats-container');

    // Filtrowanie
    const filtered = this.items.filter(i => {
      const mName = i.name.toLowerCase().includes(this._searchQuery.toLowerCase()) || 
                    i.brand.toLowerCase().includes(this._searchQuery.toLowerCase());
      const mCat = this._filterCategory === 'all' || i.category === this._filterCategory;
      return mName && mCat;
    });

    // Suma kalorii
    const totalKcal = filtered.reduce((sum, i) => sum + (i.calories * i.qty), 0);
    stats.innerHTML = `(${totalKcal.toLocaleString()} kcal)`;

    // Grupowanie
    const groups = filtered.reduce((acc, item) => {
      if (!acc[item.category]) acc[item.category] = [];
      acc[item.category].push(item);
      return acc;
    }, {});

    if (filtered.length === 0) {
      container.innerHTML = `<div style="text-align:center; padding: 20px; color: var(--secondary-text-color);">Brak pasujących zasobów...</div>`;
      return;
    }

    container.innerHTML = Object.keys(groups).sort().map(cat => {
      // Rozwiń automatycznie jeśli użytkownik szuka lub sekcja była otwarta
      const isOpen = (this._searchQuery.length > 0) || this._openCategories.has(cat);
      
      return `
        <details ${isOpen ? 'open' : ''} ontoggle="this.getRootNode().host._handleToggle(event, '${cat}')">
          <summary>
            ${cat} 
            <span class="cat-count">${groups[cat].length}</span>
          </summary>
          <table>
            <thead>
              <tr>
                <th style="width: 40%;">Produkt</th>
                <th>Ważność</th>
                <th>Ilość</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              ${groups[cat].map(item => `
                <tr>
                  <td>
					<strong>${item.name}</strong><br/>
					<small>${item.brand}</small><br/>
					<small>${item.weight || '-'}g</small><br/>
					<small>${item.calories} kcal</small>
				  </td>
                  <td><small>${item.expiry}</small></td>
                  <td>
                    <div class="qty-controls">
                      <button class="btn-qty" onclick="this.getRootNode().host._updateQty(${item.id}, -1)">-</button>
                      <span>${item.qty}</span>
                      <button class="btn-qty" onclick="this.getRootNode().host._updateQty(${item.id}, 1)">+</button>
                    </div>
                  </td>
                  <td><button class="btn-del" onclick="this.getRootNode().host._deleteItem(${item.id})">✕</button></td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </details>
      `;
    }).join('');
  }

  _setupEventListeners() {
    const root = this.shadowRoot;
    
    root.getElementById('search-input').addEventListener('input', (e) => {
      this._searchQuery = e.target.value;
      this._updateDynamicContent();
    });

    root.getElementById('filter-category').addEventListener('change', (e) => {
      this._filterCategory = e.target.value;
      this._updateDynamicContent();
    });

    root.getElementById('open-modal').onclick = () => {
      this._modalOpen = true;
      root.getElementById('add-modal').style.display = 'flex';
      this._setScanStatus('');
      // Reset pól formularza
      root.getElementById('in-barcode').value = '';
      root.getElementById('in-name').value = '';
      root.getElementById('in-brand').value = '';
      root.getElementById('in-weight').value = '';
      root.getElementById('in-expiry').value = '';
      root.getElementById('in-cal').value = '';
      root.getElementById('in-cat').value = 'Owoce';
    };

    root.getElementById('close-modal').onclick = () => {
      this._modalOpen = false;
      this._stopScanner();
      root.getElementById('add-modal').style.display = 'none';
      this._updateDynamicContent();
    };

    root.getElementById('btn-scan').onclick = () => {
      this._startScanner();
    };

    root.getElementById('btn-barcode-search').onclick = () => {
      const code = root.getElementById('in-barcode').value.trim();
      if (code) this._lookupBarcode(code);
    };

    root.getElementById('in-barcode').addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        const code = e.target.value.trim();
        if (code) this._lookupBarcode(code);
      }
    });

    root.getElementById('save-item').onclick = () => {
      const newItem = {
        id: Date.now(),
        category: root.getElementById('in-cat').value,
        name: root.getElementById('in-name').value || '?',
        brand: root.getElementById('in-brand').value || '-',
		weight: root.getElementById('in-weight').value || '-',
        expiry: root.getElementById('in-expiry').value || '-',
        calories: parseInt(root.getElementById('in-cal').value) || 0,
        qty: 1
      };
      this.items.push(newItem);
      this._modalOpen = false;
      root.getElementById('add-modal').style.display = 'none';
      this._updateDynamicContent();
      this._saveToHA(); // Zapis do sensora
    };
  }

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

    // Ramka celownika — prostokąt wskazujący gdzie umieścić cyfry kodu
    const guide = document.createElement('div');
    guide.style.cssText = 'position:absolute;left:10%;right:10%;top:40%;height:20%;border:2px solid #f44336;border-radius:4px;box-shadow:0 0 0 9999px rgba(0,0,0,0.4);pointer-events:none;';

    const guideLabel = document.createElement('div');
    guideLabel.textContent = 'Umieść kod kreskowy w ramce';
    guideLabel.style.cssText = 'position:absolute;left:0;right:0;bottom:-24px;text-align:center;color:#f44336;font-size:0.75em;font-weight:bold;';
    guide.appendChild(guideLabel);

    const statusInfo = document.createElement('div');
    statusInfo.style.cssText = 'color:#aaa;font-size:0.8em;margin-top:8px;text-align:center;min-height:1.5em;';

    const btnRow = document.createElement('div');
    btnRow.style.cssText = 'display:flex;gap:12px;margin-top:12px;';

    let torchOn = false;
    const torchBtn = document.createElement('button');
    torchBtn.textContent = '🔦 LATARKA';
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
    cancelBtn.textContent = '✕ ZAMKNIJ';
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
    statusInfo.textContent = 'Ładowanie skanera...';

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
      statusInfo.textContent = `Skanowanie... (${settings.width || video.videoWidth}x${settings.height || video.videoHeight})`;

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
                  statusInfo.textContent = `Odczytano: ${code} (${confirmCount}/2)`;
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
      this._setScanStatus('Błąd skanera: ' + err.message);
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
      this._setScanStatus(`Kod: ${barcode} — wyszukiwanie tylko dla kodów EAN-13 (13 cyfr)`);
      return;
    }

    this._setScanStatus(`Kod: ${barcode} — szukam produktu...`);

    const data = await this._fetchProduct(barcode);
    if (!data) {
      this._setScanStatus(`Nie znaleziono produktu (kod: ${barcode})`);
      return;
    }

    const p = data;
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

    this._setScanStatus(`Znaleziono: ${p.product_name || barcode}`);
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
      { keywords: ['instant', 'noodle', 'zupk'], category: 'Owoce' },
      { keywords: ['dried', 'dry', 'rice', 'pasta', 'flour', 'cereal', 'grain', 'suche', 'ryż', 'makaron', 'mąka', 'kasza', 'płatki'], category: 'Suche' },
      { keywords: ['chocolate', 'candy', 'sweet', 'sugar', 'biscuit', 'cookie', 'wafer', 'czekolad', 'cukier', 'słodycz', 'ciastk', 'wafel'], category: 'Słodkie' },
      { keywords: ['ready', 'meal', 'prepared', 'gotowe', 'danie'], category: 'Gotowe' },
      { keywords: ['canned', 'can:', 'conserve', 'konserw', 'puszk'], category: 'Konserwy' },
      { keywords: ['preserve', 'jam', 'pickl', 'przetwor', 'dżem', 'marynat', 'kompot'], category: 'Przetwory' },
      { keywords: ['tomato', 'pomidor', 'ketchup', 'passata'], category: 'Pomidory' },
      { keywords: ['spice', 'herb', 'seasoning', 'przypraw', 'zioł'], category: 'Przyprawy' },
      { keywords: ['medicine', 'pharma', 'supplement', 'vitamin', 'medic', 'lek', 'witamin', 'suplement'], category: 'Medykamenty' },
      { keywords: ['energy', 'bar:', 'protein', 'sport', 'energet', 'baton'], category: 'Energetyczne' },
    ];

    for (const { keywords, category } of map) {
      if (all.some(c => keywords.some(k => c.includes(k)))) {
        return category;
      }
    }
    return 'Inne';
  }

  _updateQty(id, delta) {
    const item = this.items.find(i => i.id === id);
    if (item) {
      item.qty = Math.max(0, item.qty + delta);
      this._updateDynamicContent();
      this._saveToHA();
    }
  }

  _deleteItem(id) {
    if(confirm("Usunąć ten zasób?")) {
      this.items = this.items.filter(i => i.id !== id);
      this._updateDynamicContent();
      this._saveToHA();
    }
  }
}

customElements.define('apocalypse-stock-card', ApocalypseStockCard);