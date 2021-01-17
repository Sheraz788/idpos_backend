const express = require("express")
const mysql = require("mysql")
const moment = require("moment")

const retailerRouter = express.Router()


//Get request for retailer 

retailerRouter.get("/retailer", (req, res)=>{


    var queryString = "Select * from retailers"

    getConnection().query(queryString, (err, rows, fields) =>{

        if(err){

            console.log("Error in Fetching Retailers" + err);
            
        }

        console.log("Retailer Data is fetched")

        res.send({retailers: rows})
        res.end()


    })


})


//Get request for retailer using parameters ....
retailerRouter.get("/retailer/:userId", (req, res)=>{

    const userID = req.params.userId

    const getRetailerQuery = "SELECT * FROM retailers WHERE UserID = ?"

    getConnection().query(getRetailerQuery, [userID], (err, rows, fields)=>{


        if(err){

            console.log("Error with retailer parameters" + err);
            

        }

        console.log("Data is fetched with retailers parameters")

        res.send({retailers: rows})
        res.end()


    })




})

//Get request for retailer using retailerid parameter ....
retailerRouter.get("/retailerdetails/:retailerid", (req, res)=>{

    const retailerID = req.params.retailerid

    const getRetailerQuery = "SELECT * FROM retailers WHERE RetailerID = ?"

    getConnection().query(getRetailerQuery, [retailerID], (err, rows, fields)=>{


        if(err){

            console.log("Error with retailerID parameters" + err);
            

        }

        console.log("Data is fetched with retailerID parameter")

        res.send(rows)
        res.end()


    })




})


//Post request for retailer ...

//Getting Current Date and Time
var dateTime = moment(new Date()).format('YYYY-MM-DD HH:mm:ss')
retailerRouter.post("/create_retailer", (req, res)=>{

    const retailer = req.body

    console.log(retailer)
    const createRetailerQuery = "INSERT INTO `idpos`.`retailers`(`RetailerName`,`OwnerName`,`Category`,`Telephone`,`Mobile`,`Email`,`Address`,`Status`, `DateTime`,`UserID`)VALUES(?,?,?,?,?,?,?,?,?,?)"

    getConnection().query(createRetailerQuery, [retailer.RetailerName, retailer.OwnerName, retailer.Category, retailer.Telephone, retailer.Mobile, retailer.Email, retailer.Address, retailer.Status, dateTime, retailer.UserID], (err, results, fields)=>{

        if(err){

            console.log("Error in Inserting Retailer" + err)
            res.sendStatus(500)
        }else{
            console.log("Retailer Data Inserted ....")
            res.send(results)
            res.end()
    }


    })

})


//Updating Retailer ...
retailerRouter.put("/update_retailer/:userId", (req, res)=>{

    const retailer = req.body
    const retailerUserID = req.params.userId

    
    const updateRetailerQuery = "UPDATE `idpos`.`retailers` SET `RetailerName` = ?, `OwnerName` = ?, `Category` = ?, `Telephone` = ?, `Mobile` = ?, `Email` = ?, `Address` = ?, `Status` = ?, `DateTime` = ? WHERE `UserID` = ?"

    getConnection().query(updateRetailerQuery, [retailer.RetailerName, retailer.OwnerName, retailer.Category, retailer.Telephone, retailer.Mobile, retailer.Email, retailer.Address, retailer.Status, retailer.DateTime, retailerUserID], (err, results, fields)=>{

        if(err){

            console.log("Error in updating retailer..." + err);
            res.sendStatus(500)

        }else{

            console.log("Retailer Data is updated");
            res.send(results)
            res.end()
            

        }


    })

})



//Delete Retailer ...
retailerRouter.delete("/delete_retailer/:email", (req, res)=>{

    const retailer = req.body
    const retailerEmail = req.params.email
console.log(retailerEmail)
    const deleteRetailerQuery = "DELETE FROM idpos.retailers WHERE Email = ?"

    getConnection().query(deleteRetailerQuery, [retailerEmail], (err, results, fields)=>{

        if(err){

            console.log("Error in deleting retailer..." + err);
            res.sendStatus(500)

        }else{

            console.log("Retailer is Deleted ...");
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


module.exports = retailerRouter