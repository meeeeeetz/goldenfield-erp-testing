if (typeof ModuleComponents === 'undefined') { window.ModuleComponents = {}; }

ModuleComponents['finance-bank-statement'] = (container) => {
    container.innerHTML = `
        <div class="module-dashboard">
            <div class="header-actions">
                <h2>Bank Statement</h2>
            </div>
            <div class="action-buttons-row">
                <button id="upload-passbook-btn" class="btn-icon-circle">
                    <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line></svg>
                    <span class="btn-label">Upload Passbook</span>
                </button>
                <button id="bulk-upload-statement-btn" class="btn-icon-circle" style="background: #1ea672; color: #fff;">
                    <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line></svg>
                    <span class="btn-label">Bulk Upload Statement</span>
                </button>
            </div>
            <div class="card graph-placeholder" style="margin-top: 24px; padding: 8px 12px; min-height: auto;">
                <div style="display: flex; gap: 16px; align-items: center; flex-wrap: wrap; margin-top: 0;">
                    <div>
                        <label for="bank-account-select" style="font-size: 18px; font-weight: 800; color: #1a1f2e; margin-right: 8px; text-align: center;">Bank account:</label>
                        <select id="bank-account-select" style="padding: 6px 12px; border-radius: 6px; border: 1px solid #ddd; font-size: 14px;">
                            <option value="">Select Bank</option>
                        </select>
                    </div>
                    <div>
                        <label for="passbook-no-select" style="font-size: 18px; font-weight: 800; color: #1a1f2e; margin-right: 8px; text-align: center;">Passbook No.:</label>
                        <select id="passbook-no-select" style="padding: 6px 12px; border-radius: 6px; border: 1px solid #ddd; font-size: 14px;">
                            <option value="">Select Passbook</option>
                        </select>
                    </div>
                    <div>
                        <label for="page-no-select" style="font-size: 18px; font-weight: 800; color: #1a1f2e; margin-right: 8px; text-align: center;">Page No.:</label>
                        <select id="page-no-select" style="padding: 6px 12px; border-radius: 6px; border: 1px solid #ddd; font-size: 14px;">
                            <option value="">Select Page</option>
                        </select>
                    </div>
                </div>
            </div>
            <div class="card" style="margin-top: 24px;">
                <h3 style="margin: 0 0 12px; font-size: 18px; font-weight: 800; color: #1a1f2e;">Pages Needing Photos</h3>
                <div id="pages-needing-photos" style="max-height: 260px; overflow: auto; border: 1px solid #ddd; border-radius: 6px; padding: 8px; background: #fafafa;">
                    <span style="color: #999; font-size: 13px;">Loading...</span>
                </div>
            </div>
            <div style="display: flex; gap: 24px; margin-top: 24px; flex-wrap: wrap;">
                <div class="card" style="flex: 2; min-width: 0; padding: 16px; display: flex; flex-direction: column;">
                    <h3 style="margin: 0 0 12px; font-size: 18px; font-weight: 800; color: #1a1f2e;">Passbook Image</h3>
                    <div id="passbook-image-box" style="display: flex; align-items: center; justify-content: center; width: 100%; flex: 1; min-height: 220px; border: 2px dashed #ccc; border-radius: 8px; color: #888; font-size: 14px; overflow: hidden;">
                        Space for a photo
                    </div>
                </div>
                <div class="card" style="flex: 3; min-width: 0; padding: 16px;">
                    <h3 style="margin: 0 0 12px; font-size: 18px; font-weight: 800; color: #1a1f2e;">Passbook Details</h3>
                <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
                    <thead>
                        <tr style="background: #f4f5f7;">
                            <th style="border: 1px solid #ddd; padding: 5px; text-align: center; line-height: 1.4; font-size: 14px; font-weight: 700; width: 40px;">#</th>
                            <th style="border: 1px solid #ddd; padding: 5px; text-align: center; line-height: 1.4; font-size: 14px; font-weight: 700;">Date</th>
                            <th style="border: 1px solid #ddd; padding: 5px; text-align: center; line-height: 1.4; font-size: 14px; font-weight: 700;">Debit</th>
                            <th style="border: 1px solid #ddd; padding: 5px; text-align: center; line-height: 1.4; font-size: 14px; font-weight: 700;">Credit</th>
                            <th style="border: 1px solid #ddd; padding: 5px; text-align: center; line-height: 1.4; font-size: 14px; font-weight: 700;">Balance</th>
                            <th style="border: 1px solid #ddd; padding: 5px; text-align: center; line-height: 1.4; font-size: 14px; font-weight: 700; width: 80px;">Action</th>
                        </tr>
                    </thead>
                    <tbody id="passbook-details-body">
                    </tbody>
                </table>
                </div>
            </div>

        <div id="upload-passbook-modal" class="modal" style="display:none;">
            <div class="modal-content passbook-modal-content">
                <div class="modal-header-row">
                    <h3>Upload Passbook</h3>
                    <button class="modal-close-btn" id="close-passbook-modal">&times;</button>
                </div>
                <div class="modal-meta-row">
                    <div class="modal-field">
                        <label>Bank Code:</label>
                        <select id="passbook-bank-code" class="modal-select">
                            <option value="">Select Bank Code</option>
                        </select>
                    </div>
                    <button class="icon-btn" id="new-passbook-btn" title="New Passbook">
                        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                    </button>
                    <div class="modal-field">
                        <label>Book No.:</label>
                        <input type="text" id="passbook-book-no" readonly>
                    </div>
                    <div class="modal-field">
                        <label>Page No.:</label>
                        <input type="text" id="passbook-page-no" value="PG-001" readonly>
                    </div>
                    <div class="modal-field">
                        <label>Last Page Balance:</label>
                        <input type="text" id="passbook-last-balance">
                    </div>
                </div>
                <div class="passbook-modal-body">
                    <div class="passbook-upload-area" id="passbook-upload-area">
                        <div class="upload-zone" id="upload-zone">
                            <svg viewBox="0 0 24 24" width="48" height="48" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" style="color: #888; margin-bottom: 8px;"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line></svg>
                            <p style="margin: 0; font-size: 14px; color: #555; font-weight: 600;">Drag & Drop Passbook Image</p>
                            <p style="margin: 4px 0 0; font-size: 12px; color: #888;">or click to browse</p>
                            <p style="margin: 8px 0 0; font-size: 11px; color: #aaa;">JPG or PNG, max 5MB</p>
                        </div>
                        <input type="file" id="passbook-file-input" accept="image/jpeg,image/png,image/jpg" style="display: none;">
                        <div class="image-preview" id="image-preview" style="display: none;">
                            <img id="preview-img" src="" alt="Passbook Preview" style="max-width: 100%; max-height: 100%; object-fit: contain; border-radius: 6px;">
                            <button class="remove-image-btn" id="remove-image-btn" title="Remove image">&times;</button>
                        </div>
                    </div>
                    <div class="passbook-spreadsheet">
                <table class="passbook-table">
                        <thead>
                            <tr>
                                <th style="width: 28px;">#</th>
                                <th>Date</th>
                                <th>Debit</th>
                                <th>Credit</th>
                                <th>Balance</th>
                            </tr>
                        </thead>
                            <tbody>
                                ${Array.from({ length: 25 }).map((_, i) => `
                                    <tr>
                                        <td class="row-num">${i + 1}</td>
                                        <td><input type="text" class="spreadsheet-input" placeholder="MM/DD/YYYY"></td>
                                        <td><input type="text" class="spreadsheet-input" placeholder="0.00" inputmode="decimal"></td>
                                        <td><input type="text" class="spreadsheet-input" placeholder="0.00" inputmode="decimal"></td>
                                        <td><input type="text" class="spreadsheet-input balance-input" placeholder="0.00" readonly tabindex="-1"></td>
                                    </tr>
                                `).join('')}
                            </tbody>
                        </table>
                    </div>
                </div>
                <div class="modal-footer">
                    <button class="btn-primary" id="save-passbook-btn" style="background: #FFD000; color: #1a1f2e; border: none; padding: 10px 20px; border-radius: 6px; font-weight: 600; cursor: pointer;">Save Passbook</button>
                </div>
            </div>
        </div>

        <div id="bulk-upload-modal" class="modal" style="display:none;">
            <div class="modal-content" style="max-width: 720px; width: 95%;">
                <div class="modal-header-row">
                    <h3>Bulk Upload Bank Statement</h3>
                    <div style="display: flex; gap: 8px; align-items: center;">
                        <button id="download-template-btn" style="font-size: 13px; padding: 4px 10px; border-radius: 4px; border: 1px solid #1ea672; background: #1ea672; color: #fff; cursor: pointer;">Download Template</button>
                        <button class="modal-close-btn" id="close-bulk-upload-modal">&times;</button>
                    </div>
                </div>
                <div class="modal-body">
                    <div class="form-group">
                        <label>Upload CSV File</label>
                        <input type="file" id="bulk-statement-file-input" accept=".csv,.txt" style="padding: 8px; border: 1px solid #D6D6D6; border-radius: 6px; font-size: 14px;">
                    </div>
                    <div class="form-group">
                        <label>Preview</label>
                        <div id="bulk-statement-preview" style="max-height: 260px; overflow: auto; border: 1px solid #ddd; border-radius: 6px; padding: 8px; background: #fafafa;">
                            <span style="color: #999; font-size: 13px;">No file selected</span>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button class="btn-primary" id="save-bulk-statement-btn" style="background: #1ea672; color: #fff; border: none; padding: 10px 20px; border-radius: 6px; font-weight: 600; cursor: pointer;">Import</button>
                </div>
            </div>
        </div>

        <div id="upload-photo-modal" class="modal" style="display:none;">
            <div class="modal-content" style="max-width: 800px; width: 95%;">
                <div class="modal-header-row">
                    <h3>Upload photos only</h3>
                    <button class="modal-close-btn" id="close-upload-photo-modal">&times;</button>
                </div>
                <div class="modal-body">
                    <div class="form-group">
                        <label>Page</label>
                        <input type="text" id="upload-photo-page-info" readonly>
                        <input type="hidden" id="upload-photo-bank-code">
                        <input type="hidden" id="upload-photo-book-no">
                        <input type="hidden" id="upload-photo-page-no">
                    </div>
                    <div style="display: flex; gap: 16px; flex-wrap: wrap;">
                        <div class="form-group" style="flex: 1; min-width: 240px;">
                            <label>Passbook Image</label>
                            <div class="passbook-upload-area" id="passbook-upload-area-2">
                                <div class="upload-zone" id="upload-zone-2">
                                    <svg viewBox="0 0 24 24" width="48" height="48" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" style="color: #888; margin-bottom: 8px;"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line></svg>
                                    <p style="margin: 0; font-size: 14px; color: #555; font-weight: 600;">Drag & Drop Passbook Image</p>
                                    <p style="margin: 4px 0 0; font-size: 12px; color: #888;">or click to browse</p>
                                    <p style="margin: 8px 0 0; font-size: 11px; color: #aaa;">JPG or PNG, max 5MB</p>
                                </div>
                                <input type="file" id="passbook-file-input-2" accept="image/jpeg,image/png,image/jpg" style="display: none;">
                                <div class="image-preview" id="image-preview-2" style="display: none;">
                                    <img id="preview-img-2" src="" alt="Passbook Preview" style="max-width: 100%; max-height: 100%; object-fit: contain; border-radius: 6px;">
                                    <button class="remove-image-btn" id="remove-image-btn-2" title="Remove image">&times;</button>
                                </div>
                            </div>
                        </div>
                        <div class="form-group" style="flex: 1; min-width: 240px;">
                            <label>Page Details</label>
                            <div id="page-details-box" style="border: 1px solid #ddd; border-radius: 6px; padding: 8px; background: #fafafa;">
                                <span style="color: #999; font-size: 13px;">Loading...</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button class="btn-primary" id="save-photo-btn" style="background: #FFD000; color: #1a1f2e; border: none; padding: 10px 20px; border-radius: 6px; font-weight: 600; cursor: pointer;">Save Photo</button>
                </div>
            </div>
        </div>
    `;
};

function initializeModule(contentArea) {
    const currentTab = window.__currentTabId || 'finance';
    const render = ModuleComponents[currentTab] || ModuleComponents['finance'];
    render(contentArea);

    const bankAccountSelect = document.getElementById('bank-account-select');
    const passbookNoSelect = document.getElementById('passbook-no-select');
    const pageNoSelect = document.getElementById('page-no-select');

    async function loadBankAccounts() {
        if (!bankAccountSelect) return;
        try {
            const res = await fetch('/api/passbook-statements/distinct-bank-codes');
            if (res.ok) {
                const data = await res.json();
                bankAccountSelect.innerHTML = '<option value="">Select Bank</option>' +
                    (data.bank_codes || []).map(code => `<option value="${code}">${code}</option>`).join('');
            }
        } catch (err) {
            console.error('Failed to load bank accounts', err);
        }
    }

    async function loadPassbooks(bankCode) {
        if (!passbookNoSelect) return;
        passbookNoSelect.innerHTML = '<option value="">Select Passbook</option>';
        if (!bankCode) return;
        try {
            const res = await fetch(`/api/passbook-statements/distinct-book-nos?bankCode=${encodeURIComponent(bankCode)}`);
            if (res.ok) {
                const data = await res.json();
                passbookNoSelect.innerHTML += (data.book_nos || []).map(b => `<option value="${b}">${b}</option>`).join('');
            }
        } catch (err) {
            console.error('Failed to load passbooks', err);
        }
    }

    async function loadPages(bankCode, bookNo) {
        if (!pageNoSelect) return;
        pageNoSelect.innerHTML = '<option value="">Select Page</option>';
        if (!bankCode || !bookNo) return;
        try {
            const res = await fetch(`/api/passbook-statements/distinct-page-nos?bankCode=${encodeURIComponent(bankCode)}&bookNo=${encodeURIComponent(bookNo)}`);
            if (res.ok) {
                const data = await res.json();
                pageNoSelect.innerHTML += (data.page_nos || []).map(p => `<option value="${p}">${p}</option>`).join('');
            }
        } catch (err) {
            console.error('Failed to load pages', err);
        }
    }

    async function loadPassbookImage(explicitBankCode, explicitBookNo, explicitPageNo) {
        const imageBox = document.getElementById('passbook-image-box');
        if (!imageBox) return;
        const bankCode = explicitBankCode || (bankAccountSelect ? bankAccountSelect.value : '');
        const bookNo = explicitBookNo || (passbookNoSelect ? passbookNoSelect.value : '');
        const pageNo = explicitPageNo || (pageNoSelect ? pageNoSelect.value : '');
        if (!bankCode || !bookNo || !pageNo) {
            imageBox.innerHTML = 'Space for a photo';
            return;
        }
        const url = `/api/passbook-statements/photo?bankCode=${encodeURIComponent(bankCode)}&bookNo=${encodeURIComponent(bookNo)}&pageNo=${encodeURIComponent(pageNo)}`;
        imageBox.innerHTML = `<img src="${url}" alt="Passbook" style="max-width: 100%; max-height: 100%; object-fit: contain; border-radius: 6px;">`;
    }

    async function loadPassbookDetails(explicitBankCode, explicitBookNo, explicitPageNo) {
        const tbody = document.getElementById('passbook-details-body');
        if (!tbody) return;
        const bankCode = explicitBankCode || (bankAccountSelect ? bankAccountSelect.value : '');
        const bookNo = explicitBookNo || (passbookNoSelect ? passbookNoSelect.value : '');
        const pageNo = explicitPageNo || (pageNoSelect ? pageNoSelect.value : '');
        if (!bankCode || !bookNo || !pageNo) {
            tbody.innerHTML = '';
            return;
        }
        try {
            const res = await fetch(`/api/passbook-statements/by-code-book-page?bankCode=${encodeURIComponent(bankCode)}&bookNo=${encodeURIComponent(bookNo)}&pageNo=${encodeURIComponent(pageNo)}`);
            if (res.ok) {
                const data = await res.json();
                const statements = data.statements || [];
                if (statements.length === 0) {
                    tbody.innerHTML = '<tr><td colspan="6" style="border: 1px solid #ddd; padding: 8px; text-align: center; color: #999;">No records found</td></tr>';
                    return;
                }
                tbody.innerHTML = statements.map((s, i) => {
                    const date = s.date ? new Date(s.date).toLocaleDateString('en-US', { timeZone: 'UTC' }) : '';
                    const debit = (s.debit != null) ? Number(s.debit).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : '';
                    const credit = (s.credit != null) ? Number(s.credit).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : '';
                    const balance = (s.balance != null) ? Number(s.balance).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : '';
                    return `
                        <tr>
                            <td style="border: 1px solid #ddd; padding: 5px; height: 20px; line-height: 1.4; font-size: 14px; text-align: center;">${i + 1}</td>
                            <td style="border: 1px solid #ddd; padding: 5px; height: 20px; line-height: 1.4; font-size: 14px;">${date}</td>
                            <td style="border: 1px solid #ddd; padding: 5px; height: 20px; line-height: 1.4; font-size: 14px; text-align: right;">${debit}</td>
                            <td style="border: 1px solid #ddd; padding: 5px; height: 20px; line-height: 1.4; font-size: 14px; text-align: right;">${credit}</td>
                            <td style="border: 1px solid #ddd; padding: 5px; height: 20px; line-height: 1.4; font-size: 14px; text-align: right;">${balance}</td>
                            <td style="border: 1px solid #ddd; padding: 5px; height: 20px; line-height: 1.4; font-size: 14px; text-align: center;">
                                <button type="button" class="reconcile-btn" data-id="${s.statement_id}" style="padding: 3px 10px; border-radius: 5px; border: 1px solid #ddd; background: #FFD000; color: #1a1f2e; font-weight: 600; font-size: 12px; cursor: pointer;">Reconcile</button>
                            </td>
                        </tr>
                    `;
                }).join('');
            }
        } catch (err) {
            console.error('Failed to load passbook details', err);
        }
    }

    async function loadPagesNeedingPhotos() {
        const container = document.getElementById('pages-needing-photos');
        if (!container) return;
        try {
            const res = await fetch('/api/passbook-statements/pages-needing-photos');
            if (!res.ok) throw new Error('Failed to fetch pages');
            const data = await res.json();
            const pages = data.pages || [];
            if (pages.length === 0) {
                container.innerHTML = '<span style="color: #999; font-size: 13px;">All pages have photos</span>';
                return;
            }
            container.innerHTML = '<div style="display: flex; flex-wrap: wrap; gap: 8px;">' + pages.map(p => `
                <button class="page-attach-btn" data-bank="${encodeURIComponent(p.bankCode)}" data-book="${encodeURIComponent(p.bookNo)}" data-page="${encodeURIComponent(p.pageNo)}" style="padding: 6px 10px; border-radius: 6px; border: 1px solid #1ea672; background: #1ea672; color: #fff; font-weight: 600; font-size: 12px; cursor: pointer;">
                    ${p.bankCode} ${p.bookNo} ${p.pageNo}
                </button>
            `).join('') + '</div>';
            container.querySelectorAll('.page-attach-btn').forEach(btn => {
                btn.addEventListener('click', () => {
                    const bankCode = decodeURIComponent(btn.dataset.bank);
                    const bookNo = decodeURIComponent(btn.dataset.book);
                    const pageNo = decodeURIComponent(btn.dataset.page);
                    openPassbookModalForPage(bankCode, bookNo, pageNo);
                });
            });
        } catch (err) {
            console.error('Failed to load pages needing photos:', err);
            container.innerHTML = '<span style="color: #c0392b; font-size: 13px;">Failed to load pages</span>';
        }
    }

    async function openPassbookModalForPage(bankCode, bookNo, pageNo) {
        const modal = document.getElementById('upload-photo-modal');
        if (!modal) return;
        modal.style.display = 'flex';
        const pageInfoInput = document.getElementById('upload-photo-page-info');
        if (pageInfoInput) pageInfoInput.value = `${bankCode} ${bookNo} ${pageNo}`;
        const bankCodeInput = document.getElementById('upload-photo-bank-code');
        const bookNoInput = document.getElementById('upload-photo-book-no');
        const pageNoInput = document.getElementById('upload-photo-page-no');
        if (bankCodeInput) bankCodeInput.value = bankCode;
        if (bookNoInput) bookNoInput.value = bookNo;
        if (pageNoInput) pageNoInput.value = pageNo;
        await loadPassbookImage(bankCode, bookNo, pageNo);
        await loadPassbookDetails(bankCode, bookNo, pageNo);
        await loadPageDetailsTable(bankCode, bookNo, pageNo);
    }

    async function loadPageDetailsTable(bankCode, bookNo, pageNo) {
        const box = document.getElementById('page-details-box');
        if (!box) return;
        try {
            const res = await fetch(`/api/passbook-statements/by-code-book-page?bankCode=${encodeURIComponent(bankCode)}&bookNo=${encodeURIComponent(bookNo)}&pageNo=${encodeURIComponent(pageNo)}`);
            if (!res.ok) throw new Error('Failed to fetch page details');
            const data = await res.json();
            const statements = data.statements || [];
            if (statements.length === 0) {
                box.innerHTML = '<span style="color: #999; font-size: 13px;">No records found</span>';
                return;
            }
            let html = '<table style="width: 100%; border-collapse: collapse; font-size: 13px;"><thead><tr style="background: #f4f5f7;"><th style="border: 1px solid #ddd; padding: 4px; text-align: center;">#</th><th style="border: 1px solid #ddd; padding: 4px; text-align: center;">Date</th><th style="border: 1px solid #ddd; padding: 4px; text-align: center;">Debit</th><th style="border: 1px solid #ddd; padding: 4px; text-align: center;">Credit</th><th style="border: 1px solid #ddd; padding: 4px; text-align: center;">Balance</th></tr></thead><tbody>';
            statements.forEach((s, i) => {
                const date = s.date ? new Date(s.date).toLocaleDateString('en-US', { timeZone: 'UTC' }) : '';
                const debit = (s.debit != null) ? Number(s.debit).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : '';
                const credit = (s.credit != null) ? Number(s.credit).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : '';
                const balance = (s.balance != null) ? Number(s.balance).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : '';
                html += `<tr><td style="border: 1px solid #ddd; padding: 4px; text-align: center;">${i + 1}</td><td style="border: 1px solid #ddd; padding: 4px;">${date}</td><td style="border: 1px solid #ddd; padding: 4px; text-align: right;">${debit}</td><td style="border: 1px solid #ddd; padding: 4px; text-align: right;">${credit}</td><td style="border: 1px solid #ddd; padding: 4px; text-align: right;">${balance}</td></tr>`;
            });
            html += '</tbody></table>';
            box.innerHTML = html;
        } catch (err) {
            console.error('Failed to load page details table:', err);
            box.innerHTML = '<span style="color: #c0392b; font-size: 13px;">Failed to load page details</span>';
        }
    }

    if (bankAccountSelect) {
        bankAccountSelect.addEventListener('change', () => {
            loadPassbooks(bankAccountSelect.value);
            if (pageNoSelect) pageNoSelect.innerHTML = '<option value="">Select Page</option>';
            loadPassbookImage();
            loadPassbookDetails();
        });
    }

    if (passbookNoSelect) {
        passbookNoSelect.addEventListener('change', () => {
            loadPages(bankAccountSelect ? bankAccountSelect.value : '', passbookNoSelect.value);
            loadPassbookImage();
            loadPassbookDetails();
        });
    }

    if (pageNoSelect) {
        pageNoSelect.addEventListener('change', () => {
            loadPassbookImage();
            loadPassbookDetails();
        });
    }

    loadBankAccounts();
    loadPagesNeedingPhotos();
    const uploadBtn = document.getElementById('upload-passbook-btn');
    const modal = document.getElementById('upload-passbook-modal');
    const closeBtn = document.getElementById('close-passbook-modal');
    const uploadZone = document.getElementById('upload-zone');
    const fileInput = document.getElementById('passbook-file-input');
    const imagePreview = document.getElementById('image-preview');
    const previewImg = document.getElementById('preview-img');
    const removeImageBtn = document.getElementById('remove-image-btn');
    const newPassbookBtn = document.getElementById('new-passbook-btn');

    if (newPassbookBtn) {
        newPassbookBtn.addEventListener('click', () => {
            const bookNoInput = document.getElementById('passbook-book-no');
            if (!bookNoInput) return;
            const match = bookNoInput.value.match(/^(.*?)(\d+)$/);
            if (match) {
                const prefix = match[1];
                const num = parseInt(match[2], 10);
                const padded = String(num + 1).padStart(match[2].length, '0');
                bookNoInput.value = prefix + padded;
            } else {
                bookNoInput.value = 'PB-001';
            }
            updateNextPageNo();
        });
    }

    const bankCodeSelect = document.getElementById('passbook-bank-code');
    if (bankCodeSelect) {
        bankCodeSelect.addEventListener('change', () => {
            updateNextPageNo();
        });
    }

    const bookNoInput = document.getElementById('passbook-book-no');
    if (bookNoInput) {
        bookNoInput.addEventListener('input', () => {
            updateNextPageNo();
        });
    }

    if (uploadBtn && modal) {
        uploadBtn.addEventListener('click', async () => {
            modal.style.display = 'flex';
            await loadPassbookBankCodes();
            setPassbookDefaults();
            await updateNextPageNo();
            wireBalanceComputation();
            wireDateAutoFormat();
            recomputeBalances();
        });
    }

    function setPassbookDefaults() {
        const bookNoInput = document.getElementById('passbook-book-no');
        const pageNoInput = document.getElementById('passbook-page-no');
        const lastBalanceInput = document.getElementById('passbook-last-balance');
        if (bookNoInput && !bookNoInput.value) bookNoInput.value = 'PB-001';
        if (pageNoInput && !pageNoInput.value) pageNoInput.value = 'PG-001';
        if (lastBalanceInput && !lastBalanceInput.value) lastBalanceInput.value = '0.00';
        if (lastBalanceInput) lastBalanceInput.value = formatNumber(parseAmount(lastBalanceInput.value));
    }

    async function loadPassbookBankCodes() {
        const select = document.getElementById('passbook-bank-code');
        if (!select) return;

        try {
            const res = await fetch('/api/bank-accounts');
            if (res.ok) {
                const accounts = await res.json();
                const activeAccounts = accounts.filter(acc => acc.status === 'Active');
                select.innerHTML = '<option value="">Select Bank Code</option>' +
                    activeAccounts.map(acc => `<option value="${acc.bank_code}">${acc.bank_code}</option>`).join('');
                await updateNextPageNo();
            }
        } catch (err) {
            console.error('Failed to load bank codes', err);
        }
    }

    async function updateNextPageNo() {
        const bankCode = (document.getElementById('passbook-bank-code')?.value || '').trim();
        const bookNo = (document.getElementById('passbook-book-no')?.value || '').trim();
        const pageNoInput = document.getElementById('passbook-page-no');
        const lastBalanceInput = document.getElementById('passbook-last-balance');
        if (!pageNoInput) return;
        if (!bankCode || !bookNo) {
            pageNoInput.value = 'PG-001';
            return;
        }
        try {
            const res = await fetch(`/api/passbook-statements/next-page-no?bankCode=${encodeURIComponent(bankCode)}&bookNo=${encodeURIComponent(bookNo)}`);
            if (res.ok) {
                const data = await res.json();
                pageNoInput.value = data.page_no || 'PG-001';
            } else {
                pageNoInput.value = 'PG-001';
            }
        } catch (err) {
            console.error('Failed to get next page no', err);
            pageNoInput.value = 'PG-001';
        }

        const pageNo = pageNoInput.value;
        if (lastBalanceInput) {
            try {
                const balRes = await fetch(`/api/passbook-statements/last-page-balance?bankCode=${encodeURIComponent(bankCode)}&bookNo=${encodeURIComponent(bookNo)}&pageNo=${encodeURIComponent(pageNo)}`);
                if (balRes.ok) {
                    const balData = await balRes.json();
                    if (balData.previous_page_no && balData.last_balance !== null && balData.last_balance !== undefined) {
                        lastBalanceInput.value = formatNumber(parseAmount(balData.last_balance));
                    } else {
                        lastBalanceInput.value = formatNumber(0);
                    }
                }
            } catch (err) {
                console.error('Failed to get last page balance', err);
            }
        }
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

    if (uploadZone && fileInput) {
        uploadZone.addEventListener('click', () => fileInput.click());

        uploadZone.addEventListener('dragover', (e) => {
            e.preventDefault();
            uploadZone.classList.add('drag-over');
        });

        uploadZone.addEventListener('dragleave', () => {
            uploadZone.classList.remove('drag-over');
        });

        uploadZone.addEventListener('drop', (e) => {
            e.preventDefault();
            uploadZone.classList.remove('drag-over');
            const files = e.dataTransfer.files;
            if (files.length > 0) handlePassbookFile(files[0]);
        });

        fileInput.addEventListener('change', (e) => {
            if (e.target.files.length > 0) handlePassbookFile(e.target.files[0]);
        });
    }

    if (removeImageBtn) {
        removeImageBtn.addEventListener('click', () => {
            fileInput.value = '';
            previewImg.src = '';
            imagePreview.style.display = 'none';
            uploadZone.style.display = 'flex';
        });
    }

    const saveBtn = document.getElementById('save-passbook-btn');
    if (saveBtn) {
        saveBtn.addEventListener('click', async () => {
            const bankCode = (document.getElementById('passbook-bank-code')?.value || '').trim();
            const bookNo = document.getElementById('passbook-book-no')?.value;
            const pageNo = document.getElementById('passbook-page-no')?.value;
            const lastBalance = document.getElementById('passbook-last-balance')?.value || '0.00';

            if (!bankCode) {
                alert('Please select a Bank Code before saving.');
                return;
            }

            if (!previewImg.src || previewImg.style.display === 'none') {
                alert('Please upload a passbook image.');
                return;
            }

            const rows = [];
            const inputs = document.querySelectorAll('.spreadsheet-input');
            const colsPerRow = 4;
            for (let i = 0; i < inputs.length; i += colsPerRow) {
                rows.push({
                    date: inputs[i].value || '',
                    debit: inputs[i + 1].value || '',
                    credit: inputs[i + 2].value || '',
                    balance: inputs[i + 3].value || ''
                });
            }

            try {
                const webpBlob = await convertImageToWebP(previewImg.src, 0.85);
                const formData = new FormData();
                formData.append('photo', webpBlob, 'passbook.webp');
                formData.append('bankCode', bankCode);
                formData.append('bookNo', bookNo);
                formData.append('pageNo', pageNo);
                formData.append('lastBalance', lastBalance);
                formData.append('rows', JSON.stringify(rows));

                const res = await fetch('/api/passbook-photos/upload', {
                    method: 'POST',
                    body: formData
                });

                if (!res.ok) {
                    const errData = await res.json().catch(() => ({}));
                    throw new Error(errData.error || `Server error: ${res.status}`);
                }

                const data = await res.json();
                alert('Passbook saved successfully!');
                console.log('Saved:', data);
            } catch (err) {
                console.error('Failed to save passbook:', err);
                alert('Error saving passbook: ' + err.message);
            }
        });
    }

    const uploadPhotoModal = document.getElementById('upload-photo-modal');
    const closeUploadPhotoModal = document.getElementById('close-upload-photo-modal');
    const uploadZone2 = document.getElementById('upload-zone-2');
    const fileInput2 = document.getElementById('passbook-file-input-2');
    const imagePreview2 = document.getElementById('image-preview-2');
    const previewImg2 = document.getElementById('preview-img-2');
    const removeImageBtn2 = document.getElementById('remove-image-btn-2');
    const savePhotoBtn = document.getElementById('save-photo-btn');

    if (closeUploadPhotoModal && uploadPhotoModal) {
        closeUploadPhotoModal.addEventListener('click', () => {
            uploadPhotoModal.style.display = 'none';
        });
    }

    if (uploadPhotoModal) {
        uploadPhotoModal.addEventListener('click', (e) => {
            if (e.target === uploadPhotoModal) uploadPhotoModal.style.display = 'none';
        });
    }

    if (uploadZone2 && fileInput2) {
        uploadZone2.addEventListener('click', () => fileInput2.click());
        uploadZone2.addEventListener('dragover', (e) => {
            e.preventDefault();
            uploadZone2.classList.add('drag-over');
        });
        uploadZone2.addEventListener('dragleave', () => {
            uploadZone2.classList.remove('drag-over');
        });
        uploadZone2.addEventListener('drop', (e) => {
            e.preventDefault();
            uploadZone2.classList.remove('drag-over');
            const files = e.dataTransfer.files;
            if (files.length > 0) handlePassbookFile2(files[0]);
        });
        fileInput2.addEventListener('change', (e) => {
            if (e.target.files.length > 0) handlePassbookFile2(e.target.files[0]);
        });
    }

    if (removeImageBtn2) {
        removeImageBtn2.addEventListener('click', () => {
            fileInput2.value = '';
            previewImg2.src = '';
            imagePreview2.style.display = 'none';
            uploadZone2.style.display = 'flex';
        });
    }

    function handlePassbookFile2(file) {
        const validTypes = ['image/jpeg', 'image/png', 'image/jpg'];
        const maxSize = 5 * 1024 * 1024;
        if (!validTypes.includes(file.type)) {
            alert('Please upload a JPG or PNG image.');
            return;
        }
        if (file.size > maxSize) {
            alert('File size must not exceed 5MB.');
            return;
        }
        const reader = new FileReader();
        reader.onload = (e) => {
            previewImg2.src = e.target.result;
            uploadZone2.style.display = 'none';
            imagePreview2.style.display = 'flex';
        };
        reader.readAsDataURL(file);
    }

    if (savePhotoBtn) {
        savePhotoBtn.addEventListener('click', async () => {
            const bankCode = (document.getElementById('upload-photo-bank-code')?.value || '').trim();
            const bookNo = document.getElementById('upload-photo-book-no')?.value;
            const pageNo = document.getElementById('upload-photo-page-no')?.value;

            if (!bankCode || !bookNo || !pageNo) {
                alert('Missing page information.');
                return;
            }

            if (!previewImg2.src || previewImg2.style.display === 'none') {
                alert('Please upload a passbook image.');
                return;
            }

            try {
                const webpBlob = await convertImageToWebP(previewImg2.src, 0.85);
                const formData = new FormData();
                formData.append('photo', webpBlob, 'passbook.webp');
                formData.append('bankCode', bankCode);
                formData.append('bookNo', bookNo);
                formData.append('pageNo', pageNo);

                const res = await fetch('/api/passbook-photos/upload', {
                    method: 'POST',
                    body: formData
                });

                if (!res.ok) {
                    const errData = await res.json().catch(() => ({}));
                    throw new Error(errData.error || `Server error: ${res.status}`);
                }

                alert('Photo saved successfully!');
                uploadPhotoModal.style.display = 'none';
                loadPagesNeedingPhotos();
            } catch (err) {
                console.error('Failed to save photo:', err);
                alert('Error saving photo: ' + err.message);
            }
        });
    }

    const bulkUploadBtn = document.getElementById('bulk-upload-statement-btn');
    const bulkUploadModal = document.getElementById('bulk-upload-modal');
    const closeBulkUploadModal = document.getElementById('close-bulk-upload-modal');
    const bulkFileInput = document.getElementById('bulk-statement-file-input');
    const bulkPreview = document.getElementById('bulk-statement-preview');
    const saveBulkBtn = document.getElementById('save-bulk-statement-btn');

    if (bulkUploadBtn && bulkUploadModal) {
        bulkUploadBtn.addEventListener('click', () => {
            bulkUploadModal.style.display = 'flex';
            if (bulkPreview) bulkPreview.innerHTML = '<span style="color: #999; font-size: 13px;">No file selected</span>';
            if (bulkFileInput) bulkFileInput.value = '';
        });
    }

    const downloadTemplateBtn = document.getElementById('download-template-btn');
    if (downloadTemplateBtn) {
        downloadTemplateBtn.addEventListener('click', () => {
            const csvContent = 'date,debit,credit,balance,bank_code,book_no,page_no\r\n2021-04-05,0.00,50650.00,50650.00,PNB,PB-001,PG-001\r\n';
            const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = 'bank_statement_template.csv';
            link.click();
            URL.revokeObjectURL(url);
        });
    }

    if (closeBulkUploadModal && bulkUploadModal) {
        closeBulkUploadModal.addEventListener('click', () => {
            bulkUploadModal.style.display = 'none';
        });
    }

    if (bulkUploadModal) {
        bulkUploadModal.addEventListener('click', (e) => {
            if (e.target === bulkUploadModal) bulkUploadModal.style.display = 'none';
        });
    }

    if (bulkFileInput && bulkPreview) {
        bulkFileInput.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (!file) {
                bulkPreview.innerHTML = '<span style="color: #999; font-size: 13px;">No file selected</span>';
                return;
            }
            const reader = new FileReader();
            reader.onload = (ev) => {
                const text = ev.target.result;
                const lines = text.split(/\r?\n/).filter(line => line.trim() !== '');
                if (lines.length === 0) {
                    bulkPreview.innerHTML = '<span style="color: #c0392b; font-size: 13px;">File is empty</span>';
                    return;
                }
                const delimiter = lines[0].includes('\t') ? '\t' : ',';
                const header = parseCSVLine(lines[0], delimiter).map(h => h.trim().toLowerCase());
                const requiredHeaders = ['date', 'debit', 'credit', 'balance', 'bank_code', 'book_no', 'page_no'];
                const headerErrors = [];
                requiredHeaders.forEach((expected) => {
                    if (!header.includes(expected)) {
                        headerErrors.push(`Missing column: "${expected}"`);
                    }
                });
                if (headerErrors.length > 0) {
                    bulkPreview.innerHTML = '<span style="color: #c0392b; font-size: 13px;">Invalid headers: ' + headerErrors.join('; ') + '</span>';
                    return;
                }
                const previewLines = lines;
                let tableHtml = '<table style="width: 100%; border-collapse: collapse; font-size: 13px;"><thead><tr style="background: #f4f5f7;">';
                requiredHeaders.forEach(h => {
                    tableHtml += `<th style="border: 1px solid #ddd; padding: 4px; text-align: center;">${h}</th>`;
                });
                tableHtml += '</tr></thead><tbody>';
                previewLines.slice(1).forEach((line, idx) => {
                    const cols = parseCSVLine(line, delimiter);
                    const row = {};
                    header.forEach((h, i) => {
                        row[h] = cols[i] !== undefined ? cols[i].trim() : '';
                    });
                    tableHtml += '<tr>';
                    requiredHeaders.forEach(h => {
                        tableHtml += `<td style="border: 1px solid #ddd; padding: 4px;">${row[h] !== undefined ? row[h] : ''}</td>`;
                    });
                    tableHtml += '</tr>';
                });
                tableHtml += '</tbody></table>';
                bulkPreview.innerHTML = tableHtml;
            };
            reader.readAsText(file);
        });
    }

    function parseCSVLine(line, delimiter = ',') {
        const result = [];
        let current = '';
        let inQuotes = false;
        for (let i = 0; i < line.length; i++) {
            const char = line[i];
            if (char === '"') {
                if (inQuotes && line[i + 1] === '"') {
                    current += '"';
                    i++;
                } else {
                    inQuotes = !inQuotes;
                }
            } else if (char === delimiter && !inQuotes) {
                result.push(current.trim());
                current = '';
            } else {
                current += char;
            }
        }
        result.push(current.trim());
        return result;
    }

    if (saveBulkBtn) {
        saveBulkBtn.addEventListener('click', async () => {
            const file = bulkFileInput ? bulkFileInput.files[0] : null;
            if (!file) {
                alert('Please select a CSV file first.');
                return;
            }
            const text = await file.text();
            const lines = text.split(/\r?\n/).filter(line => line.trim() !== '');
            if (lines.length < 2) {
                alert('CSV file is empty or has no data rows');
                return;
            }
            const delimiter = lines[0].includes('\t') ? '\t' : ',';
            const header = parseCSVLine(lines[0], delimiter).map(h => h.trim().toLowerCase());
            const requiredHeaders = ['date', 'debit', 'credit', 'balance', 'bank_code', 'book_no', 'page_no'];
            const headerErrors = [];
            requiredHeaders.forEach((expected) => {
                if (!header.includes(expected)) {
                    headerErrors.push(`Missing column: "${expected}"`);
                }
            });
            if (headerErrors.length > 0) {
                alert('Invalid CSV headers: ' + headerErrors.join('; '));
                return;
            }
            const rows = [];
            const errors = [];
            for (let i = 1; i < lines.length; i++) {
                const cols = parseCSVLine(lines[i], delimiter);
                const row = {};
                header.forEach((h, idx) => {
                    row[h] = cols[idx] !== undefined ? cols[idx].trim() : '';
                });
                const date = row['date'];
                const debit = row['debit'];
                const credit = row['credit'];
                const balance = row['balance'];
                const bank_code = row['bank_code'];
                const book_no = row['book_no'];
                const page_no = row['page_no'];
                if (!date || !bank_code || !book_no || !page_no) {
                    errors.push(`Row ${i + 1}: missing required fields (date, bank_code, book_no, page_no)`);
                    continue;
                }
                if (isNaN(parseFloat(debit)) || isNaN(parseFloat(credit)) || isNaN(parseFloat(balance))) {
                    errors.push(`Row ${i + 1}: debit, credit, and balance must be numbers`);
                    continue;
                }
                const codeBookPage = `${bank_code} ${book_no} ${page_no}`.trim();
                rows.push({
                    code_book_page: codeBookPage,
                    date,
                    debit: parseFloat(debit),
                    credit: parseFloat(credit),
                    balance: parseFloat(balance)
                });
            }
            if (errors.length > 0) {
                alert('Validation errors: ' + errors.join('; '));
                return;
            }
            try {
                const res = await fetch('/api/passbook-statements/bulk', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ rows })
                });
                if (!res.ok) {
                    const errData = await res.json().catch(() => ({}));
                    throw new Error(errData.error || `Server error: ${res.statusCode}`);
                }
                const data = await res.json();
                alert(`Successfully imported ${data.inserted} statement rows`);
                bulkUploadModal.style.display = 'none';
                if (bankAccountSelect) loadBankAccounts();
                loadPagesNeedingPhotos();
            } catch (err) {
                console.error('Failed to bulk upload statements:', err);
                alert('Error: ' + err.message);
            }
        });
    }

    function parseAmount(value) {
        const n = parseFloat(String(value).replace(/,/g, '').trim());
        return isNaN(n) ? 0 : n;
    }

    function recomputeBalances() {
        const lastBalanceInput = document.getElementById('passbook-last-balance');
        const rows = document.querySelectorAll('.passbook-table tbody tr');

        let runningBalance = parseAmount(lastBalanceInput ? lastBalanceInput.value : '0');

        rows.forEach((row, index) => {
            const inputs = row.querySelectorAll('.spreadsheet-input');
            const dateInput = inputs[0];
            const debitInput = inputs[1];
            const creditInput = inputs[2];
            const balanceInput = inputs[3];

            if (!balanceInput) return;

            const dateVal = (dateInput.value || '').trim();
            if (!dateVal) {
                balanceInput.value = '';
                return;
            }

            const debit = parseAmount(debitInput.value);
            const credit = parseAmount(creditInput.value);

            runningBalance = runningBalance - debit + credit;
            balanceInput.value = formatNumber(runningBalance);
        });
    }

    function formatNumber(value) {
        const n = typeof value === 'number' ? value : parseFloat(value);
        if (isNaN(n)) n = 0;
        return n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    }

    function formatAmountInput(raw) {
        const cleaned = raw.replace(/[^0-9.]/g, '');
        const parts = cleaned.split('.');
        const intPart = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        const decPart = parts.length > 1 ? '.' + parts[1].slice(0, 2) : '';
        return intPart + decPart;
    }

    function formatDateInput(raw) {
        const digits = raw.replace(/\D/g, '').slice(0, 8);
        const parts = [];
        if (digits.length > 0) parts.push(digits.slice(0, 2));
        if (digits.length > 2) parts.push(digits.slice(2, 4));
        if (digits.length > 4) parts.push(digits.slice(4, 8));
        return parts.join('/');
    }

    function wireDateAutoFormat() {
        const rows = document.querySelectorAll('.passbook-table tbody tr');
        rows.forEach((row) => {
            const input = row.querySelectorAll('.spreadsheet-input')[0];
            if (!input) return;
            input.addEventListener('input', (e) => {
                const formatted = formatDateInput(e.target.value);
                e.target.value = formatted;
                recomputeBalances();
            });
        });
    }

    function wireBalanceComputation() {
        const lastBalanceInput = document.getElementById('passbook-last-balance');
        const inputs = document.querySelectorAll('.passbook-table .spreadsheet-input:not(.balance-input)');
        if (lastBalanceInput) {
            lastBalanceInput.addEventListener('input', (e) => {
                e.target.value = formatAmountInput(e.target.value);
                recomputeBalances();
            });
        }
        inputs.forEach((input) => {
            if (input.classList.contains('modal-select') || input.id === 'passbook-last-balance') return;
            const row = input.closest('tr');
            const isDateInput = row && row.querySelectorAll('.spreadsheet-input')[0] === input;
            input.addEventListener('input', () => {
                if (!isDateInput) {
                    input.value = formatAmountInput(input.value);
                }
                recomputeBalances();
            });
        });
    }

    function convertImageToWebP(dataUrl, quality = 0.85) {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.onload = () => {
                const canvas = document.createElement('canvas');
                canvas.width = img.naturalWidth;
                canvas.height = img.naturalHeight;
                const ctx = canvas.getContext('2d');
                ctx.drawImage(img, 0, 0);
                canvas.toBlob((blob) => {
                    if (blob) {
                        resolve(blob);
                    } else {
                        reject(new Error('Failed to convert image to WebP'));
                    }
                }, 'image/webp', quality);
            };
            img.onerror = () => reject(new Error('Failed to load image for conversion'));
            img.src = dataUrl;
        });
    }

    function handlePassbookFile(file) {
        const validTypes = ['image/jpeg', 'image/png', 'image/jpg'];
        const maxSize = 5 * 1024 * 1024;

        if (!validTypes.includes(file.type)) {
            alert('Please upload a JPG or PNG image.');
            return;
        }

        if (file.size > maxSize) {
            alert('File size must not exceed 5MB.');
            return;
        }

        const reader = new FileReader();
        reader.onload = (e) => {
            previewImg.src = e.target.result;
            uploadZone.style.display = 'none';
            imagePreview.style.display = 'flex';
        };
        reader.readAsDataURL(file);
    }
}
