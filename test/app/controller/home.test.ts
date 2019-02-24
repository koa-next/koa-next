import * as request from 'supertest';
import app from '../../../app';

describe('test/app/controller/home.test.ts', () => {
  let server;

  beforeAll(async () => {
    server = await request(app.listen(3001));
  });

  afterAll(async () => {
    await server.close();
  });

  test('should GET /', (done) => {
    server
      .get('/')
      .expect(200, (_, result) => {
        expect(result.text).toBe('hi, koa-next');
        done();
      });
  });
});
