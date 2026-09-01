if (typeof ModuleComponents === 'undefined') { window.ModuleComponents = {}; }

ModuleComponents['systems-integrations'] = (container) => {
    container.innerHTML = `
        <div class="module-dashboard">
            <div class="card">
                <h2>Integrations</h2>
                <p class="section-description">Manage third-party integrations and APIs.</p>
            </div>
        </div>
    `;
};

function initializeModule(contentArea) {
    const currentTab = window.__currentTabId || 'systems';
    const render = ModuleComponents[currentTab] || ModuleComponents['systems'];
    render(contentArea);
}
