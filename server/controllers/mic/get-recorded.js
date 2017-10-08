const decoder = require('../../utils/wav-decoder');
const { getFrequencies } = require('../../utils/math');

const { aydioFft, getEnergy } = require('../../utils/fft');

const getRecorded = () => async (req, res, next) => {

  const { name } = req.query;

  try {
    const audioData = await decoder(`${name}.wav`);
  //  console.log(audioData)
    const { spectrum, wave } = aydioFft(audioData, 256);
    const energy = getEnergy(spectrum , 10);
    res.status(200).json({ frequencie: spectrum, wave, energy }).end();

  } catch (error) {
    console.log(error)
    res.status(200).json({message: error.message }).end();
  }
};

module.exports = getRecorded;
