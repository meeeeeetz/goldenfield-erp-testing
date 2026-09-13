if (typeof ModuleComponents === 'undefined') { window.ModuleComponents = {}; }

ModuleComponents['operations-shipping-permit'] = (container) => {
        container.innerHTML = `
            <div class="shipping-layout">
                <div class="header-actions">
                    <h2>Shipping Permit</h2>
                </div>
                <div class="action-buttons-row">
                    <button id="open-permit-modal" class="btn-icon-circle" style="background-color: #F7F18B; color: #1a1f2e;">
                        <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                        <span class="btn-label">Add Shipping Permit</span>
                    </button>
                    <button id="renew-licenses-btn" class="btn-icon-circle" style="background-color: #EAD355; color: #1a1f2e;">
                        <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.5V18a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5.5"></path><polyline points="17 2 21 7 17 3.5 23 8.5 17 12"></polyline><polyline points="7 22 11 17 7 21.5 3 16.5 7 12"></polyline></svg>
                        <span class="btn-label">Renew Licenses</span>
                    </button>
                    <button id="add-recipient-details-btn" class="btn-icon-circle" style="background-color: #EAD355; color: #1a1f2e;">
                        <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="8.5" cy="7" r="4"></circle><line x1="20" y1="8" x2="20" y2="14"></line><line x1="23" y1="11" x2="17" y2="11"></line></svg>
                        <span class="btn-label">Add Recipient Details</span>
                    </button>
                </div>
                <div class="tracking-cards-row" style="grid-template-columns: repeat(3, 1fr);">
                    <div class="card tracking-card">
                        <h3>License to Operate ( BAI )</h3>
                        <p class="card-sub-label">Reg No. : PLT - L - 1496</p>
                        <p class="vs-last-month">Expiration Date: August 28, 2026</p>
                    </div>
                    <div class="card tracking-card">
                        <h3>Animal Disease Monitoring Compliance Certificate</h3>
                        <p class="card-sub-label">ADMC No. : 2511-2603-PO-20517</p>
                        <p class="vs-last-month">Expiration Date: August 28, 2026</p>
                    </div>
                    <div class="card tracking-card">
                        <h3>Certifiicate of Free Status AI Type A subtype H5 and H7</h3>
                        <p class="card-sub-label">CC No. : R3-2026-17-03-4577</p>
                        <p class="vs-last-month">Expiration Date: August 28, 2026</p>
                    </div>
                </div>
                <div class="permit-boxes-row">
                    <div class="card shipping-box">
                        <h3>Pending Shipping Permits</h3>
                        <div class="table-wrap permit-table-wrap">
                            <table class="data-table permit-table">
                                <thead>
                                    <tr>
                                        <th>VHC ID</th>
                                        <th>VHC Date</th>
                                        <th>VHC Expiration Date</th>
                                        <th>Province</th>
                                        <th>City</th>
                                        <th>Barangay</th>
                                        <th>Reciepient Company</th>
                                        <th>Qty</th>
                                        <th>Unti</th>
                                        <th>Transport type</th>
                                        <th>Plate Number</th>
                                        <th>Recepient Name</th>
                                        <th>Reciepeint No.</th>
                                        <th>Handlers License</th>
                                        <th>Expiration</th>
                                        <th>Transport Carrier</th>
                                        <th>Expiration</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr><td>VHC-001</td><td>2026-07-01</td><td>2026-07-15</td><td>Bulacan</td><td>Meycauayan</td><td>Brgy. 1</td><td>ABC Poultry</td><td>500</td><td>Box</td><td>Truck</td><td>ABC-123</td><td>Juan Dela Cruz</td><td>RN-001</td><td>HL-101</td><td>2026-12-31</td><td>Carrier A</td><td>2026-12-31</td></tr>
                                    <tr><td>VHC-002</td><td>2026-07-02</td><td>2026-07-16</td><td>Pampanga</td><td>San Fernando</td><td>Brgy. 2</td><td>XYZ Farms</td><td>320</td><td>Box</td><td>Van</td><td>XYZ-456</td><td>Maria Santos</td><td>RN-002</td><td>HL-102</td><td>2026-11-30</td><td>Carrier B</td><td>2026-11-30</td></tr>
                                    <tr><td>VHC-003</td><td>2026-07-03</td><td>2026-07-17</td><td>Cavite</td><td>Bacoor</td><td>Brgy. 3</td><td>LMN Hatchery</td><td>750</td><td>Box</td><td>Truck</td><td>LMN-789</td><td>Pedro Reyes</td><td>RN-003</td><td>HL-103</td><td>2027-01-15</td><td>Carrier C</td><td>2027-01-15</td></tr>
                                    <tr><td>VHC-004</td><td>2026-07-04</td><td>2026-07-18</td><td>Laguna</td><td>Calamba</td><td>Brgy. 4</td><td>OPQ Livestock</td><td>210</td><td>Box</td><td>Van</td><td>OPQ-012</td><td>Ana Garcia</td><td>RN-004</td><td>HL-104</td><td>2026-10-20</td><td>Carrier A</td><td>2026-10-20</td></tr>
                                    <tr><td>VHC-005</td><td>2026-07-05</td><td>2026-07-19</td><td>Batangas</td><td>Batangas City</td><td>Brgy. 5</td><td>RST Poultry</td><td>640</td><td>Box</td><td>Truck</td><td>RST-345</td><td>Luis Cruz</td><td>RN-005</td><td>HL-105</td><td>2026-09-10</td><td>Carrier B</td><td>2026-09-10</td></tr>
                                </tbody>
                            </table>
                        </div>
                        <div class="pagination">
                            <button class="page-btn">&laquo; Prev</button>
                            <button class="page-btn active">1</button>
                            <button class="page-btn">Next &raquo;</button>
                        </div>
                    </div>
                    <div class="card shipping-box">
                        <h3>Shipping Permit Transactions</h3>
                        <div class="table-wrap permit-table-wrap">
                            <table class="data-table permit-table">
                                <thead>
                                    <tr>
                                        <th>VHC ID</th>
                                        <th>VHC Date</th>
                                        <th>VHC Expiration Date</th>
                                        <th>Province</th>
                                        <th>City</th>
                                        <th>Barangay</th>
                                        <th>Reciepient Company</th>
                                        <th>Qty</th>
                                        <th>Unti</th>
                                        <th>Transport type</th>
                                        <th>Plate Number</th>
                                        <th>Recepient Name</th>
                                        <th>Reciepeint No.</th>
                                        <th>Handlers License</th>
                                        <th>Expiration</th>
                                        <th>Transport Carrier</th>
                                        <th>Expiration</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr><td>VHC-101</td><td>2026-06-20</td><td>2026-07-04</td><td>Bulacan</td><td>Meycauayan</td><td>Brgy. 1</td><td>ABC Poultry</td><td>480</td><td>Box</td><td>Truck</td><td>ABC-123</td><td>Juan Dela Cruz</td><td>RN-001</td><td>HL-101</td><td>2026-12-31</td><td>Carrier A</td><td>2026-12-31</td></tr>
                                    <tr><td>VHC-102</td><td>2026-06-21</td><td>2026-07-05</td><td>Pampanga</td><td>San Fernando</td><td>Brgy. 2</td><td>XYZ Farms</td><td>300</td><td>Box</td><td>Van</td><td>XYZ-456</td><td>Maria Santos</td><td>RN-002</td><td>HL-102</td><td>2026-11-30</td><td>Carrier B</td><td>2026-11-30</td></tr>
                                    <tr><td>VHC-103</td><td>2026-06-22</td><td>2026-07-06</td><td>Cavite</td><td>Bacoor</td><td>Brgy. 3</td><td>LMN Hatchery</td><td>720</td><td>Box</td><td>Truck</td><td>LMN-789</td><td>Pedro Reyes</td><td>RN-003</td><td>HL-103</td><td>2027-01-15</td><td>Carrier C</td><td>2027-01-15</td></tr>
                                    <tr><td>VHC-104</td><td>2026-06-23</td><td>2026-07-07</td><td>Laguna</td><td>Calamba</td><td>Brgy. 4</td><td>OPQ Livestock</td><td>190</td><td>Box</td><td>Van</td><td>OPQ-012</td><td>Ana Garcia</td><td>RN-004</td><td>HL-104</td><td>2026-10-20</td><td>Carrier A</td><td>2026-10-20</td></tr>
                                    <tr><td>VHC-105</td><td>2026-06-24</td><td>2026-07-08</td><td>Batangas</td><td>Batangas City</td><td>Brgy. 5</td><td>RST Poultry</td><td>610</td><td>Box</td><td>Truck</td><td>RST-345</td><td>Luis Cruz</td><td>RN-005</td><td>HL-105</td><td>2026-09-10</td><td>Carrier B</td><td>2026-09-10</td></tr>
                                    <tr><td>VHC-106</td><td>2026-06-25</td><td>2026-07-09</td><td>Rizal</td><td>Antipolo</td><td>Brgy. 6</td><td>UVW Farms</td><td>430</td><td>Box</td><td>Truck</td><td>UVW-678</td><td>Carlos Mendoza</td><td>RN-006</td><td>HL-106</td><td>2026-12-01</td><td>Carrier C</td><td>2026-12-01</td></tr>
                                    <tr><td>VHC-107</td><td>2026-06-26</td><td>2026-07-10</td><td>Tarlac</td><td>Tarlac City</td><td>Brgy. 7</td><td>DEF Poultry</td><td>560</td><td>Box</td><td>Van</td><td>DEF-901</td><td>Sofia Torres</td><td>RN-007</td><td>HL-107</td><td>2027-02-28</td><td>Carrier A</td><td>2027-02-28</td></tr>
                                    <tr><td>VHC-108</td><td>2026-06-27</td><td>2026-07-11</td><td>Nueva Ecija</td><td>Cabanatuan</td><td>Brgy. 8</td><td>GHI Hatchery</td><td>380</td><td>Box</td><td>Truck</td><td>GHI-234</td><td>Mark Lopez</td><td>RN-008</td><td>HL-108</td><td>2026-08-15</td><td>Carrier B</td><td>2026-08-15</td></tr>
                                </tbody>
                            </table>
                        </div>
                        <div class="pagination">
                            <button class="page-btn">&laquo; Prev</button>
                            <button class="page-btn active">1</button>
                            <button class="page-btn">Next &raquo;</button>
                        </div>
                    </div>
                    <div class="card shipping-box">
                        <h3>Recipients</h3>
                        <div class="table-wrap permit-table-wrap">
                            <table class="data-table permit-table">
                                <thead>
                                    <tr>
                                        <th>Recipient ID</th>
                                        <th>Reciepient Company</th>
                                        <th>Province</th>
                                        <th>City</th>
                                        <th>Barangay</th>
                                        <th>Plate Number</th>
                                        <th>Recepient Name</th>
                                        <th>Reciepeint No.</th>
                                        <th>Handlers License</th>
                                        <th>Expiration</th>
                                        <th>Transport Carrier</th>
                                        <th>Expiration</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr><td>RC-001</td><td>ABC Poultry</td><td>Bulacan</td><td>Meycauayan</td><td>Brgy. 1</td><td>ABC-123</td><td>Juan Dela Cruz</td><td>RN-001</td><td>HL-101</td><td>2026-12-31</td><td>Carrier A</td><td>2026-12-31</td></tr>
                                    <tr><td>RC-002</td><td>XYZ Farms</td><td>Pampanga</td><td>San Fernando</td><td>Brgy. 2</td><td>XYZ-456</td><td>Maria Santos</td><td>RN-002</td><td>HL-102</td><td>2026-11-30</td><td>Carrier B</td><td>2026-11-30</td></tr>
                                    <tr><td>RC-003</td><td>LMN Hatchery</td><td>Cavite</td><td>Bacoor</td><td>Brgy. 3</td><td>LMN-789</td><td>Pedro Reyes</td><td>RN-003</td><td>HL-103</td><td>2027-01-15</td><td>Carrier C</td><td>2027-01-15</td></tr>
                                    <tr><td>RC-004</td><td>OPQ Livestock</td><td>Laguna</td><td>Calamba</td><td>Brgy. 4</td><td>OPQ-012</td><td>Ana Garcia</td><td>RN-004</td><td>HL-104</td><td>2026-10-20</td><td>Carrier A</td><td>2026-10-20</td></tr>
                                    <tr><td>RC-005</td><td>RST Poultry</td><td>Batangas</td><td>Batangas City</td><td>Brgy. 5</td><td>RST-345</td><td>Luis Cruz</td><td>RN-005</td><td>HL-105</td><td>2026-09-10</td><td>Carrier B</td><td>2026-09-10</td></tr>
                                </tbody>
                            </table>
                        </div>
                        <div class="pagination">
                            <button class="page-btn">&laquo; Prev</button>
                            <button class="page-btn active">1</button>
                            <button class="page-btn">Next &raquo;</button>
                        </div>
                    </div>
                </div>
                 <div id="permit-modal" class="modal hidden">
                     <div class="modal-content">
                         <h3>Issue Shipping Permit</h3>
                         <input type="text" placeholder="Destination" id="permit-dest-input" />
                         <input type="text" placeholder="Vehicle / Plate" id="permit-vehicle-input" />
                         <button id="save-permit-btn" class="btn-primary">Issue Permit</button>
                     </div>
                 </div>
                 <div id="recipient-details-modal" class="modal hidden">
                     <div class="modal-content" style="max-width: 980px; width: 95%;">
                         <div class="modal-header-row">
                             <h3>Recipients Details</h3>
                             <button class="modal-close-btn" id="close-recipient-details-modal">&times;</button>
                         </div>
                         <div class="modal-tabs">
                             <button class="modal-tab active" id="tab-create-recipient" onclick="switchRecipientTab('create')">Create New Recipients</button>
                             <button class="modal-tab" id="tab-manage-recipient" onclick="switchRecipientTab('manage')">Manage Recipients</button>
                         </div>
                         <div id="panel-create-recipient" class="modal-tab-panel" style="display: block;">
                             <div class="modal-field">
                                 <label>Recipient ID (ShReID-1 Start with)</label>
                                 <input type="text" id="create-recipient-id" readonly />
                             </div>
                             <div class="modal-meta-row">
                                 <div class="modal-field">
                                     <label>Customer Name</label>
                                     <input type="text" id="create-recipient-customer-name" placeholder="Enter customer name" />
                                 </div>
                                 <div class="modal-field">
                                     <label>Province</label>
                                     <input type="text" id="create-recipient-province" placeholder="Enter province" />
                                 </div>
                             </div>
                             <div class="modal-meta-row">
                                 <div class="modal-field">
                                     <label>City</label>
                                     <input type="text" id="create-recipient-city" placeholder="Enter city" />
                                 </div>
                                 <div class="modal-field">
                                     <label>Barangay</label>
                                     <input type="text" id="create-recipient-barangay" placeholder="Enter barangay" />
                                 </div>
                             </div>
                             <div class="modal-meta-row">
                                 <div class="modal-field">
                                     <label>Transport Type</label>
                                     <select id="create-recipient-transport-type" class="modal-select">
                                         <option value="">Select Transport Type</option>
                                         <option value="Truck">Truck</option>
                                         <option value="Van">Van</option>
                                         <option value="Lorries">Lorries</option>
                                         <option value="Tricycle">Tricycle</option>
                                         <option value="Motorcycle">Motorcycle</option>
                                         <option value="Car">Car</option>
                                         <option value="Pickup">Pickup</option>
                                     </select>
                                 </div>
                                 <div class="modal-field">
                                     <label>Plate Number</label>
                                     <input type="text" id="create-recipient-plate-number" placeholder="Enter plate number" />
                                 </div>
                             </div>
                             <div class="modal-meta-row">
                                 <div class="modal-field">
                                     <label>Contact</label>
                                     <input type="text" id="create-recipient-contact" placeholder="Enter contact person" />
                                 </div>
                                 <div class="modal-field">
                                     <label>Contact Number</label>
                                     <input type="text" id="create-recipient-contact-number" placeholder="+63 XXX-XXX-XXXX" maxlength="16" />
                                 </div>
                             </div>
                             <div class="modal-meta-row">
                                 <div class="modal-field">
                                     <label>Handlers License</label>
                                     <input type="text" id="create-recipient-handlers-license" placeholder="Enter handlers license" />
                                 </div>
                                 <div class="modal-field">
                                     <label>Handlers Expiration</label>
                                     <input type="date" id="create-recipient-handlers-expiration" class="modal-select" />
                                 </div>
                             </div>
                             <div class="modal-meta-row">
                                 <div class="modal-field">
                                     <label>Transport Carrier</label>
                                     <input type="text" id="create-recipient-transport-carrier" placeholder="Enter transport carrier" />
                                 </div>
                                 <div class="modal-field">
                                     <label>Transport Expiration</label>
                                     <input type="date" id="create-recipient-transport-expiration" class="modal-select" />
                                 </div>
                             </div>
                             <div class="modal-meta-row">
                                 <div class="modal-field">
                                     <label>Status</label>
                                     <select id="create-recipient-status" class="modal-select">
                                         <option value="Active">Active</option>
                                         <option value="Inactive">Inactive</option>
                                     </select>
                                 </div>
                             </div>
                             <div class="modal-tab-actions">
                                 <button id="save-create-recipient-btn" class="btn-primary">Save</button>
                             </div>
                         </div>
                         <div id="panel-manage-recipient" class="modal-tab-panel" style="display: none;">
                             <div class="modal-field">
                                 <label>Search Recipient</label>
                                 <input type="text" id="manage-recipient-search" placeholder="Search by customer name, plate number..." />
                             </div>
                             <div class="table-wrap" style="max-height: 380px; overflow-y: auto; margin-top: 8px;">
                                 <table class="data-table permit-table">
                                     <thead>
                                         <tr>
                                             <th>Recipient ID</th>
                                             <th>Customer Name</th>
                                             <th>Province</th>
                                             <th>City</th>
                                             <th>Barangay</th>
                                             <th>Transport Type</th>
                                             <th>Plate Number</th>
                                             <th>Contact</th>
                                             <th>Contact Number</th>
                                             <th>Handlers License</th>
                                             <th>Handlers Expiration</th>
                                             <th>Transport Carrier</th>
                                             <th>Transport Expiration</th>
                                             <th>Status</th>
                                             <th style="width: 90px;"></th>
                                         </tr>
                                     </thead>
                                 </table>
                             </div>
                             <div class="pagination">
                                 <button class="page-btn">&laquo; Prev</button>
                                 <button class="page-btn active">1</button>
                                 <button class="page-btn">Next &raquo;</button>
                             </div>
                         </div>
                     </div>
                 </div>
             </div>
        `;

        document.getElementById('open-permit-modal').onclick = () => {
            document.getElementById('permit-modal').classList.remove('hidden');
        };
        document.getElementById('renew-licenses-btn').onclick = () => {
            alert('Renew Licenses clicked');
        };
        document.getElementById('add-recipient-details-btn').onclick = () => {
            openRecipientDetailsModal();
        };
        document.getElementById('save-permit-btn').onclick = () => {
            const dest = document.getElementById('permit-dest-input').value;
            const vehicle = document.getElementById('permit-vehicle-input').value;
            alert(`Issuing permit to ${dest} via ${vehicle}...`);
            document.getElementById('permit-modal').classList.add('hidden');
        };

        function switchRecipientTab(tab) {
            const createPanel = document.getElementById('panel-create-recipient');
            const managePanel = document.getElementById('panel-manage-recipient');
            const createTab = document.getElementById('tab-create-recipient');
            const manageTab = document.getElementById('tab-manage-recipient');

            if (tab === 'create') {
                createPanel.style.display = 'block';
                managePanel.style.display = 'none';
                createTab.classList.add('active');
                manageTab.classList.remove('active');
            } else {
                createPanel.style.display = 'none';
                managePanel.style.display = 'block';
                createTab.classList.remove('active');
                manageTab.classList.add('active');
            }
        }

        function openRecipientDetailsModal() {
            const modal = document.getElementById('recipient-details-modal');
            if (!modal) return;

            document.getElementById('create-recipient-id').value = 'ShReID-1';
            document.getElementById('create-recipient-customer-name').value = '';
            document.getElementById('create-recipient-province').value = '';
            document.getElementById('create-recipient-city').value = '';
            document.getElementById('create-recipient-barangay').value = '';
            document.getElementById('create-recipient-transport-type').value = '';
            document.getElementById('create-recipient-plate-number').value = '';
            document.getElementById('create-recipient-contact').value = '';
            document.getElementById('create-recipient-contact-number').value = '';
            document.getElementById('create-recipient-handlers-license').value = '';
            document.getElementById('create-recipient-handlers-expiration').value = '';
            document.getElementById('create-recipient-transport-carrier').value = '';
            document.getElementById('create-recipient-transport-expiration').value = '';
            document.getElementById('create-recipient-status').value = 'Active';

            switchRecipientTab('create');
            modal.classList.remove('hidden');
        }

        function closeRecipientDetailsModal() {
            const modal = document.getElementById('recipient-details-modal');
            if (modal) modal.classList.add('hidden');
        }

        function saveCreateRecipient() {
            const customerId = document.getElementById('create-recipient-id').value;
            const customerName = document.getElementById('create-recipient-customer-name').value.trim();
            const province = document.getElementById('create-recipient-province').value.trim();
            const city = document.getElementById('create-recipient-city').value.trim();
            const barangay = document.getElementById('create-recipient-barangay').value.trim();
            const transportType = document.getElementById('create-recipient-transport-type').value;
            const plateNumber = document.getElementById('create-recipient-plate-number').value.trim();
            const contact = document.getElementById('create-recipient-contact').value.trim();
            const contactNumber = document.getElementById('create-recipient-contact-number').value.trim();
            const handlersLicense = document.getElementById('create-recipient-handlers-license').value.trim();
            const handlersExpiration = document.getElementById('create-recipient-handlers-expiration').value;
            const transportCarrier = document.getElementById('create-recipient-transport-carrier').value.trim();
            const transportExpiration = document.getElementById('create-recipient-transport-expiration').value.trim();
            const status = document.getElementById('create-recipient-status').value;

            if (!customerName) {
                alert('Customer Name is required');
                return;
            }

            alert(`Recipient ${customerId} for ${customerName} saved successfully (design only - no backend)`);
        }

        const closeRecipientDetailsBtn = document.getElementById('close-recipient-details-modal');
        if (closeRecipientDetailsBtn) {
            closeRecipientDetailsBtn.onclick = closeRecipientDetailsModal;
        }

        if (document.getElementById('recipient-details-modal')) {
            document.getElementById('recipient-details-modal').addEventListener('click', (e) => {
                if (e.target === document.getElementById('recipient-details-modal')) {
                    document.getElementById('recipient-details-modal').classList.add('hidden');
                }
            });
        }

        const saveCreateRecipientBtn = document.getElementById('save-create-recipient-btn');
        if (saveCreateRecipientBtn) {
            saveCreateRecipientBtn.onclick = saveCreateRecipient;
        }

        window.switchRecipientTab = switchRecipientTab;
        window.openRecipientDetailsModal = openRecipientDetailsModal;
        window.closeRecipientDetailsModal = closeRecipientDetailsModal;
        window.saveCreateRecipient = saveCreateRecipient;
    };

function initializeModule(contentArea) {
    const currentTab = window.__currentTabId || 'operations';
    const render = ModuleComponents[currentTab] || ModuleComponents['operations'];
    render(contentArea);
}
