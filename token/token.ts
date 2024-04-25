import jwt from 'jsonwebtoken';
import {Request, Response} from "express";
import {CantDecodeToken} from "../error/cant.decode.token";

export function authenticateToken(req: Request, res: Response, next: any) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]//take out bearer
    if (token == null) return res.status(401).json(
        {status:401,
            success:false,
            message:"The token couldn't be authenticated, either the token has expired or the token is not valid"
        })
    try {
        jwt.verify(token, process.env.TOKEN_SECRET as string)
        next()
    } catch (error) {
        res.status(401).json(
            {status:401,
                success:false,
                message:"The token couldn't be authenticated, either the token has expired or the token is not valid"
            })
    }
}


export function generateToken(id: number, email: string, password: string) {
    return jwt.sign({
        _id: id,
        email: email,
        password: password
    }, process.env.TOKEN_SECRET as string, {expiresIn: process.env.TOKEN_LIMIT,});
}


export type TokenUnwrap = {
    _id: string;
    email: string;
    password: string
}

export function decodeUserToken(authHeader?: string): TokenUnwrap {
    const token = authHeader && authHeader.split(' ')[1]//take out bearer
    if (token) {
        const tokenUnwrap = jwt.decode(token) as TokenUnwrap
        if (tokenUnwrap) {
            return tokenUnwrap
        } else {
            throw new CantDecodeToken()
        }
    }
    throw new CantDecodeToken()
}
