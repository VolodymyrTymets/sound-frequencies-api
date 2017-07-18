const { Router: router } = require('express');


const getRecorded = require('./get-recorded');
const startRecord = require('./start-record');
const stopRecord = require('./stop-record');



module.exports = () => {
  const api = router();
  api.get('/recorded', getRecorded());
  api.get('/start', startRecord());
  api.get('/stop', stopRecord());
  return api;
};
