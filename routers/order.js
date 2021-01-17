const express = require("express")
const mysql = require("mysql")
const moment = require("moment")

const orderRouter = express.Router()


//Get request for order 

orderRouter.get("/order", (req, res)=>{


    var orderQuery = "Select * from orders"

    getConnection().query(orderQuery, (err, rows, fields) =>{

        if(err){

            console.log("Error in Fetching Orders data" + err);
            
        }

        console.log("Orders Data is fetched")

        res.send({orders: rows})
        res.end()


    })


})


//Get request for store using parameters ....
// orderRouter.get("/store/:storename", (req, res)=>{

//     const storeName = req.params.storename

//     const getStoreQuery = "SELECT * FROM stores WHERE StoreName = ?"

//     getConnection().query(getStoreQuery, [storeName], (err, rows, fields)=>{


//         if(err){

//             console.log("Error with store parameters" + err);
            

//         }

//         console.log("Data is fetched with store parameters")

//         res.send(rows)
//         res.end()


//     })




// })


//Post request for order ...

//Getting Current Date and Time
var dateTime = moment(new Date()).format('YYYY-MM-DD HH:mm:ss')

orderRouter.post("/create_order", (req, res)=>{

    const order = req.body

    const createOrderQuery = "INSERT INTO `idpos`.`orders` (`DateTime`, `CustomerID`, `StoreID`, `RetailerID`, `UserID`, `PaymentMethod`, `Status`) VALUES(?,?,?,?,?,?,?)"

    getConnection().query(createOrderQuery, [dateTime, order.CustomerID, order.StoreID, order.RetailerID, order.UserID, order.PaymentMethod, order.Status], (err, results, fields)=>{

        if(err){

            console.log("Error in Inserting Order" + err)
            res.sendStatus(500)
        }else{
            console.log("Order Data Inserted ....")
            res.send()
            res.end()
    }

    })

})


//Updating Order ...
orderRouter.put("/update_order/:orderId", (req, res)=>{

    const order = req.body
    const orderID = req.params.orderId

    const updateOrderQuery = "UPDATE `idpos`.`orders` SET `DateTime` = ?, `PaymentMethod` = ?, `Status` = ?  WHERE `OrderID` = ?"

    getConnection().query(updateOrderQuery, [order.DateTime, order.PaymentMethod, order.Status, orderID], (err, results, fields)=>{

        if(err){

            console.log("Error in updating Order..." + err);
            res.send(err)
            res.sendStatus(500)

        }else{

            console.log("Order Data is updated");
            res.send(results)
            res.end()
            

        }


    })

})



//Delete Order ...
orderRouter.delete("/delete_order/:orderId", (req, res)=>{

    const orderID = req.params.orderId

    const deleteOrderQuery = "DELETE FROM idpos.orders WHERE orderID = ?"

    getConnection().query(deleteOrderQuery, [orderID], (err, results, fields)=>{

        if(err){

            console.log("Error in deleting Order ..." + err);

            const error = {"DeletingError" : "Error occurred in deleting ..."}
            res.send([results, error])
            res.sendStatus(500)

        }else{

            console.log("Order is Deleted ...");
            res.send(results)
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


module.exports = orderRouter