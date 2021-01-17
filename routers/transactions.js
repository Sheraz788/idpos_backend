const express = require("express")
const mysql = require("mysql")
const moment = require("moment")


const transactionRouter = express.Router()


//Get request for Store's Retailer

transactionRouter.get("/storeretailer/:storeId", (req, res)=> {

    var storeID = req.params.storeId

    var storeRetailerQuery = "select s.RetailerID from retailers r join stores s on (r.RetailerID = s.RetailerID) where s.StoreID = ?"


    getConnection().query(storeRetailerQuery, [storeID], (err, rows, fields) =>{

        if(err){

            console.log("Error in fetching Retailer for store Transaction!")
            res.send(500)

        }else{

            console.log("Retailer are fetched for store transaction!")
            res.send(rows)
            res.end()


        }



    })


})


//Get product detail based on the BardCode Entered

transactionRouter.get("/productdetail/:storeId&:barcode", (req, res)=>{

    var barcode = req.params.barcode
    var storeId = req.params.storeId

    var productDetailQuery = "select sp.ProductID, p.Description, sp.Price, sp.Quantity from products p join storesproducts sp on (p.ProductID = sp.ProductID) where sp.storeID = ? and p.Barcode = ?"


    getConnection().query(productDetailQuery, [storeId,barcode] ,(err, rows, fields) => {

        if(err){

            console.log("Error in fetching product detail for transaction")
            res.send(500)

        }else{

            console.log("Product detail is fetched for transaction ... ")
            res.send({products: rows})
            res.end()

        }



    })



})


//Performing transaction

var datetime = moment(new Date()).format('YYYY-MM-DD HH:mm:ss')

transactionRouter.post("/post_transaction", (req, res) => {

    var transactionDetail = req.body

    var transactionInsertQuery = "INSERT INTO `idpos`.`storetransactions`(`TxnType`,`ProductID`,`CustomerID`,`StoreID`,`RetailerID`,`DistributorID`,`Quantity`,`Price`,`UOM`,`DateTime`,`UserID`,`Status`)VALUES(?,?,?,?,?,?,?,?,?,?,?,?)"

    getConnection().query(transactionInsertQuery, [transactionDetail.TxnType, transactionDetail.ProductID, transactionDetail.CustomerID, transactionDetail.StoreID, transactionDetail.RetailerID, transactionDetail.DistributorID, transactionDetail.Quantity, transactionDetail.Price, transactionDetail.UOM, datetime, transactionDetail.UserID, transactionDetail.Status], (err, results, fields) => {

        if(err){

            console.log("Error in posting transaction" + err)
            res.sendStatus(500)


        }else{
            

            console.log("Transaction is posted")
            res.send(results)
            res.end()

        }





    })




})

//Get request for all the transactions done!

transactionRouter.get("/get_transaction", (req, res)=>{

    var getTransactionsQuery = "Select * From `idpos`.`storetransactions`"


    getConnection().query(getTransactionsQuery, (err, rows, fields)=>{

        if(err){

            console.log("Error in fetching transactions" + err)
            res.sendStatus(500)

        }else{


            console.log("All transactions are fetched")
            res.send({transactions: rows})
            res.end()

        }


    })



})


//Posting Order from Custome add
transactionRouter.post("/customer_order", (req, res)=>{

    var orderBody = req.body

    var insertOrder = "INSERT INTO `idpos`.`orders`(`DateTime`,`CustomerID`,`StoreID`,`RetailerID`,`UserID`,`PaymentMethod`,`Status`)VALUES(?,?,?,?,?,?,?)"

    getConnection().query(insertOrder, [datetime, orderBody.CustomerID, orderBody.StoreID, orderBody.RetailerID, orderBody.UserID, orderBody.PaymentMethod, orderBody.Status], (err, rows, fields)=>{

        if(err){

            console.log("Order is not Posted" + err)
            res.sendStatus(500)

        }else{

            console.log("ORder is posted")
            res.send()
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



module.exports = transactionRouter