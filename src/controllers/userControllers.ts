import { User } from '../db/UserModel';
import {Request, Response} from 'express';

export const getAllUsers = async (req: Request, res: Response) => {
    const usermail = req.email;
    if(!usermail) return res.json({message: "not found"});
    const findUser = await User.findOne({
        email: usermail
    })

     return res.json({data: findUser});
};

