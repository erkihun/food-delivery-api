CREATE TYPE "Role" AS ENUM ('CUSTOMER', 'ADMIN');

CREATE TYPE "OrderStatus" AS ENUM ('PENDING', 'PREPARING', 'DELIVERED');

CREATE TABLE
    "User" (
        "id" SERIAL NOT NULL,
        "name" TEXT NOT NULL,
        "email" TEXT NOT NULL,
        "password" TEXT NOT NULL,
        "role" "Role" NOT NULL DEFAULT 'CUSTOMER',
        "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "updatedAt" TIMESTAMP(3) NOT NULL,
        CONSTRAINT "User_pkey" PRIMARY KEY ("id")
    );

CREATE TABLE
    "Restaurant" (
        "id" SERIAL NOT NULL,
        "name" TEXT NOT NULL,
        "location" TEXT NOT NULL,
        CONSTRAINT "Restaurant_pkey" PRIMARY KEY ("id")
    );

CREATE TABLE
    "MenuItem" (
        "id" SERIAL NOT NULL,
        "restaurantId" INTEGER NOT NULL,
        "name" TEXT NOT NULL,
        "price" DECIMAL(10, 2) NOT NULL,
        CONSTRAINT "MenuItem_pkey" PRIMARY KEY ("id")
    );

CREATE TABLE
    "Order" (
        "id" SERIAL NOT NULL,
        "userId" INTEGER NOT NULL,
        "restaurantId" INTEGER NOT NULL,
        "status" "OrderStatus" NOT NULL DEFAULT 'PENDING',
        "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "updatedAt" TIMESTAMP(3) NOT NULL,
        CONSTRAINT "Order_pkey" PRIMARY KEY ("id")
    );

CREATE TABLE
    "OrderItem" (
        "id" SERIAL NOT NULL,
        "orderId" INTEGER NOT NULL,
        "menuItemId" INTEGER NOT NULL,
        "quantity" INTEGER NOT NULL,
        CONSTRAINT "OrderItem_pkey" PRIMARY KEY ("id")
    );

CREATE UNIQUE INDEX "User_email_key" ON "User" ("email");

CREATE UNIQUE INDEX "OrderItem_orderId_menuItemId_key" ON "OrderItem" ("orderId", "menuItemId");

ALTER TABLE "MenuItem" ADD CONSTRAINT "MenuItem_restaurantId_fkey" FOREIGN KEY ("restaurantId") REFERENCES "Restaurant" ("id") ON DELETE RESTRICT ON UPDATE CASCADE;

ALTER TABLE "Order" ADD CONSTRAINT "Order_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE;

ALTER TABLE "Order" ADD CONSTRAINT "Order_restaurantId_fkey" FOREIGN KEY ("restaurantId") REFERENCES "Restaurant" ("id") ON DELETE RESTRICT ON UPDATE CASCADE;

ALTER TABLE "OrderItem" ADD CONSTRAINT "OrderItem_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order" ("id") ON DELETE RESTRICT ON UPDATE CASCADE;

ALTER TABLE "OrderItem" ADD CONSTRAINT "OrderItem_menuItemId_fkey" FOREIGN KEY ("menuItemId") REFERENCES "MenuItem" ("id") ON DELETE RESTRICT ON UPDATE CASCADE;