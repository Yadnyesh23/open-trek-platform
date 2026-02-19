import jwt from "jsonwebtoken";
import ApiError from "../utils/ApiError.js";
import asyncHandler from "../utils/asyncHandler.js";

// Fix #5: Auth middleware now reads user data from the JWT payload instead of
// querying the database on every single protected request. This eliminates
// one DB round-trip per request for all authenticated endpoints.
// NOTE: If you need fresh DB data (e.g., checking if user is banned), 
// add an explicit DB call in the specific route that needs it.
const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    throw new ApiError(401, "Not authorized, token missing");
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  // Attach user info from JWT payload — no DB query needed
  req.user = {
    _id: decoded.id,
    role: decoded.role,
  };

  next();
});

export { protect };
