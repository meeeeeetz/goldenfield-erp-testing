if (typeof ModuleComponents === 'undefined') { window.ModuleComponents = {}; }

ModuleComponents['finance-check-management'] = (container) => {
    container.innerHTML = `
        <div class="module-dashboard">
            <div class="header-actions">
                <h2>Check Management</h2>
            </div>
            <style>
                .btn-reconcile-check:hover {
                    background: #e6e600 !important;
                    border-color: #e6e600 !important;
                }
                .btn-void-check:hover {
                    background: #a93226 !important;
                    border-color: #a93226 !important;
                }
            </style>
            <div class="action-buttons-row">
                <button id="register-checks-btn" class="btn-icon-circle">
                    <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                    <span class="btn-label">Register Checks</span>
                </button>
                <button id="upload-check-btn" class="btn-icon-circle btn-upload-db">
                    <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line></svg>
                    <span class="btn-label">Upload Check</span>
                </button>
            </div>
            <div class="card graph-placeholder" style="margin-top: 24px;">
                <div style="display: flex; justify-content: space-between; align-items: center; width: 100%;">
                    <h3>Checks History</h3>
                    <div>
                        <label for="bank-account-filter" style="font-size: 14px; color: #555; margin-right: 8px;">Bank account</label>
                        <select id="bank-account-filter" style="padding: 6px 12px; border-radius: 6px; border: 1px solid #ddd; font-size: 14px;">
                            <option value="">All Accounts</option>
                            <option value="2029123123">PNB - 2029123123</option>
                            <option value="1234-1234-1234">BDO - 1234-1234-1234</option>
                            <option value="8655-4555-4444-34">MBTC - 8655-4555-4444-34</option>
                            <option value="1235-9456-7345">BDO 2 - 1235-9456-7345</option>
                        </select>
                    </div>
                </div>
                <div class="table-wrap">
                    <table class="data-table product-table">
                        <thead>
                            <tr>
                                <th>Check Number</th>
                                <th>Date</th>
                                <th>Recipient</th>
                                <th>Account number</th>
                                <th>Amount</th>
                                <th>Remarks</th>
                                <th>Status</th>
                                <th>Link to passbook</th>
                                <th>Reconcile Check</th>
                                <th>Void Check</th>
                            </tr>
                        </thead>
                        <tbody id="checks-history-body">
                            ${Array.from({ length: 12 }).map(() => `
                                <tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr>
                            `).join('')}
                        </tbody>
                    </table>
                </div>
                <div class="pagination">
                    <button class="page-btn">&laquo; Prev</button>
                    <button class="page-btn active">1</button>
                    <button class="page-btn">2</button>
                    <button class="page-btn">Next &raquo;</button>
                </div>
            </div>

            <div id="upload-check-modal" class="modal" style="display:none;">
                <div class="modal-content" style="max-width: 1100px; width: 95%;">
                    <div class="modal-header-row">
                        <h3>Upload Check</h3>
                        <button class="modal-close-btn" id="close-upload-check-modal">&times;</button>
                    </div>
                    <div style="display: flex; gap: 20px; flex-wrap: wrap; align-items: flex-start;">
                        <div style="flex: 1 1 360px; min-width: 0;">
                            <div id="upload-check-dropzone" style="display: flex; flex-direction: column; align-items: center; justify-content: center; width: 100%; min-height: 220px; border: 2px dashed #bbb; border-radius: 8px; cursor: pointer; transition: all 0.2s ease; text-align: center; padding: 22px; color: #555;">
                                <svg viewBox="0 0 24 24" width="48" height="48" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" style="color: #888; margin-bottom: 8px;"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line></svg>
                                <p style="margin: 0; font-size: 14px; color: #555; font-weight: 600;">Drag & Drop Check File (CSV)</p>
                                <p style="margin: 4px 0 0; font-size: 12px; color: #888;">or click to browse</p>
                                <p style="margin: 8px 0 0; font-size: 11px; color: #aaa;">Use the template from Download Template</p>
                            </div>
                            <input type="file" id="upload-check-file-input" accept=".csv,text/csv" style="display: none;">
                            <div id="upload-check-file-list" style="margin-top: 12px;"></div>
                            <div id="upload-check-validation" style="margin-top: 10px; font-size: 13px;"></div>
                        </div>
                        <div style="flex: 2 1 520px; min-width: 0;">
                            <div style="font-size: 14px; font-weight: 700; color: #1a1f2e; margin-bottom: 8px;">Preview</div>
                            <div id="upload-check-preview" style="max-height: 360px; overflow: auto; border: 1px solid #eee; border-radius: 8px; padding: 4px;">
                                <div style="padding: 16px; text-align: center; color: #999; font-size: 13px;">Upload a CSV file to preview the data here.</div>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button class="btn-primary" id="download-check-template-btn" style="background: #fff; color: #1a5e1a; border: 1px solid #1a5e1a; padding: 10px 20px; border-radius: 6px; font-weight: 600; cursor: pointer; display: inline-flex; align-items: center; gap: 6px;">
                            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
                            Download Template
                        </button>
                        <button class="btn-primary" id="bulk-upload-check-btn" style="background: #2e7d32; color: #fff; border: none; padding: 10px 20px; border-radius: 6px; font-weight: 600; cursor: pointer;">Bulk Upload</button>
                    </div>
                </div>
            </div>

            <div id="register-check-modal" class="modal" style="display:none;">
                <div class="modal-content" style="max-width: 560px; width: 95%;">
                    <div class="modal-header-row">
                        <h3>Register Check</h3>
                        <button class="modal-close-btn" id="close-register-check-modal">&times;</button>
                    </div>
                    <div class="modal-meta-row" style="flex-direction: column; gap: 12px; margin-bottom: 8px;">
                        <div class="modal-field" style="width: 100%;">
                            <label>Bank Code:</label>
                            <select id="register-check-bank-code" class="modal-select">
                                <option value="">Select Bank Code</option>
                            </select>
                        </div>
                        <div class="modal-field" style="width: 100%;">
                            <label>Check Number:</label>
                            <input type="text" id="register-check-number" class="modal-input" placeholder="Enter check number">
                        </div>
                        <div class="modal-field" style="width: 100%;">
                            <label>Date:</label>
                            <input type="text" id="register-check-date" class="modal-input" placeholder="00/00/0000">
                        </div>
                        <div class="modal-field" style="width: 100%;">
                            <label>Recipient:</label>
                            <input type="text" id="register-check-recipient" class="modal-input" placeholder="Enter recipient">
                        </div>
                        <div class="modal-field" style="width: 100%;">
                            <label>Recipient Acct Number (if applicable):</label>
                            <input type="text" id="register-check-acct" class="modal-input" placeholder="Enter account number">
                        </div>
                        <div class="modal-field" style="width: 100%;">
                            <label>Remarks:</label>
                            <input type="text" id="register-check-remarks" class="modal-input" placeholder="Enter remarks">
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button class="btn-primary" id="save-register-check-btn" style="background: #FFD000; color: #1a1f2e; border: none; padding: 10px 20px; border-radius: 6px; font-weight: 600; cursor: pointer;">Save</button>
                    </div>
                </div>
            </div>
        </div>
    `;
};

function initializeModule(contentArea) {
    const currentTab = window.__currentTabId || 'finance';
    const render = ModuleComponents[currentTab] || ModuleComponents['finance'];
    render(contentArea);

    const uploadBtn = document.getElementById('upload-check-btn');
    const modal = document.getElementById('upload-check-modal');
    const closeBtn = document.getElementById('close-upload-check-modal');
    const dropzone = document.getElementById('upload-check-dropzone');
    const fileInput = document.getElementById('upload-check-file-input');
    const fileList = document.getElementById('upload-check-file-list');
    const bulkBtn = document.getElementById('bulk-upload-check-btn');

    if (uploadBtn && modal) {
        uploadBtn.addEventListener('click', () => {
            modal.style.display = 'flex';
        });
    }

    if (closeBtn && modal) {
        closeBtn.addEventListener('click', () => {
            modal.style.display = 'none';
        });
    }

    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) modal.style.display = 'none';
        });
    }

    if (dropzone && fileInput) {
        dropzone.addEventListener('click', () => fileInput.click());
        dropzone.addEventListener('dragover', (e) => {
            e.preventDefault();
            dropzone.style.borderColor = '#2e7d32';
            dropzone.style.background = 'rgba(46, 125, 50, 0.05)';
        });
        dropzone.addEventListener('dragleave', () => {
            dropzone.style.borderColor = '#bbb';
            dropzone.style.background = 'transparent';
        });
        dropzone.addEventListener('drop', (e) => {
            e.preventDefault();
            dropzone.style.borderColor = '#bbb';
            dropzone.style.background = 'transparent';
            if (fileInput) fileInput.files = e.dataTransfer.files;
            handleCheckFile(fileInput ? fileInput.files : []);
        });
        fileInput.addEventListener('change', () => {
            handleCheckFile(fileInput.files);
        });
    }

    const registerBtn = document.getElementById('register-checks-btn');
    const registerModal = document.getElementById('register-check-modal');
    const registerCloseBtn = document.getElementById('close-register-check-modal');
    const registerDateInput = document.getElementById('register-check-date');
    const registerSaveBtn = document.getElementById('save-register-check-btn');

    async function loadRegisterCheckBankAccounts() {
        const select = document.getElementById('register-check-bank-code');
        if (!select) return;
        select.innerHTML = '<option value="">Select Bank Code</option>';
        try {
            const res = await fetch('http://localhost:5000/api/bank-accounts');
            if (res.ok) {
                const accounts = await res.json();
                const activeAccounts = (accounts || []).filter(acc => (acc.status || '').toLowerCase() === 'active');
                select.innerHTML += activeAccounts.map(acc => {
                    return `<option value="${acc.bank_code}">${acc.bank_code}</option>`;
                }).join('');
            }
        } catch (err) {
            console.error('Failed to load bank accounts', err);
        }
    }

    if (registerBtn && registerModal) {
        registerBtn.addEventListener('click', () => {
            registerModal.style.display = 'flex';
            loadRegisterCheckBankAccounts();
        });
    }

    if (registerCloseBtn && registerModal) {
        registerCloseBtn.addEventListener('click', () => {
            registerModal.style.display = 'none';
        });
    }

    if (registerModal) {
        registerModal.addEventListener('click', (e) => {
            if (e.target === registerModal) registerModal.style.display = 'none';
        });
    }

    if (registerDateInput) {
        registerDateInput.addEventListener('input', (e) => {
            const digits = e.target.value.replace(/\D/g, '').slice(0, 8);
            const parts = [];
            if (digits.length > 0) parts.push(digits.slice(0, 2));
            if (digits.length > 2) parts.push(digits.slice(2, 4));
            if (digits.length > 4) parts.push(digits.slice(4, 8));
            e.target.value = parts.join('/');
        });
    }

    if (registerSaveBtn) {
        registerSaveBtn.addEventListener('click', async () => {
            const getVal = (id) => (document.getElementById(id)?.value || '').trim();
            const bankCode = getVal('register-check-bank-code');
            const checkNumber = getVal('register-check-number');
            const date = getVal('register-check-date');
            const recipient = getVal('register-check-recipient');
            const recipientAcct = getVal('register-check-acct');
            const remarks = getVal('register-check-remarks');

            if (!bankCode) { alert('Please select a Bank Code.'); return; }
            if (!checkNumber) { alert('Please enter a Check Number.'); return; }
            if (!date) { alert('Please enter a Date.'); return; }

            const toSqlDate = (v) => {
                const parts = v.split('/');
                if (parts.length === 3) {
                    let [mm, dd, yyyy] = parts;
                    mm = mm.padStart(2, '0');
                    dd = dd.padStart(2, '0');
                    if (yyyy.length === 2) yyyy = '20' + yyyy;
                    return `${yyyy}-${mm}-${dd}`;
                }
                return v;
            };

            try {
                const nextIdRes = await fetch('http://localhost:5000/api/check-database/next-id');
                const nextIdData = nextIdRes.ok ? await nextIdRes.json() : { check_transaction_id: 'ChkTra-000001' };

                const payload = {
                    check_transaction_id: nextIdData.check_transaction_id,
                    bank_code: bankCode,
                    check_number: checkNumber,
                    date: toSqlDate(date),
                    recipient: recipient,
                    recipient_account: recipientAcct,
                    amount: 0,
                    remarks: remarks,
                    status: 'Pending',
                    link_to_passbook: ''
                };

                const res = await fetch('http://localhost:5000/api/check-database', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload)
                });

                if (!res.ok) {
                    const errData = await res.json().catch(() => ({}));
                    throw new Error(errData.error || `Server error: ${res.status}`);
                }

                alert('Check registered successfully!');
                if (registerModal) registerModal.style.display = 'none';
            } catch (err) {
                console.error('Failed to save check:', err);
                alert('Error saving check: ' + err.message);
            }
        });
    }
    const downloadTemplateBtn = document.getElementById('download-check-template-btn');
    let checkDataRows = [];

    if (downloadTemplateBtn) {
        downloadTemplateBtn.addEventListener('click', () => {
            window.open('http://localhost:5000/api/check-database/template', '_blank');
        });
    }

    if (bulkBtn) {
        bulkBtn.addEventListener('click', async () => {
            if (!checkDataRows || checkDataRows.length === 0) {
                alert('Please upload a CSV file first before bulk uploading.');
                return;
            }
            try {
                const res = await fetch('http://localhost:5000/api/check-database/bulk', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ rows: checkDataRows })
                });
                if (!res.ok) {
                    const errData = await res.json().catch(() => ({}));
                    throw new Error(errData.error || `Server error: ${res.status}`);
                }
                const result = await res.json();
                const skippedDetails = (result.skippedRows || [])
                    .slice(0, 10)
                    .map(r => `- ${r.check_transaction_id}: ${r.error}`)
                    .join('\n');
                const more = result.skippedRows && result.skippedRows.length > 10 ? `\n...and ${result.skippedRows.length - 10} more` : '';
                alert(`Bulk upload complete: ${result.inserted} inserted, ${result.skipped} skipped.\n\nSkipped rows:\n${skippedDetails}${more}`);
                if (modal) modal.style.display = 'none';
                loadChecksHistory();
            } catch (err) {
                console.error('Bulk upload failed:', err);
                alert('Bulk upload failed: ' + err.message);
            }
        });
    }

    function renderCheckFileList(files) {
        if (!fileList) return;
        if (!files || files.length === 0) {
            fileList.innerHTML = '';
            return;
        }
        fileList.innerHTML = Array.from(files).map(f => `
            <div style="display: flex; justify-content: space-between; align-items: center; padding: 6px 10px; border: 1px solid #eee; border-radius: 6px; margin-bottom: 6px; font-size: 13px;">
                <span style="overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">${f.name}</span>
                <span style="color: #888; margin-left: 8px;">${(f.size / 1024).toFixed(1)} KB</span>
            </div>
        `).join('');
    }

    function parseCsvLine(line) {
        const result = [];
        let cur = '';
        let inQuotes = false;
        for (let i = 0; i < line.length; i++) {
            const ch = line[i];
            if (inQuotes) {
                if (ch === '"') {
                    if (line[i + 1] === '"') { cur += '"'; i++; }
                    else inQuotes = false;
                } else cur += ch;
            } else {
                if (ch === '"') inQuotes = true;
                else if (ch === ',') { result.push(cur); cur = ''; }
                else cur += ch;
            }
        }
        result.push(cur);
        return result;
    }

    function isValidDate(v) {
        const trimmed = String(v || '').trim();
        if (trimmed === '00/00/0000') return true;
        const m = trimmed.match(/^(\d{1,2})\/(\d{1,2})\/(\d{2,4})$/);
        if (!m) return false;
        let [_, mm, dd, yyyy] = m;
        mm = parseInt(mm, 10); dd = parseInt(dd, 10);
        yyyy = parseInt(yyyy.length === 2 ? '20' + yyyy : yyyy, 10);
        if (mm < 1 || mm > 12 || dd < 1 || dd > 31) return false;
        if (yyyy < 1900 || yyyy > 9999) return false;
        const d = new Date(yyyy, mm - 1, dd);
        return d.getFullYear() === yyyy && d.getMonth() === mm - 1 && d.getDate() === dd;
    }

    function validateCheckRow(row) {
        const errors = [];
        const get = (k) => (row[k] != null ? String(row[k]).trim() : '');
        if (!get('bank_code')) errors.push('bank_code required');
        if (!get('check_number')) errors.push('check_number required');
        const dateVal = get('date');
        if (!dateVal || dateVal === '00/00/0000') {
            // 00/00/0000 means no date - valid placeholder
        } else if (!isValidDate(dateVal)) {
            errors.push('date must be MM/DD/YYYY or 00/00/0000');
        }
        if (!get('recipient')) errors.push('recipient required');
        const amount = get('amount');
        if (amount && isNaN(parseFloat(amount.replace(/,/g, '')))) errors.push('amount must be numeric');
        const status = get('status');
        if (!status) errors.push('status required');
        return errors;
    }

    function handleCheckFile(files) {
        renderCheckFileList(files);
        const preview = document.getElementById('upload-check-preview');
        const validationBox = document.getElementById('upload-check-validation');
        if (!preview) return;
        const file = files && files.length ? files[0] : null;
        if (!file) {
            preview.innerHTML = '<div style="padding: 16px; text-align: center; color: #999; font-size: 13px;">Upload a CSV file to preview the data here.</div>';
            if (validationBox) validationBox.innerHTML = '';
            return;
        }
        if (!/\.csv$/i.test(file.name) && file.type !== 'text/csv') {
            preview.innerHTML = '<div style="padding: 16px; text-align: center; color: #c0392b; font-size: 13px;">Please upload a .csv file.</div>';
            if (validationBox) validationBox.innerHTML = '<span style="color:#c0392b;">Invalid file type.</span>';
            return;
        }
        const reader = new FileReader();
        reader.onload = (e) => {
            const text = e.target.result;
            const lines = text.split(/\r?\n/).filter(l => l.trim() !== '');
            if (lines.length === 0) {
                preview.innerHTML = '<div style="padding: 16px; text-align: center; color: #999;">File is empty.</div>';
                return;
            }
            const headers = parseCsvLine(lines[0]).map(h => h.trim());
            const expected = ['bank_code', 'check_number', 'date', 'recipient', 'recipient_account', 'amount', 'remarks', 'status', 'link_to_passbook'];
            const missingCols = expected.filter(h => !headers.includes(h));
            const dataRows = lines.slice(1).map(l => {
                const cells = parseCsvLine(l);
                const obj = {};
                headers.forEach((h, i) => { obj[h] = cells[i] != null ? cells[i] : ''; });
                return obj;
            });
            checkDataRows = dataRows;
            let totalErrors = 0;
            const bodyRows = dataRows.map((row, idx) => {
                const errors = validateCheckRow(row);
                totalErrors += errors.length;
                const cell = (k) => {
                    const val = row[k] != null ? row[k] : '';
                    const bad = (k === 'date' && val && !isValidDate(val)) ||
                                (k === 'amount' && val && isNaN(parseFloat(String(val).replace(/,/g, '')))) ||
                                ((k === 'bank_code' || k === 'check_number' || k === 'recipient' || k === 'status') && !String(val).trim());
                    return `<td style="border:1px solid #eee; padding:4px 6px; font-size:12px; ${bad ? 'background:#fdecea; color:#c0392b;' : ''}">${val}</td>`;
                };
                return `<tr style="${errors.length ? 'background:#fff6f6;' : ''}">
                    <td style="border:1px solid #eee; padding:4px 6px; font-size:12px; text-align:center;">${idx + 1}</td>
                    ${cell('bank_code')}${cell('check_number')}${cell('date')}${cell('recipient')}${cell('recipient_account')}${cell('amount')}${cell('remarks')}${cell('status')}${cell('link_to_passbook')}
                    <td style="border:1px solid #eee; padding:4px 6px; font-size:12px; color:${errors.length ? '#c0392b' : '#2e7d32'};">${errors.length ? errors.join('; ') : 'OK'}</td>
                </tr>`;
            }).join('');
            let warnHtml = '';
            if (missingCols.length) warnHtml = `<div style="color:#c0392b; margin-bottom:6px;">Missing columns: ${missingCols.join(', ')}</div>`;
            preview.innerHTML = `
                <table style="width:100%; border-collapse:collapse; font-size:12px;">
                    <thead><tr style="background:#FFD000;">
                        <th style="border:1px solid #eee; padding:4px 6px;">#</th>
                        ${headers.map(h => `<th style="border:1px solid #eee; padding:4px 6px;">${h}</th>`).join('')}
                        <th style="border:1px solid #eee; padding:4px 6px;">Validation</th>
                    </tr></thead>
                    <tbody>${bodyRows}</tbody>
                </table>`;
            if (validationBox) {
                validationBox.innerHTML = warnHtml + (totalErrors === 0
                    ? `<span style="color:#2e7d32; font-weight:600;">All ${dataRows.length} row(s) valid.</span>`
                    : `<span style="color:#c0392b; font-weight:600;">${totalErrors} issue(s) found in ${dataRows.length} row(s).</span>`);
            }
        };
        reader.readAsText(file);
    }

    const bankAccountFilter = document.getElementById('bank-account-filter');
    const checksHistoryBody = document.getElementById('checks-history-body');

    async function loadBankAccountFilter() {
        if (!bankAccountFilter) return;
        bankAccountFilter.innerHTML = '<option value="">All Accounts</option>';
        try {
            const res = await fetch('http://localhost:5000/api/bank-accounts');
            if (res.ok) {
                const accounts = await res.json();
                const activeAccounts = (accounts || []).filter(acc => (acc.status || '').toLowerCase() === 'active');
                bankAccountFilter.innerHTML += activeAccounts.map(acc => {
                    return `<option value="${acc.bank_code}">${acc.bank_code}</option>`;
                }).join('');
            }
        } catch (err) {
            console.error('Failed to load bank account filter', err);
        }
    }

    async function loadChecksHistory() {
        if (!checksHistoryBody) return;
        const bankCode = bankAccountFilter ? bankAccountFilter.value : '';
        try {
            const url = bankCode
                ? `http://localhost:5000/api/check-database?bank_code=${encodeURIComponent(bankCode)}`
                : 'http://localhost:5000/api/check-database';
            const res = await fetch(url);
            if (!res.ok) return;
            const checks = await res.json();
            if (!checks || checks.length === 0) {
                checksHistoryBody.innerHTML = '<tr><td colspan="10" style="text-align: center; padding: 12px; color: #999;">No records found</td></tr>';
                return;
            }
            checksHistoryBody.innerHTML = checks.map(c => {
                const date = c.date ? new Date(c.date).toLocaleDateString('en-US', { timeZone: 'UTC' }) : '';
                const amount = (c.amount != null) ? Number(c.amount).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : '';
                return `
                    <tr>
                        <td>${c.check_number || ''}</td>
                        <td>${date}</td>
                        <td>${c.recipient || ''}</td>
                        <td>${c.recipient_account || ''}</td>
                        <td>${amount}</td>
                        <td>${c.remarks || ''}</td>
                        <td>${c.status || ''}</td>
                        <td>${c.link_to_passbook ? `<a href="#" style="color: #a88805;">View</a>` : ''}</td>
                        <td><button class="btn-reconcile-check" data-id="${c.check_transaction_id}" style="padding: 6px 14px; border: 1px solid #FFFF33; background: #FFFF33; color: #1a1f2e; border-radius: 20px; cursor: pointer; font-size: 12px; font-weight: 600;">Reconcile Check</button></td>
                        <td><button class="btn-void-check" data-id="${c.check_transaction_id}" style="padding: 6px 14px; border: 1px solid #c0392b; background: #c0392b; color: #fff; border-radius: 20px; cursor: pointer; font-size: 12px;">Void Check</button></td>
                    </tr>
                `;
            }).join('');
        } catch (err) {
            console.error('Failed to load checks history', err);
        }
    }

    if (bankAccountFilter) {
        bankAccountFilter.addEventListener('change', loadChecksHistory);
    }

    if (checksHistoryBody) {
        checksHistoryBody.addEventListener('click', async (e) => {
            const reconcileBtn = e.target.closest('.btn-reconcile-check');
            const voidBtn = e.target.closest('.btn-void-check');
            if (reconcileBtn) {
                const id = reconcileBtn.getAttribute('data-id');
                alert('Reconcile Check functionality coming soon for ' + id);
            }
            if (voidBtn) {
                const id = voidBtn.getAttribute('data-id');
                if (!confirm('Are you sure you want to void check ' + id + '?')) return;
                alert('Void Check functionality coming soon for ' + id);
            }
        });
    }

    loadBankAccountFilter();
    loadChecksHistory();
}
