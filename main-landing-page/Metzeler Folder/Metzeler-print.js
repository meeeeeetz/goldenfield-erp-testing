if (typeof ModuleComponents === 'undefined') { window.ModuleComponents = {}; }

function showPrintToast(message) {
    let toast = document.getElementById('print-save-toast');
    if (!toast) {
        toast = document.createElement('div');
        toast.id = 'print-save-toast';
        toast.style.cssText = 'position:fixed; top: 16px; right: 16px; z-index: 10000; background: #166534; color: #fff; padding: 10px 16px; border-radius: 6px; font-size: 13px; box-shadow: 0 4px 12px rgba(0,0,0,0.25); display:none;';
        document.body.appendChild(toast);
    }
    toast.textContent = message;
    toast.style.display = 'block';
    setTimeout(() => { toast.style.display = 'none'; }, 2200);
}

function loadResource(url, type) {
    return new Promise((resolve, reject) => {
        if (type === 'css') {
            const link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = url;
            link.onload = resolve;
            link.onerror = reject;
            document.head.appendChild(link);
        } else {
            const script = document.createElement('script');
            script.src = url;
            script.onload = resolve;
            script.onerror = reject;
            document.head.appendChild(script);
        }
    });
}

function waitFor(condition, timeoutMs = 15000) {
    return new Promise((resolve, reject) => {
        const start = Date.now();
        const poll = () => {
            if (condition()) {
                resolve();
            } else if (Date.now() - start > timeoutMs) {
                reject(new Error('Timeout waiting for condition'));
            } else {
                setTimeout(poll, 50);
            }
        };
        poll();
    });
}

const LUCKYSHEET_CDN = 'https://cdn.jsdelivr.net/npm/luckysheet@latest/dist/';

async function loadLuckysheetAssets() {
    const cssFiles = [
        LUCKYSHEET_CDN + 'plugins/css/pluginsCss.css',
        LUCKYSHEET_CDN + 'plugins/plugins.css',
        LUCKYSHEET_CDN + 'css/luckysheet.css',
        LUCKYSHEET_CDN + 'assets/iconfont/iconfont.css'
    ];
    const jsFiles = [
        LUCKYSHEET_CDN + 'plugins/js/plugin.js',
        LUCKYSHEET_CDN + 'luckysheet.umd.js'
    ];

    for (const css of cssFiles) {
        await loadResource(css, 'css');
    }
    for (const js of jsFiles) {
        await loadResource(js, 'js');
    }

    await waitFor(() => typeof window.luckysheet !== 'undefined');
}

function injectPrintStyles() {
    let style = document.getElementById('print-sheet-styles');
    if (style) {
        style.remove();
    }
    style = document.createElement('style');
    style.id = 'print-sheet-styles';
    style.textContent = `
        #luckysheet-print-container {
            width: 100% !important;
            height: 100% !important;
            margin: 0;
            background: #fff;
            box-shadow: 0 1px 3px rgba(0,0,0,0.1);
            box-sizing: border-box;
            overflow: auto;
            outline: none;
            font-family: inherit;
            font-size: 14px;
            position: absolute !important;
            left: 0;
            top: 0;
        }
        .print-toolbar-btn {
            padding: 8px 18px !important;
            font-size: 13px !important;
            font-weight: 600 !important;
            border: 1px solid #9ca3af !important;
            background: linear-gradient(180deg, #ffffff 0%, #f8fafc 100%) !important;
            border-radius: 7px !important;
            cursor: pointer !important;
            margin: 7px 10px 7px 0 !important;
            line-height: 1 !important;
            display: inline-flex !important;
            align-items: center !important;
            gap: 6px !important;
            white-space: nowrap !important;
            min-width: 100px !important;
            text-align: center !important;
            color: #111827 !important;
            box-shadow: 0 1px 2px rgba(0,0,0,0.05) !important;
        }
        .print-toolbar-btn:hover {
            background: linear-gradient(180deg, #f1f5f9 0%, #e2e8f0 100%) !important;
            border-color: #4b5563 !important;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1) !important;
            transform: translateY(-1px) !important;
        }
        .print-toolbar-btn:active {
            background: #e2e8f0 !important;
            transform: translateY(0) !important;
        }
        .print-toolbar-btn.active {
            background: #dbeafe !important;
            border-color: #2563eb !important;
            box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.15) !important;
        }
        #print-page-toolbar .ql-formats {
            gap: 12px !important;
        }
        #print-page-toolbar span {
            display: inline-flex !important;
            align-items: center !important;
            gap: 8px !important;
            flex-wrap: wrap !important;
        }
        .no-print {
            display: block !important;
        }
        @media print {
            .no-print { display: none !important; }
            body { background: #fff !important; }
            .module-dashboard { box-shadow: none; border: none; }
            #print-page-toolbar { display: none !important; }
            #luckysheet-print-container { padding: 0; margin: 0; box-shadow: none; width: 100%; height: auto !important; min-height: auto !important; max-height: none !important; overflow: visible !important; }
            .luckysheet-toolbar, .luckysheet-formula-bar, .luckysheet-sheet-container, .luckysheet-scroll-container-x, .luckysheet-scroll-container-y, .luckysheet-rolenum-col, .luckysheet-sheet-title, .luckysheet-sheet-add, .luckysheet-sheet-delete, .luckysheet-cell-selected, .luckysheet-cell-mousedown, .luckysheet-cell-current {
                display: none !important;
            }
            .luckysheet-cell { border: 1px solid #000 !important; background: #fff !important; }
            table.luckysheet-table { border-collapse: collapse !important; border: 1px solid #000 !important; }
        }
    `;
    document.head.appendChild(style);
}

let luckysheetLoaded = false;
let luckysheetLoadPromise = null;

function ensureLuckysheetLoaded() {
    if (luckysheetLoadPromise) return luckysheetLoadPromise;
    luckysheetLoadPromise = loadLuckysheetAssets().then(() => {
        luckysheetLoaded = true;
    });
    return luckysheetLoadPromise;
}

ModuleComponents['metz-print'] = (container) => {
    container.innerHTML = `
        <div class="module-dashboard">
            <div style="display: flex; justify-content: space-between; align-items: center; gap: 12px; width: 100%;">
                <h2>Print</h2>
                <div style="display: flex; align-items: center; gap: 8px;">
                    <select id="print-template-select" class="modal-select" style="width: auto; min-width: 160px;">
                        <option value="">Select Template</option>
                    </select>
                    <button id="print-btn-new" class="btn-primary" style="padding: 8px 12px; font-size: 13px;">+ New</button>
                    <button id="print-btn-clear" class="btn-secondary" style="padding: 8px 12px; font-size: 13px;">Clear</button>
                    <button id="print-btn-save" class="btn-primary" style="padding: 8px 12px; font-size: 13px;">Save</button>
                    <button id="print-btn-delete" class="btn-danger" disabled style="padding: 8px 12px; font-size: 13px;">Delete</button>
                    <button id="print-btn-print" class="btn-primary" style="padding: 8px 12px; font-size: 13px;">Print</button>
                </div>
            </div>
            <div class="card" style="margin-top: 10px; padding: 20px; height: calc(100vh - 160px); position: relative;">
                <h3 style="margin: 0 0 16px 0; font-size: 16px; font-weight: 600; color: #1a1f2e;">Print Page</h3>
                <div id="print-quill-editor" style="width: 100%; height: calc(100% - 80px); border: 1px solid #D6D6D6; border-top: none; border-radius: 0 0 6px 6px; overflow: hidden; position: relative;">
                    <div id="luckysheet-print-container"></div>
                </div>
            </div>
        </div>
    `;
};

function initializeModule(contentArea) {
    const currentTab = window.__currentTabId || 'metz-print';
    const render = ModuleComponents[currentTab] || ModuleComponents['metz-print'];
    render(contentArea);

    injectPrintStyles();

    const sheetContainer = document.getElementById('luckysheet-print-container');

    let currentTemplateId = null;
    let currentOrientation = 'portrait';
    let luckysheetSheetId = null;

    async function initLuckysheet(data, sheetConfig) {
        try {
            await ensureLuckysheetLoaded();
        } catch (e) {
            alert('Failed to load Luckysheet engine: ' + e.message);
            return;
        }
        if (!sheetContainer) return;
        sheetContainer.innerHTML = '';
        sheetContainer.style.display = 'block';
        sheetContainer.style.position = 'absolute';
        sheetContainer.style.left = '0';
        sheetContainer.style.top = '0';
        sheetContainer.style.width = '100%';
        sheetContainer.style.height = '100%';

        try {
            // Convert payload data to Luckysheet sheet config with celldata
            let celldata = [];
            let sheetName = 'Sheet1';
            let sheetRow = 50;
            let sheetCol = 20;
            let sheetChWidth = null;
            let sheetRhHeight = null;
            let sheetVisRow = null;
            let sheetVisCol = null;
            let sheetColumnlen = null;
            let sheetRowlen = null;

            // If data is a full sheet config array, extract properties
            if (Array.isArray(data) && data.length > 0) {
                const first = data[0];
                if (first.celldata) {
                    celldata = Array.isArray(first.celldata) ? first.celldata : [];
                    sheetName = first.name || 'Sheet1';
                    sheetRow = first.row || 50;
                    sheetCol = first.column || 20;
                    sheetChWidth = first.ch_width;
                    sheetRhHeight = first.rh_height;
                    sheetVisRow = first.visibledatarow;
                    sheetVisCol = first.visibledatacolumn;
                    sheetColumnlen = first.config && first.config.columnlen ? first.config.columnlen : null;
                    sheetRowlen = first.config && first.config.rowlen ? first.config.rowlen : null;
                } else if (first.data) {
                    celldata = Array.isArray(first.data) ? first.data.map(c => ({
                        r: c.row ?? c.r,
                        c: c.col ?? c.c,
                        v: c.value ?? c.v
                    })) : [];
                    sheetName = first.name || 'Sheet1';
                    sheetRow = first.row || 50;
                    sheetCol = first.column || 20;
                    sheetChWidth = first.ch_width;
                    sheetRhHeight = first.rh_height;
                    sheetVisRow = first.visibledatarow;
                    sheetVisCol = first.visibledatacolumn;
                    sheetColumnlen = first.config && first.config.columnlen ? first.config.columnlen : null;
                    sheetRowlen = first.config && first.config.rowlen ? first.config.rowlen : null;
                } else {
                    // Raw cell data array [{row,col,value,...formatting}]
                    celldata = data.map(c => {
                        const cellObj = { r: c.row ?? c.r, c: c.col ?? c.c };
                        Object.keys(c).forEach(key => {
                            if (key !== 'r' && key !== 'c' && key !== 'row' && key !== 'col') {
                                cellObj[key] = c[key];
                            }
                        });
                        return cellObj;
                    });
                }
            }

            // Apply saved sheet-level config if provided as second parameter
            if (sheetConfig && typeof sheetConfig === 'object') {
                sheetCol = sheetConfig.column || sheetCol;
                sheetRow = sheetConfig.row || sheetRow;
                sheetChWidth = sheetConfig.ch_width !== undefined ? sheetConfig.ch_width : sheetChWidth;
                sheetRhHeight = sheetConfig.rh_height !== undefined ? sheetConfig.rh_height : sheetRhHeight;
                sheetVisRow = sheetConfig.visibledatarow || sheetVisRow;
                sheetVisCol = sheetConfig.visibledatacolumn || sheetVisCol;
                sheetColumnlen = sheetConfig.config && sheetConfig.config.columnlen ? sheetConfig.config.columnlen : sheetColumnlen;
                sheetRowlen = sheetConfig.config && sheetConfig.config.rowlen ? sheetConfig.config.rowlen : sheetRowlen;
                if (sheetConfig.name) sheetName = sheetConfig.name;
            }

            luckysheetSheetId = window.luckysheet.create({
                container: 'luckysheet-print-container',
                data: [{
                    name: sheetName,
                    color: '',
                    status: 1,
                    order: 0,
                    column: sheetCol,
                    row: sheetRow,
                    celldata: celldata,
                    ch_width: sheetChWidth,
                    rh_height: sheetRhHeight,
                    visibledatarow: sheetVisRow,
                    visibledatacolumn: sheetVisCol,
                    ...(sheetColumnlen || sheetRowlen ? {
                        config: {
                            columnlen: sheetColumnlen,
                            rowlen: sheetRowlen
                        }
                    } : {})
                }],
                merge: true,
                showGridLines: true,
                editable: true,
                showToolbar: true,
                showFormulaBar: true,
                language: 'en'
            });
            console.log('INIT luckysheetSheetId returned:', luckysheetSheetId);

            // Apply column widths / row heights via config + refresh
            if (sheetColumnlen || sheetRowlen) {
                try {
                    const file = window.luckysheet.getluckysheetfile() || [];
                    if (file && file[0]) {
                        file[0].config = file[0].config || {};
                        if (sheetColumnlen) file[0].config.columnlen = sheetColumnlen;
                        if (sheetRowlen) file[0].config.rowlen = sheetRowlen;
                    }
                    if (typeof window.luckysheet.refreshGrid === 'function') {
                        window.luckysheet.refreshGrid();
                    }
                } catch (e) { console.error('apply column/row width error', e); }
            }
        } catch (e) {
            alert('Luckysheet init error: ' + e.message);
            console.error('Luckysheet init error', e);
        }
    }

    function destroyLuckysheet() {
        if (luckysheetSheetId) {
            try {
                if (typeof window.luckysheet.destroy === 'function') {
                    window.luckysheet.destroy(luckysheetSheetId);
                } else if (typeof window.luckysheet.destroy === 'object') {
                    window.luckysheet.destroy(luckysheetSheetId);
                }
            } catch (e) {
                console.error('destroy luckysheet error', e);
            }
            luckysheetSheetId = null;
        }
        if (sheetContainer) sheetContainer.innerHTML = '';
    }

    function getSheetContent() {
        let sheetData = [];
        let sheetConfig = null;
        try {
            if (typeof window.luckysheet !== 'undefined') {
                if (window.luckysheet.getluckysheetfile) {
                    const fileNoId = window.luckysheet.getluckysheetfile() || [];
                    console.log('GET getluckysheetfile():', JSON.stringify(fileNoId));
                    if (Array.isArray(fileNoId) && fileNoId.length > 0) {
                        const firstSheet = fileNoId[0];
                        // Luckysheet stores cell values in the 'data' 2D array:
                        // data[row][col] = null | { m, ct, v }  (v = cell value, ct = formatting: bold, italic, borders, color, etc.)
                        if (firstSheet && Array.isArray(firstSheet.data)) {
                            sheetData = [];
                            firstSheet.data.forEach((rowArr, r) => {
                                if (!Array.isArray(rowArr)) return;
                                rowArr.forEach((cell, c) => {
                                    if (cell == null || cell === '') return;
                                    // Save full cell object including formatting (ct: bold, italic, borders, color, font, etc.)
                                    const cellObj = { r: r, c: c };
                                    if (cell && typeof cell === 'object') {
                                        if (cell.v !== undefined) cellObj.v = cell.v;
                                        if (cell.m !== undefined) cellObj.m = cell.m;
                                        if (cell.ct !== undefined) cellObj.ct = cell.ct;
                                    } else if (typeof cell === 'string' || typeof cell === 'number') {
                                        cellObj.v = cell;
                                    }
                                    sheetData.push(cellObj);
                                });
                            });
                        } else if (firstSheet && Array.isArray(firstSheet.celldata)) {
                            sheetData = firstSheet.celldata;
                        }
                        // Save sheet-level config (row heights, column widths, borders config, etc.)
                        if (firstSheet) {
                            sheetConfig = {
                                name: firstSheet.name || 'Sheet1',
                                color: firstSheet.color || '',
                                status: firstSheet.status || 1,
                                order: firstSheet.order || 0,
                                column: firstSheet.column || 20,
                                row: firstSheet.row || 50,
                                ch_width: firstSheet.ch_width,
                                rh_height: firstSheet.rh_height,
                                visibledatarow: firstSheet.visibledatarow,
                                visibledatacolumn: firstSheet.visibledatacolumn,
                                load: firstSheet.load,
                                config: firstSheet.config
                            };
                        }
                    }
                }
            }
        } catch (e) {
            console.error('getluckysheetfile error', e);
        }
        console.log('GET sheetData from Luckysheet:', JSON.stringify(sheetData));
        console.log('GET sheetConfig from Luckysheet:', JSON.stringify(sheetConfig));
        return { content: sheetData, sheetConfig: sheetConfig, orientation: currentOrientation };
    }

    async function setSheetContent(payload) {
        console.log('SET payload received:', JSON.stringify(payload));
        let sheetData = [];
        let orientation = 'portrait';
        let rawContent = null;
        let rawSheetConfig = null;
        if (payload && typeof payload === 'object') {
            // Handle case where content_payload is stored as JSON string in DB
            rawContent = payload.content;
            rawSheetConfig = payload.sheetConfig;
            if (typeof rawContent === 'string') {
                try { rawContent = JSON.parse(rawContent); } catch (e) { rawContent = []; }
            }
            if (typeof rawSheetConfig === 'string') {
                try { rawSheetConfig = JSON.parse(rawSheetConfig); } catch (e) { rawSheetConfig = null; }
            }
            // If payload itself is an array (raw celldata), use it directly
            if (Array.isArray(payload)) {
                sheetData = payload;
            } else if (rawContent !== undefined) {
                const content = rawContent;
                // content can be full sheet config [{ name, celldata: [...] }]
                if (Array.isArray(content) && content.length > 0 && content[0].celldata) {
                    sheetData = Array.isArray(content[0].celldata) ? content[0].celldata : [];
                }
                // content is raw cell data array [{r,c,v}] or [{row,col,value}]
                else if (Array.isArray(content)) {
                    sheetData = content;
                }
            }
            if (payload.orientation) orientation = payload.orientation;
        } else if (payload && typeof payload === 'string') {
            try {
                const parsed = JSON.parse(payload);
                if (parsed && parsed.content !== undefined) {
                    rawContent = parsed.content;
                    rawSheetConfig = parsed.sheetConfig;
                    if (typeof rawContent === 'string') {
                        try { rawContent = JSON.parse(rawContent); } catch (e) { rawContent = []; }
                    }
                    if (typeof rawSheetConfig === 'string') {
                        try { rawSheetConfig = JSON.parse(rawSheetConfig); } catch (e) { rawSheetConfig = null; }
                    }
                    if (Array.isArray(rawContent) && rawContent.length > 0 && rawContent[0].celldata) {
                        sheetData = Array.isArray(rawContent[0].celldata) ? rawContent[0].celldata : [];
                    } else if (Array.isArray(rawContent)) {
                        sheetData = rawContent;
                    }
                }
                if (parsed && parsed.orientation) orientation = parsed.orientation;
            } catch (e) {
                sheetData = [];
            }
        }
        currentOrientation = orientation;
        destroyLuckysheet();
        // Convert raw cell data to Luckysheet sheet config format
        // Preserve ALL cell properties including ct (formatting), bl (bold), cl (color), bg (background),
        // fs (font size), ff (font family), bo (borders), etc.
        const normalizedCelldata = Array.isArray(sheetData) ? sheetData.map(c => {
            const cellObj = { r: c.r ?? c.row, c: c.c ?? c.col };
            Object.keys(c).forEach(key => {
                if (key !== 'r' && key !== 'c' && key !== 'row' && key !== 'col') {
                    cellObj[key] = c[key];
                }
            });
            return cellObj;
        }) : [];
        console.log('SET normalizedCelldata:', JSON.stringify(normalizedCelldata));
        console.log('SET sheetConfig from payload:', JSON.stringify(rawSheetConfig));
        // Restore full sheet config with celldata merged in
        const restoredSheet = {
            name: 'Sheet1',
            color: '',
            status: 1,
            order: 0,
            column: 20,
            row: 50,
            celldata: normalizedCelldata
        };
        // Apply saved sheet-level config (row heights, column widths, etc.)
        if (rawSheetConfig && typeof rawSheetConfig === 'object') {
            restoredSheet.column = rawSheetConfig.column || 20;
            restoredSheet.row = rawSheetConfig.row || 50;
            restoredSheet.ch_width = rawSheetConfig.ch_width;
            restoredSheet.rh_height = rawSheetConfig.rh_height;
            restoredSheet.visibledatarow = rawSheetConfig.visibledatarow;
            restoredSheet.visibledatacolumn = rawSheetConfig.visibledatacolumn;
            restoredSheet.load = rawSheetConfig.load;
            restoredSheet.config = rawSheetConfig.config;
            if (rawSheetConfig.name) restoredSheet.name = rawSheetConfig.name;
        }
        await initLuckysheet([restoredSheet]);
    }

    async function resetSheet() {
        destroyLuckysheet();
        currentTemplateId = null;
        currentOrientation = 'portrait';
        if (sheetContainer) sheetContainer.innerHTML = '';
        await initLuckysheet([], null);
        const templateSelect = document.getElementById('print-template-select');
        if (templateSelect) templateSelect.value = '';
        const btnDelete = document.getElementById('print-btn-delete');
        if (btnDelete) btnDelete.disabled = true;
    }

    async function loadTemplates() {
        try {
            const token = localStorage.getItem('goldenfield_auth_token');
            const res = await fetch('/api/metzeler/print/templates', {
                headers: token ? { 'Authorization': `Bearer ${token}` } : {}
            });
            if (!res.ok) return;
            const templates = await res.json();
            if (!Array.isArray(templates)) return;
            const templateSelect = document.getElementById('print-template-select');
            if (!templateSelect) return;
            templateSelect.innerHTML = '<option value="">Select Template</option>' +
                templates.map(t => `<option value="${t.id}">${t.filename || 'Untitled'}</option>`).join('');
        } catch (err) {
            console.error('loadTemplates error:', err);
        }
    }

    async function loadTemplate(id) {
        try {
            const token = localStorage.getItem('goldenfield_auth_token');
            const res = await fetch(`/api/metzeler/print/templates/${id}`, {
                headers: token ? { 'Authorization': `Bearer ${token}` } : {}
            });
            if (!res.ok) return;
            const template = await res.json();
            console.log('LOAD template:', JSON.stringify(template));
            currentTemplateId = template.id;
            await setSheetContent(template.content_payload);
            const btnDelete = document.getElementById('print-btn-delete');
            if (btnDelete) btnDelete.disabled = false;
            const templateSelect = document.getElementById('print-template-select');
            if (templateSelect) templateSelect.value = template.id;
        } catch (err) {
            console.error('loadTemplate error:', err);
        }
    }

    async function saveTemplate() {
        const content_payload = getSheetContent();
        console.log('SAVE content_payload:', JSON.stringify(content_payload));
        const token = localStorage.getItem('goldenfield_auth_token');
        const authHeaders = token ? { 'Authorization': `Bearer ${token}` } : {};

        if (currentTemplateId) {
            try {
                const res = await fetch(`/api/metzeler/print/templates/${currentTemplateId}`, {
                    method: 'PUT',
                    headers: { ...authHeaders, 'Content-Type': 'application/json' },
                    body: JSON.stringify({ content_payload })
                });
                if (!res.ok) {
                    const text = await res.text();
                    let msg = 'Failed to save template';
                    try { const err = JSON.parse(text); msg = err.error || msg; } catch (e) {}
                    alert(msg + ' (status: ' + res.status + ')');
                    return;
                }
                await loadTemplates();
                showPrintToast('Template saved');
            } catch (err) {
                alert('Error saving: ' + err.message);
            }
        } else {
            const filename = prompt('Enter a file name for this template:', 'Untitled');
            if (filename === null || filename.trim() === '') return;
            try {
                const res = await fetch('/api/metzeler/print/templates', {
                    method: 'POST',
                    headers: { ...authHeaders, 'Content-Type': 'application/json' },
                    body: JSON.stringify({ filename: filename.trim(), content_payload })
                });
                if (!res.ok) {
                    const text = await res.text();
                    let msg = 'Failed to save template';
                    try { const err = JSON.parse(text); msg = err.error || msg; } catch (e) {}
                    alert(msg + ' (status: ' + res.status + ')');
                    return;
                }
                const saved = await res.json();
                currentTemplateId = saved.id;
                await loadTemplates();
                const templateSelect = document.getElementById('print-template-select');
                if (templateSelect) templateSelect.value = saved.id;
                const btnDelete = document.getElementById('print-btn-delete');
                if (btnDelete) btnDelete.disabled = false;
                showPrintToast('Template saved');
            } catch (err) {
                alert('Error saving: ' + err.message);
            }
        }
    }

    async function deleteTemplate() {
        if (!currentTemplateId) return;
        if (!confirm('Delete this template?')) return;
        try {
            const token = localStorage.getItem('goldenfield_auth_token');
            const res = await fetch(`/api/metzeler/print/templates/${currentTemplateId}`, {
                method: 'DELETE',
                headers: token ? { 'Authorization': `Bearer ${token}` } : {}
            });
            if (!res.ok) {
                const text = await res.text();
                let msg = 'Failed to delete template';
                try { const err = JSON.parse(text); msg = err.error || msg; } catch (e) {}
                alert(msg + ' (status: ' + res.status + ')');
                return;
            }
            resetSheet();
            await loadTemplates();
        } catch (err) {
            alert('Error deleting: ' + err.message);
        }
    }

    function clearSheet() {
        if (!confirm('Clear all content on the current sheet?')) return;
        destroyLuckysheet();
        initLuckysheet([], null);
    }

    function doPrint() {
        window.print();
    }

    const templateSelect = document.getElementById('print-template-select');
    const btnNew = document.getElementById('print-btn-new');
    const btnClear = document.getElementById('print-btn-clear');
    const btnSave = document.getElementById('print-btn-save');
    const btnDelete = document.getElementById('print-btn-delete');
    const btnPrint = document.getElementById('print-btn-print');

    if (btnNew) btnNew.onclick = resetSheet;
    if (btnClear) btnClear.onclick = clearSheet;
    if (btnSave) btnSave.onclick = saveTemplate;
    if (btnDelete) btnDelete.onclick = deleteTemplate;
    if (btnPrint) btnPrint.onclick = doPrint;

    if (templateSelect) {
        templateSelect.addEventListener('change', () => {
            const id = templateSelect.value;
            if (id) loadTemplate(id);
            else resetSheet();
        });
    }

    ensureLuckysheetLoaded().then(() => {
        initLuckysheet([], null);
        loadTemplates();
    }).catch(err => {
        console.error('Failed to load Luckysheet:', err);
        alert('Failed to load spreadsheet engine. Please check console for details.');
    });
}
