const logger = require('./log.util');

const doWait = (action, interval) => {
    return new Promise((resolve, reject) => {
        if(action()) {
            setTimeout(() => resolve(), interval);
        }
        setTimeout(() => reject(), interval);
    })
}


class Wait {
    forTrue(action, maxCount, interval, count = 0) {
        count++
        logger.info(`[${count}] Wait for true`)
        return doWait(action, interval).then(() => {            
            logger.info('Was able to reach expected condition!');
            return true;            
        }, () => {
            if(maxCount <= count) {
                logger.warning('Was not able to reach expected condition!');
                return false;
            } else {
                return this.forTrue(action, maxCount, interval, count)
            }
        })    
               

    }
}

module.exports = Wait;