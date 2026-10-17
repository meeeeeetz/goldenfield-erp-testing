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

            <div class="card" style="padding: 0; margin-bottom: 20px; position: relative;">
                <div id="batch-header" style="padding: 16px 20px; border-bottom: 1px solid #ddd; display: flex; justify-content: space-between; align-items: center; flex-wrap: nowrap; gap: 12px; background: #EADECB;">
                    <h3 style="margin: 0; font-size: 16px; font-weight: 600; color: #1a1f2e; white-space: nowrap;">Chicken Hauling Logs Batch</h3>
                    <div id="batch-button-group" style="display: flex; gap: 8px; align-items: center; flex-shrink: 0;">
                        <button id="delete-chicken-hauling-batch-btn" class="btn-secondary" type="button" style="display: inline-block !important; visibility: visible !important; padding: 8px 16px; font-size: 14px; background: #f44336 !important; color: #fff !important; border: none !important; border-radius: 4px; cursor: pointer; font-weight: 600;">Delete Batch</button>
                        <button id="confirm-chicken-hauling-batch-btn" class="btn-primary" type="button" style="display: inline-block !important; visibility: visible !important; padding: 8px 16px; font-size: 14px; background: #FFD000 !important; color: #1a1f2e !important; border: none !important; border-radius: 4px; cursor: pointer; font-weight: 600;">Confirm Batch</button>
                    </div>
                </div>
                <div id="batch-content" style="padding: 40px 20px; text-align: center; color: #999;">
                    <p style="margin: 0;">No hauling logs yet. Click "Create Hauling logs" to add a new batch.</p>
                </div>
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

            <div id="hauling-log-modal" class="modal" style="display:none; align-items: center; justify-content: center;">
            <div class="modal-content" style="max-width: 1200px; width: 95%; max-height: 90vh; display: flex; flex-direction: column;">
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
                        <div style="flex: 1; min-width: 250px; display: flex; flex-direction: column; gap: 4px;">
                            <label style="font-weight: 600; font-size: 13px; color: #333;">Building Worked</label>
                            <select id="hauling-building" style="padding: 8px; border: 1px solid #ddd; border-radius: 6px; font-size: 14px;">
                                <option value="">Select building</option>
                            </select>
                        </div>
                        <div style="flex: 1; min-width: 150px; display: flex; flex-direction: column; gap: 4px;">
                            <label style="font-weight: 600; font-size: 13px; color: #333;">Days</label>
                            <select id="hauling-days" style="padding: 8px; border: 1px solid #ddd; border-radius: 6px; font-size: 14px;">
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                                <option value="6">6</option>
                            </select>
                        </div>
                    </div>
                    <div id="hauling-dates-container" style="display: flex; flex-direction: column; gap: 16px;">
                        <div class="hauling-day-row" data-day="1" style="display: flex; gap: 16px; flex-wrap: wrap; align-items: flex-end;">
                        <div style="flex: 1; min-width: 200px; display: flex; flex-direction: column; gap: 4px;">
                            <label style="font-weight: 600; font-size: 13px; color: #333;">Date</label>
                            <input type="date" class="hauling-date" style="padding: 8px; border: 1px solid #ddd; border-radius: 6px; font-size: 14px;">
                        </div>
                            <div style="flex: 1; min-width: 200px; display: flex; flex-direction: column; gap: 4px;">
                                <label style="font-weight: 600; font-size: 13px; color: #333;">Start Time</label>
                                <input type="time" class="hauling-start-time" style="padding: 8px; border: 1px solid #ddd; border-radius: 6px; font-size: 14px;">
                            </div>
                            <div style="flex: 1; min-width: 200px; display: flex; flex-direction: column; gap: 4px;">
                                <label style="font-weight: 600; font-size: 13px; color: #333;">End Time</label>
                                <input type="time" class="hauling-end-time" style="padding: 8px; border: 1px solid #ddd; border-radius: 6px; font-size: 14px;">
                            </div>
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
                <thead id="hauling-workers-thead">
                    <tr>
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

    // Add confirmation modal for final save
    const confirmModalHTML = `
        <div id="confirm-batch-modal" class="modal" style="display:none; align-items: center; justify-content: center;">
            <div class="modal-content" style="max-width: 950px; width: 95%; max-height: 90vh; display: flex; flex-direction: column;">
                <div class="modal-header-row">
                    <h3>Confirm Batch for Payroll Processing</h3>
                    <button class="modal-close-btn" id="close-confirm-modal">&times;</button>
                </div>
                <div style="overflow-y: auto; padding: 16px; display: flex; flex-direction: column; gap: 16px;">
                    <div id="confirm-batch-tabs" style="display: flex; gap: 6px; border-bottom: 1px solid #d6cfbf; padding-bottom: 0; margin-bottom: 12px;">
                        <button id="confirm-tab-summary" class="modal-tab active" type="button" style="padding: 8px 16px; font-size: 13px; font-weight: 600; border: none; background: #fff; color: #1a1f2e; border-bottom: 2px solid #FFD000; cursor: pointer;">Batch Summary Print Preview</button>
                        <button id="confirm-tab-payslip" class="modal-tab" type="button" style="padding: 8px 16px; font-size: 13px; font-weight: 600; border: none; background: #f5f5f5; color: #666; cursor: pointer;">Employee Payslip Cut-out</button>
                    </div>
                    <div id="confirm-batch-preview-content" style="background: #fff; border: 1px solid #ddd; border-radius: 6px; padding: 20px; margin-bottom: 16px; min-height: 320px;"></div>
                    <div id="confirm-batch-print-action-row" style="display: flex; gap: 12px; justify-content: flex-end; margin-bottom: 12px;">
                        <button id="confirm-print-btn" class="btn-primary" type="button" style="padding: 10px 20px; font-size: 14px; cursor: pointer;">Print</button>
                    </div>
                    <div style="display: flex; gap: 12px; justify-content: flex-end; padding-top: 12px; border-top: 1px solid #e5e0d2;">
                        <button id="cancel-confirm-btn" class="btn-danger" type="button" style="padding: 10px 16px; font-size: 14px;">Cancel</button>
                        <button id="confirm-batch-status-label" type="button" disabled style="padding: 10px 16px; font-size: 13px; cursor: default; background: transparent; color: #888; border: none;">Print both summary and payslip to enable Final Save</button>
                        <button id="final-save-btn" class="btn-primary" type="button" disabled style="padding: 10px 20px; font-size: 14px; cursor: not-allowed; background: #b8c2cc; color: #fff; border: none; border-radius: 4px; opacity: 0.6;">Final Save</button>
                    </div>
                </div>
            </div>
        </div>
    `;

    // Insert the confirmation modal HTML into the container
    container.insertAdjacentHTML('beforeend', confirmModalHTML);

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
    const haulingDaysSelect = document.getElementById('hauling-days');
    const haulingDatesContainer = document.getElementById('hauling-dates-container');
    const confirmModal = document.getElementById('confirm-batch-modal');
    const closeConfirmModalBtn = document.getElementById('close-confirm-modal');
    const cancelConfirmBtn = document.getElementById('cancel-confirm-btn');
    const finalSaveBtn = document.getElementById('final-save-btn');
    const confirmTabSummaryBtn = document.getElementById('confirm-tab-summary');
    const confirmTabPayslipBtn = document.getElementById('confirm-tab-payslip');
    const confirmBatchPreviewContent = document.getElementById('confirm-batch-preview-content');
    const confirmPrintBtn = document.getElementById('confirm-print-btn');
    const confirmBatchStatusLabel = document.getElementById('confirm-batch-status-label');

    let haulingCounter = 1;
    let selectedWorkers = [];
    let buildingsCache = [];
    let confirmPrintSummaryDone = false;
    let confirmPrintPayslipDone = false;
    let isDropdownInteraction = false;

    function generateHaulingId() {
        return `ChHaID-${haulingCounter++}`;
    }

    async function initHaulingCounter() {
        try {
            const res = await fetch('/api/chicken-hauling/max-id', {
                headers: getAuthHeaders()
            });
            const data = await res.json();
            if (data && data.max_id) {
                const num = parseInt(data.max_id.replace('ChHaID-', '')) || 0;
                haulingCounter = num + 1;
            }
        } catch (err) {
            console.error('Failed to init hauling counter:', err);
        }
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

    function formatNumberWithCommas(number) {
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    async function loadPendingBatches() {
        try {
            const res = await fetch('/api/chicken-hauling?status=pending', {
                headers: getAuthHeaders()
            });
            const batches = await res.json();
            displayPendingBatches(Array.isArray(batches) ? batches : []);
        } catch (err) {
            console.error('Failed to load pending batches:', err);
            const batchContent = document.getElementById('batch-content');
            if (batchContent) {
                showNoPendingBatches(batchContent);
            } else {
                const allCards = document.querySelectorAll('.card');
                allCards.forEach(card => {
                    const heading = card.querySelector('h3');
                    if (heading && heading.textContent.includes('Chicken Hauling Logs Batch')) {
                        const container = card.querySelector('div:nth-child(2)');
                        if (container) showNoPendingBatches(container);
                    }
                });
            }
        }
    }

    function displayPendingBatches(batches) {
        // Find the batch card by its heading text
        const batchHeader = document.getElementById('batch-header');
        const batchContent = document.getElementById('batch-content');
        const batchSection = batchHeader ? batchHeader.closest('.card') : null;
        
        if (!batchSection || !batchContent) {
            // Fallback: find by heading text
            const allCards = document.querySelectorAll('.card');
            for (const card of allCards) {
                const heading = card.querySelector('h3');
                if (heading && heading.textContent.includes('Chicken Hauling Logs Batch')) {
                    batchSection = card;
                    batchContent = card.querySelector('div:nth-child(2)');
                    break;
                }
            }
        }
        
        if (!batchSection || !batchContent) return;
        
        // Ensure buttons are visible
        const btnGroup = document.getElementById('batch-button-group');
        if (btnGroup) {
            btnGroup.style.display = 'flex';
            btnGroup.style.visibility = 'visible';
        }
        
        if (batches.length === 0) {
            showNoPendingBatches(batchContent);
            return;
        }
        
        // Create container for batch breakdowns
        const container = document.createElement('div');
        container.style.cssText = 'display: flex; flex-direction: column; gap: 24px;';
        
        batches.forEach(batch => {
            // Calculate grand total from workers data
            let grandTotal = 0;
            if (batch.workers && batch.workers.length > 0) {
                batch.workers.forEach(worker => {
                    if (worker.daily_rate && worker.hoursPerDay) {
                        const hourlyRate = (worker.daily_rate / 8) * 1.25;
                        worker.hoursPerDay.forEach(hours => {
                            grandTotal += parseFloat((hourlyRate * hours).toFixed(2)) || 0;
                        });
                    }
                });
            }
            
            // Format dates
            const startDate = batch.date_start ? new Date(batch.date_start).toLocaleDateString() : '';
            const endDate = batch.date_end ? new Date(batch.date_end).toLocaleDateString() : '';
            
            // Build worker breakdown rows
            let workerRows = '';
            let dayHeaders = '';
            if (batch.workers && batch.workers.length > 0) {
                // Determine max days across all workers
                let maxDays = 0;
                batch.workers.forEach(worker => {
                    if (worker.hoursPerDay && worker.hoursPerDay.length > maxDays) {
                        maxDays = worker.hoursPerDay.length;
                    }
                });
                
                // Build dynamic table headers for each day
                dayHeaders = '';
                for (let d = 1; d <= maxDays; d++) {
                    dayHeaders += `
                        <th style="padding: 6px 8px; border: 1px solid #ddd; text-align: center; font-weight: 600; font-size: 11px;">Day ${d} (Hours)</th>
                        <th style="padding: 6px 8px; border: 1px solid #ddd; text-align: right; font-weight: 600; font-size: 11px;">Day ${d} (Amount)</th>
                    `;
                }
                
                batch.workers.forEach((worker, wIdx) => {
                    const hoursPerDay = worker.hoursPerDay || [];
                    let workerTotal = 0;
                    if (worker.daily_rate && hoursPerDay.length > 0) {
                        const hourlyRate = (worker.daily_rate / 8) * 1.25;
                        workerTotal = hoursPerDay.reduce((sum, h) => sum + parseFloat((hourlyRate * h).toFixed(2)), 0);
                    }
                    
                    // Build per-day cells
                    let dayCells = '';
                    for (let d = 1; d <= maxDays; d++) {
                        const hours = hoursPerDay[d - 1] || 0;
                        const dailyRate = parseFloat(worker.daily_rate || 0);
                        const amount = dailyRate > 0 ? parseFloat(((dailyRate / 8) * 1.25 * hours).toFixed(2)) : 0;
                        dayCells += `
                            <td style="padding: 6px 8px; border: 1px solid #ddd; text-align: center;">${hours}</td>
                            <td style="padding: 6px 8px; border: 1px solid #ddd; text-align: right;">P ${formatNumberWithCommas(amount.toFixed(2))}</td>
                        `;
                    }
                    
                    workerRows += `
                        <tr>
                            <td style="padding: 6px 8px; border: 1px solid #ddd;">${wIdx + 1}</td>
                            <td style="padding: 6px 8px; border: 1px solid #ddd;">${worker.employee_id || ''}</td>
                            <td style="padding: 6px 8px; border: 1px solid #ddd;">${worker.last_name || ''}, ${worker.first_name || ''}</td>
                            <td style="padding: 6px 8px; border: 1px solid #ddd; text-align: right;">P ${formatNumberWithCommas(parseFloat(worker.daily_rate || 0).toFixed(2))}</td>
                            ${dayCells}
                            <td style="padding: 6px 8px; border: 1px solid #ddd; text-align: right; font-weight: 600;">P ${formatNumberWithCommas(workerTotal.toFixed(2))}</td>
                        </tr>
                    `;
                });
                
                // Update the table headers in batchCard innerHTML to include day columns
            }
            
            const batchCard = document.createElement('div');
            batchCard.style.cssText = 'border: 1px solid #ddd; border-radius: 6px; padding: 16px; background: #fff;';
            
            // Batch header
            batchCard.innerHTML = `
                <div style="border-bottom: 2px solid #FFD000; padding-bottom: 10px; margin-bottom: 12px; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 12px;">
                    <div>
                        <h4 style="margin: 0; font-size: 15px; font-weight: 600; color: #1a1f2e;">${batch.hauling_id || 'N/A'}</h4>
                        <p style="margin: 4px 0 0 0; font-size: 12px; color: #666;">${startDate} to ${endDate} | Building: ${batch.building_name || batch.building_id || 'N/A'}</p>
                    </div>
                    <div style="text-align: right;">
                        <div style="font-weight: 700; font-size: 14px; color: #1a1f2e;">Grand Total:</div>
                        <input type="text" class="batch-grand-total" data-id="${batch.hauling_id}" value="P ${formatNumberWithCommas(grandTotal.toFixed(2))}" readonly style="padding: 6px 8px; border: 1px solid #ddd; border-radius: 4px; font-size: 13px; font-weight: 600; text-align: right; background: #f1f5f9; min-width: 140px;">
                    </div>
                </div>
                
                <div style="overflow-x: auto;">
                    <table style="width: 100%; border-collapse: collapse; font-size: 12px;">
                        <thead>
                            <tr style="background: #f8f9fa;">
                                <th style="padding: 6px 8px; border: 1px solid #ddd; text-align: center; font-weight: 600; font-size: 11px;">#</th>
                                <th style="padding: 6px 8px; border: 1px solid #ddd; font-weight: 600; font-size: 11px;">Employee ID</th>
                                <th style="padding: 6px 8px; border: 1px solid #ddd; font-weight: 600; font-size: 11px;">Worker Name</th>
                                <th style="padding: 6px 8px; border: 1px solid #ddd; text-align: right; font-weight: 600; font-size: 11px;">Daily Rate</th>
                                ${dayHeaders}
                                <th style="padding: 6px 8px; border: 1px solid #ddd; text-align: right; font-weight: 600; font-size: 11px;">Worker Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${workerRows}
                        </tbody>
                    </table>
                </div>
                
                <div style="margin-top: 12px;">
                    <div style="font-size: 12px; color: #666;">Status: <strong>${batch.status || 'Pending'}</strong></div>
                </div>
            `;
            
            container.appendChild(batchCard);
        });
        
// Clear container and add the breakdowns
        batchContent.innerHTML = '';
        batchContent.appendChild(container);
        
        // Ensure buttons are visible after content is rendered
        if (btnGroup) {
            btnGroup.style.display = 'flex';
            btnGroup.style.visibility = 'visible';
        }
    }

    function showNoPendingBatches(container) {
        if (container) {
            container.innerHTML = '<p style="margin: 0; text-align: center; color: #999;">No hauling logs yet. Click "Create Hauling logs" to add a new batch.</p>';
        }
    }

    function confirmPendingBatch() {
        return window.confirm('Are you sure you want to confirm the selected chicken hauling batch for payroll processing?');
    }

    function getCurrentHoursPerDay() {
        const dayRows = haulingDatesContainer.querySelectorAll('.hauling-day-row');
        const hoursPerDay = [];
        dayRows.forEach((row, index) => {
            const startInput = row.querySelector('.hauling-start-time');
            const endInput = row.querySelector('.hauling-end-time');
            const hours = calculateHours(startInput.value, endInput.value);
            hoursPerDay[index] = hours;
        });
        // Ensure we have hours for all days (up to the number of days selected)
        const daysSelect = document.getElementById('hauling-days');
        const days = parseInt(daysSelect.value) || 1;
        // If we have fewer rows than days, fill the rest with 0
        while (hoursPerDay.length < days) {
            hoursPerDay.push(0);
        }
        // If we have more rows than days, truncate
        hoursPerDay.length = days;
        return hoursPerDay;
    }

    function updateHoursPerDayFromForm() {
        const hoursPerDay = getCurrentHoursPerDay();
        selectedWorkers.forEach(worker => {
            if (worker) {
                worker.hoursPerDay = hoursPerDay.slice();
            }
        });
        renderWorkersTable();
    }

    function getDaysData() {
        const rows = haulingDatesContainer?.querySelectorAll('.hauling-day-row') || [];
        const days = [];
        rows.forEach(row => {
            const dateInput = row.querySelector('.hauling-date');
            const startInput = row.querySelector('.hauling-start-time');
            const endInput = row.querySelector('.hauling-end-time');
            if (dateInput && (dateInput.value || startInput.value || endInput.value)) {
                days.push({
                    date: dateInput.value,
                    start_time: startInput.value,
                    end_time: endInput.value
                });
            }
        });
        return days;
    }

    function calculateHoursFromDays() {
        let totalHours = 0;
        getDaysData().forEach(d => {
            totalHours += calculateHours(d.start_time, d.end_time);
        });
        return totalHours;
    }

    function calculateGrandTotal() {
        let total = 0;
        selectedWorkers.forEach(worker => {
            if (worker.daily_rate && worker.hoursPerDay) {
                const hourlyRate = (worker.daily_rate / 8) * 1.25;
                worker.hoursPerDay.forEach(hours => {
                    total += parseFloat((hourlyRate * hours).toFixed(2)) || 0;
                });
            }
        });
        grandTotalInput.value = `P ${total.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    }

    function updateWorkersTableHeader(days) {
        const theadRow = document.querySelector('#hauling-workers-thead tr');
        if (!theadRow) return;

        // Base columns: #, Employee ID, Last Name, First Name
        let html = `
            <th style="padding: 8px; border: 1px solid #ddd; width: 40px;">#</th>
            <th style="padding: 8px; border: 1px solid #ddd;">Employee ID</th>
            <th style="padding: 8px; border: 1px solid #ddd;">Last Name</th>
            <th style="padding: 8px; border: 1px solid #ddd;">First Name</th>
        `;

        // Add columns for each day: Total Hours Day X, Salary Amount Day X
        // If only one day, don't include the day number in the header
        for (let day = 1; day <= days; day++) {
            const dayLabel = days === 1 ? '' : ` Day ${day}`;
            html += `
                <th style="padding: 8px; border: 1px solid #ddd; width: 100px;">Total Hours${dayLabel}</th>
                <th style="padding: 8px; border: 1px solid #ddd; width: 140px;">Salary Amount${dayLabel}</th>
            `;
        }

        // Action column
        html += `<th style="padding: 8px; border: 1px solid #ddd; width: 80px;">Action</th>`;

        theadRow.innerHTML = html;
    }

    function resetModal() {
        haulingIdInput.value = generateHaulingId();
        const daysSelect = document.getElementById('hauling-days');
        const datesContainer = document.getElementById('hauling-dates-container');
        if (daysSelect) daysSelect.value = '1';
        if (datesContainer) {
            datesContainer.innerHTML = `
                <div class="hauling-day-row" data-day="1" style="display: flex; gap: 16px; flex-wrap: wrap; align-items: flex-end;">
                    <div style="flex: 1; min-width: 200px; display: flex; flex-direction: column; gap: 4px;">
                        <label style="font-weight: 600; font-size: 13px; color: #333;">Date</label>
                        <input type="date" class="hauling-date" style="padding: 8px; border: 1px solid #ddd; border-radius: 6px; font-size: 14px;">
                    </div>
                    <div style="flex: 1; min-width: 200px; display: flex; flex-direction: column; gap: 4px;">
                        <label style="font-weight: 600; font-size: 13px; color: #333;">Start Time</label>
                        <input type="time" class="hauling-start-time" style="padding: 8px; border: 1px solid #ddd; border-radius: 6px; font-size: 14px;">
                    </div>
                    <div style="flex: 1; min-width: 200px; display: flex; flex-direction: column; gap: 4px;">
                        <label style="font-weight: 600; font-size: 13px; color: #333;">End Time</label>
                        <input type="time" class="hauling-end-time" style="padding: 8px; border: 1px solid #ddd; border-radius: 6px; font-size: 14px;">
                    </div>
                </div>
            `;
        }
        buildingSelect.value = '';
        searchWorker.value = '';
        workerSearchResults.style.display = 'none';
        selectedWorkers = [];
        // Reset hoursPerDay for any existing workers (though selectedWorkers is emptied above)
        // But we'll set it when we add workers.
        renderWorkersTable();
    }

    function renderWorkersTable() {
        const daysSelect = document.getElementById('hauling-days');
        const days = parseInt(daysSelect.value) || 1;
        updateWorkersTableHeader(days);
        
        // Resize hoursPerDay array for each worker when days change
        selectedWorkers.forEach(worker => {
            if (worker.hoursPerDay) {
                // Resize array while preserving existing values
                const oldLength = worker.hoursPerDay.length;
                worker.hoursPerDay.length = days;
                if (days > oldLength) {
                    for (let i = oldLength; i < days; i++) {
                        worker.hoursPerDay[i] = 0;
                    }
                }
            }
        });
        
        workersTbody.innerHTML = '';
        for (let i = 0; i < 10; i++) {
            const worker = selectedWorkers[i];
            const row = document.createElement('tr');
            
            // Base columns
            let rowHTML = `
                <td style="padding: 8px; border: 1px solid #ddd; text-align: center;">${i + 1}</td>
                <td style="padding: 8px; border: 1px solid #ddd;">${worker ? worker.employee_id : ''}</td>
                <td style="padding: 8px; border: 1px solid #ddd;">${worker ? worker.last_name : ''}</td>
                <td style="padding: 8px; border: 1px solid #ddd;">${worker ? worker.first_name : ''}</td>
            `;
            
            // Day-specific columns: Total Hours and Salary Amount for each day
            const daysData = getDaysData();
            for (let day = 0; day < days; day++) {
                let hours = 0;
                if (worker && worker.hoursPerDay) {
                    hours = worker.hoursPerDay[day] || 0;
                }
                let salaryValue = '';
                if (worker && worker.daily_rate) {
                    const hourlyRate = (worker.daily_rate / 8) * 1.25;
                    const rawSalary = (hourlyRate * hours).toFixed(2);
                    salaryValue = formatNumberWithCommas(rawSalary);
                }
                
                rowHTML += `
                    <td style="padding: 8px; border: 1px solid #ddd; text-align: center;">
                        ${worker ? `<input type="number" class="worker-hours-day" data-index="${i}" data-day="${day}" value="${hours.toFixed(2)}" step="0.25" min="0" style="width: 70px; padding: 4px; border: 1px solid #ddd; border-radius: 4px; text-align: center; font-size: 12px;">` : ''}
                    </td>
                    <td style="padding: 8px; border: 1px solid #ddd; text-align: right;">
                        ${worker ? `<input type="text" class="worker-salary-day" data-index="${i}" data-day="${day}" value="${salaryValue}" readonly style="width: 120px; padding: 4px; border: 1px solid #ddd; border-radius: 4px; text-align: right; font-size: 12px; background: #f1f5f9;">` : ''}
                    </td>
                `;
            }
            
            // Action column
            rowHTML += `
                <td style="padding: 8px; border: 1px solid #ddd; text-align: center;">
                    ${worker ? `<button class="remove-worker-btn" data-index="${i}" style="background: none; border: none; color: #999; cursor: pointer; font-size: 16px; font-weight: bold; padding: 0 8px; line-height: 1;">×</button>` : ''}
                </td>
            `;
            
            row.innerHTML = rowHTML;
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

    function closeConfirmModal() {
        confirmModal.style.display = 'none';
        document.body.style.overflow = '';
    }

    async function openConfirmBatchModal() {
        try {
            // Fetch pending batches to show in the confirmation modal
            const res = await fetch('/api/chicken-hauling?status=pending', {
                headers: getAuthHeaders()
            });
            const batches = await res.json();
            const pendingBatches = Array.isArray(batches) ? batches : [];
            
            if (pendingBatches.length === 0) {
                alert('No pending batches to confirm');
                return;
            }
            
            // For simplicity, we'll use the first pending batch
            // In a real implementation, you might want to let the user select which batch to confirm
            const batch = pendingBatches[0];
            
            // Calculate pay period dates
            let startDate = '';
            let endDate = '';
            if (batch.day_entries && batch.day_entries.length > 0) {
                const dates = batch.day_entries.map(entry => new Date(entry.date));
                startDate = dates[0].toLocaleDateString();
                endDate = dates[dates.length - 1].toLocaleDateString();
                // If only one day, make sure end date equals start date
                if (dates.length === 1) {
                    endDate = startDate;
                }
            }
            
            // Calculate grand total from worker data
            let grandTotal = 0;
            if (batch.workers && batch.workers.length > 0) {
                batch.workers.forEach(worker => {
                    if (worker.daily_rate && worker.hoursPerDay) {
                        const hourlyRate = (worker.daily_rate / 8) * 1.25;
                        worker.hoursPerDay.forEach(hours => {
                            grandTotal += parseFloat((hourlyRate * hours).toFixed(2)) || 0;
                        });
                    }
                });
            }
            
            // Reset print state for this batch
            confirmPrintSummaryDone = false;
            confirmPrintPayslipDone = false;

            // Default to summary tab
            setConfirmTab('summary');

            // Store the batch data for use in handleFinalSave
            confirmModal.batchData = batch;
            confirmModal.grandTotal = grandTotal;
            
            confirmModal.style.display = 'flex';
            document.body.style.overflow = 'hidden';
        } catch (err) {
            console.error('Failed to load batch data for confirmation:', err);
            alert('Error loading batch data for confirmation');
        }
    }

    function setConfirmTab(tab) {
        if (confirmTabSummaryBtn && confirmTabPayslipBtn) {
            confirmTabSummaryBtn.classList.toggle('active', tab === 'summary');
            confirmTabPayslipBtn.classList.toggle('active', tab === 'summary' ? false : true);
            confirmTabSummaryBtn.style.background = tab === 'summary' ? '#fff' : '#f5f5f5';
            confirmTabSummaryBtn.style.color = tab === 'summary' ? '#1a1f2e' : '#666';
            confirmTabSummaryBtn.style.borderBottom = tab === 'summary' ? '2px solid #FFD000' : 'none';
            confirmTabPayslipBtn.style.background = tab === 'payslip' ? '#fff' : '#f5f5f5';
            confirmTabPayslipBtn.style.color = tab === 'payslip' ? '#1a1f2e' : '#666';
            confirmTabPayslipBtn.style.borderBottom = tab === 'payslip' ? '2px solid #FFD000' : 'none';
        }

        if (tab === 'summary') {
            renderConfirmSummary();
            confirmPrintBtn.textContent = 'Print Summary';
        } else {
            renderConfirmPayslip();
            confirmPrintBtn.textContent = 'Print Payslip';
        }
        updateConfirmFinalSaveState();
    }

    function renderConfirmSummary() {
        const batch = confirmModal.batchData;
        const grandTotal = confirmModal.grandTotal;

        let startDate = '';
        let endDate = '';
        if (batch.day_entries && batch.day_entries.length > 0) {
            const dates = batch.day_entries.map(entry => new Date(entry.date));
            startDate = dates[0].toLocaleDateString();
            endDate = dates[dates.length - 1].toLocaleDateString();
            if (dates.length === 1) endDate = startDate;
        }

        confirmBatchPreviewContent.innerHTML = `
            <div style="margin-bottom: 16px;">
                <h4>Batch Details</h4>
                <p><strong>Batch ID:</strong> ${batch.hauling_id || 'N/A'}</p>
                <p><strong>Building:</strong> ${batch.building_name || batch.building_id || 'N/A'}</p>
                <p><strong>Pay Period:</strong> ${startDate} to ${endDate}</p>
                <p><strong>Number of Employees:</strong> ${batch.workers ? batch.workers.length : 0}</p>
                <p><strong>Grand Total:</strong> P ${formatNumberWithCommas(grandTotal.toFixed(2))}</p>
            </div>
            <div style="border-top: 1px solid #eee; padding-top: 16px;">
                <h4>Payroll Transaction Details</h4>
                <p>Click "Final Save" to create the payroll transaction record with the following:</p>
                <ul>
                    <li>Date: ${new Date().toLocaleDateString()}</li>
                    <li>Pay period start: ${startDate}</li>
                    <li>Pay period end: ${endDate}</li>
                    <li>Batch payroll ID: ${(batch.batch_id || 0) + 1} (next in sequence)</li>
                    <li>Payroll Count: ${batch.workers ? batch.workers.length : 0}</li>
                    <li>Total Gross Pay: [Not calculated - as requested]</li>
                    <li>Total Gross Deduction: [Not calculated - as requested]</li>
                    <li>Total Net pay: P ${formatNumberWithCommas(grandTotal.toFixed(2))}</li>
                    <li>Status: Pending</li>
                </ul>
            </div>
        `;
    }

    function renderConfirmPayslip() {
        const batch = confirmModal.batchData;

        let startDate = '';
        let endDate = '';
        if (batch.day_entries && batch.day_entries.length > 0) {
            const dates = batch.day_entries.map(entry => new Date(entry.date));
            startDate = dates[0].toLocaleDateString();
            endDate = dates[dates.length - 1].toLocaleDateString();
            if (dates.length === 1) endDate = startDate;
        }

        const payslipRows = (batch.workers || []).map((worker, idx) => {
            const hoursPerDay = worker.hoursPerDay || [];
            const dailyRate = parseFloat(worker.daily_rate || 0);
            const hourlyRate = (dailyRate / 8) * 1.25;
            let workerTotal = 0;
            const dayCells = hoursPerDay.map((h, dIdx) => {
                const amount = parseFloat((hourlyRate * h).toFixed(2));
                workerTotal += amount;
                return `<div style="display: flex; justify-content: space-between; padding: 4px 0; border-bottom: 1px solid #eee; font-size: 12px;">
                    <span>Day ${dIdx + 1}: ${h} hrs</span>
                    <span>P ${formatNumberWithCommas(amount.toFixed(2))}</span>
                </div>`;
            }).join('');

            return `
                <div style="border: 1px solid #ddd; border-radius: 6px; padding: 14px; margin-bottom: 12px; page-break-inside: avoid; background: #fff;">
                    <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 10px;">
                        <div>
                            <div style="font-weight: 700; font-size: 14px;">${worker.last_name || ''}, ${worker.first_name || ''}</div>
                            <div style="font-size: 12px; color: #666;">Employee ID: ${worker.employee_id || 'N/A'}</div>
                        </div>
                        <div style="text-align: right;">
                            <div style="font-weight: 700; font-size: 13px;">P ${formatNumberWithCommas(workerTotal.toFixed(2))}</div>
                            <div style="font-size: 11px; color: #666;">Total Pay</div>
                        </div>
                    </div>
                    <div style="font-size: 12px; color: #666; margin-bottom: 8px;">
                        <span style="font-weight: 600;">Daily Rate:</span> P ${formatNumberWithCommas(dailyRate.toFixed(2))} &nbsp;|&nbsp;
                        <span style="font-weight: 600;">Period:</span> ${startDate} to ${endDate}
                    </div>
                    <div style="border-top: 1px solid #ddd; padding-top: 8px;">
                        ${dayCells}
                    </div>
                </div>
            `;
        }).join('');

        confirmBatchPreviewContent.innerHTML = `
            <div style="margin-bottom: 12px;">
                <h4>Employee Payslip Cut-out</h4>
                <p style="font-size: 12px; color: #666;">${batch.workers ? batch.workers.length : 0} employee(s) - Cut along the lines for individual payslips</p>
            </div>
            <div style="border: 2px dashed #999; padding: 10px; background: #fafafa;">
                ${payslipRows || '<p style="color: #888;">No employee data available</p>'}
            </div>
        `;
    }

    function handleConfirmPrint() {
        const isSummary = confirmTabSummaryBtn && confirmTabSummaryBtn.classList.contains('active');
        const printContent = confirmBatchPreviewContent.innerHTML;

        const printWindow = window.open('', '_print', 'width=800,height=800');
        printWindow.document.write(`
            <html>
            <head>
                <title>Print Preview</title>
                <style>
                    body { font-family: Arial, sans-serif; padding: 20px; color: #000; }
                    .page-break { page-break-inside: avoid; }
                    table, td, th { border: 1px solid #000; border-collapse: collapse; padding: 6px; font-size: 12px; }
                    h3 { margin: 0 0 10px 0; font-size: 16px; }
                    p { margin: 4px 0; font-size: 12px; }
                </style>
            </head>
            <body onload="window.print(); window.close();">
                ${printContent}
            </body>
            </html>
        `);
        printWindow.document.close();

        if (isSummary) {
            confirmPrintSummaryDone = true;
        } else {
            confirmPrintPayslipDone = true;
        }
        updateConfirmFinalSaveState();
    }

    function updateConfirmFinalSaveState() {
        const canSave = confirmPrintSummaryDone && confirmPrintPayslipDone;
        if (finalSaveBtn) {
            finalSaveBtn.disabled = !canSave;
            if (canSave) {
                finalSaveBtn.style.cursor = 'pointer';
                finalSaveBtn.style.background = '';
                finalSaveBtn.style.opacity = '1';
            } else {
                finalSaveBtn.style.cursor = 'not-allowed';
                finalSaveBtn.style.background = '#b8c2cc';
                finalSaveBtn.style.opacity = '0.6';
            }
        }
        if (confirmBatchStatusLabel) {
            if (canSave) {
                confirmBatchStatusLabel.textContent = 'Both printables completed. You may now Final Save.';
                confirmBatchStatusLabel.style.color = '#1a1f2e';
            } else {
                const missing = [];
                if (!confirmPrintSummaryDone) missing.push('Summary');
                if (!confirmPrintPayslipDone) missing.push('Payslip');
                confirmBatchStatusLabel.textContent = `Print ${missing.join(' and ')} to enable Final Save`;
                confirmBatchStatusLabel.style.color = '#888';
            }
        }
    }

    async function handleFinalSave() {
        try {
            // Get the batch data stored in the modal
            const batchData = confirmModal.batchData;
            const grandTotal = confirmModal.grandTotal;
            
            if (!batchData) {
                alert('No batch data available for final save');
                return;
            }
            
            // Calculate pay period dates from batch data
            let startDate = '';
            let endDate = '';
            if (batchData.day_entries && batchData.day_entries.length > 0) {
                const dates = batchData.day_entries.map(entry => new Date(entry.date));
                startDate = dates[0].toISOString().split('T')[0]; // YYYY-MM-DD format for API
                endDate = dates[dates.length - 1].toISOString().split('T')[0];
                // If only one day, make sure end date equals start date
                if (dates.length === 1) {
                    endDate = startDate;
                }
            }
            
            // Prepare payroll transaction data
            const payrollData = {
                date: new Date().toISOString().split('T')[0], // Today's date in YYYY-MM-DD
                pay_period_start: startDate,
                pay_period_end: endDate,
                batch_payroll_id: (batchData.batch_id || 0) + 1, // Next in sequence
                payroll_count: batchData.workers ? batchData.workers.length : 0,
                total_gross_pay: null, // Leave blank as requested
                total_gross_deduction: null, // Leave blank as requested
                total_net_pay: grandTotal, // Grand total from the modal
                status: 'Pending' // Start at pending as requested
            };
            
            // Make API call to create payroll transaction
            const res = await fetch('/api/payroll', {
                method: 'POST',
                headers: getAuthHeaders(),
                body: JSON.stringify(payrollData)
            });
            
            if (res.ok) {
                alert('Payroll transaction created successfully');
                // Close the confirmation modal
                closeConfirmModal();
                // Reload pending batches (should be empty now or reduced)
                loadPendingBatches();
            } else {
                const err = await res.json();
                alert('Error: ' + (err.error || 'Failed to create payroll transaction'));
            }
        } catch (err) {
            console.error('Final save error:', err);
            alert('Failed to create payroll transaction');
        }
    }

    createBtn?.addEventListener('click', openModal);
    backBtn?.addEventListener('click', () => switchTab('hr-salary'));
    closeModalBtn?.addEventListener('click', closeModal);
    cancelBtn?.addEventListener('click', closeModal);

    window.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
        if (e.target === confirmModal) closeConfirmModal();
    });

    // Confirmation modal event listeners
    closeConfirmModalBtn?.addEventListener('click', closeConfirmModal);
    cancelConfirmBtn?.addEventListener('click', closeConfirmModal);
    finalSaveBtn?.addEventListener('click', handleFinalSave);
    confirmTabSummaryBtn?.addEventListener('click', () => setConfirmTab('summary'));
    confirmTabPayslipBtn?.addEventListener('click', () => setConfirmTab('payslip'));
    confirmPrintBtn?.addEventListener('click', handleConfirmPrint);

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
                  <div class="search-result-item" style="padding: 10px 12px; cursor: pointer; border-bottom: 1px solid #eee; font-size: 13px;" data-id="${emp.employee_id}" data-last="${emp.last_name}" data-first="${emp.first_name}" data-middle="${emp.middle_name || ''}">
                      <strong>${emp.last_name}, ${emp.first_name} ${emp.middle_name || ''}</strong><br>
                      <small style="color: #666; font-size: 11px;">${emp.employee_id}</small>
                  </div>
              `).join('');
              workerSearchResults.style.display = 'block';
          } else {
              workerSearchResults.innerHTML = '<div style="padding: 10px 12px; color: #999; font-size: 13px;">No workers found</div>';
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
        const daysSelect = document.getElementById('hauling-days');
        const days = parseInt(daysSelect.value) || 1;
        const worker = {
            employee_id: empId,
            last_name: lastName,
            first_name: firstName,
            middle_name: middleName,
            daily_rate: dailyRate,
            hoursPerDay: getCurrentHoursPerDay().slice() // Copy the current hours per day from the form
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

    // workersTbody?.addEventListener('input', (e) => {
    //     const target = e.target;
    //     const idx = parseInt(target.dataset.index);
    //     if (isNaN(idx)) return;
    //     const worker = selectedWorkers[idx];
    //     if (!worker) return;
    //     if (target.classList.contains('worker-hours-day')) {
    //         const dayIndex = parseInt(target.dataset.day);
    //         worker.hoursPerDay[dayIndex] = parseFloat(target.value) || 0;
    //         // Recalculate salary for this worker on this day
    //         if (worker.daily_rate) {
    //             const hourlyRate = (worker.daily_rate / 8) * 1.25;
    //             const salaryAmount = (hourlyRate * worker.hoursPerDay[dayIndex]).toFixed(2);
    //             // Update the salary input display for this day
    //             const salaryInput = target.closest('tr').querySelector(`.worker-salary-day[data-index="${idx}"][data-day="${dayIndex}"]`);
    //             if (salaryInput) salaryInput.value = salaryAmount;
    //         }
    //         calculateGrandTotal();
    //     }
    // });

    if (haulingDaysSelect && haulingDatesContainer) {
        haulingDaysSelect.addEventListener('change', () => {
            const days = parseInt(haulingDaysSelect.value) || 1;
            const currentRows = haulingDatesContainer.querySelectorAll('.hauling-day-row').length;
            if (days > currentRows) {
                // Need to add rows
                for (let i = currentRows; i < days; i++) {
                    const dayNumber = i + 1;
                    const newRow = document.createElement('div');
                    newRow.className = 'hauling-day-row';
                    newRow.dataset.day = dayNumber;
                    newRow.style.cssText = 'display: flex; gap: 16px; flex-wrap: wrap; align-items: flex-end;';
                    newRow.innerHTML = `
                        <div style="flex: 1; min-width: 200px; display: flex; flex-direction: column; gap: 4px;">
                            <label style="font-weight: 600; font-size: 13px; color: #333;">Date</label>
                            <input type="date" class="hauling-date" style="padding: 8px; border: 1px solid #ddd; border-radius: 6px; font-size: 14px;">
                        </div>
                        <div style="flex: 1; min-width: 200px; display: flex; flex-direction: column; gap: 4px;">
                            <label style="font-weight: 600; font-size: 13px; color: #333;">Start Time</label>
                            <input type="time" class="hauling-start-time" style="padding: 8px; border: 1px solid #ddd; border-radius: 6px; font-size: 14px;">
                        </div>
                        <div style="flex: 1; min-width: 200px; display: flex; flex-direction: column; gap: 4px;">
                            <label style="font-weight: 600; font-size: 13px; color: #333;">End Time</label>
                            <input type="time" class="hauling-end-time" style="padding: 8px; border: 1px solid #ddd; border-radius: 6px; font-size: 14px;">
                        </div>
                    `;
                    haulingDatesContainer.appendChild(newRow);
                }
            } else if (days < currentRows) {
                // Need to remove rows from the end
                const rows = haulingDatesContainer.querySelectorAll('.hauling-day-row');
                for (let i = currentRows - 1; i >= days; i--) {
                    haulingDatesContainer.removeChild(rows[i]);
                }
            }
            // Now update the hours per day based on the current form (which includes any preserved or new inputs)
            updateHoursPerDayFromForm();
        });
    }

    if (haulingDatesContainer) {
        haulingDatesContainer.addEventListener('input', () => {
            updateHoursPerDayFromForm();
        });
    }

    // Add event listener for worker hours input changes
    workersTbody?.addEventListener('input', (e) => {
        const target = e.target;
        const idx = parseInt(target.dataset.index);
        if (isNaN(idx)) return;
        const worker = selectedWorkers[idx];
        if (!worker) return;
        if (target.classList.contains('worker-hours-day')) {
            const dayIndex = parseInt(target.dataset.day);
            worker.hoursPerDay[dayIndex] = parseFloat(target.value) || 0;
            // Recalculate salary for this worker on this day
            if (worker.daily_rate) {
                const hourlyRate = (worker.daily_rate / 8) * 1.25;
                const salaryAmount = (hourlyRate * worker.hoursPerDay[dayIndex]).toFixed(2);
                // Update the salary input display for this day
                const salaryInput = target.closest('tr').querySelector(`.worker-salary-day[data-index="${idx}"][data-day="${dayIndex}"]`);
                if (salaryInput) salaryInput.value = formatNumberWithCommas(salaryAmount);
            }
            calculateGrandTotal();
        }
    });

    saveBtn?.addEventListener('click', async () => {
        const haulingId = haulingIdInput.value;
        const buildingId = buildingSelect.value;
        const days = parseInt(document.getElementById('hauling-days').value) || 1;
        const dayEntries = getDaysData();

        if (!haulingId || !buildingId || dayEntries.length === 0) {
            alert('Please fill all required fields');
            return;
        }
        
        // Validate that all days have dates
        const daysWithoutDate = dayEntries.filter(e => !e.date);
        if (daysWithoutDate.length > 0) {
            alert('Please enter dates for all days before saving');
            return;
        }

        if (selectedWorkers.length === 0) {
            alert('Please add at least one worker');
            return;
        }

        // Calculate grand total and date range from day entries
        let grandTotal = 0;
        dayEntries.forEach((entry, dayIndex) => {
            const hours = calculateHours(entry.start_time, entry.end_time);
            selectedWorkers.forEach(worker => {
                if (worker.daily_rate && worker.daily_rate > 0) {
                    const hourlyRate = (worker.daily_rate / 8) * 1.25;
                    grandTotal += parseFloat((hourlyRate * hours).toFixed(2)) || 0;
                }
            });
        });

        const dateStart = dayEntries.length > 0 ? dayEntries[0].date : '';
        const dateEnd = dayEntries.length > 0 ? dayEntries[dayEntries.length - 1].date : '';

        try {
            const res = await fetch('/api/chicken-hauling', {
                method: 'POST',
                headers: getAuthHeaders(),
                body: JSON.stringify({ hauling_id: haulingId, building_id: buildingId, days: days, day_entries: dayEntries, workers: selectedWorkers, grand_total: grandTotal, date_start: dateStart, date_end: dateEnd, status: 'pending' })
            });
            if (res.ok) {
                alert('Chicken Hauling log saved');
                closeModal();
                // Refresh the pending batches display
                loadPendingBatches();
            } else {
                const err = await res.json();
                if (err.error && err.error.includes('duplicate key')) {
                    // Generate new ID and retry
                    haulingIdInput.value = generateHaulingId();
                    alert('Duplicate ID detected. New ID generated: ' + haulingIdInput.value + '. Please save again.');
                } else {
                    alert('Error: ' + (err.error || 'Failed to save'));
                }
            }
        } catch (err) {
            console.error('Save error:', err);
            alert('Failed to save');
        }
    });

const confirmBatchBtn = document.getElementById('confirm-chicken-hauling-batch-btn');
    confirmBatchBtn?.addEventListener('click', () => {
        // Open confirmation modal instead of just alerting
        openConfirmBatchModal();
    });

    const deleteBatchBtn = document.getElementById('delete-chicken-hauling-batch-btn');
    deleteBatchBtn?.addEventListener('click', async () => {
        if (!confirm('Are you sure you want to delete the pending batch? This action cannot be undone.')) {
            return;
        }
        try {
            const res = await fetch('/api/chicken-hauling?status=pending', {
                headers: getAuthHeaders()
            });
            const batches = await res.json();
            const pendingBatches = Array.isArray(batches) ? batches : [];
            if (pendingBatches.length === 0) {
                alert('No pending batches to delete');
                return;
            }
            const batch = pendingBatches[0];
            const deleteRes = await fetch(`/api/chicken-hauling/${batch.hauling_id}`, {
                method: 'DELETE',
                headers: getAuthHeaders()
            });
            const deleteResult = await deleteRes.json();
            if (deleteRes.ok) {
                alert('Batch deleted successfully');
                loadPendingBatches();
            } else {
                alert('Error: ' + (deleteResult.error || 'Failed to delete batch'));
            }
        } catch (err) {
            console.error('Delete error:', err);
            alert('Failed to delete batch');
        }
    });

    // Load pending batches when component initializes
    initHaulingCounter();
    loadPendingBatches();
};
