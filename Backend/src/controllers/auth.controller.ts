import express from 'express';
import UserModel from '../models/User';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const register = async (req: express.Request, res: express.Response) => {
  try {
    const { body } = req;
    const { name, email, password } = body;

    if (!name) {
      return res.status(400).send({ error: 'Name is required' });
    }
    if (!email) {
      return res.status(400).send({ error: 'Email is required' });
    }
    if (!password) {
      return res.status(400).send({ error: 'Password is required' });
    } else if (password.length < 6) {
      return res.status(400).send({ error: 'Password too short' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new UserModel({
      name,
      email,
      password: hashedPassword,
    });

    await user.save();
    return res.status(200).send({ message: 'User successfully registered.' });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).send({ error: 'Email already exists' });
    }
    return res.status(500).send(error);
  }
};

const login = async (req: express.Request, res: express.Response) => {
  try {
    const { email: login, password } = req.body;

    if (!login) {
      return res.status(400).send({ error: 'Email is required' });
    }
    if (!password) {
      return res.status(400).send({ error: 'Password is required' });
    }

    const user = await UserModel.findOne({ email: login }).select('+password');
    if (!user)
      return res.status(404).send({ error: 'email/password incorrect' });

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid)
      return res.status(404).send({ error: 'email/password incorrect' });

    const {
      password: hashedPassword,
      name,
      email,
      _id,
      ...userInfo
    } = user.toJSON();
    const token = jwt.sign({ name, email, _id }, process.env.JWT_SECRET);

    return res.send({
      token,
      user: {
        name,
        email,
        _id,
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send();
  }
};
export { register, login };
