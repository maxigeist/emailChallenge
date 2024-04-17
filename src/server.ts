import express from "express";
import { userRouter } from "../routes/user.route";

const app = express()

app.use(express.json());

app.listen(3000, () => {
    console.log('[server]: Server is running at port 3000')
})

app.use("/user", userRouter)

