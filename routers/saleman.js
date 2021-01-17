const express = require("express")
const mysql = require("mysql")
const moment = require("moment")

const salemanRouter = express.Router()


salemanRouter.get("/saleman_retailer/:userID", (req, res)=>{

    var salemanID = req.params.userID

    var salemanRetailer = "select u.UserID, r.RetailerID, r.RetailerName from users u join salesman s on (u.UserID = s.UserID) join retailers r on (s.RetailerID = r.RetailerID) where u.UserID = ?"

    getConnection().query(salemanRetailer, [salemanID], (err, rows, fields)=>{

        if(err){
            console.log("Saleman Retailer is not fetched" + err)
            res.sendStatus(500)
        }else{


            console.log("Saleman retailer data is fetched")

            res.send({retailers: rows})
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


module.exports = salemanRouter