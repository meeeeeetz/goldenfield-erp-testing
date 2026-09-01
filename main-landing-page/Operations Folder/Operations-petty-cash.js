ModuleComponents['operations-petty-cash'] = (container) => {

        container.innerHTML = `
            <div class="petty-layout">
                <div class="header-actions">
                    <h2>Petty Cash</h2>
                </div>
                <div class="action-buttons-row">
                    <button id="open-petty-modal" class="btn-icon-circle">
                        <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                        <span class="btn-label">Add Petty Cash Transactions</span>
                    </button>
                    <button id="bulk-upload-petty-btn" class="btn-icon-circle">
                        <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line></svg>
                        <span class="btn-label">Bulk Upload Transaction</span>
                    </button>
                    <button id="replenish-petty-btn" class="btn-icon-circle">
                        <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                        <span class="btn-label">Replenish Petty Cash</span>
                    </button>
                </div>
                <div class="tracking-cards-row">
                    <div class="card tracking-card">
                        <h3>Petty Cash Available</h3>
                        <p class="card-sub-label">On hand Petty cash available</p>
                        <div class="card-value-row">
                            <div class="card-value" id="petty-available-value">P 0.00</div>
                        </div>
                    </div>
                    <div class="card tracking-card">
                        <h3>Monthly Petty Cash Expense</h3>
                        <p class="card-sub-label">Incurred Petty Cash Transaction for this month</p>
                        <div class="card-value-row">
                            <div class="card-value" id="monthly-expense-value">P 0.00</div>
                            <span class="trend-down">▼ 3%</span>
                        </div>
                    </div>
                    <div class="card tracking-card">
                        <h3>Monthly Replenishment</h3>
                        <p class="card-sub-label">Times withdraw from Bank to Petty cash this month</p>
                        <div class="card-value-row">
                            <div class="card-value" id="monthly-replenish-value">0</div>
                        </div>
                    </div>
                    <div class="card tracking-card">
                        <h3>Pendings</h3>
                        <p class="card-sub-label">amount Pendings to be approved and paid</p>
                        <div class="card-value-row">
                            <div class="card-value">P 35,000.00</div>
                        </div>
                    </div>
                </div>
                <div class="card graph-placeholder petty-transactions-card" style="overflow: hidden;">
                    <div style="padding: 16px 20px; border-bottom: 1px solid #ddd; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 8px;">
                        <h3 style="margin: 0; font-size: 16px; font-weight: 600; color: #1a1f2e;">Pending Petty Cash Transactions</h3>
                        <div style="display: flex; gap: 8px; align-items: center; margin-left: auto;">
                            <input type="text" id="pending-petty-search" placeholder="Search name or date..." style="padding: 6px 12px; border: 1px solid #D6D6D6; border-radius: 6px; font-size: 13px; width: 220px; box-sizing: border-box;">
                            <button id="approve-filtered-petty-btn" class="btn-primary" type="button" style="padding: 6px 12px; font-size: 12px; cursor: pointer; background: #28a745; border-color: #28a745; color: white;">Approve Filtered</button>
                            <button id="reject-filtered-petty-btn" class="btn-danger" type="button" style="padding: 6px 12px; font-size: 12px; cursor: pointer;">Reject Filtered</button>
                        </div>
                    </div>
                    <div style="padding: 15px; overflow-x: auto; max-height: 50vh; overflow-y: auto;">
                        <table class="data-table product-table" style="width: 100%; border-collapse: collapse; font-size: 13px; min-width: 900px; margin: 0;">
                            <thead>
                                <tr>
                                    <th style="width: 140px; padding: 2px; font-size: 15px;">Transaction ID</th>
                                    <th style="width: 100px; padding: 2px; font-size: 15px;">Date</th>
                                    <th style="width: 120px; padding: 2px; font-size: 15px;">Category</th>
                                    <th style="width: 120px; padding: 2px; font-size: 15px;">Item</th>
                                    <th style="width: 140px; padding: 2px; font-size: 15px;">Remarks</th>
                                    <th style="width: 100px; padding: 2px; font-size: 15px;">Store</th>
                                    <th style="width: 120px; padding: 2px; font-size: 15px;">Source</th>
                                    <th style="width: 100px; padding: 2px; font-size: 15px;">Check No.</th>
                                    <th style="width: 140px; padding: 2px; font-size: 15px;">Replenish Amount</th>
                                    <th style="width: 120px; padding: 2px; font-size: 15px;">Amount</th>
                                    <th style="width: 100px; padding: 2px; font-size: 15px;">Status</th>
                                    <th style="width: 100px; padding: 2px; font-size: 15px;">Action</th>
                                </tr>
                            </thead>
                            <tbody id="pending-petty-tbody">
                                <tr><td colspan='12' style='text-align: center; padding: 20px; color: #999;'>Loading...</td></tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div class="card graph-placeholder petty-transactions-card" style="overflow: hidden;">
                    <div style="padding: 16px 20px; border-bottom: 1px solid #ddd; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 8px;">
                        <h3>Petty Cash Transactions</h3>
                        <input type="text" id="petty-search" placeholder="Search transactions..." style="padding: 6px 12px; border: 1px solid #D6D6D6; border-radius: 6px; font-size: 13px; width: 220px; box-sizing: border-box;" />
                    </div>
                    <div style="padding: 15px; overflow-x: auto; max-height: 50vh; overflow-y: auto;">
                        <table class="data-table product-table" style="width: 100%; border-collapse: collapse; font-size: 13px; min-width: 900px; margin: 0;">
                            <thead>
                                <tr>
                                    <th style="width: 140px; padding: 2px; font-size: 15px;">Transaction ID</th>
                                    <th style="width: 100px; padding: 2px; font-size: 15px;">Date</th>
                                    <th style="width: 120px; padding: 2px; font-size: 15px;">Category</th>
                                    <th style="width: 120px; padding: 2px; font-size: 15px;">Item</th>
                                    <th style="width: 140px; padding: 2px; font-size: 15px;">Remarks</th>
                                    <th style="width: 100px; padding: 2px; font-size: 15px;">Store</th>
                                    <th style="width: 120px; padding: 2px; font-size: 15px;">Source</th>
                                    <th style="width: 100px; padding: 2px; font-size: 15px;">Check No.</th>
                                    <th style="width: 140px; padding: 2px; font-size: 15px;">Replenish Amount</th>
                                    <th style="width: 120px; padding: 2px; font-size: 15px;">Amount</th>
                                    <th style="width: 100px; padding: 2px; font-size: 15px;">Status</th>
                                </tr>
                            </thead>
                            <tbody id="petty-tbody">
                                <tr><td colspan='11' style='text-align: center; padding: 20px; color: #999;'>Loading...</td></tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                </div>
                <div id="petty-modal" class="modal hidden">
                    <div class="modal-content daily-layer-modal">
                        <div class="modal-header-row">
                            <h3>Add Petty Cash Transaction</h3>
                            <button id="close-petty-modal-btn" class="modal-close-btn" title="Close">&times;</button>
                        </div>
                        <div class="daily-layer-body">
                            <div class="modal-field">
                                <label for="petty-date">Date</label>
                                <input type="date" id="petty-date" />
                            </div>
                            <div class="modal-field">
                                <label for="petty-category">Category</label>
                                <select class="modal-select" id="petty-category">
                                    <option value="">Select category</option>
                                </select>
                            </div>
                            <div class="modal-field">
                                <label for="petty-item">Item</label>
                                <input type="text" id="petty-item" placeholder="Item" />
                            </div>
                            <div class="modal-field">
                                <label for="petty-remarks">Remarks</label>
                                <input type="text" id="petty-remarks" placeholder="Remarks" />
                            </div>
                            <div class="modal-field">
                                <label for="petty-store">Store</label>
                                <input type="text" id="petty-store" placeholder="Store" />
                            </div>
                            <div class="modal-field">
                                <label for="petty-amount">Amount</label>
                                <input type="number" id="petty-amount" placeholder="Amount (PHP)" />
                            </div>
                            <div class="modal-field">
                                <label for="petty-status">Status</label>
                                <select class="modal-select" id="petty-status">
                                    <option value="Pending">Pending</option>
                                    <option value="Approved">Approved</option>
                                    <option value="Paid">Paid</option>
                                </select>
                            </div>
                        </div>
                        <div class="modal-tab-actions">
                            <button id="save-petty-btn" class="btn-primary">Save Entry</button>
                        </div>
                    </div>
                </div>
                <div id="bulk-upload-modal" class="modal hidden">
                    <div class="modal-content" style="max-width: 1200px; width: 95%;">
                        <div class="modal-header-row">
                            <h3>Bulk Upload Transaction</h3>
                            <button id="close-bulk-upload-btn" class="modal-close-btn" title="Close">&times;</button>
                        </div>
                        <div style="padding: 20px; display: flex; flex-direction: column; gap: 16px;">
                            <div style="display: flex; gap: 16px; align-items: flex-start;">
                                <div id="bulk-drop-zone" style="border: 2px dashed #cbd5e1; border-radius: 8px; padding: 40px 20px; text-align: center; background: #f8fafc; transition: border-color 0.2s, background 0.2s; cursor: pointer; flex: 0 0 320px; display: flex; flex-direction: column; align-items: center; justify-content: center; min-height: 220px;">
                                    <svg viewBox="0 0 24 24" width="48" height="48" fill="none" stroke="#64748b" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line></svg>
                                    <p style="margin: 12px 0 4px; font-size: 16px; font-weight: 600; color: #1a1f2e;">Drag and drop Excel/CSV file here</p>
                                    <p style="margin: 0; font-size: 13px; color: #64748b;">or click to browse</p>
                                    <input type="file" id="bulk-file-input" accept=".xlsx,.xls,.csv" style="display: none;">
                                    <p id="bulk-file-name" style="margin-top: 12px; font-size: 14px; color: #2563eb; font-weight: 600;"></p>
                                </div>
                                <div id="bulk-preview" style="flex: 1; overflow: auto; max-height: 420px; border: 1px solid #e2e8f0; border-radius: 8px; background: #fff; display: none;">
                                    <div style="padding: 10px; border-bottom: 1px solid #e2e8f0; font-weight: 600; color: #334155;">Preview</div>
                                    <div id="bulk-preview-table" style="overflow-x: auto;"></div>
                                </div>
                            </div>
                            <div style="display: flex; gap: 12px; justify-content: flex-end;">
                                <button id="download-template-btn" class="btn-primary" type="button" style="padding: 10px 16px; font-size: 14px; cursor: pointer;">Download Template</button>
                                <button id="cancel-bulk-upload-btn" class="btn-danger" type="button" style="padding: 10px 16px; font-size: 14px; cursor: pointer;">Cancel</button>
                                <button id="save-bulk-btn" class="btn-primary" type="button" style="padding: 10px 16px; font-size: 14px; cursor: pointer;">Save</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div id="replenish-modal" class="modal hidden">
                    <div class="modal-content daily-layer-modal">
                        <div class="modal-header-row">
                            <h3>Replenish Petty Cash</h3>
                            <button id="close-replenish-modal-btn" class="modal-close-btn" title="Close">&times;</button>
                        </div>
                        <div class="daily-layer-body">
                            <div class="modal-field">
                                <label for="replenish-date">Date</label>
                                <input type="date" id="replenish-date" />
                            </div>
                            <div class="modal-field">
                                <label for="replenish-amount">Replenish Amount</label>
                                <input type="number" id="replenish-amount" placeholder="Amount (PHP)" />
                            </div>
                            <div class="modal-field">
                                <label for="replenish-source">Source</label>
                                <select class="modal-select" id="replenish-source">
                                    <option value="">Loading bank accounts...</option>
                                </select>
                            </div>
                            <div class="modal-field">
                                <label for="replenish-check">Check No.</label>
                                <input type="text" id="replenish-check" placeholder="If applicable" />
                            </div>
                            <div class="modal-field">
                                <label for="replenish-status">Status</label>
                                <select class="modal-select" id="replenish-status">
                                    <option value="Pending">Pending</option>
                                    <option value="Approved">Approved</option>
                                    <option value="Withdrawn">Withdrawn</option>
                                </select>
                            </div>
                        </div>
                        <div class="modal-tab-actions">
                            <button id="save-replenish-btn" class="btn-primary">Save</button>
                        </div>
                    </div>
                </div>
            </div>
        `;


        const pettyModal = document.getElementById('petty-modal');
        const closePettyModal = () => pettyModal.classList.add('hidden');
        document.getElementById('open-petty-modal').onclick = () => {
            pettyModal.classList.remove('hidden');
            loadExpenseCategories();
        };

        const loadExpenseCategories = async () => {
            const categorySelect = document.getElementById('petty-category');
            if (!categorySelect) return;
            try {
                const res = await fetch('http://localhost:5000/api/expense-categories');
                if (!res.ok) throw new Error('Failed to load expense categories');
                const categories = await res.json();
                categorySelect.innerHTML = '<option value="">Select category</option>' + categories.map(c => '<option value="' + c.expense_type + '">' + c.accounting_code + ' - ' + c.expense_type + '</option>').join('');
            } catch (err) {
                console.error('Failed to load expense categories:', err);
            }
        };

        const loadPettyCashStats = async () => {
            try {
                const res = await fetch('http://localhost:5000/api/petty-cash/stats');
                if (!res.ok) throw new Error('Failed to load petty cash stats');
                const stats = await res.json();
                
                const availableEl = document.getElementById('petty-available-value');
                const expenseEl = document.getElementById('monthly-expense-value');
                const replenishEl = document.getElementById('monthly-replenish-value');
                
                if (availableEl) {
                    availableEl.textContent = '₱' + Number(stats.available || 0).toLocaleString(undefined, {minimumFractionDigits: 2});
                }
                if (expenseEl) {
                    expenseEl.textContent = '₱' + Number(stats.monthly_expense || 0).toLocaleString(undefined, {minimumFractionDigits: 2});
                }
                if (replenishEl) {
                    replenishEl.textContent = stats.monthly_replenish || 0;
                }
            } catch (err) {
                console.error('Failed to load petty cash stats:', err);
            }
        };

        let allPendingPettyCash = [];

        const loadPendingPettyCashTransactions = async () => {
            const tbody = document.getElementById("pending-petty-tbody");
            if (!tbody) return;
            try {
                const res = await fetch("http://localhost:5000/api/petty-cash/status/Pending");
                if (!res.ok) throw new Error("Failed to load pending petty cash transactions");
                const transactions = await res.json();
                allPendingPettyCash = transactions;
                renderPendingPettyCashTransactions(transactions);
            } catch (err) {
                console.error("Pending petty cash transactions error:", err);
                if (tbody) {
                    tbody.innerHTML = "<tr><td colspan='12' style='text-align: center; padding: 20px; color: #999;'>Failed to load pending transactions</td></tr>";
                }
            }
        };

        const renderPendingPettyCashTransactions = (transactions) => {
            const tbody = document.getElementById("pending-petty-tbody");
            if (!tbody) return;
            if (!transactions || transactions.length === 0) {
                tbody.innerHTML = "<tr><td colspan='12' style='text-align: center; padding: 20px; color: #999;'>No pending petty cash transactions found</td></tr>";
                return;
            }

            tbody.innerHTML = transactions.map(txn => {
                const code = txn.petty_cash_code || txn.petty_cash_id || "";
                const date = txn.date ? new Date(txn.date).toLocaleDateString() : "";
                const category = txn.pettycashcategory || "";
                const item = txn.item || "";
                const remarks = txn.remarks || "";
                const store = txn.store || "";
                const source = txn.source || "";
                const check = txn.check_number || "";
                const replenish = "₱" + Number(txn.replenish_amount || 0).toLocaleString(undefined, {minimumFractionDigits: 2});
                const amount = "₱" + Number(txn.amount || 0).toLocaleString(undefined, {minimumFractionDigits: 2});
                const status = txn.status || "Pending";
                const bg = status === "Paid" || status === "Approved" ? "#d4edda" : "#fff3cd";
                const color = status === "Paid" || status === "Approved" ? "#155724" : "#856404";
                return "<tr>" +
                    "<td>" + code + "</td>" +
                    "<td>" + date + "</td>" +
                    "<td>" + category + "</td>" +
                    "<td>" + item + "</td>" +
                    "<td>" + remarks + "</td>" +
                    "<td>" + store + "</td>" +
                    "<td>" + source + "</td>" +
                    "<td>" + check + "</td>" +
                    "<td>" + replenish + "</td>" +
                    "<td>" + amount + "</td>" +
                    "<td><span style='background: " + bg + "; color: " + color + "; padding: 2px 8px; border-radius: 4px; font-size: 12px; font-weight: 600;'>" + status + "</span></td>" +
                    "<td><button class='btn-primary approve-petty-btn' data-petty-id='" + code + "' style='padding: 4px 8px; font-size: 11px; cursor: pointer; background: #28a745; border-color: #28a745; color: white; margin-right: 4px;'>Approve</button> <button class='btn-danger reject-petty-btn' data-petty-id='" + code + "' style='padding: 4px 8px; font-size: 11px; cursor: pointer;'>Reject</button></td>" +
                "</tr>";
            }).join("");

            document.querySelectorAll(".approve-petty-btn").forEach(btn => {
                btn.addEventListener("click", async () => {
                    const pettyId = btn.getAttribute("data-petty-id");
                    if (!pettyId) return;
                    if (!confirm("Approve this petty cash transaction?")) return;
                    try {
                        const res = await fetch("http://localhost:5000/api/petty-cash/" + pettyId, {
                            method: "PUT",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify({ status: "Approved" })
                        });
                        if (!res.ok) throw new Error("Failed to approve transaction");
                        alert("Transaction " + pettyId + " approved successfully");
                        loadPendingPettyCashTransactions();
                        loadPettyCashTransactions();
                        loadPettyCashStats();
                    } catch (err) {
                        console.error("Approve error:", err);
                        alert(err.message || "Failed to approve transaction");
                    }
                });
            });

            document.querySelectorAll(".reject-petty-btn").forEach(btn => {
                btn.addEventListener("click", async () => {
                    const pettyId = btn.getAttribute("data-petty-id");
                    if (!pettyId) return;
                    if (!confirm("Reject this petty cash transaction?")) return;
                    try {
                        const res = await fetch("http://localhost:5000/api/petty-cash/" + pettyId, {
                            method: "PUT",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify({ status: "Rejected" })
                        });
                        if (!res.ok) throw new Error("Failed to reject transaction");
                        alert("Transaction " + pettyId + " rejected successfully");
                        loadPendingPettyCashTransactions();
                        loadPettyCashTransactions();
                        loadPettyCashStats();
                    } catch (err) {
                        console.error("Reject error:", err);
                        alert(err.message || "Failed to reject transaction");
                    }
                });
            });
        };


        const loadPettyCashTransactions = async () => {
            const tbody = document.getElementById('petty-tbody');
            if (!tbody) return;
            try {
                const res = await fetch('http://localhost:5000/api/petty-cash');
                if (!res.ok) throw new Error('Failed to load petty cash transactions');
                const transactions = await res.json();
                if (!transactions || transactions.length === 0) {
                    tbody.innerHTML = '<tr><td colspan="11" style="text-align: center; padding: 20px; color: #999;">No petty cash transactions found</td></tr>';
                    return;
                }
                tbody.innerHTML = transactions.map(txn => {
                    const code = txn.petty_cash_code || txn.petty_cash_id || "";
                    const date = txn.date ? new Date(txn.date).toLocaleDateString() : "";
                    const category = txn.pettycashcategory || "";
                    const item = txn.item || "";
                    const remarks = txn.remarks || "";
                    const store = txn.store || "";
                    const source = txn.source || "";
                    const check = txn.check_number || "";
                    const replenish = "₱" + Number(txn.replenish_amount || 0).toLocaleString(undefined, {minimumFractionDigits: 2});
                    const amount = "₱" + Number(txn.amount || 0).toLocaleString(undefined, {minimumFractionDigits: 2});
                    const status = txn.status || "Pending";
                    const bg = status === "Paid" || status === "Approved" ? "#d4edda" : "#fff3cd";
                    const color = status === "Paid" || status === "Approved" ? "#155724" : "#856404";
                    return "<tr>" +
                        "<td>" + code + "</td>" +
                        "<td>" + date + "</td>" +
                        "<td>" + category + "</td>" +
                        "<td>" + item + "</td>" +
                        "<td>" + remarks + "</td>" +
                        "<td>" + store + "</td>" +
                        "<td>" + source + "</td>" +
                        "<td>" + check + "</td>" +
                        "<td>" + replenish + "</td>" +
                        "<td>" + amount + "</td>" +
                        "<td><span style='background: " + bg + "; color: " + color + "; padding: 2px 8px; border-radius: 4px; font-size: 12px; font-weight: 600;'>" + status + "</span></td>" +
                    "</tr>";
                }).join("");
            } catch (err) {
                console.error('Failed to load petty cash transactions:', err);
                tbody.innerHTML = '<tr><td colspan="11" style="text-align: center; padding: 20px; color: #999;">Failed to load transactions</td></tr>';
            }
        };

        document.getElementById('save-petty-btn').onclick = async () => {
            const date = document.getElementById('petty-date').value;
            const category = document.getElementById('petty-category').value;
            const item = document.getElementById('petty-item').value;
            const remarks = document.getElementById('petty-remarks').value;
            const store = document.getElementById('petty-store').value;
            const amount = document.getElementById('petty-amount').value;
            const status = document.getElementById('petty-status').value;

            if (!date || !category || !item || !amount) {
                alert('Please fill in Date, Category, Item, and Amount');
                return;
            }

            try {
                const res = await fetch('http://localhost:5000/api/petty-cash', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ date, pettycashcategory: category, item, remarks, store, amount, status })
                });

                if (!res.ok) {
                    const errorData = await res.json().catch(() => ({}));
                    throw new Error(errorData.error || 'Failed to save petty cash transaction');
                }

                alert('Petty Cash Transaction saved successfully');
                closePettyModal();
                document.getElementById('petty-date').value = '';
                document.getElementById('petty-category').value = '';
                document.getElementById('petty-item').value = '';
                document.getElementById('petty-remarks').value = '';
                document.getElementById('petty-store').value = '';
                document.getElementById('petty-amount').value = '';
                document.getElementById('petty-status').value = 'Pending';
                loadPettyCashTransactions();
                loadPettyCashStats();
            } catch (err) {
                console.error('Save petty cash error:', err);
                alert(err.message || 'Failed to save petty cash transaction');
            }
        };

        const bulkModal = document.getElementById('bulk-upload-modal');
        const closeBulkModal = () => {
            bulkModal.classList.add('hidden');
            const bulkFileName = document.getElementById('bulk-file-name');
            if (bulkFileName) bulkFileName.textContent = '';
            if (bulkFileInput) bulkFileInput.value = '';
        };
        const bulkDropZone = document.getElementById('bulk-drop-zone');
        const bulkFileInput = document.getElementById('bulk-file-input');
        const bulkFileName = document.getElementById('bulk-file-name');
        const bulkPreview = document.getElementById('bulk-preview');
        const bulkPreviewTable = document.getElementById('bulk-preview-table');
        const saveBulkBtn = document.getElementById('save-bulk-btn');

        document.getElementById('bulk-upload-petty-btn').onclick = () => {
            bulkModal.classList.remove('hidden');
        };
        document.getElementById('close-bulk-upload-btn').onclick = closeBulkModal;
        document.getElementById('cancel-bulk-upload-btn').onclick = closeBulkModal;

        if (bulkDropZone) {
            bulkDropZone.addEventListener('click', () => {
                bulkFileInput?.click();
            });

            bulkDropZone.addEventListener('dragover', (e) => {
                e.preventDefault();
                bulkDropZone.style.borderColor = '#2563eb';
                bulkDropZone.style.background = '#eff6ff';
            });

            bulkDropZone.addEventListener('dragleave', () => {
                bulkDropZone.style.borderColor = '#cbd5e1';
                bulkDropZone.style.background = '#f8fafc';
            });

            bulkDropZone.addEventListener('drop', (e) => {
                e.preventDefault();
                bulkDropZone.style.borderColor = '#cbd5e1';
                bulkDropZone.style.background = '#f8fafc';
                const files = e.dataTransfer?.files;
                if (files && files.length > 0) {
                    bulkFileInput.files = files;
                    if (bulkFileName) bulkFileName.textContent = files[0].name;
                    renderBulkPreview(files[0]);
                }
            });
        }

        if (bulkFileInput) {
            bulkFileInput.addEventListener('change', () => {
                if (bulkFileInput.files && bulkFileInput.files.length > 0) {
                    if (bulkFileName) bulkFileName.textContent = bulkFileInput.files[0].name;
                    renderBulkPreview(bulkFileInput.files[0]);
                }
            });
        }

        const renderBulkPreview = (file) => {
            const previewContainer = document.getElementById('bulk-preview');
            const previewTable = document.getElementById('bulk-preview-table');
            if (!previewContainer || !previewTable || !file) return;

            const reader = new FileReader();
            reader.onload = (e) => {
                try {
                    const data = new Uint8Array(e.target.result);
                    const workbook = XLSX.read(data, { type: 'array' });
                    const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
                    const jsonData = XLSX.utils.sheet_to_json(firstSheet, { header: 1, raw: false, defval: '' });

                    if (!jsonData.length) {
                        previewTable.innerHTML = '<div style="padding: 20px; color: #999;">No data found in file</div>';
                        previewContainer.style.display = 'block';
                        return;
                    }

                    const headers = jsonData[0];
                    const rows = jsonData.slice(1);

                    let html = '<table style="width: 100%; border-collapse: collapse; font-size: 12px;">';
                    html += '<thead><tr>';
                    headers.forEach(h => {
                        html += '<th style="border: 1px solid #ddd; padding: 6px; background: #f4f4f4; font-weight: 600; text-align: left; white-space: nowrap;">' + (h || '') + '</th>';
                    });
                    html += '</tr></thead><tbody>';

                    rows.forEach(row => {
                        html += '<tr>';
                        headers.forEach((_, i) => {
                            let val = row[i] != null ? row[i] : '';
                            if (val && typeof val === 'string') {
                                val = val.trim();
                            }
                            html += '<td style="border: 1px solid #ddd; padding: 6px; text-align: left;">' + val + '</td>';
                        });
                        html += '</tr>';
                    });

                    html += '</tbody></table>';
                    previewTable.innerHTML = html;
                    previewContainer.style.display = 'block';
                } catch (err) {
                    console.error('Failed to parse file:', err);
                    previewTable.innerHTML = '<div style="padding: 20px; color: #dc2626;">Failed to parse file. Please ensure it is a valid Excel/CSV file.</div>';
                    previewContainer.style.display = 'block';
                }
            };

            reader.readAsArrayBuffer(file);
        };

        if (saveBulkBtn) {
            saveBulkBtn.onclick = async (e) => {
                e.preventDefault();
                e.stopPropagation();

                const file = bulkFileInput?.files?.[0];
                if (!file) {
                    alert('Please select a file first');
                    return;
                }

                try {
                    const data = new Uint8Array(await file.arrayBuffer());
                    const workbook = XLSX.read(data, { type: 'array' });
                    const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
                    const jsonData = XLSX.utils.sheet_to_json(firstSheet, { header: 1, raw: false, defval: '' });

                    if (!jsonData.length) {
                        alert('No data found in file');
                        return;
                    }

                    const headers = jsonData[0];
                    const rows = jsonData.slice(1);
                    const dateIdx = headers.findIndex(h => String(h).toLowerCase().includes('date'));
                    const categoryIdx = headers.findIndex(h => String(h).toLowerCase().includes('category'));
                    const itemIdx = headers.findIndex(h => String(h).toLowerCase().includes('item'));
                    const remarksIdx = headers.findIndex(h => String(h).toLowerCase().includes('remarks'));
                    const storeIdx = headers.findIndex(h => String(h).toLowerCase().includes('store'));
                    const amountIdx = headers.findIndex(h => String(h).toLowerCase().includes('amount'));
                    const statusIdx = headers.findIndex(h => String(h).toLowerCase().includes('status'));
                    const sourceIdx = headers.findIndex(h => String(h).toLowerCase().includes('source'));
                    const checkIdx = headers.findIndex(h => String(h).toLowerCase().includes('check'));
                    const replenishAmountIdx = headers.findIndex(h => String(h).toLowerCase().includes('replenish'));

                    if (dateIdx < 0 || amountIdx < 0) {
                        alert('File must contain at least Date and Amount columns');
                        return;
                    }

                    let savedCount = 0;
                    let failedCount = 0;

                    for (let i = 1; i < rows.length; i++) {
                        const row = rows[i];
                        try {
                            const date = row[dateIdx] || '';
                            const amount = row[amountIdx] || '';
                            const status = statusIdx >= 0 ? (row[statusIdx] || 'Pending') : 'Pending';
                            const category = categoryIdx >= 0 ? (row[categoryIdx] || '') : '';
                            const item = itemIdx >= 0 ? (row[itemIdx] || '') : '';
                            const remarks = remarksIdx >= 0 ? (row[remarksIdx] || '') : '';
                            const store = storeIdx >= 0 ? (row[storeIdx] || '') : '';
                            const source = sourceIdx >= 0 ? (row[sourceIdx] || '') : '';
                            const checkNumber = checkIdx >= 0 ? (row[checkIdx] || '') : '';
                            const replenishAmount = replenishAmountIdx >= 0 ? (row[replenishAmountIdx] || amount) : amount;

                            const typeIdx = headers.findIndex(h => String(h).toLowerCase().includes('type'));
                            const txnType = typeIdx >= 0 ? String(row[typeIdx] || '').toLowerCase() : '';
                            const isReplenishment = txnType === 'replenishment' || (txnType === '' && source && !category && !item);

                            if (isReplenishment) {
                                if (!date || !source || !replenishAmount) {
                                    failedCount++;
                                    continue;
                                }

                                const res = await fetch('http://localhost:5000/api/petty-cash/replenish', {
                                    method: 'POST',
                                    headers: { 'Content-Type': 'application/json' },
                                    body: JSON.stringify({ date, source, replenish_amount: replenishAmount, check_number: checkNumber, status })
                                });

                                if (!res.ok) {
                                    const errorData = await res.json().catch(() => ({}));
                                    throw new Error(errorData.error || 'Failed to save replenishment row');
                                }
                            } else {
                                if (!date || !category || !item || !amount) {
                                    failedCount++;
                                    continue;
                                }

                                const res = await fetch('http://localhost:5000/api/petty-cash', {
                                    method: 'POST',
                                    headers: { 'Content-Type': 'application/json' },
                                    body: JSON.stringify({ date, pettycashcategory: category, item, remarks, store, amount, status })
                                });

                                if (!res.ok) {
                                    const errorData = await res.json().catch(() => ({}));
                                    throw new Error(errorData.error || 'Failed to save row');
                                }
                            }
                            savedCount++;
                        } catch (err) {
                            console.error('Bulk save error:', err);
                            failedCount++;
                        }
                    }

                    alert('Bulk upload completed.\\nSaved: ' + savedCount + '\\nFailed: ' + failedCount);
                    closeBulkModal();
                    loadPettyCashTransactions();
                    loadPettyCashStats();
                } catch (err) {
                    console.error('Bulk upload error:', err);
                    alert(err.message || 'Failed to process file');
                }
            };
        }

        document.getElementById('download-template-btn').onclick = async () => {
            try {
                const [categoriesRes] = await Promise.all([
                    fetch('http://localhost:5000/api/expense-categories')
                ]);

                const categories = categoriesRes.ok ? await categoriesRes.json() : [];

                const transactionHeaders = ['Type', 'Date', 'Category', 'Item', 'Remarks', 'Store', 'Amount', 'Source', 'Check No.', 'Replenish Amount', 'Status'];
                const transactionData = [
                    transactionHeaders,
                    ['Expense', '2026-07-01', 'Office', 'Office Supplies', 'Printer ink', 'ABC Store', 1200.00, '', '', '', 'Approved'],
                    ['Replenishment', '2026-07-01', '', '', '', '', '', 'Bank Account - 1234', 'CHK-001', 5000.00, 'Pending']
                ];

                const categoryHeaders = ['Accounting Code', 'Expense Type', 'Remarks'];
                const categoryData = [categoryHeaders];
                if (Array.isArray(categories)) {
                    categories.forEach(cat => {
                        categoryData.push([
                            cat.accounting_code || '',
                            cat.expense_type || '',
                            cat.remarks || ''
                        ]);
                    });
                }

                const transactionSheet = XLSX.utils.aoa_to_sheet(transactionData);
                const categorySheet = XLSX.utils.aoa_to_sheet(categoryData);

                const workbook = XLSX.utils.book_new();
                XLSX.utils.book_append_sheet(workbook, transactionSheet, 'Transactions');
                XLSX.utils.book_append_sheet(workbook, categorySheet, 'Expense Categories');

                XLSX.writeFile(workbook, 'petty_cash_template.xlsx');
            } catch (err) {
                console.error('Failed to download template:', err);
                alert('Failed to download template');
            }
        };
        const pettySearch = document.getElementById('petty-search');
        const pettyTableRows = () => document.querySelectorAll('.petty-transactions-card tbody tr');
        pettySearch.addEventListener('input', () => {
            const q = pettySearch.value.trim().toLowerCase();
            pettyTableRows().forEach(row => {
                const match = row.textContent.toLowerCase().includes(q);
                row.style.display = match ? '' : 'none';
            });
        });

        const sortState = { col: null, dir: 1 };
        const applySort = () => {
            document.querySelectorAll('.petty-transactions-card th.sortable .sort-arrow').forEach(a => a.textContent = '⇅');
            if (!sortState.col) return;
            const colIndex = sortState.col === 'txn' ? 0 : 1;
            const tbody = document.querySelector('.petty-transactions-card tbody');
            const rows = Array.from(tbody.querySelectorAll('tr'));
            rows.sort((a, b) => {
                const va = a.children[colIndex].textContent.trim();
                const vb = b.children[colIndex].textContent.trim();
                if (sortState.col === 'txn') {
                    return va.localeCompare(vb, undefined, { numeric: true }) * sortState.dir;
                }
                return va.localeCompare(vb) * sortState.dir;
            });
            rows.forEach(r => tbody.appendChild(r));
            const arrow = document.querySelector(`.petty-transactions-card th.sortable[data-sort="${sortState.col}"] .sort-arrow`);
            if (arrow) arrow.textContent = sortState.dir === 1 ? '▲' : '▼';
        };
        document.querySelectorAll('.petty-transactions-card th.sortable').forEach(th => {
            th.onclick = () => {
                const col = th.dataset.sort;
                if (sortState.col === col) sortState.dir *= -1;
                else { sortState.col = col; sortState.dir = 1; }
                applySort();
            };
        });
        document.getElementById('close-petty-modal-btn').onclick = closePettyModal;
        document.getElementById('replenish-petty-btn').onclick = () => {
            replenishModal.classList.remove('hidden');
            loadBankAccounts();
        };
        const replenishModal = document.getElementById('replenish-modal');
        const closeReplenishModal = () => replenishModal.classList.add('hidden');
        document.getElementById('close-replenish-modal-btn').onclick = closeReplenishModal;

        const loadBankAccounts = async () => {
            const sourceSelect = document.getElementById('replenish-source');
            if (!sourceSelect) return;
            try {
                const res = await fetch('http://localhost:5000/api/bank-accounts');
                if (!res.ok) throw new Error('Failed to load bank accounts');
                const accounts = await res.json();
                const activeAccounts = accounts.filter(acc => acc.status === 'Active');
                sourceSelect.innerHTML = '<option value="">Select bank account</option>' + activeAccounts.map(acc => `<option value="${acc.bank_code}-${acc.bank_account_number}">${acc.bank_code} - ${acc.bank_account_number}</option>`).join('');
            } catch (err) {
                console.error('Failed to load bank accounts:', err);
                sourceSelect.innerHTML = '<option value="">Failed to load bank accounts</option>';
            }
        };

        document.getElementById('save-replenish-btn').onclick = async () => {
            const date = document.getElementById('replenish-date').value;
            const amount = document.getElementById('replenish-amount').value;
            const source = document.getElementById('replenish-source').value;
            const check = document.getElementById('replenish-check').value;
            const status = document.getElementById('replenish-status').value;

            if (!date || !amount || !source) {
                alert('Please fill in Date, Replenish Amount, and Source');
                return;
            }

            try {
                const res = await fetch('http://localhost:5000/api/petty-cash/replenish', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        date,
                        source,
                        replenish_amount: amount,
                        check_number: check,
                        status: status || 'Pending'
                    })
                });

                if (!res.ok) {
                    const errorData = await res.json();
                    throw new Error(errorData.error || 'Failed to save replenishment');
                }

                closeReplenishModal();
                loadPettyCashTransactions();
                loadPettyCashStats();
            } catch (err) {
                console.error('Save replenishment error:', err);
                alert(err.message || 'Failed to save replenishment');
            }
        };

        document.getElementById('save-petty-btn').onclick = async () => {
            const date = document.getElementById('petty-date').value;
            const category = document.getElementById('petty-category').value;
            const item = document.getElementById('petty-item').value;
            const remarks = document.getElementById('petty-remarks').value;
            const store = document.getElementById('petty-store').value;
            const amount = document.getElementById('petty-amount').value;
            const status = document.getElementById('petty-status').value;

            if (!date || !category || !item || !amount) {
                alert('Please fill in Date, Category, Item, and Amount');
                return;
            }

            try {
                const res = await fetch('http://localhost:5000/api/petty-cash', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ date, pettycashcategory: category, item, remarks, store, amount, status })
                });

                if (!res.ok) {
                    const errorData = await res.json().catch(() => ({}));
                    throw new Error(errorData.error || 'Failed to save petty cash transaction');
                }

                alert('Petty Cash Transaction saved successfully');
                closePettyModal();
                document.getElementById('petty-date').value = '';
                document.getElementById('petty-category').value = '';
                document.getElementById('petty-item').value = '';
                document.getElementById('petty-remarks').value = '';
                document.getElementById('petty-store').value = '';
                document.getElementById('petty-amount').value = '';
                document.getElementById('petty-status').value = 'Pending';
                loadPettyCashTransactions();
                loadPettyCashStats();
            } catch (err) {
                console.error('Save petty cash error:', err);
                alert(err.message || 'Failed to save petty cash transaction');
            }
        };

        document.getElementById('download-template-btn').onclick = async () => {
            try {
                const [categoriesRes] = await Promise.all([
                    fetch('http://localhost:5000/api/expense-categories')
                ]);

                const categories = categoriesRes.ok ? await categoriesRes.json() : [];

                const transactionHeaders = ['Type', 'Date', 'Category', 'Item', 'Remarks', 'Store', 'Amount', 'Source', 'Check No.', 'Replenish Amount', 'Status'];
                const transactionData = [
                    transactionHeaders,
                    ['Expense', '2026-07-01', 'Office', 'Office Supplies', 'Printer ink', 'ABC Store', 1200.00, '', '', '', 'Approved'],
                    ['Replenishment', '2026-07-01', '', '', '', '', '', 'Bank Account - 1234', 'CHK-001', 5000.00, 'Pending']
                ];

                const categoryHeaders = ['Accounting Code', 'Expense Type', 'Remarks'];
                const categoryData = [categoryHeaders];
                if (Array.isArray(categories)) {
                    categories.forEach(cat => {
                        categoryData.push([
                            cat.accounting_code || '',
                            cat.expense_type || '',
                            cat.remarks || ''
                        ]);
                    });
                }

                const transactionSheet = XLSX.utils.aoa_to_sheet(transactionData);
                const categorySheet = XLSX.utils.aoa_to_sheet(categoryData);

                const workbook = XLSX.utils.book_new();
                XLSX.utils.book_append_sheet(workbook, transactionSheet, 'Transactions');
                XLSX.utils.book_append_sheet(workbook, categorySheet, 'Expense Categories');

                XLSX.writeFile(workbook, 'petty_cash_template.xlsx');
            } catch (err) {
                console.error('Failed to download template:', err);
                alert('Failed to download template');
            }
        };
    loadPettyCashTransactions();
    loadPendingPettyCashTransactions();
    loadPettyCashStats();



};
function initializeModule(contentArea) {
    const currentTab = window.__currentTabId || 'operations';
    const render = ModuleComponents[currentTab] || ModuleComponents['operations'];
    render(contentArea);
}
