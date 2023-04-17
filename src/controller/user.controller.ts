import {Request , Response , } from "express"
import logger from "../utils/logger"
import createUser from "../service/user.service"

export async function createUserHandle(req : Request, res : Response){
    try {
        const User = await createUser( req.body )
        return User
    } catch (error:any) {
        logger.error(error)
        res.status(409).send( error.message)
    }
}