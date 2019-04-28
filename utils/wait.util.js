const logger = require('./log.util');

const doWait = (action, interval, expectedValue) => {
    return new Promise((resolve, reject) => {
        if (action() === expectedValue) {
            setTimeout(() => resolve(), interval);
        }
        setTimeout(() => reject(), interval);
        return action();
    })
}


class Wait {
    forTrue(action, maxCount, interval, count = 0) {
        count++
        logger.info(`[${count}] Wait for true`)
        return doWait(action, interval, true).then(() => {
            logger.info('Was able to reach expected condition!');
            return true;
        }, () => {
            if (count >= maxCount) {
                logger.warning('Was not able to reach expected condition!');
                logger.warning('Result: ' + action())
                return false;
            } else {
                return this.forTrue(action, maxCount, interval, count)
            }
        })
    }
}

module.exports = Wait;