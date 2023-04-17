import { Router } from "express";
import { createUserHandle } from "../controller/user.controller";

const router = Router()

router
    .post('/api/users' , createUserHandle)

export {router as UserRouter}