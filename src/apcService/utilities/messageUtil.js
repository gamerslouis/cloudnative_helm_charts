const logger = require('../../utilities/logger')('APC_SERVICE');

const natsMessageHandler = (message) => {
  if (!global.cache) {
    return;
  }

  const msgObj = JSON.parse(message);
  if (msgObj.type === 'FACTOR_THICKNESS') {
    global.cache.set('FACTOR_THICKNESS', msgObj.factor);

    logger.info(`receive thickness factor: ${msgObj.factor}`);
  } else if (msgObj.type === 'FACTOR_MOISTURE') {
    global.cache.set('FACTOR_MOISTURE', msgObj.factor);

    logger.info(`receive moisture factor: ${msgObj.factor}`);
  }
};

module.exports = {
  natsMessageHandler,
};
