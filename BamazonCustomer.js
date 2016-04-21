var mysql = require('mysql');
var prompt = require('prompt');

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
	console.log('Your are connected');
});

con.query("select * from products", function(err, products){
	if (err) {
		return err;
	};




	for (var i = 0; i < products.length; i++) {
		console.log('Product ID: ' + products[i].ProductID + ', Product Name: ' + products[i].DepartmentName + ' ' + products[i].ProductName + ', Price: $' + products[i].Price);
	console.log('------------------------------------------------------');
	};

	prompt.get(['ProductID', 'Quantity'], function (err, result) {

    console.log('  ProductID: ' + result.ProductID);
    console.log('  Quantity: ' + result.Quantity);

    for (var i = 0; i < products.length; i++) {
    	if (result.ProductID == products[i].ProductID) {
	    	if (products[i].StockQuantity < result.Quantity) {
	    		console.log('Sorry, not enough stock');
	    	}

	    var orderToatal = (result.Quantity * products[i].Price);
	    var newStockQuantity = (products[i].StockQuantity - result.Quantity);

	    	if (products[i].StockQuantity >= result.Quantity) {
	    		console.log('Order total: ' + orderToatal)
	    	};
	    }; //if

	    
    }; //for

    con.query("UPDATE products SET StockQuantity =" + newStockQuantity + " WHERE ProductID = " + result.ProductID + ";", function(err, products){
			if (err) {
			return console.log(err);
		}
			console.log('sql updated');
    	}) //query



  }); //prompt

}); //query

