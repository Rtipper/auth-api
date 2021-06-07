'use strict';

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const errorHandler = require('./errors/500.js');
const notFound = require('./errors/404.js');
const authRoutes = require('./auth/routes.js');
const v1Routes = require('./routes/V1.js')
const v2Routes = require('./routes/V2.js')

const app = express();

app.use(cors());

app.use(morgan('dev'));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

// ROUTES
app.use(authRoutes);
app.use(v1Routes);
app.use(v2Routes);

// ERROR HANDLERS / CATCH ALLS
app.use('*', notFound);
app.use(errorHandler);

module.exports = {
  app: app,
  start: port => {
    if (!port) { throw new Error("Missing Port"); }
    app.listen(port, () => console.log(`Listening on ${port}`));
  },
};