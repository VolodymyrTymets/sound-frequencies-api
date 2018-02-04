const _ = require('lodash');
const decoder = require('../../utils/wav-decoder');
//const { getFrequencies } = require('../../utils/math');
const decode = require('../../utils/wav-stream-decoder');
const getMic = require('../../utils/mic');
const aydioFft = require('../../utils/fft');

const FILE_NAME = 'output.wav';

const micSettings = {
  rate: 44100,
  channels: 2,
  bitwidth: 16,
  debug: true,
  exitOnSilence: 6,
  device: process.env.NODE_ENV === 'production' ? 'plughw:1' : 'plughw:0',
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

let waves = [];
const decodeBuffer = async buffer => {
  console.log('_________decodeBuffer________')
  try {
    const audioData = await decode(buffer);
    const wave = audioData.channelData[0]
    //console.log('audioData ->', audioData)
    //const frequencies = aydioFft(audioData, 1024);
    //const cutted = frequencies.filter((value, index) => index % 5 === 0);
    waves.push( _.values(wave))
    if (waves.length === 5) {
      global.io.emit('record-data', _.flatten(waves));
      waves = [];
    }


  } catch (error) {
    console.log(error);
  }
};


const startRecord = () => (req, res, next) => {
  global.mic = getMic(FILE_NAME, micSettings);

  global.mic.micInputStream.on('error', function(err) {
    cosole.log("Error in Input Stream: " + err);
  });
  global.mic.micInputStream.on('data', decodeBuffer);

  global.mic.micInstance.start();
  setTimeout(() =>  {
    mic.micInstance.stop();
  }, 15000);

  res.status(200).json({ success: true }).end();
};

module.exports = startRecord;
