var inquirer = require("inquirer");
var mysql = require("mysql");


// var item_number;
// var product_name;
// var department_name;
// var price;
// var stock;


var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "Toggafreggin123",
  database: "bamazon_db"
});


connection.connect(function(err){
  if (err) throw err;
  console.log("connected as id " + connection.threadId + "\n");
  availableProducts();
});

function availableProducts(){

  var query = connection.query(
    "SELECT * FROM products", function (err,res){
      console.log("Welcome to Bamazon!")
      console.log("Our current inventory is . . . . \n")
      console.log("Item-Number" + " | " + "Product Name" + " | " + "Department" + " | " + "Price" + " | " + "Stock" + " | ");
      console.log("_____________________________________________________________");
      for (var i = 0; i < res.length; i++) {
        console.log(res[i].item_number + " | " + res[i].product_name + " | " + res[i].department_name + " | " +  res[i].price + " | " +  res[i].stock + " | ")
      }
      console.log("------------------------------------------------------------");
      customerPurchase();
  });


};

function customerPurchase() {
  inquirer.prompt([{
    name: "item_number",
    type: "input",
    message: "What item number are you looking for?: "
  },
  {
    name: "stock",
    type: "input",
    message: "How many would you like to purchase?: "
  }])
  .then (function(answer){
    // console.log(answer);
    var query = "SELECT item_number, price, stock FROM products WHERE item_number=? ";
    connection.query(query, [answer.item_number], function(err, res){

      if (answer.stock <= res.stock){
        console.log("Insufficient Inventory!");
      } else {
        console.log("Your order is being processed. Your total is: $" +  parseFloat(answer.stock * res[0].price));
        remainingStock(answer);
        availableProducts();
      };
        //console.log("Item_Number: " + answer.item_number + " | Stock: " + answer.stock);
  })
 });
};

function remainingStock(answer){
  var query = connection.query ("UPDATE products SET stock=stock - ? WHERE item_number=?",
   [answer.stock, answer.item_number],
  function(err, res){
    console.log(res.affectedRows + " products updated!\n")

  })
}
