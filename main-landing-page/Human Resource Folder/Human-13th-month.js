if (typeof ModuleComponents === 'undefined') { window.ModuleComponents = {}; }

ModuleComponents['hr-13th-month'] = (container) => {
    container.innerHTML = `
        <div class="header-actions">
            <h2>13th month Pay</h2>
        </div>
        <div class="action-buttons-row">
            <button id="generate-year-end-13th-btn" class="btn-icon-circle">
                <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="2" width="16" height="20" rx="2"></rect><line x1="8" y1="6" x2="16" y2="6"></line><line x1="8" y1="10" x2="16" y2="10"></line><line x1="8" y1="14" x2="10" y2="14"></line><line x1="14" y1="14" x2="16" y2="14"></line><line x1="8" y1="18" x2="10" y2="18"></line><line x1="14" y1="18" x2="16" y2="18"></line></svg>
                <span class="btn-label">Process 13th-month</span>
            </button>
            <button id="generate-prorated-13th-btn" class="btn-icon-circle">
                <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                <span class="btn-label">Generate Prorated 13th month</span>
            </button>
        </div>
        <div class="tracking-cards-row">
            <div class="card tracking-card">
                <h3>Accumulated 13th month</h3>
                <p class="card-sub-label">grand total for year end 13th month pay</p>
                <div class="card-value-row">
                    <div class="card-value">P 234,567.00</div>
                </div>
            </div>
            <div class="card tracking-card">
                <h3>Total Prorated Paid-to-date</h3>
                <p class="card-sub-label">a running total of 13th month that had been paid out early</p>
                <div class="card-value-row">
                    <div class="card-value">P 34,500.00</div>
                </div>
            </div>
            <div class="card tracking-card">
                <h3>Last Year 13th month Total payouts</h3>
                <p class="card-sub-label">total accumulation of last years 13th month prorated and Year end</p>
                <div class="card-value-row">
                    <div class="card-value">P 350,000.00</div>
                </div>
            </div>
        </div>
        <div class="card graph-placeholder month13-employee-search-card">
            <div class="card-header-row">
                <h3>Employee 13th month Computation</h3>
                <div style="display: flex; gap: 8px; align-items: center; position: relative;">
                    <input type="number" id="month13-year-picker" placeholder="Year" style="padding: 8px 12px; border: 1px solid #D6D6D6; border-radius: 6px; font-size: 14px; width: 100px;">
                    <input type="text" id="month13-employee-search" class="employee-search-input" placeholder="Search employee..." style="width: 220px; position: relative;">
                    <div id="month13-search-results" style="position: absolute; top: 100%; left: 0; right: 0; background: #fff; border: 1px solid #e2e8f0; border-radius: 6px; max-height: 200px; overflow-y: auto; z-index: 10; display: none; box-shadow: 0 4px 6px rgba(0,0,0,0.1);"></div>
                </div>
            </div>
            <div class="month13-search-layout">
                <div class="month13-search-left">
                    <div class="employee-card" id="month13-employee-card">
                        <div class="emp-photo" id="month13-emp-photo">👤</div>
                        <div class="emp-info">
                            <div class="emp-name" id="month13-emp-name">Select an employee</div>
                            <div class="emp-id" id="month13-emp-id"></div>
                            <div class="emp-start" id="month13-emp-start"></div>
                            <div class="emp-accrued" id="month13-emp-accrued"></div>
                            <div class="emp-running" id="month13-emp-running"></div>
                        </div>
                    </div>
                </div>
                <div class="month13-search-right">
                    <table class="data-table product-table">
                        <thead>
                            <tr>
                                <th>Month</th>
                                <th>Days Worked</th>
                                <th>Salary</th>
                                <th>13th Month Amount</th>
                            </tr>
                        </thead>
                        <tbody id="month13-table-body">
                            <tr><td colspan="4" style="text-align: center; padding: 20px; color: #999;">Search and select an employee to view details</td></tr>
                        </tbody>
                        <tfoot id="month13-table-footer">
                        </tfoot>
                    </table>
                </div>
            </div>
        </div>
        <div class="card graph-placeholder month13-transaction-card">
            <h3>13thmonth pay transactions</h3>
            <div class="table-wrap">
                <table class="data-table product-table">
                    <thead>
                        <tr>
                            <th>13thmonth transaction ID</th>
                            <th>Date</th>
                            <th>Remarks</th>
                            <th>Amount</th>
                            <th>Mode of payment</th>
                            <th>Reference</th>
                            <th>Payment Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr><td>13M-001</td><td>2026-07-01</td><td>Year-end payout</td><td>P 234,567.00</td><td>Bank Transfer</td><td>REF-13M-001</td><td>Paid</td></tr>
                        <tr><td>13M-002</td><td>2026-06-15</td><td>Prorated payout</td><td>P 34,500.00</td><td>Cash</td><td>REF-13M-002</td><td>Pending</td></tr>
                        <tr><td>13M-003</td><td>2025-12-20</td><td>Last year payout</td><td>P 350,000.00</td><td>Bank Transfer</td><td>REF-13M-003</td><td>Paid</td></tr>
                    </tbody>
                </table>
            </div>
        </div>
    `;

    const generate13thModal = document.createElement('div');
    generate13thModal.id = 'generate-13th-modal';
    generate13thModal.className = 'modal';
    generate13thModal.style.cssText = 'display:none; align-items: flex-start; padding-top: 20px; overflow-y: auto;';
    generate13thModal.innerHTML = `
        <div class="modal-content" style="max-width: 900px; width: 95%; max-height: 85vh; overflow-y: auto;">
            <div class="modal-header-row">
                <h3>Generate 13th month</h3>
                <button class="modal-close-btn" id="close-generate-13th-modal">&times;</button>
            </div>
            <div class="modal-body" style="padding: 16px;">
                <div style="margin-bottom: 12px; position: relative;">
                    <input type="text" id="generate-13th-search" placeholder="Search active employees..." style="width: 100%; box-sizing: border-box; padding: 8px; border: 1px solid #D6D6D6; border-radius: 6px; font-size: 14px;">
                    <div id="generate-13th-search-results" style="position: absolute; top: 100%; left: 0; right: 0; background: #fff; border: 1px solid #e2e8f0; border-radius: 6px; max-height: 200px; overflow-y: auto; z-index: 10; display: none; box-shadow: 0 4px 6px rgba(0,0,0,0.1);"></div>
                </div>
                <div style="overflow-x: auto;">
                    <table class="data-table product-table">
                        <thead>
                            <tr>
                                <th>Employee</th>
                                <th>Total No. of Days Worked</th>
                                <th>Rate</th>
                                <th>Amount</th>
                                <th>Bonus</th>
                                <th>Total Amount</th>
                            </tr>
                        </thead>
                        <tbody id="generate-13th-table-body">
                            <tr><td colspan="6" style="text-align: center; padding: 20px; color: #999;">Search and select an employee to add</td></tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div class="modal-footer" style="padding: 12px 16px; text-align: right; border-top: 1px solid #e2e8f0;">
                <button id="save-generate-13th-btn" class="btn-primary" type="button">Save</button>
            </div>
        </div>
    `;
    document.body.appendChild(generate13thModal);

    const closeGenerate13thModal = document.getElementById('close-generate-13th-modal');
    const generate13thSearch = document.getElementById('generate-13th-search');
    const generate13thSearchResults = document.getElementById('generate-13th-search-results');
    const generate13thTableBody = document.getElementById('generate-13th-table-body');
    const saveGenerate13thBtn = document.getElementById('save-generate-13th-btn');
    let generate13thDebounce = null;
    let generate13thRows = [];

    if (closeGenerate13thModal && generate13thModal) {
        closeGenerate13thModal.addEventListener('click', () => {
            generate13thModal.style.display = 'none';
        });
    }

    if (generate13thModal) {
        generate13thModal.addEventListener('click', (e) => {
            if (e.target === generate13thModal) generate13thModal.style.display = 'none';
        });
    }

    const renderGenerate13thTable = () => {
        if (!generate13thTableBody) return;
        if (generate13thRows.length === 0) {
            generate13thTableBody.innerHTML = '<tr><td colspan="6" style="text-align: center; padding: 20px; color: #999;">Search and select an employee to add</td></tr>';
            return;
        }
        generate13thTableBody.innerHTML = generate13thRows.map((row, idx) => `
            <tr>
                <td style="text-align: center;">${row.employeeName}</td>
                <td style="text-align: center;">${Number(row.daysWorked).toFixed(2)}</td>
                <td style="text-align: center;">${fmtMoney(row.rate)}</td>
                <td style="text-align: center;">${fmtMoney(row.amount)}</td>
                <td style="text-align: center;"><input type="number" class="generate-13th-bonus" data-idx="${idx}" value="${row.bonus || 0}" style="width: 100px; padding: 4px; border: 1px solid #D6D6D6; border-radius: 4px; text-align: center;"></td>
                <td style="text-align: center;" class="generate-13th-total">${fmtMoney((Number(row.amount) || 0) + (Number(row.bonus) || 0))}</td>
            </tr>
        `).join('');

        generate13thTableBody.querySelectorAll('.generate-13th-bonus').forEach(input => {
            input.addEventListener('input', (e) => {
                const idx = parseInt(e.target.getAttribute('data-idx'), 10);
                const bonus = Number(e.target.value) || 0;
                generate13thRows[idx].bonus = bonus;
                const totalCell = e.target.closest('tr').querySelector('.generate-13th-total');
                if (totalCell) {
                    totalCell.textContent = fmtMoney((Number(generate13thRows[idx].amount) || 0) + bonus);
                }
            });
        });
    };

    const addGenerate13thRow = (profile) => {
        const empName = [profile.last_name, profile.first_name, profile.middle_name].filter(Boolean).join(', ');
        const compensation = profile.compensation || {};
        const salaryAmount = Number(compensation.salary_amount) || 0;
        const salaryPayMode = compensation.salary_pay_mode || 'Monthly';
        const dailyRate = salaryPayMode === 'Daily' ? salaryAmount : salaryAmount / 22;
        const daysWorked = 0;
        const amount = daysWorked * dailyRate;
        generate13thRows.push({
            employeeId: profile.employee_id,
            employeeName: empName || profile.employee_id,
            daysWorked,
            rate: parseFloat(dailyRate.toFixed(2)),
            amount: parseFloat(amount.toFixed(2)),
            bonus: 0
        });
        renderGenerate13thTable();
        if (generate13thSearchResults) generate13thSearchResults.style.display = 'none';
        if (generate13thSearch) generate13thSearch.value = '';
    };

    const openGenerate13thModal = () => {
        generate13thRows = [];
        renderGenerate13thTable();
        if (generate13thModal) generate13thModal.style.display = 'flex';
    };

    const process13thBtn = document.getElementById('generate-year-end-13th-btn');
    if (process13thBtn) {
        process13thBtn.addEventListener('click', () => {
            openGenerate13thModal();
        });
    }

    if (generate13thSearch && generate13thSearchResults) {
        generate13thSearch.addEventListener('input', (e) => {
            const query = e.target.value.trim();
            if (generate13thDebounce) clearTimeout(generate13thDebounce);
            if (query.length < 2) {
                generate13thSearchResults.style.display = 'none';
                return;
            }
            generate13thDebounce = setTimeout(async () => {
                try {
                    const res = await fetch(`/api/employee-profiles?search=${encodeURIComponent(query)}&status=active`);
                    if (!res.ok) throw new Error('Search failed');
                    const profiles = await res.json();
                    if (!Array.isArray(profiles) || profiles.length === 0) {
                        generate13thSearchResults.innerHTML = '<div style="padding: 10px; color: #64748b; font-size: 13px;">No employees found</div>';
                        generate13thSearchResults.style.display = 'block';
                        return;
                    }
                    generate13thSearchResults.innerHTML = profiles.map(p => `
                        <div class="employee-search-result" data-employee-id="${p.employee_id}" style="padding: 10px; cursor: pointer; border-bottom: 1px solid #f1f5f9; font-size: 14px;">
                            <div style="font-weight: 600; color: #1a1f2e;">${p.last_name || ''}, ${p.first_name || ''} ${p.middle_name || ''}</div>
                            <div style="font-size: 12px; color: #64748b;">${p.employee_id || ''}</div>
                        </div>
                    `).join('');
                    generate13thSearchResults.style.display = 'block';

                    generate13thSearchResults.querySelectorAll('.employee-search-result').forEach(item => {
                        item.addEventListener('click', () => {
                            const empId = item.getAttribute('data-employee-id');
                            const selected = profiles.find(p => p.employee_id === empId);
                            if (selected) addGenerate13thRow(selected);
                        });
                    });
                } catch (err) {
                    console.error('Search error:', err);
                }
            }, 300);
        });
    }

    if (saveGenerate13thBtn) {
        saveGenerate13thBtn.addEventListener('click', () => {
            alert('Save clicked. Backend logic not yet implemented.');
        });
    }

    const yearPicker = document.getElementById('month13-year-picker');
    const searchInput = document.getElementById('month13-employee-search');
    const searchResults = document.getElementById('month13-search-results');
    let searchDebounce = null;
    let selectedEmployeeId = null;

    if (yearPicker) {
        yearPicker.value = new Date().getFullYear();
    }

    const fmtMoney = (val) => {
        const n = Number(val) || 0;
        return 'P ' + n.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    };

    const renderMonth13Table = (monthlyData, total) => {
        const tbody = document.getElementById('month13-table-body');
        const tfoot = document.getElementById('month13-table-footer');
        if (!tbody || !tfoot) return;

        if (!monthlyData || monthlyData.length === 0) {
            tbody.innerHTML = '<tr><td colspan="4" style="text-align: center; padding: 20px; color: #999;">No data available</td></tr>';
            tfoot.innerHTML = '';
            return;
        }

        tbody.innerHTML = monthlyData.map(row => `
            <tr>
                <td style="text-align: center;">${row.month}</td>
                <td style="text-align: center;">${Number(row.daysWorked).toFixed(2)}</td>
                <td style="text-align: center;">${fmtMoney(row.salary)}</td>
                <td style="text-align: center;">${fmtMoney(row.thirteenthMonth)}</td>
            </tr>
        `).join('');

        tfoot.innerHTML = `<tr class="month13-total-row"><td colspan="3">Total 13th month</td><td style="text-align: right;">${fmtMoney(total)}</td></tr>`;
    };

    const selectEmployee = async (empId) => {
        selectedEmployeeId = empId;
        const year = yearPicker ? yearPicker.value : new Date().getFullYear();
        if (!year) {
            alert('Please select a year');
            return;
        }

        try {
            const res = await fetch(`/api/employee-profiles/${encodeURIComponent(empId)}/13th-month?year=${encodeURIComponent(year)}`);
            if (!res.ok) {
                const err = await res.json().catch(() => ({}));
                throw new Error(err.error || 'Failed to load 13th month data');
            }
            const data = await res.json();

            const photoEl = document.getElementById('month13-emp-photo');
            const nameEl = document.getElementById('month13-emp-name');
            const idEl = document.getElementById('month13-emp-id');
            const startEl = document.getElementById('month13-emp-start');
            const accruedEl = document.getElementById('month13-emp-accrued');
            const runningEl = document.getElementById('month13-emp-running');

            if (photoEl) {
                if (data.photo && data.photo.photo_url) {
                    photoEl.innerHTML = `<img src="${data.photo.photo_url}" style="width: 80px; height: 80px; border-radius: 50%; object-fit: cover;">`;
                } else {
                    photoEl.innerHTML = '👤';
                }
            }
            if (nameEl) nameEl.textContent = [data.employee.last_name, data.employee.first_name, data.employee.middle_name].filter(Boolean).join(' ') || '-';
            if (idEl) idEl.textContent = data.employee.employee_id || '';
            if (startEl) startEl.textContent = data.employee.date_of_hire ? `Start Date: ${new Date(data.employee.date_of_hire).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}` : '';
            if (accruedEl) accruedEl.textContent = `Accrued Total: ${fmtMoney(data.totalThirteenthMonth)}`;
            if (runningEl) runningEl.textContent = `Daily Rate: ${fmtMoney(data.compensation.daily_rate)}`;

            renderMonth13Table(data.monthlyData, data.totalThirteenthMonth);

            if (searchResults) searchResults.style.display = 'none';
            if (searchInput) searchInput.value = '';
        } catch (err) {
            console.error('Failed to load 13th month data:', err);
            alert(err.message || 'Failed to load 13th month data');
        }
    };

    if (searchInput && searchResults) {
        searchInput.addEventListener('input', (e) => {
            const query = e.target.value.trim();
            if (searchDebounce) clearTimeout(searchDebounce);
            if (query.length < 2) {
                searchResults.style.display = 'none';
                return;
            }
            searchDebounce = setTimeout(async () => {
                try {
                    const res = await fetch(`/api/employee-profiles?search=${encodeURIComponent(query)}`);
                    if (!res.ok) throw new Error('Search failed');
                    const profiles = await res.json();
                    if (!Array.isArray(profiles) || profiles.length === 0) {
                        searchResults.innerHTML = '<div style="padding: 10px; color: #64748b; font-size: 13px;">No employees found</div>';
                        searchResults.style.display = 'block';
                        return;
                    }
                    searchResults.innerHTML = profiles.map(p => `
                        <div class="employee-search-result" data-employee-id="${p.employee_id}" style="padding: 10px; cursor: pointer; border-bottom: 1px solid #f1f5f9; font-size: 14px;">
                            <div style="font-weight: 600; color: #1a1f2e;">${p.last_name || ''}, ${p.first_name || ''} ${p.middle_name || ''}</div>
                            <div style="font-size: 12px; color: #64748b;">${p.employee_id || ''}</div>
                        </div>
                    `).join('');
                    searchResults.style.display = 'block';

                    searchResults.querySelectorAll('.employee-search-result').forEach(item => {
                        item.addEventListener('click', () => {
                            const empId = item.getAttribute('data-employee-id');
                            selectEmployee(empId);
                        });
                    });
                } catch (err) {
                    console.error('Search error:', err);
                }
            }, 300);
        });
    }

    if (yearPicker && searchInput) {
        yearPicker.addEventListener('change', () => {
            if (selectedEmployeeId) {
                selectEmployee(selectedEmployeeId);
            }
        });
    }
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
