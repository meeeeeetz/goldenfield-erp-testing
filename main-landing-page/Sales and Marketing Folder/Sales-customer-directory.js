if (typeof ModuleComponents === 'undefined') { window.ModuleComponents = {}; }

ModuleComponents['sales-customer-directory'] = (container) => {
    container.innerHTML = `
        <div class="header-actions">
            <h2>Customer Directory</h2>
        </div>
        <div class="action-buttons-row">
            <button id="add-remove-customer-btn" class="btn-icon-circle">
                <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                <span class="btn-label">Manage Customer</span>
            </button>
        </div>
        <div class="content-gap"></div>
        <div class="card shipping-box customer-lifetime-value-box">
            <h3>Customer Lifetime Value</h3>
            <p class="section-description">Top 10 active customers by gross receipts</p>
            <div class="table-wrap">
                <table class="data-table product-table">
                    <thead>
                        <tr>
                            <th>Customer</th>
                            <th>Gross Receipts</th>
                        </tr>
                    </thead>
                    <tbody id="top-customers-body">
                        <tr><td colspan="2">Loading...</td></tr>
                    </tbody>
                </table>
            </div>
        </div>
        <div class="card shipping-box customer-directory-box">
            <div class="box-header-row">
                <h3>Customer Directory</h3>
                <input type="text" id="customer-search" placeholder="Search customers..." class="box-search-input">
            </div>
            <div class="table-wrap">
                <table class="data-table product-table">
                    <thead>
                        <tr>
                            <th>Customer ID</th>
                            <th>Company</th>
                            <th>Address</th>
                            <th>TIN No.</th>
                            <th>Contact Name</th>
                            <th>Contact No.</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody id="customers-table-body"></tbody>
                </table>
            </div>
            <div class="pagination">
                <button class="page-btn">&laquo; Prev</button>
                <button class="page-btn active">1</button>
                <button class="page-btn">Next &raquo;</button>
            </div>
        </div>
        <div id="customer-modal" class="modal" style="display:none;">
            <div class="modal-content egg-products-modal">
                <div class="modal-header-row">
                    <h3>Customer Management</h3>
                    <button class="modal-close-btn" id="close-customer-modal">&times;</button>
                </div>
                <div class="modal-tabs">
                    <button class="modal-tab active" data-tab="add-customer">Add New Customer</button>
                    <button class="modal-tab" data-tab="edit-customer">Edit Customer</button>
                </div>
                <div class="modal-tab-panel" id="panel-add-customer">
                    <label>Customer ID</label>
                    <input type="text" id="new-customer-id" readonly>
                    <label>Company / Customer</label>
                    <input type="text" id="new-customer-name" placeholder="Enter company or customer name">
                    <label>Address</label>
                    <input type="text" id="new-customer-address" placeholder="Enter address">
                    <label>TIN No.</label>
                    <input type="text" id="new-customer-tin" placeholder="000-000-000-00000" maxlength="15">
                    <label>Contact Name</label>
                    <input type="text" id="new-customer-contact-name" placeholder="Enter contact name">
                    <label>Contact Number</label>
                        <input type="text" id="new-customer-contact-number" placeholder="+63 000 - 000 - 0000" autocomplete="off">
                    <label>Status</label>
                    <select id="new-customer-status" class="modal-select">
                        <option value="Active">Active</option>
                        <option value="Inactive">Inactive</option>
                    </select>
                    <div class="modal-tab-actions">
                        <button class="btn-primary" id="save-new-customer">Save</button>
                    </div>
                </div>
                <div class="modal-tab-panel" id="panel-edit-customer" style="display:none;">
                    <label>Choose Customer</label>
                    <select id="edit-customer-name" class="modal-select">
                        <option value="">Select customer...</option>
                    </select>
                    <label>Customer ID</label>
                    <input type="text" id="edit-customer-id" readonly>
                    <label>Company</label>
                    <input type="text" id="edit-customer-company">
                    <label>Address</label>
                    <input type="text" id="edit-customer-address">
                    <label>TIN No.</label>
                    <input type="text" id="edit-customer-tin" maxlength="15">
                    <label>Contact Name</label>
                    <input type="text" id="edit-customer-contact-name">
                    <label>Contact Number</label>
                    <input type="text" id="edit-customer-contact-number" autocomplete="off">
                    <label>Status</label>
                    <select id="edit-customer-status" class="modal-select">
                        <option value="Active">Active</option>
                        <option value="Inactive">Inactive</option>
                    </select>
                    <div class="modal-tab-actions">
                        <button class="btn-primary" id="save-edit-customer">Save</button>
                        <button class="btn-danger" id="delete-customer">Delete</button>
                    </div>
                </div>
            </div>
        </div>
    `;
};

var API_BASE_CUSTOMERS = '/api/customers';

async function loadCustomersForEdit() {
    try {
        const res = await fetch(`${API_BASE_CUSTOMERS}`);
        const customers = await res.json();
        const customerSelect = document.getElementById('edit-customer-name');
        customerSelect.innerHTML = '<option value="">Select customer...</option>';
        customers.forEach(c => {
            const option = document.createElement('option');
            option.value = c.customer_id;
            option.textContent = c.company || c.customer_name || c.customer_id;
            customerSelect.appendChild(option);
        });
    } catch (err) {
        console.error('Failed to load customers', err);
    }
}

async function getNextCustomerId() {
    try {
        const res = await fetch(`${API_BASE_CUSTOMERS}/next-id`);
        const data = await res.json();
        return data.customer_id;
    } catch (err) {
        console.error('Failed to get next customer ID', err);
        return 'CusID-0001';
    }
}

function formatTinInput(input) {
    let value = input.value.replace(/\D/g, '');
    value = value.replace(/^(\d{3})(\d{0,3})(\d{0,3})(\d{0,5}).*/, (_, a, b, c, d) => {
        let result = a;
        if (b) result += '-' + b;
        if (c) result += '-' + c;
        if (d) result += '-' + d;
        return result;
    });
    input.value = value;
}

function formatContactNumber(input) {
    // 1. Extract only the digits, ignoring any existing formatting
    let rawDigits = input.value.replace(/\D/g, '');

    // 2. Strip the '63' prefix if it's already there to get the clean local number
    if (rawDigits.startsWith('63')) {
        rawDigits = rawDigits.substring(2);
    }

    // 3. Cap the local number at 10 digits (e.g., 9171234567)
    rawDigits = rawDigits.substring(0, 10);

    // 4. Build the formatted string step-by-step as the user types
    let formatted = '+63';

    if (rawDigits.length > 0) {
        // First group: up to 3 digits (e.g., "+63 917")
        const part1 = rawDigits.substring(0, 3);
        formatted += ' ' + part1;

        if (rawDigits.length > 3) {
            // Second group: next 3 digits, separated by a slash (e.g., "+63 917 / 123")
            const part2 = rawDigits.substring(3, 6);
            formatted += ' - ' + part2;

            if (rawDigits.length > 6) {
                // Third group: final 4 digits, separated by a dash (e.g., "+63 917 / 123 - 4567")
                const part3 = rawDigits.substring(6, 10);
                formatted += ' - ' + part3;
            }
        }
    }

    // 5. Update the input field value
    input.value = formatted;
}

function initializeCustomerModal() {
    const modal = document.getElementById('customer-modal');
    const openBtn = document.getElementById('add-remove-customer-btn');
    const closeBtn = document.getElementById('close-customer-modal');
    if (!modal || !openBtn) return;
    const tabs = modal.querySelectorAll('.modal-tab');
    const panels = {
        'add-customer': document.getElementById('panel-add-customer'),
        'edit-customer': document.getElementById('panel-edit-customer')
    };


    openBtn.addEventListener('click', async () => {
        modal.style.display = 'flex';
        document.getElementById('new-customer-id').value = await getNextCustomerId();
        document.getElementById('new-customer-name').value = '';
        document.getElementById('new-customer-address').value = '';
        document.getElementById('new-customer-tin').value = '';
        document.getElementById('new-customer-contact-name').value = '';
        document.getElementById('new-customer-contact-number').value = '';
        document.getElementById('new-customer-status').value = 'Active';
    });

    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    modal.addEventListener('click', (e) => {
        if (e.target === modal) modal.style.display = 'none';
    });

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            Object.values(panels).forEach(p => p.style.display = 'none');
            panels[tab.dataset.tab].style.display = 'flex';
        });
    });

    loadCustomersForEdit();

    const customerSelect = document.getElementById('edit-customer-name');
    customerSelect.addEventListener('change', async function() {
        const cid = this.value;
        if (!cid) return;
        try {
            const res = await fetch(`${API_BASE_CUSTOMERS}/${cid}`);
            const data = await res.json();
            document.getElementById('edit-customer-id').value = data.customer_id;
            document.getElementById('edit-customer-company').value = data.company || data.customer_name || '';
            document.getElementById('edit-customer-address').value = data.address || '';
            document.getElementById('edit-customer-tin').value = data.tin_no || '';
            document.getElementById('edit-customer-contact-name').value = data.contact_name || '';
            document.getElementById('edit-customer-contact-number').value = data.contact_number || '';
            document.getElementById('edit-customer-status').value = data.status || 'Active';
        } catch (err) {
            console.error('Failed to load customer', err);
        }
    });

    document.getElementById('new-customer-tin').addEventListener('input', function() {
        formatTinInput(this);
    });

    document.getElementById('edit-customer-tin').addEventListener('input', function() {
        formatTinInput(this);
    });

    document.getElementById('new-customer-contact-number').addEventListener('input', function() {
        formatContactNumber(this);
    });

    document.getElementById('edit-customer-contact-number').addEventListener('input', function() {
        formatContactNumber(this);
    });

    document.getElementById('save-new-customer').addEventListener('click', async () => {
        const customerId = document.getElementById('new-customer-id').value;
        const company = document.getElementById('new-customer-name').value;
        const address = document.getElementById('new-customer-address').value;
        const tin = document.getElementById('new-customer-tin').value;
        const contactName = document.getElementById('new-customer-contact-name').value;
        const contactNumber = document.getElementById('new-customer-contact-number').value;
        const status = document.getElementById('new-customer-status').value;

        if (!company) return alert('Company/Customer Name is required');

        try {
            const res = await fetch(`${API_BASE_CUSTOMERS}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ customer_id: customerId, company, address, tin_no: tin, contact_name: contactName, contact_number: contactNumber, status })
            });
            if (!res.ok) {
                const errData = await res.json().catch(() => ({}));
                throw new Error(errData.error || `Server error: ${res.status}`);
            }
            alert('New customer saved: ' + company);
            modal.style.display = 'none';
            loadCustomersForEdit();
            loadCustomersTable();
        } catch (err) {
            console.error('Failed to save customer', err);
            alert('Error saving customer: ' + err.message);
        }
    });

    document.getElementById('save-edit-customer').addEventListener('click', async () => {
        const customerId = document.getElementById('edit-customer-id').value;
        const company = document.getElementById('edit-customer-company').value;
        const address = document.getElementById('edit-customer-address').value;
        const tin = document.getElementById('edit-customer-tin').value;
        const contactName = document.getElementById('edit-customer-contact-name').value;
        const contactNumber = document.getElementById('edit-customer-contact-number').value;
        const status = document.getElementById('edit-customer-status').value;

        if (!customerId) return alert('Please select a customer');

        try {
            const res = await fetch(`${API_BASE_CUSTOMERS}/${customerId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ company, address, tin_no: tin, contact_name: contactName, contact_number: contactNumber, status })
            });
            if (!res.ok) {
                const errData = await res.json().catch(() => ({}));
                throw new Error(errData.error || `Server error: ${res.status}`);
            }
            alert('Customer updated: ' + company);
            modal.style.display = 'none';
            loadCustomersForEdit();
            loadCustomersTable();
        } catch (err) {
            console.error('Failed to update customer', err);
            alert('Error updating customer: ' + err.message);
        }
    });

    document.getElementById('delete-customer').addEventListener('click', async () => {
        const customerId = document.getElementById('edit-customer-id').value;
        const company = document.getElementById('edit-customer-company').value;

        if (!customerId) return alert('Please select a customer');
        if (confirm('Delete ' + company + '?')) {
            try {
                const res = await fetch(`${API_BASE_CUSTOMERS}/${customerId}`, { method: 'DELETE' });
                if (!res.ok) {
                    const errData = await res.json().catch(() => ({}));
                    throw new Error(errData.error || `Server error: ${res.status}`);
                }
                alert('Customer deleted');
                modal.style.display = 'none';
                loadCustomersForEdit();
                loadCustomersTable();
            } catch (err) {
                console.error('Failed to delete customer', err);
                alert('Error deleting customer: ' + err.message);
            }
        }
    });
}

var CUSTOMERS_PER_PAGE = 5;
var allCustomers = [];

async function loadCustomersTable() {
    const tbody = document.getElementById('customers-table-body');
    if (!tbody) return;
    
    // Show loading state
    tbody.innerHTML = '<tr><td colspan="7" style="text-align:center; padding: 20px;">Loading customers...</td></tr>';
    
    try {
        const res = await fetch(`${API_BASE_CUSTOMERS}`);
        if (!res.ok) {
            throw new Error(`HTTP ${res.status}: ${res.statusText}`);
        }
        allCustomers = await res.json();
        renderCustomerRows(allCustomers);
    } catch (err) {
        console.error('Failed to load customers table', err);
        tbody.innerHTML = '<tr><td colspan="7" style="text-align:center; color: #e74c3c;">Error loading customers. Please refresh.</td></tr>';
    }
}

function renderCustomerRows(customers) {
    const tbody = document.getElementById('customers-table-body');
    if (!tbody) return;
    tbody.innerHTML = customers.map(c => `
        <tr>
            <td>${c.customer_id}</td>
            <td>${c.company || ''}</td>
            <td>${c.address || ''}</td>
            <td>${c.tin_no || ''}</td>
            <td>${c.contact_name || ''}</td>
            <td>${c.contact_number || ''}</td>
            <td>${c.status || ''}</td>
        </tr>
    `).join('');
    
    const emptyRows = CUSTOMERS_PER_PAGE - customers.length;
    for (let i = 0; i < emptyRows; i++) {
        tbody.innerHTML += `<tr><td colspan="7">&nbsp;</td></tr>`;
    }
}

function initializeModule(contentArea) {
    const render = ModuleComponents['sales-customer-directory'];
    render(contentArea);
    initializeCustomerModal();
    loadCustomersTable();

    const searchInput = document.getElementById('customer-search');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const query = e.target.value.toLowerCase().trim();
            if (!query) {
                renderCustomerRows(allCustomers);
                return;
            }
            const filtered = allCustomers.filter(c => {
                return (c.customer_id || '').toLowerCase().includes(query) ||
                       (c.company || '').toLowerCase().includes(query) ||
                       (c.address || '').toLowerCase().includes(query) ||
                       (c.tin_no || '').toLowerCase().includes(query) ||
                       (c.contact_name || '').toLowerCase().includes(query) ||
                       (c.contact_number || '').toLowerCase().includes(query) ||
                       (c.status || '').toLowerCase().includes(query);
            });
            renderCustomerRows(filtered);
        });
    }

    loadTopCustomersByReceipts();
}

async function loadTopCustomersByReceipts() {
    const tbody = document.getElementById('top-customers-body');
    if (!tbody) return;
    
    try {
        const res = await fetch(`${API_BASE_CUSTOMERS}/top-by-receipts`);
        if (!res.ok) {
            throw new Error(`HTTP ${res.status}: ${res.statusText}`);
        }
        const data = await res.json();
        
        if (data.length === 0) {
            tbody.innerHTML = '<tr><td colspan="2" style="text-align:center;">No data available</td></tr>';
            return;
        }
        
        tbody.innerHTML = data.map(c => `
            <tr>
                <td>${c.company}</td>
                <td>₱${parseFloat(c.gross_receipts).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
            </tr>
        `).join('');
    } catch (err) {
        console.error('Failed to load top customers by receipts', err);
        tbody.innerHTML = '<tr><td colspan="2" style="text-align:center; color: #e74c3c;">Error loading data. Please refresh.</td></tr>';
    }
}







