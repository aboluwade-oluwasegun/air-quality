import express, { response } from 'express';
import axios from 'axios';

const router = express.Router();

router.post('/api/get-air-quality', async (req, res) => {
  const { lat, lon } = req.body;

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
