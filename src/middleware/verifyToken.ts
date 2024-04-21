import jwt, { JwtPayload } from 'jsonwebtoken';
import dotenv from 'dotenv';
import {Request, Response, NextFunction} from 'express';
dotenv.config();

declare global {
    namespace Express {
        interface Request {
            email?: string;
        }
    }
}

 export const verifyToken = (req: Request, res: Response, next: NextFunction) => {

    const authHeader = req.headers['authorization'];
    if(!authHeader) return res.sendStatus(401);
    console.log(authHeader);

    const token = authHeader.split(' ')[1];
    jwt.verify(token, process.env.ACCESS_TOKEN, (err, decodedToken) => {
        if(err) return res.sendStatus(403); //forbidden

        const payload = decodedToken as JwtPayload;
        const email = payload.email;
        
        req.email = email;
        next()
    })
}