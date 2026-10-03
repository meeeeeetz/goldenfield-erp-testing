if (typeof ModuleComponents === 'undefined') { window.ModuleComponents = {}; }

function getAuthHeaders() {
    const token = localStorage.getItem('goldenfield_auth_token');
    return token ? { 'Authorization': `Bearer ${token}` } : {};
}

var API_BASE_SHIPPING_PERMIT_RECIPIENTS = '/api/shipping-permit-recipients';
var API_BASE_SHIPPING_LICENSES = '/api/shipping-permit-licenses';
var API_BASE_SHIPPING_PERMIT_RECIPIENT_PAPERS = '/api/shipping-permit-recipient-papers';
var API_BASE_SHIPPING_PERMIT_RECIPIENT_PHOTO = '/api/shipping-permit-recipient-photo';

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
                     <button id="open-recipient-papers-btn" class="btn-icon-circle" style="background-color: #EAD355; color: #1a1f2e;">
                         <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="8.5" cy="7" r="4"></circle><line x1="20" y1="8" x2="20" y2="14"></line><line x1="23" y1="11" x2="17" y2="11"></line></svg>
                         <span class="btn-label">Recipient papers</span>
                     </button>
                 </div>
                 <div class="permit-boxes-row">
                    <div class="card shipping-box">
                        <h3>Active Licenses</h3>
                        <div class="active-licenses-carousel" id="active-licenses-carousel">
                            <div class="active-licenses-track" id="active-licenses-track">
                                <div class="active-license-card">
                                    <div style="text-align:center; color: #94a3b8; padding: 40px 0;">Loading licenses...</div>
                                </div>
                            </div>
                            <div class="active-licenses-nav">
                                <button class="active-licenses-prev" id="active-licenses-prev">&#10094;</button>
                                <button class="active-licenses-next" id="active-licenses-next">&#10095;</button>
                            </div>
                        </div>
                    </div>
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
                                        <th>Status</th>
                                        <th>Created by</th>
                                    </tr>
                                </thead>
                                <tbody id="recipients-table-body">
                                    <tr><td colspan="11" style="text-align:center; color: #94a3b8;">Loading recipients...</td></tr>
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
                  <div id="recipient-papers-modal" class="modal hidden">
                      <div class="modal-content" style="max-width: 980px; width: 95%;">
                          <div class="modal-header-row">
                              <h3>Recipient Datas</h3>
                              <button class="modal-close-btn" id="close-recipient-papers-modal">&times;</button>
                          </div>
                          <div class="modal-tabs">
                              <button class="modal-tab active" id="tab-create-permits" onclick="switchRecipientPapersTab('create')">Create Permits</button>
                              <button class="modal-tab" id="tab-created-permits" onclick="switchRecipientPapersTab('list')">Created permits</button>
                          </div>
                          <div id="panel-create-permits" class="modal-tab-panel" style="display: block;">
                              <div class="modal-meta-row">
                                  <div class="modal-field">
                                      <label>Recipient</label>
                                      <select id="recipient-papers-recipient" class="modal-select">
                                          <option value="">Select Recipient</option>
                                      </select>
                                  </div>
                                  <div class="modal-field">
                                      <label>Permits</label>
                                      <select id="recipient-papers-permit-type" class="modal-select">
                                          <option value="">Select Permit</option>
                                          <option value="handlers_certificate">Handlers certificate</option>
                                          <option value="transport_carrier">Transport carrier</option>
                                      </select>
                                  </div>
                              </div>
                              <div id="recipient-papers-handlers-panel" class="modal-meta-row" style="display:none;">
                                  <div class="modal-field">
                                      <label>Registration Number</label>
                                      <input type="text" id="rp-handlers-registration-number" class="modal-select" placeholder="Enter registration number" />
                                  </div>
                                  <div class="modal-field">
                                      <label>Issued Date</label>
                                      <input type="date" id="rp-handlers-issued-date" class="modal-select" />
                                  </div>
                                  <div class="modal-field">
                                      <label>Expiration Date</label>
                                      <input type="date" id="rp-handlers-expiration-date" class="modal-select" />
                                  </div>
                                  <div class="modal-field">
                                      <label>Issued by</label>
                                      <input type="text" id="rp-handlers-issued-by" class="modal-select" placeholder="Enter issued by" />
                                  </div>
                                  <div class="modal-field" style="flex: 0 0 100%;">
                                      <label>Handlers Certificate Photo</label>
                                      <div id="rp-handlers-photo-zone" class="photo-drop-zone" style="border: 2px dashed #ccc; border-radius: 8px; padding: 20px; text-align: center; cursor: pointer; transition: border-color 0.2s, background-color 0.2s; background: #fafafa; display: flex; flex-direction: column; align-items: center;">
                                          <input type="file" id="rp-handlers-photo-input" accept="image/jpeg,image/png,application/pdf" style="display: none;" />
                                          <svg id="rp-handlers-photo-icon" viewBox="0 0 24 24" width="48" height="48" fill="none" stroke="#999" stroke-width="1.5" style="margin-bottom: 8px; display: block;"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>
                                          <p id="rp-handlers-photo-text" style="margin: 0; color: #666; font-size: 13px;">Drag & drop or click to upload<br><small>JPG, PNG, PDF (max 5MB)</small></p>
                                          <div id="rp-handlers-photo-preview" style="display: none; margin-top: 10px; display: flex; align-items: center; justify-content: center; gap: 8px; flex-wrap: wrap;">
                                              <img id="rp-handlers-photo-img" src="" alt="Preview" style="max-width: 200px; max-height: 150px; border-radius: 4px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);" />
                                              <button type="button" id="rp-handlers-photo-remove" style="padding: 4px 12px; background: #dc3545; color: white; border: none; border-radius: 4px; cursor: pointer; font-size: 12px;">Remove</button>
                                          </div>
                                      </div>
                                  </div>
                              </div>
                              <div id="recipient-papers-transport-panel" class="modal-meta-row" style="display:none;">
                                  <div class="modal-field">
                                      <label>Transport carrier License</label>
                                      <input type="text" id="rp-transport-carrier" class="modal-select" placeholder="Enter transport carrier" />
                                  </div>
                                  <div class="modal-field">
                                      <label>License Plate</label>
                                      <input type="text" id="rp-transport-license-plate" class="modal-select" placeholder="Enter license plate" />
                                  </div>
                                  <div class="modal-field">
                                      <label>Issued Date</label>
                                      <input type="date" id="rp-transport-issued-date" class="modal-select" />
                                  </div>
                                  <div class="modal-field">
                                      <label>Expiration Date</label>
                                      <input type="date" id="rp-transport-expiration-date" class="modal-select" />
                                  </div>
                                  <div class="modal-field">
                                      <label>Issued by</label>
                                      <input type="text" id="rp-transport-issued-by" class="modal-select" placeholder="Enter issued by" />
                                  </div>
                                  <div class="modal-field" style="flex: 0 0 100%;">
                                      <label>Transport Carrier Photo</label>
<div id="rp-transport-photo-zone" class="photo-drop-zone" style="border: 2px dashed #ccc; border-radius: 8px; padding: 20px; text-align: center; cursor: pointer; transition: border-color 0.2s, background-color 0.2s; background: #fafafa; display: flex; flex-direction: column; align-items: center;">
                                           <input type="file" id="rp-transport-photo-input" accept="image/jpeg,image/png,application/pdf" style="display: none;" />
                                           <svg id="rp-transport-photo-icon" viewBox="0 0 24 24" width="48" height="48" fill="none" stroke="#999" stroke-width="1.5" style="margin-bottom: 8px; display: block;"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>
                                           <p id="rp-transport-photo-text" style="margin: 0; color: #666; font-size: 13px;">Drag & drop or click to upload<br><small>JPG, PNG, PDF (max 5MB)</small></p>
                                           <div id="rp-transport-photo-preview" style="display: none; margin-top: 10px; display: flex; align-items: center; justify-content: center; gap: 8px; flex-wrap: wrap;">
                                               <img id="rp-transport-photo-img" src="" alt="Preview" style="max-width: 200px; max-height: 150px; border-radius: 4px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);" />
                                               <button type="button" id="rp-transport-photo-remove" style="padding: 4px 12px; background: #dc3545; color: white; border: none; border-radius: 4px; cursor: pointer; font-size: 12px;">Remove</button>
                                           </div>
                                       </div>
                                  </div>
                              </div>
                              <div class="modal-tab-actions">
                                  <button id="save-recipient-papers-btn" class="btn-primary">Save</button>
                              </div>
                          </div>
                          <div id="panel-created-permits" class="modal-tab-panel" style="display: none;">
                              <div style="max-height: 50vh; overflow: auto;">
                                  <table class="data-table" style="width: 100%; border-collapse: separate; border-spacing: 0; font-size: 13px; min-width: 1000px;">
                                      <thead>
                                          <tr>
                                              <th style="position: sticky; top: 0; background: #FFD000; z-index: 999; width: 50px; text-align: center;">Photo</th>
                                              <th style="position: sticky; top: 0; background: #FFD000; z-index: 999;">Recipients Permits ID</th>
                                              <th style="position: sticky; top: 0; background: #FFD000; z-index: 999;">Recipient</th>
                                              <th style="position: sticky; top: 0; background: #FFD000; z-index: 999;">Permits</th>
                                              <th style="position: sticky; top: 0; background: #FFD000; z-index: 999;">Registration No.</th>
                                              <th style="position: sticky; top: 0; background: #FFD000; z-index: 999;">License Plate</th>
                                              <th style="position: sticky; top: 0; background: #FFD000; z-index: 999;">Issued Date</th>
                                              <th style="position: sticky; top: 0; background: #FFD000; z-index: 999;">Expiration Date</th>
                                              <th style="position: sticky; top: 0; background: #FFD000; z-index: 999;">Issued by</th>
                                              <th style="position: sticky; top: 0; background: #FFD000; z-index: 999;">Action</th>
                                          </tr>
                                      </thead>
                                      <tbody id="created-permits-tbody">
                                          <tr><td colspan="10" style="text-align: center; padding: 20px; color: #999;">Loading...</td></tr>
                                      </tbody>
                                  </table>
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
                               <div class="table-wrap" style="max-height: 300px; overflow-y: auto; margin-bottom: 16px;">
                                   <table class="data-table" style="min-width: 700px;">
                                       <thead>
                                           <tr>
                                               <th>License ID</th>
                                               <th>License Name</th>
                                               <th>Reg No.</th>
                                               <th>Issued Date</th>
                                               <th>Expiration Date</th>
                                               <th>Status</th>
                                               <th>Photo</th>
                                               <th>Created By</th>
                                               <th>Action</th>
                                           </tr>
                                       </thead>
                                       <tbody id="licenses-table-body">
                                           <tr><td colspan="9" style="text-align:center; color: #94a3b8;">Loading licenses...</td></tr>
                                       </tbody>
                                   </table>
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
                    tbody.innerHTML = '<tr><td colspan="11" style="text-align:center; color: #94a3b8;">No recipients found</td></tr>';
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
                        <td>${r.status || ''}</td>
                        <td>${r.created_by || ''}</td>
                    </tr>
                `).join('');
            } catch (err) {
                console.error('Failed to load recipients:', err);
                tbody.innerHTML = '<tr><td colspan="11" style="text-align:center; color: #94a3b8;">No recipients found</td></tr>';
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

        const papersRecipientSelect = document.getElementById('recipient-papers-recipient');
        if (papersRecipientSelect) {
            papersRecipientSelect.innerHTML = '<option value="">Select Recipient</option>';
        }

        function switchRecipientPapersTab(tab) {
            const createPanel = document.getElementById('panel-create-permits');
            const listPanel = document.getElementById('panel-created-permits');
            const createTab = document.getElementById('tab-create-permits');
            const listTab = document.getElementById('tab-created-permits');

            if (tab === 'create') {
                // Reset editing state when manually switching to create tab
                if (editingPermitId) {
                    editingPermitId = null;
                }
                createPanel.style.display = 'block';
                listPanel.style.display = 'none';
                createTab.classList.add('active');
                listTab.classList.remove('active');
            } else {
                createPanel.style.display = 'none';
                listPanel.style.display = 'block';
                createTab.classList.remove('active');
                listTab.classList.add('active');
                loadCreatedPermitsFromDB().then(loadCreatedPermits);
            }
        }

        function openRecipientPapersModal() {
            const modal = document.getElementById('recipient-papers-modal');
            if (!modal) return;
            editingPermitId = null;
            document.getElementById('recipient-papers-recipient').value = '';
            document.getElementById('recipient-papers-permit-type').value = '';
            document.getElementById('rp-handlers-registration-number').value = '';
            document.getElementById('rp-handlers-issued-date').value = '';
            document.getElementById('rp-handlers-expiration-date').value = '';
            document.getElementById('rp-handlers-issued-by').value = '';
            document.getElementById('rp-transport-carrier').value = '';
            document.getElementById('rp-transport-license-plate').value = '';
            document.getElementById('rp-transport-issued-date').value = '';
            document.getElementById('rp-transport-expiration-date').value = '';
            document.getElementById('rp-transport-issued-by').value = '';
            resetPhotoZone('handlers');
            resetPhotoZone('transport');
            const handlersPanel = document.getElementById('recipient-papers-handlers-panel');
            const transportPanel = document.getElementById('recipient-papers-transport-panel');
            if (handlersPanel) handlersPanel.style.display = 'none';
            if (transportPanel) transportPanel.style.display = 'none';
            switchRecipientPapersTab('create');
            modal.classList.remove('hidden');
            loadPapersRecipients();
        }

        function closeRecipientPapersModal() {
            const modal = document.getElementById('recipient-papers-modal');
            if (modal) modal.classList.add('hidden');
        }

        async function loadPapersRecipients() {
            const select = document.getElementById('recipient-papers-recipient');
            if (!select) return;
            select.innerHTML = '<option value="">Select Recipient</option>';
            try {
                const res = await fetch(API_BASE_SHIPPING_PERMIT_RECIPIENTS, { headers: getAuthHeaders() });
                if (!res.ok) return;
                const recipients = await res.json();
                recipients
                    .filter(r => (r.status || '').toLowerCase() === 'active' && r.recipient_id)
                    .forEach(r => {
                        const opt = document.createElement('option');
                        opt.value = r.recipient_id;
                        opt.textContent = (r.customer_name || r.recipient_id);
                        select.appendChild(opt);
                    });
            } catch (err) {
                console.error('Failed to load recipients for papers:', err);
            }
        }

        let createdPermitsData = [];
        let editingPermitId = null;

        async function loadCreatedPermitsFromDB() {
            try {
                const res = await fetch(`${API_BASE_SHIPPING_PERMIT_RECIPIENT_PAPERS}`, {
                    headers: getAuthHeaders()
                });
                if (!res.ok) return;
                const papers = await res.json();
                createdPermitsData = papers.map(p => ({
                    id: p.recipient_paper_id,
                    recipient_id: p.recipient_id,
                    recipient_name: p.customer_name,
                    paper_type: p.paper_type,
                    registration_number: p.registration_number,
                    transport_carrier_name: p.transport_carrier_name,
                    license_plate: p.license_plate,
                    issued_date: p.issued_date ? p.issued_date.split('T')[0] : '',
                    expiration_date: p.expiration_date ? p.expiration_date.split('T')[0] : '',
                    issued_by: p.issued_by,
                    photo_path: p.photo_path
                }));
            } catch (err) {
                console.error('Failed to load permits from DB:', err);
            }
        }

        // Photo preview tooltip (similar to Feeds Transaction)
        const permitPhotoTooltip = document.createElement('div');
        permitPhotoTooltip.className = 'permit-photo-preview-tooltip';
        permitPhotoTooltip.style.display = 'none';
        permitPhotoTooltip.style.cssText = 'position:fixed; z-index:9999; pointer-events:none; background:rgba(0,0,0,0.85); border-radius:8px; padding:10px; box-shadow:0 4px 20px rgba(0,0,0,0.3); max-width:400px; max-height:80vh;';
        document.body.appendChild(permitPhotoTooltip);

        function loadCreatedPermits() {
            const tbody = document.getElementById('created-permits-tbody');
            if (!tbody) return;

            if (createdPermitsData.length === 0) {
                tbody.innerHTML = '<tr><td colspan="10" style="text-align: center; padding: 20px; color: #999;">No permits created yet</td></tr>';
                return;
            }

            tbody.innerHTML = createdPermitsData.map((p, idx) => `
                <tr>
                    <td style="text-align: center; vertical-align: middle;">
                        ${p.photo_path && String(p.photo_path).trim() ? 
                            `<span class="permit-photo-icon-wrap" data-photo-path="${p.photo_path}" style="cursor:pointer; display:inline-flex; align-items:center; justify-content:center;">
                                <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="#D4AF37" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                    <rect x="3" y="3" width="18" height="18" rx="2"></rect>
                                    <circle cx="8.5" cy="8.5" r="1.5"></circle>
                                    <path d="M21 15l-5-5L5 21"></path>
                                </svg>
                            </span>` 
                            : `<span class="permit-photo-icon-wrap" style="display:inline-flex; align-items:center; justify-content:center; opacity:0.4;">
                                <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="#800000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                    <rect x="3" y="3" width="18" height="18" rx="2"></rect>
                                    <circle cx="8.5" cy="8.5" r="1.5"></circle>
                                    <path d="M21 15l-5-5L5 21"></path>
                                </svg>
                            </span>`
                        }
                    </td>
                    <td>${p.id || `RP-${String(idx + 1).padStart(5, '0')}`}</td>
                    <td>${p.recipient_name || p.recipient_id || ''}</td>
                    <td>${p.paper_type === 'handlers_certificate' ? 'Handlers certificate' : 'Transport carrier'}</td>
                    <td>${p.registration_number || p.transport_carrier_name || ''}</td>
                    <td>${p.license_plate || ''}</td>
                    <td>${p.issued_date || ''}</td>
                    <td>${p.expiration_date || ''}</td>
                    <td>${p.issued_by || ''}</td>
                    <td style="text-align: center;">
                        <button class="btn-icon" onclick="editCreatedPermit(${idx})" style="background: none; border: none; cursor: pointer; padding: 4px; margin: 0 4px;" title="Edit">
                            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="#2196F3" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
                        </button>
                        <button class="btn-icon" onclick="deleteCreatedPermit(${idx})" style="background: none; border: none; cursor: pointer; padding: 4px; margin: 0 4px;" title="Delete">
                            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="#dc3545" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
                        </button>
                    </td>
                </tr>
            `).join('');

            // Attach hover events for photo icons
            tbody.querySelectorAll('.permit-photo-icon-wrap[data-photo-path]').forEach(wrap => {
                wrap.addEventListener('mouseenter', (e) => showPermitPhotoPreview(e, wrap.dataset.photoPath));
                wrap.addEventListener('mousemove', (e) => positionPermitPhotoPreview(e));
                wrap.addEventListener('mouseleave', hidePermitPhotoPreview);
            });
        }

        function showPermitPhotoPreview(e, photoPath) {
            if (!permitPhotoTooltip) return;
            const fullSrc = photoPath.startsWith('http') ? photoPath : `/${photoPath}`;
            permitPhotoTooltip.innerHTML = `<img src="${fullSrc}" alt="Permit photo preview" style="max-width:100%; max-height:80vh; display:block; border-radius:4px;">`;
            permitPhotoTooltip.style.display = 'block';
            positionPermitPhotoPreview(e);
        }

        function positionPermitPhotoPreview(e) {
            if (!permitPhotoTooltip || permitPhotoTooltip.style.display !== 'block') return;
            const tooltipRect = permitPhotoTooltip.getBoundingClientRect();
            const vw = window.innerWidth;
            const vh = window.innerHeight;
            let left = e.clientX + 20;
            let top = e.clientY - tooltipRect.height / 2;
            if (left + tooltipRect.width > vw - 20) left = e.clientX - tooltipRect.width - 20;
            if (top < 20) top = 20;
            if (top + tooltipRect.height > vh - 20) top = vh - tooltipRect.height - 20;
            permitPhotoTooltip.style.left = left + 'px';
            permitPhotoTooltip.style.top = top + 'px';
        }

        function hidePermitPhotoPreview() {
            if (permitPhotoTooltip) permitPhotoTooltip.style.display = 'none';
        }

        function toggleRecipientPapersPanels() {
            const value = (document.getElementById('recipient-papers-permit-type').value || '').trim();
            const handlersPanel = document.getElementById('recipient-papers-handlers-panel');
            const transportPanel = document.getElementById('recipient-papers-transport-panel');
            if (handlersPanel) handlersPanel.style.display = (value === 'handlers_certificate') ? 'flex' : 'none';
            if (transportPanel) transportPanel.style.display = (value === 'transport_carrier') ? 'flex' : 'none';
        }

        function resetPhotoZone(type) {
            const zone = document.getElementById(`rp-${type}-photo-zone`);
            const input = document.getElementById(`rp-${type}-photo-input`);
            const icon = document.getElementById(`rp-${type}-photo-icon`);
            const text = document.getElementById(`rp-${type}-photo-text`);
            const preview = document.getElementById(`rp-${type}-photo-preview`);
            const img = document.getElementById(`rp-${type}-photo-img`);
            if (zone) zone.style.borderColor = '#ccc';
            if (zone) zone.style.backgroundColor = '#fafafa';
            if (input) input.value = '';
            if (icon) icon.style.display = 'block';
            if (text) text.style.display = 'block';
            if (preview) preview.style.display = 'none';
            if (img) img.src = '';
            zone.dataset.photoPath = '';
        }

        function setupPhotoZone(type) {
            const zone = document.getElementById(`rp-${type}-photo-zone`);
            const input = document.getElementById(`rp-${type}-photo-input`);
            if (!zone || !input) return;

            zone.addEventListener('click', (e) => {
                if (e.target.id === `rp-${type}-photo-remove`) return;
                input.click();
            });

            input.addEventListener('change', (e) => {
                if (e.target.files.length > 0) {
                    handlePhotoSelect(type, e.target.files[0]);
                }
            });

            zone.addEventListener('dragover', (e) => {
                e.preventDefault();
                e.stopPropagation();
                zone.style.borderColor = '#28a745';
                zone.style.backgroundColor = '#f0fff4';
            });

            zone.addEventListener('dragleave', (e) => {
                e.preventDefault();
                e.stopPropagation();
                zone.style.borderColor = '#ccc';
                zone.style.backgroundColor = '#fafafa';
            });

            zone.addEventListener('drop', (e) => {
                e.preventDefault();
                e.stopPropagation();
                zone.style.borderColor = '#ccc';
                zone.style.backgroundColor = '#fafafa';
                if (e.dataTransfer.files.length > 0) {
                    handlePhotoSelect(type, e.dataTransfer.files[0]);
                }
            });

            const removeBtn = document.getElementById(`rp-${type}-photo-remove`);
            if (removeBtn) {
                removeBtn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    resetPhotoZone(type);
                });
            }
        }

        async function handlePhotoSelect(type, file) {
            const allowedTypes = ['image/jpeg', 'image/png', 'application/pdf'];
            if (!allowedTypes.includes(file.type)) {
                alert('Only JPEG, PNG, and PDF files are allowed');
                return;
            }
            if (file.size > 5 * 1024 * 1024) {
                alert('File size must be less than 5MB');
                return;
            }

            const recipientId = document.getElementById('recipient-papers-recipient').value.trim();
            if (!recipientId) {
                alert('Please select a recipient first');
                return;
            }

            const zone = document.getElementById(`rp-${type}-photo-zone`);
            const icon = document.getElementById(`rp-${type}-photo-icon`);
            const text = document.getElementById(`rp-${type}-photo-text`);
            const preview = document.getElementById(`rp-${type}-photo-preview`);
            const img = document.getElementById(`rp-${type}-photo-img`);

            // Show loading state
            if (text) text.textContent = 'Uploading...';
            if (icon) icon.style.display = 'none';

            try {
                const formData = new FormData();
                formData.append('photo', file);
                formData.append('recipient_id', recipientId);
                formData.append('paper_type', type === 'handlers' ? 'handlers_certificate' : 'transport_carrier');

                const res = await fetch(`${API_BASE_SHIPPING_PERMIT_RECIPIENT_PHOTO}/upload-photo`, {
                    method: 'POST',
                    headers: getAuthHeaders(),
                    body: formData
                });

                if (!res.ok) {
                    const err = await res.json();
                    throw new Error(err.error || 'Upload failed');
                }

                const data = await res.json();
                
                // Store the public URL for preview and database
                zone.dataset.photoPath = data.public_url || data.file_path;

                // Show preview using public URL
                if (icon) icon.style.display = 'none';
                if (text) text.style.display = 'none';
                if (preview) preview.style.display = 'flex';
                if (img) {
                    if (file.type === 'application/pdf') {
                        img.src = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgd2lkdGg9IjQ4IiBoZWlnaHQ9IjQ4IiBmaWxsPSJub25lIiBzdHJva2U9IiNkYzM1NDUiIHN0cm9rZS13aWR0aD0iMiI+PHJlY3QgeD0iMyIgeT0iMyIgd2lkdGg9IjE4IiBoZWlnaHQ9IjE4IiByeD0iMiI+PC9yZWN0PjxwYXRoIGQ9Ik0xMiA3VjE3TTggMTNsNCA0IDQtNCI+PC9wYXRoPjwvc3ZnPg==';
                    } else {
                        img.src = data.public_url || data.file_path;
                    }
                }

            } catch (err) {
                console.error('Photo upload error:', err);
                alert('Failed to upload photo: ' + err.message);
                resetPhotoZone(type);
            }
        }

        function getPhotoPath(type) {
            const zone = document.getElementById(`rp-${type}-photo-zone`);
            return zone?.dataset?.photoPath || '';
        }

        async function saveRecipientPapers() {
            const recipientId = document.getElementById('recipient-papers-recipient').value.trim();
            const permitType = (document.getElementById('recipient-papers-permit-type').value || '').trim();

            if (!recipientId || !permitType) {
                alert('Please select a recipient and a permit type');
                return;
            }

            const payload = {
                recipient_id: recipientId,
                paper_type: permitType
            };

            if (permitType === 'handlers_certificate') {
                payload.registration_number = document.getElementById('rp-handlers-registration-number').value.trim();
                payload.issued_date = document.getElementById('rp-handlers-issued-date').value;
                payload.expiration_date = document.getElementById('rp-handlers-expiration-date').value;
                payload.issued_by = document.getElementById('rp-handlers-issued-by').value.trim();
                payload.photo_path = getPhotoPath('handlers');
            } else {
                payload.transport_carrier_name = document.getElementById('rp-transport-carrier').value.trim();
                payload.license_plate = document.getElementById('rp-transport-license-plate').value.trim();
                payload.issued_date = document.getElementById('rp-transport-issued-date').value;
                payload.expiration_date = document.getElementById('rp-transport-expiration-date').value;
                payload.issued_by = document.getElementById('rp-transport-issued-by').value.trim();
                payload.photo_path = getPhotoPath('transport');
            }

            console.log('Recipient papers payload:', payload);

            // Send to backend
            try {
                const isEditing = !!editingPermitId;
                const url = isEditing 
                    ? `${API_BASE_SHIPPING_PERMIT_RECIPIENT_PAPERS}/${editingPermitId}`
                    : `${API_BASE_SHIPPING_PERMIT_RECIPIENT_PAPERS}`;
                const method = isEditing ? 'PUT' : 'POST';

                const res = await fetch(url, {
                    method: method,
                    headers: { ...getAuthHeaders(), 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload)
                });

                if (!res.ok) {
                    const err = await res.json();
                    throw new Error(err.error || 'Failed to save permit');
                }

                const savedPaper = await res.json();

                const recipientSelect = document.getElementById('recipient-papers-recipient');
                const recipientName = recipientSelect.options[recipientSelect.selectedIndex]?.text || recipientId;

                const newPermit = {
                    id: savedPaper.recipient_paper_id || editingPermitId || `RP-${String(createdPermitsData.length + 1).padStart(5, '0')}`,
                    recipient_id: recipientId,
                    recipient_name: recipientName,
                    paper_type: permitType,
                    registration_number: payload.registration_number || '',
                    transport_carrier_name: payload.transport_carrier_name || '',
                    license_plate: payload.license_plate || '',
                    issued_date: payload.issued_date,
                    expiration_date: payload.expiration_date,
                    issued_by: payload.issued_by,
                    photo_path: payload.photo_path || ''
                };
                createdPermitsData.push(newPermit);

                alert(isEditing ? 'Permit updated successfully!' : 'Permit saved successfully!');
                editingPermitId = null;
                resetPhotoZone('handlers');
                resetPhotoZone('transport');
                switchRecipientPapersTab('list');
            } catch (err) {
                console.error('Save permit error:', err);
                alert('Failed to save permit: ' + err.message);
            }
        }

        function editCreatedPermit(index) {
            const permit = createdPermitsData[index];
            if (!permit) return;
            
            // Switch to create tab and populate form
            switchRecipientPapersTab('create');
            
            // Track the permit being edited (AFTER tab switch to avoid reset)
            editingPermitId = permit.id;
            
            document.getElementById('recipient-papers-recipient').value = permit.recipient_id || '';
            document.getElementById('recipient-papers-permit-type').value = permit.paper_type || '';
            toggleRecipientPapersPanels();
            
            if (permit.paper_type === 'handlers_certificate') {
                document.getElementById('rp-handlers-registration-number').value = permit.registration_number || '';
                document.getElementById('rp-handlers-issued-date').value = permit.issued_date || '';
                document.getElementById('rp-handlers-expiration-date').value = permit.expiration_date || '';
                document.getElementById('rp-handlers-issued-by').value = permit.issued_by || '';
            } else {
                document.getElementById('rp-transport-carrier').value = permit.transport_carrier_name || '';
                document.getElementById('rp-transport-license-plate').value = permit.license_plate || '';
                document.getElementById('rp-transport-issued-date').value = permit.issued_date || '';
                document.getElementById('rp-transport-expiration-date').value = permit.expiration_date || '';
                document.getElementById('rp-transport-issued-by').value = permit.issued_by || '';
            }
            
            // Remove the old entry from local array (will be re-added on save)
            createdPermitsData.splice(index, 1);
        }

        async function deleteCreatedPermit(index) {
            const permit = createdPermitsData[index];
            if (!permit) return;

            if (confirm('Are you sure you want to delete this permit?')) {
                try {
                    // Delete from backend
                    const res = await fetch(`${API_BASE_SHIPPING_PERMIT_RECIPIENT_PAPERS}/${permit.id}`, {
                        method: 'DELETE',
                        headers: getAuthHeaders()
                    });

                    if (!res.ok) {
                        const err = await res.json();
                        throw new Error(err.error || 'Failed to delete permit');
                    }

                    // Remove from local array
                    createdPermitsData.splice(index, 1);
                    loadCreatedPermits();
                    alert('Permit deleted successfully!');
                } catch (err) {
                    console.error('Delete permit error:', err);
                    alert('Failed to delete permit: ' + err.message);
                }
            }
        }

        const openRecipientPapersBtn = document.getElementById('open-recipient-papers-btn');
        if (openRecipientPapersBtn) { openRecipientPapersBtn.onclick = openRecipientPapersModal; }

        const closeRecipientPapersBtn = document.getElementById('close-recipient-papers-modal');
        if (closeRecipientPapersBtn) { closeRecipientPapersBtn.onclick = closeRecipientPapersModal; }

        const recipientPapersModal = document.getElementById('recipient-papers-modal');
        if (recipientPapersModal) {
            recipientPapersModal.addEventListener('click', (e) => {
                if (e.target === recipientPapersModal) { recipientPapersModal.classList.add('hidden'); }
            });
        }

        const saveRecipientPapersBtn = document.getElementById('save-recipient-papers-btn');
        if (saveRecipientPapersBtn) { saveRecipientPapersBtn.onclick = saveRecipientPapers; }

        const recipientPapersPermitType = document.getElementById('recipient-papers-permit-type');
        if (recipientPapersPermitType) { recipientPapersPermitType.addEventListener('change', toggleRecipientPapersPanels); }

        setupPhotoZone('handlers');
        setupPhotoZone('transport');

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
            loadLicenses();
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

        async function loadLicenses(search = '') {
            const tbody = document.getElementById('licenses-table-body');
            if (!tbody) return;

            try {
                const url = API_BASE_SHIPPING_LICENSES + (search ? `?search=${encodeURIComponent(search)}` : '');
                const res = await fetch(url, { headers: getAuthHeaders() });
                if (!res.ok) throw new Error('Failed to fetch licenses');
                const licenses = await res.json();

                if (!licenses.length) {
                    tbody.innerHTML = '<tr><td colspan="9" style="text-align:center; color: #94a3b8;">No licenses found</td></tr>';
                    return;
                }

                tbody.innerHTML = licenses.map(l => `
                    <tr style="cursor: pointer;" data-license-id="${l.license_id}">
                        <td>${l.license_id || ''}</td>
                        <td>${l.license_name || ''}</td>
                        <td>${l.reg_no || ''}</td>
                        <td>${l.issued_date || ''}</td>
                        <td>${l.expiration_date || ''}</td>
                        <td>${l.status || ''}</td>
                        <td>${l.file_path ? '<span style="color:#1a5e1a;">✓</span>' : ''}</td>
                        <td>${l.created_by || ''}</td>
                        <td><button class="btn-icon" onclick="event.stopPropagation(); editLicense('${l.license_id}')">✏️</button></td>
                    </tr>
                `).join('');

                // Click to load license into form
                tbody.querySelectorAll('tr[data-license-id]').forEach(tr => {
                    tr.addEventListener('click', () => {
                        const licenseId = tr.dataset.licenseId;
                        loadLicenseForEdit(licenseId);
                    });
                });

            } catch (err) {
                console.error('Failed to load licenses:', err);
                tbody.innerHTML = '<tr><td colspan="9" style="text-align:center; color: #94a3b8;">Error loading licenses</td></tr>';
            }
        }

        async function loadLicenseForEdit(licenseId) {
            try {
                const res = await fetch(API_BASE_SHIPPING_LICENSES + '/' + encodeURIComponent(licenseId), {
                    headers: getAuthHeaders()
                });
                if (!res.ok) throw new Error('Failed to fetch license');
                const license = await res.json();

                document.getElementById('manage-license-id').value = license.license_id;
                document.getElementById('manage-license-name').value = license.license_name || '';
                document.getElementById('manage-license-reg-no').value = license.reg_no || '';
                document.getElementById('manage-license-issued-date').value = license.issued_date || '';
                document.getElementById('manage-license-expiration-date').value = license.expiration_date || '';
                document.getElementById('manage-license-status').value = license.status || 'Active';

                // Clear and load photo preview
                const manageZone = document.getElementById('manage-license-photo-zone');
                if (manageZone._clear) manageZone._clear();
                if (license.file_path) {
                    const img = manageZone.querySelector('.upload-preview img');
                    if (img) {
                        img.src = license.file_url || license.file_path;
                        manageZone.querySelector('.upload-preview').style.display = 'flex';
                        manageZone.querySelector('.upload-placeholder').style.display = 'none';
                        manageZone.classList.add('file-selected');
                    }
                }

                switchLicenseTab('manage');
            } catch (err) {
                alert('Error loading license: ' + err.message);
            }
        }

        window.editLicense = loadLicenseForEdit;

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

            if (!licenseName || !regNo) {
                alert('License Name and Reg No. are required');
                return;
            }

            const fileInput = document.getElementById('create-license-photo-input');
            const file = fileInput && fileInput.files && fileInput.files[0];

            const createdBy = (() => {
                try {
                    const u = JSON.parse(localStorage.getItem('goldenfield_user') || '{}');
                    return `${u.first_name || ''} ${u.last_name || ''}`.trim() || null;
                } catch (e) { return null; }
            })();

            const formData = new FormData();
            formData.append('license_id', licenseId);
            formData.append('license_name', licenseName);
            formData.append('reg_no', regNo);
            if (issuedDate) formData.append('issued_date', issuedDate);
            if (expirationDate) formData.append('expiration_date', expirationDate);
            formData.append('status', status || 'Active');
            formData.append('created_by', createdBy || 'Super admin');
            if (file) formData.append('photo', file);

            fetch(API_BASE_SHIPPING_LICENSES, {
                method: 'POST',
                headers: getAuthHeaders(),
                body: formData
            })
                .then(res => {
                    if (!res.ok) return res.json().then(err => Promise.reject(err));
                    return res.json();
                })
                .then(data => {
                    alert('License created successfully');
                    closeShippingLicensesModal();
                    loadLicenses();
                    loadActiveLicensesCarousel();
                })
                .catch(err => {
                    alert('Error: ' + (err.error || err.message || 'Failed to create license'));
                });
        }

        function saveManageLicense() {
            const licenseId = document.getElementById('manage-license-id').value;
            const licenseName = document.getElementById('manage-license-name').value.trim();
            const regNo = document.getElementById('manage-license-reg-no').value.trim();
            const issuedDate = document.getElementById('manage-license-issued-date').value;
            const expirationDate = document.getElementById('manage-license-expiration-date').value;
            const status = document.getElementById('manage-license-status').value;

            if (!licenseName || !regNo) {
                alert('License Name and Reg No. are required');
                return;
            }

            const fileInput = document.getElementById('manage-license-photo-input');
            const file = fileInput && fileInput.files && fileInput.files[0];

            const formData = new FormData();
            formData.append('license_name', licenseName);
            formData.append('reg_no', regNo);
            if (issuedDate) formData.append('issued_date', issuedDate);
            if (expirationDate) formData.append('expiration_date', expirationDate);
            formData.append('status', status || 'Active');
            if (file) formData.append('photo', file);

            fetch(API_BASE_SHIPPING_LICENSES + '/' + encodeURIComponent(licenseId), {
                method: 'PUT',
                headers: getAuthHeaders(),
                body: formData
            })
                .then(res => {
                    if (!res.ok) return res.json().then(err => Promise.reject(err));
                    return res.json();
                })
                .then(data => {
                    alert('License updated successfully');
                    closeShippingLicensesModal();
                    loadLicenses();
                    loadActiveLicensesCarousel();
                })
                .catch(err => {
                    alert('Error: ' + (err.error || err.message || 'Failed to update license'));
                });
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

            const handleFile = (file) => {
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
            };

            zone.addEventListener('click', (e) => {
                if (e.target.closest('.remove-upload-btn')) return;
                fileInput.click();
            });

            zone.addEventListener('dragover', (e) => {
                e.preventDefault();
                zone.classList.add('drag-over');
            });

            zone.addEventListener('dragleave', (e) => {
                e.preventDefault();
                zone.classList.remove('drag-over');
            });

            zone.addEventListener('drop', (e) => {
                e.preventDefault();
                zone.classList.remove('drag-over');
                const file = e.dataTransfer.files && e.dataTransfer.files[0];
                if (file) {
                    const dt = new DataTransfer();
                    dt.items.add(file);
                    fileInput.files = dt.files;
                    handleFile(file);
                }
            });

            fileInput.addEventListener('change', (e) => {
                const file = e.target.files && e.target.files[0];
                handleFile(file);
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

        const photoTooltip = document.createElement('div');
        photoTooltip.className = 'photo-preview-tooltip';
        photoTooltip.style.display = 'none';
        document.body.appendChild(photoTooltip);

        document.addEventListener('mouseover', (e) => {
            const wrap = e.target.closest('.photo-icon-wrap');
            if (!wrap) return;
            const src = wrap.getAttribute('data-license-photo') || wrap.getAttribute('data-receipt-path');
            if (!src) return;
            const fullSrc = src.startsWith('http') ? src : src;
            photoTooltip.innerHTML = `<img src="${fullSrc}" alt="license preview">`;
            photoTooltip.style.display = 'block';
            positionTooltip();
        });

        document.addEventListener('mouseout', (e) => {
            const wrap = e.target.closest('.photo-icon-wrap');
            if (!wrap) return;
            photoTooltip.style.display = 'none';
        });

        document.addEventListener('mousemove', (e) => {
            if (photoTooltip.style.display === 'block') {
                positionTooltip();
            }
        });

        function positionTooltip() {
            const rect = photoTooltip.getBoundingClientRect();
            const left = Math.max(8, (window.innerWidth - rect.width) / 2);
            const top = Math.max(8, (window.innerHeight - rect.height) / 2);
            photoTooltip.style.left = left + 'px';
            photoTooltip.style.top = top + 'px';
        }

        const saveManageLicenseBtn = document.getElementById('save-manage-license-btn');
        if (saveManageLicenseBtn) {
            saveManageLicenseBtn.onclick = saveManageLicense;
        }

        setupLicensePhotoUploadZone('create-license-photo-zone', 'create-license-photo-input');
        setupLicensePhotoUploadZone('manage-license-photo-zone', 'manage-license-photo-input');

        const manageLicenseSearch = document.getElementById('manage-license-search');
        if (manageLicenseSearch) {
            let searchTimeout;
            manageLicenseSearch.addEventListener('input', (e) => {
                clearTimeout(searchTimeout);
                searchTimeout = setTimeout(() => loadLicenses(e.target.value.trim()), 300);
            });
        }

        window.switchLicenseTab = switchLicenseTab;
        window.openShippingLicensesModal = openShippingLicensesModal;
        window.closeShippingLicensesModal = closeShippingLicensesModal;
        window.saveCreateLicense = saveCreateLicense;
        window.saveManageLicense = saveManageLicense;
        window.setupLicensePhotoUploadZone = setupLicensePhotoUploadZone;
        window.switchRecipientPapersTab = switchRecipientPapersTab;
        window.editCreatedPermit = editCreatedPermit;
        window.deleteCreatedPermit = deleteCreatedPermit;
        window.loadLicenses = loadLicenses;

        window.switchRecipientTab = switchRecipientTab;
        window.openRecipientDetailsModal = openRecipientDetailsModal;
        window.closeRecipientDetailsModal = closeRecipientDetailsModal;
        window.saveCreateRecipient = saveCreateRecipient;
        window.saveManageRecipient = saveManageRecipient;
        window.loadRecipients = loadRecipients;

        loadRecipients();
            loadActiveLicensesCarousel();
        };

        function loadActiveLicensesCarousel() {
            const track = document.getElementById('active-licenses-track');
            if (!track) return;

            let activeLicensesCarouselOffset = 0;

            fetch(API_BASE_SHIPPING_LICENSES, { headers: getAuthHeaders() })
                .then(res => res.ok ? res.json() : Promise.reject())
                .then(licenses => {
                    const active = (licenses || []).filter(l => (l.status || '').toLowerCase() === 'active');
                    if (!active.length) {
                        track.innerHTML = '<div class="active-license-card"><div style="text-align:center; color: #94a3b8; padding: 40px 0;">No active licenses</div></div>';
                        return;
                    }
                    const fmtDate = (d) => {
                        if (!d) return '-';
                        const str = String(d);
                        if (str.length >= 10) return str.slice(0, 10);
                        return str;
                    };

                    track.innerHTML = active.map(l => {
                        const fileUrl = l.file_url || (l.file_path ? (l.file_path.startsWith('http') ? l.file_path : l.file_path) : null);
                        const photoHtml = fileUrl
                            ? `<span class="photo-icon-wrap" data-license-photo="${fileUrl}"><svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="#D4AF37" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><path d="M21 15l-5-5L5 21"></path></svg></span>`
                            : `<span class="photo-icon-wrap"><svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="#800000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><path d="M21 15l-5-5L5 21"></path></svg></span>`;
                        return `
                            <div class="active-license-card">
                                <h4>${l.license_name || ''}</h4>
                                <p class="al-regno">Reg No.: ${l.reg_no || ''}</p>
                                <p class="al-date">Issued: ${fmtDate(l.issued_date)}</p>
                                <p class="al-date">Expires: ${fmtDate(l.expiration_date)}</p>
                                <p class="al-status">Status: ${l.status || ''}</p>
                                <div class="al-photo">${photoHtml}</div>
                            </div>`;
                    }).join('');

                    // Horizontal scroll
                    const carousel = document.getElementById('active-licenses-carousel');
                    const prevBtn = document.getElementById('active-licenses-prev');
                    const nextBtn = document.getElementById('active-licenses-next');
                    const cardWidth = 312;

                    const scrollByCards = (dir) => {
                        if (!carousel) return;
                        carousel.scrollBy({ left: dir * cardWidth, behavior: 'smooth' });
                    };

                    const updateButtons = () => {
                        if (!carousel) return;
                        const atStart = carousel.scrollLeft <= 0;
                        const atEnd = carousel.scrollLeft + carousel.clientWidth >= carousel.scrollWidth - 1;
                        if (prevBtn) prevBtn.disabled = atStart;
                        if (nextBtn) nextBtn.disabled = atEnd;
                    };

                    if (prevBtn) prevBtn.onclick = () => scrollByCards(-1);
                    if (nextBtn) nextBtn.onclick = () => scrollByCards(1);
                    if (carousel) {
                        carousel.addEventListener('scroll', updateButtons);
                        setTimeout(updateButtons, 50);

                        // Drag to scroll
                        let isDragging = false;
                        let startX = 0;
                        let scrollStart = 0;

                        carousel.addEventListener('pointerdown', (e) => {
                            isDragging = true;
                            startX = e.clientX;
                            scrollStart = carousel.scrollLeft;
                            carousel.setPointerCapture(e.pointerId);
                            carousel.style.cursor = 'grabbing';
                        });

                        carousel.addEventListener('pointermove', (e) => {
                            if (!isDragging) return;
                            const dx = startX - e.clientX;
                            carousel.scrollLeft = scrollStart + dx;
                        });

                        carousel.addEventListener('pointerup', () => {
                            isDragging = false;
                            carousel.style.cursor = 'grab';
                        });

                        carousel.addEventListener('pointercancel', () => {
                            isDragging = false;
                        });

                        carousel.style.cursor = 'grab';
                    }
                })
                .catch(err => {
                    console.error('Failed to load active licenses carousel:', err);
                    track.innerHTML = '<div class="active-license-card"><div style="text-align:center; color: #94a3b8; padding: 40px 0;">Error loading licenses</div></div>';
                });
        }

function initializeModule(contentArea) {
    const currentTab = window.__currentTabId || 'operations';
    const render = ModuleComponents[currentTab] || ModuleComponents['operations'];
    render(contentArea);
}
