import { home } from '../../../app/service';

describe('test/app/service/home.test.ts', () => {
  test('sayHi', async () => {
    const result = await home.sayHi('koa-next');
    expect(result).toBe('hi, koa-next');
  });
});
