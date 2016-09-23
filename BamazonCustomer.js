//  1) display all items available for sale - include ids, names, prices of products.
// prompt with 2 messages 1) ID of product they would like to buy 2) how many units 

//  check if store (stock quantity) has enough product to meet request
// if not: console.log (Insufficient quantity!) in red and prevent order from going through
// if enough product - fulfill customer order - update db to show remaining quantity - when update complete show customer total cost of their purchase #of units * Price

var mysql = require('mysql');
var prompt = require('prompt');
var colors = require('colors/safe');
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "password",
    database: "Bamazon"
})

var newQty = 0;
// stockQuantity-howMany see line 97
var howMany = 0;
// user chooses.

var itemPrice = 0;
var itemChoice = 0;
var choiceID = 0;
// var totalCost = howMany * itemPrice;
//remember to reset values each new start
// prompt.start();

connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id" + connection.threadId);

})

display();

function display() {
    connection.query("SELECT * FROM products", function(err, res) {
        for (var i = 0; i < res.length; i++) {
            console.log(res[i].ItemID + " | " + res[i].ProductName + " | " + "$" + res[i].Price);
            console.log("*******************************************************");
        }
    })
    initPrompt();
};

// initPrompt();

// .then -- initprompt

prompt.message = colors.bold.blue("Question!");
prompt.delimiter = colors.green("");


function initPrompt() {
    prompt.get({
        properties: {
            item: {
                description: colors.blue("Please enter the ItemID of the product you wish to buy."),
                // if isNAN (item) ==false, return true, else 
                message: colors.red("Please enter a valid item number.")
            },
            quantity: {
                description: colors.blue("How many would you like to buy?"),
                // if isNAN (item) ==false, return true, else 
                message: colors.red("Please enter a valid number. Max. 10 products per customer.")
            }
        }
    }, function(err, res) {
        console.log(res);
        itemChoice = res.item; 
        howMany = res.quantity;
        console.log(howMany);
        console.log(itemChoice);
        checkQty(itemChoice, howMany);
        // pull values itemID, product name, price, (var howMany, itemPrice, itemChoice,)
    })
}


// 
function checkQty(itemChoice, howMany) {
    connection.query("SELECT StockQuantity, Price, ProductName FROM products WHERE ? ", { ItemID: itemChoice }, function(err, result) {
        var product = result[0].ProductName;
        console.log(colors.bold.green("You chose " + howMany + "  " + product + "(s)"));

        var currentQty = result.StockQuantity;
        itemPrice = result[0].Price;
        totalCost = howMany * itemPrice;

        if (currentQty <= 0 || currentQty < howMany) {
            console.log(colors.bold.red("Insufficient Quantity"));
            console.log(colors.orange("There are only " + currentQty + "available."));
            console.log("Please choose a smaller quantity or another item");
            display();
            initPrompt();
        } else {
            console.log(colors.bold.blue("Yes, we have " + howMany + " in stock."));
            orderProduct();
            newQty = currentQty - howMany;

        }
    });
};

function orderProduct(itemChoice) {
    connection.query("UPDATE products SET StockQuantity = newQty WHERE ? ", { ItemID: itemChoice }, function(err, res) {
        console.log(colors.bold.blue("The total cost of your order is  $ " + totalCost));
        console.log(colors.bold.green("Your product(s) will be shipped to you shortly"));
        // display();
        // initPrompt(); 
    })
};

// + " = " + howMany + " x  " + itemChoice.

//   prompt.get(['username', 'email'], function (err, result) {
//     if (err) { return onErr(err); }
//     console.log('Command-line input received:');
//     console.log('  Username: ' + result.username);
//     console.log('  Email: ' + result.email);
//   });

//   function onErr(err) {
//     console.log(err);
//     return 1;
//   }
