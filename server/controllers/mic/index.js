const { Router: router } = require('express');
const getRecorded = require('./get-recorded');

module.exports = () => {
  const api = router();
  api.get('/recorded', getRecorded());
  return api;
};