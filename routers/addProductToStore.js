const express = require("express")
const mysql = require("mysql")


const addProductRouter = express.Router()

//Fetching Products on Store using store and category ID's

addProductRouter.get("/storesproducts/:storeId&:categoryId", (req,res) => {


    var storeID = req.params.storeId
    var categoryID = req.params.categoryId

    console.log(storeID + categoryID)
    var storesProductsQuery = "select sp.ProductID, c.Description, p.Description as Product_Name, sp.Quantity from storesproducts sp join products p on (sp.ProductID = p.ProductID) join categories c on (p.CategoryID = c.CategoryID) where sp.StoreID = ? and p.CategoryID = ?"


    getConnection().query(storesProductsQuery, [storeID, categoryID], (err, results, fields) => {


        if(err){

            console.log("Error in fetching Stores Products")
            res.send(500)
        }else{

            console.log("Products added to stores are fetched ...")
            res.send({products : results})

            
            res.end()

        }


    })


    
})

//Fetching Products on STORE usring store ID

addProductRouter.get("/storesproducts/:storeId", (req,res) => {

    var storeID = req.params.storeId

    var storesProductsQuery = "select p.ProductID, p.Description as Product_Name, c.CategoryID, c.Description, sp.Quantity, sp.Price from storesproducts sp join products p on (sp.ProductID = p.ProductID) join categories c on (p.CategoryID = c.CategoryID) where sp.StoreID = ?"

    getConnection().query(storesProductsQuery, [storeID], (err, results, fields) => {

        if(err){

            console.log("Error in fetching Stores Products")
            res.send(500)
        }else{

            console.log("Products added to stores are fetched ...")
            res.send({categories :results})

            
            res.end()

        }


    })


    
})



//Fetching store Inventory
//Fetching Products on STORE usring store ID

addProductRouter.get("/storesinventory/:storeId", (req,res) => {


    var storeID = req.params.storeId

    var storesProductsQuery = "select p.ProductID, p.Description as Product_Name, c.CategoryID, c.Description as Category_Name, sp.Quantity from storesproducts sp join products p on (sp.ProductID = p.ProductID) join categories c on (p.CategoryID = c.CategoryID) where sp.StoreID = ?"


    getConnection().query(storesProductsQuery, [storeID], (err, results, fields) => {


        if(err){

            console.log("Error in fetching Stores Products")
            res.send(500)
        }else{

            console.log("Products added to stores are fetched ...")
            res.send({products :results})

            
            res.end()

        }


    })


    
})




//add products to the store
addProductRouter.post("/addproducts", (req, res) =>{


    var storeProducts = req.body
    
    var addProductsQuery = "INSERT INTO `idpos`.`storesproducts` (`ProductID`,`StoreID`, `RetailerID`, `Quantity`, `Price`) VALUES (?, ?, ?, ?,?)"

    getConnection().query(addProductsQuery, [storeProducts.ProductID, storeProducts.StoreID, storeProducts.RetailerID, storeProducts.Quantity, storeProducts.Price], (err, results, fields)=>{

        if(err){

            console.log("Error in adding products to store" + err)

            res.sendStatus(status)
        }else{

            console.log("Products are added to Store")
            res.send(results)
            res.end()

        }


    })



})


//Checking existing products on the store
addProductRouter.get("/checkproducts/:productId", (req, res)=>{
    var productID = req.params.productId
    var selectStoresProducts = "select sp.ProductID, sp.Quantity, sp.Price from storesproducts sp where sp.ProductID = ?"
    getConnection().query(selectStoresProducts, [productID], (err, rows, fields) =>{
        if(err){
            console.log("Error in fetching existing products on the store" + err)
            res.sendStatus(500)
        }else{
            console.log("Existing products on the store are fetched ..")
            res.send({productIDs : rows})
            res.end()

        }




    })






})

//update inventory after transaction
addProductRouter.put("/update_inventory", (req, res)=>{

    var inventoryUpdate = req.body
    var storeId = req.params.storeId
    var retailerId = req.params.retailerId
    var productId = req.params.productId


    var inventoryUpdateQuery = "UPDATE `idpos`.`storesproducts` SET `Quantity` = ? WHERE `ProductID` = ? AND `StoreID` = ? AND `RetailerID` = ?"

    getConnection().query(inventoryUpdateQuery, [inventoryUpdate.Quantity, inventoryUpdate.ProductID, inventoryUpdate.StoreID, inventoryUpdate.RetailerID], (err, rows, fields)=>{


        if(err){

            console.log("Error in updating inventory" + err)
            res.sendStatus(500)

        }else{

            console.log("Inventory updated successfully")
            res.send(rows)
            res.end()

        }



    })





})


//update products of the store if user wants to add more products to the store
addProductRouter.put("/update_storeproducts", (req, res)=>{

    var inventoryUpdate = req.body
    var storeId = req.params.storeId
    var retailerId = req.params.retailerId
    var productId = req.params.productId


    var inventoryUpdateQuery = "UPDATE `idpos`.`storesproducts` SET `Quantity` = ? WHERE `ProductID` = ? AND `StoreID` = ? AND `RetailerID` = ?"

    getConnection().query(inventoryUpdateQuery, [inventoryUpdate.Quantity, inventoryUpdate.ProductID, inventoryUpdate.StoreID, inventoryUpdate.RetailerID], (err, rows, fields)=>{


        if(err){

            console.log("Error in adding more products to the store" + err)
            res.sendStatus(500)

        }else{

            console.log("More products added to the store successfully")
            res.send(rows)
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

module.exports = addProductRouter