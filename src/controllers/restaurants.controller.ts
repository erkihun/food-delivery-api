import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function createRestaurant(req: Request, res: Response) {
  const { name, location } = req.body;
  if (!name || !location) return res.status(400).json({ message: 'Missing fields' });
  const r = await prisma.restaurant.create({ data: { name, location } });
  res.status(201).json(r);
}

export async function listRestaurants(_req: Request, res: Response) {
  const rs = await prisma.restaurant.findMany();
  res.json(rs);
}

export async function getRestaurant(req: Request, res: Response) {
  const id = Number(req.params.id);
  const r = await prisma.restaurant.findUnique({ where: { id } });
  if (!r) return res.status(404).json({ message: 'Not found' });
  res.json(r);
}

export async function updateRestaurant(req: Request, res: Response) {
  const id = Number(req.params.id);
  const { name, location } = req.body;
  const r = await prisma.restaurant.update({ where: { id }, data: { name, location } });
  res.json(r);
}

export async function deleteRestaurant(req: Request, res: Response) {
  const id = Number(req.params.id);
  await prisma.restaurant.delete({ where: { id } });
  res.status(204).send();
}
