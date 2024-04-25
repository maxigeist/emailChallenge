import {Router} from "express"
import {AdminRepositoryImpl} from "../admin/admin.repository";
import {AdminControllerImpl} from "../admin/admin.controller";
import {AdminServiceImpl} from "../admin/admin.service";
import prismaDb from "../db/db";
import {authenticateToken} from "../token/token";


export const adminRouter = Router()

const adminRepositoryImpl = new AdminRepositoryImpl(prismaDb)
const adminServiceImpl = new AdminServiceImpl(adminRepositoryImpl)
const adminControllerImpl = new AdminControllerImpl(adminServiceImpl)


adminRouter.get("/getAdmin", authenticateToken, async (req, res) => {
    return adminControllerImpl.getAdmin(req, res)
})

adminRouter.get("/stats", authenticateToken, async (req, res) => {
    return adminControllerImpl.getStats(req, res)
})