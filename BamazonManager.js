// list menu options: 
	// View products for Sale, View Low Inventory, Add to Inventory, Add New Product

	// If View products for Sale - list all items: ItemID, ProductName, Price, StockQuantity

	//  View Low Inventory - list all items lower than 5

	// Add to Inventory - display prompt to let mgr add more to (StockQuantity)
	// Add New Product - allow mgr to add a completely new product to the store

// ****************************npm Inquirer for Challenge #2 ************************
// Is it okay to use Inquirer for the list of menu options?
// npm install inquirer... var inquirer = require ('inquirer');
// inquirer.prompt ([]).then(function (answers)});
// {type: "list"}  type, name, message, choices
// {type: "input"} type, name, message
// much later - look at Reactive Interface - add questions to be asked


	// much later : npm install console.table --save
	// bower install console.table --save
	// Bower for front-end packages and npm for developer tools...
	// console.table ('several objects', [....]); 
	//  with column names.... var values = [ ['total price', 30], ['ProductName, itemChoice']];
	 // then console.table([ 'colTitle1', 'colTitle2'], values);

// *****************************Challenge #2 ************************************
// var ProductsForSale = ; might have to use npm console to get column headings  skip for Loop and type in manually or- could use display function from BamazonCustomer... export??? or just copy
// var LowInventory = ; Select ItemID, ProductName, StockQuantity, COUNT (StockQuantity) AS 'Amount'
// 					FROM products
// 					GROUP BY StockQuantity
// 					ORDER BY ProductName
// 					HAVING Amount <5;
// var AddInventory = ; UPDATE products SET StockQuantity = result from inquirer user input WHERE ItemID = user input;
// var NewProduct = ; INSERT INTO products VALUES ("input1(ProductName)","input2(Department)","input3 (Price)","input4(StockQuantity)");
// separate questions objects different names - make sep variables for each input = pull result.name
