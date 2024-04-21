import express from 'express';
import cookieParser from 'cookie-parser';
import {corsOptions} from './config/cors';
import {connectDb} from './db/connectDb';
import {PORT} from './config/port';
import {MONGO_URI} from './config/db.connect';
import compression from 'compression';
import http from 'http';
import cors from 'cors';

const app = express();

//middleware
app.use(cors(corsOptions));
app.use(compression());
app.use(cookieParser());
app.use(express.json());


const server = http.createServer(app);

//try connection
const startServer = async () => {
    try {
        await connectDb(MONGO_URI);
        server.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        })
    } catch (error) {
        console.error(error);
    }
};

startServer();