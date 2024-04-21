import {connectDb} from './utils/connectDb';
import {PORT, MONGO_URI} from './config/connection';
import http from 'http';
import authRouter from './routes/authRouter';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import express from 'express';

const app = express();

//middleware
app.use(express.json());
app.use(compression());
app.use(cookieParser());


//connect 
const server = http.createServer(app);

//routes
app.use('/api/v1/', authRouter);



const makeConnection =  async () => {
    try {
        await connectDb(MONGO_URI);
        server.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        })

    } catch(e) {
        console.error(e);
    }
}

makeConnection();