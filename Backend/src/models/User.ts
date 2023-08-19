import mongoose from 'mongoose';
import { bookSchema } from './Book';

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: {
    type: String,
    index: true,
    lowercase: true,
    required: true,
    unique: true,
    match: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}/,
  },
  password: { type: String, required: true, minlength: 6 },
  books: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Book' }],
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Book' }],
  following: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
});

const UserModel = mongoose.model('User', UserSchema);

export default UserModel;
