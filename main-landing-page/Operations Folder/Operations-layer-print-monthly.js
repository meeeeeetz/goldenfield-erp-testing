if (typeof ModuleComponents === 'undefined') { window.ModuleComponents = {}; }

ModuleComponents['operations-layer-print-monthly'] = (container) => {
        container.innerHTML = `
            <div class="print-report-layout">
                <div class="header-actions">
                    <h2>Print Monthly Layer Report</h2>
                    <div class="action-buttons-row">
                        <button id="print-report-btn" class="btn-icon-circle">
                            <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                            <span class="btn-label">Print Report</span>
                        </button>
                        <button id="back-to-buildings-btn" class="btn-icon-circle">
                            <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                            <span class="btn-label">Back to Layer Buildings</span>
                        </button>
                    </div>
                </div>
                <div class="filter-row">
                    <label class="filter-field">Buidling: <input type="text" id="filter-buidling" placeholder="e.g. 701" /></label>
                    <label class="filter-field">Date: <input type="date" id="filter-date" /></label>
                    <label class="filter-field">Age: <input type="number" id="filter-age" placeholder="wks" /></label>
                    <button id="sheet-clear" class="btn-secondary">Clear Sheet</button>
                </div>
                <div class="sheet-title-band">
                    <span class="sheet-building">Building 701</span>
                    <span class="sheet-title-big">Monthly Layer Report</span>
                </div>
                <div class="spreadsheet-wrap">
                    <table class="spreadsheet" id="spreadsheet"></table>
                </div>
            </div>
        `;

        const sheetCols = ['Date', 'Age', 'No', 'Si', 'Pro', 'Oth', 'Total', 'Population', 'Feeds', 'Medicine', 'Qty/Unit', 'Water', 'Time', 'Electric', 'Water', 'Production', 'Remarks'];
        const SHEET_ROWS = 31;
        const sheet = document.getElementById('spreadsheet');

        function buildSheet(rows) {
            let html = '<thead><tr>' + sheetCols.map((_, i) => (i === 2 ? '<th colspan="5">Mortality</th>' : (i === 9 ? '<th colspan="4">Medications</th>' : (i > 2 && i < 7 || i > 9 && i < 13 ? '' : '<th></th>')))).join('') + '</tr><tr>' + sheetCols.map(c => `<th>${c}</th>`).join('') + '</tr></thead><tbody>';
            for (let r = 0; r < rows; r++) {
                html += '<tr>';
                for (let c = 0; c < sheetCols.length; c++) {
                    let val = '';
                    if (c === 0) { const d = (r % 30) + 1; val = '2026-07-' + String(d).padStart(2, '0'); }
                    html += `<td contenteditable="true">${val}</td>`;
                }
                html += '</tr>';
            }
            html += '</tbody>';
            sheet.innerHTML = html;
        }

        buildSheet(SHEET_ROWS);

        sheet.addEventListener('keydown', (e) => {
            const td = e.target.closest('td');
            if (!td) return;
            const tbl = sheet;
            const cell = td.cellIndex;
            const row = td.parentElement.rowIndex - 1;
            if (e.key === 'ArrowUp' || e.key === 'ArrowDown' || e.key === 'ArrowLeft' || e.key === 'ArrowRight' || e.key === 'Tab' || e.key === 'Enter') {
                e.preventDefault();
                let target = null;
                if (e.key === 'ArrowUp' && row > 0) target = tbl.tBodies[0].rows[row - 1].cells[cell];
                else if (e.key === 'ArrowDown' && row < tbl.tBodies[0].rows.length - 1) target = tbl.tBodies[0].rows[row + 1].cells[cell];
                else if (e.key === 'ArrowLeft' && cell > 0) target = td.parentElement.cells[cell - 1];
                else if ((e.key === 'ArrowRight' || e.key === 'Tab') && cell < sheetCols.length - 1) target = td.parentElement.cells[cell + 1];
                else if (e.key === 'Enter' && row < tbl.tBodies[0].rows.length - 1) target = tbl.tBodies[0].rows[row + 1].cells[cell];
                if (target) { target.focus(); }
            }
        });

        sheet.addEventListener('focusin', (e) => {
            const td = e.target.closest('td');
            if (!td || !sheet.contains(td)) return;
            const tbl = sheet;
            const cell = td.cellIndex;
            tbl.querySelectorAll('.hl-col').forEach(el => el.classList.remove('hl-col'));
            tbl.querySelectorAll('.hl-row').forEach(el => el.classList.remove('hl-row'));
            td.parentElement.classList.add('hl-row');
            if (tbl.tHead) tbl.tHead.rows[0].cells[cell].classList.add('hl-col');
            for (const row of tbl.tBodies[0].rows) {
                if (row.cells[cell]) row.cells[cell].classList.add('hl-col');
            }
        });

        document.getElementById('sheet-clear').onclick = () => {
            sheet.tBodies[0].querySelectorAll('td').forEach(td => td.textContent = '');
        };

        document.getElementById('print-report-btn').onclick = () => {
            window.print();
        };
        document.getElementById('back-to-buildings-btn').onclick = () => {
            switchTab('operations-layer-buildings');
        };
    };

function initializeModule(contentArea) {
    const currentTab = window.__currentTabId || 'operations';
    const render = ModuleComponents[currentTab] || ModuleComponents['operations'];
    render(contentArea);
}
