import express from 'express';
import cron from 'node-cron';
import 'dotenv/config';
import bodyParser from 'body-parser';

import swaggerUi from 'swagger-ui-express';

import { airQualityRouter } from './src/routes/getAirQuality.js';
import { airQuality } from './src/jobs/airQuality.js';

import { readFile } from 'fs/promises';

const swaggerDocument = JSON.parse(
  await readFile(new URL('./swagger.json', import.meta.url))
);

const app = express();

app.set('trust proxy', true);

app.use((req, res, next) => {
  res.set('Access-Control-Allow-Origin', '*');
  res.set('Access-Control-Allow-Methods', 'POST');
  res.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(airQualityRouter);

app.all('*', () => {
  throw new Error('Route not found');
});

cron.schedule('* * * * *', () => {
  airQuality().then(() => {
    console.log(`Cron job fired at ${Date()}`);
  });
});

export { app };
