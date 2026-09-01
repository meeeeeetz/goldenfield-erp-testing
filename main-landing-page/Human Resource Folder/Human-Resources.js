function initializeModule(contentArea) {
    const currentTab = window.__currentTabId || 'human-resources';

    const sections = {
        'human-resources': {
            title: 'Human Resources Dashboard',
            description: 'Overview of all human resources modules.',
            showButton: false
        }
    };

    const section = sections[currentTab] || sections['human-resources'];

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
