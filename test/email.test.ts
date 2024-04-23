import {prismaMock} from '../test_config/singleton'
import prisma from '../test_config/client'


test('should create a new mail', async () => {
    const email = {
        id:1,
        sender:"geistmaximo@gmail.com",
        receiver:"geistmaximo@gmail.com",
        subject:"Reunión",
        data:"La reunión va a ser el jueves",
        date:new Date(),
        userId:1
    }

    prismaMock.email.create.mockResolvedValue(email)

    await expect(prisma.email.create({
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
        date:new Date(),
        userId:1
    })
})