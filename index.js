// database
// Use MongoDB
import app from "./server.js"
import mongodb from "mongodb"
import dotenv from "dotenv";

//import dotenv after creating the file .env, where the VARIABLES are located
dotenv.config()

//Data Access Object
// import ReviewsDAO from "./dao/reviewsDAO.js"

const MongoClient = mongodb.MongoClient;
const mongo_username = process.env['MONGO_USERNAME']
const mongo_password = process.env['MONGO_PASSWORD']


const uri = `mongodb+srv://${mongo_username}:${mongo_password}@cluster0.cssd6wv.mongodb.net/?retryWrites=true&w=majority`

const port = 8000

MongoClient.connect(
    uri,
    {
        maxPoolSize: 50,
        wtimeoutMS: 2500,
        useNewUrlParser: true
    })
    .catch(err => { //catch any errors
        console.error(err.stack)
        process.exit(1)//ending the process
    })
    .then(async client => { //can run asynchronously
        app.listen(port, () => {
            console.log(`listening on port ${port}`)
        })
    })

