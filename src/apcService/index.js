const { domainService, nats } = require('config');

const express = require('express');
const { json, urlencoded } = require('body-parser');
const cors = require('cors');

const processRouter = require('./routers/v1/process');
const { natsMessageHandler } = require('./utilities/messageUtil');

const app = express();

app.use(json());
app.use(urlencoded({ extended: true }));
app.use(cors());

app.use('', processRouter);

const run = async () => {
  // subscribe the subject
  if (global.natsClient) {
    global.natsClient.subscribe(nats.stream, `${nats.subject}.params`, `${nats.consumer}_params`, natsMessageHandler);
  }

  return new Promise((resolve, reject) => {
    app.listen(domainService.apc.port, () => {
      resolve();
    });
  });
};

module.exports = {
  run,
};
