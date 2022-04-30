// inquirer, mysql, and console.table packages 
const inquirer = require('inquirer');
const mysql = require('mysql2');
const cTable = require('console.table');

//  connection to sql
const connection = mysql.createConnection(
    {
    host: 'localhost',
    port: 3005,
    user: 'root',
    password: 'password',
    database: 'employees_db'
    }
);

//  First prompt asking the user to confirm an action 
function mainMenu() {
    inquirer.prompt([{
        type: "list",
        message: "What would you like to do?",
        name: "tasks",
        choices: [
            "View All Departments", // display a table
            "View All Roles", // display a table
            "View All Employees", // display a table
            "Add a Department", // prompt - enter the department name, then department is added to the database
            "Add a Role",  // prompt - enter name, salary, department, then the role is added to the database
            "Add an Employee", // prompt - enter employee's first name, last name, role & mgr, then employee is added to the database
            "Update an Employee Role", // prompt - select an employee to update their role, then the information is added to the database 
            "Exit"] // close/quit the app 
    }]).then(response => {
        console.log(response)
        if (response.tasks ==="View All Departments") {
            viewAllDepartments();
        } else if (response.tasks ==="View All Roles") {
            viewRoles();
        } else if (response.tasks ==="View All Employees") {
            viewEmployees();
        } else if (response.tasks ==="Add a Department") {
            addDept();
        } else if (response.tasks ==="Add a Role") {
            addRoles();
        } else if (response.tasks ==="Add an Employee") {
            addEmployee();
        } else if (response.tasks ==="Update an Employee Role") {
            updateEmployee();
        } else 
            connection.exit();
    })}

// connected to tables formatted in seeds
function viewAllDepartments() {
    connection.query("SELECT * FROM department",
    mainMenu())
}

function viewRoles() {
    connection.query("SELECT * FROM roles",   
    mainMenu())
}

function viewEmployees() {
    connection.query("SELECT * FROM employee.first_name, employee.last_name",
    mainMenu())
}

// prompt functions //
// adding a department 
function addDept() {
    inquirer.prompt([{
        type: "input",
        message: "Please enter the name of the department you would like to add",
        name: "addDepartment"
        }]).then(response => {
        mainMenu();
    })}


// add a role
function addRoles() {
    inquirer.prompt([{
        type: "input",
        message: "What is the name of the role?",
        name: "nameOfRole"
    },
    {
        type: "input",
        message: "Please provide the salary amount for this role:",
        name: "roleSalary"
    },
    {
        type: "input",
        message: "Which department will this role belong to?",
        name: "roleDepartment", 
        choices: ["Sales",
        "Engineering",
        "Finance",
        "Legal"
        ]
    }]).then(response => {
        mainMenu();
    })}


// add an employee
async function addEmployee() {
    const employees = await connection.promise.query("SELECT employee.id AS value, employee.last_name AS name FROM employee")
    const empRole = await connection.promise.query("SELECT roles.id AS value, employee.title AS name FROM roles")
    console.log(employee)
    inquirer.prompt([{
        type: "input",
        message: "What is the employee's first name?",
        name: "first_name"
    },
    {
        type: "input",
        message: "What is the employee's last name?",
        name: "last_name"
    },
    {
        type: "list",
        message: "What is the employee's role?",
        name: "role_id",
        choices: empRole[0]
    },
    {
        type: "list",
        message: "Who is the employee's manager?",
        name: "manager_id",
        choices: employees[0]
    }]).then(async response => {
        const addEmpSql = await connection.promise.query("INSERT into employee SET ?", response)
        console.log("Added an employee")
        mainMenu();
    })}

// update an employee 
async function updateEmployee() {
    const employees = await connection.promise.query("SELECT employee.id AS value, employee.last_name AS name FROM employee")
    const empRole = await connection.promise.query("SELECT roles.id AS value, employee.title AS name FROM roles")
    inquirer.prompt([
    {
        type: "list",
        message: "Which employee's role would you like to update?",
        name: "id",
        choices: employees[0]
    },
    {
        type: "list",
        message: "Which role would you like to assign to the selected employee?",
        name: "role_id",
        choices: empRole[0]
    
    }]).then(async response => {
        const updateEmpSql = await connection.promise.query("UPDATE employee SET role_id = ? WHERE id = ?", [response.role_id, response.id])
        console.log("Employee updated!")
        mainMenu();
    })}