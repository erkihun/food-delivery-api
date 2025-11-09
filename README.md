✨ Features
🔐 Authentication & Authorization

Register & Login using JWT

Role-based access (Customer / Admin)

Admin manages all users

Users update their own profile

🍽 Restaurants & Menus

Admin adds/updates/deletes restaurants

Admin manages menu items

Customers browse restaurants

Restaurant list cached for 60 seconds

🛒 Orders

Customers place orders

Admin updates order status:
PENDING → PREPARING → DELIVERED

Customers modify pending orders

Each order contains multiple items

📑 Documentation

Full Swagger UI at:
👉 http://localhost:4000/docs

🧪 Testing

Unit tests (Auth, Orders)

Integration tests (Auth → Order → Admin flow)



## Setup
cp .env.example .env
# Update DATABASE_URL & JWT_SECRET

npm i
npx prisma generate
npm run prisma:migrate
npm run prisma:seed
npm run dev

## Tests
npm test

## Endpoints
See Swagger at /docs.
Auth: POST /auth/register, /auth/login
Users: GET /users (admin), GET/PATCH /users/:id (self/admin), DELETE /users/:id (admin)
Restaurants: POST (admin), GET, GET/:id, PATCH (admin), DELETE (admin)
Menu: POST /restaurants/:id/menu (admin), GET /restaurants/:id/menu, GET/PATCH/DELETE /menu/:id (admin for write)
Orders: POST /orders, GET /orders, GET /orders/:id, PATCH /orders/:id/status (admin), DELETE /orders/:id
Order Items: GET /orders/:id/items, PATCH /orders/:id/items/:itemId, DELETE /orders/:id/items/:itemId
