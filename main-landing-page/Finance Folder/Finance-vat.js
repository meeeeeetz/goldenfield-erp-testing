if (typeof ModuleComponents === 'undefined') { window.ModuleComponents = {}; }

ModuleComponents['finance-vat'] = (container) => {
    container.innerHTML = `
        <div class="module-dashboard">
            <div class="card">
                <h2>VAT</h2>
                <p class="section-description">Manage VAT calculations and filings.</p>
            </div>
        </div>
    `;
};

function initializeModule(contentArea) {
    const currentTab = window.__currentTabId || 'finance';
    const render = ModuleComponents[currentTab] || ModuleComponents['finance'];
    render(contentArea);
}
