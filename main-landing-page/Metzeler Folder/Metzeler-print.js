if (typeof ModuleComponents === 'undefined') { window.ModuleComponents = {}; }

ModuleComponents['metz-print'] = (container) => {
    container.innerHTML = `
        <div class="module-dashboard">
            <div style="display: flex; justify-content: space-between; align-items: center; gap: 12px; width: 100%;">
                <h2>Print</h2>
                <div style="display: flex; align-items: center; gap: 8px;">
                    <select class="modal-select" style="width: auto; min-width: 160px;">
                        <option value="">Select Template</option>
                    </select>
                    <button class="btn-primary" style="padding: 8px 12px; font-size: 13px;">+ New</button>
                    <button class="btn-secondary" style="padding: 8px 12px; font-size: 13px;">Clear</button>
                    <button class="btn-primary" style="padding: 8px 12px; font-size: 13px;">Save</button>
                    <button class="btn-danger" style="padding: 8px 12px; font-size: 13px;">Delete</button>
                </div>
            </div>
            <div class="card" style="margin-top: 10px; padding: 20px;">
                <h3 style="margin: 0 0 16px 0; font-size: 16px; font-weight: 600; color: #1a1f2e;">Print Page</h3>
                <div id="print-page-content" style="padding: 16px; background: #f3f4f6; border-radius: 6px; min-height: 120px;">
                </div>
            </div>
        </div>
    `;
};

function initializeModule(contentArea) {
    const currentTab = window.__currentTabId || 'metzeler';
    const render = ModuleComponents[currentTab] || ModuleComponents['metzeler'];
    render(contentArea);
}
