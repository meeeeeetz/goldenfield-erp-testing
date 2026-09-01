if (typeof ModuleComponents === 'undefined') { window.ModuleComponents = {}; }

ModuleComponents['hr-onboarding'] = (container) => {
        container.innerHTML = `
        <div class="header-actions">
            <h2>Onboarding</h2>
        </div>
        <style>
            .upload-zone {
                border: 2px dashed #cbd5e1;
                border-radius: 8px;
                padding: 12px;
                text-align: center;
                cursor: pointer;
                background: #f8fafc;
                transition: border-color 0.2s, background 0.2s;
                position: relative;
            }
            .upload-zone:hover {
                border-color: #94a3b8;
                background: #f1f5f9;
            }
            .upload-zone.drag-over {
                border-color: #2563eb;
                background: #eff6ff;
            }
            .upload-zone-content {
                display: flex;
                flex-direction: column;
                align-items: center;
                gap: 8px;
            }
            .upload-placeholder {
                color: #64748b;
                font-size: 14px;
            }
            .upload-preview {
                display: flex;
                flex-direction: column;
                align-items: center;
                gap: 8px;
                position: relative;
            }
            .upload-preview img {
                max-width: 200px;
                max-height: 200px;
                object-fit: contain;
                border-radius: 4px;
                border: 1px solid #e2e8f0;
            }
            .remove-upload-btn {
                position: absolute;
                top: -8px;
                right: -8px;
                background: #ef4444;
                color: #fff;
                border: none;
                border-radius: 50%;
                width: 24px;
                height: 24px;
                cursor: pointer;
                font-size: 14px;
                line-height: 1;
                display: flex;
                align-items: center;
                justify-content: center;
            }
            .remove-upload-btn:hover {
                background: #dc2626;
            }
            #crop-image {
                transform-origin: 0 0;
            }

            /* ID Creation Styles */
            #id-creation-container {
                display: flex;
                flex-direction: column;
                gap: 16px;
            }
            #id-employee-search {
                width: 100%;
                padding: 10px 12px;
                border: 1px solid #D6D6D6;
                border-radius: 6px;
                font-size: 14px;
                box-sizing: border-box;
            }
            #id-search-results {
                border: 1px solid #D6D6D6;
                border-radius: 6px;
                background: #fff;
                max-height: 200px;
                overflow-y: auto;
                display: none;
                position: relative;
                z-index: 10;
            }
            .id-search-item {
                padding: 10px 12px;
                cursor: pointer;
                border-bottom: 1px solid #f1f5f9;
                font-size: 14px;
            }
            .id-search-item:hover {
                background: #f1f5f9;
            }
            .id-search-item:last-child {
                border-bottom: none;
            }
            #id-preview-area {
                display: flex;
                flex-wrap: wrap;
                gap: 24px;
                justify-content: center;
                align-items: flex-start;
            }
            .id-card-wrapper {
                background: #fff;
                border: 1px solid #D6D6D6;
                border-radius: 8px;
                padding: 16px;
                box-shadow: 0 2px 8px rgba(0,0,0,0.08);
            }
            .id-card {
                width: 54mm;
                height: 86mm;
                background: #fff;
                border-radius: 6px;
                position: relative;
                overflow: hidden;
                font-family: Arial, sans-serif;
                color: #000;
                box-shadow: 0 1px 3px rgba(0,0,0,0.12);
                display: flex;
                flex-direction: column;
            }
            .id-card-front {
                border-right: none;
                position: relative;
                overflow: hidden;
            }
            .id-card-front::after {
                content: '';
                position: absolute;
                top: 0;
                right: 0;
                width: 40px;
                height: 100%;
                background: #C29B38;
                z-index: 0;
            }
            .id-card-back {
                border-left: 6px solid #C29B38;
            }
            .id-card-header {
                padding: 8px 10px;
                display: flex;
                justify-content: space-between;
                align-items: center;
                border-bottom: 1px solid #f1f5f9;
            }
            .id-card-header .brand {
                font-weight: 700;
                font-size: 9px;
                letter-spacing: 0.5px;
                text-transform: uppercase;
            }
            .id-card-photo-area {
                display: flex;
                justify-content: center;
                padding: 10px 0;
            }
            .id-card-photo {
                width: 1in;
                height: 1in;
                border: 2px solid #C29B38;
                border-radius: 4px;
                background: #f8fafc;
                display: flex;
                align-items: center;
                justify-content: center;
                overflow: hidden;
            }
            .id-card-photo img {
                width: 100%;
                height: 100%;
                object-fit: cover;
            }
            .id-card-body {
                padding: 4px 10px;
                flex: 1;
                display: flex;
                flex-direction: column;
                gap: 4px;
            }
            .id-card-name {
                font-size: 13px;
                font-weight: 700;
                text-transform: uppercase;
                line-height: 1.2;
            }
            .id-card-designation {
                font-size: 24px;
                font-weight: 700;
                text-transform: uppercase;
                writing-mode: vertical-rl;
                text-orientation: mixed;
                position: absolute;
                right: 2px;
                top: 50%;
                transform: translateY(-50%);
                letter-spacing: 0.5px;
                color: #fff;
                text-shadow: 0 0 2px rgba(0,0,0,0.3);
                z-index: 2;
                white-space: nowrap;
            }
            .id-card-field {
                font-size: 11px;
                display: flex;
                flex-direction: column;
                gap: 1px;
            }
            .id-card-field-label {
                font-weight: 700;
                color: #000;
                text-transform: uppercase;
                font-size: 10px;
                letter-spacing: 0.5px;
            }
            .id-card-field-value {
                color: #000;
                word-break: break-all;
            }
            .id-card-footer {
                padding: 8px 10px;
                display: flex;
                justify-content: space-between;
                align-items: flex-end;
                border-top: 1px solid #f1f5f9;
                position: relative;
            }
            .id-card-gold-accent {
                position: absolute;
                bottom: 0;
                left: 0;
                width: 28px;
                height: 28px;
                background: #C29B38;
                border-top-right-radius: 4px;
            }
            .id-card-back .terms {
                padding: 10px;
                font-size: 8px;
                line-height: 1.4;
                color: #000;
            }
            .id-card-back .terms-title {
                font-weight: 700;
                font-size: 10px;
                text-transform: uppercase;
                margin-bottom: 6px;
                display: flex;
                align-items: center;
                gap: 8px;
            }
            .id-card-back .terms-section {
                margin-bottom: 8px;
            }
            .id-card-back .terms-section-title {
                font-weight: 700;
                font-size: 8px;
                text-transform: uppercase;
                margin-bottom: 2px;
            }
            #id-generate-btn {
                align-self: flex-end;
                padding: 10px 20px;
                font-size: 14px;
            }
            @media print {
                .id-card-wrapper {
                    border: none;
                    box-shadow: none;
                    padding: 0;
                }
                .id-card {
                    box-shadow: none;
                    border: 1px solid #ddd;
                }
                body {
                    margin: 0;
                }
            }
        </style>
        <div class="action-buttons-row">
            <button id="new-application-btn" class="btn-icon-circle" type="button">
                <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                <span class="btn-label">New Application</span>
            </button>
        </div>
        <div id="new-application-modal" class="modal" style="display:none;">
            <div class="modal-content" style="max-width: 780px; width: 95%;">
                <div class="modal-header-row">
                    <h3>New Application</h3>
                    <button class="modal-close-btn" id="close-new-application-modal">&times;</button>
                </div>
                <form id="new-application-form" style="display: flex; flex-direction: column; gap: 10px;">
                    <div style="font-weight: 600; color: #1a1f2e;">1st Step - Personal Profile</div>
                    <div style="display: flex; align-items: center; gap: 8px;">
                        <label style="margin: 0; white-space: nowrap;">Employee ID :</label>
                        <input type="text" id="app-employee-id" value="GefiEmp-00001" readonly style="flex: 1; background: transparent; border: none; padding: 10px 0; color: #1a1f2e; font-size: 14px;">
                    </div>
                <div style="display: flex; flex-direction: column; gap: 6px;">
                        <div style="display: flex; gap: 4px;">
                            <div style="width: 25%; padding: 0; margin: 0;">
                                <label>Last Name</label>
                                <input type="text" id="app-last-name" placeholder="Enter last name" style="margin: 0; padding: 10px; width: 100%; box-sizing: border-box;">
                            </div>
                            <div style="width: 50%; padding: 0; margin: 0;">
                                <label>First Name</label>
                                <input type="text" id="app-first-name" placeholder="Enter first name" style="margin: 0; padding: 10px; width: 100%; box-sizing: border-box;">
                            </div>
                            <div style="width: 25%; padding: 0; margin: 0;">
                                <label>Middle Name</label>
                                <input type="text" id="app-middle-name" placeholder="Enter middle name" style="margin: 0; padding: 10px; width: 100%; box-sizing: border-box;">
        </div>
                    </div>
                    <label>Address</label>
                    <input type="text" id="app-address" placeholder="Enter address" style="width: 100%; box-sizing: border-box;">
                    <label>Email Address</label>
                    <input type="email" id="app-email" placeholder="example@domain.com" style="width: 100%; box-sizing: border-box;" oninput="validateEmail(this)">
                    <div style="display: flex; gap: 4px;">
                        <div style="flex: 1;">
                            <label>Contact Details</label>
                            <input type="text" id="app-contact" placeholder="+63 000-000-0000" style="width: 100%; box-sizing: border-box;">
                        </div>
                        <div style="flex: 1;">
                            <label>Birth Date</label>
                            <input type="text" id="app-birthdate" placeholder="00/00/0000" style="width: 100%; box-sizing: border-box;">
                        </div>
                    </div>
                    <div style="display: flex; gap: 4px;">
                        <div style="flex: 1; display: flex; align-items: center; gap: 6px;">
                            <label style="margin: 0; white-space: nowrap;">Gender</label>
                            <select id="app-gender" class="modal-select" style="flex: 1;">
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Secret">Secret</option>
                            </select>
                        </div>
                        <div style="flex: 1; display: flex; align-items: center; gap: 6px;">
                            <label style="margin: 0; white-space: nowrap;">Civil Status</label>
                            <select id="app-civil-status" class="modal-select" style="flex: 1;">
                                <option value="Single">Single</option>
                                <option value="Married">Married</option>
                                <option value="Widowed">Widowed</option>
                                <option value="Separated">Separated</option>
                            </select>
                        </div>
                    </div>
                    <div style="display: flex; gap: 6px;">
                        <div style="flex: 1;">
                            <label>Emergency Contact</label>
                            <input type="text" id="app-emergency-contact" placeholder="Enter emergency contact" style="width: 100%; box-sizing: border-box;">
                        </div>
                        <div style="flex: 1;">
                            <label>Emergency Contact Number</label>
                            <input type="text" id="app-emergency-number" placeholder="+63 000-000-0000" style="width: 100%; box-sizing: border-box;">
                        </div>
                    </div>
                    <button id="save-continue-btn" class="btn-primary" style="margin-top: 8px;" type="submit">Save and Continue</button>
                </form>
            </div>
        </div>

        <div id="employment-info-modal" class="modal" style="display:none;">
            <div class="modal-content" style="max-width: 780px; width: 95%;">
                <div class="modal-header-row">
                    <h3>2nd Step - Employment Information</h3>
                    <button class="modal-close-btn" id="close-employment-info-modal">&times;</button>
                </div>
                <div style="display: flex; flex-direction: column; gap: 6px;">
                    <div style="display: flex; align-items: center; gap: 8px;">
                        <label style="margin: 0; white-space: nowrap;">Employee ID :</label>
                        <input type="text" id="app-employee-id-2" readonly style="flex: 1; background: transparent; border: none; padding: 10px 0; color: #1a1f2e; font-size: 14px;">
                    </div>
                    <div style="display: flex; gap: 4px;">
                        <div style="flex: 1;">
                            <label>Date of Hire</label>
                            <input type="text" id="app-date-of-hire" placeholder="MM/DD/YYYY" style="width: 100%; box-sizing: border-box;">
                        </div>
                        <div style="flex: 1;">
                            <label>Employment Status</label>
                            <select id="app-employment-status" class="modal-select" style="width: 100%; box-sizing: border-box;">
                                <option value="Active" selected>Active</option>
                                <option value="Terminated">Terminated</option>
                                <option value="Resigned">Resigned</option>
                            </select>
                        </div>
                    </div>
                    <label>Social Security System ID No.</label>
                    <input type="text" id="app-sss" placeholder="XX-XXXXXXX-X">
                    <label>PhilHealth ID No.</label>
                    <input type="text" id="app-philhealth" placeholder="XX-XXXXXXXXX-X">
                    <label>Pag-IBIG No.</label>
                    <input type="text" id="app-pagibig" placeholder="XXXX-XXXX-XXXX">
                    <label>TIN No.</label>
                    <input type="text" id="app-tin" placeholder="XXX-XXX-XXX-XXX">
                    <button id="save-employment-btn" class="btn-primary" style="margin-top: 8px;" type="button">Save and Continue</button>
                </div>
            </div>
        </div>
        <div id="upload-documents-modal" class="modal" style="display:none; align-items: flex-start; padding-top: 20px; overflow-y: auto;">
            <div class="modal-content" style="max-width: 780px; width: 95%; max-height: 85vh; overflow-y: auto;">
                <div class="modal-header-row">
                    <h3>3rd Step - Upload Documents</h3>
                    <button class="modal-close-btn" id="close-upload-documents-modal">&times;</button>
                </div>
                <div style="display: flex; flex-direction: column; gap: 10px;">
                    <div style="display: flex; flex-direction: column; gap: 6px;">
                        <label>2x2 Pic</label>
                        <div class="upload-zone" data-doc-type="2x2-pic" data-label="2x2 Pic" data-square="true" data-base-id="doc-2x2-pic">
                            <div class="upload-zone-content">
                                <div class="upload-placeholder">
                                    <span>Drag & Drop or Click to Upload (JPG/PNG only)</span>
                                </div>
                                <div class="upload-preview" style="display:none">
                                    <img src="" alt="preview">
                                    <button type="button" class="remove-upload-btn">&times;</button>
                                </div>
                            </div>
                            <input type="file" accept="image/jpeg,image/png,image/jpg" style="display:none">
                        </div>
                    </div>
                    <div style="display: flex; flex-direction: column; gap: 6px;">
                        <div style="display: flex; justify-content: space-between; align-items: center;">
                            <label>Resume</label>
                            <button id="add-resume-page-btn" class="btn-primary" style="margin: 0; padding: 4px 10px; font-size: 12px;">Add page</button>
                        </div>
                        <div class="upload-zone" data-doc-type="resume" data-label="Resume" data-square="false" data-base-id="doc-resume">
                            <div class="upload-zone-content">
                                <div class="upload-placeholder">
                                    <span>Drag & Drop or Click to Upload (JPG/PNG only)</span>
                                </div>
                                <div class="upload-preview" style="display:none">
                                    <img src="" alt="preview">
                                    <button type="button" class="remove-upload-btn">&times;</button>
                                </div>
                            </div>
                            <input type="file" accept="image/jpeg,image/png,image/jpg" style="display:none">
                        </div>
                        <div id="resume-pages-container"></div>
                    </div>

                    <div style="display: flex; flex-direction: column; gap: 6px;">
                        <div style="display: flex; justify-content: space-between; align-items: center;">
                            <label>Birth Certificate</label>
                            <button id="add-birth-certificate-page-btn" class="btn-primary" style="margin: 0; padding: 4px 10px; font-size: 12px;">Add page</button>
                        </div>
                        <div class="upload-zone" data-doc-type="birth-certificate" data-label="Birth Certificate" data-square="false" data-base-id="doc-birth-certificate">
                            <div class="upload-zone-content">
                                <div class="upload-placeholder">
                                    <span>Drag & Drop or Click to Upload (JPG/PNG only)</span>
                                </div>
                                <div class="upload-preview" style="display:none">
                                    <img src="" alt="preview">
                                    <button type="button" class="remove-upload-btn">&times;</button>
                                </div>
                            </div>
                            <input type="file" accept="image/jpeg,image/png,image/jpg" style="display:none">
                        </div>
                        <div id="birth-certificate-pages-container"></div>
                    </div>
                    <div style="display: flex; flex-direction: column; gap: 6px;">
                        <label>Valid Gov ID</label>
                        <div class="upload-zone" data-doc-type="gov-id" data-label="Valid Gov ID" data-square="false" data-base-id="doc-gov-id">
                            <div class="upload-zone-content">
                                <div class="upload-placeholder">
                                    <span>Drag & Drop or Click to Upload (JPG/PNG only)</span>
                                </div>
                                <div class="upload-preview" style="display:none">
                                    <img src="" alt="preview">
                                    <button type="button" class="remove-upload-btn">&times;</button>
                                </div>
                            </div>
                            <input type="file" accept="image/jpeg,image/png,image/jpg" style="display:none">
                        </div>
                    </div>
                    <div style="display: flex; flex-direction: column; gap: 6px;">
                        <label>SSS Form</label>
                        <div class="upload-zone" data-doc-type="sss-form" data-label="SSS Form" data-square="false" data-base-id="doc-sss">
                            <div class="upload-zone-content">
                                <div class="upload-placeholder">
                                    <span>Drag & Drop or Click to Upload (JPG/PNG only)</span>
                                </div>
                                <div class="upload-preview" style="display:none">
                                    <img src="" alt="preview">
                                    <button type="button" class="remove-upload-btn">&times;</button>
                                </div>
                            </div>
                            <input type="file" accept="image/jpeg,image/png,image/jpg" style="display:none">
                        </div>
                    </div>
                    <div style="display: flex; flex-direction: column; gap: 6px;">
                        <label>PhilHealth Form</label>
                        <div class="upload-zone" data-doc-type="philhealth-form" data-label="PhilHealth Form" data-square="false" data-base-id="doc-philhealth">
                            <div class="upload-zone-content">
                                <div class="upload-placeholder">
                                    <span>Drag & Drop or Click to Upload (JPG/PNG only)</span>
                                </div>
                                <div class="upload-preview" style="display:none">
                                    <img src="" alt="preview">
                                    <button type="button" class="remove-upload-btn">&times;</button>
                                </div>
                            </div>
                            <input type="file" accept="image/jpeg,image/png,image/jpg" style="display:none">
                        </div>
                    </div>
                    <div style="display: flex; flex-direction: column; gap: 6px;">
                        <label>Pag-IBIG Form</label>
                        <div class="upload-zone" data-doc-type="pagibig-form" data-label="Pag-IBIG Form" data-square="false" data-base-id="doc-pagibig">
                            <div class="upload-zone-content">
                                <div class="upload-placeholder">
                                    <span>Drag & Drop or Click to Upload (JPG/PNG only)</span>
                                </div>
                                <div class="upload-preview" style="display:none">
                                    <img src="" alt="preview">
                                    <button type="button" class="remove-upload-btn">&times;</button>
                                </div>
                            </div>
                            <input type="file" accept="image/jpeg,image/png,image/jpg" style="display:none">
                        </div>
                    </div>
                    <div style="display: flex; flex-direction: column; gap: 6px;">
                        <label>TIN Form</label>
                        <div class="upload-zone" data-doc-type="tin-form" data-label="TIN Form" data-square="false" data-base-id="doc-tin">
                            <div class="upload-zone-content">
                                <div class="upload-placeholder">
                                    <span>Drag & Drop or Click to Upload (JPG/PNG only)</span>
                                </div>
                                <div class="upload-preview" style="display:none">
                                    <img src="" alt="preview">
                                    <button type="button" class="remove-upload-btn">&times;</button>
                                </div>
                            </div>
                            <input type="file" accept="image/jpeg,image/png,image/jpg" style="display:none">
                        </div>
                    </div>
                    <div style="display: flex; flex-direction: column; gap: 6px;">
                        <label>NBI Clearance</label>
                        <div class="upload-zone" data-doc-type="nbi-clearance" data-label="NBI Clearance" data-square="false" data-base-id="doc-nbi">
                            <div class="upload-zone-content">
                                <div class="upload-placeholder">
                                    <span>Drag & Drop or Click to Upload (JPG/PNG only)</span>
                                </div>
                                <div class="upload-preview" style="display:none">
                                    <img src="" alt="preview">
                                    <button type="button" class="remove-upload-btn">&times;</button>
                                </div>
                            </div>
                            <input type="file" accept="image/jpeg,image/png,image/jpg" style="display:none">
                        </div>
                    </div>
                    <div style="display: flex; flex-direction: column; gap: 6px;">
                        <label>PNP Clearance</label>
                        <div class="upload-zone" data-doc-type="pnp-clearance" data-label="PNP Clearance" data-square="false" data-base-id="doc-pnp">
                            <div class="upload-zone-content">
                                <div class="upload-placeholder">
                                    <span>Drag & Drop or Click to Upload (JPG/PNG only)</span>
                                </div>
                                <div class="upload-preview" style="display:none">
                                    <img src="" alt="preview">
                                    <button type="button" class="remove-upload-btn">&times;</button>
                                </div>
                            </div>
                            <input type="file" accept="image/jpeg,image/png,image/jpg" style="display:none">
                        </div>
                    </div>
                    <div style="display: flex; flex-direction: column; gap: 6px;">
                        <div style="display: flex; justify-content: space-between; align-items: center;">
                            <label>Medical Clearance</label>
                            <button id="add-medical-clearance-page-btn" class="btn-primary" style="margin: 0; padding: 4px 10px; font-size: 12px;">Add page</button>
                        </div>
                        <div class="upload-zone" data-doc-type="medical-clearance" data-label="Medical Clearance" data-square="false" data-base-id="doc-medical">
                            <div class="upload-zone-content">
                                <div class="upload-placeholder">
                                    <span>Drag & Drop or Click to Upload (JPG/PNG only)</span>
                                </div>
                                <div class="upload-preview" style="display:none">
                                    <img src="" alt="preview">
                                    <button type="button" class="remove-upload-btn">&times;</button>
                                </div>
                            </div>
                            <input type="file" accept="image/jpeg,image/png,image/jpg" style="display:none">
                        </div>
                        <div id="medical-clearance-pages-container"></div>
                    </div>
                    <div style="display: flex; flex-direction: column; gap: 6px;">
                        <label>Barangay Certificate</label>
                        <div class="upload-zone" data-doc-type="barangay-certificate" data-label="Barangay Certificate" data-square="false" data-base-id="doc-barangay">
                            <div class="upload-zone-content">
                                <div class="upload-placeholder">
                                    <span>Drag & Drop or Click to Upload (JPG/PNG only)</span>
                                </div>
                                <div class="upload-preview" style="display:none">
                                    <img src="" alt="preview">
                                    <button type="button" class="remove-upload-btn">&times;</button>
                                </div>
                            </div>
                            <input type="file" accept="image/jpeg,image/png,image/jpg" style="display:none">
                        </div>
                    </div>
                    <button id="save-documents-btn" class="btn-primary" style="margin-top: 8px;" type="button">Save and Continue</button>
                </div>
            </div>
        </div>
        <div id="crop-2x2-modal" class="modal" style="display:none; align-items: center; justify-content: center;">
            <div class="modal-content" style="max-width: 520px; width: 95%; text-align: center;">
                <div class="modal-header-row">
                    <h3>Crop 2x2 Picture</h3>
                    <button class="modal-close-btn" id="close-crop-2x2-modal">&times;</button>
                </div>
                <div style="display: flex; flex-direction: column; align-items: center; gap: 12px;">
                    <div style="position: relative; width: 320px; height: 320px; overflow: hidden; border-radius: 8px; border: 2px solid #cbd5e1; background: #000; cursor: grab;">
                        <img id="crop-image" src="" alt="crop" style="position: absolute; left: 0; top: 0; transform-origin: 0 0; user-select: none; pointer-events: none;">
                        <div style="position: absolute; inset: 0; border: 2px dashed #2563eb; box-sizing: border-box; pointer-events: none;"></div>
                    </div>
                    <div style="display: flex; gap: 10px; justify-content: center;">
                        <button id="confirm-crop-2x2-btn" class="btn-primary" type="button">Confirm Crop</button>
                        <button id="cancel-crop-2x2-btn" class="btn-danger" type="button">Cancel</button>
                    </div>
                </div>
            </div>
        </div>
        <div id="compensation-config-modal" class="modal" style="display:none;">
            <div class="modal-content" style="max-width: 780px; width: 95%; max-height: 95vh; overflow-y: auto; padding: 20px;">
                <div class="modal-header-row">
                    <h3>4th Step - Compensation Configuration</h3>
                    <button class="modal-close-btn" id="close-compensation-config-modal">&times;</button>
                </div>
                <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 4px;">
                    <label style="margin: 0; white-space: nowrap; font-weight: 600;">Employee ID:</label>
                    <span id="compensation-employee-id" style="font-size: 14px; color: #1a1f2e;"></span>
                </div>
                <div style="display: flex; flex-direction: column; gap: 10px;">
                    <div style="display: flex; gap: 8px; align-items: flex-start;">
                        <div style="flex: 1; display: flex; flex-direction: column; gap: 6px;">
                            <label>Shift Policy</label>
                            <select id="shift-policy" class="modal-select">
                                <option value="">Select Shift Policy</option>
                            </select>
                        </div>
                    </div>
                    <div style="display: flex; gap: 8px; align-items: flex-start;">
                        <div style="flex: 1; display: flex; flex-direction: column; gap: 6px;">
                            <label>Salary Pay mode</label>
                            <select id="salary-pay-mode" class="modal-select">
                                <option value="Daily">Daily</option>
                                <option value="Monthly">Monthly</option>
                                <option value="Per Job">Per Job</option>
                            </select>
                        </div>
                        <div style="flex: 1; display: flex; flex-direction: column; gap: 6px;">
                            <label>Salary</label>
                            <input type="number" id="salary-amount" placeholder="Input Amount" style="width: 100%; box-sizing: border-box;">
                        </div>
                    </div>
                    <div style="display: flex; gap: 8px; align-items: flex-start;">
                        <div style="flex: 1; display: flex; flex-direction: column; gap: 6px;">
                            <label>Allowance Pay mode</label>
                            <select id="allowance-pay-mode" class="modal-select">
                                <option value="Daily">Daily</option>
                                <option value="Monthly">Monthly</option>
                                <option value="Per Job">Per Job</option>
                            </select>
                        </div>
                        <div style="flex: 1; display: flex; flex-direction: column; gap: 6px;">
                            <label>Allowance</label>
                            <input type="number" id="allowance-amount" placeholder="Input Amount" style="width: 100%; box-sizing: border-box;">
                        </div>
                    </div>
                    <div style="display: flex; gap: 8px; align-items: flex-start;">
                        <div style="flex: 1; display: flex; flex-direction: column; gap: 6px;">
                            <label>Pay Frequency</label>
                            <select id="pay-frequency" class="modal-select">
                                <option value="Weekly">Weekly</option>
                                <option value="Semi monthly">Semi monthly</option>
                                <option value="Monthly">Monthly</option>
                            </select>
                        </div>
                        <div style="flex: 1; display: flex; flex-direction: column; gap: 6px;">
                            <label>Payout method</label>
                            <select id="payout-method" class="modal-select">
                                <option value="Cash">Cash</option>
                                <option value="Bank">Bank</option>
                                <option value="Wallet">Wallet</option>
                            </select>
                        </div>
                    </div>
                    <div style="display: flex; gap: 8px; align-items: flex-start;">
                        <div style="flex: 1; display: flex; flex-direction: column; gap: 6px;">
                            <label>Department</label>
                            <select id="compensation-department" class="modal-select">
                                <option value="">Select Department</option>
                            </select>
                        </div>
                        <div style="flex: 1; display: flex; flex-direction: column; gap: 6px;">
                            <label>Available Roles</label>
                            <select id="compensation-role" class="modal-select">
                                <option value="">Select Role</option>
                            </select>
                        </div>
                    </div>
                    </div>
                    <div style="display: flex; gap: 8px; align-items: flex-start;">
                        <div style="flex: 1; display: flex; flex-direction: column; gap: 6px;">
                            <label>SSS Contribution Mode</label>
                            <select id="sss-contribution-mode" class="modal-select">
                                <option value="Semi monthly">Semi monthly</option>
                                <option value="Monthly">Monthly</option>
                            </select>
                        </div>
                        <div style="flex: 1; display: flex; flex-direction: column; gap: 6px;">
                            <label>SSS Contribution Amount</label>
                            <input type="number" id="sss-contribution-amount" placeholder="Input Amount" style="width: 100%; box-sizing: border-box;">
                        </div>
                    </div>
                    <div style="display: flex; gap: 8px; align-items: flex-start;">
                        <div style="flex: 1; display: flex; flex-direction: column; gap: 6px;">
                            <label>SSS Loan Payment Mode</label>
                            <select id="sss-loan-mode" class="modal-select">
                                <option value="Semi monthly">Semi monthly</option>
                                <option value="Monthly">Monthly</option>
                            </select>
                        </div>
                        <div style="flex: 1; display: flex; flex-direction: column; gap: 6px;">
                            <label>SSS Loan Amount</label>
                            <input type="number" id="sss-loan-amount" placeholder="Input Amount" style="width: 100%; box-sizing: border-box;">
                        </div>
                    </div>
                    <div style="display: flex; gap: 8px; align-items: flex-start;">
                        <div style="flex: 1; display: flex; flex-direction: column; gap: 6px;">
                            <label>PhilHealth Contribution Mode</label>
                            <select id="philhealth-contribution-mode" class="modal-select">
                                <option value="Semi monthly">Semi monthly</option>
                                <option value="Monthly">Monthly</option>
                            </select>
                        </div>
                        <div style="flex: 1; display: flex; flex-direction: column; gap: 6px;">
                            <label>PhilHealth Contribution Amount</label>
                            <input type="number" id="philhealth-contribution-amount" placeholder="Input Amount" style="width: 100%; box-sizing: border-box;">
                        </div>
                    </div>
                    <div style="display: flex; gap: 8px; align-items: flex-start;">
                        <div style="flex: 1; display: flex; flex-direction: column; gap: 6px;">
                            <label>Pag-IBIG Contribution Mode</label>
                            <select id="pagibig-contribution-mode" class="modal-select">
                                <option value="Semi monthly">Semi monthly</option>
                                <option value="Monthly">Monthly</option>
                            </select>
                        </div>
                        <div style="flex: 1; display: flex; flex-direction: column; gap: 6px;">
                            <label>Pag-IBIG Contribution Amount</label>
                            <input type="number" id="pagibig-contribution-amount" placeholder="Input Amount" style="width: 100%; box-sizing: border-box;">
                        </div>
                    </div>
                    <div style="display: flex; gap: 8px; align-items: flex-start;">
                        <div style="flex: 1; display: flex; flex-direction: column; gap: 6px;">
                            <label>Pag-IBIG Loan Payment Mode</label>
                            <select id="pagibig-loan-mode" class="modal-select">
                                <option value="Semi monthly">Semi monthly</option>
                                <option value="Monthly">Monthly</option>
                            </select>
                        </div>
                        <div style="flex: 1; display: flex; flex-direction: column; gap: 6px;">
                            <label>Pag-IBIG Loan Amount</label>
                            <input type="number" id="pagibig-loan-amount" placeholder="Input Amount" style="width: 100%; box-sizing: border-box;">
                        </div>
                    </div>
                    <div style="display: flex; gap: 8px; align-items: flex-start;">
                        <div style="flex: 1; display: flex; flex-direction: column; gap: 6px;">
                            <label>Yearly Sick Leave</label>
                            <input type="number" id="yearly-sick-leave" placeholder="Input Days" style="width: 100%; box-sizing: border-box;">
                        </div>
                        <div style="flex: 1; display: flex; flex-direction: column; gap: 6px;">
                            <label>Yearly Vacation Leave</label>
                            <input type="number" id="yearly-vacation-leave" placeholder="Input Days" style="width: 100%; box-sizing: border-box;">
                        </div>
                    </div>
                    <button id="save-compensation-btn" class="btn-primary" style="margin-top: 8px;" type="button">Save</button>
                </div>
            </div>
        </div>
        <div id="congratulations-modal" class="modal" style="display:none;">
            <div class="modal-content" style="max-width: 520px; width: 95%; text-align: center;">
                <div class="modal-header-row">
                    <h3>Congratulations!</h3>
                    <button class="modal-close-btn" id="close-congratulations-modal">&times;</button>
                </div>
                <div style="padding: 20px; font-size: 15px; color: #1a1f2e;">
                    You have made a new Account.
                </div>
                <button id="close-congratulations-btn" class="btn-primary" style="margin-bottom: 8px;" type="button">Close</button>
            </div>
        </div>
        <div class="tracking-cards-row">
            <div class="card tracking-card">
                <h3>Monthly Onboarding</h3>
                <p class="card-sub-label">Successful onboarding process cleared for the month</p>
                <div class="card-value-row">
                    <div class="card-value">23 person</div>
                    <span class="trend-up">
                        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:middle;margin-right:2px;"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline><polyline points="17 6 23 6 23 12"></polyline></svg>
                        1%
                    </span>
                </div>
                <p class="vs-last-month">VS Last month</p>
            </div>
            <div class="card tracking-card">
                <h3>Pending Applications</h3>
                <p class="card-sub-label">Applications that lacks requirements or steps for the process</p>
                <div class="card-value-row">
                    <div class="card-value">3 applications</div>
                </div>
            </div>
            <div class="card tracking-card">
                <h3>Total Employees</h3>
                <p class="card-sub-label">Overall count of employees for the whole business</p>
                <div class="card-value-row">
                    <div class="card-value">50 Employees</div>
                </div>
            </div>
        </div>
        <div class="card" style="margin-top: 10px; padding: 20px;">
            <h3 style="margin: 0 0 16px 0; font-size: 16px; font-weight: 600; color: #1a1f2e;">Onboarding Documents</h3>
            <div id="onboarding-docs-tabs" style="display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 16px; border-bottom: 1px solid #e5e7eb; padding-bottom: 8px;">
                <button class="modal-tab active" data-doc-tab="employee-contract">Employee Contract</button>
                <button class="modal-tab" data-doc-tab="employment-bond">Employment Bond</button>
                <button class="modal-tab" data-doc-tab="housing-agreement">Employee Housing Agreement</button>
            </div>
            <div id="onboarding-docs-content" style="padding: 16px; background: #f3f4f6; border-radius: 6px; min-height: 120px;">
                <div id="onboarding-docs-toolbar" class="ql-toolbar ql-snow" style="display: none; border: 1px solid #D6D6D6; border-radius: 6px 6px 0 0; background: #fff; position: sticky; top: 0; z-index: 10;">
                    <span class="ql-formats">
                        <select class="ql-header" title="Heading">
                            <option value="1">Heading 1</option>
                            <option value="2">Heading 2</option>
                            <option value="3">Heading 3</option>
                            <option selected>Normal</option>
                        </select>
                    </span>
                    <span class="ql-formats">
                        <button class="ql-bold" title="Bold"></button>
                        <button class="ql-italic" title="Italic"></button>
                        <button class="ql-underline" title="Underline"></button>
                        <button class="ql-strike" title="Strikethrough"></button>
                    </span>
                    <span class="ql-formats">
                        <button class="ql-list" value="ordered" title="Ordered list"></button>
                        <button class="ql-list" value="bullet" title="Bullet list"></button>
                        <button class="ql-indent" value="-1" title="Decrease indent"></button>
                        <button class="ql-indent" value="+1" title="Increase indent"></button>
                    </span>
                    <span class="ql-formats">
                        <button class="ql-align" value="" title="Align left"></button>
                        <button class="ql-align" value="center" title="Align center"></button>
                        <button class="ql-align" value="right" title="Align right"></button>
                        <button class="ql-align" value="justify" title="Justify"></button>
                    </span>
                    <span class="ql-formats">
                        <button class="ql-clean" title="Clear formatting"></button>
                    </span>
                </div>
                <div id="onboarding-quill-editor" class="ql-container ql-snow" style="display: none; background: #fff; border: 1px solid #D6D6D6; border-top: none; border-radius: 0 0 6px 6px; min-height: 400px; font-size: 14px;">
                    <div id="onboarding-quill-inner" style="min-height: 400px; padding: 40px; max-width: 800px; margin: 0 auto; background: #fff; box-shadow: 0 1px 3px rgba(0,0,0,0.1);"></div>
                </div>
                <div id="onboarding-docs-placeholder" style="padding: 40px; text-align: center; color: #64748b; font-size: 14px;">
                    Select a document tab to view contents
                </div>
            </div>
            <div id="onboarding-docs-actions" style="display: none; gap: 8px; margin-top: 12px; justify-content: flex-end;">
                <button id="export-onboarding-html-btn" class="btn-secondary" type="button">Export HTML</button>
                <button id="export-onboarding-pdf-btn" class="btn-secondary" type="button">Export PDF</button>
                <button id="save-onboarding-doc-btn" class="btn-primary" type="button">Save Document</button>
            </div>
        </div>
        </div>
        <div class="card" style="margin-top: 10px; padding: 20px;">
            <h3 style="margin: 0 0 16px 0; font-size: 16px; font-weight: 600; color: #1a1f2e;">ID Creation</h3>
            <div id="id-creation-container">
                <input type="text" id="id-employee-search" placeholder="Search active employee..." autocomplete="off">
                <div id="id-search-results"></div>
                <div id="id-preview-area">
                    <div class="id-card-wrapper">
                        <div class="id-card id-card-front">
                            <div class="id-card-header">
                                <div class="brand">Goldenfield Egg Farm</div>
                            </div>
                            <div class="id-card-photo-area">
                                <div class="id-card-photo">
                                    <img id="id-front-photo" src="" alt="Photo" style="display:none;">
                                    <span id="id-front-photo-placeholder" style="font-size: 9px; color: #64748b; text-align: center; padding: 4px;">No Photo</span>
                                </div>
                            </div>
                            <div class="id-card-body">
                                <div class="id-card-name" id="id-front-name">EMPLOYEE NAME</div>
                            <div style="position: relative; flex: 1; overflow: visible;">
                                <div class="id-card-designation" id="id-front-designation">DESIGNATION / ROLE</div>
                            </div>
                                <div class="id-card-field">
                                    <span class="id-card-field-label">ID No</span>
                                    <span class="id-card-field-value" id="id-front-employee-id">GefiEmp-00001</span>
                                </div>
                                <div class="id-card-field">
                                    <span class="id-card-field-label">Email</span>
                                    <span class="id-card-field-value" id="id-front-email">employee@example.com</span>
                                </div>
                                <div class="id-card-field">
                                    <span class="id-card-field-label">Phone</span>
                                    <span class="id-card-field-value" id="id-front-phone">+63 900 000 0000</span>
                                </div>
                            </div>
                            <div class="id-card-footer">
                                <div class="id-card-gold-accent"></div>
                            </div>
                        </div>
                    </div>
                    <div class="id-card-wrapper">
                        <div class="id-card id-card-back">
                            <div class="id-card-header">
                                <div class="terms-title">
                                    <span style="display:inline-flex;align-items:center;justify-content:center;width:22px;height:22px;border-radius:50%;background:#C29B38;color:#fff;font-size:11px;font-weight:700;">G</span>
                                    TERMS & CONDITIONS
                                </div>
                                <div style="width: 4px; height: 100%; background: #C29B38; position: absolute; left: 0; top: 0; border-radius: 6px 0 0 6px;"></div>
                            </div>
                            <div class="terms">
                                <div class="terms-section">
                                    <div class="terms-section-title">Identification</div>
                                    <div>Employees are required to keep their ID badge visible or easily accessible during working hours to confirm identity when needed.</div>
                                </div>
                                <div class="terms-section">
                                    <div class="terms-section-title">Proper Use</div>
                                    <div>The ID badge is issued solely for company-related activities. It may not be lent, duplicated, or used for any non-official purpose.</div>
                                </div>
                                <div class="terms-section">
                                    <div class="terms-section-title">Security</div>
                                    <div>If the badge is misplaced or suspected to be compromised, report it immediately so access can be disabled.</div>
                                </div>
                            </div>
                            <div class="id-card-body" style="margin-top: auto;">
                                <div class="id-card-field">
                                    <span class="id-card-field-label">ID Number</span>
                                    <span class="id-card-field-value" id="id-back-employee-id">GefiEmp-00001</span>
                                </div>
                                <div class="id-card-field">
                                    <span class="id-card-field-label">Emergency Contact</span>
                                    <span class="id-card-field-value" id="id-back-emergency-contact">N/A</span>
                                </div>
                            </div>
                            <div class="id-card-footer" style="justify-content: flex-end;">
                                <div style="display: grid; grid-template-columns: repeat(3, 8px); grid-template-rows: repeat(3, 8px); gap: 3px;">
                                    <div style="background: #C29B38; border-radius: 1px;"></div>
                                    <div style="background: #C29B38; border-radius: 1px;"></div>
                                    <div style="background: #C29B38; border-radius: 1px;"></div>
                                    <div style="background: #C29B38; border-radius: 1px;"></div>
                                    <div style="background: #C29B38; border-radius: 1px;"></div>
                                    <div style="background: transparent;"></div>
                                    <div style="background: #C29B38; border-radius: 1px;"></div>
                                    <div style="background: #C29B38; border-radius: 1px;"></div>
                                    <div style="background: #C29B38; border-radius: 1px;"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <button id="id-generate-btn" class="btn-primary" type="button">Generate</button>
            </div>
        </div>
        </div>
        `;
    }

    function convertImageToWebP(dataUrl, quality = 0.85) {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.onload = () => {
                const canvas = document.createElement('canvas');
                canvas.width = img.naturalWidth;
                canvas.height = img.naturalHeight;
                const ctx = canvas.getContext('2d');
                ctx.drawImage(img, 0, 0);
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

    async function processDocumentFile(file, requireSquare = false) {
        const validTypes = ['image/jpeg', 'image/png', 'image/jpg'];
        if (!validTypes.includes(file.type)) {
            throw new Error('Only JPG and PNG files are allowed.');
        }

        const maxSize = 1 * 1024 * 1024;
        if (file.size > maxSize) {
            throw new Error('File size must not exceed 1MB.');
        }

        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = async (e) => {
                const dataUrl = e.target.result;
                const img = new Image();
                img.onload = async () => {
                    if (requireSquare) {
                        const tolerance = 0.05;
                        const ratio = img.naturalWidth / img.naturalHeight;
                        if (ratio < 1 - tolerance || ratio > 1 + tolerance) {
                            reject(new Error('2x2 picture must be a square image.'));
                            return;
                        }
                    }

                    let quality = 0.85;
                    let blob = await convertImageToWebP(dataUrl, quality);
                    while (blob.size > maxSize && quality > 0.3) {
                        quality -= 0.1;
                        blob = await convertImageToWebP(dataUrl, quality);
                    }

                    if (blob.size > maxSize) {
                        reject(new Error('Could not compress image below 1MB. Please use a smaller image.'));
                        return;
                    }

                    resolve({ blob, dataUrl, width: img.naturalWidth, height: img.naturalHeight });
                };
                img.onerror = () => reject(new Error('Failed to load image. Please try a different file.'));
                img.src = dataUrl;
            };
            reader.onerror = () => reject(new Error('Failed to read file.'));
            reader.readAsDataURL(file);
        });
    }

     function setupUploadZone(zone) {
         const input = zone.querySelector('input[type="file"]');
         const placeholder = zone.querySelector('.upload-placeholder');
         const preview = zone.querySelector('.upload-preview');
         const previewImg = preview ? preview.querySelector('img') : null;
         const removeBtn = zone.querySelector('.remove-upload-btn');

         if (!input || !placeholder || !preview || !previewImg || !removeBtn) return;

         const docType = zone.dataset.docType || '';
         const label = zone.dataset.label || 'Document';
         const requireSquare = zone.dataset.square === 'true';

         let processedBlob = null;
         let processedDataUrl = null;

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
             processedBlob = null;
             processedDataUrl = null;
         };

         const handleFile = async (file) => {
             if (requireSquare && typeof openCropModal2x2 === 'function') {
                 try {
                     const result = await openCropModal2x2(file);
                     processedBlob = result.blob;
                     processedDataUrl = result.dataUrl;
                     showPreview(result.dataUrl);
                 } catch (err) {
                     if (err.message !== 'Crop cancelled') {
                         alert(label + ': ' + err.message);
                     }
                     clearPreview();
                 }
                 return;
             }
             try {
                 const result = await processDocumentFile(file, requireSquare);
                 processedBlob = result.blob;
                 processedDataUrl = result.dataUrl;
                 showPreview(result.dataUrl);
             } catch (err) {
                 alert(label + ': ' + err.message);
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
             zone.classList.add('drag-over');
         });

         zone.addEventListener('dragover', (e) => {
             e.preventDefault();
             e.stopPropagation();
         });

         zone.addEventListener('dragleave', (e) => {
             e.preventDefault();
             e.stopPropagation();
             if (!zone.contains(e.relatedTarget)) {
                 zone.classList.remove('drag-over');
             }
         });

         zone.addEventListener('drop', (e) => {
             e.preventDefault();
             e.stopPropagation();
             zone.classList.remove('drag-over');
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

          zone._getProcessedFile = () => processedBlob;
          zone._getProcessedDataUrl = () => processedDataUrl;
          zone._clear = clearPreview;
      }

      function openCropModal2x2(file) {
          return new Promise((resolve, reject) => {
              const cropModal = document.getElementById('crop-2x2-modal');
              const cropImage = document.getElementById('crop-image');
              const confirmBtn = document.getElementById('confirm-crop-2x2-btn');
              const cancelBtn = document.getElementById('cancel-crop-2x2-btn');
              if (!cropModal || !cropImage || !confirmBtn || !cancelBtn) {
                  reject(new Error('Crop modal not found'));
                  return;
              }

              const reader = new FileReader();
              reader.onload = (e) => {
                  const img = new Image();
                  img.onload = () => {
                      cropImage.src = e.target.result;
                      cropModal.style.display = 'flex';

                      const cropSize = 320;
                      const container = cropImage.parentElement;
                      if (!container) {
                          cropModal.style.display = 'none';
                          reject(new Error('Crop container not found'));
                          return;
                      }

                      let scale = Math.max(cropSize / img.naturalWidth, cropSize / img.naturalHeight);
                      let offsetX = (cropSize - img.naturalWidth * scale) / 2;
                      let offsetY = (cropSize - img.naturalHeight * scale) / 2;

                      const applyTransform = () => {
                          cropImage.style.width = img.naturalWidth * scale + 'px';
                          cropImage.style.height = img.naturalHeight * scale + 'px';
                          cropImage.style.left = offsetX + 'px';
                          cropImage.style.top = offsetY + 'px';
                      };

                      applyTransform();

                      let isDragging = false;
                      let startX = 0;
                      let startY = 0;
                      let startLeft = 0;
                      let startTop = 0;

                      const onPointerDown = (ev) => {
                          isDragging = true;
                          startX = ev.clientX;
                          startY = ev.clientY;
                          startLeft = offsetX;
                          startTop = offsetY;
                          container.style.cursor = 'grabbing';
                      };

                      const onPointerMove = (ev) => {
                          if (!isDragging) return;
                          const dx = ev.clientX - startX;
                          const dy = ev.clientY - startY;
                          offsetX = startLeft + dx;
                          offsetY = startTop + dy;
                          applyTransform();
                      };

                      const onPointerUp = () => {
                          isDragging = false;
                          container.style.cursor = 'grab';
                      };

                      container.addEventListener('pointerdown', onPointerDown);
                      window.addEventListener('pointermove', onPointerMove);
                      window.addEventListener('pointerup', onPointerUp);

                      const cleanup = () => {
                          cropModal.style.display = 'none';
                          container.removeEventListener('pointerdown', onPointerDown);
                          window.removeEventListener('pointermove', onPointerMove);
                          window.removeEventListener('pointerup', onPointerUp);
                          confirmBtn.onclick = null;
                          cancelBtn.onclick = null;
                      };

                      cancelBtn.onclick = () => {
                          cleanup();
                          reject(new Error('Crop cancelled'));
                      };

                      confirmBtn.onclick = async () => {
                          cleanup();
                          try {
                              const canvas = document.createElement('canvas');
                              canvas.width = cropSize;
                              canvas.height = cropSize;
                              const ctx = canvas.getContext('2d');
                              ctx.drawImage(img, offsetX, offsetY, img.naturalWidth * scale, img.naturalHeight * scale);
                              const blob = await new Promise((res) => canvas.toBlob(res, 'image/webp', 0.85));
                              const dataUrl = canvas.toDataURL('image/webp', 0.85);
                              resolve({ blob, dataUrl });
                          } catch (err) {
                              reject(err);
                          }
                      };
                  };
                  img.onerror = () => reject(new Error('Failed to load image for crop'));
                  img.src = e.target.result;
              };
              reader.onerror = () => reject(new Error('Failed to read file for crop'));
              reader.readAsDataURL(file);
          });
      }

    function createUploadZoneHTML(docType, label, requireSquare, baseId, pageSuffix) {
        const suffix = pageSuffix ? ` - ${pageSuffix}` : '';
        const inputId = baseId + (pageSuffix ? `-page-${pageSuffix.replace(/\D/g, '')}` : '');
        return `
            <div class="upload-zone" data-doc-type="${docType}" data-label="${label}${suffix}" data-square="${requireSquare}" data-base-id="${baseId}">
                <div class="upload-zone-content">
                    <div class="upload-placeholder">
                        <span>Drag & Drop or Click to Upload (JPG/PNG only)</span>
                    </div>
                    <div class="upload-preview" style="display:none">
                        <img src="" alt="preview">
                        <button type="button" class="remove-upload-btn">&times;</button>
                    </div>
                </div>
                <input type="file" accept="image/jpeg,image/png,image/jpg" style="display:none">
            </div>
        `;
    }

    function setupMultiPageUploadZone(addBtnId, containerId, baseId, labelPrefix) {
        const addBtn = document.getElementById(addBtnId);
        const container = document.getElementById(containerId);
        if (!addBtn || !container) return;
        let pageCount = 1;

        addBtn.addEventListener('click', () => {
            pageCount++;
            const suffix = pageCount === 2 ? '2nd' : pageCount === 3 ? '3rd' : pageCount + 'th';
            const pageDiv = document.createElement('div');
            pageDiv.style.cssText = 'display: flex; flex-direction: column; gap: 6px; margin-top: 8px;';
            pageDiv.innerHTML = `
                <div style="display: flex; justify-content: space-between; align-items: center;">
                    <label>${labelPrefix} - ${suffix} Page</label>
                    <button class="btn-danger remove-resume-page-btn" style="margin: 0; padding: 4px 10px; font-size: 12px;">Remove</button>
                </div>
            `;
            const zoneContainer = document.createElement('div');
            zoneContainer.innerHTML = createUploadZoneHTML(baseId, labelPrefix, 'false', baseId, suffix + ' Page');
            pageDiv.appendChild(zoneContainer);
            container.appendChild(pageDiv);

            const newZone = zoneContainer.querySelector('.upload-zone');
            if (newZone) setupUploadZone(newZone);

            const removeBtn = pageDiv.querySelector('.remove-resume-page-btn');
            removeBtn.addEventListener('click', () => {
                const allPages = container.querySelectorAll(':scope > div');
                const isLastPage = allPages.length > 0 && allPages[allPages.length - 1] === pageDiv;
                if (!isLastPage) {
                    alert('You can only remove the last page.');
                    return;
                }
                pageDiv.remove();
                pageCount--;
            });
        });
    }

    function validateEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    function initializeModule(contentArea) {
    const currentTab = window.__currentTabId || 'human-resources';
    const render = ModuleComponents[currentTab] || ModuleComponents['human-resources'];
    if (typeof render !== 'function') {
        console.error('[MODULE RUNTIME ERROR]: render is not a function for tab:', currentTab);
        return;
    }
    render(contentArea);

    const newApplicationBtn = document.getElementById('new-application-btn');
    const newApplicationModal = document.getElementById('new-application-modal');
    const closeNewApplicationModal = document.getElementById('close-new-application-modal');

    const API_BASE = 'http://localhost:5000/api';

    if (typeof window.currentSession === 'undefined') {
        window.currentSession = {};
    }

    if (newApplicationBtn && newApplicationModal) {
        newApplicationBtn.addEventListener('click', async (e) => {
            e.preventDefault();
            e.stopPropagation();
            try {
                const res = await fetch(`${API_BASE}/employee-profiles/next-id`);
                if (res.ok) {
                    const data = await res.json();
                    const employeeIdInput = document.getElementById('app-employee-id');
                    if (employeeIdInput && data.employee_id) {
                        employeeIdInput.value = data.employee_id;
                    }
                }
            } catch (err) {
                console.error('Failed to fetch next employee ID:', err);
            }
            newApplicationModal.style.display = 'flex';
        });
    }

    if (closeNewApplicationModal && newApplicationModal) {
        closeNewApplicationModal.addEventListener('click', () => {
            newApplicationModal.style.display = 'none';
        });
    }

    if (newApplicationModal) {
        newApplicationModal.addEventListener('click', (e) => {
            if (e.target === newApplicationModal) {
                newApplicationModal.style.display = 'none';
            }
        });
    }

    const newApplicationForm = document.getElementById('new-application-form');
    const saveContinueBtn = document.getElementById('save-continue-btn');
    const employmentInfoModal = document.getElementById('employment-info-modal');
    const closeEmploymentInfoModal = document.getElementById('close-employment-info-modal');

    if (newApplicationForm && saveContinueBtn && employmentInfoModal) {
        newApplicationForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            if (saveContinueBtn.disabled) return;

            const profileData = {
                employee_id: document.getElementById('app-employee-id')?.value?.trim() || '',
                last_name: document.getElementById('app-last-name')?.value?.trim() || '',
                first_name: document.getElementById('app-first-name')?.value?.trim() || '',
                middle_name: document.getElementById('app-middle-name')?.value?.trim() || '',
                address: document.getElementById('app-address')?.value?.trim() || '',
                contact_details: document.getElementById('app-contact')?.value?.trim() || '',
                email_address: document.getElementById('app-email')?.value?.trim() || '',
                birthdate: document.getElementById('app-birthdate')?.value || '',
                gender: document.getElementById('app-gender')?.value || '',
                civil_status: document.getElementById('app-civil-status')?.value || '',
                emergency_contact: document.getElementById('app-emergency-contact')?.value?.trim() || '',
                emergency_contact_number: document.getElementById('app-emergency-number')?.value?.trim() || ''
            };

            if (!profileData.employee_id || !profileData.first_name || !profileData.last_name) {
                alert('Please fill in required fields: Employee ID, First Name, and Last Name.');
                return;
            }

            const emailInput = document.getElementById('app-email');
            if (emailInput && emailInput.value.trim() && !validateEmail(emailInput.value.trim())) {
                alert('Please enter a valid email address.');
                emailInput.focus();
                return;
            }

            const originalText = saveContinueBtn.innerText;
            saveContinueBtn.disabled = true;
            saveContinueBtn.innerText = 'Saving Profile...';

            try {
                const res = await fetch(`${API_BASE}/employee-profiles`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(profileData)
                });

                if (!res.ok) {
                    const errData = await res.json().catch(() => ({}));
                    throw new Error(errData.message || 'Failed to save employee profile');
                }

                const savedProfile = await res.json();

                window.currentSession.employee_id = savedProfile.employee_id || profileData.employee_id;
                window.currentSession.first_name = savedProfile.first_name || profileData.first_name;
                window.currentSession.last_name = savedProfile.last_name || profileData.last_name;

                const employeeId2 = document.getElementById('app-employee-id-2');
                if (employeeId2) employeeId2.value = window.currentSession.employee_id;

                if (typeof newApplicationModal !== 'undefined' && newApplicationModal) {
                    newApplicationModal.style.display = 'none';
                }

                employmentInfoModal.style.display = 'flex';

            } catch (err) {
                console.error('Save employee profile error:', err);
                alert('Step 1 Failed: ' + err.message);
            } finally {
                saveContinueBtn.disabled = false;
                saveContinueBtn.innerText = originalText;
            }
        });
    }

    if (closeEmploymentInfoModal && employmentInfoModal) {
        closeEmploymentInfoModal.addEventListener('click', () => {
            employmentInfoModal.style.display = 'none';
        });
    }

    if (employmentInfoModal) {
        employmentInfoModal.addEventListener('click', (e) => {
            if (e.target === employmentInfoModal) {
                employmentInfoModal.style.display = 'none';
            }
        });
    }

    const saveEmploymentBtn = document.getElementById('save-employment-btn');
    const uploadDocumentsModal = document.getElementById('upload-documents-modal');

    if (saveEmploymentBtn) {
        saveEmploymentBtn.addEventListener('click', async (e) => {
            e.preventDefault();
            e.stopPropagation();

            if (window.__step2Saving) {
                return;
            }
            window.__step2Saving = true;

            const employeeId = window.currentSession.employee_id || document.getElementById('app-employee-id-2')?.value;

            if (!employeeId) {
                alert('Step 2 Failed: Missing Employee ID session.');
                window.__step2Saving = false;
                return;
            }

            const originalText = saveEmploymentBtn.innerText;
            saveEmploymentBtn.disabled = true;
            saveEmploymentBtn.innerText = 'Saving & Creating Folder...';

            try {
                const updates = {
                    employee_id: employeeId,
                    date_of_hire: document.getElementById('app-date-of-hire')?.value?.trim() || '',
                    employment_status: document.getElementById('app-employment-status')?.value?.trim() || '',
                    sss_number: document.getElementById('app-sss')?.value?.trim() || '',
                    philhealth_number: document.getElementById('app-philhealth')?.value?.trim() || '',
                    pagibig_number: document.getElementById('app-pagibig')?.value?.trim() || '',
                    tin_number: document.getElementById('app-tin')?.value?.trim() || ''
                };

                const res = await fetch(`${API_BASE}/employee-profiles/${encodeURIComponent(employeeId)}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(updates)
                });

                if (!res.ok) {
                    const errData = await res.json().catch(() => ({}));
                    throw new Error(errData.message || 'Failed to update employment information');
                }

                const lastName = window.currentSession.last_name || document.getElementById('app-last-name')?.value?.trim() || 'Unknown';
                const firstName = window.currentSession.first_name || document.getElementById('app-first-name')?.value?.trim() || 'Employee';

                const folderRes = await fetch(`${API_BASE}/employee-profiles/create-folder`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        employee_id: employeeId,
                        last_name: lastName,
                        first_name: firstName
                    })
                });

                if (!folderRes.ok) {
                    const folderErr = await folderRes.json().catch(() => ({}));
                    throw new Error(folderErr.message || 'Backend failed to create storage folder');
                }

                if (employmentInfoModal) employmentInfoModal.style.display = 'none';
                if (uploadDocumentsModal) uploadDocumentsModal.style.display = 'flex';

            } catch (err) {
                console.error('Step 2 Failed:', err);
                alert('Step 2 Failed: ' + err.message);
            } finally {
                saveEmploymentBtn.disabled = false;
                saveEmploymentBtn.innerText = originalText;
                window.__step2Saving = false;
            }
        });
    }

    const closeUploadDocumentsModal = document.getElementById('close-upload-documents-modal');
    if (closeUploadDocumentsModal && uploadDocumentsModal) {
        closeUploadDocumentsModal.addEventListener('click', () => {
            uploadDocumentsModal.style.display = 'none';
        });
    }

    const closeCrop2x2Modal = document.getElementById('close-crop-2x2-modal');
    const crop2x2Modal = document.getElementById('crop-2x2-modal');
    if (closeCrop2x2Modal && crop2x2Modal) {
        closeCrop2x2Modal.addEventListener('click', () => {
            crop2x2Modal.style.display = 'none';
        });
    }

    if (uploadDocumentsModal) {
        uploadDocumentsModal.addEventListener('click', (e) => {
            if (e.target === uploadDocumentsModal) {
                uploadDocumentsModal.style.display = 'none';
            }
        });
    }

    const saveDocumentsBtn = document.getElementById('save-documents-btn');
    if (saveDocumentsBtn) {
        saveDocumentsBtn.addEventListener('click', async () => {
            try {
                const sourceEmpId = document.getElementById('app-employee-id-2') || document.getElementById('app-employee-id');
                const employeeId = sourceEmpId ? sourceEmpId.value.trim() : '';
                if (!employeeId) {
                    alert('Employee ID is missing.');
                    return;
                }

                const zones = document.querySelectorAll('#upload-documents-modal .upload-zone');
                if (zones.length === 0) {
                    alert('No document upload zones found.');
                    return;
                }

                const formData = new FormData();
                let hasUpload = false;

                for (const zone of zones) {
                    const blob = zone._getProcessedFile ? zone._getProcessedFile() : null;
                    if (!blob) continue;

                    const docType = zone.dataset.docType || 'document';
                    const label = zone.dataset.label || docType;
                    const fileName = `${employeeId}_${label}.webp`;

                    formData.append('files', blob, fileName);
                    formData.append('labels', label);
                    formData.append('docTypes', docType);
                    hasUpload = true;
                }

                if (!hasUpload) {
                    alert('Please upload at least one document.');
                    return;
                }

                formData.append('employeeId', employeeId);

                saveDocumentsBtn.disabled = true;
                saveDocumentsBtn.innerText = 'Saving Documents...';

                const res = await fetch('http://localhost:5000/api/employee-profiles/upload-documents', {
                    method: 'POST',
                    body: formData
                });

                if (!res.ok) {
                    const errData = await res.json().catch(() => ({}));
                    throw new Error(errData.error || 'Failed to save documents');
                }

                alert('Documents saved successfully!');
                openCompensationModal();
            } catch (err) {
                console.error('Save documents error:', err);
                alert('Save failed: ' + err.message);
            } finally {
                if (saveDocumentsBtn) {
                    saveDocumentsBtn.disabled = false;
                    saveDocumentsBtn.innerText = 'Save and Continue';
                }
            }
        });
    }

    const closeCompensationConfigModal = document.getElementById('close-compensation-config-modal');
    const compensationConfigModal = document.getElementById('compensation-config-modal');
    if (closeCompensationConfigModal && compensationConfigModal) {
        closeCompensationConfigModal.addEventListener('click', () => {
            compensationConfigModal.style.display = 'none';
        });
    }

    if (compensationConfigModal) {
        compensationConfigModal.addEventListener('click', (e) => {
            if (e.target === compensationConfigModal) {
                compensationConfigModal.style.display = 'none';
            }
        });
    }

    const congratulationsModal = document.getElementById('congratulations-modal');
    const closeCongratulationsModal = document.getElementById('close-congratulations-modal');
    const closeCongratulationsBtn = document.getElementById('close-congratulations-btn');
    if (closeCongratulationsModal && congratulationsModal) {
        closeCongratulationsModal.addEventListener('click', () => {
            congratulationsModal.style.display = 'none';
        });
    }
    if (closeCongratulationsBtn && congratulationsModal) {
        closeCongratulationsBtn.addEventListener('click', () => {
            congratulationsModal.style.display = 'none';
        });
    }
    if (congratulationsModal) {
        congratulationsModal.addEventListener('click', (e) => {
            if (e.target === congratulationsModal) {
                congratulationsModal.style.display = 'none';
            }
        });
    }

    const API_BASE_ORG_STRUCTURE = 'http://localhost:5000/api/organizational-structure';
    const compensationRoleSelect = document.getElementById('compensation-role');
    const compensationDepartmentSelect = document.getElementById('compensation-department');

    const populateCompensationDepartmentDropdown = async () => {
        if (!compensationDepartmentSelect) return;
        try {
            const res = await fetch('http://localhost:5000/api/organizational-units');
            if (!res.ok) throw new Error('Failed to fetch units');
            const units = await res.json();
            const activeUnits = (units || []).filter(u => (u.status || '').toLowerCase() === 'active');
            compensationDepartmentSelect.innerHTML = '<option value="">Select Department</option>' +
                activeUnits.map(u => `<option value="${u.unit_name}">${u.unit_name}</option>`).join('');
        } catch (err) {
            console.error('Failed to populate compensation department dropdown:', err);
            compensationDepartmentSelect.innerHTML = '<option value="">Select Department</option>';
        }
    };

    const populateCompensationRoleDropdown = async (orgUnitName) => {
        if (!compensationRoleSelect) return;
        try {
            const url = orgUnitName
                ? `${API_BASE_ORG_STRUCTURE}/unassigned-roles?org_unit_name=${encodeURIComponent(orgUnitName)}`
                : `${API_BASE_ORG_STRUCTURE}/unassigned-roles`;
            const res = await fetch(url);
            if (!res.ok) throw new Error('Failed to fetch unassigned roles');
            const roles = await res.json();
            compensationRoleSelect.innerHTML = '<option value="">Select Role</option>' +
                roles.map(r => `<option value="${r.org_unit_role_id}">${r.role_title || r.org_unit_role_id}</option>`).join('');
        } catch (err) {
            console.error('Failed to populate compensation role dropdown:', err);
            compensationRoleSelect.innerHTML = '<option value="">Select Role</option>';
        }
    };

    const shiftPolicySelect = document.getElementById('shift-policy');

    const populateShiftPolicyDropdown = async () => {
        if (!shiftPolicySelect) return;
        try {
            const res = await fetch('http://localhost:5000/api/shift-policies?status=Active');
            if (!res.ok) throw new Error('Failed to fetch shift policies');
            const policies = await res.json();
            shiftPolicySelect.innerHTML = '<option value="">Select Shift Policy</option>' +
                policies.map(p => `<option value="${p.shift_name}">${p.shift_name}</option>`).join('');
        } catch (err) {
            console.error('Failed to populate shift policy dropdown:', err);
            shiftPolicySelect.innerHTML = '<option value="">Select Shift Policy</option>';
        }
    };

    const openCompensationModal = async () => {
        if (uploadDocumentsModal) uploadDocumentsModal.style.display = 'none';
        if (compensationConfigModal) {
            const empIdEl = document.getElementById('compensation-employee-id');
            const sourceEmpId = document.getElementById('app-employee-id-2') || document.getElementById('app-employee-id');
            if (empIdEl && sourceEmpId) {
                empIdEl.textContent = sourceEmpId.value || '';
            }
            await populateCompensationDepartmentDropdown();
            await populateCompensationRoleDropdown();
            await populateShiftPolicyDropdown();
            compensationConfigModal.style.display = 'flex';
        }
    };

    if (compensationDepartmentSelect) {
        compensationDepartmentSelect.addEventListener('change', async () => {
            const selectedDepartment = compensationDepartmentSelect.value;
            await populateCompensationRoleDropdown(selectedDepartment || null);
        });
    }

    const saveCompensationBtn = document.getElementById('save-compensation-btn');
    if (saveCompensationBtn) {
        saveCompensationBtn.addEventListener('click', async () => {
            try {
                const sourceEmpId = document.getElementById('app-employee-id-2') || document.getElementById('app-employee-id');
                const employeeId = sourceEmpId ? sourceEmpId.value : '';
                if (!employeeId) {
                    alert('Employee ID is missing.');
                    return;
                }

                const nextIdRes = await fetch('http://localhost:5000/api/employee-compensations/next-id');
                if (!nextIdRes.ok) throw new Error('Failed to fetch next compensation ID');
                const nextIdData = await nextIdRes.json();
                const compensationId = nextIdData.compensation_id;

                const compensationData = {
                    compensation_id: compensationId,
                    employee_id: employeeId,
                    shift_policy: document.getElementById('shift-policy')?.value || null,
                    salary_pay_mode: document.getElementById('salary-pay-mode')?.value || 'Monthly',
                    salary_amount: document.getElementById('salary-amount')?.value || null,
                    allowance_pay_mode: document.getElementById('allowance-pay-mode')?.value || null,
                    allowance_amount: document.getElementById('allowance-amount')?.value || null,
                    pay_frequency: document.getElementById('pay-frequency')?.value || 'Monthly',
                    payout_method: document.getElementById('payout-method')?.value || 'Cash',
                    department: document.getElementById('compensation-department')?.value || null,
                    role: (document.getElementById('compensation-role')?.selectedOptions[0]?.textContent || '').trim() || null,
                    sss_contribution_mode: document.getElementById('sss-contribution-mode')?.value || null,
                    sss_contribution_amount: document.getElementById('sss-contribution-amount')?.value || null,
                    sss_loan_payment_mode: document.getElementById('sss-loan-mode')?.value || null,
                    sss_loan_amount: document.getElementById('sss-loan-amount')?.value || null,
                    philhealth_contribution_mode: document.getElementById('philhealth-contribution-mode')?.value || null,
                    philhealth_contribution_amount: document.getElementById('philhealth-contribution-amount')?.value || null,
                    pagibig_contribution_mode: document.getElementById('pagibig-contribution-mode')?.value || null,
                    pagibig_contribution_amount: document.getElementById('pagibig-contribution-amount')?.value || null,
                    pagibig_loan_payment_mode: document.getElementById('pagibig-loan-mode')?.value || null,
                    pagibig_loan_amount: document.getElementById('pagibig-loan-amount')?.value || null,
                    yearly_sick_leave: document.getElementById('yearly-sick-leave')?.value || null,
                    yearly_vacation_leave: document.getElementById('yearly-vacation-leave')?.value || null
                };
                const res = await fetch('http://localhost:5000/api/employee-compensations', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(compensationData)
                });
                if (!res.ok) throw new Error('Failed to save compensation');

                const roleId = document.getElementById('compensation-role')?.value;
                if (roleId) {
                    const roleRes = await fetch(`http://localhost:5000/api/organizational-structure/${encodeURIComponent(roleId)}`, {
                        method: 'PUT',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ employee_assigned: employeeId })
                    });
                    if (!roleRes.ok) throw new Error('Failed to assign employee to role');
                }

                alert('Compensation saved successfully!');
                if (newApplicationModal) newApplicationModal.style.display = 'none';
                if (employmentInfoModal) employmentInfoModal.style.display = 'none';
                if (uploadDocumentsModal) uploadDocumentsModal.style.display = 'none';
                if (compensationConfigModal) compensationConfigModal.style.display = 'none';
                if (congratulationsModal) congratulationsModal.style.display = 'flex';
            } catch (err) {
                console.error('Save compensation error:', err);
                alert('Save failed: ' + err.message);
            }
        });
    }

    setupMultiPageUploadZone('add-birth-certificate-page-btn', 'birth-certificate-pages-container', 'doc-birth-certificate', 'Birth Certificate');
    setupMultiPageUploadZone('add-medical-clearance-page-btn', 'medical-clearance-pages-container', 'doc-medical', 'Medical Clearance');

    let resumePageCount = 1;
    const addResumePageBtn = document.getElementById('add-resume-page-btn');
    const resumePagesContainer = document.getElementById('resume-pages-container');

    if (addResumePageBtn && resumePagesContainer) {
        addResumePageBtn.addEventListener('click', () => {
            resumePageCount++;
            const pageDiv = document.createElement('div');
            pageDiv.style.cssText = 'display: flex; flex-direction: column; gap: 6px; margin-top: 8px;';
            const suffix = resumePageCount === 2 ? '2nd' : resumePageCount === 3 ? '3rd' : resumePageCount + 'th';
            pageDiv.innerHTML = `
                <div style="display: flex; justify-content: space-between; align-items: center;">
                    <label>Resume - ${suffix} Page</label>
                    <button class="btn-danger remove-resume-page-btn" style="margin: 0; padding: 4px 10px; font-size: 12px;">Remove</button>
                </div>
            `;
            const zoneContainer = document.createElement('div');
            zoneContainer.innerHTML = createUploadZoneHTML('doc-resume', 'Resume', 'false', 'doc-resume', suffix + ' Page');
            pageDiv.appendChild(zoneContainer);
            resumePagesContainer.appendChild(pageDiv);
            const newZone = zoneContainer.querySelector('.upload-zone');
            if (newZone) setupUploadZone(newZone);

            const removeBtn = pageDiv.querySelector('.remove-resume-page-btn');
            removeBtn.addEventListener('click', () => {
                const allPages = resumePagesContainer.querySelectorAll(':scope > div');
                const isLastPage = allPages.length > 0 && allPages[allPages.length - 1] === pageDiv;
                if (!isLastPage) {
                    alert('You can only remove the last page.');
                    return;
                }
                pageDiv.remove();
                resumePageCount--;
            });
        });
    }

    const formatPhoneInput = (input) => {
        if (!input) return;
        const cursorPos = input.selectionStart;
        const originalLength = input.value.length;
        
        let value = input.value.replace(/[^\d]/g, '');
        if (value.length > 0 && !value.startsWith('63')) {
            value = '63' + value;
        }
        value = value.slice(0, 12);
        
        let formatted = '+63';
        if (value.length > 2) formatted += ' ' + value.slice(2, 5);
        if (value.length > 5) formatted += '-' + value.slice(5, 8);
        if (value.length > 8) formatted += '-' + value.slice(8, 12);
        
        input.value = formatted;
        
        const newLength = formatted.length;
        const diff = newLength - originalLength;
        const newCursorPos = Math.max(0, cursorPos + diff);
        input.setSelectionRange(newCursorPos, newCursorPos);
    };

    const appContact = document.getElementById('app-contact');
    const appEmergencyNumber = document.getElementById('app-emergency-number');
    if (appContact) {
        appContact.addEventListener('input', () => formatPhoneInput(appContact));
    }
    if (appEmergencyNumber) {
        appEmergencyNumber.addEventListener('input', () => formatPhoneInput(appEmergencyNumber));
    }

    const formatBirthDate = (input) => {
        if (!input) return;
        const cursorPos = input.selectionStart;
        const originalLength = input.value.length;
        
        let value = input.value.replace(/[^\d]/g, '');
        value = value.slice(0, 8);
        
        let formatted = '';
        if (value.length > 0) formatted += value.slice(0, 2);
        if (value.length > 2) formatted += '/' + value.slice(2, 4);
        if (value.length > 4) formatted += '/' + value.slice(4, 8);
        
        input.value = formatted;
        
        const newLength = formatted.length;
        const diff = newLength - originalLength;
        const newCursorPos = Math.max(0, cursorPos + diff);
        input.setSelectionRange(newCursorPos, newCursorPos);
    };

    const appBirthdate = document.getElementById('app-birthdate');
    if (appBirthdate) {
        appBirthdate.addEventListener('input', () => formatBirthDate(appBirthdate));
    }

    const formatSSS = (input) => {
        if (!input) return;
        const cursorPos = input.selectionStart;
        const originalLength = input.value.length;
        let value = input.value.replace(/[^\d]/g, '');
        value = value.slice(0, 10);
        let formatted = '';
        if (value.length > 0) formatted += value.slice(0, 2);
        if (value.length > 2) formatted += '-' + value.slice(2, 9);
        if (value.length > 9) formatted += '-' + value.slice(9, 10);
        input.value = formatted;
        const newLength = formatted.length;
        const diff = newLength - originalLength;
        const newCursorPos = Math.max(0, cursorPos + diff);
        input.setSelectionRange(newCursorPos, newCursorPos);
    };

    const formatPhilHealth = (input) => {
        if (!input) return;
        const cursorPos = input.selectionStart;
        const originalLength = input.value.length;
        let value = input.value.replace(/[^\d]/g, '');
        value = value.slice(0, 12);
        let formatted = '';
        if (value.length > 0) formatted += value.slice(0, 2);
        if (value.length > 2) formatted += '-' + value.slice(2, 11);
        if (value.length > 11) formatted += '-' + value.slice(11, 12);
        input.value = formatted;
        const newLength = formatted.length;
        const diff = newLength - originalLength;
        const newCursorPos = Math.max(0, cursorPos + diff);
        input.setSelectionRange(newCursorPos, newCursorPos);
    };

    const formatPagIBIG = (input) => {
        if (!input) return;
        const cursorPos = input.selectionStart;
        const originalLength = input.value.length;
        let value = input.value.replace(/[^\d]/g, '');
        value = value.slice(0, 12);
        let formatted = '';
        if (value.length > 0) formatted += value.slice(0, 4);
        if (value.length > 4) formatted += '-' + value.slice(4, 8);
        if (value.length > 8) formatted += '-' + value.slice(8, 12);
        input.value = formatted;
        const newLength = formatted.length;
        const diff = newLength - originalLength;
        const newCursorPos = Math.max(0, cursorPos + diff);
        input.setSelectionRange(newCursorPos, newCursorPos);
    };

    const formatTIN = (input) => {
        if (!input) return;
        const cursorPos = input.selectionStart;
        const originalLength = input.value.length;
        let value = input.value.replace(/[^\d]/g, '');
        value = value.slice(0, 12);
        let formatted = '';
        if (value.length > 0) formatted += value.slice(0, 3);
        if (value.length > 3) formatted += '-' + value.slice(3, 6);
        if (value.length > 6) formatted += '-' + value.slice(6, 9);
        if (value.length > 9) formatted += '-' + value.slice(9, 12);
        input.value = formatted;
        const newLength = formatted.length;
        const diff = newLength - originalLength;
        const newCursorPos = Math.max(0, cursorPos + diff);
        input.setSelectionRange(newCursorPos, newCursorPos);
    };

    const appSSS = document.getElementById('app-sss');
    const appPhilHealth = document.getElementById('app-philhealth');
    const appPagIBIG = document.getElementById('app-pagibig');
    const appTIN = document.getElementById('app-tin');
    if (appSSS) appSSS.addEventListener('input', () => formatSSS(appSSS));
    if (appPhilHealth) appPhilHealth.addEventListener('input', () => formatPhilHealth(appPhilHealth));
    if (appPagIBIG) appPagIBIG.addEventListener('input', () => formatPagIBIG(appPagIBIG));
    if (appTIN) appTIN.addEventListener('input', () => formatTIN(appTIN));

    const formatDateOfHire = (input) => {
        if (!input) return;
        const cursorPos = input.selectionStart;
        const originalLength = input.value.length;
        let value = input.value.replace(/[^\d]/g, '');
        value = value.slice(0, 8);
        let formatted = '';
        if (value.length > 0) formatted += value.slice(0, 2);
        if (value.length > 2) formatted += '/' + value.slice(2, 4);
        if (value.length > 4) formatted += '/' + value.slice(4, 8);
        input.value = formatted;
        const newLength = formatted.length;
        const diff = newLength - originalLength;
        const newCursorPos = Math.max(0, cursorPos + diff);
        input.setSelectionRange(newCursorPos, newCursorPos);
    };

    const appDateOfHire = document.getElementById('app-date-of-hire');
    if (appDateOfHire) {
        appDateOfHire.addEventListener('input', () => formatDateOfHire(appDateOfHire));
    }

    const uploadZones = document.querySelectorAll('#upload-documents-modal .upload-zone');
    uploadZones.forEach(zone => setupUploadZone(zone));

    const onboardingDocTabs = document.querySelectorAll('#onboarding-docs-tabs .modal-tab');
    const onboardingDocsContent = document.getElementById('onboarding-docs-content');
    const onboardingDocsToolbar = document.getElementById('onboarding-docs-toolbar');
    const onboardingQuillEditor = document.getElementById('onboarding-quill-editor');
    const onboardingDocsPlaceholder = document.getElementById('onboarding-docs-placeholder');
    const onboardingDocsActions = document.getElementById('onboarding-docs-actions');
    const onboardingQuillInner = document.getElementById('onboarding-quill-inner');
    
    let onboardingQuillInstance = null;
    let onboardingActiveDocTab = null;
    const onboardingDocContents = {};

    const onboardingDocTitles = {
        'employee-contract': 'Employee Contract',
        'employment-bond': 'Employment Bond',
        'housing-agreement': 'Employee Housing Agreement'
    };

    const initOnboardingQuillEditor = () => {
        if (onboardingQuillInstance) return;
        
        if (typeof Quill === 'undefined') {
            console.error('Quill is not loaded');
            return;
        }
        
        onboardingQuillInstance = new Quill(onboardingQuillInner, {
            theme: 'snow',
            modules: {
                toolbar: onboardingDocsToolbar
            }
        });
    };

    const showOnboardingEditor = () => {
        if (onboardingDocsPlaceholder) onboardingDocsPlaceholder.style.display = 'none';
        if (onboardingDocsToolbar) onboardingDocsToolbar.style.display = 'block';
        if (onboardingQuillEditor) onboardingQuillEditor.style.display = 'block';
        if (onboardingDocsActions) onboardingDocsActions.style.display = 'flex';
    };

    const hideOnboardingEditor = () => {
        if (onboardingDocsPlaceholder) onboardingDocsPlaceholder.style.display = 'block';
        if (onboardingDocsToolbar) onboardingDocsToolbar.style.display = 'none';
        if (onboardingQuillEditor) onboardingQuillEditor.style.display = 'none';
        if (onboardingDocsActions) onboardingDocsActions.style.display = 'none';
    };

    const switchOnboardingDocTab = async (tabId) => {
        onboardingActiveDocTab = tabId;
        
        onboardingDocTabs.forEach(tab => tab.classList.remove('active'));
        const activeTab = document.querySelector(`#onboarding-docs-tabs [data-doc-tab="${tabId}"]`);
        if (activeTab) activeTab.classList.add('active');

        initOnboardingQuillEditor();
        showOnboardingEditor();

        if (!onboardingDocContents[tabId]) {
            try {
                const res = await fetch(`http://localhost:5000/api/onboarding-documents/documents/${tabId}`);
                if (res.ok) {
                    const data = await res.json();
                    onboardingDocContents[tabId] = data.html_content || '';
                }
            } catch (err) {
                console.error('Failed to load onboarding document:', err);
            }
        }

        const savedContent = onboardingDocContents[tabId] || '';
        onboardingQuillInstance.root.innerHTML = savedContent;
    };

    onboardingDocTabs.forEach(tab => {
        tab.addEventListener('click', async () => {
            const tabId = tab.getAttribute('data-doc-tab');
            if (tabId) await switchOnboardingDocTab(tabId);
        });
    });

    const firstOnboardingDocTab = document.querySelector('#onboarding-docs-tabs [data-doc-tab="employee-contract"]');
    if (firstOnboardingDocTab) {
        switchOnboardingDocTab('employee-contract');
    }

    const saveOnboardingDocBtn = document.getElementById('save-onboarding-doc-btn');
    if (saveOnboardingDocBtn) {
        saveOnboardingDocBtn.addEventListener('click', async () => {
            if (!onboardingQuillInstance || !onboardingActiveDocTab) return;
            
            const content = onboardingQuillInstance.root.innerHTML;
            onboardingDocContents[onboardingActiveDocTab] = content;
            
            try {
                const res = await fetch('http://localhost:5000/api/onboarding-documents/documents', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ doc_type: onboardingActiveDocTab, html_content: content })
                });
                
                if (!res.ok) throw new Error('Failed to save document');
                alert('Document saved successfully');
            } catch (err) {
                console.error('Save onboarding document error:', err);
                alert(err.message || 'Failed to save document');
            }
        });
    }

    const exportOnboardingHtmlBtn = document.getElementById('export-onboarding-html-btn');
    if (exportOnboardingHtmlBtn) {
        exportOnboardingHtmlBtn.addEventListener('click', () => {
            if (!onboardingQuillInstance) return;
            const content = onboardingQuillInstance.root.innerHTML;
            const blob = new Blob([`<!DOCTYPE html><html><head><meta charset="UTF-8"><title>${onboardingDocTitles[onboardingActiveDocTab] || 'Document'}</title></head><body>${content}</body></html>`], { type: 'text/html' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `${onboardingDocTitles[onboardingActiveDocTab] || 'document'}.html`;
            a.click();
            URL.revokeObjectURL(url);
        });
    }

    const exportOnboardingPdfBtn = document.getElementById('export-onboarding-pdf-btn');
    if (exportOnboardingPdfBtn) {
        exportOnboardingPdfBtn.addEventListener('click', async () => {
            if (!onboardingQuillInstance) return;
            try {
                const { jsPDF } = window.jspdf;
                const doc = new jsPDF();
                const content = onboardingQuillInstance.root.innerText || onboardingQuillInstance.getText();
                doc.setFontSize(12);
                doc.text(content, 10, 10, { maxWidth: 190 });
                doc.save(`${onboardingDocTitles[onboardingActiveDocTab] || 'document'}.pdf`);
            } catch (err) {
                console.error('Export PDF error:', err);
                alert('Failed to export PDF');
            }
        });
    }

    const idSearchInput = document.getElementById('id-employee-search');
    const idSearchResults = document.getElementById('id-search-results');
    const idGenerateBtn = document.getElementById('id-generate-btn');
    let selectedEmployeeData = null;

    const idFrontPhoto = document.getElementById('id-front-photo');
    const idFrontPhotoPlaceholder = document.getElementById('id-front-photo-placeholder');
    const idFrontName = document.getElementById('id-front-name');
    const idFrontDesignation = document.getElementById('id-front-designation');
    const idFrontEmployeeId = document.getElementById('id-front-employee-id');
    const idFrontEmail = document.getElementById('id-front-email');
    const idFrontPhone = document.getElementById('id-front-phone');
    const idBackEmployeeId = document.getElementById('id-back-employee-id');
    const idBackEmergencyContact = document.getElementById('id-back-emergency-contact');

    const loadIdEmployeePhoto = (folderName, photoFileName) => {
        if (!idFrontPhoto || !idFrontPhotoPlaceholder) return;
        if (!photoFileName) {
            idFrontPhoto.style.display = 'none';
            idFrontPhotoPlaceholder.style.display = 'block';
            return;
        }
        const encodedFolder = encodeURIComponent(folderName || '');
        const encodedPhoto = encodeURIComponent(photoFileName);
        const photoUrl = `http://localhost:5000/uploads/employee-photos/${encodedFolder}/${encodedPhoto}`;
        idFrontPhoto.src = photoUrl;
        idFrontPhoto.style.display = 'block';
        idFrontPhotoPlaceholder.style.display = 'none';
        idFrontPhoto.onerror = () => {
            idFrontPhoto.style.display = 'none';
            idFrontPhotoPlaceholder.style.display = 'block';
        };
    };

    const populateIdCard = (employee) => {
        selectedEmployeeData = employee;
        const fullName = `${employee.first_name || ''} ${employee.middle_name ? employee.middle_name[0] + '. ' : ''}${employee.last_name || ''}`.trim() || 'EMPLOYEE NAME';
        const designation = employee.role_title || employee.job_title || employee.position || 'DESIGNATION / ROLE';
        const employeeId = employee.employee_id || 'GefiEmp-00001';
        const email = employee.email_address || 'employee@example.com';
        const phone = employee.contact_details || '+63 900 000 0000';
        const emergencyContact = employee.emergency_contact || 'N/A';

        if (idFrontName) idFrontName.textContent = fullName.toUpperCase();
        if (idFrontDesignation) idFrontDesignation.textContent = designation.toUpperCase();
        if (idFrontEmployeeId) idFrontEmployeeId.textContent = employeeId;
        if (idFrontEmail) idFrontEmail.textContent = email;
        if (idFrontPhone) idFrontPhone.textContent = phone;
        if (idBackEmployeeId) idBackEmployeeId.textContent = employeeId;
        if (idBackEmergencyContact) idBackEmergencyContact.textContent = emergencyContact;

        loadIdEmployeePhoto(employee.folder_name, employee.photo_file_name);
    };

    const loadIdSearchResults = async (query) => {
        if (!idSearchResults) return;
        if (!query || query.trim().length === 0) {
            idSearchResults.style.display = 'none';
            idSearchResults.innerHTML = '';
            return;
        }
        try {
                const res = await fetch(`http://localhost:5000/api/employee-profiles?search=${encodeURIComponent(query.trim())}&status=active`);
            if (!res.ok) return;
            const records = await res.json();
            idSearchResults.innerHTML = '';
            if (records.length === 0) {
                idSearchResults.innerHTML = '<div class="id-search-item" style="color:#999;text-align:center;">No results found</div>';
                idSearchResults.style.display = 'block';
                return;
            }
            records.forEach(record => {
                const item = document.createElement('div');
                item.className = 'id-search-item';
                const fullName = `${record.first_name || ''} ${record.middle_name ? record.middle_name[0] + '. ' : ''}${record.last_name || ''}`.trim();
                item.textContent = `${record.employee_id} - ${fullName}`;
                item.addEventListener('click', () => {
                    populateIdCard(record);
                    idSearchResults.style.display = 'none';
                    idSearchInput.value = `${record.employee_id} - ${fullName}`;
                });
                idSearchResults.appendChild(item);
            });
            idSearchResults.style.display = 'block';
        } catch (err) {
            console.error('Failed to search employees for ID:', err);
        }
    };

    if (idSearchInput) {
        idSearchInput.addEventListener('input', (e) => loadIdSearchResults(e.target.value.trim()));
        idSearchInput.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                idSearchResults.style.display = 'none';
            }
        });
        document.addEventListener('click', (e) => {
            if (!idSearchInput.contains(e.target) && !idSearchResults.contains(e.target)) {
                idSearchResults.style.display = 'none';
            }
        });
    }

    if (idGenerateBtn) {
        idGenerateBtn.addEventListener('click', () => {
            alert('Generate button clicked. Functionality coming soon.');
        });
    }
};

