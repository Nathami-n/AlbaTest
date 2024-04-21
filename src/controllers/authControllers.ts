import {Request, Response} from 'express';
import { createUser } from "../utils/userActions";
import bcrypt from 'bcrypt';
import {User} from '../db/UserModel';
import jwt from 'jsonwebtoken';


export const signUser = async (req: Request, res: Response) => {
    const {name, email, password} = req.body;
    const isUserRegistered = await User.findOne({
        email
    });

    if(isUserRegistered) {
        res.json({data: "already registered"});
        return;
    };

   try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const createdUser =  await createUser({
        user_name: name,
        email,
        hashedPassword,
    });

    if(!createdUser){
        res.json({data: "error"}).status(500);
        return;
    };

     return res.status(200).json({data: createdUser});

   } catch(err) {
    console.error(err);
    return res.json({data: err});
   }
    
}


export const loginUser =  async( req: Request, res: Response) => {
    const {email, password} = req.body;
    if(!email || !password) return res.status(400).json({message: "email and Password are required"});

    try {
        const foundUser = await User.findOne({email});
        if (!foundUser) return res.sendStatus(401);

        //password check
        const isMatch = await bcrypt.compare(password, foundUser.hashedPassword);
        
        if(isMatch) {
            const accessToken =  jwt.sign({email: foundUser.email}, process.env.ACCESS_TOKEN, {expiresIn: '25m'});
            const refreshToken = jwt.sign({email: foundUser.email}, process.env.REFRESH_TOKEN, {expiresIn: '7d'});

            //update the user with the refresh token
            const updateUser = await User.findOneAndUpdate({email}, { authentication: {refreshToken: refreshToken}});
            res.cookie('jwt', refreshToken, {httpOnly: true, maxAge: 7 * 24 * 60 * 60 * 1000} );
            res.json({accessToken, user: updateUser});
        }
    } catch(err) {
        console.error(err);
    }
    
}
