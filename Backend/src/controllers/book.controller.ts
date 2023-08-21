import express from 'express';
import UserModel from '../models/User';

import { AuthRequest } from '../middlewares/auth.middleware';
import { Book } from '../models/Book';
import mongoose from 'mongoose';

const discoverBooks = async (req: AuthRequest, res: express.Response) => {
  try {
    const currentUser = req.user;

    // Get the list of users the current user follows
    const followingUsers = currentUser.following;

    // Find books created by users the current user follows
    const recommendedBooks = await Book.find({
      createdBy: { $in: followingUsers },
    });

    return res.status(200).send({ recommendedBooks });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: 'Internal server error' });
  }
};

const search = async (req: AuthRequest, res: express.Response) => {
  try {
    const { genre, author, keywords } = req.query;
    const user = req.user;

    const currentUser = await UserModel.findById(user._id);

    const query = {} as any;

    if (genre) {
      query.genres = genre;
    }
    if (author) {
      query.author = author;
    }
    if (keywords) {
      query.$or = [
        { title: { $regex: keywords, $options: 'i' } },
        { review: { $regex: keywords, $options: 'i' } },
      ];
    }

    const searchResults = await Book.find(query).populate(
      'createdBy',
      'name email'
    );

    let response: any = [];
    searchResults.forEach((book) => {
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

    return res.status(200).send(response);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export { discoverBooks, search };
