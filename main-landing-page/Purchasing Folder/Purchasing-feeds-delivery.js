if (typeof ModuleComponents === 'undefined') { window.ModuleComponents = {}; }

ModuleComponents['purchasing-feeds-delivery'] = (container) => {
    container.innerHTML = `
        <div class="feeds-delivery-layout">
            <div class="header-actions" style="display: flex; justify-content: space-between; align-items: center; gap: 12px; width: 100%;">
                <h2>Delivery Recording</h2>
                <button id="back-to-feeds-btn" class="btn-icon-circle" style="background-color: #EAD355; color: #1a1f2e;">
                    <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
                    <span class="btn-label">Back</span>
                </button>
            </div>
            <div class="action-buttons-row">
                <button id="add-feeds-delivery-btn" class="btn-icon-circle" style="background-color: #F7F18B; color: #1a1f2e;">
                    <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                    <span class="btn-label">Add - Feeds Delivery Record</span>
                </button>
                <button id="open-gas-operators-modal" class="btn-icon-circle" style="background-color: #F7F18B; color: #1a1f2e;">
                    <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
                    <span class="btn-label">Manage Gas Operators</span>
                </button>
            </div>
            <div class="tracking-cards-row delivery-cards-row">
                <div class="card tracking-card">
                    <h3>Monthly Pick up</h3>
                    <p class="card-sub-label">Number of Pickup this month</p>
                    <div class="card-value-row">
                        <div class="card-value">0</div>
                        <span class="trend-up">▲ 1%</span>
                    </div>
                    <p class="vs-last-month">vs last month</p>
                </div>
                <div class="card tracking-card">
                    <h3>Distance</h3>
                    <p class="card-sub-label">Average Monthly Total Distance</p>
                    <div class="card-value-row">
                        <div class="card-value">0 Km</div>
                        <span class="trend-up" style="color: #e74c3c;">▲ 0%</span>
                    </div>
                    <p class="vs-last-month">vs last month</p>
                </div>
                <div class="card tracking-card">
                    <h3>Time</h3>
                    <p class="card-sub-label">Average Monthly Total Driving Time</p>
                    <div class="card-value-row">
                        <div class="card-value">0 Hours</div>
                        <span class="trend-up" style="color: #e74c3c;">▲ 0%</span>
                    </div>
                    <p class="vs-last-month">vs last month</p>
                </div>
                <div class="card tracking-card">
                    <h3>Diesel Consumption</h3>
                    <p class="card-sub-label">Total Diesel Consumption this Month</p>
                    <div class="card-value-row">
                        <div class="card-value">100 liters</div>
                        <span class="trend-up" style="color: #e74c3c;">▲ 0%</span>
                    </div>
                    <p class="vs-last-month">vs last month</p>
                </div>
                <div class="card tracking-card">
                    <h3>Diesel Price</h3>
                    <p class="card-sub-label">Monthly Average of Diesel Price</p>
                    <div class="card-value-row">
                        <div class="card-value">P 0,000.00</div>
                        <span class="trend-up" style="color: #e74c3c;">▲ 0%</span>
                    </div>
                    <p class="vs-last-month">vs last month</p>
                </div>
                <div class="card tracking-card">
                    <h3>Total Diesel Price</h3>
                    <p class="card-sub-label">Monthly Average Consumption</p>
                    <div class="card-value-row">
                        <div class="card-value">P 0,000.00</div>
                        <span class="trend-up" style="color: #e74c3c;">▲ 0%</span>
                    </div>
                    <p class="vs-last-month">vs last month</p>
                </div>
            </div>

            <div class="card graph-placeholder feeds-pickup-card">
                <h3>Feeds Pickup Recordings</h3>
                <div class="table-wrap">
                    <table class="data-table product-table">
                        <thead>
                            <tr>
                                <th>FeedsPickup ID</th>
                                <th>Date</th>
                                <th>Invoice</th>
                                <th>Total Hours</th>
                                <th>Total Odometer</th>
                                <th>SI #</th>
                                <th>Company</th>
                                <th>Address</th>
                                <th>TIN Number</th>
                                <th>Price Per Liter</th>
                                <th>Liters</th>
                                <th>Total Amount</th>
                                <th>Created by</th>
                            </tr>
                        </thead>
                        <tbody id="feeds-pickup-table-body">
                            <tr><td colspan="13" style="text-align:center; color: #888;">No data yet</td></tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <div class="card graph-placeholder gas-suppliers-card">
                <h3>Gas Operator Suppliers</h3>
                <div class="table-wrap">
                    <table class="data-table product-table">
                        <thead>
                            <tr>
                                <th>Supplier ID</th>
                                <th>Company Name</th>
                                <th>Address</th>
                                <th>TIN No.</th>
                                <th>Contact Person</th>
                                <th>Contact No.</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody id="gas-suppliers-table-body">
                            <tr><td colspan="7" style="text-align:center; color: #888;">No data yet</td></tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <div id="delivery-feeds-modal" class="modal hidden">
                <div class="modal-content" style="max-width: 900px; width: 95%;">
                    <div class="modal-header-row">
                        <h3>Delivery Feeds Recording</h3>
                        <button class="modal-close-btn" id="close-delivery-feeds-modal">&times;</button>
                    </div>
                    <div class="modal-meta-row">
                        <div class="modal-field">
                            <label>Feeds Pick up ID</label>
                            <input type="text" id="delivery-pickup-id" value="FePicID-1" readonly style="background: #f1f5f9;" />
                        </div>
                        <div class="modal-field">
                            <label>Date</label>
                            <input type="date" id="delivery-date" class="modal-select" />
                        </div>
                        <div class="modal-field">
                            <label>Invoice</label>
                            <select id="delivery-invoice" class="modal-select">
                                <option value="">Select Invoice</option>
                            </select>
                        </div>
                    </div>

                    <div class="modal-field">
                        <label>Tracking</label>
                        <div class="table-wrap" style="max-height: 260px; overflow-y: auto; border: 1px solid #D6D6D6; border-radius: 6px; margin-top: 8px;">
                            <table class="data-table product-table" style="border-spacing: 0 4px; border-collapse: separate; min-width: 640px;">
                                <thead>
                                    <tr>
                                        <th style="padding: 6px 8px;">Location</th>
                                        <th style="padding: 6px 8px;">Time</th>
                                        <th style="padding: 6px 8px;">Odometer</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td style="padding: 6px 8px; font-weight: 600;">Farm Out</td>
                                        <td><input type="time" id="delivery-farm-out-time" style="width: 100%; box-sizing: border-box; padding: 6px 8px; border: 1px solid #D6D6D6; border-radius: 6px;" /></td>
                                        <td><input type="number" id="delivery-farm-out-odo" placeholder="Odometer" style="width: 100%; box-sizing: border-box; padding: 6px 8px; border: 1px solid #D6D6D6; border-radius: 6px;" /></td>
                                    </tr>
                                    <tr>
                                        <td style="padding: 6px 8px; font-weight: 600;">Feedmill IN</td>
                                        <td><input type="time" id="delivery-feedmill-in-time" style="width: 100%; box-sizing: border-box; padding: 6px 8px; border: 1px solid #D6D6D6; border-radius: 6px;" /></td>
                                        <td><input type="number" id="delivery-feedmill-in-odo" placeholder="Odometer" style="width: 100%; box-sizing: border-box; padding: 6px 8px; border: 1px solid #D6D6D6; border-radius: 6px;" /></td>
                                    </tr>
                                    <tr>
                                        <td style="padding: 6px 8px; font-weight: 600;">Feedmill Out</td>
                                        <td><input type="time" id="delivery-feedmill-out-time" style="width: 100%; box-sizing: border-box; padding: 6px 8px; border: 1px solid #D6D6D6; border-radius: 6px;" /></td>
                                        <td><input type="number" id="delivery-feedmill-out-odo" placeholder="Odometer" style="width: 100%; box-sizing: border-box; padding: 6px 8px; border: 1px solid #D6D6D6; border-radius: 6px;" /></td>
                                    </tr>
                                    <tr>
                                        <td style="padding: 6px 8px; font-weight: 600;">Farm IN</td>
                                        <td><input type="time" id="delivery-farm-in-time" style="width: 100%; box-sizing: border-box; padding: 6px 8px; border: 1px solid #D6D6D6; border-radius: 6px;" /></td>
                                        <td><input type="number" id="delivery-farm-in-odo" placeholder="Odometer" style="width: 100%; box-sizing: border-box; padding: 6px 8px; border: 1px solid #D6D6D6; border-radius: 6px;" /></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div class="modal-meta-row" style="margin-top: 12px;">
                        <div class="modal-field">
                            <label>Total Hours</label>
                            <input type="text" id="delivery-total-hours" readonly style="background: #f1f5f9;" />
                        </div>
                        <div class="modal-field">
                            <label>Total Odometer</label>
                            <input type="text" id="delivery-total-odo" readonly style="background: #f1f5f9;" />
                        </div>
                    </div>

                    <div class="modal-meta-row" style="margin-top: 12px;">
                        <div class="modal-field">
                            <label>Sales Invoice Number</label>
                            <input type="text" id="delivery-sales-invoice" />
                        </div>
                        <div class="modal-field">
                            <label>Company</label>
                            <select id="delivery-company" class="modal-select">
                                <option value="">Select Company</option>
                            </select>
                        </div>
                    </div>

                    <div class="modal-meta-row" style="margin-top: 12px;">
                        <div class="modal-field">
                            <label>Address</label>
                            <input type="text" id="delivery-address" readonly style="background: #f1f5f9;" />
                        </div>
                        <div class="modal-field">
                            <label>TIN Number</label>
                            <input type="text" id="delivery-tin" readonly style="background: #f1f5f9;" />
                        </div>
                    </div>

                    <div class="modal-meta-row" style="margin-top: 12px;">
                        <div class="modal-field">
                            <label>Price Per Liter</label>
                            <input type="number" id="delivery-price-per-liter" placeholder="0.00" step="0.01" />
                        </div>
                        <div class="modal-field">
                            <label>Liters</label>
                            <input type="number" id="delivery-liters" placeholder="0.00" step="0.01" />
                        </div>
                    </div>

                    <div class="modal-field" style="margin-top: 12px;">
                        <label>Amount</label>
                        <input type="text" id="delivery-amount" readonly style="background: #f1f5f9;" />
                    </div>

                    <div class="modal-tab-actions" style="margin-top: 16px; display: flex; align-items: center; gap: 12px;">
                        <label style="display: flex; align-items: center; gap: 8px; font-size: 13px; font-weight: 600; color: #1a1f2e; cursor: pointer;">
                            <input type="checkbox" id="delivery-petty-cash" style="width: 18px; height: 18px; accent-color: #D4AF37;" />
                            Record to petty cash?
                        </label>
                        <button id="save-delivery-record-btn" class="btn-primary">Save</button>
                    </div>
                </div>
            </div>

            <div id="gas-operators-modal" class="modal hidden">
                <div class="modal-content" style="max-width: 900px; width: 95%;">
                    <div class="modal-header-row">
                        <h3>Gasoline Operators Management</h3>
                        <button class="modal-close-btn" id="close-gas-operators-modal">&times;</button>
                    </div>
                    <div class="modal-tabs">
                        <button class="modal-tab active" id="tab-create-gas-operator" onclick="switchGasOperatorTab('create')">New Gasoline Operator</button>
                        <button class="modal-tab" id="tab-edit-gas-operator" onclick="switchGasOperatorTab('edit')">Manage Gasoline Operator</button>
                    </div>
                    <div id="panel-create-gas-operator" class="modal-tab-panel" style="display: block;">
                        <div class="modal-field">
                            <label>Gasoline Operator ID</label>
                            <input type="text" id="create-gas-operator-id" value="GasOpID-1" readonly style="background: #f1f5f9;" />
                        </div>
                        <div class="modal-meta-row">
                            <div class="modal-field">
                                <label>Gas Station Name</label>
                                <input type="text" id="create-gas-station-name" placeholder="Enter gas station name" />
                            </div>
                            <div class="modal-field">
                                <label>Address</label>
                                <input type="text" id="create-gas-address" placeholder="Enter address" />
                            </div>
                        </div>
                        <div class="modal-meta-row">
                            <div class="modal-field">
                                <label>TIN Number</label>
                                <input type="text" id="create-gas-tin" placeholder="TIN Number" />
                            </div>
                            <div class="modal-field">
                                <label>Contact Person</label>
                                <input type="text" id="create-gas-contact-person" placeholder="Enter contact person" />
                            </div>
                        </div>
                        <div class="modal-meta-row">
                            <div class="modal-field">
                                <label>Contact Number</label>
                                <input type="text" id="create-gas-contact-number" placeholder="+63 XXX-XXX-XXXX" maxlength="16" />
                            </div>
                            <div class="modal-field">
                                <label>Status</label>
                                <select id="create-gas-status" class="modal-select">
                                    <option value="Active">Active</option>
                                    <option value="Inactive">Inactive</option>
                                </select>
                            </div>
                        </div>
                        <div class="modal-tab-actions" style="margin-top: 16px;">
                            <button id="save-create-gas-operator-btn" class="btn-primary">Save</button>
                        </div>
                    </div>
                    <div id="panel-edit-gas-operator" class="modal-tab-panel" style="display: none;">
                        <div class="modal-field">
                            <label>Search Gasoline Operator</label>
                            <input type="text" id="edit-gas-operator-search" placeholder="Search by gas station name..." style="width: 100%; box-sizing: border-box; padding: 8px; border: 1px solid #D6D6D6; border-radius: 6px; font-size: 14px;" />
                            <div id="edit-gas-operator-search-results" style="position: absolute; top: 100%; left: 0; right: 0; background: #fff; border: 1px solid #e2e8f0; border-radius: 6px; max-height: 200px; overflow-y: auto; z-index: 10; display: none; box-shadow: 0 4px 6px rgba(0,0,0,0.1);"></div>
                        </div>
                        <div class="modal-field" style="margin-top: 12px;">
                            <label>Gasoline Operator ID</label>
                            <input type="text" id="edit-gas-operator-id" readonly style="background: #f1f5f9;" />
                        </div>
                        <div class="modal-meta-row">
                            <div class="modal-field">
                                <label>Gas Station Name</label>
                                <input type="text" id="edit-gas-station-name" placeholder="Enter gas station name" />
                            </div>
                            <div class="modal-field">
                                <label>Address</label>
                                <input type="text" id="edit-gas-address" placeholder="Enter address" />
                            </div>
                        </div>
                        <div class="modal-meta-row">
                            <div class="modal-field">
                                <label>TIN Number</label>
                                <input type="text" id="edit-gas-tin" placeholder="TIN Number" />
                            </div>
                            <div class="modal-field">
                                <label>Contact Person</label>
                                <input type="text" id="edit-gas-contact-person" placeholder="Enter contact person" />
                            </div>
                        </div>
                        <div class="modal-meta-row">
                            <div class="modal-field">
                                <label>Contact Number</label>
                                <input type="text" id="edit-gas-contact-number" placeholder="+63 XXX-XXX-XXXX" maxlength="16" />
                            </div>
                            <div class="modal-field">
                                <label>Status</label>
                                <select id="edit-gas-status" class="modal-select">
                                    <option value="Active">Active</option>
                                    <option value="Inactive">Inactive</option>
                                </select>
                            </div>
                        </div>
                        <div class="modal-tab-actions" style="margin-top: 16px;">
                            <button id="save-edit-gas-operator-btn" class="btn-primary">Update</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
};

function formatContactNumber(e) {
    let val = e.target.value.replace(/[^0-9+]/g, '');
    if (val.startsWith('+63')) {
        val = val.substring(3);
    } else if (val.startsWith('63')) {
        val = val.substring(2);
    } else if (val.startsWith('0')) {
        val = val.substring(1);
    }
    val = val.slice(0, 10);
    let formatted = '+63 ';
    if (val.length > 0) formatted += val.substring(0, 3);
    if (val.length > 3) formatted += '-' + val.substring(3, 6);
    if (val.length > 6) formatted += '-' + val.substring(6, 10);
    e.target.value = formatted;
}

function setupContactNumber(input) {
    if (!input) return;
    input.addEventListener('input', formatContactNumber);
    input.addEventListener('blur', (e) => {
        let val = e.target.value.replace(/[^0-9+]/g, '');
        if (val.startsWith('+63')) val = val.substring(3);
        else if (val.startsWith('63')) val = val.substring(2);
        else if (val.startsWith('0')) val = val.substring(1);
        val = val.slice(0, 10);
        let formatted = '+63 ';
        if (val.length > 0) formatted += val.substring(0, 3);
        if (val.length > 3) formatted += '-' + val.substring(3, 6);
        if (val.length > 6) formatted += '-' + val.substring(6, 10);
        e.target.value = formatted;
    });
}

function initializeModule(contentArea) {
    const currentTab = window.__currentTabId || 'purchasing-feeds-delivery';
    const render = ModuleComponents[currentTab] || ModuleComponents['purchasing-feeds-delivery'];
    render(contentArea);

    const backBtn = document.getElementById('back-to-feeds-btn');
    if (backBtn) {
        backBtn.addEventListener('click', () => switchTab('purchasing-feeds'));
    }

    const addDeliveryBtn = document.getElementById('add-feeds-delivery-btn');
    const deliveryModal = document.getElementById('delivery-feeds-modal');
    const closeDeliveryModal = document.getElementById('close-delivery-feeds-modal');

    if (addDeliveryBtn && deliveryModal) {
        addDeliveryBtn.addEventListener('click', async () => {
            const companySelect = document.getElementById('delivery-company');
            if (companySelect) {
                try {
                    const res = await fetch('/api/gas-operators', {
                        headers: { 'Authorization': `Bearer ${localStorage.getItem('goldenfield_auth_token')}` }
                    });
                    if (res.ok) {
                        const operators = await res.json();
                        const activeOperators = operators.filter(op => op.status === 'Active');
                        companySelect.innerHTML = '<option value="">Select Company</option>' +
                            activeOperators.map(op =>
                                `<option value="${op.gas_operator_id}" data-address="${op.address || ''}" data-tin="${op.tin_number || ''}">${op.gas_station_name}</option>`
                            ).join('');
                    }
                } catch (err) {
                    console.error('Failed to load gas operators for delivery modal', err);
                }
            }
            deliveryModal.classList.remove('hidden');
        });
    }

    if (closeDeliveryModal && deliveryModal) {
        closeDeliveryModal.addEventListener('click', () => {
            deliveryModal.classList.add('hidden');
        });
    }

    if (deliveryModal) {
        deliveryModal.addEventListener('click', (e) => {
            if (e.target === deliveryModal) {
                deliveryModal.classList.add('hidden');
            }
        });
    }

    const gasOperatorsBtn = document.getElementById('open-gas-operators-modal');
    const gasOperatorsModal = document.getElementById('gas-operators-modal');
    const closeGasOperatorsModal = document.getElementById('close-gas-operators-modal');

    if (gasOperatorsBtn && gasOperatorsModal) {
        gasOperatorsBtn.addEventListener('click', () => {
            gasOperatorsModal.classList.remove('hidden');
        });
    }

    if (closeGasOperatorsModal && gasOperatorsModal) {
        closeGasOperatorsModal.addEventListener('click', () => {
            gasOperatorsModal.classList.add('hidden');
        });
    }

    if (gasOperatorsModal) {
        gasOperatorsModal.addEventListener('click', (e) => {
            if (e.target === gasOperatorsModal) {
                gasOperatorsModal.classList.add('hidden');
            }
        });
    }

    setupContactNumber(document.getElementById('create-gas-contact-number'));
    setupContactNumber(document.getElementById('edit-gas-contact-number'));

    const pricePerLiterInput = document.getElementById('delivery-price-per-liter');
    const litersInput = document.getElementById('delivery-liters');
    const amountInput = document.getElementById('delivery-amount');

    function calculateAmount() {
        const price = parseFloat(pricePerLiterInput.value) || 0;
        const liters = parseFloat(litersInput.value) || 0;
        amountInput.value = (price * liters).toFixed(2);
    }

    if (pricePerLiterInput && litersInput && amountInput) {
        pricePerLiterInput.addEventListener('input', calculateAmount);
        litersInput.addEventListener('input', calculateAmount);
    }

    const farmOutTimeInput = document.getElementById('delivery-farm-out-time');
    const farmInTimeInput = document.getElementById('delivery-farm-in-time');
    const farmOutOdoInput = document.getElementById('delivery-farm-out-odo');
    const farmInOdoInput = document.getElementById('delivery-farm-in-odo');
    const totalHoursInput = document.getElementById('delivery-total-hours');
    const totalOdoInput = document.getElementById('delivery-total-odo');

    function calculateTotals() {
        if (farmOutTimeInput && farmInTimeInput && totalHoursInput) {
            const farmOut = farmOutTimeInput.value;
            const farmIn = farmInTimeInput.value;
            if (farmOut && farmIn) {
                const [outH, outM] = farmOut.split(':').map(Number);
                const [inH, inM] = farmIn.split(':').map(Number);
                let outMinutes = outH * 60 + outM;
                let inMinutes = inH * 60 + inM;
                let diffMinutes = inMinutes - outMinutes;
                if (diffMinutes < 0) diffMinutes += 24 * 60;
                const hours = Math.floor(diffMinutes / 60);
                const minutes = diffMinutes % 60;
                totalHoursInput.value = hours + 'h ' + minutes + 'm';
            } else {
                totalHoursInput.value = '';
            }
        }

        if (farmOutOdoInput && farmInOdoInput && totalOdoInput) {
            const outOdo = parseFloat(farmOutOdoInput.value) || 0;
            const inOdo = parseFloat(farmInOdoInput.value) || 0;
            if (inOdo >= outOdo) {
                totalOdoInput.value = (inOdo - outOdo).toFixed(2);
            } else {
                totalOdoInput.value = '';
            }
        }
    }

    if (farmOutTimeInput && farmInTimeInput) {
        farmOutTimeInput.addEventListener('change', calculateTotals);
        farmInTimeInput.addEventListener('change', calculateTotals);
    }
    if (farmOutOdoInput && farmInOdoInput) {
        farmOutOdoInput.addEventListener('input', calculateTotals);
        farmInOdoInput.addEventListener('input', calculateTotals);
    }

    const deliveryCompanySelect = document.getElementById('delivery-company');
    const deliveryAddressInput = document.getElementById('delivery-address');
    const deliveryTinInput = document.getElementById('delivery-tin');

    if (deliveryCompanySelect) {
        deliveryCompanySelect.addEventListener('change', (e) => {
            const selectedOption = e.target.selectedOptions[0];
            if (selectedOption && selectedOption.value) {
                if (deliveryAddressInput) deliveryAddressInput.value = selectedOption.dataset.address || '';
                if (deliveryTinInput) deliveryTinInput.value = selectedOption.dataset.tin || '';
            } else {
                if (deliveryAddressInput) deliveryAddressInput.value = '';
                if (deliveryTinInput) deliveryTinInput.value = '';
            }
        });
    }

    window.switchGasOperatorTab = function(tab) {
        const createPanel = document.getElementById('panel-create-gas-operator');
        const editPanel = document.getElementById('panel-edit-gas-operator');
        const createTab = document.getElementById('tab-create-gas-operator');
        const editTab = document.getElementById('tab-edit-gas-operator');

        if (tab === 'create') {
            createPanel.style.display = 'block';
            editPanel.style.display = 'none';
            createTab.classList.add('active');
            editTab.classList.remove('active');
        } else {
            createPanel.style.display = 'none';
            editPanel.style.display = 'block';
            createTab.classList.remove('active');
            editTab.classList.add('active');
        }
    };

    async function loadGasOperators() {
        const tbody = document.getElementById('gas-suppliers-table-body');
        if (!tbody) return;

        try {
            const res = await fetch('/api/gas-operators', {
                headers: { 'Authorization': `Bearer ${localStorage.getItem('goldenfield_auth_token')}` }
            });
            if (!res.ok) throw new Error('Failed to fetch gas operators');
            const operators = await res.json();
            tbody.innerHTML = operators.map(op => `
                <tr>
                    <td>${op.gas_operator_id || '-'}</td>
                    <td>${op.gas_station_name || '-'}</td>
                    <td>${op.address || '-'}</td>
                    <td>${op.tin_number || '-'}</td>
                    <td>${op.contact_person || '-'}</td>
                    <td>${op.contact_number || '-'}</td>
                    <td>${op.status || '-'}</td>
                </tr>
            `).join('');
        } catch (err) {
            console.error('Failed to load gas operators', err);
            tbody.innerHTML = '<tr><td colspan="7" style="text-align:center; color: #e74c3c;">Failed to load data</td></tr>';
        }
    }

    const saveCreateGasOperatorBtn = document.getElementById('save-create-gas-operator-btn');
    if (saveCreateGasOperatorBtn) {
        saveCreateGasOperatorBtn.addEventListener('click', async () => {
            const gasStationName = document.getElementById('create-gas-station-name').value.trim();
            const address = document.getElementById('create-gas-address').value.trim();
            const tin = document.getElementById('create-gas-tin').value.trim();
            const contactPerson = document.getElementById('create-gas-contact-person').value.trim();
            const contactNumber = document.getElementById('create-gas-contact-number').value.trim();
            const status = document.getElementById('create-gas-status').value;
            const operatorId = document.getElementById('create-gas-operator-id').value;

            if (!gasStationName) {
                alert('Gas Station Name is required');
                return;
            }

            try {
                const res = await fetch('/api/gas-operators', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('goldenfield_auth_token')}`
                    },
                    body: JSON.stringify({
                        gas_operator_id: operatorId,
                        gas_station_name: gasStationName,
                        address: address || null,
                        tin_number: tin || null,
                        contact_person: contactPerson || null,
                        contact_number: contactNumber || null,
                        status: status || 'Active'
                    })
                });

                if (!res.ok) {
                    const errData = await res.json().catch(() => ({}));
                    throw new Error(errData.error || 'Failed to save gas operator');
                }

                alert('Gas operator saved successfully');
                document.getElementById('gas-operators-modal').classList.add('hidden');
                loadGasOperators();
            } catch (err) {
                alert('Error: ' + err.message);
            }
        });
    }

    const saveEditGasOperatorBtn = document.getElementById('save-edit-gas-operator-btn');
    if (saveEditGasOperatorBtn) {
        saveEditGasOperatorBtn.addEventListener('click', async () => {
            const operatorId = document.getElementById('edit-gas-operator-id').value;
            const gasStationName = document.getElementById('edit-gas-station-name').value.trim();
            const address = document.getElementById('edit-gas-address').value.trim();
            const tin = document.getElementById('edit-gas-tin').value.trim();
            const contactPerson = document.getElementById('edit-gas-contact-person').value.trim();
            const contactNumber = document.getElementById('edit-gas-contact-number').value.trim();
            const status = document.getElementById('edit-gas-status').value;

            if (!gasStationName) {
                alert('Gas Station Name is required');
                return;
            }

            try {
                const res = await fetch(`/api/gas-operators/${operatorId}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('goldenfield_auth_token')}`
                    },
                    body: JSON.stringify({
                        gas_operator_id: operatorId,
                        gas_station_name: gasStationName,
                        address: address || null,
                        tin_number: tin || null,
                        contact_person: contactPerson || null,
                        contact_number: contactNumber || null,
                        status: status || 'Active'
                    })
                });

                if (!res.ok) {
                    const errData = await res.json().catch(() => ({}));
                    throw new Error(errData.error || 'Failed to update gas operator');
                }

                alert('Gas operator updated successfully');
                document.getElementById('gas-operators-modal').classList.add('hidden');
                loadGasOperators();
            } catch (err) {
                alert('Error: ' + err.message);
            }
        });
    }

    const editSearchInput = document.getElementById('edit-gas-operator-search');
    const searchResults = document.getElementById('edit-gas-operator-search-results');
    let gasOperatorSearchDebounce = null;

    if (editSearchInput && searchResults) {
        editSearchInput.addEventListener('input', async (e) => {
            const query = e.target.value.trim();
            if (gasOperatorSearchDebounce) clearTimeout(gasOperatorSearchDebounce);

            if (query.length < 1) {
                searchResults.style.display = 'none';
                return;
            }

            gasOperatorSearchDebounce = setTimeout(async () => {
                try {
                    const res = await fetch(`/api/gas-operators?search=${encodeURIComponent(query)}`, {
                        headers: { 'Authorization': `Bearer ${localStorage.getItem('goldenfield_auth_token')}` }
                    });
                    if (!res.ok) throw new Error('Failed to search');
                    const operators = await res.json();

                    searchResults.innerHTML = operators.map(op => `
                        <div style="padding: 10px 12px; cursor: pointer; border-bottom: 1px solid #f0f0f0;" 
                             data-gas-operator-id="${op.gas_operator_id}"
                             onmouseover="this.style.background='#f8f9fa'" 
                             onmouseout="this.style.background='#fff'"
                             onclick="window._selectGasOperator && window._selectGasOperator('${op.gas_operator_id}')">
                            <div style="font-weight: 600; color: #1a1f2e;">${op.gas_station_name}</div>
                            <div style="font-size: 12px; color: #666;">${op.gas_operator_id} ${op.address ? '• ' + op.address : ''}</div>
                        </div>
                    `).join('');

                    searchResults.style.display = operators.length > 0 ? 'block' : 'none';
                } catch (err) {
                    console.error('Search error', err);
                }
            }, 200);
        });
    }

    window._selectGasOperator = async (gasOperatorId) => {
        try {
            const res = await fetch(`/api/gas-operators/${gasOperatorId}`, {
                headers: { 'Authorization': `Bearer ${localStorage.getItem('goldenfield_auth_token')}` }
            });
            if (!res.ok) throw new Error('Failed to fetch operator');
            const op = await res.json();

            document.getElementById('edit-gas-operator-id').value = op.gas_operator_id || '';
            document.getElementById('edit-gas-station-name').value = op.gas_station_name || '';
            document.getElementById('edit-gas-address').value = op.address || '';
            document.getElementById('edit-gas-tin').value = op.tin_number || '';
            document.getElementById('edit-gas-contact-person').value = op.contact_person || '';
            document.getElementById('edit-gas-contact-number').value = op.contact_number || '';
            document.getElementById('edit-gas-status').value = op.status || 'Active';

            if (searchResults) searchResults.style.display = 'none';
            if (editSearchInput) editSearchInput.value = '';

            switchGasOperatorTab('edit');
        } catch (err) {
            alert('Error loading operator: ' + err.message);
        }
    };

    loadGasOperators();
}
