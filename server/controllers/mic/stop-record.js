const decoder = require('../../utils/wav-decoder');
const { getFrequencies } = require('../../utils/math');


const decodeFile = async (fileName, res, next) => {
  try {
    const audioData = await decoder(fileName);
    const frequencies = getFrequencies(audioData);
    //console.log('--->> send response ')
    res.status(200).json({ frequencies }).end();

  } catch (error) {
    console.log(error)
    next(error)
  }
};

const stopRecord = (mic, fileName) => (req, res, next) => {

  mic.micInputStream.on('error',  err => next(err));

  mic.micInstance.stop();
  setTimeout(() => {
      decodeFile(fileName, res);
  }, 500);
};

module.exports = stopRecord;
