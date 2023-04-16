import { Router } from "express";

const router = Router()

router.route("/")
    .get((request , response) => {
        response.sendStatus(200)
    })

export {router as HealthCheckRouter}