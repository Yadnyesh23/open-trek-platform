import jwt from "jsonwebtoken";
import ApiError from "../utils/ApiError.js";
import asyncHandler from "../utils/asyncHandler.js";


const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (req.headers.authorization?.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    throw new ApiError(401, "Not authorized, token missing");
  }

  try {
    // Verify using the secret from your Render env
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach user info — matching the 'id' key from the token generation
    req.user = {
      _id: decoded.id, 
      role: decoded.role,
    };

    next();
  } catch (error) {
    // This prevents the 500 crash shown in your stack trace
    console.error("JWT Error:", error.message);
    throw new ApiError(401, "Session expired or invalid token. Please login again.");
  }
});

export {protect}