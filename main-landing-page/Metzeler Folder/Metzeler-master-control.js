if (typeof ModuleComponents === 'undefined') { window.ModuleComponents = {}; }

ModuleComponents['metz-master-control'] = (container) => {
    container.innerHTML = `
        <div class="module-dashboard">
            <div class="card">
                <h2>Master control</h2>
                <p class="section-description">Manage master control settings and configurations.</p>
            </div>
        </div>
    `;
};

function initializeModule(contentArea) {
    const currentTab = window.__currentTabId || 'metzeler';
    const render = ModuleComponents[currentTab] || ModuleComponents['metzeler'];
    render(contentArea);
}
