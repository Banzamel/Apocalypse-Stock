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
                <th>Kcal</th>
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
    };

    root.getElementById('close-modal').onclick = () => {
      this._modalOpen = false;
      root.getElementById('add-modal').style.display = 'none';
      this._updateDynamicContent();
    };

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