import { Router } from "express";
import { createUserHandle } from "../controller/user.controller";
import validate from "../middleware/validateResource";
import { createUserSchema } from "../schema/user.schema";

const router = Router()

router
    .post('/api/users' , validate(createUserSchema) ,createUserHandle)

export {router as UserRouter}