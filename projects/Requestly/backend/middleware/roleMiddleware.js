// middleware/roleMiddleware.js
function authorizeRoles(...allowedRoles) {
  return (req, res, next) => {
    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ message: "Access denied: Unauthorized role" });
    }
    next();
  };
}
module.exports = authorizeRoles;
