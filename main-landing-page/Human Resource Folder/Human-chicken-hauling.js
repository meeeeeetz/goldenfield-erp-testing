if (typeof ModuleComponents === 'undefined') { window.ModuleComponents = {}; }

ModuleComponents['hr-salary-chicken-hauling'] = (container) => {
    container.innerHTML = `
        <div id="chicken-hauling-view">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
                <div style="display: flex; gap: 16px; align-items: center;">
                    <button id="create-hauling-logs-btn" class="btn-icon-circle">
                        <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="2" width="16" height="20" rx="2"></rect><line x1="8" y1="6" x2="16" y2="6"></line><line x1="8" y1="10" x2="16" y2="10"></line><line x1="8" y1="14" x2="10" y2="14"></line><line x1="14" y1="14" x2="16" y2="14"></line><line x1="8" y1="18" x2="10" y2="18"></line><line x1="14" y1="18" x2="16" y2="18"></line></svg>
                        <span class="btn-label">Create Hauling logs</span>
                    </button>
                </div>
                <button id="back-to-salary-from-chicken-btn" class="btn-icon-circle" style="margin-left: auto;">
                    <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
                    <span class="btn-label">Back to Salary</span>
                </button>
            </div>

        <div id="hauling-log-modal" class="modal" style="display:none; align-items: center; justify-content: center;">
            <div class="modal-content" style="max-width: 600px; width: 95%; max-height: 90vh; display: flex; flex-direction: column;">
                <div class="modal-header-row">
                    <h3>Create Chicken Hauling Log</h3>
                    <button class="modal-close-btn" id="close-hauling-log-modal">&times;</button>
                </div>
                <div style="padding: 40px; text-align: center; color: #666;">
                    <p>Content coming soon...</p>
                </div>
            </div>
        </div>
        </div>
    `;

    const createBtn = document.getElementById('create-hauling-logs-btn');
    const backBtn = document.getElementById('back-to-salary-from-chicken-btn');
    const modal = document.getElementById('hauling-log-modal');
    const closeModalBtn = document.getElementById('close-hauling-log-modal');

    function openModal() {
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }

    function closeModal() {
        modal.style.display = 'none';
        document.body.style.overflow = '';
    }

    createBtn?.addEventListener('click', openModal);
    backBtn?.addEventListener('click', () => switchTab('hr-salary'));
    closeModalBtn?.addEventListener('click', closeModal);

    window.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });
};