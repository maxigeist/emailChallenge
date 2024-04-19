import {Router} from "express"
import { UserControllerImpl } from "../user/user.controller"
import { UserServiceImpl } from "../user/user.service"
import { UserRepositoryImpl } from "../user/user.repository"
import {InternalServer} from "../error/internal.server";


export const userRouter = Router()


const commonError = new InternalServer()

const userRepositoryImpl = new UserRepositoryImpl()
const userServiceImpl = new UserServiceImpl(userRepositoryImpl)
const userControllerImpl = new UserControllerImpl(userServiceImpl, commonError)


userRouter.post("/register", async (req, res) => {
    return userControllerImpl.register(req, res)
});


userRouter.post("/login", async (req, res) => {
    return userControllerImpl.login(req, res)
})


