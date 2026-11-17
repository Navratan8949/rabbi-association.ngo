const express = require("express");
const { createAppointmentLetter, getAllAppointmentLetters, getMyAppointmentLetters, regenerateAppointmentLetter } = require("../controllers/appointment.controller");
const isAuthenticated = require("../middleware/auth");
const authorizeRoles = require("../middleware/role");

const router = express.Router();

router.get("/me", isAuthenticated, getMyAppointmentLetters);

// Admin / Manager routes
router.get("/", isAuthenticated, authorizeRoles(["admin"]), getAllAppointmentLetters);
router.post("/", isAuthenticated, authorizeRoles(["admin"]), createAppointmentLetter);
router.post("/:id/regenerate", isAuthenticated, authorizeRoles(["admin"]), regenerateAppointmentLetter);
router.put("/:id", isAuthenticated, authorizeRoles(["admin"]), require("../controllers/appointment.controller").updateAppointmentLetter);
router.delete("/:id", isAuthenticated, authorizeRoles(["admin"]), require("../controllers/appointment.controller").deleteAppointmentLetter);

module.exports = router;
