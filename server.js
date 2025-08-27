import express from "express"; 
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";

import paymentRoutes from "./routes/paymentRoutes.js";
import errorHandler from "./middlewares/errorHandler.js";

dotenv.config();

const app = express();

// Trust Render’s proxy/load balancer
app.set("trust proxy", 1);

// Connect to MongoDB with timeout
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 5000
})
  .then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.error("❌ MongoDB Connection Error:", err));

// CORS middleware (allow frontend and Vercel previews)
app.use(cors({
  origin: (origin, callback) => {
    if (!origin) return callback(null, true); // allow tools like Postman
    if (origin === process.env.FRONTEND_URL || /\.vercel\.app$/.test(origin)) {
      return callback(null, true);
    }
    callback(new Error("CORS not allowed"));
  },
  credentials: true
}));

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
