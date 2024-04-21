import {connect } from 'mongoose';

 export const connectDb = async (URI: string) => {
    await connect(URI);
}