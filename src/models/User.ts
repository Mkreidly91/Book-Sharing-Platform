import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: {
    type: String,
    required: [true, 'Email field is required'],
    unique: [true, 'Email is already taken'],
    match: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}/,
  },
  password: { type: String, required: true, select: false },
  following: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
});

const UserModel = mongoose.model('User', UserSchema);

export default UserModel;
