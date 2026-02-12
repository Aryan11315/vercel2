// Custom error handler middleware
const errorHandler = (err, req, res, next) => {
  console.error("Error:", err.message);

  res.status(500).json({
    error: "server_error",
    details: err.message || "Something went wrong",
  });
};

module.exports = errorHandler;
