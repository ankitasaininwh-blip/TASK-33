function notFound(req, res, next) {
  res.status(404).json({
    error: `Route not found: ${req.method} ${req.originalUrl}`
  });
}

function errorHandler(err, req, res, next) {
  console.error(err);

  if (err.name === "ValidationError") {
    return res.status(400).json({
      error: err.message
    });
  }

  if (err.name === "CastError") {
    return res.status(400).json({
      error: "Invalid ID or value"
    });
  }

  res.status(500).json({
    error: "Internal server error"
  });
}

module.exports = {
  notFound,
  errorHandler
};