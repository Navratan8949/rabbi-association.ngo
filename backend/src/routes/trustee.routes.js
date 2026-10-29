const express = require("express");
const router = express.Router();
const isAuthenticated = require("../middleware/auth");
const authorizeRoles = require("../middleware/role");
const upload = require("../utils/multer");
const {
    getAllTrustees,
    getTrusteeById,
    createTrustee,
    updateTrustee,
    deleteTrustee,
} = require("../controllers/trustee.controller");

// Optional auth so admins see all records if logged in, public sees active
router.get("/", (req, res, next) => {
    // Check if token exists in header/cookie without blocking
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith("Bearer")) {
        return isAuthenticated(req, res, next);
    }
    next();
}, getAllTrustees);

router.get("/:id", getTrusteeById);

// Admin only routes
router.post("/", isAuthenticated, authorizeRoles(["admin"]), upload.single("photo"), createTrustee);
router.put("/:id", isAuthenticated, authorizeRoles(["admin"]), upload.single("photo"), updateTrustee);
router.delete("/:id", isAuthenticated, authorizeRoles(["admin"]), deleteTrustee);

module.exports = router;

