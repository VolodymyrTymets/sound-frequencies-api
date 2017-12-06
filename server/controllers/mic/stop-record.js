const decoder = require('../../utils/wav-decoder');
const { getFrequencies } = require('../../utils/math');


const decodeFile = async (fileName, res, next) => {
  try {
    const audioData = await decoder(fileName);
    const frequencies = getFrequencies(audioData);
    res.status(200).json({ frequencies }).end();

  } catch (error) {
    console.log(error)
    next(error)
  }
};

const stopRecord = (fileName) => (req, res, next) => {

  //mic.micInputStream.on('error',  err => next(err));
  console.log(req.params.fileName)

  global.mic.micInstance.stop();
  res.status(200).json({ success: true }).end();
  // setTimeout(() => {
  //     decodeFile(fileName, res);
  // }, 10000);

  global.mic.micInstance.on('stopComplete', function() {
    console.log('stopComplete ->')
    const all = Buffer.concat([header(micSettings.rate  * 1024, micSettings) , buffer]);
    WavDecoder.decode(all)
      .then(audioData => {
        fs.writeFile(`../private/assets/${fileName}.wav`, all, err => {
          if(err) {
            console.log(err);
          }
            console.log('Recored Successful...');
          });
        });
      })
      .catch(console.log);
};

module.exports = stopRecord;
