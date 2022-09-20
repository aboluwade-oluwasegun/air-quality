import supertest from 'supertest';
import { app } from '../app';

const request = supertest(app);

describe('App Tests', () => {
  test('POST /api/get-air-quality', async (done) => {
    const response = await request.post('/api/get-air-quality').send({
      lat: '35.98',
      lon: '140.33',
    });

    console.log(response.body);
    expect(response.status).toBe(200);
    expect(response.body.Result.Pollution).toMatchSnapshot({
      ts: expect.any(String),
      aqius: expect.any(Number),
      mainus: expect.any(String),
      aqicn: expect.any(Number),
      maincn: expect.any(String),
    });
  });
});
