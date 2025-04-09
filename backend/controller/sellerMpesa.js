const SellerMpesa = require("../models/sellerMpesa");
const { encryptData, decryptData } = require("../utils/encryption");
const ErrorHandler = require("../utils/ErrorHandler");

// Add M-Pesa credentials for a seller
exports.addMpesaCredentials = async (req, res, next) => {
  try {
    const { sellerId, consumerKey, consumerSecret, passKey, shortCode } = req.body;

    // Check if seller already has M-Pesa credentials
    const existingCredentials = await SellerMpesa.findOne({ sellerId });
    if (existingCredentials) {
      return next(new ErrorHandler("Seller already has M-Pesa credentials", 400));
    }

    // Encrypt sensitive data
    const encryptedCredentials = {
      sellerId,
      consumerKey: encryptData(consumerKey),
      consumerSecret: encryptData(consumerSecret),
      passKey: encryptData(passKey),
      shortCode
    };

    const mpesaCredentials = await SellerMpesa.create(encryptedCredentials);

    res.status(201).json({
      success: true,
      message: "M-Pesa credentials added successfully",
      data: {
        id: mpesaCredentials._id,
        sellerId: mpesaCredentials.sellerId,
        shortCode: mpesaCredentials.shortCode,
        isActive: mpesaCredentials.isActive
      }
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
};

// Update M-Pesa credentials for a seller
exports.updateMpesaCredentials = async (req, res, next) => {
  try {
    const { sellerId } = req.params;
    const { consumerKey, consumerSecret, passKey, shortCode, isActive } = req.body;

    const mpesaCredentials = await SellerMpesa.findOne({ sellerId });
    if (!mpesaCredentials) {
      return next(new ErrorHandler("M-Pesa credentials not found", 404));
    }

    // Encrypt sensitive data if provided
    const updateData = {};
    if (consumerKey) updateData.consumerKey = encryptData(consumerKey);
    if (consumerSecret) updateData.consumerSecret = encryptData(consumerSecret);
    if (passKey) updateData.passKey = encryptData(passKey);
    if (shortCode) updateData.shortCode = shortCode;
    if (typeof isActive === 'boolean') updateData.isActive = isActive;

    const updatedCredentials = await SellerMpesa.findOneAndUpdate(
      { sellerId },
      updateData,
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "M-Pesa credentials updated successfully",
      data: {
        id: updatedCredentials._id,
        sellerId: updatedCredentials.sellerId,
        shortCode: updatedCredentials.shortCode,
        isActive: updatedCredentials.isActive
      }
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
};

// Get M-Pesa credentials for a seller
exports.getMpesaCredentials = async (req, res, next) => {
  try {
    const { sellerId } = req.params;

    const mpesaCredentials = await SellerMpesa.findOne({ sellerId });
    if (!mpesaCredentials) {
      return next(new ErrorHandler("M-Pesa credentials not found", 404));
    }

    // Decrypt sensitive data
    const decryptedCredentials = {
      id: mpesaCredentials._id,
      sellerId: mpesaCredentials.sellerId,
      consumerKey: decryptData(mpesaCredentials.consumerKey),
      consumerSecret: decryptData(mpesaCredentials.consumerSecret),
      passKey: decryptData(mpesaCredentials.passKey),
      shortCode: mpesaCredentials.shortCode,
      isActive: mpesaCredentials.isActive
    };

    res.status(200).json({
      success: true,
      data: decryptedCredentials
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
};

// Delete M-Pesa credentials for a seller
exports.deleteMpesaCredentials = async (req, res, next) => {
  try {
    const { sellerId } = req.params;

    const mpesaCredentials = await SellerMpesa.findOneAndDelete({ sellerId });
    if (!mpesaCredentials) {
      return next(new ErrorHandler("M-Pesa credentials not found", 404));
    }

    res.status(200).json({
      success: true,
      message: "M-Pesa credentials deleted successfully"
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
}; 