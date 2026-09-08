if (typeof ModuleComponents === 'undefined') { 
    window.ModuleComponents = {}; 
}

function getAuthHeaders() {
    const token = localStorage.getItem('goldenfield_auth_token');
    return token ? { 'Authorization': `Bearer ${token}` } : {};
}

var API_BASE_EGG_PRODUCTS = '/api/egg-products';
var API_BASE_RECEIPT_ISSUES = '/api/receipt-issues';
var API_BASE_DAILY_EGG_PRODUCTION = '/api/daily-egg-production';

ModuleComponents['operations-egg-inventory'] = (container) => {
    container.innerHTML = `
        <div class="egg-inventory-layout">
            <div class="header-actions">
                <h2>Egg Inventory Management</h2>
            </div>
            <div class="action-buttons-row">
                <button id="open-egg-modal" class="btn-icon-circle" style="background-color: #F7F18B; color: #1a1f2e;">
                    <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                    <span class="btn-label">Add Daily Egg Production</span>
                </button>
                <button id="add-egg-products-btn" class="btn-icon-circle" style="background-color: #EAD355; color: #1a1f2e;">
                    <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                    <span class="btn-label">Add Egg Products</span>
                </button>
            </div>
            <div class="tracking-cards-row">
                <div class="card tracking-card">
                    <h3>Egg Availability</h3>
                    <p class="card-sub-label">Total Eggs Available in the Warehouse</p>
                    <div class="card-value-row">
                        <div class="card-value" id="egg-availability-value">-- pcs</div>
                        <span class="trend-up" id="egg-availability-trend"></span>
                    </div>
                    <p class="vs-last-month">VS Yesterday</p>
                </div>
                <div class="card tracking-card">
                    <h3>Egg Production</h3>
                    <p class="card-sub-label">Daily Average of Egg Production</p>
                    <div class="card-value-row">
                        <div class="card-value" id="egg-production-value">-- pcs</div>
                        <span class="trend-up" id="egg-production-trend"></span>
                    </div>
                    <p class="vs-last-month">VS Yesterday</p>
                </div>
                <div class="card tracking-card">
                    <h3>Egg Waste</h3>
                    <p class="card-sub-label">Discarded Eggs Daily (Sold as Plastic Eggs)</p>
                    <div class="card-value-row">
                        <div class="card-value" id="egg-waste-value">-- pcs</div>
                        <span id="egg-waste-trend"></span>
                    </div>
                    <p class="vs-last-month">VS Yesterday</p>
                </div>
                <div class="card tracking-card">
                    <h3>Good to Broken %</h3>
                    <p class="card-sub-label">Percentage between Good and Waste Eggs</p>
                    <div class="card-value-row">
                        <div class="card-value" id="good-broken-value">--%-%</div>
                    </div>
                </div>
            </div>
            <div class="chart-and-sidebar">
                <div class="card graph-placeholder chart-main">
                    <h3>Egg Type Distribution Chart</h3>
                    <div class="egg-distribution-chart">
                        <div class="egg-chart-bars" id="egg-chart-rows">
                            <div class="egg-chart-row">
                                <span class="egg-size-label">NW</span>
                                <div class="egg-bar-track">
                                    <div class="egg-bar" id="egg-bar-nw" style="width: 75%;" title="4,500"></div>
                                </div>
                            </div>
                            <div class="egg-chart-row">
                                <span class="egg-size-label">PW</span>
                                <div class="egg-bar-track">
                                    <div class="egg-bar" id="egg-bar-pw" style="width: 87%;" title="5,200"></div>
                                </div>
                            </div>
                            <div class="egg-chart-row">
                                <span class="egg-size-label">XS</span>
                                <div class="egg-bar-track">
                                    <div class="egg-bar" id="egg-bar-xs" style="width: 63%;" title="3,800"></div>
                                </div>
                            </div>
                            <div class="egg-chart-row">
                                <span class="egg-size-label">S</span>
                                <div class="egg-bar-track">
                                    <div class="egg-bar" id="egg-bar-s" style="width: 97%;" title="5,800"></div>
                                </div>
                            </div>
                            <div class="egg-chart-row">
                                <span class="egg-size-label">M</span>
                                <div class="egg-bar-track">
                                    <div class="egg-bar" id="egg-bar-m" style="width: 92%;" title="5,500"></div>
                                </div>
                            </div>
                            <div class="egg-chart-row">
                                <span class="egg-size-label">L</span>
                                <div class="egg-bar-track">
                                    <div class="egg-bar" id="egg-bar-l" style="width: 70%;" title="4,200"></div>
                                </div>
                            </div>
                            <div class="egg-chart-row">
                                <span class="egg-size-label">XL</span>
                                <div class="egg-bar-track">
                                    <div class="egg-bar" id="egg-bar-xl" style="width: 47%;" title="2,800"></div>
                                </div>
                            </div>
                            <div class="egg-chart-row">
                                <span class="egg-size-label">J</span>
                                <div class="egg-bar-track">
                                    <div class="egg-bar" id="egg-bar-j" style="width: 25%;" title="1,500"></div>
                                </div>
                            </div>
                            <div class="egg-chart-row">
                                <span class="egg-size-label">Broken</span>
                                <div class="egg-bar-track">
                                    <div class="egg-bar" id="egg-bar-broken" style="width: 13%;" title="800"></div>
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
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody id="egg-product-list-body">
                            </tbody>
                        </table>
                    </div>
                    <div class="pagination" id="egg-product-pagination">
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
                                    <th>Beginning Inventory</th>
                                    <th>Egg Sold</th>
                                    <th>Egg Waste</th>
                                    <th>Ending Inventory</th>
                                    <th>Egg Production</th>
                                    <th>Created by</th>
                                </tr>
                            </thead>
                            <tbody id="egg-transactions-body">
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            
            <div id="egg-modal" class="modal hidden">
                <div class="modal-content daily-egg-modal">
                    <div class="modal-header-row">
                        <h3>Add Daily Egg Production</h3>
                        <div class="egg-header-right">
                            <label>Prod ID</label>
                            <input type="text" id="egg-production-id" readonly />
                            <label>Date</label>
                            <input type="text" id="egg-production-date" readonly />
                        </div>
                        <button id="close-egg-modal-btn" class="modal-close-btn" title="Close">&times;</button>
                    </div>
                    <div class="egg-modal-body">
                        <div class="egg-production-form">
                            <div class="egg-form-row">
                                <div class="egg-form-field">
                                    <label>Beginning Inventory</label>
                                    <input type="text" id="egg-beginning-inventory" readonly />
                                    <span class="egg-unit">Pieces</span>
                                </div>
                            </div>
                            <div class="table-wrap">
                                <table class="data-table egg-types-table">
                                    <thead>
                                        <tr>
                                            <th>B-NW</th>
                                            <th>B-PW</th>
                                            <th>B-XS</th>
                                            <th>B-S</th>
                                            <th>B-M</th>
                                            <th>B-L</th>
                                            <th>B-XL</th>
                                            <th>B-J</th>
                                            <th>B-Broken</th>
                                            <th>B-Dirty</th>
                                            <th>B-Unweighed</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td><input type="text" class="egg-type-input" data-type="B-NW" readonly /></td>
                                            <td><input type="text" class="egg-type-input" data-type="B-PW" readonly /></td>
                                            <td><input type="text" class="egg-type-input" data-type="B-XS" readonly /></td>
                                            <td><input type="text" class="egg-type-input" data-type="B-S" readonly /></td>
                                            <td><input type="text" class="egg-type-input" data-type="B-M" readonly /></td>
                                            <td><input type="text" class="egg-type-input" data-type="B-L" readonly /></td>
                                            <td><input type="text" class="egg-type-input" data-type="B-XL" readonly /></td>
                                            <td><input type="text" class="egg-type-input" data-type="B-J" readonly /></td>
                                            <td><input type="text" class="egg-type-input" data-type="B-Broken" readonly /></td>
                                            <td><input type="text" class="egg-type-input" data-type="B-Dirty" readonly /></td>
                                            <td><input type="text" class="egg-type-input" data-type="B-Unweighed" readonly /></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <hr class="egg-section-divider" />
                            <div class="egg-form-row">
                                <div class="egg-form-field">
                                    <label>Ending Inventory</label>
                                    <input type="text" id="egg-ending-inventory" readonly />
                                    <span class="egg-unit">Pieces</span>
                                </div>
                            </div>
                            <div class="table-wrap">
                                <table class="data-table egg-types-table">
                                    <thead>
                                        <tr>
                                            <th>E-NW</th>
                                            <th>E-PW</th>
                                            <th>E-XS</th>
                                            <th>E-S</th>
                                            <th>E-M</th>
                                            <th>E-L</th>
                                            <th>E-XL</th>
                                            <th>E-J</th>
                                            <th>E-Broken</th>
                                            <th>E-Dirty</th>
                                            <th>E-Unweighed</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td><input type="text" class="egg-type-input" data-type="E-NW" readonly /></td>
                                            <td><input type="text" class="egg-type-input" data-type="E-PW" readonly /></td>
                                            <td><input type="text" class="egg-type-input" data-type="E-XS" readonly /></td>
                                            <td><input type="text" class="egg-type-input" data-type="E-S" readonly /></td>
                                            <td><input type="text" class="egg-type-input" data-type="E-M" readonly /></td>
                                            <td><input type="text" class="egg-type-input" data-type="E-L" readonly /></td>
                                            <td><input type="text" class="egg-type-input" data-type="E-XL" readonly /></td>
                                            <td><input type="text" class="egg-type-input" data-type="E-J" readonly /></td>
                                            <td><input type="text" class="egg-type-input" data-type="E-Broken" readonly /></td>
                                            <td><input type="text" class="egg-type-input" data-type="E-Dirty" readonly /></td>
                                            <td><input type="text" class="egg-type-input" data-type="E-Unweighed" readonly /></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div class="egg-gap"></div>
                            <h4 class="egg-sub-title">Cases Ready for Dispatch</h4>
                            <div class="table-wrap">
                                <table class="data-table egg-cases-table">
                                    <thead>
                                        <tr>
                                            <th></th>
                                            <th>NW</th>
                                            <th>PW</th>
                                            <th>XS</th>
                                            <th>S</th>
                                            <th>M</th>
                                            <th>L</th>
                                            <th>XL</th>
                                            <th>J</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td class="egg-case-label">Lot 1</td>
                                            <td><input type="text" class="egg-case-input" /></td>
                                            <td><input type="text" class="egg-case-input" /></td>
                                            <td><input type="text" class="egg-case-input" /></td>
                                            <td><input type="text" class="egg-case-input" /></td>
                                            <td><input type="text" class="egg-case-input" /></td>
                                            <td><input type="text" class="egg-case-input" /></td>
                                            <td><input type="text" class="egg-case-input" /></td>
                                            <td><input type="text" class="egg-case-input" /></td>
                                        </tr>
                                        <tr>
                                            <td class="egg-case-label">Lot 2</td>
                                            <td><input type="text" class="egg-case-input" /></td>
                                            <td><input type="text" class="egg-case-input" /></td>
                                            <td><input type="text" class="egg-case-input" /></td>
                                            <td><input type="text" class="egg-case-input" /></td>
                                            <td><input type="text" class="egg-case-input" /></td>
                                            <td><input type="text" class="egg-case-input" /></td>
                                            <td><input type="text" class="egg-case-input" /></td>
                                            <td><input type="text" class="egg-case-input" /></td>
                                        </tr>
                                        <tr>
                                            <td class="egg-case-label">Lot 3</td>
                                            <td><input type="text" class="egg-case-input" /></td>
                                            <td><input type="text" class="egg-case-input" /></td>
                                            <td><input type="text" class="egg-case-input" /></td>
                                            <td><input type="text" class="egg-case-input" /></td>
                                            <td><input type="text" class="egg-case-input" /></td>
                                            <td><input type="text" class="egg-case-input" /></td>
                                            <td><input type="text" class="egg-case-input" /></td>
                                            <td><input type="text" class="egg-case-input" /></td>
                                        </tr>
                                    </tbody>
                                </table>
                            <div class="egg-gap"></div>
                            <h4 class="egg-sub-title">Moba Assembly Line</h4>
                            <div class="table-wrap">
                                <table class="data-table egg-moba-table">
                                    <thead>
                                        <tr>
                                            <th></th>
                                            <th>NW</th>
                                            <th>PW</th>
                                            <th>XS</th>
                                            <th>S</th>
                                            <th>M</th>
                                            <th>L</th>
                                            <th>XL</th>
                                            <th>J</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td class="egg-case-label">Cases</td>
                                            <td><input type="text" class="egg-moba-input" data-row="cases" /></td>
                                            <td><input type="text" class="egg-moba-input" data-row="cases" /></td>
                                            <td><input type="text" class="egg-moba-input" data-row="cases" /></td>
                                            <td><input type="text" class="egg-moba-input" data-row="cases" /></td>
                                            <td><input type="text" class="egg-moba-input" data-row="cases" /></td>
                                            <td><input type="text" class="egg-moba-input" data-row="cases" /></td>
                                            <td><input type="text" class="egg-moba-input" data-row="cases" /></td>
                                            <td><input type="text" class="egg-moba-input" data-row="cases" /></td>
                                        </tr>
                                        <tr>
                                            <td class="egg-case-label">Tray</td>
                                            <td><input type="text" class="egg-moba-input" data-row="tray" /></td>
                                            <td><input type="text" class="egg-moba-input" data-row="tray" /></td>
                                            <td><input type="text" class="egg-moba-input" data-row="tray" /></td>
                                            <td><input type="text" class="egg-moba-input" data-row="tray" /></td>
                                            <td><input type="text" class="egg-moba-input" data-row="tray" /></td>
                                            <td><input type="text" class="egg-moba-input" data-row="tray" /></td>
                                            <td><input type="text" class="egg-moba-input" data-row="tray" /></td>
                                            <td><input type="text" class="egg-moba-input" data-row="tray" /></td>
                                        </tr>
                                        <tr>
                                            <td class="egg-case-label">Pieces</td>
                                            <td><input type="text" class="egg-moba-input" data-row="pieces" /></td>
                                            <td><input type="text" class="egg-moba-input" data-row="pieces" /></td>
                                            <td><input type="text" class="egg-moba-input" data-row="pieces" /></td>
                                            <td><input type="text" class="egg-moba-input" data-row="pieces" /></td>
                                            <td><input type="text" class="egg-moba-input" data-row="pieces" /></td>
                                            <td><input type="text" class="egg-moba-input" data-row="pieces" /></td>
                                            <td><input type="text" class="egg-moba-input" data-row="pieces" /></td>
                                            <td><input type="text" class="egg-moba-input" data-row="pieces" /></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div class="egg-gap"></div>
                            <h4 class="egg-sub-title">Unweighed</h4>
                            <div class="egg-form-row">
                                <div class="egg-form-field">
                                    <label>Cases</label>
                                    <input type="text" id="unweighed-cases" class="egg-unweighed-input" data-row="cases" />
                                </div>
                                <div class="egg-form-field">
                                    <label>Tray</label>
                                    <input type="text" id="unweighed-tray" class="egg-unweighed-input" data-row="tray" />
                                </div>
                                <div class="egg-form-field">
                                    <label>Pieces</label>
                                    <input type="text" id="unweighed-pieces" class="egg-unweighed-input" data-row="pieces" />
                                </div>
                            </div>
                            <hr class="egg-section-divider" />
                            <div class="egg-gap"></div>
                            <div class="egg-form-row">
                                <div class="egg-form-field">
                                    <label>Egg Waste</label>
                                    <input type="text" id="egg-waste-total" readonly />
                                    <span class="egg-unit">Pieces</span>
                                </div>
                            </div>
                            <div class="egg-gap"></div>
                            <div class="egg-form-row">
                                <div class="egg-form-field">
                                    <label>Cases</label>
                                    <input type="text" class="egg-waste-input" data-row="cases" />
                                </div>
                                <div class="egg-form-field">
                                    <label>Tray</label>
                                    <input type="text" class="egg-waste-input" data-row="tray" />
                                </div>
                                <div class="egg-form-field">
                                    <label>Pieces</label>
                                    <input type="text" class="egg-waste-input" data-row="pieces" />
                                </div>
                            </div>
                            <div class="egg-gap"></div>
                            <hr class="egg-section-divider" />
                            <div class="egg-gap"></div>
                            <div class="egg-form-row egg-total-row">
                                <div class="egg-form-field">
                                    <label>Total Eggs Sold</label>
                                    <input type="text" id="egg-total-sold" readonly />
                                    <span class="egg-unit">Pieces</span>
                                </div>
                            </div>
                            <div class="table-wrap">
                                <table class="data-table egg-types-table">
                                    <thead>
                                        <tr>
                                            <th>S-NW</th>
                                            <th>S-PW</th>
                                            <th>S-XS</th>
                                            <th>S-S</th>
                                            <th>S-M</th>
                                            <th>S-L</th>
                                            <th>S-XL</th>
                                            <th>S-J</th>
                                            <th>S-Broken</th>
                                            <th>S-Dirty</th>
                                            <th>S-Unweighed</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td><input type="text" class="egg-type-input" data-type="S-NW" readonly /></td>
                                            <td><input type="text" class="egg-type-input" data-type="S-PW" readonly /></td>
                                            <td><input type="text" class="egg-type-input" data-type="S-XS" readonly /></td>
                                            <td><input type="text" class="egg-type-input" data-type="S-S" readonly /></td>
                                            <td><input type="text" class="egg-type-input" data-type="S-M" readonly /></td>
                                            <td><input type="text" class="egg-type-input" data-type="S-L" readonly /></td>
                                            <td><input type="text" class="egg-type-input" data-type="S-XL" readonly /></td>
                                            <td><input type="text" class="egg-type-input" data-type="S-J" readonly /></td>
                                            <td><input type="text" class="egg-type-input" data-type="S-Broken" readonly /></td>
                                            <td><input type="text" class="egg-type-input" data-type="S-Dirty" readonly /></td>
                                            <td><input type="text" class="egg-type-input" data-type="S-Unweighed" readonly /></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div class="egg-gap"></div>
                            <hr class="egg-section-divider" />
                            <div class="egg-gap"></div>
                            <div class="egg-form-row egg-total-row">
                                <div class="egg-form-field">
                                    <label>Total Hours Operated</label>
                                    <input type="text" id="egg-total-hours" readonly />
                                    <span class="egg-unit">Hours</span>
                                </div>
                            </div>
                            <div class="egg-time-inputs">
                                <div class="egg-time-row">
                                    <div class="egg-time-field">
                                        <label>1st Time IN</label>
                                        <input type="time" class="egg-time-input" data-time="in1" />
                                    </div>
                                    <div class="egg-time-field">
                                        <label>1st Time OUT</label>
                                        <input type="time" class="egg-time-input" data-time="out1" />
                                    </div>
                                </div>
                                <div class="egg-time-row">
                                    <div class="egg-time-field">
                                        <label>2nd Time IN</label>
                                        <input type="time" class="egg-time-input" data-time="in2" />
                                    </div>
                                    <div class="egg-time-field">
                                        <label>2nd Time OUT</label>
                                        <input type="time" class="egg-time-input" data-time="out2" />
                                    </div>
                                </div>
                                <div class="egg-time-row">
                                    <div class="egg-time-field">
                                        <label>3rd Time IN</label>
                                        <input type="time" class="egg-time-input" data-time="in3" />
                                    </div>
                                    <div class="egg-time-field">
                                        <label>3rd Time OUT</label>
                                        <input type="time" class="egg-time-input" data-time="out3" />
                                    </div>
                                </div>
                            </div>
                            <div class="egg-gap-15"></div>
                            <button class="btn-primary egg-save-btn">Save</button>

                            <div id="egg-confirm-modal" class="modal hidden">
                                <div class="modal-content egg-confirm-modal">
                                    <h3>Total Egg Production Today</h3>
                                    <div class="egg-confirm-row">
                                        <span>Beginning Inventory</span>
                                        <span id="confirm-beginning" class="egg-confirm-value">0</span>
                                    </div>
                                    <div class="egg-confirm-row">
                                        <span>Ending Inventory</span>
                                        <span id="confirm-ending" class="egg-confirm-value">0</span>
                                    </div>
                                    <div class="egg-confirm-row">
                                        <span>Egg Waste</span>
                                        <span id="confirm-waste" class="egg-confirm-value">0</span>
                                    </div>
                                    <div class="egg-confirm-row">
                                        <span>Eggs Sold</span>
                                        <span id="confirm-sold" class="egg-confirm-value">0</span>
                                    </div>
                                    <hr class="egg-confirm-divider" />
                                    <div class="egg-confirm-row egg-confirm-total">
                                        <span>Total Egg Produced</span>
                                        <span id="confirm-total" class="egg-confirm-value">0</span>
                                    </div>
                                    <div class="egg-confirm-actions">
                                        <button class="btn-primary" id="confirm-yes-btn">Proceed</button>
                                        <button class="btn-danger" id="confirm-no-btn">Cancel</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
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
                        <label>Product ID</label>
                        <input type="text" id="new-product-id" readonly placeholder="EgRoProID-1" />
                        <label>Product</label>
                        <input type="text" id="new-product-name" placeholder="Product name" />
                        <label>Status</label>
                        <select id="new-product-status" class="modal-select">
                            <option value="Active">Active</option>
                            <option value="Inactive">Inactive</option>
                        </select>
                        <label>Remarks</label>
                        <textarea rows="3" placeholder="Remarks"></textarea>
                        <div class="modal-tab-actions">
                            <button class="btn-primary">Save</button>
                        </div>
                    </div>
                    <div class="modal-tab-panel hidden" id="tab-change">
                        <label>Search Products</label>
                        <input type="text" id="product-search" placeholder="Search products..." />
                        <label>Product</label>
                        <select class="modal-select" id="change-product">
                            <option value="">Select a product...</option>
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
                        <label>Status</label>
                        <select id="change-product-status" class="modal-select">
                            <option value="Active">Active</option>
                            <option value="Inactive">Inactive</option>
                        </select>
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

    // Attach Event Listeners for Modals
    const eggModal = container.querySelector('#egg-modal');
    const openEggModalBtn = container.querySelector('#open-egg-modal');
    const closeEggModalBtn = container.querySelector('#close-egg-modal-btn');

    if (openEggModalBtn && eggModal) {
        openEggModalBtn.addEventListener('click', async () => {
            eggModal.classList.remove('hidden');
            const dateInput = eggModal.querySelector('#egg-production-date');
            if (dateInput) {
                const today = new Date();
                dateInput.value = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
            }
            const productionIdInput = eggModal.querySelector('#egg-production-id');
            if (productionIdInput) {
                try {
                    const res = await fetch(`${API_BASE_DAILY_EGG_PRODUCTION}/next-id`, { headers: getAuthHeaders() });
                    if (res.ok) {
                        const data = await res.json();
                        productionIdInput.value = data.production_id || 'DaEggProdID-1';
                    } else {
                        productionIdInput.value = 'DaEggProdID-1';
                    }
                } catch {
                    productionIdInput.value = 'DaEggProdID-1';
                }
            }
            updateEndingInventory();
            const eggWasteInputs = eggModal.querySelectorAll('.egg-waste-input');
            eggWasteInputs.forEach(input => input.value = '');
            const eggWasteTotal = eggModal.querySelector('#egg-waste-total');
            if (eggWasteTotal) eggWasteTotal.value = '';
            const eggTimeInputs = eggModal.querySelectorAll('.egg-time-input');
            eggTimeInputs.forEach(input => input.value = '');
            const eggTotalHours = eggModal.querySelector('#egg-total-hours');
            if (eggTotalHours) eggTotalHours.value = '';
            await loadTodayEggsSold();
            await loadPreviousDayEndingInventory();
            updateBeginningInventory();
        });
    }
    if (closeEggModalBtn && eggModal) {
        closeEggModalBtn.addEventListener('click', () => eggModal.classList.add('hidden'));
    }

    const updateBeginningInventory = () => {
        const beginningInventoryInput = eggModal.querySelector('#egg-beginning-inventory');
        const beginningTable = eggModal.querySelectorAll('.egg-types-table')[0];
        if (!beginningInventoryInput || !beginningTable) return;
        const eggTypeInputs = beginningTable.querySelectorAll('.egg-type-input');
        let total = 0;
        eggTypeInputs.forEach(input => {
            const value = parseInt(input.value, 10);
            if (!isNaN(value)) total += value;
        });
        beginningInventoryInput.value = total;
    };

    const updateEndingInventory = () => {
        const endingInventoryInput = eggModal.querySelector('#egg-ending-inventory');
        const endingTable = eggModal.querySelectorAll('.egg-types-table')[1];
        if (!endingInventoryInput || !endingTable) return;
        const eggTypeInputs = endingTable.querySelectorAll('.egg-type-input');
        let total = 0;
        eggTypeInputs.forEach(input => {
            const value = parseInt(input.value, 10);
            if (!isNaN(value)) total += value;
        });
        endingInventoryInput.value = total;
    };

    const eggTypeInputs = eggModal ? eggModal.querySelectorAll('.egg-type-input') : [];
    eggTypeInputs.forEach(input => {
        input.addEventListener('input', () => {
            updateBeginningInventory();
            updateEndingInventory();
        });
    });

    const updateEndingInventoryFromDispatch = () => {
        const endingTable = eggModal.querySelectorAll('.egg-types-table')[1];
        if (!endingTable) return;
        const endingInputs = Array.from(endingTable.querySelectorAll('.egg-type-input'));
        const columnTotals = new Array(endingInputs.length).fill(0);

        const caseInputs = Array.from(eggModal.querySelectorAll('.egg-case-input'));
        caseInputs.forEach(input => {
            const row = input.closest('tr');
            if (!row) return;
            const cells = row.querySelectorAll('td');
            const cellIndex = Array.from(cells).indexOf(input.parentElement);
            if (cellIndex <= 0) return;
            const colIndex = cellIndex - 1;
            const value = parseInt(input.value, 10);
            columnTotals[colIndex] += isNaN(value) ? 0 : value * 360;
        });

        const mobaInputs = Array.from(eggModal.querySelectorAll('.egg-moba-input'));
        mobaInputs.forEach(input => {
            const row = input.closest('tr');
            if (!row) return;
            const cells = row.querySelectorAll('td');
            const cellIndex = Array.from(cells).indexOf(input.parentElement);
            if (cellIndex <= 0) return;
            const colIndex = cellIndex - 1;
            const value = parseInt(input.value, 10);
            const rowType = input.dataset.row || '';
            const multiplier = rowType === 'cases' ? 360 : rowType === 'tray' ? 30 : 1;
            columnTotals[colIndex] += isNaN(value) ? 0 : value * multiplier;
        });

        const unweighedCases = eggModal.querySelector('#unweighed-cases');
        const unweighedTray = eggModal.querySelector('#unweighed-tray');
        const unweighedPieces = eggModal.querySelector('#unweighed-pieces');
        let unweighedTotal = 0;
        if (unweighedCases) {
            const value = parseInt(unweighedCases.value, 10);
            unweighedTotal += isNaN(value) ? 0 : value * 360;
        }
        if (unweighedTray) {
            const value = parseInt(unweighedTray.value, 10);
            unweighedTotal += isNaN(value) ? 0 : value * 30;
        }
        if (unweighedPieces) {
            const value = parseInt(unweighedPieces.value, 10);
            unweighedTotal += isNaN(value) ? 0 : value * 1;
        }

        endingInputs.forEach((input, index) => {
            if (index === endingInputs.length - 1) {
                input.value = unweighedTotal > 0 ? unweighedTotal : '';
            } else {
                input.value = columnTotals[index] > 0 ? columnTotals[index] : '';
            }
        });

        updateEndingInventory();
    };

    const eggCaseInputs = eggModal ? eggModal.querySelectorAll('.egg-case-input') : [];
    eggCaseInputs.forEach(input => {
        input.addEventListener('input', updateEndingInventoryFromDispatch);
    });

    const eggMobaInputs = eggModal ? eggModal.querySelectorAll('.egg-moba-input') : [];
    eggMobaInputs.forEach(input => {
        input.addEventListener('input', updateEndingInventoryFromDispatch);
    });

    const eggUnweighedInputs = eggModal ? eggModal.querySelectorAll('.egg-unweighed-input') : [];
    eggUnweighedInputs.forEach(input => {
        input.addEventListener('input', updateEndingInventoryFromDispatch);
    });

    const updateEggWasteTotal = () => {
        const wasteTotalInput = eggModal.querySelector('#egg-waste-total');
        if (!wasteTotalInput) return;
        const wasteInputs = eggModal.querySelectorAll('.egg-waste-input');
        let total = 0;
        wasteInputs.forEach(input => {
            const rowType = input.dataset.row || '';
            const value = parseInt(input.value, 10);
            const multiplier = rowType === 'cases' ? 360 : rowType === 'tray' ? 30 : 1;
            total += isNaN(value) ? 0 : value * multiplier;
        });
        wasteTotalInput.value = total > 0 ? total : '';
    };

    const eggWasteInputs = eggModal ? eggModal.querySelectorAll('.egg-waste-input') : [];
    eggWasteInputs.forEach(input => {
        input.addEventListener('input', updateEggWasteTotal);
    });

    const loadTodayEggsSold = async () => {
        const soldTable = eggModal.querySelectorAll('.egg-types-table')[2];
        if (!soldTable) return;
        const soldInputs = Array.from(soldTable.querySelectorAll('.egg-type-input'));
        soldInputs.forEach(input => input.value = '');
        const validCategories = ['NW', 'PW', 'XS', 'S', 'M', 'L', 'XL', 'J', 'Broken', 'Dirty', 'Unweighed'];
        try {
            const res = await fetch(`${API_BASE_RECEIPT_ISSUES}/today-eggs-sold`, { headers: getAuthHeaders() });
            if (!res.ok) return;
            const totals = await res.json();
            soldInputs.forEach(input => {
                const rawType = input.dataset.type || '';
                const type = rawType.replace(/^[A-Z]-/, '');
                if (validCategories.includes(type) && totals[type]) {
                    input.value = totals[type];
                }
            });
        } catch (err) {
            console.error('Failed to load today eggs sold', err);
        }
        const totalSoldInput = eggModal.querySelector('#egg-total-sold');
        if (totalSoldInput) {
            let total = 0;
            soldInputs.forEach(input => {
                const value = parseFloat(input.value);
                if (!isNaN(value)) total += value;
            });
            totalSoldInput.value = total > 0 ? total.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : '';
        }
    };

    const updateTotalHoursOperated = () => {
        const totalHoursInput = eggModal.querySelector('#egg-total-hours');
        if (!totalHoursInput) return;
        const timeInputs = eggModal.querySelectorAll('.egg-time-input');
        const pairs = [
            { in: 'in1', out: 'out1' },
            { in: 'in2', out: 'out2' },
            { in: 'in3', out: 'out3' }
        ];
        let totalMinutes = 0;
        pairs.forEach(pair => {
            const inInput = eggModal.querySelector(`.egg-time-input[data-time="${pair.in}"]`);
            const outInput = eggModal.querySelector(`.egg-time-input[data-time="${pair.out}"]`);
            if (inInput && outInput && inInput.value && outInput.value) {
                const inMinutes = parseTimeToMinutes(inInput.value);
                const outMinutes = parseTimeToMinutes(outInput.value);
                if (!isNaN(inMinutes) && !isNaN(outMinutes) && outMinutes > inMinutes) {
                    totalMinutes += outMinutes - inMinutes;
                }
            }
        });
        const hours = totalMinutes / 60;
        totalHoursInput.value = hours > 0 ? hours.toFixed(2) : '';
    };

    const parseTimeToMinutes = (timeStr) => {
        if (!timeStr) return NaN;
        const [hours, minutes] = timeStr.split(':').map(Number);
        if (isNaN(hours) || isNaN(minutes)) return NaN;
        return hours * 60 + minutes;
    };

    const eggTimeInputs = eggModal ? eggModal.querySelectorAll('.egg-time-input') : [];
    eggTimeInputs.forEach(input => {
        input.addEventListener('input', updateTotalHoursOperated);
    });

    const loadPreviousDayEndingInventory = async () => {
        const beginningTable = eggModal.querySelectorAll('.egg-types-table')[0];
        if (!beginningTable) return;
        const beginningInputs = Array.from(beginningTable.querySelectorAll('.egg-type-input'));
        beginningInputs.forEach(input => input.value = '');
        try {
            const today = new Date();
            const yesterday = new Date(today);
            yesterday.setDate(yesterday.getDate() - 1);
            const yesterdayStr = `${yesterday.getFullYear()}-${String(yesterday.getMonth() + 1).padStart(2, '0')}-${String(yesterday.getDate()).padStart(2, '0')}`;
            const res = await fetch(`${API_BASE_DAILY_EGG_PRODUCTION}/check-date/${yesterdayStr}`, { headers: getAuthHeaders() });
            if (!res.ok) return;
            const checkData = await res.json();
            if (!checkData.exists) return;
            const record = checkData.record;
            const mapping = {
                'B-NW': record.e_nw,
                'B-PW': record.e_pw,
                'B-XS': record.e_xs,
                'B-S': record.e_s,
                'B-M': record.e_m,
                'B-L': record.e_l,
                'B-XL': record.e_xl,
                'B-J': record.e_j,
                'B-Broken': record.e_broken,
                'B-Dirty': record.e_dirty,
                'B-Unweighed': record.e_unweighed
            };
            beginningInputs.forEach(input => {
                const type = input.dataset.type || '';
                if (mapping[type] !== undefined) {
                    input.value = mapping[type] || '';
                }
            });
        } catch (err) {
            console.error('Failed to load previous day ending inventory', err);
        }
    };

    const saveDailyEggProductionBtn = eggModal ? eggModal.querySelector('.egg-save-btn') : null;
    if (saveDailyEggProductionBtn) {
        saveDailyEggProductionBtn.addEventListener('click', async () => {
            const productionIdInput = eggModal.querySelector('#egg-production-id');
            const dateInput = eggModal.querySelector('#egg-production-date');
            const production_id = productionIdInput ? productionIdInput.value.trim() : '';
            const date = dateInput ? dateInput.value : '';

            if (!production_id || !date) {
                alert('Production ID and Date are required');
                return;
            }

            const getInputValue = (selector) => {
                const el = eggModal.querySelector(selector);
                return el ? parseInt(el.value, 10) || 0 : 0;
            };

            const getTotalSoldValue = (selector) => {
                const el = eggModal.querySelector(selector);
                if (!el) return 0;
                const raw = el.value.replace(/,/g, '');
                return parseFloat(raw) || 0;
            };

            const formatNumber = (num) => {
                return Number(num).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
            };

            const beginningInventory = getInputValue('#egg-beginning-inventory');
            const endingInventory = getInputValue('#egg-ending-inventory');
            const eggWaste = getInputValue('#egg-waste-total');
            const eggsSold = getTotalSoldValue('#egg-total-sold');
            const totalProduced = endingInventory + eggWaste + eggsSold - beginningInventory;

            const payload = {
                production_id,
                date,
                e_nw: getInputValue('.egg-type-input[data-type="E-NW"]'),
                e_pw: getInputValue('.egg-type-input[data-type="E-PW"]'),
                e_xs: getInputValue('.egg-type-input[data-type="E-XS"]'),
                e_s: getInputValue('.egg-type-input[data-type="E-S"]'),
                e_m: getInputValue('.egg-type-input[data-type="E-M"]'),
                e_l: getInputValue('.egg-type-input[data-type="E-L"]'),
                e_xl: getInputValue('.egg-type-input[data-type="E-XL"]'),
                e_j: getInputValue('.egg-type-input[data-type="E-J"]'),
                e_broken: getInputValue('.egg-type-input[data-type="E-Broken"]'),
                e_dirty: getInputValue('.egg-type-input[data-type="E-Dirty"]'),
                e_unweighed: getInputValue('.egg-type-input[data-type="E-Unweighed"]'),
                egg_waste: getInputValue('#egg-waste-total'),
                total_eggs_sold: getTotalSoldValue('#egg-total-sold'),
                s_nw: getInputValue('.egg-type-input[data-type="S-NW"]'),
                s_pw: getInputValue('.egg-type-input[data-type="S-PW"]'),
                s_xs: getInputValue('.egg-type-input[data-type="S-XS"]'),
                s_s: getInputValue('.egg-type-input[data-type="S-S"]'),
                s_m: getInputValue('.egg-type-input[data-type="S-M"]'),
                s_l: getInputValue('.egg-type-input[data-type="S-L"]'),
                s_xl: getInputValue('.egg-type-input[data-type="S-XL"]'),
                s_j: getInputValue('.egg-type-input[data-type="S-J"]'),
                s_broken: getInputValue('.egg-type-input[data-type="S-Broken"]'),
                s_dirty: getInputValue('.egg-type-input[data-type="S-Dirty"]'),
                s_unweighed: getInputValue('.egg-type-input[data-type="S-Unweighed"]'),
                total_hours_operated: getTotalSoldValue('#egg-total-hours'),
                egg_production: totalProduced
            };

            let existingRecord = null;
            try {
                const checkRes = await fetch(`${API_BASE_DAILY_EGG_PRODUCTION}/check-date/${encodeURIComponent(date)}`, { headers: getAuthHeaders() });
                if (checkRes.ok) {
                    const checkData = await checkRes.json();
                    if (checkData.exists) {
                        existingRecord = checkData.record;
                    }
                }
            } catch (err) {
                console.error('Failed to check existing record', err);
            }

            const confirmModal = eggModal.querySelector('#egg-confirm-modal');
            if (!confirmModal) return;

            const confirmYesBtn = confirmModal.querySelector('#confirm-yes-btn');
            const confirmNoBtn = confirmModal.querySelector('#confirm-no-btn');
            const closeConfirm = () => confirmModal.classList.add('hidden');

            const saveNew = async () => {
                try {
                    const res = await fetch(API_BASE_DAILY_EGG_PRODUCTION, {
                        method: 'POST',
                        headers: { ...getAuthHeaders(), 'Content-Type': 'application/json' },
                        body: JSON.stringify(payload)
                    });
                    if (!res.ok) {
                        const errData = await res.json().catch(() => ({}));
                        throw new Error(errData.error || `Server error: ${res.status}`);
                    }
                    alert('Daily egg production saved successfully');
                    eggModal.classList.add('hidden');
                } catch (err) {
                    console.error('Failed to save daily egg production', err);
                    alert('Error saving daily egg production: ' + err.message);
                } finally {
                    closeConfirm();
                }
            };

            const updateExisting = async () => {
                if (!existingRecord) return;
                try {
                    const res = await fetch(`${API_BASE_DAILY_EGG_PRODUCTION}/${existingRecord.id}`, {
                        method: 'PUT',
                        headers: { ...getAuthHeaders(), 'Content-Type': 'application/json' },
                        body: JSON.stringify(payload)
                    });
                    if (!res.ok) {
                        const errData = await res.json().catch(() => ({}));
                        throw new Error(errData.error || `Server error: ${res.status}`);
                    }
                    alert('Daily egg production updated successfully');
                    eggModal.classList.add('hidden');
                } catch (err) {
                    console.error('Failed to update daily egg production', err);
                    alert('Error updating daily egg production: ' + err.message);
                } finally {
                    closeConfirm();
                }
            };

            if (existingRecord) {
                document.querySelector('#egg-confirm-modal h3').textContent = 'Record already exists for this date';
                document.getElementById('confirm-beginning').textContent = formatNumber(beginningInventory);
                document.getElementById('confirm-ending').textContent = formatNumber(endingInventory);
                document.getElementById('confirm-waste').textContent = formatNumber(eggWaste);
                document.getElementById('confirm-sold').textContent = formatNumber(eggsSold);
                document.getElementById('confirm-total').textContent = formatNumber(totalProduced);
                confirmModal.classList.remove('hidden');

                if (confirmYesBtn) {
                    confirmYesBtn.textContent = 'Update';
                    confirmYesBtn.onclick = () => {
                        closeConfirm();
                        updateExisting();
                    };
                }
                if (confirmNoBtn) {
                    confirmNoBtn.textContent = 'Cancel';
                    confirmNoBtn.onclick = closeConfirm;
                }
            } else {
                document.querySelector('#egg-confirm-modal h3').textContent = 'Total Egg Production Today';
                document.getElementById('confirm-beginning').textContent = formatNumber(beginningInventory);
                document.getElementById('confirm-ending').textContent = formatNumber(endingInventory);
                document.getElementById('confirm-waste').textContent = formatNumber(eggWaste);
                document.getElementById('confirm-sold').textContent = formatNumber(eggsSold);
                document.getElementById('confirm-total').textContent = formatNumber(totalProduced);
                confirmModal.classList.remove('hidden');

                if (confirmYesBtn) {
                    confirmYesBtn.textContent = 'Proceed';
                    confirmYesBtn.onclick = () => {
                        closeConfirm();
                        saveNew();
                    };
                }
                if (confirmNoBtn) {
                    confirmNoBtn.textContent = 'Cancel';
                    confirmNoBtn.onclick = closeConfirm;
                }
            }
        });
    }

    const eggProductsModal = container.querySelector('#egg-products-modal');
    const openEggProductsBtn = container.querySelector('#add-egg-products-btn');
    const closeEggProductsBtn = container.querySelector('#close-egg-products-btn');
    const productListBody = container.querySelector('#egg-product-list-body');

    const resetAddTab = () => {
        const productIdInput = eggProductsModal.querySelector('#new-product-id');
        const productNameInput = eggProductsModal.querySelector('#new-product-name');
        const statusSelect = eggProductsModal.querySelector('#new-product-status');
        const remarksTextarea = eggProductsModal.querySelector('#tab-add textarea');
        if (productIdInput) productIdInput.value = '';
        if (productNameInput) productNameInput.value = '';
        if (statusSelect) statusSelect.value = 'Active';
        if (remarksTextarea) remarksTextarea.value = '';
    };

    const resetChangeTab = () => {
        if (changeProductSelect) changeProductSelect.value = '';
        if (changeProductId) changeProductId.value = '';
        if (changeRemarks) {
            changeRemarks.value = '';
            changeRemarks.setAttribute('readonly', true);
        }
        if (changeStatus) {
            changeStatus.value = 'Active';
            changeStatus.disabled = true;
        }
        if (productSearchInput) productSearchInput.value = '';
    };

    let eggProductCurrentPage = 1;
    const EGG_PRODUCTS_PER_PAGE = 5;

    const renderEggProductPagination = (totalItems) => {
        const pagination = container.querySelector('#egg-product-pagination');
        if (!pagination) return;
        const totalPages = Math.max(1, Math.ceil(totalItems / EGG_PRODUCTS_PER_PAGE));
        if (totalPages <= 1) {
            pagination.style.display = 'none';
            return;
        }
        pagination.style.display = 'flex';
        let buttonsHtml = '';
        if (eggProductCurrentPage > 1) {
            buttonsHtml += `<button class="page-btn" data-page="${eggProductCurrentPage - 1}">&laquo; Prev</button>`;
        } else {
            buttonsHtml += `<button class="page-btn" disabled>&laquo; Prev</button>`;
        }
        for (let i = 1; i <= totalPages; i++) {
            buttonsHtml += `<button class="page-btn ${i === eggProductCurrentPage ? 'active' : ''}" data-page="${i}">${i}</button>`;
        }
        if (eggProductCurrentPage < totalPages) {
            buttonsHtml += `<button class="page-btn" data-page="${eggProductCurrentPage + 1}">Next &raquo;</button>`;
        } else {
            buttonsHtml += `<button class="page-btn" disabled>Next &raquo;</button>`;
        }
        pagination.innerHTML = buttonsHtml;
        pagination.querySelectorAll('.page-btn:not([disabled])').forEach(btn => {
            btn.addEventListener('click', () => {
                const page = parseInt(btn.dataset.page, 10);
                if (!isNaN(page)) {
                    eggProductCurrentPage = page;
                    loadEggProductList();
                }
            });
        });
    };

    const loadEggProductList = async () => {
        if (!productListBody) return;
        try {
            const res = await fetch(`${API_BASE_EGG_PRODUCTS}`, { headers: getAuthHeaders() });
            if (!res.ok) throw new Error('Failed to fetch products');
            const products = await res.json();
            const totalItems = products.length;
            const totalPages = Math.max(1, Math.ceil(totalItems / EGG_PRODUCTS_PER_PAGE));
            if (eggProductCurrentPage > totalPages) eggProductCurrentPage = totalPages;
            const start = (eggProductCurrentPage - 1) * EGG_PRODUCTS_PER_PAGE;
            const paginatedProducts = products.slice(start, start + EGG_PRODUCTS_PER_PAGE);
            productListBody.innerHTML = paginatedProducts.map(p => `
                <tr>
                    <td>${p.product_id}</td>
                    <td>${p.product_name}</td>
                    <td>${p.remarks || ''}</td>
                    <td>${p.status || 'Active'}</td>
                </tr>
            `).join('');
            if (totalItems === 0) {
                productListBody.innerHTML = '<tr><td colspan="4">No products found</td></tr>';
            }
            renderEggProductPagination(totalItems);
        } catch (err) {
            console.error('Failed to load egg product list', err);
            productListBody.innerHTML = '<tr><td colspan="4">No products found</td></tr>';
            const pagination = container.querySelector('#egg-product-pagination');
            if (pagination) pagination.style.display = 'none';
        }
    };

    if (openEggProductsBtn && eggProductsModal) {
        openEggProductsBtn.addEventListener('click', async () => {
            eggProductsModal.classList.remove('hidden');
            eggProductCurrentPage = 1;
            resetAddTab();
            resetChangeTab();
            eggProductTabs.forEach(t => t.classList.remove('active'));
            const firstTab = eggProductsModal.querySelector('.modal-tab[data-tab="add"]');
            if (firstTab) firstTab.classList.add('active');
            Object.keys(eggProductPanels).forEach(key => {
                if (eggProductPanels[key]) {
                    eggProductPanels[key].classList.toggle('hidden', key !== 'add');
                }
            });
            const productIdInput = eggProductsModal.querySelector('#new-product-id');
            if (productIdInput) {
                try {
                    const res = await fetch(`${API_BASE_EGG_PRODUCTS}/next-id`, { headers: getAuthHeaders() });
                    if (res.ok) {
                        const data = await res.json();
                        productIdInput.value = data.product_id || 'EgRoProID-1';
                    } else {
                        productIdInput.value = 'EgRoProID-1';
                    }
                } catch {
                    productIdInput.value = 'EgRoProID-1';
                }
            }
            await loadEggProductsForChange();
        });
    }
    if (eggProductsModal) {
        eggProductsModal.addEventListener('click', (e) => {
            if (e.target === eggProductsModal) {
                eggProductsModal.classList.add('hidden');
            }
        });
    }

    const eggProductTabs = eggProductsModal ? eggProductsModal.querySelectorAll('.modal-tab') : [];
    const eggProductPanels = {
        add: eggProductsModal ? eggProductsModal.querySelector('#tab-add') : null,
        change: eggProductsModal ? eggProductsModal.querySelector('#tab-change') : null
    };

    eggProductTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            eggProductTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            const tabName = tab.dataset.tab;
            Object.keys(eggProductPanels).forEach(key => {
                if (eggProductPanels[key]) {
                    eggProductPanels[key].classList.toggle('hidden', key !== tabName);
                }
            });
        });
    });

    const productSearchInput = eggProductsModal ? eggProductsModal.querySelector('#product-search') : null;
    const changeProductSelect = eggProductsModal ? eggProductsModal.querySelector('#change-product') : null;
    const changeProductId = eggProductsModal ? eggProductsModal.querySelector('#change-product-id') : null;
    const changeRemarks = eggProductsModal ? eggProductsModal.querySelector('#change-remarks') : null;
    const changeStatus = eggProductsModal ? eggProductsModal.querySelector('#change-product-status') : null;

    if (productSearchInput && changeProductSelect) {
        productSearchInput.addEventListener('input', () => {
            const query = productSearchInput.value.toLowerCase();
            Array.from(changeProductSelect.options).forEach(option => {
                const text = option.text.toLowerCase();
                option.style.display = text.includes(query) || !query ? '' : 'none';
            });
        });
    }

    if (changeProductSelect) {
        changeProductSelect.addEventListener('change', () => {
            if (changeProductSelect.value) {
                const parts = changeProductSelect.value.split('#');
                if (parts.length === 2) {
                    const num = parseInt(parts[1], 10);
                    if (changeProductId) changeProductId.value = `EgRoProID-${num}`;
                }
                if (changeRemarks) changeRemarks.removeAttribute('readonly');
                if (changeStatus) changeStatus.disabled = false;
            } else {
                if (changeProductId) changeProductId.value = '';
                if (changeRemarks) {
                    changeRemarks.value = '';
                    changeRemarks.setAttribute('readonly', true);
                }
                if (changeStatus) changeStatus.disabled = true;
            }
        });
    }

    const saveNewProductBtn = eggProductsModal ? eggProductsModal.querySelector('#tab-add .btn-primary') : null;
    if (saveNewProductBtn) {
        saveNewProductBtn.addEventListener('click', async () => {
            const productIdInput = eggProductsModal.querySelector('#new-product-id');
            const productNameInput = eggProductsModal.querySelector('#new-product-name');
            const statusSelect = eggProductsModal.querySelector('#new-product-status');
            const remarksTextarea = eggProductsModal.querySelector('#tab-add textarea');

            let product_id = productIdInput ? productIdInput.value.trim() : '';
            const product_name = productNameInput ? productNameInput.value.trim() : '';
            const status = statusSelect ? statusSelect.value : 'Active';
            const remarks = remarksTextarea ? remarksTextarea.value.trim() : '';

            if (!product_name) {
                alert('Product Name is required');
                return;
            }

            if (!product_id) {
                try {
                    const res = await fetch(`${API_BASE_EGG_PRODUCTS}/next-id`, { headers: getAuthHeaders() });
                    if (res.ok) {
                        const data = await res.json();
                        product_id = data.product_id || 'EgRoProID-1';
                    } else {
                        product_id = 'EgRoProID-1';
                    }
                } catch {
                    product_id = 'EgRoProID-1';
                }
            }

            try {
                const res = await fetch(API_BASE_EGG_PRODUCTS, {
                    method: 'POST',
                    headers: { ...getAuthHeaders(), 'Content-Type': 'application/json' },
                    body: JSON.stringify({ product_id, product_name, remarks, status })
                });
                if (!res.ok) {
                    const errData = await res.json().catch(() => ({}));
                    throw new Error(errData.error || `Server error: ${res.status}`);
                }
                alert('Product saved: ' + product_name);
                eggProductsModal.classList.add('hidden');
                if (productNameInput) productNameInput.value = '';
                if (remarksTextarea) remarksTextarea.value = '';
                if (statusSelect) statusSelect.value = 'Active';
                if (productIdInput) productIdInput.value = 'EgRoProID-1';
                eggProductCurrentPage = 1;
                await loadEggProductList();
            } catch (err) {
                console.error('Failed to save egg product', err);
                alert('Error saving product: ' + err.message);
            }
        });
    }

    const saveChangeProductBtn = eggProductsModal ? eggProductsModal.querySelector('#tab-change .btn-primary') : null;
    const deleteChangeProductBtn = eggProductsModal ? eggProductsModal.querySelector('#tab-change .btn-danger') : null;

    if (saveChangeProductBtn) {
        saveChangeProductBtn.addEventListener('click', async () => {
            const productId = changeProductId ? changeProductId.value : '';
            const productSelect = changeProductSelect;
            const productName = productSelect && productSelect.selectedOptions[0] ? productSelect.selectedOptions[0].textContent.trim() : '';
            const remarks = changeRemarks ? changeRemarks.value.trim() : '';
            const status = changeStatus ? changeStatus.value : 'Active';

            if (!productSelect || !productSelect.value) {
                alert('Please select a product');
                return;
            }

            try {
                const res = await fetch(`${API_BASE_EGG_PRODUCTS}/${encodeURIComponent(productId)}`, {
                    method: 'PUT',
                    headers: { ...getAuthHeaders(), 'Content-Type': 'application/json' },
                    body: JSON.stringify({ product_name: productName, remarks, status })
                });
                if (!res.ok) {
                    const errData = await res.json().catch(() => ({}));
                    throw new Error(errData.error || `Server error: ${res.status}`);
                }
                alert('Product updated: ' + productName);
                eggProductsModal.classList.add('hidden');
                eggProductCurrentPage = 1;
                await loadEggProductList();
            } catch (err) {
                console.error('Failed to update egg product', err);
                alert('Error updating product: ' + err.message);
            }
        });
    }

    if (deleteChangeProductBtn) {
        deleteChangeProductBtn.addEventListener('click', async () => {
            const productId = changeProductId ? changeProductId.value : '';
            const productSelect = changeProductSelect;
            const productName = productSelect && productSelect.selectedOptions[0] ? productSelect.selectedOptions[0].textContent.trim() : '';

            if (!productSelect || !productSelect.value) {
                alert('Please select a product');
                return;
            }
            if (!confirm('Delete ' + productName + '?')) return;

            try {
                const res = await fetch(`${API_BASE_EGG_PRODUCTS}/${encodeURIComponent(productId)}`, {
                    method: 'DELETE',
                    headers: getAuthHeaders()
                });
                if (!res.ok) {
                    const errData = await res.json().catch(() => ({}));
                    throw new Error(errData.error || `Server error: ${res.status}`);
                }
                alert('Product deleted');
                eggProductsModal.classList.add('hidden');
                eggProductCurrentPage = 1;
                await loadEggProductList();
            } catch (err) {
                console.error('Failed to delete egg product', err);
                alert('Error deleting product: ' + err.message);
            }
        });
    }

    const loadEggAvailabilityCard = async () => {
        const valueEl = document.getElementById('egg-availability-value');
        const trendEl = document.getElementById('egg-availability-trend');
        if (!valueEl || !trendEl) return;

        try {
            const [latestRes, allRes] = await Promise.all([
                fetch(`${API_BASE_DAILY_EGG_PRODUCTION}/latest`, { headers: getAuthHeaders() }),
                fetch(`${API_BASE_DAILY_EGG_PRODUCTION}`, { headers: getAuthHeaders() })
            ]);

            if (!latestRes.ok) throw new Error('Failed to fetch latest production');
            const latestRecord = await latestRes.json();

            const calcTotal = (record) => {
                if (!record) return 0;
                return (
                    (record.e_nw || 0) + (record.e_pw || 0) + (record.e_xs || 0) + (record.e_s || 0) +
                    (record.e_m || 0) + (record.e_l || 0) + (record.e_xl || 0) + (record.e_j || 0) +
                    (record.e_broken || 0) + (record.e_dirty || 0) + (record.e_unweighed || 0)
                );
            };

            let previousTotal = null;
            if (allRes.ok) {
                const allRecords = await allRes.json();
                const sorted = [...allRecords].sort((a, b) => new Date(b.date) - new Date(a.date));
                const currentIndex = sorted.findIndex(r => r.id === latestRecord.id);
                if (currentIndex >= 0 && currentIndex + 1 < sorted.length) {
                    previousTotal = calcTotal(sorted[currentIndex + 1]);
                }
            }

            const latestTotal = calcTotal(latestRecord);
            valueEl.textContent = latestTotal.toLocaleString('en-US') + ' pcs';

            if (previousTotal !== null && previousTotal > 0) {
                const change = latestTotal - previousTotal;
                const percentChange = ((change / previousTotal) * 100).toFixed(1);
                if (change > 0) {
                    trendEl.className = 'trend-up';
                    trendEl.textContent = `▲ ${percentChange}%`;
                } else if (change < 0) {
                    trendEl.className = 'trend-down';
                    trendEl.textContent = `▼ ${Math.abs(percentChange)}%`;
                } else {
                    trendEl.className = '';
                    trendEl.textContent = '0%';
                }
            } else {
                trendEl.className = '';
                trendEl.textContent = '';
            }
        } catch (err) {
            console.error('Failed to load egg availability card', err);
            valueEl.textContent = '-- pcs';
            trendEl.className = '';
            trendEl.textContent = '';
        }
    };

    const loadEggProductionCard = async () => {
        const valueEl = document.getElementById('egg-production-value');
        const trendEl = document.getElementById('egg-production-trend');
        if (!valueEl || !trendEl) return;

        try {
            const [latestRes, allRes] = await Promise.all([
                fetch(`${API_BASE_DAILY_EGG_PRODUCTION}/latest`, { headers: getAuthHeaders() }),
                fetch(`${API_BASE_DAILY_EGG_PRODUCTION}`, { headers: getAuthHeaders() })
            ]);

            if (!latestRes.ok) throw new Error('Failed to fetch latest production');
            const latestRecord = await latestRes.json();

            let previousProduction = null;
            if (allRes.ok) {
                const allRecords = await allRes.json();
                const sorted = [...allRecords].sort((a, b) => new Date(b.date) - new Date(a.date));
                const currentIndex = sorted.findIndex(r => r.id === latestRecord.id);
                if (currentIndex >= 0 && currentIndex + 1 < sorted.length) {
                    previousProduction = sorted[currentIndex + 1].egg_production || 0;
                }
            }

            const latestProduction = latestRecord.egg_production || 0;
            valueEl.textContent = latestProduction.toLocaleString('en-US') + ' pcs';

            if (previousProduction !== null && previousProduction > 0) {
                const change = latestProduction - previousProduction;
                const percentChange = ((change / previousProduction) * 100).toFixed(1);
                if (change > 0) {
                    trendEl.className = 'trend-up';
                    trendEl.textContent = `▲ ${percentChange}%`;
                } else if (change < 0) {
                    trendEl.className = 'trend-down';
                    trendEl.textContent = `▼ ${Math.abs(percentChange)}%`;
                } else {
                    trendEl.className = '';
                    trendEl.textContent = '0%';
                }
            } else {
                trendEl.className = '';
                trendEl.textContent = '';
            }
        } catch (err) {
            console.error('Failed to load egg production card', err);
            valueEl.textContent = '-- pcs';
            trendEl.className = '';
            trendEl.textContent = '';
        }
    };

    const loadEggWasteCard = async () => {
        const valueEl = document.getElementById('egg-waste-value');
        const trendEl = document.getElementById('egg-waste-trend');
        if (!valueEl || !trendEl) return;

        try {
            const [latestRes, allRes] = await Promise.all([
                fetch(`${API_BASE_DAILY_EGG_PRODUCTION}/latest`, { headers: getAuthHeaders() }),
                fetch(`${API_BASE_DAILY_EGG_PRODUCTION}`, { headers: getAuthHeaders() })
            ]);

            if (!latestRes.ok) throw new Error('Failed to fetch latest production');
            const latestRecord = await latestRes.json();

            let previousWaste = null;
            if (allRes.ok) {
                const allRecords = await allRes.json();
                const sorted = [...allRecords].sort((a, b) => new Date(b.date) - new Date(a.date));
                const currentIndex = sorted.findIndex(r => r.id === latestRecord.id);
                if (currentIndex >= 0 && currentIndex + 1 < sorted.length) {
                    previousWaste = sorted[currentIndex + 1].egg_waste || 0;
                }
            }

            const latestWaste = latestRecord.egg_waste || 0;
            valueEl.textContent = latestWaste.toLocaleString('en-US') + ' pcs';

            if (previousWaste !== null && previousWaste > 0) {
                const change = latestWaste - previousWaste;
                const percentChange = ((change / previousWaste) * 100).toFixed(1);
                if (change > 0) {
                    trendEl.className = '';
                    trendEl.style.color = '#e74c3c';
                    trendEl.textContent = `▲ ${percentChange}%`;
                } else if (change < 0) {
                    trendEl.className = '';
                    trendEl.style.color = '#1ea672';
                    trendEl.textContent = `▼ ${Math.abs(percentChange)}%`;
                } else {
                    trendEl.className = '';
                    trendEl.style.color = '';
                    trendEl.textContent = '0%';
                }
            } else {
                trendEl.className = '';
                trendEl.style.color = '';
                trendEl.textContent = '';
            }
        } catch (err) {
            console.error('Failed to load egg waste card', err);
            valueEl.textContent = '-- pcs';
            trendEl.className = '';
            trendEl.style.color = '';
            trendEl.textContent = '';
        }
    };

    const loadGoodBrokenCard = async () => {
        const valueEl = document.getElementById('good-broken-value');
        if (!valueEl) return;

        try {
            const latestRes = await fetch(`${API_BASE_DAILY_EGG_PRODUCTION}/latest`, { headers: getAuthHeaders() });
            if (!latestRes.ok) throw new Error('Failed to fetch latest production');
            const latestRecord = await latestRes.json();

            const production = latestRecord.egg_production || 0;
            const waste = latestRecord.egg_waste || 0;

            let goodPercent = 0;
            let brokenPercent = 0;
            if (production > 0) {
                brokenPercent = ((waste / production) * 100).toFixed(2);
                goodPercent = (100 - parseFloat(brokenPercent)).toFixed(2);
            }

            valueEl.textContent = `${goodPercent}%-${brokenPercent}%`;
        } catch (err) {
            console.error('Failed to load good to broken card', err);
            valueEl.textContent = '--%-%';
        }
    };

    const loadEggDistributionChart = async () => {
        const sizeKeys = [
            { todayKey: 'e_nw', soldKey: 's_nw' },
            { todayKey: 'e_pw', soldKey: 's_pw' },
            { todayKey: 'e_xs', soldKey: 's_xs' },
            { todayKey: 'e_s', soldKey: 's_s' },
            { todayKey: 'e_m', soldKey: 's_m' },
            { todayKey: 'e_l', soldKey: 's_l' },
            { todayKey: 'e_xl', soldKey: 's_xl' },
            { todayKey: 'e_j', soldKey: 's_j' },
            { todayKey: 'e_broken', soldKey: 's_broken' },
            { todayKey: 'e_dirty', soldKey: 's_dirty' },
            { todayKey: 'e_unweighed', soldKey: 's_unweighed' }
        ];

        try {
            const productsRes = await fetch(`${API_BASE_EGG_PRODUCTS}`, { headers: getAuthHeaders() });
            if (!productsRes.ok) throw new Error('Failed to fetch egg products');
            const allProducts = await productsRes.json();
            const activeProducts = allProducts.filter(p => p.status === 'Active');

            const [latestRes, allRes] = await Promise.all([
                fetch(`${API_BASE_DAILY_EGG_PRODUCTION}/latest`, { headers: getAuthHeaders() }),
                fetch(`${API_BASE_DAILY_EGG_PRODUCTION}`, { headers: getAuthHeaders() })
            ]);

            if (!latestRes.ok) throw new Error('Failed to fetch latest production');
            const latestRecord = await latestRes.json();

            let previousRecord = null;
            if (allRes.ok) {
                const allRecords = await allRes.json();
                const sorted = [...allRecords].sort((a, b) => new Date(b.date) - new Date(a.date));
                const currentIndex = sorted.findIndex(r => r.id === latestRecord.id);
                if (currentIndex >= 0 && currentIndex + 1 < sorted.length) {
                    previousRecord = sorted[currentIndex + 1];
                }
            }

            const rowsContainer = document.getElementById('egg-chart-rows');
            if (!rowsContainer) return;

            const displayProducts = activeProducts.length > 0 ? activeProducts : sizeKeys.map((_, i) => ({ product_name: ['NW', 'PW', 'XS', 'S', 'M', 'L', 'XL', 'J', 'Broken'][i] || `Item ${i + 1}` }));

            let rowsHtml = '';
            const productions = [];
            displayProducts.forEach((product, index) => {
                const sizeKey = sizeKeys[index] || sizeKeys[sizeKeys.length - 1];
                const ending = latestRecord[sizeKey.todayKey] || 0;
                const sold = latestRecord[sizeKey.soldKey] || 0;
                const beginning = previousRecord ? (previousRecord[sizeKey.todayKey] || 0) : 0;
                const production = ending + sold - beginning;
                productions.push(production);

                const barId = `egg-bar-${index}`;
                rowsHtml += `
                    <div class="egg-chart-row">
                        <span class="egg-size-label">${product.product_name}</span>
                        <div class="egg-bar-track">
                            <div class="egg-bar" id="${barId}" style="width: 0%;" title="0 pcs produced"></div>
                        </div>
                    </div>
                `;
            });

            rowsContainer.innerHTML = rowsHtml;

            const maxProduction = Math.max(...productions, 1);

            productions.forEach((production, index) => {
                const bar = document.getElementById(`egg-bar-${index}`);
                if (!bar) return;
                const widthPercent = (production / maxProduction) * 100;
                bar.style.width = `${Math.max(widthPercent, 2)}%`;
                bar.title = `${displayProducts[index].product_name}: ${production.toLocaleString('en-US')} pcs produced`;
            });

            const xAxis = document.querySelector('.egg-x-axis');
            if (xAxis && maxProduction > 0) {
                const steps = 6;
                const rawStep = maxProduction / steps;
                const stepValue = Math.ceil(rawStep / 500) * 500 || 500;
                const axisMax = stepValue * steps;
                let axisHtml = '';
                for (let i = 0; i <= steps; i++) {
                    const value = i * stepValue;
                    axisHtml += `<span>${value >= 1000 ? (value / 1000) + 'k' : value}</span>`;
                }
                xAxis.innerHTML = axisHtml;
            }
        } catch (err) {
            console.error('Failed to load egg distribution chart', err);
        }
    };

    const loadDailyEggTransactions = async () => {
        const tbody = document.getElementById('egg-transactions-body');
        if (!tbody) return;

        try {
            const res = await fetch(`${API_BASE_DAILY_EGG_PRODUCTION}`, { headers: getAuthHeaders() });
            if (!res.ok) throw new Error('Failed to fetch daily egg production');
            const records = await res.json();

            const sorted = [...records].sort((a, b) => new Date(a.date) - new Date(b.date));

            const toLocalDateKey = (dateStr) => {
                if (!dateStr) return '';
                const d = new Date(dateStr);
                const year = d.getFullYear();
                const month = String(d.getMonth() + 1).padStart(2, '0');
                const day = String(d.getDate()).padStart(2, '0');
                return `${year}-${month}-${day}`;
            };

            const getEndingTotal = (record) => (
                (record.e_nw || 0) + (record.e_pw || 0) + (record.e_xs || 0) + (record.e_s || 0) +
                (record.e_m || 0) + (record.e_l || 0) + (record.e_xl || 0) + (record.e_j || 0) +
                (record.e_broken || 0) + (record.e_dirty || 0) + (record.e_unweighed || 0)
            );

            const transactions = sorted.map((record, index) => {
                const dateKey = toLocalDateKey(record.date);
                const prevRecord = index > 0 ? sorted[index - 1] : null;

                const beginningInventory = prevRecord ? getEndingTotal(prevRecord) : 0;
                const endingInventory = getEndingTotal(record);

                return {
                    date: dateKey,
                    beginningInventory,
                    eggSold: record.total_eggs_sold || 0,
                    eggWaste: record.egg_waste || 0,
                    endingInventory,
                    eggProduction: record.egg_production || 0,
                    createdBy: record.created_by || '-'
                };
            });

            const reversed = [...transactions].reverse();

            tbody.innerHTML = reversed.map(t => `
                <tr>
                    <td>${t.date}</td>
                    <td>${t.beginningInventory.toLocaleString('en-US')}</td>
                    <td>${t.eggSold.toLocaleString('en-US')}</td>
                    <td>${t.eggWaste.toLocaleString('en-US')}</td>
                    <td>${t.endingInventory.toLocaleString('en-US')}</td>
                    <td>${t.eggProduction.toLocaleString('en-US')}</td>
                    <td>${t.createdBy}</td>
                </tr>
            `).join('');
        } catch (err) {
            console.error('Failed to load daily egg transactions', err);
            tbody.innerHTML = '<tr><td colspan="7" style="text-align:center; color: #e74c3c;">Failed to load data</td></tr>';
        }
    };

    const loadEggProductsForChange = async () => {
        try {
            const res = await fetch(`${API_BASE_EGG_PRODUCTS}`, { headers: getAuthHeaders() });
            if (!res.ok) throw new Error('Failed to fetch products');
            const products = await res.json();
            if (changeProductSelect) {
                changeProductSelect.innerHTML = '<option value="">Select a product...</option>' +
                    products.map(p => `<option value="${p.product_id}">${p.product_name}</option>`).join('');
            }
        } catch (err) {
            console.error('Failed to load egg products', err);
        }
    };

    loadEggProductList();
    loadEggAvailabilityCard();
    loadEggProductionCard();
    loadEggWasteCard();
    loadGoodBrokenCard();
    loadEggDistributionChart();
    loadDailyEggTransactions();
};

// Global Initialization Routine
function initializeModule(contentArea) {
    const currentTab = window.__currentTabId || 'operations-egg-inventory';
    const render = ModuleComponents[currentTab] || ModuleComponents['operations-egg-inventory'];
    if (typeof render === 'function') {
        render(contentArea);
    }
}
