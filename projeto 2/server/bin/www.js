#!/usr/bin/env node

//Dependencias
const http = require('http');
const config = require('../config');
const Sequelize = require('sequelize');

const log = config.logger;

const sequelize = new Sequelize(config.mysql.options);
sequelize
.authenticate()
.then( () => {
    log.info('Connected to MySQL');
})
.catch((err) => {
    log.fatal(err);
    process.getMaxListeners(1);
});

config.mysql.client = sequelize;