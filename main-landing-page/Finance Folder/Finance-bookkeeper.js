if (typeof ModuleComponents === 'undefined') { window.ModuleComponents = {}; }

ModuleComponents['finance-bookkeeper'] = (container) => {
    container.innerHTML = `
        <div class="module-dashboard">
            <div class="card">
                <h2>Bookeeper</h2>
                <p class="section-description">Bookkeeping and accounting management.</p>
            </div>
        </div>
    `;
};

function initializeModule(contentArea) {
    const currentTab = window.__currentTabId || 'finance';
    const render = ModuleComponents[currentTab] || ModuleComponents['finance'];
    render(contentArea);
}
