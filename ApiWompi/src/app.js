const express = require('express');
const bodyParser = require('body-parser');
const paymentRoutes = require('./routes/paymentRoutes');
require('dotenv').config();

const app = express();

app.use(bodyParser.json());
app.use('/api/payments', paymentRoutes);

module.exports = app;
