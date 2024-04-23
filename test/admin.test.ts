import {prismaMock} from "../test_config/singleton";
import {AdminRepositoryImpl} from "../admin/admin.repository";
import {AdminServiceImpl} from "../admin/admin.service";
import mail from "@sendgrid/mail";
import {SendGridService} from "../email/sendgrid.service";
import prismaDb from "../db/db";
import {describe} from "@jest/globals";
import request from "supertest";
import app from "../src/server";
import {EmailRepositoryImpl} from "../email/email.repository";


beforeAll(() => {
    process.env.TOKEN_SECRET = 'nendoanepacene902394iocniampoemce22d2n';
});

test('should get a valid admin ', async () => {
    const admin = {
        id: 1,
        email: 'geistmaximo@gmail.com',
        password: "password"
    }

    prismaMock.admin.create.mockResolvedValue(admin)
    prismaMock.admin.findFirst.mockResolvedValue(admin)

    const adminRepository = new AdminRepositoryImpl(prismaDb)
    const adminService = new AdminServiceImpl(adminRepository)

    await expect(adminService.getAdmin("geistmaximo@gmail.com", "password")).resolves.toEqual({
        id: 1,
        email: 'geistmaximo@gmail.com',
        password: "password",
    })
})

describe("Admin get stats", () => {
    test("This test makes an admin get the stats" +
        "It also includes testing of token", async () => {

        const date = new Date()
        date.setHours(0, 0, 0, 0); // set the time to 00:00:00

        const admin = {
            id: 1,
            email: 'geistmaximo@gmail.com',
            password: "password"
        }

        const user = {
            id: 1,
            name: 'Máximo',
            email: 'geistmaximo@gmail.com',
            password: "password"
        }

        const email = {
            id: 1,
            sender: "geistmaximo@gmail.com",
            receiver: "geistmaximo@gmail.com",
            subject: "Reunión",
            data: "La reunión va a ser el jueves",
            date: date,
            userId: 1
        }

        prismaMock.email.create.mockResolvedValue(email)
        prismaMock.email.findMany.mockResolvedValue([email])
        prismaMock.email.count.mockResolvedValue(1)
        prismaMock.admin.create.mockResolvedValue(admin)
        prismaMock.admin.findFirst.mockResolvedValue(admin)
        prismaMock.user.create.mockResolvedValue(user)
        prismaMock.user.findFirst.mockResolvedValue(user)
        prismaMock.user.findMany.mockResolvedValue([user])

        const adminLogin = await request(app).post("/api/user/login").send(
            {
                email: "geistmaximo@gmail.com",
                password: "password"
            })
        ;

        const adminStats = await request(app).get("/api/admin/stats").send(
            {
                date: date
            }
        )
            .set('Authorization', 'Bearer ' + adminLogin.body.token);
        expect(adminStats.statusCode).toEqual(200)
        expect(adminStats.body.data[0].email).toEqual("geistmaximo@gmail.com")
        expect(adminStats.body.data[0].mailAmount).toEqual(1)
    })
})

test('there should be no mails for a date of 2019', async () => {
    const admin = {
        id: 1,
        email: 'geistmaximo@gmail.com',
        password: "password"
    }
    const email = {
        id: 1,
        sender: "geistmaximo@gmail.com",
        receiver: "geistmaximo@gmail.com",
        subject: "Reunión",
        data: "La reunión va a ser el jueves",
        date: new Date(),
        userId: 1
    }

    const user = {
        id: 1,
        name: 'Máximo',
        email: 'geistmaximo@gmail.com',
        password: "password"
    }


    prismaMock.admin.create.mockResolvedValue(admin)
    prismaMock.admin.findFirst.mockResolvedValue(admin)
    prismaMock.user.create.mockResolvedValue(user)
    prismaMock.email.create.mockResolvedValue(email)
    prismaMock.user.findMany.mockResolvedValue([user])

    const adminRepository = new AdminRepositoryImpl(prismaDb)
    const adminService = new AdminServiceImpl(adminRepository)

    const mailAmountAndInfo = await adminService.getStats("2019-08-14", "geistmaximo@gmail.com")

    console.log(mailAmountAndInfo)

    expect(mailAmountAndInfo[0].email).toEqual("geistmaximo@gmail.com")
    expect(mailAmountAndInfo[0].mailAmount).toEqual(0)

})