import {connect} from 'mongoose'
 export const connectDb = async (URI: string) => {
    try {
        await connect(URI);
        console.log("Database connection successful");
    } catch (error) {
        console.error(error);
    }
    
}