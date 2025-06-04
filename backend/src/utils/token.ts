import jwt from 'jsonwebtoken';

export function signToken(id: string) {
  return jwt.sign({ id }, process.env.JWT_SECRET || 'secret', { expiresIn: '7d' });
}

export function verifyToken(token: string) {
  try {
    return jwt.verify(token, process.env.JWT_SECRET || 'secret') as { id: string };
  } catch {
    return null;
  }
}
