const decoder = require('../../utils/wav-decoder');
const { getFrequencies } = require('../../utils/math');
const decode = require('../../utils/wav-stream-decoder');

const decodeBuffer = format => async buffer => {
  console.log('_________decodeBuffer________')
  try {
    const audioData = await decode(buffer, format);
    const frequencies = getFrequencies(audioData);
    global.io.emit('record-data', frequencies);

  } catch (error) {
    console.log(error);
  }
};


const startRecord = (mic, format) => (req, res, next) => {
  mic.micInstance.start();
  mic.micInputStream.on('data', decodeBuffer(format));
  setTimeout(() =>  {
    mic.micInstance.stop();
  }, 2000);

  res.status(200).json({ success: true }).end();
};

module.exports = startRecord;
