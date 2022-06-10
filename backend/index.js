const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const userRoute = require('./routes/users')
const pinRoute = require('./routes/pins')
const app = express()

dotenv.config()

app.use(express.json());

app.use("/api/pins", pinRoute)
app.use("/api/users", userRoute) 
 

mongoose.connect(process.env.MONGO_URL , {useNewUrlParser: true, useUnifiedTopology: true}).then(() =>{
    console.log('database connected')
}).catch((err) => console.log(err))    
 
app.listen(5000, () => {      
    console.log("backend running")
})      