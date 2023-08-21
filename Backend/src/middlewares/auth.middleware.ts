import jwt, { JwtPayload } from 'jsonwebtoken';
import express from 'express';

export interface UserPayload extends JwtPayload {
  name: string;
  email: string;
  id: string;
}

export interface AuthRequest extends express.Request {
  files: any;
  user: UserPayload;
}

const authMiddleware = (
  req: AuthRequest,
  res: express.Response,
  next: express.NextFunction
) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token)
    return res.status(401).send({ message: 'Unauthorized, no token' });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET) as UserPayload;
    if (!decoded) return res.status(401).send({ message: 'Unauthorized' });
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).send({ message: 'Unauthorized' });
  }
};

export default authMiddleware;
