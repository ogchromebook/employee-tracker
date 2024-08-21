const inquirer = require("inquirer");
const {
  getAllDepartments,
  getAllRoles,
  getAllEmployees,
  addDepartment,
  addRole,
  addEmployee,
  updateEmployeeRole,
} = require("./db/queries");

const mainMenu = async () => {
  const { action } = await inquirer.prompt({
    name: "action",
    type: "list",
    message: "What would you like to do?",
    choices: [
      "View all departments",
      "View all roles",
      "View all employees",
      "Add a department",
      "Add a role",
      "Add an employee",
      "Update an employee role",
      "Exit",
    ],
  });

  switch (action) {
    case "View all departments":
      const departments = await getAllDepartments();
      console.table(departments);
      break;
    case "View all roles":
      const roles = await getAllRoles();
      console.table(roles);
      break;
    case "View all employees":
      const employees = await getAllEmployees();
      console.table(employees);
      break;
    case "Add a department":
      const { name: deptName } = await inquirer.prompt({
        name: "name",
        type: "input",
        message: "Enter the department name:",
      });
      await addDepartment(deptName);
      break;
    case "Add a role":
      const departmentsForRoles = await getAllDepartments();
      const departmentChoices = departmentsForRoles.map((dept) => ({
        name: dept.name,
        value: dept.id,
      }));

      const { title, salary, department_id } = await inquirer.prompt([
        {
          name: "title",
          type: "input",
          message: "Enter the role title:",
        },
        {
          name: "salary",
          type: "input",
          message: "Enter the role salary:",
        },
        {
          name: "department_id",
          type: "list",
          message: "Select the department:",
          choices: departmentChoices,
        },
      ]);
      await addRole(title, salary, department_id);
      break;
    case "Add an employee":
      const rolesForEmployees = await getAllRoles();
      const roleChoices = rolesForEmployees.map((role) => ({
        name: role.title,
        value: role.id,
      }));

      const employeesForManager = await getAllEmployees();
      const managerChoices = employeesForManager.map((employee) => ({
        name: `${employee.first_name} ${employee.last_name}`,
        value: employee.id,
      }));
      managerChoices.push({ name: "None", value: null });

      const { first_name, last_name, role_id, manager_id } =
        await inquirer.prompt([
          {
            name: "first_name",
            type: "input",
            message: "Enter the first name:",
          },
          {
            name: "last_name",
            type: "input",
            message: "Enter the last name:",
          },
          {
            name: "role_id",
            type: "list",
            message: "Select the role:",
            choice: roleChoices,
          },
          {
            name: "manager_id",
            type: "list",
            message: "Select the manager:",
            choices: managerChoices,
          },
        ]);
      await addEmployee(first_name, last_name, role_id, manager_id);
      break;
    case "Update an employee role":
      const employeesForUpdate = await getAllEmployees();
      const employeeChoices = employeesForUpdate.map((employee) => ({
        name: `${employee.first_name} ${employee.last_name}`,
        value: employee.id,
      }));

      const rolesForUpdate = await getAllRoles();
      const updateRoleChoices = rolesForUpdate.map((role) => ({
        name: role.title,
        value: role.id,
      }));
      const { id, newRoleId } = await inquirer.prompt([
        {
          name: "id",
          type: "list",
          message: "Select the employee:",
          choices: employeeChoices,
        },
        {
          name: "newRoleId",
          type: "list",
          message: "Select the new role:",
          choices: updateRoleChoices,
        },
      ]);
      await updateEmployeeRole(id, newRoleId);
      break;
    case "Exit":
      client.end();
      return;
  }
  mainMenu();
};

mainMenu();
