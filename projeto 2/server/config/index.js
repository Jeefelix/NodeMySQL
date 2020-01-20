const bunyan = require('bunyan');

const appname = 'Shopsy';

module.exports = {
  applicationName: appname,
  logger: bunyan.createLogger({ name: appname }),
  mongodb: {
    dsn: 'mongodb://localhost:37017/shopsy',
  },
  redis: {
    options: { port: 7379 },
  },
  mysql: {
    options: {
      host: 'localhost',
      port: 3406,
      database: 'shopsy',
      dialect: 'mysql',
      username: 'root',
      password: 'mypassword',
    },
  },
};