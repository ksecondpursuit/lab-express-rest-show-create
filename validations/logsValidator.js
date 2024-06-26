// validations/logsValidator.js
const validateLog = (log) => {
    const {
      captainName,
      title,
      post,
      mistakesWereMadeToday,
      daysSinceLastCrisis,
    } = log;
    if (
      !captainName ||
      !title ||
      !post ||
      !mistakesWereMadeToday ||
      !daysSinceLastCrisis
    ) {
      return false;
    }
    if (
      typeof captainName !== 'string' ||
      typeof title !== 'string' ||
      typeof post !== 'string' ||
      typeof mistakesWereMadeToday !== 'boolean' ||
      typeof daysSinceLastCrisis !== 'number' ||
      daysSinceLastCrisis < 0
    ) {
      return false;
    }
    return true;
  };
  
  module.exports = validateLog;