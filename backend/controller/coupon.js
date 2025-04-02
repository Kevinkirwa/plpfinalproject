const Coupon = require("../model/coupon");
const Shop = require("../model/shop");
const ErrorHandler = require("../utils/ErrorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");

// Create new coupon
exports.createCoupon = catchAsyncErrors(async (req, res, next) => {
  try {
    const isCouponCodeExists = await Coupon.find({ name: req.body.name });

    if (isCouponCodeExists.length !== 0) {
      return next(new ErrorHandler("Coupon code already exists!", 400));
    }

    const coupon = await Coupon.create(req.body);

    res.status(201).json({
      success: true,
      coupon,
    });
  } catch (error) {
    return next(new ErrorHandler(error, 400));
  }
});

// Get all coupons of a shop
exports.getAllCoupons = catchAsyncErrors(async (req, res, next) => {
  try {
    const coupons = await Coupon.find({ shopId: req.params.id });

    res.status(200).json({
      success: true,
      coupons,
    });
  } catch (error) {
    return next(new ErrorHandler(error, 400));
  }
});

// Delete coupon of a shop
exports.deleteCoupon = catchAsyncErrors(async (req, res, next) => {
  try {
    const coupon = await Coupon.findByIdAndDelete(req.params.id);

    if (!coupon) {
      return next(new ErrorHandler("Coupon code doesn't exist!", 404));
    }

    res.status(201).json({
      success: true,
      message: "Coupon deleted successfully!",
    });
  } catch (error) {
    return next(new ErrorHandler(error, 400));
  }
});

// Get coupon code value by its name
exports.getCouponByName = catchAsyncErrors(async (req, res, next) => {
  try {
    const coupon = await Coupon.findOne({ name: req.params.name });

    if (!coupon) {
      return next(new ErrorHandler("Coupon code doesn't exist!", 404));
    }

    // Get user from request
    const userId = req.user?._id;
    const orderAmount = req.query.orderAmount || 0;

    // Apply coupon and get result
    const result = coupon.applyCoupon(orderAmount, userId);

    if (!result.valid) {
      return next(new ErrorHandler(result.message, 400));
    }

    res.status(200).json({
      success: true,
      coupon: {
        ...coupon.toObject(),
        discount: result.discount,
        message: result.message
      }
    });
  } catch (error) {
    return next(new ErrorHandler(error, 400));
  }
});

// Update coupon
exports.updateCoupon = catchAsyncErrors(async (req, res, next) => {
  try {
    const coupon = await Coupon.findById(req.params.id);

    if (!coupon) {
      return next(new ErrorHandler("Coupon code doesn't exist!", 404));
    }

    // Check if new name is unique if name is being updated
    if (req.body.name && req.body.name !== coupon.name) {
      const existingCoupon = await Coupon.findOne({ name: req.body.name });
      if (existingCoupon) {
        return next(new ErrorHandler("Coupon code already exists!", 400));
      }
    }

    const updatedCoupon = await Coupon.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    res.status(200).json({
      success: true,
      coupon: updatedCoupon,
    });
  } catch (error) {
    return next(new ErrorHandler(error, 400));
  }
});

// Increment coupon usage count
exports.incrementCouponUsage = catchAsyncErrors(async (req, res, next) => {
  try {
    const coupon = await Coupon.findById(req.params.id);

    if (!coupon) {
      return next(new ErrorHandler("Coupon code doesn't exist!", 404));
    }

    coupon.usedCount += 1;

    // Deactivate coupon if usage limit reached
    if (coupon.usedCount >= coupon.usageLimit) {
      coupon.isActive = false;
    }

    await coupon.save();

    res.status(200).json({
      success: true,
      message: "Coupon usage updated successfully",
    });
  } catch (error) {
    return next(new ErrorHandler(error, 400));
  }
});

// Get all active coupons
exports.getActiveCoupons = catchAsyncErrors(async (req, res, next) => {
  try {
    const coupons = await Coupon.find({
      isActive: true,
      expiryDate: { $gt: new Date() },
      usedCount: { $lt: "$usageLimit" }
    });

    res.status(200).json({
      success: true,
      coupons,
    });
  } catch (error) {
    return next(new ErrorHandler(error, 400));
  }
}); 