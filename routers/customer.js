const express = require("express")
const mysql = require("mysql")
const moment = require("moment")

const customerRouter = express.Router()


//Get request for customer 

customerRouter.get("/customer", (req, res)=>{


    var customersQuery = "Select * from customers"

    getConnection().query(customersQuery, (err, rows, fields) =>{

        if(err){

            console.log("Error in Fetching Customers" + err);
            
        }

        console.log("Customers Data is fetched")

        res.send(rows)
        res.end()


    })


})


//Get request for customers using parameters ....
customerRouter.get("/customer/:userId", (req, res)=>{

    const userID = req.params.userId

    const getRetailerQuery = "SELECT * FROM customers WHERE UserID = ?"

    getConnection().query(getRetailerQuery, [userID], (err, rows, fields)=>{


        if(err){

            console.log("Error with customer parameters" + err);
            

        }

        console.log("Data is fetched with customer parameters")

        res.send(rows)
        res.end()


    })




})


//Post request for customer ...

//Getting Current Date and Time
var dateTime = moment(new Date()).format('YYYY-MM-DD HH:mm:ss')

customerRouter.post("/create_customer", (req, res)=>{

    const customer = req.body

    // console.log(customer)
    const createCustomerQuery = "INSERT INTO `idpos`.`customers`(`Name`,`Mobile`,`Telephone`,`Address`,`Email`,`DateTime`,`UserID`,`Status`)VALUES(?,?,?,?,?,?,?,?)"

    getConnection().query(createCustomerQuery, [customer.Name, customer.Mobile, customer.Telephone, customer.Address, customer.Email, dateTime, customer.UserID, customer.Status], (err, results, fields)=>{

        if(err){

            console.log("Error in Inserting Customer" + err)
            res.sendStatus(500)
        }else{
            console.log("Customer Data Inserted ....")
            res.send(results)
            res.end()
    }


    })

})


//Updating Customer ...
customerRouter.put("/update_customer/:userId", (req, res)=>{

    const customer = req.body
    const customerUserID = req.params.userId

    const updateCustomerQuery = "UPDATE `idpos`.`customers` SET `Name` = ?, `Mobile` = ?, `Telephone` = ?, `Address` = ?, `Email` = ?, `DateTime` = ?, `Status` = ? WHERE `UserID` = ?"

    getConnection().query(updateCustomerQuery, [customer.Name, customer.Mobile, customer.Telephone, customer.Address, customer.Email, customer.DateTime, customer.Status, customerUserID], (err, results, fields)=>{

        if(err){

            console.log("Error in updating customer..." + err);
            res.sendStatus(500)

        }else{

            console.log("Customer Data is updated");
            res.send(results)
            res.end()
            

        }


    })

})



//Delete Customer ...
customerRouter.delete("/delete_customer/:userId", (req, res)=>{

    const retailer = req.body
    const customerUserID = req.params.userId

    const deleteCustomerQuery = "DELETE FROM idpos.customers WHERE UserID = ?"

    getConnection().query(deleteCustomerQuery, [customerUserID], (err, results, fields)=>{

        if(err){

            console.log("Error in deleting customer..." + err);
            res.sendStatus(500)

        }else{

            console.log("Customer is Deleted ...");
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


module.exports = customerRouter