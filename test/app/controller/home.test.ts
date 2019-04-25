import * as request from 'supertest';
import app from '../../../app';
import * as Validator from 'ajv';

const v = new Validator();

const booleanType = { type: 'boolean' };
const numberType = { type: 'number' };

const dataSchema = {
  properties: {
    result: {
      properties: {
        msg: numberType
      },
      required: ['num'],
    },
    success: booleanType,
  },
  required: ['result', 'success'],
};


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

  test('should POST /api/test', (done) => {
    server
      .post('/api/test')
      .expect(200, (_, result) => {
        expect(v.validate(dataSchema, JSON.parse(result.text))).toBe(true);
        done();
      });
  });
});
