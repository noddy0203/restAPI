// importing mongo uri from env file
require("dotenv").config()

//  model import
const Product = require("./models/products")    

// importing connection string
const connectDB = require("./db/connect")

// importing json data from the productFile
const productJson = require("./product.json")

const start = async ()=>{
    try {
        await connectDB(process.env.MONGO_URI)
        await Product.deleteMany()   //if its used after create it wll dlt all the data from DB 
        await Product.create(productJson)
        console.log(`Success`)
    } catch (error) {

        console.log(`Something went wrong while submitting the data to DB`)
        console.log(error)
    }
}

start()


