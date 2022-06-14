INSERT INTO department (department_name)
VALUES ("Sales"),
       ("Engineering"),
       ("Finance"),
       ("Legal");

INSERT INTO employee_role (title, salary, department_id)
VALUES ("Salesperson", 100000, 1),
       ("Engineer", 200000, 2),
       ("Accountant", 80000, 3),
       ("Lawyer", 200000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Andrew", "McKelvey", 2, 0),
       ("Scandrew", "SmcKelvey", 1, 0),
       ("Slandrew", "Slakelvey", 3, 0),
       ("Mandrew", "ManKelvey", 4, 0);