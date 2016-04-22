var mysql = require('mysql');
var prompt = require('prompt');
var selection = process.argv[2];

var con = mysql.createConnection({
	host	: 'localhost',
	user	: 'root',
	password: '',
	database: 'Bamazon'
});

con.connect(function (err) {
	if(err){
		console.log (err);
	}
});

var managerMenu = function(){
	con.query("select * from products", function (err, products) {
	if(err){
		return err;
	}

	console.log('Menu: 1) View Products for Sale    2) View low Inventory     3) Add to Inventory     4) Add new Product    5) Exit');

	prompt.get(['Option'], function (err, result) {

		switch(result.Option) {
    case '1':
        for (var i = 0; i < products.length; i++) {
		console.log('Product ID: ' + products[i].ProductID + ', Product Name: ' + products[i].DepartmentName + ' ' + products[i].ProductName + ', Price: ' + products[i].Price + ', Quantity: ' + products[i].StockQuantity);
		console.log('-------------------------------------------------------')
		};
		managerMenu();
        break;
    case '2':
    	for (var i = 0; i < products.length; i++) {
    	if (products[i].StockQuantity < 5) {
		console.log('Item: ' + products[i].DepartmentName + ' ' + products[i].ProductName + ', Quanitity: ' + products[i].StockQuantity);
		console.log('-------------------------------------------------------')
			};
		};
		managerMenu();
        break;
    case '3':
    	prompt.stop();
    	console.log('Add to Inventory');
    	prompt.get(['ProductID', 'Add'], function(err, result){
    		for (var i = 0; i < products.length; i++) {
    			if (result.ProductID == products[i].ProductID) {
    				con.query("UPDATE bamazon.products SET StockQuantity=" + (parseInt(products[i].StockQuantity) + parseInt(result.Add)) + " WHERE ProductID=" + products[i].ProductID +";", function (err, products) {
    						managerMenu();
    					}); //query
    			} //if
    		}//for	
    	});
        break;
    case '4':
        prompt.stop();
    	console.log('Add a Product');
    	prompt.get(['Product', 'Department', 'Price', 'Quantity'], function(err, result){
    				con.query("INSERT INTO bamazon.products (ProductName, DepartmentName, Price, StockQuantity) VALUES (" + result.Product + ", " + result.Department + ", " + result.Price + ", " + result.Quantity + ");", function (err, products) {
    					if(err){
    						return err;
    					};
    					console.log('updated');
    					managerMenu();
    					}); //query
    	});
        break;
    case '5':
    	console.log('Ending session');
        process.exit()
        break;
    default:
        console.log('Not an Option');
}

}); //prompt
	

}); //query
};
console.log('Welcome to the manager menu');
managerMenu();

