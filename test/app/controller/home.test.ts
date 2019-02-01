import * as request from 'supertest';
import app from '../../../app';

const server = request(app.listen(3000));

describe('test/app/controller/home.test.ts', () => {
  it('should GET /', (done) => {
    server
      .get('/')
      .expect(200, (_, result) => {
        expect(result.text).toBe('hi, koa-next');
        done();
      });
  });
});
