# Vercel Environment Variables Setup

To fix the authentication issues in your Vercel deployment, you need to set up the following environment variables:

## Required Environment Variables

1. **COOKIE_DOMAIN**: Set this to your Vercel domain (e.g., `yourdomain.vercel.app`)
   - This ensures cookies are properly set for your domain

2. **REACT_APP_API_URL**: Set this to your backend API URL
   - If your backend is deployed on a service like Heroku, use that URL
   - Example: `https://your-backend-api.herokuapp.com`

## How to Set Environment Variables in Vercel

1. Go to your Vercel dashboard
2. Select your project
3. Go to "Settings" > "Environment Variables"
4. Add each variable with its value
5. Click "Save"
6. Redeploy your application

## Verifying the Setup

After setting up the environment variables and redeploying:

1. Open your browser's developer tools (F12)
2. Go to the "Console" tab
3. Check for the debug logs we added:
   - "Backend URL: ..."
   - "Loading user..."
   - "Loading seller..."
   - "Auth state in Header: ..."

4. Go to the "Application" tab > "Cookies"
   - Verify that cookies are being set correctly

## Troubleshooting

If you're still experiencing issues:

1. Check the browser console for any errors
2. Verify that your backend is properly configured to accept requests from your Vercel domain
3. Make sure your backend is setting the correct CORS headers
4. Check that the `COOKIE_DOMAIN` matches your Vercel domain exactly 