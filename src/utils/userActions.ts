import { ImongoUser } from "types/database";
import { User } from "../db/UserModel"

export const createUser =  async (value: ImongoUser) => {
    const user = await User.create(value);
    return user;
};