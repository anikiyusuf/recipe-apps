const mongoose = require("mongoose")
const envs = require("./envs")

function connectionMongoDB() {
   mongoose.connect(envs.MONGO_URI)

   mongoose.connection.on('connected', () =>{
    console.log('connection to mongodb successful')
   })

   mongoose.connection.on('err',(err) =>{
    console.log(err)
   })
}

module.exports = { connectionMongoDB }