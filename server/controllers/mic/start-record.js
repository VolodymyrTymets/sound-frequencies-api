const startRecord = ({micInputStream, micInstance}) => (req, res, next) => {
  micInstance.start();
  //micInputStream.on('error',  err => res.status(500).json({message: err.message }).end());
  setTimeout(() => micInstance.stop(), 5000);
  res.status(200).json({ success: true }).end();
};

module.exports = startRecord;
