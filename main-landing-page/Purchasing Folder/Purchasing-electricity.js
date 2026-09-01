if (typeof ModuleComponents === 'undefined') { window.ModuleComponents = {}; }

ModuleComponents['purchasing-electricity'] = (container) => {
        container.innerHTML = `
            <div class="electricity-grid-layout">
                <div class="sidebar-metrics">
                    <div class="sidebar-metrics-header">
                        <h2>Electricity Bills</h2>
                    </div>
                    <div class="action-buttons-row">
                        <button id="add-bill-btn" class="btn-icon-circle">
                            <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                            <span class="btn-label">Add Electric Bill</span>
                        </button>
                        <button id="add-solar-btn" class="btn-icon-circle">
                            <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                            <span class="btn-label">Add Solar Data</span>
                        </button>
                    </div>
                    <div class="tracking-cards-row">
                        <div class="card tracking-card">
                            <h3>Meter Readings</h3>
                            <p class="card-sub-label">View and record meter readings.</p>
                            <div class="card-value-row">
                                <div class="card-value" id="meter-reading-value">-</div>
                                <span id="meter-reading-trend" class="trend-up">-</span>
                            </div>
                            <p class="vs-last-month">VS last month</p>
                        </div>
                        <div class="card tracking-card">
                            <h3>Electricity Expense</h3>
                            <p class="card-sub-label">Electric Expense this Month</p>
                            <div class="card-value-row">
                                <div class="card-value" id="expense-value">-</div>
                                <span id="expense-trend" class="trend-up">-</span>
                            </div>
                            <p class="vs-last-month">VS last month</p>
                        </div>
                        <div class="card tracking-card wide-card">
                            <h3>Tarlac II Electric Cooperative Inc.</h3>
                            <p>Dolores, Capas, Tarlac, Philippines</p>
                            <p> VAT Reg TIN: 000-543-815-00001</p>
                            <p>Company ID: 02ICS-6950</p>
                        </div>
                    </div>
                </div>
                <div class="charts-area">
                    <div class="card graph-placeholder">
                        <h3>Electricity Usage Yearly Comparison</h3>
                        <div class="chart-legend">
                            <span class="yc-legend-item"><span class="yc-legend-color yc-2024"></span> 2024</span>
                            <span class="yc-legend-item"><span class="yc-legend-color yc-2025"></span> 2025</span>
                            <span class="yc-legend-item"><span class="yc-legend-color yc-2026"></span> 2026</span>
                        </div>
                        <div class="monthly-comparison-chart">
                            <div class="chart-box">
                                <div class="chart-body">
                                <div class="y-axis" id="kwh-y-axis">
                                    <span>0</span>
                                    <span>0</span>
                                    <span>0</span>
                                    <span>0</span>
                                    <span>0</span>
                                    <span>0</span>
                                </div>
                                <div class="chart-plot">
                                    <div class="grid-lines">
                                        <div class="grid-line"></div>
                                        <div class="grid-line"></div>
                                        <div class="grid-line"></div>
                                        <div class="grid-line"></div>
                                        <div class="grid-line"></div>
                                        <div class="grid-line"></div>
                                    </div>
                                    <div class="bars-area" id="kwh-bars-area">
                                    </div>
                                </div>
                            </div>
                            <div class="chart-name">KWH</div>
                            </div>
                            <div class="chart-box">
                                <div class="chart-body">
                                <div class="y-axis" id="amount-y-axis">
                                    <span>0</span>
                                    <span>0</span>
                                    <span>0</span>
                                    <span>0</span>
                                    <span>0</span>
                                    <span>0</span>
                                </div>
                                <div class="chart-plot">
                                    <div class="grid-lines">
                                        <div class="grid-line"></div>
                                        <div class="grid-line"></div>
                                        <div class="grid-line"></div>
                                        <div class="grid-line"></div>
                                        <div class="grid-line"></div>
                                        <div class="grid-line"></div>
                                    </div>
                                    <div class="bars-area" id="amount-bars-area">
                                    </div>
                                </div>
                            </div>
                            <div class="chart-name">Amount</div>
                            </div>
                        </div>
                        <div id="chart-tooltip" class="chart-tooltip" style="display: none;"></div>
                </div>
                </div>
            </div>
                </div>
                    <div class="card graph-placeholder electric-readings-card">
                        <h3>Electric Readings</h3>
                        <table class="data-table electric-readings-table">
                            <thead>
                                <tr>
                                    <th>Electric Bill ID</th>
                                    <th>Date</th>
                                    <th>Billing Start</th>
                                    <th>Billing End</th>
                                    <th>Demand</th>
                                    <th>KWH</th>
                                    <th>Rate/KWH</th>
                                    <th>Amount</th>
                                    <th>Status</th>
                                    <th>Created By</th>
                                    <th>Photo</th>
                                    <th>Payment</th>
                                    <th>Payment Date</th>
                                    <th>Payment Source</th>
                                    <th>Check Number</th>
                                </tr>
                            </thead>
                            <tbody id="electric-bills-table-body">
                                <tr><td colspan="15">Loading...</td></tr>
                            </tbody>
                        </table>
                        <div class="pagination" id="electric-bills-pagination"></div>
                    </div>
                </div>
                <div id="electricity-modal" class="modal hidden">
                    <div class="modal-content" style="max-width: 600px; width: 95%;">
                        <div class="modal-header-row">
                            <h3>Add Electric Bill</h3>
                            <button class="modal-close-btn" id="close-electricity-modal">&times;</button>
                        </div>
                        <div class="modal-field">
                            <label>Electric Bill Image</label>
                            <div id="electric-bill-upload-zone" style="border: 2px dashed #cbd5e1; border-radius: 8px; padding: 12px; text-align: center; cursor: pointer; background: #f8fafc; transition: border-color 0.2s, background 0.2s; position: relative;">
                                <div class="upload-zone-content" style="display: flex; flex-direction: column; align-items: center; gap: 8px;">
                                    <div class="upload-placeholder" style="color: #64748b; font-size: 14px;">
                                        <span>Drag & Drop or Click to Upload (JPG only, max 5MB, auto-compressed to under 1MB)</span>
                                    </div>
                                    <div class="upload-preview" style="display:none; flex-direction: column; align-items: center; gap: 8px; position: relative;">
                                        <img src="" alt="preview" style="max-width: 200px; max-height: 200px; object-fit: contain; border-radius: 4px; border: 1px solid #e2e8f0;">
                                        <button type="button" class="remove-upload-btn" style="position: absolute; top: -8px; right: -8px; background: #ef4444; color: #fff; border: none; border-radius: 50%; width: 24px; height: 24px; cursor: pointer; font-size: 14px; line-height: 1; display: flex; align-items: center; justify-content: center;">&times;</button>
                                    </div>
                                </div>
                                <input type="file" accept="image/jpeg,image/jpg" style="display:none">
                            </div>
                        </div>
                        <div class="modal-field">
                            <label>Date</label>
                            <input type="date" id="bill-date-input" />
                        </div>
                        <div class="modal-meta-row">
                            <div class="modal-field">
                                <label>Billing Period Start</label>
                                <input type="date" id="bill-period-start" />
                            </div>
                            <div class="modal-field">
                                <label>Billing Period End</label>
                                <input type="date" id="bill-period-end" />
                            </div>
                        </div>
                        <div class="modal-field">
                            <label>Demand</label>
                            <input type="number" placeholder="Demand" id="bill-demand-input" step="0.01" />
                        </div>
                        <div class="modal-field">
                            <label>KWH</label>
                            <input type="number" placeholder="KWH" id="bill-kwh-input" step="0.01" />
                        </div>
                        <div class="modal-field">
                            <label>Rate/KWH</label>
                            <input type="number" placeholder="Rate/KWH" id="bill-rate-input" step="0.01" />
                        </div>
                        <div class="modal-field">
                            <label>Amount</label>
                            <input type="number" placeholder="Amount (PHP)" id="bill-amount-input" step="0.01" />
                        </div>
                        <div class="modal-tab-actions">
                            <button id="save-bill-btn" class="btn-primary">Save</button>
                        </div>
                </div>
            </div>
            <div id="payment-modal" class="modal hidden">
                <div class="modal-content">
                    <div class="modal-header-row">
                        <h3>Record Payment</h3>
                        <button class="modal-close-btn" id="close-payment-modal">&times;</button>
                    </div>
                    <div class="modal-meta-row">
                        <div class="modal-field">
                            <label>Expense Code</label>
                            <input type="text" id="expense-code-input" value="5130" readonly />
                        </div>
                        <div class="modal-field">
                            <label>Expense Type</label>
                            <input type="text" id="expense-type-input" value="Direct Utilities & Energy" readonly />
                        </div>
                    </div>
                    <div class="modal-field">
                        <label>Payment Date</label>
                        <input type="date" id="payment-date-input" />
                    </div>
                    <div class="modal-field">
                        <label>Payment Source</label>
                        <select id="payment-source-input" class="modal-select">
                            <option value="">Select Bank Account</option>
                        </select>
                    </div>
                    <div class="modal-field">
                        <label>Check Number</label>
                        <input type="text" id="check-number-input" placeholder="Enter check number" />
                    </div>
                    <div class="modal-tab-actions">
                        <button id="save-payment-btn" class="btn-primary">Save</button>
                    </div>
                </div>
            </div>
            <div id="electric-photo-upload-modal" class="modal hidden" onclick="if(event.target===this)this.classList.add('hidden')">
                <div class="modal-content" style="max-width: 500px; width: 95%; background: #fff;">
                    <div class="modal-header-row">
                        <h3>Upload Electric Bill Photo</h3>
                        <button class="modal-close-btn" id="close-electric-photo-upload-modal" style="font-size: 36px; padding: 10px;" onclick="document.getElementById('electric-photo-upload-modal').classList.add('hidden');">&times;</button>
                    </div>
                    <div class="modal-field">
                        <label>Electric Bill Image</label>
                        <div id="electric-photo-upload-zone" style="border: 2px dashed #cbd5e1; border-radius: 8px; padding: 12px; text-align: center; cursor: pointer; background: #f8fafc; transition: border-color 0.2s, background 0.2s; position: relative;">
                            <div class="upload-zone-content" style="display: flex; flex-direction: column; align-items: center; gap: 8px;">
                                <div class="upload-placeholder" style="color: #64748b; font-size: 14px;">
                                    <span>Drag & Drop or Click to Upload (JPG only, max 5MB, auto-compressed to under 1MB)</span>
                                </div>
                                <div class="upload-preview" style="display:none; flex-direction: column; align-items: center; gap: 8px; position: relative;">
                                    <img src="" alt="preview" style="max-width: 200px; max-height: 200px; object-fit: contain; border-radius: 4px; border: 1px solid #e2e8f0;">
                                    <button type="button" class="remove-upload-btn" style="position: absolute; top: -8px; right: -8px; background: #ef4444; color: #fff; border: none; border-radius: 50%; width: 24px; height: 24px; cursor: pointer; font-size: 14px; line-height: 1; display: flex; align-items: center; justify-content: center;">&times;</button>
                                </div>
                            </div>
                            <input type="file" accept="image/jpeg,image/jpg" style="display:none">
                        </div>
                    </div>
                    <div class="modal-tab-actions">
                        <button id="save-electric-photo-btn" class="btn-primary">Save Photo</button>
                        <button id="remove-electric-photo-btn" class="btn-danger">Remove Photo</button>
                    </div>
                </div>
            </div>
        </div>
    `;

        document.getElementById('add-bill-btn').onclick = () => {
            const modal = document.getElementById('electricity-modal');
            const dateInput = document.getElementById('bill-date-input');
            if (dateInput) {
                const today = new Date();
                const year = today.getFullYear();
                const month = String(today.getMonth() + 1).padStart(2, '0');
                const day = String(today.getDate()).padStart(2, '0');
                dateInput.value = `${year}-${month}-${day}`;
            }
            modal.classList.remove('hidden');
        };

        const closeModalBtn = document.getElementById('close-electricity-modal');
        if (closeModalBtn) {
            closeModalBtn.onclick = () => {
                document.getElementById('electricity-modal').classList.add('hidden');
            };
        }

    document.getElementById('save-bill-btn').onclick = async () => {
        const dateInput = document.getElementById('bill-date-input');
        const periodStart = document.getElementById('bill-period-start');
        const periodEnd = document.getElementById('bill-period-end');
        const demandInput = document.getElementById('bill-demand-input');
        const kwhInput = document.getElementById('bill-kwh-input');
        const rateInput = document.getElementById('bill-rate-input');
        const amountInput = document.getElementById('bill-amount-input');

        const date = dateInput ? dateInput.value : '';
        const periodStartVal = periodStart ? periodStart.value : '';
        const periodEndVal = periodEnd ? periodEnd.value : '';
        const demand = demandInput ? demandInput.value : '';
        const kwh = kwhInput ? kwhInput.value : '';
        const rate = rateInput ? rateInput.value : '';
        const amount = amountInput ? amountInput.value : '';

        if (!date || !periodStartVal || !periodEndVal || !amount) {
            alert('Please fill in Date, Billing Period, and Amount');
            return;
        }

        let filePath = null;

        try {
            const idRes = await fetch('http://localhost:5000/api/electric-bills/next-id', {
                headers: { 'Authorization': `Bearer ${localStorage.getItem('goldenfield_auth_token')}` }
            });
            const idData = await idRes.json();
            const electricBillId = idData.electric_bill_id;

            if (electricBillFileBlob) {
                const formData = new FormData();
                const fileName = getElectricBillFileName(electricBillId, periodStartVal, periodEndVal);
                formData.append('file', electricBillFileBlob, fileName);
                const uploadRes = await fetch('http://localhost:5000/api/electric-bills/upload', {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('goldenfield_auth_token')}`
                    },
                    body: formData
                });
                if (!uploadRes.ok) {
                    const errData = await uploadRes.json().catch(() => ({}));
                    throw new Error(errData.error || 'Failed to upload file');
                }
                const uploadData = await uploadRes.json();
                filePath = uploadData.filePath;
            }

            const res = await fetch('http://localhost:5000/api/electric-bills', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('goldenfield_auth_token')}`
                },
                body: JSON.stringify({
                    electric_bill_id: electricBillId,
                    date: date || null,
                    billing_start: periodStartVal || null,
                    billing_end: periodEndVal || null,
                    demand: demand || 0,
                    kwh: kwh || 0,
                    rate_per_kwh: rate || 0,
                    amount: parseFloat(amount),
                    status: 'Pending',
                    file_path: filePath
                })
            });

            if (!res.ok) {
                const errData = await res.json().catch(() => ({}));
                throw new Error(errData.error || 'Failed to save electric bill');
            }

            alert('Electric bill saved successfully');
            document.getElementById('electricity-modal').classList.add('hidden');
            const zone = document.getElementById('electric-bill-upload-zone');
            if (zone && zone._clear) zone._clear();
            loadElectricBillsTable();
        } catch (err) {
            alert('Error: ' + err.message);
        }
    };

        let currentPaymentBillId = null;

        window.openPaymentModal = async (electricBillId, existingPaymentDate, existingPaymentSource, existingCheckNumber) => {
            currentPaymentBillId = electricBillId;
            const modal = document.getElementById('payment-modal');
            const dateInput = document.getElementById('payment-date-input');
            const sourceSelect = document.getElementById('payment-source-input');
            const checkInput = document.getElementById('check-number-input');

            const today = new Date();
            const year = today.getFullYear();
            const month = String(today.getMonth() + 1).padStart(2, '0');
            const day = String(today.getDate()).padStart(2, '0');
            const todayStr = `${year}-${month}-${day}`;
            if (dateInput) dateInput.value = existingPaymentDate && existingPaymentDate !== '-' ? existingPaymentDate : todayStr;
            if (checkInput) checkInput.value = existingCheckNumber && existingCheckNumber !== '-' ? existingCheckNumber : '';

            if (sourceSelect) {
                sourceSelect.innerHTML = '<option value="">Select Bank Account</option>';
                try {
                    const res = await fetch('http://localhost:5000/api/bank-accounts', {
                        headers: { 'Authorization': `Bearer ${localStorage.getItem('goldenfield_auth_token')}` }
                    });
                    if (res.ok) {
                        const accounts = await res.json();
                        accounts.forEach(acc => {
                            const option = document.createElement('option');
                            option.value = acc.bank_account_id;
                            option.textContent = `${acc.bank} - ${maskAccountNumber(acc.bank_account_number)}`;
                            if (acc.bank_account_id === existingPaymentSource) option.selected = true;
                            sourceSelect.appendChild(option);
                        });
                    }
                } catch (err) {
                    console.error('Failed to load bank accounts', err);
                }
            }

            modal.classList.remove('hidden');
        };

        const closePaymentModalBtn = document.getElementById('close-payment-modal');
        if (closePaymentModalBtn) {
            closePaymentModalBtn.onclick = () => {
                document.getElementById('payment-modal').classList.add('hidden');
            };
        }

        const paymentModal = document.getElementById('payment-modal');
        if (paymentModal) {
            paymentModal.addEventListener('click', (e) => {
                if (e.target === paymentModal) paymentModal.classList.add('hidden');
            });
        }

        document.getElementById('save-payment-btn').onclick = async () => {
            const paymentDate = document.getElementById('payment-date-input').value;
            const paymentSource = document.getElementById('payment-source-input').value;
            const checkNumber = document.getElementById('check-number-input').value;

            if (!paymentDate || !paymentSource) {
                alert('Please fill in Payment Date and Payment Source');
                return;
            }

            try {
                const res = await fetch(`http://localhost:5000/api/electric-bills/${encodeURIComponent(currentPaymentBillId)}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('goldenfield_auth_token')}`
                    },
                    body: JSON.stringify({
                        payment_date: paymentDate,
                        payment_source: paymentSource,
                        check_number: checkNumber,
                        status: 'Paid'
                    })
                });

                if (!res.ok) {
                    const errData = await res.json().catch(() => ({}));
                    throw new Error(errData.error || 'Failed to save payment');
                }

                const expenseRes = await fetch(`http://localhost:5000/api/expenses/by-tracking-id/${encodeURIComponent(currentPaymentBillId)}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('goldenfield_auth_token')}`
                    },
                    body: JSON.stringify({
                        account_source: paymentSource,
                        cleared_date: paymentDate,
                        status: 'Paid'
                    })
                });

                if (!expenseRes.ok) {
                    const expenseErr = await expenseRes.json().catch(() => ({}));
                    console.error('Failed to update expense:', expenseErr);
                }

                alert('Payment saved successfully');
                document.getElementById('payment-modal').classList.add('hidden');
                loadElectricBillsTable();
            } catch (err) {
                alert('Error: ' + err.message);
            }
        };
    };

    var electricBillFileBlob = null;
    var electricBillFileName = null;

function convertImageToWebP(dataUrl, quality = 0.85, maxWidth = null) {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => {
            const canvas = document.createElement('canvas');
            let width = img.naturalWidth;
            let height = img.naturalHeight;

            if (maxWidth && width > maxWidth) {
                const ratio = maxWidth / width;
                width = maxWidth;
                height = Math.round(img.naturalHeight * ratio);
            }

            canvas.width = width;
            canvas.height = height;
            const ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0, width, height);
            canvas.toBlob((blob) => {
                if (blob) {
                    resolve(blob);
                } else {
                    reject(new Error('Failed to convert image to WebP'));
                }
            }, 'image/webp', quality);
        };
        img.onerror = () => reject(new Error('Failed to load image for conversion'));
        img.src = dataUrl;
    });
}

async function processElectricBillFile(file) {
    const validTypes = ['image/jpeg', 'image/jpg'];
    const maxInputSize = 5 * 1024 * 1024;
    const maxOutputSize = 1 * 1024 * 1024;

    if (!validTypes.includes(file.type)) {
        throw new Error('Only JPG files are allowed.');
    }

    if (file.size > maxInputSize) {
        throw new Error('File size must not exceed 5MB.');
    }

    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = async (e) => {
            try {
                const dataUrl = e.target.result;
                const img = new Image();
                img.onload = async () => {
                    let quality = 0.9;
                    let maxWidth = img.naturalWidth;
                    let blob = await convertImageToWebP(dataUrl, quality, maxWidth);

                    while (blob.size > maxOutputSize && quality > 0.3) {
                        quality -= 0.1;
                        blob = await convertImageToWebP(dataUrl, quality, maxWidth);
                    }

                    while (blob.size > maxOutputSize && maxWidth > 800) {
                        maxWidth = Math.floor(maxWidth * 0.7);
                        quality = 0.85;
                        blob = await convertImageToWebP(dataUrl, quality, maxWidth);
                        while (blob.size > maxOutputSize && quality > 0.3) {
                            quality -= 0.1;
                            blob = await convertImageToWebP(dataUrl, quality, maxWidth);
                        }
                    }

                    if (blob.size > maxOutputSize) {
                        reject(new Error('Could not compress image below 1MB. Please use a smaller image.'));
                        return;
                    }
                    resolve({ blob, dataUrl });
                };
                img.onerror = () => reject(new Error('Failed to load image. Please try a different file.'));
                img.src = dataUrl;
            } catch (err) {
                reject(err);
            }
        };
        reader.onerror = () => reject(new Error('Failed to read file.'));
        reader.readAsDataURL(file);
    });
}

function setupElectricBillUploadZone() {
    const zone = document.getElementById('electric-bill-upload-zone');
    if (!zone) return;

    const input = zone.querySelector('input[type="file"]');
    const placeholder = zone.querySelector('.upload-placeholder');
    const preview = zone.querySelector('.upload-preview');
    const previewImg = preview ? preview.querySelector('img') : null;
    const removeBtn = preview ? preview.querySelector('.remove-upload-btn') : null;

    if (!input || !placeholder || !preview || !previewImg || !removeBtn) return;

    const showPreview = (dataUrl) => {
        previewImg.src = dataUrl;
        placeholder.style.display = 'none';
        preview.style.display = 'flex';
    };

    const clearPreview = () => {
        previewImg.src = '';
        placeholder.style.display = '';
        preview.style.display = 'none';
        input.value = '';
        electricBillFileBlob = null;
        electricBillFileName = null;
    };

    const handleFile = async (file) => {
        try {
            const result = await processElectricBillFile(file);
            electricBillFileBlob = result.blob;
            electricBillFileName = file.name;
            showPreview(result.dataUrl);
        } catch (err) {
            alert(err.message);
            clearPreview();
        }
    };

    zone.addEventListener('click', (e) => {
        if (e.target !== removeBtn && !removeBtn.contains(e.target)) {
            input.click();
        }
    });

    zone.addEventListener('dragenter', (e) => {
        e.preventDefault();
        e.stopPropagation();
        zone.style.borderColor = '#2563eb';
        zone.style.background = 'rgba(37, 99, 235, 0.05)';
    });

    zone.addEventListener('dragover', (e) => {
        e.preventDefault();
        e.stopPropagation();
    });

    zone.addEventListener('dragleave', (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (!zone.contains(e.relatedTarget)) {
            zone.style.borderColor = '#cbd5e1';
            zone.style.background = '#f8fafc';
        }
    });

    zone.addEventListener('drop', (e) => {
        e.preventDefault();
        e.stopPropagation();
        zone.style.borderColor = '#cbd5e1';
        zone.style.background = '#f8fafc';
        const files = e.dataTransfer.files;
        if (files.length > 0) {
            handleFile(files[0]);
        }
    });

    input.addEventListener('change', (e) => {
        if (e.target.files.length > 0) {
            handleFile(e.target.files[0]);
        }
    });

    removeBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        clearPreview();
    });

    zone._clear = clearPreview;
}

var API_BASE_ELECTRIC_BILLS = 'http://localhost:5000/api/electric-bills';

var electricBillsData = [];
var electricBillsCurrentPage = 1;
var ELECTRIC_BILLS_PER_PAGE = 10;

function formatDate(dateValue) {
    if (!dateValue) return '-';
    const d = new Date(dateValue);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

function getElectricBillFileName(billId, billingStart, billingEnd) {
    const start = billingStart ? formatDate(billingStart).replace(/-/g, '') : '';
    const end = billingEnd ? formatDate(billingEnd).replace(/-/g, '') : '';
    return `${billId}_${start}_${end}.webp`;
}

function maskAccountNumber(accountNumber) {
    if (!accountNumber) return '';
    const str = String(accountNumber);
    if (str.length <= 5) return str;
    const first3 = str.slice(0, 3);
    const last2 = str.slice(-2);
    const middle = '*'.repeat(str.length - 5);
    return first3 + middle + last2;
}

async function loadElectricBillsTable() {
    const tbody = document.getElementById('electric-bills-table-body');
    if (!tbody) return;
    
    try {
        const res = await fetch(`${API_BASE_ELECTRIC_BILLS}`, {
            headers: { 'Authorization': `Bearer ${localStorage.getItem('goldenfield_auth_token')}` }
        });
        if (!res.ok) throw new Error('Failed to fetch electric bills');
        electricBillsData = await res.json();
        renderElectricBillsTable();
    } catch (err) {
        console.error('Failed to load electric bills', err);
        tbody.innerHTML = '<tr><td colspan="14" style="text-align:center; color: #e74c3c;">Failed to load data</td></tr>';
    }
}

function renderElectricBillsTable() {
    const tbody = document.getElementById('electric-bills-table-body');
    if (!tbody) return;
    
    const start = (electricBillsCurrentPage - 1) * ELECTRIC_BILLS_PER_PAGE;
    const end = start + ELECTRIC_BILLS_PER_PAGE;
    const pageData = electricBillsData.slice(start, end);
    
    let renderedRows = pageData.map(bill => `
        <tr>
            <td>${bill.electric_bill_id || '-'}</td>
            <td>${formatDate(bill.date)}</td>
            <td>${formatDate(bill.billing_start)}</td>
            <td>${formatDate(bill.billing_end)}</td>
            <td>${bill.demand || '-'}</td>
            <td>${bill.kwh || '-'}</td>
            <td>${bill.rate_per_kwh || '-'}</td>
            <td>₱${Number(bill.amount || 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
            <td>${bill.status || '-'}</td>
            <td>${bill.created_by_email || '-'}</td>
            <td><span class="photo-icon-wrap" data-receipt-path="${bill.file_path || ''}" data-bill-id="${bill.electric_bill_id || ''}" onclick="window._electricPhotoClick && window._electricPhotoClick(this)"><svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="${bill.file_path ? '#D4AF37' : '#800000'}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><path d="M21 15l-5-5L5 21"></path></svg></span></td>
            <td>
                <button class="btn-payment" onclick="openPaymentModal('${bill.electric_bill_id}', '${formatDate(bill.payment_date)}', '${bill.payment_source || ''}', '${bill.check_number || ''}')" title="Add Payment">
                    <svg viewBox="0 0 24 24" fill="none" stroke="#1ea672" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="5" width="20" height="14" rx="2"></rect><line x1="2" y1="10" x2="22" y2="10"></line></svg>
                </button>
            </td>
            <td>${formatDate(bill.payment_date)}</td>
            <td>${bill.bank ? bill.bank + ' - ' + maskAccountNumber(bill.bank_account_number) : (bill.payment_source || '-')}</td>
            <td>${bill.check_number || '-'}</td>
        </tr>
    `).join('');
    
    const emptyRowsNeeded = ELECTRIC_BILLS_PER_PAGE - pageData.length;
    for (let i = 0; i < emptyRowsNeeded; i++) {
        renderedRows += `<tr class="empty-row"><td colspan="15" style="height: 48px; background: rgba(0,0,0,0.03);">&nbsp;</td></tr>`;
    }
    
    tbody.innerHTML = renderedRows;
    
    const totalPages = Math.max(1, Math.ceil(electricBillsData.length / ELECTRIC_BILLS_PER_PAGE));
    renderElectricBillsPagination(totalPages);
}

function renderElectricBillsPagination(totalPages) {
    const container = document.getElementById('electric-bills-pagination');
    if (!container || totalPages < 1) {
        if (container) container.innerHTML = '';
        return;
    }
    
    let html = '';
    html += `<button class="page-btn" ${electricBillsCurrentPage === 1 ? 'disabled' : ''} onclick="electricBillsCurrentPage--; renderElectricBillsTable();">&lt;</button>`;
    
    for (let i = 1; i <= totalPages; i++) {
        html += `<button class="page-btn ${i === electricBillsCurrentPage ? 'active' : ''}" onclick="electricBillsCurrentPage=${i}; renderElectricBillsTable();">${i}</button>`;
    }
    
    html += `<button class="page-btn" ${electricBillsCurrentPage >= totalPages ? 'disabled' : ''} onclick="electricBillsCurrentPage++; renderElectricBillsTable();">&gt;</button>`;
    
    container.innerHTML = html;
}

function formatNumber(num) {
    if (num >= 1000) {
        return (num / 1000).toFixed(1) + 'k';
    }
    return num.toString();
}

function renderChartBars(containerId, data, years, maxValue, type) {
    const container = document.getElementById(containerId);
    if (!container) return;

    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    let html = '';

    for (let m = 1; m <= 12; m++) {
        html += '<div class="month-col"><div class="bars">';
        years.forEach(year => {
            const value = data[year] && data[year][m] ? data[year][m] : 0;
            const heightPercent = maxValue > 0 ? (value / maxValue) * 100 : 0;
            const yearClass = 'yc-' + year;
            html += `<div class="bar ${yearClass}" style="height: ${heightPercent}%;" data-value="${value}" data-year="${year}" data-month="${months[m-1]}" data-type="${type}"></div>`;
        });
        html += '</div><span class="month-label">' + months[m - 1] + '</span></div>';
    }

    container.innerHTML = html;

    container.querySelectorAll('.bar').forEach(bar => {
        bar.addEventListener('mouseenter', function(e) {
            const value = this.getAttribute('data-value');
            const year = this.getAttribute('data-year');
            const month = this.getAttribute('data-month');
            const chartType = this.getAttribute('data-type');
            const tooltip = document.getElementById('chart-tooltip');
            if (!tooltip) return;

            const formattedValue = chartType === 'amount' 
                ? '₱' + Number(value).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
                : formatNumber(value);

            tooltip.innerHTML = `<div>${month} ${year}</div><div>${chartType === 'amount' ? 'Amount' : 'KWH'}: ${formattedValue}</div>`;
            tooltip.style.display = 'block';
            positionTooltip(e);
        });

        bar.addEventListener('mousemove', function(e) {
            positionTooltip(e);
        });

        bar.addEventListener('mouseleave', function() {
            const tooltip = document.getElementById('chart-tooltip');
            if (tooltip) tooltip.style.display = 'none';
        });
    });
}

function positionTooltip(e) {
    const tooltip = document.getElementById('chart-tooltip');
    if (!tooltip) return;

    const x = e.clientX + 12;
    const y = e.clientY - 12;

    tooltip.style.left = x + 'px';
    tooltip.style.top = y + 'px';
}

function updateYAxis(containerId, maxValue) {
    const container = document.getElementById(containerId);
    if (!container) return;

    const steps = 6;
    const stepValue = maxValue / steps;
    let html = '';
    for (let i = steps; i >= 0; i--) {
        const value = Math.round(stepValue * i);
        html += '<span>' + formatNumber(value) + '</span>';
    }
    container.innerHTML = html;
}

async function loadChartData() {
    try {
        const res = await fetch('http://localhost:5000/api/electric-bills/chart-data', {
            headers: { 'Authorization': `Bearer ${localStorage.getItem('goldenfield_auth_token')}` }
        });
        if (!res.ok) throw new Error('Failed to fetch chart data');
        const chartData = await res.json();

        const { years, kwh, amount } = chartData;

        const allKwhValues = years.flatMap(y => Object.values(kwh[y] || {}));
        const allAmountValues = years.flatMap(y => Object.values(amount[y] || {}));
        const maxKwh = Math.max(...allKwhValues, 1);
        const maxAmount = Math.max(...allAmountValues, 1);

        updateYAxis('kwh-y-axis', maxKwh);
        updateYAxis('amount-y-axis', maxAmount);

        renderChartBars('kwh-bars-area', kwh, years, maxKwh, 'kwh');
        renderChartBars('amount-bars-area', amount, years, maxAmount, 'amount');
    } catch (err) {
        console.error('Failed to load chart data', err);
    }
}

async function loadLatestComparison() {
    try {
        const res = await fetch('http://localhost:5000/api/electric-bills/latest-comparison', {
            headers: { 'Authorization': `Bearer ${localStorage.getItem('goldenfield_auth_token')}` }
        });
        if (!res.ok) throw new Error('Failed to fetch comparison data');
        const data = await res.json();

        const meterValueEl = document.getElementById('meter-reading-value');
        const meterTrendEl = document.getElementById('meter-reading-trend');
        const expenseValueEl = document.getElementById('expense-value');
        const expenseTrendEl = document.getElementById('expense-trend');

        if (meterValueEl && data.latest) {
            meterValueEl.textContent = data.latest.kwh.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + ' kWh';
            
            if (meterTrendEl && data.latest.month) {
                const sign = data.kwhTrend === 'up' ? '▲' : '▼';
                const absChange = Math.abs(data.kwhChange).toFixed(1);
                meterTrendEl.textContent = `${sign} ${absChange}%`;
                meterTrendEl.className = data.kwhTrend === 'up' ? 'trend-increase' : 'trend-decrease';
            }
        }

        if (expenseValueEl && data.latest) {
            expenseValueEl.textContent = '₱' + data.latest.amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
            
            if (expenseTrendEl && data.latest.month) {
                const sign = data.amountTrend === 'up' ? '▲' : '▼';
                const absChange = Math.abs(data.amountChange).toFixed(1);
                expenseTrendEl.textContent = `${sign} ${absChange}%`;
                expenseTrendEl.className = data.amountTrend === 'up' ? 'trend-increase' : 'trend-decrease';
            }
        }
    } catch (err) {
        console.error('Failed to load latest comparison', err);
    }
}

    var photoTooltip = document.createElement('div');
    photoTooltip.className = 'photo-preview-tooltip';
    photoTooltip.style.cssText = 'display:none; position:fixed; z-index:9999; background:#fff; border:1px solid #ddd; border-radius:6px; padding:6px; box-shadow:0 4px 12px rgba(0,0,0,0.15); pointer-events:none;';
    document.body.appendChild(photoTooltip);

    document.addEventListener('mouseover', (e) => {
        const wrap = e.target.closest('.photo-icon-wrap');
        if (!wrap) return;
        const src = wrap.getAttribute('data-receipt-path');
        if (!src) return;
        const fullSrc = src.startsWith('http') ? src : `http://localhost:5000${src}`;
        photoTooltip.innerHTML = `<img src="${fullSrc}" alt="preview" style="max-width: min(90vw, 1200px); max-height: 90vh; object-fit: contain; display: block;">`;
        photoTooltip.style.display = 'block';
        positionElectricPhotoTooltip();
    });

    document.addEventListener('mouseout', (e) => {
        const wrap = e.target.closest('.photo-icon-wrap');
        if (!wrap) return;
        photoTooltip.style.display = 'none';
    });

    document.addEventListener('mousemove', (e) => {
        if (photoTooltip.style.display === 'block') {
            positionElectricPhotoTooltip();
        }
    });

    function positionElectricPhotoTooltip() {
        const rect = photoTooltip.getBoundingClientRect();
        const left = Math.max(8, (window.innerWidth - rect.width) / 2);
        const top = Math.max(8, (window.innerHeight - rect.height) / 2);
        photoTooltip.style.left = left + 'px';
        photoTooltip.style.top = top + 'px';
    }

    var currentElectricPhotoBillId = null;
    var electricPhotoFileBlob = null;
    var electricPhotoFileName = null;

    window._electricPhotoClick = function(el) {
        const billId = el.getAttribute('data-bill-id');
        if (!billId) {
            alert('No bill ID found on this row');
            return;
        }
        currentElectricPhotoBillId = billId;
        const modal = document.getElementById('electric-photo-upload-modal');
        if (modal) {
            modal.classList.remove('hidden');
            const zone = document.getElementById('electric-photo-upload-zone');
            if (zone && zone._clear) zone._clear();
            if (photoTooltip) photoTooltip.style.display = 'none';
            document.addEventListener('keydown', function electricModalEsc(e) {
                if (e.key === 'Escape') {
                    modal.classList.add('hidden');
                    document.removeEventListener('keydown', electricModalEsc);
                }
            });
        } else {
            alert('Upload modal not found in DOM');
        }
    };

    function setupElectricPhotoModal() {
        const closeBtn = document.getElementById('close-electric-photo-upload-modal');
        const modal = document.getElementById('electric-photo-upload-modal');
        const saveBtn = document.getElementById('save-electric-photo-btn');
        
        if (closeBtn) {
            closeBtn.addEventListener('click', () => {
                if (modal) {
                    modal.classList.add('hidden');
                }
            });
        }
        
        if (modal) {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    modal.classList.add('hidden');
                }
            });
        }

        if (saveBtn) {
            saveBtn.addEventListener('click', async () => {
                if (!currentElectricPhotoBillId) return;
                if (!electricPhotoFileBlob) {
                    alert('Please select a photo first');
                    return;
                }
                try {
                    const bill = electricBillsData.find(b => b.electric_bill_id === currentElectricPhotoBillId);
                    const formData = new FormData();
                    const fileName = getElectricBillFileName(currentElectricPhotoBillId, bill ? bill.billing_start : null, bill ? bill.billing_end : null);
                    formData.append('file', electricPhotoFileBlob, fileName);
                    const uploadRes = await fetch('http://localhost:5000/api/electric-bills/upload', {
                        method: 'POST',
                        headers: { 'Authorization': `Bearer ${localStorage.getItem('goldenfield_auth_token')}` },
                        body: formData
                    });
                    if (!uploadRes.ok) {
                        const errData = await uploadRes.json().catch(() => ({}));
                        throw new Error(errData.error || 'Failed to upload photo');
                    }
                    const uploadData = await uploadRes.json();
                    const filePath = uploadData.filePath;

                    const updateRes = await fetch(`http://localhost:5000/api/electric-bills/${encodeURIComponent(currentElectricPhotoBillId)}`, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${localStorage.getItem('goldenfield_auth_token')}`
                        },
                        body: JSON.stringify({ file_path: filePath })
                    });
                    if (!updateRes.ok) {
                        const errData = await updateRes.json().catch(() => ({}));
                        throw new Error(errData.error || 'Failed to update photo');
                    }
                    alert('Photo updated successfully');
                    if (modal) modal.classList.add('hidden');
                    loadElectricBillsTable();
                } catch (err) {
                    alert('Error: ' + err.message);
                }
            });
        }

        const removeBtn = document.getElementById('remove-electric-photo-btn');
        if (removeBtn) {
            removeBtn.addEventListener('click', async () => {
                if (!currentElectricPhotoBillId) return;
                try {
                    const updateRes = await fetch(`http://localhost:5000/api/electric-bills/${encodeURIComponent(currentElectricPhotoBillId)}`, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${localStorage.getItem('goldenfield_auth_token')}`
                        },
                        body: JSON.stringify({ file_path: null })
                    });
                    if (!updateRes.ok) {
                        const errData = await updateRes.json().catch(() => ({}));
                        throw new Error(errData.error || 'Failed to remove photo');
                    }
                    alert('Photo removed successfully');
                    if (modal) modal.classList.add('hidden');
                    loadElectricBillsTable();
                } catch (err) {
                    alert('Error: ' + err.message);
                }
            });
        }
    }

    function setupElectricPhotoUploadZone() {
        const zone = document.getElementById('electric-photo-upload-zone');
        if (!zone) return;
        const input = zone.querySelector('input[type="file"]');
        const placeholder = zone.querySelector('.upload-placeholder');
        const preview = zone.querySelector('.upload-preview');
        const previewImg = preview ? preview.querySelector('img') : null;
        const removeBtn = preview ? preview.querySelector('.remove-upload-btn') : null;
        if (!input || !placeholder || !preview || !previewImg || !removeBtn) return;

        const showPreview = (dataUrl) => {
            previewImg.src = dataUrl;
            placeholder.style.display = 'none';
            preview.style.display = 'flex';
        };
        const clearPreview = () => {
            previewImg.src = '';
            placeholder.style.display = '';
            preview.style.display = 'none';
            input.value = '';
            electricPhotoFileBlob = null;
            electricPhotoFileName = null;
        };
        const handleFile = async (file) => {
            try {
                const result = await processElectricBillFile(file);
                electricPhotoFileBlob = result.blob;
                electricPhotoFileName = file.name;
                showPreview(result.dataUrl);
            } catch (err) {
                alert(err.message);
                clearPreview();
            }
        };
        zone.addEventListener('click', (e) => {
            if (e.target !== removeBtn && !removeBtn.contains(e.target)) {
                input.click();
            }
        });
        zone.addEventListener('dragover', (e) => {
            e.preventDefault();
            zone.style.borderColor = '#2563eb';
            zone.style.background = 'rgba(37, 99, 235, 0.05)';
        });
        zone.addEventListener('dragleave', () => {
            zone.style.borderColor = '#cbd5e1';
            zone.style.background = '#f8fafc';
        });
        zone.addEventListener('drop', (e) => {
            e.preventDefault();
            zone.style.borderColor = '#cbd5e1';
            zone.style.background = '#f8fafc';
            const files = e.dataTransfer.files;
            if (files.length > 0) handleFile(files[0]);
        });
        input.addEventListener('change', (e) => {
            if (e.target.files.length > 0) handleFile(e.target.files[0]);
        });
        removeBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            clearPreview();
        });
        zone._clear = clearPreview;
    }

    function initializeModule(contentArea) {
    const currentTab = window.__currentTabId || 'purchasing';
    const render = ModuleComponents[currentTab] || ModuleComponents['purchasing'];
    render(contentArea);
    loadElectricBillsTable();
    loadChartData();
    loadLatestComparison();
    setupElectricBillUploadZone();
    setupElectricPhotoModal();
    setupElectricPhotoUploadZone();
}

window.initializeModule = initializeModule;
