const { describe, it } = require('mocha');
const logger = require('../utils/log.util');
const chai = require('chai');
const dateUtil = require('../utils/dateTime.util');


describe('Hello World Testsuite', () => {
    it('should write "Hello World"', () => {
        logger.info('Hello World');
    });
});

describe('DateTime Testsuite', () => {
    it('function today() should return current date', () => {
        let actualDate = dateUtil.today();
        let expectedDate = new Date();
        chai.assert.equal(actualDate.getFullYear(), expectedDate.getFullYear(), "Actual year is not equal to expected");
        chai.assert.equal(actualDate.getMonth(), expectedDate.getMonth(), "Actual month is not equal to expected");
        chai.assert.equal(actualDate.getDate(), expectedDate.getDate(), "Actual day is not equal to expected");
    });

    it('function setYear() should return date with setted year', () => {
        const YEAR_FOR_SET = 1998;
        let actualDate = dateUtil.setYear(new Date(), YEAR_FOR_SET);
        chai.assert.equal(actualDate.getFullYear(), YEAR_FOR_SET, "Actual year is not equal to expected");
        chai.assert.equal(actualDate.getMonth(), new Date().getMonth(), "Actual month is not equal to expected");
        chai.assert.equal(actualDate.getDate(), new Date().getDate(), "Actual day is not equal to expected");
    });

    it('function daysDifference() should return difference in days between dates', () => {
        const expectedDifferenceDays = 28;
        const dateLeft = new Date('2/18/2019');
        const dateRight = new Date('3/18/2019');
        let actualDifferenceDays = dateUtil.daysDifference(dateLeft, dateRight);
        chai.assert.equal(actualDifferenceDays, expectedDifferenceDays, "Actual difference is not equal to expected");
    });
});
