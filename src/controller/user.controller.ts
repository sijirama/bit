import {Request , Response , } from "express"
import logger from "../utils/logger"

export function createUserHandle(req : Request, res : Response){
    try {
        // const User = await 
    } catch (error) {
        logger.error(error)
        res.status(409)
    }
}