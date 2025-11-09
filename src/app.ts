import express from 'express';
import morgan from 'morgan';
import cors from 'cors';

import authRoutes from './routes/auth.routes.js';
import usersRoutes from './routes/users.routes.js';
import restaurantsRoutes from './routes/restaurants.routes.js';
import menuRoutes from './routes/menu.routes.js';
import ordersRoutes from './routes/orders.routes.js';

import errorHandler from './middleware/error.js';
import swaggerRouter from './docs/swagger.js';

const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

app.get('/', (_req, res) => res.json({ ok: true, name: 'Food Delivery API' }));
app.use('/docs', swaggerRouter);

app.use('/auth', authRoutes);
app.use('/users', usersRoutes);
app.use('/restaurants', restaurantsRoutes);
app.use('/', menuRoutes);        // exposes /restaurants/:id/menu and /menu/:id
app.use('/orders', ordersRoutes);

app.use(errorHandler);
export default app;
