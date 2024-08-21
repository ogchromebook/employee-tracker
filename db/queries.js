const client = require('./connection');

const getAllDepartments = async () => {
    const res = await client.query('SELECT * FROM department');
    return res.rows;
};

const getAllRoles = async () => {
    const res = await client.query('SELECT * FROM role');
    return res.rows;
};

const getAllEmployees = async () => {
    const res = await client.query('SELECT * FROM employee');
    return res.rows;
};

const addDepartment = async (name) => {
    await client.query('INSERT INTO department (name) VALUES ($1)', [name]);
};

const addRole = async (title, role_salary, department_id) => {
    await client.query('INSERT INTO role (title, role_salary, department_id) VALUES ($1, $2, $3)', [title, role_salary, department_id]);
};

const addEmployee = async (first_name, last_name, salary, role_id, manager_id) => {
    await client.query(
        'INSERT INTO employee (first_name, last_name, salary, role_id, manager_id) VALUES ($1, $2, $3, $4, $5)',
        [first_name, last_name, salary, role_id, manager_id]
    );
};

const updateEmployeeRole = async (id, role_id) => {
    await client.query('UPDATE employee SET role_id = $1 WHERE id = $2', [role_id, id]);
};

module.exports = {
    getAllDepartments,
    getAllRoles,
    getAllEmployees,
    addDepartment,
    addRole,
    addEmployee,
    updateEmployeeRole,
};
