import {Request, Response} from 'express';
import { createUser } from "../utils/userActions";
import bcrypt from 'bcrypt';


export const signUser = async (req: Request, res: Response) => {
    const {name, email, password} = req.body;
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
