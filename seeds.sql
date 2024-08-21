-- Create database and tables
CREATE DATABASE employee_management;

\c employee_management;

CREATE TABLE department (
    id SERIAL PRIMARY KEY,
    name VARCHAR(30) UNIQUE NOT NULL
);

CREATE TABLE role (
    id SERIAL PRIMARY KEY,
    title VARCHAR(30) UNIQUE NOT NULL,
    salary DECIMAL NOT NULL,
    department_id INTEGER NOT NULL REFERENCES department(id)
);

CREATE TABLE employee (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INTEGER NOT NULL REFERENCES role(id),
    manager_id INTEGER REFERENCES employee(id)
);

-- Insert sample departments
INSERT INTO department (name) VALUES ('Marketing'), ('IT'), ('Human Resources');

-- Insert sample roles
INSERT INTO role (title, salary, department_id) VALUES 
('Marketing Director', 85000, 1), 
('IT Specialist', 95000, 2), 
('HR Coordinator', 75000, 3);

-- Insert sample employees
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES 
('Alice', 'Johnson', 1, NULL),   -- Marketing Director
('Bob', 'Williams', 2, 1),       -- IT Specialist reporting to Alice
('Charlie', 'Davis', 3, 1);      -- HR Coordinator reporting to Alice
