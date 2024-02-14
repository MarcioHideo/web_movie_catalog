// EXPRESS js
import express from "express"
import cors from "cors"
import reviews from "./api/reviews.route.js"

const app = express()

app.use(cors()) //to use middleware
app.use(express.json())//allow server accept json

// /initial route 
// it's good to have 'v1' to show API version
app.use("/api/v1/reviews", reviews)
// "*" means anything else, in case user access a unknown route
app.use("*", (req, res) => 
    res.status(404).json({error: "not found"}))

export default app


