// app.js
const express = require('express');
const app = express();
const logsController = require('./controllers/logsController');
const logsV2Controller = require('./controllers/v2/logsController'); // Import v2 controller

// Middleware
app.use(express.json());
app.use('/logs', logsController);
app.use('/v2/logs', logsV2Controller); // Set up v2 route

// Routes
app.get('/', (req, res) => {
  res.send("Welcome to the Captain's Log");
});

// 404 Route 
app.use((req, res) => {
  res.status(404).send("Page not found");
});

module.exports = app;