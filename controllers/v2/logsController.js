// controllers/v2/logsController.js
const express = require('express');
const router = express.Router();
const logsArray = require('../../models/log');

// Index Route
router.get('/', (req, res) => {
  const logList = logsArray
    .map(
      (log, index) => `<li><a href="/v2/logs/${index}">${log.title}</a></li>`
    )
    .join('');
  const html = `
    <h1>Captain's Log</h1>
    <ul>${logList}</ul>`;
  res.send(html);
});

// Show Route
router.get('/:index', (req, res) => {
  const index = parseInt(req.params.index);
  if (isNaN(index) || index < 0 || index >= logsArray.length) {
    res.status(404).send("Log not found");
  } else {
    const log = logsArray[index];
    const html = `
      <h1>${log.title}</h1>
      <p><strong>Captain:</strong> ${log.captainName}</p>
      <p><strong>Post:</strong> ${log.post}</p>
      <p><strong>Mistakes Were Made Today:</strong> ${log.mistakesWereMadeToday ? 'Yes' : 'No'}</p>
      <p><strong>Days Since Last Crisis:</strong> ${log.daysSinceLastCrisis}</p>
      <a href="/v2/logs">Back to Index</a>`;
    res.send(html);
  }
});

module.exports = router;