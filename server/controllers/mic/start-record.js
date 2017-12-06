const _ = require('lodash');
const decoder = require('../../utils/wav-decoder');
const { getFrequencies } = require('../../utils/math');
const header = require("waveheader");
const WavDecoder = require('wav-decoder');
const decode = require('../../utils/wav-stream-decoder');
const getMic = require('../../utils/mic');



const FILE_NAME = 'output.wav';

let buffer = new Buffer([]);


const micSettings =  {
  rate: 44100,
  channels: 2,
  bitwidth: 16,
  debug: false,
  exitOnSilence: 6,
  device: `plughw:1`,
};

const decodeBuffer = async data => {
  console.log('_________decodeBuffer________')
  try {
    buffer = Buffer.concat([buffer, data]);
    // const audioData = await decode(buffer, format);
    // const frequencies = getFrequencies(audioData);
    // const cutted = frequencies.filter((value, index) => index % 5 === 0);
    const audioData = await WavDecoder.decode(Buffer.concat([header(micSettings.rate  * 1024, micSettings), data]))
    const wave = audioData.channelData[0];
    console.log(wave.length)
    if(wave.length > 1000) {
      global.io.emit('record-data', _.values(wave)/*.filter(v => v > 0.01)*/);
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
  }, 5000);

  res.status(200).json({ success: true }).end();
};

module.exports = startRecord;
