const express = require("express");
const { getAllUsers, updateUser, deleteUser } = require("../controllers/user.controller");
const isAuthenticated = require("../middleware/auth");
const authorizeRoles = require("../middleware/role");

const router = express.Router();

// Allow admins to view public web users
router.get("/public", isAuthenticated, authorizeRoles(["admin"]), getAllUsers);
router.put("/public/:id", isAuthenticated, authorizeRoles(["admin"]), updateUser);
router.delete("/public/:id", isAuthenticated, authorizeRoles(["admin"]), deleteUser);

module.exports = router;
