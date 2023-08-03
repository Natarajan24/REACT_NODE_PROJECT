const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const cookieparser = require('cookie-parser');
const _env = require("dotenv").config();
const env = process.env;
const toureRouter = require('./routes/tours')
const bodyParser = require("body-parser");




const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const port = env.PORT || 8000

//database connection
mongoose.set('strictQuery', false)
const connection = async () => {
    try {
        await mongoose.connect("mongodb://localhost:27017/React_Python_Node")
        console.log("connection success")
    } catch (error) {
        console.log("connection fail")
    }
}


//middleware
app.use(express.json())
app.use(cors());
app.use(cookieparser());


app.use('/tours', toureRouter)


app.listen(port, () => {
    connection()
    console.log("server run successfully....", port)
});