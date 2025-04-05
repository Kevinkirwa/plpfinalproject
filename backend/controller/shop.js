const express = require("express");
const path = require("path");
const router = express.Router();
const jwt = require("jsonwebtoken");
const sendMail = require("../utils/sendMail");
const Shop = require("../model/shop");
const { isAuthenticated, isSeller, isAdmin } = require("../middleware/auth");
const cloudinary = require("cloudinary");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ErrorHandler = require("../utils/ErrorHandler");
const sendShopToken = require("../utils/shopToken");
const User = require("../model/user");

// create shop
router.post("/create-shop", async (req, res, next) => {
  try {
    const { name, email, password, address, phoneNumber, zipCode } = req.body;
    const sellerEmail = await User.findOne({ email });

    if (sellerEmail) {
      return next(new ErrorHandler("User already exists", 400));
    }

    // Generate verification token
    const verificationToken = jwt.sign(
      { email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    const seller = {
      name: name,
      email: email,
      password: password,
      phoneNumber: phoneNumber,
      address: address,
      zipCode: zipCode,
      role: "Seller",
      verificationToken: verificationToken,
      isVerified: false
    };

    // Save seller with verification token
    const newSeller = await User.create(seller);

    // Send verification link via email
    const verificationLink = `${process.env.FRONTEND_URL}/verify-shop?token=${verificationToken}`;
    try {
      await sendMail({
        email: seller.email,
        subject: "Verify your shop account",
        html: `
          <h2>Welcome to our platform!</h2>
          <p>Please click the link below to verify your shop account:</p>
          <a href="${verificationLink}" style="display: inline-block; padding: 10px 20px; background-color: #4CAF50; color: white; text-decoration: none; border-radius: 5px;">Verify Shop</a>
          <p>This link will expire in 1 hour.</p>
          <p>If you did not create a shop account, please ignore this email.</p>
        `
      });
    } catch (error) {
      console.error("Error sending email:", error);
      return next(new ErrorHandler("Error sending verification email", 500));
    }

    res.status(201).json({
      success: true,
      message: "Please check your email to verify your shop account",
      seller: {
        name: newSeller.name,
        email: newSeller.email,
        isVerified: newSeller.isVerified
      }
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
});

// verify shop via link
router.get(
  "/verify-shop",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { token } = req.query;

      if (!token) {
        return next(new ErrorHandler("Invalid verification link", 400));
      }

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const seller = await User.findOne({ email: decoded.email });

      if (!seller) {
        return next(new ErrorHandler("Seller not found", 400));
      }

      if (seller.isVerified) {
        return next(new ErrorHandler("Shop already verified", 400));
      }

      // Update seller verification status
      seller.isVerified = true;
      seller.verificationToken = undefined;
      await seller.save();

      // Redirect to frontend with success message
      res.redirect(`${process.env.FRONTEND_URL}/login?verified=true`);
    } catch (error) {
      if (error.name === "TokenExpiredError") {
        return next(new ErrorHandler("Verification link has expired", 400));
      }
      return next(new ErrorHandler("Invalid verification link", 400));
    }
  })
);

// resend OTP
router.post(
  "/resend-otp",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { sellerId } = req.body;

      const seller = await Shop.findById(sellerId);

      if (!seller) {
        return next(new ErrorHandler("Seller not found", 400));
      }

      if (seller.isVerified) {
        return next(new ErrorHandler("Seller already verified", 400));
      }

      // Generate new OTP
      const otp = Math.floor(100000 + Math.random() * 900000);
      const otpExpiry = Date.now() + 10 * 60 * 1000; // 10 minutes

      seller.otp = otp;
      seller.otpExpiry = otpExpiry;
      await seller.save();

      // Send new OTP via email
      await sendMail({
        email: seller.email,
        subject: "Verify your Shop",
        message: `Hello ${seller.name}, your new verification code is: ${otp}. This code will expire in 10 minutes.`,
      });

      res.status(200).json({
        success: true,
        message: "New verification code sent to your email!",
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// login shop
router.post(
  "/login-shop",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return next(new ErrorHandler("Please provide the all fields!", 400));
      }

      const user = await Shop.findOne({ email }).select("+password");

      if (!user) {
        return next(new ErrorHandler("User doesn't exists!", 400));
      }

      if (!user.isVerified) {
        return next(new ErrorHandler("Please verify your email first!", 400));
      }

      const isPasswordValid = await user.comparePassword(password);

      if (!isPasswordValid) {
        return next(
          new ErrorHandler("Please provide the correct information", 400)
        );
      }

      sendShopToken(user, 201, res);
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// load shop
router.get(
  "/getSeller",
  isSeller,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const seller = await Shop.findById(req.seller._id);

      if (!seller) {
        return next(new ErrorHandler("User doesn't exists", 400));
      }

      res.status(200).json({
        success: true,
        seller,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// log out from shop
router.get(
  "/logout",
  catchAsyncErrors(async (req, res, next) => {
    try {
      res.cookie("seller_token", null, {
        expires: new Date(Date.now()),
        httpOnly: true,
        sameSite: "none",
        secure: true,
      });
      res.status(201).json({
        success: true,
        message: "Log out successful!",
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// get shop info
router.get(
  "/get-shop-info/:id",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const shop = await Shop.findById(req.params.id);
      res.status(201).json({
        success: true,
        shop,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// update shop profile picture
router.put(
  "/update-shop-avatar",
  isSeller,
  catchAsyncErrors(async (req, res, next) => {
    try {
      let existsSeller = await Shop.findById(req.seller._id);

        const imageId = existsSeller.avatar.public_id;

        await cloudinary.v2.uploader.destroy(imageId);

        const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
          folder: "avatars",
          width: 150,
        });

        existsSeller.avatar = {
          public_id: myCloud.public_id,
          url: myCloud.secure_url,
        };

  
      await existsSeller.save();

      res.status(200).json({
        success: true,
        seller:existsSeller,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// update seller info
router.put(
  "/update-seller-info",
  isSeller,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { name, description, address, phoneNumber, zipCode } = req.body;

      const shop = await Shop.findOne(req.seller._id);

      if (!shop) {
        return next(new ErrorHandler("User not found", 400));
      }

      shop.name = name;
      shop.description = description;
      shop.address = address;
      shop.phoneNumber = phoneNumber;
      shop.zipCode = zipCode;

      await shop.save();

      res.status(201).json({
        success: true,
        shop,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// all sellers --- for admin
router.get(
  "/admin-all-sellers",
  isAuthenticated,
  isAdmin("Admin"),
  catchAsyncErrors(async (req, res, next) => {
    try {
      const sellers = await Shop.find().sort({
        createdAt: -1,
      });
      res.status(201).json({
        success: true,
        sellers,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// delete seller ---admin
router.delete(
  "/delete-seller/:id",
  isAuthenticated,
  isAdmin("Admin"),
  catchAsyncErrors(async (req, res, next) => {
    try {
      const seller = await Shop.findById(req.params.id);

      if (!seller) {
        return next(
          new ErrorHandler("Seller is not available with this id", 400)
        );
      }

      await Shop.findByIdAndDelete(req.params.id);

      res.status(201).json({
        success: true,
        message: "Seller deleted successfully!",
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// update seller withdraw methods --- sellers
router.put(
  "/update-payment-methods",
  isSeller,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { withdrawMethod } = req.body;

      const seller = await Shop.findByIdAndUpdate(req.seller._id, {
        withdrawMethod,
      });

      res.status(201).json({
        success: true,
        seller,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// delete seller withdraw merthods --- only seller
router.delete(
  "/delete-withdraw-method/",
  isSeller,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const seller = await Shop.findById(req.seller._id);

      if (!seller) {
        return next(new ErrorHandler("Seller not found with this id", 400));
      }

      seller.withdrawMethod = null;

      await seller.save();

      res.status(201).json({
        success: true,
        seller,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// verify KYC
router.post(
  "/verify-kyc",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { sellerId, documents } = req.body;

      const seller = await Shop.findById(sellerId);

      if (!seller) {
        return next(new ErrorHandler("Seller not found", 400));
      }

      if (!seller.isVerified) {
        return next(new ErrorHandler("Please verify your email first", 400));
      }

      // Upload documents to Cloudinary
      const uploadedDocs = {};
      for (const [key, value] of Object.entries(documents)) {
        const result = await cloudinary.v2.uploader.upload(value, {
          folder: `sellers/${sellerId}/kyc`,
        });
        uploadedDocs[key] = {
          public_id: result.public_id,
          url: result.secure_url,
        };
      }

      // Update seller with KYC documents
      seller.kycDocuments = uploadedDocs;
      seller.kycStatus = "pending";
      await seller.save();

      // Send email notification to admin
      await sendMail({
        email: process.env.ADMIN_EMAIL,
        subject: "New KYC Verification Request",
        message: `A new KYC verification request has been submitted by ${seller.name} (${seller.email}). Please review the documents in the admin dashboard.`,
      });

      res.status(200).json({
        success: true,
        message: "KYC documents submitted successfully. Pending admin review.",
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// get pending KYC verifications -- admin
router.get(
  "/admin/pending-kyc",
  isAuthenticated,
  isAdmin("Admin"),
  catchAsyncErrors(async (req, res, next) => {
    try {
      const sellers = await Shop.find({ kycStatus: "pending" }).select(
        "name email address phoneNumber kycDocuments createdAt"
      );

      res.status(200).json({
        success: true,
        sellers,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// review KYC verification -- admin
router.post(
  "/admin/review-kyc",
  isAuthenticated,
  isAdmin("Admin"),
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { sellerId, status, reason } = req.body;

      const seller = await Shop.findById(sellerId);
      if (!seller) {
        return next(new ErrorHandler("Seller not found", 400));
      }

      seller.kycStatus = status;
      if (status === "approved") {
        seller.kycApprovedAt = Date.now();
        seller.kycRejectionReason = undefined;
      } else if (status === "rejected") {
        seller.kycRejectionReason = reason;
        seller.kycApprovedAt = undefined;
      }

      await seller.save();

      // Send email notification to seller
      const emailSubject = status === "approved" 
        ? "KYC Verification Approved" 
        : "KYC Verification Rejected";
      
      const emailMessage = status === "approved"
        ? `Congratulations! Your KYC verification has been approved. You can now start selling on our platform.`
        : `Your KYC verification has been rejected. Reason: ${reason}. Please submit new documents with the required corrections.`;

      await sendMail({
        email: seller.email,
        subject: emailSubject,
        message: emailMessage,
      });

      res.status(200).json({
        success: true,
        message: `KYC verification ${status} successfully`,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

module.exports = router;
