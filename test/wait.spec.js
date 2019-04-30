const { describe, it } = require('mocha');
const { assert } = require('chai');
const Wait = require('../utils/wait.util');

describe('Wait Test', () => {
  it('should wait for true "true"', async () => {
    const wait = new Wait();
    const result = await wait.forTrue(() => true, 5, 1000);
    return assert.isTrue(result);
  });

  it('should wait for true "false"', async () => {
    const wait = new Wait();
    const result = await wait.forTrue(() => false, 5, 1000);
    return assert.isFalse(result);
  });

  it('should wait for false "true"', async () => {
    const wait = new Wait();
    const result = await wait.forFalse(() => false, 5, 1000);
    return assert.isTrue(result);
  });

  it('should wait for false "false"', async () => {
    const wait = new Wait();
    const result = await wait.forFalse(() => true, 5, 1000);
    return assert.isFalse(result);
  });

  it('should wait for multiple false', async () => {
    const wait = new Wait();
    const results = await Promise.all([
      wait.forFalse(() => true, 5, 1000),
      wait.forFalse(() => false, 5, 1000)
    ]);
    assert.isFalse(results[0]);
    assert.isTrue(results[1]);
  });
});