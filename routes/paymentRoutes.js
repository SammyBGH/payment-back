import express from "express";
import Payment from "../models/Payment.js";
import auth from "../middlewares/auth.js";

const router = express.Router();

// Record payment after Paystack success
router.post("/record", auth, async (req, res, next) => {
  try {
    const { reference, name, email, siteType, amount } = req.body;

    if (!reference || !name || !email || !siteType || !amount) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const payment = new Payment({
      reference,
      name,
      email,
      siteType,
      amount,
      userId: req.user.id // if your JWT contains user ID
    });

    await payment.save();
    res.status(201).json({ message: "Payment recorded successfully", payment });
  } catch (err) {
    next(err);
  }
});

export default router;
