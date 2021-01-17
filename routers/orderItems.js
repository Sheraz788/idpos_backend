const express = require("express")
const mysql = require("mysql")
const moment = require("moment")

const orderItemsRouter = express.Router()


//Get request for orderItems 

orderItemsRouter.get("/orderItems", (req, res)=>{


    var orderItemsQuery = "Select * from orderItems"

    getConnection().query(orderItemsQuery, (err, rows, fields) =>{

        if(err){

            console.log("Error in Fetching Order Items" + err);
            res.send(err)
            res.sendStatus(500)
            
        }

        console.log("Order Items Data is fetched")

        res.send(rows)
        res.end()


    })


})


//Get request for order Items using parameters ....
orderItemsRouter.get("/orderItems/:orderId", (req, res)=>{

    const orderID = req.params.orderId

    const getProductQuery = "SELECT * FROM orderItems WHERE OrderID = ?"

    getConnection().query(getProductQuery, [orderID], (err, rows, fields)=>{


        if(err){

            console.log("Error with Order Items parameters" + err);
            res.send(err)    

        }else{
            console.log("Data is fetched with Order Items parameters")

            res.send(rows)
            res.end()
        }

        


    })




})


//Post request for Order Items ...

//Getting Current Date and Time
var dateTime = moment(new Date()).format('YYYY-MM-DD HH:mm:ss')

orderItemsRouter.post("/create_orderItems", (req, res)=>{

    const orderItems = req.body

    console.log(orderItems)

    const createOrderItemsQuery = "INSERT INTO `idpos`.`orderItems`(`DateTime`, `UserID`,`Quantity`,`Price`,`Status`, `StoreProductID`,`StoresID`, `StoresRetailerID`, `OrderID`)VALUES(?,?,?,?,?,?,?,?,?)"

    getConnection().query(createOrderItemsQuery, [dateTime, orderItems.UserID, orderItems.Quantity, orderItems.Price, orderItems.Status, orderItems.StoreProductID, orderItems.StoresID, orderItems.StoresRetailerID, orderItems.OrderID], (err, results, fields)=>{

        if(err){

            console.log("Error in Inserting orderItems" + err)
            res.sendStatus(500)
        }else{
            console.log("Order Items Data Inserted ....")
            res.send()
            res.end()
    }


    })

})


//Updating product ...
orderItemsRouter.put("/update_orderItems/:orderId", (req, res)=>{

    const orderItems = req.body
    const orderID = req.params.orderId

    const updateOrderItemsQuery = "UPDATE `idpos`.`orderItems` SET `DateTime` = ?, `Quantity` = ?, `Price` = ?, `Status` = ? WHERE `OrderID` = ?"

    getConnection().query(updateOrderItemsQuery, [orderItems.DateTime, orderItems.Quantity, orderItems.Price, orderItems.Status, orderID], (err, results, fields)=>{

        if(err){

            console.log("Error in updating orderItems..." + err);
            res.sendStatus(500)

        }else{

            console.log("Order Items Data is updated");
            res.send(results)
            res.end()
            

        }


    })

})



//Delete order Items ...
orderItemsRouter.delete("/delete_orderItems/:orderID", (req, res)=>{

    const orderItems = req.body
    const orderID = req.params.orderID

    const deleteOrderItemsQuery = "DELETE FROM idpos.orderItems WHERE orderID = ?"

    getConnection().query(deleteOrderItemsQuery, [orderID], (err, results, fields)=>{

        if(err){

            console.log("Error in deleting order Items ..." + err);
            res.sendStatus(500)

        }else{

            console.log("order Items is Deleted ...");
            res.send(results)
            res.end()
            

        }


    })

})


//Get Notification of OrderItems

orderItemsRouter.get("/get_notifications", (req, res)=>{


    var notifiactionQuery = "select c.Name as CustomerName, c.Mobile as Contact, s.StoreName, p.Description as ProductName, oi.Quantity as Quantity, oi.Price as Price from orderitems oi join storesproducts sp on (oi.StoreProductID = sp.ProductID) join products p  on (oi.StoreProductID = p.ProductID) join orders o on(oi.OrderID = o.OrderID) join customers c on (c.CustomerID = o.CustomerID) join stores s on (sp.StoreID = s.StoreID)"


    getConnection().query(notifiactionQuery, (err, rows, fields)=>{

        if(err){

            console.log("Error in getting Notification" + err)
            res.sendStatus(500)

        }else{

            console.log("Notifications are fetched")
            res.send({notifications: rows})
            res.end()
        }


    })





})


//Creating Database Connection

const pool = mysql.createPool({
    connectionLimit: 10,
    host: "localhost",
    user: "root",
    password: "",
    database: "idpos"

})

function getConnection(){

    return pool;

}


module.exports = orderItemsRouter