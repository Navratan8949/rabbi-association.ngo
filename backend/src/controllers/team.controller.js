const Team = require("../models/Team");
const { uploadLocalFile, deleteLocalFile } = require("../utils/fileUpload");

// Public — Get all active team members
exports.getAllTeamMembers = async (req, res) => {
    try {
        const team = await Team.find({ status: "active" }).sort("order");
        res.status(200).json({ success: true, count: team.length, team });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Admin — Create team member
exports.createTeamMember = async (req, res) => {
    try {
        const { name, designation, description, email, phone, mobile, website, socialLinks, order } = req.body;

        let photo = { public_id: "", url: "" };
        if (req.file) {
            const uploadResult = await uploadLocalFile(req.file.path);
            if (uploadResult) photo = { public_id: uploadResult.public_id, url: uploadResult.url };
        }

        let parsedSocialLinks = {};
        if (socialLinks) {
            try {
                parsedSocialLinks = typeof socialLinks === "string" ? JSON.parse(socialLinks) : socialLinks;
            } catch (e) {
                parsedSocialLinks = {};
            }
        }

        const effectivePhone = (phone || mobile || "").trim();

        const member = await Team.create({
            name: name?.trim(),
            designation: designation?.trim(),
            description: description?.trim() || "",
            email: email?.trim() || "",
            phone: effectivePhone,
            mobile: effectivePhone,
            website: website?.trim() || "",
            socialLinks: parsedSocialLinks,
            order: order ? Number(order) : 0,
            photo,
            createdBy: req.user._id,
        });

        res.status(201).json({ success: true, member });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Admin — Update team member
exports.updateTeamMember = async (req, res) => {
    try {
        let member = await Team.findById(req.params.id);
        if (!member) return res.status(404).json({ success: false, message: "Team member not found" });

        const updatedData = { ...req.body };
        if (req.file) {
            const uploadResult = await uploadLocalFile(req.file.path);
            if (uploadResult) {
                updatedData.photo = { public_id: uploadResult.public_id, url: uploadResult.url };
                if (member.photo && member.photo.public_id) {
                    await deleteLocalFile(member.photo.public_id);
                }
            }
        }

        if (updatedData.socialLinks) {
            try {
                if (typeof updatedData.socialLinks === "string") {
                    updatedData.socialLinks = JSON.parse(updatedData.socialLinks);
                }
            } catch (e) {
                delete updatedData.socialLinks;
            }
        }

        // Phone and Mobile sync
        if (updatedData.phone !== undefined || updatedData.mobile !== undefined) {
            const effectivePhone = (updatedData.phone !== undefined ? updatedData.phone : updatedData.mobile) || "";
            const trimmedPhone = typeof effectivePhone === "string" ? effectivePhone.trim() : effectivePhone;
            updatedData.phone = trimmedPhone;
            updatedData.mobile = trimmedPhone;
        }

        if (updatedData.email !== undefined && typeof updatedData.email === "string") {
            updatedData.email = updatedData.email.trim();
        }

        if (updatedData.name !== undefined && typeof updatedData.name === "string") {
            updatedData.name = updatedData.name.trim();
        }

        if (updatedData.designation !== undefined && typeof updatedData.designation === "string") {
            updatedData.designation = updatedData.designation.trim();
        }

        member = await Team.findByIdAndUpdate(req.params.id, updatedData, { new: true });
        res.status(200).json({ success: true, member });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Admin — Delete team member
exports.deleteTeamMember = async (req, res) => {
    try {
        const member = await Team.findById(req.params.id);
        if (!member) return res.status(404).json({ success: false, message: "Team member not found" });
        
        if (member.photo && member.photo.public_id) {
            await deleteLocalFile(member.photo.public_id);
        }
        await member.deleteOne();
        res.status(200).json({ success: true, message: "Team member deleted" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
