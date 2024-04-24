import express from "express";
import swaggerUi from "swagger-ui-express";
import swaggerOutput from "../swagger/swagger_output.json";
import {router} from "../router/router";

const app = express()

app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerOutput));

app.listen(3000, () => {
    console.log('[server]: Server is running at port 3000')
})

app.use("/api", router)


export default app