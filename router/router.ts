import {userRouter} from "../routes/user.route";
import {adminRouter} from "../routes/admin.route";
import express from "express";
import {compoundMailRouter} from "../routes/compound.mail.route";



export const router = express()

router.use("/user", userRouter)

router.use("/admin", adminRouter)

router.use("/email", compoundMailRouter)