import jwt, { JwtPayload } from 'jsonwebtoken';
import dotenv from 'dotenv';
import {Request, Response, NextFunction} from 'express';
import { refreshAccessToken } from '../utils/refreshToken';
dotenv.config();

declare global {
    namespace Express {
        interface Request {
            email?: string;
        }
    }
}

 export const verifyToken = async (req: Request, res: Response, next: NextFunction) => {

    const authHeader = req.headers['authorization'];
    if(!authHeader) return res.sendStatus(401);
    console.log(authHeader);

    const token = authHeader.split(' ')[1];
    jwt.verify(token, process.env.ACCESS_TOKEN, async (err, decodedToken) => {
      
        if(err) {
            if(err.name === 'TokenExpiredError') {

                const newAccessToken = await refreshAccessToken(req.cookies.jwt);

                if(!newAccessToken) return res.sendStatus(403);
                req.headers.authorization = `Bearer ${newAccessToken}`;
                next();
        } else {
            return res.sendStatus(403);
        }
    } else {

        const payload = decodedToken as JwtPayload;
        const email = payload.email;
        
        req.email = email;
        next();
    }

    });
}