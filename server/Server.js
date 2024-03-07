const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const dashboardModel = require("./Data")

const app = express()
app.use(cors())
app.use(express.json())

mongoose.connect("mongodb://127.0.0.1:27017/dashboardapp")

app.get("/getDashboard", (req, res) =>{
    dashboardModel.find()
    .then(dashboard=>res.json(dashboard))
    .catch(err=>res.json(err))
})

app.listen(3001, ()=>{
    console.log("Server is Running");
})