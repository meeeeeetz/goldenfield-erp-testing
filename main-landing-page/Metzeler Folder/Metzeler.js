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
                <ul class="birthday-list">
                    <li><span class="bday-name">Juan Dela Cruz</span><span class="bday-date">Jul 18</span></li>
                    <li><span class="bday-name">Maria Santos</span><span class="bday-date">Jul 25</span></li>
                    <li><span class="bday-name">Pedro Reyes</span><span class="bday-date">Aug 02</span></li>
                    <li><span class="bday-name">Ana Garcia</span><span class="bday-date">Aug 10</span></li>
                    <li><span class="bday-name">Carlos Mendoza</span><span class="bday-date">Aug 14</span></li>
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
}
