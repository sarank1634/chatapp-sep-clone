
const getUserDetailsfromToken = require("../helpers/getUserDetailsfromToken");

async function userDetails(req, res) {
  try {
    const token = req.cookies.token || "";

    const result = await getUserDetailsfromToken(token);

    // If helper signals logout, propagate to client with 401
    if (result?.logout) {
      return res.status(401).json({
        message: result.message,
        logout: true,
        success: false,
      });
    }

    // Otherwise send the user payload
    return res.json({
      data: result,
      success: true,
    });
  } catch (error) {
    console.error("[userDetails]", error);
    return res.status(500).json({
      message: "Internal server error",
      error: true,
      success: false,
    });
  }
}

module.exports = userDetails;
