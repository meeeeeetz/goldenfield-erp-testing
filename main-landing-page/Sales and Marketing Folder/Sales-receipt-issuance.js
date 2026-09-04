if (typeof ModuleComponents === 'undefined') { window.ModuleComponents = {}; }

var receiptTransactionsData = [];
var receiptCurrentPage = 1;
var receiptRowsPerPage = 12;

ModuleComponents['sales-receipt-issuance'] = (container) => {
        container.innerHTML = `
            <div class="header-actions">
                <h2>Receipt Issuance</h2>
            </div>
            <div class="action-buttons-row">
                <button id="issue-receipt-btn" class="btn-icon-circle">
                    <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                    <span class="btn-label">Issue Receipt</span>
                </button>
                <button id="upload-db-btn" class="btn-icon-circle btn-upload-db">
                    <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line></svg>
                    <span class="btn-label">Upload Receipts Database</span>
                </button>
            </div>
            <div class="tracking-cards-row sales-cards-row">
                <div class="card tracking-card">
                    <h3>Monthly Sales</h3>
                    <p class="card-sub-label">Accumulated Sales for the month</p>
                    <p class="card-value" id="monthly-sales-value">P 0.00</p>
                    <p class="card-value-row"><span class="trend-up">&#9650; 5%</span> <span class="vs-last-month">VS last month</span></p>
                </div>
                <div class="card tracking-card">
                    <h3>Total Receivables</h3>
                    <p class="card-sub-label">All Customer Outstanding Payments</p>
                    <p class="card-value" id="total-receivables-value">P 0.00</p>
                </div>
            </div>

            <!-- ROW 1: Customer Receivables and Weekly Schedule -->
            <div class="receivables-schedule-row">
                <div class="card shipping-box customer-receivables-box">
                    <h3>Customer Receivables</h3>
                    <div class="table-wrap">
                        <table class="data-table product-table">
                            <thead>
                                <tr>
                                    <th>Customer</th>
                                    <th>Receivables</th>
                                </tr>
                            </thead>
                            <tbody id="customer-receivables-body">
                                <tr><td colspan="2">Loading...</td></tr>
                            </tbody>
                        </table>
                    </div>
                    <div class="pagination">
                        <button class="page-btn">&laquo; Prev</button>
                        <button class="page-btn active">1</button>
                        <button class="page-btn">Next &raquo;</button>
                    </div>
                </div>
                <div class="card shipping-box weekly-schedule-box">
                    <h3>Weekly Customer Schedule</h3>
                    <div class="table-wrap">
                        <table class="data-table product-table weekly-schedule-table">
                            <thead>
                                <tr>
                                    <th>Sunday</th>
                                    <th>Monday</th>
                                    <th>Tuesday</th>
                                    <th>Wednesday</th>
                                    <th>Thursday</th>
                                    <th>Friday</th>
                                    <th>Saturday</th>
                                </tr>
                            </thead>
                            <tbody id="weekly-schedule-body">
                                <tr>
                                    <td><textarea class="schedule-cell" data-day="0" rows="15"></textarea></td>
                                    <td><textarea class="schedule-cell" data-day="1" rows="15"></textarea></td>
                                    <td><textarea class="schedule-cell" data-day="2" rows="15"></textarea></td>
                                    <td><textarea class="schedule-cell" data-day="3" rows="15"></textarea></td>
                                    <td><textarea class="schedule-cell" data-day="4" rows="15"></textarea></td>
                                    <td><textarea class="schedule-cell" data-day="5" rows="15"></textarea></td>
                                    <td><textarea class="schedule-cell" data-day="6" rows="15"></textarea></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <!-- ROW 2: Receipt Transaction Box Only -->
            <div class="transactions-row">
                <div class="card shipping-box receipt-transaction-box">
                    <h3>Receipt Transaction</h3>
                    <div class="table-wrap">
                        <table class="data-table product-table">
                            <thead>
                                <tr>
                                    <th>Invoice No.</th>
                                    <th>Date</th>
                                    <th>Customer</th>
                                    <th>Amount</th>
                                    <th>Status</th>
                                    <th>Created By</th>
                                    <th>PDF</th>
                                    <th>Void</th>
                                </tr>
                            </thead>
                            <tbody id="receipt-transactions-body">
                                <tr><td colspan="8">Loading...</td></tr>
                            </tbody>
                        </table>
                    </div>
                    <div class="pagination" id="receipt-pagination">
                        <button class="page-btn" id="receipt-prev-btn">&laquo; Prev</button>
                        <button class="page-btn active" id="receipt-page-1">1</button>
                        <button class="page-btn" id="receipt-next-btn">Next &raquo;</button>
                    </div>
                </div>
            </div>

            <div id="receipt-modal" class="modal receipt-modal" style="display:none;">
                <div class="modal-content egg-products-modal">
                    <div class="modal-header-row">
                        <h3>Issue Receipt</h3>
                        <button class="modal-close-btn" id="close-receipt-modal">&times;</button>
                    </div>
                    <div class="receipt-form">
                        <div class="receipt-header-row">
                            <div class="receipt-field">
                                <label>SI #</label>
                                <input type="text" id="receipt-si-number" readonly>
                            </div>
                            <div class="receipt-field">
                                <label>Date</label>
                                <input type="date" id="receipt-date" readonly>
                            </div>
                            <div class="receipt-field">
                                <label>Customer</label>
                                <select id="receipt-customer" class="modal-select">
                                    <option value="">Select customer...</option>
                                </select>
                            </div>
                            <button type="button" id="add-case-btn" class="btn-primary receipt-add-case-btn">Add Case</button>
                        </div>
                        <div class="table-wrap">
                            <table class="data-table product-table">
                                <thead>
                                    <tr>
                                        <th>Qty</th>
                                        <th>Product</th>
                                        <th>Price per unit</th>
                                        <th>Egg Tray Used</th>
                                        <th>Total</th>
                                    </tr>
                                </thead>
                                <tbody id="receipt-items-body">
                                </tbody>
                            </table>
                        </div>
                        <div class="receipt-footer">
                            <label>Grand Total:</label>
                            <input type="text" id="receipt-grand-total" readonly>
                        </div>
                        <div class="modal-tab-actions">
                            <button class="btn-primary" id="save-receipt">Save</button>
                        </div>
                    </div>
                </div>
                <div class="receipt-computation-box">
                    <h4>Computation</h4>
                    <div class="computation-item">
                        <span>Egg Tray Used:</span>
                        <span id="computation-tray-total">0</span>
                    </div>
                </div>
            </div>

            <div id="upload-modal" class="modal upload-modal" style="display:none;">
                <div class="modal-content upload-modal-content">
                    <div class="modal-header-row">
                        <h3>Admin only: Upload datas to database</h3>
                        <button class="modal-close-btn" id="close-upload-modal">&times;</button>
                    </div>
                    <div class="upload-modal-body">
                        <div class="upload-drop-zone" id="upload-drop-zone">
                            <svg viewBox="0 0 24 24" width="48" height="48" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                                <polyline points="17 8 12 3 7 8"></polyline>
                                <line x1="12" y1="3" x2="12" y2="15"></line>
                            </svg>
                            <p class="upload-text">Drag & Drop your file here</p>
                            <p class="upload-subtext">or click to browse</p>
                        </div>
                        <input type="file" id="upload-file-input" accept=".csv,.xlsx,.xls" style="display:none;">
                        <div id="upload-validation" style="display:none; padding: 10px; border-radius: 6px; font-size: 13px; line-height: 1.4; max-height: 200px; overflow-y: auto; white-space: pre-wrap;"></div>
                        <div class="upload-actions">
                            <button class="btn-secondary" id="download-template-btn">Download Template</button>
                            <button class="btn-secondary" id="save-to-db-btn">Save to Database</button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    };

var API_BASE_RECEIPTS = '/api/receipt-issues';
var API_BASE_CUSTOMERS = '/api/customers';
var API_BASE_PRICE_CHANGES = "/api/price-changes";
var API_BASE_PRODUCTS = '/api/products';

function generateReceiptItems() {
    const tbody = document.getElementById('receipt-items-body');
    if (!tbody) return;
    tbody.innerHTML = '';
    for (let i = 0; i < 10; i++) {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td><input type="number" class="receipt-qty" value="" min="1" style="width: 60px;"></td>
            <td>
                <select class="receipt-product modal-select">
                    <option value="">Select product...</option>
                </select>
            </td>
            <td><input type="text" class="receipt-price" value="0" min="0" step="0.01" style="width: 100px;" readonly></td>
            <td><input type="text" class="receipt-tray" value="0" min="0" step="0.01" readonly style="width: 100px;"></td>
            <td><input type="text" class="receipt-total" value="0" min="0" step="0.01" readonly style="width: 100px;"></td>
        `;
        tbody.appendChild(row);
    }
    updateComputationBox();
}

async function loadCustomersForReceipt() {
    try {
        const res = await fetch(`${API_BASE_CUSTOMERS}`);
        const customers = await res.json();
        const select = document.getElementById('receipt-customer');
        if (!select) return;
        customers.forEach(c => {
            const option = document.createElement('option');
            option.value = c.customer_id;
            option.textContent = c.company || c.customer_name || c.customer_id;
            select.appendChild(option);
        });
    } catch (err) {
        console.error('Failed to load customers for receipt', err);
    }
}

async function loadProductsForReceipt() {
    try {
        const res = await fetch(`${API_BASE_PRODUCTS}`);
        const products = await res.json();
        const selects = document.querySelectorAll('.receipt-product');
        selects.forEach(select => {
            select.innerHTML = '<option value="">Select product...</option>';
            products.forEach(p => {
                const option = document.createElement('option');
                option.value = p.product_id;
                option.textContent = p.product;
                option.dataset.price = p.egg_tray_used || 0;
                option.dataset.tray = p.egg_tray_used || 0;
                select.appendChild(option);
            });
        });
    } catch (err) {
        console.error('Failed to load products for receipt', err);
    }
}



async function addCaseProducts() {
    const tbody = document.getElementById('receipt-items-body');
    const customerSelect = document.getElementById('receipt-customer');
    const customerName = customerSelect ? customerSelect.options[customerSelect.selectedIndex].textContent.trim() : '';
    
    if (!customerName) {
        alert('Please select a customer first');
        return;
    }
    
    const firstSelect = document.querySelector('.receipt-product');
    const caseProducts = [];
    if (firstSelect) {
        Array.from(firstSelect.options).forEach(opt => {
            if (opt.value && opt.textContent.toLowerCase().includes('case')) {
                caseProducts.push({
                    value: opt.value,
                    text: opt.textContent,
                    tray: opt.dataset.tray || 0,
                    price: opt.dataset.price || 0
                });
            }
        });
    }
    
    if (caseProducts.length === 0) {
        alert('No case products found');
        return;
    }
    
    const rows = tbody.querySelectorAll('tr');
    const existingProducts = new Set();
    
    for (let i = 0; i < rows.length; i++) {
        const productSelect = rows[i].querySelector('.receipt-product');
        if (productSelect && productSelect.value) {
            existingProducts.add(productSelect.value);
        }
    }
    
    const caseOrder = ['J - Case', 'XL - Case', 'L - Case', 'M - Case', 'S - Case', 'XS - Case', 'PW - Case', 'NW - Case'];
    const newCaseProducts = caseProducts.filter(cp => !existingProducts.has(cp.value));
    newCaseProducts.sort((a, b) => {
        const idxA = caseOrder.indexOf(a.text);
        const idxB = caseOrder.indexOf(b.text);
        return (idxA === -1 ? 999 : idxA) - (idxB === -1 ? 999 : idxB);
    });
    
    if (newCaseProducts.length === 0) {
        alert('All case products are already added');
        return;
    }
    
    let emptyRowIndex = -1;
    
    for (let i = 0; i < rows.length; i++) {
        const productSelect = rows[i].querySelector('.receipt-product');
        if (productSelect && !productSelect.value) {
            emptyRowIndex = i;
            break;
        }
    }
    
    if (emptyRowIndex === -1) {
        for (let i = 0; i < newCaseProducts.length; i++) {
            const row = document.createElement('tr');
            row.innerHTML = '<td><input type="number" class="receipt-qty" value="" min="1" style="width: 60px;"></td><td><select class="receipt-product modal-select"><option value="">Select product...</option></select></td><td><input type="text" class="receipt-price" value="0.00" readonly style="width: 100px;"></td><td><input type="text" class="receipt-tray" value="0" readonly style="width: 100px;"></td><td><input type="text" class="receipt-total" value="0.00" readonly style="width: 100px;"></td>';
            tbody.appendChild(row);
            
            const newSelect = row.querySelector('.receipt-product');
            const existingSelect = document.querySelector('.receipt-product');
            if (existingSelect && newSelect) {
                newSelect.innerHTML = existingSelect.innerHTML;
            }
        }
    }
    
    const allRows = tbody.querySelectorAll('tr');
    let rowIndex = emptyRowIndex === -1 ? allRows.length - newCaseProducts.length : emptyRowIndex;
    
    for (let i = 0; i < newCaseProducts.length; i++) {
        const row = allRows[rowIndex + i];
        if (!row) continue;
        
        const productSelect = row.querySelector('.receipt-product');
        const priceInput = row.querySelector('.receipt-price');
        const trayInput = row.querySelector('.receipt-tray');
        const totalInput = row.querySelector('.receipt-total');
        
        productSelect.value = newCaseProducts[i].value;
        trayInput.value = newCaseProducts[i].tray;
        trayInput.dataset.originalTray = newCaseProducts[i].tray;
        
        try {
            const res = await fetch(API_BASE_PRICE_CHANGES + '/today?customer=' + encodeURIComponent(customerName) + '&products=' + encodeURIComponent(newCaseProducts[i].text));
            const data = await res.json();
            
            if (data.length > 0 && data[0].price) {
                priceInput.value = parseFloat(data[0].price).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
            } else {
                priceInput.value = '0.00';
            }
        } catch (err) {
            console.error('Failed to fetch price for', newCaseProducts[i].text, err);
            priceInput.value = '0.00';
        }
        
        calculateRowTotal(row);
    }
    updateComputationBox();
}

function calculateRowTotal(row) {
    const qtyInput = row ? row.querySelector('.receipt-qty') : null;
    const priceInput = row ? row.querySelector('.receipt-price') : null;
    const trayInput = row ? row.querySelector('.receipt-tray') : null;
    const totalInput = row ? row.querySelector('.receipt-total') : null;
    const qty = qtyInput ? (parseFloat(qtyInput.value) || 0) : 0;
    const price = priceInput ? (parseFloat(String(priceInput.value).replace(/,/g, '')) || 0) : 0;
    const tray = trayInput ? (parseFloat(trayInput.dataset.originalTray || trayInput.value) || 0) : 0;
    const trayTotal = qty * tray;
    const priceTotal = qty * price;
    if (trayInput) trayInput.value = trayTotal.toFixed(0);
    if (totalInput) totalInput.value = priceTotal.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    calculateGrandTotal();
    updateComputationBox();
}

function calculateGrandTotal() {
    const totals = document.querySelectorAll('.receipt-total');
    let grandTotal = 0;
    totals.forEach(input => {
        grandTotal += parseFloat(input.value.replace(/,/g, '')) || 0;
    });
    const grandTotalInput = document.getElementById('receipt-grand-total');
    if (grandTotalInput) {
        grandTotalInput.value = grandTotal.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    }
}

function updateComputationBox() {
    const rows = document.querySelectorAll('#receipt-items-body tr');
    let eggTrayUsed = 0;
    
    rows.forEach(row => {
        const productSelect = row.querySelector('.receipt-product');
        const trayInput = row.querySelector('.receipt-tray');
        
        if (!productSelect || !trayInput) return;
        
        const productName = productSelect.options[productSelect.selectedIndex]?.textContent.trim() || '';
        const isTrayProduct = productName.includes('Tray (New)') || productName.includes('Tray (Old)');
        
        if (!isTrayProduct) {
            eggTrayUsed += parseFloat(trayInput.value) || 0;
        }
    });
    
    const trayTotalEl = document.getElementById('computation-tray-total');
    if (trayTotalEl) {
        trayTotalEl.textContent = eggTrayUsed.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    }
}

async function generateNextSINumber() {
    const siInput = document.getElementById('receipt-si-number');
    if (!siInput) return;
    try {
        const res = await fetch(`${API_BASE_RECEIPTS}/next-si`);
        const data = await res.json();
        siInput.value = data.si_number || 'SI# 000001';
    } catch (err) {
        console.error('Failed to get next SI number', err);
        siInput.value = 'SI# 000001';
    }
}

function setTodayDate() {
    const dateInput = document.getElementById('receipt-date');
    if (!dateInput) return;
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    dateInput.value = `${year}-${month}-${day}`;
}

function initializeReceiptModal() {
    const modal = document.getElementById('receipt-modal');
    const openBtn = document.getElementById('issue-receipt-btn');
    const closeBtn = document.getElementById('close-receipt-modal');
    
    if (!modal || !openBtn) return;

    openBtn.addEventListener('click', async () => {
        modal.style.display = 'flex';
        await generateNextSINumber();
        setTodayDate();
        generateReceiptItems();
        await loadCustomersForReceipt();
        await loadProductsForReceipt();
        document.getElementById('receipt-grand-total').value = '0.00';
    });

    document.getElementById('add-case-btn').addEventListener('click', async () => {
        await addCaseProducts();
    });
    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    modal.addEventListener('click', (e) => {
        if (e.target === modal) modal.style.display = 'none';
    });

    document.getElementById('receipt-items-body').addEventListener('input', (e) => {
        const row = e.target.closest('tr');
        if (row && (e.target.classList.contains('receipt-qty') || e.target.classList.contains('receipt-price') || e.target.classList.contains('receipt-tray'))) {
            calculateRowTotal(row);
            updateComputationBox();
        }
    });

    document.getElementById('receipt-items-body').addEventListener('change', async (e) => {
        if (e.target.classList.contains('receipt-product')) {
            const row = e.target.closest('tr');
            const priceInput = row.querySelector('.receipt-price');
            const trayInput = row.querySelector('.receipt-tray');
            const customerSelect = document.getElementById('receipt-customer');
            const selectedOption = e.target.options[e.target.selectedIndex];
            const productName = selectedOption ? selectedOption.textContent.trim() : '';
            
            if (selectedOption && selectedOption.dataset.tray !== undefined) {
                trayInput.value = selectedOption.dataset.tray;
                trayInput.dataset.originalTray = selectedOption.dataset.tray;
            } else {
                trayInput.value = 0;
                trayInput.dataset.originalTray = 0;
            }
            
            if (!customerSelect.value || !productName) {
                priceInput.value = '0.00';
                calculateRowTotal(row);
                updateComputationBox();
                return;
            }
            
            const customerName = customerSelect.options[customerSelect.selectedIndex].textContent.trim();
            
            try {
                const res = await fetch(API_BASE_PRICE_CHANGES + '/today?customer=' + encodeURIComponent(customerName) + '&products=' + encodeURIComponent(productName));
                const data = await res.json();
                
                if (data.length > 0 && data[0].price) {
                    priceInput.value = parseFloat(data[0].price).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
                } else {
                    priceInput.value = '0.00';
                }
            } catch (err) {
                console.error('Failed to fetch price', err);
                priceInput.value = '0.00';
            }
            
            calculateRowTotal(row);
            updateComputationBox();
        }
    });

    document.getElementById('save-receipt').addEventListener('click', async () => {
        const siNumber = document.getElementById('receipt-si-number').value;
        const date = document.getElementById('receipt-date').value;
        const customerId = document.getElementById('receipt-customer').value;
        const customerName = customerId ? document.getElementById('receipt-customer').options[document.getElementById('receipt-customer').selectedIndex].textContent.trim() : '';
        const rows = document.querySelectorAll('#receipt-items-body tr');
        const items = [];
        
        rows.forEach(row => {
            const productSelect = row.querySelector('.receipt-product');
            const qty = parseFloat(row.querySelector('.receipt-qty').value) || 0;
            const total = parseFloat(row.querySelector('.receipt-total').value.replace(/,/g, '')) || 0;
            const productName = productSelect && productSelect.selectedIndex > 0 ? productSelect.options[productSelect.selectedIndex].textContent.trim() : '';
            
            if (productName && qty > 0) {
                items.push({
                    si_number: siNumber,
                    date: date,
                    customer: customerName,
                    qty: qty,
                    product: productName,
                    total: total
                });
            }
        });

        if (!customerId) return alert('Please select a customer');
        if (items.length === 0) return alert('Please add at least one item');

        try {
            const res = await fetch(`${API_BASE_RECEIPTS}/batch`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ receipts: items })
            });
            if (!res.ok) {
                const errData = await res.json().catch(() => ({}));
                throw new Error(errData.error || `Server error: ${res.status}`);
            }
            alert('Receipt issued successfully: ' + siNumber);
            modal.style.display = 'none';
            loadReceiptTransactions();
            loadCustomerReceivables();
            loadTotalReceivables();
            loadMonthlySales();
            loadWeeklySchedule();
        } catch (err) {
            console.error('Failed to save receipt', err);
            alert('Error saving receipt: ' + err.message);
        }
    });

    }

    async function loadWeeklySchedule() {
        const cells = document.querySelectorAll('.schedule-cell');
        if (!cells.length) return;
        try {
            const res = await fetch(`${API_BASE_RECEIPTS}/weekly-schedule`);
            const data = await res.json();
            cells.forEach(cell => {
                const day = parseInt(cell.dataset.day);
                const row = data.find(r => r.day_of_week === day);
                if (row) {
                    cell.value = row.content || '';
                }
            });
        } catch (err) {
            console.error('Failed to load weekly schedule', err);
        }
    }

    async function saveWeeklyScheduleCell(dayOfWeek, content) {
        try {
            await fetch(`${API_BASE_RECEIPTS}/weekly-schedule`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ schedule: [{ day_of_week: dayOfWeek, content }] })
            });
        } catch (err) {
            console.error('Failed to save schedule cell', err);
        }
    }

    function initializeScheduleCells() {
        const cells = document.querySelectorAll('.schedule-cell');
        cells.forEach(cell => {
            cell.addEventListener('blur', async () => {
                const day = parseInt(cell.dataset.day);
                await saveWeeklyScheduleCell(day, cell.value);
        });
    });
}

    function initializeModule(contentArea) {
        const render = ModuleComponents['sales-receipt-issuance'];
        render(contentArea);
        initializeReceiptModal();
        
        const uploadBtn = document.getElementById('upload-db-btn');
        if (uploadBtn) {
            uploadBtn.addEventListener('click', () => {
                const modal = document.getElementById('upload-modal');
                if (modal) modal.style.display = 'flex';
            });
        }
        
        const closeUploadBtn = document.getElementById('close-upload-modal');
        if (closeUploadBtn) {
            closeUploadBtn.addEventListener('click', () => {
                const modal = document.getElementById('upload-modal');
                if (modal) modal.style.display = 'none';
            });
        }
        
        const dropZone = document.getElementById('upload-drop-zone');
        const fileInput = document.getElementById('upload-file-input');
        let selectedFile = null;
        
        if (dropZone && fileInput) {
            let dragCounter = 0;
            
            dropZone.addEventListener('dragenter', (e) => {
                e.preventDefault();
                e.stopPropagation();
                dragCounter++;
                dropZone.classList.add('drag-over');
            });
            
            dropZone.addEventListener('dragover', (e) => {
                e.preventDefault();
                e.stopPropagation();
                dropZone.classList.add('drag-over');
            });
            
            dropZone.addEventListener('dragleave', (e) => {
                e.preventDefault();
                e.stopPropagation();
                dragCounter--;
                if (dragCounter === 0) {
                    dropZone.classList.remove('drag-over');
                }
            });
            
            dropZone.addEventListener('drop', (e) => {
                e.preventDefault();
                e.stopPropagation();
                dragCounter = 0;
                dropZone.classList.remove('drag-over');
                const files = e.dataTransfer.files;
                if (files.length > 0) {
                    selectedFile = files[0];
                    handleFileSelected(selectedFile);
                }
            });
            
            fileInput.addEventListener('change', (e) => {
                if (e.target.files.length > 0) {
                    selectedFile = e.target.files[0];
                    handleFileSelected(selectedFile);
                }
            });
        }
        
        function handleFileSelected(file) {
            const dropZone = document.getElementById('upload-drop-zone');
            const saveToDbBtn = document.getElementById('save-to-db-btn');
            
            if (dropZone) {
                dropZone.innerHTML = `
                    <svg viewBox="0 0 24 24" width="48" height="48" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                        <polyline points="14 2 14 8 20 8"></polyline>
                    </svg>
                    <p class="upload-text">${file.name}</p>
                    <p class="upload-subtext">Click to change file</p>
                `;
                dropZone.classList.add('file-selected');
            }
            
            if (saveToDbBtn) {
                saveToDbBtn.classList.add('btn-save-enabled');
            }
        }
        
        const downloadTemplateBtn = document.getElementById('download-template-btn');
        if (downloadTemplateBtn) {
            downloadTemplateBtn.addEventListener('click', () => {
                window.open(`${API_BASE_RECEIPTS}/template`, '_blank');
            });
        }
        
        const saveToDbBtn = document.getElementById('save-to-db-btn');
        if (saveToDbBtn) {
            saveToDbBtn.addEventListener('click', async () => {
                if (!selectedFile) {
                    alert('Please select a file to upload');
                    return;
                }

                const validationDiv = document.getElementById('upload-validation');
                if (validationDiv) {
                    validationDiv.style.display = 'none';
                    validationDiv.textContent = '';
                }

                try {
                    const text = await selectedFile.text();
                    const lines = text.trim().split('\n');
                    if (lines.length < 2) {
                        alert('CSV file is empty or has no data rows');
                        return;
                    }

                    function parseCSVLine(line) {
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
                            } else if (char === ',' && !inQuotes) {
                                result.push(current.trim());
                                current = '';
                            } else {
                                current += char;
                            }
                        }
                        result.push(current.trim());
                        return result;
                    }

                    const expectedHeaders = ['si_number', 'date', 'customer', 'qty', 'product', 'total', 'status', 'posted', 'created_at'];
                    const actualHeaders = parseCSVLine(lines[0]).map(h => h.trim().toLowerCase());
                    const headerErrors = [];
                    expectedHeaders.forEach((expected, index) => {
                        if (actualHeaders[index] !== expected) {
                            headerErrors.push(`Column ${index + 1}: expected "${expected}", got "${actualHeaders[index] || 'MISSING'}"`);
                        }
                    });

                    if (headerErrors.length > 0) {
                        throw new Error('Invalid CSV headers: ' + headerErrors.join('; '));
                    }

                    const [customersRes, productsRes] = await Promise.all([
                        fetch(`${API_BASE_CUSTOMERS}`),
                        fetch(`${API_BASE_PRODUCTS}`)
                    ]);

                    if (!customersRes.ok || !productsRes.ok) {
                        alert('Failed to fetch reference data from server');
                        return;
                    }

                    const customers = await customersRes.json();
                    const products = await productsRes.json();
                    const customerNames = new Set(customers.map(c => (c.company || '').trim()));
                    const productNames = new Set(products.map(p => (p.product || '').trim()));

                    const errors = [];
                    for (let i = 1; i < lines.length; i++) {
                        const cols = parseCSVLine(lines[i]);
                        if (cols.length !== expectedHeaders.length) {
                            errors.push(`Row ${i + 1}: expected ${expectedHeaders.length} columns, got ${cols.length}`);
                            continue;
                        }

                        const [si_number, date, customer, qty, product, total, status, posted, created_at] = cols;

                        if (!si_number || !date || !customer || !product) {
                            errors.push(`Row ${i + 1}: missing required fields (si_number, date, customer, product)`);
                            continue;
                        }

                        if (!/^SI#\s*\d{6}$/.test(si_number)) {
                            errors.push(`Row ${i + 1}: invalid SI number format "${si_number}". Expected format: SI# 000001`);
                        }

                        if (!customerNames.has(customer)) {
                            errors.push(`Row ${i + 1}: customer "${customer}" does not exist in the database`);
                        }

                        if (!productNames.has(product)) {
                            errors.push(`Row ${i + 1}: product "${product}" does not exist in the database`);
                        }

                        if (isNaN(parseInt(qty.replace(/,/g, '')))) {
                            errors.push(`Row ${i + 1}: qty must be a number`);
                        }

                        if (isNaN(parseFloat(total.replace(/,/g, '')))) {
                            errors.push(`Row ${i + 1}: total must be a number`);
                        }

                        if (status && !['Pending', 'Paid', 'Cancelled'].includes(status)) {
                            errors.push(`Row ${i + 1}: status must be Pending, Paid, or Cancelled`);
                        }

                        if (posted && !['true', 'false', 'TRUE', 'FALSE', 'True', 'False', '1', '0'].includes(posted)) {
                            errors.push(`Row ${i + 1}: posted must be true or false`);
                        }
                    }

                    if (errors.length > 0) {
                        if (validationDiv) {
                            validationDiv.textContent = errors.join('\n');
                            validationDiv.style.display = 'block';
                            validationDiv.style.background = '#fef2f2';
                            validationDiv.style.color = '#b91c1c';
                            validationDiv.style.border = '1px solid #fca5a5';
                        }
                        alert('Validation failed:\n\n' + errors.join('\n'));
                        return;
                    }

                    if (validationDiv) {
                        validationDiv.textContent = 'Validation passed. Ready to save.';
                        validationDiv.style.display = 'block';
                        validationDiv.style.background = '#f0fdf4';
                        validationDiv.style.color = '#15803d';
                        validationDiv.style.border = '1px solid #86efac';
                    }

                    const formData = new FormData();
                    formData.append('file', selectedFile);

                    const res = await fetch(`${API_BASE_RECEIPTS}/bulk-upload`, {
                        method: 'POST',
                        body: formData
                    });

                    const data = await res.json();

                    if (!res.ok) {
                        alert('Upload failed: ' + data.error);
                        return;
                    }

                    alert(`Successfully uploaded ${data.inserted} receipts to database`);
                    document.getElementById('upload-modal').style.display = 'none';

                    const dropZone = document.getElementById('upload-drop-zone');
                    const fileInput = document.getElementById('upload-file-input');

                    if (dropZone) {
                        dropZone.innerHTML = `
                            <svg viewBox="0 0 24 24" width="48" height="48" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                                <polyline points="17 8 12 3 7 8"></polyline>
                                <line x1="12" y1="3" x2="12" y2="15"></line>
                            </svg>
                            <p class="upload-text">Drag & Drop your file here</p>
                            <p class="upload-subtext">or click to browse</p>
                        `;
                        dropZone.classList.remove('file-selected');
                    }

                    if (fileInput) {
                        fileInput.value = '';
                    }

                    selectedFile = null;

                    if (saveToDbBtn) {
                        saveToDbBtn.classList.remove('btn-save-enabled');
                    }

                    loadReceiptTransactions();
                    loadCustomerReceivables();
                    loadTotalReceivables();
                    loadMonthlySales();
                } catch (err) {
                    console.error('Failed to upload file', err);
                    alert('Error uploading file: ' + err.message);
                }
            });
        }
        
        loadReceiptTransactions();
        loadCustomerReceivables();
        loadTotalReceivables();
        loadMonthlySales();
        loadWeeklySchedule();
        initializeScheduleCells();
    }

    async function loadReceiptTransactions() {
        const tbody = document.getElementById('receipt-transactions-body');
        if (!tbody) return;
        try {
            const res = await fetch(`${API_BASE_RECEIPTS}/aggregated`);
            const data = await res.json();
            receiptTransactionsData = data;
            receiptCurrentPage = 1;
            renderReceiptPage();
            renderReceiptPagination();
        } catch (err) {
            console.error('Failed to load receipt transactions', err);
            tbody.innerHTML = '<tr><td colspan="6">Failed to load data</td></tr>';
        }
    }
    
    function renderReceiptPage() {
        const tbody = document.getElementById('receipt-transactions-body');
        if (!tbody) return;
        
        const start = (receiptCurrentPage - 1) * receiptRowsPerPage;
        const end = start + receiptRowsPerPage;
        const pageData = receiptTransactionsData.slice(start, end);
        
        if (pageData.length === 0) {
            tbody.innerHTML = '<tr><td colspan="8">No data available</td></tr>';
            return;
        }
        
        tbody.innerHTML = pageData.map(row => {
            const isVoided = row.status === 'Voided';
            const isNotPosted = row.posted === false || row.posted === 'false';
            const isCrossed = isVoided || isNotPosted;
            return `
            <tr class="${isCrossed ? 'voided-row' : ''}">
                <td>${row.si_number}</td>
                <td>${row.date.split('T')[0]}</td>
                <td>${row.customer}</td>
                <td>${parseFloat(row.grand_total).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                <td>${row.status}</td>
                <td>${row.created_by_name || '-'}</td>
                <td><button class="btn-primary btn-pdf" onclick="downloadReceiptPdf('${row.si_number}')" title="Download PDF">
                    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
                </button></td>
                <td>${isCrossed ? '' : '<button class="btn-danger btn-void" onclick="voidReceipt(\'' + row.si_number + '\')">Void</button>'}</td>
            </tr>
            `;
        }).join('');
    }
    
    function renderReceiptPagination() {
        const totalPages = Math.max(1, Math.ceil(receiptTransactionsData.length / receiptRowsPerPage));
        if (receiptCurrentPage > totalPages) receiptCurrentPage = totalPages;
        
        const pagination = document.getElementById('receipt-pagination');
        if (!pagination) return;
        
        let pages = [];
        if (totalPages <= 7) {
            for (let i = 1; i <= totalPages; i++) pages.push(i);
        } else {
            let start = Math.max(1, receiptCurrentPage - 3);
            let end = Math.min(totalPages, start + 6);
            if (end - start < 6) {
                start = Math.max(1, end - 6);
            }
            for (let i = start; i <= end; i++) {
                pages.push(i);
            }
        }
        
        let buttonsHtml = '';
        buttonsHtml += `<button class="page-btn" id="receipt-prev-btn" ${receiptCurrentPage === 1 ? 'disabled' : ''}>&laquo; Prev</button>`;
        
        pages.forEach(i => {
            buttonsHtml += `<button class="page-btn ${i === receiptCurrentPage ? 'active' : ''}" id="receipt-page-${i}">${i}</button>`;
        });
        
        buttonsHtml += `<button class="page-btn" id="receipt-next-btn" ${receiptCurrentPage === totalPages ? 'disabled' : ''}>Next &raquo;</button>`;
        
        pagination.innerHTML = buttonsHtml;
        
        document.getElementById('receipt-prev-btn')?.addEventListener('click', () => {
            if (receiptCurrentPage > 1) {
                receiptCurrentPage--;
                renderReceiptPage();
                renderReceiptPagination();
            }
        });
        
        document.getElementById('receipt-next-btn')?.addEventListener('click', () => {
            if (receiptCurrentPage < totalPages) {
                receiptCurrentPage++;
                renderReceiptPage();
                renderReceiptPagination();
            }
        });
        
        pages.forEach(i => {
            document.getElementById(`receipt-page-${i}`)?.addEventListener('click', () => {
                receiptCurrentPage = i;
                renderReceiptPage();
                renderReceiptPagination();
            });
        });
    }

    async function voidReceipt(siNumber) {
        if (!confirm('Are you sure you want to void receipt ' + siNumber + '?')) return;
        try {
            const res = await fetch(`${API_BASE_RECEIPTS}/${encodeURIComponent(siNumber)}/void`, {
                method: 'PATCH'
            });
            if (!res.ok) {
                const errData = await res.json().catch(() => ({}));
                throw new Error(errData.error || 'Failed to void receipt');
            }
            alert('Receipt ' + siNumber + ' has been voided');
            loadReceiptTransactions();
            loadCustomerReceivables();
            loadTotalReceivables();
            loadMonthlySales();
            loadWeeklySchedule();
        } catch (err) {
            console.error('Failed to void receipt', err);
            alert('Error voiding receipt: ' + err.message);
        }
    }

    async function downloadReceiptPdf(siNumber) {
        try {
            const token = localStorage.getItem('goldenfield_auth_token');
            const headers = token ? { 'Authorization': `Bearer ${token}` } : {};
            const res = await fetch(`${API_BASE_RECEIPTS}/${encodeURIComponent(siNumber)}/pdf`, { headers });
            if (!res.ok) {
                const errData = await res.json().catch(() => ({}));
                throw new Error(errData.error || `Server error: ${res.status}`);
            }
            const blob = await res.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `receipt_${siNumber}.pdf`;
            document.body.appendChild(a);
            a.click();
            a.remove();
            window.URL.revokeObjectURL(url);
        } catch (err) {
            console.error('Failed to download receipt PDF', err);
            alert('Error downloading receipt: ' + err.message);
        }
    }

    async function loadCustomerReceivables() {
        const tbody = document.getElementById('customer-receivables-body');
        if (!tbody) return;
        try {
            const res = await fetch(`${API_BASE_RECEIPTS}/pending-receivables`);
            const data = await res.json();
            tbody.innerHTML = data.map(row => `
                <tr>
                    <td>${row.customer}</td>
                    <td>${parseFloat(row.receivables).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                </tr>
            `).join('');
        } catch (err) {
            console.error('Failed to load customer receivables', err);
            tbody.innerHTML = '<tr><td colspan="2">Failed to load data</td></tr>';
        }
    }

    async function loadTotalReceivables() {
        const totalEl = document.getElementById('total-receivables-value');
        if (!totalEl) return;
        try {
            const res = await fetch(`${API_BASE_RECEIPTS}/pending-receivables`);
            const data = await res.json();
            const total = data.reduce((sum, row) => sum + (parseFloat(row.receivables) || 0), 0);
            totalEl.textContent = 'P ' + total.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
        } catch (err) {
            console.error('Failed to load total receivables', err);
            totalEl.textContent = 'P 0.00';
        }
    }

    async function loadMonthlySales() {
        const el = document.getElementById('monthly-sales-value');
        if (!el) return;
        try {
            const res = await fetch(`${API_BASE_RECEIPTS}/monthly-sales?t=${Date.now()}`);
            const data = await res.json();
            const total = parseFloat(data.total_sales) || 0;
            el.textContent = 'P ' + total.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
        } catch (err) {
            console.error('Failed to load monthly sales', err);
            el.textContent = 'P 0.00';
        }
    }

    async function loadWeeklySchedule() {
        const cells = document.querySelectorAll('.schedule-cell');
        if (!cells.length) return;
        try {
            const res = await fetch(`${API_BASE_RECEIPTS}/weekly-schedule`);
            const data = await res.json();
            cells.forEach(cell => {
                const day = parseInt(cell.dataset.day);
                const row = data.find(r => r.day_of_week === day);
                if (row) {
                    cell.value = row.content || '';
                }
            });
        } catch (err) {
            console.error('Failed to load weekly schedule', err);
        }
    }

    async function saveWeeklyScheduleCell(dayOfWeek, content) {
        try {
            await fetch(`${API_BASE_RECEIPTS}/weekly-schedule`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ schedule: [{ day_of_week: dayOfWeek, content }] })
            });
        } catch (err) {
            console.error('Failed to save schedule cell', err);
        }
    }

    function initializeScheduleCells() {
        const cells = document.querySelectorAll('.schedule-cell');
        cells.forEach(cell => {
            cell.addEventListener('blur', async () => {
                const day = parseInt(cell.dataset.day);
                await saveWeeklyScheduleCell(day, cell.value);
            });
        });
    }