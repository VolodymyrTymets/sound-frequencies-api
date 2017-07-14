const { Router: router } = require('express');
const getMic = require('../../utils/mic');

const getRecorded = require('./get-recorded');
const startRecord = require('./start-record');
const stopRecord = require('./stop-record');

const FILE_NAME = 'output.wav';

const micSettings = {
  rate: 44100,
  channels: 2,
  bitwidth: 16,
  debug: true,
  exitOnSilence: 6,
  device: process.env.NODE_ENV === 'production' ? 'plughw:0' : 'plughw:1',
  fileType: 'wav',
};

const decodeFormat  =  {
  formatId: 28980,
  floatingPoint: false,
  numberOfChannels: micSettings.channels,
  sampleRate: micSettings.rate,
  byteRate: micSettings.rate,
  blockSize: micSettings.bitwidth,
  bitDepth: micSettings.bitwidth
};

const mic = getMic(FILE_NAME, micSettings);

module.exports = () => {
  const api = router();
  api.get('/recorded', getRecorded());
  api.get('/start', startRecord(mic, decodeFormat));
  api.get('/stop', stopRecord(mic, FILE_NAME));
  return api;
};
