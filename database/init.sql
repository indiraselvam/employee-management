CREATE DATABASE IF NOT EXISTS employee_db;

USE employee_db;

CREATE TABLE IF NOT EXISTS employees (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    department VARCHAR(100) NOT NULL,
    salary DECIMAL(10, 2) NOT NULL
);

INSERT INTO employees (name, email, department, salary)
VALUES
    ('Arun Kumar', 'arun@example.com', 'IT', 60000.00),
    ('Priya Sharma', 'priya@example.com', 'HR', 55000.00),
    ('Rahul Kumar', 'rahul@example.com', 'Finance', 65000.00);
