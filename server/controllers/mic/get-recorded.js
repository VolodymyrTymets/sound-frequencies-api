const decoder = require('../../utils/wav-decoder');
const { getFrequencies } = require('../../utils/math');

const fft = require("ndarray-fft");
const ndarray = require('ndarray');
var math = require('mathjs');


const getRecorded = () => async (req, res, next) => {

  const { name } = req.query;

  try {
    const audioData = await decoder(`${name}.wav`);
    const lowRange = ndarray(audioData.channelData[0]);
    const upRange = ndarray(audioData.channelData[1]);
    console.log('Love Channel Range ->', lowRange.data.slice(0, 3));
    console.log('Up Channel Range ->', upRange.data.slice(0, 3));

    fft(1, lowRange, upRange);

    console.log('Love Signal Range ->', lowRange.data.slice(0, 3));
    console.log('Up Signal Range ->', upRange.data.slice(0, 3));
    const frequencies = []
    lowRange.data.slice(0, lowRange.data.length / 2).forEach((value, index) => {
      frequencies.push({
      magnitude: math.sqrt(value*value + upRange.data[index]),
      phase: math.atan2(upRange.data[index], value)
    });
    });
    console.log(frequencies.length)
    console.log(frequencies[0])
   // const frequencies = getFrequencies(audioData);
    res.status(200).json({ frequencies }).end();

  } catch (error) {
    res.status(200).json({message: error.message }).end();
  }
};

module.exports = getRecorded;
