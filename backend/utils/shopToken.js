// create token and saving that in cookies
const sendShopToken = (user, statusCode, res) => {
  try {
    const token = user.getJwtToken();

    if (!token) {
      throw new Error("Token generation failed");
    }

    // Options for cookies
    const options = {
      expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
      httpOnly: true,
      sameSite: "none",
      secure: true,
    };

    // Remove sensitive information from user object
    const sanitizedUser = {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      avatar: user.avatar,
      isVerified: user.isVerified,
      address: user.address,
      phoneNumber: user.phoneNumber,
      zipCode: user.zipCode,
      createdAt: user.createdAt
    };

    res.status(statusCode).cookie("seller_token", token, options).json({
      success: true,
      user: sanitizedUser,
      token,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error generating authentication token",
      error: error.message
    });
  }
};

module.exports = sendShopToken;
