import {prismaMock} from '../test_config/singleton'
import prismaDb from "../db/db";



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



