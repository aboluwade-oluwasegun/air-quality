import express, { response } from 'express';
import axios from 'axios';

const router = express.Router();

router.post('/api/get-air-quality', async (req, res) => {
  const { lat, lon } = req.body;

  if (!lat || !lon || typeof lat !== 'string' || typeof lon !== 'string') {
    return res.send(
      'Lattitude and longitude must be provided and they should be strings!'
    );
  }

  await axios
    .get(process.env.AIRVISUAL_API, {
      params: { lat, lon, key: process.env.API_KEY },
    })
    .then((response) => {
      const payload = {
        Result: {
          Pollution: response.data.data.current.pollution,
        },
      };
      res.send(payload);
    })
    .catch((err) => {
      console.log(err);
    });
});

export { router as airQualityRouter };
