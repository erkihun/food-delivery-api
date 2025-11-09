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