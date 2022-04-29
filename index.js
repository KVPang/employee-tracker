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
    const query = "SELECT * FROM department"
}

function viewRoles() {
    const query = "SELECT * FROM roles"   
}

function viewEmployees() {
    const query = "SELECT * FROM employee"
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
function addEmployee() {
    inquirer.prompt([{
        type: "input",
        message: "What is the employee's first name?",
        name: "empFirstName"
    },
    {
        type: "input",
        message: "What is the employee's last name?",
        name: "empLastName"
    },
    {
        type: "input",
        message: "What is the employee's role?",
        name: "employeeRole",
        choices: [
            "Sales Lead",
            "Salesperson",
            "Lead Engineer",
            "Software Engineer",
            "Account Manager",
            "Accountant",
            "Legal Team Lead",
            "Lawyer"
        ]
    },
    {
        type: "input",
        message: "Who is the employee's manager?",
        name: "employeeMgr",
        choices: [
            "None",
            "John Doe",
            "Mike Chan",
            "Ashley Rodriguez",
            "Kevin Tupik",
            "Kunal Singh",
            "Malia Brown",
            "Sarah Lourd",
            "Tom Allen",
        ]
    }]).then(response => {
        mainMenu();
    })}

// update an employee 
function updateEmployee() {
    inquirer.prompt([
    {
        type: "input",
        message: "Which employee's role would you like to update?",
        name: ""
    },
    {
        type: "input",
        message: "Which role would you like to assign to the selected employee?",
        name: // add a new role
    
    }]).then(response => {
        mainMenu();
    })}