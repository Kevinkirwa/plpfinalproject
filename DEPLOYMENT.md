# Deployment Guide

This guide will help you deploy your MERN stack application with the frontend on Vercel and the backend on Render.

## Backend Deployment (Render)

1. **Prepare Your Backend**
   
   First, ensure your backend code is ready for production:

   ```javascript
   // backend/server.js or backend/index.js
   require('dotenv').config();
   const express = require('express');
   const cors = require('cors');
   const app = express();

   // Update CORS to allow requests from your frontend domain
   app.use(cors({
     origin: ['https://your-frontend-domain.vercel.app', 'http://localhost:3000'],
     credentials: true
   }));

   const PORT = process.env.PORT || 5000;
   app.listen(PORT, () => {
     console.log(`Server running on port ${PORT}`);
   });
   ```

2. **Create a Render Account**
   - Go to [render.com](https://render.com)
   - Sign up for a free account
   - Click on "New +" and select "Web Service"

3. **Configure Your Web Service**
   - Connect your GitHub repository
   - Choose the branch you want to deploy
   - Fill in the following settings:
     - Name: `your-app-backend`
     - Environment: `Node`
     - Build Command: `npm install`
     - Start Command: `npm start`
   - Add your environment variables:
     ```
     NODE_ENV=production
     MONGODB_URI=your_mongodb_uri
     JWT_SECRET=your_jwt_secret
     ```

4. **Deploy Your Backend**
   - Click "Create Web Service"
   - Render will automatically build and deploy your backend
   - Note down your backend URL (e.g., `https://your-app-backend.onrender.com`)

## Frontend Deployment (Vercel)

1. **Prepare Your Frontend**

   Update your frontend API configuration:

   ```javascript
   // frontend/src/server.js
   export const server = process.env.NODE_ENV === 'production' 
     ? 'https://your-app-backend.onrender.com'
     : 'http://localhost:8000';
   ```

2. **Create a Vercel Account**
   - Go to [vercel.com](https://vercel.com)
   - Sign up for a free account
   - Install Vercel CLI (optional):
     ```bash
     npm i -g vercel
     ```

3. **Configure Your Frontend**
   - Create a `vercel.json` in your frontend directory:
     ```json
     {
       "buildCommand": "npm run build",
       "outputDirectory": "build",
       "framework": "create-react-app",
       "routes": [
         { "handle": "filesystem" },
         { "src": "/[^.]+", "dest": "/" }
       ]
     }
     ```

4. **Deploy Your Frontend**
   
   Option 1: Using Vercel Dashboard
   - Import your GitHub repository
   - Configure the project:
     - Framework Preset: Create React App
     - Build Command: `npm run build`
     - Output Directory: `build`
     - Install Command: `npm install`
   - Add environment variables if needed
   - Deploy

   Option 2: Using Vercel CLI
   ```bash
   cd frontend
   vercel
   ```

## Post-Deployment Steps

1. **Update CORS Configuration**
   - Add your Vercel domain to your backend CORS configuration
   - Update any hardcoded URLs in your frontend code

2. **Test Your Application**
   - Test all features
   - Check API connections
   - Verify user authentication
   - Test payment integration
   - Check image uploads

3. **Monitor Your Application**
   - Use Render and Vercel dashboards to monitor performance
   - Check error logs
   - Monitor API response times

## Environment Variables

### Backend (Render)
```env
NODE_ENV=production
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
FRONTEND_URL=https://your-frontend-domain.vercel.app
```

### Frontend (Vercel)
```env
REACT_APP_API_URL=https://your-app-backend.onrender.com
REACT_APP_SOCKET_SERVER=wss://your-app-backend.onrender.com
```

## Common Issues and Solutions

1. **CORS Issues**
   - Ensure your backend CORS configuration includes your Vercel domain
   - Use credentials: true for authenticated requests
   - Add necessary headers to your requests

2. **Environment Variables**
   - Double-check all environment variables are set correctly
   - Ensure sensitive data is not exposed in the frontend code
   - Use appropriate naming conventions (REACT_APP_ prefix for CRA)

3. **Build Issues**
   - Clear cache and node_modules if needed
   - Ensure all dependencies are properly listed in package.json
   - Check build logs for specific errors

4. **API Connection Issues**
   - Verify API URLs are correct
   - Check network requests in browser dev tools
   - Ensure proper error handling is in place

## Maintenance

1. **Regular Updates**
   - Keep dependencies updated
   - Monitor security advisories
   - Update SSL certificates if needed

2. **Backup**
   - Regularly backup your database
   - Keep configuration files backed up
   - Document any custom settings

3. **Monitoring**
   - Set up uptime monitoring
   - Monitor error rates
   - Track performance metrics

## Additional Resources

- [Render Documentation](https://render.com/docs)
- [Vercel Documentation](https://vercel.com/docs)
- [MongoDB Atlas Documentation](https://docs.atlas.mongodb.com/) 