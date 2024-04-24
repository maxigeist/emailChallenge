import {prismaMock} from '../test_config/singleton'
import prismaDb from "../db/db";

import request from "supertest"
import {describe} from "@jest/globals";

import app from "../src/server"
import {userRouter} from "../routes/user.route";
import {UserRepositoryImpl} from "../user/user.repository";
import {UserServiceImpl} from "../user/user.service";
import {UserControllerImpl} from "../user/user.controller";
import {InternalServer} from "../error/internal.server";


beforeAll(() => {
    process.env.TOKEN_SECRET = 'nendoanepacene902394iocniampoemce22d2n';
    process.env.MAIL_LIMIT='0'
    process.env.TOKEN_LIMIT='1d'
});

test('should create a new mail', async () => {
    const date = new Date()
    const email = {
        id:1,
        sender:"geistmaximo@gmail.com",
        receiver:"geistmaximo@gmail.com",
        subject:"Reunión",
        data:"La reunión va a ser el jueves",
        date:date,
        userId:1
    }

    prismaMock.email.create.mockResolvedValue(email)

    await expect(prismaDb.email.create({
        data: {
            userId: 1,
            receiver: "geistmaximo@gmail.com",
            subject: "Reunión",
            data: "La reunión va a ser el jueves"
        }
    })).resolves.toEqual({
        id:1,
        sender:"geistmaximo@gmail.com",
        receiver:"geistmaximo@gmail.com",
        subject:"Reunión",
        data:"La reunión va a ser el jueves",
        date:date,
        userId:1
    })
})


describe("User log in and email sending", () => {
    test("This test makes a user login and then sends a mail with that user" +
        "It also includes testing of token", async () => {
        const date = new Date()
        const user = {
            id: 1,
            name: 'Rich',
            email: 'hello@prisma.io',
            password: "password"
        }
        const email = {
            id:1,
            sender:"geistmaximo@gmail.com",
            receiver:"geistmaximo@gmail.com",
            subject:"Reunión",
            data:"La reunión va a ser el jueves",
            date:date,
            userId:1
        }
        prismaMock.user.create.mockResolvedValue(user)
        prismaMock.user.findFirst.mockResolvedValue(user)
        prismaMock.email.create.mockResolvedValue(email)

        const userLogin = await request(app).post("/api/user/login").send(
            {
                email:"hello@prisma.io",
                password:"password"
            });
        console.log(userLogin)

        expect(userLogin.statusCode).toEqual(200)
        const res = await request(app).post("/api/email/send").send(
            {
                forwardEmail:"geistmaximo@gmail.com",
                subject:"Reunión",
                body:"La Reunión va a ser el día jueves"
            })
            .set('Authorization', 'Bearer ' + userLogin.body.token)
        ;
        expect(res.statusCode).toEqual(200)
})
})

describe("Check limit on emails", () => {
    test("This test checks that a user can't surpass the limit email" +
        "It also includes testing of token", async () => {
        const date = new Date()
        const user = {
            id: 1,
            name: 'Máximo',
            email: 'geistmaximo@gmail.com',
            password: "password"
        }
        const email = {
            id:1,
            sender:"geistmaximo@gmail.com",
            receiver:"geistmaximo@gmail.com",
            subject:"Reunión",
            data:"La reunión va a ser el jueves",
            date:date,
            userId:1
        }
        prismaMock.user.create.mockResolvedValue(user)
        prismaMock.user.findFirst.mockResolvedValue(user)
        prismaMock.email.create.mockResolvedValue(email)
        prismaMock.email.count.mockResolvedValue(1)

        const userLogin = await request(app).post("/api/user/login").send(
            {
                email:"geistmaximo@gmail.com",
                password:"password"
            });
        expect(userLogin.statusCode).toEqual(200)
        const res = await request(app).post("/api/email/send").send(
            {
                forwardEmail:"geistmaximo@gmail.com",
                subject:"Reunión",
                body:"La Reunión va a ser el día jueves"
            })
            .set('Authorization', 'Bearer ' + userLogin.body.token)
        expect(res.statusCode).toEqual(429)
    })
})


