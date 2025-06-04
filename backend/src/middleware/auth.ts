import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export interface AuthenticatedRequest extends Request {
  userId?: string;
}

export function authenticate(req: AuthenticatedRequest, res: Response, next: NextFunction): void {
  if (process.env.DISABLE_AUTH === 'true') {
    req.userId = process.env.DEFAULT_USER_ID || 'test-user';
    return next();
  }
  const auth = req.headers.authorization;
  if (!auth) {
    res.status(401).json({ message: 'Missing Authorization header' });
    return;
  }
  const token = auth.split(' ')[1];
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET || '') as { id: string };
    req.userId = payload.id;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Invalid token' });
  }
}
