-- Drop the database if it already exists
DROP DATABASE IF EXISTS employee_management;

-- Create the employee_management database
CREATE DATABASE employee_management;

-- Connect to the database
\c employee_management;

-- Create the department table
CREATE TABLE department (
    id SERIAL PRIMARY KEY,
    name VARCHAR(30) UNIQUE NOT NULL
);

-- Create the role table
CREATE TABLE role (
    id SERIAL PRIMARY KEY,
    title VARCHAR(30) UNIQUE NOT NULL,
    role_salary DECIMAL,
    department_id INTEGER NOT NULL REFERENCES department(id)
);

-- Create the employee table with salary column added
CREATE TABLE employee (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INTEGER NOT NULL REFERENCES role(id),
    manager_id INTEGER REFERENCES employee(id),
    salary DECIMAL NOT NULL
);

-- Insert sample departments
INSERT INTO department (name) VALUES ('Marketing'), ('IT'), ('Human Resources');

-- Insert sample roles
INSERT INTO role (title, role_salary, department_id) VALUES 
('Marketing Director', 85000, 1), 
('IT Specialist', 95000, 2), 
('HR Coordinator', 75000, 3);

-- Insert sample employees with dynamically fetched role_id
INSERT INTO employee (first_name, last_name, role_id, manager_id, salary) VALUES 
('Alice', 'Johnson', (SELECT id FROM role WHERE title = 'Marketing Director'), NULL, 85000),    -- Marketing Director
('Bob', 'Williams', (SELECT id FROM role WHERE title = 'IT Specialist'), 1, 95000),             -- IT Specialist reporting to Alice
('Charlie', 'Davis', (SELECT id FROM role WHERE title = 'HR Coordinator'), 1, 75000);           -- HR Coordinator reporting to Alice


