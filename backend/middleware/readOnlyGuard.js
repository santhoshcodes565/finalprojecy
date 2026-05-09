const readOnlyGuard = (req, res, next) => {
  // Check if READ_ONLY_MODE is enabled
  if (process.env.READ_ONLY_MODE === 'true') {
    const restrictedMethods = ['POST', 'PUT', 'PATCH', 'DELETE'];
    if (restrictedMethods.includes(req.method)) {
      return res.status(403).json({
        success: false,
        message: 'The database is locked for testing. Data modification is currently disabled.'
      });
    }
  }
  next();
};

module.exports = readOnlyGuard;
