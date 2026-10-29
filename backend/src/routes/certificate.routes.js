const express = require("express");
const router = express.Router();
const isAuthenticated = require("../middleware/auth");
const authorizeRoles = require("../middleware/role");
const upload = require("../utils/multer");
const { createCertificate, getAllCertificates, getMyCertificates, updateCertificate, deleteCertificate } = require("../controllers/certificate.controller");

// Member routes
router.get("/me", isAuthenticated, getMyCertificates);

// Admin routes
router.get("/", isAuthenticated, authorizeRoles(["admin"]), getAllCertificates);
router.post("/", isAuthenticated, authorizeRoles(["admin"]), upload.fields([{ name: "pdf", maxCount: 1 }, { name: "file", maxCount: 1 }]), createCertificate);
router.put("/:id", isAuthenticated, authorizeRoles(["admin"]), upload.fields([{ name: "pdf", maxCount: 1 }, { name: "file", maxCount: 1 }]), updateCertificate);
router.delete("/:id", isAuthenticated, authorizeRoles(["admin"]), deleteCertificate);

module.exports = router;
