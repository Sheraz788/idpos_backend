const express = require("express")
const mysql = require("mysql")
const bodyParser = require("body-parser")

const app = express()

//Importing Routers 
const userRouter = require("./routers/users.js")
const retailerRouter = require("./routers/retailer.js")
const customerRouter = require("./routers/customer.js")
const storeRouter = require("./routers/store.js")
const orderRouter = require("./routers/order.js")
const distributorRouter = require("./routers/distributor.js")
const categoryRouter = require("./routers/categories.js")
const orderItemsRouter = require("./routers/orderItems.js")
const productsRouter = require("./routers/products.js")
const addProductsToStore = require("./routers/addProductToStore.js")
const storeTransaction = require("./routers/transactions.js")
const reportsRouter = require("./routers/reports.js")
const salemanRouter = require("./routers/saleman.js")
const predictions = require("./routers/predictions.js")

app.use(bodyParser.json())

// app.use(bodyParser.urlencoded({extended: false}))

app.use(userRouter)
app.use(retailerRouter)
app.use(customerRouter)
app.use(storeRouter)
app.use(orderRouter)
app.use(distributorRouter)
app.use(categoryRouter)
app.use(orderItemsRouter)
app.use(productsRouter)
app.use(addProductsToStore)
app.use(storeTransaction)
app.use(reportsRouter)
app.use(salemanRouter)
app.use(predictions)

app.listen(8000, ()=>{

    console.log("Server is Listening .... ")

})


