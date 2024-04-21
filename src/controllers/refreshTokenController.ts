import {Request, Response} from 'express';
import {User} from '../db/UserModel';
import dotenv from 'dotenv';
dotenv.config();
import jwt from 'jsonwebtoken';

export const handleRefreshToken = async (req: Request, res: Response) => {

    const cookies = req.cookies;
    if(!cookies?.jwt) return res.sendStatus(401);
    console.log(cookies);
    const refreshToken = cookies.jwt;

    const userFromDB = await User.findOne({authentication: {refreshToken: refreshToken}});
    if(!userFromDB) return res.sendStatus(403);

    jwt.verify(refreshToken, process.env.REFRESH_TOKEN, (err: jwt.VerifyErrors, decodedToken: jwt.JwtPayload) => {
        if(err || userFromDB.email !== decodedToken.email) {
            return res.sendStatus(403);
        }

        const accessToken = jwt.sign(
            {email: decodedToken.email}, process.env.ACCESS_TOKEN, {expiresIn: '25m'}
        );

        res.json({accessToken});
    })
}