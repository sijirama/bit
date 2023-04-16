import Express from "express";
const app = Express();



import dotenv from "dotenv"
dotenv.config()
const PORT = process.env.PORT || 1337

import mongoose from "mongoose";
import  logger  from "./utils/logger";
import connectDB from "./utils/connect";
connectDB()






















mongoose.connection.once("open" , () => {
    console.clear()
    //console.log("Connected to mongodb");
    logger.info("Connected to mongodb")
    app.listen(PORT , () => {
        //console.log(`App is running and listening on port ${PORT}`);
        logger.info(`App is running and listening on port ${PORT}`)
    })
    
})
