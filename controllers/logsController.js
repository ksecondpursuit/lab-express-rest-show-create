const express = require('express');
const logs = express.Router();
const logsArr = require('../captainslog');

logs.get('/', (req, res) => {
    res.json(logsArr); // Corrected the variable name
});

logs.get('/:arrayIndex', (req, res) => {
    const { arrayIndex } = req.params;
    if (logsArr[arrayIndex]) {
        res.json(logsArr[arrayIndex]); // Respond with the correct log entry
    } else {
        res.json({ error: "log not found" }); // Corrected error message
    }
});

module.exports = logs; // Corrected the export