 export interface ImongoUser {
    user_name: string;
    email: string;
    avatar?: string;
    hashedPassword: string;
    authentication?: object;
}