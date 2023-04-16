import Express from "express";
import mongoose from "mongoose";

const app = Express();

import { HealthCheckRouter } from "./routes/healthcheck";

import dotenv from "dotenv"
dotenv.config()

const PORT = process.env.PORT || 1337

import connectDB from "./utils/connect";
import  logger  from "./utils/logger";


connectDB()

////////////////////////////////////Routes
app.use("/healthcheck" , HealthCheckRouter)


mongoose.connection.once("open" , () => {
    console.clear()
    //console.log("Connected to mongodb");
    logger.info("Connected to mongodb")
    app.listen(PORT , () => {
        //console.log(`App is running and listening on port ${PORT}`);
        logger.info(`App is running and listening on port ${PORT}`)
    })
    
})
