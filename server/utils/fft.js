const fft = require("ndarray-fft");
const ndarray = require('ndarray');
const math = require('mathjs');
var ft = require('fourier-transform')

function nearestPow2( aSize ){
  return Math.pow( 2, Math.round( Math.log( aSize ) / Math.log( 2 ) ) );
}
const aydioFft = (audioData, l = 256) => {
  const lowRange = audioData.channelData[0];
  const upRange = audioData.channelData[1];
  const frequencies = [];
  // for (let i =0; i < lowRange.length; i= i + l) {
  //   const x = ndarray(lowRange.slice(i, i + l));
  //   const y = ndarray(upRange.slice(i, i + l));
  //
  //   fft(1, x, y);
  //   x.data.slice(0, x.data.length / 2).forEach((value, index) => {
  //       frequencies.push({
  //       magnitude: math.sqrt(value*value + y.data[index]),
  //       phase: math.atan2(y.data[index], value)
  //     });
  //   });
  // }


  var frequency = 440;
var size = 1024;
var sampleRate = 44100;
var waveform = new Float32Array(size);
for (var i = 0; i < size; i++) {
    waveform[i] = Math.sin(frequency * Math.PI * 2 * (i / sampleRate));
}
console.log('lowRange ->',lowRange.length)
const index = nearestPow2(lowRange.length)
console.log('index ->',index)
const waveform1 = lowRange.slice(0, 32768);
console.log('waveform1 ->',waveform1.length)
var spectrum = ft(waveform1);
//console.log('spectrum ->', spectrum);


    const x = ndarray(lowRange);
    const y = ndarray(upRange);

    // fft(1, x, y);
    // x.data.slice(0, x.data.length / 2).forEach((value, index) => {
    //     frequencies.push({
    //     magnitude: spectrum,///*value,*/math.sqrt(value*value + y.data[index]),
    //     phase: /*y.data[index]*/math.atan2(y.data[index], value)
    //   });
    // });
  return spectrum;
}

module.exports = aydioFft;
