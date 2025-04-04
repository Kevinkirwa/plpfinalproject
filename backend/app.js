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
const allowedOrigins = process.env.NODE_ENV === 'production'
  ? [
      'https://plpfinalproject-git-main-kirwas-projects.vercel.app',
      'https://plpfinalproject.vercel.app'
    ]
  : ['http://localhost:3000'];

console.log('Environment:', process.env.NODE_ENV);
console.log('Allowed Origins:', allowedOrigins);

app.use(
  cors({
    origin: function(origin, callback) {
      // allow requests with no origin (like mobile apps or curl requests)
      if (!origin) return callback(null, true);
      
      if (allowedOrigins.indexOf(origin) === -1) {
        const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
        console.log('Blocked Origin:', origin);
        return callback(new Error(msg), false);
      }
      
      console.log('Allowed Origin:', origin);
      return callback(null, true);
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "X-Requested-With",
      "Accept",
      "Origin",
      "Access-Control-Allow-Credentials"
    ],
    exposedHeaders: ["set-cookie"]
  })
);

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

// it's for ErrorHandling
app.use(errorMiddleware);

module.exports = app;
