const express = require('express');
const router = express.Router();
const logsArray = require('../models/log');
const validateLog = require('../validations/logsValidator');

// GET /logs - Return t he logs array
router.get('/', (req, res) => {
  let filteredLogs = [...logsArray];
  // Sorting asc/dsc
  if (req.query.order === 'asc') {
    filteredLogs.sort((a, b) => a.captainName.localeCompare(b.captainName));
  } else if (req.query.order === 'dsc') {
    filteredLogs.sort((a, b) => b.captainName.localeCompare(a.captainName));
  }

  // Filter mistakes - /logs?mistakes=true
  if (req.query.mistakes === 'true') {
    filteredLogs = filteredLogs.filter(
      (log) => log.mistakesWereMadeToday === true
    );
  } else if (req.query.mistakes === 'false') {
    filteredLogs = filteredLogs.filter(
      (log) => log.mistakesWereMadeToday === false
    );
  }

  // Filter crisis days
  if (req.query.lastCrisis === 'gt10') {
    filteredLogs = filteredLogs.filter((log) => log.daysSinceLastCrisis > 10);
  } else if (req.query.lastCrisis === 'gte20') {
    filteredLogs = filteredLogs.filter((log) => log.daysSinceLastCrisis >= 20);
  } else if (req.query.lastCrisis === 'lte5') {
    filteredLogs = filteredLogs.filter((log) => log.daysSinceLastCrisis <= 5);
  }

  res.json(filteredLogs);
});

// POST /logs - Add a new log to the logs array
router.post('/', (req, res) => {
  if (validateLog(req.body)) {
    logsArray.push(req.body);
    res.json(req.body);
  } else {
    res.status(400).json({ error: 'Invalid log format' });
  }
});

// GET /logs/:index - Return the log at the given index
router.get('/:index', (req, res) => {
  const { index } = req.params;
  const log = logsArray[index];
  if (log) {
    res.json(log);
  } else {
    res.redirect(302, '/logs');
  }
});

// PUT /logs/:index - Replace the log at the given index
router.put('/:index', (req, res) => {
  const { index } = req.params;
  if (logsArray[index]) {
    if (validateLog(req.body)) {
      logsArray[index] = req.body;
      res.json(req.body);
    } else {
      res.status(400).json({ error: 'Invalid log format' });
    }
  } else {
    res.status(404).json({ error: 'Not Found' });
  }
});

// DELETE /logs/:index - Delete the log at the given index
router.delete('/:index', (req, res) => {
  const { index } = req.params;
  if (logsArray[index]) {
    const deletedLog = logsArray.splice(index, 1);
    res.json(deletedLog[0]);
  } else {
    res.status(404).json({ error: 'Not Found' });
  }
});

module.exports = router;