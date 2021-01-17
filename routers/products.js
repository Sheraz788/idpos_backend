const express = require("express")
const mysql = require("mysql")
const moment = require("moment")

const productRouter = express.Router()


//Get request for products 

productRouter.get("/products", (req, res)=>{


    var productsQuery = "Select * from products"

    getConnection().query(productsQuery, (err, rows, fields) =>{

        if(err){

            console.log("Error in Fetching products" + err);
            res.send(err)
            res.sendStatus(500)
            
        }

        console.log("Products Data is fetched")

        res.send(rows)
        res.end()


    })


})


//Get request for products using parameters ....
productRouter.get("/products/:categoryId", (req, res)=>{

    const categoryID = req.params.categoryId

    const getProductQuery = "SELECT * FROM products WHERE CategoryID = ?"

    getConnection().query(getProductQuery, [categoryID], (err, rows, fields)=>{


        if(err){

            console.log("Error with Products parameters" + err);
            res.send(err)    

        }else{
            console.log("Data is fetched with Products parameters")

            res.send({products: rows})
            res.end()
        }

        


    })




})


//Post request for Products ...

//Getting Current Date and Time
var dateTime = moment(new Date()).format('YYYY-MM-DD HH:mm:ss')

productRouter.post("/create_product", (req, res)=>{

    const product = req.body

    const createProductQuery = "INSERT INTO `idpos`.`products`(`Description`,`OUoM`,`BUoM`,`Barcode`,`CategoryID`,`DateTime`,`UserID`, `Status`)VALUES(?,?,?,?,?,?,?,?)"

    getConnection().query(createProductQuery, [product.Description, product.OUoM, product.BUoM, product.Barcode, product.CategoryID, dateTime, product.UserID, product.Status], (err, results, fields)=>{

        if(err){

            console.log("Error in Inserting Products" + err)
            res.sendStatus(500)
            res.send(err)
        }else{
            console.log("Products Data Inserted ....")
            res.send(results)
            res.end()
    }


    })

})


//Updating product ...
productRouter.put("/update_product/:productId", (req, res)=>{

    const product = req.body
    const productID = req.params.productId

    const updateProductQuery = "UPDATE `idpos`.`products` SET `Description` = ?, `OUoM` = ?, `BUoM` = ?, `BarCode` = ?, `DateTime` = ?, `Status` = ? WHERE `ProductID` = ?"

    getConnection().query(updateProductQuery, [product.Description, product.OUoM, product.BUoM, product.BarCode, product.DateTime, product.Status, productID], (err, results, fields)=>{

        if(err){

            console.log("Error in updating product..." + err);
            res.sendStatus(500)

        }else{

            console.log("Product Data is updated");
            res.send(results)
            res.end()
            

        }


    })

})



//Delete product ...
productRouter.delete("/delete_product/:productId", (req, res)=>{

    const product = req.body
    const ProductID = req.params.categoryId

    const deleteCategoryQuery = "DELETE FROM idpos.categories WHERE CategoryID = ?"

    getConnection().query(deleteCategoryQuery, [categoryID], (err, results, fields)=>{

        if(err){

            console.log("Error in deleting category ..." + err);
            res.sendStatus(500)

        }else{

            console.log("Category is Deleted ...");
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


module.exports = productRouter