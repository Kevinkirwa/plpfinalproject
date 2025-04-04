const ErrorHandler = require("../utils/ErrorHandler");
const catchAsyncErrors = require("./catchAsyncErrors");
const jwt = require("jsonwebtoken");
const User = require("../model/user");
const Shop = require("../model/shop");

exports.isAuthenticated = catchAsyncErrors(async(req, res, next) => {
    try {
        const { token } = req.cookies;

        if (!token) {
            return next(new ErrorHandler("Please login to continue", 401));
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (!decoded) {
            return next(new ErrorHandler("Invalid authentication token", 401));
        }

        const user = await User.findById(decoded.id);
        if (!user) {
            return next(new ErrorHandler("User not found", 401));
        }

        req.user = user;
        next();
    } catch (error) {
        return next(new ErrorHandler("Authentication failed", 401));
    }
});

exports.isSeller = catchAsyncErrors(async(req, res, next) => {
    try {
        const { seller_token } = req.cookies;
        
        if (!seller_token) {
            return next(new ErrorHandler("Please login to continue", 401));
        }

        const decoded = jwt.verify(seller_token, process.env.JWT_SECRET);
        if (!decoded) {
            return next(new ErrorHandler("Invalid seller token", 401));
        }

        const seller = await Shop.findById(decoded.id);
        if (!seller) {
            return next(new ErrorHandler("Seller not found", 401));
        }

        if (!seller.isVerified) {
            return next(new ErrorHandler("Please verify your email first", 403));
        }

        req.seller = seller;
        next();
    } catch (error) {
        return next(new ErrorHandler("Seller authentication failed", 401));
    }
});

exports.isAdmin = (...roles) => {
    return (req, res, next) => {
        if (!req.user) {
            return next(new ErrorHandler("Please login to access this resource", 401));
        }
        
        if (!roles.includes(req.user.role)) {
            return next(new ErrorHandler(`${req.user.role} is not authorized to access this resource`, 403));
        }
        
        next();
    }
}