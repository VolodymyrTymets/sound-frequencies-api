const getRecorded = () => async (req, res, next) => {

  const { name } = req.query;

  console.log('name ->', name);

  res.status(200).json([0, 1]).end()

};

module.exports = getRecorded;
