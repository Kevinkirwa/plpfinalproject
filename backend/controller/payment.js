const express = require("express");
const router = express.Router();
const catchAsyncErrors = require("../middleware/catchAsyncErrors");

// Payment routes will be handled by M-Pesa
router.get("/status", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Payment system is active",
  });
});

module.exports = router;