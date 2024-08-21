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

// Main function to display the menu and handle user actions
const mainMenu = async () => {
  // Prompt the user to choose an action from the menu
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

  // Handle the user's choice
  switch (action) {
    case "View all departments":
      // Fetch and display all departments
      const departments = await getAllDepartments();
      console.table(departments);
      break;

    case "View all roles":
      // Fetch and display all roles
      const roles = await getAllRoles();
      console.table(roles);
      break;

    case "View all employees":
      // Fetch and display all employees
      const employees = await getAllEmployees();
      console.table(employees);
      break;

    case "Add a department":
      // Prompt user to enter a new department name
      const { name: deptName } = await inquirer.prompt({
        name: "name",
        type: "input",
        message: "Enter the department name:",
      });
      // Add the new department to the database
      await addDepartment(deptName);
      break;

    case "Add a role":
      // Fetch all departments to populate the department choices
      const departmentsForRoles = await getAllDepartments();
      const departmentChoices = departmentsForRoles.map((dept) => ({
        name: dept.name,
        value: dept.id,
      }));
      // Prompt user to enter details for the new role
      const { title, role_salary, department_id } = await inquirer.prompt([
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
      // Add the new role to the database
      await addRole(title, role_salary, department_id);
      break;

    case "Add an employee":
      // Fetch all roles to populate the role choices
      const rolesForEmployees = await getAllRoles();
      const roleChoices = rolesForEmployees.map((role) => ({
        name: role.title,
        value: role.id,
      }));
      // Fetch all employees to populate the manager choices
      const employeesForManager = await getAllEmployees();
      const managerChoices = employeesForManager.map((employee) => ({
        name: `${employee.first_name} ${employee.last_name}`,
        value: employee.id,
      }));
      // Add an option for "None" if no manager is applicable
      managerChoices.push({ name: "None", value: null });

      // Prompt user to enter details for the new employee
      const { first_name, last_name, salary, role_id, manager_id } =
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
            name: "salary",
            type: "input",
            message: "Enter the employee's salary:",
          },
          {
            name: "role_id",
            type: "list",
            message: "Select the role:",
            choices: roleChoices,
          },
          {
            name: "manager_id",
            type: "list",
            message: "Select the manager:",
            choices: managerChoices,
          },
        ]);
      // Add the new employee to the database
      await addEmployee(first_name, last_name, salary, role_id, manager_id);
      break;

    case "Update an employee role":
      // Fetch all employees to populate the employee choices
      const employeesForUpdate = await getAllEmployees();
      const employeeChoices = employeesForUpdate.map((employee) => ({
        name: `${employee.first_name} ${employee.last_name}`,
        value: employee.id,
      }));

      // Fetch all roles to populate the new role choices
      const rolesForUpdate = await getAllRoles();
      const updateRoleChoices = rolesForUpdate.map((role) => ({
        name: role.title,
        value: role.id,
      }));
      // Prompt user to select an employee and their new role
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
      // Update the employee's role in the database
      await updateEmployeeRole(id, newRoleId);
      break;

    case "Exit":
      client.end();
      return;
  }
  mainMenu();
};

mainMenu();
