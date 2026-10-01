function initializeModule(contentArea) {
    const currentTab = window.__currentTabId || 'metzeler';

    const sections = {
        'metzeler': {
            title: 'Metzeler\'s Workspace',
            description: 'Overview of all Metzeler modules.',
            showButton: false
        }
    };

    const section = sections[currentTab] || sections['metzeler'];

    contentArea.innerHTML = `
        <div class="header-actions">
            <h2>${section.title}</h2>
        </div>
        <div class="tracking-cards-row">
            <div class="card tracking-card">
                <h3>Todo list</h3>
                <ul class="todo-list">
                    <li><input type="checkbox" checked><span class="todo-text done">Review Metzeler weekly report</span></li>
                    <li><input type="checkbox"><span class="todo-text">Update production schedule</span></li>
                    <li><input type="checkbox"><span class="todo-text">Approve pending inventory request</span></li>
                    <li><input type="checkbox" checked><span class="todo-text done">Send client follow-up email</span></li>
                    <li><input type="checkbox"><span class="todo-text">Prepare monthly KPI deck</span></li>
                </ul>
            </div>
            <div class="card tracking-card">
                <h3>My Agenda</h3>
                <div class="calendar-grid">
                    <div class="cal-header">Sun</div>
                    <div class="cal-header">Mon</div>
                    <div class="cal-header">Tue</div>
                    <div class="cal-header">Wed</div>
                    <div class="cal-header">Thu</div>
                    <div class="cal-header">Fri</div>
                    <div class="cal-header">Sat</div>
                    <div class="cal-day empty"></div>
                    <div class="cal-day empty"></div>
                    <div class="cal-day empty"></div>
                    <div class="cal-day">1</div>
                    <div class="cal-day">2</div>
                    <div class="cal-day">3</div>
                    <div class="cal-day">4</div>
                    <div class="cal-day">5</div>
                    <div class="cal-day">6</div>
                    <div class="cal-day">7</div>
                    <div class="cal-day">8</div>
                    <div class="cal-day">9</div>
                    <div class="cal-day">10</div>
                    <div class="cal-day">11</div>
                    <div class="cal-day">12</div>
                    <div class="cal-day today">13</div>
                    <div class="cal-day">14</div>
                    <div class="cal-day">15</div>
                    <div class="cal-day">16</div>
                    <div class="cal-day">17</div>
                    <div class="cal-day">18</div>
                    <div class="cal-day">19</div>
                    <div class="cal-day">20</div>
                    <div class="cal-day">21</div>
                    <div class="cal-day">22</div>
                    <div class="cal-day">23</div>
                    <div class="cal-day">24</div>
                    <div class="cal-day">25</div>
                    <div class="cal-day">26</div>
                    <div class="cal-day">27</div>
                    <div class="cal-day">28</div>
                    <div class="cal-day">29</div>
                    <div class="cal-day">30</div>
                    <div class="cal-day">31</div>
                </div>
            </div>
            <div class="card tracking-card">
                <h3>Upcoming Birthdays</h3>
                <ul class="birthday-list" id="upcoming-birthday-list">
                    <li><span class="bday-name" style="color: #999;">Loading...</span></li>
                </ul>
            </div>
        </div>
        <div class="card project-management-box">
            <div class="card-header-row">
                <h3>Project Management</h3>
                <button class="btn-add-project">+ Add Project</button>
            </div>
            <p class="section-description">Plan projects and deadlines for the week</p>
            <div class="planner-grid">
                <div class="planner-col">
                    <div class="planner-head">Sun</div>
                    <div class="planner-body"></div>
                </div>
                <div class="planner-col">
                    <div class="planner-head">Mon</div>
                    <div class="planner-body"></div>
                </div>
                <div class="planner-col">
                    <div class="planner-head">Tue</div>
                    <div class="planner-body"></div>
                </div>
                <div class="planner-col">
                    <div class="planner-head">Wed</div>
                    <div class="planner-body"></div>
                </div>
                <div class="planner-col">
                    <div class="planner-head">Thu</div>
                    <div class="planner-body"></div>
                </div>
                <div class="planner-col">
                    <div class="planner-head">Fri</div>
                    <div class="planner-body"></div>
                </div>
                <div class="planner-col">
                    <div class="planner-head">Sat</div>
                    <div class="planner-body"></div>
                </div>
            </div>
        </div>
    `;

    loadUpcomingBirthdays();
}

async function loadUpcomingBirthdays() {
    const list = document.getElementById('upcoming-birthday-list');
    if (!list) return;

    const renderMessage = (text) => {
        list.innerHTML = `<li><span class="bday-name" style="color: #999;">${text}</span></li>`;
    };

    try {
        const res = await fetch('/api/employee-profiles/active');
        if (!res.ok) throw new Error('Failed to load active employees');
        const employees = await res.json();
        if (!Array.isArray(employees) || employees.length === 0) {
            renderMessage('No active employees');
            return;
        }

        const today = new Date();
        const todayMonth = today.getMonth();
        const todayDay = today.getDate();

        const upcoming = employees
            .filter(emp => emp.birthdate)
            .map(emp => {
                const bday = new Date(emp.birthdate);
                if (isNaN(bday.getTime())) return null;
                let month = bday.getMonth();
                let day = bday.getDate();
                let year = today.getFullYear();
                if (month < todayMonth || (month === todayMonth && day < todayDay)) {
                    year += 1;
                }
                const nextBirthday = new Date(year, month, day);
                const daysAway = Math.round((nextBirthday - new Date(today.getFullYear(), todayMonth, todayDay)) / 86400000);
                return { emp, bday, month, day, year, daysAway };
            })
            .filter(Boolean)
            .sort((a, b) => a.daysAway - b.daysAway)
            .slice(0, 5);

        if (upcoming.length === 0) {
            renderMessage('No upcoming birthdays');
            return;
        }

        list.innerHTML = upcoming.map(item => {
            const name = `${item.emp.last_name || ''}, ${item.emp.first_name || ''}`.replace(/^,\s*|\s*,\s*$/g, '').trim() || item.emp.employee_id || '';
            const dateLabel = item.bday.toLocaleDateString('en-US', { month: 'short', day: '2-digit' });
            const relative = item.daysAway === 0 ? 'Today' : item.daysAway === 1 ? 'Tomorrow' : `in ${item.daysAway} days`;
            return `<li><span class="bday-name">${name}</span><span class="bday-date" title="${relative}">${dateLabel}</span></li>`;
        }).join('');
    } catch (err) {
        console.error('Failed to load upcoming birthdays:', err);
        renderMessage('Failed to load birthdays');
    }
}
