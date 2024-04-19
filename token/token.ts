import jwt from 'jsonwebtoken';
import {Request, Response} from "express";

export function authenticateToken(req:Request, res:Response, next:any) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]//take out bearer
    if (token == null) return res.sendStatus(401)
    try {
        jwt.verify(token, process.env.TOKEN_SECRET as string)
        next()

    }
    catch (error){
        res.status(401).json({status: 401, success: false,message: "Unauthorized"});
    }
}


export function generateToken(id:number, email:string, password:string){
    return jwt.sign({ _id: id, email: email, password:password }, process.env.TOKEN_SECRET as string,{expiresIn: "1d",});
}

type TokenUnwrap = {
    _id: string;
    email: string;
    password:string
}




export function decodeUserToken(token:string) {
    return jwt.decode(token) as TokenUnwrap
}
