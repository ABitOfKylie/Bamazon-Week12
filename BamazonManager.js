var mysql = require('mysql');
var prompt = require('prompt');
var colors = require('colors/safe');
var inquirer = require('inquirer');
var chalk = require('chalk');

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "password",
    database: "Bamazon"
})

var collection = [];
var colors = [];
var product = "";
var itemNumber = 0;

connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id" + connection.threadId);

})
manager();

function manager() {
    inquirer.prompt([{
        type: "confirm",
        message: "Are you REALLY an authorized manager? Click your conscience.",
        name: "managerQ"
    }]).then(function questions (yes) {
        if (yes.managerQ) {
            inquirer.prompt([{
                type: "list",
                name: "choices",
                message: "What would you like to do?",
                choices: ["View Product Sales", "View Low Inventory", "Add to Inventory", "Add New Product", "Eat Lunch"]
            }]).then(function(user) {
                switch (user.choices) {
                    case 'View Product Sales':
                        view();
                        break;
                    case 'View Low Inventory':
                        lowInv(user.choices);
                        break;
                    case 'Add to Inventory':
                        updateQty(user.choices);
                        break;
                    case 'Add New Product':
                        addProduct(user.choices);
                        break;
                    case 'Eat Lunch':
                        console.log(chalk.inverse.bold("There's a great pizza place down the road a bit."));
                        break;
                }
            })
        } else {
            console.log(chalk.italic.bold("Go borrow the manager's keys and we will sneak out together.\n\n"));
            manager();

        }
    })
};


function view() {
    console.log("************** All Products For Sale ******************");
    connection.query("SELECT * FROM products ORDER BY ProductName", function(err, res) {
        for (var i = 0; i < res.length; i++) {
            console.log(res[i].ItemID + " | " + res[i].ProductName + " | " + "$" + res[i].Price);

            console.log("*******************************************************");
        }
    })
};

function lowInv() {
    console.log("***************Alert Low Inventory!!!******************");
    connection.query("SELECT * FROM products WHERE StockQuantity <= 4 ORDER BY StockQuantity DESC", function(err, res) {
        for (var i = 0; i < 12; i++) {
            console.log(res[i].ItemID + " | " + res[i].DepartmentName + " | " + res[i].ProductName + " | " + "$" + res[i].Price + " | " + res[i].StockQuantity);


            console.log("*******************************************************");
        }
    })

};

function updateQty() {
    inquirer.prompt([{
        type: "confirm",
        message: "Do you want to update your inventory?",
        name: "updateQ"
    }]).then(function(yes) {
        if (yes.updateQ) {
            inquirer.prompt([{
                    type: "input",
                    name: "itemID",
                    message: "What is the ItemID number of the product that you would like to update?"
                },

                {
                    type: "input",
                    name: "ProductName",
                    // choices:I would like to insert "ProductNames" from query into inquirer list choices 
                    message: "What is the name of the product that you would like to update?",
                }, {
                    type: "input",
                    name: "newQty",
                    validate: function(value) {
                        if (isNaN(value)) {
                            console.log('please enter a number')
                            return false;
                        } else {
                            return true;
                        }
                    },
                    // property: pattern: /^[0-maxitemID] would like to limit .. check documentation
                    message: "What is the new inventory total for that product?",
                }

            ]).then(function(response) {
                console.log(response);
                connection.query("UPDATE products SET StockQuantity = newQty WHERE ? ", { ItemID: itemID },
                    function(err, res) {
                        console.log("There are now " + response.newQty + response.ProductName + "(s) in stock.");
                        questions();
                    })
            });
        } else {
            console.log("Ok, changing your mind is always an option.");
            questions();
        }
    })
};

function addProduct(userchoices) {
    inquirer.prompt([{
        type: "confirm",
        message: "Do you want to add a new product to your inventory?",
        name: "productAddQ"
    }]).then(function(yes) {
        if (yes.productAddQ) {
            inquirer.prompt([{
                type: "list",
                name: "department",
                message: "In which department does the product belong?",
                choices: ["Cosmetics", "Hardware", "Kitchen"]
            }, {
                type: "input",
                name: "product",
                message: "What is the name of the product that you would like to add to your inventory?"
            }, {
                type: "input",
                name: "description",
                message: "What is the description of the product that you would like to update?"
            }, {
                type: "input",
                name: "price",
                validate: function(value) {
                        if (isNaN(value)) {
                            console.log('please enter a number')
                            return false;
                        } else {
                            return true;
                        }
                    },
                message: "What is the retail price of the product?"
            }, {
                type: "input",
                name: "inventory",
                validate: function(value) {
                        if (isNaN(value)) {
                            console.log('please enter a number')
                            return false;
                        } else {
                            return true;
                        }
                    },
                message: "What is the initial inventory for the product?"
            }]).then(function(itemID, ProductName, newQty) {

					connection.query('INSERT INTO Products SET ?',{
                                DepartmentName:userchoices.department,
                                ProductName:userchoices.product,
                                Price:userchoices.price,
                                StockQuantity:userchoices.inventory
                                }, function(err, res3){});
                     console.log("ideally - ");

                console.log("this is where you will one day summarize the input ask for confirm and then do the query");
                console.log("today -- you will just blindly trust the user input and do the query");
                //   	connection.query("INSERT INTO products () VALUES () , function(err, res) {
                // console.log("*******************************************************");
			
                connection.query("SELECT * FROM products WHERE (StockQuantity < = 4) ORDER BY ProductName", function(err, res) {

                    console.log(res[i].ItemID + " | " + res[i].ProductName + " | " + "$" + res[i].Price);
                    console.log("*******************************************************");

                })
            })
        } else{
        	manager();
        }



    connection.query("SELECT * FROM products WHERE (StockQuantity < = 4) ORDER BY ProductName", function(err, res) {
        for (var i = 0; i < res.length; i++) {
            console.log(res[i].ItemID + " | " + res[i].ProductName + " | " + "$" + res[i].Price);
            console.log("*******************************************************");
        }
    })

})


// **************************Notes to Self & Hopes for the Future**********
// list menu options: 
// View products for Sale, View Low Inventory, Add to Inventory, Add New Product

// If View products for Sale - list all items: ItemID, ProductName, Price, StockQuantity

//  View Low Inventory - list all items lower than 5

// Add to Inventory - display prompt to let mgr add more to (StockQuantity)
// Add New Product - allow mgr to add a completely new product to the store

// ****************************npm Inquirer for Challenge #2 ************************

// much later - look at Reactive Interface - add questions to be asked, next question...


// much later : npm install console.table --save
// bower install console.table --save
// Bower for front-end packages and npm for developer tools...
// console.table ('several objects', [....]); 
//  with column names.... var values = [ ['total price', 30], ['ProductName, itemChoice']];
// then console.table([ 'colTitle1', 'colTitle2'], values);

// *****************************Challenge #2 ************************************
// var ProductsForSale = ; might have to use npm console to get column headings  skip for Loop and type in manually or- could use display function from BamazonCustomer... export??? or just copy
// var LowInventory = ; Select ItemID, ProductName, Price, StockQuantity
// 					FROM products
// 					ORDER BY ProductName
// 					WHERE StockQuantity <5;
// var AddInventory = ; UPDATE products SET StockQuantity = result from inquirer user input WHERE ItemID = user input;
// var NewProduct = ; INSERT INTO products VALUES 
