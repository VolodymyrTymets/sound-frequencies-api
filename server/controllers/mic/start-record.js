const decoder = require('../../utils/wav-decoder');
const { getFrequencies } = require('../../utils/math');

const decodeFile = (fileName) => async ( )=> {
  console.log('_________decodeFile________')
  try {
    const audioData = await decoder(fileName);
    const frequencies = getFrequencies(audioData);
    //res.status(200).json({ frequencies }).end();

    global.io.emit('record-data', frequencies);

  } catch (error) {
    console.log(error);
    //next(error)
  }
};

const startRecord = ({micInputStream, micInstance}) => (req, res, next) => {
  micInstance.start();
  //micInputStream.on('error',  err => res.status(500).json({message: err.message }).end());

  const intervalStop = setInterval(() => {
    console.log('----> pause')
    micInstance.pause();
  }, 500);
  const intervalStart = setInterval(() => {
    console.log('----> resume');
    micInstance.resume();
  }, 600);

  // setTimeout(() =>  {
  //   micInstance.pause();
  // }, 500);

  // setTimeout(() =>  {
  //   decodeFile('output.wav')()
  // }, 1050);


  // setTimeout(() =>  {
  //   //micInstance.start();
  // }, 4000);

  setTimeout(() =>  {
    micInstance.stop();
    console.log('________________END__________________')
    clearInterval(intervalStop);
    clearInterval(intervalStart);
  }, 5000);
  micInputStream.on('pauseComplete', () => setTimeout(decodeFile('output.wav'), 50));

  res.status(200).json({ success: true }).end();
};

module.exports = startRecord;
