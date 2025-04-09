const express = require("express");
const router = express.Router();
const { isSeller, isAuthenticated } = require("../middleware/auth");
const {
  addMpesaCredentials,
  updateMpesaCredentials,
  getMpesaCredentials,
  deleteMpesaCredentials
} = require("../controller/sellerMpesa");

// Add M-Pesa credentials
router.post("/add", isAuthenticated, isSeller, addMpesaCredentials);

// Update M-Pesa credentials
router.put("/update/:sellerId", isAuthenticated, isSeller, updateMpesaCredentials);

// Get M-Pesa credentials
router.get("/get/:sellerId", isAuthenticated, isSeller, getMpesaCredentials);

// Delete M-Pesa credentials
router.delete("/delete/:sellerId", isAuthenticated, isSeller, deleteMpesaCredentials);

module.exports = router; 