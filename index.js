// inquirer, mysql, and console.table packages 
const inquirer = require('inquirer');
const mysql = require('mysql2');
// const cTable = require('console.table');

//  connection to sql
const connection = mysql.createConnection(
    {
    host: 'localhost',
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
            process.exit();
    })}

// connected to tables formatted in seeds
async function viewAllDepartments() {
    const viewAllDept = await connection.promise().query("SELECT * FROM department")
    console.table(viewAllDept[0])
    mainMenu()
}

async function viewRoles() {
    const viewAllRoles = await connection.promise().query("SELECT title, salary, department.name FROM roles LEFT JOIN department on roles.department_id = department.id")  
    console.table(viewAllRoles[0])
    mainMenu()
}

async function viewEmployees() {
    const viewAllEmployees = await connection.promise().query("SELECT employee.first_name, employee.last_name, roles.title, roles.salary, department.name, manager.last_name AS manager FROM employee LEFT JOIN roles on roles.id = employee.role_id  LEFT JOIN department on department.id = roles.department_id LEFT JOIN employee manager on employee.manager_id = manager.id")
    console.table(viewAllEmployees[0])
    mainMenu()
}

// prompt functions //
// adding a department 
function addDept() {
    inquirer.prompt([{
        type: "input",
        message: "Please enter the name of the department you would like to add",
        name: "name"
        }]).then(async response => {
            const addDeptSql = await connection.promise().query("INSERT into department SET ?", response)
            console.log("Added a department!")
        mainMenu();
    })}


// add a role
async function addRoles() {
    const depts = await connection.promise().query("SELECT department.id AS value, department.name AS name FROM department")
    inquirer.prompt([{
        type: "input",
        message: "What is the title of the role?",
        name: "title"
    },
    {
        type: "input",
        message: "Please provide the salary amount for this role:",
        name: "salary"
    },
    {
        type: "list",
        message: "Which department will this role belong to?",
        name: "department_id", 
        choices: depts[0]
    }]).then(async response => {
        const addEmpRole = await connection.promise().query("INSERT into roles SET ?", response)
        console.log("Added a role")
        mainMenu();
    })}


// add an employee
async function addEmployee() {
    const employees = await connection.promise().query("SELECT employee.id AS value, employee.last_name AS name FROM employee")
    const empRole = await connection.promise().query("SELECT roles.id AS value, roles.title AS name FROM roles")
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
        const addEmpSql = await connection.promise().query("INSERT into employee SET ?", response)
        console.log("Added an employee")
        mainMenu();
    })}

// update an employee 
async function updateEmployee() {
    const employees = await connection.promise().query("SELECT employee.id AS value, employee.last_name AS name FROM employee")
    const empRole = await connection.promise().query("SELECT roles.id AS value, employee.title AS name FROM roles")
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
        const updateEmpSql = await connection.promise().query("UPDATE employee SET role_id = ? WHERE id = ?", [response.role_id, response.id])
        console.log("Employee updated!")
        mainMenu();
    })}

    mainMenu()