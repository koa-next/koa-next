import * as request from 'supertest';
const server = 'http://localhost:3000';

describe('test/app/controller/home.test.ts', () => {
  it('should GET /', () => {
    request(server)
      .get('/')
      .expect(200, (_, result) => {
        expect(result.text).toBe('hi, koa-next');
      });
  });
});
