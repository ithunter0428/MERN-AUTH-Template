import express from 'express';
import connectDB from './config/db.js';
connectDB();

import authRoutes from './router/auth.js';
const app = express();

app.use(express.json({ limit: '50mb' }));
app.use('/auth', authRoutes);

const PORT = 5000;
app.listen(PORT, console.log(`Server is running on ${PORT}`));
