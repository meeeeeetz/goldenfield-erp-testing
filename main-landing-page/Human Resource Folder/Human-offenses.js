if (typeof ModuleComponents === 'undefined') { window.ModuleComponents = {}; }

ModuleComponents['hr-offenses'] = (container) => {
    container.innerHTML = `
        <div class="header-actions">
            <h2>Offenses</h2>
        </div>
        <div class="action-buttons-row">
            <button id="add-offense-btn" class="btn-icon-circle">
                <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                <span class="btn-label">Add Offense</span>
            </button>
            <button id="bulk-upload-offense-btn" class="btn-icon-circle">
                <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line></svg>
                <span class="btn-label">Bulk Upload Offenses</span>
            </button>
            <button id="manage-coc-btn" class="btn-icon-circle" type="button">
                <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
                <span class="btn-label">Manage Code of Conduct</span>
            </button>
        </div>
        <div class="tracking-cards-row">
            <div class="card tracking-card">
                <h3>Total Offenses</h3>
                <p class="card-sub-label">All recorded offenses</p>
                <div class="card-value-row">
                    <div class="card-value" id="offense-total-value">0</div>
                </div>
            </div>
            <div class="card tracking-card">
                <h3>This Month</h3>
                <p class="card-sub-label">Offenses recorded this month</p>
                <div class="card-value-row">
                    <div class="card-value" id="offense-month-value">0</div>
                </div>
            </div>
            <div class="card tracking-card">
                <h3>Pending Cases</h3>
                <p class="card-sub-label">Offenses awaiting resolution</p>
                <div class="card-value-row">
                    <div class="card-value" id="offense-pending-value">0</div>
                </div>
            </div>
        </div>
        <div class="card" style="margin-top: 10px; padding: 20px; border: 1px solid #D6D6D6; border-radius: 8px; background: #fff;">
            <h3 style="margin: 0 0 12px 0; font-size: 16px; font-weight: 600; color: #1a1f2e;">Twin Notice Rule</h3>
            <p style="margin: 0 0 12px 0; font-size: 14px; color: #374151; line-height: 1.5;">To ensure all actions are legally sound and enforceable under Philippine Labor Law, the company enforces the Twin-Notice Rule:</p>
            <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 12px; flex-wrap: wrap;">
                <div style="padding: 8px 14px; border-radius: 6px; font-size: 13px; font-weight: 600; background: #f3f4f6; border: 1px solid #D6D6D6; white-space: nowrap;">Step 1: Notice to Explain (NTE)</div>
                <div style="font-size: 18px; color: #9ca3af;">&#x2193;</div>
                <div style="padding: 8px 14px; border-radius: 6px; font-size: 13px; font-weight: 600; background: #f3f4f6; border: 1px solid #D6D6D6; white-space: nowrap;">Step 2: Administrative Investigation / Conference</div>
                <div style="font-size: 18px; color: #9ca3af;">&#x2193;</div>
                <div style="padding: 8px 14px; border-radius: 6px; font-size: 13px; font-weight: 600; background: #f3f4f6; border: 1px solid #D6D6D6; white-space: nowrap;">Step 3: Formal Notice of Decision (NOD)</div>
            </div>
            <ol style="margin: 0; padding-left: 20px; font-size: 13px; color: #374151; line-height: 1.6;">
                <li style="margin-bottom: 6px;"><strong>Notice to Explain (NTE):</strong> Issued in writing to the employee detailing the specific violation, date, time, and rules violated. The employee is given at least five (5) calendar days (120 hours) to submit a written reply.</li>
                <li style="margin-bottom: 6px;"><strong>Administrative Hearing / Conference:</strong> The employee is given an opportunity to explain their defense with support staff or legal counsel present if desired.</li>
                <li style="margin-bottom: 6px;"><strong>Preventive Suspension (Optional):</strong> If the employee’s continued presence poses an imminent threat to farm safety, biosecurity, or livestock, management may place them on preventive suspension for a maximum of 30 days.</li>
                <li><strong>Notice of Decision (NOD):</strong> Issued after review of evidence. If found guilty, sanctions from the matrix are applied; if cleared, the employee returns to duty with full pay.</li>
            </ol>
        </div>
        <div class="card" style="margin-top: 10px; padding: 20px;">
            <h3 style="margin: 0 0 16px 0; font-size: 16px; font-weight: 600; color: #1a1f2e;">List of Documents</h3>
            <div id="offense-docs-tabs" style="display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 16px; border-bottom: 1px solid #e5e7eb; padding-bottom: 8px;">
                <button class="modal-tab active" data-doc-tab="nte">Notice to Explain</button>
                <button class="modal-tab" data-doc-tab="hearing">Administrative Hearing</button>
                <button class="modal-tab" data-doc-tab="nod">Notice of Decision</button>
                <button class="modal-tab" data-doc-tab="waiver-resignation">Release Waiver and Quit claim ( Resignation )</button>
                <button class="modal-tab" data-doc-tab="waiver-termination">Release Waiver and Quit claim ( Termination )</button>
            </div>
            <div id="offense-docs-content" style="padding: 16px; background: #f3f4f6; border-radius: 6px; min-height: 120px;">
                <div id="offense-docs-toolbar" class="ql-toolbar ql-snow" style="display: none; border: 1px solid #D6D6D6; border-radius: 6px 6px 0 0; background: #fff; position: sticky; top: 0; z-index: 10;">
                    <span class="ql-formats">
                        <select class="ql-header" title="Heading">
                            <option value="1">Heading 1</option>
                            <option value="2">Heading 2</option>
                            <option value="3">Heading 3</option>
                            <option selected>Normal</option>
                        </select>
                    </span>
                    <span class="ql-formats">
                        <button class="ql-bold" title="Bold"></button>
                        <button class="ql-italic" title="Italic"></button>
                        <button class="ql-underline" title="Underline"></button>
                        <button class="ql-strike" title="Strikethrough"></button>
                    </span>
                    <span class="ql-formats">
                        <button class="ql-list" value="ordered" title="Ordered list"></button>
                        <button class="ql-list" value="bullet" title="Bullet list"></button>
                        <button class="ql-indent" value="-1" title="Decrease indent"></button>
                        <button class="ql-indent" value="+1" title="Increase indent"></button>
                    </span>
                    <span class="ql-formats">
                        <button class="ql-align" value="" title="Align left"></button>
                        <button class="ql-align" value="center" title="Align center"></button>
                        <button class="ql-align" value="right" title="Align right"></button>
                        <button class="ql-align" value="justify" title="Justify"></button>
                    </span>
                    <span class="ql-formats">
                        <button class="ql-clean" title="Clear formatting"></button>
                    </span>
                </div>
                <div id="offense-quill-editor" class="ql-container ql-snow" style="display: none; background: #fff; border: 1px solid #D6D6D6; border-top: none; border-radius: 0 0 6px 6px; min-height: 400px; font-size: 14px;">
                    <div id="quill-inner" style="min-height: 400px; padding: 40px; max-width: 800px; margin: 0 auto; background: #fff; box-shadow: 0 1px 3px rgba(0,0,0,0.1);"></div>
                </div>
                <div id="offense-docs-placeholder" style="padding: 40px; text-align: center; color: #64748b; font-size: 14px;">
                    Select a document tab to view contents
                </div>
            </div>
            <div id="offense-docs-actions" style="display: none; gap: 8px; margin-top: 12px; justify-content: flex-end;">
                <button id="export-html-btn" class="btn-secondary" type="button">Export HTML</button>
                <button id="export-pdf-btn" class="btn-secondary" type="button">Export PDF</button>
                <button id="save-doc-btn" class="btn-primary" type="button">Save Document</button>
            </div>
        </div>
        <div class="card" style="margin-top: 10px; padding: 20px;">
            <h3 style="margin: 0 0 16px 0; font-size: 16px; font-weight: 600; color: #1a1f2e;">Code of Conduct - Sanctions/ Disciplinary actions</h3>
            <div style="padding: 10px 15px; overflow-x: auto;">
                <table class="data-table" style="width: 100%; border-collapse: collapse; font-size: 13px; margin: 0; table-layout: fixed;">
                    <thead>
                        <tr>
                            <th style="width: 20%; padding: 2px; font-size: 15px; height: 32px;">x</th>
                            <th style="width: 20%; padding: 2px; font-size: 15px; height: 32px;">Group 1</th>
                            <th style="width: 20%; padding: 2px; font-size: 15px; height: 32px;">Group 2</th>
                            <th style="width: 20%; padding: 2px; font-size: 15px; height: 32px;">Group 3</th>
                            <th style="width: 20%; padding: 2px; font-size: 15px; height: 32px;">Group 4</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr style="height: 40px;">
                            <td style="width: 20%; padding: 2px; font-size: 15px;"><strong>1st offense</strong></td>
                            <td style="width: 20%; padding: 2px; font-size: 15px;">First Warning/ Corrective Interview</td>
                            <td style="width: 20%; padding: 2px; font-size: 15px;">First Warning/ Written Reprimand</td>
                            <td style="width: 20%; padding: 2px; font-size: 15px;">Final Warning</td>
                            <td style="width: 20%; padding: 2px; font-size: 15px;">Immediate termination</td>
                        </tr>
                        <tr style="height: 40px;">
                            <td style="width: 20%; padding: 2px; font-size: 15px;"><strong>2nd offense</strong></td>
                            <td style="width: 20%; padding: 2px; font-size: 15px;">Second Warning/ Written Reprimand</td>
                            <td style="width: 20%; padding: 2px; font-size: 15px;">Final Warning</td>
                            <td style="width: 20%; padding: 2px; font-size: 15px;">Termination</td>
                            <td style="width: 20%; padding: 2px; font-size: 15px;"></td>
                        </tr>
                        <tr style="height: 40px;">
                            <td style="width: 20%; padding: 2px; font-size: 15px;"><strong>3rd Offense</strong></td>
                            <td style="width: 20%; padding: 2px; font-size: 15px;">Final Warning</td>
                            <td style="width: 20%; padding: 2px; font-size: 15px;">Termination</td>
                            <td style="width: 20%; padding: 2px; font-size: 15px;"></td>
                            <td style="width: 20%; padding: 2px; font-size: 15px;"></td>
                        </tr>
                        <tr style="height: 40px;">
                            <td style="width: 20%; padding: 2px; font-size: 15px;"><strong>4th offense</strong></td>
                            <td style="width: 20%; padding: 2px; font-size: 15px;">Termination</td>
                            <td style="width: 20%; padding: 2px; font-size: 15px;"></td>
                            <td style="width: 20%; padding: 2px; font-size: 15px;"></td>
                            <td style="width: 20%; padding: 2px; font-size: 15px;"></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <div class="card" style="margin-top: 10px; padding: 20px;">
            <h3 style="margin: 0 0 16px 0; font-size: 16px; font-weight: 600; color: #1a1f2e;">Code of Conduct</h3>
            <div style="padding: 10px 15px; overflow-x: auto; max-height: 50vh; overflow-y: auto;">
                <table class="data-table" style="width: 100%; border-collapse: collapse; font-size: 13px; min-width: 700px; margin: 0;">
                    <thead>
                        <tr>
                            <th style="width: 140px; padding: 2px; font-size: 15px;">Code of Conduct ID</th>
                            <th style="width: 120px; padding: 2px; font-size: 15px;">Category</th>
                            <th style="width: 200px; padding: 2px; font-size: 15px;">Title</th>
                            <th style="width: 200px; padding: 2px; font-size: 15px;">Remarks</th>
                        </tr>
                    </thead>
                    <tbody id="code-of-conduct-tbody">
                        <tr><td colspan="4" style="text-align: center; padding: 20px; color: #999;">Loading...</td></tr>
                    </tbody>
                </table>
            </div>
            <div style="padding: 10px 15px; border-top: 1px solid #ddd; display: flex; justify-content: center;">
                <div class="pagination" id="coc-pagination">
                    <button class="page-btn" id="coc-prev-btn">&laquo; Prev</button>
                    <button class="page-btn active" id="coc-page-1">1</button>
                    <button class="page-btn" id="coc-next-btn">Next &raquo;</button>
                </div>
            </div>
        </div>
        <div class="card graph-placeholder offenses-table-card">
            <div class="card-header-row">
                <h3>Offense Records</h3>
                <input type="text" id="offense-search" class="offense-search-input" placeholder="Search offenses..." />
            </div>
            <div class="table-wrap">
                <table class="data-table product-table">
                    <thead>
                        <tr>
                            <th class="sortable" data-sort="code">Offense Code <span class="sort-arrow">&#8645;</span></th>
                            <th class="sortable" data-sort="date">Date <span class="sort-arrow">&#8645;</span></th>
                            <th>Employee ID</th>
                            <th>Employee Name</th>
                            <th>Offense Type</th>
                            <th>Description</th>
                            <th>Severity</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody id="offenses-tbody">
                        <tr><td colspan="8" style="text-align: center; padding: 20px; color: #999;">Loading...</td></tr>
                    </tbody>
                </table>
            </div>
        </div>
        <div id="coc-modal" class="modal" style="display:none;">
            <div class="modal-content" style="max-width: 700px; width: 95%;">
                <div class="modal-header-row">
                    <h3>Code of Conduct</h3>
                    <button class="modal-close-btn" id="close-coc-modal">&times;</button>
                </div>
                <div class="modal-tabs">
                    <button class="modal-tab active" data-tab="add-coc">Add New Code of Conduct</button>
                    <button class="modal-tab" data-tab="manage-coc">Manage Code of Conduct</button>
                </div>
                <div class="modal-tab-panel" id="panel-add-coc">
                    <label>Code of Conduct ID</label>
                    <input type="text" id="coc-id" value="COCID-0000001" readonly style="background: #f3eee4; color: #555;">
                    <label>Category</label>
                    <select id="coc-category" class="modal-select">
                        <option value="">Select Group</option>
                        <option value="Group 1">Group 1</option>
                        <option value="Group 2">Group 2</option>
                        <option value="Group 3">Group 3</option>
                        <option value="Group 4">Group 4</option>
                    </select>
                    <label>Title</label>
                    <input type="text" id="coc-title" placeholder="Enter title">
                    <label>Remarks</label>
                    <textarea id="coc-remarks" rows="3" placeholder="Enter remarks"></textarea>
                    <label>Status</label>
                    <select id="coc-status" class="modal-select">
                        <option value="Active">Active</option>
                        <option value="Terminated">Terminated</option>
                    </select>
                    <div class="modal-tab-actions">
                        <button class="btn-primary" id="save-coc-btn">Save</button>
                    </div>
                </div>
                <div class="modal-tab-panel" id="panel-manage-coc" style="display:none;">
                    <label>Search</label>
                    <input type="text" id="coc-search" placeholder="Search by Code of Conduct title...">
                    <div id="coc-search-results" style="max-height: 150px; overflow-y: auto; margin-top: 8px; border: 1px solid #ddd; border-radius: 6px; display: none; background: #fff;">
                    </div>
                    <label>Code of Conduct ID</label>
                    <input type="text" id="coc-manage-id" readonly style="background: #f3eee4; color: #555;">
                    <label>Category</label>
                    <select id="coc-manage-category" class="modal-select">
                        <option value="">Select Group</option>
                        <option value="Group 1">Group 1</option>
                        <option value="Group 2">Group 2</option>
                        <option value="Group 3">Group 3</option>
                        <option value="Group 4">Group 4</option>
                    </select>
                    <label>Title</label>
                    <input type="text" id="coc-manage-title" placeholder="Enter title">
                    <label>Remarks</label>
                    <textarea id="coc-manage-remarks" rows="3" placeholder="Enter remarks"></textarea>
                    <label>Status</label>
                    <select id="coc-manage-status" class="modal-select">
                        <option value="Active">Active</option>
                        <option value="Terminated">Terminated</option>
                    </select>
                    <div class="modal-tab-actions">
                        <button class="btn-primary" id="save-manage-coc-btn">Save</button>
                    </div>
                </div>
            </div>
        </div>
        <div id="offense-modal" class="modal hidden">
            <div class="modal-content daily-layer-modal">
                <div class="modal-header-row">
                    <h3>Add Offense</h3>
                    <button id="close-offense-modal-btn" class="modal-close-btn" title="Close">&times;</button>
                </div>
                <div class="daily-layer-body">
                    <div class="modal-field">
                        <label for="offense-date">Date</label>
                        <input type="date" id="offense-date" />
                    </div>
                    <div class="modal-field">
                        <label for="offense-employee">Employee</label>
                        <select class="modal-select" id="offense-employee">
                            <option value="">Select employee</option>
                        </select>
                    </div>
                    <div class="modal-field">
                        <label for="offense-type">Offense Type</label>
                        <select class="modal-select" id="offense-type">
                            <option value="">Select type</option>
                            <option value="Tardiness">Tardiness</option>
                            <option value="Absenteeism">Absenteeism</option>
                            <option value="Insubordination">Insubordination</option>
                            <option value="Misconduct">Misconduct</option>
                            <option value="Theft">Theft</option>
                            <option value="Harassment">Harassment</option>
                            <option value="Safety Violation">Safety Violation</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>
                    <div class="modal-field">
                        <label for="offense-description">Description</label>
                        <input type="text" id="offense-description" placeholder="Description" />
                    </div>
                    <div class="modal-field">
                        <label for="offense-severity">Severity</label>
                        <select class="modal-select" id="offense-severity">
                            <option value="Low">Low</option>
                            <option value="Medium">Medium</option>
                            <option value="High">High</option>
                            <option value="Critical">Critical</option>
                        </select>
                    </div>
                    <div class="modal-field">
                        <label for="offense-status">Status</label>
                        <select class="modal-select" id="offense-status">
                            <option value="Pending">Pending</option>
                            <option value="Under Investigation">Under Investigation</option>
                            <option value="Resolved">Resolved</option>
                            <option value="Dismissed">Dismissed</option>
                        </select>
                    </div>
                </div>
                <div class="modal-tab-actions">
                    <button id="save-offense-btn" class="btn-primary">Save Entry</button>
                </div>
            </div>
        </div>
    `;

    const loadOffenseStats = async () => {
        try {
            const res = await fetch('http://localhost:5000/api/offenses/stats');
            if (!res.ok) throw new Error('Failed to load offense stats');
            const stats = await res.json();

            const totalEl = document.getElementById('offense-total-value');
            const monthEl = document.getElementById('offense-month-value');
            const pendingEl = document.getElementById('offense-pending-value');

            if (totalEl) totalEl.textContent = stats.total || 0;
            if (monthEl) monthEl.textContent = stats.monthly || 0;
            if (pendingEl) pendingEl.textContent = stats.pending || 0;
        } catch (err) {
            console.error('Failed to load offense stats:', err);
        }
    };

    const loadOffenseRecords = async () => {
        const tbody = document.getElementById('offenses-tbody');
        if (!tbody) return;
        try {
            const res = await fetch('http://localhost:5000/api/offenses');
            if (!res.ok) throw new Error('Failed to load offenses');
            const offenses = await res.json();
            if (!offenses || offenses.length === 0) {
                tbody.innerHTML = '<tr><td colspan="8" style="text-align: center; padding: 20px; color: #999;">No offense records found</td></tr>';
                return;
            }
            tbody.innerHTML = offenses.map(off => `
                <tr>
                    <td>${off.offense_code || off.offense_id || ''}</td>
                    <td>${off.date ? new Date(off.date).toLocaleDateString() : ''}</td>
                    <td>${off.employee_id || ''}</td>
                    <td>${off.employee_name || ''}</td>
                    <td>${off.offense_type || ''}</td>
                    <td>${off.description || ''}</td>
                    <td>${off.severity || ''}</td>
                    <td><span style="background: ${off.status === 'Resolved' ? '#d4edda' : off.status === 'Dismissed' ? '#d4edda' : '#fff3cd'}; color: ${off.status === 'Resolved' ? '#155724' : off.status === 'Dismissed' ? '#155724' : '#856404'}; padding: 2px 8px; border-radius: 4px; font-size: 12px; font-weight: 600;">${off.status || 'Pending'}</span></td>
                </tr>
            `).join('');
        } catch (err) {
            console.error('Failed to load offenses:', err);
            tbody.innerHTML = '<tr><td colspan="8" style="text-align: center; padding: 20px; color: #999;">Failed to load offenses</td></tr>';
        }
    };

    const loadEmployees = async () => {
        const select = document.getElementById('offense-employee');
        if (!select) return;
        try {
            const res = await fetch('http://localhost:5000/api/employees');
            if (!res.ok) throw new Error('Failed to load employees');
            const employees = await res.json();
            select.innerHTML = '<option value="">Select employee</option>' + employees.map(emp => `<option value="${emp.employee_id}">${emp.last_name}, ${emp.first_name} (${emp.employee_id})</option>`).join('');
        } catch (err) {
            console.error('Failed to load employees:', err);
            select.innerHTML = '<option value="">Failed to load employees</option>';
        }
    };

    const offenseModal = document.getElementById('offense-modal');
    const closeOffenseModal = () => offenseModal.classList.add('hidden');
    document.getElementById('close-offense-modal-btn').onclick = closeOffenseModal;
    document.getElementById('add-offense-btn').onclick = () => {
        loadEmployees();
        offenseModal.classList.remove('hidden');
    };

    document.getElementById('save-offense-btn').onclick = async () => {
        const date = document.getElementById('offense-date').value;
        const employeeId = document.getElementById('offense-employee').value;
        const offenseType = document.getElementById('offense-type').value;
        const description = document.getElementById('offense-description').value;
        const severity = document.getElementById('offense-severity').value;
        const status = document.getElementById('offense-status').value;

        if (!date || !employeeId || !offenseType) {
            alert('Please fill in Date, Employee, and Offense Type');
            return;
        }

        try {
            const res = await fetch('http://localhost:5000/api/offenses', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ date, employee_id: employeeId, offense_type: offenseType, description, severity, status })
            });

            if (!res.ok) {
                const errorData = await res.json().catch(() => ({}));
                throw new Error(errorData.error || 'Failed to save offense');
            }

            closeOffenseModal();
            loadOffenseRecords();
            loadOffenseStats();
        } catch (err) {
            console.error('Save offense error:', err);
            alert(err.message || 'Failed to save offense');
        }
    };

    const offenseSearch = document.getElementById('offense-search');
    const offenseTableRows = () => document.querySelectorAll('#offenses-tbody tr');
    offenseSearch.addEventListener('input', () => {
        const q = offenseSearch.value.trim().toLowerCase();
        offenseTableRows().forEach(row => {
            const match = row.textContent.toLowerCase().includes(q);
            row.style.display = match ? '' : 'none';
        });
    });

    const sortState = { col: null, dir: 1 };
    const applySort = () => {
        document.querySelectorAll('.offenses-table-card th.sortable .sort-arrow').forEach(a => a.textContent = '⇅');
        if (!sortState.col) return;
        const colIndex = sortState.col === 'code' ? 0 : 1;
        const tbody = document.getElementById('offenses-tbody');
        const rows = Array.from(tbody.querySelectorAll('tr'));
        rows.sort((a, b) => {
            const va = a.children[colIndex].textContent.trim();
            const vb = b.children[colIndex].textContent.trim();
            if (sortState.col === 'code') {
                return va.localeCompare(vb, undefined, { numeric: true }) * sortState.dir;
            }
            return va.localeCompare(vb) * sortState.dir;
        });
        rows.forEach(r => tbody.appendChild(r));
        const arrow = document.querySelector(`.offenses-table-card th.sortable[data-sort="${sortState.col}"] .sort-arrow`);
        if (arrow) arrow.textContent = sortState.dir === 1 ? '▲' : '▼';
    };

    document.querySelectorAll('.offenses-table-card th.sortable').forEach(th => {
        th.onclick = () => {
            const col = th.dataset.sort;
            if (sortState.col === col) sortState.dir *= -1;
            else { sortState.col = col; sortState.dir = 1; }
            applySort();
        };
    });

    const offenseDocTabs = document.querySelectorAll('#offense-docs-tabs .modal-tab');
    const offenseDocsContent = document.getElementById('offense-docs-content');
    const offenseDocsPlaceholder = document.getElementById('offense-docs-placeholder');
    const offenseDocsToolbar = document.getElementById('offense-docs-toolbar');
    const offenseQuillEditor = document.getElementById('offense-quill-editor');
    const offenseDocsActions = document.getElementById('offense-docs-actions');
    const quillInner = document.getElementById('quill-inner');
    
    let quillInstance = null;
    let activeDocTab = null;
    const docContents = {};

    const docTitles = {
        'nte': 'Notice to Explain',
        'hearing': 'Administrative Hearing',
        'nod': 'Notice of Decision',
        'waiver-resignation': 'Release Waiver and Quit claim ( Resignation )',
        'waiver-termination': 'Release Waiver and Quit claim ( Termination )'
    };

    const initQuillEditor = () => {
        if (quillInstance) return;
        
        quillInstance = new Quill('#quill-inner', {
            theme: 'snow',
            placeholder: 'Start typing your document here...',
            modules: {
                toolbar: '#offense-docs-toolbar'
            }
        });
    };

    const showEditor = () => {
        if (offenseDocsPlaceholder) offenseDocsPlaceholder.style.display = 'none';
        if (offenseDocsToolbar) offenseDocsToolbar.style.display = 'block';
        if (offenseQuillEditor) offenseQuillEditor.style.display = 'block';
        if (offenseDocsActions) offenseDocsActions.style.display = 'flex';
    };

    const hideEditor = () => {
        if (offenseDocsPlaceholder) offenseDocsPlaceholder.style.display = 'block';
        if (offenseDocsToolbar) offenseDocsToolbar.style.display = 'none';
        if (offenseQuillEditor) offenseQuillEditor.style.display = 'none';
        if (offenseDocsActions) offenseDocsActions.style.display = 'none';
    };

    const switchDocTab = async (tabId) => {
        activeDocTab = tabId;
        
        offenseDocTabs.forEach(tab => tab.classList.remove('active'));
        const activeTab = document.querySelector(`#offense-docs-tabs [data-doc-tab="${tabId}"]`);
        if (activeTab) activeTab.classList.add('active');

        initQuillEditor();
        showEditor();

        if (!docContents[tabId]) {
            try {
                const res = await fetch(`http://localhost:5000/api/offenses/documents/${tabId}`);
                if (res.ok) {
                    const data = await res.json();
                    docContents[tabId] = data.html_content || '';
                }
            } catch (err) {
                console.error('Failed to load document:', err);
            }
        }

        const savedContent = docContents[tabId] || '';
        quillInstance.root.innerHTML = savedContent;
    };

    offenseDocTabs.forEach(tab => {
        tab.addEventListener('click', async () => {
            const tabId = tab.getAttribute('data-doc-tab');
            if (tabId) await switchDocTab(tabId);
        });
    });

    const firstDocTab = document.querySelector('#offense-docs-tabs [data-doc-tab="nte"]');
    if (firstDocTab) {
        switchDocTab('nte');
    }

    const saveDocBtn = document.getElementById('save-doc-btn');
    if (saveDocBtn) {
        saveDocBtn.addEventListener('click', async () => {
            if (!quillInstance || !activeDocTab) return;
            
            const content = quillInstance.root.innerHTML;
            docContents[activeDocTab] = content;
            
            try {
                const res = await fetch('http://localhost:5000/api/offenses/documents', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ doc_type: activeDocTab, html_content: content })
                });
                
                if (!res.ok) throw new Error('Failed to save document');
                alert('Document saved successfully');
            } catch (err) {
                console.error('Save document error:', err);
                alert(err.message || 'Failed to save document');
            }
        });
    }

    const exportHtmlBtn = document.getElementById('export-html-btn');
    if (exportHtmlBtn) {
        exportHtmlBtn.addEventListener('click', () => {
            if (!quillInstance) return;
            const content = quillInstance.root.innerHTML;
            const blob = new Blob([`<!DOCTYPE html><html><head><meta charset="UTF-8"><title>${docTitles[activeDocTab] || 'Document'}</title></head><body>${content}</body></html>`], { type: 'text/html' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `${docTitles[activeDocTab] || 'document'}.html`;
            a.click();
            URL.revokeObjectURL(url);
        });
    }

    const exportPdfBtn = document.getElementById('export-pdf-btn');
    if (exportPdfBtn) {
        exportPdfBtn.addEventListener('click', async () => {
            if (!quillInstance) return;
            try {
                const { jsPDF } = window.jspdf;
                const doc = new jsPDF();
                const content = quillInstance.root.innerText || quillInstance.getText();
                doc.setFontSize(12);
                doc.text(content, 10, 10, { maxWidth: 190 });
                doc.save(`${docTitles[activeDocTab] || 'document'}.pdf`);
            } catch (err) {
                console.error('Export PDF error:', err);
                alert('Failed to export PDF');
            }
        });
    }

    loadOffenseRecords();
    loadOffenseStats();

    const cocModal = document.getElementById('coc-modal');
    const manageCocBtn = document.getElementById('manage-coc-btn');
    const closeCocModal = document.getElementById('close-coc-modal');
    const cocTabs = cocModal ? cocModal.querySelectorAll('.modal-tab') : [];
    const cocPanels = {
        'add-coc': document.getElementById('panel-add-coc'),
        'manage-coc': document.getElementById('panel-manage-coc')
    };

    const API_BASE_COC = 'http://localhost:5000/api/code-of-conduct';

    const loadNextCocId = async () => {
        try {
            const res = await fetch(`${API_BASE_COC}/next-id`);
            if (res.ok) {
                const data = await res.json();
                const cocIdInput = document.getElementById('coc-id');
                if (cocIdInput) cocIdInput.value = data.coc_code || 'COCID-0000001';
            }
        } catch (err) {
            console.error('Failed to load next COC ID:', err);
        }
    };

    if (manageCocBtn && cocModal) {
        manageCocBtn.addEventListener('click', async () => {
            cocModal.style.display = 'flex';
            await loadNextCocId();
        });
    }

    if (closeCocModal && cocModal) {
        closeCocModal.addEventListener('click', () => {
            cocModal.style.display = 'none';
        });
    }

    if (cocModal) {
        cocModal.addEventListener('click', (e) => {
            if (e.target === cocModal) cocModal.style.display = 'none';
        });
    }

    cocTabs.forEach(tab => {
        tab.addEventListener('click', async () => {
            cocTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            Object.values(cocPanels).forEach(p => p.style.display = 'none');
            if (cocPanels[tab.dataset.tab]) {
                cocPanels[tab.dataset.tab].style.display = 'flex';
            }
            if (tab.dataset.tab === 'add-coc') {
                await loadNextCocId();
            }
        });
    });

    const saveCocBtn = document.getElementById('save-coc-btn');
    if (saveCocBtn) {
        saveCocBtn.addEventListener('click', async () => {
            const cocCode = document.getElementById('coc-id')?.value?.trim();
            const category = document.getElementById('coc-category')?.value;
            const title = document.getElementById('coc-title')?.value?.trim();
            const remarks = document.getElementById('coc-remarks')?.value?.trim();
            const status = document.getElementById('coc-status')?.value;

            if (!cocCode || !category || !title) {
                alert('Code of Conduct ID, Category, and Title are required.');
                return;
            }

            try {
                const res = await fetch(API_BASE_COC, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ coc_code: cocCode, category, title, remarks, status })
                });
                if (res.ok) {
                    alert('Code of Conduct saved successfully');
                    document.getElementById('coc-category').value = '';
                    document.getElementById('coc-title').value = '';
                    document.getElementById('coc-remarks').value = '';
                    document.getElementById('coc-status').value = 'Active';
                    await loadNextCocId();
                    await loadActiveCodeOfConduct();
                } else {
                    alert('Failed to save Code of Conduct');
                }
            } catch (err) {
                console.error('Failed to save COC:', err);
                alert('Failed to save Code of Conduct');
            }
        });
    }

    let selectedCocId = null;

    const loadCocSearchResults = async (query) => {
        const resultsContainer = document.getElementById('coc-search-results');
        if (!resultsContainer) return;

        if (!query || query.trim().length === 0) {
            resultsContainer.style.display = 'none';
            resultsContainer.innerHTML = '';
            return;
        }

        try {
            const res = await fetch(`${API_BASE_COC}?search=${encodeURIComponent(query.trim())}`);
            if (!res.ok) return;
            const records = await res.json();

            resultsContainer.innerHTML = '';
            if (records.length === 0) {
                resultsContainer.innerHTML = '<div style="padding: 10px; color: #999; text-align: center;">No results found</div>';
                resultsContainer.style.display = 'block';
                return;
            }

            records.forEach(record => {
                const item = document.createElement('div');
                item.style.cssText = 'padding: 10px; border-bottom: 1px solid #eee; cursor: pointer; font-size: 14px;';
                item.textContent = `${record.coc_code} - ${record.title}`;
                item.addEventListener('mouseenter', () => {
                    item.style.background = '#f1f5f9';
                });
                item.addEventListener('mouseleave', () => {
                    item.style.background = '#fff';
                });
                item.addEventListener('click', async () => {
                    selectedCocId = record.coc_id;
                    document.getElementById('coc-manage-id').value = record.coc_code || '';
                    document.getElementById('coc-manage-category').value = record.category || '';
                    document.getElementById('coc-manage-title').value = record.title || '';
                    document.getElementById('coc-manage-remarks').value = record.remarks || '';
                    document.getElementById('coc-manage-status').value = record.status || 'Active';
                    resultsContainer.style.display = 'none';
                    document.getElementById('coc-search').value = '';
                });
                resultsContainer.appendChild(item);
            });

            resultsContainer.style.display = 'block';
        } catch (err) {
            console.error('Failed to search COC:', err);
        }
    };

    const cocSearchInput = document.getElementById('coc-search');
    if (cocSearchInput) {
        cocSearchInput.addEventListener('input', (e) => {
            loadCocSearchResults(e.target.value.trim());
        });

        cocSearchInput.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                const resultsContainer = document.getElementById('coc-search-results');
                if (resultsContainer) resultsContainer.style.display = 'none';
            }
        });
    }

    const saveManageCocBtn = document.getElementById('save-manage-coc-btn');
    if (saveManageCocBtn) {
        saveManageCocBtn.addEventListener('click', async () => {
            if (!selectedCocId) {
                alert('Please select a Code of Conduct record from the search results first.');
                return;
            }

            const category = document.getElementById('coc-manage-category')?.value;
            const title = document.getElementById('coc-manage-title')?.value?.trim();
            const remarks = document.getElementById('coc-manage-remarks')?.value?.trim();
            const status = document.getElementById('coc-manage-status')?.value;

            if (!category || !title) {
                alert('Category and Title are required.');
                return;
            }

            try {
                const updateRes = await fetch(`${API_BASE_COC}/${selectedCocId}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ category, title, remarks, status })
                });
                if (updateRes.ok) {
                    alert('Code of Conduct updated successfully');
                    document.getElementById('coc-manage-id').value = '';
                    document.getElementById('coc-manage-category').value = '';
                    document.getElementById('coc-manage-title').value = '';
                    document.getElementById('coc-manage-remarks').value = '';
                    document.getElementById('coc-manage-status').value = 'Active';
                    selectedCocId = null;
                    const resultsContainer = document.getElementById('coc-search-results');
                    if (resultsContainer) resultsContainer.style.display = 'none';
                    await loadActiveCodeOfConduct();
                } else {
                    alert('Failed to update Code of Conduct');
                }
            } catch (err) {
                console.error('Failed to update COC:', err);
                alert('Failed to update Code of Conduct');
            }
        });
    }

    let cocCurrentPage = 1;
    const cocItemsPerPage = 5;
    let cocAllRecords = [];

    const loadActiveCodeOfConduct = async () => {
        try {
            const res = await fetch('http://localhost:5000/api/code-of-conduct?status=Active');
            if (!res.ok) return;
            const records = await res.json();
            cocAllRecords = records;
            const tbody = document.getElementById('code-of-conduct-tbody');
            if (!tbody) return;

            tbody.innerHTML = '';
            if (records.length === 0) {
                tbody.innerHTML = '<tr><td colspan="4" style="text-align: center; padding: 20px; color: #999;">No active records found</td></tr>';
                updateCocPagination(0);
                return;
            }

            const totalPages = Math.ceil(records.length / cocItemsPerPage);
            if (cocCurrentPage > totalPages) cocCurrentPage = totalPages;
            if (cocCurrentPage < 1) cocCurrentPage = 1;

            const start = (cocCurrentPage - 1) * cocItemsPerPage;
            const end = start + cocItemsPerPage;
            const pageRecords = records.slice(start, end);

            pageRecords.forEach(record => {
                const tr = document.createElement('tr');
                tr.innerHTML = `
                    <td style="padding: 8px; border-bottom: 1px solid #eee;">${record.coc_code}</td>
                    <td style="padding: 8px; border-bottom: 1px solid #eee;">${record.category}</td>
                    <td style="padding: 8px; border-bottom: 1px solid #eee;">${record.title}</td>
                    <td style="padding: 8px; border-bottom: 1px solid #eee;">${record.remarks || ''}</td>
                `;
                tbody.appendChild(tr);
            });

            updateCocPagination(totalPages);
        } catch (err) {
            console.error('Failed to load active Code of Conduct:', err);
        }
    };

    const updateCocPagination = (totalPages) => {
        const prevBtn = document.getElementById('coc-prev-btn');
        const nextBtn = document.getElementById('coc-next-btn');
        const pagination = document.getElementById('coc-pagination');
        if (!pagination) return;

        pagination.innerHTML = '';

        prevBtn.textContent = '« Prev';
        nextBtn.textContent = 'Next »';

        prevBtn.disabled = cocCurrentPage === 1;
        nextBtn.disabled = cocCurrentPage === totalPages || totalPages === 0;

        const createPageBtn = (page, isActive = false) => {
            const btn = document.createElement('button');
            btn.className = 'page-btn' + (isActive ? ' active' : '');
            btn.textContent = page;
            btn.addEventListener('click', () => {
                cocCurrentPage = page;
                loadActiveCodeOfConduct();
            });
            return btn;
        };

        pagination.appendChild(prevBtn);
        prevBtn.addEventListener('click', () => {
            if (cocCurrentPage > 1) {
                cocCurrentPage--;
                loadActiveCodeOfConduct();
            }
        });

        const maxButtons = 5;
        let startPage = Math.max(1, cocCurrentPage - Math.floor(maxButtons / 2));
        let endPage = Math.min(totalPages, startPage + maxButtons - 1);
        if (endPage - startPage + 1 < maxButtons) {
            startPage = Math.max(1, endPage - maxButtons + 1);
        }

        if (startPage > 1) {
            pagination.appendChild(createPageBtn(1));
            if (startPage > 2) {
                const dots = document.createElement('span');
                dots.textContent = '...';
                dots.style.padding = '0 4px';
                pagination.appendChild(dots);
            }
        }

        for (let i = startPage; i <= endPage; i++) {
            pagination.appendChild(createPageBtn(i, i === cocCurrentPage));
        }

        if (endPage < totalPages) {
            if (endPage < totalPages - 1) {
                const dots = document.createElement('span');
                dots.textContent = '...';
                dots.style.padding = '0 4px';
                pagination.appendChild(dots);
            }
            pagination.appendChild(createPageBtn(totalPages));
        }

        pagination.appendChild(nextBtn);
        nextBtn.addEventListener('click', () => {
            if (cocCurrentPage < totalPages) {
                cocCurrentPage++;
                loadActiveCodeOfConduct();
            }
        });
    };

    loadActiveCodeOfConduct();
};

function initializeModule(contentArea) {
    const currentTab = window.__currentTabId || 'human-resources';
    const render = ModuleComponents[currentTab] || ModuleComponents['human-resources'];
    if (typeof render !== 'function') {
        console.error('[MODULE RUNTIME ERROR]: render is not a function for tab:', currentTab);
        return;
    }
    render(contentArea);
}
