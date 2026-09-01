if (typeof ModuleComponents === 'undefined') { window.ModuleComponents = {}; }

ModuleComponents['metz-print'] = (container) => {
    container.innerHTML = `
        <div class="module-dashboard">
            <div class="card">
                <h2>Print</h2>
                <p class="section-description">Manage print jobs and printing settings.</p>
            </div>
        </div>
    `;
};

function initializeModule(contentArea) {
    const currentTab = window.__currentTabId || 'metzeler';
    const render = ModuleComponents[currentTab] || ModuleComponents['metzeler'];
    render(contentArea);
}
