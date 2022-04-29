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
            "View All Departments", // display table
            "View All Roles", 
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
            viewEmployee();
        } else if (response.tasks ==="Update an Employee Role") {
            updateEmployeeRole();
        } else 
            connection.exit();
    })}

    function viewAllDepartments() {

    }

    function viewRoles() {

    }

    function viewEmployees() {
        
    }