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

            <div class="card" style="padding: 0; margin-bottom: 20px;">
                <div style="padding: 16px 20px; border-bottom: 1px solid #ddd; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 8px;">
                    <h3 style="margin: 0; font-size: 16px; font-weight: 600; color: #1a1f2e;">Chicken Hauling Logs</h3>
                </div>
                <div style="overflow-x: auto;">
                    <table class="data-table" style="width: 100%; border-collapse: collapse; font-size: 13px; min-width: 900px;">
                        <thead>
                            <tr>
                                <th style="padding: 8px; border: 1px solid #ddd; background: #FFD000;">Chicken Hauling ID</th>
                                <th style="padding: 8px; border: 1px solid #ddd; background: #FFD000;">Date</th>
                                <th style="padding: 8px; border: 1px solid #ddd; background: #FFD000;">Building</th>
                                <th style="padding: 8px; border: 1px solid #ddd; background: #FFD000;">Start Time</th>
                                <th style="padding: 8px; border: 1px solid #ddd; background: #FFD000;">End Time</th>
                                <th style="padding: 8px; border: 1px solid #ddd; background: #FFD000;">No. of Employees</th>
                                <th style="padding: 8px; border: 1px solid #ddd; background: #FFD000;">Grand Total</th>
                                <th style="padding: 8px; border: 1px solid #ddd; background: #FFD000;">Status</th>
                                <th style="padding: 8px; border: 1px solid #ddd; background: #FFD000;">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr><td colspan="9" style="padding: 20px; border: 1px solid #ddd; text-align: center; color: #999;">No data</td></tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <div class="card" style="padding: 0; margin-bottom: 20px;">
                <div style="padding: 16px 20px; border-bottom: 1px solid #ddd;">
                    <h3 style="margin: 0; font-size: 16px; font-weight: 600; color: #1a1f2e;">Confirmed Batch Chicken Hauling Logs</h3>
                </div>
                <div style="overflow-x: auto;">
                    <table class="data-table" style="width: 100%; border-collapse: collapse; font-size: 13px; min-width: 900px;">
                        <thead>
                            <tr>
                                <th style="padding: 8px; border: 1px solid #ddd; background: #FFD000;">Batch Chicken Hauling ID</th>
                                <th style="padding: 8px; border: 1px solid #ddd; background: #FFD000;">Date Start</th>
                                <th style="padding: 8px; border: 1px solid #ddd; background: #FFD000;">Date End</th>
                                <th style="padding: 8px; border: 1px solid #ddd; background: #FFD000;">Building</th>
                                <th style="padding: 8px; border: 1px solid #ddd; background: #FFD000;">Grand Total</th>
                                <th style="padding: 8px; border: 1px solid #ddd; background: #FFD000;">Status</th>
                                <th style="padding: 8px; border: 1px solid #ddd; background: #FFD000;">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr><td colspan="7" style="padding: 20px; border: 1px solid #ddd; text-align: center; color: #999;">No data</td></tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <div class="card" style="padding: 0; margin-bottom: 20px;">
                <div style="padding: 16px 20px; border-bottom: 1px solid #ddd; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 8px;">
                    <h3 style="margin: 0; font-size: 16px; font-weight: 600; color: #1a1f2e;">Chicken Hauling Logs Batch</h3>
                    <button id="confirm-chicken-hauling-batch-btn" class="btn-primary" type="button" style="padding: 8px 16px; font-size: 14px;">Confirm Batch Chicken Hauling Salary</button>
                </div>
                <div style="padding: 40px 20px; text-align: center; color: #999;">
                    <p style="margin: 0;">No hauling logs yet. Click "Create Hauling logs" to add a new batch.</p>
                </div>
            </div>

        <div id="hauling-log-modal" class="modal" style="display:none; align-items: center; justify-content: center;">
            <div class="modal-content" style="max-width: 1000px; width: 95%; max-height: 90vh; display: flex; flex-direction: column;">
                <div class="modal-header-row">
                    <h3>Create Chicken Hauling Log</h3>
                    <button class="modal-close-btn" id="close-hauling-log-modal">&times;</button>
                </div>
                <div style="overflow-y: auto; padding: 20px; display: flex; flex-direction: column; gap: 16px;">
                    <div style="display: flex; gap: 16px; flex-wrap: wrap; align-items: flex-end;">
                        <div style="flex: 1; min-width: 200px; display: flex; flex-direction: column; gap: 4px;">
                            <label style="font-weight: 600; font-size: 13px; color: #333;">Chicken Hauling ID</label>
                            <input type="text" id="hauling-id" readonly style="padding: 8px; border: 1px solid #ddd; border-radius: 6px; background: #f1f5f9; font-size: 14px; font-weight: 600; color: #1a1f2e;">
                        </div>
                        <div style="flex: 1; min-width: 200px; display: flex; flex-direction: column; gap: 4px;">
                            <label style="font-weight: 600; font-size: 13px; color: #333;">Date</label>
                            <input type="date" id="hauling-date" style="padding: 8px; border: 1px solid #ddd; border-radius: 6px; font-size: 14px;">
                        </div>
                    </div>
                    <div style="display: flex; gap: 16px; flex-wrap: wrap; align-items: flex-end;">
                        <div style="flex: 1; min-width: 300px; display: flex; flex-direction: column; gap: 4px;">
                            <label style="font-weight: 600; font-size: 13px; color: #333;">Building Worked</label>
                            <select id="hauling-building" style="padding: 8px; border: 1px solid #ddd; border-radius: 6px; font-size: 14px;">
                                <option value="">Select building</option>
                            </select>
                        </div>
                        <div style="flex: 1; min-width: 200px; display: flex; flex-direction: column; gap: 4px;">
                            <label style="font-weight: 600; font-size: 13px; color: #333;">Start Time</label>
                            <input type="time" id="hauling-start-time" style="padding: 8px; border: 1px solid #ddd; border-radius: 6px; font-size: 14px;">
                        </div>
                        <div style="flex: 1; min-width: 200px; display: flex; flex-direction: column; gap: 4px;">
                            <label style="font-weight: 600; font-size: 13px; color: #333;">End Time</label>
                            <input type="time" id="hauling-end-time" style="padding: 8px; border: 1px solid #ddd; border-radius: 6px; font-size: 14px;">
                        </div>
                    </div>
                    <div style="border-top: 1px solid #eee; padding-top: 16px;">
                        <div style="display: flex; gap: 8px; margin-bottom: 12px; align-items: flex-end; flex-wrap: wrap;">
                            <label style="font-weight: 600; font-size: 13px; color: #333; margin-bottom: 4px;">Workers</label>
                            <div style="flex: 1; min-width: 300px; position: relative;">
                                <input type="text" id="hauling-search-worker" placeholder="Search workers..." style="padding: 8px; border: 1px solid #ddd; border-radius: 6px; font-size: 14px; width: 100%; box-sizing: border-box;">
                                <div id="hauling-worker-search-results" style="display: none; position: absolute; top: 100%; left: 0; right: 0; background: #fff; border: 1px solid #D6D6D6; border-radius: 6px; box-shadow: 0 4px 12px rgba(0,0,0,0.1); z-index: 9999; max-height: 200px; overflow-y: auto; margin-top: 4px;"></div>
                            </div>
                            <div style="flex: 0 0 200px; display: flex; flex-direction: column; gap: 4px;">
                                <label style="font-weight: 600; font-size: 13px; color: #333;">Grand Total</label>
                                <input type="text" id="hauling-grand-total" readonly style="padding: 8px; border: 1px solid #ddd; border-radius: 6px; background: #f1f5f9; font-size: 14px; font-weight: 700; color: #1a1f2e; text-align: right;" value="P 0.00">
                            </div>
                        </div>
                        <div style="overflow-x: auto;">
                            <table class="data-table" style="width: 100%; border-collapse: collapse; font-size: 13px; min-width: 900px;">
                                <thead>
                                    <tr style="background: #f8f9fa;">
                                        <th style="padding: 8px; border: 1px solid #ddd; width: 40px;">#</th>
                                        <th style="padding: 8px; border: 1px solid #ddd;">Employee ID</th>
                                        <th style="padding: 8px; border: 1px solid #ddd;">Last Name</th>
                                        <th style="padding: 8px; border: 1px solid #ddd;">First Name</th>
                                        <th style="padding: 8px; border: 1px solid #ddd; width: 100px;">Total Hours</th>
                                        <th style="padding: 8px; border: 1px solid #ddd; width: 140px;">Salary Amount</th>
                                        <th style="padding: 8px; border: 1px solid #ddd; width: 80px;">Action</th>
                                    </tr>
                                </thead>
                                <tbody id="hauling-workers-tbody">
                                </tbody>
                            </table>
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
    const haulingIdInput = document.getElementById('hauling-id');
    const buildingSelect = document.getElementById('hauling-building');
    const searchWorker = document.getElementById('hauling-search-worker');
    const workerSearchResults = document.getElementById('hauling-worker-search-results');
    const workersTbody = document.getElementById('hauling-workers-tbody');
    const grandTotalInput = document.getElementById('hauling-grand-total');
    const startTimeInput = document.getElementById('hauling-start-time');
    const endTimeInput = document.getElementById('hauling-end-time');

    let haulingCounter = 1;
    let selectedWorkers = [];
    let buildingsCache = [];
    let isDropdownInteraction = false;

    function generateHaulingId() {
        return `ChHaID-${haulingCounter}`;
    }

    function calculateHours(start, end) {
        if (!start || !end) return 0;
        const [sh, sm] = start.split(':').map(Number);
        const [eh, em] = end.split(':').map(Number);
        const startMinutes = sh * 60 + sm;
        const endMinutes = eh * 60 + em;
        let diff = endMinutes - startMinutes;
        if (diff < 0) diff += 24 * 60;
        return diff / 60;
    }

    function calculateGrandTotal() {
        let total = 0;
        selectedWorkers.forEach(w => {
            if (w.salary_amount) total += parseFloat(w.salary_amount) || 0;
        });
        grandTotalInput.value = `P ${total.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    }

    function resetModal() {
        haulingIdInput.value = generateHaulingId();
        document.getElementById('hauling-date').value = new Date().toISOString().split('T')[0];
        document.getElementById('hauling-start-time').value = '';
        document.getElementById('hauling-end-time').value = '';
        buildingSelect.value = '';
        searchWorker.value = '';
        workerSearchResults.style.display = 'none';
        selectedWorkers = [];
        renderWorkersTable();
    }

    function renderWorkersTable() {
        const hours = calculateHours(startTimeInput.value, endTimeInput.value);
        workersTbody.innerHTML = '';
        for (let i = 0; i < 10; i++) {
            const worker = selectedWorkers[i];
            const row = document.createElement('tr');
            let salaryValue = '';
            if (worker && worker.daily_rate) {
                const hourlyRate = (worker.daily_rate / 8) * 1.25;
                salaryValue = (hourlyRate * hours).toFixed(2);
            }
            row.innerHTML = `
                <td style="padding: 8px; border: 1px solid #ddd; text-align: center;">${i + 1}</td>
                <td style="padding: 8px; border: 1px solid #ddd;">${worker ? worker.employee_id : ''}</td>
                <td style="padding: 8px; border: 1px solid #ddd;">${worker ? worker.last_name : ''}</td>
                <td style="padding: 8px; border: 1px solid #ddd;">${worker ? worker.first_name : ''}</td>
                <td style="padding: 8px; border: 1px solid #ddd; text-align: center;">
                    ${worker ? `<input type="number" class="worker-hours" data-index="${i}" value="${hours.toFixed(2)}" step="0.25" min="0" style="width: 70px; padding: 4px; border: 1px solid #ddd; border-radius: 4px; text-align: center; font-size: 12px;">` : ''}
                </td>
                <td style="padding: 8px; border: 1px solid #ddd; text-align: right;">
                    ${worker ? `<input type="text" class="worker-salary" data-index="${i}" value="${salaryValue}" readonly style="width: 120px; padding: 4px; border: 1px solid #ddd; border-radius: 4px; text-align: right; font-size: 12px; background: #f1f5f9;">` : ''}
                </td>
                <td style="padding: 8px; border: 1px solid #ddd; text-align: center;">
                    ${worker ? `<button class="remove-worker-btn" data-index="${i}" style="background: none; border: none; color: #999; cursor: pointer; font-size: 16px; font-weight: bold; padding: 0 8px; line-height: 1;">×</button>` : ''}
                </td>
            `;
            workersTbody.appendChild(row);
        }
        calculateGrandTotal();
    }

    function getAuthHeaders() {
        const token = localStorage.getItem('goldenfield_auth_token');
        return token ? { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' } : { 'Content-Type': 'application/json' };
    }

    async function loadBuildings() {
        try {
            const res = await fetch('/api/layer-buildings-reports/buildings/active', {
                headers: getAuthHeaders()
            });
            const buildings = await res.json();
            buildingsCache = Array.isArray(buildings) ? buildings : [];
            buildingSelect.innerHTML = '<option value="">Select building</option>';
            buildingsCache.forEach(b => {
                const opt = document.createElement('option');
                opt.value = b.building_id || b.id;
                opt.textContent = b.building_name || b.name || b.building_id || b.id;
                buildingSelect.appendChild(opt);
            });
        } catch (err) {
            console.error('Failed to load buildings:', err);
            buildingSelect.innerHTML = '<option value="">Failed to load buildings</option>';
        }
    }

    function openModal() {
        resetModal();
        loadBuildings();
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
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

    searchWorker?.addEventListener('input', async (e) => {
        const query = e.target.value.trim();
        if (query.length < 2) {
            workerSearchResults.style.display = 'none';
            return;
        }
        try {
            const res = await fetch(`/api/salary-computation/search?q=${encodeURIComponent(query)}`, {
                headers: getAuthHeaders()
            });
            const employees = await res.json();
            if (employees.length > 0) {
                workerSearchResults.innerHTML = employees.map(emp => `
                    <div class="search-result-item" style="padding: 10px 12px; cursor: pointer; border-bottom: 1px solid #eee;" data-id="${emp.employee_id}" data-last="${emp.last_name}" data-first="${emp.first_name}" data-middle="${emp.middle_name || ''}">
                        <strong>${emp.last_name}, ${emp.first_name} ${emp.middle_name || ''}</strong><br>
                        <small style="color: #666;">${emp.employee_id}</small>
                    </div>
                `).join('');
                workerSearchResults.style.display = 'block';
            } else {
                workerSearchResults.innerHTML = '<div style="padding: 10px 12px; color: #999;">No workers found</div>';
                workerSearchResults.style.display = 'block';
            }
        } catch (err) {
            console.error('Search error:', err);
        }
    });

workerSearchResults?.addEventListener('mousedown', async (e) => {
        isDropdownInteraction = true;
        const item = e.target.closest('.search-result-item');
        if (item) {
            const empId = item.dataset.id;
            try {
                const compRes = await fetch(`/api/employee-compensations/employee/${empId}`, {
                    headers: getAuthHeaders()
                });
                const comp = await compRes.json();
                const dailyRate = parseFloat(comp.salary_amount) || 0;
                addWorkerToTable(empId, item.dataset.last, item.dataset.first, item.dataset.middle, dailyRate);
            } catch (err) {
                console.error('Failed to fetch compensation:', err);
                addWorkerToTable(empId, item.dataset.last, item.dataset.first, item.dataset.middle, 0);
            }
            isDropdownInteraction = false;
        }
    });

    document.addEventListener('click', (e) => {
        const removeBtn = e.target.closest('.remove-worker-btn');
        if (removeBtn) {
            if (confirm('Are you sure you want to delete this worker?')) {
                const idx = parseInt(removeBtn.dataset.index);
                selectedWorkers.splice(idx, 1);
                renderWorkersTable();
            }
        }
    });

    function addWorkerToTable(empId, lastName, firstName, middleName, dailyRate) {
        const worker = {
            employee_id: empId,
            last_name: lastName,
            first_name: firstName,
            middle_name: middleName,
            daily_rate: dailyRate
        };
        if (selectedWorkers.length < 10) {
            selectedWorkers.push(worker);
        } else {
            selectedWorkers = [worker, ...selectedWorkers.slice(0, 9)];
        }
        searchWorker.value = '';
        workerSearchResults.style.display = 'none';
        renderWorkersTable();
    }

    searchWorker?.addEventListener('blur', (e) => {
        if (!isDropdownInteraction) {
            setTimeout(() => {
                workerSearchResults.style.display = 'none';
            }, 100);
        }
    });

    workersTbody?.addEventListener('input', (e) => {
        const target = e.target;
        const idx = parseInt(target.dataset.index);
        if (isNaN(idx)) return;
        const worker = selectedWorkers[idx];
        if (!worker) return;
        if (target.classList.contains('worker-hours')) {
            worker.hours = parseFloat(target.value) || 0;
            // Recalculate salary for this worker
            if (worker.daily_rate) {
                const hourlyRate = (worker.daily_rate / 8) * 1.25;
                worker.salary_amount = (hourlyRate * worker.hours).toFixed(2);
                // Update the salary input display
                const salaryInput = target.closest('tr').querySelector('.worker-salary');
                if (salaryInput) salaryInput.value = worker.salary_amount;
            }
            calculateGrandTotal();
        }
    });

    startTimeInput?.addEventListener('change', () => renderWorkersTable());
    endTimeInput?.addEventListener('change', () => renderWorkersTable());

    saveBtn?.addEventListener('click', async () => {
        const haulingId = haulingIdInput.value;
        const date = document.getElementById('hauling-date').value;
        const buildingId = buildingSelect.value;
        const startTime = document.getElementById('hauling-start-time').value;
        const endTime = document.getElementById('hauling-end-time').value;

        if (!haulingId || !date || !buildingId || !startTime || !endTime) {
            alert('Please fill all required fields');
            return;
        }
        if (selectedWorkers.length === 0) {
            alert('Please add at least one worker');
            return;
        }

        try {
            const res = await fetch('/api/chicken-hauling', {
                method: 'POST',
                headers: getAuthHeaders(),
                body: JSON.stringify({ hauling_id: haulingId, date, building_id: buildingId, start_time: startTime, end_time: endTime, workers: selectedWorkers })
            });
            if (res.ok) {
                alert('Chicken Hauling log saved');
                haulingCounter++;
                closeModal();
            } else {
                const err = await res.json();
                alert('Error: ' + (err.error || 'Failed to save'));
            }
        } catch (err) {
            console.error('Save error:', err);
            alert('Failed to save');
        }
    });

    const confirmBatchBtn = document.getElementById('confirm-chicken-hauling-batch-btn');
    confirmBatchBtn?.addEventListener('click', () => {
        alert('Confirm Batch Chicken Hauling Salary');
    });
};