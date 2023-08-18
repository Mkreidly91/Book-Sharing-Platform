import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
// import cookieParser from 'cookie-parser';
// import compression from 'compression';
import cors from 'cors';
import mongoose from 'mongoose';
import { config } from 'dotenv';

// import router from './Routes/index';
// config();

const app = express();

app.use(
  cors({
    credentials: true,
  })
);

app.use(bodyParser.json());

const server = http.createServer(app);

// app.use('/', router());

mongoose.Promise = Promise;
mongoose.connect(process.env.MONGO_URL);
mongoose.connection.on('error', (error: Error) => console.log(error));

server.listen(8080, () => {
  console.log('Server running on http://localhost:8080/');
});
