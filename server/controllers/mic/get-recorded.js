const decoder = require('../../utils/wav-decoder');
const { getFrequencies } = require('../../utils/math');

const aydioFft = require('../../utils/fft');

const getRecorded = () => async (req, res, next) => {

  const { name } = req.query;

  try {
    const audioData = await decoder(`${name}.wav`);
  //  console.log(audioData)
    const frequencies = aydioFft(audioData, 256);
    res.status(200).json({ frequencies }).end();

  } catch (error) {
    console.log(error)
    res.status(200).json({message: error.message }).end();
  }
};

module.exports = getRecorded;
