import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { env } from '../config/env.js';

export interface JwtUser { id: number; role: 'ADMIN'|'CUSTOMER'; }

declare global {
  namespace Express { interface Request { user?: JwtUser } }
}

export function authenticate(req: Request, res: Response, next: NextFunction) {
  const auth = req.headers.authorization || '';
  const token = auth.startsWith('Bearer ') ? auth.substring(7) : null;
  if (!token) return res.status(401).json({ message: 'Missing token' });
  try {
    const payload = jwt.verify(token, env.JWT_SECRET) as JwtUser;
    req.user = payload;
    next();
  } catch {
    return res.status(401).json({ message: 'Invalid token' });
  }
}

export function signToken(user: JwtUser) {
  return jwt.sign(user, env.JWT_SECRET, { expiresIn: '1d' });
}
