const Trustee = require("../models/Trustee");
const { uploadLocalFile, deleteLocalFile } = require("../utils/fileUpload");

// Get all trustees (active for public, all for admin)
exports.getAllTrustees = async (req, res) => {
    try {
        const query = {};
        // If query does not specify status and user is not admin, show only active
        if (!req.user || req.user.role !== "admin") {
            query.status = "active";
        }
        if (req.query.status) {
            query.status = req.query.status;
        }
        if (req.query.category) {
            query.category = req.query.category;
        }

        const trustees = await Trustee.find(query).sort("order createdAt");
        res.status(200).json({ success: true, count: trustees.length, trustees });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Get single trustee
exports.getTrusteeById = async (req, res) => {
    try {
        const trustee = await Trustee.findById(req.params.id);
        if (!trustee) return res.status(404).json({ success: false, message: "Record not found" });
        res.status(200).json({ success: true, trustee });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Admin — Create Trustee / Founder / Inspirational Person
exports.createTrustee = async (req, res) => {
    try {
        const { name, category, designation, description, email, phone, website, socialLinks, order, status } = req.body;

        let photo = { public_id: "", url: "" };
        if (req.file) {
            const uploadResult = await uploadLocalFile(req.file.path);
            if (uploadResult) {
                photo = { public_id: uploadResult.public_id, url: uploadResult.url };
            }
        }

        let parsedSocialLinks = {};
        if (socialLinks) {
            try {
                parsedSocialLinks = typeof socialLinks === "string" ? JSON.parse(socialLinks) : socialLinks;
            } catch (e) {
                parsedSocialLinks = {};
            }
        }

        const trustee = await Trustee.create({
            name,
            category: category || "trustee",
            designation,
            description: description || "",
            email: email || "",
            phone: phone || "",
            website: website || "",
            socialLinks: parsedSocialLinks,
            order: order ? Number(order) : 0,
            status: status || "active",
            photo,
            createdBy: req.user ? req.user._id : undefined,
        });

        res.status(201).json({ success: true, trustee });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Admin — Update Trustee
exports.updateTrustee = async (req, res) => {
    try {
        let trustee = await Trustee.findById(req.params.id);
        if (!trustee) return res.status(404).json({ success: false, message: "Record not found" });

        const updatedData = { ...req.body };

        if (req.file) {
            const uploadResult = await uploadLocalFile(req.file.path);
            if (uploadResult) {
                if (trustee.photo && trustee.photo.public_id) {
                    await deleteLocalFile(trustee.photo.public_id);
                }
                updatedData.photo = { public_id: uploadResult.public_id, url: uploadResult.url };
            }
        }

        if (updatedData.socialLinks && typeof updatedData.socialLinks === "string") {
            try {
                updatedData.socialLinks = JSON.parse(updatedData.socialLinks);
            } catch (e) {}
        }

        if (updatedData.order !== undefined) {
            updatedData.order = Number(updatedData.order);
        }

        trustee = await Trustee.findByIdAndUpdate(req.params.id, updatedData, { new: true });
        res.status(200).json({ success: true, trustee });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Admin — Delete Trustee
exports.deleteTrustee = async (req, res) => {
    try {
        const trustee = await Trustee.findById(req.params.id);
        if (!trustee) return res.status(404).json({ success: false, message: "Record not found" });

        if (trustee.photo && trustee.photo.public_id) {
            await deleteLocalFile(trustee.photo.public_id);
        }

        await trustee.deleteOne();
        res.status(200).json({ success: true, message: "Record deleted successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

