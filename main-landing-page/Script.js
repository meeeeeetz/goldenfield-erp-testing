const tabModules = {
    'human-resources': 'Human Resource Folder/Human-Resources.js',
    'systems': 'Systems Folder/Systems.js',
    'sales-marketing': 'Sales and Marketing Folder/Sales-and-Marketing.js',
    'metzeler': 'Metzeler Folder/Metzeler.js',
    'logout': null,
    'operations': 'Operations Folder/Operations.js',
    'purchasing': 'Purchasing Folder/Purchasing.js',
    'operations-egg-inventory': 'Operations Folder/Operations-egg-inventory.js',
    'purchasing-feeds': 'Purchasing Folder/Purchasing-feeds.js',
    'purchasing-electricity': 'Purchasing Folder/Purchasing-electricity.js',
    'purchasing-egg-tray': 'Purchasing Folder/Purchasing-egg-tray.js',
    'purchasing-veterinary-supplies': 'Purchasing Folder/Purchasing-veterinary-supplies.js',
    'purchasing-other-expenses': 'Purchasing Folder/Purchasing-other-expenses.js',
    'operations-layer-buildings': 'Operations Folder/Operations-layer-buildings.js',
    'operations-layer-print-monthly': 'Operations Folder/Operations-layer-print-monthly.js',
    'operations-petty-cash': 'Operations Folder/Operations-petty-cash.js',
    'operations-shipping-permit': 'Operations Folder/Operations-shipping-permit.js',
    'purchasing-ready-to-lay': 'Purchasing Folder/Purchasing-ready-to-lay.js',
    'sales-receipt-issuance': 'Sales and Marketing Folder/Sales-receipt-issuance.js',
    'sales-product-pricing': 'Sales and Marketing Folder/Sales-product-pricing.js',
    'sales-customer-directory': 'Sales and Marketing Folder/Sales-customer-directory.js',
    'hr-onboarding': 'Human Resource Folder/Human-onboarding.js',
    'hr-scheduling': 'Human Resource Folder/Human-scheduling.js',
    'hr-salary': 'Human Resource Folder/Human-salary.js',
    'hr-salary-attendance': 'Human Resource Folder/Human-Salary-attendance.js',
    'hr-salary-overtime': 'Human Resource Folder/Human-salary-overtime.js',
    'hr-salary-leave': 'Human Resource Folder/Human-salary-leaves.js',
    'hr-salary-losses': 'Human Resource Folder/Human-losses.js',
    'hr-employees': 'Human Resource Folder/Human-employees.js',
    'hr-evaluation': 'Human Resource Folder/Human-evaluation.js',
    'hr-offenses': 'Human Resource Folder/Human-offenses.js',
    'hr-employees-manage-org-structure': 'Human Resource Folder/Human-Resources-Manage-Organizational-Structure.js',
    'hr-13th-month': 'Human Resource Folder/Human-13th-month.js',
    'hr-cash-loans': 'Human Resource Folder/Human-cash-loans.js',
    'finance': 'Finance Folder/Finance.js',
    'finance': 'Finance Folder/Finance.js',
    'finance-sales': 'Finance Folder/Finance-sales.js',
    'finance-expenses': 'Finance Folder/Finance-expenses.js',
    'finance-movements': 'Finance Folder/Finance-movements.js',
    'finance-loans': 'Finance Folder/Finance-loans.js',
    'finance-bank-management': 'Finance Folder/Finance-bank-management.js',
    'finance-accounting': 'Finance Folder/Finance-accounting.js',
    'finance-bank-statement': 'Finance Folder/Finance-bank-statement.js',
    'finance-check-management': 'Finance Folder/Finance-check-management.js',
    'finance-bookkeeper': 'Finance Folder/Finance-bookkeeper.js',
    'finance-vat': 'Finance Folder/Finance-vat.js',
    'metz-print': 'Metzeler Folder/Metzeler-print.js',
    'metz-master-control': 'Metzeler Folder/Metzeler-master-control.js',
    'systems-user-management': 'Systems Folder/Systems-user-management.js',
    'systems-integrations': 'Systems Folder/Systems-integrations.js',
    'systems-maintenance': 'Systems Folder/Systems-maintenance.js',
};

function getLoggedInUserName() {
    try {
        const user = JSON.parse(localStorage.getItem('goldenfield_user') || '{}');
        if (user && user.first_name) {
            return user.first_name;
        }
    } catch (e) {
        console.error('Failed to parse goldenfield_user', e);
    }
    return 'Username';
}

const tabTitles = {
    'human-resources': 'Human Resources',
    'systems': 'Systems',
    'sales-marketing': 'Sales & Marketing',
    'metzeler': 'Metzeler',
    'logout': 'Log out',
    'operations': 'Operations',
    'finance': 'Finance',
    'purchasing': 'Purchasing',
    'operations-egg-inventory': 'Egg Inventory',
    'purchasing-feeds': 'Feeds',
    'purchasing-electricity': 'Electricity',
    'purchasing-egg-tray': 'Egg Tray',
    'purchasing-veterinary-supplies': 'Veterinary Supplies',
    'purchasing-other-expenses': 'Other Expenses',
    'operations-layer-buildings': 'Layer Buildings',
    'operations-layer-print-monthly': 'Print Monthly Layer Report',
    'operations-petty-cash': 'Petty Cash',
    'operations-shipping-permit': 'Shipping Permit',
    'purchasing-ready-to-lay': 'Ready-to Lay',
    'sales-receipt-issuance': 'Receipt Issuance',
    'sales-product-pricing': 'Product and Pricing',
    'sales-customer-directory': 'Customer Directory',
    'hr-onboarding': 'OnBoarding',
    'hr-scheduling': 'Scheduling',
    'hr-salary': 'Salary',
    'hr-salary-attendance': 'Attendance',
    'hr-salary-overtime': 'Overtime Logs',
    'hr-salary-leave': 'Leaves',
    'hr-salary-losses': 'Loss/Damages',
    'hr-employees': 'Employees',
    'hr-evaluation': 'Evaluation',
    'hr-offenses': 'Offenses',
    'hr-employees-manage-org-structure': 'Manage Organizational Structure',
    'hr-13th-month': '13th Month',
    'hr-cash-loans': 'Cash Loans',
    'finance-sales': 'Sales',
    'finance-sales': 'Sales',
    'finance-expenses': 'Expenses',
    'finance-movements': 'Movements',
    'finance-loans': 'Loans',
    'finance-bank-management': 'Bank management',
    'finance-accounting': 'Accounting',
    'finance-bank-statement': 'Bank Statement',
    'finance-check-management': 'Check management',
    'finance-bookkeeper': 'Bookkeeper',
    'finance-vat': 'VAT',
    'metz-print': 'Print',
    'metz-master-control': 'Master control',
    'systems-user-management': 'User Management',
    'systems-integrations': 'Integrations',
    'systems-maintenance': 'Maintenance'
};

const mainTabs = ['operations', 'sales-marketing', 'human-resources', 'finance', 'systems', 'metzeler', 'purchasing'];

let currentTab = 'dashboard';
let currentMainTab = null;

const subToMainMap = {
    'operations-': 'operations',
    'sales-': 'sales-marketing',
    'hr-': 'human-resources',
    'finance-': 'finance',
    'metz-': 'metzeler',
    'systems-': 'systems',
    'purchasing-': 'purchasing'
};

const subParentMap = {
    'operations-layer-print-monthly': 'operations-layer-buildings',
    'finance-check-management': 'finance-bank-management',
    'finance-bank-statement': 'finance-bank-management',
    'hr-employees-manage-org-structure': 'hr-employees',
    'hr-salary-attendance': 'hr-salary',
    'hr-salary-overtime': 'hr-salary'
};

function getMainTab(tabId) {
    if (mainTabs.includes(tabId)) return tabId;
    for (const [prefix, main] of Object.entries(subToMainMap)) {
        if (tabId.startsWith(prefix)) return main;
    }
    return null;
}

function switchTab(tabId) {
    if (currentTab === tabId) {
        const existingModule = document.querySelector('#content-area .module-dashboard, #content-area .card, #content-area .data-table, #content-area .tracking-cards-row, #content-area .receivables-schedule-row, #content-area .transactions-row');
        const activeNav = document.querySelector('[data-tab="' + tabId + '"].nav-item.active, [data-tab="' + tabId + '"].subnav-item.active');
        if (existingModule && activeNav) {
            return;
        }
    }
    
    currentTab = tabId;
    
    // 1. Clear active & open states
    document.querySelectorAll('.nav-item, .nav-parent, .subnav-item').forEach(item => {
        item.classList.remove('active');
    });
    document.querySelectorAll('.subnav').forEach(sn => sn.classList.remove('open'));
    
    if (tabId === 'logout') {
        const logoutNav = document.querySelector('[data-tab="logout"]');
        if (logoutNav) logoutNav.classList.add('active');
        document.getElementById('page-title').textContent = 'Welcome back ' + getLoggedInUserName() + '!';
        document.getElementById('breadcrumb').textContent = '';
        return;
    }
    
    if (tabId === 'dashboard') {
        currentMainTab = null;
        document.getElementById('page-title').textContent = 'Welcome back ' + getLoggedInUserName() + '!';
        document.getElementById('breadcrumb').textContent = 'Dashboard';
        renderDashboard();
        return;
    }
    
    // 2. Handle Parent and Intermediate Subnav structures
    const mainTab = getMainTab(tabId);
    if (mainTab) {
        currentMainTab = mainTab;
        const parentNav = document.querySelector('[data-tab="' + mainTab + '"].nav-parent, [data-tab="' + mainTab + '"].nav-item');
        if (parentNav) parentNav.classList.add('active');
        
        const subnav = document.getElementById('subnav-' + mainTab);
        if (subnav) subnav.classList.add('open');
    }

    // 3. Handle intermediate deep-nesting maps
    const parentSub = subParentMap[tabId];
    if (parentSub) {
        const parentSubNavEl = document.querySelector('[data-tab="' + parentSub + '"].subnav-item');
        if (parentSubNavEl) parentSubNavEl.classList.add('active');
        
        const deepSubnav = document.getElementById('subnav-' + parentSub);
        if (deepSubnav) deepSubnav.classList.add('open');
    }
    
    // 4. Highlight selected tab
    const activeNav = document.querySelector('[data-tab="' + tabId + '"]');
    if (activeNav) {
        activeNav.classList.add('active');
    }
    
    document.getElementById('page-title').textContent = 'Welcome back ' + getLoggedInUserName() + '!';
    updateBreadcrumb(tabId);
    
    loadModule(tabId);
}

function updateBreadcrumb(tabId) {
    const breadcrumbEl = document.getElementById('breadcrumb');
    if (!breadcrumbEl) return;
    
    if (tabId === 'logout') {
        breadcrumbEl.textContent = '';
        return;
    }
    
    const mainTab = getMainTab(tabId);
    if (!mainTab) {
        breadcrumbEl.textContent = tabTitles[tabId] || '';
        return;
    }
    
    const mainTitle = tabTitles[mainTab] || mainTab;
    
    if (mainTab === tabId) {
        breadcrumbEl.textContent = mainTitle;
    } else {
        const subTitle = tabTitles[tabId] || tabId;
        const parentSub = subParentMap[tabId];
        if (parentSub && tabTitles[parentSub]) {
            breadcrumbEl.innerHTML = mainTitle + ' <span>/</span> ' + tabTitles[parentSub] + ' <span>/</span> ' + subTitle;
        } else {
            breadcrumbEl.innerHTML = mainTitle + ' <span>/</span> ' + subTitle;
        }
    }
}

function renderDashboard() {
    const contentArea = document.getElementById('content-area');
    document.getElementById('page-title').textContent = 'Welcome back ' + getLoggedInUserName() + '!';
    document.getElementById('breadcrumb').textContent = 'Dashboard';
    
    contentArea.innerHTML = '<div class="dashboard-welcome"><div class="dashboard-card"><h2>Welcome to Goldenfield ERP</h2><p>Select a module from the sidebar to get started.</p></div></div>';
}

let moduleLoadId = 0;

function loadModule(tabId) {
    const contentArea = document.getElementById('content-area');
    const scriptPath = tabModules[tabId];
    const currentLoadId = ++moduleLoadId;

    if (!scriptPath) {
        contentArea.innerHTML = '<div class="placeholder-content"><h2>' + (tabTitles[tabId] || 'Module') + '</h2><p>No module configured.</p></div>';
        return;
    }

    contentArea.innerHTML = '<div class="placeholder-content"><h2>' + (tabTitles[tabId] || 'Module') + '</h2><p>Loading module...</p></div>';

    window.__currentTabId = tabId;
    
    // Clean up previous module's global function before loading new script
    delete window.initializeModule;

    const script = document.createElement('script');
    script.src = scriptPath + '?t=' + Date.now();

    const cleanup = () => {
        if (script.parentNode) script.parentNode.removeChild(script);
    };

    const timeout = setTimeout(function() {
        if (moduleLoadId !== currentLoadId) return;
        cleanup();
        contentArea.innerHTML = '<div class="placeholder-content"><h2>' + (tabTitles[tabId] || 'Module') + '</h2><p>Module timed out while loading.</p></div>';
    }, 8000);

    script.onload = function() {
        clearTimeout(timeout);
        cleanup();
        if (moduleLoadId !== currentLoadId) return;
        
        // Now this safely checks if the NEWLY loaded script actually defined the function
        if (typeof window.initializeModule === 'function') {
            try {
                window.initializeModule(contentArea);
            } catch (err) {
                console.error('[MODULE RUNTIME ERROR]:', err);
            }
        } else {
            contentArea.innerHTML = '<div class="placeholder-content"><h2>' + (tabTitles[tabId] || 'Module') + '</h2><p>Module loaded. Add content in ' + scriptPath + '</p></div>';
        }
    };

    script.onerror = function() {
        clearTimeout(timeout);
        cleanup();
        if (moduleLoadId !== currentLoadId) return;
        contentArea.innerHTML = '<div class="placeholder-content"><h2>' + (tabTitles[tabId] || 'Module') + '</h2><p>Failed to load module: ' + scriptPath + '</p></div>';
    };

    document.head.appendChild(script);
}

// Delegated Sidebar Navigation Handler
document.addEventListener('DOMContentLoaded', function() {
    const sidebar = document.querySelector('.sidebar') || document.body;
    
    sidebar.addEventListener('click', function(e) {
        const targetNav = e.target.closest('.nav-item, .nav-parent, .subnav-item, .nav-item-logout');
        
        // Only trigger navigation if a valid sidebar navigation item was clicked
        if (targetNav) {
            e.preventDefault();
            e.stopPropagation();
            const tabId = targetNav.getAttribute('data-tab');
            if (tabId) switchTab(tabId);
        }
    });
    
    renderDashboard();
});
