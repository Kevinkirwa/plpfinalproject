const getCookieOptions = () => {
  const isProduction = process.env.NODE_ENV === "production";
  
  // Log the cookie domain for debugging
  console.log("Cookie configuration:", {
    isProduction,
    domain: process.env.COOKIE_DOMAIN,
    frontendUrl: process.env.FRONTEND_URL
  });
  
  return {
    expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000), // 90 days
    httpOnly: true,
    sameSite: isProduction ? "none" : "lax",
    secure: isProduction,
    domain: isProduction ? process.env.COOKIE_DOMAIN : undefined,
    path: "/"
  };
};

module.exports = getCookieOptions; 