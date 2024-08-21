// Import the database client from the connection file
const client = require('./connection');

// Function to fetch all departments from the database
const getAllDepartments = async () => {
    // Execute SQL query to select all departments
    const res = await client.query('SELECT * FROM department');
    // Return the rows from the result
    return res.rows;
};

// Function to fetch all roles from the database
const getAllRoles = async () => {
    // Execute SQL query to select all roles
    const res = await client.query('SELECT * FROM role');
    // Return the rows from the result
    return res.rows;
};

// Function to fetch all employees from the database
const getAllEmployees = async () => {
    // Execute SQL query to select all employees
    const res = await client.query('SELECT * FROM employee');
    // Return the rows from the result
    return res.rows;
};

// Function to add a new department to the database
const addDepartment = async (name) => {
    // Execute SQL query to insert a new department
    await client.query('INSERT INTO department (name) VALUES ($1)', [name]);
};

// Function to add a new role to the database
const addRole = async (title, role_salary, department_id) => {
    // Execute SQL query to insert a new role
    await client.query('INSERT INTO role (title, role_salary, department_id) VALUES ($1, $2, $3)', [title, role_salary, department_id]);
};

// Function to add a new employee to the database
const addEmployee = async (first_name, last_name, salary, role_id, manager_id) => {
    // Execute SQL query to insert a new employee
    await client.query(
        'INSERT INTO employee (first_name, last_name, salary, role_id, manager_id) VALUES ($1, $2, $3, $4, $5)',
        [first_name, last_name, salary, role_id, manager_id]
    );
};

// Function to update the role of an existing employee
const updateEmployeeRole = async (id, role_id) => {
    // Execute SQL query to update the employee's role
    await client.query('UPDATE employee SET role_id = $1 WHERE id = $2', [role_id, id]);
};

// Export the functions for use in other parts of the application
module.exports = {
    getAllDepartments,
    getAllRoles,
    getAllEmployees,
    addDepartment,
    addRole,
    addEmployee,
    updateEmployeeRole,
};

