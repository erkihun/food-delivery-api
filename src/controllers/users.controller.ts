import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function listUsers(_req: Request, res: Response) {
  const users = await prisma.user.findMany({
    select: { id: true, name: true, email: true, role: true, createdAt: true }
  });
  res.json(users);
}

export async function getUser(req: Request, res: Response) {
  const id = Number(req.params.id);
  const u = await prisma.user.findUnique({
    where: { id },
    select: { id: true, name: true, email: true, role: true }
  });
  if (!u) return res.status(404).json({ message: 'Not found' });
  res.json(u);
}

export async function updateUser(req: Request, res: Response) {
  const id = Number(req.params.id);
  const { name } = req.body;
  const u = await prisma.user.update({ where: { id }, data: { name } });
  res.json({ id: u.id, name: u.name, email: u.email, role: u.role });
}

export async function deleteUser(req: Request, res: Response) {
  const id = Number(req.params.id);
  await prisma.user.delete({ where: { id } });
  res.status(204).send();
}
