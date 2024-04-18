import {userRouter} from "../routes/user.route";
import {adminRouter} from "../routes/admin.route";
import {sendgridRouter} from "../routes/sendgrid.route"
import express from "express";




export const router = express()

router.use("/user", userRouter)

router.use("/admin", adminRouter)

router.use("/email", sendgridRouter)