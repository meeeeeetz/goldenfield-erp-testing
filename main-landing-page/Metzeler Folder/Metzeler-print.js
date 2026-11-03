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
        .orient-btn.active {
            background: #2563eb !important;
            color: #fff !important;
            border-color: #2563eb !important;
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

        @page { size: A4 portrait; margin: 6mm 6mm 6mm 6mm; }
        @page :first { margin: 6mm 6mm 6mm 6mm; }

        @media print {
            /* Hide everything by default */
            body * {
                visibility: hidden !important;
            }
            body {
                background: #fff !important;
                margin: 0 !important;
                padding: 0 !important;
                overflow: visible !important;
                position: static !important;
            }

            /* Make ONLY the print container and its children visible */
            #print-sheet-content,
            #print-sheet-content * {
                visibility: visible !important;
            }

            #print-sheet-content {
                position: absolute !important;
                left: 0 !important;
                top: 0 !important;
                width: 100% !important;
                max-width: 100% !important;
                height: auto !important;
                min-height: auto !important;
                max-height: none !important;
                overflow: visible !important;
                padding: 0 !important;
                margin: 0 !important;
                box-sizing: border-box !important;
                box-shadow: none !important;
                border: none !important;
            }

            #luckysheet-print-container {
                display: none !important;
            }

            /* Single-page fit: percentage-based column widths fill 100% of page */
            #print-sheet-content table[data-type="luckysheet_copy_action_table"] {
                width: 100% !important;
                table-layout: fixed !important;
                border-collapse: collapse !important;
                border: 1px solid #000 !important;
                page-break-inside: avoid !important;
                transform: none !important;
            }

            #print-sheet-content table[data-type="luckysheet_copy_action_table"] td {
                border: 1px solid #000 !important;
                background: #fff !important;
                white-space: normal !important;
                word-wrap: break-word !important;
                overflow-wrap: break-word !important;
                vertical-align: middle !important;
                page-break-inside: avoid !important;
                padding: 4px !important;
                box-sizing: border-box !important;
            }

            .print-only { display: block !important; }
        }

        @media screen {
            .print-only { display: none !important; }
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
                    <button id="print-btn-orient-portrait" class="btn-secondary orient-btn active" style="padding: 8px 12px; font-size: 13px; margin-left: 8px;">Portrait</button>
                    <button id="print-btn-orient-landscape" class="btn-secondary orient-btn" style="padding: 8px 12px; font-size: 13px;">Landscape</button>
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
            let sheetCol = 50;
            let sheetChWidth = null;
            let sheetRhHeight = null;
            let sheetVisRow = null;
            let sheetVisCol = null;
            let sheetColumnlen = null;
            let sheetRowlen = null;
            let sheetBorderInfo = null;
            let sheetMerge = null;

            // If data is a full sheet config array, extract properties
            if (Array.isArray(data) && data.length > 0) {
                const first = data[0];
                if (first.celldata) {
                    celldata = Array.isArray(first.celldata) ? first.celldata : [];
                    sheetName = first.name || 'Sheet1';
                    sheetRow = first.row || 50;
                    sheetCol = first.column || 50;
                    sheetChWidth = first.ch_width;
                    sheetRhHeight = first.rh_height;
                    sheetVisRow = first.visibledatarow;
                    sheetVisCol = first.visibledatacolumn;
                    sheetColumnlen = first.config && first.config.columnlen ? first.config.columnlen : null;
                    sheetRowlen = first.config && first.config.rowlen ? first.config.rowlen : null;
                    sheetBorderInfo = first.config && first.config.borderInfo ? first.config.borderInfo : null;
                    sheetMerge = first.config && first.config.merge ? first.config.merge : null;
                } else if (first.data) {
                    celldata = Array.isArray(first.data) ? first.data.map(c => {
                        const cellObj = { r: c.row ?? c.r, c: c.col ?? c.c };
                        Object.keys(c).forEach(key => {
                            if (key !== 'r' && key !== 'c' && key !== 'row' && key !== 'col') {
                                cellObj[key] = c[key];
                            }
                        });
                        return cellObj;
                    }) : [];
                    sheetName = first.name || 'Sheet1';
                    sheetRow = first.row || 50;
                    sheetCol = first.column || 50;
                    sheetChWidth = first.ch_width;
                    sheetRhHeight = first.rh_height;
                    sheetVisRow = first.visibledatarow;
                    sheetVisCol = first.visibledatacolumn;
                    sheetColumnlen = first.config && first.config.columnlen ? first.config.columnlen : null;
                    sheetRowlen = first.config && first.config.rowlen ? first.config.rowlen : null;
                    sheetBorderInfo = first.config && first.config.borderInfo ? first.config.borderInfo : null;
                    sheetMerge = first.config && first.config.merge ? first.config.merge : null;
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

            // Convert flat celldata to Luckysheet's native 2D data array:
            // dataGrid[row][col] = cellObject (with v, bl, it, ct, cl, bg, fs, ff, bo, etc.)
            const dataGrid = [];
            let maxRow = 0, maxCol = 0;
            celldata.forEach(cell => {
                const r = cell.r != null ? cell.r : 0;
                const c = cell.c != null ? cell.c : 0;
                if (r > maxRow) maxRow = r;
                if (c > maxCol) maxCol = c;
                const cellCopy = {};
                Object.keys(cell).forEach(key => {
                    if (key !== 'r' && key !== 'c') cellCopy[key] = cell[key];
                });
                if (!dataGrid[r]) dataGrid[r] = [];
                dataGrid[r][c] = cellCopy;
            });
            // Build a proper rectangular grid: every row 0..maxRow, every col 0..maxCol
            // with null for empty cells (Luckysheet needs defined cells, not undefined holes)
            const grid = [];
            for (let r = 0; r <= maxRow; r++) {
                grid[r] = [];
                for (let c = 0; c <= maxCol; c++) {
                    grid[r][c] = (dataGrid[r] && dataGrid[r][c] !== undefined) ? dataGrid[r][c] : null;
                }
            }
            // Ensure sheet dimensions cover all data
            sheetRow = Math.max(sheetRow, maxRow + 1);
            sheetCol = Math.max(sheetCol, maxCol + 1);

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
                sheetBorderInfo = sheetConfig.config && sheetConfig.config.borderInfo ? sheetConfig.config.borderInfo : sheetBorderInfo;
                sheetMerge = sheetConfig.config && sheetConfig.config.merge ? sheetConfig.config.merge : sheetMerge;
                if (sheetConfig.name) sheetName = sheetConfig.name;
            }

            // Sanitize config.merge: ensure it's a plain object with valid merge entries
            // Luckysheet's border.js crashes when config.merge is undefined or entries lack r/c/rs/cs
            let cleanMerge = {};
            if (sheetMerge && typeof sheetMerge === 'object') {
                Object.keys(sheetMerge).forEach(key => {
                    const entry = sheetMerge[key];
                    if (!entry || typeof entry !== 'object') return;
                    const r = entry.r != null ? entry.r : 0;
                    const c = entry.c != null ? entry.c : 0;
                    const rs = entry.rs != null ? entry.rs : 1;
                    const cs = entry.cs != null ? entry.cs : 1;
                    // Only keep entries with valid row/col that fit within sheet dimensions
                    if (r >= 0 && c >= 0 && rs >= 1 && cs >= 1 && r < sheetRow && c < sheetCol) {
                        cleanMerge[key] = { r, c, rs, cs };
                    }
                });
            }

            // Sanitize config.borderInfo: ensure it's an array
            let cleanBorderInfo = null;
            if (sheetBorderInfo && Array.isArray(sheetBorderInfo)) {
                cleanBorderInfo = sheetBorderInfo.filter(b => b && b.range && b.style && b.borderType);
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
                    data: grid,
                    ch_width: sheetChWidth,
                    rh_height: sheetRhHeight,
                    visibledatarow: sheetVisRow,
                    visibledatacolumn: sheetVisCol,
                    ...(sheetColumnlen || sheetRowlen || cleanBorderInfo || Object.keys(cleanMerge).length > 0 ? {
                        config: {
                            columnlen: sheetColumnlen,
                            rowlen: sheetRowlen,
                            ...(cleanMerge && Object.keys(cleanMerge).length > 0 ? { merge: cleanMerge } : {}),
                            ...(cleanBorderInfo ? { borderInfo: cleanBorderInfo } : {})
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
                                         Object.keys(cell).forEach(key => {
                                             cellObj[key] = cell[key];
                                         });
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
                                column: firstSheet.column || 50,
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
            column: 50,
            row: 50,
            celldata: normalizedCelldata
        };
        // Apply saved sheet-level config (row heights, column widths, etc.)
        if (rawSheetConfig && typeof rawSheetConfig === 'object') {
            restoredSheet.column = rawSheetConfig.column || 50;
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
        try {
            // 0. Check if a template is open
            if (!currentTemplateId) {
                alert('No template is currently open. Please select or create a template first.');
                return;
            }

            const sheetContainer = document.getElementById('luckysheet-print-container');
            if (!sheetContainer) {
                window.print();
                return;
            }

            // 1. Extract cell data from Luckysheet
            let allCells = [];
            let sheetConfigFromSheet = null;
            try {
                const sheetData = getSheetContent();
                allCells = sheetData && sheetData.content ? sheetData.content : [];
                sheetConfigFromSheet = sheetData && sheetData.sheetConfig ? sheetData.sheetConfig : null;
            } catch (e) {
                console.error('getSheetContent error:', e);
                allCells = [];
            }

            // 2. Dynamically determine print range from actual cell data
            // This ensures any template (e.g., A-AJ attendance) prints its full width
            let maxRow = 0, maxCol = 0;
            allCells.forEach(cell => {
                const r = cell.r != null ? cell.r : 0;
                const c = cell.c != null ? cell.c : 0;
                if (r > maxRow) maxRow = r;
                if (c > maxCol) maxCol = c;
            });
            const PRINT_START_ROW = 0;
            const PRINT_END_ROW = maxRow;
            const PRINT_START_COL = 0;
            const PRINT_END_COL = maxCol;

            const rangeCells = allCells.filter(cell => {
                const r = cell.r != null ? cell.r : 0;
                const c = cell.c != null ? cell.c : 0;
                return r >= PRINT_START_ROW && r <= PRINT_END_ROW &&
                       c >= PRINT_START_COL && c <= PRINT_END_COL;
            });

            // 3. Build the printable table HTML (matches Luckysheet copy table format)
            const printRowCount = PRINT_END_ROW + 1;
            const printColCount = PRINT_END_COL + 1;
            const columnlen = sheetConfigFromSheet && sheetConfigFromSheet.config && sheetConfigFromSheet.config.columnlen ? sheetConfigFromSheet.config.columnlen : null;
            const rowlen = sheetConfigFromSheet && sheetConfigFromSheet.config && sheetConfigFromSheet.config.rowlen ? sheetConfigFromSheet.config.rowlen : null;
            const merge = sheetConfigFromSheet && sheetConfigFromSheet.config && sheetConfigFromSheet.config.merge ? sheetConfigFromSheet.config.merge : null;
            const printHtml = buildLuckysheetPrintTable(rangeCells, printRowCount, printColCount, columnlen, rowlen, merge);

            // 4. Inject into temporary print container (direct child of document.body)
            let printContainer = document.getElementById('print-sheet-content');
            if (printContainer) {
                printContainer.remove();
            }
            printContainer = document.createElement('div');
            printContainer.id = 'print-sheet-content';
            printContainer.className = 'print-only';
            document.body.appendChild(printContainer);
            printContainer.innerHTML = printHtml;

            // 5. Force a DOM paint cycle, then trigger browser native print dialog
            requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                    // Destroy Luckysheet before print to prevent border.js internal errors
                    // during browser print re-render (e.g., template "aa" has malformed border data at cell 3_6)
                    try {
                        if (typeof window.luckysheet !== 'undefined' && typeof window.luckysheet.destroy === 'function') {
                            window.luckysheet.destroy(luckysheetSheetId);
                        }
                    } catch (e) {
                        console.error('destroy luckysheet before print error:', e);
                    }
                    luckysheetSheetId = null;

                    // Apply @page orientation dynamically before printing
                    try {
                        const styleEl = document.getElementById('print-sheet-styles');
                        if (styleEl) {
                            const newPageRule = '@page { size: A4 ' + currentOrientation + '; margin: 6mm 6mm 6mm 6mm; }';
                            styleEl.textContent = styleEl.textContent.replace(
                                /@page\s*\{\s*size:\s*A4\s+(?:portrait|landscape);/,
                                newPageRule
                            );
                        }
                    } catch (e) {
                        console.error('set @page orientation error:', e);
                    }

                    try {
                        window.print();
                    } catch (e) {
                        console.error('window.print error:', e);
                    }

                    // 6. Clean up AFTER print dialog closes
                    setTimeout(() => {
                        try {
                            if (printContainer && printContainer.parentNode) {
                                printContainer.remove();
                            }
                        } catch (e) {
                            console.error('print cleanup error:', e);
                        }

                        // 7. Re-initialize Luckysheet with the SAME template that was just printed
                        try {
                            if (!luckysheetSheetId && currentTemplateId) {
                                loadTemplate(currentTemplateId);
                            }
                        } catch (e) {
                            console.error('re-init luckysheet after print error:', e);
                        }
                    }, 500);
                });
            });
        } catch (e) {
            console.error('doPrint error:', e);
            alert('Print failed: ' + e.message);
        }
    }

    /**
     * Build a Luckysheet-style print table HTML string.
     * Format: <table data-type="luckysheet_copy_action_table"><colgroup width="...">...<tr><td style="...">value</td></tr></table>
     */
    function buildLuckysheetPrintTable(cells, rowCount, colCount, columnlen, rowlen, merge) {
        // Build column widths as percentages: each column's width / total width * 100
        // This ensures all columns proportionally fill 100% of the page width regardless of column count
        let totalColWidth = 0;
        const rawColWidths = [];
        for (let c = 0; c < colCount; c++) {
            if (columnlen && columnlen[c] != null) {
                rawColWidths[c] = parseInt(columnlen[c], 10) || 90;
            } else {
                rawColWidths[c] = 90;
            }
            totalColWidth += rawColWidths[c];
        }
        const colWidthsPct = [];
        for (let c = 0; c < colCount; c++) {
            colWidthsPct[c] = (rawColWidths[c] / Math.max(totalColWidth, 1)) * 100;
        }

        // Build row heights map: use saved rowlen from sheet config
        const rowHeights = {};
        if (rowlen && typeof rowlen === 'object') {
            Object.keys(rowlen).forEach(key => {
                rowHeights[key] = rowlen[key];
            });
        }

        // Build merge lookup: key = "r_c" -> {r, c, rs, cs}
        const mergeMap = {};
        const mergeCovered = {}; // cells covered by a merge (not the top-left)
        if (merge && typeof merge === 'object') {
            Object.keys(merge).forEach(key => {
                const entry = merge[key];
                if (!entry || typeof entry !== 'object') return;
                const r = parseInt(entry.r, 10);
                const c = parseInt(entry.c, 10);
                const rs = parseInt(entry.rs || 1, 10);
                const cs = parseInt(entry.cs || 1, 10);
                if (r >= 0 && c >= 0 && rs >= 1 && cs >= 1 && r < rowCount && c < colCount) {
                    mergeMap[r + '_' + c] = { r, c, rs, cs };
                    // Mark all covered cells (except top-left)
                    for (let rr = r; rr < r + rs; rr++) {
                        for (let cc = c; cc < c + cs; cc++) {
                            if (rr === r && cc === c) continue;
                            if (rr >= 0 && rr < rowCount && cc >= 0 && cc < colCount) {
                                mergeCovered[rr + '_' + cc] = true;
                            }
                        }
                    }
                }
            });
        }

        // Build dense matrix [row][col]
        const matrix = [];
        for (let r = 0; r < rowCount; r++) {
            matrix[r] = [];
            for (let c = 0; c < colCount; c++) {
                matrix[r][c] = null;
            }
        }
        cells.forEach(cell => {
            const r = parseInt(cell.r != null ? cell.r : 0, 10);
            const c = parseInt(cell.c != null ? cell.c : 0, 10);
            if (r >= 0 && r < rowCount && c >= 0 && c < colCount) {
                matrix[r][c] = cell;
            }
        });

        let html = '<table data-type="luckysheet_copy_action_table" style="border-collapse: collapse; width: 100%; table-layout: fixed;">';

        // Colgroup with percentage column widths (fill 100% of page)
        html += '<colgroup>';
        for (let c = 0; c < colCount; c++) {
            html += '<colgroup width="' + colWidthsPct[c].toFixed(2) + '%"></colgroup>';
        }
        html += '</colgroup>';

        // Rows with exact row heights
        for (let r = 0; r < rowCount; r++) {
            const rh = rowHeights[r] != null ? rowHeights[r] : 19;
            html += '<tr style="height:' + rh + 'px;">';
            for (let c = 0; c < colCount; c++) {
                // Skip cells covered by a merge (not the top-left anchor)
                if (mergeCovered[r + '_' + c]) {
                    continue;
                }

                const cell = matrix[r][c];

                // Check if this cell is a merge anchor
                const mergeInfo = mergeMap[r + '_' + c];
                let spanAttrs = '';
                if (mergeInfo) {
                    const attrs = [];
                    if (mergeInfo.rs > 1) attrs.push('rowspan="' + mergeInfo.rs + '"');
                    if (mergeInfo.cs > 1) attrs.push('colspan="' + mergeInfo.cs + '"');
                    spanAttrs = attrs.join(' ');
                }

                let styleStr = '';
                try {
                    styleStr = buildTdStyle(cell);
                } catch (e) {
                    console.error('buildTdStyle error at row ' + r + ' col ' + c + ':', e);
                }

                // Render formatted value (m) if available, else raw value (v)
                let cellValue = '';
                if (cell) {
                    if (cell.m != null && cell.m !== '') {
                        cellValue = escapeHtml(String(cell.m));
                    } else if (cell.v != null && cell.v !== '') {
                        cellValue = escapeHtml(String(cell.v));
                    } else {
                        cellValue = '&nbsp;';
                    }
                } else {
                    cellValue = '&nbsp;';
                }

                html += '<td ' + spanAttrs + ' style="' + styleStr + '">' + cellValue + '</td>';
            }
            html += '</tr>';
        }

        html += '</table>';
        return html;
    }

    /**
     * Build the inline style string for a <td> based on Luckysheet cell props.
     */
    function buildTdStyle(cell) {
        if (!cell || typeof cell !== 'object') return '';

        const parts = [];

        // Bold
        if (cell.bl === 1 || cell.bl === true) parts.push('font-weight: bold');

        // Italic
        if (cell.it === 1 || cell.it === true) parts.push('font-style: italic');

        // Text color / background from ct
        if (cell.ct) {
            const color = extractColor(cell.ct);
            if (color) parts.push('color: ' + color);
        }

        // Cell background
        if (cell.bg) parts.push('background-color: ' + escapeHtml(String(cell.bg)));

        // Font size
        if (cell.fs != null) parts.push('font-size: ' + cell.fs + 'px');

        // Font family
        if (cell.ff != null) parts.push('font-family: "' + escapeHtml(String(cell.ff)) + '"');

        // Borders from bo (Luckysheet border object)
        if (cell.bo && typeof cell.bo === 'object') {
            const b = cell.bo;
            try {
                if (b && b.l && typeof b.l === 'object') parts.push('border-left: ' + (b.l.w || 0.5) + 'pt solid ' + (b.l.c || '#000'));
                if (b && b.r && typeof b.r === 'object') parts.push('border-right: ' + (b.r.w || 0.5) + 'pt solid ' + (b.r.c || '#000'));
                if (b && b.t && typeof b.t === 'object') parts.push('border-top: ' + (b.t.w || 0.5) + 'pt solid ' + (b.t.c || '#000'));
                if (b && b.b && typeof b.b === 'object') parts.push('border-bottom: ' + (b.b.w || 0.5) + 'pt solid ' + (b.b.c || '#000'));
            } catch (e) {
                console.error('border style error:', e);
            }
        }

        // Fallback: default borders if cell has any content
        if (cell && cell.v != null && parts.filter(p => p.startsWith('border')).length === 0) {
            parts.push('border-left: 0.5pt solid #000');
            parts.push('border-right: 0.5pt solid #000');
            parts.push('border-top: 0.5pt solid #000');
            parts.push('border-bottom: 0.5pt solid #000');
        }

        return parts.join('; ');
    }

    /**
     * Extract a CSS color string from Luckysheet's ct/color formats.
     */
    function extractColor(ct) {
        if (typeof ct === 'string') return ct;
        if (ct && typeof ct === 'object') {
            if (ct.rgb) return ct.rgb;
            if (ct.color) return ct.color;
        }
        return null;
    }

    /**
     * Escape HTML special characters to prevent XSS.
     */
    function escapeHtml(text) {
        if (text == null) return '';
        const div = document.createElement('div');
        div.textContent = String(text);
        return div.innerHTML;
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

    // Orientation toggle buttons
    const btnOrientPortrait = document.getElementById('print-btn-orient-portrait');
    const btnOrientLandscape = document.getElementById('print-btn-orient-landscape');
    function setOrientationButtons() {
        if (btnOrientPortrait) btnOrientPortrait.classList.toggle('active', currentOrientation === 'portrait');
        if (btnOrientLandscape) btnOrientLandscape.classList.toggle('active', currentOrientation === 'landscape');
    }
    if (btnOrientPortrait) btnOrientPortrait.onclick = () => { currentOrientation = 'portrait'; setOrientationButtons(); };
    if (btnOrientLandscape) btnOrientLandscape.onclick = () => { currentOrientation = 'landscape'; setOrientationButtons(); };
    setOrientationButtons();

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
