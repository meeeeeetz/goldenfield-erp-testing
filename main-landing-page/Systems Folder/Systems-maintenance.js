if (typeof ModuleComponents === 'undefined') { window.ModuleComponents = {}; }

ModuleComponents['systems-maintenance'] = (container) => {
    container.innerHTML = `
        <div class="module-dashboard">
            <div class="card">
                <h2>Maintenance</h2>
                <p class="section-description">System maintenance, backups, and updates.</p>
            </div>
        </div>
    `;
};

function initializeModule(contentArea) {
    const currentTab = window.__currentTabId || 'systems';
    const render = ModuleComponents[currentTab] || ModuleComponents['systems'];
    render(contentArea);
}
