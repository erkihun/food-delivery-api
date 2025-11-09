import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

type Status = 'PENDING' | 'PREPARING' | 'DELIVERED';

export async function placeOrder(req: Request, res: Response) {
  const userId = req.user!.id;
  const { restaurantId, items } = req.body as {
    restaurantId: number;
    items: Array<{ menuItemId: number; quantity: number }>;
  };

  if (!restaurantId || !Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ message: 'Invalid payload' });
  }

  for (const it of items) {
    if (
      !it ||
      typeof it.menuItemId !== 'number' ||
      typeof it.quantity !== 'number' ||
      it.quantity <= 0
    ) {
      return res.status(400).json({ message: 'Each item must include a valid menuItemId and quantity > 0' });
    }
  }


  const uniqueIds = [...new Set(items.map(i => i.menuItemId))];
  const menuItems = await prisma.menuItem.findMany({
    where: { id: { in: uniqueIds }, restaurantId }
  });
  if (menuItems.length !== uniqueIds.length) {
    return res.status(400).json({ message: 'Some menu items do not exist for the specified restaurant' });
  }

  const order = await prisma.$transaction(async (tx: any) => {
    const created = await tx.order.create({
      data: { userId, restaurantId, status: 'PENDING' as Status }
    });
    const rows = items.map(i => ({
      orderId: created.id,
      menuItemId: i.menuItemId,
      quantity: i.quantity
    }));
    await tx.orderItem.createMany({ data: rows });
    return created;
  });

  const full = await prisma.order.findUnique({
    where: { id: order.id },
    include: { items: true }
  });
  return res.status(201).json(full);
}

export async function listOrders(req: Request, res: Response) {
  const me = req.user!;
  const where = me.role === 'ADMIN' ? {} : { userId: me.id };
  const orders = await prisma.order.findMany({ where, include: { items: true } });
  return res.json(orders);
}

export async function getOrder(req: Request, res: Response) {
  const id = Number(req.params.id);
  const me = req.user!;
  const order = await prisma.order.findUnique({
    where: { id },
    include: { items: true }
  });
  if (!order) return res.status(404).json({ message: 'Not found' });
  if (me.role !== 'ADMIN' && order.userId !== me.id)
    return res.status(403).json({ message: 'Forbidden' });
  return res.json(order);
}

export async function updateOrderStatus(req: Request, res: Response) {
  const id = Number(req.params.id);
  const { status } = req.body as { status: Status };

  if (!status || !['PENDING', 'PREPARING', 'DELIVERED'].includes(status)) {
    return res.status(400).json({ message: 'Invalid status' });
  }

  const order = await prisma.order.findUnique({ where: { id } });
  if (!order) return res.status(404).json({ message: 'Not found' });

  const current = order.status as Status;

  const validNext: Record<Status, Status | null> = {
    PENDING: 'PREPARING',
    PREPARING: 'DELIVERED',
    DELIVERED: null,
  };

  const next = validNext[current];
  if (next !== status) {
    return res
      .status(400)
      .json({ message: `Invalid transition from ${current} to ${status}` });
  }

  const updated = await prisma.order.update({
    where: { id },
    data: { status: status as Status },
    include: { items: true }
  });
  return res.json(updated);
}

export async function cancelOrder(req: Request, res: Response) {
  const id = Number(req.params.id);
  const me = req.user!;
  const order = await prisma.order.findUnique({ where: { id } });
  if (!order) return res.status(404).json({ message: 'Not found' });
  if (me.role !== 'ADMIN' && order.userId !== me.id)
    return res.status(403).json({ message: 'Forbidden' });
  if ((order.status as Status) === 'DELIVERED')
    return res.status(400).json({ message: 'Cannot cancel delivered order' });

  await prisma.order.delete({ where: { id } });
  return res.status(204).send();
}

export async function listOrderItems(req: Request, res: Response) {
  const id = Number(req.params.id);
  const me = req.user!;
  const order = await prisma.order.findUnique({
    where: { id },
    include: { items: true }
  });
  if (!order) return res.status(404).json({ message: 'Not found' });
  if (me.role !== 'ADMIN' && order.userId !== me.id)
    return res.status(403).json({ message: 'Forbidden' });
  return res.json(order.items);
}

export async function updateOrderItem(req: Request, res: Response) {
  const id = Number(req.params.id);
  const itemId = Number(req.params.itemId);
  const me = req.user!;
  const order = await prisma.order.findUnique({ where: { id } });
  if (!order) return res.status(404).json({ message: 'Not found' });
  if (me.role !== 'ADMIN' && order.userId !== me.id)
    return res.status(403).json({ message: 'Forbidden' });
  if ((order.status as Status) !== 'PENDING')
    return res.status(400).json({ message: 'Order not pending' });

  const { quantity } = req.body as { quantity: number };
  if (typeof quantity !== 'number' || quantity <= 0) {
    return res.status(400).json({ message: 'Quantity must be a positive number' });
  }

  const updated = await prisma.orderItem.update({
    where: { id: itemId },
    data: { quantity }
  });
  return res.json(updated);
}

export async function removeOrderItem(req: Request, res: Response) {
  const id = Number(req.params.id);
  const itemId = Number(req.params.itemId);
  const me = req.user!;
  const order = await prisma.order.findUnique({ where: { id } });
  if (!order) return res.status(404).json({ message: 'Not found' });
  if (me.role !== 'ADMIN' && order.userId !== me.id)
    return res.status(403).json({ message: 'Forbidden' });
  if ((order.status as Status) !== 'PENDING')
    return res.status(400).json({ message: 'Order not pending' });

  await prisma.orderItem.delete({ where: { id: itemId } });
  return res.status(204).send();
}
