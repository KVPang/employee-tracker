-- table data

-- departments table
INSERT INTO department (department_name)
VALUES ("Sales", "Engineering", "Finance", "Legal" )

-- roles table
INSERT INTO roles (title, salary, department_id)
VALUES  ("Sales Lead", 100000, ),
        ("Salesperson", 80000, ),
        ("Lead Engineer", 150000, ),
        ("Software Engineer", 120000, ),
        ("Account Manager", 160000, ),
        ("Accountant", 125000, ),
        ("Legal Team Lead", 250000, ),
        ("Lawyer", 190000, );

-- employees table
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("John", "Doe", 1, null),
       ("Mike", "Chan", 2),
       ("Ashley", "Rodriguez", 3, null),
       ("Kevin", "Tupik", 4),
       ("Kunal", "Singh", 5, null),
       ("Malia", "Brown", 6),
       ("Sarah", "Lourd", 7, null),
       ("Tom", "Allen", 8);
