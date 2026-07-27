const jwt = require("jsonwebtoken");

const identifyUser = async (req, res, next) => {
  console.log("Middleware Hit");

  const jwt_token = req.cookies.jwt_token;

  console.log("Token:", jwt_token);

  if (!jwt_token) {
    return res.status(401).json({
      message: "Access denied, token not provided",
    });
  }

  let verify_jwt_token = null;

  try {
    verify_jwt_token = await jwt.verify(jwt_token, process.env.JWT_SECRET);
    console.log("Decoded:", verify_jwt_token);
  } catch (error) {
    return res.status(401).json({
      message: "User not authorized, Invalid token",
      error: error.message,
    });
  }

  req.user = verify_jwt_token;
  next();
};

module.exports = identifyUser;
