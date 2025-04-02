const mongoose = require("mongoose");

const couponSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter your coupon code name!"],
    unique: true,
  },
  value: {
    type: Number,
    required: true,
  },
  minAmount: {
    type: Number,
    required: true,
  },
  maxAmount: {
    type: Number,
    required: true,
  },
  shopId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Shop",
    required: true,
  },
  selectedProduct: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  expiryDate: {
    type: Date,
    required: true,
  },
  usageLimit: {
    type: Number,
    required: true,
  },
  usedCount: {
    type: Number,
    default: 0,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    enum: ["percentage", "fixed", "free_shipping"],
    required: true,
  },
  applicableCategories: [{
    type: String,
  }],
  excludedProducts: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
  }],
  minimumOrderValue: {
    type: Number,
    required: true,
  },
  maximumDiscount: {
    type: Number,
    required: true,
  },
  isFirstOrderOnly: {
    type: Boolean,
    default: false,
  },
  isUserSpecific: {
    type: Boolean,
    default: false,
  },
  allowedUsers: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  }],
});

// Add index for faster queries
couponSchema.index({ name: 1, shopId: 1 });

// Add method to check if coupon is valid
couponSchema.methods.isValid = function() {
  const now = new Date();
  return (
    this.isActive &&
    this.usedCount < this.usageLimit &&
    now <= this.expiryDate
  );
};

// Add method to apply coupon
couponSchema.methods.applyCoupon = function(orderAmount, userId) {
  if (!this.isValid()) {
    return {
      valid: false,
      message: "Coupon is not valid",
      discount: 0
    };
  }

  // Check minimum order value
  if (orderAmount < this.minimumOrderValue) {
    return {
      valid: false,
      message: `Minimum order value of KES ${this.minimumOrderValue} required`,
      discount: 0
    };
  }

  // Check if user is allowed (for user-specific coupons)
  if (this.isUserSpecific && !this.allowedUsers.includes(userId)) {
    return {
      valid: false,
      message: "This coupon is not valid for your account",
      discount: 0
    };
  }

  let discount = 0;
  switch (this.category) {
    case "percentage":
      discount = (orderAmount * this.value) / 100;
      // Apply maximum discount limit
      discount = Math.min(discount, this.maxAmount);
      break;
    case "fixed":
      discount = this.value;
      break;
    case "free_shipping":
      discount = orderAmount * 0.1; // Assuming shipping is 10% of order value
      break;
  }

  return {
    valid: true,
    message: "Coupon applied successfully",
    discount: discount
  };
};

module.exports = mongoose.model("Coupon", couponSchema); 