var inquirer = require("inquirer");
var mysql = require("mysql");

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
  avaialableProducts();
});

function avaialableProducts(){
  console.log("Our current inventory is . . . . \n")
  var query = connection.query(
    "SELECT * FROM products", function (err,res){
      for (var i = 0; i < res.length; i++) {
        console.log(res[i].item_number + " | " + res[i].product_name + " | " + res[i].department_name + " | " +  res[i].price + " | " +  res[i].stock + " | ")
      }
      console.log("------------------------------------------------------------");
    customerPurchase();
  });
  console.log("Item-Number" + " | " + "Product Name" + " | " + "Department" + " | " + "Price" + " | " + "Stock" + " | ");
};

function customerPurchase() {
  inquirer.prompt([{
    name: "item_number",
    type: "input",
    message: "What item are you looking for? (By Item Number Please): "
  },
  {
    name: "stock",
    type: "input",
    message: "How many would you like to purchase?: "
  }])
  .then (function(answer){
    var query = "SELECT item_number, stock FROM products WHERE ? AND ?";
    connection.query(query, [answer.item_number, answer.stock], function(err, res){
      for (var i = 0; i < res.length; i++) {
        console.log("Item_Number: " + res[i].item_number + " | Stock: " + res[i].stock);
      }
     avaialableProducts();
    })
  })
};

function remainingStock(){
  
}
