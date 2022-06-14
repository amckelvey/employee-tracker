const mysql = require('mysql2');
const inquirer = require("inquirer");
const consoleTable = require("console.table");

// Connect to database
const db = mysql.createConnection(
  {
    host: 'localhost',
    // MySQL username,
    user: 'root',
    // MySQL password
    password: 'rootpassword',
    database: 'company_db'
  },
  console.log(`Connected to the company_db database.`)
);

const selectFromDepartment = () => {
  db.query('SELECT * FROM department', function (err, results) {
    console.table(results);
    userSelection();
  });
};

const selectFromRole = () => {
  db.query('SELECT * FROM employee_role', function (err, results) {
    console.table(results);
    userSelection();
  });
};

const selectFromEmployee = () => {
  db.query('SELECT * FROM employee', function (err, results) {
    console.table(results);
    userSelection();
  });
};

const addADepartment = () => {
  inquirer
    .prompt([
      {
        type: "input",
        message: "What is the new departments name:",
        name: "department"
      }
    ])
    .then((data) => {
      const { department } = data;
      db.query(`INSERT INTO department(department_name) VALUES ("${department}")`),
        (err) => {
          if (err) throw err;
          console.log(`${department} has successfully been added.`)
        }
      userSelection();
    });
};

const addARole = () => {
  db.query('SELECT * FROM department', (err, response) => {
    if (err) throw err;
    inquirer
      .prompt([
        {
          type: "input",
          message: "What is the name of the new role:",
          name: "title"
        },
        {
          type: "input",
          message: "What is the roles salary:",
          name: "salary"
        },
        {
          type: "list",
          message: "What department is this role in:",
          name: "department",
          choices: () => {
            const options = [];
            for (i = 0; i < response.length; i++) {
              options.push(response[i].department_name);
            }
            return options;
          },
        }
      ])
      .then((data) => {
        const { title, salary } = data;
        let departmentId
        for (let i = 0; i < response.length; i++) {
          if (response[i].department_name === data.department) {
            departmentId = response[i];
          }
        };
        let department_id = departmentId.id;
        db.query(`INSERT INTO employee_role (title, salary, department_id) VALUES ("${title}", ${salary}, ${department_id})`, (err) => {
          if (err) throw err;
          console.log("The new role has been added.");
          userSelection();
        });
      });
  });
};

const addAnEmployee = () => {
  db.query('SELECT * FROM employee JOIN employee_role ON ', (err, response) => {
    if (err) throw err;
    inquirer
      .prompt([
        {
          type: "input",
          message: "What is the name of the new employee:",
          name: "title"
        },
        {
          type: "input",
          message: "What is their role:",
          name: "title"
        },
        {
          type: "input",
          message: "What is their salary:",
          name: "salary"
        },
        {
          type: "list",
          message: "What department is this role in:",
          name: "department",
          choices: () => {
            const options = [];
            for (i = 0; i < response.length; i++) {
              options.push(response[i].department_name);
            }
            return options;
          },
        }
      ])
      .then((data) => {
        db.query(``, (err) => {
          if (err) throw err;
          userSelection();
        });
      });
  });
};

const userSelection = () => {
  inquirer
    .prompt([
      {
        type: 'list',
        message: 'Please choose an option:',
        name: 'userChoice',
        choices: ['View all departments', 'View all roles', 'View all employees', 'Add a department', 'Add a role', 'Add an employee', 'Update an employee role', 'exit'],
      }
    ])
    .then((data) => {
      const choice = data.userChoice;
      //console.log(choice);
      switch (choice) {
        case 'View all departments':
          selectFromDepartment();
          break;
        case 'View all roles':
          selectFromRole();
          break;
        case 'View all employees':
          selectFromEmployee();
          break;
        case 'Add a department':
          addADepartment();
          break;
        case 'Add a role':
          addARole();
          break;
        case 'Add an employee':
          // addAnEmployee();
          break;
        case 'Update an employee role':
          // updateEmployeeRole();
          break;
        case 'exit':
          process.exit();
      }
    });
};

userSelection();