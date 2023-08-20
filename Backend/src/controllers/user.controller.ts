import express from 'express';
import UserModel from '../models/User';

import { AuthRequest } from '../middlewares/auth.middleware';
import { Book } from '../models/Book';
import mongoose from 'mongoose';
import path from 'path';

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
    console.log(currentUser);
    const { following } = currentUser;
    if (isFollowing) {
      const filtered = following.filter((e) => !e.equals(targetUser._id));
      currentUser.following = filtered;

      status = `unliked ${targetUser.name}`;
    } else {
      currentUser.following = [...following, targetUser._id];
      status = `liked ${targetUser.name}`;
    }
    console.log(currentUser.following);
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
    console.log(targetBookId);
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
    console.log(currentUser);
    const { likes } = currentUser;
    if (isLiked) {
      const filtered = likes.filter((e) => !e.equals(targetBook._id));
      currentUser.likes = filtered;

      status = `unliked ${targetBook.title}`;
    } else {
      currentUser.likes = [...likes, targetBook._id];
      status = `liked ${targetBook.title}`;
    }
    console.log(currentUser.likes);
    await currentUser.save();
    return res.status(200).send({ message: status });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ error });
  }
};

const postBook = async (req: AuthRequest, res: express.Response) => {
  try {
    console.log(req);

    const { title, author, picture, genres, review } = req.body;
    if (!title || !author || !picture || !genres || !review) {
      return res.status(400).send({ error: 'All fields are required' });
    }

    const { user } = req;
    // let image = ''; // Initialize an empty picture URL

    // if (req.files && req.files[0]) {
    //   const pictureFile = req.files[0];
    //   const picturePath = path.join(
    //     __dirname,
    //     '..',
    //     'uploads',
    //     pictureFile.name
    //   );

    //   await pictureFile.mv(picturePath);

    //   image = `/uploads/${pictureFile.name}`;
    // }
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
      { $push: { books: newBook._id } }, // Use $push to add the new book's _id to the array
      { new: true } // Return the updated document
    );
    if (!updatedUser) {
      return res.status(400);
    }
    return res.status(201).send({
      message: 'Book created successfully',
      book: newBook,
      user: updatedUser,
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

    for (const personId of following) {
      const books = await Book.find({ createdBy: personId });
      const person = await UserModel.findById(personId);

      books.forEach((book) => {
        const isLiked = currentUser.likes.find(
          (e) => e.toString() === book._id.toString()
        );
        response.push({
          book,
          person,
          isfollowing: true,
          isLiked: isLiked ? true : false,
        });
      });
    }

    return res.status(200).send(response);
  } catch (error) {}
};
export { followUser, postBook, likeBook, getAllFollowed };
