if (typeof ModuleComponents === 'undefined') { window.ModuleComponents = {}; }

ModuleComponents['operations-egg-inventory'] = (container) => {
        container.innerHTML = `
            <div class="egg-inventory-layout">
                <div class="header-actions">
                    <h2>Egg Inventory Management</h2>
                </div>
                <div class="action-buttons-row">
                    <button id="open-egg-modal" class="btn-icon-circle">
                        <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                        <span class="btn-label">Add Daily Egg Production</span>
                    </button>
                    <button id="add-egg-products-btn" class="btn-icon-circle">
                        <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                        <span class="btn-label">Add Egg Products</span>
                    </button>
                </div>
                <div class="tracking-cards-row">
                    <div class="card tracking-card">
                        <h3>Egg Availability</h3>
                        <p class="card-sub-label">Total Eggs Available in the Warehouse</p>
                        <div class="card-value-row">
                            <div class="card-value">123,000 pcs</div>
                            <span class="trend-up">▲ 5%</span>
                        </div>
                        <p class="vs-last-month">VS Yesterday</p>
                    </div>
                    <div class="card tracking-card">
                        <h3>Egg Production</h3>
                        <p class="card-sub-label">Daily Average of Egg Production</p>
                        <div class="card-value-row">
                            <div class="card-value">235,000 Pcs</div>
                            <span class="trend-up">▲ 5%</span>
                        </div>
                        <p class="vs-last-month">VS Yesterday</p>
                    </div>
                    <div class="card tracking-card">
                        <h3>Egg Waste</h3>
                        <p class="card-sub-label">Discarded Eggs Daily (Sold as Plastic Eggs)</p>
                        <div class="card-value-row">
                            <div class="card-value">1,500 pcs</div>
                            <span class="trend-down">▼ 1%</span>
                        </div>
                        <p class="vs-last-month">VS Yesterday</p>
                    </div>
                    <div class="card tracking-card">
                        <h3>Good to Broken %</h3>
                        <p class="card-sub-label">Percentage between Good and Waste Eggs</p>
                        <div class="card-value-row">
                            <div class="card-value">98%-2%</div>
                            <span class="trend-down">▼ 1%</span>
                        </div>
                        <p class="vs-last-month">VS Yesterday</p>
                    </div>
                </div>
                <div class="chart-and-sidebar">
                    <div class="card graph-placeholder chart-main">
                        <h3>Egg Type Distribution Chart</h3>
                        <div class="egg-distribution-chart">
                            <div class="egg-chart-bars">
                                <div class="egg-chart-row">
                                    <span class="egg-size-label">NW</span>
                                    <div class="egg-bar-track">
                                        <div class="egg-bar" style="width: 75%;" title="4,500"></div>
                                    </div>
                                </div>
                                <div class="egg-chart-row">
                                    <span class="egg-size-label">PW</span>
                                    <div class="egg-bar-track">
                                        <div class="egg-bar" style="width: 87%;" title="5,200"></div>
                                    </div>
                                </div>
                                <div class="egg-chart-row">
                                    <span class="egg-size-label">XS</span>
                                    <div class="egg-bar-track">
                                        <div class="egg-bar" style="width: 63%;" title="3,800"></div>
                                    </div>
                                </div>
                                <div class="egg-chart-row">
                                    <span class="egg-size-label">S</span>
                                    <div class="egg-bar-track">
                                        <div class="egg-bar" style="width: 97%;" title="5,800"></div>
                                    </div>
                                </div>
                                <div class="egg-chart-row">
                                    <span class="egg-size-label">M</span>
                                    <div class="egg-bar-track">
                                        <div class="egg-bar" style="width: 92%;" title="5,500"></div>
                                    </div>
                                </div>
                                <div class="egg-chart-row">
                                    <span class="egg-size-label">L</span>
                                    <div class="egg-bar-track">
                                        <div class="egg-bar" style="width: 70%;" title="4,200"></div>
                                    </div>
                                </div>
                                <div class="egg-chart-row">
                                    <span class="egg-size-label">XL</span>
                                    <div class="egg-bar-track">
                                        <div class="egg-bar" style="width: 47%;" title="2,800"></div>
                                    </div>
                                </div>
                                <div class="egg-chart-row">
                                    <span class="egg-size-label">J</span>
                                    <div class="egg-bar-track">
                                        <div class="egg-bar" style="width: 25%;" title="1,500"></div>
                                    </div>
                                </div>
                                <div class="egg-chart-row">
                                    <span class="egg-size-label">Broken</span>
                                    <div class="egg-bar-track">
                                        <div class="egg-bar" style="width: 13%;" title="800"></div>
                                    </div>
                                </div>
                            </div>
                            <div class="egg-x-axis">
                                <span>1k</span>
                                <span>2k</span>
                                <span>3k</span>
                                <span>4k</span>
                                <span>5k</span>
                                <span>6k</span>
                            </div>
                        </div>
                    </div>
                    <div class="card graph-placeholder efficiency-card">
                        <h3>Machine Efficiency</h3>
                        <p class="card-sub-label">The machine time and Quantity of eggs ratio</p>
                        <div class="table-wrap">
                            <table class="data-table efficiency-table">
                                <thead>
                                    <tr>
                                        <th>Date</th>
                                        <th>Machine Time</th>
                                        <th>Egg Quantity</th>
                                        <th>Efficiency</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr><td>July 1</td><td>5:30</td><td>100,000</td><td>97%</td></tr>
                                    <tr><td>July 2</td><td>5:45</td><td>102,500</td><td>96%</td></tr>
                                    <tr><td>July 3</td><td>5:15</td><td>98,000</td><td>98%</td></tr>
                                    <tr><td>July 4</td><td>6:00</td><td>105,000</td><td>95%</td></tr>
                                    <tr><td>July 5</td><td>5:30</td><td>100,000</td><td>97%</td></tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <div class="bottom-cards-row">
                    <div class="card graph-placeholder product-list-card">
                        <h3>Product List</h3>
                        <div class="table-wrap">
                            <table class="data-table product-table">
                                <thead>
                                    <tr>
                                        <th>Product ID</th>
                                        <th>Product</th>
                                        <th>Remarks</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr><td>EP#001</td><td>NW</td><td>35g and Below</td></tr>
                                    <tr><td>EP#002</td><td>PW</td><td>36g to 40g</td></tr>
                                    <tr><td>EP#003</td><td>XS</td><td>41g to 45g</td></tr>
                                    <tr><td>EP#004</td><td>S</td><td>46g to 50g</td></tr>
                                    <tr><td>EP#005</td><td>M</td><td>51g to 55g</td></tr>
                                    <tr><td>EP#006</td><td>L</td><td>56g to 60g</td></tr>
                                    <tr><td>EP#007</td><td>XL</td><td>61g to 65g</td></tr>
                                    <tr><td>EP#008</td><td>J</td><td>66g to 70g</td></tr>
                                    <tr><td>EP#009</td><td>Broken</td><td>Cracked / Damaged</td></tr>
                                    <tr><td>EP#010</td><td>Reject</td><td>Oversize / Undersize</td></tr>
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
                    <div class="card graph-placeholder daily-egg-card">
                        <h3>Daily Egg Transaction</h3>
                        <div class="table-wrap">
                            <table class="data-table product-table">
                                <thead>
                                    <tr>
                                        <th>Date</th>
                                        <th>Starting Inventory</th>
                                        <th>Eggs Sold</th>
                                        <th>Egg Waste</th>
                                        <th>Graded</th>
                                        <th>Ungraded</th>
                                        <th>Ending Inventory</th>
                                        <th>Total</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr><td>2026-07-01</td><td>50,000</td><td>12,000</td><td>500</td><td>11,800</td><td>200</td><td>37,500</td><td>48,300</td></tr>
                                    <tr><td>2026-07-02</td><td>52,000</td><td>13,500</td><td>600</td><td>13,200</td><td>300</td><td>38,000</td><td>50,400</td></tr>
                                    <tr><td>2026-07-03</td><td>48,000</td><td>11,800</td><td>400</td><td>11,600</td><td>200</td><td>35,800</td><td>47,000</td></tr>
                                    <tr><td>2026-07-04</td><td>51,000</td><td>14,200</td><td>700</td><td>13,900</td><td>300</td><td>36,100</td><td>49,700</td></tr>
                                    <tr><td>2026-07-05</td><td>49,500</td><td>12,600</td><td>550</td><td>12,350</td><td>250</td><td>36,350</td><td>48,450</td></tr>
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
                <div id="egg-modal" class="modal hidden">
                    <div class="modal-content daily-egg-modal">
                        <div class="modal-header-row">
                            <h3>Add Daily Egg Production</h3>
                            <button id="close-egg-modal-btn" class="modal-close-btn" title="Close">&times;</button>
                        </div>
                        <div class="egg-modal-body">
                            <div class="modal-field">
                                <label>Beginning Inventory</label>
                                <input type="text" id="beginning-inventory" class="readonly-field" value="50,000" readonly />
                            </div>
                            <div class="modal-field">
                                <label>Total Eggs Sold today</label>
                                <input type="text" id="egg-count-input" class="readonly-field" value="48,300" readonly />
                            </div>
                            <div class="weighed-layout">
                                <div class="weighed-left">
                                    <div class="modal-section">
                                        <span class="sheet-group-label">Weighed</span>
                                        <h4>Cases Ready for Dispatch</h4>
                                        <div class="egg-sheet-wrap">
                                            <table class="egg-sheet" id="dispatch-sheet">
                                                <thead>
                                                    <tr>
                                                        <th></th>
                                                        <th>NW</th><th>PW</th><th>XS</th><th>S</th><th>M</th><th>L</th><th>XL</th><th>J</th><th>Others</th><th>No. of Eggs</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr><th>Lot 1</th><td><input type="text" class="dispatch-qty"></td><td><input type="text" class="dispatch-qty"></td><td><input type="text" class="dispatch-qty"></td><td><input type="text" class="dispatch-qty"></td><td><input type="text" class="dispatch-qty"></td><td><input type="text" class="dispatch-qty"></td><td><input type="text" class="dispatch-qty"></td><td><input type="text" class="dispatch-qty"></td><td><input type="text" class="dispatch-qty"></td><td><input type="text" class="dispatch-total" id="dispatch-total-1" readonly></td></tr>
                                                    <tr><th>Lot 2</th><td><input type="text" class="dispatch-qty"></td><td><input type="text" class="dispatch-qty"></td><td><input type="text" class="dispatch-qty"></td><td><input type="text" class="dispatch-qty"></td><td><input type="text" class="dispatch-qty"></td><td><input type="text" class="dispatch-qty"></td><td><input type="text" class="dispatch-qty"></td><td><input type="text" class="dispatch-qty"></td><td><input type="text" class="dispatch-qty"></td><td><input type="text" class="dispatch-total" id="dispatch-total-2" readonly></td></tr>
                                                    <tr><th>Lot 3</th><td><input type="text" class="dispatch-qty"></td><td><input type="text" class="dispatch-qty"></td><td><input type="text" class="dispatch-qty"></td><td><input type="text" class="dispatch-qty"></td><td><input type="text" class="dispatch-qty"></td><td><input type="text" class="dispatch-qty"></td><td><input type="text" class="dispatch-qty"></td><td><input type="text" class="dispatch-qty"></td><td><input type="text" class="dispatch-qty"></td><td><input type="text" class="dispatch-total" id="dispatch-total-3" readonly></td></tr>
                                                </tbody>
                                            </table>
                                        </div>
                                        <h4>Moba Assembly line</h4>
                                        <div class="egg-sheet-wrap">
                                            <table class="egg-sheet" id="moba-sheet">
                                                <thead>
                                                    <tr>
                                                        <th></th>
                                                        <th>NW</th><th>PW</th><th>XS</th><th>S</th><th>M</th><th>L</th><th>XL</th><th>J</th><th>Others</th><th>No. of Eggs</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr><th>Case</th><td><input type="text" class="moba-qty"></td><td><input type="text" class="moba-qty"></td><td><input type="text" class="moba-qty"></td><td><input type="text" class="moba-qty"></td><td><input type="text" class="moba-qty"></td><td><input type="text" class="moba-qty"></td><td><input type="text" class="moba-qty"></td><td><input type="text" class="moba-qty"></td><td><input type="text" class="moba-qty"></td><td><input type="text" class="moba-total" id="moba-total-1" readonly></td></tr>
                                                    <tr><th>Tray</th><td><input type="text" class="moba-qty"></td><td><input type="text" class="moba-qty"></td><td><input type="text" class="moba-qty"></td><td><input type="text" class="moba-qty"></td><td><input type="text" class="moba-qty"></td><td><input type="text" class="moba-qty"></td><td><input type="text" class="moba-qty"></td><td><input type="text" class="moba-qty"></td><td><input type="text" class="moba-qty"></td><td><input type="text" class="moba-total" id="moba-total-2" readonly></td></tr>
                                                    <tr><th>Piece</th><td><input type="text" class="moba-qty"></td><td><input type="text" class="moba-qty"></td><td><input type="text" class="moba-qty"></td><td><input type="text" class="moba-qty"></td><td><input type="text" class="moba-qty"></td><td><input type="text" class="moba-qty"></td><td><input type="text" class="moba-qty"></td><td><input type="text" class="moba-qty"></td><td><input type="text" class="moba-qty"></td><td><input type="text" class="moba-total" id="moba-total-3" readonly></td></tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                                <div class="weighed-right">
                                    <div class="modal-field weighed-total-field">
                                        <label>Total Weighed</label>
                                        <input type="text" id="total-weighed" class="readonly-field" readonly value="0" />
                                    </div>
                                </div>
                            </div>
                            <div class="weighed-layout">
                                <div class="weighed-left">
                                    <div class="modal-section">
                                        <h4>Unweighed</h4>
                                        <div class="egg-sheet-wrap">
                                            <table class="egg-sheet" id="unweighed-sheet">
                                                <thead>
                                                    <tr>
                                                        <th></th>
                                                        <th>Dirty unweighed</th><th>unweighed</th><th>Basag na ibebenta</th><th>No. of Eggs</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr><th>Case</th><td><input type="text" class="unweighed-qty"></td><td><input type="text" class="unweighed-qty"></td><td><input type="text" class="unweighed-qty"></td><td><input type="text" class="unweighed-total" id="unweighed-total-1" readonly></td></tr>
                                                    <tr><th>tray</th><td><input type="text" class="unweighed-qty"></td><td><input type="text" class="unweighed-qty"></td><td><input type="text" class="unweighed-qty"></td><td><input type="text" class="unweighed-total" id="unweighed-total-2" readonly></td></tr>
                                                    <tr><th>piece</th><td><input type="text" class="unweighed-qty"></td><td><input type="text" class="unweighed-qty"></td><td><input type="text" class="unweighed-qty"></td><td><input type="text" class="unweighed-total" id="unweighed-total-3" readonly></td></tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                                <div class="weighed-right">
                                    <div class="modal-field weighed-total-field">
                                        <label>Total Unweighed</label>
                                        <input type="text" id="total-unweighed" class="readonly-field" readonly value="0" />
                                    </div>
                                </div>
                            </div>
                            <div class="modal-section">
                                <h4>Broken</h4>
                                <div class="broken-fields">
                                    <div class="modal-field">
                                        <label>Tray</label>
                                        <input type="text" id="broken-tray" class="broken-qty" />
                                    </div>
                                    <div class="modal-field">
                                        <label>Piece</label>
                                        <input type="text" id="broken-piece" class="broken-qty" />
                                    </div>
                                    <div class="modal-field weighed-total-field broken-total-field">
                                        <label>Total Broken Eggs (Sold as Juice)</label>
                                        <input type="text" id="total-broken" class="readonly-field" readonly value="0" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="modal-tab-actions">
                            <button id="save-egg-btn" class="btn-primary">Save</button>
                        </div>
                    </div>
                    <div class="modal-content egg-summary-modal">
                        <div class="modal-header-row">
                            <h3>Egg Computation</h3>
                        </div>
                        <div class="summary-rows">
                            <div class="summary-row"><span>Beginning inventory</span><span id="sum-beginning">50,000</span></div>
                            <div class="summary-row"><span>Total Eggs Sold</span><span id="sum-sold">48,300</span></div>
                            <div class="summary-row"><span>Weighed Eggs</span><span id="sum-weighed">10,000</span></div>
                            <div class="summary-row"><span>Unweighed Eggs</span><span id="sum-unweighed">4,000</span></div>
                            <div class="summary-row"><span>Broken Eggs</span><span id="sum-broken">500</span></div>
                            <div class="summary-divider"></div>
                            <div class="summary-row summary-total"><span>Total Eggs Today</span><span id="sum-total">12,800</span></div>
                        </div>
                    </div>
                </div>
                <div id="egg-products-modal" class="modal hidden">
                    <div class="modal-content egg-products-modal">
                        <div class="modal-header-row">
                            <h3>Egg Products</h3>
                            <button id="close-egg-products-btn" class="modal-close-btn" title="Close">&times;</button>
                        </div>
                        <div class="modal-tabs">
                            <button class="modal-tab active" data-tab="add">Add New Products</button>
                            <button class="modal-tab" data-tab="change">Change or Remove Products</button>
                        </div>
                        <div class="modal-tab-panel" id="tab-add">
                            <label>Product</label>
                            <input type="text" id="new-product-name" placeholder="Product name" />
                            <label>Product ID</label>
                            <input type="text" id="new-product-id" readonly placeholder="Auto-generated" />
                            <label>Remarks</label>
                            <textarea rows="3" placeholder="Remarks"></textarea>
                            <div class="modal-tab-actions">
                                <button class="btn-primary">Save</button>
                            </div>
                        </div>
                        <div class="modal-tab-panel hidden" id="tab-change">
                            <label>Product</label>
                            <select class="modal-select" id="change-product">
                                <option value="">Search available products...</option>
                                <option value="EP#001">NW</option>
                                <option value="EP#002">PW</option>
                                <option value="EP#003">XS</option>
                                <option value="EP#004">S</option>
                                <option value="EP#005">M</option>
                                <option value="EP#006">L</option>
                                <option value="EP#007">XL</option>
                                <option value="EP#008">J</option>
                                <option value="EP#009">Broken</option>
                                <option value="EP#010">Reject</option>
                            </select>
                            <label>Product ID</label>
                            <input type="text" id="change-product-id" readonly placeholder="Product ID" />
                            <label>Remarks</label>
                            <textarea id="change-remarks" rows="3" readonly placeholder="Remarks"></textarea>
                            <div class="modal-tab-actions">
                                <button class="btn-primary">Save</button>
                                <button class="btn-danger">Delete</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;

        document.getElementById('open-egg-modal').onclick = () => {
            document.getElementById('egg-modal').classList.remove('hidden');
        };
        document.getElementById('close-egg-modal-btn').onclick = () => {
            document.getElementById('egg-modal').classList.add('hidden');
        };

        function parseNum(v) {
            return parseFloat(String(v).replace(/,/g, '')) || 0;
        }
        function recalcSummary() {
            const beginning = parseNum(document.getElementById('beginning-inventory').value);
            const sold = parseNum(document.getElementById('egg-count-input').value);
            const weighed = parseNum(document.getElementById('total-weighed').value);
            const unweighed = parseNum(document.getElementById('total-unweighed').value);
            const broken = parseNum(document.getElementById('total-broken').value);
            document.getElementById('sum-beginning').textContent = beginning.toLocaleString();
            document.getElementById('sum-sold').textContent = sold.toLocaleString();
            document.getElementById('sum-weighed').textContent = weighed.toLocaleString();
            document.getElementById('sum-unweighed').textContent = unweighed.toLocaleString();
            document.getElementById('sum-broken').textContent = broken.toLocaleString();
            document.getElementById('sum-total').textContent = ((broken + unweighed + weighed + sold) - beginning).toLocaleString();
        }
        function recalcTotalWeighed() {
            let total = 0;
            ['dispatch-total-1', 'dispatch-total-2', 'dispatch-total-3', 'moba-total-1', 'moba-total-2', 'moba-total-3'].forEach(id => {
                total += parseNum(document.getElementById(id).value);
            });
            document.getElementById('total-weighed').value = total.toLocaleString();
            recalcSummary();
        }

        function recalcDispatch() {
            document.querySelectorAll('#dispatch-sheet tbody tr').forEach((row, i) => {
                let sum = 0;
                row.querySelectorAll('.dispatch-qty').forEach(inp => {
                    sum += parseFloat(inp.value) || 0;
                });
                document.getElementById('dispatch-total-' + (i + 1)).value = (sum * 360).toLocaleString();
            });
            recalcTotalWeighed();
        }
        document.querySelectorAll('#dispatch-sheet .dispatch-qty').forEach(inp => {
            inp.addEventListener('input', recalcDispatch);
        });
        recalcDispatch();

        const mobaMultipliers = [360, 30, 1];
        function recalcMoba() {
            document.querySelectorAll('#moba-sheet tbody tr').forEach((row, i) => {
                let sum = 0;
                row.querySelectorAll('.moba-qty').forEach(inp => {
                    sum += parseFloat(inp.value) || 0;
                });
                document.getElementById('moba-total-' + (i + 1)).value = (sum * mobaMultipliers[i]).toLocaleString();
            });
            recalcTotalWeighed();
        }
        document.querySelectorAll('#moba-sheet .moba-qty').forEach(inp => {
            inp.addEventListener('input', recalcMoba);
        });
        recalcMoba();

        const unweighedMultipliers = [360, 30, 1];
        function recalcUnweighed() {
            document.querySelectorAll('#unweighed-sheet tbody tr').forEach((row, i) => {
                let sum = 0;
                row.querySelectorAll('.unweighed-qty').forEach(inp => {
                    sum += parseFloat(inp.value) || 0;
                });
                document.getElementById('unweighed-total-' + (i + 1)).value = (sum * unweighedMultipliers[i]).toLocaleString();
            });
            recalcTotalUnweighed();
        }
        function recalcTotalUnweighed() {
            let total = 0;
            ['unweighed-total-1', 'unweighed-total-2', 'unweighed-total-3'].forEach(id => {
                total += parseNum(document.getElementById(id).value);
            });
            document.getElementById('total-unweighed').value = total.toLocaleString();
            recalcSummary();
        }
        document.querySelectorAll('#unweighed-sheet .unweighed-qty').forEach(inp => {
            inp.addEventListener('input', recalcUnweighed);
        });
        recalcUnweighed();

        function recalcBroken() {
            const tray = parseNum(document.getElementById('broken-tray').value);
            const piece = parseNum(document.getElementById('broken-piece').value);
            document.getElementById('total-broken').value = (tray * 30 + piece).toLocaleString();
            recalcSummary();
        }
        document.querySelectorAll('.broken-qty').forEach(inp => {
            inp.addEventListener('input', recalcBroken);
        });
        recalcBroken();
        recalcSummary();
        document.getElementById('save-egg-btn').onclick = () => {
            const count = document.getElementById('egg-count-input').value;
            alert(`Saving ${count} eggs to database...`);
            document.getElementById('egg-modal').classList.add('hidden');
        };

        const productsModal = document.getElementById('egg-products-modal');
        const getNextProductId = () => {
            const max = Object.keys(productData).reduce((m, k) => Math.max(m, parseInt(k.replace('EP#', ''), 10) || 0), 0);
            return 'EP#' + String(max + 1).padStart(3, '0');
        };
        document.getElementById('add-egg-products-btn').onclick = () => {
            document.getElementById('new-product-id').value = getNextProductId();
            productsModal.classList.remove('hidden');
        };
        document.getElementById('close-egg-products-btn').onclick = () => {
            productsModal.classList.add('hidden');
        };

        const productData = {
            'EP#001': { name: 'NW', remarks: '35g and Below' },
            'EP#002': { name: 'PW', remarks: '36g to 40g' },
            'EP#003': { name: 'XS', remarks: '41g to 45g' },
            'EP#004': { name: 'S', remarks: '46g to 50g' },
            'EP#005': { name: 'M', remarks: '51g to 55g' },
            'EP#006': { name: 'L', remarks: '56g to 60g' },
            'EP#007': { name: 'XL', remarks: '61g to 65g' },
            'EP#008': { name: 'J', remarks: '66g to 70g' },
            'EP#009': { name: 'Broken', remarks: 'Cracked / Damaged' },
            'EP#010': { name: 'Reject', remarks: 'Oversize / Undersize' }
        };
        document.getElementById('change-product').onchange = (e) => {
            const data = productData[e.target.value];
            document.getElementById('change-product-id').value = data ? e.target.value : '';
            document.getElementById('change-remarks').value = data ? data.remarks : '';
        };

        productsModal.querySelectorAll('.modal-tab').forEach(tab => {
            tab.onclick = () => {
                productsModal.querySelectorAll('.modal-tab').forEach(t => t.classList.remove('active'));
                productsModal.querySelectorAll('.modal-tab-panel').forEach(p => p.classList.add('hidden'));
                tab.classList.add('active');
                document.getElementById('tab-' + tab.dataset.tab).classList.remove('hidden');
            };
        });
    };

function initializeModule(contentArea) {
    const currentTab = window.__currentTabId || 'operations';
    const render = ModuleComponents[currentTab] || ModuleComponents['operations'];
    render(contentArea);
}
