const mongoose = require("mongoose");

const sellerMpesaSchema = new mongoose.Schema({
  sellerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Seller",
    required: true,
    unique: true
  },
  consumerKey: {
    type: String,
    required: true
  },
  consumerSecret: {
    type: String,
    required: true
  },
  passKey: {
    type: String,
    required: true
  },
  shortCode: {
    type: String,
    required: true
  },
  isActive: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Update the updatedAt field before saving
sellerMpesaSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model("SellerMpesa", sellerMpesaSchema); 