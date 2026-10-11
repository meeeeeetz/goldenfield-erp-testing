if (typeof ModuleComponents === 'undefined') { window.ModuleComponents = {}; }

ModuleComponents['hr-salary-vaccination'] = (container) => {
    container.innerHTML = `
        <div id="vaccination-salary-view">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
                <div style="display: flex; gap: 16px; align-items: center;">
                    <button id="create-vaccination-attendance-btn" class="btn-icon-circle">
                        <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="2" width="16" height="20" rx="2"></rect><line x1="8" y1="6" x2="16" y2="6"></line><line x1="8" y1="10" x2="16" y2="10"></line><line x1="8" y1="14" x2="10" y2="14"></line><line x1="14" y1="14" x2="16" y2="14"></line><line x1="8" y1="18" x2="10" y2="18"></line><line x1="14" y1="18" x2="16" y2="18"></line></svg>
                        <span class="btn-label">Create Vaccination Attendance</span>
                    </button>
                </div>
                <button id="back-to-salary-from-vaccination-btn" class="btn-icon-circle" style="margin-left: auto;">
                    <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
                    <span class="btn-label">Back to Salary</span>
                </button>
            </div>

            <div class="card" style="padding: 0; overflow: visible;">
                <div style="padding: 16px 20px; border-bottom: 1px solid #ddd; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 8px;">
                    <h3 style="margin: 0; font-size: 16px; font-weight: 600; color: #1a1f2e;">Vaccination Attendance Logs</h3>
                </div>
                <div style="padding: 12px 20px; border-bottom: 1px solid #eee; display: flex; gap: 24px; align-items: center; flex-wrap: wrap;">
                    <div style="display: flex; align-items: center; gap: 6px;">
                        <label style="font-weight: 600; font-size: 13px; color: #333;">Search:</label>
                        <input type="text" id="vaccination-search" placeholder="Search by name, vaccine, or date..." style="width: 220px; padding: 6px 12px; border: 1px solid #D6D6D6; border-radius: 6px; font-size: 13px; box-sizing: border-box;">
                    </div>
                </div>
                <div style="max-height: 60vh; overflow: auto;">
                    <table class="data-table" style="width: 100%; border-collapse: separate; border-spacing: 0; font-size: 13px; min-width: 1100px;">
                        <thead>
                            <tr>
                                <th style="position: sticky; top: 0; background: #FFD000; z-index: 999;">Vaccination ID</th>
                                <th style="position: sticky; top: 0; background: #FFD000; z-index: 999;">Employee ID</th>
                                <th style="position: sticky; top: 0; background: #FFD000; z-index: 999;">Last Name</th>
                                <th style="position: sticky; top: 0; background: #FFD000; z-index: 999;">First Name</th>
                                <th style="position: sticky; top: 0; background: #FFD000; z-index: 999;">Date</th>
                                <th style="position: sticky; top: 0; background: #FFD000; z-index: 999;">Vaccine Type</th>
                                <th style="position: sticky; top: 0; background: #FFD000; z-index: 999;">Dose</th>
                                <th style="position: sticky; top: 0; background: #FFD000; z-index: 999;">Batch #</th>
                                <th style="position: sticky; top: 0; background: #FFD000; z-index: 999;">Administered By</th>
                                <th style="position: sticky; top: 0; background: #FFD000; z-index: 999;">Status</th>
                                <th style="position: sticky; top: 0; background: #FFD000; z-index: 999;">Action</th>
                            </tr>
                        </thead>
                        <tbody id="vaccination-tbody">
                            <tr><td colspan="11" style="text-align: center; padding: 20px; color: #999;">Loading...</td></tr>
                        </tbody>
                    </table>
                </div>
                <div class="pagination" id="vaccination-pagination">
                    <button class="page-btn" id="vaccination-prev-btn" disabled>&laquo; Prev</button>
                    <button class="page-btn active" id="vaccination-page-1">1</button>
                    <button class="page-btn" id="vaccination-next-btn">Next &raquo;</button>
                </div>
            </div>

        <div id="vaccination-attendance-modal" class="modal" style="display:none; align-items: center; justify-content: center;">
            <div class="modal-content" style="max-width: 1000px; width: 95%; max-height: 90vh; display: flex; flex-direction: column;">
                <div class="modal-header-row">
                    <h3>Create Vaccination Attendance</h3>
                    <button class="modal-close-btn" id="close-vaccination-attendance-modal">&times;</button>
                </div>
                <div style="overflow-y: auto; padding: 20px; display: flex; flex-direction: column; gap: 16px;">
                    <div style="display: flex; gap: 16px; flex-wrap: wrap;">
                        <div style="flex: 1; min-width: 200px; display: flex; flex-direction: column; gap: 4px; position: relative;">
                            <label style="font-weight: 600; font-size: 13px; color: #333;">Employee</label>
                            <input type="text" id="vaccination-search-employee" placeholder="Search employee..." style="padding: 8px; border: 1px solid #ddd; border-radius: 6px; font-size: 14px;">
                            <input type="hidden" id="vaccination-emp-id">
                            <div id="vaccination-search-results" style="display: none; position: absolute; top: 100%; left: 0; right: 0; background: #fff; border: 1px solid #D6D6D6; border-radius: 6px; box-shadow: 0 4px 12px rgba(0,0,0,0.1); z-index: 10; max-height: 200px; overflow-y: auto; margin-top: 4px;"></div>
                        </div>
                        <div style="flex: 1; min-width: 200px; display: flex; flex-direction: column; gap: 4px;">
                            <label style="font-weight: 600; font-size: 13px; color: #333;">Date</label>
                            <input type="date" id="vaccination-date" style="padding: 8px; border: 1px solid #ddd; border-radius: 6px; font-size: 14px;">
                        </div>
                    </div>
                    <div style="display: flex; gap: 16px; flex-wrap: wrap;">
                        <div style="flex: 1; min-width: 200px; display: flex; flex-direction: column; gap: 4px;">
                            <label style="font-weight: 600; font-size: 13px; color: #333;">Vaccine Type</label>
                            <select id="vaccination-type" style="padding: 8px; border: 1px solid #ddd; border-radius: 6px; font-size: 14px;">
                                <option value="">Select vaccine type</option>
                                <option value="Newcastle Disease (ND)">Newcastle Disease (ND)</option>
                                <option value="Infectious Bronchitis (IB)">Infectious Bronchitis (IB)</option>
                                <option value="Avian Influenza (AI)">Avian Influenza (AI)</option>
                                <option value="Gumboro/IBD">Gumboro/IBD</option>
                                <option value="Fowl Pox">Fowl Pox</option>
                                <option value="Coryza">Coryza</option>
                                <option value="Marek's Disease">Marek's Disease</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>
                        <div style="flex: 1; min-width: 150px; display: flex; flex-direction: column; gap: 4px;">
                            <label style="font-weight: 600; font-size: 13px; color: #333;">Dose</label>
                            <input type="text" id="vaccination-dose" placeholder="e.g., 0.5ml" style="padding: 8px; border: 1px solid #ddd; border-radius: 6px; font-size: 14px;">
                        </div>
                        <div style="flex: 1; min-width: 150px; display: flex; flex-direction: column; gap: 4px;">
                            <label style="font-weight: 600; font-size: 13px; color: #333;">Batch #</label>
                            <input type="text" id="vaccination-batch" placeholder="Vaccine batch number" style="padding: 8px; border: 1px solid #ddd; border-radius: 6px; font-size: 14px;">
                        </div>
                    </div>
                    <div style="display: flex; gap: 16px; flex-wrap: wrap;">
                        <div style="flex: 1; min-width: 200px; display: flex; flex-direction: column; gap: 4px;">
                            <label style="font-weight: 600; font-size: 13px; color: #333;">Administered By</label>
                            <input type="text" id="vaccination-administered-by" placeholder="Veterinarian/Technician name" style="padding: 8px; border: 1px solid #ddd; border-radius: 6px; font-size: 14px;">
                        </div>
                        <div style="flex: 1; min-width: 200px; display: flex; flex-direction: column; gap: 4px;">
                            <label style="font-weight: 600; font-size: 13px; color: #333;">Status</label>
                            <select id="vaccination-status" style="padding: 8px; border: 1px solid #ddd; border-radius: 6px; font-size: 14px;">
                                <option value="Pending">Pending</option>
                                <option value="Completed">Completed</option>
                                <option value="Cancelled">Cancelled</option>
                            </select>
                        </div>
                    </div>
                    <div style="border-top: 1px solid #eee; padding-top: 16px; display: flex; justify-content: flex-end; gap: 12px;">
                        <button id="cancel-vaccination-attendance-btn" class="btn-danger" type="button" style="padding: 10px 16px; font-size: 14px;">Cancel</button>
                        <button id="save-vaccination-attendance-btn" class="btn-primary" type="button" style="padding: 10px 16px; font-size: 14px;">Save</button>
                    </div>
                </div>
            </div>
        </div>
        </div>
    `;

    const createBtn = document.getElementById('create-vaccination-attendance-btn');
    const backBtn = document.getElementById('back-to-salary-from-vaccination-btn');
    const modal = document.getElementById('vaccination-attendance-modal');
    const closeModalBtn = document.getElementById('close-vaccination-attendance-modal');
    const cancelBtn = document.getElementById('cancel-vaccination-attendance-btn');
    const saveBtn = document.getElementById('save-vaccination-attendance-btn');
    const searchEmployee = document.getElementById('vaccination-search-employee');
    const searchResults = document.getElementById('vaccination-search-results');

    function openModal() {
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
        searchEmployee.value = '';
        document.getElementById('vaccination-emp-id').value = '';
        document.getElementById('vaccination-date').value = new Date().toISOString().split('T')[0];
        document.getElementById('vaccination-type').value = '';
        document.getElementById('vaccination-dose').value = '';
        document.getElementById('vaccination-batch').value = '';
        document.getElementById('vaccination-administered-by').value = '';
        document.getElementById('vaccination-status').value = 'Pending';
        searchResults.style.display = 'none';
    }

    function closeModal() {
        modal.style.display = 'none';
        document.body.style.overflow = '';
    }

    createBtn?.addEventListener('click', openModal);
    backBtn?.addEventListener('click', () => switchTab('hr-salary'));
    closeModalBtn?.addEventListener('click', closeModal);
    cancelBtn?.addEventListener('click', closeModal);

    window.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });

    searchEmployee?.addEventListener('input', async (e) => {
        const query = e.target.value.trim();
        if (query.length < 2) {
            searchResults.style.display = 'none';
            return;
        }
        try {
            const res = await fetch(`/api/salary-computation/search?q=${encodeURIComponent(query)}`);
            const employees = await res.json();
            if (employees.length > 0) {
                searchResults.innerHTML = employees.map(emp => `
                    <div class="search-result-item" style="padding: 10px 12px; cursor: pointer; border-bottom: 1px solid #eee;" data-id="${emp.employee_id}" data-name="${emp.last_name}, ${emp.first_name} ${emp.middle_name || ''}">
                        <strong>${emp.last_name}, ${emp.first_name} ${emp.middle_name || ''}</strong><br>
                        <small style="color: #666;">${emp.employee_id}</small>
                    </div>
                `).join('');
                searchResults.style.display = 'block';
            } else {
                searchResults.innerHTML = '<div style="padding: 10px 12px; color: #999;">No employees found</div>';
                searchResults.style.display = 'block';
            }
        } catch (err) {
            console.error('Search error:', err);
        }
    });

    searchResults?.addEventListener('click', (e) => {
        const item = e.target.closest('.search-result-item');
        if (item) {
            searchEmployee.value = item.dataset.name;
            document.getElementById('vaccination-emp-id').value = item.dataset.id;
            searchResults.style.display = 'none';
        }
    });

    document.addEventListener('click', (e) => {
        if (!searchEmployee.contains(e.target) && !searchResults.contains(e.target)) {
            searchResults.style.display = 'none';
        }
    });

    saveBtn?.addEventListener('click', async () => {
        const employeeId = document.getElementById('vaccination-emp-id').value;
        const date = document.getElementById('vaccination-date').value;
        const vaccineType = document.getElementById('vaccination-type').value;
        const dose = document.getElementById('vaccination-dose').value;
        const batch = document.getElementById('vaccination-batch').value;
        const administeredBy = document.getElementById('vaccination-administered-by').value;
        const status = document.getElementById('vaccination-status').value;

        if (!employeeId || !date || !vaccineType) {
            alert('Please fill all required fields (Employee, Date, Vaccine Type)');
            return;
        }

        try {
            const res = await fetch('/api/vaccination-attendance', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ employee_id: employeeId, date, vaccine_type: vaccineType, dose, batch_number: batch, administered_by: administeredBy, status })
            });
            if (res.ok) {
                alert('Vaccination attendance saved');
                closeModal();
                loadVaccinationLogs();
            } else {
                const err = await res.json();
                alert('Error: ' + (err.error || 'Failed to save'));
            }
        } catch (err) {
            console.error('Save error:', err);
            alert('Failed to save');
        }
    });

    async function loadVaccinationLogs(page = 1) {
        const tbody = document.getElementById('vaccination-tbody');
        tbody.innerHTML = '<tr><td colspan="11" style="text-align: center; padding: 20px; color: #999;">Loading...</td></tr>';
        try {
            const search = document.getElementById('vaccination-search')?.value || '';
            const res = await fetch(`/api/vaccination-attendance?page=${page}&search=${encodeURIComponent(search)}`);
            const data = await res.json();
            const logs = data.logs || [];
            if (logs.length === 0) {
                tbody.innerHTML = '<tr><td colspan="11" style="text-align: center; padding: 20px; color: #999;">No vaccination logs found</td></tr>';
                return;
            }
            tbody.innerHTML = logs.map(log => `
                <tr>
                    <td style="padding: 10px; border-bottom: 1px solid #eee;">${log.vaccination_id || '-'}</td>
                    <td style="padding: 10px; border-bottom: 1px solid #eee;">${log.employee_id || '-'}</td>
                    <td style="padding: 10px; border-bottom: 1px solid #eee;">${log.last_name || '-'}</td>
                    <td style="padding: 10px; border-bottom: 1px solid #eee;">${log.first_name || '-'}</td>
                    <td style="padding: 10px; border-bottom: 1px solid #eee;">${log.date ? new Date(log.date).toLocaleDateString() : '-'}</td>
                    <td style="padding: 10px; border-bottom: 1px solid #eee;">${log.vaccine_type || '-'}</td>
                    <td style="padding: 10px; border-bottom: 1px solid #eee;">${log.dose || '-'}</td>
                    <td style="padding: 10px; border-bottom: 1px solid #eee;">${log.batch_number || '-'}</td>
                    <td style="padding: 10px; border-bottom: 1px solid #eee;">${log.administered_by || '-'}</td>
                    <td style="padding: 10px; border-bottom: 1px solid #eee;"><span class="status-badge status-${(log.status || 'pending').toLowerCase()}">${log.status || 'Pending'}</span></td>
                    <td style="padding: 10px; border-bottom: 1px solid #eee;"><button class="view-vaccination-btn btn-icon-circle" data-id="${log.vaccination_id}"><svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg></button></td>
                </tr>
            `).join('');
        } catch (err) {
            console.error('Load error:', err);
            tbody.innerHTML = '<tr><td colspan="11" style="text-align: center; padding: 20px; color: #999;">Failed to load</td></tr>';
        }
    }

    document.getElementById('vaccination-search')?.addEventListener('input', (e) => {
        clearTimeout(window.vaccinationSearchTimeout);
        window.vaccinationSearchTimeout = setTimeout(() => loadVaccinationLogs(1), 300);
    });

    loadVaccinationLogs();
};