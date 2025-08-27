import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";

import paymentRoutes from "./routes/paymentRoutes.js";
import authMiddleware from "./middlewares/auth.js";
import errorHandler from "./middlewares/errorHandler.js"; // optional centralized error handler

dotenv.config();

const app = express();

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.error("❌ MongoDB Connection Error:", err));

// Middleware
app.use(cors({ origin: process.env.FRONTEND_URL || "http://localhost:5173", credentials: true }));
app.use(express.json());

// Routes
app.use("/api/payments", paymentRoutes);

// Health check
app.get("/", (req, res) => res.send("✅ Backend server is running"));

// Error handler
app.use(errorHandler);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
