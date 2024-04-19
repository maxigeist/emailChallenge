import {userRouter} from "../routes/user.route";
import {adminRouter} from "../routes/admin.route";
import {sendgridRouter} from "../routes/sendgrid.route"
import express from "express";
import {mailgunRouter} from "../routes/mailgun.route";




export const router = express()

router.use("/user", userRouter)

router.use("/admin", adminRouter)

router.use("/email", mailgunRouter)