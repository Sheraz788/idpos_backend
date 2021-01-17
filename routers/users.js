const express = require("express")
const mysql = require("mysql")


const userrouter = express.Router()


userrouter.get("/users", (req, res)=>{


    var queryString = "Select * from users"

    getConnection().query(queryString, (err, rows, fields) =>{

        if(err){

            console.log("Error in Fetching Users" + err);
            
        }

        console.log("Data is fetched")

        res.json({users: rows})
        res.end()


    })


})

//Get request with multiple parameters
userrouter.get("/users/:email&:password", (req, res)=>{

    const email = req.params.email
    const password = req.params.password

    const queryString = "SELECT * FROM users WHERE Email = ? and Password = ?"

    getConnection().query(queryString, [email, password], (err, rows, fields)=>{


        if(err){

            console.log("Error with users parameters" + err);
            

        }

        console.log("Data is fetched with users parameters")

        res.send(rows)
        res.end()


    })




})


//Post request to add/insert users
userrouter.post("/create_user", (req, res)=>{

    const user = req.body

    
    const createUserQuery = "INSERT INTO `idpos`.`users`(`UserID`,`Name`,`Email`,`Password`,`Type`,`Status`)VALUES(?,?,?,?,?,?)"

    console.log(user)
    getConnection().query(createUserQuery, [user.UserID, user.Name, user.Email, user.Password, user.Type, user.Status], (err, results, fields)=>{

        if(err){

            console.log("Error in Inserting" + err)

            var response = {"error" : false,
                            "message" : "User created error ... "
                            }

            res.send(response)
        }else{
            console.log("Data Inserted ....")
            res.send(results)
            res.end()
    }


    })

})


//Post request for saleman
userrouter.post("/create_saleman",(req, res)=>{

    const saleman = req.body

    
    const createSalemanQuery = "INSERT INTO `idpos`.`salesman`(`StoreID`,`RetailerID`,`UserID`)VALUES(?,?,?)"

    getConnection().query(createSalemanQuery, [saleman.StoreID, saleman.RetailerID, saleman.UserID], (err, results, fields)=>{

        if(err){

            console.log("Error in Inserting Saleman" + err)
            res.sendStatus(500)

        }else{
            console.log("Saleman Data is Inserted ....")
            res.send(results)
            res.end()
    }


    })



})


//Update User
userrouter.put("/update_user/:userId", (req, res)=>{

    const user = req.body
    const userID = req.params.userId

    const updateQuery = "UPDATE `idpos`.`users` SET `Name` = ?, `Email` = ?, `Password` = ?, `Type` = ?, `Status` = ? WHERE `UserID` = ?"

    getConnection().query(updateQuery, [user.Name, user.Email, user.Password, user.Type, user.Status, userID], (err, results, fields)=>{

        if(err){

            console.log("Error in updating User ..." + err);
            res.sendStatus(500)

        }else{

            console.log("User Data is updated");
            res.send(results)
            res.end()
            

        }


    })

})



//Delete User

userrouter.delete("/delete_user/:userId", (req, res)=>{

    const user = req.body
    const userID = req.params.userId
    const deleteQuery = "DELETE FROM idpos.users WHERE UserID = ?"


    getConnection().query(deleteQuery, [userID], (err, results, fields)=>{

        if(err){
            console.log("User isn't deleted ..." + err);
            res.send(500)
        }else{
            console.log("User is deleted ....");
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


module.exports = userrouter