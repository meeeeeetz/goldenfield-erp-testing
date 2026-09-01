function initializeModule(contentArea) {
    const currentTab = window.__currentTabId || 'systems';

    const sections = {
        'systems': {
            title: 'Systems Dashboard',
            description: 'Overview of all systems modules.',
            showButton: false
        }
    };

    const section = sections[currentTab] || sections['systems'];

    contentArea.innerHTML = `
        <div class="module-dashboard">
            <div class="card">
                <h2>${section.title}</h2>
                <p class="section-description">${section.description}</p>
                ${section.showButton ? '<button class="btn-primary">Action</button>' : ''}
            </div>
        </div>
    `;
}
