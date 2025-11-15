export const rbacMiddleware = (requiredRole) => {
  return (req, res, next) => {
    try {
      if (!req.user || !req.user.role) {
        return res.status(403).json({ success: false, message: "Role not assigned" });
      }

      if (req.user.role !== requiredRole) {
        return res.status(403).json({ success: false, message: "Access denied" });
      }

      next();
    } catch (error) {
      return res.status(500).json({ success: false, message: "RBAC error", error: error.message });
    }
  };
};
