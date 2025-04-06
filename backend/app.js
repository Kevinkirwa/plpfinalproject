const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const path = require("path");
const errorMiddleware = require("./middleware/error");
const cloudinary = require("cloudinary").v2;

// config
if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config();
}

// Cloudinary config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Log environment variables (without sensitive data)
console.log('Environment:', {
  NODE_ENV: process.env.NODE_ENV,
  PORT: process.env.PORT,
  MONGODB_URL: process.env.MONGODB_URL ? "Set" : "Not set",
  CLOUDINARY_NAME: process.env.CLOUDINARY_NAME ? "Set" : "Not set",
  CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY ? "Set" : "Not set",
  CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET ? "Set" : "Not set",
  hasMpesaKey: !!process.env.MPESA_CONSUMER_KEY,
  hasMpesaSecret: !!process.env.MPESA_CONSUMER_SECRET,
  hasMpesaPasskey: !!process.env.MPESA_PASSKEY,
  hasMpesaShortcode: !!process.env.MPESA_SHORTCODE,
  hasMpesaCallback: !!process.env.MPESA_CALLBACK_URL
});

app.use(express.json({ limit: "50mb" }));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));

// Serve static files from uploads directory
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// CORS configuration
const isProduction = process.env.NODE_ENV === 'production';
console.log('Environment Check:', {
  NODE_ENV: process.env.NODE_ENV,
  isProduction: isProduction
});

app.use((req, res, next) => {
  const origin = req.headers.origin;
  console.log('CORS Debug - Request Origin:', origin);
  console.log('CORS Debug - Request Method:', req.method);
  
  // Set CORS headers
  if (isProduction) {
    // In production, only allow specific origins
    const allowedOrigins = [
      'https://plpfinalproject.vercel.app',
      'https://plpfinalproject-git-main-kirwas-projects.vercel.app'
    ];
    
    if (allowedOrigins.includes(origin)) {
      res.header('Access-Control-Allow-Origin', origin);
    }
  } else {
    // In development, allow any origin
    res.header('Access-Control-Allow-Origin', origin || '*');
  }
  
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With, Accept');
  
  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    console.log('CORS Debug - Handling OPTIONS request');
    return res.sendStatus(200);
  }
  
  next();
});

// Log environment
console.log('Environment:', process.env.NODE_ENV);
console.log('CORS Configuration - Debug Mode Enabled');

// import routes
const user = require("./controller/user");
const shop = require("./controller/shop");
const product = require("./controller/product");
const event = require("./controller/event");
const coupon = require("./controller/coupounCode");
const payment = require("./controller/payment");
const mpesa = require("./controller/mpesa");
const order = require("./controller/order");
const conversation = require("./controller/conversation");
const message = require("./controller/message");
const withdraw = require("./controller/withdraw");
const contactRoute = require("./routes/contactRoute");

// Mount routes
app.use("/api/v2/user", user);
app.use("/api/v2/conversation", conversation);
app.use("/api/v2/message", message);
app.use("/api/v2/order", order);
app.use("/api/v2/shop", shop);
app.use("/api/v2/product", product);
app.use("/api/v2/event", event);
app.use("/api/v2/coupon", coupon);
app.use("/api/v2/payment", payment);
app.use("/api/v2/mpesa", mpesa);
app.use("/api/v2/withdraw", withdraw);
app.use("/api/v2/contact", contactRoute);

// Add request logging middleware
app.use((req, res, next) => {
  console.log('Incoming request:', {
    method: req.method,
    path: req.path,
    query: req.query,
    headers: req.headers
  });
  next();
});

// Add route debugging middleware
app.use((req, res, next) => {
  console.log('Available routes:', {
    user: '/api/v2/user',
    conversation: '/api/v2/conversation',
    message: '/api/v2/message',
    order: '/api/v2/order',
    shop: '/api/v2/shop',
    product: '/api/v2/product',
    event: '/api/v2/event',
    coupon: '/api/v2/coupon',
    payment: '/api/v2/payment',
    mpesa: '/api/v2/mpesa',
    withdraw: '/api/v2/withdraw',
    contact: '/api/v2/contact'
  });
  next();
});

// it's for ErrorHandling
app.use(errorMiddleware);

module.exports = app;
