const express = require("express");
const { createBeneficiary, getAllBeneficiaries, getBeneficiary, updateBeneficiary, deleteBeneficiary } = require("../controllers/beneficiary.controller");
const isAuthenticated = require("../middleware/auth");
const authorizeRoles = require("../middleware/role");
const upload = require("../utils/multer");
const router = express.Router();

router.use(isAuthenticated);
router.use(authorizeRoles(["admin"]));

router.route("/")
    .post(upload.single("image"), createBeneficiary)
    .get(getAllBeneficiaries);

router.route("/:id")
    .get(getBeneficiary)
    .put(upload.single("image"), updateBeneficiary)
    .delete(deleteBeneficiary);

module.exports = router;
