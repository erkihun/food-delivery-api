import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { hash, compare } from '../utils/password.js';
import { signToken } from '../middleware/auth.js';
const prisma = new PrismaClient();

export async function register(req: Request, res: Response) {
  const { name, email, password } = req.body;
  if (!name || !email || !password) return res.status(400).json({ message: 'Missing fields' });

  const exists = await prisma.user.findUnique({ where: { email } });
  if (exists) return res.status(409).json({ message: 'Email already exists' });

  const user = await prisma.user.create({
    data: { name, email, password: await hash(password), role: 'CUSTOMER' }
  });

  const token = signToken({ id: user.id, role: user.role as any });
  return res.status(201).json({
    token,
    user: { id: user.id, name: user.name, email: user.email, role: user.role }
  });
}

export async function login(req: Request, res: Response) {
  const { email, password } = req.body;
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) return res.status(401).json({ message: 'Invalid credentials' });

  const ok = await compare(password, user.password);
  if (!ok) return res.status(401).json({ message: 'Invalid credentials' });

  const token = signToken({ id: user.id, role: user.role as any });
  return res.json({
    token,
    user: { id: user.id, name: user.name, email: user.email, role: user.role }
  });
}
