import mongoose from 'mongoose';

const airQuality = new mongoose.Schema(
  {
    ts: {
      type: String,
      required: true,
    },
    aqius: {
      type: Number,
      required: true,
    },
    mainus: {
      type: String,
      required: true,
    },
    aqicn: {
      type: Number,
      required: true,
    },
    maincn: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const AirQuality = mongoose.model('AirQuality', airQuality);

export { AirQuality };
