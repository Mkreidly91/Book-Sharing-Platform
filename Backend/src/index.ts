import express from 'express';
import bodyParser from 'body-parser';
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

app.use('/', router());

mongodbConnection();

app.listen(8080, () => {
  console.log('Server running on http://127.0.0.1:8080/');
});
