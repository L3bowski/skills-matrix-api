window.application = window.application || {};
window.application.home = window.application.home || {};
    
// View
(function() {
    var htmlNodes = {
        employeesLoader : $('#employees-loader'),
        employeesList: $('#employees-list'),
        employeesKeywords: $('#employees-keywords'),
        skillsLoader : $('#skills-loader'),
        skillsList: $('#skills-list'),
        skillsKeywords: $('#skills-keywords')
    };
    var utils = window.application.utils;

    function update(state) {
        for (var key in update) {
            var updater = update[key];
            updater(state);
        }
    }

    update.employees = function (state) {
        utils.fillList(htmlNodes.employeesList, state.employees, {
            elementDrawer: function (employee) {
                return '<li class="list-group-item"><a class="reset" href="/employees/details?id=' + employee.Id + '">' + employee.Name +
                '</a><span class="badge floating">' + employee.Skills.length + '</span></li>';
            },
            noResultsHtml: '<i>No employees found</i>'
        });
    };

    update.skills = function (state) {
        utils.fillList(htmlNodes.skillsList, state.skills, {
            elementDrawer: function (skill) {
                return '<li class="list-group-item"><a class="reset" href="/skills/details?id=' + skill.Id + '">' + skill.Name +
                '</a><span class="badge floating">' + skill.Employees.length + '</span></li>';
            },
            noResultsHtml: '<i>No skills found</i>'
        });
    };

    window.application.home.htmlNodes = htmlNodes;
    window.application.home.update = update;
})();

// Actions
(function() {
    var ajax = window.application.ajax;
    var utils = window.application.utils;
    var htmlNodes = window.application.home.htmlNodes;
    var update = window.application.home.update;

    function attachEvents(state) {
        $().ready(utils.eventLinker(initializeView, state));
    }

    function initializeView(state, event) {
        _loadSkills(state);
        _loadEmployees(state);
    }

    function _loadSkills(state) {
        utils.longOperation(skillsPromise, htmlNodes.skillsLoader);

        function skillsPromise() {
            return ajax.get('/api/skill/getRearest', [])
            .then(function(skills) {
                state.skills = skills;
                update.skills(state);
            });
        }
    }

    function _loadEmployees(state) {
        utils.longOperation(employeesPromise, htmlNodes.employeesLoader);

        function employeesPromise() {
            return ajax.get('/api/employee/getMostSkilled', [])
            .then(function(employees) {
                state.employees = employees;
                update.employees(state);
            });
        }
    }

    window.application.home.attachEvents = attachEvents;
})();

// Model
(function() {
    var state = {
        employees: [],
        skills: []
    };

    window.application.home.attachEvents(state);
    window.application.home.state = state;
})();
