use tick9test;

CREATE DATABASE employee_onboarding;
USE employee_onboarding;

CREATE TABLE employee_data (
    id INT AUTO_INCREMENT PRIMARY KEY,
    full_name VARCHAR(255) NOT NULL,
    date_of_birth DATE NOT NULL,
    telephone VARCHAR(20) NOT NULL,
    ni_number VARCHAR(15) NOT NULL,
    bank_name VARCHAR(255) NOT NULL,
    sort_code VARCHAR(8) NOT NULL,
    account_number VARCHAR(10) NOT NULL,
    emergency_contact_name VARCHAR(255) NOT NULL,
    emergency_contact_number VARCHAR(20) NOT NULL,
    health_issues TEXT,
    additional_info TEXT,
    submission_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

SELECT * FROM employee_data;
FLUSH PRIVILEGES;
