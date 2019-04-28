const { describe, it } = require('mocha');
const logger = require('../utils/log.util');
const { assert } = require('chai');
const Wait = require('../utils/wait.util');

describe('Wait Test', () => {
    it('should wait for true "true"', () => {
        const wait = new Wait();
        return wait.forTrue(() => true, 5, 1000, 0).then((result) => assert.isTrue(result))
    })
    it('should wait for true "false"', () => {
        const wait = new Wait();
        return wait.forTrue(() => false, 5, 1000, 0).then((result) => assert.isFalse(result))
    })
})