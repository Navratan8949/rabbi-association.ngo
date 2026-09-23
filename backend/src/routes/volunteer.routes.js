const express = require("express");
const { 
    publicApplyVolunteer,
    applyVolunteer, 
    getAllVolunteers, 
    approveVolunteer, 
    rejectVolunteer, 
    deleteVolunteer, 
    createVolunteerDirectly,
    getMyProfile,
    updateVolunteerProfile
} = require("../controllers/volunteer.controller");
const isAuthenticated = require("../middleware/auth");
const authorizeRoles = require("../middleware/role");
const upload = require("../utils/multer");
const router = express.Router();

// Public route for volunteers to apply directly with signup
router.post("/public-apply", upload.fields([
    { name: "profileImage", maxCount: 1 },
    { name: "idProof", maxCount: 1 }
]), publicApplyVolunteer);

router.post("/apply", isAuthenticated, upload.fields([
    { name: "profileImage", maxCount: 1 },
    { name: "idProof", maxCount: 1 }
]), applyVolunteer);

// Volunteer routes (Dashboard)
router.get("/me", isAuthenticated, authorizeRoles(["volunteer"]), getMyProfile);
router.put("/me", isAuthenticated, authorizeRoles(["volunteer"]), upload.single("profileImage"), updateVolunteerProfile);

// Admin routes
router.use(isAuthenticated);
router.use(authorizeRoles(["admin"]));

router.route("/")
    .get(getAllVolunteers)
    .post(createVolunteerDirectly);

router.put("/:id/approve", approveVolunteer);
router.put("/:id/reject", rejectVolunteer);
router.delete("/:id", deleteVolunteer);

module.exports = router;
