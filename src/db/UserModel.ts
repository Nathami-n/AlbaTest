import {Schema, model} from 'mongoose';

const UserSchema = new Schema({
    user_name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    avatar: {
        type: String,
        required: false,
        default: "https://cdn-icons-png.flaticon.com/512/149/149071.png"
    },

    hashedPassword: {
        type: String,
        required: true,
    },
    authentication: {
        refreshToken: {
            type: String,
        }
    }
},
{timestamps:true}
);

 export const User = model("User", UserSchema);