import express from 'express';
import { AirQuality } from '../models/airQuality.js';

const router = express.Router();

router.get(
  '/api/get-datetime-for-highest-pollution-values',
  async (req, res) => {
    const data = await AirQuality.find().sort({ aqius: -1 }).limit(1);
    res.send({ datetime: data[0].createdAt });
  }
);

export { router as datetimeRouter };
