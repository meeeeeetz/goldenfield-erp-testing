if (typeof ModuleComponents === 'undefined') { window.ModuleComponents = {}; }

var API_BASE = '/api/users';

function getAuthHeaders() {
    const token = localStorage.getItem('goldenfield_auth_token');
    return token ? { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' } : { 'Content-Type': 'application/json' };
}

async function apiCall(endpoint, options = {}) {
    const res = await fetch(`${API_BASE}${endpoint}`, {
        ...options,
        headers: getAuthHeaders()
    });
    if (res.status === 401) {
        localStorage.removeItem('goldenfield_auth_token');
        localStorage.removeItem('goldenfield_user');
        window.location.href = '../index.html';
        throw new Error('Unauthorized');
    }
    const data = await res.json().catch(() => ({}));
    if (!res.ok) throw new Error(data.error || 'Request failed');
    return data;
}

ModuleComponents['systems-user-management'] = (container) => {
    container.innerHTML = `
        <div class="module-dashboard">
            <div class="card">
                <div class="user-management-header">
                    <div>
                        <h2>User Management</h2>
                        <p class="section-description">Manage system users, roles, and permissions.</p>
                    </div>
                    <button id="add-user-btn" class="btn-primary" style="display:none;">+ Add User</button>
                </div>
            </div>
        </div>
        <div class="card graph-placeholder user-list-card">
            <div class="user-filters">
                <input type="text" id="user-search" placeholder="Search by name or email..." class="user-search-input">
                <select id="user-role-filter" class="modal-select">
                    <option value="">All Roles</option>
                    <option value="SUPER_ADMIN">SUPER_ADMIN</option>
                    <option value="ADMIN">ADMIN</option>
                    <option value="USER">USER</option>
                </select>
                <select id="user-status-filter" class="modal-select">
                    <option value="">All Status</option>
                    <option value="ACTIVE">ACTIVE</option>
                    <option value="INACTIVE">INACTIVE</option>
                    <option value="SUSPENDED">SUSPENDED</option>
                </select>
            </div>
            <div class="table-wrap">
                <table class="data-table product-table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Status</th>
                            <th>Last Login</th>
                            <th>Created</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody id="users-table-body">
                        <tr><td colspan="7">Loading...</td></tr>
                    </tbody>
                </table>
            </div>
            <div class="pagination" id="users-pagination"></div>
        </div>

        <div id="user-modal" class="modal" style="display:none;">
            <div class="modal-content">
                <div class="modal-header-row">
                    <h3 id="user-modal-title">Add User</h3>
                    <button class="modal-close-btn" id="close-user-modal">&times;</button>
                </div>
                <div class="modal-meta-row">
                    <div class="modal-field">
                        <label>First Name</label>
                        <input type="text" id="user-first-name" placeholder="First name">
                    </div>
                    <div class="modal-field">
                        <label>Last Name</label>
                        <input type="text" id="user-last-name" placeholder="Last name">
                    </div>
                </div>
                <div class="modal-field">
                    <label>Email</label>
                    <input type="email" id="user-email" placeholder="user@example.com">
                </div>
                <div class="modal-field">
                    <label>Password</label>
                    <input type="password" id="user-password" placeholder="Min 8 characters">
                </div>
                <div class="modal-meta-row">
                    <div class="modal-field">
                        <label>Role</label>
                        <select id="user-role" class="modal-select">
                            <option value="USER">USER</option>
                            <option value="ADMIN">ADMIN</option>
                            <option value="SUPER_ADMIN">SUPER_ADMIN</option>
                        </select>
                    </div>
                    <div class="modal-field">
                        <label>Status</label>
                        <select id="user-status" class="modal-select">
                            <option value="ACTIVE">ACTIVE</option>
                            <option value="INACTIVE">INACTIVE</option>
                            <option value="SUSPENDED">SUSPENDED</option>
                        </select>
                    </div>
                </div>
                <div class="modal-tab-actions">
                    <button class="btn-primary" id="save-user-btn">Save</button>
                </div>
            </div>
        </div>

        <div id="change-password-modal" class="modal" style="display:none;">
            <div class="modal-content">
                <div class="modal-header-row">
                    <h3>Change Password</h3>
                    <button class="modal-close-btn" id="close-password-modal">&times;</button>
                </div>
                <div class="modal-field">
                    <label>Current Password</label>
                    <input type="password" id="current-password" placeholder="Enter current password">
                </div>
                <div class="modal-field">
                    <label>New Password</label>
                    <input type="password" id="new-password" placeholder="Min 8 characters">
                </div>
                <div class="modal-tab-actions">
                    <button class="btn-primary" id="save-password-btn">Update Password</button>
                </div>
            </div>
        </div>
    `;

    let usersData = [];
    let usersCurrentPage = 1;
    const usersRowsPerPage = 10;
    let currentUser = null;
    let editingUserId = null;

    async function loadCurrentUser() {
        try {
            const data = await apiCall('/me');
            currentUser = data.user;
            applyRoleVisibility();
            loadUsers();
            initializeUserModals();
        } catch (err) {
            console.error('Failed to load current user', err);
        }
    }

    function applyRoleVisibility() {
        const addBtn = document.getElementById('add-user-btn');
        if (!addBtn || !currentUser) return;
        if (currentUser.role === 'SUPER_ADMIN') {
            addBtn.style.display = 'inline-flex';
        }
    }

    async function loadUsers() {
        const tbody = document.getElementById('users-table-body');
        if (!tbody) return;
        try {
            const search = document.getElementById('user-search')?.value || '';
            const roleFilter = document.getElementById('user-role-filter')?.value || '';
            const statusFilter = document.getElementById('user-status-filter')?.value || '';

            const params = new URLSearchParams({
                page: usersCurrentPage.toString(),
                limit: usersRowsPerPage.toString()
            });
            if (search) params.append('search', search);
            if (roleFilter) params.append('role', roleFilter);
            if (statusFilter) params.append('status', statusFilter);

            const data = await apiCall(`?${params.toString()}`);
            usersData = data.users || [];
            renderUsersPage(usersData);
            renderUsersPagination(data.pagination);
        } catch (err) {
            console.error('Failed to load users', err);
            tbody.innerHTML = '<tr><td colspan="7">Failed to load data</td></tr>';
        }
    }

    function renderUsersPage(users) {
        const tbody = document.getElementById('users-table-body');
        if (!tbody) return;
        if (users.length === 0) {
            tbody.innerHTML = '<tr><td colspan="7">No users found</td></tr>';
            return;
        }
        tbody.innerHTML = users.map(u => {
            const isSuperAdmin = currentUser && currentUser.role === 'SUPER_ADMIN';
            const fullName = `${u.first_name || ''} ${u.last_name || ''}`.trim() || '-';
            const canEdit = isSuperAdmin;
            const canDeactivate = isSuperAdmin && u.id !== currentUser.id;
            return `
                <tr>
                    <td>${fullName}</td>
                    <td>${u.email}</td>
                    <td><span class="role-badge role-${u.role?.toLowerCase()}">${u.role}</span></td>
                    <td><span class="status-badge status-${u.status?.toLowerCase()}">${u.status}</span></td>
                    <td>${u.last_login ? new Date(u.last_login).toLocaleDateString() : '-'}</td>
                    <td>${new Date(u.created_at).toLocaleDateString()}</td>
                    <td>
                        <button class="btn-edit" onclick="window.editUser(${u.id})">Edit</button>
                        ${u.id === currentUser.id ? `<button class="btn-primary" onclick="window.openChangePassword()" style="padding:6px 12px;font-size:12px;">Change Password</button>` : ''}
                        ${canDeactivate ? `<button class="btn-delete" onclick="window.deactivateUser(${u.id}, '${fullName.replace(/'/g, "\\'")}', '${u.status}')">${u.status === 'ACTIVE' ? 'Deactivate' : 'Activate'}</button>` : ''}
                    </td>
                </tr>
            `;
        }).join('');
    }

    function renderUsersPagination(pagination) {
        const el = document.getElementById('users-pagination');
        if (!el) return;
        const totalPages = pagination.totalPages || 1;
        let html = `<button class="page-btn" id="users-prev-btn" ${pagination.page <= 1 ? 'disabled' : ''}>&laquo; Prev</button>`;
        for (let i = 1; i <= totalPages; i++) {
            html += `<button class="page-btn ${i === pagination.page ? 'active' : ''}" id="users-page-${i}">${i}</button>`;
        }
        html += `<button class="page-btn" id="users-next-btn" ${pagination.page >= totalPages ? 'disabled' : ''}>Next &raquo;</button>`;
        el.innerHTML = html;

        document.getElementById('users-prev-btn')?.addEventListener('click', () => {
            if (usersCurrentPage > 1) { usersCurrentPage--; loadUsers(); }
        });
        document.getElementById('users-next-btn')?.addEventListener('click', () => {
            usersCurrentPage++; loadUsers();
        });
        for (let i = 1; i <= totalPages; i++) {
            document.getElementById(`users-page-${i}`)?.addEventListener('click', () => {
                usersCurrentPage = i; loadUsers();
            });
        }
    }

    function initializeUserModals() {
        const addBtn = document.getElementById('add-user-btn');
        const userModal = document.getElementById('user-modal');
        const closeUserModal = document.getElementById('close-user-modal');
        const saveUserBtn = document.getElementById('save-user-btn');
        const passwordModal = document.getElementById('change-password-modal');
        const closePasswordModal = document.getElementById('close-password-modal');
        const savePasswordBtn = document.getElementById('save-password-btn');

        if (addBtn) {
            addBtn.addEventListener('click', () => {
                editingUserId = null;
                document.getElementById('user-modal-title').textContent = 'Add User';
                document.getElementById('user-first-name').value = '';
                document.getElementById('user-last-name').value = '';
                document.getElementById('user-email').value = '';
                document.getElementById('user-password').value = '';
                document.getElementById('user-role').value = 'USER';
                document.getElementById('user-status').value = 'ACTIVE';
                userModal.style.display = 'flex';
            });
        }

        if (closeUserModal) {
            closeUserModal.addEventListener('click', () => { userModal.style.display = 'none'; });
        }

        if (saveUserBtn) {
            saveUserBtn.addEventListener('click', async () => {
                const firstName = document.getElementById('user-first-name').value.trim();
                const lastName = document.getElementById('user-last-name').value.trim();
                const email = document.getElementById('user-email').value.trim();
                const password = document.getElementById('user-password').value;
                const role = document.getElementById('user-role').value;
                const status = document.getElementById('user-status').value;

                if (!email || !password) {
                    alert('Email and password are required');
                    return;
                }

                try {
                    if (editingUserId) {
                        const body = { firstName, lastName, email, role, status };
                        if (password) body.password = password;
                        await apiCall(`/${editingUserId}`, {
                            method: 'PUT',
                            body: JSON.stringify(body)
                        });
                    } else {
                        await apiCall('/register', {
                            method: 'POST',
                            body: JSON.stringify({ email, password, firstName, lastName, role, status, mustChangePassword: true })
                        });
                    }
                    userModal.style.display = 'none';
                    loadUsers();
                } catch (err) {
                    alert('Error: ' + err.message);
                }
            });
        }

        if (closePasswordModal) {
            closePasswordModal.addEventListener('click', () => { passwordModal.style.display = 'none'; });
        }

        if (savePasswordBtn) {
            savePasswordBtn.addEventListener('click', async () => {
                const currentPassword = document.getElementById('current-password').value;
                const newPassword = document.getElementById('new-password').value;
                if (!currentPassword || !newPassword) {
                    alert('Both password fields are required');
                    return;
                }
                try {
                    await apiCall('/change-password', {
                        method: 'POST',
                        body: JSON.stringify({ currentPassword, newPassword })
                    });
                    passwordModal.style.display = 'none';
                    document.getElementById('current-password').value = '';
                    document.getElementById('new-password').value = '';
                    alert('Password changed successfully');
                } catch (err) {
                    alert('Error: ' + err.message);
                }
            });
        }

        document.getElementById('user-search')?.addEventListener('input', () => { usersCurrentPage = 1; loadUsers(); });
        document.getElementById('user-role-filter')?.addEventListener('change', () => { usersCurrentPage = 1; loadUsers(); });
        document.getElementById('user-status-filter')?.addEventListener('change', () => { usersCurrentPage = 1; loadUsers(); });
    }

    async function editUser(id) {
        try {
            const data = await apiCall(`/${id}`);
            const user = data.user;
            editingUserId = id;
            document.getElementById('user-modal-title').textContent = 'Edit User';
            document.getElementById('user-first-name').value = user.first_name || '';
            document.getElementById('user-last-name').value = user.last_name || '';
            document.getElementById('user-email').value = user.email || '';
            document.getElementById('user-password').value = '';
            document.getElementById('user-password').placeholder = 'Leave blank to keep current';
            document.getElementById('user-role').value = user.role || 'USER';
            document.getElementById('user-status').value = user.status || 'ACTIVE';
            document.getElementById('user-modal').style.display = 'flex';
        } catch (err) {
            alert('Error loading user: ' + err.message);
        }
    }

    async function deactivateUser(id, name, status) {
        const action = status === 'ACTIVE' ? 'deactivate' : 'activate';
        if (!confirm(`Are you sure you want to ${action} "${name}"?`)) return;
        try {
            await apiCall(`/${id}`, {
                method: 'PUT',
                body: JSON.stringify({ status: status === 'ACTIVE' ? 'INACTIVE' : 'ACTIVE' })
            });
            loadUsers();
        } catch (err) {
            alert('Error: ' + err.message);
        }
    }

    function openChangePassword() {
        document.getElementById('change-password-modal').style.display = 'flex';
    }

    window.editUser = editUser;
    window.deactivateUser = deactivateUser;
    window.openChangePassword = openChangePassword;

    loadCurrentUser();
};

function initializeModule(contentArea) {
    const currentTab = window.__currentTabId || 'systems';
    const render = ModuleComponents[currentTab] || ModuleComponents['systems'];
    render(contentArea);
}
