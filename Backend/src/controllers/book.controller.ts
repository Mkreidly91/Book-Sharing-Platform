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

    // Build the query based on the provided parameters
    const query = {} as any;

    if (genre) {
      query.genres = genre;
    }
    if (author) {
      query.author = author;
    }
    if (keywords) {
      query.$or = [
        { title: { $regex: keywords, $options: 'i' } }, // Case-insensitive search
        { review: { $regex: keywords, $options: 'i' } },
      ];
    }

    // Execute the search query
    const searchResults = await Book.find(query);

    return res.status(200).json({ searchResults });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export { discoverBooks, search };
