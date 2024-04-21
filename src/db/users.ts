import { Schema, model} from 'mongoose';

interface IUser {
    name: string,
    email: string,
    avatar?: string,
    authentication: object
};


const UserSchema = new Schema<IUser>({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
    },
    authentication: {
        password: { type: String, required:true, select: false},
        salt: { type: String, select: false},
        sessionToken: { type: String, select: false}
    },
   
},
{timestamps: true}
)

export const UserModel = model("User", UserSchema);

