const mongoose = require("mongoose")

const connectDB = async (url) => {
     await mongoose.connect(url, {
          useUnifiedTopology: true,
          useNewUrlParser: true
     })
          .then(res => {
               console.log("database connected to server")
          })
          .catch(err => {
               console.log("something went wrong while connecting to db")
          })
}
 
module.exports = connectDB

