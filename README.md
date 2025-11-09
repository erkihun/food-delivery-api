 Backend Development Final Assignment
 Name: Erkihun Bewket
 E-Mail: erkihunbewket@gmail.com


Food Delivery API

Features
Authentication & Authorization

Register & login using JWT
Role-based access control (Customer, Admin)
Admin manages all users
Users can update their own profile
Secure routes with middleware & permissions

Restaurants & Menus

Admin creates/updates/deletes restaurants
Admin manages menu items for each restaurant
Customers view all restaurants
Restaurant list cached for 60 seconds for performance
Each restaurant has multiple menu items

Orders

Customers place new orders
Order contains multiple items
Customers modify pending orders:
Update quantity
Remove items
Admin updates order status:
PENDING → PREPARING → DELIVERED


Admin sees all orders

Customers see only their own orders

 API Documentation

Interactive API documentation available at:

http://localhost:4000/docs

Based on Swagger / OpenAPI (src/docs/openapi.yaml).

Testing

Includes full automated test coverage:
Unit Tests
Authentication (registration + login)
Orders (placing orders)
Integration Tests
Full user flow:

Register → Login → Place Order
Admin order status update flow:
PENDING → PREPARING → DELIVERED

Run all tests:

npm test

Getting Started
1. Install dependencies
npm install

2. Environment variables

Copy the example environment file:
cp .env.example .env
Then update:
DATABASE_URL="postgresql://USER:PASSWORD@localhost:5432/food_delivery"
JWT_SECRET="your_jwt_secret_here"

3. Generate Prisma client

npx prisma generate

4. Run database migrations

npx prisma migrate dev --name init

5.  Start the server
npm run dev

Base URL → http://localhost:4000/

Swagger docs → http://localhost:4000/docs

API Endpoints (Summary)
Auth
Method	        Endpoint	        Description
POST	        /auth/register	    Register customer
POST	        /auth/login	        Login & get JWT

Users
 
Method	        Endpoint	       Role	        Description
GET	            /users	            Admin	     List users
GET	            /users/:id	        Admin/User	 View profile
PATCH	        /users/:id	        Admin/User	 Update user
DELETE	        /users/:id	        Admin	     Remove user

Restaurants

Method	          Endpoint	            Role	   Description
POST	          /restaurants	        Admin	    Create restaurant
GET	              /restaurants	        Public	    List restaurants (cached)
GET	              /restaurants/:id	    Public	    Restaurant details
PATCH	          /restaurants/:id	    Admin	    Update
DELETE	          /restaurants/:id	    Admin	    Delete

 Menu Items

Method	          Endpoint	                 Role	      Description
POST	          /restaurants/:id/menu	      Admin	       Add menu item
GET	              /restaurants/:id/menu	      Public	   List menu
GET	              /menu/:id	                  Public	   Menu item details
PATCH	          /menu/:id	                  Admin	       Update
DELETE	          /menu/:id	                  Admin	       Delete

Orders

Method	        Endpoint	        Role	        Description
POST	        /orders	            Customer	    Place order
GET	            /orders	            Admin/User	    List orders
GET	            /orders/:id	        Admin/User	    Order details
PATCH	        /orders/:id/status	Admin	        Update status
DELETE	        /orders/:id	        Admin/User	    Cancel

Order Items

Method	  Endpoint	                    Role	       Description
GET	      /orders/:id/items	            Admin/User	   View items
PATCH	  /orders/:id/items/:itemId	    Customer	   Update quantity
DELETE	  /orders/:id/items/:itemId	    Customer	   Remove item

📂 Project Structure (MVC pattern)
food-delivery-api/
├─ prisma/
│  ├─ schema.prisma
│  ├─ migrations/
│  └─ seed.ts
├─ src/
│  ├─ app.ts
│  ├─ server.ts
│  ├─ config/
│  ├─ controllers/
│  ├─ middleware/
│  ├─ routes/
│  └─ docs/
│     └─ openapi.yaml
├─ tests/
│  ├─ unit/
│  └─ integration/
├─ .env.example
├─ package.json
├─ tsconfig.json
├─ jest.config.cjs
└─ README.md

Tech 
Node.js + Express (backend framework)
Prisma ORM (PostgreSQL)
JWT Authentication
Role-Based Access Control (RBAC)
Apicache (60-second restaurant caching)
Jest + Supertest (unit & integration tests)
Swagger (OpenAPI) documentation