import mongoose from 'mongoose';
import { config } from 'dotenv';
config();

const { MONGO_URL } = process.env;

export default async () => {
  mongoose.Promise = Promise;
  await mongoose.connect(MONGO_URL);
  console.log('mongo connected');
  mongoose.connection.on('error', (error: Error) => console.log(error));
};
