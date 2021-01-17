const express = require("express")
const mysql = require("mysql")
const moment = require("moment")

const storeRouter = express.Router()


//Get request for store 

storeRouter.get("/store", (req, res)=>{


    var customersQuery = "Select * from stores"

    getConnection().query(customersQuery, (err, rows, fields) =>{

        if(err){

            console.log("Error in Fetching Store data" + err);
            
        }

        console.log("Store Data is fetched")

        res.send({stores: rows})
        res.end()


    })


})


//Get request for store using parameters ....
storeRouter.get("/store/:retailerId", (req, res)=>{

    const storeRetailerID = req.params.retailerId

    const getStoreQuery = "SELECT * FROM stores WHERE RetailerID = ?"

    getConnection().query(getStoreQuery, [storeRetailerID], (err, rows, fields)=>{


        if(err){

            console.log("Error with store parameters" + err);
            

        }

        console.log("Data is fetched with store parameters")

        res.send({stores: rows})
        res.end()


    })




})

//Get request for store using parameters ....
storeRouter.get("/storedetails/:storeId", (req, res)=>{

    const storeId = req.params.storeId

    const getStoreQuery = "SELECT * FROM stores WHERE StoreID = ?"

    getConnection().query(getStoreQuery, [storeId], (err, rows, fields)=>{


        if(err){

            console.log("Error with store parameters" + err);
            

        }

        console.log("Data is fetched with store parameters")

        res.send(rows)
        res.end()


    })




})


//Get request for store using userID to differenciate which store is for which user ....
storeRouter.get("/fetch_stores/:userId", (req, res)=>{

    const userId = req.params.userId

    const getStoreQuery = "select s.StoreID, s.StoreName from users u join retailers r on (u.UserID = r.UserID) join stores s on (r.RetailerID = s.RetailerID) where u.UserID = ?"

    getConnection().query(getStoreQuery, [userId], (err, rows, fields)=>{


        if(err){

            console.log("Error with store fetch parameters" + err);
            

        }

        console.log("Data is fetched with store fetch parameters")

        res.send({stores: rows})
        res.end()


    })




})


storeRouter.get("/saleman_stores/:userId", (req, res)=>{

    const userId = req.params.userId

    const getStoreQuery = "select st.StoreID, st.StoreName from users u join salesman s on (u.UserID = s.UserID) join stores st on (s.StoreID = st.StoreID) where u.UserID = ?"

    getConnection().query(getStoreQuery, [userId], (err, rows, fields)=>{


        if(err){

            console.log("Error with store fetch parameters" + err);
            

        }

        console.log("Data is fetched with store fetch parameters")

        res.send({stores: rows})
        res.end()


    })




})






//Post request for store ...

//Getting Current Date and Time
var dateTime = moment(new Date()).format('YYYY-MM-DD HH:mm:ss')

storeRouter.post("/create_store", (req, res)=>{

    const store = req.body

    console.log(store)
    const createStoreQuery = "INSERT INTO `idpos`.`stores`(`StoreName`,`Address`,`Telephone`,`Mobile`,`Status`,`RetailerID`,`DateTime`,`UserID`) VALUES (?,?,?,?,?,?,?,?)"

    getConnection().query(createStoreQuery, [store.StoreName, store.Address, store.Telephone, store.Mobile, store.Status, store.RetailerID, dateTime, store.UserID], (err, results, fields)=>{

        if(err){

            console.log("Error in Inserting Store" + err)
            res.sendStatus(500)
        }else{
            console.log("Store Data Inserted ....")
            res.send(results)
            res.end()
    }


    })

})


//Updating Store ...
storeRouter.put("/update_store/:storename", (req, res)=>{

    const store = req.body
    const storename = req.params.storename

    const updateStoreQuery = "UPDATE `idpos`.`stores` SET `StoreName` = ?, `Address` = ?, `Telephone` = ?, `Mobile` = ?, `Status` = ?, `DateTime` = ?  WHERE `StoreName` = ?"

    getConnection().query(updateStoreQuery, [store.StoreName, store.Address, store.Telephone, store.Mobile, store.Status, store.DateTime, storename], (err, results, fields)=>{

        if(err){

            console.log("Error in updating Store..." + err);
            res.send(err)
            res.sendStatus(500)

        }else{

            console.log("Store Data is updated");
            res.send(results)
            res.end()
            

        }


    })

})



//Delete Store ...
storeRouter.delete("/delete_store/:storename", (req, res)=>{

    const retailer = req.body
    const storename = req.params.storename

    const deleteStoreQuery = "DELETE FROM idpos.stores WHERE StoreName = ?"

    getConnection().query(deleteStoreQuery, [storename], (err, results, fields)=>{

        if(err){

            console.log("Error in deleting Store..." + err);
            res.sendStatus(500)

        }else{

            console.log("Store is Deleted ...");
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


module.exports = storeRouter