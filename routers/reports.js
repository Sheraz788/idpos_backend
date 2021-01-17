const express = require("express")
const mysql = require("mysql")


const reportsRouter = express.Router()

reportsRouter.get("/day_report/:storeId", (req, res) => {

    var storeID = req.params.storeId

    var reportBase = req.params.reportBase

    //console.log(req.params)
    var reportQuery = "select count(distinct(st.CustomerID)) as TotalCustomer, sum(st.Price) as TotalSale from storetransactions st join products p on (st.ProductID = p.ProductID) join categories c on (p.CategoryID = c.CategoryID) where st.StoreID = ? and DATE(st.DateTime) = CURDATE() group by st.DateTime order by st.CustomerID asc"
    //console.log(reportQuery)
    getConnection().query(reportQuery, [storeID], (err, rows, fields)=>{

        if(err){

            console.log("Store Report error" + err)
            res.sendStatus(500)


        }else{


            console.log("Store Report Fetched")
            res.send(rows)
            res.send()
        }



    })



})

//Previous Week Report
reportsRouter.get("/week_report/:storeId", (req, res) => {

    var storeID = req.params.storeId

    var reportBase = req.params.reportBase

    //console.log(req.params)
    var reportQuery = "select count(distinct(st.CustomerID)) as TotalCustomer, sum(st.Price) as TotalSale from storetransactions st join products p on (st.ProductID = p.ProductID) join categories c on (p.CategoryID = c.CategoryID) where st.StoreID = ? and st.DateTime >= curdate() - INTERVAL DAYOFWEEK(curdate())+6 DAY AND st.DateTime < curdate() - INTERVAL DAYOFWEEK(curdate())-1 DAY group by st.CustomerID order by st.CustomerID asc"
    //console.log(reportQuery)
    getConnection().query(reportQuery, [storeID], (err, rows, fields)=>{

        if(err){

            console.log("Store Report error" + err)
            res.sendStatus(500)


        }else{


            console.log("Store Report Fetched")
            res.send(rows)
            res.send()
        }



    })



})


//Previous Week Report
reportsRouter.get("/month_report/:storeId", (req, res) => {

    var storeID = req.params.storeId

    var reportBase = req.params.reportBase

    //console.log(req.params)
    var reportQuery = "select count(distinct(st.CustomerID)) as TotalCustomer, sum(st.Price) as TotalSale from storetransactions st join products p on (st.ProductID = p.ProductID) join categories c on (p.CategoryID = c.CategoryID) where st.StoreID = ? and MONTH(st.DateTime) = MONTH(curdate()) group by st.UserID order by st.CustomerID asc"
    //console.log(reportQuery)
    getConnection().query(reportQuery, [storeID], (err, rows, fields)=>{

        if(err){

            console.log("Store Report error" + err)
            res.sendStatus(500)


        }else{


            console.log("Store Report Fetched")
            res.send(rows)
            res.send()
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

module.exports = reportsRouter