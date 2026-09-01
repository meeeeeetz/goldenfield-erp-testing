function initializeModule(contentArea) {
    const currentTab = window.__currentTabId || 'finance';

    const sections = {
        'finance': {
            title: 'Finance Dashboard',
            description: 'Overview of all finance modules.',
            showButton: false
        }
    };

    const section = sections[currentTab] || sections['finance'];

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
