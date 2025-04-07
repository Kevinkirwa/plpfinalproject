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

app.use(express.json({ limit: "50mb" }));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));

// CORS configuration - MOVED TO TOP
const isProduction = process.env.NODE_ENV === 'production';
console.log('CORS Configuration:', {
  NODE_ENV: process.env.NODE_ENV,
  isProduction: isProduction
});

// Add CORS middleware before routes
app.use((req, res, next) => {
  const origin = req.headers.origin;
  console.log('CORS Debug:', {
    origin: origin,
    method: req.method,
    path: req.path
  });
  
  // Set CORS headers
  if (isProduction) {
    // In production, allow specific origins
    const allowedOrigins = [
      'https://plpfinalproject.vercel.app',
      'https://plpfinalproject-git-main-kirwas-projects.vercel.app',
      'http://localhost:3000'  // Add localhost for development
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
    console.log('Handling OPTIONS request');
    return res.sendStatus(200);
  }
  
  next();
});

// Serve static files from uploads directory
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

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
  console.log('Request received:', {
    method: req.method,
    path: req.path,
    query: req.query,
    headers: req.headers
  });
  next();
});

// Add catch-all route for unmatched routes
app.use((req, res) => {
  console.log('No route matched for:', req.method, req.path);
  res.status(404).json({
    success: false,
    message: `Cannot ${req.method} ${req.path}`
  });
});

// it's for ErrorHandling
app.use(errorMiddleware);

module.exports = app;
