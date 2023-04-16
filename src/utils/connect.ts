import dotenv from "dotenv";
dotenv.config()
import  Mongoose  from "mongoose";
const uri = process.env.DBURI

const connectDB = () => {
    try {
        console.log("Connecting to Mongo...");
        Mongoose.connect(uri as string)
    } catch (error) {
        console.log(error)   
    }
}

export default connectDB