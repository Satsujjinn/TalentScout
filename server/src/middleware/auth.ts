import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET as string;
if (!JWT_SECRET) {
  throw new Error('JWT_SECRET environment variable is required');
}

export interface AuthRequest extends Request {
  userId?: string;
}

export default function auth(req: AuthRequest, res: Response, next: NextFunction) {
  const token =
    req.headers.authorization?.replace('Bearer ', '') ||
    req.cookies.token;
  if (!token) return res.status(401).json({ message: 'No token' });
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload & { id?: string };
    req.userId = decoded.id as string;
    next();
  } catch {
    res.status(401).json({ message: 'Invalid token' });
  }
}
