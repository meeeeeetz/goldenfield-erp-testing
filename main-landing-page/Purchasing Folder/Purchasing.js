if (typeof ModuleComponents === 'undefined') { window.ModuleComponents = {}; }

ModuleComponents['purchasing'] = (container) => {
    container.innerHTML = `
        <div class="header-actions">
            <h2>Purchasing</h2>
        </div>
    `;
};

function initializeModule(contentArea) {
    const currentTab = window.__currentTabId || 'purchasing';
    const render = ModuleComponents[currentTab] || ModuleComponents['purchasing'];
    render(contentArea);
}
