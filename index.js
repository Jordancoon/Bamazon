var mysql = require("mysql");
var inquirer = require("inquirer");
var Table = require("cli-table2");
var chalk = require("chalk");
var firstRun = require('first-run');
var figlet = require('figlet');


// Store DB connection + credentials
// config.js is in gitignore to ease cross-machine development
var mysql_config = require("../config.js");
var connection = mysql.createConnection(mysql_config);

function start() {
  if (process.argv[2]==="clear") {
    clearFirstRun();
  }
  if (firstRun()) {
    console.log('\033c'); // clears out the terminal... usually.
    renderLogo();
  }
  connection.connect(function(err) {
    if (err) throw err;
    fetchDepartments();
  });
}

// Reset the app state
function clearFirstRun() {
  // See https://www.npmjs.com/package/first-run
  firstRun.clear();
}

function renderLogo() {
  figlet.text('bamazon', {
      font: 'Big',
      horizontalLayout: 'default',
      verticalLayout: 'fitted'
  }, function(err, data) {
      if (err) {
          console.log('Something went wrong...');
          console.dir(err);
          return;
      }
      console.log(chalk.rgb(255,153,0)(data));
  });
}

function fetchAllProducts() {
  var query = "SELECT * FROM products";
  connection.query(
    query,
    function(err, res){
      if (err) throw err;
      displayProductsInTable(res);
      selectProduct();
    }
  );
}

function fetchProductsInDepartment(department) {
  var query = "SELECT * FROM products WHERE department_name = ?";
  connection.query(
    query,
    department,
    function(err, res){
      if (err) throw err;
      displayProductsInTable(res);
      selectProduct();
    }
  );
}

function displayProductsInTable(data) {
  var table = new Table({
    head: ["ID", "Product", "Department", "Price", "In Stock"],
    colWidths: [5, 30, 20, 8, 10],
    style: {
      border: [],
      header: []
    },
    wordWrap:true
  });
  for (var i = 0; i < data.length; i++) {
    table.push([
      data[i].id,
      data[i].product_name,
      data[i].department_name,
      "$"+data[i].price.toFixed(2),
      data[i].stock_quantity
    ]);
  }
  console.log(table.toString());
}

function fetchDepartments() {
  var query = "SELECT DISTINCT department_name FROM products ORDER BY department_name ASC";
  connection.query(
    query,
    function(err, res){
      if (err) throw err;
      selectDepartment(res);
    }
  );
}

function selectDepartment(data) {
  var departmentArray = [];
  for (var i = 0; i < data.length; i++) {
    departmentArray.push(data[i].department_name);
  }
  inquirer.prompt([
    {
      name: "department",
      type: "list",
      message: "Choose a department",
      choices: departmentArray
    }
  ])
  .then(function (answers) {
    fetchProductsInDepartment(answers.department);
  });
}

function selectProduct() {
  inquirer.prompt([
    {
      name    : "product_id",
      message : "Which product do you want to buy? (Enter the ID number.)",
      validate: function (value) {
        var valid = !isNaN(parseFloat(value));
        return valid || 'Please enter a number';
      },
      filter: Number
    },
    {
      name    : "quantity",
      message : "And how many do you want to buy?",
      validate: function (value) {
        var valid = !isNaN(parseFloat(value));
        return valid || 'Please enter a number';
      },
      filter: Number
    }
  ]).then(function(answers){
    checkStock(answers);
  });
}

function checkStock(answers) {
  var query = [
    "SELECT stock_quantity, price from products",
    "WHERE id = ?"
  ];
  query = query.join(" ");
  connection.query(
    query,
    answers.product_id, // for placeholder
    function (err, res) {
      if (err) throw err;
      var requestedQuantity = parseInt(answers.quantity);
      var currentStock = parseInt(res[0].stock_quantity);
      if (requestedQuantity>currentStock) {
        console.log("Sorry! You requested "+chalk.blue(requestedQuantity)+" of that item, but we only have "+chalk.blue(currentStock)+".");
        selectProduct();
      } else {
        var newQuantity = currentStock - requestedQuantity;
        updateQuantity(answers.product_id, newQuantity);
        console.log(chalk.green("──────────────────────────────────"));
        console.log(chalk.green("Total cost of your purchase: $"+totalCost(requestedQuantity, parseFloat(res[0].price))));
        console.log(chalk.green("──────────────────────────────────"));
        shopOrExit();
      }
    }
  );
}

function updateQuantity(id, newQuantity) {
  var query = [
    "UPDATE products",
    "SET stock_quantity = ?",
    "WHERE id = ?"
  ];
  query = query.join(" ");
  connection.query(
    query,
    [newQuantity, id],
    function (err, res) {
      if (err) throw err;
    }
  );
}

function shopOrExit() {
  inquirer.prompt([
    {
        name: "fork",
        type: "list",
        message: "What would you like to do now?",
        choices : ["Keep Shopping", "Exit"]
    }
  ])
  .then(function (answers) {
    if (answers.fork === "Keep Shopping") {
      console.log('\033c'); // clears out the terminal... usually.
      fetchDepartments();
    } else {
      console.log('\033c'); // clears out the terminal... usually.
      console.log(chalk.rgb(255,153,0)("Thanks for shopping with us!"));
      process.exit();
    }
  });
}

function totalCost(quantity, price) {
  var total = quantity * price;
  return total.toFixed(2);
}

/* ============================================= */

start();