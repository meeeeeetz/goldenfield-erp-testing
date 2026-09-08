if (typeof ModuleComponents === 'undefined') { window.ModuleComponents = {}; }

function getAuthHeaders() {
    const token = localStorage.getItem('goldenfield_auth_token');
    return token ? { 'Authorization': `Bearer ${token}` } : {};
}

ModuleComponents['operations-layer-print-monthly'] = (container) => {
        container.innerHTML = `
            <div class="print-report-layout">
                <div class="header-actions">
                    <h2>Print Monthly Layer Report</h2>
                    <div class="action-buttons-row">
                        <button id="back-to-buildings-btn" class="btn-icon-circle">
                            <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                            <span class="btn-label">Back to Layer Buildings</span>
                        </button>
                    </div>
                </div>
                <div class="filter-row">
                    <label class="filter-field">Buidling: 
                        <select id="filter-buidling">
                            <option value="">Select Building...</option>
                        </select>
                    </label>
                    <label class="filter-field">Date: <input type="date" id="filter-date" /></label>
                    <label class="filter-field">Age: <input type="text" id="filter-age" placeholder="e.g. 15-4" /></label>
                    <button id="print-age-btn" class="btn-secondary" style="background-color: #D8A309;">Print</button>
                    <button id="sheet-clear" class="btn-secondary">Clear Sheet</button>
                </div>
                    <div id="print-area">
                        <div class="sheet-title-band">
                            <span class="sheet-building">Select Building...</span>
                            <span class="sheet-title-big">Monthly Layer Report</span>
                        </div>
                    <div class="spreadsheet-wrap">
                        <table class="spreadsheet" id="spreadsheet"></table>
                    </div>
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
                    if (c === 0) {
                        val = '';
                    }
                    html += `<td tabindex="0" draggable="false" data-row="${r}" data-col="${c}">${val}</td>`;
                }
                html += '</tr>';
            }
            html += '</tbody>';
            sheet.innerHTML = html;
        }

        function updateSheetDates() {
            const dateInput = document.getElementById('filter-date');
            if (!dateInput || !dateInput.value) return;

            const selectedDate = new Date(dateInput.value + 'T00:00:00');
            const year = selectedDate.getFullYear();
            const month = selectedDate.getMonth();
            const daysInMonth = new Date(year, month + 1, 0).getDate();

            const rows = sheet.tBodies[0].rows;
            for (let r = 0; r < rows.length; r++) {
                const cell = rows[r].cells[0];
                if (!cell) continue;
                if (r < daysInMonth) {
                    const day = r + 1;
                    cell.textContent = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
                } else {
                    cell.textContent = '';
                }
            }

            updateSheetAges();
        }

        function updateSheetAges() {
            const ageInput = document.getElementById('filter-age');
            if (!ageInput || !ageInput.value) return;

            const match = ageInput.value.trim().match(/^(\d+)-(\d+)$/);
            if (!match) return;

            let weeks = parseInt(match[1], 10);
            let days = parseInt(match[2], 10);

            if (days > 6) days = 6;

            const rows = sheet.tBodies[0].rows;
            const dateColIndex = 0;
            const ageColIndex = 1;

            let dateCount = 0;
            for (let r = 0; r < rows.length; r++) {
                const dateCell = rows[r].cells[dateColIndex];
                if (dateCell && dateCell.textContent.trim()) {
                    dateCount++;
                }
            }

            const targetRows = dateCount > 0 ? dateCount : rows.length;

            for (let r = 0; r < rows.length; r++) {
                const ageCell = rows[r].cells[ageColIndex];
                if (!ageCell) continue;

                if (r < targetRows) {
                    ageCell.textContent = `${weeks}-${days}`;
                    days++;
                    if (days > 6) {
                        days = 0;
                        weeks++;
                    }
                } else {
                    ageCell.textContent = '';
                }
            }

            highlightAgeZeroRows();
        }

        function highlightAgeZeroRows() {
            const rows = sheet.tBodies[0].rows;
            const ageColIndex = 1;
            for (let r = 0; r < rows.length; r++) {
                const ageCell = rows[r].cells[ageColIndex];
                if (!ageCell) continue;
                const ageVal = ageCell.textContent.trim();
                if (ageVal && ageVal.endsWith('-0')) {
                    rows[r].classList.add('age-zero-row');
                } else {
                    rows[r].classList.remove('age-zero-row');
                }
            }
        }

        buildSheet(SHEET_ROWS);

        let selectionStart = null;
        let selectionEnd = null;
        let isSelecting = false;
        let copiedData = null;
        let copiedRange = null;

        function getCellPosition(cell) {
            if (!cell || !sheet.contains(cell)) return null;
            const row = parseInt(cell.getAttribute('data-row'), 10);
            const col = parseInt(cell.getAttribute('data-col'), 10);
            if (isNaN(row) || isNaN(col)) return null;
            return { row, col };
        }

        function clearCopiedCells() {
            sheet.querySelectorAll('.copied-cell').forEach(el => el.classList.remove('copied-cell'));
            copiedRange = null;
        }

        function setSelection(startPos, endPos) {
            clearCopiedCells();
            sheet.querySelectorAll('.selected-cell').forEach(el => el.classList.remove('selected-cell'));
            if (!startPos || !endPos) return;

            selectionStart = startPos;
            selectionEnd = endPos;

            const minRow = Math.min(startPos.row, endPos.row);
            const maxRow = Math.max(startPos.row, endPos.row);
            const minCol = Math.min(startPos.col, endPos.col);
            const maxCol = Math.max(startPos.col, endPos.col);

            const rows = sheet.tBodies[0].rows;
            for (let r = minRow; r <= maxRow && r < rows.length; r++) {
                for (let c = minCol; c <= maxCol && c < rows[r].cells.length; c++) {
                    if (rows[r].cells[c]) {
                        rows[r].cells[c].classList.add('selected-cell');
                    }
                }
            }
        }

        function getSelectedRange() {
            if (!selectionStart || !selectionEnd) return null;
            const minRow = Math.min(selectionStart.row, selectionEnd.row);
            const maxRow = Math.max(selectionStart.row, selectionEnd.row);
            const minCol = Math.min(selectionStart.col, selectionEnd.col);
            const maxCol = Math.max(selectionStart.col, selectionEnd.col);
            return { minRow, maxRow, minCol, maxCol };
        }

        function copySelection() {
            const range = getSelectedRange();
            if (!range) return;
            const rows = sheet.tBodies[0].rows;
            copiedData = [];
            clearCopiedCells();
            copiedRange = range;
            for (let r = range.minRow; r <= range.maxRow && r < rows.length; r++) {
                const rowData = [];
                for (let c = range.minCol; c <= range.maxCol && c < rows[r].cells.length; c++) {
                    rowData.push(rows[r].cells[c].textContent);
                    rows[r].cells[c].classList.add('copied-cell');
                }
                copiedData.push(rowData);
            }
        }

        function pasteSelection() {
            if (!copiedData || copiedData.length === 0) return;
            const activeCell = document.activeElement;
            if (!activeCell || !sheet.contains(activeCell)) return;
            const startPos = getCellPosition(activeCell);
            if (!startPos) return;

            clearCopiedCells();

            const rows = sheet.tBodies[0].rows;
            for (let r = 0; r < copiedData.length; r++) {
                for (let c = 0; c < copiedData[r].length; c++) {
                    const targetRow = startPos.row + r;
                    const targetCol = startPos.col + c;
                    if (targetRow < rows.length && rows[targetRow].cells[targetCol]) {
                        rows[targetRow].cells[targetCol].textContent = copiedData[r][c];
                    }
                }
            }
        }

        sheet.addEventListener('mousedown', (e) => {
            const td = e.target.closest('td');
            if (!td || !sheet.contains(td)) return;

            if (e.button === 0) {
                if (document.activeElement && sheet.contains(document.activeElement)) {
                    document.activeElement.blur();
                }

                const pos = getCellPosition(td);
                if (!pos) return;

                isSelecting = true;
                selectionStart = pos;
                selectionEnd = pos;
                setSelection(selectionStart, selectionEnd);
                
                e.preventDefault();
            }
        });

        document.addEventListener('mousemove', (e) => {
            if (!isSelecting) return;

            const targetEl = document.elementFromPoint(e.clientX, e.clientY);
            if (!targetEl) return;

            const td = targetEl.closest('td');
            if (!td || !sheet.contains(td)) return;

            const pos = getCellPosition(td);
            if (pos && selectionStart && selectionEnd && (pos.row !== selectionEnd.row || pos.col !== selectionEnd.col)) {
                selectionEnd = pos;
                setSelection(selectionStart, selectionEnd);
            }
        });

        document.addEventListener('mouseup', () => {
            if (isSelecting) {
                isSelecting = false;

                if (selectionStart && selectionEnd && 
                    selectionStart.row === selectionEnd.row && 
                    selectionStart.col === selectionEnd.col) {
                    
                    const rows = sheet.tBodies[0].rows;
                    if (rows[selectionStart.row] && rows[selectionStart.row].cells[selectionStart.col]) {
                        const td = rows[selectionStart.row].cells[selectionStart.col];
                        td.contentEditable = 'true';
                        td.focus();
                    }
                } else if (selectionStart && selectionEnd) {
                    const rows = sheet.tBodies[0].rows;
                    const r = Math.min(selectionStart.row, selectionEnd.row);
                    const c = Math.min(selectionStart.col, selectionEnd.col);
                    if (rows[r] && rows[r].cells[c]) {
                        rows[r].cells[c].focus();
                    }
                }
            }
        });

        sheet.addEventListener('keydown', (e) => {
            const td = e.target.closest('td');
            if (!td || !sheet.contains(td)) return;
            const cell = td.cellIndex;
            const row = td.parentElement;
            const bodyRows = sheet.tBodies[0].rows;
            let currentRowIndex = Array.prototype.indexOf.call(bodyRows, row);
            if (currentRowIndex < 0) return;

            const isNavigation = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Tab', 'Enter'].includes(e.key);
            const isShortcut = (e.ctrlKey || e.metaKey) && ['c', 'v', 'a'].includes(e.key.toLowerCase());
            const isDelete = e.key === 'Delete' || e.key === 'Backspace';

            if (!td.isContentEditable && isNavigation) {
                td.contentEditable = 'true';
                td.focus();
            }

            if (isNavigation) {
                e.preventDefault();
                let target = null;
                if (e.key === 'ArrowUp' && currentRowIndex > 0) target = bodyRows[currentRowIndex - 1].cells[cell];
                else if (e.key === 'ArrowDown' && currentRowIndex < bodyRows.length - 1) target = bodyRows[currentRowIndex + 1].cells[cell];
                else if (e.key === 'ArrowLeft' && cell > 0) target = row.cells[cell - 1];
                else if ((e.key === 'ArrowRight' || e.key === 'Tab') && cell < row.cells.length - 1) target = row.cells[cell + 1];
                else if (e.key === 'Enter' && currentRowIndex < bodyRows.length - 1) target = bodyRows[currentRowIndex + 1].cells[cell];
                
                if (target) {
                    target.contentEditable = 'true';
                    target.focus();
                    const pos = getCellPosition(target);
                    selectionStart = pos;
                    selectionEnd = pos;
                    setSelection(pos, pos);
                }
            }

            if (isShortcut) {
                e.preventDefault();
                if (e.key.toLowerCase() === 'c') copySelection();
                if (e.key.toLowerCase() === 'v') pasteSelection();
                if (e.key.toLowerCase() === 'a') {
                    const rows = sheet.tBodies[0].rows;
                    const lastRow = rows.length - 1;
                    const lastCol = rows[0].cells.length - 1;
                    selectionStart = { row: 0, col: 0 };
                    selectionEnd = { row: lastRow, col: lastCol };
                    setSelection(selectionStart, selectionEnd);
                }
            }

            if (isDelete) {
                const range = getSelectedRange();
                if (range) {
                    e.preventDefault();
                    const rows = sheet.tBodies[0].rows;
                    for (let r = range.minRow; r <= range.maxRow && r < rows.length; r++) {
                        for (let c = range.minCol; c <= range.maxCol && c < rows[r].cells.length; c++) {
                            if (rows[r].cells[c]) rows[r].cells[c].textContent = '';
                        }
                    }
                }
            }
        });

        sheet.addEventListener('focusin', (e) => {
            const td = e.target.closest('td');
            if (!td || !sheet.contains(td)) return;
            const tbl = sheet;
            const cell = td.cellIndex;
            const row = td.parentElement;
            const bodyRows = tbl.tBodies[0].rows;
            let currentRowIndex = -1;
            for (let i = 0; i < bodyRows.length; i++) {
                if (bodyRows[i] === row) {
                    currentRowIndex = i;
                    break;
                }
            }
            if (currentRowIndex < 0) return;

            tbl.querySelectorAll('.hl-col').forEach(el => el.classList.remove('hl-col'));
            tbl.querySelectorAll('.hl-row').forEach(el => el.classList.remove('hl-row'));
            row.classList.add('hl-row');
            if (tbl.tHead && tbl.tHead.rows[0] && tbl.tHead.rows[0].cells[cell]) {
                tbl.tHead.rows[0].cells[cell].classList.add('hl-col');
            }
            for (const bodyRow of bodyRows) {
                if (bodyRow.cells[cell]) bodyRow.cells[cell].classList.add('hl-col');
            }
        });

        document.getElementById('sheet-clear').onclick = () => {
            sheet.tBodies[0].querySelectorAll('td').forEach(td => td.textContent = '');
        };

        const handlePrint = () => {
            const buildingSelect = document.getElementById('filter-buidling');
            const buildingNameEl = document.querySelector('.sheet-building');
            if (buildingSelect && buildingNameEl) {
                const selectedOption = buildingSelect.options[buildingSelect.selectedIndex];
                const buildingVal = selectedOption ? selectedOption.textContent.trim() : '';
                buildingNameEl.textContent = buildingVal || 'Select Building...';
            }
            window.print();
        };

        const buildingSelect = document.getElementById('filter-buidling');
        const buildingNameEl = document.querySelector('.sheet-building');
        if (buildingSelect && buildingNameEl) {
            fetch('/api/layer-buildings-reports/buildings/active', { headers: getAuthHeaders() })
                .then(res => res.ok ? res.json() : [])
                .then(buildings => {
                    if (Array.isArray(buildings)) {
                        buildings.forEach(building => {
                            const option = document.createElement('option');
                            option.value = building.building_id || building.id || building.name;
                            option.textContent = building.building_name || building.name || building.building_id;
                            buildingSelect.appendChild(option);
                        });
                    }
                })
                .catch(err => console.error('Failed to load buildings', err));

            buildingSelect.addEventListener('change', () => {
                const selectedOption = buildingSelect.options[buildingSelect.selectedIndex];
                const buildingVal = selectedOption ? selectedOption.textContent.trim() : '';
                buildingNameEl.textContent = buildingVal || 'Select Building...';
            });
        }

        const dateInput = document.getElementById('filter-date');
        if (dateInput) {
            dateInput.addEventListener('change', updateSheetDates);
        }

        const ageInput = document.getElementById('filter-age');
        if (ageInput) {
            ageInput.addEventListener('input', updateSheetAges);
        }

        document.getElementById('print-age-btn').onclick = handlePrint;

        document.getElementById('back-to-buildings-btn').onclick = () => {
            switchTab('operations-layer-buildings');
        };
    };

function initializeModule(contentArea) {
    const currentTab = window.__currentTabId || 'operations';
    const render = ModuleComponents[currentTab] || ModuleComponents['operations'];
    render(contentArea);
}
