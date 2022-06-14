const express = require('express');
const mysql = require('mysql2');
const inquirer = require("inquirer");

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

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

// Inquirer Questions
inquirer
  .prompt([
    {
      type: 'list',
      message: 'Please choose an option:',
      name: 'userChoice',
      choices: ['View all departments', 'View all roles', 'View all employees', 'Add a department', 'Add a role', 'Add an employee', 'Update an employee role'],
    }
  ])
  .then((data) => {
    const choice = data.userChoice;
    //console.log(choice);
    switch (choice) {
      case 'View all departments' : 
        console.log('view all departments', data);
      case 'View all roles' :
        console.log('view all roles', data);
      case 'Add a description' :
        console.log('add a department', data);
    }
});

// Default response for any other request (Not Found)
app.use((req, res) => {
  res.status(404).end();
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});