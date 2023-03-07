const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const compression = require('compression');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const Sentry = require('@sentry/node');
const Tracing = require('@sentry/tracing');
const { MONGO_URL } = require('./services/mongo');
const morganMiddleware = require('./middlewares/morgan.middleware');
const {
  windowMs,
  maxRequestPerWindow,
  sentryDSN,
} = require('./configs/server');
const routes = require('./routes');
const { accessPrivateToken, env } = require('./configs');

const app = express();
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
app.use(rateLimit({ max: Number(maxRequestPerWindow), windowMs }));
app.use(compression());
app.use(morganMiddleware);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: accessPrivateToken,
    store: MongoStore.create({ mongoUrl: MONGO_URL }),
    cookie: { maxAge: 1000 * 60 * 60 * 24 * 7 * 2 },
    resave: true,
    saveUninitialized: true,
  })
);

if (env === 'production') app.use(Sentry.Handlers.requestHandler());
// TracingHandler creates a trace for every incoming request
if (env === 'production') app.use(Sentry.Handlers.tracingHandler());
app.use('/', routes);
if (env === 'production') app.use(Sentry.Handlers.errorHandler());

module.exports = app;
