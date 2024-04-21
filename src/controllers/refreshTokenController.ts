import {Request, Response} from 'express';

import {refreshAccessToken} from '../utils/refreshToken';
import dotenv from 'dotenv';
dotenv.config();

export const handleRefreshToken = async (req: Request, res: Response) => {

    const cookies = req.cookies;
    if(!cookies?.jwt) return res.sendStatus(401);
    console.log(cookies);
    const refreshToken = cookies.jwt;

    const newAccessToken = await refreshAccessToken(refreshToken);
    res.json({ accessToken: newAccessToken});
    }
