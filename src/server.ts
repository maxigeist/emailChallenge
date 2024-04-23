import express from "express";
import { userRouter } from "../routes/user.route";
import {adminRouter} from "../routes/admin.route";
import {router} from "../router/router";

const app = express()

app.use(express.json());

app.listen(3000, () => {
    console.log('[server]: Server is running at port 3000')
})

app.use("/api", router)


export default app