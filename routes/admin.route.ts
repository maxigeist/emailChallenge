import {Router} from "express"
import {AdminRepositoryImpl} from "../admin/admin.repository";
import {AdminControllerImpl} from "../admin/admin.controller";
import {AdminServiceImpl} from "../admin/admin.service";
import {prisma} from "../db/db";


export const adminRouter = Router()

const adminRepositoryImpl = new AdminRepositoryImpl(prisma)
const adminServiceImpl = new AdminServiceImpl(adminRepositoryImpl)
const adminControllerImpl = new AdminControllerImpl(adminServiceImpl)


adminRouter.get("/getAdmin", async (req, res) => {
    return adminControllerImpl.getAdmin(req, res)
})

adminRouter.get("/stats", async (req, res) => {
    return adminControllerImpl.getStats(req, res)
})