const logger = require('./log.util');

const doWait = (action, expectedValue, interval) => {
  return new Promise((resolve, reject) => {
    const actionResult = action();
    if (actionResult === expectedValue) {
      setTimeout(() => resolve(), interval);
    }
    setTimeout(() => reject(actionResult), interval);
  });
};

const retrier = (action, expectedValue, maxCount, interval, count) => {
  count++;
  logger.info(`[${count}] Wait for ${expectedValue}`);
  return doWait(action, expectedValue, interval).then(() => {
    logger.info('Was able to reach expected condition!');
    return true;
  }, (actionResult) => {
    if (maxCount <= count) {
      logger.warning(`Was not able to reach expected condition! Last value is '${actionResult}'`);
      return false;
    } else {
      return retrier(action, expectedValue, maxCount, interval, count);
    }
  });
};

const retrierAwait = async (action, expectedValue, maxCount, interval, count) => {
  count++;
  logger.info(`[${count}] Wait for ${expectedValue}`);
  try{
    await doWait(action, expectedValue, interval);
    logger.info('Was able to reach expected condition!');
    return true;
  } catch (actionResult) {
    if (maxCount <= count) {
      logger.warning(`Was not able to reach expected condition! Last value is '${actionResult}'`);
      return false;
    } else {
      return retrier(action, expectedValue, maxCount, interval, count);
    }
  }
};

class Wait {
  forTrue(action, maxCount, interval) {
    return retrierAwait(action, true, maxCount, interval, 0);
  }

  forFalse(action, maxCount, interval) {
    return retrierAwait(action, false, maxCount, interval, 0);
  }
}

module.exports = Wait;