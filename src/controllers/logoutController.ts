import {Request, Response} from 'express';
import {User} from '../db/UserModel';
export const handleLogout =  async (req: Request, res: Response) => {

    const cookies = req.cookies;
    if(!cookies?.jwt) {
        res.clearCookie('jwt', {httpOnly: true, sameSite: true, secure: true});
        res.sendStatus(204);
    };

    const refreshToken = cookies.jwt;

    //find user and delete the refreshToken;
    const updatedUser = await User.findOneAndUpdate({authentication:{refreshToken: refreshToken}}, {authentication: {refreshToken: ''}});
    //clear the cookie
    res.clearCookie('jwt', {httpOnly: true, sameSite: true, secure: true});
    res.sendStatus(204);
    return;
}