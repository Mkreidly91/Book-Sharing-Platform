import express from 'express';
import UserModel from '../models/User';

import { AuthRequest } from '../middlewares/auth.middleware';
import { Book } from '../models/Book';
import mongoose from 'mongoose';

const followUser = async (req: AuthRequest, res: express.Response) => {
  try {
    const targetUserId = req.params.userId;

    const currentUserId = req.user._id;

    const targetUser = await UserModel.findById(targetUserId);
    const currentUser = await UserModel.findById(currentUserId);
    if (!targetUser) {
      return res.status(404).send({ message: 'User not found' });
    }

    const isFollowing = currentUser?.following.find((e) =>
      e._id.equals(targetUser._id)
    );

    let status;

    const { following } = currentUser;
    if (isFollowing) {
      const filtered = following.filter((e) => !e.equals(targetUser._id));
      currentUser.following = filtered;

      status = `unliked ${targetUser.name}`;
    } else {
      currentUser.following = [...following, targetUser._id];
      status = `liked ${targetUser.name}`;
    }
    await currentUser.save();
    return res.status(200).send({ message: status });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ error });
  }
};

const likeBook = async (req: AuthRequest, res: express.Response) => {
  try {
    const targetBookId = req.params.bookId;
    const currentUserId = req.user._id;

    const targetBook = await Book.findById(targetBookId);
    const currentUser = await UserModel.findById(currentUserId);
    if (!targetBook) {
      return res.status(404).send({ error: 'Book not found' });
    }

    const isLiked = currentUser?.likes.find((e) =>
      e._id.equals(targetBook._id)
    );

    let status;
    const { likes } = currentUser;
    if (isLiked) {
      const filtered = likes.filter((e) => !e.equals(targetBook._id));
      currentUser.likes = filtered;

      status = `unliked ${targetBook.title}`;
    } else {
      currentUser.likes = [...likes, targetBook._id];
      status = `liked ${targetBook.title}`;
    }

    await currentUser.save();
    return res.status(200).send({ message: status });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ error });
  }
};

const postBook = async (req: AuthRequest, res: express.Response) => {
  try {
    const { title, author, picture, genres, review } = req.body;

    if (!title || !author || !picture || !genres || !review) {
      return res.status(400).send({ error: 'All fields are required' });
    }

    const { user } = req;

    const newBook = new Book({
      title,
      author,
      picture,
      genres,
      review,
      createdBy: new mongoose.Types.ObjectId(user._id),
    });

    newBook.save();

    const updatedUser = await UserModel.findByIdAndUpdate(
      user._id,
      { $push: { books: newBook._id } },
      { new: true }
    );
    if (!updatedUser) {
      return res.status(400);
    }
    const book = await Book.findById(newBook._id).populate(
      'createdBy',
      'name email'
    );
    console.log(newBook, book);

    return res.status(201).send({
      book: book,
      isFollowing: false,
      isLiked: false,
    });
  } catch (error) {
    console.log(error);
  }
};

const getAllFollowed = async (req: AuthRequest, res: express.Response) => {
  try {
    const user = req.user;
    const currentUser = await UserModel.findById(user._id);
    const response: any = [];

    const { following } = currentUser;

    const books = await Book.find({ createdBy: { $in: following } }).populate(
      'createdBy',
      'name email'
    );

    books.forEach((book) => {
      const isLiked = currentUser.likes.find(
        (e) => e.toString() === book._id.toString()
      );
      const isFollowing = currentUser.following.find(
        (e) => e.toString() === book.createdBy._id.toString()
      );
      response.push({
        book,
        isFollowing: isFollowing ? true : false,
        isLiked: isLiked ? true : false,
      });
    });
    console.log(response);
    return res.status(200).send(response);
  } catch (error) {
    console.log(error);
  }
};

const getAllLiked = async (req: AuthRequest, res: express.Response) => {
  try {
    const user = req.user;
    const currentUser = await UserModel.findById(user._id);
    const response: any = [];

    const { likes } = currentUser;

    const books = await Book.find({ _id: { $in: likes } }).populate(
      'createdBy',
      'name email'
    );

    books.forEach((book) => {
      const isLiked = currentUser.likes.find(
        (e) => e.toString() === book._id.toString()
      );
      const isFollowing = currentUser.following.find(
        (e) => e.toString() === book.createdBy._id.toString()
      );
      response.push({
        book,
        isFollowing: isFollowing ? true : false,
        isLiked: isLiked ? true : false,
      });
    });
    console.log(response);
    return res.status(200).send(response);
  } catch (error) {
    console.log(error);
  }
};

export { followUser, postBook, likeBook, getAllFollowed, getAllLiked };
