const express = require("express");
const router = express.Router();
const isAuthenticated = require("../middleware/auth");
const authorizeRoles = require("../middleware/role");
const { subscribe, getAllSubscribers, deleteSubscriber, sendMassNewsletter } = require("../controllers/newsletter.controller");

// Public — subscribe
router.post("/subscribe", subscribe);

// Admin — view all subscribers
router.get("/", isAuthenticated, authorizeRoles(["admin"]), getAllSubscribers);
router.put("/:id", isAuthenticated, authorizeRoles(["admin"]), require("../controllers/newsletter.controller").updateSubscriber);
router.delete("/:id", isAuthenticated, authorizeRoles(["admin"]), deleteSubscriber);

// Admin — send mass email
router.post("/send", isAuthenticated, authorizeRoles(["admin"]), sendMassNewsletter);

module.exports = router;
