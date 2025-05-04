const logger = (req, res, next) => {
  console.log(`Method: ${req.method}, Path: ${req.url}`);
  console.log(`${req.method}
  ${req.protocol}://${req.host}${req.originalUrl}:${req.port}`); //req.get('host')

  next();
};

module.exports = logger;
