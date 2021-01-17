const express = require("express")
const mysql = require("mysql")
const moment = require("moment")

const categoriesRouter = express.Router()


//Get request for categories 

categoriesRouter.get("/categories", (req, res)=>{


    var categoriesQuery = "Select * from categories"

    getConnection().query(categoriesQuery, (err, rows, fields) =>{

        if(err){

            console.log("Error in Fetching categories" + err);
            res.send(err)
            res.sendStatus(500)
            
        }

        console.log("categories Data is fetched")

        res.send({categories: rows})
        res.end()


    })


})


//Get request for categories using parameters ....
categoriesRouter.get("/category/:categoryId", (req, res)=>{

    const categoryID = req.params.categoryId

    const getCategoryQuery = "SELECT * FROM categories WHERE categoryID = ?"

    getConnection().query(getCategoryQuery, [categoryID], (err, rows, fields)=>{


        if(err){

            console.log("Error with Categories parameters" + err);
            res.send(err)    

        }else{
            console.log("Data is fetched with Categories parameters")

            res.send(rows)
            res.end()
        }

        


    })




})


//Post request for category ...

//Getting Current Date and Time
var dateTime = moment(new Date()).format('YYYY-MM-DD HH:mm:ss')

categoriesRouter.post("/create_category", (req, res)=>{

    const category = req.body

    const createCategoryQuery = "INSERT INTO `idpos`.`categories`(`Description`,`PCategory`,`Level`,`Status`,`Type`,`DateTime`,`UserID`)VALUES(?,?,?,?,?,?,?)"

    getConnection().query(createCategoryQuery, [category.Description, category.PCategory, category.Level, category.Status, category.Type, dateTime, category.UserID], (err, results, fields)=>{

        if(err){

            console.log("Error in Inserting Categories" + err)
            res.sendStatus(500)
        }else{
            console.log("Categories Data Inserted ....")
            res.send(results)
            res.end()
    }


    })

})


//Updating category ...
categoriesRouter.put("/update_category/:cateogryId", (req, res)=>{

    const category = req.body
    const categoryID = req.params.cateogryId

    const updateCategoryQuery = "UPDATE `idpos`.`categories` SET `Description` = ?, `PCategory` = ?, `Level` = ?, `Status` = ?, `Type` = ?, `DateTime` = ? WHERE `CategoryID` = ?"

    getConnection().query(updateCategoryQuery, [category.Description, category.PCategory, category.Level, category.Status, category.Type, category.DateTime, categoryID], (err, results, fields)=>{

        if(err){

            console.log("Error in updating category..." + err);
            res.sendStatus(500)

        }else{

            console.log("Category Data is updated");
            res.send(results)
            res.end()
            

        }


    })

})



//Delete distributor ...
categoriesRouter.delete("/delete_category/:categoryId", (req, res)=>{

    const category = req.body
    const categoryID = req.params.categoryId

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


module.exports = categoriesRouter