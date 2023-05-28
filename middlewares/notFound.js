const notFound = (req, res) => {
  res.status(404).json(`Route doesnot exist`);
};
module.exports = notFound;
