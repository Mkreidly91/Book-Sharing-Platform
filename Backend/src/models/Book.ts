import { text } from 'body-parser';
import mongoose from 'mongoose';

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  picture: { type: String },
  genres: [{ type: String }],
  review: { type: String },

  likes: { type: Number, default: 0 },

  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
});

const Book = mongoose.model('Book', bookSchema);

export { Book, bookSchema };
