const _ = require('lodash');
const fft = require("ndarray-fft");
const ndarray = require('ndarray');
const math = require('mathjs');
var ft = require('fourier-transform')

const fjs = require("frequencyjs");

function nearestPow2( aSize ){
  return Math.pow( 2, Math.round( Math.log( aSize ) / Math.log( 2 ) ) );
}
const getWave = () => {
  const frequency = 440;
  const size = 1024;
  const sampleRate = 44100;
  const waveform = new Float32Array(size);
  for (var i = 0; i < size; i++) {
      waveform[i] = Math.sin(frequency * Math.PI * 2 * (i / sampleRate));
  }
  return waveform;
}

const getIndexOfMax = spectrum => {
    let max = spectrum[0].amplitude;
    let maxIndex = 0;

    for (var i = 1; i < spectrum.length; i++) {
        if (spectrum[i].amplitude > max) {
            maxIndex = i;
            max = spectrum[i].amplitude;
        }
    }
    return maxIndex;
}

const getEnergy = (spectrum, l) => {
  const indexOfMax = getIndexOfMax(spectrum);
  console.log('indexOfMax ->', indexOfMax);
  console.log('spectrum ->', spectrum[indexOfMax].amplitude);
  // build arra to calculate energy +-l from max amplitude
  const toCalculation = [];
  let leftIndex = indexOfMax;
  do {
    toCalculation.push(spectrum[leftIndex]);
    leftIndex--;
  } while (spectrum[leftIndex] && (spectrum[leftIndex].frequency > spectrum[indexOfMax].frequency - l));
  toCalculation.reverse();

  let rightIndex = indexOfMax + 1;
  do {
    toCalculation.push(spectrum[rightIndex]);
    rightIndex++;
  } while (spectrum[rightIndex].frequency < spectrum[indexOfMax].frequency + l)


  // calculate squere
  const squeres = [];
  for(let index = 0; index < toCalculation.length - 1; index ++) {
    const a = toCalculation[index].amplitude;
    const b = toCalculation[index + 1].frequency - toCalculation[index].frequency;
    squeres.push(a * b);
  }

  return _.sum(squeres);
}

const aydioFft = (audioData) => {
  const lowRange = audioData.channelData[0];
  const upRange = audioData.channelData[1];
  let waveLength = lowRange.length;
  let index = nearestPow2(waveLength);

  while (!(index <= lowRange.length)) {
    waveLength = waveLength - 2;
    index = nearestPow2(waveLength)
  }

  const wave = lowRange.slice(0, index);
  const spectrum = fjs.Transform.toSpectrum(wave, { method: 'fft'} );
  return { wave: _.values(wave), spectrum };
}

module.exports = { aydioFft, getEnergy, getWave };
