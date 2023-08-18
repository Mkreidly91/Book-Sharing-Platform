import express from 'express';
import UserModel from '../models/User';
import bcrypt from 'bcrypt';

const register = async (req: express.Request, res: express.Response) => {
  const { body } = req;
  const { name, email, password } = body;
  if (!name || !email || !password) {
    res.status(400).send('All fields are required');
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

export { register };
