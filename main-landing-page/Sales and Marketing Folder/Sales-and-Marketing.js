if (typeof ModuleComponents === 'undefined') { window.ModuleComponents = {}; }
window.ModuleComponents['sales-marketing'] = (container) => {
    container.innerHTML = `
        <div class="module-dashboard">
            <div class="card">
                <h2>Sales & Marketing Dashboard</h2>
                <p class="section-description">Overview of all sales and marketing modules.</p>
            </div>
        </div>
    `;
};

function initializeModule(contentArea) {
    const currentTab = window.__currentTabId || 'sales-marketing';
    const render = ModuleComponents[currentTab] || ModuleComponents['sales-marketing'];
    render(contentArea);
}
