import {prismaMock} from "../test_config/singleton";
import {UserRepositoryImpl} from "../user/user.repository";
import prisma from "../test_config/client";
import {AdminRepositoryImpl} from "../admin/admin.repository";
import {AdminServiceImpl} from "../admin/admin.service";
import mail from "@sendgrid/mail";
import {EmailRepositoryImpl} from "../email/email.repository";
import {SendGridService} from "../email/sendgrid.service";

test('should get a valid admin ', async () => {
    const admin = {
        id: 1,
        email: 'geistmaximo@gmail.com',
        password: "password"
    }

    prismaMock.admin.create.mockResolvedValue(admin)
    prismaMock.admin.findFirst.mockResolvedValue(admin)

    const adminRepository = new AdminRepositoryImpl(prisma)
    const adminService = new AdminServiceImpl(adminRepository)

    await expect(adminService.getAdmin("geistmaximo@gmail.com", "password")).resolves.toEqual({
        id: 1,
        email: 'geistmaximo@gmail.com',
        password: "password",
    })
})

test('a valid admin should get stats', async () => {
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

    const date = new Date()
    const email = {
        id: 1,
        receiver: "geistmaximo@gmail.com",
        subject: "Reunión",
        data: "La reunión va a ser el jueves",
        date:date,
        userId: 1
    }

    prismaMock.admin.create.mockResolvedValue(admin)
    prismaMock.user.create.mockResolvedValue(user)
    prismaMock.user.findMany.mockResolvedValue([user])
    prismaMock.email.create.mockResolvedValue(email)
    prismaMock.email.findMany.mockResolvedValue([email])


    const adminRepository = new AdminRepositoryImpl(prisma)
    const adminService = new AdminServiceImpl(adminRepository)

    const mailAmountAndInfo = await adminService.getStats(undefined, undefined)

    console.log(mailAmountAndInfo[0])

    expect(mailAmountAndInfo[0].mailAmount).toEqual(1)
    expect(mailAmountAndInfo[0].email).toEqual("geistmaximo@gmail.com")


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
    prismaMock.user.create.mockResolvedValue(user)
    prismaMock.user.findMany.mockResolvedValue([user])
    prismaMock.admin.findFirst.mockResolvedValue(admin)
    prismaMock.email.create.mockResolvedValue(email)

    const adminRepository = new AdminRepositoryImpl(prisma)
    const adminService = new AdminServiceImpl(adminRepository)

    const mailAmountAndInfo = await adminService.getStats("2019-04-19", "geistmaximo@gmail.com")

    console.log(mailAmountAndInfo)

    expect(mailAmountAndInfo[0].email).toEqual("geistmaximo@gmail.com")
    expect(mailAmountAndInfo[0].mailAmount).toEqual(0)

})