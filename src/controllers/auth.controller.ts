import express from 'express';
import UserModel from '../models/User';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const register = async (req: express.Request, res: express.Response) => {
  const { body } = req;
  const { name, email, password } = body;

  if (!name) {
    res.status(400).send({ message: 'Name is required' });
  }
  if (!email) {
    res.status(400).send({ message: 'Email is required' });
  }
  if (!password) {
    res.status(400).send({ message: 'Password is required' });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const user = new UserModel({
      name,
      email,
      password: hashedPassword,
    });

    await user.save();
    res.status(200).send(user);
  } catch (error) {
    res.status(500).send(error);
  }
};

const login = async (req: express.Request, res: express.Response) => {
  try {
    const { email: login, password } = req.body;
    const user = await UserModel.findOne({ email: login }).select('+password');
    if (!user)
      return res.status(404).send({ message: 'email/password incorrect' });
    console.log(user);
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid)
      return res.status(404).send({ message: 'email/password incorrect' });

    const {
      password: hashedPassword,
      name,
      email,
      _id,
      ...userInfo
    } = user.toJSON();
    const token = jwt.sign({ name, email, _id }, process.env.JWT_SECRET);

    res.send({
      token,
      user: {
        name,
        email,
        _id,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).send();
  }
};
export { register, login };
