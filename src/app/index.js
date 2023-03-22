const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const compression = require('compression');
const session = require('express-session');
const Sentry = require('@sentry/node');
const Tracing = require('@sentry/tracing');
const expressJSDocSwagger = require('express-jsdoc-swagger');
const passport = require('../auth/services/passport');
const { redisStore } = require('./services/redis');
const morganMiddleware = require('./middlewares/morgan.middleware');
const invalidpathHandler = require('./middlewares/invalidPathHandler');

const routes = require('./routes');
const errorHandler = require('./middlewares/ErrorHandler');
const { env, sentryDSN, SESSION_OPTIONS, swagger } = require('./configs');

const app = express();
expressJSDocSwagger(app)(swagger);

if (env === 'production') {
  Sentry.init({
    dsn: sentryDSN,
    integrations: [
      new Sentry.Integrations.Http({ tracing: true }),
      new Tracing.Integrations.Express({ app }),
    ],
  });
}

app.use(helmet());
app.use(cors({ credentials: true }));
app.use(compression());
app.use(morganMiddleware);
app.use(
  session({
    store: redisStore,
    ...SESSION_OPTIONS,
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
if (env === 'production') app.use(Sentry.Handlers.requestHandler());
// TracingHandler creates a trace for every incoming request
if (env === 'production') app.use(Sentry.Handlers.tracingHandler());
app.use('/api', routes);
if (env === 'production') app.use(Sentry.Handlers.errorHandler());
app.use(async (err, req, res, next) => {
  if (!errorHandler.isTrustedError(err)) {
    next(err);
  }
  await errorHandler.handleError(err, res);
  next(err);
});
app.use(invalidpathHandler);
module.exports = app;
