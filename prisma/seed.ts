import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
const prisma = new PrismaClient();

async function main() {
  const adminPass = await bcrypt.hash('Admin@123', 10);
  await prisma.user.upsert({
    where: { email: 'admin@example.com' },
    update: {},
    create: { name: 'Admin', email: 'admin@example.com', password: adminPass, role: 'ADMIN' }
  });

  const r = await prisma.restaurant.upsert({
    where: { id: 1 },
    update: {},
    create: { name: 'Demo Diner', location: 'Addis Ababa' }
  });

  await prisma.menuItem.upsert({
    where: { id: 1 },
    update: {},
    create: { name: 'Burger', price: 250, restaurantId: r.id }
  });

  await prisma.menuItem.upsert({
    where: { id: 2 },
    update: {},
    create: { name: 'Injera Plate', price: 180, restaurantId: r.id }
  });
}

main().finally(() => prisma.$disconnect());
