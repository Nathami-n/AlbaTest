import {User} from '../db/UserModel';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();
export const refreshAccessToken = async (refreshToken: string) => {
    try {
        const user = await User.findOne({authentication: {refreshToken: refreshToken}});
        if(!user) {
            return new Error('User not found');
        };

          const newAccessToken = jwt.sign({email: user.email}, process.env.ACCESS_TOKEN, {expiresIn: '1m'});
    } catch (error) {
        console.error("Error refreshing token:", error.message);
        return null;
    }
}