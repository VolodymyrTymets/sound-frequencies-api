const decoder = require('../../utils/wav-decoder');
const { getFrequencies } = require('../../utils/math');


const getRecorded = () => async (req, res, next) => {

  const { name } = req.query;

  console.log('name ->', name);
  try {

    const audioData = await decoder(`${name}.wav`);
    const frequencies = getFrequencies(audioData);
    res.status(200).json({ frequencies }).end();

  } catch (error) {
    res.status(200).json({message: error.message }).end();
  }
};

module.exports = getRecorded;
