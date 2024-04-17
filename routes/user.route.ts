import {Router} from "express"
import { UserControllerImpl } from "../user/user.controller"
import { UserServiceImpl } from "../user/user.service"
import { UserRepositoryImpl } from "../user/user.repository"


export const userRouter = Router()

const userRepositoryImpl = new UserRepositoryImpl()
const userServiceImpl = new UserServiceImpl(userRepositoryImpl)
const userControllerImpl = new UserControllerImpl(userServiceImpl)


userRouter.post("/register", async (req, res) => {
    return userControllerImpl.register(req, res)
});


userRouter.post("/login", async (req, res) => {
    return userControllerImpl.login(req, res)
})


