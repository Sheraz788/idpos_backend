const express = require("express")
const mysql = require("mysql")
const moment = require("moment")


const predictionsRouter = express.Router()



//trends suggestions
predictionsRouter.get("/stores_trends/:storeId", (req, res)=>{


    var storeID = req.params.storeId


    var trendsQuery = "select count(st.ProductID) as ProductCount, p.Description as ProductName, c.Description as CategoryName from storetransactions st join products p on (st.ProductID = p.ProductID) join categories c on (p.CategoryID = c.CategoryID) where st.StoreID = ? and DATE(st.DateTime) = CURDATE() group by st.ProductID order by ProductCount desc"

    getConnection().query(trendsQuery, [storeID], (err, rows, fields)=>{


        if(err){

            console.log("Error in Getting Trends" + err)
            res.sendStatus(500)

        }else{

            console.log("Trends are Fetched")
            res.send({trends : rows})
            res.end()
        }




    })







})


//Products Suggestions weekly basis
predictionsRouter.get("/storesproducts_suggestions/:storeID", (req, res)=>{

    var storeID = req.params.storeID


    var suggestionsQuery = "select count(st.ProductID) as ProductCount, p.Description as ProductName, c.Description as CategoryName from storetransactions st join products p on (st.ProductID = p.ProductID) join categories c on (p.CategoryID = c.CategoryID) where st.StoreID = ? and st.DateTime >= curdate() - INTERVAL DAYOFWEEK(curdate())+6 DAY AND st.DateTime < curdate() - INTERVAL DAYOFWEEK(curdate())-1 DAY group by st.ProductID order by st.ProductID asc"

    getConnection().query(suggestionsQuery, [storeID], (err, rows, fields)=>{


        if(err){

            console.log("Error in Getting Suggestions" + err)
            res.sendStatus(500)

        }else{

            console.log("Suggestions are Fetched")
            res.send({suggestions : rows})
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



module.exports = predictionsRouter