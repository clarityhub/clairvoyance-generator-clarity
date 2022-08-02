const express = require('express');
const bodyParser = require('body-parser');
const { settings } = require('service-claire/helpers/config');
const helmet = require('service-claire/middleware/helmet');
const errorHandler = require('service-claire/middleware/errors');
const logger = require('service-claire/helpers/logger');

const limits = require('./rate-limits');
const routes = require('./routes');

// XXX add a Bugsnag token here
logger.register('');

const app = express();

app.enable('trust proxy');
app.use(helmet());
app.use(bodyParser.json());
app.use(limits);
// XXX verify that this route makes sense
app.use('/<%= serviceNameDashed %>', routes);
app.use(errorHandler);

const server = app.listen(
  settings.port,
  // XXX Replace 💬 with a different icon that represents your service
  () => logger.log(`✅ 💬 service-<%= serviceNameDashed %> running on port ${settings.port}`)
);

module.exports = { app, server }; // For testing
