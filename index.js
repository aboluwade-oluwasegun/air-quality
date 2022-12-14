import { app } from './app.js';
import mongoose from 'mongoose';
import { airQuality } from './src/jobs/airQuality.js';
import cron from 'node-cron';

const start = async () => {
  cron.schedule('* * * * *', () => {
    airQuality().then(() => {
      console.log(`Cron job fired at ${Date()}`);
    });
  });

  if (!process.env.AIRVISUAL_API) {
    throw new Error('AIRVISUAL_API must be defined');
  }
  if (!process.env.API_KEY) {
    throw new Error('API_KEY must be defined');
  }
  if (!process.env.MONGO_URI) {
    throw new Error('MONGO_URI must be defined');
  }

  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('App connected to mongodb');
  } catch (err) {
    console.log(err);
  }
  app.listen(process.env.PORT || 3001, () => {
    console.log('App running!');
  });
};

start();
