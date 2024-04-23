import {prismaMock} from '../test_config/singleton'

import {UserRepositoryImpl} from "../user/user.repository";
import {UserServiceImpl} from "../user/user.service";
import {authenticateToken, decodeUserToken, generateToken} from "../token/token";
import {UserControllerImpl} from "../user/user.controller";
import {InternalServer} from "../error/internal.server";
import prismaDb from "../db/db";


beforeAll(() => {
    process.env.TOKEN_SECRET = 'nendoanepacene902394iocniampoemce22d2n';
});

test('should create new user ', async () => {
    const user = {
        id: 1,
        name: 'Rich',
        email: 'hello@prisma.io',
        password: "password"
    }

    prismaMock.user.create.mockResolvedValue(user)

    const userRepositoryImpl = new UserRepositoryImpl(prismaDb)

    await expect(userRepositoryImpl.register("Rich", "hello@prisma.io", "password")).resolves.toEqual({
        id: 1,
        name: 'Rich',
        email: 'hello@prisma.io',
        password: "password",
    })
})

test('should login an existing user ', async () => {
    const user = {
        id: 1,
        name: 'Rich',
        email: 'hello@prisma.io',
        password: "password"
    }

    prismaMock.user.create.mockResolvedValue(user)
    prismaMock.user.findFirst.mockResolvedValue(user)

    const userRepositoryImpl = new UserRepositoryImpl(prismaDb)

    // Register a user
    await userRepositoryImpl.register("Rich", "hello@prisma.io", "password")

    await expect(userRepositoryImpl.login("hello@prisma.io", "password")).resolves.toEqual({
        id: 1,
        name: 'Rich',
        email: 'hello@prisma.io',
        password: "password",
    })
})


test('user token functionality', async () => {
    const userMock = {
        id: 1,
        name: 'Rich',
        email: 'hello@prisma.io',
        password: "password"
    }

    prismaMock.user.create.mockResolvedValue(userMock)
    prismaMock.user.findFirst.mockResolvedValue(userMock)


    const userRepositoryImpl = new UserRepositoryImpl(prismaDb)
    const userServiceImpl = new UserServiceImpl(userRepositoryImpl)
    const userControllerImpl = new UserControllerImpl(userServiceImpl, new InternalServer())

    const user = await userServiceImpl.login("Rich", "password")

    if (user) {
        const token = generateToken(user?.id, user.email, user.password)
        const decodedToken = decodeUserToken(token)
        expect(decodedToken._id == "1")
        expect(decodedToken.email == "geistmaximo@gmail.com")
        expect(decodedToken.password == "password")
    }
})













