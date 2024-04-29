import mogoose, { connect } from 'mongoose';
import dotenv from 'dotenv';
dotenv.config;
const connectDatabase = async (): Promise<void> => {
  if (!process.env.DB_LOCAL_URI) {
    throw new Error('DB_LOCAL_URI environment variable is not defined');
  }

  try {
    const db = await mogoose.connect(process.env.DB_LOCAL_URI, {
      autoCreate: true,
      dbName: process.env.DB_NAME,
    });
    console.log(`MongoDB Database connected with HOST: ${db.connection.host}`);
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    throw error;
  }
};

export default connectDatabase;
