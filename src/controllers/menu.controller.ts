import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function addMenuItem(req: Request, res: Response) {
  const restaurantId = Number(req.params.id);
  const { name, price } = req.body;
  if (!name || price == null) return res.status(400).json({ message: 'Missing fields' });
  const item = await prisma.menuItem.create({ data: { name, price, restaurantId } });
  res.status(201).json(item);
}

export async function listMenu(req: Request, res: Response) {
  const restaurantId = Number(req.params.id);
  const items = await prisma.menuItem.findMany({ where: { restaurantId } });
  res.json(items);
}

export async function getMenuItem(req: Request, res: Response) {
  const id = Number(req.params.id);
  const it = await prisma.menuItem.findUnique({ where: { id } });
  if (!it) return res.status(404).json({ message: 'Not found' });
  res.json(it);
}

export async function updateMenuItem(req: Request, res: Response) {
  const id = Number(req.params.id);
  const { name, price } = req.body;
  const it = await prisma.menuItem.update({ where: { id }, data: { name, price } });
  res.json(it);
}

export async function deleteMenuItem(req: Request, res: Response) {
  const id = Number(req.params.id);
  await prisma.menuItem.delete({ where: { id } });
  res.status(204).send();
}
