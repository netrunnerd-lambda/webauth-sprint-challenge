const cors = require('cors');
const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');

const authenticate = require('../auth/authenticate-middleware.js');
const authRouter = require('../auth/auth-router.js');
const jokesRouter = require('../jokes/jokes-router.js');

const server = express();

server.use(cors());
server.use(express.json());
server.use(helmet());
server.use(morgan('dev'));

server.use('/api/auth', authRouter);
server.use('/api/jokes', authenticate, jokesRouter);

module.exports = server;
