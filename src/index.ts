import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
// import cookieParser from 'cookie-parser';
// import compression from 'compression';
import cors from 'cors';
import mongodbConnection from './configs/mongodb.connection';
import { config } from 'dotenv';
config();
import router from './routes';

const app = express();

app.use(
  cors({
    credentials: true,
  })
);

app.use(bodyParser.json());

// const server = http.createServer(app);

app.use('/', router());

mongodbConnection();

app.listen(8080, () => {
  console.log('Server running on http://localhost:8080/');
});
