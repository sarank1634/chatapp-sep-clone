const jwt = require("jsonwebtoken");
const UserModel = require("../models/UserModel");

/**
 * Extracts the current user from the JWT stored in a cookie.
 *
 * @param {string} token - JWT string from the client cookie.
 * @returns {Promise<Object>} - Either the user object (without password) or an object signalling logout.
 */
const getUserDetailsfromToken = async (token) => {
  if (!token) {
    return {
      message: "Session not found",
      logout: true,
    };
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await UserModel.findById(decoded.id).select("-password");

    if (!user) {
      return {
        message: "User not found",
        logout: true,
      };
    }

    return user;
  } catch (err) {
    return {
      message: "Invalid or expired session",
      logout: true,
    };
  }
};

module.exports = getUserDetailsfromToken;
