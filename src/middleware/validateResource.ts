import {Request , Response , NextFunction} from "express"
import { AnyZodObject } from "zod"

const validate = (schema:AnyZodObject) => (request:Request , response:Response , next:NextFunction) => {
    try {
        schema.parse()
    } catch (error) {
        
    }
}