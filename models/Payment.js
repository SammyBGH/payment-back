import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  siteType: { type: String, required: true },
  amount: { type: Number, required: true },
  reference: { type: String, required: true },
  status: { type: String, default: "pending" },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // Optional if tracking which user paid
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Payment", paymentSchema);
