import axios from 'axios';
import { AirQuality } from '../models/airQuality.js';

const airQuality = async () => {
  await axios
    .get(process.env.AIRVISUAL_API, {
      params: { lat: '48.856613', lon: '2.352222', key: process.env.API_KEY },
    })
    .then(async (response) => {
      const { ts, aqius, mainus, aqicn, maincn } =
        response.data.data.current.pollution;
      await AirQuality.create({ ts, aqius, mainus, aqicn, maincn });
      console.log('Air quality for the Paris zone saved to the database');
    })
    .catch((err) => {
      console.log(
        'Error saving Air quality for the Paris zone to the database',
        err
      );
    });
};

export { airQuality };
