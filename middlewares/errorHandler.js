export default function errorHandler(err, req, res, next) {
  console.error("Server Error:", err.stack || err);
  res.status(500).json({ message: "Server error", error: err.message });
}
