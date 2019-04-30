const logWithTag = (tag, text) => {
    /* eslint-disable no-console */
    console.log(`[${tag}] ${new Date()} ${text} [${tag}]`);
    /* eslint-enable no-console */
};

class Log {
    info(text) {
        logWithTag('INFO', text);
    }

    warning(text) {
        logWithTag('WARNING', text);
    }

    error(text) {
        logWithTag('ERROR', text);
    }
}

module.exports = new Log();
