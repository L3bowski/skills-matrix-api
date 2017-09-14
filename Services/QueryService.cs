using Microsoft.EntityFrameworkCore;
using SkillsMatrixApi.Commons;
using SkillsMatrixApi.Models;
using System;
using System.Collections.Generic;
using System.Linq;

namespace SkillsMatrixApi.Services
{
    public class QueryService: BaseService
    {
        public QueryService(SkillsMatrixContext context)
            :base(context)
        {
        }

        public IEnumerable<Employee> MostSkilledEmployees() {
            var employees = db.Employees
            .Include(e => e.EmployeeSkills)
            .ThenInclude(es => es.Skill)
            .OrderByDescending(e => e.EmployeeSkills.Count)
            .ThenBy(e => e.Name)
            .Take(5)
            .ToList();

            employees.ForEach(employee => {
                employee.Skills = employee.EmployeeSkills.Select(es => es.Skill).ToList();
            });

            return employees;
        }

        public IEnumerable<Skill> RearestSkills() {
            var skills = db.Skills
            .Include(s => s.SkillEmployees)
            .ThenInclude(se => se.Employee)
            .OrderBy(s => s.SkillEmployees.Count)
            .ThenBy(s => s.Name)
            .Take(5)
            .ToList();

            skills.ForEach(skill => {
                skill.Employees = skill.SkillEmployees.Select(se => se.Employee).ToList();
            });

            return skills;
        }
    }
}
