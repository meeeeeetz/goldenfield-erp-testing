if (typeof ModuleComponents === 'undefined') { window.ModuleComponents = {}; }

ModuleComponents['hr-scheduling'] = (container) => {
    container.innerHTML = `
        <div class="header-actions">
            <h2>Scheduling</h2>
        </div>
        <div class="action-buttons-row">
            <button id="make-schedule-btn" class="btn-icon-circle">
                <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                <span class="btn-label">Make schedule</span>
            </button>
            <button id="add-shift-policies-btn" class="btn-icon-circle">
                <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="12" y1="12" x2="12" y2="18"></line><line x1="9" y1="15" x2="15" y2="15"></line></svg>
                <span class="btn-label">add shift policies</span>
            </button>
        </div>
        <div class="card" style="margin-top: 24px;">
            <h3>Schedule for the Month</h3>
            <div id="org-tabs-container" style="display: flex; flex-wrap: wrap; gap: 4px; border-bottom: 1px solid #e5e7eb; margin-bottom: 12px;"></div>
            <div style="display: flex; gap: 20px; align-items: flex-start;">
                <div style="flex: 1;">
            <div style="margin-bottom: 12px; display: flex; gap: 10px; align-items: center;">
                <label style="font-weight: 600; font-size: 14px;">Month:</label>
                <input type="month" id="schedule-month" value="2026-08" style="padding: 8px 12px; border: 1px solid #D6D6D6; border-radius: 6px; font-size: 14px;">
            </div>
            <div id="half-month-tabs" style="display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 12px;"></div>
            <div id="schedule-calendar-container" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(55px, 1fr)); gap: 4px; align-items: start;"></div>
                </div>
                <div style="width: 180px; min-width: 180px;">
                    <div style="font-weight: 700; font-size: 14px; margin-bottom: 10px; color: #0f172a;">Employees</div>
                    <div id="employee-list-container" style="display: flex; flex-direction: column; gap: 6px; max-height: 60vh; overflow-y: auto;">
                        <div style="text-align: center; padding: 12px; color: #999; font-size: 12px;">Select an organizational unit</div>
                    </div>
                    <div style="margin-top: 8px; font-size: 11px; color: #6b7280; text-align: center;">Drag to assign shifts</div>
                </div>
            </div>
        </div>
        <div class="card" style="margin-top: 24px;">
            <h3>Shift Policies</h3>
            <div class="table-wrap">
                <table class="data-table product-table">
                    <thead>
                        <tr>
                            <th>Shift Policy ID</th>
                            <th>Shift Name</th>
                            <th>Shift Time Start</th>
                            <th>Shift Time End</th>
                            <th>1st Break In</th>
                            <th>1st Break Out</th>
                            <th>Mid Break In</th>
                            <th>Mid Break Out</th>
                            <th>2nd Break In</th>
                            <th>2nd Break Out</th>
                            <th>Org Unit</th>
                            <th>Remarks</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr><td colspan="13" style="text-align: center; padding: 12px; color: #999;">No records found</td></tr>
                    </tbody>
                </table>
            </div>
        </div>
        <div id="shift-policy-modal" class="modal" style="display:none;">
            <div class="modal-content" style="max-width: 780px; width: 95%;">
                <div class="modal-header-row">
                    <h3>Add Shift Policy</h3>
                    <button class="modal-close-btn" id="close-shift-policy-modal">&times;</button>
                </div>
                <div style="display: flex; gap: 20px; align-items: flex-start;">
                    <div style="flex: 1; display: flex; flex-direction: column; gap: 10px;">
                    <label>Shift Policy ID</label>
                    <input type="text" id="shift-policy-id" value="ShfPo-0001" readonly>
                    <label>Shift name</label>
                    <input type="text" id="shift-name" placeholder="Enter shift name">
                    <label>Shift Time</label>
                    <div style="display: flex; gap: 8px; align-items: center;">
                        <div style="flex: 1;">
                            <input type="time" id="shift-start-time" style="width: 100%; padding: 10px; border: 1px solid #D6D6D6; border-radius: 6px; font-size: 14px; background: #fff; color: #1a1f2e;">
                        </div>
                        <span style="color: #6b7280; font-size: 14px;">-</span>
                        <div style="flex: 1;">
                            <input type="time" id="shift-end-time" style="width: 100%; padding: 10px; border: 1px solid #D6D6D6; border-radius: 6px; font-size: 14px; background: #fff; color: #1a1f2e;">
                        </div>
                    </div>
                    <label>1st Coffee Break</label>
                    <div style="display: flex; gap: 8px; align-items: center;">
                        <div style="flex: 1;">
                            <input type="time" id="first-coffee-break-start" style="width: 100%; padding: 10px; border: 1px solid #D6D6D6; border-radius: 6px; font-size: 14px; background: #fff; color: #1a1f2e;">
                        </div>
                        <span style="color: #6b7280; font-size: 14px;">-</span>
                        <div style="flex: 1;">
                            <input type="time" id="first-coffee-break-end" style="width: 100%; padding: 10px; border: 1px solid #D6D6D6; border-radius: 6px; font-size: 14px; background: #fff; color: #1a1f2e;">
                        </div>
                    </div>
                    <label>Mid Break</label>
                    <div style="display: flex; gap: 8px; align-items: center;">
                        <div style="flex: 1;">
                            <input type="time" id="mid-break-start" style="width: 100%; padding: 10px; border: 1px solid #D6D6D6; border-radius: 6px; font-size: 14px; background: #fff; color: #1a1f2e;">
                        </div>
                        <span style="color: #6b7280; font-size: 14px;">-</span>
                        <div style="flex: 1;">
                            <input type="time" id="mid-break-end" style="width: 100%; padding: 10px; border: 1px solid #D6D6D6; border-radius: 6px; font-size: 14px; background: #fff; color: #1a1f2e;">
                        </div>
                    </div>
                    <label>2nd Coffee Break</label>
                    <div style="display: flex; gap: 8px; align-items: center;">
                        <div style="flex: 1;">
                            <input type="time" id="second-coffee-break-start" style="width: 100%; padding: 10px; border: 1px solid #D6D6D6; border-radius: 6px; font-size: 14px; background: #fff; color: #1a1f2e;">
                        </div>
                        <span style="color: #6b7280; font-size: 14px;">-</span>
                        <div style="flex: 1;">
                            <input type="time" id="second-coffee-break-end" style="width: 100%; padding: 10px; border: 1px solid #D6D6D6; border-radius: 6px; font-size: 14px; background: #fff; color: #1a1f2e;">
                        </div>
                    </div>
                    <label>Organizational Unit</label>
                    <select id="shift-org-unit" class="modal-select">
                        <option value="">Select Organizational Unit</option>
                    </select>
                    <label>remarks</label>
                    <input type="text" id="shift-remarks" placeholder="Enter remarks">
                    <button id="save-shift-policy-btn" class="btn-primary" style="margin-top: 8px;">Save</button>
                    </div>
                    <div id="shift-summary-box" style="width: 220px; min-width: 220px; background: #f8fafc; border: 1px solid #e5e7eb; border-radius: 10px; padding: 14px; display: flex; flex-direction: column; gap: 10px; position: sticky; top: 10px;">
                        <div style="font-weight: 700; color: #0f172a; font-size: 14px; text-align: center;">Shift Summary</div>
                        <div style="display: flex; flex-direction: column; gap: 6px;">
                            <div>
                                <div style="font-size: 12px; color: #64748b; font-weight: 600;">Total Time Worked</div>
                                <div id="summary-total-worked" style="font-size: 20px; font-weight: 800; color: #0f172a;">00:00</div>
                            </div>
                            <div>
                                <div style="font-size: 12px; color: #64748b; font-weight: 600;">Total Break Time</div>
                                <div id="summary-total-break" style="font-size: 20px; font-weight: 800; color: #0f172a;">00:00</div>
                            </div>
                            <div>
                                <div style="font-size: 12px; color: #64748b; font-weight: 600;">Total Hours</div>
                                <div id="summary-total-hours" style="font-size: 20px; font-weight: 800; color: #0f172a;">00:00</div>
                            </div>
                        </div>
                        <div style="border-top: 1px solid #e5e7eb; padding-top: 8px; display: flex; flex-direction: column; gap: 4px; font-size: 12px; color: #475569;">
                            <div>Computed live from inputs</div>
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

    const addShiftPoliciesBtn = document.getElementById('add-shift-policies-btn');
    const shiftPolicyModal = document.getElementById('shift-policy-modal');
    const closeShiftPolicyModal = document.getElementById('close-shift-policy-modal');

    if (addShiftPoliciesBtn && shiftPolicyModal) {
        addShiftPoliciesBtn.addEventListener('click', async () => {
            const shiftPolicyIdInput = document.getElementById('shift-policy-id');
            if (shiftPolicyIdInput) {
                try {
                    const res = await fetch('/api/shift-policies/next-id');
                    if (res.ok) {
                        const data = await res.json();
                        shiftPolicyIdInput.value = data.shift_policy_id || 'ShfPo-0001';
                    }
                } catch (err) {
                    console.error('Failed to fetch next shift policy ID:', err);
                    shiftPolicyIdInput.value = 'ShfPo-0001';
                }
            }
            shiftPolicyModal.style.display = 'flex';
        });
    }

    if (closeShiftPolicyModal && shiftPolicyModal) {
        closeShiftPolicyModal.addEventListener('click', () => {
            shiftPolicyModal.style.display = 'none';
        });
    }

    if (shiftPolicyModal) {
        shiftPolicyModal.addEventListener('click', (e) => {
            if (e.target === shiftPolicyModal) shiftPolicyModal.style.display = 'none';
        });
    }

    const shiftOrgUnit = document.getElementById('shift-org-unit');
    if (shiftOrgUnit) {
        fetch('/api/organizational-units')
            .then(res => res.json())
            .then(units => {
                const activeUnits = (units || []).filter(u => (u.status || '').toLowerCase() === 'active');
                shiftOrgUnit.innerHTML = '<option value="">Select Organizational Unit</option>' +
                    activeUnits.map(u => `<option value="${u.unit_name}">${u.unit_name}</option>`).join('');
            })
            .catch(err => {
                console.error('Failed to load organizational units:', err);
            });
    }

    function toMinutes(timeStr) {
        if (!timeStr) return null;
        const [hours, minutes] = timeStr.split(':').map(Number);
        return hours * 60 + minutes;
    }

    function getMinutesWithOvernight(timeStr, shiftStartM, shiftEndM) {
        const raw = toMinutes(timeStr);
        if (raw === null) return null;
        if (shiftStartM != null && shiftEndM != null && shiftStartM > shiftEndM) {
            if (raw <= shiftEndM) {
                return raw + 1440;
            }
        }
        return raw;
    }

    function formatDuration(totalMinutes) {
        if (totalMinutes == null || isNaN(totalMinutes)) return '00:00';
        const h = Math.floor(totalMinutes / 60);
        const m = totalMinutes % 60;
        return String(h).padStart(2, '0') + ':' + String(m).padStart(2, '0');
    }

    function recomputeShiftSummary() {
        const shiftStart = document.getElementById('shift-start-time')?.value || '';
        const shiftEnd = document.getElementById('shift-end-time')?.value || '';
        const firstIn = document.getElementById('first-coffee-break-start')?.value || '';
        const firstOut = document.getElementById('first-coffee-break-end')?.value || '';
        const midIn = document.getElementById('mid-break-start')?.value || '';
        const midOut = document.getElementById('mid-break-end')?.value || '';
        const secondIn = document.getElementById('second-coffee-break-start')?.value || '';
        const secondOut = document.getElementById('second-coffee-break-end')?.value || '';

        const shiftStartM = toMinutes(shiftStart);
        const shiftEndM = toMinutes(shiftEnd);
        const firstInM = getMinutesWithOvernight(firstIn, shiftStartM, shiftEndM);
        const firstOutM = getMinutesWithOvernight(firstOut, shiftStartM, shiftEndM);
        const midInM = getMinutesWithOvernight(midIn, shiftStartM, shiftEndM);
        const midOutM = getMinutesWithOvernight(midOut, shiftStartM, shiftEndM);
        const secondInM = getMinutesWithOvernight(secondIn, shiftStartM, shiftEndM);
        const secondOutM = getMinutesWithOvernight(secondOut, shiftStartM, shiftEndM);

        let totalWorkedM = 0;
        let totalBreakM = 0;

        if (shiftStartM != null && shiftEndM != null) {
            const workSegments = [];
            const breakSegments = [];

            let cursor = shiftStartM;

            if (firstInM != null && firstOutM != null && firstInM > cursor) {
                workSegments.push(firstInM - cursor);
                breakSegments.push(firstOutM - firstInM);
                cursor = firstOutM;
            } else if (firstInM != null && firstInM > cursor) {
                workSegments.push(firstInM - cursor);
                cursor = firstInM;
            }

            if (midInM != null && midOutM != null && midInM > cursor) {
                workSegments.push(midInM - cursor);
                breakSegments.push(midOutM - midInM);
                cursor = midOutM;
            } else if (midInM != null && midInM > cursor) {
                workSegments.push(midInM - cursor);
                cursor = midInM;
            }

            if (secondInM != null && secondOutM != null && secondInM > cursor) {
                workSegments.push(secondInM - cursor);
                breakSegments.push(secondOutM - secondInM);
                cursor = secondOutM;
            } else if (secondInM != null && secondInM > cursor) {
                workSegments.push(secondInM - cursor);
                cursor = secondInM;
            }

            if (shiftEndM >= shiftStartM) {
                if (shiftEndM > cursor) {
                    workSegments.push(shiftEndM - cursor);
                }
            } else if ((shiftEndM + 1440) > cursor) {
                workSegments.push((shiftEndM + 1440) - cursor);
            }

            totalWorkedM = workSegments.reduce((a, b) => a + b, 0);
            totalBreakM = breakSegments.reduce((a, b) => a + b, 0);
        }

        const totalHoursM = (shiftStartM != null && shiftEndM != null)
            ? (shiftEndM >= shiftStartM ? shiftEndM - shiftStartM : (shiftEndM + 1440) - shiftStartM)
            : null;

        const totalWorkedEl = document.getElementById('summary-total-worked');
        const totalBreakEl = document.getElementById('summary-total-break');
        const totalHoursEl = document.getElementById('summary-total-hours');

        if (totalWorkedEl) totalWorkedEl.textContent = formatDuration(totalWorkedM);
        if (totalBreakEl) totalBreakEl.textContent = formatDuration(totalBreakM);
        if (totalHoursEl) totalHoursEl.textContent = formatDuration(totalHoursM);
    }

    const shiftTimeInputIds = [
        'shift-start-time',
        'shift-end-time',
        'first-coffee-break-start',
        'first-coffee-break-end',
        'mid-break-start',
        'mid-break-end',
        'second-coffee-break-start',
        'second-coffee-break-end'
    ];

    shiftTimeInputIds.forEach(id => {
        const el = document.getElementById(id);
        if (el) {
            el.addEventListener('input', recomputeShiftSummary);
            el.addEventListener('change', recomputeShiftSummary);
        }
    });

    function formatTimeForDisplay(timeValue) {
        if (!timeValue) return '';
        return String(timeValue).substring(0, 5);
    }

    async function loadShiftPolicies() {
        const tbody = document.querySelector('#shift-policies-table tbody') || document.querySelector('.data-table.product-table tbody');
        if (!tbody) return;

        try {
            const res = await fetch('/api/shift-policies');
            if (!res.ok) throw new Error('Failed to load shift policies');
            const policies = await res.json();

            tbody.innerHTML = '';
            if (!Array.isArray(policies) || policies.length === 0) {
                tbody.innerHTML = '<tr><td colspan="13" style="text-align: center; padding: 12px; color: #999;">No records found</td></tr>';
                return;
            }

            policies.forEach(policy => {
                const tr = document.createElement('tr');
                tr.innerHTML = `
                    <td>${policy.shift_policy_id || ''}</td>
                    <td>${policy.shift_name || ''}</td>
                    <td>${formatTimeForDisplay(policy.shift_time_start)}</td>
                    <td>${formatTimeForDisplay(policy.shift_time_end)}</td>
                    <td>${formatTimeForDisplay(policy.first_coffee_break_start)}</td>
                    <td>${formatTimeForDisplay(policy.first_coffee_break_end)}</td>
                    <td>${formatTimeForDisplay(policy.mid_break_start)}</td>
                    <td>${formatTimeForDisplay(policy.mid_break_end)}</td>
                    <td>${formatTimeForDisplay(policy.second_coffee_break_start)}</td>
                    <td>${formatTimeForDisplay(policy.second_coffee_break_end)}</td>
                    <td>${policy.org_unit || ''}</td>
                    <td>${policy.remarks || ''}</td>
                    <td>${policy.status || 'Active'}</td>
                `;
                tbody.appendChild(tr);
            });
        } catch (err) {
            console.error('Load shift policies error:', err);
        }
    }

    const saveShiftPolicyBtn = document.getElementById('save-shift-policy-btn');
    if (saveShiftPolicyBtn) {
        saveShiftPolicyBtn.addEventListener('click', async () => {
            try {
                const shiftPolicyId = document.getElementById('shift-policy-id')?.value || '';
                const shiftName = document.getElementById('shift-name')?.value || '';
                const shiftStartTime = document.getElementById('shift-start-time')?.value || '';
                const shiftEndTime = document.getElementById('shift-end-time')?.value || '';
                const firstCoffeeBreakStart = document.getElementById('first-coffee-break-start')?.value || '';
                const firstCoffeeBreakEnd = document.getElementById('first-coffee-break-end')?.value || '';
                const midBreakStart = document.getElementById('mid-break-start')?.value || '';
                const midBreakEnd = document.getElementById('mid-break-end')?.value || '';
                const secondCoffeeBreakStart = document.getElementById('second-coffee-break-start')?.value || '';
                const secondCoffeeBreakEnd = document.getElementById('second-coffee-break-end')?.value || '';
                const orgUnit = document.getElementById('shift-org-unit')?.value || '';
                const remarks = document.getElementById('shift-remarks')?.value || '';

                if (!shiftName || !shiftStartTime || !shiftEndTime || !orgUnit) {
                    alert('Please fill in all required fields');
                    return;
                }

                const shiftData = {
                    shift_policy_id: shiftPolicyId,
                    shift_name: shiftName,
                    shift_time_start: shiftStartTime,
                    shift_time_end: shiftEndTime,
                    first_coffee_break_start: firstCoffeeBreakStart || null,
                    first_coffee_break_end: firstCoffeeBreakEnd || null,
                    mid_break_start: midBreakStart || null,
                    mid_break_end: midBreakEnd || null,
                    second_coffee_break_start: secondCoffeeBreakStart || null,
                    second_coffee_break_end: secondCoffeeBreakEnd || null,
                    org_unit: orgUnit,
                    remarks: remarks,
                    status: 'Active'
                };

                const res = await fetch('/api/shift-policies', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(shiftData)
                });

                if (!res.ok) throw new Error('Failed to save shift policy');
                const savedPolicy = await res.json();
                alert('Shift policy saved successfully!');
                shiftPolicyModal.style.display = 'none';
                await loadShiftPolicies();
            } catch (err) {
                console.error('Save shift policy error:', err);
                alert('Save failed: ' + err.message);
            }
            });
    }

    loadShiftPolicies();

    let currentOrgUnit = null;
    let currentHalfMonth = null;

    const orgTabsContainer = document.getElementById('org-tabs-container');
    const employeeListContainer = document.getElementById('employee-list-container');

    async function loadOrgTabs() {
        if (!orgTabsContainer) return;
        try {
            const res = await fetch('/api/organizational-units');
            const units = await res.json();
            const activeUnits = (units || []).filter(u => (u.status || '').toLowerCase() === 'active');
            orgTabsContainer.innerHTML = '';
            activeUnits.forEach((unit, idx) => {
                const btn = document.createElement('button');
                btn.className = idx === 0 ? 'modal-tab active' : 'modal-tab';
                btn.textContent = unit.unit_name || unit.org_unit_id;
                btn.dataset.orgTab = unit.unit_name || unit.org_unit_id;
                orgTabsContainer.appendChild(btn);
            });
            if (activeUnits.length > 0) {
                currentOrgUnit = activeUnits[0].unit_name || activeUnits[0].org_unit_id;
                await loadEmployees(currentOrgUnit);
                const [yearStr, monthStr] = document.getElementById('schedule-month')?.value?.split('-') || [];
                const year = parseInt(yearStr, 10);
                const month = parseInt(monthStr, 10);
                const activeHalf = document.querySelector('#half-month-tabs .modal-tab.active');
                if (activeHalf && year && month) {
                    const start = parseInt(activeHalf.dataset.halfMonthStart, 10);
                    const end = parseInt(activeHalf.dataset.halfMonthEnd, 10);
                    renderCalendarGrid(start, end, year, month);
                }
                orgTabsContainer.querySelectorAll('.modal-tab').forEach(tab => {
                    tab.addEventListener('click', async () => {
                        orgTabsContainer.querySelectorAll('.modal-tab').forEach(t => t.classList.remove('active'));
                        tab.classList.add('active');
                        currentOrgUnit = tab.dataset.orgTab;
                        await loadEmployees(currentOrgUnit);
                        const [yStr, mStr] = document.getElementById('schedule-month')?.value?.split('-') || [];
                        const y = parseInt(yStr, 10);
                        const m = parseInt(mStr, 10);
                        const half = document.querySelector('#half-month-tabs .modal-tab.active');
                        if (half && y && m) {
                            const s = parseInt(half.dataset.halfMonthStart, 10);
                            const e = parseInt(half.dataset.halfMonthEnd, 10);
                            renderCalendarGrid(s, e, y, m);
                        }
                    });
                });
            }
        } catch (err) {
            console.error('Failed to load org tabs:', err);
        }
    }

    async function loadEmployees(orgUnitName) {
        if (!employeeListContainer || !orgUnitName) return;
        employeeListContainer.innerHTML = '<div style="text-align: center; padding: 12px; color: #999; font-size: 12px;">Loading...</div>';
        try {
            const res = await fetch(`/api/organizational-structure/active-employees/org-unit-name/${encodeURIComponent(orgUnitName)}`);
            const rows = await res.json();
            employeeListContainer.innerHTML = '';
            if (!Array.isArray(rows) || rows.length === 0) {
                employeeListContainer.innerHTML = '<div style="text-align: center; padding: 12px; color: #999; font-size: 12px;">No active employees</div>';
                return;
            }
            const seen = new Set();
            rows.forEach(row => {
                if (!row.employee_assigned || seen.has(row.employee_assigned)) return;
                seen.add(row.employee_assigned);
                const fullName = [row.first_name, row.middle_name, row.last_name].filter(Boolean).join(' ');
                const lastName = row.last_name || fullName;
                const chip = document.createElement('div');
                chip.className = 'schedule-draggable';
                chip.dataset.employee = fullName;
                chip.dataset.employeeId = row.employee_id;
                chip.draggable = true;
                chip.style.cssText = 'padding: 8px 10px; background: #fff; border: 1px solid #D6D6D6; border-radius: 6px; cursor: grab; font-size: 13px; font-weight: 600; text-align: center; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 100%;';
                chip.textContent = fullName;
                employeeListContainer.appendChild(chip);
                chip.addEventListener('dragstart', (e) => {
                    e.dataTransfer.setData('text/plain', lastName);
                    e.dataTransfer.setData('application/full-name', fullName);
                    e.dataTransfer.setData('application/employee-id', row.employee_id);
                    e.dataTransfer.effectAllowed = 'copy';
                    chip.style.opacity = '0.6';
                });
                chip.addEventListener('dragend', () => {
                    chip.style.opacity = '1';
                });
            });
        } catch (err) {
            console.error('Failed to load employees:', err);
            employeeListContainer.innerHTML = '<div style="text-align: center; padding: 12px; color: #999; font-size: 12px;">Failed to load</div>';
        }
    }

    function attachDropZoneListeners(container) {
        const zones = container.querySelectorAll('.schedule-drop-zone');
        zones.forEach(zone => {
            zone.addEventListener('dragover', (e) => {
                e.preventDefault();
                e.dataTransfer.dropEffect = 'copy';
                zone.style.background = '#e0f2fe';
            });
            zone.addEventListener('dragleave', () => {
                zone.style.background = '';
            });
            zone.addEventListener('drop', async (e) => {
                e.preventDefault();
                zone.style.background = '';
                const employeeName = e.dataTransfer.getData('application/full-name') || e.dataTransfer.getData('text/plain');
                const employeeId = e.dataTransfer.getData('application/employee-id');
                if (!employeeName || !employeeId) return;

                const day = zone.dataset.day;
                const monthInput = document.getElementById('schedule-month');
                const [yearStr, monthStr] = monthInput.value.split('-');
                const year = parseInt(yearStr, 10);
                const month = parseInt(monthStr, 10);
                const scheduleDate = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;

                const activeHalf = document.querySelector('#half-month-tabs .modal-tab.active');
                const halfMonth = activeHalf ? activeHalf.textContent.trim() : '';

                try {
                    const existingChips = zone.querySelectorAll('.schedule-chip');
                    const alreadyExists = Array.from(existingChips).some(c => c.dataset.employeeId === employeeId);
                    if (alreadyExists) return;

                    const nextIdRes = await fetch('/api/schedules/next-id');
                    const nextIdData = await nextIdRes.json();
                    const scheduleId = nextIdData.schedule_id || 'Sch-0001';

                    const saveRes = await fetch('/api/schedules', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            schedule_id: scheduleId,
                            employee_id: employeeId,
                            org_unit: currentOrgUnit,
                            schedule_date: scheduleDate,
                            half_month: halfMonth,
                            status: 'Active'
                        })
                    });
                    if (!saveRes.ok) {
                        const errBody = await saveRes.text();
                        throw new Error(errBody || 'Failed to save schedule');
                    }
                    const saved = await saveRes.json();

                    const chip = document.createElement('div');
                    chip.className = 'schedule-chip';
                    chip.dataset.employeeId = employeeId;
                    chip.textContent = employeeName;
                    chip.dataset.scheduleId = saved.schedule_id;
                chip.style.cssText = 'font-size:10px;font-weight:600;color:#1a1f2e;background:#f0fdf4;border:1px solid #bbf7d0;border-radius:3px;padding:1px 4px;margin:1px 0;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;display:flex;align-items:center;gap:2px;';
                    const removeBtn = document.createElement('span');
                    removeBtn.textContent = '×';
                    removeBtn.style.cssText = 'cursor:pointer;font-weight:700;color:#ef4444;margin-left:2px;';
                    removeBtn.addEventListener('click', async () => {
                        try {
                            const delRes = await fetch(`/api/schedules/${saved.schedule_id}`, { method: 'DELETE' });
                            if (delRes.ok) chip.remove();
                        } catch (err) {
                            console.error('Failed to remove schedule:', err);
                        }
                    });
                    chip.appendChild(removeBtn);
                    zone.appendChild(chip);
                } catch (err) {
                    console.error('Failed to save schedule:', err);
                    alert('Failed to save schedule: ' + err.message);
                }
            });
        });
    }

    async function loadExistingSchedules(startDay, endDay, year, month) {
        if (!currentOrgUnit) return new Map();
        const startDate = `${year}-${String(month).padStart(2, '0')}-${String(startDay).padStart(2, '0')}`;
        const endDate = `${year}-${String(month).padStart(2, '0')}-${String(endDay).padStart(2, '0')}`;
        try {
            const res = await fetch(`/api/schedules?org_unit=${encodeURIComponent(currentOrgUnit)}&start_date=${startDate}&end_date=${endDate}`);
            const schedules = await res.json();
            const scheduleMap = new Map();
            (Array.isArray(schedules) ? schedules : []).forEach(s => {
                const rawDate = s.schedule_date || '';
                const dateObj = new Date(rawDate);
                const normalizedDate = `${dateObj.getFullYear()}-${String(dateObj.getMonth() + 1).padStart(2, '0')}-${String(dateObj.getDate()).padStart(2, '0')}`;
                if (!scheduleMap.has(normalizedDate)) scheduleMap.set(normalizedDate, []);
                scheduleMap.get(normalizedDate).push(s);
            });
            return scheduleMap;
        } catch (err) {
            console.error('Failed to load existing schedules:', err);
            return new Map();
        }
    }

    async function renderCalendarGrid(startDay, endDay, year, month) {
        const calendarContainer = document.getElementById('schedule-calendar-container');
        if (!calendarContainer) return;

        calendarContainer.innerHTML = '';

        const existingSchedules = await loadExistingSchedules(startDay, endDay, year, month);

        for (let day = startDay; day <= endDay; day++) {
            const dayOfWeek = getDayOfWeek(year, month, day);
            const dayName = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][dayOfWeek];

            const wrapper = document.createElement('div');
            wrapper.style.cssText = 'display:flex;flex-direction:column;align-items:center;gap:4px;';

            const dayLabel = document.createElement('div');
            dayLabel.style.cssText = 'font-weight:700;font-size:11px;color:#64748b;padding:2px 0;';
            dayLabel.textContent = dayName;

            const cell = document.createElement('div');
            cell.className = 'schedule-drop-zone';
            cell.dataset.day = String(day);
            cell.style.cssText = 'min-height:80px;width:100%;border:1px dashed #D6D6D6;border-radius:4px;padding:4px;font-size:11px;font-weight:700;color:#94a3b8;display:flex;flex-direction:column;align-items:stretch;justify-content:flex-start;gap:2px;';

            const dayNumber = document.createElement('div');
            dayNumber.textContent = String(day);
            dayNumber.style.cssText = 'font-weight:700;font-size:11px;color:#94a3b8;';

            cell.appendChild(dayNumber);
            wrapper.appendChild(dayLabel);
            wrapper.appendChild(cell);
            calendarContainer.appendChild(wrapper);

            const scheduleDate = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
            const daySchedules = existingSchedules.get(scheduleDate) || [];
            daySchedules.forEach(s => {
                const fullName = [s.first_name, s.middle_name, s.last_name].filter(Boolean).join(' ') || s.employee_id;
                const chip = document.createElement('div');
                chip.className = 'schedule-chip';
                chip.dataset.employeeId = s.employee_id;
                chip.textContent = fullName;
                chip.dataset.scheduleId = s.schedule_id;
                chip.style.cssText = 'font-size:10px;font-weight:600;color:#1a1f2e;background:#f0fdf4;border:1px solid #bbf7d0;border-radius:3px;padding:1px 4px;margin:1px 0;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;display:flex;align-items:center;gap:2px;';
                const removeBtn = document.createElement('span');
                removeBtn.textContent = '×';
                removeBtn.style.cssText = 'cursor:pointer;font-weight:700;color:#ef4444;margin-left:2px;';
                removeBtn.addEventListener('click', async () => {
                    try {
                        const delRes = await fetch(`/api/schedules/${s.schedule_id}`, { method: 'DELETE' });
                        if (delRes.ok) chip.remove();
                    } catch (err) {
                        console.error('Failed to remove schedule:', err);
                    }
                });
                chip.appendChild(removeBtn);
                cell.appendChild(chip);
            });
        }

        const currentCount = endDay - startDay + 1;
        for (let i = currentCount; i < 15; i++) {
            const empty = document.createElement('div');
            calendarContainer.appendChild(empty);
        }

        attachDropZoneListeners(calendarContainer);
    }

    function getDaysInMonth(year, month) {
        return new Date(year, month, 0).getDate();
    }

    function getDayOfWeek(year, month, day) {
        return new Date(year, month - 1, day).getDay();
    }

    function formatMonthYear(year, month) {
        const date = new Date(year, month - 1, 1);
        return date.toLocaleString('default', { month: 'long', year: 'numeric' });
    }

    function generateHalfMonthTabs() {
        const monthInput = document.getElementById('schedule-month');
        const tabsContainer = document.getElementById('half-month-tabs');
        const calendarContainer = document.getElementById('schedule-calendar-container');
        if (!monthInput || !tabsContainer || !calendarContainer) return;

        const [yearStr, monthStr] = monthInput.value.split('-');
        const year = parseInt(yearStr, 10);
        const month = parseInt(monthStr, 10);
        const daysInMonth = getDaysInMonth(year, month);

        const half1End = Math.min(15, daysInMonth);
        const half2Start = 16;
        const half2End = daysInMonth;

        const half1Label = `${formatMonthYear(year, month).substring(0, 3)} ${1}-${half1End}`;
        const half2Label = `${formatMonthYear(year, month).substring(0, 3)} ${half2Start}-${half2End}`;

        tabsContainer.innerHTML = '';

        const tab1 = document.createElement('button');
        tab1.className = 'modal-tab active';
        tab1.textContent = half1Label;
        tab1.dataset.halfMonthStart = '1';
        tab1.dataset.halfMonthEnd = String(half1End);
        tabsContainer.appendChild(tab1);

        if (half2Start <= daysInMonth) {
            const tab2 = document.createElement('button');
            tab2.className = 'modal-tab';
            tab2.textContent = half2Label;
            tab2.dataset.halfMonthStart = String(half2Start);
            tab2.dataset.halfMonthEnd = String(half2End);
            tabsContainer.appendChild(tab2);
        }

        const activeHalf = document.querySelector('#half-month-tabs .modal-tab.active');
        const start = activeHalf ? parseInt(activeHalf.dataset.halfMonthStart, 10) : 1;
        const end = activeHalf ? parseInt(activeHalf.dataset.halfMonthEnd, 10) : half1End;
        renderCalendarGrid(start, end, year, month);

        tabsContainer.querySelectorAll('.modal-tab').forEach(tab => {
            tab.addEventListener('click', async () => {
                tabsContainer.querySelectorAll('.modal-tab').forEach(t => t.classList.remove('active'));
                tab.classList.add('active');
                const s = parseInt(tab.dataset.halfMonthStart, 10);
                const e = parseInt(tab.dataset.halfMonthEnd, 10);
                await renderCalendarGrid(s, e, year, month);
            });
        });
    }

    (async () => {
        await loadOrgTabs();
        const scheduleMonthInput = document.getElementById('schedule-month');
        if (scheduleMonthInput) {
            scheduleMonthInput.addEventListener('change', generateHalfMonthTabs);
        }
        generateHalfMonthTabs();
    })();
}
