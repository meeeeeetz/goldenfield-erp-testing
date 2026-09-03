// v2026-09-03-001: batch payroll print preview + final confirm flow
if (typeof ModuleComponents === 'undefined') { window.ModuleComponents = {}; }

ModuleComponents['hr-salary'] = (container) => {
    container.innerHTML = `
        <div id="salary-computation-view" style="display:none;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
                <div style="display: flex; gap: 16px; align-items: center;">
                    <button id="single-salary-computation-btn" class="btn-icon-circle">
                        <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="2" width="16" height="20" rx="2"></rect><line x1="8" y1="6" x2="16" y2="6"></line><line x1="8" y1="10" x2="16" y2="10"></line><line x1="8" y1="14" x2="10" y2="14"></line><line x1="14" y1="14" x2="16" y2="14"></line><line x1="8" y1="18" x2="10" y2="18"></line><line x1="14" y1="18" x2="16" y2="18"></line></svg>
                        <span class="btn-label">Single Salary Computation</span>
                    </button>
                    <button id="batch-salary-computation-subtab-btn" class="btn-icon-circle">
                        <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="2" width="16" height="20" rx="2"></rect><line x1="8" y1="6" x2="16" y2="6"></line><line x1="8" y1="10" x2="16" y2="10"></line><line x1="8" y1="14" x2="10" y2="14"></line><line x1="14" y1="14" x2="16" y2="14"></line><line x1="8" y1="18" x2="10" y2="18"></line><line x1="14" y1="18" x2="16" y2="18"></line></svg>
                        <span class="btn-label">Batch Salary Computation</span>
                    </button>
                </div>
                <button id="back-to-salary-btn" class="btn-icon-circle" style="margin-left: auto;">
                    <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
                    <span class="btn-label">Back to Salary</span>
                </button>
            </div>

            <div class="card" style="margin-top: 24px; padding: 0; overflow: visible;">
                <div style="padding: 16px 20px; border-bottom: 1px solid #ddd; display: flex; justify-content: space-between; align-items: center;">
                    <h3 style="margin: 0; font-size: 16px; font-weight: 600; color: #1a1f2e;">Salary Overview</h3>
                    <button id="confirm-batch-payroll-btn" class="btn-primary" type="button" style="padding: 8px 16px; font-size: 14px;">Confirm Batch Payroll</button>
                </div>
                <div style="padding: 12px 20px; border-bottom: 1px solid #eee; display: flex; gap: 24px; align-items: center; flex-wrap: wrap;">
                    <div style="display: flex; align-items: center; gap: 6px;">
                        <label style="font-weight: 600; font-size: 13px; color: #333;">Starting Pay period:</label>
                        <input type="text" id="salary-overview-starting-pay-period" readonly style="width: 120px; padding: 4px 8px; border: 1px solid #ddd; border-radius: 6px; background: #f1f5f9; font-size: 13px; text-align: center;">
                    </div>
                    <div style="display: flex; align-items: center; gap: 6px;">
                        <label style="font-weight: 600; font-size: 13px; color: #333;">Ending Pay period:</label>
                        <input type="text" id="salary-overview-ending-pay-period" readonly style="width: 120px; padding: 4px 8px; border: 1px solid #ddd; border-radius: 6px; background: #f1f5f9; font-size: 13px; text-align: center;">
                    </div>
                    <div style="display: flex; align-items: center; gap: 6px;">
                        <label style="font-weight: 600; font-size: 13px; color: #333;">Employee:</label>
                        <input type="text" id="salary-overview-employee-count" readonly value="0" style="width: 60px; padding: 4px 8px; border: 1px solid #ddd; border-radius: 6px; background: #f1f5f9; font-size: 13px; text-align: center;">
                    </div>
                    <div style="display: flex; align-items: center; gap: 6px;">
                        <label style="font-weight: 600; font-size: 13px; color: #333;">Gross Pay:</label>
                        <input type="text" id="salary-overview-gross-pay" readonly value="0.00" style="width: 120px; padding: 4px 8px; border: 1px solid #ddd; border-radius: 6px; background: #f1f5f9; font-size: 13px; text-align: right;">
                    </div>
                    <div style="display: flex; align-items: center; gap: 6px;">
                        <label style="font-weight: 600; font-size: 13px; color: #333;">Gross Deduction:</label>
                        <input type="text" id="salary-overview-gross-deduction" readonly value="0.00" style="width: 120px; padding: 4px 8px; border: 1px solid #ddd; border-radius: 6px; background: #f1f5f9; font-size: 13px; text-align: right;">
                    </div>
                    <div style="display: flex; align-items: center; gap: 6px;">
                        <label style="font-weight: 600; font-size: 13px; color: #333;">Net Pay:</label>
                        <input type="text" id="salary-overview-net-pay" readonly value="0.00" style="width: 120px; padding: 4px 8px; border: 1px solid #ddd; border-radius: 6px; background: #f1f5f9; font-size: 13px; text-align: right;">
                    </div>
                </div>
                <div style="max-height: 60vh; overflow: auto;">
                    <table class="data-table" style="width: 100%; border-collapse: separate; border-spacing: 0; font-size: 13px; min-width: 2000px;">
                        <thead>
                            <tr>
                                <th style="position: sticky; top: 0; background: #FFD000; z-index: 999;">Payroll ID</th>
                                <th style="position: sticky; top: 0; background: #FFD000; z-index: 999;">Employee ID</th>
                                <th style="position: sticky; top: 0; background: #FFD000; z-index: 999;">Last name</th>
                                <th style="position: sticky; top: 0; background: #FFD000; z-index: 999;">First name</th>
                                <th style="position: sticky; top: 0; background: #FFD000; z-index: 999;">Days worked</th>
                                <th style="position: sticky; top: 0; background: #FFD000; z-index: 999;">OT</th>
                                <th style="position: sticky; top: 0; background: #FFD000; z-index: 999;">Allowance</th>
                                <th style="position: sticky; top: 0; background: #FFD000; z-index: 999;">Leaves</th>
                                <th style="position: sticky; top: 0; background: #FFD000; z-index: 999;">Regular Holiday</th>
                                <th style="position: sticky; top: 0; background: #FFD000; z-index: 999;">Special Holiday</th>
                                <th style="position: sticky; top: 0; background: #FFD000; z-index: 999;">Gross Pay</th>
                                <th style="position: sticky; top: 0; background: #FFD000; z-index: 999;">Income Tax</th>
                                <th style="position: sticky; top: 0; background: #FFD000; z-index: 999;">SSS Payment</th>
                                <th style="position: sticky; top: 0; background: #FFD000; z-index: 999;">SSS Loan</th>
                                <th style="position: sticky; top: 0; background: #FFD000; z-index: 999;">Philhealth Payment</th>
                                <th style="position: sticky; top: 0; background: #FFD000; z-index: 999;">Pagibig payment</th>
                                <th style="position: sticky; top: 0; background: #FFD000; z-index: 999;">Pagibig loan payment</th>
                                <th style="position: sticky; top: 0; background: #FFD000; z-index: 999;">Cash loan deduction</th>
                                <th style="position: sticky; top: 0; background: #FFD000; z-index: 999;">Losses/Damages</th>
                                <th style="position: sticky; top: 0; background: #FFD000; z-index: 999;">Gross Deduction</th>
                                <th style="position: sticky; top: 0; background: #FFD000; z-index: 999;">Net Pay</th>
                                <th style="position: sticky; top: 0; background: #FFD000; z-index: 999;">Starting Cash loan</th>
                                <th style="position: sticky; top: 0; background: #FFD000; z-index: 999;">Ending Cash loan</th>
                                <th style="position: sticky; top: 0; background: #FFD000; z-index: 999;">Starting Losses/ Damages</th>
                                <th style="position: sticky; top: 0; background: #FFD000; z-index: 999;">Ending Losses/ Damages</th>
                                <th style="position: sticky; top: 0; background: #FFD000; z-index: 999;">PDF File</th>
                                <th style="position: sticky; top: 0; background: #FFD000; z-index: 999;">Action</th>
                            </tr>
                        </thead>
                        <tbody id="salary-overview-tbody">
                            <tr><td colspan="28" style="text-align: center; padding: 20px; color: #999;">Loading...</td></tr>
                        </tbody>
                    </table>
                </div>
                <div class="pagination">
                    <button class="page-btn" disabled>&laquo; Prev</button>
                    <button class="page-btn active">1</button>
                    <button class="page-btn">Next &raquo;</button>
                </div>
            </div>

            <div class="card" style="margin-top: 24px; padding: 0; overflow: visible;">
                <div style="padding: 16px 20px; border-bottom: 1px solid #ddd; display: flex; justify-content: space-between; align-items: center;">
                    <h3 style="margin: 0; font-size: 16px; font-weight: 600; color: #1a1f2e;">History of Salary Overview</h3>
                    <button id="upload-payroll-btn" class="btn-primary" type="button" style="padding: 8px 16px; font-size: 13px; cursor: pointer; background: #28a745; border-color: #28a745; color: white;">Upload Payrolls (ADMIN ONLY)</button>
                </div>
                <div style="max-height: 60vh; overflow: auto;">
                    <table class="data-table" style="width: 100%; border-collapse: separate; border-spacing: 0; font-size: 13px; min-width: 2000px;">
                        <thead>
                            <tr>
                                <th class="sortable" data-sort="payroll_id" style="position: sticky; top: 0; background: #FFD000; z-index: 999; cursor: pointer;">Payroll ID <span class="sort-arrow">&#8645;</span></th>
                                <th class="sortable" data-sort="employee_id" style="position: sticky; top: 0; background: #FFD000; z-index: 999; cursor: pointer;">Employee ID <span class="sort-arrow">&#8645;</span></th>
                                <th class="sortable" data-sort="last_name" style="position: sticky; top: 0; background: #FFD000; z-index: 999; cursor: pointer;">Last name <span class="sort-arrow">&#8645;</span></th>
                                <th style="position: sticky; top: 0; background: #FFD000; z-index: 999;">First name</th>
                                <th style="position: sticky; top: 0; background: #FFD000; z-index: 999;">PDF</th>
                                <th style="position: sticky; top: 0; background: #FFD000; z-index: 999;">Status</th>
                                <th style="position: sticky; top: 0; background: #FFD000; z-index: 999;">Days worked</th>
                                <th style="position: sticky; top: 0; background: #FFD000; z-index: 999;">OT</th>
                                <th style="position: sticky; top: 0; background: #FFD000; z-index: 999;">Allowance</th>
                                <th style="position: sticky; top: 0; background: #FFD000; z-index: 999;">Leaves</th>
                                <th style="position: sticky; top: 0; background: #FFD000; z-index: 999;">Regular Holiday</th>
                                <th style="position: sticky; top: 0; background: #FFD000; z-index: 999;">Special Holiday</th>
                                <th style="position: sticky; top: 0; background: #FFD000; z-index: 999;">Gross Pay</th>
                                <th style="position: sticky; top: 0; background: #FFD000; z-index: 999;">Income Tax</th>
                                <th style="position: sticky; top: 0; background: #FFD000; z-index: 999;">SSS Payment</th>
                                <th style="position: sticky; top: 0; background: #FFD000; z-index: 999;">SSS Loan</th>
                                <th style="position: sticky; top: 0; background: #FFD000; z-index: 999;">Philhealth Payment</th>
                                <th style="position: sticky; top: 0; background: #FFD000; z-index: 999;">Pagibig payment</th>
                                <th style="position: sticky; top: 0; background: #FFD000; z-index: 999;">Pagibig loan payment</th>
                                <th style="position: sticky; top: 0; background: #FFD000; z-index: 999;">Cash loan deduction</th>
                                <th style="position: sticky; top: 0; background: #FFD000; z-index: 999;">Losses/Damages</th>
                                <th style="position: sticky; top: 0; background: #FFD000; z-index: 999;">Gross Deduction</th>
                                <th style="position: sticky; top: 0; background: #FFD000; z-index: 999;">Net Pay</th>
                                <th style="position: sticky; top: 0; background: #FFD000; z-index: 999;">Starting Cash loan</th>
                                <th style="position: sticky; top: 0; background: #FFD000; z-index: 999;">Ending Cash loan</th>
                                <th style="position: sticky; top: 0; background: #FFD000; z-index: 999;">Starting Losses/ Damages</th>
                                <th style="position: sticky; top: 0; background: #FFD000; z-index: 999;">Ending Losses/ Damages</th>
                            </tr>
                        </thead>
                        <tbody id="salary-history-tbody">
                            <tr><td colspan="27" style="text-align: center; padding: 20px; color: #999;">Loading...</td></tr>
                        </tbody>
                    </table>
                </div>
            </div>

        <div id="upload-payroll-modal" class="modal" style="display:none;">
            <div class="modal-content" style="max-width: 1100px; width: 95%; flex-direction: row; flex-wrap: nowrap; gap: 16px; padding: 20px;">
                <div style="flex: 1 1 55%; display: flex; flex-direction: column; gap: 12px; min-width: 0;">
                    <div class="modal-header-row" style="padding: 0 0 12px 0;">
                        <h3>Upload Payrolls</h3>
                        <button class="modal-close-btn" id="close-upload-payroll-modal">&times;</button>
                    </div>
                    <div id="payroll-drop-zone" style="border: 2px dashed #D6D6D6; border-radius: 8px; padding: 40px 20px; text-align: center; cursor: pointer; background: #fafafa; transition: all 0.2s;">
                        <svg viewBox="0 0 24 24" width="48" height="48" fill="none" stroke="#666" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" style="margin-bottom: 8px;"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line></svg>
                        <p class="drop-zone-text" style="font-size: 14px; color: #666; margin: 0;">Drag and drop your payroll file here, or click to browse</p>
                        <input type="file" id="payroll-file-input" accept=".xlsx,.xls,.csv" style="display: none;">
                    </div>
                    <div id="payroll-validation-results" style="display: none; max-height: 200px; overflow-y: auto; border: 1px solid #ddd; border-radius: 6px; padding: 10px; background: #fff;">
                        <div id="payroll-validation-summary" style="font-weight: 600; margin-bottom: 8px;"></div>
                        <div id="payroll-validation-errors" style="font-size: 12px;"></div>
                    </div>
                    <div style="display: flex; gap: 8px; justify-content: flex-end; margin-top: auto;">
                        <button id="download-payroll-template-btn" type="button" style="padding: 10px 16px; font-size: 14px; cursor: pointer; background: #fff; border: 1px solid #D6D6D6; border-radius: 6px; color: #333;">Download Template</button>
                        <button id="cancel-upload-payroll-btn" class="btn-danger" type="button" style="padding: 10px 16px; font-size: 14px;">Cancel</button>
                        <button id="save-upload-payroll-btn" class="btn-primary" type="button" style="padding: 10px 16px; font-size: 14px;" disabled>Save</button>
                    </div>
                </div>
                <div id="payroll-preview-panel" style="flex: 1 1 45%; display: flex; flex-direction: column; gap: 8px; min-width: 0; border-left: 1px solid #ddd; padding-left: 16px;">
                    <div style="font-weight: 600; color: #1a1f2e;">Preview</div>
                    <div id="payroll-preview-container" style="flex: 1 1 auto; overflow: auto; border: 1px solid #ddd; border-radius: 6px; background: #fff; max-height: 60vh; min-height: 200px;">
                        <div id="payroll-preview-placeholder" style="padding: 20px; text-align: center; color: #999;">Upload a file to preview its contents</div>
                        <div id="payroll-preview-table-wrap" style="display: none;"></div>
                    </div>
                </div>
            </div>
        </div>

        </div>
        <div id="salary-main-view">
            <div class="header-actions">
                <h2>Salary</h2>
            </div>
        <div class="action-buttons-row">
            <button id="make-salary-computation-btn" class="btn-icon-circle">
                <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="2" width="16" height="20" rx="2"></rect><line x1="8" y1="6" x2="16" y2="6"></line><line x1="8" y1="10" x2="16" y2="10"></line><line x1="8" y1="14" x2="10" y2="14"></line><line x1="14" y1="14" x2="16" y2="14"></line><line x1="8" y1="18" x2="10" y2="18"></line><line x1="14" y1="18" x2="16" y2="18"></line></svg>
                <span class="btn-label">Salary Computation</span>
            </button>
            <button id="add-attendance-log-btn" class="btn-icon-circle">
                <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="8.5" cy="7" r="4"></circle><line x1="20" y1="8" x2="20" y2="14"></line><line x1="23" y1="11" x2="17" y2="11"></line></svg>
                <span class="btn-label">Attendance Log</span>
            </button>
            <button id="add-overtime-log-btn" class="btn-icon-circle">
                <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                <span class="btn-label">Overtime Log</span>
            </button>
            <button id="add-leave-log-btn" class="btn-icon-circle">
                <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                <span class="btn-label">Leave Logs</span>
            </button>
            <button id="add-loss-damage-btn" class="btn-icon-circle">
                <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>
                <span class="btn-label">Loss/Damages</span>
            </button>
            <button id="add-holidays-btn" class="btn-icon-circle">
                <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>
                <span class="btn-label">Add Holidays</span>
            </button>
            <button id="add-remove-payroll-cycle-btn" class="btn-icon-circle">
                <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                <span class="btn-label">Manage Payroll Cycle</span>
            </button>
        </div>
        <div class="tracking-cards-row">
            <div class="card tracking-card">
                <h3>Monthly Salary</h3>
                <p class="card-sub-label">all salary incurred this month</p>
                <div class="card-value-row">
                    <div class="card-value" id="monthly-salary-value">P 0.00</div>
                    <span class="trend-up" id="monthly-salary-trend" style="display: none;">
                        <span id="monthly-salary-arrow"></span>
                        <span id="monthly-salary-percent"></span>
                    </span>
                </div>
                <p class="vs-last-month">VS last month</p>
            </div>
            <div class="card tracking-card">
                <h3>Salary Payable</h3>
                <p class="card-sub-label">Accrued wages till cut off</p>
                <div class="card-value-row">
                    <div class="card-value">P35,000.00</div>
                </div>
            </div>
            <div class="card tracking-card">
                <h3>Employer Payroll Liabilities</h3>
                <p class="card-sub-label">The business's share of mandatory government contributions</p>
                <div class="card-value-row">
                    <div class="card-value">P5,000.00</div>
                </div>
            </div>
            <div class="card tracking-card">
                <h3>Payday Countdown</h3>
                <p class="card-sub-label">Days till payday</p>
                <div class="card-value-row">
                    <div class="card-value">5 days left</div>
                </div>
            </div>
        </div>
        <div class="bottom-cards-row">
            <div class="card graph-placeholder salary-chart-card">
                <h3>Salary by department</h3>
                <div class="salary-chart-wrap">
                    <svg viewBox="0 0 220 220" class="salary-donut-chart">
                        <circle cx="110" cy="110" r="80" fill="none" stroke="#e74c3c" stroke-width="30" stroke-dasharray="174.82 327.83" stroke-dashoffset="0" transform="rotate(-90 110 110)"></circle>
                        <circle cx="110" cy="110" r="80" fill="none" stroke="#e67e22" stroke-width="30" stroke-dasharray="131.12 371.53" stroke-dashoffset="-174.82" transform="rotate(-90 110 110)"></circle>
                        <circle cx="110" cy="110" r="80" fill="none" stroke="#2ecc71" stroke-width="30" stroke-dasharray="87.41 415.24" stroke-dashoffset="-305.94" transform="rotate(-90 110 110)"></circle>
                        <circle cx="110" cy="110" r="80" fill="none" stroke="#3498db" stroke-width="30" stroke-dasharray="65.56 437.09" stroke-dashoffset="-393.35" transform="rotate(-90 110 110)"></circle>
                        <circle cx="110" cy="110" r="80" fill="none" stroke="#9b59b6" stroke-width="30" stroke-dasharray="43.70 459.00" stroke-dashoffset="-458.91" transform="rotate(-90 110 110)"></circle>
                        <text x="110" y="102" text-anchor="middle" font-size="12" font-weight="700" fill="#1a1f2e">Total</text>
                        <text x="110" y="122" text-anchor="middle" font-size="14" font-weight="700" fill="#1a1f2e">P 345,000</text>
                    </svg>
                    <div class="chart-legend">
                        <span class="chart-legend-item"><span class="chart-legend-swatch" style="background:#e74c3c"></span>Egg Room</span>
                        <span class="chart-legend-item"><span class="chart-legend-swatch" style="background:#e67e22"></span>Poultry</span>
                        <span class="chart-legend-item"><span class="chart-legend-swatch" style="background:#2ecc71"></span>Maintenance</span>
                        <span class="chart-legend-item"><span class="chart-legend-swatch" style="background:#3498db"></span>Guardhouse</span>
                        <span class="chart-legend-item"><span class="chart-legend-swatch" style="background:#9b59b6"></span>Construction</span>
                    </div>
                </div>
            </div>
            <div class="card graph-placeholder salary-history-card">
                <h3>6 months Salary History</h3>
                <div class="chart-wrap">
                    <svg viewBox="0 0 760 360" class="egg-price-chart salary-line-chart" preserveAspectRatio="xMidYMid meet">
                        <line x1="70" y1="20" x2="70" y2="310" stroke="#D6D6D6" stroke-width="1"></line>
                        <line x1="70" y1="310" x2="730" y2="310" stroke="#D6D6D6" stroke-width="1"></line>
                        <line x1="70" y1="252" x2="730" y2="252" stroke="#D6D6D6" stroke-width="1"></line>
                        <line x1="70" y1="194" x2="730" y2="194" stroke="#D6D6D6" stroke-width="1"></line>
                        <line x1="70" y1="136" x2="730" y2="136" stroke="#D6D6D6" stroke-width="1"></line>
                        <line x1="70" y1="78" x2="730" y2="78" stroke="#D6D6D6" stroke-width="1"></line>
                        <line x1="70" y1="20" x2="730" y2="20" stroke="#D6D6D6" stroke-width="1"></line>
                        <text x="60" y="315" text-anchor="end" font-size="11" fill="#555">0</text>
                        <text x="60" y="256" text-anchor="end" font-size="11" fill="#555">70k</text>
                        <text x="60" y="198" text-anchor="end" font-size="11" fill="#555">140k</text>
                        <text x="60" y="140" text-anchor="end" font-size="11" fill="#555">210k</text>
                        <text x="60" y="82" text-anchor="end" font-size="11" fill="#555">280k</text>
                        <text x="60" y="24" text-anchor="end" font-size="11" fill="#555">350k</text>
                        <text x="114" y="335" text-anchor="middle" font-size="11" fill="#555">Feb</text>
                        <text x="234" y="335" text-anchor="middle" font-size="11" fill="#555">Mar</text>
                        <text x="354" y="335" text-anchor="middle" font-size="11" fill="#555">Apr</text>
                        <text x="474" y="335" text-anchor="middle" font-size="11" fill="#555">May</text>
                        <text x="594" y="335" text-anchor="middle" font-size="11" fill="#555">Jun</text>
                        <text x="714" y="335" text-anchor="middle" font-size="11" fill="#555">Jul</text>
                        <polyline points="114,199 234,58 334,103 466,126 598,264 730,227" fill="none" stroke="#a88805" stroke-width="3"></polyline>
                        <circle cx="114" cy="199" r="5" fill="#a88805"></circle>
                        <circle cx="234" cy="58" r="5" fill="#a88805"></circle>
                        <circle cx="334" cy="103" r="5" fill="#a88805"></circle>
                        <circle cx="466" cy="126" r="5" fill="#a88805"></circle>
                        <circle cx="598" cy="264" r="5" fill="#a88805"></circle>
                        <circle cx="730" cy="227" r="5" fill="#a88805"></circle>
                    </svg>
                </div>
            </div>
        </div>
        <div class="card graph-placeholder payroll-transaction-card">
            <h3>Payroll Transaction</h3>
            <div class="table-wrap">
                <table class="data-table product-table">
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Pay period start</th>
                            <th>Pay period end</th>
                            <th>Batch Payroll ID</th>
                            <th>Payroll count</th>
                            <th>Total Gross Pay</th>
                            <th>Total Gross Deduction</th>
                            <th>Total Net Pay</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody id="batch-payroll-tbody">
                        <tr><td colspan="10" style="text-align: center; padding: 20px; color: #999;">Loading...</td></tr>
                    </tbody>
                </table>
            </div>
            <div class="pagination">
                <button class="page-btn">&laquo; Prev</button>
                <button class="page-btn active">1</button>
                <button class="page-btn">2</button>
                <button class="page-btn">3</button>
                <button class="page-btn">Next &raquo;</button>
            </div>
        </div>
        <div class="bottom-cards-row">
            <div class="card graph-placeholder payroll-cycle-card">
                <h3>Payroll cycle Types</h3>
                <div class="table-wrap">
                    <table class="data-table product-table">
                        <thead>
                            <tr>
                                <th>Payroll type ID</th>
                                <th>Type</th>
                                <th>Frequency</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr><td>PT#001</td><td>Weekly</td><td>paid every Saturday</td></tr>
                            <tr><td>PT#002</td><td>Semi Monthly</td><td>Paid twice a month on fixed days 5th and 20th</td></tr>
                            <tr><td>PT#003</td><td>Monthly</td><td>Paid every month on the 20th</td></tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div class="card graph-placeholder yearly-holidays-card">
                <h3>Yearly Holidays</h3>
                <div class="table-wrap">
                        <table class="data-table product-table">
                            <thead>
                                <tr>
                                    <th>Holiday</th>
                                    <th>Date</th>
                                    <th>Type</th>
                                    <th style="width: 80px;">Action</th>
                                </tr>
                            </thead>
                            <tbody id="yearly-holidays-tbody">
                                <tr><td>Loading...</td><td></td><td></td><td></td></tr>
                            </tbody>
                        </table>
                </div>
            </div>
        </div>
        </div>
        </div>

        <div id="salary-computation-modal" class="modal" style="display:none;">
            <div class="modal-content" style="max-width: 1600px; width: 95%; max-height: 90vh; overflow-y: auto;">
                <div class="modal-header-row">
                    <h3>Salary Computation</h3>
                    <button class="modal-close-btn" id="close-salary-computation-modal">&times;</button>
                </div>
                <div class="modal-body" style="display: flex; gap: 16px; flex-wrap: wrap;">
                    <div style="flex: 1; min-width: 320px; display: flex; flex-direction: column; gap: 10px;">
                        <div style="display: flex; flex-direction: column; gap: 6px; position: relative;">
                            <label>Search Employee</label>
                            <input type="text" id="salary-search-employee" placeholder="Search active employees..." style="padding: 8px; border: 1px solid #ddd; border-radius: 6px; font-size: 14px;">
                            <div id="salary-search-results" style="display: none; position: absolute; top: 100%; left: 0; right: 0; background: #fff; border: 1px solid #D6D6D6; border-radius: 6px; box-shadow: 0 4px 12px rgba(0,0,0,0.1); z-index: 10; max-height: 200px; overflow-y: auto; margin-top: 4px;">
                            </div>
                        </div>
                        <div style="display: flex; gap: 8px; flex-wrap: wrap;">
                            <div style="flex: 1; min-width: 140px; display: flex; flex-direction: column; gap: 4px;">
                                <label>Employee ID</label>
                                <input type="text" id="salary-emp-id" readonly style="padding: 8px; border: 1px solid #ddd; border-radius: 6px; background: #f1f5f9; font-size: 14px;">
                            </div>
                            <div style="flex: 1; min-width: 140px; display: flex; flex-direction: column; gap: 4px;">
                                <label>Last Name</label>
                                <input type="text" id="salary-last-name" readonly style="padding: 8px; border: 1px solid #ddd; border-radius: 6px; background: #f1f5f9; font-size: 14px;">
                            </div>
                        </div>
                        <div style="display: flex; gap: 8px; flex-wrap: wrap;">
                            <div style="flex: 1; min-width: 140px; display: flex; flex-direction: column; gap: 4px;">
                                <label>First Name</label>
                                <input type="text" id="salary-first-name" readonly style="padding: 8px; border: 1px solid #ddd; border-radius: 6px; background: #f1f5f9; font-size: 14px;">
                            </div>
                            <div style="flex: 1; min-width: 140px; display: flex; flex-direction: column; gap: 4px;">
                                <label>Middle Name</label>
                                <input type="text" id="salary-middle-name" readonly style="padding: 8px; border: 1px solid #ddd; border-radius: 6px; background: #f1f5f9; font-size: 14px;">
                            </div>
                        </div>
                        <div style="display: flex; gap: 8px; align-items: center; flex-wrap: wrap;">
                            <div style="display: flex; flex-direction: column; gap: 4px;">
                                <label>Date Range</label>
                                <input type="date" id="salary-date-from" style="padding: 8px; border: 1px solid #ddd; border-radius: 6px; font-size: 14px;">
                            </div>
                            <span style="align-self: flex-end; padding-bottom: 8px; font-weight: 700;">to</span>
                            <div style="display: flex; flex-direction: column; gap: 4px;">
                                <label>&nbsp;</label>
                                <input type="date" id="salary-date-to" style="padding: 8px; border: 1px solid #ddd; border-radius: 6px; font-size: 14px;">
                            </div>
                            <input type="hidden" id="salary-pay-mode" value="">
                        </div>
                        <div style="border-top: 1px solid #eee; padding-top: 10px; display: grid; grid-template-columns: 1fr 1fr; gap: 8px;">
                            <div style="display: flex; flex-direction: column; gap: 4px;">
                                <label>Total Days Worked</label>
                                <input type="text" id="salary-total-days" readonly style="padding: 8px; border: 1px solid #ddd; border-radius: 6px; background: #f1f5f9; font-size: 14px;">
                            </div>
                            <div style="display: flex; flex-direction: column; gap: 4px;">
                                <label>Total Overtime Hours</label>
                                <input type="text" id="salary-total-overtime" readonly style="padding: 8px; border: 1px solid #ddd; border-radius: 6px; background: #f1f5f9; font-size: 14px;">
                            </div>
                            <div style="display: flex; flex-direction: column; gap: 4px;">
                                <label>Total Allowance</label>
                                <input type="text" id="salary-total-allowance" readonly style="padding: 8px; border: 1px solid #ddd; border-radius: 6px; background: #f1f5f9; font-size: 14px;">
                            </div>
                            <div style="display: flex; flex-direction: column; gap: 4px;">
                                <label>Total Leaves Usage</label>
                                <input type="text" id="salary-total-leaves" readonly style="padding: 8px; border: 1px solid #ddd; border-radius: 6px; background: #f1f5f9; font-size: 14px;">
                            </div>
                            <div style="display: flex; flex-direction: column; gap: 4px;">
                                <label>Regular Holiday</label>
                                <input type="text" id="salary-regular-holiday" readonly style="padding: 8px; border: 1px solid #ddd; border-radius: 6px; background: #f1f5f9; font-size: 14px;">
                            </div>
                            <div style="display: flex; flex-direction: column; gap: 4px;">
                                <label>Special Holiday</label>
                                <input type="text" id="salary-special-holiday" readonly style="padding: 8px; border: 1px solid #ddd; border-radius: 6px; background: #f1f5f9; font-size: 14px;">
                            </div>
                            <div style="display: flex; flex-direction: column; gap: 4px;">
                                <label>Per Job Days</label>
                                <input type="text" id="salary-per-job-days" readonly style="padding: 8px; border: 1px solid #ddd; border-radius: 6px; background: #f1f5f9; font-size: 14px;">
                            </div>
                            <div style="display: flex; flex-direction: column; gap: 4px;">
                                <label>Per Job Amount</label>
                                <input type="text" id="salary-per-job-amount" readonly style="padding: 8px; border: 1px solid #ddd; border-radius: 6px; background: #f1f5f9; font-size: 14px;">
                            </div>
                        </div>
                        <div style="border-top: 1px solid #eee; padding-top: 10px; display: grid; grid-template-columns: 1fr 1fr; gap: 8px;">
                            <div style="display: flex; flex-direction: column; gap: 4px;">
                                <label>Total Income Tax</label>
                                <input type="text" id="salary-total-tax" readonly style="padding: 8px; border: 1px solid #ddd; border-radius: 6px; background: #f1f5f9; font-size: 14px;">
                            </div>
                            <div style="display: flex; flex-direction: column; gap: 4px;">
                                <label>Total SSS Payment</label>
                                <input type="text" id="salary-total-sss" readonly style="padding: 8px; border: 1px solid #ddd; border-radius: 6px; background: #f1f5f9; font-size: 14px;">
                            </div>
                            <div style="display: flex; flex-direction: column; gap: 4px;">
                                <label>Total SSS Loan Payment</label>
                                <input type="text" id="salary-total-sss-loan" readonly style="padding: 8px; border: 1px solid #ddd; border-radius: 6px; background: #f1f5f9; font-size: 14px;">
                            </div>
                            <div style="display: flex; flex-direction: column; gap: 4px;">
                                <label>Total Philhealth Payment</label>
                                <input type="text" id="salary-total-philhealth" readonly style="padding: 8px; border: 1px solid #ddd; border-radius: 6px; background: #f1f5f9; font-size: 14px;">
                            </div>
                            <div style="display: flex; flex-direction: column; gap: 4px;">
                                <label>Total Pagibig Payment</label>
                                <input type="text" id="salary-total-pagibig" readonly style="padding: 8px; border: 1px solid #ddd; border-radius: 6px; background: #f1f5f9; font-size: 14px;">
                            </div>
                            <div style="display: flex; flex-direction: column; gap: 4px;">
                                <label>Total Pagibig Loan Payment</label>
                                <input type="text" id="salary-total-pagibig-loan" readonly style="padding: 8px; border: 1px solid #ddd; border-radius: 6px; background: #f1f5f9; font-size: 14px;">
                            </div>
                        </div>
                        <div style="border-top: 1px solid #eee; padding-top: 10px; display: grid; grid-template-columns: 1fr 1fr; gap: 8px;">
                            <div style="display: flex; flex-direction: column; gap: 4px;">
                                <label>Starting Cash Loan</label>
                                <input type="text" id="salary-starting-cash-loan" readonly style="padding: 8px; border: 1px solid #ddd; border-radius: 6px; background: #f1f5f9; font-size: 14px;">
                            </div>
                            <div style="display: flex; flex-direction: column; gap: 4px;">
                                <label>Total Cash Loan Deductions</label>
                                <input type="text" id="salary-total-cash-loan-deductions" readonly style="padding: 8px; border: 1px solid #ddd; border-radius: 6px; background: #f1f5f9; font-size: 14px;">
                            </div>
                            <div style="display: flex; flex-direction: column; gap: 4px;">
                                <label>Ending Cash Loan</label>
                                <input type="text" id="salary-ending-cash-loan" readonly style="padding: 8px; border: 1px solid #ddd; border-radius: 6px; background: #f1f5f9; font-size: 14px;">
                            </div>
                        </div>
                        <div style="border-top: 1px solid #eee; padding-top: 10px; display: grid; grid-template-columns: 1fr 1fr; gap: 8px;">
                            <div style="display: flex; flex-direction: column; gap: 4px;">
                                <label>Starting Losses/ Damages</label>
                                <input type="text" id="salary-starting-losses" readonly style="padding: 8px; border: 1px solid #ddd; border-radius: 6px; background: #f1f5f9; font-size: 14px;">
                            </div>
                            <div style="display: flex; flex-direction: column; gap: 4px;">
                                <label>Total Losses/ Damages Deduction</label>
                                <input type="text" id="salary-total-losses-deduction" readonly style="padding: 8px; border: 1px solid #ddd; border-radius: 6px; background: #f1f5f9; font-size: 14px;">
                            </div>
                            <div style="display: flex; flex-direction: column; gap: 4px;">
                                <label>Ending Losses/ Damages</label>
                                <input type="text" id="salary-ending-losses" readonly style="padding: 8px; border: 1px solid #ddd; border-radius: 6px; background: #f1f5f9; font-size: 14px;">
                            </div>
                        </div>
                        <div style="border-top: 1px solid #eee; padding-top: 10px; display: flex; flex-direction: column; gap: 4px;">
                            <label>Net Pay</label>
                            <input type="text" id="salary-net-pay" readonly style="padding: 10px; border: 1px solid #ddd; border-radius: 6px; background: #f1f5f9; font-size: 16px; font-weight: 700;">
                        </div>
                        <button id="save-salary-computation-btn" class="btn-primary" type="button" style="padding: 10px 16px; font-size: 14px; margin-top: 10px; align-self: flex-end;">Save</button>
                    </div>
                    <div style="flex: 1; min-width: 320px; display: flex; flex-direction: column; gap: 10px;">
                        <div style="display: flex; gap: 8px; justify-content: flex-end;">
                            <button id="print-payslip-btn" class="btn-primary" type="button" style="padding: 8px 14px; font-size: 14px;">Print</button>
                        </div>
                        <div style="background: #525659; padding: 24px; border-radius: 8px; overflow: auto; display: flex; justify-content: center;" id="payslip-reader">
                            <div id="payslip-preview" style="width: 210mm; min-height: 297mm; padding: 20mm; box-sizing: border-box; background: #fff; box-shadow: 0 4px 16px rgba(0,0,0,0.35); font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; color: #000; display: flex; flex-direction: column; font-size: 11px; line-height: 1.4;">
                                <div style="text-align: center; margin-bottom: 14px; padding-bottom: 10px; border-bottom: 2px solid #000;">
                                    <div style="font-size: 18px; font-weight: 700; letter-spacing: 1px;">GOLDEN FIELD</div>
                                    <div style="font-size: 10px; color: #555; margin-top: 2px; letter-spacing: 0.5px;">OFFICIAL PAYSLIP</div>
                                </div>
                                <div style="display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 12px; padding-bottom: 8px; border-bottom: 1px dashed #bbb;">
                                    <div>
                                        <div style="font-size: 9px; color: #777; text-transform: uppercase; letter-spacing: 0.5px;">Employee Name</div>
                                        <div id="payslip-name" style="font-size: 12px; font-weight: 700; color: #000; margin-top: 2px;">-</div>
                                    </div>
                                    <div style="text-align: right;">
                                        <div style="font-size: 9px; color: #777; text-transform: uppercase; letter-spacing: 0.5px;">Employee ID</div>
                                        <div id="payslip-emp-id" style="font-size: 12px; font-weight: 700; color: #000; margin-top: 2px;">-</div>
                                    </div>
                                </div>
                                <div style="display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 14px; padding-bottom: 8px; border-bottom: 1px dashed #bbb;">
                                    <div>
                                        <div style="font-size: 9px; color: #777; text-transform: uppercase; letter-spacing: 0.5px;">Pay Period</div>
                                        <div id="payslip-period" style="font-size: 12px; font-weight: 700; color: #000; margin-top: 2px;">-</div>
                                    </div>
                                </div>
                                <div style="display: flex; gap: 12px; margin-bottom: 10px;">
                                    <div style="flex: 1; min-width: 0;">
                                        <div style="font-size: 10px; font-weight: 700; color: #000; margin-bottom: 6px; text-transform: uppercase; letter-spacing: 0.5px; background: #f4f4f4; padding: 4px 6px;">Earnings</div>
                                        <table style="width: 100%; border-collapse: collapse; font-size: 11px;">
                                            <tbody>
                                                <tr style="border-bottom: 1px solid #eee;">
                                                    <td style="padding: 5px 0; color: #333; width: 70%;">Base Salary</td>
                                                    <td id="payslip-base-salary" style="padding: 5px 0; text-align: right; color: #000; font-weight: 600;">-</td>
                                                </tr>
                                                <tr style="border-bottom: 1px solid #eee;">
                                                    <td style="padding: 5px 0; color: #333;">Overtime</td>
                                                    <td id="payslip-overtime" style="padding: 5px 0; text-align: right; color: #000; font-weight: 600;">-</td>
                                                </tr>
                                                <tr style="border-bottom: 1px solid #eee;">
                                                    <td style="padding: 5px 0; color: #333;">Allowance</td>
                                                    <td id="payslip-allowance" style="padding: 5px 0; text-align: right; color: #000; font-weight: 600;">-</td>
                                                </tr>
                                                <tr style="border-bottom: 1px solid #eee;">
                                                    <td style="padding: 5px 0; color: #333;">Sick Leave</td>
                                                    <td id="payslip-sick-leave" style="padding: 5px 0; text-align: right; color: #000; font-weight: 600;">-</td>
                                                </tr>
                                                <tr style="border-bottom: 1px solid #eee;">
                                                    <td style="padding: 5px 0; color: #333;">Vacation Leave</td>
                                                    <td id="payslip-vacation-leave" style="padding: 5px 0; text-align: right; color: #000; font-weight: 600;">-</td>
                                                </tr>
                                                <tr style="border-bottom: 1px solid #eee;">
                                                    <td style="padding: 5px 0; color: #333;">Regular Holiday Pay</td>
                                                    <td id="payslip-regular-holiday" style="padding: 5px 0; text-align: right; color: #000; font-weight: 600;">-</td>
                                                </tr>
                                                <tr style="border-bottom: 1px solid #eee;">
                                                    <td style="padding: 5px 0; color: #333;">Special Holiday Pay</td>
                                                    <td id="payslip-special-holiday" style="padding: 5px 0; text-align: right; color: #000; font-weight: 600;">-</td>
                                                </tr>
                                                <tr style="border-top: 2px solid #000; font-weight: 700;">
                                                    <td style="padding: 6px 0; color: #000; font-size: 12px;">Total Gross Pay</td>
                                                    <td id="payslip-gross-pay" style="padding: 6px 0; text-align: right; color: #000; font-size: 12px;">-</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                    <div style="flex: 1; min-width: 0;">
                                        <div style="font-size: 10px; font-weight: 700; color: #000; margin-bottom: 6px; text-transform: uppercase; letter-spacing: 0.5px; background: #f4f4f4; padding: 4px 6px;">Deductions</div>
                                        <table style="width: 100%; border-collapse: collapse; font-size: 11px;">
                                            <tbody>
                                                <tr style="border-bottom: 1px solid #eee;">
                                                    <td style="padding: 5px 0; color: #333;">Income Tax</td>
                                                    <td id="payslip-tax" style="padding: 5px 0; text-align: right; color: #000; font-weight: 600;">-</td>
                                                </tr>
                                                <tr style="border-bottom: 1px solid #eee;">
                                                    <td style="padding: 5px 0; color: #333;">SSS</td>
                                                    <td id="payslip-sss" style="padding: 5px 0; text-align: right; color: #000; font-weight: 600;">-</td>
                                                </tr>
                                                <tr style="border-bottom: 1px solid #eee;">
                                                    <td style="padding: 5px 0; color: #333;">SSS Loan</td>
                                                    <td id="payslip-sss-loan" style="padding: 5px 0; text-align: right; color: #000; font-weight: 600;">-</td>
                                                </tr>
                                                <tr style="border-bottom: 1px solid #eee;">
                                                    <td style="padding: 5px 0; color: #333;">PhilHealth</td>
                                                    <td id="payslip-philhealth" style="padding: 5px 0; text-align: right; color: #000; font-weight: 600;">-</td>
                                                </tr>
                                                <tr style="border-bottom: 1px solid #eee;">
                                                    <td style="padding: 5px 0; color: #333;">Pag-IBIG</td>
                                                    <td id="payslip-pagibig" style="padding: 5px 0; text-align: right; color: #000; font-weight: 600;">-</td>
                                                </tr>
                                                <tr style="border-bottom: 1px solid #eee;">
                                                    <td style="padding: 5px 0; color: #333;">Pag-IBIG Loan</td>
                                                    <td id="payslip-pagibig-loan" style="padding: 5px 0; text-align: right; color: #000; font-weight: 600;">-</td>
                                                </tr>
                                                <tr style="border-bottom: 1px solid #eee;">
                                                    <td style="padding: 5px 0; color: #333;">Cash Loan Deduction</td>
                                                    <td id="payslip-cash-loan-deductions" style="padding: 5px 0; text-align: right; color: #000; font-weight: 600;">-</td>
                                                </tr>
                                                <tr style="border-bottom: 1px solid #eee;">
                                                    <td style="padding: 5px 0; color: #333;">Losses / Damages</td>
                                                    <td id="payslip-losses" style="padding: 5px 0; text-align: right; color: #000; font-weight: 600;">-</td>
                                                </tr>
                                                <tr style="border-top: 2px solid #000; font-weight: 700;">
                                                    <td style="padding: 6px 0; color: #000; font-size: 12px;">Total Gross Deductions</td>
                                                    <td id="payslip-total-deductions" style="padding: 6px 0; text-align: right; color: #000; font-size: 12px;">-</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                                <div style="background: #f9f9f9; border: 1px solid #e5e5e5; padding: 10px; margin-bottom: 12px; display: flex; justify-content: space-between; align-items: center;">
                                    <div style="font-weight: 700; color: #000; font-size: 13px; text-transform: uppercase; letter-spacing: 0.5px;">Net Pay</div>
                                    <div id="payslip-net-pay" style="font-weight: 700; color: #000; font-size: 14px;">-</div>
                                </div>
                                <div style="padding-top: 10px; border-top: 1px dashed #bbb; display: flex; flex-direction: column; gap: 4px;">
                                    <div style="display: flex; justify-content: space-between; font-size: 10px; color: #333;">
                                        <span style="font-weight: 600;">Starting Cash Advance</span>
                                        <span id="payslip-starting-cash-advance" style="font-weight: 700;">-</span>
                                    </div>
                                    <div style="display: flex; justify-content: space-between; font-size: 10px; color: #333;">
                                        <span style="font-weight: 600;">Ending Cash Advance</span>
                                        <span id="payslip-ending-cash-advance" style="font-weight: 700;">-</span>
                                    </div>
                                    <div style="display: flex; justify-content: space-between; font-size: 10px; color: #333;">
                                        <span style="font-weight: 600;">Starting Losses/ Damages</span>
                                        <span id="payslip-starting-losses" style="font-weight: 700;">-</span>
                                    </div>
                                    <div style="display: flex; justify-content: space-between; font-size: 10px; color: #333;">
                                        <span style="font-weight: 600;">Ending Losses/ Damages</span>
                                        <span id="payslip-ending-losses" style="font-weight: 700;">-</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
                                
        <div id="add-holiday-modal" class="modal" style="display:none;">
            <div class="modal-content" style="max-width: 520px; width: 95%;">
                <div class="modal-header-row">
                    <h3>Add New Holiday</h3>
                    <button class="modal-close-btn" id="close-add-holiday-modal">&times;</button>
                </div>
                <div style="padding: 16px; display: flex; flex-direction: column; gap: 12px;">
                    <div style="display: flex; flex-direction: column; gap: 4px;">
                        <label style="font-size: 14px; font-weight: 600;">Holiday Name</label>
                        <input type="text" id="holiday-name" placeholder="Enter holiday name" style="width: 100%; box-sizing: border-box; padding: 10px; border: 1px solid #D6D6D6; border-radius: 6px; font-size: 14px;">
                    </div>
                    <div style="display: flex; flex-direction: column; gap: 4px;">
                        <label style="font-size: 14px; font-weight: 600;">Date</label>
                        <input type="date" id="holiday-date" style="width: 100%; box-sizing: border-box; padding: 10px; border: 1px solid #D6D6D6; border-radius: 6px; font-size: 14px;">
                    </div>
                    <div style="display: flex; flex-direction: column; gap: 4px;">
                        <label style="font-size: 14px; font-weight: 600;">Type</label>
                        <select id="holiday-type" style="width: 100%; box-sizing: border-box; padding: 10px; border: 1px solid #D6D6D6; border-radius: 6px; font-size: 14px; background: #fff;">
                            <option value="">Select Type</option>
                            <option value="Regular Holiday">Regular Holiday</option>
                            <option value="Special Holiday">Special Holiday</option>
                        </select>
                    </div>
                    <div style="display: flex; gap: 8px; justify-content: flex-end; margin-top: 8px;">
                        <button id="cancel-add-holiday-btn" class="btn-danger" type="button" style="padding: 10px 16px; font-size: 14px;">Cancel</button>
                        <button id="save-add-holiday-btn" class="btn-primary" type="button" style="padding: 10px 16px; font-size: 14px;">Save</button>
                    </div>
                </div>
            </div>
        </div>
        <div id="batch-salary-modal" class="modal" style="display:none;">
            <div class="modal-content" style="max-width: 1200px; width: 95%; max-height: 90vh; overflow-y: auto;">
                <div class="modal-header-row">
                    <h3>Batch Salary Computation</h3>
                    <button class="modal-close-btn" id="close-batch-salary-modal">&times;</button>
                </div>
                <div style="padding: 16px; display: flex; flex-direction: column; gap: 12px;">
                    <div style="display: flex; gap: 12px; align-items: center; flex-wrap: wrap;">
                        <div style="flex: 1; min-width: 200px;">
                            <label style="font-size: 14px; font-weight: 600; display: block; margin-bottom: 4px;">Search Department</label>
                            <select id="batch-search-employee" style="width: 100%; box-sizing: border-box; padding: 10px; border: 1px solid #D6D6D6; border-radius: 6px; font-size: 14px; background: #fff;">
                                <option value="">Select Department</option>
                            </select>
                        </div>
                        <div style="flex: 1; min-width: 200px;">
                            <label style="font-size: 14px; font-weight: 600; display: block; margin-bottom: 4px;">Date From</label>
                            <input type="date" id="batch-date-from" style="width: 100%; box-sizing: border-box; padding: 10px; border: 1px solid #D6D6D6; border-radius: 6px; font-size: 14px;">
                        </div>
                        <div style="flex: 1; min-width: 200px;">
                            <label style="font-size: 14px; font-weight: 600; display: block; margin-bottom: 4px;">Date To</label>
                            <input type="date" id="batch-date-to" style="width: 100%; box-sizing: border-box; padding: 10px; border: 1px solid #D6D6D6; border-radius: 6px; font-size: 14px;">
                        </div>
                    </div>
                    <div style="background: #fff; border: 1px solid #ddd; border-radius: 6px; padding: 10px 14px; min-height: 44px; display: flex; gap: 12px; flex-wrap: nowrap; align-items: flex-start; overflow-x: auto; overflow-y: auto;" id="batch-employee-filters">
                        <span id="batch-employee-filter-label" style="font-size: 14px; font-weight: 600; color: #1a1f2e;">Employees:</span>
                        <span id="batch-employee-filter-hint" style="font-size: 13px; color: #888;">Select a department to load active employees</span>
                    </div>
                    <div style="display: flex; gap: 12px; align-items: center;">
                        <button id="batch-compute-btn" class="btn-primary" type="button" style="padding: 10px 20px; font-size: 14px; cursor: pointer;">Compute</button>
                        <button id="batch-save-btn" class="btn-primary" type="button" style="padding: 10px 20px; font-size: 14px; cursor: pointer; background: #28a745; border-color: #28a745;">Save All</button>
                    </div>
                    <div style="position: relative; overflow-x: auto; max-height: 60vh; overflow-y: auto; border: 1px solid #ddd; border-radius: 6px;">
                        <table class="data-table" style="width: 100%; border-collapse: separate; border-spacing: 0; font-size: 11px; margin: 0; min-width: 2400px; overflow: visible !important; table-layout: fixed;">
                            <colgroup>
                                <col style="width: 80px;">
                                <col style="width: 80px;">
                                <col style="width: 80px;">
                                <col style="width: 70px;">
                                <col style="width: 50px;">
                                <col style="width: 70px;">
                                <col style="width: 60px;">
                                <col style="width: 75px;">
                                <col style="width: 75px;">
                                <col style="width: 80px;">
                                <col style="width: 70px;">
                                <col style="width: 75px;">
                                <col style="width: 70px;">
                                <col style="width: 85px;">
                                <col style="width: 85px;">
                                <col style="width: 90px;">
                                <col style="width: 90px;">
                                <col style="width: 85px;">
                                <col style="width: 85px;">
                                <col style="width: 80px;">
                                <col style="width: 95px;">
                                <col style="width: 90px;">
                                <col style="width: 105px;">
                                <col style="width: 105px;">
                            </colgroup>
                            <thead style="position: sticky; top: 0; z-index: 2;">
                                <tr>
                                    <th style="min-width: 80px; max-width: 80px; padding: 6px; border-bottom: 2px solid #ddd; text-align: left; font-size: 12px; position: -webkit-sticky; position: sticky; left: 0; background: #FFD000; z-index: 2; transform: translateZ(0); backface-visibility: hidden; box-shadow: 1px 0 0 #D6D6D6; box-sizing: border-box;">Employee ID</th>
                                    <th style="min-width: 80px; max-width: 80px; padding: 6px; border-bottom: 2px solid #ddd; text-align: left; font-size: 12px; position: -webkit-sticky; position: sticky; left: 80px; background: #FFD000; z-index: 2; transform: translateZ(0); backface-visibility: hidden; box-shadow: 1px 0 0 #D6D6D6; box-sizing: border-box;">Last name</th>
                                    <th style="min-width: 80px; max-width: 80px; padding: 6px; border-bottom: 2px solid #ddd; text-align: left; font-size: 12px; position: -webkit-sticky; position: sticky; left: 160px; background: #FFD000; z-index: 2; transform: translateZ(0); backface-visibility: hidden; box-sizing: border-box;">First name</th>
                                    <th style="min-width: 70px; max-width: 70px; padding: 6px; border-bottom: 2px solid #ddd; text-align: right; font-size: 12px; box-sizing: border-box;">Days worked</th>
                                    <th style="min-width: 50px; max-width: 50px; padding: 6px; border-bottom: 2px solid #ddd; text-align: right; font-size: 12px; box-sizing: border-box;">OT</th>
                                    <th style="min-width: 70px; max-width: 70px; padding: 6px; border-bottom: 2px solid #ddd; text-align: right; font-size: 12px; box-sizing: border-box;">Allowance</th>
                                    <th style="min-width: 60px; max-width: 60px; padding: 6px; border-bottom: 2px solid #ddd; text-align: right; font-size: 12px; box-sizing: border-box;">Leaves</th>
                                    <th style="min-width: 75px; max-width: 75px; padding: 6px; border-bottom: 2px solid #ddd; text-align: right; font-size: 12px; box-sizing: border-box;">Regular Holiday</th>
                                    <th style="min-width: 75px; max-width: 75px; padding: 6px; border-bottom: 2px solid #ddd; text-align: right; font-size: 12px; box-sizing: border-box;">Special Holiday</th>
                                    <th style="min-width: 80px; max-width: 80px; padding: 6px; border-bottom: 2px solid #ddd; text-align: right; font-size: 12px; box-sizing: border-box;">Gross Pay</th>
                                    <th style="min-width: 70px; max-width: 70px; padding: 6px; border-bottom: 2px solid #ddd; text-align: right; font-size: 12px; box-sizing: border-box;">Income Tax</th>
                                    <th style="min-width: 75px; max-width: 75px; padding: 6px; border-bottom: 2px solid #ddd; text-align: right; font-size: 12px; box-sizing: border-box;">SSS Payment</th>
                                    <th style="min-width: 70px; max-width: 70px; padding: 6px; border-bottom: 2px solid #ddd; text-align: right; font-size: 12px; box-sizing: border-box;">SSS Loan</th>
                                    <th style="min-width: 85px; max-width: 85px; padding: 6px; border-bottom: 2px solid #ddd; text-align: right; font-size: 12px; box-sizing: border-box;">Philhealth Payment</th>
                                    <th style="min-width: 85px; max-width: 85px; padding: 6px; border-bottom: 2px solid #ddd; text-align: right; font-size: 12px; box-sizing: border-box;">Pagibig payment</th>
                                    <th style="min-width: 90px; max-width: 90px; padding: 6px; border-bottom: 2px solid #ddd; text-align: right; font-size: 12px; box-sizing: border-box;">Pagibig loan payment</th>
                                    <th style="min-width: 90px; max-width: 90px; padding: 6px; border-bottom: 2px solid #ddd; text-align: right; font-size: 12px; box-sizing: border-box;">Cash loan deduction</th>
                                    <th style="min-width: 85px; max-width: 85px; padding: 6px; border-bottom: 2px solid #ddd; text-align: right; font-size: 12px; box-sizing: border-box;">Losses/Damages</th>
                                    <th style="min-width: 85px; max-width: 85px; padding: 6px; border-bottom: 2px solid #ddd; text-align: right; font-size: 12px; box-sizing: border-box;">Gross Deduction</th>
                                    <th style="min-width: 80px; max-width: 80px; padding: 6px; border-bottom: 2px solid #ddd; text-align: right; font-size: 12px; box-sizing: border-box;">Net Pay</th>
                                    <th style="min-width: 95px; max-width: 95px; padding: 6px; border-bottom: 2px solid #ddd; text-align: right; font-size: 12px; box-sizing: border-box;">Starting Cash loan</th>
                                    <th style="min-width: 90px; max-width: 90px; padding: 6px; border-bottom: 2px solid #ddd; text-align: right; font-size: 12px; box-sizing: border-box;">Ending Cash loan</th>
                                    <th style="min-width: 105px; max-width: 105px; padding: 6px; border-bottom: 2px solid #ddd; text-align: right; font-size: 12px; box-sizing: border-box;">Starting Losses/ Damages</th>
                                    <th style="min-width: 105px; max-width: 105px; padding: 6px; border-bottom: 2px solid #ddd; text-align: right; font-size: 12px; box-sizing: border-box;">Ending Losses/ Damages</th>
                                </tr>
                            </thead>
                            <tbody id="batch-salary-tbody">
                                <tr><td colspan="24" style="text-align: center; padding: 20px; color: #999;">Select department, employees, and date range, then click Compute</td></tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    `;

    const batchSalaryModal = document.getElementById('batch-salary-modal');
    const existingConfirmedModal = document.getElementById('batch-confirmed-modal');
    if (existingConfirmedModal) existingConfirmedModal.remove();

    const batchConfirmedModal = document.createElement('div');
    batchConfirmedModal.id = 'batch-confirmed-modal';
    batchConfirmedModal.className = 'modal';
    batchConfirmedModal.style.cssText = 'display:none;';
    batchConfirmedModal.innerHTML = `
        <div class="modal-content" style="max-width: 400px; width: 90%; text-align: center;">
            <div class="modal-header-row">
                <h3>Batch Payroll Confirmed!</h3>
            </div>
            <div class="modal-body" style="padding: 24px; display: flex; flex-direction: column; gap: 16px; align-items: center;">
                <p style="margin: 0; font-size: 14px; color: #1a1f2e;">The batch payroll has been successfully saved and confirmed.</p>
                <button id="batch-confirmed-ok-btn" class="btn-primary" type="button" style="padding: 10px 32px; font-size: 14px;">OK</button>
            </div>
        </div>
    `;
    document.body.appendChild(batchConfirmedModal);

    document.getElementById('batch-confirmed-ok-btn').addEventListener('click', () => {
        batchConfirmedModal.style.display = 'none';
        const modal = document.getElementById('batch-salary-modal');
        if (modal) modal.style.display = 'none';
        switchTab('hr-salary');
    });

    const existingModal = document.getElementById('batch-print-preview-modal');
    if (existingModal) existingModal.remove();

    const batchPrintPreviewModal = document.createElement('div');
    batchPrintPreviewModal.id = 'batch-print-preview-modal';
    batchPrintPreviewModal.className = 'modal';
    batchPrintPreviewModal.style.cssText = 'display:none;';
    batchPrintPreviewModal.innerHTML = `
        <div class="modal-content" style="max-width: 1080px; width: 95%; max-height: 90vh; overflow-y: auto;">
            <div class="modal-header-row">
                <h3>Batch Payroll Print Preview</h3>
                <button class="modal-close-btn" id="close-batch-print-preview">&times;</button>
            </div>
            <div style="padding: 16px;">
                <div id="batch-print-tabs" class="modal-tabs" style="display: flex; gap: 6px; border-bottom: 1px solid #d6cfbf; padding-bottom: 0; margin-bottom: 12px;">
                    <button id="batch-tab-summary" class="modal-tab active" type="button">Batch Payroll Summary</button>
                    <button id="batch-tab-acknowledgement" class="modal-tab" type="button">Pay slip Acknowledgement Receipt</button>
                </div>
                <div id="batch-print-preview-content" style="background: #fff; border: 1px solid #ddd; border-radius: 6px; padding: 20px; margin-bottom: 16px;"></div>
                <div id="batch-print-tab-action-row" style="display: flex; gap: 12px; justify-content: flex-end; margin-bottom: 12px;">
                    <button id="batch-print-btn" class="btn-primary" type="button" style="padding: 10px 20px; font-size: 14px; cursor: pointer;">Print Summary</button>
                </div>
                <div style="display: flex; gap: 12px; justify-content: flex-end; padding-top: 12px; border-top: 1px solid #e5e0d2;">
                    <button id="batch-print-status-label" type="button" disabled style="padding: 10px 16px; font-size: 13px; cursor: default; background: transparent; color: #888; border: none;">Print both the summary and the acknowledgement to enable Final Confirm</button>
                    <button id="batch-final-confirm-btn" class="btn-primary" type="button" disabled style="padding: 10px 20px; font-size: 14px; cursor: not-allowed; background: #b8c2cc; color: #fff; border: none; border-radius: 4px; opacity: 0.6;">Final Confirm</button>
                </div>
            </div>
        </div>
    `;
    document.body.appendChild(batchPrintPreviewModal);

    const closeBatchPrintPreview = document.getElementById('close-batch-print-preview');
    if (closeBatchPrintPreview) {
        closeBatchPrintPreview.addEventListener('click', () => {
            batchPrintPreviewModal.style.display = 'none';
        });
    }

    if (batchPrintPreviewModal) {
        batchPrintPreviewModal.addEventListener('click', (e) => {
            if (e.target === batchPrintPreviewModal) batchPrintPreviewModal.style.display = 'none';
        });
    }

    let batchPrintActiveTab = 'summary';
    let currentBatchIdForPrint = null;
    let batchPrintSummaryData = null;
    let batchPrintTableData = null;
    let batchPrintSummaryPrinted = false;
    let batchPrintAcknowledgementPrinted = false;
    const batchTabSummaryBtn = document.getElementById('batch-tab-summary');
    const batchTabAcknowledgementBtn = document.getElementById('batch-tab-acknowledgement');
    const batchPrintBtn = document.getElementById('batch-print-btn');
    const batchPrintPreviewContent = document.getElementById('batch-print-preview-content');
    const batchFinalConfirmBtn = document.getElementById('batch-final-confirm-btn');
    const batchPrintStatusLabel = document.getElementById('batch-print-status-label');

    const updateBatchFinalConfirmState = () => {
        if (!batchFinalConfirmBtn) return;
        const canFinalConfirm = batchPrintSummaryPrinted && batchPrintAcknowledgementPrinted;
        batchFinalConfirmBtn.disabled = !canFinalConfirm;
        if (canFinalConfirm) {
            batchFinalConfirmBtn.style.cursor = 'pointer';
            batchFinalConfirmBtn.style.background = '';
            batchFinalConfirmBtn.style.opacity = '1';
        } else {
            batchFinalConfirmBtn.style.cursor = 'not-allowed';
            batchFinalConfirmBtn.style.background = '#b8c2cc';
            batchFinalConfirmBtn.style.opacity = '0.6';
        }
        if (batchPrintStatusLabel) {
            if (canFinalConfirm) {
                batchPrintStatusLabel.textContent = 'Both printables completed. You may now finalize the batch.';
            } else {
                const missing = [];
                if (!batchPrintSummaryPrinted) missing.push('Summary');
                if (!batchPrintAcknowledgementPrinted) missing.push('Acknowledgement');
                batchPrintStatusLabel.textContent = `Print ${missing.join(' and ')} to enable Final Confirm`;
            }
        }
    };

    const setBatchPrintTab = (tab) => {
        batchPrintActiveTab = tab;
        if (batchTabSummaryBtn && batchTabAcknowledgementBtn) {
            batchTabSummaryBtn.classList.toggle('active', tab === 'summary');
            batchTabAcknowledgementBtn.classList.toggle('active', tab === 'acknowledgement');
        }
        if (batchPrintBtn) {
            if (tab === 'acknowledgement') {
                batchPrintBtn.textContent = 'Print Acknowledgement';
            } else {
                batchPrintBtn.textContent = 'Print Summary';
            }
        }
    };

    updateBatchFinalConfirmState();

    const gatherBatchPrintData = async () => {
        const overviewTbody = document.getElementById('salary-overview-tbody');
        if (!overviewTbody) return null;

        const rows = Array.from(overviewTbody.querySelectorAll('tr')).filter(row => {
            const firstCell = row.querySelector('td');
            const payrollId = firstCell?.textContent.trim();
            return payrollId && payrollId !== 'No pending payrolls' && payrollId !== 'Failed to load payrolls';
        });

        if (rows.length === 0) return null;

        const employeeCountEl = document.getElementById('salary-overview-employee-count');
        const grossPayEl = document.getElementById('salary-overview-gross-pay');
        const grossDeductionEl = document.getElementById('salary-overview-gross-deduction');
        const netPayEl = document.getElementById('salary-overview-net-pay');
        const startingPayPeriodEl = document.getElementById('salary-overview-starting-pay-period');
        const endingPayPeriodEl = document.getElementById('salary-overview-ending-pay-period');

        const payrollIds = [];
        const tableData = rows.map(row => {
            const cells = row.querySelectorAll('td');
            const payrollId = cells[0]?.textContent.trim() || '';
            if (payrollId) payrollIds.push(payrollId);
            return {
                payrollId,
                employeeId: cells[1]?.textContent.trim() || '',
                lastName: cells[2]?.textContent.trim() || '',
                firstName: cells[3]?.textContent.trim() || '',
                totalDays: parseFloat(cells[4]?.textContent) || 0,
                totalOvertime: parseFloat(cells[5]?.textContent) || 0,
                totalAllowance: parseFloat(cells[6]?.textContent) || 0,
                totalLeaves: parseFloat(cells[7]?.textContent) || 0,
                regularHoliday: parseFloat(cells[8]?.textContent) || 0,
                specialHoliday: parseFloat(cells[9]?.textContent) || 0,
                grossPay: parseFloat(cells[10]?.textContent) || 0,
                totalTax: parseFloat(cells[11]?.textContent) || 0,
                totalSss: parseFloat(cells[12]?.textContent) || 0,
                totalSssLoan: parseFloat(cells[13]?.textContent) || 0,
                totalPhilhealth: parseFloat(cells[14]?.textContent) || 0,
                totalPagibig: parseFloat(cells[15]?.textContent) || 0,
                totalPagibigLoan: parseFloat(cells[16]?.textContent) || 0,
                totalCashLoanDeductions: parseFloat(cells[17]?.textContent) || 0,
                totalLossesDeductions: parseFloat(cells[18]?.textContent) || 0,
                grossDeduction: parseFloat(cells[19]?.textContent) || 0,
                netPay: parseFloat(cells[20]?.textContent) || 0,
                    startingCashLoan: parseFloat(cells[21]?.textContent) || 0,
                    endingCashLoan: parseFloat(cells[22]?.textContent) || 0,
                    startingLosses: parseFloat(cells[23]?.textContent) || 0,
                    endingLosses: parseFloat(cells[24]?.textContent) || 0
                };
        });

        let enrichedTableData = tableData;
        if (payrollIds.length > 0) {
            try {
                const payrollPromises = payrollIds.map(id => fetch(`/api/payroll/${encodeURIComponent(id)}`).then(res => res.ok ? res.json() : null).catch(() => null));
                const payrollRecords = await Promise.all(payrollPromises);
                const payrollMap = {};
                payrollRecords.forEach(p => { if (p && p.payroll_id) payrollMap[p.payroll_id] = p; });

                enrichedTableData = tableData.map(row => {
                    const payroll = payrollMap[row.payrollId];
                    if (!payroll) return row;
                    return {
                        ...row,
                        date_start: payroll.date_start || '',
                        date_end: payroll.date_end || '',
                        gross_pay: Number(payroll.gross_pay) || row.grossPay,
                        net_pay: Number(payroll.net_pay) || row.netPay,
                        total_income_tax: Number(payroll.total_income_tax) || row.totalTax,
                        total_sss_payment: Number(payroll.total_sss_payment) || row.totalSss,
                        total_sss_loan_payment: Number(payroll.total_sss_loan_payment) || row.totalSssLoan,
                        total_philhealth_payment: Number(payroll.total_philhealth_payment) || row.totalPhilhealth,
                        total_pagibig_payment: Number(payroll.total_pagibig_payment) || row.totalPagibig,
                        total_pagibig_loan_payment: Number(payroll.total_pagibig_loan_payment) || row.totalPagibigLoan,
                        total_cash_loan_deductions: Number(payroll.total_cash_loan_deductions) || row.totalCashLoanDeductions,
                        total_losses_damages: Number(payroll.total_losses_damages) || row.totalLossesDeductions,
                        starting_cash_loan: Number(payroll.starting_cash_loan) || row.startingCashLoan,
                        ending_cash_loan: Number(payroll.ending_cash_loan) || row.endingCashLoan,
                        starting_losses_damages: Number(payroll.starting_losses_damages) || row.startingLosses,
                        ending_losses_damages: Number(payroll.ending_losses_damages) || row.endingLosses
                    };
                });
            } catch (e) {
                console.error('Failed to fetch payroll details for print preview:', e);
            }
        }

        const formatDateShort = (d) => {
            if (!d || isNaN(new Date(d).getTime())) return '';
            const date = new Date(d);
            return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
        };

        const startDates = enrichedTableData.map(row => row.date_start).filter(Boolean);
        const endDates = enrichedTableData.map(row => row.date_end).filter(Boolean);
        const startingPayPeriod = startDates.length ? new Date(Math.min(...startDates.map(d => new Date(d).getTime()))) : null;
        const endingPayPeriod = endDates.length ? new Date(Math.max(...endDates.map(d => new Date(d).getTime()))) : null;

        const formatPayPeriod = (date) => {
            if (!date || isNaN(date.getTime())) return '';
            return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
        };

        const summaryData = {
            payPeriod: startingPayPeriod && endingPayPeriod ? `${formatPayPeriod(startingPayPeriod)} - ${formatPayPeriod(endingPayPeriod)}` : '-',
            payPeriodFrom: startingPayPeriod ? formatPayPeriod(startingPayPeriod) : '',
            payPeriodTo: endingPayPeriod ? formatPayPeriod(endingPayPeriod) : '',
            employeeCount: employeeCountEl?.value || rows.length,
            grossPay: grossPayEl?.value || '0.00',
            grossDeduction: grossDeductionEl?.value || '0.00',
            netPay: netPayEl?.value || '0.00'
        };

        return { summaryData, tableData: enrichedTableData };
    };

    if (batchTabSummaryBtn) {
        batchTabSummaryBtn.addEventListener('click', async () => {
            setBatchPrintTab('summary');
            if (!batchPrintSummaryData || !batchPrintTableData) {
                const gathered = await gatherBatchPrintData();
                if (gathered) {
                    batchPrintSummaryData = gathered.summaryData;
                    batchPrintTableData = gathered.tableData;
                }
            }
            renderBatchPrintPreview(batchPrintSummaryData, batchPrintTableData, 'summary');
        });
    }

    if (batchTabAcknowledgementBtn) {
        batchTabAcknowledgementBtn.addEventListener('click', async () => {
            setBatchPrintTab('acknowledgement');
            if (!batchPrintSummaryData || !batchPrintTableData) {
                const gathered = await gatherBatchPrintData();
                if (gathered) {
                    batchPrintSummaryData = gathered.summaryData;
                    batchPrintTableData = gathered.tableData;
                }
            }
            renderBatchPrintPreview(batchPrintSummaryData, batchPrintTableData, 'acknowledgement');
        });
    }

    const renderBatchPrintPreview = (summaryData, tableData, tab = 'summary') => {
        const contentEl = document.getElementById('batch-print-preview-content');
        if (!contentEl) return;

        if (!summaryData || !tableData) {
            contentEl.innerHTML = '<div style="padding: 20px; text-align: center; color: #999;">Preview data is not available.</div>';
            return;
        }

        if (tab === 'acknowledgement') {
            contentEl.innerHTML = '<div style="padding: 40px; text-align: center;"><div class="spinner" style="border: 4px solid #f3f3f3; border-top: 4px solid #007bff; border-radius: 50%; width: 40px; height: 40px; animation: spin 1s linear infinite; margin: 0 auto 12px;"></div><div style="color: #666; font-size: 14px;">Loading acknowledgement receipt...</div></div><style>@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }</style>';

            setTimeout(() => {
                renderAcknowledgementContent(contentEl, summaryData, tableData);
            }, 100);
            return;
        }

        const fmtNum = (val) => {
            const n = Number(val) || 0;
            return 'P ' + n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
        };

        const fmt = (val) => Number(val || 0).toFixed(2);

        contentEl.innerHTML = `
            <div style="font-family: Arial, sans-serif; color: #000;">
                <h2 style="text-align: center; margin-bottom: 2px; font-size: 16px;">GOLDEN FIELD</h2>
                <div class="print-subtitle" style="text-align: center; color: #555; margin-bottom: 10px; font-size: 11px;">BATCH PAYROLL SUMMARY</div>
                <div class="print-summary" style="display: flex; gap: 8px; margin-bottom: 10px; flex-wrap: nowrap;">
                    <div style="flex: 1; min-width: 100px; border: 1px solid #ddd; padding: 6px; border-radius: 4px;">
                        <label style="display: block; font-size: 9px; color: #666;">Pay Period</label>
                        <input readonly value="${summaryData.payPeriod || ''}" style="border: none; background: transparent; font-weight: 700; font-size: 11px; width: 100%;">
                    </div>
                    <div style="flex: 1; min-width: 100px; border: 1px solid #ddd; padding: 6px; border-radius: 4px;">
                        <label style="display: block; font-size: 9px; color: #666;">Employee Count</label>
                        <input readonly value="${summaryData.employeeCount || 0}" style="border: none; background: transparent; font-weight: 700; font-size: 11px; width: 100%;">
                    </div>
                    <div style="flex: 1; min-width: 100px; border: 1px solid #ddd; padding: 6px; border-radius: 4px;">
                        <label style="display: block; font-size: 9px; color: #666;">Total Gross Pay</label>
                        <input readonly value="${summaryData.grossPay || '0.00'}" style="border: none; background: transparent; font-weight: 700; font-size: 11px; width: 100%;">
                    </div>
                    <div style="flex: 1; min-width: 100px; border: 1px solid #ddd; padding: 6px; border-radius: 4px;">
                        <label style="display: block; font-size: 9px; color: #666;">Total Gross Deduction</label>
                        <input readonly value="${summaryData.grossDeduction || '0.00'}" style="border: none; background: transparent; font-weight: 700; font-size: 11px; width: 100%;">
                    </div>
                    <div style="flex: 1; min-width: 100px; border: 1px solid #ddd; padding: 6px; border-radius: 4px;">
                        <label style="display: block; font-size: 9px; color: #666;">Total Net Pay</label>
                        <input readonly value="${summaryData.netPay || '0.00'}" style="border: none; background: transparent; font-weight: 700; font-size: 11px; width: 100%;">
                    </div>
                </div>
                <div class="print-table-wrap" style="overflow-x: auto;">
                    <table style="width: 100%; border-collapse: collapse; font-size: 11px; table-layout: fixed;">
                        <thead>
                            <tr>
                                <th style="border: 1px solid #ddd; padding: 8px; background: #f4f4f4; font-weight: 700; text-align: left;">Employee ID</th>
                                <th style="border: 1px solid #ddd; padding: 8px; background: #f4f4f4; font-weight: 700; text-align: left;">Last Name</th>
                                <th style="border: 1px solid #ddd; padding: 8px; background: #f4f4f4; font-weight: 700; text-align: left;">First Name</th>
                                <th style="border: 1px solid #ddd; padding: 8px; background: #f4f4f4; font-weight: 700; text-align: right;">Days Worked</th>
                                <th style="border: 1px solid #ddd; padding: 8px; background: #f4f4f4; font-weight: 700; text-align: right;">OT</th>
                                <th style="border: 1px solid #ddd; padding: 8px; background: #f4f4f4; font-weight: 700; text-align: right;">Allowance</th>
                                <th style="border: 1px solid #ddd; padding: 8px; background: #f4f4f4; font-weight: 700; text-align: right;">Leaves</th>
                                <th style="border: 1px solid #ddd; padding: 8px; background: #f4f4f4; font-weight: 700; text-align: right;">Reg Holiday</th>
                                <th style="border: 1px solid #ddd; padding: 8px; background: #f4f4f4; font-weight: 700; text-align: right;">Spec Holiday</th>
                                <th style="border: 1px solid #ddd; padding: 8px; background: #f4f4f4; font-weight: 700; text-align: right;">Gross Pay</th>
                                <th style="border: 1px solid #ddd; padding: 8px; background: #f4f4f4; font-weight: 700; text-align: right;">Income Tax</th>
                                <th style="border: 1px solid #ddd; padding: 8px; background: #f4f4f4; font-weight: 700; text-align: right;">SSS</th>
                                <th style="border: 1px solid #ddd; padding: 8px; background: #f4f4f4; font-weight: 700; text-align: right;">SSS Loan</th>
                                <th style="border: 1px solid #ddd; padding: 8px; background: #f4f4f4; font-weight: 700; text-align: right;">PhilHealth</th>
                                <th style="border: 1px solid #ddd; padding: 8px; background: #f4f4f4; font-weight: 700; text-align: right;">Pag-IBIG</th>
                                <th style="border: 1px solid #ddd; padding: 8px; background: #f4f4f4; font-weight: 700; text-align: right;">Pag-IBIG Loan</th>
                                <th style="border: 1px solid #ddd; padding: 8px; background: #f4f4f4; font-weight: 700; text-align: right;">Cash Loan</th>
                                <th style="border: 1px solid #ddd; padding: 8px; background: #f4f4f4; font-weight: 700; text-align: right;">Losses/Damages</th>
                                <th style="border: 1px solid #ddd; padding: 8px; background: #f4f4f4; font-weight: 700; text-align: right;">Gross Deduction</th>
                                <th style="border: 1px solid #ddd; padding: 8px; background: #f4f4f4; font-weight: 700; text-align: right;">Net Pay</th>
                                <th style="border: 1px solid #ddd; padding: 8px; background: #f4f4f4; font-weight: 700; text-align: right;">Starting Cash</th>
                                <th style="border: 1px solid #ddd; padding: 8px; background: #f4f4f4; font-weight: 700; text-align: right;">Ending Cash</th>
                                <th style="border: 1px solid #ddd; padding: 8px; background: #f4f4f4; font-weight: 700; text-align: right;">Starting Losses</th>
                                <th style="border: 1px solid #ddd; padding: 8px; background: #f4f4f4; font-weight: 700; text-align: right;">Ending Losses</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${tableData.map(row => `
                                <tr>
                                    <td style="border: 1px solid #ddd; padding: 6px;">${row.employeeId || ''}</td>
                                    <td style="border: 1px solid #ddd; padding: 6px;">${row.lastName || ''}</td>
                                    <td style="border: 1px solid #ddd; padding: 6px;">${row.firstName || ''}</td>
                                    <td style="border: 1px solid #ddd; padding: 6px; text-align: right;">${fmt(row.totalDays)}</td>
                                    <td style="border: 1px solid #ddd; padding: 6px; text-align: right;">${fmt(row.totalOvertime)}</td>
                                    <td style="border: 1px solid #ddd; padding: 6px; text-align: right;">${fmt(row.totalAllowance)}</td>
                                    <td style="border: 1px solid #ddd; padding: 6px; text-align: right;">${fmt(row.totalLeaves)}</td>
                                    <td style="border: 1px solid #ddd; padding: 6px; text-align: right;">${fmt(row.regularHoliday)}</td>
                                    <td style="border: 1px solid #ddd; padding: 6px; text-align: right;">${fmt(row.specialHoliday)}</td>
                                    <td style="border: 1px solid #ddd; padding: 6px; text-align: right; font-weight: 600;">${fmt(row.grossPay)}</td>
                                    <td style="border: 1px solid #ddd; padding: 6px; text-align: right;">${fmt(row.totalTax)}</td>
                                    <td style="border: 1px solid #ddd; padding: 6px; text-align: right;">${fmt(row.totalSss)}</td>
                                    <td style="border: 1px solid #ddd; padding: 6px; text-align: right;">${fmt(row.totalSssLoan)}</td>
                                    <td style="border: 1px solid #ddd; padding: 6px; text-align: right;">${fmt(row.totalPhilhealth)}</td>
                                    <td style="border: 1px solid #ddd; padding: 6px; text-align: right;">${fmt(row.totalPagibig)}</td>
                                    <td style="border: 1px solid #ddd; padding: 6px; text-align: right;">${fmt(row.totalPagibigLoan)}</td>
                                    <td style="border: 1px solid #ddd; padding: 6px; text-align: right;">${fmt(row.totalCashLoanDeductions)}</td>
                                    <td style="border: 1px solid #ddd; padding: 6px; text-align: right;">${fmt(row.totalLossesDeductions)}</td>
                                    <td style="border: 1px solid #ddd; padding: 6px; text-align: right; font-weight: 600;">${fmt(row.grossDeduction)}</td>
                                    <td style="border: 1px solid #ddd; padding: 6px; text-align: right; font-weight: 600;">${fmt(row.netPay)}</td>
                                    <td style="border: 1px solid #ddd; padding: 6px; text-align: right;">${fmt(row.startingCashLoan)}</td>
                                    <td style="border: 1px solid #ddd; padding: 6px; text-align: right;">${fmt(row.endingCashLoan)}</td>
                                    <td style="border: 1px solid #ddd; padding: 6px; text-align: right;">${fmt(row.startingLosses)}</td>
                                    <td style="border: 1px solid #ddd; padding: 6px; text-align: right;">${fmt(row.endingLosses)}</td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </div>
            </div>
        `;
    };

    const renderAcknowledgementContent = (contentEl, summaryData, tableData) => {
        const fmtNum = (val) => {
            const n = Number(val) || 0;
            return 'P ' + n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
        };

        const formatDateShort = (d) => {
            if (!d) return '-';
            const date = new Date(d);
            if (isNaN(date.getTime())) return '-';
            return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
        };

        const pages = [];
        for (let i = 0; i < tableData.length; i += 6) {
            pages.push(tableData.slice(i, i + 6));
        }

        contentEl.innerHTML = pages.map(page => {
            const rows = page.map(row => {
                const grossPay = Number(row.gross_pay || row.grossPay) || 0;
                const grossDeduction = Number(row.grossDeduction) || 0;
                const netPay = Number(row.net_pay || row.netPay) || 0;
                const basicAmount = grossPay - (Number(row.totalAllowance) || 0) - (Number(row.totalOvertime) || 0) - (Number(row.regularHoliday) || 0) - (Number(row.specialHoliday) || 0) - (Number(row.totalLeaves) || 0);

                const earningsRows = [];
                earningsRows.push(`<tr>
                    <td style="border: 1px solid #000; padding: 2px 4px; font-size: 9px; text-align: left;">Basic</td>
                    <td style="border: 1px solid #000; padding: 2px 4px; font-size: 9px; text-align: right;">${fmtNum(basicAmount)}</td>
                </tr>`);

                if ((row.totalAllowance || 0) > 0) {
                    earningsRows.push(`<tr>
                        <td style="border: 1px solid #000; padding: 2px 4px; font-size: 9px; text-align: left;">Allowance</td>
                        <td style="border: 1px solid #000; padding: 2px 4px; font-size: 9px; text-align: right;">${fmtNum(row.totalAllowance)}</td>
                    </tr>`);
                }

                earningsRows.push(`<tr>
                    <td style="border: 1px solid #000; padding: 2px 4px; font-size: 9px; text-align: left;">OT</td>
                    <td style="border: 1px solid #000; padding: 2px 4px; font-size: 9px; text-align: right;">${fmtNum(row.totalOvertime || 0)}</td>
                </tr>`);

                if ((row.totalOthers || 0) > 0) {
                    earningsRows.push(`<tr>
                        <td style="border: 1px solid #000; padding: 2px 4px; font-size: 9px; text-align: left;">Others</td>
                        <td style="border: 1px solid #000; padding: 2px 4px; font-size: 9px; text-align: right;">${fmtNum(row.totalOthers)}</td>
                    </tr>`);
                }

                const deductions = [];
                if ((row.totalSss || 0) > 0) deductions.push({ label: 'SSS', amount: row.totalSss });
                if ((row.totalPhilhealth || 0) > 0) deductions.push({ label: 'PhilHealth', amount: row.totalPhilhealth });
                if ((row.totalPagibig || 0) > 0) deductions.push({ label: 'Pag-IBIG', amount: row.totalPagibig });
                if ((row.totalCashLoanDeductions || 0) > 0) deductions.push({ label: 'Cash Loan', amount: row.totalCashLoanDeductions });
                if ((row.totalLossesDeductions || 0) > 0) deductions.push({ label: 'Losses/Damages', amount: row.totalLossesDeductions });

                const deductionRows = deductions.map(d => `
                    <tr>
                        <td style="border: 1px solid #000; padding: 2px 4px; font-size: 9px; text-align: left;">${d.label}</td>
                        <td style="border: 1px solid #000; padding: 2px 4px; font-size: 9px; text-align: right;">${fmtNum(d.amount)}</td>
                    </tr>
                `).join('');

                const noDeductionsRow = deductions.length === 0 ? `<tr>
                    <td style="border: 1px solid #000; padding: 2px 4px; font-size: 9px; text-align: left;" colspan="2">No deductions</td>
                </tr>` : '';

                return `
                    <div class="acknowledgement-page" style="display: flex; gap: 0; border: 1px solid #000; padding: 0; margin-bottom: 5mm;">
                        <div style="flex: 0 0 60%; border-right: 2px dashed #000; padding: 3mm; display: flex; flex-direction: column;">
                            <div class="acknowledgement-grid" style="display: grid; grid-template-columns: 1fr 1fr; gap: 4px; margin-bottom: 6px;">
                                <div class="field" style="font-size: 9px;"><span class="field-label" style="font-weight: bold;">Name:</span> <span class="field-value">${row.lastName || ''}, ${row.firstName || ''}</span></div>
                                <div class="field" style="font-size: 9px;"><span class="field-label" style="font-weight: bold;">Code:</span> <span class="field-value">${row.employeeId || ''}</span></div>
                                <div class="field" style="font-size: 9px;"><span class="field-label" style="font-weight: bold;">From:</span> <span class="field-value">${formatDateShort(summaryData.payPeriodFrom)}</span></div>
                                <div class="field" style="font-size: 9px;"><span class="field-label" style="font-weight: bold;">To:</span> <span class="field-value">${formatDateShort(summaryData.payPeriodTo)}</span></div>
                            </div>
                            <table class="acknowledgement-table" style="width: 100%; border-collapse: collapse; font-size: 9px; margin-bottom: 6px; flex: 1;">
                                <thead>
                                    <tr>
                                        <th style="border: 1px solid #000; padding: 2px 4px; font-size: 9px; text-align: left; width: 70%;">EARNINGS</th>
                                        <th style="border: 1px solid #000; padding: 2px 4px; font-size: 9px; text-align: right; width: 30%;">AMOUNT</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    ${earningsRows.join('')}
                                </tbody>
                            </table>
                            <table class="acknowledgement-table" style="width: 100%; border-collapse: collapse; font-size: 9px; margin-bottom: 6px; flex: 1;">
                                <thead>
                                    <tr>
                                        <th style="border: 1px solid #000; padding: 2px 4px; font-size: 9px; text-align: left; width: 70%;">DEDUCTIONS</th>
                                        <th style="border: 1px solid #000; padding: 2px 4px; font-size: 9px; text-align: right; width: 30%;">AMOUNT</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    ${deductionRows}
                                    ${noDeductionsRow}
                                </tbody>
                            </table>
                            <div style="display: flex; justify-content: flex-end; font-size: 9px; margin-bottom: 6px; padding-right: 4px;">
                                <div style="display: flex; flex-direction: column; gap: 2px; align-items: flex-end;">
                                    <div><strong>Gross Pay:</strong> ${fmtNum(grossPay)}</div>
                                    <div><strong>Deductions:</strong> ${fmtNum(grossDeduction)}</div>
                                    <div><strong>Net Pay:</strong> ${fmtNum(netPay)}</div>
                                </div>
                            </div>
                            <div style="height: 10px;"></div>
                            <div style="margin-top: auto; display: flex; justify-content: space-between; font-size: 9px; padding-top: 8px; border-top: 1px solid #000;">
                                <div>
                                    <div style="border-top: 1px solid #000; width: 100px; text-align: center; padding-top: 2px;">Authorized Signature</div>
                                </div>
                                <div>
                                    <div style="border-top: 1px solid #000; width: 100px; text-align: center; padding-top: 2px;">Date</div>
                                </div>
                            </div>
                        </div>
                        <div style="flex: 0 0 40%; padding: 3mm; display: flex; flex-direction: column; background: #fff;">
                            <div style="font-weight: bold; font-size: 10px; text-align: center; margin-bottom: 6px; border-bottom: 1px solid #000; padding-bottom: 4px;">TEAR-OUT SECTION</div>
                            <div style="font-size: 9px; margin-bottom: 6px;">
                                <div><strong>Employee:</strong> ${row.lastName || ''}, ${row.firstName || ''}</div>
                                <div><strong>Code:</strong> ${row.employeeId || ''}</div>
                                <div><strong>Period:</strong> ${formatDateShort(summaryData.payPeriodFrom)} - ${formatDateShort(summaryData.payPeriodTo)}</div>
                            </div>
                            <table style="width: 100%; border-collapse: collapse; font-size: 9px; margin-bottom: 6px;">
                                <tbody>
                                    <tr><td style="border-bottom: 1px solid #ccc; padding: 2px 0;">Basic</td><td style="border-bottom: 1px solid #ccc; padding: 2px 0; text-align: right;">${fmtNum(basicAmount)}</td></tr>
                                    ${(row.totalAllowance || 0) > 0 ? `<tr><td style="border-bottom: 1px solid #ccc; padding: 2px 0;">Allowance</td><td style="border-bottom: 1px solid #ccc; padding: 2px 0; text-align: right;">${fmtNum(row.totalAllowance)}</td></tr>` : ''}
                                    <tr><td style="border-bottom: 1px solid #ccc; padding: 2px 0;">OT</td><td style="border-bottom: 1px solid #ccc; padding: 2px 0; text-align: right;">${fmtNum(row.totalOvertime || 0)}</td></tr>
                                </tbody>
                            </table>
                            <div style="font-size: 9px; margin-bottom: 6px;">
                                <div><strong>Deductions:</strong> ${fmtNum(grossDeduction)}</div>
                                ${deductions.map(d => `<div style="padding-left: 8px;">• ${d.label}: ${fmtNum(d.amount)}</div>`).join('')}
                            </div>
                            <div style="font-size: 9px; margin-bottom: 6px; font-weight: bold; border-top: 1px solid #000; padding-top: 4px;">
                                <div>Net Pay: ${fmtNum(netPay)}</div>
                            </div>
                            <div style="font-size: 9px; margin-top: auto; border-top: 1px solid #000; padding-top: 4px;">
                                <div>Start Cash: ${fmtNum(Number(row.startingCashLoan) || 0)}</div>
                                <div>End Cash: ${fmtNum(Number(row.endingCashLoan) || 0)}</div>
                            </div>
                            </div>
                        </div>
                    </div>
                `;
            }).join('');

            return `<div>${rows}</div>`;
        }).join('');
    };

    if (batchPrintBtn && batchPrintPreviewContent) {
        batchPrintBtn.addEventListener('click', () => {
            if (batchPrintActiveTab === 'acknowledgement') {
                batchPrintAcknowledgementPrinted = true;
                updateBatchFinalConfirmState();

                const existingStyle = document.getElementById('batch-print-isolation-style');
                if (existingStyle) existingStyle.remove();

                const style = document.createElement('style');
                style.id = 'batch-print-isolation-style';
                style.textContent = `
                    @media print {
                        @page { size: A4 portrait; margin: 10mm; }
                        body > *:not(#batch-print-preview-modal) { display: none !important; }
                        #batch-print-preview-modal {
                            position: static !important;
                            display: block !important;
                            background: #fff !important;
                            max-width: none !important;
                            width: 100% !important;
                            height: auto !important;
                            overflow: visible !important;
                            padding: 0 !important;
                            margin: 0 !important;
                        }
                        #batch-print-preview-modal .modal-content {
                            max-width: none !important;
                            width: 100% !important;
                            max-height: none !important;
                            overflow: visible !important;
                            box-shadow: none !important;
                            border: none !important;
                            padding: 0 !important;
                            margin: 0 !important;
                        }
                        #batch-print-preview-modal .modal-header-row {
                            display: none !important;
                        }
                        #batch-tab-summary, #batch-tab-acknowledgement {
                            display: none !important;
                        }
                        #batch-print-preview-content {
                            border: none !important;
                            padding: 0 !important;
                            margin: 0 !important;
                        }
                        .acknowledgement-page {
                            display: flex !important;
                            gap: 0 !important;
                            border: 1px solid #000 !important;
                            padding: 0 !important;
                            margin: 0 !important;
                            height: 57.4mm !important;
                            page-break-inside: avoid;
                            box-sizing: border-box !important;
                        }
                        .acknowledgement-page > div:first-child {
                            flex: 0 0 60% !important;
                            border-right: 2px dashed #000 !important;
                            padding: 3mm !important;
                            box-sizing: border-box !important;
                        }
                        .acknowledgement-page > div:last-child {
                            flex: 0 0 40% !important;
                            padding: 3mm !important;
                            box-sizing: border-box !important;
                        }
                        .acknowledgement-header {
                            display: none !important;
                        }
                    }
                `;
                document.head.appendChild(style);

                setTimeout(() => {
                    window.print();
                    setTimeout(() => style.remove(), 100);
                }, 300);
                return;
            }

            batchPrintSummaryPrinted = true;
            updateBatchFinalConfirmState();

            const existingStyle = document.getElementById('batch-print-isolation-style');
            if (existingStyle) existingStyle.remove();

            const style = document.createElement('style');
            style.id = 'batch-print-isolation-style';
            style.textContent = `
                @media print {
                    @page { size: landscape; margin: 0.3in; }
                    body > *:not(#batch-print-preview-modal) { display: none !important; }
                    #batch-print-preview-modal {
                        position: static !important;
                        display: block !important;
                        background: #fff !important;
                        max-width: none !important;
                        width: 100% !important;
                        height: auto !important;
                        overflow: visible !important;
                        padding: 0 !important;
                        margin: 0 !important;
                    }
                    #batch-print-preview-modal .modal-content {
                        max-width: none !important;
                        width: 100% !important;
                        max-height: none !important;
                        overflow: visible !important;
                        box-shadow: none !important;
                        border: none !important;
                        padding: 0 !important;
                        margin: 0 !important;
                    }
                    #batch-print-preview-modal .modal-header-row {
                        display: none !important;
                    }
                    #batch-tab-summary, #batch-tab-acknowledgement {
                        display: none !important;
                    }
                    #batch-print-preview-content {
                        border: none !important;
                        padding: 0 !important;
                        margin: 0 !important;
                    }
                    .print-summary {
                        display: flex !important;
                        flex-wrap: nowrap !important;
                        gap: 8px !important;
                        margin-bottom: 8px !important;
                    }
                    .print-summary > div {
                        flex: 1 1 0 !important;
                        min-width: 100px !important;
                        padding: 6px !important;
                    }
                    .print-summary label {
                        font-size: 9px !important;
                        margin-bottom: 2px !important;
                    }
                    .print-summary input {
                        font-size: 11px !important;
                    }
                    .print-table-wrap {
                        overflow-x: visible !important;
                    }
                    table {
                        font-size: 9px !important;
                        width: 100% !important;
                        table-layout: fixed !important;
                        border-collapse: collapse !important;
                    }
                    th, td {
                        padding: 3px 2px !important;
                        border: 1px solid #ddd !important;
                        word-wrap: break-word !important;
                        overflow: hidden !important;
                    }
                    th {
                        font-size: 9px !important;
                        font-weight: 700 !important;
                        background: #f4f4f4 !important;
                    }
                    h2 {
                        font-size: 16px !important;
                        margin-bottom: 2px !important;
                    }
                    .print-subtitle {
                        font-size: 11px !important;
                        margin-bottom: 10px !important;
                    }
                }
            `;
            document.head.appendChild(style);

            setTimeout(() => {
                window.print();
                setTimeout(() => style.remove(), 100);
            }, 300);
        });
    }

    window.__hrSalaryBatchPrint = {
        get batchPrintActiveTab() { return batchPrintActiveTab; },
        set batchPrintActiveTab(v) { batchPrintActiveTab = v; },
        get currentBatchIdForPrint() { return currentBatchIdForPrint; },
        set currentBatchIdForPrint(v) { currentBatchIdForPrint = v; },
        get batchPrintSummaryData() { return batchPrintSummaryData; },
        set batchPrintSummaryData(v) { batchPrintSummaryData = v; },
        get batchPrintTableData() { return batchPrintTableData; },
        set batchPrintTableData(v) { batchPrintTableData = v; },
        get batchPrintSummaryPrinted() { return batchPrintSummaryPrinted; },
        set batchPrintSummaryPrinted(v) { batchPrintSummaryPrinted = v; },
        get batchPrintAcknowledgementPrinted() { return batchPrintAcknowledgementPrinted; },
        set batchPrintAcknowledgementPrinted(v) { batchPrintAcknowledgementPrinted = v; },
        gatherBatchPrintData,
        setBatchPrintTab,
        updateBatchFinalConfirmState,
        renderBatchPrintPreview,
        renderAcknowledgementContent,
        get batchTabSummaryBtn() { return batchTabSummaryBtn; },
        get batchTabAcknowledgementBtn() { return batchTabAcknowledgementBtn; },
        get batchPrintBtn() { return batchPrintBtn; },
        get batchPrintPreviewContent() { return batchPrintPreviewContent; },
        get batchFinalConfirmBtn() { return batchFinalConfirmBtn; },
        get batchPrintStatusLabel() { return batchPrintStatusLabel; }
    };
}
function initializeModule(contentArea) {
    const currentTab = window.__currentTabId || 'human-resources';
    const render = ModuleComponents[currentTab] || ModuleComponents['human-resources'];
    if (typeof render !== 'function') {
        console.error('[MODULE RUNTIME ERROR]: render is not a function for tab:', currentTab);
        return;
    }
    render(contentArea);

    const addAttendanceLogBtn = document.getElementById('add-attendance-log-btn');

    if (addAttendanceLogBtn) {
        addAttendanceLogBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            switchTab('hr-salary-attendance');
        });
    }

    const makeSalaryComputationBtn = document.getElementById('make-salary-computation-btn');
    const salaryComputationModal = document.getElementById('salary-computation-modal');
    const closeSalaryComputationModal = document.getElementById('close-salary-computation-modal');
    const printPayslipBtn = document.getElementById('print-payslip-btn');
    const salaryMainView = document.getElementById('salary-main-view');
    const salaryComputationView = document.getElementById('salary-computation-view');
    const backToSalaryBtn = document.getElementById('back-to-salary-btn');
    const singleSalaryComputationBtn = document.getElementById('single-salary-computation-btn');

    if (!document.getElementById('payslip-print-style')) {
        const printStyle = document.createElement('style');
        printStyle.id = 'payslip-print-style';
        printStyle.textContent = `
            @page { size: A4 portrait; margin: 0; }
            @media print {
                html, body { background: #fff !important; margin: 0 !important; padding: 0 !important; overflow: hidden !important; }
                #salary-computation-modal { display: block !important; background: transparent !important; padding: 0 !important; margin: 0 !important; border: none !important; box-shadow: none !important; position: static !important; overflow: hidden !important; }
                .modal-content { display: block !important; background: transparent !important; padding: 0 !important; margin: 0 !important; border: none !important; box-shadow: none !important; overflow: hidden !important; }
                .modal-header-row { display: none !important; }
                .modal-body { display: block !important; padding: 0 !important; background: transparent !important; overflow: hidden !important; }
                .modal-body > div:first-child { display: none !important; }
                .modal-body > div:last-child { display: block !important; width: 100% !important; max-width: 100% !important; flex: none !important; margin: 0 !important; padding: 0 !important; overflow: hidden !important; }
                #payslip-reader { display: block !important; background: transparent !important; padding: 0 !important; margin: 0 !important; border-radius: 0 !important; overflow: visible !important; position: static !important; }
                #payslip-preview {
                    position: absolute !important;
                    left: 0 !important;
                    top: 0 !important;
                    width: 210mm;
                    min-height: 297mm;
                    padding: 20mm;
                    margin: 0;
                    box-shadow: none !important;
                    border: none !important;
                    background: #fff !important;
                    overflow: visible !important;
                    box-sizing: border-box !important;
                }
                #salary-main-view, #salary-computation-view, .sidebar, .top-bar, .header-actions, .btn-primary, .card, .tracking-cards-row, .bottom-cards-row, .salary-chart-card, .salary-history-card, .payroll-transaction-card { display: none !important; }
            }
        `;
        document.head.appendChild(printStyle);
    }

    
    const updatePayslipPreview = () => {
        const empId = document.getElementById('salary-emp-id')?.value.trim() || '-';
        const lastName = document.getElementById('salary-last-name')?.value.trim() || '-';
        const firstName = document.getElementById('salary-first-name')?.value.trim() || '-';
        const middleName = document.getElementById('salary-middle-name')?.value.trim() || '';
        const fullName = [firstName, middleName, lastName].filter(Boolean).join(' ');
        const dateFrom = document.getElementById('salary-date-from')?.value || '-';
        const dateTo = document.getElementById('salary-date-to')?.value || '-';
        const totalDays = document.getElementById('salary-total-days')?.value || '-';
        const perJobDays = document.getElementById('salary-per-job-days')?.value || '-';
        const perJobAmount = document.getElementById('salary-per-job-amount')?.value || '-';
        const totalOvertime = document.getElementById('salary-total-overtime')?.value || '-';
        const totalAllowance = document.getElementById('salary-total-allowance')?.value || '-';
        const totalLeaves = document.getElementById('salary-total-leaves')?.value || '-';
        const regularHoliday = document.getElementById('salary-regular-holiday')?.value || '-';
        const specialHoliday = document.getElementById('salary-special-holiday')?.value || '-';

        const setText = (id, val) => { const el = document.getElementById(id); if (el) el.textContent = val; };

        setText('payslip-name', fullName);
        setText('payslip-period', `${dateFrom} to ${dateTo}`);
        setText('payslip-emp-id', empId);

        const fmtNum = (val) => {
            if (!val || val === '-') return '-';
            return `P ${parseFloat(val).toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}`;
        };

        const salaryPayMode = document.getElementById('salary-pay-mode')?.value || '';
        const baseVal = salaryPayMode === 'Per Job' ? (parseFloat(perJobAmount) || 0) : (parseFloat(totalDays) || 0);

        setText('payslip-base-salary', fmtNum(baseVal));
        setText('payslip-overtime', fmtNum(totalOvertime));
        setText('payslip-allowance', fmtNum(totalAllowance));
        setText('payslip-sick-leave', fmtNum(totalLeaves));
        setText('payslip-vacation-leave', fmtNum(0));
        setText('payslip-regular-holiday', fmtNum(regularHoliday));
        setText('payslip-special-holiday', fmtNum(specialHoliday));

        const otVal = parseFloat(totalOvertime) || 0;
        const allowVal = parseFloat(totalAllowance) || 0;
        const leavesVal = parseFloat(totalLeaves) || 0;
        const regHolVal = parseFloat(regularHoliday) || 0;
        const specHolVal = parseFloat(specialHoliday) || 0;
        const grossPay = baseVal + otVal + allowVal + leavesVal + regHolVal + specHolVal;
        setText('payslip-gross-pay', grossPay > 0 ? `P ${grossPay.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}` : '-');

        const taxVal = parseFloat(document.getElementById('salary-total-tax')?.value) || 0;
        const sssVal = parseFloat(document.getElementById('salary-total-sss')?.value) || 0;
        const sssLoanVal = parseFloat(document.getElementById('salary-total-sss-loan')?.value) || 0;
        const philVal = parseFloat(document.getElementById('salary-total-philhealth')?.value) || 0;
        const pagVal = parseFloat(document.getElementById('salary-total-pagibig')?.value) || 0;
        const pagLoanVal = parseFloat(document.getElementById('salary-total-pagibig-loan')?.value) || 0;
        const cashLoanVal = parseFloat(document.getElementById('salary-total-cash-loan-deductions')?.value) || 0;
        const lossesVal = parseFloat(document.getElementById('salary-total-losses-deduction')?.value) || 0;

        setText('payslip-tax', fmtNum(taxVal));
        setText('payslip-sss', fmtNum(sssVal));
        setText('payslip-sss-loan', fmtNum(sssLoanVal));
        setText('payslip-philhealth', fmtNum(philVal));
        setText('payslip-pagibig', fmtNum(pagVal));
        setText('payslip-pagibig-loan', fmtNum(pagLoanVal));
        setText('payslip-cash-loan-deductions', fmtNum(cashLoanVal));
        setText('payslip-losses', fmtNum(lossesVal));

        const totalDeductions = sssVal + sssLoanVal + philVal + pagVal + pagLoanVal + cashLoanVal + lossesVal;
        setText('payslip-total-deductions', totalDeductions > 0 ? `P ${totalDeductions.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}` : '-');

        const netPayVal = parseFloat(document.getElementById('salary-net-pay')?.value) || 0;
        setText('payslip-net-pay', netPayVal > 0 ? `P ${netPayVal.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}` : '-');

        setText('payslip-starting-cash-advance', document.getElementById('salary-starting-cash-loan')?.value || '-');
        setText('payslip-ending-cash-advance', document.getElementById('salary-ending-cash-loan')?.value || '-');
        setText('payslip-starting-losses', document.getElementById('salary-starting-losses')?.value || '-');
        setText('payslip-ending-losses', document.getElementById('salary-ending-losses')?.value || '-');
    };

    if (printPayslipBtn) {
        printPayslipBtn.addEventListener('click', () => {
            updatePayslipPreview();
        });
    }

    const salarySearchInput = document.getElementById('salary-search-employee');
    const salarySearchResults = document.getElementById('salary-search-results');
    let salarySearchDebounce = null;

    if (salarySearchInput && salarySearchResults) {
        salarySearchInput.addEventListener('input', (e) => {
            const query = e.target.value.trim();
            if (query.length < 2) {
                salarySearchResults.style.display = 'none';
                return;
            }

            clearTimeout(salarySearchDebounce);
            salarySearchDebounce = setTimeout(async () => {
                try {
                    const res = await fetch(`/api/salary-computation/search?q=${encodeURIComponent(query)}`);
                    if (!res.ok) throw new Error('Failed to search employees');
                    const employees = await res.json();
                    renderSalarySearchResults(employees);
                } catch (err) {
                    console.error('Search error:', err);
                    salarySearchResults.style.display = 'none';
                }
            }, 300);
        });

        salarySearchInput.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                salarySearchResults.style.display = 'none';
            }
        });

        document.addEventListener('click', (e) => {
            if (!salarySearchInput.contains(e.target) && !salarySearchResults.contains(e.target)) {
                salarySearchResults.style.display = 'none';
            }
        });
    }

    function renderSalarySearchResults(employees) {
        if (!salarySearchResults) return;
        if (!employees || employees.length === 0) {
            salarySearchResults.innerHTML = '<div style="padding: 10px; color: #64748b; font-size: 13px;">No active employees found</div>';
            salarySearchResults.style.display = 'block';
            return;
        }

        salarySearchResults.innerHTML = employees.map(emp => `
            <div class="employee-search-result" data-employee-id="${emp.employee_id}" data-last-name="${emp.last_name || ''}" data-first-name="${emp.first_name || ''}" data-middle-name="${emp.middle_name || ''}" style="padding: 10px; cursor: pointer; border-bottom: 1px solid #f1f5f9; font-size: 14px;">
                <div style="font-weight: 600; color: #1a1f2e;">${emp.last_name || ''}, ${emp.first_name || ''} ${emp.middle_name || ''}</div>
                <div style="font-size: 12px; color: #64748b;">${emp.employee_id || ''}</div>
            </div>
        `).join('');
        salarySearchResults.style.display = 'block';

        salarySearchResults.querySelectorAll('.employee-search-result').forEach(item => {
            item.addEventListener('click', async () => {
                const employeeId = item.getAttribute('data-employee-id');
                const lastName = item.getAttribute('data-last-name') || '';
                const firstName = item.getAttribute('data-first-name') || '';
                const middleName = item.getAttribute('data-middle-name') || '';

                const empIdInput = document.getElementById('salary-emp-id');
                const lastNameInput = document.getElementById('salary-last-name');
                const firstNameInput = document.getElementById('salary-first-name');
                const middleNameInput = document.getElementById('salary-middle-name');

                if (empIdInput) empIdInput.value = employeeId;
                if (lastNameInput) lastNameInput.value = lastName;
                if (firstNameInput) firstNameInput.value = firstName;
                if (middleNameInput) middleNameInput.value = middleName;

                if (employeeId) {
                    try {
                        const outstandingRes = await fetch(`/api/cash-advances/outstanding/${encodeURIComponent(employeeId)}`);
                        if (outstandingRes.ok) {
                            const outstandingData = await outstandingRes.json();
                            const startingCashLoan = document.getElementById('salary-starting-cash-loan');
                            if (startingCashLoan) startingCashLoan.value = outstandingData.outstanding != null ? outstandingData.outstanding : '0.00';
                            calculateEndingCashLoan();
                        }
                    } catch (err) {
                        console.error('Failed to load starting cash loan:', err);
                    }

                    try {
                        const lossesRes = await fetch(`/api/salary-computation/outstanding/losses-damages/${encodeURIComponent(employeeId)}`);
                        if (lossesRes.ok) {
                            const lossesData = await lossesRes.json();
                            const startingLosses = document.getElementById('salary-starting-losses');
                            if (startingLosses) startingLosses.value = lossesData.outstanding != null ? lossesData.outstanding : '0.00';
                            calculateEndingLosses();
                        }
                    } catch (err) {
                        console.error('Failed to load starting losses/damages:', err);
                    }

                    try {
                        const compRes = await fetch(`/api/employee-profiles/${encodeURIComponent(employeeId)}/compensation`);
                        if (compRes.ok) {
                            const compData = await compRes.json();
                            const salaryPayMode = document.getElementById('salary-pay-mode');
                            if (salaryPayMode && compData.salary_pay_mode) {
                                salaryPayMode.value = compData.salary_pay_mode;
                            }
                            updateTotalDaysVisibility(compData.salary_pay_mode);
                        }
                    } catch (err) {
                        console.error('Failed to load employee compensation:', err);
                    }
                }

                if (salarySearchInput) salarySearchInput.value = '';
                if (salarySearchResults) salarySearchResults.style.display = 'none';
                if (typeof updatePayslipPreview === 'function') updatePayslipPreview();
                if (typeof fetchSalaryTotals === 'function') fetchSalaryTotals();
            });
        });
    }

    const openSalaryComputationModal = () => {
        if (salaryComputationModal) salaryComputationModal.style.display = 'flex';
        const dateFromEl = document.getElementById('salary-date-from');
        const dateToEl = document.getElementById('salary-date-to');
        if (dateFromEl) dateFromEl.value = '';
        if (dateToEl) dateToEl.value = '';
        updateTotalDaysVisibility();
        if (typeof updatePayslipPreview === 'function') updatePayslipPreview();
    };

    const updateTotalDaysVisibility = (payMode) => {
        const currentPayMode = payMode || document.getElementById('salary-pay-mode')?.value || '';
        const input = document.getElementById('salary-total-days');
        
        if (!input) return;
        
        if (currentPayMode === 'Per Job') {
            input.value = '0';
        }
    };

    const closeSalaryComputationModalFn = () => {
        if (salaryComputationModal) salaryComputationModal.style.display = 'none';
    };

    const salaryDateFrom = document.getElementById('salary-date-from');
    const salaryDateTo = document.getElementById('salary-date-to');
    let fetchSalaryTotals = null;

    if (salaryDateFrom && salaryDateTo) {
        fetchSalaryTotals = async () => {
            const employeeId = document.getElementById('salary-emp-id')?.value.trim();
            if (!employeeId) return;

            const from = salaryDateFrom.value;
            const to = salaryDateTo.value;
            if (!from || !to) return;

            try {
                const res = await fetch(`/api/salary-computation/totals/salary?employee_id=${encodeURIComponent(employeeId)}&date_from=${from}&date_to=${to}`);
                if (!res.ok) throw new Error('Failed to load salary totals');
                const data = await res.json();

                const totalDays = document.getElementById('salary-total-days');
                const perJobDays = document.getElementById('salary-per-job-days');
                const perJobAmount = document.getElementById('salary-per-job-amount');
                const totalAllowance = document.getElementById('salary-total-allowance');
                const totalOvertime = document.getElementById('salary-total-overtime');
                const totalLeaves = document.getElementById('salary-total-leaves');
                const regularHoliday = document.getElementById('salary-regular-holiday');
                const specialHoliday = document.getElementById('salary-special-holiday');
                const totalTax = document.getElementById('salary-total-tax');
                const totalSss = document.getElementById('salary-total-sss');
                const totalSssLoan = document.getElementById('salary-total-sss-loan');
                const totalPhilhealth = document.getElementById('salary-total-philhealth');
                const totalPagibig = document.getElementById('salary-total-pagibig');
                const totalPagibigLoan = document.getElementById('salary-total-pagibig-loan');
                const totalCashLoanDeductions = document.getElementById('salary-total-cash-loan-deductions');
                const startingLosses = document.getElementById('salary-starting-losses');
                const totalLossesDeductions = document.getElementById('salary-total-losses-deduction');
                const endingLosses = document.getElementById('salary-ending-losses');

                if (totalDays) totalDays.value = data.total_days_worked != null ? data.total_days_worked : '0';
                if (perJobDays) perJobDays.value = data.per_job_days != null ? data.per_job_days : '0';
                if (perJobAmount) perJobAmount.value = data.per_job_amount != null ? data.per_job_amount : '0';
                if (totalAllowance) totalAllowance.value = data.total_allowance != null ? data.total_allowance : '0';
                if (totalOvertime) totalOvertime.value = data.total_overtime != null ? data.total_overtime : '0';
                if (totalLeaves) totalLeaves.value = data.total_leaves != null ? data.total_leaves : '0';
                if (regularHoliday) regularHoliday.value = data.regular_holiday != null ? data.regular_holiday : '0';
                if (specialHoliday) specialHoliday.value = data.special_holiday != null ? data.special_holiday : '0';
                if (totalTax) totalTax.value = '0';
                if (totalSss) totalSss.value = data.total_sss_payment != null ? data.total_sss_payment : '0';
                if (totalSssLoan) totalSssLoan.value = data.total_sss_loan_payment != null ? data.total_sss_loan_payment : '0';
                if (totalPhilhealth) totalPhilhealth.value = data.total_philhealth_payment != null ? data.total_philhealth_payment : '0';
                if (totalPagibig) totalPagibig.value = data.total_pagibig_payment != null ? data.total_pagibig_payment : '0';
                if (totalPagibigLoan) totalPagibigLoan.value = data.total_pagibig_loan_payment != null ? data.total_pagibig_loan_payment : '0';
                if (totalCashLoanDeductions) totalCashLoanDeductions.value = data.total_cash_loan_deductions != null ? data.total_cash_loan_deductions : '0';
                if (startingLosses) startingLosses.value = data.starting_losses != null ? data.starting_losses : '0';
                if (totalLossesDeductions) totalLossesDeductions.value = data.total_losses_deductions != null ? data.total_losses_deductions : '0';
                if (endingLosses) endingLosses.value = data.ending_losses != null ? data.ending_losses : '0';
                calculateEndingCashLoan();
                calculateEndingLosses();
                calculateNetPay();
                if (typeof updatePayslipPreview === 'function') updatePayslipPreview();
                if (typeof updateTotalDaysVisibility === 'function') updateTotalDaysVisibility();
            } catch (err) {
                console.error('Failed to load salary totals:', err);
            }
        };

        salaryDateFrom.addEventListener('change', fetchSalaryTotals);
        salaryDateTo.addEventListener('change', fetchSalaryTotals);
    }

    function calculateEndingCashLoan() {
        const startingCashLoanEl = document.getElementById('salary-starting-cash-loan');
        const totalCashLoanDeductionsEl = document.getElementById('salary-total-cash-loan-deductions');
        const endingCashLoanEl = document.getElementById('salary-ending-cash-loan');

        if (!startingCashLoanEl || !totalCashLoanDeductionsEl || !endingCashLoanEl) return;

        const starting = parseFloat(startingCashLoanEl.value) || 0;
        const deductions = parseFloat(totalCashLoanDeductionsEl.value) || 0;
        const ending = starting - deductions;

        endingCashLoanEl.value = ending.toFixed(2);
        calculateNetPay();
    }

    function calculateEndingLosses() {
        const startingLossesEl = document.getElementById('salary-starting-losses');
        const totalLossesDeductionsEl = document.getElementById('salary-total-losses-deduction');
        const endingLossesEl = document.getElementById('salary-ending-losses');

        if (!startingLossesEl || !totalLossesDeductionsEl || !endingLossesEl) return;

        const starting = parseFloat(startingLossesEl.value) || 0;
        const deductions = parseFloat(totalLossesDeductionsEl.value) || 0;
        const ending = starting - deductions;

        endingLossesEl.value = ending.toFixed(2);
        calculateNetPay();
    }

    function calculateNetPay() {
        const totalDays = parseFloat(document.getElementById('salary-total-days')?.value) || 0;
        const perJobAmount = parseFloat(document.getElementById('salary-per-job-amount')?.value) || 0;
        const totalOvertime = parseFloat(document.getElementById('salary-total-overtime')?.value) || 0;
        const totalAllowance = parseFloat(document.getElementById('salary-total-allowance')?.value) || 0;
        const totalLeaves = parseFloat(document.getElementById('salary-total-leaves')?.value) || 0;
        const regularHoliday = parseFloat(document.getElementById('salary-regular-holiday')?.value) || 0;
        const specialHoliday = parseFloat(document.getElementById('salary-special-holiday')?.value) || 0;
        const totalTax = parseFloat(document.getElementById('salary-total-tax')?.value) || 0;
        const totalSss = parseFloat(document.getElementById('salary-total-sss')?.value) || 0;
        const totalSssLoan = parseFloat(document.getElementById('salary-total-sss-loan')?.value) || 0;
        const totalPhilhealth = parseFloat(document.getElementById('salary-total-philhealth')?.value) || 0;
        const totalPagibig = parseFloat(document.getElementById('salary-total-pagibig')?.value) || 0;
        const totalPagibigLoan = parseFloat(document.getElementById('salary-total-pagibig-loan')?.value) || 0;
        const totalCashLoanDeductions = parseFloat(document.getElementById('salary-total-cash-loan-deductions')?.value) || 0;
        const totalLossesDeductions = parseFloat(document.getElementById('salary-total-losses-deduction')?.value) || 0;

        const salaryPayMode = document.getElementById('salary-pay-mode')?.value || '';
        const baseIncome = salaryPayMode === 'Per Job' ? perJobAmount : totalDays;
        const totalIncome = baseIncome + totalOvertime + totalAllowance + totalLeaves + regularHoliday + specialHoliday;
        const totalDeductions = totalTax + totalSss + totalSssLoan + totalPhilhealth + totalPagibig + totalPagibigLoan + totalCashLoanDeductions + totalLossesDeductions;
        const netPay = totalIncome - totalDeductions;

        const netPayEl = document.getElementById('salary-net-pay');
        if (netPayEl) netPayEl.value = netPay.toFixed(2);
    }

    if (makeSalaryComputationBtn) {
        makeSalaryComputationBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            if (salaryComputationView) salaryComputationView.style.display = 'block';
            if (salaryMainView) salaryMainView.style.display = 'none';
            const breadcrumb = document.getElementById('breadcrumb');
            if (breadcrumb) breadcrumb.innerHTML = 'Human Resources <span>/</span> Salary <span>/</span> Salary Computation';
        });
    }

    if (backToSalaryBtn) {
        backToSalaryBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            if (salaryComputationView) salaryComputationView.style.display = 'none';
            if (salaryMainView) salaryMainView.style.display = 'block';
            const breadcrumb = document.getElementById('breadcrumb');
            if (breadcrumb) breadcrumb.innerHTML = 'Human Resources <span>/</span> Salary';
        });
    }

    if (singleSalaryComputationBtn) {
        singleSalaryComputationBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            openSalaryComputationModal();
        });
    }

    const saveSalaryComputationBtn = document.getElementById('save-salary-computation-btn');
    if (saveSalaryComputationBtn) {
        saveSalaryComputationBtn.addEventListener('click', async (e) => {
            e.preventDefault();
            e.stopPropagation();

            const employeeId = document.getElementById('salary-emp-id')?.value.trim();
            const dateFrom = document.getElementById('salary-date-from')?.value;
            const dateTo = document.getElementById('salary-date-to')?.value;

            if (!employeeId || !dateFrom || !dateTo) {
                alert('Please select an employee and date range before saving');
                return;
            }

            const netPayVal = parseFloat(document.getElementById('salary-net-pay')?.value) || 0;
            if (netPayVal < 0) {
                alert('Cannot save payroll: Net Pay is negative.');
                return;
            }

            const getValue = (id) => {
                const el = document.getElementById(id);
                return el ? (parseFloat(el.value) || 0) : 0;
            };

            const salaryPayMode = document.getElementById('salary-pay-mode')?.value || '';
            const totalDays = getValue('salary-total-days');
            const perJobAmount = getValue('salary-per-job-amount');
            const totalDaysWorked = salaryPayMode === 'Per Job' ? perJobAmount : totalDays;

            const payrollData = {
                employee_id: employeeId,
                date_start: dateFrom,
                date_end: dateTo,
                total_days_worked: totalDaysWorked,
                total_overtime_hours: getValue('salary-total-overtime'),
                total_allowance: getValue('salary-total-allowance'),
                total_leaves_usage: getValue('salary-total-leaves'),
                regular_holiday: getValue('salary-regular-holiday'),
                special_holiday: getValue('salary-special-holiday'),
                total_income_tax: getValue('salary-total-tax'),
                total_sss_payment: getValue('salary-total-sss'),
                total_sss_loan_payment: getValue('salary-total-sss-loan'),
                total_philhealth_payment: getValue('salary-total-philhealth'),
                total_pagibig_payment: getValue('salary-total-pagibig'),
                total_pagibig_loan_payment: getValue('salary-total-pagibig-loan'),
                total_cash_loan_deductions: getValue('salary-total-cash-loan-deductions'),
                starting_cash_loan: getValue('salary-starting-cash-loan'),
                ending_cash_loan: getValue('salary-ending-cash-loan'),
                total_losses_damages: getValue('salary-total-losses-deduction'),
                starting_losses_damages: getValue('salary-starting-losses'),
                ending_losses_damages: getValue('salary-ending-losses'),
                gross_pay: totalDaysWorked + getValue('salary-total-overtime') + getValue('salary-total-allowance') + getValue('salary-total-leaves') + getValue('salary-regular-holiday') + getValue('salary-special-holiday'),
                gross_deduction: getValue('salary-total-tax') + getValue('salary-total-sss') + getValue('salary-total-sss-loan') + getValue('salary-total-philhealth') + getValue('salary-total-pagibig') + getValue('salary-total-pagibig-loan') + getValue('salary-total-cash-loan-deductions') + getValue('salary-total-losses-deduction'),
                net_pay: getValue('salary-net-pay'),
                status: 'Pending'
            };

            try {
                const res = await fetch('/api/payroll', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payrollData)
                });
                if (!res.ok) {
                    const errorData = await res.json().catch(() => ({}));
                    throw new Error(errorData.error || 'Failed to save payroll');
                }
                const payroll = await res.json();
                alert(`Payroll saved successfully for employee ${employeeId}`);
                if (typeof updatePayslipPreview === 'function') updatePayslipPreview();
                if (salaryComputationModal) salaryComputationModal.style.display = 'none';
                const clearFields = () => {
                    const fields = [
                        'salary-emp-id', 'salary-date-from', 'salary-date-to',
                        'salary-total-days', 'salary-total-overtime', 'salary-total-allowance', 'salary-total-leaves',
                        'salary-regular-holiday', 'salary-special-holiday',
                        'salary-total-tax', 'salary-total-sss', 'salary-total-sss-loan',
                        'salary-total-philhealth', 'salary-total-pagibig', 'salary-total-pagibig-loan',
                        'salary-total-cash-loan-deductions', 'salary-starting-cash-loan', 'salary-ending-cash-loan',
                        'salary-total-losses-deduction', 'salary-starting-losses', 'salary-ending-losses',
                        'salary-net-pay'
                    ];
                    fields.forEach(id => {
                        const el = document.getElementById(id);
                        if (el) el.value = '';
                    });
                    updateTotalDaysVisibility();
                };
                clearFields();
                if (typeof loadPendingPayrolls === 'function') {
                    setTimeout(loadPendingPayrolls, 0);
                }
            } catch (err) {
                console.error('Save payroll error:', err);
                alert(err.message || 'Failed to save payroll');
            }
        });
    }

    const batchSalaryComputationSubtabBtn = document.getElementById('batch-salary-computation-subtab-btn');
    if (batchSalaryComputationSubtabBtn) {
        batchSalaryComputationSubtabBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
        });
    }

    const addOvertimeLogBtn = document.getElementById('add-overtime-log-btn');
    if (addOvertimeLogBtn) {
        addOvertimeLogBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            switchTab('hr-salary-overtime');
        });
    }

    const addLeaveLogBtn = document.getElementById('add-leave-log-btn');
    if (addLeaveLogBtn) {
        addLeaveLogBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            switchTab('hr-salary-leave');
        });
    }

    const addLossDamageBtn = document.getElementById('add-loss-damage-btn');
    if (addLossDamageBtn) {
        addLossDamageBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            switchTab('hr-salary-losses');
        });
    }

    const addHolidaysBtn = document.getElementById('add-holidays-btn');
    const addHolidayModal = document.getElementById('add-holiday-modal');
    const closeAddHolidayModal = document.getElementById('close-add-holiday-modal');
    const cancelAddHolidayBtn = document.getElementById('cancel-add-holiday-btn');
    const saveAddHolidayBtn = document.getElementById('save-add-holiday-btn');

    const openAddHolidayModal = () => {
        if (addHolidayModal) addHolidayModal.style.display = 'flex';
    };

    const closeAddHolidayModalFn = () => {
        if (addHolidayModal) addHolidayModal.style.display = 'none';
    };

    if (addHolidaysBtn) {
        addHolidaysBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            openAddHolidayModal();
        });
    }

    if (closeAddHolidayModal) {
        closeAddHolidayModal.addEventListener('click', closeAddHolidayModalFn);
    }

    if (cancelAddHolidayBtn) {
        cancelAddHolidayBtn.addEventListener('click', closeAddHolidayModalFn);
    }

    if (saveAddHolidayBtn) {
        saveAddHolidayBtn.addEventListener('click', async () => {
            const holidayName = document.getElementById('holiday-name')?.value.trim();
            const holidayDate = document.getElementById('holiday-date')?.value;
            const holidayType = document.getElementById('holiday-type')?.value;

            if (!holidayName || !holidayDate || !holidayType) {
                alert('Please fill in all fields');
                return;
            }

            try {
                const res = await fetch('/api/holidays', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ holiday_name: holidayName, date_of_holiday: holidayDate, type_of_holiday: holidayType })
                });
                if (!res.ok) {
                    const errorData = await res.json().catch(() => ({}));
                    throw new Error(errorData.error || 'Failed to save holiday');
                }
                alert('Holiday saved successfully');
                closeAddHolidayModalFn();
                loadYearlyHolidays();
            } catch (err) {
                console.error('Save holiday error:', err);
                alert(err.message || 'Failed to save holiday');
            }
        });
    }

    if (closeSalaryComputationModal) {
        closeSalaryComputationModal.addEventListener('click', closeSalaryComputationModalFn);
    }

    if (salaryComputationModal) {
        salaryComputationModal.addEventListener('click', (e) => {
            if (e.target === salaryComputationModal) closeSalaryComputationModalFn();
        });
    }

    if (printPayslipBtn) {
        printPayslipBtn.addEventListener('click', () => {
            alert('Print preview triggered');
        });
    }

    async function loadYearlyHolidays() {
        const tbody = document.getElementById('yearly-holidays-tbody');
        if (!tbody) return;

        try {
            const res = await fetch('/api/holidays');
            if (!res.ok) throw new Error('Failed to load holidays');
            const holidays = await res.json();
            renderYearlyHolidays(holidays);
        } catch (err) {
            console.error('Yearly holidays error:', err);
            if (tbody) {
                tbody.innerHTML = '<tr><td colspan="3" style="text-align: center; padding: 20px; color: #999;">Failed to load holidays</td></tr>';
            }
        }
    }

    function renderYearlyHolidays(holidays) {
        const tbody = document.getElementById('yearly-holidays-tbody');
        if (!tbody) return;

        if (!holidays || holidays.length === 0) {
            tbody.innerHTML = '<tr><td colspan="4" style="text-align: center; padding: 20px; color: #999;">No holidays found</td></tr>';
            return;
        }

        const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

        tbody.innerHTML = holidays.map(holiday => {
            const dateStr = holiday.date_of_holiday ? new Date(holiday.date_of_holiday).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : '';
            return `
                <tr>
                    <td>${holiday.holiday_name || ''}</td>
                    <td>${dateStr}</td>
                    <td>${holiday.type_of_holiday || ''}</td>
                    <td><button class="btn-danger delete-holiday-btn" data-holiday-id="${holiday.holiday_id}" style="padding: 4px 8px; font-size: 12px; cursor: pointer; border: none; border-radius: 4px; background: #dc3545; color: white;">Delete</button></td>
                </tr>
            `;
        }).join('');

        document.querySelectorAll('.delete-holiday-btn').forEach(btn => {
            btn.addEventListener('click', async () => {
                const holidayId = btn.dataset.holidayId;
                if (!holidayId) return;
                if (!confirm('Are you sure you want to delete this holiday?')) return;
                try {
                    const res = await fetch(`/api/holidays/${encodeURIComponent(holidayId)}`, {
                        method: 'DELETE'
                    });
                    if (!res.ok) {
                        const errorData = await res.json().catch(() => ({}));
                        throw new Error(errorData.error || 'Failed to delete holiday');
                    }
                    alert('Holiday deleted successfully');
                    loadYearlyHolidays();
                } catch (err) {
                    alert(err.message || 'Failed to delete holiday');
                }
            });
        });
    }

    async function loadPendingPayrolls() {
        const tbody = document.getElementById('salary-overview-tbody');
        if (!tbody) return;

        try {
            const res = await fetch('/api/payroll/status/Pending');
            if (!res.ok) throw new Error('Failed to load pending payrolls');
            const payrolls = await res.json();

            if (!payrolls || payrolls.length === 0) {
                tbody.innerHTML = '<tr><td colspan="28" style="text-align: center; padding: 20px; color: #999;">No pending payrolls</td></tr>';
                const employeeCountEl = document.getElementById('salary-overview-employee-count');
                const grossPayEl = document.getElementById('salary-overview-gross-pay');
                const grossDeductionEl = document.getElementById('salary-overview-gross-deduction');
                const netPayEl = document.getElementById('salary-overview-net-pay');
                const startingPayPeriodEl = document.getElementById('salary-overview-starting-pay-period');
                const endingPayPeriodEl = document.getElementById('salary-overview-ending-pay-period');
                if (employeeCountEl) employeeCountEl.value = 0;
                if (grossPayEl) grossPayEl.value = '0.00';
                if (grossDeductionEl) grossDeductionEl.value = '0.00';
                if (netPayEl) netPayEl.value = '0.00';
                if (startingPayPeriodEl) startingPayPeriodEl.value = '';
                if (endingPayPeriodEl) endingPayPeriodEl.value = '';
                return;
            }

            const fmt = (val) => Number(val || 0).toFixed(2);

            tbody.innerHTML = payrolls.map((p) => {
                const grossPay = (Number(p.total_days_worked) || 0) + (Number(p.total_overtime_hours) || 0) + (Number(p.total_allowance) || 0) + (Number(p.total_leaves_usage) || 0) + (Number(p.regular_holiday) || 0) + (Number(p.special_holiday) || 0);
                const grossDeduction = (Number(p.total_income_tax) || 0) + (Number(p.total_sss_payment) || 0) + (Number(p.total_sss_loan_payment) || 0) + (Number(p.total_philhealth_payment) || 0) + (Number(p.total_pagibig_payment) || 0) + (Number(p.total_pagibig_loan_payment) || 0) + (Number(p.total_cash_loan_deductions) || 0) + (Number(p.total_losses_damages) || 0);
                const pdfFilename = `payslip_${p.employee_id}_${String(p.date_start).split('T')[0]}_to_${String(p.date_end).split('T')[0]}.pdf`;
                return `
                    <tr>
                        <td>${p.payroll_id || ''}</td>
                        <td>${p.employee_id || ''}</td>
                        <td>${p.last_name || ''}</td>
                        <td>${p.first_name || ''}</td>
                        <td>${fmt(p.total_days_worked)}</td>
                        <td>${fmt(p.total_overtime_hours)}</td>
                        <td>${fmt(p.total_allowance)}</td>
                        <td>${fmt(p.total_leaves_usage)}</td>
                        <td>${fmt(p.regular_holiday)}</td>
                        <td>${fmt(p.special_holiday)}</td>
                        <td>${fmt(grossPay)}</td>
                        <td>${fmt(p.total_income_tax)}</td>
                        <td>${fmt(p.total_sss_payment)}</td>
                        <td>${fmt(p.total_sss_loan_payment)}</td>
                        <td>${fmt(p.total_philhealth_payment)}</td>
                        <td>${fmt(p.total_pagibig_payment)}</td>
                        <td>${fmt(p.total_pagibig_loan_payment)}</td>
                        <td>${fmt(p.total_cash_loan_deductions)}</td>
                        <td>${fmt(p.total_losses_damages)}</td>
                        <td>${fmt(grossDeduction)}</td>
                        <td>${fmt(p.net_pay)}</td>
                        <td>${fmt(p.starting_cash_loan)}</td>
                        <td>${fmt(p.ending_cash_loan)}</td>
                        <td>${fmt(p.starting_losses_damages)}</td>
                        <td>${fmt(p.ending_losses_damages)}</td>
                        <td style="text-align: center;"><a href="/api/payroll/${encodeURIComponent(p.payroll_id)}/pdf-file" target="_blank" title="Open PDF" style="font-size: 20px; color: #dc3545; text-decoration: none;">📄</a></td>
                        <td style="text-align: center;"><button class="btn-danger" data-payroll-id="${p.payroll_id}" style="padding: 4px 8px; font-size: 12px; cursor: pointer;">Delete</button></td>
                    </tr>
                `;
            }).join('');

            const totalGrossPay = payrolls.reduce((sum, p) => sum + ((Number(p.total_days_worked) || 0) + (Number(p.total_overtime_hours) || 0) + (Number(p.total_allowance) || 0) + (Number(p.total_leaves_usage) || 0) + (Number(p.regular_holiday) || 0) + (Number(p.special_holiday) || 0)), 0);
            const totalGrossDeduction = payrolls.reduce((sum, p) => sum + ((Number(p.total_income_tax) || 0) + (Number(p.total_sss_payment) || 0) + (Number(p.total_sss_loan_payment) || 0) + (Number(p.total_philhealth_payment) || 0) + (Number(p.total_pagibig_payment) || 0) + (Number(p.total_pagibig_loan_payment) || 0) + (Number(p.total_cash_loan_deductions) || 0) + (Number(p.total_losses_damages) || 0)), 0);
            const totalNetPay = payrolls.reduce((sum, p) => sum + (Number(p.net_pay) || 0), 0);
            const employeeCount = payrolls.length;

            const employeeCountEl = document.getElementById('salary-overview-employee-count');
            const grossPayEl = document.getElementById('salary-overview-gross-pay');
            const grossDeductionEl = document.getElementById('salary-overview-gross-deduction');
            const netPayEl = document.getElementById('salary-overview-net-pay');
            const startingPayPeriodEl = document.getElementById('salary-overview-starting-pay-period');
            const endingPayPeriodEl = document.getElementById('salary-overview-ending-pay-period');

            const startDates = payrolls.map(p => p.date_start).filter(Boolean);
            const endDates = payrolls.map(p => p.date_end).filter(Boolean);
            const startingPayPeriod = startDates.length ? new Date(Math.min(...startDates.map(d => new Date(d).getTime()))) : null;
            const endingPayPeriod = endDates.length ? new Date(Math.max(...endDates.map(d => new Date(d).getTime()))) : null;

            const formatDateShort = (date) => {
                if (!date || isNaN(date.getTime())) return '';
                return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
            };

            if (employeeCountEl) employeeCountEl.value = employeeCount;
            if (grossPayEl) grossPayEl.value = totalGrossPay.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2});
            if (grossDeductionEl) grossDeductionEl.value = totalGrossDeduction.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2});
            if (netPayEl) netPayEl.value = totalNetPay.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2});
            if (startingPayPeriodEl) startingPayPeriodEl.value = formatDateShort(startingPayPeriod);
            if (endingPayPeriodEl) endingPayPeriodEl.value = formatDateShort(endingPayPeriod);

            tbody.querySelectorAll('.btn-danger').forEach(btn => {
                btn.addEventListener('click', async (e) => {
                    const payrollId = e.target.dataset.payrollId;
                    if (!payrollId) return;
                    if (!confirm('Delete this payroll and its PDF?')) return;
                    try {
                        const res = await fetch(`/api/payroll/${encodeURIComponent(payrollId)}`, { method: 'DELETE' });
                        if (!res.ok) throw new Error('Failed to delete payroll');
                        const row = e.target.closest('tr');
                        if (row) row.remove();
                    } catch (err) {
                        alert(err.message || 'Failed to delete payroll');
                    }
                });
            });
        } catch (err) {
            console.error('Failed to load pending payrolls:', err);
            tbody.innerHTML = '<tr><td colspan="28" style="text-align: center; padding: 20px; color: #999;">Failed to load payrolls</td></tr>';
            const employeeCountEl = document.getElementById('salary-overview-employee-count');
            const grossPayEl = document.getElementById('salary-overview-gross-pay');
            const grossDeductionEl = document.getElementById('salary-overview-gross-deduction');
            const netPayEl = document.getElementById('salary-overview-net-pay');
            const startingPayPeriodEl = document.getElementById('salary-overview-starting-pay-period');
            const endingPayPeriodEl = document.getElementById('salary-overview-ending-pay-period');
            if (employeeCountEl) employeeCountEl.value = 0;
            if (grossPayEl) grossPayEl.value = '0.00';
            if (grossDeductionEl) grossDeductionEl.value = '0.00';
            if (netPayEl) netPayEl.value = '0.00';
            if (startingPayPeriodEl) startingPayPeriodEl.value = '';
            if (endingPayPeriodEl) endingPayPeriodEl.value = '';
        }
    }

    async function loadSalaryHistory() {
        const tbody = document.getElementById('salary-history-tbody');
        if (!tbody) return;

        try {
            const res = await fetch('/api/payroll/all');
            if (!res.ok) throw new Error('Failed to load salary history');
            const payrolls = await res.json();

            if (!payrolls || payrolls.length === 0) {
                tbody.innerHTML = '<tr><td colspan="27" style="text-align: center; padding: 20px; color: #999;">No payroll history</td></tr>';
                return;
            }

            const fmt = (val) => Number(val || 0).toFixed(2);

            tbody.innerHTML = payrolls.map((p) => {
                const grossPay = (Number(p.gross_pay) && Number(p.gross_pay) !== 0) ? Number(p.gross_pay) : ((Number(p.total_days_worked) || 0) + (Number(p.total_overtime_hours) || 0) + (Number(p.total_allowance) || 0) + (Number(p.total_leaves_usage) || 0) + (Number(p.regular_holiday) || 0) + (Number(p.special_holiday) || 0));
                const grossDeduction = (Number(p.gross_deduction) && Number(p.gross_deduction) !== 0) ? Number(p.gross_deduction) : ((Number(p.total_income_tax) || 0) + (Number(p.total_sss_payment) || 0) + (Number(p.total_sss_loan_payment) || 0) + (Number(p.total_philhealth_payment) || 0) + (Number(p.total_pagibig_payment) || 0) + (Number(p.total_pagibig_loan_payment) || 0) + (Number(p.total_cash_loan_deductions) || 0) + (Number(p.total_losses_damages) || 0));
                return `
                    <tr>
                        <td>${p.payroll_id || ''}</td>
                        <td>${p.employee_id || ''}</td>
                        <td>${p.last_name || ''}</td>
                        <td>${p.first_name || ''}</td>
                        <td style="text-align: center;"><button class="view-payslip-btn" data-payroll-id="${p.payroll_id}" data-employee-id="${p.employee_id}" data-date-start="${p.date_start || ''}" data-date-end="${p.date_end || ''}" style="background: none; border: none; cursor: pointer; padding: 4px;"><svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="#dc3545" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg></button></td>
                        <td><span style="background: ${p.status === 'Paid' ? '#d4edda' : '#fff3cd'}; color: ${p.status === 'Paid' ? '#155724' : '#856404'}; padding: 2px 8px; border-radius: 4px; font-size: 12px; font-weight: 600;">${p.status || 'Pending'}</span></td>
                        <td>${fmt(p.total_days_worked)}</td>
                        <td>${fmt(p.total_overtime_hours)}</td>
                        <td>${fmt(p.total_allowance)}</td>
                        <td>${fmt(p.total_leaves_usage)}</td>
                        <td>${fmt(p.regular_holiday)}</td>
                        <td>${fmt(p.special_holiday)}</td>
                        <td>${fmt(grossPay)}</td>
                        <td>${fmt(p.total_income_tax)}</td>
                        <td>${fmt(p.total_sss_payment)}</td>
                        <td>${fmt(p.total_sss_loan_payment)}</td>
                        <td>${fmt(p.total_philhealth_payment)}</td>
                        <td>${fmt(p.total_pagibig_payment)}</td>
                        <td>${fmt(p.total_pagibig_loan_payment)}</td>
                        <td>${fmt(p.total_cash_loan_deductions)}</td>
                        <td>${fmt(p.total_losses_damages)}</td>
                        <td>${fmt(grossDeduction)}</td>
                        <td>${fmt(p.net_pay)}</td>
                        <td>${fmt(p.starting_cash_loan)}</td>
                        <td>${fmt(p.ending_cash_loan)}</td>
                        <td>${fmt(p.starting_losses_damages)}</td>
                        <td>${fmt(p.ending_losses_damages)}</td>
                    </tr>
                `;
            }).join('');
        } catch (err) {
            console.error('Failed to load salary history:', err);
            tbody.innerHTML = '<tr><td colspan="27" style="text-align: center; padding: 20px; color: #999;">Failed to load salary history</td></tr>';
        }
    }

    const salarySortState = { col: null, dir: 1 };
    const applySalarySort = () => {
        document.querySelectorAll('th.sortable .sort-arrow').forEach(a => a.textContent = '⇅');
        if (!salarySortState.col) return;
        const tbody = document.getElementById('salary-history-tbody');
        if (!tbody) return;
        const rows = Array.from(tbody.querySelectorAll('tr'));
        const colMap = { payroll_id: 0, employee_id: 1, last_name: 2 };
        const colIndex = colMap[salarySortState.col];
        if (colIndex === undefined) return;
        rows.sort((a, b) => {
            const va = a.children[colIndex].textContent.trim();
            const vb = b.children[colIndex].textContent.trim();
            if (salarySortState.col === 'payroll_id') {
                return va.localeCompare(vb, undefined, { numeric: true }) * salarySortState.dir;
            }
            return va.localeCompare(vb) * salarySortState.dir;
        });
        rows.forEach(r => tbody.appendChild(r));
        const arrow = document.querySelector(`th.sortable[data-sort="${salarySortState.col}"] .sort-arrow`);
        if (arrow) arrow.textContent = salarySortState.dir === 1 ? '▲' : '▼';
    };
    document.querySelectorAll('th.sortable').forEach(th => {
        th.onclick = () => {
            const col = th.dataset.sort;
            if (salarySortState.col === col) salarySortState.dir *= -1;
            else { salarySortState.col = col; salarySortState.dir = 1; }
            applySalarySort();
        };
    });

    async function loadMonthlySalaryComparison() {
        const valueEl = document.getElementById('monthly-salary-value');
        const trendEl = document.getElementById('monthly-salary-trend');
        const arrowEl = document.getElementById('monthly-salary-arrow');
        const percentEl = document.getElementById('monthly-salary-percent');

        if (!valueEl || !trendEl || !arrowEl || !percentEl) return;

        try {
            const res = await fetch('/api/payroll/totals/monthly-comparison');
            if (!res.ok) throw new Error('Failed to load monthly salary comparison');
            const data = await res.json();

            const currentNetPay = parseFloat(data.currentNetPay) || 0;
            valueEl.textContent = `P ${currentNetPay.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}`;

            if (data.trend === 'increase') {
                arrowEl.innerHTML = '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="' + data.arrowColor + '" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:middle;margin-right:2px;"><polyline points="23 18 13.5 8.5 8.5 13.5 1 6"></polyline><polyline points="17 18 23 18 23 12"></polyline></svg>';
                trendEl.style.color = data.arrowColor;
                percentEl.textContent = `${data.percentageChange}%`;
                trendEl.style.display = 'inline-flex';
            } else if (data.trend === 'decrease') {
                arrowEl.innerHTML = '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="' + data.arrowColor + '" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:middle;margin-right:2px;"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline><polyline points="17 6 23 6 23 12"></polyline></svg>';
                trendEl.style.color = data.arrowColor;
                percentEl.textContent = `${data.percentageChange}%`;
                trendEl.style.display = 'inline-flex';
            } else {
                trendEl.style.display = 'none';
            }
        } catch (err) {
            console.error('Failed to load monthly salary comparison:', err);
            valueEl.textContent = 'P 0.00';
            trendEl.style.display = 'none';
        }
    }

    loadPendingPayrolls();
    loadSalaryHistory();
    loadYearlyHolidays();
    loadMonthlySalaryComparison();

    document.addEventListener('click', (e) => {
        const btn = e.target.closest('.view-payslip-btn');
        if (!btn) return;

        const payrollId = btn.getAttribute('data-payroll-id');
        const employeeId = btn.getAttribute('data-employee-id');
        const dateStart = btn.getAttribute('data-date-start');
        const dateEnd = btn.getAttribute('data-date-end');

        if (!payrollId || !employeeId || !dateStart || !dateEnd) return;

        const formatDateForFile = (dateStr) => {
            if (!dateStr) return '';
            const d = new Date(dateStr);
            const y = d.getFullYear();
            const m = String(d.getMonth() + 1).padStart(2, '0');
            const day = String(d.getDate()).padStart(2, '0');
            return `${y}-${m}-${day}`;
        };

        const start = formatDateForFile(dateStart);
        const end = formatDateForFile(dateEnd);
        const url = `/api/payroll/${encodeURIComponent(payrollId)}/pdf-file`;

        window.open(url, '_blank');
    });

    let pendingBatchConfirmData = null;

    const batchPrint = window.__hrSalaryBatchPrint;
    const confirmBatchPayrollBtn = document.getElementById('confirm-batch-payroll-btn');
    if (confirmBatchPayrollBtn && batchPrint) {
        confirmBatchPayrollBtn.addEventListener('click', async () => {
            const tbody = document.getElementById('salary-overview-tbody');
            if (!tbody) return;

            const payrollIds = [];
            tbody.querySelectorAll('tr').forEach(row => {
                const firstCell = row.querySelector('td');
                if (firstCell) {
                    const payrollId = firstCell.textContent.trim();
                    if (payrollId && payrollId !== 'No pending payrolls' && payrollId !== 'Failed to load payrolls') {
                        payrollIds.push(payrollId);
                    }
                }
            });

            if (payrollIds.length === 0) {
                alert('No pending payrolls to confirm');
                return;
            }

            const rows = Array.from(tbody.querySelectorAll('tr')).filter(row => {
                const firstCell = row.querySelector('td');
                const payrollId = firstCell?.textContent.trim();
                return payrollId && payrollId !== 'No pending payrolls' && payrollId !== 'Failed to load payrolls';
            });

            const employeeCountEl = document.getElementById('salary-overview-employee-count');
            const grossPayEl = document.getElementById('salary-overview-gross-pay');
            const grossDeductionEl = document.getElementById('salary-overview-gross-deduction');
            const netPayEl = document.getElementById('salary-overview-net-pay');
            const startingPayPeriodEl = document.getElementById('salary-overview-starting-pay-period');
            const endingPayPeriodEl = document.getElementById('salary-overview-ending-pay-period');

            batchPrint.batchPrintSummaryData = {
                payPeriod: startingPayPeriodEl?.value && endingPayPeriodEl?.value ? `${startingPayPeriodEl.value} - ${endingPayPeriodEl.value}` : '-',
                payPeriodFrom: startingPayPeriodEl?.value || '',
                payPeriodTo: endingPayPeriodEl?.value || '',
                employeeCount: employeeCountEl?.value || rows.length,
                grossPay: grossPayEl?.value || '0.00',
                grossDeduction: grossDeductionEl?.value || '0.00',
                netPay: netPayEl?.value || '0.00'
            };

            pendingBatchConfirmData = {
                payrollIds: payrollIds,
                payPeriodStart: startingPayPeriodEl?.value || '',
                payPeriodEnd: endingPayPeriodEl?.value || ''
            };

            batchPrint.batchPrintTableData = rows.map(row => {
                const cells = row.querySelectorAll('td');
                return {
                    employeeId: cells[1]?.textContent.trim() || '',
                    lastName: cells[2]?.textContent.trim() || '',
                    firstName: cells[3]?.textContent.trim() || '',
                    totalDays: parseFloat(cells[4]?.textContent) || 0,
                    totalOvertime: parseFloat(cells[5]?.textContent) || 0,
                    totalAllowance: parseFloat(cells[6]?.textContent) || 0,
                    totalLeaves: parseFloat(cells[7]?.textContent) || 0,
                    regularHoliday: parseFloat(cells[8]?.textContent) || 0,
                    specialHoliday: parseFloat(cells[9]?.textContent) || 0,
                    grossPay: parseFloat(cells[10]?.textContent) || 0,
                    totalTax: parseFloat(cells[11]?.textContent) || 0,
                    totalSss: parseFloat(cells[12]?.textContent) || 0,
                    totalSssLoan: parseFloat(cells[13]?.textContent) || 0,
                    totalPhilhealth: parseFloat(cells[14]?.textContent) || 0,
                    totalPagibig: parseFloat(cells[15]?.textContent) || 0,
                    totalPagibigLoan: parseFloat(cells[16]?.textContent) || 0,
                    totalCashLoanDeductions: parseFloat(cells[17]?.textContent) || 0,
                    totalLossesDeductions: parseFloat(cells[18]?.textContent) || 0,
                    grossDeduction: parseFloat(cells[19]?.textContent) || 0,
                    netPay: parseFloat(cells[20]?.textContent) || 0,
                    startingCashLoan: parseFloat(cells[21]?.textContent) || 0,
                    endingCashLoan: parseFloat(cells[22]?.textContent) || 0,
                    startingLosses: parseFloat(cells[23]?.textContent) || 0,
                    endingLosses: parseFloat(cells[24]?.textContent) || 0
                };
            });

            const negativeNetPayRow = batchPrint.batchPrintTableData.find(row => row.netPay < 0);
            if (negativeNetPayRow) {
                alert(`Cannot confirm batch payroll: Employee ${negativeNetPayRow.employeeId || ''} has negative Net Pay (${negativeNetPayRow.netPay.toFixed(2)}).`);
                return;
            }

            const batchPrintPreviewModal = document.getElementById('batch-print-preview-modal');
            if (!batchPrintPreviewModal) return;

            if (confirmBatchPayrollBtn.disabled) return;
            confirmBatchPayrollBtn.disabled = true;

            try {
                try {
                    const gathered = await batchPrint.gatherBatchPrintData();
                    if (gathered) {
                        batchPrint.batchPrintSummaryData = gathered.summaryData;
                        batchPrint.batchPrintTableData = gathered.tableData;
                    }
                } catch (e) {
                    console.error('Failed to gather batch print data:', e);
                }

                batchPrint.currentBatchIdForPrint = null;
                batchPrint.batchPrintSummaryPrinted = false;
                batchPrint.batchPrintAcknowledgementPrinted = false;
                batchPrint.updateBatchFinalConfirmState();

                if (batchPrintStatusLabel) batchPrintStatusLabel.style.display = '';
                if (batchFinalConfirmBtn) batchFinalConfirmBtn.style.display = '';

                batchPrintPreviewModal.style.display = 'flex';
                batchPrint.setBatchPrintTab('summary');

                batchPrint.renderBatchPrintPreview(batchPrint.batchPrintSummaryData, batchPrint.batchPrintTableData, 'summary');
            } catch (err) {
                console.error('Open batch print preview error:', err);
                alert(err.message || 'Failed to open batch payroll preview');
            } finally {
                confirmBatchPayrollBtn.disabled = false;
            }
        });
    }

    if (batchPrint && batchPrint.batchFinalConfirmBtn) {
        batchPrint.batchFinalConfirmBtn.addEventListener('click', async () => {
            if (batchPrint.batchFinalConfirmBtn.disabled) return;
            if (!pendingBatchConfirmData) {
                alert('No batch payroll data available to confirm.');
                return;
            }

            const batchPrintPreviewModal = document.getElementById('batch-print-preview-modal');
            const previousLabel = batchPrint.batchFinalConfirmBtn.textContent;
            batchPrint.batchFinalConfirmBtn.disabled = true;
            batchPrint.batchFinalConfirmBtn.textContent = 'Confirming...';
            batchPrint.batchFinalConfirmBtn.style.cursor = 'not-allowed';
            batchPrint.batchFinalConfirmBtn.style.opacity = '0.6';

            try {
                const res = await fetch('/api/batch-payroll/confirm', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        payroll_ids: pendingBatchConfirmData.payrollIds,
                        pay_period_start: pendingBatchConfirmData.payPeriodStart,
                        pay_period_end: pendingBatchConfirmData.payPeriodEnd
                    })
                });

                if (!res.ok) {
                    const err = await res.json().catch(() => ({}));
                    throw new Error(err.error || 'Failed to confirm batch payroll');
                }

                const result = await res.json();

                if (result.batch && result.batch.batch_payroll_id) {
                    batchPrint.currentBatchIdForPrint = result.batch.batch_payroll_id;
                }

                await loadPendingPayrolls();
                await loadBatchPayrolls();
                await loadSalaryHistory();
                await loadMonthlySalaryComparison();
                pendingBatchConfirmData = null;
                batchPrint.batchPrintSummaryPrinted = false;
                batchPrint.batchPrintAcknowledgementPrinted = false;
                batchPrint.updateBatchFinalConfirmState();

                if (batchPrintPreviewModal) batchPrintPreviewModal.style.display = 'none';

                const confirmedModal = document.getElementById('batch-confirmed-modal');
                if (confirmedModal) {
                    confirmedModal.style.display = 'flex';
                } else {
                    alert('Batch payroll confirmed successfully.');
                }
            } catch (err) {
                console.error('Final confirm batch payroll error:', err);
                alert(err.message || 'Failed to confirm batch payroll');
            } finally {
                batchPrint.batchFinalConfirmBtn.textContent = previousLabel;
                batchPrint.updateBatchFinalConfirmState();
            }
        });
    }

    async function loadBatchPayrolls() {
        const tbody = document.getElementById('batch-payroll-tbody');
        if (!tbody) return;

        try {
            const res = await fetch('/api/batch-payroll');
            if (!res.ok) throw new Error('Failed to load batch payrolls');
            const batches = await res.json();

            if (!batches || batches.length === 0) {
                tbody.innerHTML = '<tr><td colspan="10" style="text-align: center; padding: 20px; color: #999;">No batch payrolls found</td></tr>';
                return;
            }

            const formatDate = (dateStr) => {
                if (!dateStr) return '';
                const date = new Date(dateStr);
                if (isNaN(date.getTime())) return '';
                return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
            };

            tbody.innerHTML = batches.map(batch => `
                <tr>
                    <td>${formatDate(batch.created_at)}</td>
                    <td>${formatDate(batch.pay_period_start)}</td>
                    <td>${formatDate(batch.pay_period_end)}</td>
                    <td>${batch.batch_reference || ''}</td>
                    <td>${batch.payroll_count || 0}</td>
                    <td>${Number(batch.total_gross_pay).toFixed(2)}</td>
                    <td>${Number(batch.total_gross_deduction).toFixed(2)}</td>
                    <td>${Number(batch.total_net_pay).toFixed(2)}</td>
                    <td><span style="background: ${batch.status === 'Paid' ? '#d4edda' : '#FFF3CD'}; color: ${batch.status === 'Paid' ? '#155724' : '#856404'}; padding: 2px 8px; border-radius: 4px; font-size: 12px; font-weight: 600;">${batch.status || 'Pending'}</span></td>
                    <td style="padding: 2px; margin: 0; white-space: nowrap;">
                        <button class="btn-primary print-payroll-btn" data-batch-id="${batch.batch_payroll_id}" style="padding: 4px 10px; font-size: 12px; cursor: pointer; flex: 1; min-width: 70px; text-align: center;">Print</button>
                        <button class="btn-reject disburse-payroll-btn" data-batch-id="${batch.batch_payroll_id}" style="padding: 4px 10px; font-size: 12px; cursor: pointer; margin-left: 6px; background: #dc3545; color: white; border: none; border-radius: 4px; flex: 1; min-width: 70px; text-align: center;">Disburse</button>
                    </td>
                </tr>
            `).join('');
        } catch (err) {
            console.error('Failed to load batch payrolls:', err);
            tbody.innerHTML = '<tr><td colspan="10" style="text-align: center; padding: 20px; color: #999;">Failed to load batch payrolls</td></tr>';
        }
    }

    loadPendingPayrolls();
    loadSalaryHistory();
    loadYearlyHolidays();
    loadMonthlySalaryComparison();
    loadBatchPayrolls();

    const batchPayrollTbody = document.getElementById('batch-payroll-tbody');
    if (batchPayrollTbody) {
        batchPayrollTbody.addEventListener('click', (e) => {
            const printBtn = e.target.closest('.print-payroll-btn');
            if (!printBtn) return;
            const batchId = printBtn.dataset.batchId;
            if (!batchId) return;
            if (typeof openBatchPrintPreviewForBatch === 'function') {
                openBatchPrintPreviewForBatch(batchId, true);
            }
        });
    }

    const openBatchPrintPreviewForBatch = async (batchId, readOnly = false) => {
        try {
            const res = await fetch(`/api/batch-payroll/${encodeURIComponent(batchId)}/print-data`);
            if (!res.ok) {
                const errorData = await res.json().catch(() => ({}));
                throw new Error(errorData.error || `HTTP ${res.status}: Failed to load batch print data`);
            }
            const { summaryData, tableData } = await res.json();

            batchPrintSummaryData = summaryData;
            batchPrintTableData = tableData;
            currentBatchIdForPrint = batchId;

            batchPrintSummaryPrinted = false;
            batchPrintAcknowledgementPrinted = false;
            batchPrint.updateBatchFinalConfirmState();

            if (readOnly) {
                if (batchPrintStatusLabel) batchPrintStatusLabel.style.display = 'none';
                if (batchFinalConfirmBtn) batchFinalConfirmBtn.style.display = 'none';
            } else {
                if (batchPrintStatusLabel) batchPrintStatusLabel.style.display = '';
                if (batchFinalConfirmBtn) batchFinalConfirmBtn.style.display = '';
            }

            setBatchPrintTab('summary');
            renderBatchPrintPreview(batchPrintSummaryData, batchPrintTableData, 'summary');

            if (batchPrintPreviewModal) {
                batchPrintPreviewModal.style.display = 'flex';
            }
        } catch (err) {
            console.error('Failed to open batch print preview:', err);
            alert(err.message || 'Failed to open batch payroll preview');
        }
    };

    const batchSalaryModal = document.getElementById('batch-salary-modal');
    const openBatchSalaryModalBtn = document.getElementById('batch-salary-computation-subtab-btn');
    const closeBatchSalaryModalBtn = document.getElementById('close-batch-salary-modal');

    if (openBatchSalaryModalBtn && batchSalaryModal) {
        openBatchSalaryModalBtn.addEventListener('click', async () => {
            batchSalaryModal.style.display = 'flex';
            await loadDepartments();
        });
    }

    if (closeBatchSalaryModalBtn && batchSalaryModal) {
        closeBatchSalaryModalBtn.addEventListener('click', () => {
            batchSalaryModal.style.display = 'none';
            clearBatchSalaryModal();
        });
    }

    if (batchSalaryModal) {
        batchSalaryModal.addEventListener('click', (e) => {
            if (e.target === batchSalaryModal) {
                batchSalaryModal.style.display = 'none';
                clearBatchSalaryModal();
            }
        });
    }

    const loadDepartments = async () => {
        const batchDepartmentSelect = document.getElementById('batch-search-employee');
        if (!batchDepartmentSelect) return;
        try {
            const res = await fetch('/api/organizational-units?status=Active');
            if (!res.ok) return;
            const units = await res.json();
            batchDepartmentSelect.innerHTML = '<option value="">Select Department</option><option value="All">All Departments</option>';
            units.forEach(unit => {
                const option = document.createElement('option');
                option.value = unit.unit_name;
                option.textContent = unit.unit_name;
                batchDepartmentSelect.appendChild(option);
            });
        } catch (err) {
            console.error('Failed to load departments:', err);
        }
    };

    const clearBatchSalaryModal = () => {
        const batchDepartmentSelect = document.getElementById('batch-search-employee');
        const batchDateFrom = document.getElementById('batch-date-from');
        const batchDateTo = document.getElementById('batch-date-to');
        const batchEmployeeFilters = document.getElementById('batch-employee-filters');
        const batchSalaryTbody = document.getElementById('batch-salary-tbody');

        if (batchDepartmentSelect) batchDepartmentSelect.innerHTML = '<option value="">Select Department</option><option value="All">All Departments</option>';
        if (batchDateFrom) batchDateFrom.value = '';
        if (batchDateTo) batchDateTo.value = '';
        if (batchEmployeeFilters) batchEmployeeFilters.innerHTML = '<span id="batch-employee-filter-label" style="font-size: 14px; font-weight: 600; color: #1a1f2e;">Employees:</span><span id="batch-employee-filter-hint" style="font-size: 13px; color: #888;">Select a department to load active employees</span>';
        if (batchSalaryTbody) batchSalaryTbody.innerHTML = '<tr><td colspan="24" style="text-align: center; padding: 20px; color: #999;">Select department, employees, and date range, then click Compute</td></tr>';
        employeeDataMap.clear();
        batchComputedRows = [];
    };

    const employeeDataMap = new Map();
    let batchComputedRows = [];

    const computeBatchSalary = async () => {
        const from = document.getElementById('batch-date-from')?.value;
        const to = document.getElementById('batch-date-to')?.value;
        const tbody = document.getElementById('batch-salary-tbody');

        if (!from || !to) {
            alert('Please select both date from and date to');
            return;
        }

        const selectedCheckboxes = document.querySelectorAll('#batch-employee-filters input[type="checkbox"][data-is-emp="true"]:checked');
        if (selectedCheckboxes.length === 0) {
            alert('Please select at least one employee');
            return;
        }

        tbody.innerHTML = '<tr><td colspan="24" style="text-align: center; padding: 20px; color: #999;">Computing...</td></tr>';

        const rows = await Promise.all(Array.from(selectedCheckboxes).map(async (checkbox) => {
            const employeeId = checkbox.value;
            try {
                const [salaryRes, cashRes, lossesRes] = await Promise.all([
                    fetch(`/api/salary-computation/totals/salary?employee_id=${encodeURIComponent(employeeId)}&date_from=${from}&date_to=${to}`),
                    fetch(`/api/cash-advances/outstanding/${encodeURIComponent(employeeId)}`),
                    fetch(`/api/salary-computation/outstanding/losses-damages/${encodeURIComponent(employeeId)}`)
                ]);

                const salaryData = salaryRes.ok ? await salaryRes.json() : {};
                const cashData = cashRes.ok ? await cashRes.json() : { outstanding: 0 };
                const lossesData = lossesRes.ok ? await lossesRes.json() : { outstanding: 0 };

                const emp = employeeDataMap.get(employeeId) || {};

                const totalDays = Number(salaryData.total_days_worked) || 0;
                const totalOvertime = Number(salaryData.total_overtime) || 0;
                const totalAllowance = Number(salaryData.total_allowance) || 0;
                const totalLeaves = Number(salaryData.total_leaves) || 0;
                const regularHoliday = Number(salaryData.regular_holiday) || 0;
                const specialHoliday = Number(salaryData.special_holiday) || 0;
                const totalTax = Number(salaryData.total_income_tax) || 0;
                const totalSss = Number(salaryData.total_sss_payment) || 0;
                const totalSssLoan = Number(salaryData.total_sss_loan_payment) || 0;
                const totalPhilhealth = Number(salaryData.total_philhealth_payment) || 0;
                const totalPagibig = Number(salaryData.total_pagibig_payment) || 0;
                const totalPagibigLoan = Number(salaryData.total_pagibig_loan_payment) || 0;
                const totalCashLoanDeductions = Number(salaryData.total_cash_loan_deductions) || 0;
                const totalLossesDeductions = Number(salaryData.total_losses_deductions) || 0;
                const startingCashLoan = Number(cashData.outstanding) || 0;
                const startingLosses = Number(lossesData.outstanding) || 0;

                const grossPay = totalDays + totalOvertime + totalAllowance + totalLeaves + regularHoliday + specialHoliday;
                const grossDeduction = totalTax + totalSss + totalSssLoan + totalPhilhealth + totalPagibig + totalPagibigLoan + totalCashLoanDeductions + totalLossesDeductions;
                const netPay = grossPay - grossDeduction;
                const endingCashLoan = startingCashLoan - totalCashLoanDeductions;
                const endingLosses = startingLosses - totalLossesDeductions;

                return {
                    employeeId,
                    lastName: emp.last_name || '',
                    firstName: emp.first_name || '',
                    totalDays, totalOvertime, totalAllowance, totalLeaves, regularHoliday, specialHoliday,
                    grossPay, totalTax, totalSss, totalSssLoan, totalPhilhealth, totalPagibig, totalPagibigLoan,
                    totalCashLoanDeductions, totalLossesDeductions, grossDeduction, netPay,
                    startingCashLoan, endingCashLoan, startingLosses, endingLosses
                };
            } catch (err) {
                console.error(`Failed to compute salary for ${employeeId}:`, err);
                return null;
            }
        }));

        const validRows = rows.filter(row => row !== null);

        if (validRows.length === 0) {
            tbody.innerHTML = '<tr><td colspan="24" style="text-align: center; padding: 20px; color: #999;">No data found</td></tr>';
            return;
        }

        validRows.sort((a, b) => a.employeeId.localeCompare(b.employeeId));
        batchComputedRows = validRows;

        tbody.innerHTML = validRows.map(row => `
            <tr>
                <td style="min-width: 80px; max-width: 80px; padding: 6px; border-bottom: 1px solid #eee; font-size: 12px; position: -webkit-sticky; position: sticky; left: 0; background: #EADECB; z-index: 1; transform: translateZ(0); backface-visibility: hidden; box-shadow: 1px 0 0 #D6D6D6; box-sizing: border-box;">${row.employeeId}</td>
                <td style="min-width: 80px; max-width: 80px; padding: 6px; border-bottom: 1px solid #eee; font-size: 12px; position: -webkit-sticky; position: sticky; left: 80px; background: #EADECB; z-index: 1; transform: translateZ(0); backface-visibility: hidden; box-shadow: 1px 0 0 #D6D6D6; box-sizing: border-box;">${row.lastName}</td>
                <td style="min-width: 80px; max-width: 80px; padding: 6px; border-bottom: 1px solid #eee; font-size: 12px; position: -webkit-sticky; position: sticky; left: 160px; background: #EADECB; z-index: 1; transform: translateZ(0); backface-visibility: hidden; box-sizing: border-box;">${row.firstName}</td>
                <td style="min-width: 70px; max-width: 70px; padding: 6px; border-bottom: 1px solid #eee; text-align: right; font-size: 12px; box-sizing: border-box;">${row.totalDays.toFixed(2)}</td>
                <td style="min-width: 50px; max-width: 50px; padding: 6px; border-bottom: 1px solid #eee; text-align: right; font-size: 12px; box-sizing: border-box;">${row.totalOvertime.toFixed(2)}</td>
                <td style="min-width: 70px; max-width: 70px; padding: 6px; border-bottom: 1px solid #eee; text-align: right; font-size: 12px; box-sizing: border-box;">${row.totalAllowance.toFixed(2)}</td>
                <td style="min-width: 60px; max-width: 60px; padding: 6px; border-bottom: 1px solid #eee; text-align: right; font-size: 12px; box-sizing: border-box;">${row.totalLeaves.toFixed(2)}</td>
                <td style="min-width: 75px; max-width: 75px; padding: 6px; border-bottom: 1px solid #eee; text-align: right; font-size: 12px; box-sizing: border-box;">${row.regularHoliday.toFixed(2)}</td>
                <td style="min-width: 75px; max-width: 75px; padding: 6px; border-bottom: 1px solid #eee; text-align: right; font-size: 12px; box-sizing: border-box;">${row.specialHoliday.toFixed(2)}</td>
                <td style="min-width: 80px; max-width: 80px; padding: 6px; border-bottom: 1px solid #eee; text-align: right; font-size: 12px; font-weight: 600; box-sizing: border-box;">${row.grossPay.toFixed(2)}</td>
                <td style="min-width: 70px; max-width: 70px; padding: 6px; border-bottom: 1px solid #eee; text-align: right; font-size: 12px; box-sizing: border-box;">${row.totalTax.toFixed(2)}</td>
                <td style="min-width: 75px; max-width: 75px; padding: 6px; border-bottom: 1px solid #eee; text-align: right; font-size: 12px; box-sizing: border-box;">${row.totalSss.toFixed(2)}</td>
                <td style="min-width: 70px; max-width: 70px; padding: 6px; border-bottom: 1px solid #eee; text-align: right; font-size: 12px; box-sizing: border-box;">${row.totalSssLoan.toFixed(2)}</td>
                <td style="min-width: 85px; max-width: 85px; padding: 6px; border-bottom: 1px solid #eee; text-align: right; font-size: 12px; box-sizing: border-box;">${row.totalPhilhealth.toFixed(2)}</td>
                <td style="min-width: 85px; max-width: 85px; padding: 6px; border-bottom: 1px solid #eee; text-align: right; font-size: 12px; box-sizing: border-box;">${row.totalPagibig.toFixed(2)}</td>
                <td style="min-width: 90px; max-width: 90px; padding: 6px; border-bottom: 1px solid #eee; text-align: right; font-size: 12px; box-sizing: border-box;">${row.totalPagibigLoan.toFixed(2)}</td>
                <td style="min-width: 90px; max-width: 90px; padding: 6px; border-bottom: 1px solid #eee; text-align: right; font-size: 12px; box-sizing: border-box;">${row.totalCashLoanDeductions.toFixed(2)}</td>
                <td style="min-width: 85px; max-width: 85px; padding: 6px; border-bottom: 1px solid #eee; text-align: right; font-size: 12px; box-sizing: border-box;">${row.totalLossesDeductions.toFixed(2)}</td>
                <td style="min-width: 85px; max-width: 85px; padding: 6px; border-bottom: 1px solid #eee; text-align: right; font-size: 12px; font-weight: 600; box-sizing: border-box;">${row.grossDeduction.toFixed(2)}</td>
                <td style="min-width: 80px; max-width: 80px; padding: 6px; border-bottom: 1px solid #eee; text-align: right; font-size: 12px; font-weight: 600; box-sizing: border-box;">${row.netPay.toFixed(2)}</td>
                <td style="min-width: 95px; max-width: 95px; padding: 6px; border-bottom: 1px solid #eee; text-align: right; font-size: 12px; box-sizing: border-box;">${row.startingCashLoan.toFixed(2)}</td>
                <td style="min-width: 90px; max-width: 90px; padding: 6px; border-bottom: 1px solid #eee; text-align: right; font-size: 12px; box-sizing: border-box;">${row.endingCashLoan.toFixed(2)}</td>
                <td style="min-width: 105px; max-width: 105px; padding: 6px; border-bottom: 1px solid #eee; text-align: right; font-size: 12px; box-sizing: border-box;">${row.startingLosses.toFixed(2)}</td>
                <td style="min-width: 105px; max-width: 105px; padding: 6px; border-bottom: 1px solid #eee; text-align: right; font-size: 12px; box-sizing: border-box;">${row.endingLosses.toFixed(2)}</td>
            </tr>
        `).join('');
    };

    const batchDepartmentSelect = document.getElementById('batch-search-employee');
    const filtersContainer = document.getElementById('batch-employee-filters');
    if (batchDepartmentSelect && filtersContainer) {
        const loadActiveEmployees = async (orgUnitId) => {
            if (!filtersContainer) return;

            if (!orgUnitId) {
                filtersContainer.innerHTML = '<span id="batch-employee-filter-label" style="font-size: 14px; font-weight: 600; color: #1a1f2e;">Employees:</span><span id="batch-employee-filter-hint" style="font-size: 13px; color: #888;">Select a department to load active employees</span>';
                return;
            }

            try {
                let url = '';
                if (orgUnitId === 'All') {
                    url = '/api/employee-profiles/active';
                } else {
                    url = `/api/employee-profiles/department/${encodeURIComponent(orgUnitId)}`;
                }

                const res = await fetch(url);
                if (!res.ok) throw new Error('Failed to load employees');
                const employees = await res.json();

                employeeDataMap.clear();
                filtersContainer.innerHTML = '<span id="batch-employee-filter-label" style="font-size: 14px; font-weight: 600; color: #1a1f2e;">Employees:</span>';

                if (employees.length === 0) {
                    filtersContainer.innerHTML += '<span style="font-size: 13px; color: #888;">No active employees found</span>';
                    return;
                }

                const grouped = {};
                employees.forEach(emp => {
                    const dept = emp.department || 'Unassigned';
                    if (!grouped[dept]) grouped[dept] = [];
                    grouped[dept].push(emp);
                    employeeDataMap.set(emp.employee_id, { last_name: emp.last_name, first_name: emp.first_name });
                });

                Object.keys(grouped).sort().forEach(dept => {
                    const deptGroup = document.createElement('div');
                    deptGroup.style.cssText = 'display: inline-block; flex-direction: column; gap: 4px; margin-right: 16px; vertical-align: top;';

                    const deptLabel = document.createElement('label');
                    deptLabel.style.cssText = 'display: block; align-items: center; gap: 6px; font-size: 13px; font-weight: 600; cursor: pointer; white-space: nowrap;';
                    const deptCheckbox = document.createElement('input');
                    deptCheckbox.type = 'checkbox';
                    deptCheckbox.value = dept;
                    deptCheckbox.dataset.dept = dept;
                    deptCheckbox.dataset.isDept = 'true';
                    deptLabel.appendChild(deptCheckbox);
                    deptLabel.appendChild(document.createTextNode(dept));
                    deptGroup.appendChild(deptLabel);

                    grouped[dept].forEach(emp => {
                        const empLabel = document.createElement('label');
                        empLabel.style.cssText = 'display: block; align-items: center; gap: 6px; font-size: 13px; cursor: pointer; padding-left: 4px; white-space: nowrap;';
                        const empCheckbox = document.createElement('input');
                        empCheckbox.type = 'checkbox';
                        empCheckbox.value = emp.employee_id;
                        empCheckbox.dataset.dept = dept;
                        empCheckbox.dataset.isEmp = 'true';
                        empLabel.appendChild(empCheckbox);
                        empLabel.appendChild(document.createTextNode(`${emp.last_name}, ${emp.first_name}`));
                        deptGroup.appendChild(empLabel);
                    });

                    filtersContainer.appendChild(deptGroup);
                });
            } catch (err) {
                console.error('Failed to load active employees:', err);
                filtersContainer.innerHTML = '<span id="batch-employee-filter-label" style="font-size: 14px; font-weight: 600; color: #1a1f2e;">Employees:</span><span style="font-size: 13px; color: #e74c3c;">Failed to load employees</span>';
            }
        };

        batchDepartmentSelect.addEventListener('change', (e) => {
            loadActiveEmployees(e.target.value);
        });

        filtersContainer.addEventListener('change', (e) => {
            if (e.target.dataset.isDept === 'true') {
                const dept = e.target.dataset.dept;
                const checked = e.target.checked;
                const empCheckboxes = filtersContainer.querySelectorAll(`input[type="checkbox"][data-dept="${dept}"][data-is-emp="true"]`);
                empCheckboxes.forEach(cb => cb.checked = checked);
            } else if (e.target.dataset.isEmp === 'true') {
                const dept = e.target.dataset.dept;
                const deptCheckbox = filtersContainer.querySelector(`input[type="checkbox"][data-dept="${dept}"][data-is-dept="true"]`);
                const empCheckboxes = filtersContainer.querySelectorAll(`input[type="checkbox"][data-dept="${dept}"][data-is-emp="true"]`);
                if (deptCheckbox && empCheckboxes.length > 0) {
                    const allChecked = Array.from(empCheckboxes).every(cb => cb.checked);
                    const someChecked = Array.from(empCheckboxes).some(cb => cb.checked);
                    deptCheckbox.checked = allChecked;
                    deptCheckbox.indeterminate = someChecked && !allChecked;
                }
            }
        });
    }

    const batchComputeBtn = document.getElementById('batch-compute-btn');
    if (batchComputeBtn) {
        batchComputeBtn.addEventListener('click', computeBatchSalary);
    }

    const batchSaveBtn = document.getElementById('batch-save-btn');
    if (batchSaveBtn) {
        batchSaveBtn.addEventListener('click', async () => {
            if (batchComputedRows.length === 0) {
                alert('No computed rows to save. Please click Compute first.');
                return;
            }

            const from = document.getElementById('batch-date-from')?.value;
            const to = document.getElementById('batch-date-to')?.value;
            if (!from || !to) {
                alert('Please select both date from and date to before saving');
                return;
            }

            let savedCount = 0;
            let failedCount = 0;

            const negativeNetPayRow = batchComputedRows.find(row => (row.netPay || 0) < 0);
            if (negativeNetPayRow) {
                alert(`Cannot save batch: Employee ${negativeNetPayRow.employeeId || ''} has negative Net Pay (${(negativeNetPayRow.netPay || 0).toFixed(2)}).`);
                return;
            }

            for (const row of batchComputedRows) {
                try {
                    const payrollData = {
                        employee_id: row.employeeId,
                        date_start: from,
                        date_end: to,
                        total_days_worked: row.totalDays,
                        total_overtime_hours: row.totalOvertime,
                        total_allowance: row.totalAllowance,
                        total_leaves_usage: row.totalLeaves,
                        regular_holiday: row.regularHoliday,
                        special_holiday: row.specialHoliday,
                        total_income_tax: row.totalTax,
                        total_sss_payment: row.totalSss,
                        total_sss_loan_payment: row.totalSssLoan,
                        total_philhealth_payment: row.totalPhilhealth,
                        total_pagibig_payment: row.totalPagibig,
                        total_pagibig_loan_payment: row.totalPagibigLoan,
                        total_cash_loan_deductions: row.totalCashLoanDeductions,
                        starting_cash_loan: row.startingCashLoan,
                        ending_cash_loan: row.endingCashLoan,
                        total_losses_damages: row.totalLossesDeductions,
                        starting_losses_damages: row.startingLosses,
                        ending_losses_damages: row.endingLosses,
                        gross_pay: row.grossPay,
                        gross_deduction: row.grossDeduction,
                        net_pay: row.netPay,
                        status: 'Pending'
                    };

                    const res = await fetch('/api/payroll', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(payrollData)
                    });

                    if (!res.ok) {
                        const errorData = await res.json().catch(() => ({}));
                        throw new Error(errorData.error || 'Failed to save payroll');
                    }

                    const payroll = await res.json();

                    savedCount++;
                } catch (err) {
                    console.error(`Failed to save payroll for ${row.employeeId}:`, err);
                    failedCount++;
                }
            }

            if (failedCount > 0) {
                alert(`Batch save completed.\nSaved: ${savedCount}\nFailed: ${failedCount}`);
                if (typeof loadPendingPayrolls === 'function') {
                    setTimeout(loadPendingPayrolls, 0);
                }
            } else {
                if (typeof loadPendingPayrolls === 'function') {
                    setTimeout(loadPendingPayrolls, 0);
                }
                const batchConfirmedModal = document.getElementById('batch-confirmed-modal');
                if (batchConfirmedModal) {
                    batchConfirmedModal.style.display = 'flex';
                }
            }
        });
    }

    const uploadPayrollBtn = document.getElementById('upload-payroll-btn');
    const uploadPayrollModal = document.getElementById('upload-payroll-modal');
    const closeUploadPayrollModal = document.getElementById('close-upload-payroll-modal');
    const cancelUploadPayrollBtn = document.getElementById('cancel-upload-payroll-btn');
    const saveUploadPayrollBtn = document.getElementById('save-upload-payroll-btn');
    const downloadPayrollTemplateBtn = document.getElementById('download-payroll-template-btn');
    const dropZone = document.getElementById('payroll-drop-zone');
    const payrollFileInput = document.getElementById('payroll-file-input');
    const validationResults = document.getElementById('payroll-validation-results');
    const validationSummary = document.getElementById('payroll-validation-summary');
    const validationErrors = document.getElementById('payroll-validation-errors');
    const previewContainer = document.getElementById('payroll-preview-table-wrap');
    const previewPlaceholder = document.getElementById('payroll-preview-placeholder');

    let payrollValidationPassed = false;

    const renderPayrollPreview = (file) => {
        if (!file || !previewContainer || !previewPlaceholder) return;

        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const data = new Uint8Array(e.target.result);
                const workbook = XLSX.read(data, { type: 'array' });
                const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
                if (!firstSheet) {
                    previewPlaceholder.style.display = 'block';
                    previewContainer.style.display = 'none';
                    previewPlaceholder.textContent = 'No data found in file';
                    return;
                }

                const html = XLSX.utils.sheet_to_html(firstSheet, { id: 'payroll-preview-table', editable: false });
                previewContainer.innerHTML = html;
                previewContainer.style.display = 'block';
                previewPlaceholder.style.display = 'none';

                const previewTable = document.getElementById('payroll-preview-table');
                if (previewTable) {
                    previewTable.style.width = '100%';
                    previewTable.style.borderCollapse = 'collapse';
                    previewTable.style.fontSize = '12px';
                    previewTable.style.tableLayout = 'auto';

                    const cells = previewTable.querySelectorAll('th, td');
                    cells.forEach((cell) => {
                        cell.style.border = '1px solid #ddd';
                        cell.style.padding = '4px 6px';
                        cell.style.textAlign = 'left';
                        cell.style.whiteSpace = 'nowrap';
                    });

                    const headerCells = previewTable.querySelectorAll('th');
                    headerCells.forEach((cell) => {
                        cell.style.background = '#f4f4f4';
                        cell.style.fontWeight = '600';
                    });
                }
            } catch (err) {
                console.error('Preview render error:', err);
                previewPlaceholder.style.display = 'block';
                previewContainer.style.display = 'none';
                previewPlaceholder.textContent = 'Failed to preview file';
            }
        };
        reader.readAsArrayBuffer(file);
    };

    const clearValidationResults = () => {
        if (validationResults) validationResults.style.display = 'none';
        if (validationSummary) validationSummary.innerHTML = '';
        if (validationErrors) validationErrors.innerHTML = '';
        if (previewContainer) previewContainer.innerHTML = '';
        if (previewContainer) previewContainer.style.display = 'none';
        if (previewPlaceholder) {
            previewPlaceholder.style.display = 'block';
            previewPlaceholder.textContent = 'Upload a file to preview its contents';
        }
        payrollValidationPassed = false;
        if (saveUploadPayrollBtn) saveUploadPayrollBtn.disabled = true;
    };

    const openUploadPayrollModal = () => {
        if (uploadPayrollModal) uploadPayrollModal.style.display = 'flex';
        clearValidationResults();
    };

    const closeUploadPayrollModalFn = () => {
        if (uploadPayrollModal) uploadPayrollModal.style.display = 'none';
        clearValidationResults();
    };

    const showValidationResults = (result) => {
        if (!validationResults || !validationSummary || !validationErrors) return;

        validationResults.style.display = 'block';
        validationErrors.innerHTML = '';

        if (result.valid) {
            validationSummary.innerHTML = `<span style="color: #155724;">Validation passed: ${result.summary.validRows} of ${result.summary.totalRows} rows are valid</span>`;
            validationErrors.style.display = 'none';
        } else {
            validationSummary.innerHTML = `<span style="color: #721c24;">Validation failed: ${result.summary.invalidRows} of ${result.summary.totalRows} rows have errors</span>`;
            validationErrors.style.display = 'block';
            result.errors.forEach((error) => {
                const div = document.createElement('div');
                div.textContent = error;
                div.style.color = '#721c24';
                div.style.marginBottom = '4px';
                validationErrors.appendChild(div);
            }            );
        }
    };

    const validateUploadedPayrollFile = async (file) => {
        if (!file) return;

        renderPayrollPreview(file);

        const formData = new FormData();
        formData.append('payrollFile', file);

        try {
            const res = await fetch('/api/payroll/validate', {
                method: 'POST',
                body: formData
            });

            if (!res.ok) {
                const errorData = await res.json().catch(() => ({}));
                throw new Error(errorData.error || 'Failed to validate payroll file');
            }

            const result = await res.json();
            showValidationResults(result);
            payrollValidationPassed = result.valid;
            if (saveUploadPayrollBtn) saveUploadPayrollBtn.disabled = !result.valid;
        } catch (err) {
            console.error('Validate payroll error:', err);
            clearValidationResults();
            alert(err.message || 'Failed to validate payroll file');
        }
    };

    if (uploadPayrollBtn) {
        uploadPayrollBtn.addEventListener('click', openUploadPayrollModal);
    }

    if (closeUploadPayrollModal) {
        closeUploadPayrollModal.addEventListener('click', closeUploadPayrollModalFn);
    }

    if (cancelUploadPayrollBtn) {
        cancelUploadPayrollBtn.addEventListener('click', closeUploadPayrollModalFn);
    }

    if (downloadPayrollTemplateBtn) {
        downloadPayrollTemplateBtn.addEventListener('click', downloadPayrollTemplate);
    }

    if (dropZone) {
        dropZone.addEventListener('dragover', (e) => {
            e.preventDefault();
            dropZone.style.borderColor = '#28a745';
            dropZone.style.backgroundColor = '#f8fff9';
        });

        dropZone.addEventListener('dragleave', (e) => {
            e.preventDefault();
            dropZone.style.borderColor = '#D6D6D6';
            dropZone.style.backgroundColor = '#fafafa';
        });

        dropZone.addEventListener('drop', (e) => {
            e.preventDefault();
            dropZone.style.borderColor = '#D6D6D6';
            dropZone.style.backgroundColor = '#fafafa';
            const files = e.dataTransfer.files;
            if (files.length > 0) {
                if (payrollFileInput) payrollFileInput.files = files;
                dropZone.querySelector('.drop-zone-text').textContent = files[0].name;
                validateUploadedPayrollFile(files[0]);
            }
        });

        dropZone.addEventListener('click', () => {
            if (payrollFileInput) payrollFileInput.click();
        });
    }

    if (payrollFileInput) {
        payrollFileInput.addEventListener('change', (e) => {
            const files = e.target.files;
            if (files.length > 0 && dropZone) {
                dropZone.querySelector('.drop-zone-text').textContent = files[0].name;
                validateUploadedPayrollFile(files[0]);
            }
        });
    }

    if (saveUploadPayrollBtn) {
        saveUploadPayrollBtn.addEventListener('click', async (e) => {
            e.preventDefault();
            e.stopPropagation();

            if (!payrollValidationPassed) {
                alert('Please upload and validate a file first before saving');
                return;
            }

            if (!payrollFileInput || !payrollFileInput.files || payrollFileInput.files.length === 0) {
                alert('Please select a file to upload');
                return;
            }

            const formData = new FormData();
            formData.append('payrollFile', payrollFileInput.files[0]);

            try {
                const res = await fetch('/api/payroll/upload', {
                    method: 'POST',
                    body: formData
                });

                if (!res.ok) {
                    const errorData = await res.json().catch(() => ({}));
                    throw new Error(errorData.error || 'Failed to upload payroll');
                }

                alert('Payroll uploaded successfully');
                if (uploadPayrollModal) uploadPayrollModal.style.display = 'none';
                if (payrollFileInput) payrollFileInput.value = '';
                if (dropZone) dropZone.querySelector('.drop-zone-text').textContent = 'Drag and drop your payroll file here, or click to browse';
                clearValidationResults();
                if (typeof loadSalaryHistory === 'function') {
                    loadSalaryHistory();
                }
            } catch (err) {
                console.error('Upload payroll error:', err);
                alert(err.message || 'Failed to upload payroll');
            }
        });
    }

    async function downloadPayrollTemplate() {
        try {
            const res = await fetch('/api/payroll/template');
            if (!res.ok) throw new Error('Failed to download template');
            const blob = await res.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'payroll_template.xlsx';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);
        } catch (err) {
            console.error('Download template error:', err);
            alert('Failed to download template');
        }
    }
}
