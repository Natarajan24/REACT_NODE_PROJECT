const express = require('express')
const app = express()
const cors = require('cors');

const bodyParser = require("body-parser");
const mongodb = require("mongodb");
const { ObjectId } = require("mongodb");
const MongoClient = mongodb.MongoClient;


app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));




async function getDatabase() {
    const client = MongoClient.connect("mongodb://localhost:27017");

    const database = (await client).db('React_Python_Node');

    const collection = database.collection('user_login');

    return collection;

}

app.put("/user/user-data", async (req, res) => {

    const dataBase = await getDatabase();

    pipeline = [
        {
            $match: {
                status: true,
                username:req.body.username,
                password:req.body.password
            },
        },
    ];

    const getData = await dataBase.aggregate(pipeline).toArray();

    if (getData.length > 0) {
        res.status(200).send("Login successfully");
    } else {
        res.status(200).send("User Not Available");
    }
})

app.post("/user/user-register", async (req, res) => {
    const dataBase = await getDatabase();


    pipeline = [
        {
            $match: {
                status: true,
                username:req.body.username,
                email:req.body.email
            },
        },
    ];

    const getData = await dataBase.aggregate(pipeline).toArray();

    if (getData.length > 0) {
        res.status(200).send("User already Registered");
    }

    const insertData = await dataBase.insertOne(req.body);

    if (insertData) {
        res.status(200).send("Register successfully");
    } else {
        res.status(200).send("Register Unsuccessfully");
    }
})

app.listen(8000, () => {
    console.log("server is run")
})