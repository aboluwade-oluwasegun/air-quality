import express from 'express';
import 'dotenv/config';
import bodyParser from 'body-parser';
import swaggerUi from 'swagger-ui-express';
import { airQualityRouter } from './src/routes/getAirQuality.js';
import { datetimeRouter } from './src/routes/getHighestValues.js';
import swaggerDocument from './src/utils/swaggerDoc.js';

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
app.use(datetimeRouter);

app.all('*', () => {
  throw new Error('Route not found');
});

export { app };
