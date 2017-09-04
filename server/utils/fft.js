const fft = require("ndarray-fft");
const ndarray = require('ndarray');
const math = require('mathjs');

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

    const x = ndarray(lowRange);
    const y = ndarray(upRange);

    fft(1, x, y);
    x.data.slice(0, x.data.length / 2).forEach((value, index) => {
        frequencies.push({
        magnitude: /*value,*/math.sqrt(value*value + y.data[index]),
        phase: /*y.data[index]*/math.atan2(y.data[index], value)
      });
    });
  return frequencies;
}

module.exports = aydioFft;
