if (typeof ModuleComponents === 'undefined') { window.ModuleComponents = {}; }

ModuleComponents['hr-salary-chicken-hauling'] = (container) => {
    container.innerHTML = `
        <div id="chicken-hauling-view">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
                <div style="display: flex; gap: 16px; align-items: center;">
                    <button id="create-hauling-logs-btn" class="btn-icon-circle">
                        <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="2" width="16" height="20" rx="2"></rect><line x1="8" y1="6" x2="16" y2="6"></line><line x1="8" y1="10" x2="16" y2="10"></line><line x1="8" y1="14" x2="10" y2="14"></line><line x1="14" y1="14" x2="16" y2="14"></line><line x1="8" y1="18" x2="10" y2="18"></line><line x1="14" y1="18" x2="16" y2="18"></line></svg>
                        <span class="btn-label">Create Hauling logs</span>
                    </button>
                </div>
                <button id="back-to-salary-from-chicken-btn" class="btn-icon-circle" style="margin-left: auto;">
                    <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
                    <span class="btn-label">Back to Salary</span>
                </button>
            </div>

            <div class="card" style="padding: 0; overflow: visible;">
                <div style="padding: 16px 20px; border-bottom: 1px solid #ddd; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 8px;">
                    <h3 style="margin: 0; font-size: 16px; font-weight: 600; color: #1a1f2e;">Chicken Hauling Logs</h3>
                </div>
                <div style="padding: 12px 20px; border-bottom: 1px solid #eee; display: flex; gap: 24px; align-items: center; flex-wrap: wrap;">
                    <div style="display: flex; align-items: center; gap: 6px;">
                        <label style="font-weight: 600; font-size: 13px; color: #333;">Search:</label>
                        <input type="text" id="chicken-hauling-search" placeholder="Search by name or date..." style="width: 220px; padding: 6px 12px; border: 1px solid #D6D6D6; border-radius: 6px; font-size: 13px; box-sizing: border-box;">
                    </div>
                </div>
                <div style="max-height: 60vh; overflow: auto;">
                    <table class="data-table" style="width: 100%; border-collapse: separate; border-spacing: 0; font-size: 13px; min-width: 1000px;">
                        <thead>
                            <tr>
                                <th style="position: sticky; top: 0; background: #FFD000; z-index: 999;">Hauling ID</th>
                                <th style="position: sticky; top: 0; background: #FFD000; z-index: 999;">Employee ID</th>
                                <th style="position: sticky; top: 0; background: #FFD000; z-index: 999;">Last Name</th>
                                <th style="position: sticky; top: 0; background: #FFD000; z-index: 999;">First Name</th>
                                <th style="position: sticky; top: 0; background: #FFD000; z-index: 999;">Date</th>
                                <th style="position: sticky; top: 0; background: #FFD000; z-index: 999;">Total Chickens</th>
                                <th style="position: sticky; top: 0; background: #FFD000; z-index: 999;">Rate per Chicken</th>
                                <th style="position: sticky; top: 0; background: #FFD000; z-index: 999;">Total Amount</th>
                                <th style="position: sticky; top: 0; background: #FFD000; z-index: 999;">Created by</th>
                                <th style="position: sticky; top: 0; background: #FFD000; z-index: 999;">Status</th>
                                <th style="position: sticky; top: 0; background: #FFD000; z-index: 999;">Action</th>
                            </tr>
                        </thead>
                        <tbody id="chicken-hauling-tbody">
                            <tr><td colspan="11" style="text-align: center; padding: 20px; color: #999;">Loading...</td></tr>
                        </tbody>
                    </table>
                </div>
                <div class="pagination" id="chicken-hauling-pagination">
                    <button class="page-btn" id="chicken-hauling-prev-btn" disabled>&laquo; Prev</button>
                    <button class="page-btn active" id="chicken-hauling-page-1">1</button>
                    <button class="page-btn" id="chicken-hauling-next-btn">Next &raquo;</button>
                </div>
            </div>

        <div id="hauling-log-modal" class="modal" style="display:none; align-items: center; justify-content: center;">
            <div class="modal-content" style="max-width: 1000px; width: 95%; max-height: 90vh; display: flex; flex-direction: column;">
                <div class="modal-header-row">
                    <h3>Create Chicken Hauling Log</h3>
                    <button class="modal-close-btn" id="close-hauling-log-modal">&times;</button>
                </div>
                <div style="overflow-y: auto; padding: 20px; display: flex; flex-direction: column; gap: 16px;">
                    <div style="display: flex; gap: 16px; flex-wrap: wrap;">
                        <div style="flex: 1; min-width: 200px; display: flex; flex-direction: column; gap: 4px;">
                            <label style="font-weight: 600; font-size: 13px; color: #333;">Employee</label>
                            <input type="text" id="hauling-search-employee" placeholder="Search employee..." style="padding: 8px; border: 1px solid #ddd; border-radius: 6px; font-size: 14px;">
                            <input type="hidden" id="hauling-emp-id">
                            <div id="hauling-search-results" style="display: none; position: absolute; background: #fff; border: 1px solid #D6D6D6; border-radius: 6px; box-shadow: 0 4px 12px rgba(0,0,0,0.1); z-index: 10; max-height: 200px; overflow-y: auto; margin-top: 4px;"></div>
                        </div>
                        <div style="flex: 1; min-width: 200px; display: flex; flex-direction: column; gap: 4px;">
                            <label style="font-weight: 600; font-size: 13px; color: #333;">Date</label>
                            <input type="date" id="hauling-date" style="padding: 8px; border: 1px solid #ddd; border-radius: 6px; font-size: 14px;">
                        </div>
                    </div>
                    <div style="display: flex; gap: 16px; flex-wrap: wrap;">
                        <div style="flex: 1; min-width: 200px; display: flex; flex-direction: column; gap: 4px;">
                            <label style="font-weight: 600; font-size: 13px; color: #333;">Total Chickens</label>
                            <input type="number" id="hauling-total-chickens" min="0" step="1" style="padding: 8px; border: 1px solid #ddd; border-radius: 6px; font-size: 14px;">
                        </div>
                        <div style="flex: 1; min-width: 200px; display: flex; flex-direction: column; gap: 4px;">
                            <label style="font-weight: 600; font-size: 13px; color: #333;">Rate per Chicken</label>
                            <input type="number" id="hauling-rate-per-chicken" min="0" step="0.01" style="padding: 8px; border: 1px solid #ddd; border-radius: 6px; font-size: 14px;">
                        </div>
                        <div style="flex: 1; min-width: 200px; display: flex; flex-direction: column; gap: 4px;">
                            <label style="font-weight: 600; font-size: 13px; color: #333;">Total Amount</label>
                            <input type="text" id="hauling-total-amount" readonly style="padding: 8px; border: 1px solid #ddd; border-radius: 6px; background: #f1f5f9; font-size: 14px; font-weight: 600; text-align: right;">
                        </div>
                    </div>
                    <div style="border-top: 1px solid #eee; padding-top: 16px; display: flex; justify-content: flex-end; gap: 12px;">
                        <button id="cancel-hauling-log-btn" class="btn-danger" type="button" style="padding: 10px 16px; font-size: 14px;">Cancel</button>
                        <button id="save-hauling-log-btn" class="btn-primary" type="button" style="padding: 10px 16px; font-size: 14px;">Save</button>
                    </div>
                </div>
            </div>
        </div>
        </div>
    `;

    const createBtn = document.getElementById('create-hauling-logs-btn');
    const backBtn = document.getElementById('back-to-salary-from-chicken-btn');
    const modal = document.getElementById('hauling-log-modal');
    const closeModalBtn = document.getElementById('close-hauling-log-modal');
    const cancelBtn = document.getElementById('cancel-hauling-log-btn');
    const saveBtn = document.getElementById('save-hauling-log-btn');
    const searchEmployee = document.getElementById('hauling-search-employee');
    const searchResults = document.getElementById('hauling-search-results');
    const totalChickens = document.getElementById('hauling-total-chickens');
    const ratePerChicken = document.getElementById('hauling-rate-per-chicken');
    const totalAmount = document.getElementById('hauling-total-amount');

    function calculateTotal() {
        const chickens = parseFloat(totalChickens.value) || 0;
        const rate = parseFloat(ratePerChicken.value) || 0;
        totalAmount.value = (chickens * rate).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    }

    totalChickens?.addEventListener('input', calculateTotal);
    ratePerChicken?.addEventListener('input', calculateTotal);

    function openModal() {
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
        searchEmployee.value = '';
        document.getElementById('hauling-emp-id').value = '';
        document.getElementById('hauling-date').value = new Date().toISOString().split('T')[0];
        totalChickens.value = '';
        ratePerChicken.value = '';
        totalAmount.value = '';
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
            document.getElementById('hauling-emp-id').value = item.dataset.id;
            searchResults.style.display = 'none';
        }
    });

    document.addEventListener('click', (e) => {
        if (!searchEmployee.contains(e.target) && !searchResults.contains(e.target)) {
            searchResults.style.display = 'none';
        }
    });

    saveBtn?.addEventListener('click', async () => {
        const employeeId = document.getElementById('hauling-emp-id').value;
        const date = document.getElementById('hauling-date').value;
        const chickens = parseInt(totalChickens.value) || 0;
        const rate = parseFloat(ratePerChicken.value) || 0;
        const amount = chickens * rate;

        if (!employeeId || !date || chickens <= 0 || rate <= 0) {
            alert('Please fill all required fields');
            return;
        }

        try {
            const res = await fetch('/api/chicken-hauling', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ employee_id: employeeId, date, total_chickens: chickens, rate_per_chicken: rate, total_amount: amount })
            });
            if (res.ok) {
                alert('Hauling log saved');
                closeModal();
                loadHaulingLogs();
            } else {
                const err = await res.json();
                alert('Error: ' + (err.error || 'Failed to save'));
            }
        } catch (err) {
            console.error('Save error:', err);
            alert('Failed to save');
        }
    });

    async function loadHaulingLogs(page = 1) {
        const tbody = document.getElementById('chicken-hauling-tbody');
        tbody.innerHTML = '<tr><td colspan="11" style="text-align: center; padding: 20px; color: #999;">Loading...</td></tr>';
        try {
            const search = document.getElementById('chicken-hauling-search')?.value || '';
            const res = await fetch(`/api/chicken-hauling?page=${page}&search=${encodeURIComponent(search)}`);
            const data = await res.json();
            const logs = data.logs || [];
            if (logs.length === 0) {
                tbody.innerHTML = '<tr><td colspan="11" style="text-align: center; padding: 20px; color: #999;">No hauling logs found</td></tr>';
                return;
            }
            tbody.innerHTML = logs.map(log => `
                <tr>
                    <td style="padding: 10px; border-bottom: 1px solid #eee;">${log.hauling_id || '-'}</td>
                    <td style="padding: 10px; border-bottom: 1px solid #eee;">${log.employee_id || '-'}</td>
                    <td style="padding: 10px; border-bottom: 1px solid #eee;">${log.last_name || '-'}</td>
                    <td style="padding: 10px; border-bottom: 1px solid #eee;">${log.first_name || '-'}</td>
                    <td style="padding: 10px; border-bottom: 1px solid #eee;">${log.date ? new Date(log.date).toLocaleDateString() : '-'}</td>
                    <td style="padding: 10px; border-bottom: 1px solid #eee; text-align: right;">${log.total_chickens || 0}</td>
                    <td style="padding: 10px; border-bottom: 1px solid #eee; text-align: right;">P ${(log.rate_per_chicken || 0).toLocaleString('en-US', {minimumFractionDigits: 2})}</td>
                    <td style="padding: 10px; border-bottom: 1px solid #eee; text-align: right;">P ${(log.total_amount || 0).toLocaleString('en-US', {minimumFractionDigits: 2})}</td>
                    <td style="padding: 10px; border-bottom: 1px solid #eee;">${log.created_by || '-'}</td>
                    <td style="padding: 10px; border-bottom: 1px solid #eee;"><span class="status-badge status-${(log.status || 'pending').toLowerCase()}">${log.status || 'Pending'}</span></td>
                    <td style="padding: 10px; border-bottom: 1px solid #eee;"><button class="view-hauling-btn btn-icon-circle" data-id="${log.hauling_id}"><svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg></button></td>
                </tr>
            `).join('');
        } catch (err) {
            console.error('Load error:', err);
            tbody.innerHTML = '<tr><td colspan="11" style="text-align: center; padding: 20px; color: #999;">Failed to load</td></tr>';
        }
    }

    document.getElementById('chicken-hauling-search')?.addEventListener('input', (e) => {
        clearTimeout(window.haulingSearchTimeout);
        window.haulingSearchTimeout = setTimeout(() => loadHaulingLogs(1), 300);
    });

    loadHaulingLogs();
};