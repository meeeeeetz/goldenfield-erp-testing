if (typeof ModuleComponents === 'undefined') { window.ModuleComponents = {}; }

ModuleComponents['operations-layer-buildings'] = (container) => {
        container.innerHTML = `
            <div class="buildings-layout">
                <div class="header-actions">
                    <h2>Layer Buildings</h2>
                </div>
                <div class="action-buttons-row">
                    <button id="open-building-modal" class="btn-icon-circle">
                        <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                        <span class="btn-label">Report Daily Layer</span>
                    </button>
                    <button id="print-monthly-report-btn" class="btn-icon-circle">
                        <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                        <span class="btn-label">Print Monthly Layer Report</span>
                    </button>
                    <button id="add-remove-building-btn" class="btn-icon-circle">
                        <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                        <span class="btn-label">Add/Remove Buidling</span>
                    </button>
                    <button id="upload-bldg-report-admin-btn" class="btn-icon-circle" style="background: #1ea672; color: #fff;">
                        <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                        <span class="btn-label">Upload Bldg Report Admin</span>
                    </button>
                </div>
                <div class="tracking-cards-row layer-cards-row">
                    <div class="card tracking-card">
                        <h3>Total Flocks</h3>
                        <p class="card-sub-label">total number of heads for the whole farm</p>
                        <div class="card-value-row">
                            <div class="card-value">115,000 heads</div>
                        </div>
                    </div>
                    <div class="card tracking-card">
                        <h3>Mortality Rate</h3>
                        <p class="card-sub-label">Daily Number of Mortality</p>
                        <div class="card-value-row">
                            <div class="card-value">40 heads</div>
                            <span class="trend-down">▼ 1%</span>
                        </div>
                        <p class="vs-last-month">VS yesterday</p>
                    </div>
                    <div class="card tracking-card">
                        <h3>Production Rate</h3>
                        <p class="card-sub-label">Daily Egg Production for the whole farm</p>
                        <div class="card-value-row">
                            <div class="card-value">70%</div>
                            <span class="trend-up">▲ 2%</span>
                        </div>
                    </div>
                    <div class="card tracking-card">
                        <h3>Electric Consumption</h3>
                        <p class="card-sub-label">Daily Electric usage for layer Buidlings</p>
                        <div class="card-value-row">
                            <div class="card-value">5340 KWH</div>
                            <span class="trend-up">▼ 5%</span>
                        </div>
                        <p class="vs-last-month">VS yesterday</p>
                    </div>
                    <div class="card tracking-card">
                        <h3>Water Consumption</h3>
                        <p class="card-sub-label">Daily water usage for layer buildings</p>
                        <div class="card-value-row">
                            <div class="card-value">5000 liter</div>
                            <span class="trend-up">▲ 5%</span>
                        </div>
                        <p class="vs-last-month">VS Yesterday</p>
                    </div>
                </div>
                <div class="card graph-placeholder vet-tracking-card">
                    <h3>Buildings</h3>
                    <div class="table-wrap">
                        <table class="data-table product-table">
                            <thead>
                                <tr>
                                    <th>Building ID</th>
                                    <th>Building Name</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody id="buildings-table-body">
                            </tbody>
                        </table>
                    </div>
                </div>
                <div class="card graph-placeholder vet-tracking-card">
                    <h3>Building View</h3>
                    <div id="building-view-tabs" style="display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 16px; border-bottom: 1px solid #e5e7eb; padding-bottom: 8px;">
                        <span style="color: #64748b; font-size: 14px;">Loading buildings...</span>
                    </div>
                    <div class="table-wrap">
                        <table class="data-table product-table">
                            <thead>
                                <tr>
                                    <th>Date</th>
                                    <th>Age</th>
                                    <th>Normal</th>
                                    <th>Sipon</th>
                                    <th>Prolapse</th>
                                    <th>Others</th>
                                    <th>Culls</th>
                                    <th>Medication 1</th>
                                    <th>Medication 1 Qty</th>
                                    <th>Medication 1 Unit</th>
                                    <th>Medication 2</th>
                                    <th>Medication 2 Qty</th>
                                    <th>Medication 2 Unit</th>
                                    <th>Medication 3</th>
                                    <th>Medication 3 Qty</th>
                                    <th>Medication 3 Unit</th>
                                    <th>Time Start</th>
                                    <th>Time Finish</th>
                                    <th>Electricity Usage</th>
                                    <th>Water Consumption</th>
                                    <th>Production Pcs</th>
                                    <th>Production Percentage</th>
                                    <th>Feeds Type</th>
                                    <th>Feeds Kilos</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr><td colspan="24">&nbsp;</td></tr>
                                <tr><td colspan="24">&nbsp;</td></tr>
                                <tr><td colspan="24">&nbsp;</td></tr>
                                <tr><td colspan="24">&nbsp;</td></tr>
                                <tr><td colspan="24">&nbsp;</td></tr>
                                <tr><td colspan="24">&nbsp;</td></tr>
                                <tr><td colspan="24">&nbsp;</td></tr>
                                <tr><td colspan="24">&nbsp;</td></tr>
                                <tr><td colspan="24">&nbsp;</td></tr>
                                <tr><td colspan="24">&nbsp;</td></tr>
                                <tr><td colspan="24">&nbsp;</td></tr>
                                <tr><td colspan="24">&nbsp;</td></tr>
                                <tr><td colspan="24">&nbsp;</td></tr>
                                <tr><td colspan="24">&nbsp;</td></tr>
                                <tr><td colspan="24">&nbsp;</td></tr>
                                <tr><td colspan="24">&nbsp;</td></tr>
                                <tr><td colspan="24">&nbsp;</td></tr>
                                <tr><td colspan="24">&nbsp;</td></tr>
                                <tr><td colspan="24">&nbsp;</td></tr>
                                <tr><td colspan="24">&nbsp;</td></tr>
                                <tr><td colspan="24">&nbsp;</td></tr>
                                <tr><td colspan="24">&nbsp;</td></tr>
                                <tr><td colspan="24">&nbsp;</td></tr>
                                <tr><td colspan="24">&nbsp;</td></tr>
                                <tr><td colspan="24">&nbsp;</td></tr>
                                <tr><td colspan="24">&nbsp;</td></tr>
                                <tr><td colspan="24">&nbsp;</td></tr>
                                <tr><td colspan="24">&nbsp;</td></tr>
                                <tr><td colspan="24">&nbsp;</td></tr>
                                <tr><td colspan="24">&nbsp;</td></tr>
                                <tr><td colspan="24">&nbsp;</td></tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div class="vet-bottom-row-2">
                <div class="card graph-placeholder vet-tracking-card">
                    <h3>Culling Date</h3>
                    <div class="table-wrap">
                        <table class="data-table product-table">
                            <thead>
                                <tr>
                                    <th>Layer Buidling</th>
                                    <th>Culling Date</th>
                                    <th>Arrival Date</th>
                                    <th>Company</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr><td>701</td><td>2027-01-15</td><td>2025-08-10</td><td>ABC Hatchery</td></tr>
                                <tr><td>702</td><td>2026-12-20</td><td>2025-09-01</td><td>XYZ Hatchery</td></tr>
                                <tr><td>703</td><td>2027-02-28</td><td>2025-07-20</td><td>Prime Hatchery</td></tr>
                                <tr><td>704</td><td>2026-11-15</td><td>2025-10-05</td><td>Metro Hatchery</td></tr>
                                <tr><td>705</td><td>2027-03-10</td><td>2025-06-15</td><td>ABC Hatchery</td></tr>
                                <tr><td>706</td><td>2026-12-30</td><td>2025-08-25</td><td>XYZ Hatchery</td></tr>
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
                <div class="card graph-placeholder vet-tracking-card">
                    <h3>mass Vaccination Schedule</h3>
                    <div class="table-wrap">
                        <table class="data-table product-table">
                            <thead>
                                <tr>
                                    <th>Date</th>
                                    <th>Vaccine type</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr><td>2026-07-15</td><td>Newcastle Disease</td></tr>
                                <tr><td>2026-07-22</td><td>Infectious Bronchitis</td></tr>
                                <tr><td>2026-07-29</td><td>Marek's Disease</td></tr>
                                <tr><td>2026-08-05</td><td>Avian Influenza</td></tr>
                                <tr><td>2026-08-12</td><td>Gumboro</td></tr>
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
                </div>
                <div id="building-modal" class="modal hidden">
                    <div class="modal-content daily-layer-modal">
                        <div class="modal-header-row">
                            <h3>Report Daily Layer</h3>
                            <button id="close-building-modal-btn" class="modal-close-btn" title="Close">&times;</button>
                        </div>
                        <div class="daily-layer-body">
                            <div class="broken-fields">
                                <div class="modal-field">
                                    <label for="report-building-select">Building</label>
                                    <select class="modal-select" id="report-building-select">
                                        <option value="701">Building 701</option>
                                        <option value="702">Building 702</option>
                                        <option value="703">Building 703</option>
                                        <option value="704">Building 704</option>
                                        <option value="705">Building 705</option>
                                        <option value="706">Building 706</option>
                                    </select>
                                </div>
                                <div class="modal-field">
                                    <label for="report-date">Date</label>
                                    <input type="text" id="report-date" class="readonly-field" readonly placeholder="Date will be set automatically" />
                                </div>
                            </div>
                            <div class="modal-section">
                                <h4>Mortality</h4>
                                <hr class="modal-divider" />
                                <div class="broken-fields">
                                    <div class="modal-field"><label for="mort-normal">Normal</label><input type="text" id="mort-normal" placeholder="0" /></div>
                                    <div class="modal-field"><label for="mort-sipon">Sipon</label><input type="text" id="mort-sipon" placeholder="0" /></div>
                                    <div class="modal-field"><label for="mort-prolapse">Prolapse</label><input type="text" id="mort-prolapse" placeholder="0" /></div>
                                </div>
                                <div class="broken-fields">
                                    <div class="modal-field"><label for="mort-others">Others</label><input type="text" id="mort-others" placeholder="0" /></div>
                                    <div class="modal-field"><label for="mort-culled">Culled</label><input type="text" id="mort-culled" placeholder="0" /></div>
                                </div>
                            </div>
                            <div class="modal-section">
                                <h4>Medication</h4>
                                <hr class="modal-divider" />
                                <div class="modal-field med-field">
                                    <label for="med-count">Number of Medications</label>
                                    <select class="modal-select" id="med-count">
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                </select>
                            </div>
                            <div id="medication-entries"></div>
                        </div>
                            <div class="modal-section">
                                <h4>Electricity Usage</h4>
                                <hr class="modal-divider" />
                                <div class="modal-field">
                                    <div class="dual-input">
                                        <div class="dual-input-group">
                                            <label class="dual-label">Yesterday</label>
                                            <div class="input-with-unit">
                                                <input type="text" id="prev-electric" class="readonly-field" readonly placeholder="Last reading" />
                                                <span class="unit-label">KWH</span>
                                            </div>
                                        </div>
                                        <div class="dual-input-group">
                                            <label class="dual-label">Today</label>
                                            <div class="input-with-unit">
                                                <input type="text" id="electric-today" placeholder="Today's reading" />
                                                <span class="unit-label">KWH</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="modal-section">
                                <h4>Water Consumption</h4>
                                <hr class="modal-divider" />
                                <div class="modal-field">
                                    <div class="dual-input">
                                        <div class="dual-input-group">
                                            <label class="dual-label">Yesterday</label>
                                            <div class="input-with-unit">
                                                <input type="text" id="prev-water" class="readonly-field" readonly placeholder="Last reading" />
                                                <span class="unit-label">Liters</span>
                                            </div>
                                        </div>
                                        <div class="dual-input-group">
                                            <label class="dual-label">Today</label>
                                            <div class="input-with-unit">
                                                <input type="text" id="water-today" placeholder="Today's reading" />
                                                <span class="unit-label">Liters</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="modal-section">
                                <h4>Production</h4>
                                <hr class="modal-divider" />
                                <div class="modal-field">
                                    <div class="dual-input">
                                        <div class="dual-input-group">
                                            <label class="dual-label">Yesterday</label>
                                            <div class="input-with-unit">
                                                <input type="text" id="prev-production" class="readonly-field" readonly placeholder="Last reading" />
                                                <span class="unit-label">Pcs</span>
                                            </div>
                                        </div>
                                        <div class="dual-input-group">
                                            <label class="dual-label">Today</label>
                                            <div class="input-with-unit">
                                                <input type="text" id="production-today" placeholder="Today's reading" />
                                                <span class="unit-label">Pcs</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="modal-section">
                                <h4>Feeds</h4>
                                <hr class="modal-divider" />
                                <div class="modal-field feeds-field">
                                    <div class="dual-input">
                                        <select class="modal-select" id="feeds-delivered">
                                            <option value="No">No</option>
                                            <option value="Yes">Yes</option>
                                        </select>
                                    </div>
                                    <div id="feeds-details" class="hidden" style="margin-top: 12px;">
                                        <div class="broken-fields">
                                            <div class="modal-field">
                                                <label for="feeds-type">Type</label>
                                                <select class="modal-select" id="feeds-type">
                                                    <option value="">Select type</option>
                                                    <option value="Type 1">Type 1</option>
                                                    <option value="Type 2">Type 2</option>
                                                    <option value="Type 3">Type 3</option>
                                                </select>
                                            </div>
                                            <div class="modal-field">
                                                <label for="feeds-weight">Weight (Kgs)</label>
                                                <input type="text" id="feeds-weight" placeholder="Weight (Kgs)" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="modal-tab-actions">
                            <button id="save-building-btn" class="btn-primary">Save</button>
                        </div>
                    </div>
                </div>
                <div id="add-remove-building-modal" class="modal hidden">
                    <div class="modal-content daily-layer-modal">
                        <div class="modal-header-row">
                            <h3>Add / Remove Building</h3>
                            <button id="close-addremove-modal-btn" class="modal-close-btn" title="Close">&times;</button>
                        </div>
                        <div class="modal-tabs">
                            <button class="modal-tab active" data-tab="add">Add New Building</button>
                            <button class="modal-tab" data-tab="remove">Remove Building</button>
                        </div>
                        <div class="daily-layer-body">
                        <div class="modal-tab-panel" id="tab-add">
                            <div class="modal-field">
                                <label for="new-building-id">Building ID</label>
                                <input type="text" id="new-building-id" class="readonly-field" readonly placeholder="Auto-generated" />
                            </div>
                            <div class="modal-field">
                                <label for="new-building-name">Building Name</label>
                                <input type="text" id="new-building-name" placeholder="e.g. Main Layer House A" />
                            </div>
                            <div class="modal-field">
                                <label for="new-building-status">Status</label>
                                <select class="modal-select" id="new-building-status">
                                    <option value="Active">Active</option>
                                    <option value="Inactive">Inactive</option>
                                </select>
                            </div>
                            <div class="modal-tab-actions">
                                <button id="save-new-building-btn" class="btn-primary">Save</button>
                            </div>
                        </div>
                        <div class="modal-tab-panel hidden" id="tab-remove">
                            <div class="modal-field">
                                <label for="remove-building-select">Choose one building</label>
                                <select class="modal-select" id="remove-building-select">
                                    <option value="">Select Building</option>
                                </select>
                            </div>
                            <div class="modal-field">
                                <label for="remove-building-status">Status</label>
                                <select class="modal-select" id="remove-building-status">
                                    <option value="Active">Active</option>
                                    <option value="Inactive">Inactive</option>
                                </select>
                            </div>
                            <div class="modal-tab-actions">
                                <button id="save-remove-building-btn" class="btn-primary">Save</button>
                            </div>
                        </div>
                        </div>
                    </div>
                </div>
                <div id="upload-bldg-report-modal" class="modal hidden">
                    <div class="modal-overlay"></div>
                    <div class="modal-content">
                        <div class="modal-header-row">
                            <h3>Insert Past Building Report Datas</h3>
                            <button id="close-upload-bldg-modal-btn" class="modal-close-btn" title="Close">&times;</button>
                        </div>
                        <div class="modal-body">
                            <div class="upload-drop-zone" id="upload-drop-zone" style="border: 2px dashed #cbd5e1; border-radius: 8px; padding: 40px; text-align: center; color: #64748b; background: #f8fafc; cursor: pointer; transition: border-color 0.2s;">
                                <p style="margin: 0 0 8px; font-size: 16px; font-weight: 500;">Drag & drop your file here</p>
                                <span style="display: block; margin-bottom: 12px; font-size: 14px;">or</span>
                                <input type="file" id="upload-file-input" hidden />
                                <button type="button" class="btn-choose-file" id="choose-file-btn" style="padding: 8px 16px; border: 1px solid #cbd5e1; background: #fff; border-radius: 6px; cursor: pointer; font-size: 14px;">Choose File</button>
                            </div>
                            <div class="modal-actions-row" style="margin-top: 16px; display: flex; gap: 12px; justify-content: flex-end;">
                                <button id="download-template-btn" class="btn-secondary">Download Template</button>
                                <button id="save-bldg-report-btn" class="btn-primary">Save</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;

        document.getElementById('print-monthly-report-btn').onclick = () => {
            switchTab('operations-layer-print-monthly');
        };
        const addRemoveModal = document.getElementById('add-remove-building-modal');
        const closeAddRemoveModal = () => addRemoveModal.classList.add('hidden');
        const getNextBuildingId = async () => {
            try {
                const res = await fetch('/api/layer-buildings-reports/buildings/next-id');
                if (res.ok) {
                    const data = await res.json();
                    return data.building_id || 'BldgID-001';
                }
            } catch (err) {
                console.error('Failed to get next building ID', err);
            }
            return 'BldgID-001';
        };
        const switchAddRemoveTab = (tab) => {
            addRemoveModal.querySelectorAll('.modal-tab').forEach(t => t.classList.toggle('active', t.dataset.tab === tab));
            document.getElementById('tab-add').classList.toggle('hidden', tab !== 'add');
            document.getElementById('tab-remove').classList.toggle('hidden', tab !== 'remove');
        };
        document.getElementById('add-remove-building-btn').onclick = async () => {
            switchAddRemoveTab('add');
            const nextId = await getNextBuildingId();
            document.getElementById('new-building-id').value = nextId;
            document.getElementById('new-building-name').value = '';
            document.getElementById('new-building-status').value = 'Active';
            addRemoveModal.classList.remove('hidden');
        };
        document.getElementById('close-addremove-modal-btn').onclick = closeAddRemoveModal;
        addRemoveModal.querySelectorAll('.modal-tab').forEach(tab => {
            tab.onclick = async () => {
                await switchAddRemoveTab(tab.dataset.tab);
                if (tab.dataset.tab === 'remove') {
                    const select = document.getElementById('remove-building-select');
                    try {
                        const res = await fetch('/api/layer-buildings-reports/buildings/active');
                        if (res.ok) {
                            const buildings = await res.json();
                            select.innerHTML = '<option value="">Select Building</option>';
                            buildings.forEach(b => {
                                const option = document.createElement('option');
                                option.value = b.building_id;
                                option.textContent = b.building_name;
                                select.appendChild(option);
                            });
                        }
                    } catch (err) {
                        console.error('Failed to load buildings', err);
                    }
                }
            };
        });
        document.getElementById('save-new-building-btn').onclick = async () => {
            const buildingId = document.getElementById('new-building-id').value;
            const buildingName = document.getElementById('new-building-name').value.trim();
            const status = document.getElementById('new-building-status').value;
            if (!buildingName) { alert('Please enter a building name.'); return; }
            try {
                const res = await fetch('/api/layer-buildings-reports/buildings', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ building_id: buildingId, building_name: buildingName, status })
                });
                if (!res.ok) {
                    const errData = await res.json().catch(() => ({}));
                    throw new Error(errData.error || 'Failed to save building');
                }
                alert('Building saved successfully');
                document.getElementById('new-building-name').value = '';
                closeAddRemoveModal();
                loadBuildingsTable();
            } catch (err) {
                alert('Error: ' + err.message);
            }
        };
        document.getElementById('save-remove-building-btn').onclick = async () => {
            const buildingId = document.getElementById('remove-building-select').value;
            const status = document.getElementById('remove-building-status').value;
            if (!buildingId) { alert('Please select a building.'); return; }
            try {
                const res = await fetch(`/api/layer-buildings-reports/buildings/${encodeURIComponent(buildingId)}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ status })
                });
                if (!res.ok) {
                    const errData = await res.json().catch(() => ({}));
                    throw new Error(errData.error || 'Failed to update building');
                }
                alert('Building updated successfully');
                closeAddRemoveModal();
                loadBuildingsTable();
            } catch (err) {
                alert('Error: ' + err.message);
            }
        };
        const layerModal = document.getElementById('building-modal');
        const prevDayData = {
            '701': { electric: '920', water: '4,600', production: '68' },
            '702': { electric: '880', water: '4,400', production: '65' },
            '703': { electric: '940', water: '4,700', production: '70' },
            '704': { electric: '850', water: '4,200', production: '62' },
            '705': { electric: '970', water: '4,900', production: '72' },
            '706': { electric: '900', water: '4,500', production: '66' }
        };
        const populatePrevDay = () => {
            const key = document.getElementById('report-building-select').value;
            const d = prevDayData[key] || { electric: '-', water: '-', production: '-' };
            document.getElementById('prev-electric').value = d.electric;
            document.getElementById('prev-water').value = d.water;
            document.getElementById('prev-production').value = d.production;
        };
        const closeLayerModal = () => layerModal.classList.add('hidden');

        document.getElementById('open-building-modal').onclick = () => {
            populatePrevDay();
            medCountSelect.value = '1';
            renderMedicationBlocks(1);
            const dateInput = document.getElementById('report-date');
            if (dateInput) {
                const today = new Date();
                const formatted = (today.getMonth() + 1).toString().padStart(2, '0') + '/' + today.getDate().toString().padStart(2, '0') + '/' + today.getFullYear();
                dateInput.value = formatted;
            }
            layerModal.classList.remove('hidden');
        };
        document.getElementById('close-building-modal-btn').onclick = closeLayerModal;
        document.getElementById('report-building-select').onchange = populatePrevDay;
        const feedsSelect = document.getElementById('feeds-delivered');
        const toggleFeedsDetails = () => {
            const details = document.getElementById('feeds-details');
            if (details) {
                details.classList.toggle('hidden', feedsSelect.value !== 'Yes');
            }
        };
        feedsSelect.onchange = toggleFeedsDetails;
        const medOptionsList = ['Vitamins', 'Antibiotics', 'Probiotics', 'Electrolytes', 'Coccidiostat', 'Vaccine'];
        const renderMedicationBlocks = (count) => {
            const container = document.getElementById('medication-entries');
            let html = '';
            for (let i = 0; i < count; i++) {
                const opts = medOptionsList.map(o => `<option value="${o.toLowerCase()}">${o}</option>`).join('');
                html += `
                    <div class="med-block">
                        <div class="modal-field med-field">
                            <label for="medication-select-${i}">Medication ${i + 1}</label>
                            <select class="modal-select" id="medication-select-${i}">
                                <option value="">Select medication</option>
                                ${opts}
                            </select>
                        </div>
                        <div class="modal-field med-field">
                            <label>Quantity</label>
                            <div class="dual-input">
                                <input type="text" id="med-quantity-${i}" placeholder="0" />
                                <select class="modal-select" id="med-unit-${i}">
                                    <option value="g">grams</option>
                                    <option value="ml">ml</option>
                                </select>
                            </div>
                        </div>
                        <div class="modal-field med-field">
                            <label for="med-water-ratio-${i}">Water ratio</label>
                            <div class="dual-input">
                                <input type="text" id="med-water-ratio-${i}" placeholder="0" />
                                <span class="unit-label">liters</span>
                            </div>
                        </div>
                        <div class="modal-field med-field">
                            <label for="med-time-finish-${i}">Time start / Time finish</label>
                            <div class="dual-input">
                                <input type="time" id="med-time-start-${i}" placeholder="Start" />
                                <input type="time" id="med-time-finish-${i}" placeholder="Finish" />
                            </div>
                        </div>
                    </div>`;
            }
            container.innerHTML = html;
        };
        const medCountSelect = document.getElementById('med-count');
        medCountSelect.onchange = () => renderMedicationBlocks(parseInt(medCountSelect.value, 10));
        document.getElementById('save-building-btn').onclick = async () => {
            const building = document.getElementById('report-building-select').value;
            const reportDate = document.getElementById('report-date').value;
            const feeds = document.getElementById('feeds-delivered').value;
            const feedsType = document.getElementById('feeds-type')?.value || '';
            const feedsWeight = document.getElementById('feeds-weight')?.value || '';
            const electricToday = document.getElementById('electric-today').value;
            const waterToday = document.getElementById('water-today').value;
            const productionToday = document.getElementById('production-today').value;
            const medCount = parseInt(document.getElementById('med-count').value, 10);
            const medications = [];
            for (let i = 0; i < medCount; i++) {
                const m = document.getElementById('medication-select-' + i).value;
                const q = document.getElementById('med-quantity-' + i).value;
                const u = document.getElementById('med-unit-' + i).value;
                const r = document.getElementById('med-water-ratio-' + i).value;
                const ts = document.getElementById('med-time-start-' + i).value;
                const t = document.getElementById('med-time-finish-' + i).value;
                if (m) {
                    medications.push({ type: m, quantity: q, unit: u, water_ratio: r, time_start: ts, time_finish: t });
                }
            }

            const [normal, sipon, prolapse, others, culled] = [
                document.getElementById('mort-normal').value,
                document.getElementById('mort-sipon').value,
                document.getElementById('mort-prolapse').value,
                document.getElementById('mort-others').value,
                document.getElementById('mort-culled').value
            ];

            const payload = {
                building,
                report_date: reportDate,
                mortalities: { normal, sipon, prolapse, others, culled },
                electricity_prev: document.getElementById('prev-electric').value,
                electricity_today: electricToday,
                water_prev: document.getElementById('prev-water').value,
                water_today: waterToday,
                production_prev: document.getElementById('prev-production').value,
                production_today: productionToday,
                feeds_delivered: feeds,
                feed_type: feedsType,
                feed_weight: feedsWeight,
                medications
            };

            try {
                const res = await fetch('/api/layer-buildings-reports', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload)
                });

                if (!res.ok) {
                    const errorData = await res.json().catch(() => ({}));
                    throw new Error(errorData.error || 'Failed to save report');
                }

                alert('Daily Layer Report saved successfully');
                closeLayerModal();
            } catch (err) {
                console.error('Save report error:', err);
                alert(err.message || 'Failed to save report');
            }
        };
        const uploadBldgModal = document.getElementById('upload-bldg-report-modal');
        const closeUploadBldgModal = () => uploadBldgModal.classList.add('hidden');
        document.getElementById('upload-bldg-report-admin-btn').onclick = () => {
            uploadBldgModal.classList.remove('hidden');
        };
        document.getElementById('close-upload-bldg-modal-btn').onclick = closeUploadBldgModal;
        document.getElementById('download-template-btn').onclick = () => {
            try {
                const headers = [
                    'Building',
                    'Date',
                    'Electric (Previous Day)',
                    'Electric (Today)',
                    'Water (Previous Day)',
                    'Water (Today)',
                    'Production (Previous Day)',
                    'Production (Today)',
                    'Mortality Normal',
                    'Mortality Sipon',
                    'Mortality Prolapse',
                    'Mortality Others',
                    'Mortality Culled',
                    'Feeds Delivered',
                    'Feed Type',
                    'Feed Weight',
                    'Medication 1 Type',
                    'Medication 1 Quantity',
                    'Medication 1 Unit',
                    'Medication 1 Water Ratio',
                    'Medication 1 Time Start',
                    'Medication 1 Time Finish',
                    'Medication 2 Type',
                    'Medication 2 Quantity',
                    'Medication 2 Unit',
                    'Medication 2 Water Ratio',
                    'Medication 2 Time Start',
                    'Medication 2 Time Finish',
                    'Medication 3 Type',
                    'Medication 3 Quantity',
                    'Medication 3 Unit',
                    'Medication 3 Water Ratio',
                    'Medication 3 Time Start',
                    'Medication 3 Time Finish'
                ];
                const data = [headers];
                const sampleRow = [
                    '701',
                    'MM/DD/YYYY',
                    920,
                    930,
                    4600,
                    4650,
                    68,
                    69,
                    2,
                    0,
                    0,
                    0,
                    1,
                    'Yes',
                    'Layer Mash',
                    1500,
                    'antibiotics',
                    50,
                    'g',
                    10,
                    '08:00',
                    '10:00',
                    'vitamins',
                    30,
                    'ml',
                    5,
                    '06:00',
                    '07:00',
                    '',
                    '',
                    '',
                    '',
                    '',
                    ''
                ];
                data.push(sampleRow);
                const worksheet = XLSX.utils.aoa_to_sheet(data);
                const workbook = XLSX.utils.book_new();
                XLSX.utils.book_append_sheet(workbook, worksheet, 'Building Reports');
                XLSX.writeFile(workbook, 'building_report_template.xlsx');
            } catch (err) {
                console.error('Failed to download template:', err);
                alert('Failed to download template');
            }
        };

        async function loadBuildingViewTabs() {
            const container = document.getElementById('building-view-tabs');
            if (!container) return;
            try {
                const res = await fetch('/api/layer-buildings-reports/buildings/active');
                if (!res.ok) throw new Error('Failed to fetch buildings');
                const buildings = await res.json();
                if (!buildings.length) {
                    container.innerHTML = '<span style="color: #64748b; font-size: 14px;">No active buildings</span>';
                    return;
                }
                container.innerHTML = buildings.map(b => `
                    <button class="modal-tab ${b === buildings[0] ? 'active' : ''}" data-building="${b.building_id}">${b.building_name}</button>
                `).join('');
                container.querySelectorAll('.modal-tab').forEach(tab => {
                    tab.addEventListener('click', () => {
                        container.querySelectorAll('.modal-tab').forEach(t => t.classList.remove('active'));
                        tab.classList.add('active');
                    });
                });
            } catch (err) {
                console.error('Failed to load building view tabs', err);
                container.innerHTML = '<span style="color: #e74c3c; font-size: 14px;">Failed to load buildings</span>';
            }
        }

        async function loadBuildingsTable() {
            const tbody = document.getElementById('buildings-table-body');
            if (!tbody) return;
            try {
                const res = await fetch('/api/layer-buildings-reports/buildings');
                if (!res.ok) throw new Error('Failed to fetch buildings');
                const buildings = await res.json();
                tbody.innerHTML = buildings.map(b => `
                    <tr>
                        <td>${b.building_id || ''}</td>
                        <td>${b.building_name || ''}</td>
                        <td>${b.status || ''}</td>
                    </tr>
                `).join('');
            } catch (err) {
                console.error('Failed to load buildings', err);
                tbody.innerHTML = '<tr><td colspan="3" style="text-align:center; color: #e74c3c;">Failed to load data</td></tr>';
            }
        }

        loadBuildingsTable();
        loadBuildingViewTabs();
    }

    function initializeModule(contentArea) {
    const currentTab = window.__currentTabId || 'operations';
    const render = ModuleComponents[currentTab] || ModuleComponents['operations'];
    render(contentArea);
}
