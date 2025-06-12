import jwt, { JwtPayload } from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET as string;
if (!JWT_SECRET) {
  throw new Error('JWT_SECRET environment variable is required');
}

export function signToken(id: string): string {
  return jwt.sign({ id }, JWT_SECRET, { expiresIn: '7d' });
}

export function verifyToken(token: string): { id: string } | null {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;
    if (typeof decoded === 'object' && decoded !== null && 'id' in decoded) {
      return { id: (decoded as any).id as string };
    }
    return null;
  } catch {
    return null;
  }
}
