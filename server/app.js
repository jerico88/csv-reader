const express = require('express');
const cors = require('cors');
const dataRoutes = require('./routes/dataRoutes');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/data', dataRoutes);

module.exports = app;