# PLP Final Project - E-commerce Platform

A full-stack e-commerce platform built with the MERN stack (MongoDB, Express.js, React.js, Node.js).

## Project Structure

```
plpfinalproject/
├── backend/           # Node.js/Express backend
├── frontend/         # React.js frontend
├── package.json      # Root package.json for project management
├── render.yaml       # Render deployment configuration
└── README.md         # Project documentation
```

## Features

- User Authentication (Login/Register)
- Product Management
- Shopping Cart
- Order Processing
- Admin Dashboard
- Vendor Management
- Real-time Chat
- Payment Integration
- Responsive Design

## Tech Stack

- **Frontend:**
  - React.js
  - Redux for state management
  - Tailwind CSS for styling
  - Socket.io-client for real-time features

- **Backend:**
  - Node.js & Express.js
  - MongoDB with Mongoose
  - JWT for authentication
  - Socket.io for real-time communication

## Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/Kevinkirwa/plpfinalproject.git
   cd plpfinalproject
   ```

2. Install dependencies:
   ```bash
   npm run install-all
   ```

3. Set up environment variables:
   
   Backend (.env):
   ```
   PORT=8000
   DB_URL=your_mongodb_url
   JWT_SECRET_KEY=your_jwt_secret
   # Add other required variables
   ```

   Frontend (.env):
   ```
   REACT_APP_API_URL=http://localhost:8000
   REACT_APP_SOCKET_SERVER=ws://localhost:8000
   ```

4. Run the development servers:
   ```bash
   npm run dev
   ```

## Deployment

The project is configured for deployment with:
- Backend: Render.com
- Frontend: Vercel

### Backend Deployment (Render)
- Connect your GitHub repository
- Use the following settings:
  - Root Directory: backend
  - Build Command: npm install
  - Start Command: npm start

### Frontend Deployment (Vercel)
- Connect your GitHub repository
- Use the following settings:
  - Root Directory: frontend
  - Framework Preset: Create React App
  - Build Command: npm run build
  - Output Directory: build

## Environment Variables

### Backend
```env
NODE_ENV=production
PORT=8000
DB_URL=mongodb_url
JWT_SECRET_KEY=jwt_secret
JWT_EXPIRES=7d
ACTIVATION_SECRET=activation_secret
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_PASSWORD=smtp_password
SMTP_MAIL=smtp_email
STRIPE_API_KEY=stripe_api_key
STRIPE_SECRET_KEY=stripe_secret_key
CLOUDINARY_NAME=cloudinary_name
CLOUDINARY_API_KEY=cloudinary_api_key
CLOUDINARY_API_SECRET=cloudinary_api_secret
FRONTEND_URL=frontend_url
```

### Frontend
```env
REACT_APP_API_URL=backend_url
REACT_APP_SOCKET_SERVER=socket_server_url
```

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Open a pull request

## License

This project is licensed under the ISC License.

## Author

Kevin Kirwa
