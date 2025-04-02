


A modern, full-stack e-commerce application built with the MERN stack (MongoDB, Express.js, React, Node.js) featuring real-time updates, payment integration, and admin dashboard.

## 🌟 Features

### User Features
- User authentication and authorization
- Product browsing and searching
- Shopping cart functionality
- Order management
- Real-time order tracking
- Product reviews and ratings
- Wishlist functionality
- User profile management

### Admin Features
- Admin dashboard
- Product management (CRUD operations)
- Order management
- User management
- Analytics and reporting
- Category management
- Coupon management

### Additional Features
- Real-time notifications using Socket.io
- Image upload with Cloudinary
- Payment integration (M-Pesa)
- Responsive design
- Search functionality
- Filtering and sorting options
- Contact form
- About Us, Careers, Store Locations, and Blog pages

## 🛠️ Tech Stack

### Frontend
- React.js
- Redux Toolkit for state management
- Material-UI for components
- Socket.io-client for real-time features
- Axios for API calls
- React Router for navigation
- TailwindCSS for styling

### Backend
- Node.js with Express.js
- MongoDB with Mongoose
- JWT for authentication
- Socket.io for real-time features
- Cloudinary for image storage
- M-Pesa API integration
- OpenAI integration

## 📁 Project Structure

```
├── frontend/                 # React frontend application
│   ├── public/              # Static files
│   │   ├── components/      # Reusable components
│   │   ├── pages/          # Page components
│   │   ├── features/       # Redux slices
│   │   ├── services/       # API services
│   │   └── utils/          # Utility functions
│   └── package.json
│
├── backend/                 # Node.js backend application
│   ├── config/             # Configuration files
│   ├── controllers/        # Route controllers
│   ├── middleware/         # Custom middleware
│   ├── models/            # MongoDB models
│   ├── routes/            # API routes
│   ├── utils/             # Utility functions
│   └── server.js          # Main server file
│
├── socket/                 # Socket.io server
└── create-admin.js         # Admin user creation script
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v18.x or higher)
- MongoDB
- npm or yarn
- Cloudinary account
- M-Pesa API credentials

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd e-shop-tutorial
```

2. Install backend dependencies:
```bash
cd backend
npm install
```

3. Install frontend dependencies:
```bash
cd ../frontend
npm install
```

4. Create a `.env` file in the backend directory:
```env
PORT=5000
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
MPESA_CONSUMER_KEY=your_mpesa_consumer_key
MPESA_CONSUMER_SECRET=your_mpesa_consumer_secret
MPESA_PASSKEY=your_mpesa_passkey
MPESA_SHORTCODE=your_mpesa_shortcode
MPESA_CALLBACK_URL=your_callback_url
```

5. Create a `.env` file in the frontend directory:
```env
REACT_APP_API_URL=http://localhost:5000
```

### Running the Application

1. Start the backend server:
```bash
cd backend
npm run dev
```

2. Start the frontend development server:
```bash
cd frontend
npm start
```

3. Create an admin user:
```bash
node create-admin.js
```

## 📝 API Documentation

### Authentication Endpoints
- POST `/api/v2/auth/register` - Register a new user
- POST `/api/v2/auth/login` - Login user
- POST `/api/v2/auth/logout` - Logout user
- GET `/api/v2/auth/me` - Get current user profile

### Product Endpoints
- GET `/api/v2/products` - Get all products
- GET `/api/v2/products/:id` - Get single product
- POST `/api/v2/products` - Create product (Admin)
- PUT `/api/v2/products/:id` - Update product (Admin)
- DELETE `/api/v2/products/:id` - Delete product (Admin)

### Order Endpoints
- POST `/api/v2/orders` - Create order
- GET `/api/v2/orders` - Get user orders
- GET `/api/v2/orders/:id` - Get single order
- PUT `/api/v2/orders/:id` - Update order status (Admin)

### Payment Endpoints
- POST `/api/v2/payment/initiate` - Initiate M-Pesa payment
- POST `/api/v2/payment/callback` - M-Pesa payment callback

## 🔒 Security Features
- JWT-based authentication
- Password hashing with bcrypt
- Protected routes
- Input validation
- XSS protection
- CORS configuration
- Rate limiting

## 📱 Responsive Design
The application is fully responsive and works on:
- Desktop browsers
- Tablets
- Mobile devices

## 🤝 Contributing
1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License
This project is licensed under the ISC License.

## 👥 Authors
- kevin kirwa - Initial work

## 🙏 Acknowledgments
- Material-UI for the component library
- MongoDB Atlas for the database
- Cloudinary for image storage
- M-Pesa for payment integration
