import express from 'express';
import mongoose from'mongoose';
import cors from 'cors';
import { personRoutes } from './routes/PersonRoute';
import { ApiKeyMiddleware } from './middleware/ApiKeyMiddleware'
import  connectDatabase  from "../../config/database";
import dotenv from 'dotenv';
import categorieRouter from './routes/CategorieRoute';
import path from 'path';
import productRoutes from './routes/ProductRoute';

const app = express();
const port = 3000;
dotenv.config();
// Express init
app.use(cors());
app.use(express.json());
// app.use(ApiKeyMiddleware);

// Connect to MongoDB using Mongoose
connectDatabase();


// Routes
app.use('/api/persons', personRoutes);
app.use('/api/categories', categorieRouter);
app.use('/api/products', productRoutes);
app.get('/api/uploads/:imageName', (req, res) => {
  const imageName = req.params.imageName;
  res.sendFile(path.join(__dirname, './../../../src/uploads', imageName));
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
