require("dotenv").config()
const express = require("express")
const connectDB = require("./db/connect")
const { startSession } = require("./models/products")
const app = express()
const products_route = require("./routes/product")
const PORT = process.env.PORT || 5000

app.get("/", (req, res) => {
    res.send("Hii , I am live")
})


app.use("/app/products" , products_route)

const start = async ()=>{
         try {
            await connectDB(process.env.MONGO_URI)
            if(connectDB){
                console.log("mongoDB is connected to server check it out through compass")
            }
            app.listen(PORT , ()=>{
                console.log(`server is listenning at PORT number -${PORT}`)
            })
         } catch (error) {
            console.log("something went wrong while running the server")
         }
}

start()

// app.use("/app/products", products_route)

// const start = async () => {
//     try {
//         await connectDB(process.env.MONGO_URI);
//         if (connectDB) {
//             console.log("There's no problem connecting DB to server while listennig at certain port")
//         }
//         app.listen(PORT, () => {
//             console.log(`server is listennig at port number ${PORT}`)
//         })
//     } catch (error) {
//         console.log(error)
//     }
// }

// start()