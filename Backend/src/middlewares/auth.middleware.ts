import jwt, { JwtPayload } from 'jsonwebtoken';
import express from 'express';
// type user = {
//   id: number;
//   name: string;
//   surname: string;
//   authenticationToken?: string | null;
// };
export interface AuthRequest extends express.Request {
  user: string | JwtPayload;
}
const authMiddleware = (
  req: AuthRequest,
  res: express.Response,
  next: express.NextFunction
) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).send({ message: 'Unauthorized' });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    console.log(error);
    res.status(401).send({ message: 'Unauthorized' });
  }
};

module.exports = authMiddleware;
