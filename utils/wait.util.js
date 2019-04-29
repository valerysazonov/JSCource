const logger = require('./log.util');

const doWait = (action, interval, expectedValue) => {
    return new Promise((resolve, reject) => {
        const actionResult = action();
        if (actionResult === expectedValue) {
            setTimeout(() => resolve(), interval);
        }
        setTimeout(() => reject(actionResult), interval);
    });
};

const retrier = (action, interval, expectedValue, maxCount, count) => {
    count++;
    logger.info(`[${count}] Wait for ${expectedValue}`);
    return doWait(action, interval, expectedValue).then(() => {
        logger.info('Was able to reach expected condition!');
        return true;
    }, (actionResult) => {
        if (count >= maxCount) {
            logger.warning('Was not able to reach expected condition!');
            logger.warning('Result: ' + actionResult);
            return false;
        } else {
            return retrier(action, interval, expectedValue, maxCount, count);
        }
    });
};

class Wait {
    forTrue(action, maxCount, interval) {
        return retrier(action, interval, true, maxCount, 0);
    }

    forFalse(action, maxCount, interval) {
        return retrier(action, interval, false, maxCount, 0);
    }
}

module.exports = Wait;