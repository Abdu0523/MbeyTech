import express from 'express';
import mongoose from'mongoose';
import cors from 'cors';
import { personRoutes } from './routes/PersonRoute';
import { ApiKeyMiddleware } from './middleware/ApiKeyMiddleware'
import  connectDatabase  from "../../config/database";
import dotenv from 'dotenv';

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

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
