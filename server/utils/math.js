const fft = require('fft-js').fft;
const fftUtil = require('fft-js').util;
var dft = require('fft-js').dft;

const getPhasors = audioData => {
  const lowRange = audioData.channelData[0];
  const upRange = audioData.channelData[1];
  let phasors = [];

  console.log('sampleRate ->', audioData.sampleRate);
  console.log('lowRange ->', lowRange.length);
  try {

    phasors = fft(lowRange.slice(0, 256));

    console.log(phasors);
  } catch (error) {
    console.log(error)
  }


  // lowRange.forEach((lowRangeItem, index) =>
  //   phasors.push([lowRangeItem, upRange[index]]));




  return phasors;
};

const getFrequencies = (audioData, rate) =>
  fftUtil.fftFreq(getPhasors(audioData), rate || audioData.sampleRate);
// const getFrequencies = (audioData, rate) => getPhasors(audioData);



module.exports = { getFrequencies };
