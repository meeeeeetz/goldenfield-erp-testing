if (typeof ModuleComponents === 'undefined') { window.ModuleComponents = {}; }

ModuleComponents['hr-employees'] = (container) => {
    let originalDepartment = '';
    let originalFormData = {};

    container.innerHTML = `
        <div class="header-actions">
            <h2>Employees</h2>
        </div>
        <div class="action-buttons-row">
            <button id="edit-employee-btn" class="btn-icon-circle" type="button">
                <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
                <span class="btn-label">Manage Employees</span>
            </button>
            <button id="add-roles-btn" class="btn-icon-circle" type="button">
                <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                <span class="btn-label">Organizational Roles</span>
            </button>
            <button id="compensation-upload-btn" class="btn-icon-circle" type="button" style="background: #16a34a; border-color: #16a34a;">
                <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line></svg>
                <span class="btn-label">Employee Compensation Upload (Admin)</span>
            </button>
        </div>
        <div class="tracking-cards-row">
            <div class="card tracking-card">
                <h3>Total Employees</h3>
                <p class="card-sub-label">no. of total Employees</p>
                <div class="card-value-row">
                    <div class="card-value" id="total-employee-count">0</div>
                </div>
            </div>
            <div class="card tracking-card">
                <h3>New Employees</h3>
                <p class="card-sub-label">New Employees under 6 months</p>
                <div class="card-value-row">
                    <div class="card-value" id="new-employee-count">0</div>
                </div>
            </div>
            <div class="card tracking-card">
                <h3>Active and Inactive Employees</h3>
                <p class="card-sub-label">Employees on site or working</p>
                <div class="card-value-row">
                    <div class="card-value" id="active-inactive-count">0</div>
                </div>
            </div>
            <div class="card tracking-card">
                <h3>Absent Employees</h3>
                <p class="card-sub-label">Employees not on site</p>
                <div class="card-value-row">
                    <div class="card-value" id="absent-employee-count">0</div>
                </div>
            </div>
        </div>
        <div class="card graph-placeholder employees-card">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; gap: 12px; flex-wrap: wrap;">
                <h3 style="margin: 0;">Employees</h3>
                <div style="display: flex; gap: 8px; align-items: center; flex-wrap: wrap;">
                    <input type="text" id="employee-search" placeholder="Search by name or department..." style="padding: 8px 12px; border: 1px solid #D6D6D6; border-radius: 6px; font-size: 14px; width: 200px;">
                    <button id="active-employees-btn" class="btn-primary" type="button" style="background: #8b7355; border-color: #8b7355;">Active Employees</button>
                    <button id="inactive-employees-btn" class="btn-primary" type="button" style="background: #d2c4b0; border-color: #d2c4b0;">Inactive Employees</button>
                    <button id="view-all-employees-btn" class="btn-primary" type="button">View all Employees</button>
                </div>
            </div>
            <div class="employee-grid">
                <div id="employee-list-container" class="employee-page active" data-page="1" style="display:flex;flex-wrap:wrap;width:100%;gap:12px;">
                </div>
            </div>
            <div id="employees-pagination" class="pagination"></div>
            <div id="employees-loading" style="display:none; padding: 20px; text-align: center; color: #64748b;">Loading employees...</div>
            <div id="employees-empty" style="display:none; padding: 20px; text-align: center; color: #64748b;">No employees found.</div>
        </div>

        <div id="view-all-employees-modal" class="modal" style="display:none; align-items: flex-start; padding-top: 20px; overflow-y: auto;">
            <div class="modal-content" style="max-width: 1400px; width: 95%; max-height: 85vh; overflow-y: auto;">
                <div class="modal-header-row">
                    <h3>All Active Employees</h3>
                    <button class="modal-close-btn" id="close-view-all-employees-modal">&times;</button>
                </div>
                <div style="overflow-x: auto;">
                    <table style="width: 100%; border-collapse: collapse; font-size: 12px;">
                        <thead>
                            <tr style="background: #f4f4f4; border-bottom: 2px solid #ddd;">
                                <th class="sortable" data-sort="employee_id" style="padding: 8px 6px; text-align: left; border: 1px solid #ddd; cursor: pointer;">Employee ID <span class="sort-arrow">&#8645;</span></th>
                                <th class="sortable" data-sort="last_name" style="padding: 8px 6px; text-align: left; border: 1px solid #ddd; cursor: pointer;">Last Name <span class="sort-arrow">&#8645;</span></th>
                                <th class="sortable" data-sort="first_name" style="padding: 8px 6px; text-align: left; border: 1px solid #ddd; cursor: pointer;">First Name <span class="sort-arrow">&#8645;</span></th>
                                <th style="padding: 8px 6px; text-align: left; border: 1px solid #ddd;">Middle Name</th>
                                <th class="sortable" data-sort="salary_amount" style="padding: 8px 6px; text-align: right; border: 1px solid #ddd; cursor: pointer;">Salary Amount <span class="sort-arrow">&#8645;</span></th>
                                <th style="padding: 8px 6px; text-align: right; border: 1px solid #ddd;">Allowance Amount</th>
                                <th class="sortable" data-sort="department" style="padding: 8px 6px; text-align: left; border: 1px solid #ddd; cursor: pointer;">Department <span class="sort-arrow">&#8645;</span></th>
                                <th style="padding: 8px 6px; text-align: left; border: 1px solid #ddd;">Role</th>
                                <th style="padding: 8px 6px; text-align: right; border: 1px solid #ddd;">SSS Contribution</th>
                                <th style="padding: 8px 6px; text-align: right; border: 1px solid #ddd;">SSS Loan</th>
                                <th style="padding: 8px 6px; text-align: right; border: 1px solid #ddd;">PhilHealth</th>
                                <th style="padding: 8px 6px; text-align: right; border: 1px solid #ddd;">Pag-IBIG</th>
                                <th style="padding: 8px 6px; text-align: right; border: 1px solid #ddd;">Pag-IBIG Loan</th>
                                <th style="padding: 8px 6px; text-align: right; border: 1px solid #ddd;">Sick Leave</th>
                                <th style="padding: 8px 6px; text-align: right; border: 1px solid #ddd;">Vacation Leave</th>
                            </tr>
                        </thead>
                        <tbody id="view-all-employees-tbody">
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

        <div id="employee-profile-modal" class="modal" style="display:none; align-items: flex-start; padding-top: 20px; overflow-y: auto;">
            <div class="modal-content" style="max-width: 780px; width: 95%; max-height: 85vh; overflow-y: auto;">
                <div class="modal-header-row">
                    <h3>Employee Profiles Management</h3>
                    <button class="modal-close-btn" id="close-employee-profile-modal">&times;</button>
                </div>
                <div style="display: flex; flex-direction: column; gap: 10px;">
                    <div style="display: flex; gap: 8px; align-items: flex-start;">
                        <div style="flex: 1; position: relative;">
                            <label style="font-size: 12px; color: #64748b;">Search Employee:</label>
                            <input type="text" id="employee-search-input" placeholder="Search by first, middle, or last name..." style="width: 100%; box-sizing: border-box; padding: 8px; margin-top: 4px; border: 1px solid #D6D6D6; border-radius: 6px; font-size: 14px;">
                            <div id="employee-search-results" style="position: absolute; top: 100%; left: 0; right: 0; background: #fff; border: 1px solid #e2e8f0; border-radius: 6px; max-height: 200px; overflow-y: auto; z-index: 10; display: none; box-shadow: 0 4px 6px rgba(0,0,0,0.1);"></div>
                        </div>
                        <div style="display: flex; flex-direction: column; gap: 2px;">
                            <label style="font-size: 12px; color: #64748b;">Employee ID:</label>
                            <input type="text" id="employee-profile-emp-id" readonly style="width: 150px; box-sizing: border-box; padding: 8px; background: #f1f5f9; border: 1px solid #D6D6D6; border-radius: 6px; font-size: 14px; color: #64748b;">
                        </div>
                    </div>
                    <div class="tabs" style="display: flex; border-bottom: 1px solid #e2e8f0;">
                        <button class="tab-btn active" data-tab="emp-profile" style="flex: 1; padding: 8px; border: none; background: none; cursor: pointer; border-bottom: 2px solid #2563eb; font-weight: 600;">Employee Profile</button>
                        <button class="tab-btn" data-tab="emp-compensation" style="flex: 1; padding: 8px; border: none; background: none; cursor: pointer; border-bottom: 2px solid transparent; font-weight: 600;">Employee Compensation</button>
                        <button class="tab-btn" data-tab="emp-documents" style="flex: 1; padding: 8px; border: none; background: none; cursor: pointer; border-bottom: 2px solid transparent; font-weight: 600;">Uploaded Documents</button>
                    </div>
                    <div id="tab-emp-profile" class="tab-content" style="display: flex; flex-direction: column; gap: 10px;">
                        <div style="display: flex; gap: 8px;">
                            <div style="flex: 0 0 25%; display: flex; flex-direction: column; gap: 6px;">
                                <label>Last Name</label>
                                <input type="text" id="emp-last-name" style="width: 100%; box-sizing: border-box; padding: 10px; border: 1px solid #D6D6D6; border-radius: 6px; font-size: 14px;">
                            </div>
                            <div style="flex: 0 0 50%; display: flex; flex-direction: column; gap: 6px;">
                                <label>First Name</label>
                                <input type="text" id="emp-first-name" style="width: 100%; box-sizing: border-box; padding: 10px; border: 1px solid #D6D6D6; border-radius: 6px; font-size: 14px;">
                            </div>
                            <div style="flex: 0 0 25%; display: flex; flex-direction: column; gap: 6px;">
                                <label>Middle Name</label>
                                <input type="text" id="emp-middle-name" style="width: 100%; box-sizing: border-box; padding: 10px; border: 1px solid #D6D6D6; border-radius: 6px; font-size: 14px;">
                            </div>
                        </div>
                        <div style="display: flex; flex-direction: column; gap: 6px;">
                            <label>Address</label>
                            <input type="text" id="emp-address" style="width: 100%; box-sizing: border-box; padding: 10px; border: 1px solid #D6D6D6; border-radius: 6px; font-size: 14px;">
                        </div>
                        <div style="display: flex; gap: 8px;">
                            <div style="flex: 0 0 50%; display: flex; flex-direction: column; gap: 6px;">
                                <label>Contact Details</label>
                                <input type="text" id="emp-contact" style="width: 100%; box-sizing: border-box; padding: 10px; border: 1px solid #D6D6D6; border-radius: 6px; font-size: 14px;">
                            </div>
                            <div style="flex: 0 0 50%; display: flex; flex-direction: column; gap: 6px;">
                                <label>Email Address</label>
                                <input type="email" id="emp-email" placeholder="example@domain.com" style="width: 100%; box-sizing: border-box; padding: 10px; border: 1px solid #D6D6D6; border-radius: 6px; font-size: 14px;">
                            </div>
                        </div>
                        <div style="display: flex; gap: 8px;">
                            <div style="flex: 0 0 50%; display: flex; flex-direction: column; gap: 6px;">
                                <label>Birth Date</label>
                                <input type="date" id="emp-birthdate" style="width: 100%; box-sizing: border-box; padding: 10px; border: 1px solid #D6D6D6; border-radius: 6px; font-size: 14px;">
                            </div>
                            <div style="flex: 0 0 50%; display: flex; flex-direction: column; gap: 6px;">
                                <label>Gender</label>
                                <select id="emp-gender" style="width: 100%; box-sizing: border-box; padding: 10px; border: 1px solid #D6D6D6; border-radius: 6px; font-size: 14px; background: #fff;">
                                    <option value="">Select Gender</option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                    <option value="Secret">Secret</option>
                                </select>
                            </div>
                        </div>
                        <div style="display: flex; gap: 8px;">
                            <div style="flex: 0 0 50%; display: flex; flex-direction: column; gap: 6px;">
                                <label>Civil Status</label>
                                <select id="emp-civil-status" style="width: 100%; box-sizing: border-box; padding: 10px; border: 1px solid #D6D6D6; border-radius: 6px; font-size: 14px; background: #fff;">
                                    <option value="">Select Civil Status</option>
                                    <option value="Single">Single</option>
                                    <option value="Married">Married</option>
                                    <option value="Widowed">Widowed</option>
                                    <option value="Separated">Separated</option>
                                </select>
                            </div>
                            <div style="flex: 0 0 50%; display: flex; flex-direction: column; gap: 6px;">
                                <label>Employee Status</label>
                                <select id="emp-employment-status" style="width: 100%; box-sizing: border-box; padding: 10px; border: 1px solid #D6D6D6; border-radius: 6px; font-size: 14px; background: #fff;">
                                    <option value="">Select Status</option>
                                    <option value="Active">Active</option>
                                    <option value="Resigned">Resigned</option>
                                    <option value="Terminated">Terminated</option>
                                </select>
                            </div>
                        </div>
                        <div style="display: flex; gap: 8px;">
                            <div style="flex: 0 0 50%; display: flex; flex-direction: column; gap: 6px;">
                                <label>Emergency Contact</label>
                                <input type="text" id="emp-emergency-contact" style="width: 100%; box-sizing: border-box; padding: 10px; border: 1px solid #D6D6D6; border-radius: 6px; font-size: 14px;">
                            </div>
                            <div style="flex: 0 0 50%; display: flex; flex-direction: column; gap: 6px;">
                                <label>Emergency Contact Number</label>
                                <input type="text" id="emp-emergency-number" style="width: 100%; box-sizing: border-box; padding: 10px; border: 1px solid #D6D6D6; border-radius: 6px; font-size: 14px;">
                            </div>
                        </div>
                        <div style="display: flex; gap: 8px;">
                            <div style="flex: 0 0 50%; display: flex; flex-direction: column; gap: 6px;">
                                <label>SSS Number</label>
                                <input type="text" id="emp-sss" style="width: 100%; box-sizing: border-box; padding: 10px; border: 1px solid #D6D6D6; border-radius: 6px; font-size: 14px;">
                            </div>
                            <div style="flex: 0 0 50%; display: flex; flex-direction: column; gap: 6px;">
                                <label>PhilHealth Number</label>
                                <input type="text" id="emp-philhealth" style="width: 100%; box-sizing: border-box; padding: 10px; border: 1px solid #D6D6D6; border-radius: 6px; font-size: 14px;">
                            </div>
                        </div>
                        <div style="display: flex; gap: 8px;">
                            <div style="flex: 0 0 50%; display: flex; flex-direction: column; gap: 6px;">
                                <label>Pag-IBIG Number</label>
                                <input type="text" id="emp-pagibig" style="width: 100%; box-sizing: border-box; padding: 10px; border: 1px solid #D6D6D6; border-radius: 6px; font-size: 14px;">
                            </div>
                            <div style="flex: 0 0 50%; display: flex; flex-direction: column; gap: 6px;">
                                <label>TIN Number</label>
                                <input type="text" id="emp-tin" style="width: 100%; box-sizing: border-box; padding: 10px; border: 1px solid #D6D6D6; border-radius: 6px; font-size: 14px;">
                            </div>
                        </div>

                        <div style="display: flex; gap: 8px;">
                            <div style="flex: 0 0 50%; display: flex; flex-direction: column; gap: 6px;">
                                <label>Department</label>
                                <select id="emp-department" style="width: 100%; box-sizing: border-box; padding: 10px; border: 1px solid #D6D6D6; border-radius: 6px; font-size: 14px; background: #fff;">
                                    <option value="">Select Department</option>
                                </select>
                            </div>
                            <div style="flex: 0 0 50%; display: flex; flex-direction: column; gap: 6px;">
                                <label>Available Role</label>
                                <select id="emp-role" style="width: 100%; box-sizing: border-box; padding: 10px; border: 1px solid #D6D6D6; border-radius: 6px; font-size: 14px; background: #fff;">
                                    <option value="">Select Role</option>
                                </select>
                            </div>
                        </div>
                        <button id="save-employee-profile-btn" class="btn-primary" type="button">Save</button>
                        <button id="deactivate-employee-btn" class="btn-primary" type="button" style="background: #dc3545; border-color: #dc3545;">Deactivate Employee</button>
                    </div>
                    <div id="tab-emp-compensation" class="tab-content" style="display: none; flex-direction: column; gap: 10px;">
                        <div style="display: flex; gap: 8px;">
                            <div style="flex: 0 0 33.33%; display: flex; flex-direction: column; gap: 6px;">
                                <label>Department</label>
                                <input type="text" id="guide-emp-department" readonly style="width: 100%; box-sizing: border-box; padding: 10px; border: 1px solid #D6D6D6; border-radius: 6px; font-size: 14px; background: #f1f5f9;">
                            </div>
                            <div style="flex: 0 0 33.33%; display: flex; flex-direction: column; gap: 6px;">
                                <label>Available Role</label>
                                <input type="text" id="guide-emp-role" readonly style="width: 100%; box-sizing: border-box; padding: 10px; border: 1px solid #D6D6D6; border-radius: 6px; font-size: 14px; background: #f1f5f9;">
                            </div>
                            <div style="flex: 0 0 33.33%; display: flex; flex-direction: column; gap: 6px;">
                                <label>Shift Policy</label>
                                <select id="emp-shift-policy" style="width: 100%; box-sizing: border-box; padding: 10px; border: 1px solid #D6D6D6; border-radius: 6px; font-size: 14px; background: #fff;">
                                    <option value="">Select Shift Policy</option>
                                </select>
                            </div>
                        </div>
                        <div style="display: flex; gap: 8px;">
                            <div style="flex: 0 0 50%; display: flex; flex-direction: column; gap: 6px;">
                                <label>Salary Paymode</label>
                                <select id="emp-salary-paymode" style="width: 100%; box-sizing: border-box; padding: 10px; border: 1px solid #D6D6D6; border-radius: 6px; font-size: 14px; background: #fff;">
                                    <option value="">Select Paymode</option>
                                    <option value="Daily">Daily</option>
                                    <option value="Monthly">Monthly</option>
                                    <option value="Per Job">Per Job</option>
                                </select>
                            </div>
                            <div style="flex: 0 0 50%; display: flex; flex-direction: column; gap: 6px;">
                                <label>Salary Amount</label>
                                <input type="number" id="emp-salary-amount" placeholder="Input Amount" style="width: 100%; box-sizing: border-box; padding: 10px; border: 1px solid #D6D6D6; border-radius: 6px; font-size: 14px;">
                            </div>
                        </div>
                        <div style="display: flex; gap: 8px;">
                            <div style="flex: 0 0 50%; display: flex; flex-direction: column; gap: 6px;">
                                <label>Allowance Paymode</label>
                                <select id="emp-allowance-paymode" style="width: 100%; box-sizing: border-box; padding: 10px; border: 1px solid #D6D6D6; border-radius: 6px; font-size: 14px; background: #fff;">
                                    <option value="">Select Paymode</option>
                                    <option value="Daily">Daily</option>
                                    <option value="Monthly">Monthly</option>
                                </select>
                            </div>
                            <div style="flex: 0 0 50%; display: flex; flex-direction: column; gap: 6px;">
                                <label>Allowance Amount</label>
                                <input type="number" id="emp-allowance-amount" placeholder="Input Amount" style="width: 100%; box-sizing: border-box; padding: 10px; border: 1px solid #D6D6D6; border-radius: 6px; font-size: 14px;">
                            </div>
                        </div>
                        <div style="display: flex; gap: 8px;">
                            <div style="flex: 0 0 50%; display: flex; flex-direction: column; gap: 6px;">
                                <label>Pay Frequency</label>
                                <select id="emp-pay-frequency" style="width: 100%; box-sizing: border-box; padding: 10px; border: 1px solid #D6D6D6; border-radius: 6px; font-size: 14px; background: #fff;">
                                    <option value="">Select Frequency</option>
                                    <option value="Weekly">Weekly</option>
                                    <option value="Semi monthly">Semi monthly</option>
                                    <option value="Monthly">Monthly</option>
                                </select>
                            </div>
                            <div style="flex: 0 0 50%; display: flex; flex-direction: column; gap: 6px;">
                                <label>Payout Method</label>
                                <select id="emp-payout-method" style="width: 100%; box-sizing: border-box; padding: 10px; border: 1px solid #D6D6D6; border-radius: 6px; font-size: 14px; background: #fff;">
                                    <option value="">Select Method</option>
                                    <option value="Cash">Cash</option>
                                    <option value="Bank">Bank</option>
                                    <option value="Wallet">Wallet</option>
                                </select>
                            </div>
                        </div>
                        <div style="display: flex; gap: 8px;">
                            <div style="flex: 0 0 50%; display: flex; flex-direction: column; gap: 6px;">
                                <label>SSS Contribution Mode</label>
                                <select id="emp-sss-contribution-mode" style="width: 100%; box-sizing: border-box; padding: 10px; border: 1px solid #D6D6D6; border-radius: 6px; font-size: 14px; background: #fff;">
                                    <option value="Semi monthly">Semi monthly</option>
                                    <option value="Monthly">Monthly</option>
                                </select>
                            </div>
                            <div style="flex: 0 0 50%; display: flex; flex-direction: column; gap: 6px;">
                                <label>SSS Contribution Amount</label>
                                <input type="number" id="emp-sss-contribution-amount" placeholder="Input Amount" style="width: 100%; box-sizing: border-box; padding: 10px; border: 1px solid #D6D6D6; border-radius: 6px; font-size: 14px;">
                            </div>
                        </div>
                        <div style="display: flex; gap: 8px;">
                            <div style="flex: 0 0 50%; display: flex; flex-direction: column; gap: 6px;">
                                <label>SSS Loan Payment Mode</label>
                                <select id="emp-sss-loan-mode" style="width: 100%; box-sizing: border-box; padding: 10px; border: 1px solid #D6D6D6; border-radius: 6px; font-size: 14px; background: #fff;">
                                    <option value="Semi monthly">Semi monthly</option>
                                    <option value="Monthly">Monthly</option>
                                </select>
                            </div>
                            <div style="flex: 0 0 50%; display: flex; flex-direction: column; gap: 6px;">
                                <label>SSS Loan Amount</label>
                                <input type="number" id="emp-sss-loan-amount" placeholder="Input Amount" style="width: 100%; box-sizing: border-box; padding: 10px; border: 1px solid #D6D6D6; border-radius: 6px; font-size: 14px;">
                            </div>
                        </div>
                        <div style="display: flex; gap: 8px;">
                            <div style="flex: 0 0 50%; display: flex; flex-direction: column; gap: 6px;">
                                <label>PhilHealth Contribution Mode</label>
                                <select id="emp-philhealth-contribution-mode" style="width: 100%; box-sizing: border-box; padding: 10px; border: 1px solid #D6D6D6; border-radius: 6px; font-size: 14px; background: #fff;">
                                    <option value="Semi monthly">Semi monthly</option>
                                    <option value="Monthly">Monthly</option>
                                </select>
                            </div>
                            <div style="flex: 0 0 50%; display: flex; flex-direction: column; gap: 6px;">
                                <label>PhilHealth Contribution Amount</label>
                                <input type="number" id="emp-philhealth-contribution-amount" placeholder="Input Amount" style="width: 100%; box-sizing: border-box; padding: 10px; border: 1px solid #D6D6D6; border-radius: 6px; font-size: 14px;">
                            </div>
                        </div>
                        <div style="display: flex; gap: 8px;">
                            <div style="flex: 0 0 50%; display: flex; flex-direction: column; gap: 6px;">
                                <label>Pag-IBIG Contribution Mode</label>
                                <select id="emp-pagibig-contribution-mode" style="width: 100%; box-sizing: border-box; padding: 10px; border: 1px solid #D6D6D6; border-radius: 6px; font-size: 14px; background: #fff;">
                                    <option value="Semi monthly">Semi monthly</option>
                                    <option value="Monthly">Monthly</option>
                                </select>
                            </div>
                            <div style="flex: 0 0 50%; display: flex; flex-direction: column; gap: 6px;">
                                <label>Pag-IBIG Contribution Amount</label>
                                <input type="number" id="emp-pagibig-contribution-amount" placeholder="Input Amount" style="width: 100%; box-sizing: border-box; padding: 10px; border: 1px solid #D6D6D6; border-radius: 6px; font-size: 14px;">
                            </div>
                        </div>
                        <div style="display: flex; gap: 8px;">
                            <div style="flex: 0 0 50%; display: flex; flex-direction: column; gap: 6px;">
                                <label>Pag-IBIG Loan Payment Mode</label>
                                <select id="emp-pagibig-loan-mode" style="width: 100%; box-sizing: border-box; padding: 10px; border: 1px solid #D6D6D6; border-radius: 6px; font-size: 14px; background: #fff;">
                                    <option value="Semi monthly">Semi monthly</option>
                                    <option value="Monthly">Monthly</option>
                                </select>
                            </div>
                            <div style="flex: 0 0 50%; display: flex; flex-direction: column; gap: 6px;">
                                <label>Pag-IBIG Loan Amount</label>
                                <input type="number" id="emp-pagibig-loan-amount" placeholder="Input Amount" style="width: 100%; box-sizing: border-box; padding: 10px; border: 1px solid #D6D6D6; border-radius: 6px; font-size: 14px;">
                            </div>
                        </div>
                        <div style="display: flex; gap: 8px;">
                            <div style="flex: 0 0 50%; display: flex; flex-direction: column; gap: 6px;">
                                <label>Yearly Sick Leave</label>
                                <input type="number" id="emp-yearly-sick-leave" placeholder="Input Days" style="width: 100%; box-sizing: border-box; padding: 10px; border: 1px solid #D6D6D6; border-radius: 6px; font-size: 14px;">
                            </div>
                            <div style="flex: 0 0 50%; display: flex; flex-direction: column; gap: 6px;">
                                <label>Yearly Vacation Leave</label>
                                <input type="number" id="emp-yearly-vacation-leave" placeholder="Input Days" style="width: 100%; box-sizing: border-box; padding: 10px; border: 1px solid #D6D6D6; border-radius: 6px; font-size: 14px;">
                            </div>
                        </div>
                        <button id="save-employee-compensation-btn" class="btn-primary" type="button">Save</button>
                    </div>
                    <div id="tab-emp-documents" class="tab-content" style="display: none; flex-direction: column; gap: 10px;">
                        <div style="display: flex; flex-direction: row; align-items: center; gap: 8px;" id="emp-doc-2x2-wrapper">
                            <label style="flex: 0 0 140px;">2x2 Picture</label>
                             <input type="text" id="emp-doc-2x2" readonly placeholder="No file uploaded" style="flex: 1; box-sizing: border-box; padding: 10px; border: 1px solid #D6D6D6; border-radius: 6px; font-size: 14px; background: #f1f5f9;">
                            <button type="button" class="btn-primary emp-doc-upload-btn" data-doc-type="2x2-pic" style="padding: 6px 12px; font-size: 12px; white-space: nowrap; cursor: pointer;">Upload</button>
                            <input type="file" accept="image/jpeg,image/png,image/jpg" style="display:none">
                        </div>
                        <div style="display: flex; flex-direction: row; align-items: center; gap: 8px;" id="emp-doc-resume-wrapper">
                            <label style="flex: 0 0 140px;">Resume</label>
                             <input type="text" id="emp-doc-resume" readonly placeholder="No file uploaded" style="flex: 1; box-sizing: border-box; padding: 10px; border: 1px solid #D6D6D6; border-radius: 6px; font-size: 14px; background: #f1f5f9;">
                            <button type="button" class="btn-primary emp-doc-upload-btn" data-doc-type="resume" style="padding: 6px 12px; font-size: 12px; white-space: nowrap; cursor: pointer;">Upload</button>
                            <input type="file" accept="image/jpeg,image/png,image/jpg" style="display:none">
                        </div>
                        <div style="display: flex; flex-direction: row; align-items: center; gap: 8px;" id="emp-doc-employment-contract-wrapper">
                            <label style="flex: 0 0 140px;">Employment Contract</label>
                             <input type="text" id="emp-doc-employment-contract" readonly placeholder="No file uploaded" style="flex: 1; box-sizing: border-box; padding: 10px; border: 1px solid #D6D6D6; border-radius: 6px; font-size: 14px; background: #f1f5f9;">
                            <button type="button" class="btn-primary emp-doc-upload-btn" data-doc-type="employment-contract" style="padding: 6px 12px; font-size: 12px; white-space: nowrap; cursor: pointer;">Upload</button>
                            <input type="file" accept="image/jpeg,image/png,image/jpg" style="display:none">
                        </div>
                        <div style="display: flex; flex-direction: row; align-items: center; gap: 8px;" id="emp-doc-birth-certificate-wrapper">
                            <label style="flex: 0 0 140px;">Birth Certificate</label>
                             <input type="text" id="emp-doc-birth-certificate" readonly placeholder="No file uploaded" style="flex: 1; box-sizing: border-box; padding: 10px; border: 1px solid #D6D6D6; border-radius: 6px; font-size: 14px; background: #f1f5f9;">
                            <button type="button" class="btn-primary emp-doc-upload-btn" data-doc-type="birth-certificate" style="padding: 6px 12px; font-size: 12px; white-space: nowrap; cursor: pointer;">Upload</button>
                            <input type="file" accept="image/jpeg,image/png,image/jpg" style="display:none">
                        </div>
                        <div style="display: flex; flex-direction: row; align-items: center; gap: 8px;" id="emp-doc-gov-id-wrapper">
                            <label style="flex: 0 0 140px;">Government ID</label>
                             <input type="text" id="emp-doc-gov-id" readonly placeholder="No file uploaded" style="flex: 1; box-sizing: border-box; padding: 10px; border: 1px solid #D6D6D6; border-radius: 6px; font-size: 14px; background: #f1f5f9;">
                            <button type="button" class="btn-primary emp-doc-upload-btn" data-doc-type="gov-id" style="padding: 6px 12px; font-size: 12px; white-space: nowrap; cursor: pointer;">Upload</button>
                            <input type="file" accept="image/jpeg,image/png,image/jpg" style="display:none">
                        </div>
                        <div style="display: flex; flex-direction: row; align-items: center; gap: 8px;" id="emp-doc-sss-wrapper">
                            <label style="flex: 0 0 140px;">SSS Form</label>
                             <input type="text" id="emp-doc-sss" readonly placeholder="No file uploaded" style="flex: 1; box-sizing: border-box; padding: 10px; border: 1px solid #D6D6D6; border-radius: 6px; font-size: 14px; background: #f1f5f9;">
                            <button type="button" class="btn-primary emp-doc-upload-btn" data-doc-type="sss-form" style="padding: 6px 12px; font-size: 12px; white-space: nowrap; cursor: pointer;">Upload</button>
                            <input type="file" accept="image/jpeg,image/png,image/jpg" style="display:none">
                        </div>
                        <div style="display: flex; flex-direction: row; align-items: center; gap: 8px;" id="emp-doc-philhealth-wrapper">
                            <label style="flex: 0 0 140px;">PhilHealth Form</label>
                             <input type="text" id="emp-doc-philhealth" readonly placeholder="No file uploaded" style="flex: 1; box-sizing: border-box; padding: 10px; border: 1px solid #D6D6D6; border-radius: 6px; font-size: 14px; background: #f1f5f9;">
                            <button type="button" class="btn-primary emp-doc-upload-btn" data-doc-type="philhealth-form" style="padding: 6px 12px; font-size: 12px; white-space: nowrap; cursor: pointer;">Upload</button>
                            <input type="file" accept="image/jpeg,image/png,image/jpg" style="display:none">
                        </div>
                        <div style="display: flex; flex-direction: row; align-items: center; gap: 8px;" id="emp-doc-pagibig-wrapper">
                            <label style="flex: 0 0 140px;">Pag-IBIG Form</label>
                             <input type="text" id="emp-doc-pagibig" readonly placeholder="No file uploaded" style="flex: 1; box-sizing: border-box; padding: 10px; border: 1px solid #D6D6D6; border-radius: 6px; font-size: 14px; background: #f1f5f9;">
                            <button type="button" class="btn-primary emp-doc-upload-btn" data-doc-type="pagibig-form" style="padding: 6px 12px; font-size: 12px; white-space: nowrap; cursor: pointer;">Upload</button>
                            <input type="file" accept="image/jpeg,image/png,image/jpg" style="display:none">
                        </div>
                        <div style="display: flex; flex-direction: row; align-items: center; gap: 8px;" id="emp-doc-tin-wrapper">
                            <label style="flex: 0 0 140px;">TIN Form</label>
                             <input type="text" id="emp-doc-tin" readonly placeholder="No file uploaded" style="flex: 1; box-sizing: border-box; padding: 10px; border: 1px solid #D6D6D6; border-radius: 6px; font-size: 14px; background: #f1f5f9;">
                            <button type="button" class="btn-primary emp-doc-upload-btn" data-doc-type="tin-form" style="padding: 6px 12px; font-size: 12px; white-space: nowrap; cursor: pointer;">Upload</button>
                            <input type="file" accept="image/jpeg,image/png,image/jpg" style="display:none">
                        </div>
                        <div style="display: flex; flex-direction: row; align-items: center; gap: 8px;" id="emp-doc-nbi-wrapper">
                            <label style="flex: 0 0 140px;">NBI Clearance</label>
                             <input type="text" id="emp-doc-nbi" readonly placeholder="No file uploaded" style="flex: 1; box-sizing: border-box; padding: 10px; border: 1px solid #D6D6D6; border-radius: 6px; font-size: 14px; background: #f1f5f9;">
                            <button type="button" class="btn-primary emp-doc-upload-btn" data-doc-type="nbi-clearance" style="padding: 6px 12px; font-size: 12px; white-space: nowrap; cursor: pointer;">Upload</button>
                            <input type="file" accept="image/jpeg,image/png,image/jpg" style="display:none">
                        </div>
                        <div style="display: flex; flex-direction: row; align-items: center; gap: 8px;" id="emp-doc-pnp-wrapper">
                            <label style="flex: 0 0 140px;">PNP Clearance</label>
                             <input type="text" id="emp-doc-pnp" readonly placeholder="No file uploaded" style="flex: 1; box-sizing: border-box; padding: 10px; border: 1px solid #D6D6D6; border-radius: 6px; font-size: 14px; background: #f1f5f9;">
                            <button type="button" class="btn-primary emp-doc-upload-btn" data-doc-type="pnp-clearance" style="padding: 6px 12px; font-size: 12px; white-space: nowrap; cursor: pointer;">Upload</button>
                            <input type="file" accept="image/jpeg,image/png,image/jpg" style="display:none">
                        </div>
                        <div style="display: flex; flex-direction: row; align-items: center; gap: 8px;" id="emp-doc-medical-wrapper">
                            <label style="flex: 0 0 140px;">Medical Results</label>
                             <input type="text" id="emp-doc-medical" readonly placeholder="No file uploaded" style="flex: 1; box-sizing: border-box; padding: 10px; border: 1px solid #D6D6D6; border-radius: 6px; font-size: 14px; background: #f1f5f9;">
                            <button type="button" class="btn-primary emp-doc-upload-btn" data-doc-type="medical-results" style="padding: 6px 12px; font-size: 12px; white-space: nowrap; cursor: pointer;">Upload</button>
                            <input type="file" accept="image/jpeg,image/png,image/jpg" style="display:none">
                        </div>
                        <div style="display: flex; flex-direction: row; align-items: center; gap: 8px;" id="emp-doc-barangay-wrapper">
                            <label style="flex: 0 0 140px;">Barangay Certificate</label>
                             <input type="text" id="emp-doc-barangay" readonly placeholder="No file uploaded" style="flex: 1; box-sizing: border-box; padding: 10px; border: 1px solid #D6D6D6; border-radius: 6px; font-size: 14px; background: #f1f5f9;">
                            <button type="button" class="btn-primary emp-doc-upload-btn" data-doc-type="barangay-certificate" style="padding: 6px 12px; font-size: 12px; white-space: nowrap; cursor: pointer;">Upload</button>
                            <input type="file" accept="image/jpeg,image/png,image/jpg" style="display:none">
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div id="compensation-upload-modal" class="modal" style="display:none; align-items: flex-start; padding-top: 20px; overflow-y: auto;">
            <div class="modal-content" style="max-width: 1100px; width: 95%;">
                <div class="modal-header-row">
                    <h3>Employee Compensation Upload (Admin)</h3>
                    <button class="modal-close-btn" id="close-compensation-upload-modal">&times;</button>
                </div>
                <div style="display: flex; gap: 16px; align-items: stretch;">
                    <div style="flex: 1; min-width: 0;">
                        <div id="compensation-upload-drop-zone" style="border: 2px dashed #D6D6D6; border-radius: 8px; padding: 40px 20px; text-align: center; background: #fafafa; transition: border-color 0.2s, background 0.2s; cursor: pointer;">
                            <svg viewBox="0 0 24 24" width="48" height="48" fill="none" stroke="#888" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line></svg>
                            <p style="margin-top: 12px; color: #555; font-weight: 600;">Drag and drop Excel or CSV file here</p>
                            <p style="margin-top: 6px; color: #888; font-size: 13px;">or click to browse</p>
                            <input type="file" id="compensation-upload-file-input" accept=".xlsx,.xls,.csv" style="display: none;" />
                        </div>
                        <div style="margin-top: 16px; display: flex; gap: 10px; justify-content: flex-end;">
                            <button id="download-compensation-template-btn" class="btn-primary">Download Template</button>
                            <button id="upload-compensation-btn" class="btn-success">Save</button>
                        </div>
                    </div>
                    <div style="flex: 1; min-width: 0; border: 1px solid #D6D6D6; border-radius: 6px; overflow: hidden; display: flex; flex-direction: column;">
                        <div style="background: #f5f5f5; padding: 10px 14px; border-bottom: 1px solid #e5e5e5; font-weight: 600; color: #1a1f2e;">File Preview</div>
                        <div id="compensation-upload-preview" style="padding: 14px; overflow: auto; max-height: 400px; flex: 1; background: #fff;">
                            <p style="color: #999; text-align: center; margin-top: 40px;">No file selected</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div id="image-preview-modal" style="display:none; position:fixed; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.85); z-index:1000; align-items:center; justify-content:center;">
            <div style="max-width:90%; max-height:90%; background:#fff; border-radius:8px; padding:20px; position:relative;">
                <button id="close-image-preview" style="position:absolute; top:10px; right:10px; background:#333; color:#fff; border:none; border-radius:50%; width:32px; height:32px; font-size:18px; cursor:pointer;">&times;</button>
                <img id="image-preview-modal-img" src="" alt="Preview" style="max-width:100%; max-height:80vh; display:block; margin:0 auto;">
            </div>
        </div>

        <div id="emp-doc-upload-modal" class="modal" style="display:none; align-items: center; justify-content: center;">
            <div class="modal-content" style="max-width: 420px; width: 95%;">
                <div class="modal-header-row">
                    <h3 id="emp-doc-upload-modal-title">Upload Document</h3>
                    <button class="modal-close-btn" id="close-emp-doc-upload-modal">&times;</button>
                </div>
                <div style="display: flex; flex-direction: column; gap: 12px; padding-top: 8px;">
                    <div style="display: flex; flex-direction: column; gap: 6px;">
                        <label style="font-weight: 600;">Select Image (JPG/PNG only)</label>
                        <input type="file" id="emp-doc-upload-file-input" accept="image/jpeg,image/png,image/jpg" style="padding: 8px; border: 1px solid #D6D6D6; border-radius: 6px; font-size: 14px;">
                    </div>
                    <div style="display: flex; gap: 8px; justify-content: flex-end;">
                        <button id="cancel-emp-doc-upload-btn" class="btn-danger" type="button">Cancel</button>
                        <button id="save-emp-doc-upload-btn" class="btn-primary" type="button">Save</button>
                    </div>
                </div>
            </div>
        </div>
        <div id="employee-details-modal" class="modal" style="display:none; align-items: center; justify-content: center;">
            <div class="modal-content" style="max-width: 960px; width: 95%; max-height: 90vh; display: flex; flex-direction: column;">
                <div class="modal-header-row">
                    <h3>Employee Details</h3>
                    <button class="modal-close-btn" id="close-employee-details-modal">&times;</button>
                </div>
                <div style="overflow-y: auto; padding: 16px; display: flex; flex-direction: column; gap: 12px;">
                    <div style="display: flex; gap: 8px;">
                        <div style="flex: 1; display: flex; flex-direction: column; gap: 4px;">
                            <label>Last Name</label>
                            <input type="text" id="det-last-name" readonly style="width: 100%; box-sizing: border-box; padding: 8px; border: 1px solid #D6D6D6; border-radius: 6px; background: #f1f5f9; font-size: 14px;">
                        </div>
                        <div style="flex: 1; display: flex; flex-direction: column; gap: 4px;">
                            <label>First Name</label>
                            <input type="text" id="det-first-name" readonly style="width: 100%; box-sizing: border-box; padding: 8px; border: 1px solid #D6D6D6; border-radius: 6px; background: #f1f5f9; font-size: 14px;">
                        </div>
                        <div style="flex: 1; display: flex; flex-direction: column; gap: 4px;">
                            <label>Middle Name</label>
                            <input type="text" id="det-middle-name" readonly style="width: 100%; box-sizing: border-box; padding: 8px; border: 1px solid #D6D6D6; border-radius: 6px; background: #f1f5f9; font-size: 14px;">
                        </div>
                    </div>
                    <div style="display: flex; gap: 8px;">
                        <div style="flex: 1; display: flex; flex-direction: column; gap: 4px;">
                            <label>Address</label>
                            <input type="text" id="det-address" readonly style="width: 100%; box-sizing: border-box; padding: 8px; border: 1px solid #D6D6D6; border-radius: 6px; background: #f1f5f9; font-size: 14px;">
                        </div>
                    </div>
                    <div style="display: flex; gap: 8px;">
                        <div style="flex: 1; display: flex; flex-direction: column; gap: 4px;">
                            <label>Contact Details</label>
                            <input type="text" id="det-contact" readonly style="width: 100%; box-sizing: border-box; padding: 8px; border: 1px solid #D6D6D6; border-radius: 6px; background: #f1f5f9; font-size: 14px;">
                        </div>
                        <div style="flex: 1; display: flex; flex-direction: column; gap: 4px;">
                            <label>Birth Date</label>
                            <input type="text" id="det-birthdate" readonly style="width: 100%; box-sizing: border-box; padding: 8px; border: 1px solid #D6D6D6; border-radius: 6px; background: #f1f5f9; font-size: 14px;">
                        </div>
                    </div>
                    <div style="display: flex; gap: 8px;">
                        <div style="flex: 1; display: flex; flex-direction: column; gap: 4px;">
                            <label>Gender</label>
                            <input type="text" id="det-gender" readonly style="width: 100%; box-sizing: border-box; padding: 8px; border: 1px solid #D6D6D6; border-radius: 6px; background: #f1f5f9; font-size: 14px;">
                        </div>
                        <div style="flex: 1; display: flex; flex-direction: column; gap: 4px;">
                            <label>Civil Status</label>
                            <input type="text" id="det-civil-status" readonly style="width: 100%; box-sizing: border-box; padding: 8px; border: 1px solid #D6D6D6; border-radius: 6px; background: #f1f5f9; font-size: 14px;">
                        </div>
                        <div style="flex: 1; display: flex; flex-direction: column; gap: 4px;">
                            <label>Employment Status</label>
                            <input type="text" id="det-employment-status" readonly style="width: 100%; box-sizing: border-box; padding: 8px; border: 1px solid #D6D6D6; border-radius: 6px; background: #f1f5f9; font-size: 14px;">
                        </div>
                    </div>
                    <div style="display: flex; gap: 8px;">
                        <div style="flex: 1; display: flex; flex-direction: column; gap: 4px;">
                            <label>Emergency Contact</label>
                            <input type="text" id="det-emergency-contact" readonly style="width: 100%; box-sizing: border-box; padding: 8px; border: 1px solid #D6D6D6; border-radius: 6px; background: #f1f5f9; font-size: 14px;">
                        </div>
                        <div style="flex: 1; display: flex; flex-direction: column; gap: 4px;">
                            <label>Emergency Contact Number</label>
                            <input type="text" id="det-emergency-number" readonly style="width: 100%; box-sizing: border-box; padding: 8px; border: 1px solid #D6D6D6; border-radius: 6px; background: #f1f5f9; font-size: 14px;">
                        </div>
                    </div>
                    <div style="display: flex; gap: 8px;">
                        <div style="flex: 1; display: flex; flex-direction: column; gap: 4px;">
                            <label>SSS Number</label>
                            <input type="text" id="det-sss" readonly style="width: 100%; box-sizing: border-box; padding: 8px; border: 1px solid #D6D6D6; border-radius: 6px; background: #f1f5f9; font-size: 14px;">
                        </div>
                        <div style="flex: 1; display: flex; flex-direction: column; gap: 4px;">
                            <label>PhilHealth Number</label>
                            <input type="text" id="det-philhealth" readonly style="width: 100%; box-sizing: border-box; padding: 8px; border: 1px solid #D6D6D6; border-radius: 6px; background: #f1f5f9; font-size: 14px;">
                        </div>
                    </div>
                    <div style="display: flex; gap: 8px;">
                        <div style="flex: 1; display: flex; flex-direction: column; gap: 4px;">
                            <label>Pag-IBIG Number</label>
                            <input type="text" id="det-pagibig" readonly style="width: 100%; box-sizing: border-box; padding: 8px; border: 1px solid #D6D6D6; border-radius: 6px; background: #f1f5f9; font-size: 14px;">
                        </div>
                        <div style="flex: 1; display: flex; flex-direction: column; gap: 4px;">
                            <label>TIN Number</label>
                            <input type="text" id="det-tin" readonly style="width: 100%; box-sizing: border-box; padding: 8px; border: 1px solid #D6D6D6; border-radius: 6px; background: #f1f5f9; font-size: 14px;">
                        </div>
                    </div>
                    <div style="display: flex; gap: 8px;">
                        <div style="flex: 1; display: flex; flex-direction: column; gap: 4px;">
                            <label>Department</label>
                            <input type="text" id="det-department" readonly style="width: 100%; box-sizing: border-box; padding: 8px; border: 1px solid #D6D6D6; border-radius: 6px; background: #f1f5f9; font-size: 14px;">
                        </div>
                        <div style="flex: 1; display: flex; flex-direction: column; gap: 4px;">
                            <label>Available Role</label>
                            <input type="text" id="det-role" readonly style="width: 100%; box-sizing: border-box; padding: 8px; border: 1px solid #D6D6D6; border-radius: 6px; background: #f1f5f9; font-size: 14px;">
                        </div>
                    </div>
                    <div style="display: flex; gap: 8px;">
                        <div style="flex: 1; display: flex; flex-direction: column; gap: 4px;">
                            <label>Salary Pay Mode</label>
                            <input type="text" id="det-salary-paymode" readonly style="width: 100%; box-sizing: border-box; padding: 8px; border: 1px solid #D6D6D6; border-radius: 6px; background: #f1f5f9; font-size: 14px;">
                        </div>
                        <div style="flex: 1; display: flex; flex-direction: column; gap: 4px;">
                            <label>Salary Amount</label>
                            <input type="text" id="det-salary-amount" readonly style="width: 100%; box-sizing: border-box; padding: 8px; border: 1px solid #D6D6D6; border-radius: 6px; background: #f1f5f9; font-size: 14px;">
                        </div>
                    </div>
                    <div style="display: flex; gap: 8px;">
                        <div style="flex: 1; display: flex; flex-direction: column; gap: 4px;">
                            <label>Allowance Pay Mode</label>
                            <input type="text" id="det-allowance-paymode" readonly style="width: 100%; box-sizing: border-box; padding: 8px; border: 1px solid #D6D6D6; border-radius: 6px; background: #f1f5f9; font-size: 14px;">
                        </div>
                        <div style="flex: 1; display: flex; flex-direction: column; gap: 4px;">
                            <label>Allowance Amount</label>
                            <input type="text" id="det-allowance-amount" readonly style="width: 100%; box-sizing: border-box; padding: 8px; border: 1px solid #D6D6D6; border-radius: 6px; background: #f1f5f9; font-size: 14px;">
                        </div>
                    </div>
                    <div style="display: flex; gap: 8px;">
                        <div style="flex: 1; display: flex; flex-direction: column; gap: 4px;">
                            <label>Pay Frequency</label>
                            <input type="text" id="det-pay-frequency" readonly style="width: 100%; box-sizing: border-box; padding: 8px; border: 1px solid #D6D6D6; border-radius: 6px; background: #f1f5f9; font-size: 14px;">
                        </div>
                        <div style="flex: 1; display: flex; flex-direction: column; gap: 4px;">
                            <label>Payout Method</label>
                            <input type="text" id="det-payout-method" readonly style="width: 100%; box-sizing: border-box; padding: 8px; border: 1px solid #D6D6D6; border-radius: 6px; background: #f1f5f9; font-size: 14px;">
                        </div>
                        <div style="flex: 1; display: flex; flex-direction: column; gap: 4px;">
                            <label>Shift Policy</label>
                            <input type="text" id="det-shift-policy" readonly style="width: 100%; box-sizing: border-box; padding: 8px; border: 1px solid #D6D6D6; border-radius: 6px; background: #f1f5f9; font-size: 14px;">
                        </div>
                    </div>
                    <div style="display: flex; gap: 8px;">
                        <div style="flex: 1; display: flex; flex-direction: column; gap: 4px;">
                            <label>SSS Contribution Mode</label>
                            <input type="text" id="det-sss-contribution-mode" readonly style="width: 100%; box-sizing: border-box; padding: 8px; border: 1px solid #D6D6D6; border-radius: 6px; background: #f1f5f9; font-size: 14px;">
                        </div>
                        <div style="flex: 1; display: flex; flex-direction: column; gap: 4px;">
                            <label>SSS Contribution Amount</label>
                            <input type="text" id="det-sss-contribution-amount" readonly style="width: 100%; box-sizing: border-box; padding: 8px; border: 1px solid #D6D6D6; border-radius: 6px; background: #f1f5f9; font-size: 14px;">
                        </div>
                    </div>
                    <div style="display: flex; gap: 8px;">
                        <div style="flex: 1; display: flex; flex-direction: column; gap: 4px;">
                            <label>SSS Loan Payment Mode</label>
                            <input type="text" id="det-sss-loan-mode" readonly style="width: 100%; box-sizing: border-box; padding: 8px; border: 1px solid #D6D6D6; border-radius: 6px; background: #f1f5f9; font-size: 14px;">
                        </div>
                        <div style="flex: 1; display: flex; flex-direction: column; gap: 4px;">
                            <label>SSS Loan Amount</label>
                            <input type="text" id="det-sss-loan-amount" readonly style="width: 100%; box-sizing: border-box; padding: 8px; border: 1px solid #D6D6D6; border-radius: 6px; background: #f1f5f9; font-size: 14px;">
                        </div>
                    </div>
                    <div style="display: flex; gap: 8px;">
                        <div style="flex: 1; display: flex; flex-direction: column; gap: 4px;">
                            <label>PhilHealth Contribution Mode</label>
                            <input type="text" id="det-philhealth-mode" readonly style="width: 100%; box-sizing: border-box; padding: 8px; border: 1px solid #D6D6D6; border-radius: 6px; background: #f1f5f9; font-size: 14px;">
                        </div>
                        <div style="flex: 1; display: flex; flex-direction: column; gap: 4px;">
                            <label>PhilHealth Contribution Amount</label>
                            <input type="text" id="det-philhealth-amount" readonly style="width: 100%; box-sizing: border-box; padding: 8px; border: 1px solid #D6D6D6; border-radius: 6px; background: #f1f5f9; font-size: 14px;">
                        </div>
                    </div>
                    <div style="display: flex; gap: 8px;">
                        <div style="flex: 1; display: flex; flex-direction: column; gap: 4px;">
                            <label>Pag-IBIG Contribution Mode</label>
                            <input type="text" id="det-pagibig-mode" readonly style="width: 100%; box-sizing: border-box; padding: 8px; border: 1px solid #D6D6D6; border-radius: 6px; background: #f1f5f9; font-size: 14px;">
                        </div>
                        <div style="flex: 1; display: flex; flex-direction: column; gap: 4px;">
                            <label>Pag-IBIG Contribution Amount</label>
                            <input type="text" id="det-pagibig-amount" readonly style="width: 100%; box-sizing: border-box; padding: 8px; border: 1px solid #D6D6D6; border-radius: 6px; background: #f1f5f9; font-size: 14px;">
                        </div>
                    </div>
                    <div style="display: flex; gap: 8px;">
                        <div style="flex: 1; display: flex; flex-direction: column; gap: 4px;">
                            <label>Pag-IBIG Loan Payment Mode</label>
                            <input type="text" id="det-pagibig-loan-mode" readonly style="width: 100%; box-sizing: border-box; padding: 8px; border: 1px solid #D6D6D6; border-radius: 6px; background: #f1f5f9; font-size: 14px;">
                        </div>
                        <div style="flex: 1; display: flex; flex-direction: column; gap: 4px;">
                            <label>Pag-IBIG Loan Amount</label>
                            <input type="text" id="det-pagibig-loan-amount" readonly style="width: 100%; box-sizing: border-box; padding: 8px; border: 1px solid #D6D6D6; border-radius: 6px; background: #f1f5f9; font-size: 14px;">
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
};

function initializeModule(contentArea) {
    const currentTab = window.__currentTabId || 'human-resources';
    const render = ModuleComponents[currentTab] || ModuleComponents['human-resources'];
    if (typeof render !== 'function') {
        console.error('[MODULE RUNTIME ERROR]: render is not a function for tab:', currentTab);
        return;
    }
    render(contentArea);

    const initialTitle = document.querySelector('.org-chart-card .org-page.active');
    if (initialTitle) {
        const pageTitle = initialTitle.getAttribute('data-title');
        const titleEl = document.querySelector('#org-chart-page-title');
        if (titleEl && pageTitle) titleEl.textContent = `- ${pageTitle}`;
    }

    document.querySelectorAll('.org-chart-card .page-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const page = btn.getAttribute('data-page');
            document.querySelectorAll('.org-chart-card .org-page').forEach(p => p.classList.remove('active'));
            document.querySelectorAll('.org-chart-card .page-btn').forEach(b => b.classList.remove('active'));
            const target = document.querySelector(`.org-chart-card .org-page[data-page="${page}"]`);
            if (target) {
                target.classList.add('active');
                const pageTitle = target.getAttribute('data-title');
                const titleEl = document.querySelector('#org-chart-page-title');
                if (titleEl) titleEl.textContent = pageTitle ? `- ${pageTitle}` : '';
            }
            btn.classList.add('active');
        });
    });

    const rolesBtn = document.getElementById('add-roles-btn');
    if (rolesBtn) {
        rolesBtn.addEventListener('click', () => {
            switchTab('hr-employees-manage-org-structure');
        });
    }

    document.querySelectorAll('.employees-card .page-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const page = btn.getAttribute('data-page');
            document.querySelectorAll('.employees-card .employee-page').forEach(p => p.classList.remove('active'));
            document.querySelectorAll('.employees-card .page-btn').forEach(b => b.classList.remove('active'));
            const target = document.querySelector(`.employees-card .employee-page[data-page="${page}"]`);
            if (target) target.classList.add('active');
            btn.classList.add('active');
        });
    });

    document.querySelectorAll('.emp-more-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
        });
    });

    const editEmployeeBtn = document.getElementById('edit-employee-btn');
    const employeeProfileModal = document.getElementById('employee-profile-modal');
    const closeEmployeeProfileModal = document.getElementById('close-employee-profile-modal');

    if (editEmployeeBtn && employeeProfileModal) {
        editEmployeeBtn.addEventListener('click', () => {
            employeeProfileModal.style.display = 'flex';
            document.getElementById('employee-search-input').value = '';
            document.getElementById('employee-profile-emp-id').value = '';
            document.getElementById('employee-search-results').style.display = 'none';
            clearEmployeeForm();
            originalDepartment = '';
            updateDeactivateButtonState();
            document.querySelectorAll('#employee-profile-modal .tab-btn').forEach(b => {
                b.classList.remove('active');
                b.style.borderBottom = '2px solid transparent';
            });
            const firstTab = document.querySelector('#employee-profile-modal .tab-btn[data-tab="emp-profile"]');
            if (firstTab) {
                firstTab.classList.add('active');
                firstTab.style.borderBottom = '2px solid #2563eb';
            }
            document.querySelectorAll('#employee-profile-modal .tab-content').forEach(c => c.style.display = 'none');
            const profileTab = document.getElementById('tab-emp-profile');
            if (profileTab) profileTab.style.display = 'flex';
            captureOriginalFormData();
        });
    }

    if (closeEmployeeProfileModal && employeeProfileModal) {
        closeEmployeeProfileModal.addEventListener('click', () => {
            employeeProfileModal.style.display = 'none';
        });
    }

    const compensationUploadModal = document.getElementById('compensation-upload-modal');
    const compensationUploadDropZone = document.getElementById('compensation-upload-drop-zone');
    const compensationUploadFileInput = document.getElementById('compensation-upload-file-input');
    const compensationUploadPreview = document.getElementById('compensation-upload-preview');
    let compensationUploadFile = null;
    let compensationUploadRows = [];

    document.getElementById('compensation-upload-btn')?.addEventListener('click', () => {
        if (compensationUploadModal) {
            compensationUploadModal.style.display = 'flex';
        }
    });

    document.getElementById('close-compensation-upload-modal')?.addEventListener('click', () => {
        if (compensationUploadModal) {
            compensationUploadModal.style.display = 'none';
        }
    });

    if (compensationUploadModal) {
        compensationUploadModal.addEventListener('click', (e) => {
            if (e.target === compensationUploadModal) compensationUploadModal.style.display = 'none';
        });
    }

    if (compensationUploadDropZone) {
        compensationUploadDropZone.addEventListener('click', () => {
            compensationUploadFileInput?.click();
        });

        compensationUploadDropZone.addEventListener('dragover', (e) => {
            e.preventDefault();
            compensationUploadDropZone.style.borderColor = '#16a34a';
            compensationUploadDropZone.style.background = '#f0fdf4';
        });

        compensationUploadDropZone.addEventListener('dragleave', () => {
            compensationUploadDropZone.style.borderColor = '#D6D6D6';
            compensationUploadDropZone.style.background = '#fafafa';
        });

        compensationUploadDropZone.addEventListener('drop', (e) => {
            e.preventDefault();
            compensationUploadDropZone.style.borderColor = '#D6D6D6';
            compensationUploadDropZone.style.background = '#fafafa';
            const files = e.dataTransfer.files;
            if (files.length > 0) {
                handleCompensationUploadFile(files[0]);
            }
        });
    }

    if (compensationUploadFileInput) {
        compensationUploadFileInput.addEventListener('change', (e) => {
            if (e.target.files.length > 0) {
                handleCompensationUploadFile(e.target.files[0]);
            }
        });
    }

    async function handleCompensationUploadFile(file) {
        compensationUploadFile = file;
        compensationUploadRows = [];
        const validTypes = [
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            'application/vnd.ms-excel',
            'text/csv',
            'text/plain'
        ];
        const validExtensions = ['.xlsx', '.xls', '.csv'];
        const fileName = file.name || '';
        const fileExtension = fileName.substring(fileName.lastIndexOf('.')).toLowerCase();

        if (!validTypes.includes(file.type) && !validExtensions.includes(fileExtension)) {
            alert('Please upload a valid Excel or CSV file');
            return;
        }

        if (compensationUploadPreview) {
            compensationUploadPreview.innerHTML = '<p style="color: #555; text-align: center; margin-top: 20px;">Loading preview...</p>';
        }

        try {
            const text = await file.text();
            let html = '<div style="overflow-x: auto;"><table style="border-collapse: collapse; font-size: 13px; width: 100%;">';

            if (fileExtension === '.csv') {
                const lines = text.split(/\r?\n/).filter(line => line.trim() !== '');
                const headers = lines[0] ? lines[0].split(',') : [];
                
                lines.forEach((line, index) => {
                    const cells = line.split(',');
                    const tag = index === 0 ? 'th' : 'td';
                    const style = 'border: 1px solid #e5e5e5; padding: 8px 10px; text-align: left; background: ' + (index === 0 ? '#f5f5f5' : '#fff') + ';';
                    html += '<tr>' + cells.map(cell => `<${tag} style="${style}">${escapeHtml(cell.trim())}</${tag}>`).join('') + '</tr>';
                });

                for (let i = 1; i < lines.length; i++) {
                    const values = lines[i].split(',');
                    const row = {};
                    headers.forEach((header, idx) => {
                        row[header.trim()] = (values[idx] || '').trim();
                    });
                    compensationUploadRows.push(row);
                }
            } else {
                html += '<tr><td style="border: 1px solid #e5e5e5; padding: 20px; text-align: center; color: #666;">Excel preview not available. Please download the template and open in Excel.</td></tr>';
            }

            html += '</table></div>';
            if (compensationUploadPreview) {
                compensationUploadPreview.innerHTML = html;
            }
        } catch (err) {
            console.error('Failed to read file', err);
            if (compensationUploadPreview) {
                compensationUploadPreview.innerHTML = '<p style="color: #e74c3c; text-align: center; margin-top: 20px;">Failed to load file preview</p>';
            }
        }
    }

    function escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    document.getElementById('download-compensation-template-btn')?.addEventListener('click', () => {
        const headers = [
            'compensation_id',
            'employee_id',
            'salary_pay_mode',
            'salary_amount',
            'allowance_pay_mode',
            'allowance_amount',
            'pay_frequency',
            'payout_method',
            'department',
            'role',
            'yearly_sick_leave',
            'yearly_vacation_leave',
            'created_at',
            'updated_at',
            'sss_contribution_amount',
            'sss_loan_payment_mode',
            'sss_loan_amount',
            'philhealth_contribution_mode',
            'philhealth_contribution_amount',
            'pagibig_contribution_mode',
            'pagibig_contribution_amount',
            'pagibig_loan_payment_mode',
            'pagibig_loan_amount',
            'sss_contribution_mode',
            'shift_policy'
        ];
        const csvContent = headers.join(',') + '\n';
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'employee_compensation_template.csv';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    });

    document.getElementById('upload-compensation-btn')?.addEventListener('click', async () => {
        if (!compensationUploadFile) {
            alert('Please select a file first');
            return;
        }
        if (compensationUploadRows.length === 0) {
            alert('No data rows found in file');
            return;
        }
        try {
            const formData = new FormData();
            formData.append('file', compensationUploadFile);
            const res = await fetch('/api/employee-compensations/bulk-upload', {
                method: 'POST',
                body: formData
            });
            const result = await res.json();
            if (!res.ok) {
                throw new Error(result.error || 'Upload failed');
            }
            alert(`Upload successful. ${result.inserted} record(s) inserted.`);
            if (compensationUploadModal) compensationUploadModal.style.display = 'none';
            if (compensationUploadFileInput) compensationUploadFileInput.value = '';
            compensationUploadFile = null;
            compensationUploadRows = [];
            if (compensationUploadPreview) compensationUploadPreview.innerHTML = '<p style="color: #999; text-align: center; margin-top: 40px;">No file selected</p>';
        } catch (err) {
            console.error('Upload error:', err);
            alert(err.message || 'Upload failed');
        }
    });

    if (employeeProfileModal) {
        let modalMouseDown = false;
        employeeProfileModal.addEventListener('mousedown', (e) => {
            modalMouseDown = e.target === employeeProfileModal;
        });
        employeeProfileModal.addEventListener('mouseup', (e) => {
            if (modalMouseDown && e.target === employeeProfileModal) {
                employeeProfileModal.style.display = 'none';
            }
            modalMouseDown = false;
        });
    }

    const employeeSearchInput = document.getElementById('employee-search-input');
    const employeeSearchResults = document.getElementById('employee-search-results');
    let searchDebounce = null;

    if (employeeSearchInput && employeeSearchResults) {
        employeeSearchInput.addEventListener('input', (e) => {
            const query = e.target.value.trim();
            if (searchDebounce) clearTimeout(searchDebounce);
            if (query.length < 2) {
                employeeSearchResults.style.display = 'none';
                return;
            }
            searchDebounce = setTimeout(async () => {
                try {
                    const res = await fetch(`/api/employee-profiles?search=${encodeURIComponent(query)}`);
                    if (!res.ok) throw new Error('Failed to search employees');
                    const profiles = await res.json();
                    renderSearchResults(profiles);
                } catch (err) {
                    console.error('Search error:', err);
                }
            }, 300);
        });
    }

    function renderSearchResults(profiles) {
        if (!employeeSearchResults) return;
        if (!profiles || profiles.length === 0) {
            employeeSearchResults.innerHTML = '<div style="padding: 10px; color: #64748b; font-size: 13px;">No employees found</div>';
            employeeSearchResults.style.display = 'block';
            return;
        }
        employeeSearchResults.innerHTML = profiles.map(p => `
            <div class="employee-search-result" data-employee-id="${p.employee_id}" style="padding: 10px; cursor: pointer; border-bottom: 1px solid #f1f5f9; font-size: 14px;">
                <div style="font-weight: 600; color: #1a1f2e;">${p.last_name || ''}, ${p.first_name || ''} ${p.middle_name || ''}</div>
                <div style="font-size: 12px; color: #64748b;">${p.employee_id || ''}</div>
            </div>
        `).join('');
        employeeSearchResults.style.display = 'block';

        employeeSearchResults.querySelectorAll('.employee-search-result').forEach(item => {
            item.addEventListener('click', () => {
                const empId = item.getAttribute('data-employee-id');
                selectEmployee(empId);
            });
        });
    }

    let currentEmployeePage = 1;
    let currentEmployeeSearchQuery = '';
    let currentEmployeeFilter = 'active';
    let allEmployeesCache = [];
    let paidTotalsCache = { total_gross_pay: 0, total_net_pay: 0 };
    let paidTotalsByEmployeeCache = {};

    function renderEmployeeCards(employees, page, paidTotals, paidTotalsByEmployee) {
        const container = document.getElementById('employee-list-container');
        const loading = document.getElementById('employees-loading');
        const empty = document.getElementById('employees-empty');
        const pagination = document.getElementById('employees-pagination');
        const perPage = 10;

        if (loading) loading.style.display = 'none';

        if (!container) return;

        if (!employees || employees.length === 0) {
            container.innerHTML = '';
            if (empty) empty.style.display = 'block';
            if (pagination) pagination.innerHTML = '';
            return;
        }

        if (empty) empty.style.display = 'none';

        const totalPages = Math.ceil(employees.length / perPage);
        const currentPage = page || currentEmployeePage;
        const startIdx = (currentPage - 1) * perPage;
        const endIdx = Math.min(startIdx + perPage, employees.length);
        const pageEmployees = employees.slice(startIdx, endIdx);

        const grossPay = paidTotals && paidTotals.total_gross_pay != null ? paidTotals.total_gross_pay : 0;
        const netPay = paidTotals && paidTotals.total_net_pay != null ? paidTotals.total_net_pay : 0;
        const fmt = (val) => `P ${Number(val || 0).toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}`;

        container.innerHTML = pageEmployees.map(emp => {
            const fullName = `${emp.last_name || ''}, ${emp.first_name || ''} ${emp.middle_name || ''}`.trim();
            const department = emp.org_unit_name || 'No department';
            const dateStarted = emp.date_of_hire ? new Date(emp.date_of_hire).toLocaleDateString() : 'N/A';
            const salaryAmount = emp.salary_amount ? `P ${parseFloat(emp.salary_amount).toLocaleString(undefined, {minimumFractionDigits: 2})}` : 'P 0.00';
            const payMode = emp.salary_pay_mode || '';
            const salaryText = payMode ? `${payMode} : ${salaryAmount}` : salaryAmount;
            const photoUrl = emp.photo_url || (emp.photo_file_name && emp.folder_name ? `/uploads/employee-photos/${encodeURIComponent(emp.folder_name)}/${encodeURIComponent(emp.photo_file_name)}` : null);

            const empTotals = paidTotalsByEmployee && paidTotalsByEmployee[emp.employee_id] ? paidTotalsByEmployee[emp.employee_id] : { total_gross_pay: 0, total_net_pay: 0 };

            return `
                <div class="employee-card">
                    <button class="emp-more-btn" data-employee-id="${emp.employee_id}" title="Employee Details">⋮</button>
                    <div class="emp-photo">
                        ${photoUrl ? `<img src="${photoUrl}" alt="photo" loading="lazy">` : '👤'}
                    </div>
                    <div class="emp-info">
                        <div class="emp-name">${emp.employee_id || ''} - ${fullName}</div>
                        <div class="emp-dept">${department}</div>
                        <div class="emp-start">Date Started: ${dateStarted}</div>
                        <div class="emp-salary">${salaryText}</div>
                        <div class="emp-accrued">Gross: ${fmt(empTotals.total_gross_pay)} | Net: ${fmt(empTotals.total_net_pay)}</div>
                    </div>
                </div>
            `;
        }).join('');

        if (pagination && totalPages > 1) {
            let buttonsHtml = '';
            if (totalPages > 10) {
                buttonsHtml += `<button class="page-btn" id="emp-first-btn" ${currentPage === 1 ? 'disabled' : ''}>&laquo; 1st</button>`;
            }
            buttonsHtml += `<button class="page-btn" id="emp-prev-btn" ${currentPage === 1 ? 'disabled' : ''}>&laquo; Prev</button>`;

            const maxVisible = 7;
            let startPage = Math.max(1, currentPage - 3);
            let endPage = Math.min(totalPages, startPage + maxVisible - 1);
            if (endPage - startPage < maxVisible - 1) {
                startPage = Math.max(1, endPage - maxVisible + 1);
            }

            for (let i = startPage; i <= endPage; i++) {
                buttonsHtml += `<button class="page-btn ${i === currentPage ? 'active' : ''}" id="emp-page-${i}">${i}</button>`;
            }

            buttonsHtml += `<button class="page-btn" id="emp-next-btn" ${currentPage === totalPages ? 'disabled' : ''}>Next &raquo;</button>`;
            if (totalPages > 10) {
                buttonsHtml += `<button class="page-btn" id="emp-last-btn" ${currentPage === totalPages ? 'disabled' : ''}>Last &raquo;</button>`;
            }
            pagination.innerHTML = buttonsHtml;

            document.getElementById('emp-first-btn')?.addEventListener('click', () => {
                if (currentEmployeePage !== 1) {
                    currentEmployeePage = 1;
                    renderEmployeeCards(employees, currentEmployeePage, paidTotalsCache, paidTotalsByEmployeeCache);
                }
            });

            document.getElementById('emp-prev-btn')?.addEventListener('click', () => {
                if (currentPage > 1) {
                    currentEmployeePage = currentPage - 1;
                    renderEmployeeCards(employees, currentEmployeePage, paidTotalsCache, paidTotalsByEmployeeCache);
                }
            });

            document.getElementById('emp-next-btn')?.addEventListener('click', () => {
                if (currentPage < totalPages) {
                    currentEmployeePage = currentPage + 1;
                    renderEmployeeCards(employees, currentEmployeePage, paidTotalsCache, paidTotalsByEmployeeCache);
                }
            });

            document.getElementById('emp-last-btn')?.addEventListener('click', () => {
                if (currentEmployeePage !== totalPages) {
                    currentEmployeePage = totalPages;
                    renderEmployeeCards(employees, currentEmployeePage, paidTotalsCache, paidTotalsByEmployeeCache);
                }
            });

            for (let i = startPage; i <= endPage; i++) {
                document.getElementById(`emp-page-${i}`)?.addEventListener('click', () => {
                    currentEmployeePage = i;
                    renderEmployeeCards(employees, currentEmployeePage, paidTotalsCache, paidTotalsByEmployeeCache);
                });
            }
        } else if (pagination) {
            pagination.innerHTML = '';
        }
    }

    async function loadEmployeeCards(filterStatus) {
        const container = document.getElementById('employee-list-container');
        const loading = document.getElementById('employees-loading');
        const totalCountEl = document.getElementById('total-employee-count');
        currentEmployeePage = 1;
        if (container) container.innerHTML = '';
        if (loading) loading.style.display = 'block';

        const statusFilter = filterStatus || currentEmployeeFilter || 'active';
        const apiUrl = statusFilter === 'inactive'
            ? '/api/employee-profiles/all?status=inactive'
            : '/api/employee-profiles/summary';

        try {
            const [empRes, totalsRes, totalsByEmpRes] = await Promise.all([
                fetch(apiUrl),
                fetch('/api/payroll/totals/paid'),
                fetch('/api/payroll/totals/paid/by-employee')
            ]);

            if (!empRes.ok) throw new Error('Failed to load employees');
            const employees = await empRes.json();
            allEmployeesCache = employees;
            if (totalCountEl) totalCountEl.textContent = employees.length;

            let paidTotals = { total_gross_pay: 0, total_net_pay: 0 };
            if (totalsRes.ok) {
                paidTotals = await totalsRes.json();
                paidTotalsCache = paidTotals;
            }

            let paidTotalsByEmployee = {};
            if (totalsByEmpRes.ok) {
                const rows = await totalsByEmpRes.json();
                paidTotalsByEmployee = rows.reduce((acc, row) => {
                    acc[row.employee_id] = {
                        total_gross_pay: row.total_gross_pay || 0,
                        total_net_pay: row.total_net_pay || 0
                    };
                    return acc;
                }, {});
                paidTotalsByEmployeeCache = paidTotalsByEmployee;
            }

            renderEmployeeCards(employees, 1, paidTotalsCache, paidTotalsByEmployeeCache);
        } catch (err) {
            console.error('Failed to load employee cards:', err);
            if (container) container.innerHTML = '<div style="padding:20px;color:#64748b;">Failed to load employees.</div>';
        } finally {
            if (loading) loading.style.display = 'none';
        }
    }

     const employeeListSearchInput = document.getElementById('employee-search');

      const performSearch = async () => {
          const query = employeeListSearchInput?.value?.trim() || '';
          if (!query) {
              await loadEmployeeCards(currentEmployeeFilter);
              return;
          }
          const container = document.getElementById('employee-list-container');
          const loading = document.getElementById('employees-loading');
          if (container) container.innerHTML = '';
          if (loading) loading.style.display = 'block';
          try {
              const statusParam = currentEmployeeFilter === 'inactive' ? '&status=inactive' : '';
              const res = await fetch(`/api/employee-profiles?search=${encodeURIComponent(query)}${statusParam}`);
              if (!res.ok) throw new Error('Search failed');
              const employees = await res.json();
              if (loading) loading.style.display = 'none';
              if (!Array.isArray(employees) || employees.length === 0) {
                  if (container) container.innerHTML = '<div style="padding:20px;color:#64748b;">No employees found.</div>';
                  return;
              }
                renderEmployeeCards(employees, 1, paidTotalsCache, paidTotalsByEmployeeCache);
          } catch (err) {
              console.error('Search error:', err);
              if (loading) loading.style.display = 'none';
              if (container) container.innerHTML = '<div style="padding:20px;color:#64748b;">Search failed.</div>';
          }
      };

       if (employeeListSearchInput) {
           employeeListSearchInput.addEventListener('input', () => {
               if (searchDebounce) clearTimeout(searchDebounce);
               searchDebounce = setTimeout(performSearch, 300);
           });
       }

       const activeEmployeesBtn = document.getElementById('active-employees-btn');
       const inactiveEmployeesBtn = document.getElementById('inactive-employees-btn');

       if (activeEmployeesBtn) {
           activeEmployeesBtn.addEventListener('click', async () => {
               currentEmployeeFilter = 'active';
               activeEmployeesBtn.style.background = '#8b7355';
               activeEmployeesBtn.style.borderColor = '#8b7355';
               inactiveEmployeesBtn.style.background = '#d2c4b0';
               inactiveEmployeesBtn.style.borderColor = '#d2c4b0';
               await loadEmployeeCards('active');
           });
       }

       if (inactiveEmployeesBtn) {
           inactiveEmployeesBtn.addEventListener('click', async () => {
               currentEmployeeFilter = 'inactive';
               inactiveEmployeesBtn.style.background = '#8b7355';
               inactiveEmployeesBtn.style.borderColor = '#8b7355';
               activeEmployeesBtn.style.background = '#d2c4b0';
               activeEmployeesBtn.style.borderColor = '#d2c4b0';
               await loadEmployeeCards('inactive');
           });
       }

       const viewAllBtn = document.getElementById('view-all-employees-btn');
       const viewAllModal = document.getElementById('view-all-employees-modal');
       const closeViewAllModal = document.getElementById('close-view-all-employees-modal');
       const viewAllTbody = document.getElementById('view-all-employees-tbody');

       const loadViewAllEmployees = async () => {
           if (!viewAllTbody) return;
           viewAllTbody.innerHTML = '<tr><td colspan="15" style="padding: 20px; text-align: center; color: #64748b;">Loading employees...</td></tr>';
           try {
               const res = await fetch('/api/employee-profiles/all-active');
               if (!res.ok) throw new Error('Failed to load employees');
               const employees = await res.json();
               if (!Array.isArray(employees) || employees.length === 0) {
                   viewAllTbody.innerHTML = '<tr><td colspan="15" style="padding: 20px; text-align: center; color: #64748b;">No active employees found.</td></tr>';
                   return;
               }
               viewAllTbody.innerHTML = employees.map(emp => {
                   const salaryAmount = emp.salary_amount ? parseFloat(emp.salary_amount).toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2}) : '-';
                   const allowanceAmount = emp.allowance_amount ? parseFloat(emp.allowance_amount).toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2}) : '-';
                   const sssContribution = emp.sss_contribution_amount ? parseFloat(emp.sss_contribution_amount).toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2}) : '-';
                   const sssLoan = emp.sss_loan_amount ? parseFloat(emp.sss_loan_amount).toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2}) : '-';
                   const philhealth = emp.philhealth_contribution_amount ? parseFloat(emp.philhealth_contribution_amount).toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2}) : '-';
                   const pagibig = emp.pagibig_contribution_amount ? parseFloat(emp.pagibig_contribution_amount).toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2}) : '-';
                   const pagibigLoan = emp.pagibig_loan_amount ? parseFloat(emp.pagibig_loan_amount).toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2}) : '-';
                   const sickLeave = emp.yearly_sick_leave != null ? emp.yearly_sick_leave : '-';
                   const vacationLeave = emp.yearly_vacation_leave != null ? emp.yearly_vacation_leave : '-';
                   return `
                       <tr style="border-bottom: 1px solid #eee;">
                           <td style="padding: 6px; border: 1px solid #ddd;">${emp.employee_id || '-'}</td>
                           <td style="padding: 6px; border: 1px solid #ddd;">${emp.last_name || '-'}</td>
                           <td style="padding: 6px; border: 1px solid #ddd;">${emp.first_name || '-'}</td>
                           <td style="padding: 6px; border: 1px solid #ddd;">${emp.middle_name || '-'}</td>
                           <td style="padding: 6px; border: 1px solid #ddd; text-align: right;">${salaryAmount}</td>
                           <td style="padding: 6px; border: 1px solid #ddd; text-align: right;">${allowanceAmount}</td>
                           <td style="padding: 6px; border: 1px solid #ddd;">${emp.org_unit_name || emp.department || '-'}</td>
                           <td style="padding: 6px; border: 1px solid #ddd;">${emp.role_title || '-'}</td>
                           <td style="padding: 6px; border: 1px solid #ddd; text-align: right;">${sssContribution}</td>
                           <td style="padding: 6px; border: 1px solid #ddd; text-align: right;">${sssLoan}</td>
                           <td style="padding: 6px; border: 1px solid #ddd; text-align: right;">${philhealth}</td>
                           <td style="padding: 6px; border: 1px solid #ddd; text-align: right;">${pagibig}</td>
                           <td style="padding: 6px; border: 1px solid #ddd; text-align: right;">${pagibigLoan}</td>
                           <td style="padding: 6px; border: 1px solid #ddd; text-align: right;">${sickLeave}</td>
                           <td style="padding: 6px; border: 1px solid #ddd; text-align: right;">${vacationLeave}</td>
                       </tr>
                   `;
               }).join('');
           } catch (err) {
               console.error('Failed to load view all employees:', err);
               viewAllTbody.innerHTML = '<tr><td colspan="15" style="padding: 20px; text-align: center; color: #999;">Failed to load employees.</td></tr>';
           }
       };

       if (viewAllBtn && viewAllModal) {
           viewAllBtn.addEventListener('click', () => {
               viewAllModal.style.display = 'flex';
               loadViewAllEmployees();
           });
       }

       if (closeViewAllModal && viewAllModal) {
           closeViewAllModal.addEventListener('click', () => {
               viewAllModal.style.display = 'none';
           });
       }

        if (viewAllModal) {
            viewAllModal.addEventListener('click', (e) => {
                if (e.target === viewAllModal) {
                    viewAllModal.style.display = 'none';
                }
            });
        }

        const viewAllSortState = { col: null, dir: 1 };
        const applyViewAllSort = () => {
            const tbody = document.getElementById('view-all-employees-tbody');
            if (!tbody) return;
            
            document.querySelectorAll('#view-all-employees-modal th.sortable .sort-arrow').forEach(a => a.textContent = '⇅');
            if (!viewAllSortState.col) return;
            
            const rows = Array.from(tbody.querySelectorAll('tr'));
            const colMap = { employee_id: 0, last_name: 1, first_name: 2, salary_amount: 4, department: 6 };
            const colIndex = colMap[viewAllSortState.col];
            if (colIndex === undefined) return;
            
            rows.sort((a, b) => {
                let va = a.children[colIndex].textContent.trim();
                let vb = b.children[colIndex].textContent.trim();
                
                if (viewAllSortState.col === 'salary_amount') {
                    va = parseFloat(va.replace(/[^0-9.-]/g, '')) || 0;
                    vb = parseFloat(vb.replace(/[^0-9.-]/g, '')) || 0;
                    return (va - vb) * viewAllSortState.dir;
                }
                
                return va.localeCompare(vb, undefined, { numeric: true }) * viewAllSortState.dir;
            });
            
            rows.forEach(r => tbody.appendChild(r));
            const arrow = document.querySelector(`#view-all-employees-modal th.sortable[data-sort="${viewAllSortState.col}"] .sort-arrow`);
            if (arrow) arrow.textContent = viewAllSortState.dir === 1 ? '▲' : '▼';
        };
        
        document.querySelectorAll('#view-all-employees-modal th.sortable').forEach(th => {
            th.addEventListener('click', () => {
                const col = th.dataset.sort;
                if (viewAllSortState.col === col) viewAllSortState.dir *= -1;
                else { viewAllSortState.col = col; viewAllSortState.dir = 1; }
                applyViewAllSort();
            });
        });

     async function selectEmployee(empId) {
        if (!empId) return;
        const empIdInput = document.getElementById('employee-profile-emp-id');
        if (empIdInput) empIdInput.value = empId;
        if (employeeSearchResults) employeeSearchResults.style.display = 'none';
        if (employeeSearchInput) employeeSearchInput.value = '';

        try {
            const [profileRes, compRes, roleRes, docsRes] = await Promise.all([
                fetch(`/api/employee-profiles/${encodeURIComponent(empId)}`),
                fetch(`/api/employee-compensations/employee/${encodeURIComponent(empId)}`),
                fetch(`/api/organizational-structure?employee_assigned=${encodeURIComponent(empId)}`),
                fetch(`/api/employee-profiles/${encodeURIComponent(empId)}/documents`)
            ]);
            if (profileRes.ok) {
                const profile = await profileRes.json();
                loadEmployeeProfile(profile);
                updateDeactivateButtonState();
            }
            if (compRes.ok) {
                const comp = await compRes.json();
                loadEmployeeCompensation(comp);
            }
            if (roleRes.ok) {
                const roles = await roleRes.json();
                const assignedRole = (roles || []).find(r => r.employee_assigned === empId);
                if (assignedRole) {
                    await populateEmployeeDepartments();
                    if (empDepartmentSelect) empDepartmentSelect.value = assignedRole.org_unit_name || '';
                    originalDepartment = assignedRole.org_unit_name || '';
                    await populateEmployeeRoles(assignedRole.org_unit_name || null);

                    if (empRoleSelect && assignedRole.org_unit_role_id) {
                        const exists = Array.from(empRoleSelect.options).some(o => o.value === assignedRole.org_unit_role_id);
                        if (!exists) {
                            const opt = document.createElement('option');
                            opt.value = assignedRole.org_unit_role_id;
                            opt.textContent = assignedRole.role_title || assignedRole.org_unit_role_id;
                            empRoleSelect.appendChild(opt);
                        }
                        empRoleSelect.value = assignedRole.org_unit_role_id;
                    }

                    const guideDepartmentInput = document.getElementById('guide-emp-department');
                    const guideRoleInput = document.getElementById('guide-emp-role');
                    if (guideDepartmentInput) guideDepartmentInput.value = assignedRole.org_unit_name || '';
                    if (guideRoleInput) guideRoleInput.value = assignedRole.role_title || assignedRole.org_unit_role_id || '';
                }
            }
            if (docsRes.ok) {
                const docs = await docsRes.json();
                loadEmployeeDocuments(docs);
            }
            captureOriginalFormData();
        } catch (err) {
            console.error('Failed to load employee:', err);
        }
    }

    function loadEmployeeProfile(profile) {
        const lastNameInput = document.getElementById('emp-last-name');
        const firstNameInput = document.getElementById('emp-first-name');
        const middleNameInput = document.getElementById('emp-middle-name');
        const addressInput = document.getElementById('emp-address');
        const contactInput = document.getElementById('emp-contact');
        const emailInput = document.getElementById('emp-email');
        const birthdateInput = document.getElementById('emp-birthdate');
        const genderSelect = document.getElementById('emp-gender');
        const civilStatusSelect = document.getElementById('emp-civil-status');
        const emergencyContactInput = document.getElementById('emp-emergency-contact');
        const emergencyNumberInput = document.getElementById('emp-emergency-number');
        const employmentStatusSelect = document.getElementById('emp-employment-status');
        const sssInput = document.getElementById('emp-sss');
        const philhealthInput = document.getElementById('emp-philhealth');
        const pagibigInput = document.getElementById('emp-pagibig');
        const tinInput = document.getElementById('emp-tin');

        if (lastNameInput) lastNameInput.value = profile.last_name || '';
        if (firstNameInput) firstNameInput.value = profile.first_name || '';
        if (middleNameInput) middleNameInput.value = profile.middle_name || '';
        if (addressInput) addressInput.value = profile.address || '';
        if (contactInput) contactInput.value = profile.contact_details || '';
        if (emailInput) emailInput.value = profile.email_address || '';
        if (birthdateInput && profile.birthdate) {
            const d = new Date(profile.birthdate);
            const year = d.getFullYear();
            const month = String(d.getMonth() + 1).padStart(2, '0');
            const day = String(d.getDate()).padStart(2, '0');
            birthdateInput.value = `${year}-${month}-${day}`;
        }
        if (genderSelect) genderSelect.value = profile.gender || '';
        if (civilStatusSelect) civilStatusSelect.value = profile.civil_status || '';
        if (emergencyContactInput) emergencyContactInput.value = profile.emergency_contact || '';
        if (emergencyNumberInput) emergencyNumberInput.value = profile.emergency_contact_number || '';
        if (employmentStatusSelect) employmentStatusSelect.value = profile.employment_status || '';
        if (sssInput) sssInput.value = profile.sss_number || '';
        if (philhealthInput) philhealthInput.value = profile.philhealth_number || '';
        if (pagibigInput) pagibigInput.value = profile.pagibig_number || '';
        if (tinInput) tinInput.value = profile.tin_number || '';

        if (contactInput) {
            contactInput.removeEventListener('input', formatContact);
            contactInput.addEventListener('input', formatContact);
        }
        if (emergencyNumberInput) {
            emergencyNumberInput.removeEventListener('input', formatEmergencyNumber);
            emergencyNumberInput.addEventListener('input', formatEmergencyNumber);
        }
    }

    function formatContact(e) {
        let val = e.target.value.replace(/[^0-9]/g, '');
        if (val.startsWith('63')) val = '+' + val;
        else if (val.startsWith('0')) val = '+63' + val.substring(1);
        else if (val.length > 0 && !val.startsWith('+')) val = '+63 ';
        if (val.startsWith('+63')) {
            const digits = val.replace('+63', '').replace(/\s/g, '');
            if (digits.length > 0) {
                let formatted = '+63 ';
                if (digits.length <= 3) formatted += digits;
                else if (digits.length <= 6) formatted += digits.substring(0, 3) + '-' + digits.substring(3);
                else formatted += digits.substring(0, 3) + '-' + digits.substring(3, 6) + '-' + digits.substring(6, 10);
                e.target.value = formatted;
            } else {
                e.target.value = '+63 ';
            }
        } else {
            e.target.value = val;
        }
    }

    function formatEmergencyNumber(e) {
        let val = e.target.value.replace(/[^0-9]/g, '');
        if (val.startsWith('63')) val = '+' + val;
        else if (val.startsWith('0')) val = '+63' + val.substring(1);
        else if (val.length > 0 && !val.startsWith('+')) val = '+63 ';
        if (val.startsWith('+63')) {
            const digits = val.replace('+63', '').replace(/\s/g, '');
            if (digits.length > 0) {
                let formatted = '+63 ';
                if (digits.length <= 3) formatted += digits;
                else if (digits.length <= 6) formatted += digits.substring(0, 3) + '-' + digits.substring(3);
                else formatted += digits.substring(0, 3) + '-' + digits.substring(3, 6) + '-' + digits.substring(6, 10);
                e.target.value = formatted;
            } else {
                e.target.value = '+63 ';
            }
        } else {
            e.target.value = val;
        }
    }

    function loadEmployeeCompensation(comp) {
        if (!comp) return;
        const salaryPaymode = document.getElementById('emp-salary-paymode');
        const salaryAmount = document.getElementById('emp-salary-amount');
        const allowancePaymode = document.getElementById('emp-allowance-paymode');
        const allowanceAmount = document.getElementById('emp-allowance-amount');
        const payFrequency = document.getElementById('emp-pay-frequency');
        const payoutMethod = document.getElementById('emp-payout-method');
        const shiftPolicy = document.getElementById('emp-shift-policy');
        const sssContributionMode = document.getElementById('emp-sss-contribution-mode');
        const sssContributionAmount = document.getElementById('emp-sss-contribution-amount');
        const sssLoanMode = document.getElementById('emp-sss-loan-mode');
        const sssLoanAmount = document.getElementById('emp-sss-loan-amount');
        const philhealthContributionMode = document.getElementById('emp-philhealth-contribution-mode');
        const philhealthContributionAmount = document.getElementById('emp-philhealth-contribution-amount');
        const pagibigContributionMode = document.getElementById('emp-pagibig-contribution-mode');
        const pagibigContributionAmount = document.getElementById('emp-pagibig-contribution-amount');
        const pagibigLoanMode = document.getElementById('emp-pagibig-loan-mode');
        const pagibigLoanAmount = document.getElementById('emp-pagibig-loan-amount');
        const yearlySickLeave = document.getElementById('emp-yearly-sick-leave');
        const yearlyVacationLeave = document.getElementById('emp-yearly-vacation-leave');

        if (salaryPaymode) salaryPaymode.value = comp.salary_pay_mode || '';
        if (salaryAmount) salaryAmount.value = comp.salary_amount || '';
        if (allowancePaymode) allowancePaymode.value = comp.allowance_pay_mode || '';
        if (allowanceAmount) allowanceAmount.value = comp.allowance_amount || '';
        if (payFrequency) payFrequency.value = comp.pay_frequency || '';
        if (payoutMethod) payoutMethod.value = comp.payout_method || '';
        if (shiftPolicy && comp.shift_policy) shiftPolicy.value = comp.shift_policy;
        if (sssContributionMode) sssContributionMode.value = comp.sss_contribution_mode || '';
        if (sssContributionAmount) sssContributionAmount.value = comp.sss_contribution_amount || '';
        if (sssLoanMode) sssLoanMode.value = comp.sss_loan_payment_mode || '';
        if (sssLoanAmount) sssLoanAmount.value = comp.sss_loan_amount || '';
        if (philhealthContributionMode) philhealthContributionMode.value = comp.philhealth_contribution_mode || '';
        if (philhealthContributionAmount) philhealthContributionAmount.value = comp.philhealth_contribution_amount || '';
        if (pagibigContributionMode) pagibigContributionMode.value = comp.pagibig_contribution_mode || '';
        if (pagibigContributionAmount) pagibigContributionAmount.value = comp.pagibig_contribution_amount || '';
        if (pagibigLoanMode) pagibigLoanMode.value = comp.pagibig_loan_payment_mode || '';
        if (pagibigLoanAmount) pagibigLoanAmount.value = comp.pagibig_loan_amount || '';
        if (yearlySickLeave) yearlySickLeave.value = comp.yearly_sick_leave || '';
        if (yearlyVacationLeave) yearlyVacationLeave.value = comp.yearly_vacation_leave || '';
    }

    function loadEmployeeDocuments(docs) {
        const map = {
            '2x2-pic': 'emp-doc-2x2',
            'resume': 'emp-doc-resume',
            'employment-contract': 'emp-doc-employment-contract',
            'birth-certificate': 'emp-doc-birth-certificate',
            'gov-id': 'emp-doc-gov-id',
            'sss-form': 'emp-doc-sss',
            'philhealth-form': 'emp-doc-philhealth',
            'pagibig-form': 'emp-doc-pagibig',
            'tin-form': 'emp-doc-tin',
            'nbi-clearance': 'emp-doc-nbi',
            'pnp-clearance': 'emp-doc-pnp',
            'medical-results': 'emp-doc-medical',
            'barangay-certificate': 'emp-doc-barangay'
        };
        const docArray = Array.isArray(docs) ? docs : [];
        for (const [docType, inputId] of Object.entries(map)) {
            const input = document.getElementById(inputId);
            if (!input) continue;
            const match = docArray.find(d => d.docType === docType);
            input.value = match ? match.fileName : 'No file uploaded';
            if (match && match.publicUrl) {
                input.dataset.publicUrl = match.publicUrl;
            } else {
                delete input.dataset.publicUrl;
            }
        }
    }

    function clearEmployeeForm() {
        const ids = ['emp-last-name', 'emp-first-name', 'emp-middle-name', 'emp-address', 'emp-contact', 'emp-email', 'emp-birthdate', 'emp-gender', 'emp-civil-status', 'emp-emergency-contact', 'emp-emergency-number', 'emp-employment-status', 'emp-sss', 'emp-philhealth', 'emp-pagibig', 'emp-tin', 'emp-department', 'emp-role', 'emp-shift-policy', 'emp-salary-paymode', 'emp-salary-amount', 'emp-allowance-paymode', 'emp-allowance-amount', 'emp-pay-frequency', 'emp-payout-method', 'emp-sss-contribution-mode', 'emp-sss-contribution-amount', 'emp-sss-loan-mode', 'emp-sss-loan-amount', 'emp-philhealth-contribution-mode', 'emp-philhealth-contribution-amount', 'emp-pagibig-contribution-mode', 'emp-pagibig-contribution-amount', 'emp-pagibig-loan-mode', 'emp-pagibig-loan-amount', 'emp-yearly-sick-leave', 'emp-yearly-vacation-leave', 'guide-emp-department', 'guide-emp-role', 'emp-doc-2x2', 'emp-doc-resume', 'emp-doc-employment-contract', 'emp-doc-birth-certificate', 'emp-doc-gov-id', 'emp-doc-sss', 'emp-doc-philhealth', 'emp-doc-pagibig', 'emp-doc-tin', 'emp-doc-nbi', 'emp-doc-pnp', 'emp-doc-medical', 'emp-doc-barangay'];
        ids.forEach(id => {
            const el = document.getElementById(id);
            if (!el) return;
            if (el.tagName === 'SELECT') el.value = '';
            else el.value = '';
            delete el.dataset.publicUrl;
        });
    }

    function getVal(id) {
        const el = document.getElementById(id);
        return el ? el.value : '';
    }

    function getSelectText(id) {
        const el = document.getElementById(id);
        if (!el || !el.selectedOptions || !el.selectedOptions[0]) return '';
        return el.selectedOptions[0].textContent.trim();
    }

    function captureOriginalFormData() {
        originalFormData = {
            emp_id: getVal('employee-profile-emp-id'),
            last_name: getVal('emp-last-name'),
            first_name: getVal('emp-first-name'),
            middle_name: getVal('emp-middle-name'),
            address: getVal('emp-address'),
            contact_details: getVal('emp-contact'),
            email_address: getVal('emp-email'),
            birthdate: getVal('emp-birthdate'),
            gender: getVal('emp-gender'),
            civil_status: getVal('emp-civil-status'),
            emergency_contact: getVal('emp-emergency-contact'),
            emergency_contact_number: getVal('emp-emergency-number'),
            employment_status: getVal('emp-employment-status'),
            sss_number: getVal('emp-sss'),
            philhealth_number: getVal('emp-philhealth'),
            pagibig_number: getVal('emp-pagibig'),
            tin_number: getVal('emp-tin'),
            department: getVal('emp-department'),
            role: getSelectText('emp-role'),
            shift_policy: getVal('emp-shift-policy'),
            salary_pay_mode: getVal('emp-salary-paymode'),
            salary_amount: getVal('emp-salary-amount'),
            allowance_pay_mode: getVal('emp-allowance-paymode'),
            allowance_amount: getVal('emp-allowance-amount'),
            pay_frequency: getVal('emp-pay-frequency'),
            payout_method: getVal('emp-payout-method'),
            sss_contribution_mode: getVal('emp-sss-contribution-mode'),
            sss_contribution_amount: getVal('emp-sss-contribution-amount'),
            sss_loan_payment_mode: getVal('emp-sss-loan-mode'),
            sss_loan_amount: getVal('emp-sss-loan-amount'),
            philhealth_contribution_mode: getVal('emp-philhealth-contribution-mode'),
            philhealth_contribution_amount: getVal('emp-philhealth-contribution-amount'),
            pagibig_contribution_mode: getVal('emp-pagibig-contribution-mode'),
            pagibig_contribution_amount: getVal('emp-pagibig-contribution-amount'),
            pagibig_loan_payment_mode: getVal('emp-pagibig-loan-mode'),
            pagibig_loan_amount: getVal('emp-pagibig-loan-amount'),
            yearly_sick_leave: getVal('emp-yearly-sick-leave'),
            yearly_vacation_leave: getVal('emp-yearly-vacation-leave'),
        };
    }

    function getCurrentValue(key) {
        const idMap = {
            last_name: 'emp-last-name',
            first_name: 'emp-first-name',
            middle_name: 'emp-middle-name',
            address: 'emp-address',
            contact_details: 'emp-contact',
            email_address: 'emp-email',
            birthdate: 'emp-birthdate',
            gender: 'emp-gender',
            civil_status: 'emp-civil-status',
            emergency_contact: 'emp-emergency-contact',
            emergency_contact_number: 'emp-emergency-number',
            employment_status: 'emp-employment-status',
            sss_number: 'emp-sss',
            philhealth_number: 'emp-philhealth',
            pagibig_number: 'emp-pagibig',
            tin_number: 'emp-tin',
            department: 'emp-department',
            role: 'emp-role',
            shift_policy: 'emp-shift-policy',
            salary_pay_mode: 'emp-salary-paymode',
            salary_amount: 'emp-salary-amount',
            allowance_pay_mode: 'emp-allowance-paymode',
            allowance_amount: 'emp-allowance-amount',
            pay_frequency: 'emp-pay-frequency',
            payout_method: 'emp-payout-method',
            sss_contribution_mode: 'emp-sss-contribution-mode',
            sss_contribution_amount: 'emp-sss-contribution-amount',
            sss_loan_payment_mode: 'emp-sss-loan-mode',
            sss_loan_amount: 'emp-sss-loan-amount',
            philhealth_contribution_mode: 'emp-philhealth-contribution-mode',
            philhealth_contribution_amount: 'emp-philhealth-contribution-amount',
            pagibig_contribution_mode: 'emp-pagibig-contribution-mode',
            pagibig_contribution_amount: 'emp-pagibig-contribution-amount',
            pagibig_loan_payment_mode: 'emp-pagibig-loan-mode',
            pagibig_loan_amount: 'emp-pagibig-loan-amount',
            yearly_sick_leave: 'emp-yearly-sick-leave',
            yearly_vacation_leave: 'emp-yearly-vacation-leave',
        };
        const id = idMap[key];
        if (!id) return '';
        const el = document.getElementById(id);
        if (!el) return '';
        if (key === 'role') {
            return el.selectedOptions && el.selectedOptions[0] ? el.selectedOptions[0].textContent.trim() : '';
        }
        return el.value || '';
    }

    function updateDeactivateButtonState() {
        const status = document.getElementById('emp-employment-status')?.value || '';
        if (status === 'Inactive') {
            deactivateEmployeeBtn.textContent = 'Activate Employee';
            deactivateEmployeeBtn.style.background = '#16a34a';
            deactivateEmployeeBtn.style.borderColor = '#16a34a';
        } else {
            deactivateEmployeeBtn.textContent = 'Deactivate Employee';
            deactivateEmployeeBtn.style.background = '#dc3545';
            deactivateEmployeeBtn.style.borderColor = '#dc3545';
        }
    }

    function buildChangesAlert() {
        const fieldMap = [
            ['Last Name', 'last_name'],
            ['First Name', 'first_name'],
            ['Middle Name', 'middle_name'],
            ['Address', 'address'],
            ['Contact Details', 'contact_details'],
            ['Email Address', 'email_address'],
            ['Birth Date', 'birthdate'],
            ['Gender', 'gender'],
            ['Civil Status', 'civil_status'],
            ['Emergency Contact', 'emergency_contact'],
            ['Emergency Contact Number', 'emergency_contact_number'],
            ['Employment Status', 'employment_status'],
            ['SSS Number', 'sss_number'],
            ['PhilHealth Number', 'philhealth_number'],
            ['Pag-IBIG Number', 'pagibig_number'],
            ['TIN Number', 'tin_number'],
            ['Department', 'department'],
            ['Role', 'role'],
            ['Shift Policy', 'shift_policy'],
            ['Salary Paymode', 'salary_pay_mode'],
            ['Salary Amount', 'salary_amount'],
            ['Allowance Paymode', 'allowance_pay_mode'],
            ['Allowance Amount', 'allowance_amount'],
            ['Pay Frequency', 'pay_frequency'],
            ['Payout Method', 'payout_method'],
            ['SSS Contribution Mode', 'sss_contribution_mode'],
            ['SSS Contribution Amount', 'sss_contribution_amount'],
            ['SSS Loan Payment Mode', 'sss_loan_payment_mode'],
            ['SSS Loan Amount', 'sss_loan_amount'],
            ['PhilHealth Contribution Mode', 'philhealth_contribution_mode'],
            ['PhilHealth Contribution Amount', 'philhealth_contribution_amount'],
            ['Pag-IBIG Contribution Mode', 'pagibig_contribution_mode'],
            ['Pag-IBIG Contribution Amount', 'pagibig_contribution_amount'],
            ['Pag-IBIG Loan Payment Mode', 'pagibig_loan_payment_mode'],
            ['Pag-IBIG Loan Amount', 'pagibig_loan_amount'],
            ['Yearly Sick Leave', 'yearly_sick_leave'],
            ['Yearly Vacation Leave', 'yearly_vacation_leave'],
        ];

        for (const [label, key] of fieldMap) {
            const original = originalFormData[key] || '';
            const current = getCurrentValue(key) || '';
            if (original !== current) {
                changes.push(`${label}: ${original || '(empty)'} → ${current || '(empty)'}`);
            }
        }

        if (changes.length === 0) {
            return 'No changes were made.';
        }
        return 'Changes saved:\n\n' + changes.join('\n');
    }

    const empDocInputIds = [
        'emp-doc-2x2', 'emp-doc-resume', 'emp-doc-employment-contract', 'emp-doc-birth-certificate',
        'emp-doc-gov-id', 'emp-doc-sss', 'emp-doc-philhealth', 'emp-doc-pagibig', 'emp-doc-tin',
        'emp-doc-nbi', 'emp-doc-pnp', 'emp-doc-medical', 'emp-doc-barangay'
    ];

    let empDocHideTimeout = null;
    const showEmpDocPreview = (inputEl) => {
        if (!inputEl || !imagePreviewModal || !imagePreviewImg) return;
        const val = inputEl.value.trim();
        if (!val || val === 'No file uploaded') return;
        const publicUrl = inputEl.dataset.publicUrl;
        if (publicUrl) {
            if (empDocHideTimeout) { clearTimeout(empDocHideTimeout); empDocHideTimeout = null; }
            imagePreviewImg.src = publicUrl;
            imagePreviewModal.style.display = 'flex';
            return;
        }
        const empId = document.getElementById('employee-profile-emp-id')?.value.trim();
        const lastName = document.getElementById('emp-last-name')?.value.trim() || '';
        const firstName = document.getElementById('emp-first-name')?.value.trim() || '';
        const safe = (s) => String(s).trim().replace(/[^a-zA-Z0-9_-]/g, '_').replace(/_+/g, '_').replace(/^_+|_+$/g, '');
        const folderName = empId ? `${safe(empId)}_${safe(lastName)}_${safe(firstName)}` : '';
        const imgSrc = folderName ? `/uploads/employee-photos/${encodeURIComponent(folderName)}/${encodeURIComponent(val)}` : val;
        if (empDocHideTimeout) { clearTimeout(empDocHideTimeout); empDocHideTimeout = null; }
        imagePreviewImg.src = imgSrc;
        imagePreviewModal.style.display = 'flex';
    };
    const hideEmpDocPreview = () => {
        if (!imagePreviewModal) return;
        empDocHideTimeout = setTimeout(() => { if (imagePreviewModal) imagePreviewModal.style.display = 'none'; }, 100);
    };

    empDocInputIds.forEach(id => {
        const input = document.getElementById(id);
        if (!input) return;
        input.addEventListener('mouseenter', () => showEmpDocPreview(input));
        input.addEventListener('mouseleave', hideEmpDocPreview);
        input.addEventListener('focus', () => showEmpDocPreview(input));
        input.addEventListener('blur', hideEmpDocPreview);
    });



    document.querySelectorAll('#employee-profile-modal .tab-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('#employee-profile-modal .tab-btn').forEach(b => {
                b.classList.remove('active');
                b.style.borderBottom = '2px solid transparent';
            });
            btn.classList.add('active');
            btn.style.borderBottom = '2px solid #2563eb';
            document.querySelectorAll('#employee-profile-modal .tab-content').forEach(c => c.style.display = 'none');
            const tabId = btn.getAttribute('data-tab');
            const target = document.getElementById('tab-' + tabId);
            if (target) target.style.display = 'flex';

            if (tabId === 'emp-compensation') {
                const departmentSelect = document.getElementById('emp-department');
                const roleSelect = document.getElementById('emp-role');
                const guideDepartmentInput = document.getElementById('guide-emp-department');
                const guideRoleInput = document.getElementById('guide-emp-role');
                if (guideDepartmentInput && departmentSelect) guideDepartmentInput.value = departmentSelect.value || '';
                if (guideRoleInput && roleSelect && roleSelect.selectedOptions[0]) {
                    guideRoleInput.value = roleSelect.selectedOptions[0].textContent.trim() || '';
                }
            }
        });
    });

    const saveEmployeeProfileBtn = document.getElementById('save-employee-profile-btn');
    if (saveEmployeeProfileBtn) {
        saveEmployeeProfileBtn.addEventListener('click', async () => {
            const empId = document.getElementById('employee-profile-emp-id').value.trim();
            if (!empId) {
                alert('Please select an employee first.');
                return;
            }
            const updates = {
                last_name: document.getElementById('emp-last-name').value.trim(),
                first_name: document.getElementById('emp-first-name').value.trim(),
                middle_name: document.getElementById('emp-middle-name').value.trim(),
                address: document.getElementById('emp-address').value.trim(),
                contact_details: document.getElementById('emp-contact').value.trim(),
                email_address: document.getElementById('emp-email').value.trim(),
                birthdate: document.getElementById('emp-birthdate').value || null,
                gender: document.getElementById('emp-gender').value || null,
                civil_status: document.getElementById('emp-civil-status').value || null,
                emergency_contact: document.getElementById('emp-emergency-contact').value.trim(),
                emergency_contact_number: document.getElementById('emp-emergency-number').value.trim(),
                employment_status: document.getElementById('emp-employment-status').value || null,
                sss_number: document.getElementById('emp-sss').value.trim(),
                philhealth_number: document.getElementById('emp-philhealth').value.trim(),
                pagibig_number: document.getElementById('emp-pagibig').value.trim(),
                tin_number: document.getElementById('emp-tin').value.trim()
            };
            const department = document.getElementById('emp-department')?.value.trim();
            const role = document.getElementById('emp-role')?.value.trim();

            if (originalDepartment && department !== originalDepartment) {
                const confirmed = confirm(`Department has changed from "${originalDepartment}" to "${department}".\n\nPlease remember to also update the Shift Policy in the Compensation section if needed.`);
                if (!confirmed) return;
            }

            try {
                const res = await fetch(`/api/employee-profiles/${encodeURIComponent(empId)}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(updates)
                });
                if (!res.ok) throw new Error('Failed to save profile');

                const newStatus = document.getElementById('emp-employment-status').value || null;
                const departmentChanged = originalDepartment && department !== originalDepartment;

                if (newStatus === 'Inactive' || departmentChanged) {
                    const orgRes = await fetch(`/api/organizational-structure?employee_assigned=${encodeURIComponent(empId)}`);
                    if (orgRes.ok) {
                        const nodes = await orgRes.json();
                        await Promise.all((nodes || []).map(node =>
                            fetch(`/api/organizational-structure/${encodeURIComponent(node.org_unit_role_id)}`, {
                                method: 'PUT',
                                headers: { 'Content-Type': 'application/json' },
                                body: JSON.stringify({ employee_assigned: null })
                            })
                        ));
                    }
                }

                if (role && newStatus !== 'Inactive') {
                    const oldRoleRes = await fetch(`/api/organizational-structure?employee_assigned=${encodeURIComponent(empId)}`);
                    let oldRoleId = null;
                    if (oldRoleRes.ok) {
                        const oldRoles = await oldRoleRes.json();
                        const matched = (oldRoles || []).find(r => r.employee_assigned === empId);
                        if (matched) oldRoleId = matched.org_unit_role_id;
                    }

                    await fetch(`/api/organizational-structure/${encodeURIComponent(role)}`, {
                        method: 'PUT',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ employee_assigned: empId })
                    });

                    if (oldRoleId && oldRoleId !== role) {
                        await fetch(`/api/organizational-structure/${encodeURIComponent(oldRoleId)}`, {
                            method: 'PUT',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({ employee_assigned: null })
                        });
                    }
                }

                alert(buildChangesAlert());
                employeeProfileModal.style.display = 'none';
                originalDepartment = department || '';
                await loadEmployeeCards();
            } catch (err) {
                alert('Save failed: ' + err.message);
            }
        });
    }

    const deactivateEmployeeBtn = document.getElementById('deactivate-employee-btn');
    if (deactivateEmployeeBtn) {
        deactivateEmployeeBtn.addEventListener('click', async () => {
            const empId = document.getElementById('employee-profile-emp-id').value.trim();
            if (!empId) {
                alert('Please select an employee first.');
                return;
            }

            const currentStatus = document.getElementById('emp-employment-status')?.value || '';
            const isInactive = currentStatus === 'Inactive';
            const action = isInactive ? 'activate' : 'deactivate';
            const newStatus = isInactive ? 'Active' : 'Inactive';
            const confirmed = confirm(`Are you sure you want to ${action} employee ${empId}? This will set their status to ${newStatus}.`);
            if (!confirmed) return;

            try {
                const res = await fetch(`/api/employee-profiles/${encodeURIComponent(empId)}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ employment_status: newStatus })
                });
                if (!res.ok) throw new Error(`Failed to ${action} employee`);

                if (newStatus === 'Inactive') {
                    const orgRes = await fetch(`/api/organizational-structure?employee_assigned=${encodeURIComponent(empId)}`);
                    if (orgRes.ok) {
                        const nodes = await orgRes.json();
                        await Promise.all((nodes || []).map(node =>
                            fetch(`/api/organizational-structure/${encodeURIComponent(node.org_unit_role_id)}`, {
                                method: 'PUT',
                                headers: { 'Content-Type': 'application/json' },
                                body: JSON.stringify({ employee_assigned: null })
                            })
                        ));
                    }
                }

                alert(`Employee ${empId} has been ${newStatus.toLowerCase()}d.`);
                const empStatus = document.getElementById('emp-employment-status');
                if (empStatus) empStatus.value = newStatus;
                updateDeactivateButtonState();
                if (typeof loadEmployeeCards === 'function') loadEmployeeCards();
            } catch (err) {
                alert(`${action.charAt(0).toUpperCase() + action.slice(1)} failed: ` + err.message);
            }
        });
    }

    const saveEmployeeCompensationBtn = document.getElementById('save-employee-compensation-btn');
    if (saveEmployeeCompensationBtn) {
        saveEmployeeCompensationBtn.addEventListener('click', async () => {
            const empId = document.getElementById('employee-profile-emp-id').value.trim();
            if (!empId) {
                alert('Please select an employee first.');
                return;
            }
            const salaryPaymode = document.getElementById('emp-salary-paymode').value.trim();
            const salaryAmount = document.getElementById('emp-salary-amount').value.trim();
            const allowancePaymode = document.getElementById('emp-allowance-paymode').value.trim();
            const allowanceAmount = document.getElementById('emp-allowance-amount').value.trim();
            const payFrequency = document.getElementById('emp-pay-frequency').value.trim();
            const payoutMethod = document.getElementById('emp-payout-method').value.trim();
            const department = document.getElementById('emp-department')?.value.trim() || null;
            const roleSelect = document.getElementById('emp-role');
            const role = roleSelect && roleSelect.selectedOptions[0] ? roleSelect.selectedOptions[0].textContent.trim() : null;
            const shiftPolicy = document.getElementById('emp-shift-policy')?.value || null;
            
            if (!shiftPolicy) {
                const confirmed = confirm('Shift Policy is empty. Are you sure you want to save without a shift policy?');
                if (!confirmed) return;
            }
            const sssContributionMode = document.getElementById('emp-sss-contribution-mode')?.value.trim() || null;
            const sssContributionAmount = document.getElementById('emp-sss-contribution-amount')?.value.trim() || null;
            const sssLoanMode = document.getElementById('emp-sss-loan-mode')?.value.trim() || null;
            const sssLoanAmount = document.getElementById('emp-sss-loan-amount')?.value.trim() || null;
            const philhealthContributionMode = document.getElementById('emp-philhealth-contribution-mode')?.value.trim() || null;
            const philhealthContributionAmount = document.getElementById('emp-philhealth-contribution-amount')?.value.trim() || null;
            const pagibigContributionMode = document.getElementById('emp-pagibig-contribution-mode')?.value.trim() || null;
            const pagibigContributionAmount = document.getElementById('emp-pagibig-contribution-amount')?.value.trim() || null;
            const pagibigLoanMode = document.getElementById('emp-pagibig-loan-mode')?.value.trim() || null;
            const pagibigLoanAmount = document.getElementById('emp-pagibig-loan-amount')?.value.trim() || null;
            const yearlySickLeave = document.getElementById('emp-yearly-sick-leave')?.value.trim() || null;
            const yearlyVacationLeave = document.getElementById('emp-yearly-vacation-leave')?.value.trim() || null;
            try {
                const nextIdRes = await fetch('/api/employee-compensations/next-id');
                if (!nextIdRes.ok) throw new Error('Failed to fetch next compensation ID');
                const nextIdData = await nextIdRes.json();
                const compensationId = nextIdData.compensation_id;

                const res = await fetch('/api/employee-compensations', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        compensation_id: compensationId,
                        employee_id: empId,
                        salary_pay_mode: salaryPaymode || null,
                        salary_amount: salaryAmount ? parseFloat(salaryAmount) : null,
                        allowance_pay_mode: allowancePaymode || null,
                        allowance_amount: allowanceAmount ? parseFloat(allowanceAmount) : null,
                        pay_frequency: payFrequency || null,
                        payout_method: payoutMethod || null,
                        department: department,
                        role: role,
                        shift_policy: shiftPolicy,
                        sss_contribution_mode: sssContributionMode,
                        sss_contribution_amount: sssContributionAmount ? parseFloat(sssContributionAmount) : null,
                        sss_loan_payment_mode: sssLoanMode,
                        sss_loan_amount: sssLoanAmount ? parseFloat(sssLoanAmount) : null,
                        philhealth_contribution_mode: philhealthContributionMode,
                        philhealth_contribution_amount: philhealthContributionAmount ? parseFloat(philhealthContributionAmount) : null,
                        pagibig_contribution_mode: pagibigContributionMode,
                        pagibig_contribution_amount: pagibigContributionAmount ? parseFloat(pagibigContributionAmount) : null,
                        pagibig_loan_payment_mode: pagibigLoanMode,
                        pagibig_loan_amount: pagibigLoanAmount ? parseFloat(pagibigLoanAmount) : null,
                        yearly_sick_leave: yearlySickLeave ? parseInt(yearlySickLeave) : null,
                        yearly_vacation_leave: yearlyVacationLeave ? parseInt(yearlyVacationLeave) : null
                    })
                });
                if (!res.ok) throw new Error('Failed to save compensation');
                alert(buildChangesAlert());
                employeeProfileModal.style.display = 'none';
                await loadEmployeeCards();
            } catch (err) {
                alert('Save failed: ' + err.message);
            }
        });
    }

    const empDepartmentSelect = document.getElementById('emp-department');
    const empRoleSelect = document.getElementById('emp-role');
    const empShiftPolicySelect = document.getElementById('emp-shift-policy');

    const populateEmployeeDepartments = async () => {
        if (!empDepartmentSelect) return;
        try {
            const res = await fetch('/api/organizational-units');
            if (!res.ok) throw new Error('Failed to fetch departments');
            const units = await res.json();
            const activeUnits = (units || []).filter(u => (u.status || '').toLowerCase() === 'active');
            empDepartmentSelect.innerHTML = '<option value="">Select Department</option>' +
                activeUnits.map(u => `<option value="${u.unit_name}">${u.unit_name}</option>`).join('');
        } catch (err) {
            console.error('Failed to populate departments:', err);
            empDepartmentSelect.innerHTML = '<option value="">Select Department</option>';
        }
    };

    const populateEmployeeRoles = async (orgUnitName) => {
        if (!empRoleSelect) return;
        try {
            const url = orgUnitName
                ? `/api/organizational-structure/unassigned-roles?org_unit_name=${encodeURIComponent(orgUnitName)}`
                : '/api/organizational-structure/unassigned-roles';
            const res = await fetch(url);
            if (!res.ok) throw new Error('Failed to fetch roles');
            const roles = await res.json();
            const options = roles.map(r => `<option value="${r.org_unit_role_id}">${r.role_title || r.org_unit_role_id}</option>`).join('');
            if (empRoleSelect) empRoleSelect.innerHTML = '<option value="">Select Role</option>' + options;
        } catch (err) {
            console.error('Failed to populate roles:', err);
            if (empRoleSelect) empRoleSelect.innerHTML = '<option value="">Select Role</option>';
        }
    };

    const populateShiftPolicies = async () => {
        if (!empShiftPolicySelect) return;
        try {
            const res = await fetch('/api/shift-policies?status=Active');
            if (!res.ok) throw new Error('Failed to fetch shift policies');
            const policies = await res.json();
            const options = policies.map(p => `<option value="${p.shift_name}">${p.shift_name}</option>`).join('');
            empShiftPolicySelect.innerHTML = '<option value="">Select Shift Policy</option>' + options;
        } catch (err) {
            console.error('Failed to populate shift policies:', err);
            empShiftPolicySelect.innerHTML = '<option value="">Select Shift Policy</option>';
        }
    };

    if (empDepartmentSelect) {
        empDepartmentSelect.addEventListener('change', async () => {
            const selectedDepartment = empDepartmentSelect.value;
            await populateEmployeeRoles(selectedDepartment || null);
        });
    }

    async function convertImageToWebP(dataUrl, quality = 0.85) {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.onload = () => {
                const canvas = document.createElement('canvas');
                canvas.width = img.naturalWidth;
                canvas.height = img.naturalHeight;
                const ctx = canvas.getContext('2d');
                ctx.drawImage(img, 0, 0);
                canvas.toBlob(
                    (blob) => {
                        if (blob) resolve(blob);
                        else reject(new Error('Failed to convert image to WebP'));
                    },
                    'image/webp',
                    quality
                );
            };
            img.onerror = () => reject(new Error('Failed to load image for conversion'));
            img.src = dataUrl;
        });
    }

    async function processDocumentFile(file) {
        const validTypes = ['image/jpeg', 'image/png', 'image/jpg'];
        if (!validTypes.includes(file.type)) {
            throw new Error('Only JPG and PNG files are allowed.');
        }

        const maxSize = 1 * 1024 * 1024;
        if (file.size > maxSize) {
            throw new Error('File size must not exceed 1MB.');
        }

        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = async (e) => {
                const dataUrl = e.target.result;
                const img = new Image();
                img.onload = async () => {
                    let quality = 0.85;
                    let blob = await convertImageToWebP(dataUrl, quality);
                    while (blob.size > maxSize && quality > 0.3) {
                        quality -= 0.1;
                        blob = await convertImageToWebP(dataUrl, quality);
                    }
                    if (blob.size > maxSize) {
                        reject(new Error('Could not compress image below 1MB. Please use a smaller image.'));
                        return;
                    }
                    resolve({ blob, dataUrl });
                };
                img.onerror = () => reject(new Error('Failed to load image. Please try a different file.'));
                img.src = dataUrl;
            };
            reader.onerror = () => reject(new Error('Failed to read file.'));
            reader.readAsDataURL(file);
        });
    }

    const empDocUploadModal = document.getElementById('emp-doc-upload-modal');
    const empDocUploadTitle = document.getElementById('emp-doc-upload-modal-title');
    const empDocUploadFileInput = document.getElementById('emp-doc-upload-file-input');
    const saveEmpDocUploadBtn = document.getElementById('save-emp-doc-upload-btn');
    const cancelEmpDocUploadBtn = document.getElementById('cancel-emp-doc-upload-btn');
    const closeEmpDocUploadModal = document.getElementById('close-emp-doc-upload-modal');
    let currentUploadDocType = null;
    let currentUploadTextInput = null;

    const openUploadModal = (docType, label, textInput) => {
        currentUploadDocType = docType;
        currentUploadTextInput = textInput;
        if (empDocUploadTitle) empDocUploadTitle.textContent = `Upload ${label}`;
        if (empDocUploadFileInput) empDocUploadFileInput.value = '';
        if (empDocUploadModal) empDocUploadModal.style.display = 'flex';
    };

    const closeUploadModal = () => {
        if (empDocUploadModal) empDocUploadModal.style.display = 'none';
        currentUploadDocType = null;
        currentUploadTextInput = null;
    };

    const imagePreviewModal = document.getElementById('image-preview-modal');
    const imagePreviewImg = document.getElementById('image-preview-modal-img');
    const closeImagePreview = document.getElementById('close-image-preview');

    const showImagePreview = (imgSrc) => {
        if (!imagePreviewModal || !imagePreviewImg) return;
        imagePreviewImg.src = imgSrc;
        imagePreviewModal.style.display = 'flex';
    };

    const hideImagePreview = () => {
        if (!imagePreviewModal) return;
        imagePreviewModal.style.display = 'none';
        if (imagePreviewImg) imagePreviewImg.src = '';
    };

    const empDocTab = document.getElementById('tab-emp-documents');

    if (closeImagePreview && imagePreviewModal) {
        closeImagePreview.addEventListener('click', hideImagePreview);
    }

    if (imagePreviewModal) {
        imagePreviewModal.addEventListener('click', (e) => {
            if (e.target === imagePreviewModal) {
                hideImagePreview();
            }
        });
    }

    if (saveEmpDocUploadBtn) {
        saveEmpDocUploadBtn.addEventListener('click', async () => {
            const file = empDocUploadFileInput?.files?.[0];
            if (!file) {
                alert('Please select a file to upload.');
                return;
            }
            const empId = document.getElementById('employee-profile-emp-id')?.value.trim();
            if (!empId) {
                alert('Employee ID is missing.');
                return;
            }

            try {
                const result = await processDocumentFile(file);
                const blob = result.blob;

                const labelMap = {
                    '2x2-pic': '2x2 Pic',
                    'resume': 'Resume',
                    'employment-contract': 'Employment Contract',
                    'birth-certificate': 'Birth Certificate',
                    'gov-id': 'Valid Gov ID',
                    'sss-form': 'SSS Form',
                    'philhealth-form': 'PhilHealth Form',
                    'pagibig-form': 'Pag-IBIG Form',
                    'tin-form': 'TIN Form',
                    'nbi-clearance': 'NBI Clearance',
                    'pnp-clearance': 'PNP Clearance',
                    'medical-results': 'Medical Results',
                    'barangay-certificate': 'Barangay Certificate'
                };
                const label = labelMap[currentUploadDocType] || currentUploadDocType;
                const fileName = `${empId}_${label}.webp`;

                const formData = new FormData();
                formData.append('files', blob, fileName);
                formData.append('labels', label);
                formData.append('docTypes', currentUploadDocType);
                formData.append('employeeId', empId);

                saveEmpDocUploadBtn.disabled = true;
                saveEmpDocUploadBtn.innerText = 'Uploading...';

                const res = await fetch('/api/employee-profiles/upload-documents', {
                    method: 'POST',
                    body: formData
                });

                if (!res.ok) {
                    const errData = await res.json().catch(() => ({}));
                    throw new Error(errData.error || 'Failed to upload document');
                }

                if (currentUploadTextInput) {
                    currentUploadTextInput.value = fileName;
                }

                alert('Document uploaded successfully!');
                 await loadEmployeeCards();
                 closeUploadModal();

                const docsRes = await fetch(`/api/employee-profiles/${encodeURIComponent(empId)}/documents`);
                if (docsRes.ok) {
                    const docs = await docsRes.json();
                    loadEmployeeDocuments(docs);
                }
            } catch (err) {
                console.error('Upload error:', err);
                alert('Upload failed: ' + err.message);
            } finally {
                if (saveEmpDocUploadBtn) {
                    saveEmpDocUploadBtn.disabled = false;
                    saveEmpDocUploadBtn.innerText = 'Save';
                }
            }
        });
    }

    if (cancelEmpDocUploadBtn) {
        cancelEmpDocUploadBtn.addEventListener('click', closeUploadModal);
    }
    if (closeEmpDocUploadModal) {
        closeEmpDocUploadModal.addEventListener('click', closeUploadModal);
    }

    document.querySelectorAll('.emp-doc-upload-btn').forEach(btn => {
        const docType = btn.dataset.docType;
        const label = btn.textContent.trim();
        const row = btn.closest('div');
        const textInput = row ? row.querySelector('input[type="text"]') : null;
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            if (empDocUploadModal && docType) {
                openUploadModal(docType, label, textInput);
            }
        });
    });

    populateEmployeeDepartments();
    populateShiftPolicies();
    loadEmployeeCards();

    (async () => {
        try {
            const [monthlyRes, totalRes] = await Promise.all([
                fetch('/api/employee-profiles/stats/monthly-new'),
                fetch('/api/employee-profiles/stats/total-count')
            ]);
            if (monthlyRes.ok) {
                const data = await monthlyRes.json();
                const el = document.getElementById('new-employee-count');
                if (el) el.textContent = data.count || 0;
            }
            if (totalRes.ok) {
                const data = await totalRes.json();
                const el = document.getElementById('active-inactive-count');
                if (el) el.textContent = data.count || 0;
            }
        } catch (err) {
            console.error('Failed to load employee stats:', err);
        }
    })();

    const absentEl = document.getElementById('absent-employee-count');
    if (absentEl) absentEl.textContent = '0';

    const employeeDetailsModal = document.getElementById('employee-details-modal');
    const closeEmployeeDetailsModal = document.getElementById('close-employee-details-modal');

    const openEmployeeDetailsModal = () => {
        const modal = document.getElementById('employee-details-modal');
        if (modal) {
            modal.style.display = 'flex';
        } else {
            console.error('employee-details-modal not found');
        }
    };

    const closeEmployeeDetailsModalFn = () => {
        const modal = document.getElementById('employee-details-modal');
        if (modal) modal.style.display = 'none';
    };

    if (closeEmployeeDetailsModal) {
        closeEmployeeDetailsModal.addEventListener('click', closeEmployeeDetailsModalFn);
    }

    const employeeListContainer = document.getElementById('employee-list-container');
    if (employeeListContainer) {
        employeeListContainer.addEventListener('click', async (e) => {
            const btn = e.target.closest('.emp-more-btn');
            if (btn) {
                e.preventDefault();
                e.stopPropagation();
                const empId = btn.getAttribute('data-employee-id');
                if (empId) {
                    await populateEmployeeDetails(empId);
                    openEmployeeDetailsModal();
                }
            }
        });
    }

    document.querySelectorAll('.emp-more-btn').forEach(btn => {
        btn.addEventListener('click', async (e) => {
            e.preventDefault();
            e.stopPropagation();
            const empId = btn.getAttribute('data-employee-id');
            if (empId) {
                await populateEmployeeDetails(empId);
                openEmployeeDetailsModal();
            }
        });
    });

    async function populateEmployeeDetails(empId) {
        try {
            const [profileRes, compRes, docsRes, roleRes] = await Promise.all([
                fetch(`/api/employee-profiles/${encodeURIComponent(empId)}`),
                fetch(`/api/employee-compensations/employee/${encodeURIComponent(empId)}`),
                fetch(`/api/employee-profiles/${encodeURIComponent(empId)}/documents`),
                fetch(`/api/organizational-structure?employee_assigned=${encodeURIComponent(empId)}`)
            ]);

            if (profileRes.ok) {
                const profile = await profileRes.json();
                const setVal = (id, val) => { const el = document.getElementById(id); if (el) el.value = val || ''; };
                setVal('det-last-name', profile.last_name);
                setVal('det-first-name', profile.first_name);
                setVal('det-middle-name', profile.middle_name);
                setVal('det-address', profile.address);
                setVal('det-contact', profile.contact_details);
                setVal('det-birthdate', profile.birthdate ? new Date(profile.birthdate).toISOString().slice(0, 10) : '');
                setVal('det-gender', profile.gender);
                setVal('det-civil-status', profile.civil_status);
                setVal('det-employment-status', profile.employment_status);
                setVal('det-emergency-contact', profile.emergency_contact);
                setVal('det-emergency-number', profile.emergency_contact_number);
                setVal('det-sss', profile.sss_number);
                setVal('det-philhealth', profile.philhealth_number);
                setVal('det-pagibig', profile.pagibig_number);
                setVal('det-tin', profile.tin_number);
            }

            if (compRes.ok) {
                const comps = await compRes.json();
                const comp = Array.isArray(comps) ? comps.find(c => c.employee_id === empId) : comps;
                if (comp) {
                    const setVal = (id, val) => { const el = document.getElementById(id); if (el) el.value = val || ''; };
                    setVal('det-salary-paymode', comp.salary_pay_mode);
                    setVal('det-salary-amount', comp.salary_amount);
                    setVal('det-allowance-paymode', comp.allowance_pay_mode);
                    setVal('det-allowance-amount', comp.allowance_amount);
                    setVal('det-pay-frequency', comp.pay_frequency);
                    setVal('det-payout-method', comp.payout_method);
                    setVal('det-shift-policy', comp.shift_policy);
                    setVal('det-sss-contribution-mode', comp.sss_contribution_mode);
                    setVal('det-sss-contribution-amount', comp.sss_contribution_amount);
                    setVal('det-sss-loan-mode', comp.sss_loan_payment_mode);
                    setVal('det-sss-loan-amount', comp.sss_loan_amount);
                    setVal('det-philhealth-mode', comp.philhealth_contribution_mode);
                    setVal('det-philhealth-amount', comp.philhealth_contribution_amount);
                    setVal('det-pagibig-mode', comp.pagibig_contribution_mode);
                    setVal('det-pagibig-amount', comp.pagibig_contribution_amount);
                    setVal('det-pagibig-loan-mode', comp.pagibig_loan_payment_mode);
                    setVal('det-pagibig-loan-amount', comp.pagibig_loan_amount);
                }
            }

            if (roleRes.ok) {
                const roles = await roleRes.json();
                const assignedRole = (roles || []).find(r => r.employee_assigned === empId);
                if (assignedRole) {
                    const setVal = (id, val) => { const el = document.getElementById(id); if (el) el.value = val || ''; };
                    setVal('det-department', assignedRole.org_unit_name);
                    setVal('det-role', assignedRole.role_title || assignedRole.org_unit_role_id);
                }
            }
        } catch (err) {
            console.error('Failed to load employee details:', err);
        }
    }
}


