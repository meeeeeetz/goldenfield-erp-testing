if (typeof ModuleComponents === 'undefined') { window.ModuleComponents = {}; }

function getAuthHeaders() {
    const token = localStorage.getItem('goldenfield_auth_token');
    return token ? { 'Authorization': `Bearer ${token}` } : {};
}

var API_BASE_SHIPPING_PERMIT_RECIPIENTS = '/api/shipping-permit-recipients';
var API_BASE_SHIPPING_LICENSES = '/api/shipping-permit-licenses';

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
                                        <th>Customer Name</th>
                                        <th>Province</th>
                                        <th>City</th>
                                        <th>Barangay</th>
                                        <th>Transport Type</th>
                                        <th>Plate Number</th>
                                        <th>Contact</th>
                                        <th>Contact Number</th>
                                        <th>Handlers License</th>
                                        <th>Handlers Issued</th>
                                        <th>Handlers Expiration</th>
                                        <th>Transport Carrier</th>
                                        <th>Transport Issued</th>
                                        <th>Transport Expiration</th>
                                        <th>Status</th>
                                        <th>Created by</th>
                                    </tr>
                                </thead>
                                <tbody id="recipients-table-body">
                                    <tr><td colspan="15" style="text-align:center; color: #94a3b8;">Loading recipients...</td></tr>
                                </tbody>
                            </table>
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
                                  <div class="modal-field" style="flex: 0 0 calc(40% - 4px);">
                                      <label>Handlers License</label>
                                      <input type="text" id="create-recipient-handlers-license" placeholder="Enter handlers license" />
                                  </div>
                                  <div class="modal-field" style="flex: 0 0 calc(30% - 4px);">
                                      <label>Handlers Issued</label>
                                      <input type="date" id="create-recipient-handlers-issued" class="modal-select" />
                                  </div>
                                  <div class="modal-field" style="flex: 0 0 calc(30% - 4px);">
                                      <label>Handlers Expiration</label>
                                      <input type="date" id="create-recipient-handlers-expiration" class="modal-select" />
                                  </div>
                              </div>
                              <div class="modal-meta-row">
                                  <div class="modal-field" style="flex: 0 0 calc(40% - 4px);">
                                      <label>Transport Carrier</label>
                                      <input type="text" id="create-recipient-transport-carrier" placeholder="Enter transport carrier" />
                                  </div>
                                  <div class="modal-field" style="flex: 0 0 calc(30% - 4px);">
                                      <label>Transport Issued</label>
                                      <input type="date" id="create-recipient-transport-issued" class="modal-select" />
                                  </div>
                                  <div class="modal-field" style="flex: 0 0 calc(30% - 4px);">
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
                             <div class="modal-field">
                                 <label>Recipient ID (ShReID-1 Start with)</label>
                                 <input type="text" id="manage-recipient-id" readonly />
                             </div>
                             <div class="modal-meta-row">
                                 <div class="modal-field">
                                     <label>Customer Name</label>
                                     <input type="text" id="manage-recipient-customer-name" placeholder="Enter customer name" />
                                 </div>
                                 <div class="modal-field">
                                     <label>Province</label>
                                     <input type="text" id="manage-recipient-province" placeholder="Enter province" />
                                 </div>
                             </div>
                             <div class="modal-meta-row">
                                 <div class="modal-field">
                                     <label>City</label>
                                     <input type="text" id="manage-recipient-city" placeholder="Enter city" />
                                 </div>
                                 <div class="modal-field">
                                     <label>Barangay</label>
                                     <input type="text" id="manage-recipient-barangay" placeholder="Enter barangay" />
                                 </div>
                             </div>
                             <div class="modal-meta-row">
                                 <div class="modal-field">
                                     <label>Transport Type</label>
                                     <select id="manage-recipient-transport-type" class="modal-select">
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
                                     <input type="text" id="manage-recipient-plate-number" placeholder="Enter plate number" />
                                 </div>
                             </div>
                             <div class="modal-meta-row">
                                 <div class="modal-field">
                                     <label>Contact</label>
                                     <input type="text" id="manage-recipient-contact" placeholder="Enter contact person" />
                                 </div>
                                 <div class="modal-field">
                                     <label>Contact Number</label>
                                     <input type="text" id="manage-recipient-contact-number" placeholder="+63 XXX-XXX-XXXX" maxlength="16" />
                                 </div>
                             </div>
                              <div class="modal-meta-row">
                                  <div class="modal-field" style="flex: 0 0 calc(40% - 4px);">
                                      <label>Handlers License</label>
                                      <input type="text" id="manage-recipient-handlers-license" placeholder="Enter handlers license" />
                                  </div>
                                  <div class="modal-field" style="flex: 0 0 calc(30% - 4px);">
                                      <label>Handlers Issued</label>
                                      <input type="date" id="manage-recipient-handlers-issued" class="modal-select" />
                                  </div>
                                  <div class="modal-field" style="flex: 0 0 calc(30% - 4px);">
                                      <label>Handlers Expiration</label>
                                      <input type="date" id="manage-recipient-handlers-expiration" class="modal-select" />
                                  </div>
                              </div>
                              <div class="modal-meta-row">
                                  <div class="modal-field" style="flex: 0 0 calc(40% - 4px);">
                                      <label>Transport Carrier</label>
                                      <input type="text" id="manage-recipient-transport-carrier" placeholder="Enter transport carrier" />
                                  </div>
                                  <div class="modal-field" style="flex: 0 0 calc(30% - 4px);">
                                      <label>Transport Issued</label>
                                      <input type="date" id="manage-recipient-transport-issued" class="modal-select" />
                                  </div>
                                  <div class="modal-field" style="flex: 0 0 calc(30% - 4px);">
                                      <label>Transport Expiration</label>
                                      <input type="date" id="manage-recipient-transport-expiration" class="modal-select" />
                                  </div>
                              </div>
                             <div class="modal-meta-row">
                                 <div class="modal-field">
                                     <label>Status</label>
                                     <select id="manage-recipient-status" class="modal-select">
                                         <option value="Active">Active</option>
                                         <option value="Inactive">Inactive</option>
                                     </select>
                                 </div>
                             </div>
                             <div class="modal-tab-actions">
                                 <button id="save-manage-recipient-btn" class="btn-primary">Save</button>
                             </div>
                          </div>
                      </div>
                  </div>
                  <div id="shipping-licenses-modal" class="modal hidden">
                      <div class="modal-content" style="max-width: 980px; width: 95%;">
                          <div class="modal-header-row">
                              <h3>Licenses</h3>
                              <button class="modal-close-btn" id="close-shipping-licenses-modal">&times;</button>
                          </div>
                          <div class="modal-tabs">
                              <button class="modal-tab active" id="tab-create-license" onclick="switchLicenseTab('create')">Create New License</button>
                              <button class="modal-tab" id="tab-manage-license" onclick="switchLicenseTab('manage')">Manage License</button>
                          </div>
                          <div id="panel-create-license" class="modal-tab-panel" style="display: block;">
                              <div class="modal-field">
                                  <label>Shipping Licenses ID (ShLiID-1 Start with)</label>
                                  <input type="text" id="create-license-id" readonly />
                              </div>
                              <div class="modal-meta-row">
                                  <div class="modal-field">
                                      <label>License Name</label>
                                      <input type="text" id="create-license-name" placeholder="Enter license name" />
                                  </div>
                                  <div class="modal-field">
                                      <label>Reg No.</label>
                                      <input type="text" id="create-license-reg-no" placeholder="Enter registration number" />
                                  </div>
                              </div>
                              <div class="modal-meta-row">
                                  <div class="modal-field">
                                      <label>Issued Date</label>
                                      <input type="date" id="create-license-issued-date" class="modal-select" />
                                  </div>
                                  <div class="modal-field">
                                      <label>Expiration Date</label>
                                      <input type="date" id="create-license-expiration-date" class="modal-select" />
                                  </div>
                              </div>
                              <div class="modal-meta-row">
                                  <div class="modal-field">
                                      <label>Status</label>
                                      <select id="create-license-status" class="modal-select">
                                          <option value="Active">Active</option>
                                          <option value="Inactive">Inactive</option>
                                      </select>
                                  </div>
                              </div>
                              <div class="modal-field">
                                  <label>License Picture</label>
                                  <div id="create-license-photo-zone" class="upload-drop-zone" style="border: 2px dashed #cbd5e1; border-radius: 8px; padding: 12px; text-align: center; cursor: pointer; background: #f8fafc; transition: border-color 0.2s, background 0.2s; position: relative;">
                                      <div class="upload-zone-content" style="display: flex; flex-direction: column; align-items: center; gap: 8px;">
                                          <div class="upload-placeholder" style="color: #64748b; font-size: 14px;">
                                              <span>Drag & Drop or Click to Upload Picture (JPG/WebP only, max 5MB)</span>
                                          </div>
                                          <div class="upload-preview" style="display:none; flex-direction: column; align-items: center; gap: 8px; position: relative;">
                                              <img src="" alt="preview" style="max-width: 200px; max-height: 200px; object-fit: contain; border-radius: 4px; border: 1px solid #e2e8f0;" />
                                              <button type="button" class="remove-upload-btn" style="position: absolute; top: -8px; right: -8px; background: #ef4444; color: #fff; border: none; border-radius: 50%; width: 24px; height: 24px; cursor: pointer; font-size: 14px; line-height: 1; display: flex; align-items: center; justify-content: center;">&times;</button>
                                          </div>
                                      </div>
                                      <input type="file" id="create-license-photo-input" accept="image/jpeg,image/jpg,image/webp" style="display:none" />
                                  </div>
                              </div>
                              <div class="modal-tab-actions">
                                  <button id="save-create-license-btn" class="btn-primary">Save</button>
                              </div>
                          </div>
                          <div id="panel-manage-license" class="modal-tab-panel" style="display: none;">
                              <div class="modal-field">
                                  <label>Search License</label>
                                  <input type="text" id="manage-license-search" placeholder="Search by license name, reg no..." />
                              </div>
                              <div class="modal-field">
                                  <label>Shipping Licenses ID (ShLiID-1 Start with)</label>
                                  <input type="text" id="manage-license-id" readonly />
                              </div>
                              <div class="modal-meta-row">
                                  <div class="modal-field">
                                      <label>License Name</label>
                                      <input type="text" id="manage-license-name" placeholder="Enter license name" />
                                  </div>
                                  <div class="modal-field">
                                      <label>Reg No.</label>
                                      <input type="text" id="manage-license-reg-no" placeholder="Enter registration number" />
                                  </div>
                              </div>
                              <div class="modal-meta-row">
                                  <div class="modal-field">
                                      <label>Issued Date</label>
                                      <input type="date" id="manage-license-issued-date" class="modal-select" />
                                  </div>
                                  <div class="modal-field">
                                      <label>Expiration Date</label>
                                      <input type="date" id="manage-license-expiration-date" class="modal-select" />
                                  </div>
                              </div>
                              <div class="modal-meta-row">
                                  <div class="modal-field">
                                      <label>Status</label>
                                      <select id="manage-license-status" class="modal-select">
                                          <option value="Active">Active</option>
                                          <option value="Inactive">Inactive</option>
                                      </select>
                                  </div>
                              </div>
                              <div class="modal-field">
                                  <label>License Picture</label>
                                  <div id="manage-license-photo-zone" class="upload-drop-zone" style="border: 2px dashed #cbd5e1; border-radius: 8px; padding: 12px; text-align: center; cursor: pointer; background: #f8fafc; transition: border-color 0.2s, background 0.2s; position: relative;">
                                      <div class="upload-zone-content" style="display: flex; flex-direction: column; align-items: center; gap: 8px;">
                                          <div class="upload-placeholder" style="color: #64748b; font-size: 14px;">
                                              <span>Drag & Drop or Click to Upload Picture (JPG/WebP only, max 5MB)</span>
                                          </div>
                                          <div class="upload-preview" style="display:none; flex-direction: column; align-items: center; gap: 8px; position: relative;">
                                              <img src="" alt="preview" style="max-width: 200px; max-height: 200px; object-fit: contain; border-radius: 4px; border: 1px solid #e2e8f0;" />
                                              <button type="button" class="remove-upload-btn" style="position: absolute; top: -8px; right: -8px; background: #ef4444; color: #fff; border: none; border-radius: 50%; width: 24px; height: 24px; cursor: pointer; font-size: 14px; line-height: 1; display: flex; align-items: center; justify-content: center;">&times;</button>
                                          </div>
                                      </div>
                                      <input type="file" id="manage-license-photo-input" accept="image/jpeg,image/jpg,image/webp" style="display:none" />
                                  </div>
                              </div>
                              <div class="modal-tab-actions">
                                  <button id="save-manage-license-btn" class="btn-primary">Save</button>
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
            openShippingLicensesModal();
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
            document.getElementById('create-recipient-handlers-issued').value = '';
            document.getElementById('create-recipient-handlers-expiration').value = '';
            document.getElementById('create-recipient-transport-carrier').value = '';
            document.getElementById('create-recipient-transport-issued').value = '';
            document.getElementById('create-recipient-transport-expiration').value = '';
            document.getElementById('create-recipient-status').value = 'Active';

            switchRecipientTab('create');
            modal.classList.remove('hidden');

            fetchNextRecipientId();
        }

        async function fetchNextRecipientId() {
            let timedOut = false;
            const timeout = setTimeout(() => { timedOut = true; }, 2500);
            try {
                const idRes = await fetch(API_BASE_SHIPPING_PERMIT_RECIPIENTS + '/next-id', {
                    headers: getAuthHeaders()
                });
                if (timedOut) return;
                if (idRes.ok) {
                    const idData = await idRes.json();
                    const input = document.getElementById('create-recipient-id');
                    const modal = document.getElementById('recipient-details-modal');
                    if (input && modal && !modal.classList.contains('hidden') && input.value === 'ShReID-1') {
                        input.value = idData.recipient_id || 'ShReID-1';
                    }
                }
            } catch (err) {
                console.error('Failed to fetch next recipient id:', err);
            } finally {
                clearTimeout(timeout);
            }
        }

        function closeRecipientDetailsModal() {
            const modal = document.getElementById('recipient-details-modal');
            if (modal) modal.classList.add('hidden');
        }

        async function saveCreateRecipient() {
            const recipientId = document.getElementById('create-recipient-id').value;
            const customerName = document.getElementById('create-recipient-customer-name').value.trim();
            const province = document.getElementById('create-recipient-province').value.trim();
            const city = document.getElementById('create-recipient-city').value.trim();
            const barangay = document.getElementById('create-recipient-barangay').value.trim();
            const transportType = document.getElementById('create-recipient-transport-type').value;
            const plateNumber = document.getElementById('create-recipient-plate-number').value.trim();
            const contact = document.getElementById('create-recipient-contact').value.trim();
            const contactNumber = document.getElementById('create-recipient-contact-number').value.trim();
            const handlersLicense = document.getElementById('create-recipient-handlers-license').value.trim();
            const handlersIssued = document.getElementById('create-recipient-handlers-issued').value;
            const handlersExpiration = document.getElementById('create-recipient-handlers-expiration').value;
            const transportCarrier = document.getElementById('create-recipient-transport-carrier').value.trim();
            const transportIssued = document.getElementById('create-recipient-transport-issued').value;
            const transportExpiration = document.getElementById('create-recipient-transport-expiration').value;
            const status = document.getElementById('create-recipient-status').value;

            if (!customerName) {
                alert('Customer Name is required');
                return;
            }

            try {
                const res = await fetch(API_BASE_SHIPPING_PERMIT_RECIPIENTS, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        ...getAuthHeaders()
                    },
                    body: JSON.stringify({
                        recipient_id: recipientId,
                        customer_name: customerName,
                        province: province || null,
                        city: city || null,
                        barangay: barangay || null,
                        transport_type: transportType || null,
                        plate_number: plateNumber || null,
                        contact: contact || null,
                        contact_number: contactNumber || null,
                        handlers_license: handlersLicense || null,
                        handlers_issued_date: handlersIssued || null,
                        handlers_expiration: handlersExpiration || null,
                        transport_carrier: transportCarrier || null,
                        transport_issued_date: transportIssued || null,
                        transport_expiration: transportExpiration || null,
                        status: status
                    })
                });

                if (!res.ok) {
                    const errData = await res.json().catch(() => ({}));
                    throw new Error(errData.error || 'Failed to save recipient');
                }

                alert('Recipient saved successfully');
                closeRecipientDetailsModal();
                loadRecipients();
            } catch (err) {
                alert('Error: ' + err.message);
            }
        }

        async function saveManageRecipient() {
            const recipientId = document.getElementById('manage-recipient-id').value;
            const customerName = document.getElementById('manage-recipient-customer-name').value.trim();
            const province = document.getElementById('manage-recipient-province').value.trim();
            const city = document.getElementById('manage-recipient-city').value.trim();
            const barangay = document.getElementById('manage-recipient-barangay').value.trim();
            const transportType = document.getElementById('manage-recipient-transport-type').value;
            const plateNumber = document.getElementById('manage-recipient-plate-number').value.trim();
            const contact = document.getElementById('manage-recipient-contact').value.trim();
            const contactNumber = document.getElementById('manage-recipient-contact-number').value.trim();
            const handlersLicense = document.getElementById('manage-recipient-handlers-license').value.trim();
            const handlersIssued = document.getElementById('manage-recipient-handlers-issued').value;
            const handlersExpiration = document.getElementById('manage-recipient-handlers-expiration').value;
            const transportCarrier = document.getElementById('manage-recipient-transport-carrier').value.trim();
            const transportIssued = document.getElementById('manage-recipient-transport-issued').value;
            const transportExpiration = document.getElementById('manage-recipient-transport-expiration').value;
            const status = document.getElementById('manage-recipient-status').value;

            if (!customerName) {
                alert('Customer Name is required');
                return;
            }

            try {
                const res = await fetch(API_BASE_SHIPPING_PERMIT_RECIPIENTS + '/' + encodeURIComponent(recipientId), {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        ...getAuthHeaders()
                    },
                    body: JSON.stringify({
                        customer_name: customerName,
                        province: province || null,
                        city: city || null,
                        barangay: barangay || null,
                        transport_type: transportType || null,
                        plate_number: plateNumber || null,
                        contact: contact || null,
                        contact_number: contactNumber || null,
                        handlers_license: handlersLicense || null,
                        handlers_issued_date: handlersIssued || null,
                        handlers_expiration: handlersExpiration || null,
                        transport_carrier: transportCarrier || null,
                        transport_issued_date: transportIssued || null,
                        transport_expiration: transportExpiration || null,
                        status: status
                    })
                });

                if (!res.ok) {
                    const errData = await res.json().catch(() => ({}));
                    throw new Error(errData.error || 'Failed to update recipient');
                }

                alert('Recipient updated successfully');
                closeRecipientDetailsModal();
                loadRecipients();
            } catch (err) {
                alert('Error: ' + err.message);
            }
        }

        function formatDate(value) {
            if (!value) return '';
            if (typeof value === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(value)) return value;
            const d = new Date(value);
            if (isNaN(d.getTime())) return value;
            const y = d.getFullYear();
            const m = String(d.getMonth() + 1).padStart(2, '0');
            const day = String(d.getDate()).padStart(2, '0');
            return `${y}-${m}-${day}`;
        }

        async function loadRecipients() {
            const tbody = document.getElementById('recipients-table-body');
            if (!tbody) return;

            try {
                const res = await fetch(API_BASE_SHIPPING_PERMIT_RECIPIENTS, {
                    headers: getAuthHeaders()
                });
                if (!res.ok) throw new Error('Failed to fetch recipients');
                const recipients = await res.json();

                if (!recipients.length) {
                    tbody.innerHTML = '<tr><td colspan="17" style="text-align:center; color: #94a3b8;">No recipients found</td></tr>';
                    return;
                }

                tbody.innerHTML = recipients.map(r => `
                    <tr>
                        <td>${r.recipient_id || ''}</td>
                        <td>${r.customer_name || ''}</td>
                        <td>${r.province || ''}</td>
                        <td>${r.city || ''}</td>
                        <td>${r.barangay || ''}</td>
                        <td>${r.transport_type || ''}</td>
                        <td>${r.plate_number || ''}</td>
                        <td>${r.contact || ''}</td>
                        <td>${r.contact_number || ''}</td>
                        <td>${r.handlers_license || ''}</td>
                        <td>${formatDate(r.handlers_issued_date) || ''}</td>
                        <td>${formatDate(r.handlers_expiration) || ''}</td>
                        <td>${r.transport_carrier || ''}</td>
                        <td>${formatDate(r.transport_issued_date) || ''}</td>
                        <td>${formatDate(r.transport_expiration) || ''}</td>
                        <td>${r.status || ''}</td>
                        <td>${r.created_by || ''}</td>
                    </tr>
                `).join('');
            } catch (err) {
                console.error('Failed to load recipients:', err);
                tbody.innerHTML = '<tr><td colspan="17" style="text-align:center; color: #94a3b8;">No recipients found</td></tr>';
            }
        }

        function formatContactNumber(e) {
            let val = (e.target.value || '').replace(/[^0-9+]/g, '');
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
            input.addEventListener('blur', formatContactNumber);
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

        const saveManageRecipientBtn = document.getElementById('save-manage-recipient-btn');
        if (saveManageRecipientBtn) {
            saveManageRecipientBtn.onclick = saveManageRecipient;
        }

        setupContactNumber(document.getElementById('create-recipient-contact-number'));
        setupContactNumber(document.getElementById('manage-recipient-contact-number'));

        function switchLicenseTab(tab) {
            const createPanel = document.getElementById('panel-create-license');
            const managePanel = document.getElementById('panel-manage-license');
            const createTab = document.getElementById('tab-create-license');
            const manageTab = document.getElementById('tab-manage-license');

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

        function openShippingLicensesModal() {
            const modal = document.getElementById('shipping-licenses-modal');
            if (!modal) return;

            document.getElementById('create-license-id').value = 'ShLiID-1';
            document.getElementById('create-license-name').value = '';
            document.getElementById('create-license-reg-no').value = '';
            document.getElementById('create-license-issued-date').value = '';
            document.getElementById('create-license-expiration-date').value = '';
            document.getElementById('create-license-status').value = 'Active';
            if (document.getElementById('create-license-photo-zone')._clear) document.getElementById('create-license-photo-zone')._clear();

            switchLicenseTab('create');
            modal.classList.remove('hidden');

            fetchNextLicenseId();
        }

        async function fetchNextLicenseId() {
            let timedOut = false;
            const timeout = setTimeout(() => { timedOut = true; }, 2500);
            try {
                const idRes = await fetch(API_BASE_SHIPPING_LICENSES + '/next-id', {
                    headers: getAuthHeaders()
                });
                if (timedOut) return;
                if (idRes.ok) {
                    const idData = await idRes.json();
                    const input = document.getElementById('create-license-id');
                    const modal = document.getElementById('shipping-licenses-modal');
                    if (input && modal && !modal.classList.contains('hidden') && input.value === 'ShLiID-1') {
                        input.value = idData.license_id || 'ShLiID-1';
                    }
                }
            } catch (err) {
                console.error('Failed to fetch next license id:', err);
            } finally {
                clearTimeout(timeout);
            }
        }

        function closeShippingLicensesModal() {
            const modal = document.getElementById('shipping-licenses-modal');
            if (modal) modal.classList.add('hidden');
        }

        function saveCreateLicense() {
            const licenseId = document.getElementById('create-license-id').value;
            const licenseName = document.getElementById('create-license-name').value.trim();
            const regNo = document.getElementById('create-license-reg-no').value.trim();
            const issuedDate = document.getElementById('create-license-issued-date').value;
            const expirationDate = document.getElementById('create-license-expiration-date').value;
            const status = document.getElementById('create-license-status').value;

            if (!licenseName) {
                alert('License Name is required');
                return;
            }

            alert(`License ${licenseId} (${licenseName}) saved successfully (design only - no backend)`);
        }

        function saveManageLicense() {
            const licenseId = document.getElementById('manage-license-id').value;
            const licenseName = document.getElementById('manage-license-name').value.trim();
            const regNo = document.getElementById('manage-license-reg-no').value.trim();
            const issuedDate = document.getElementById('manage-license-issued-date').value;
            const expirationDate = document.getElementById('manage-license-expiration-date').value;
            const status = document.getElementById('manage-license-status').value;

            if (!licenseName) {
                alert('License Name is required');
                return;
            }

            alert(`License ${licenseId} (${licenseName}) updated successfully (design only - no backend)`);
        }

        function setupLicensePhotoUploadZone(zoneId, fileInputId) {
            const zone = document.getElementById(zoneId);
            const fileInput = document.getElementById(fileInputId);
            if (!zone || !fileInput) return;

            let currentFile = null;

            const updateZoneState = (hasPhoto) => {
                if (hasPhoto && currentFile) {
                    zone.classList.add('file-selected');
                } else {
                    zone.classList.remove('file-selected');
                }
            };

            zone.addEventListener('click', (e) => {
                if (e.target.closest('.remove-upload-btn')) return;
                fileInput.click();
            });

            fileInput.addEventListener('change', (e) => {
                const file = e.target.files && e.target.files[0];
                if (!file) return;
                currentFile = file;
                const reader = new FileReader();
                reader.onload = (ev) => {
                    const img = zone.querySelector('.upload-preview img');
                    if (img) img.src = ev.target.result;
                    const preview = zone.querySelector('.upload-preview');
                    if (preview) preview.style.display = 'flex';
                    const placeholder = zone.querySelector('.upload-placeholder');
                    if (placeholder) placeholder.style.display = 'none';
                    updateZoneState(true);
                };
                reader.readAsDataURL(file);
            });

            const removeBtn = zone.querySelector('.remove-upload-btn');
            if (removeBtn) {
                removeBtn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    currentFile = null;
                    fileInput.value = '';
                    const img = zone.querySelector('.upload-preview img');
                    if (img) img.src = '';
                    const preview = zone.querySelector('.upload-preview');
                    if (preview) preview.style.display = 'none';
                    const placeholder = zone.querySelector('.upload-placeholder');
                    if (placeholder) placeholder.style.display = '';
                    updateZoneState(false);
                });
            }

            zone._clear = () => {
                currentFile = null;
                fileInput.value = '';
                const img = zone.querySelector('.upload-preview img');
                if (img) img.src = '';
                const preview = zone.querySelector('.upload-preview');
                if (preview) preview.style.display = 'none';
                const placeholder = zone.querySelector('.upload-placeholder');
                if (placeholder) placeholder.style.display = '';
                updateZoneState(false);
            };
        }

        const closeShippingLicensesBtn = document.getElementById('close-shipping-licenses-modal');
        if (closeShippingLicensesBtn) {
            closeShippingLicensesBtn.onclick = closeShippingLicensesModal;
        }

        if (document.getElementById('shipping-licenses-modal')) {
            document.getElementById('shipping-licenses-modal').addEventListener('click', (e) => {
                if (e.target === document.getElementById('shipping-licenses-modal')) {
                    document.getElementById('shipping-licenses-modal').classList.add('hidden');
                }
            });
        }

        const saveCreateLicenseBtn = document.getElementById('save-create-license-btn');
        if (saveCreateLicenseBtn) {
            saveCreateLicenseBtn.onclick = saveCreateLicense;
        }

        const saveManageLicenseBtn = document.getElementById('save-manage-license-btn');
        if (saveManageLicenseBtn) {
            saveManageLicenseBtn.onclick = saveManageLicense;
        }

        setupLicensePhotoUploadZone('create-license-photo-zone', 'create-license-photo-input');
        setupLicensePhotoUploadZone('manage-license-photo-zone', 'manage-license-photo-input');

        window.switchLicenseTab = switchLicenseTab;
        window.openShippingLicensesModal = openShippingLicensesModal;
        window.closeShippingLicensesModal = closeShippingLicensesModal;
        window.saveCreateLicense = saveCreateLicense;
        window.saveManageLicense = saveManageLicense;
        window.setupLicensePhotoUploadZone = setupLicensePhotoUploadZone;

        window.switchRecipientTab = switchRecipientTab;
        window.openRecipientDetailsModal = openRecipientDetailsModal;
        window.closeRecipientDetailsModal = closeRecipientDetailsModal;
        window.saveCreateRecipient = saveCreateRecipient;
        window.saveManageRecipient = saveManageRecipient;
        window.loadRecipients = loadRecipients;

        loadRecipients();
    };

function initializeModule(contentArea) {
    const currentTab = window.__currentTabId || 'operations';
    const render = ModuleComponents[currentTab] || ModuleComponents['operations'];
    render(contentArea);
}
