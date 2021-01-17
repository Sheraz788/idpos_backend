const express = require("express")
const mysql = require("mysql")
const moment = require("moment")

const distributorRouter = express.Router()


//Get request for distributor 

distributorRouter.get("/distributor", (req, res)=>{


    var distributorsQuery = "Select * from distributors"

    getConnection().query(distributorsQuery, (err, rows, fields) =>{

        if(err){

            console.log("Error in Fetching distributors" + err);
            res.send(err)
            res.sendStatus(500)
            
        }

        console.log("distributors Data is fetched")

        res.send(rows)
        res.end()


    })


})


//Get request for distributors using parameters ....
distributorRouter.get("/distributor/:distributorId", (req, res)=>{

    const distributorID = req.params.distributorId

    const getDistributorQuery = "SELECT * FROM distributor WHERE distributorID = ?"

    getConnection().query(getDistributorQuery, [distributorID], (err, rows, fields)=>{


        if(err){

            console.log("Error with distributor parameters" + err);
            

        }

        console.log("Data is fetched with distributor parameters")

        res.send(rows)
        res.end()


    })




})


//Post request for distributor ...

//Getting Current Date and Time
var dateTime = moment(new Date()).format('YYYY-MM-DD HH:mm:ss')

distributorRouter.post("/create_distributor", (req, res)=>{

    const distributor = req.body

    // console.log(distributor)
    const createdistributorQuery = "INSERT INTO `idpos`.`distributors`(`Name`,`Mobile`,`Telephone`,`Address`,`Email`,`DateTime`,`UserID`,`Status`)VALUES(?,?,?,?,?,?,?,?)"

    getConnection().query(createdistributorQuery, [distributor.Name, distributor.Mobile, distributor.Telephone, distributor.Address, distributor.Email, dateTime, distributor.UserID, distributor.Status], (err, results, fields)=>{

        if(err){

            console.log("Error in Inserting distributor" + err)
            res.sendStatus(500)
        }else{
            console.log("distributor Data Inserted ....")
            res.send(results)
            res.end()
    }


    })

})


//Updating distributor ...
distributorRouter.put("/update_distributor/:distributorId", (req, res)=>{

    const distributor = req.body
    const distributorID = req.params.distributorId

    const updatedistributorQuery = "UPDATE `idpos`.`distributors` SET `Name` = ?, `Mobile` = ?, `Telephone` = ?, `Address` = ?, `Email` = ?, `DateTime` = ?, `Status` = ? WHERE `UserID` = ?"

    getConnection().query(updatedistributorQuery, [distributor.Name, distributor.Mobile, distributor.Telephone, distributor.Address, distributor.Email, distributor.DateTime, distributor.Status, distributorID], (err, results, fields)=>{

        if(err){

            console.log("Error in updating distributor..." + err);
            res.sendStatus(500)

        }else{

            console.log("distributor Data is updated");
            res.send(results)
            res.end()
            

        }


    })

})



//Delete distributor ...
distributorRouter.delete("/delete_distributor/:distributorId", (req, res)=>{

    const retailer = req.body
    const distributorID = req.params.userId

    const deletedistributorQuery = "DELETE FROM idpos.distributors WHERE distributorID = ?"

    getConnection().query(deletedistributorQuery, [distributorID], (err, results, fields)=>{

        if(err){

            console.log("Error in deleting distributor..." + err);
            res.sendStatus(500)

        }else{

            console.log("distributor is Deleted ...");
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


module.exports = distributorRouter