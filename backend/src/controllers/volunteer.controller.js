const Volunteer = require("../models/Volunteer");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const QRCode = require("qrcode");
const { uploadLocalFile, deleteLocalFile } = require("../utils/fileUpload");
const { SendVerificationCode } = require("../utils/sendMail");
const { getSiteName } = require("../utils/siteSettings");

const generateVolunteerId = () => {
    return "RAV" + Math.floor(100000 + Math.random() * 900000);
};

exports.publicApplyVolunteer = async (req, res) => {
    try {
        const jwt = require("jsonwebtoken");
        const generateToken = (id) => {
            return jwt.sign({ id }, process.env.JWT_SECRET || 'secret123', {
                expiresIn: "30d",
            });
        };
        const {
            fullName,
            email,
            phone,
            password,
            profession,
            skills,
            availability,
            message,
            address,
            state,
            district,
            dob
        } = req.body;

        if (!fullName || !email || !phone || !password) {
            return res.status(400).json({ success: false, message: "Please provide Full Name, Email, Phone, and Password" });
        }

        // 1. Check if user exists
        let user = await User.findOne({ $or: [{ email }, { mobile: phone }] });
        if (!user) {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);
            user = await User.create({
                fullName,
                email,
                mobile: phone,
                password: hashedPassword,
                role: "volunteer",
                address: address || "",
                state: state || "",
                district: district || "",
                dob: dob || null
            });
        } else {
            return res.status(400).json({ success: false, message: "An account with this Email or Mobile already exists. Please login to apply." });
        }

        // Handle ID proof upload
        let idProof = { public_id: "", url: "" };
        const idFile = req.files && req.files["idProof"] ? req.files["idProof"][0] : null;
        if (idFile) {
            const uploadResult = await uploadLocalFile(idFile.path);
            if (uploadResult) {
                idProof = { public_id: uploadResult.public_id, url: uploadResult.url };
            }
        }
        
        let profileImage = { public_id: "", url: "" };
        const profileFile = req.files && req.files["profileImage"] ? req.files["profileImage"][0] : null;
        if (profileFile) {
            const uploadResult = await uploadLocalFile(profileFile.path);
            if (uploadResult) {
                profileImage = { public_id: uploadResult.public_id, url: uploadResult.url };
            }
            // Optional: Also set it to the user object if they are new
            user.profileImage = profileImage;
            await user.save();
        }

        const volunteer = await Volunteer.create({
            user: user._id,
            fullName,
            email,
            phone,
            profession,
            skills,
            availability,
            message,
            idProof,
            profileImage,
            status: "pending",
        });

        const token = generateToken(user._id);

        const options = {
            expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
            httpOnly: true,
        };

        res.status(201).cookie("token", token, options).json({
            success: true,
            token,
            user: {
                _id: user._id,
                fullName: user.fullName,
                email: user.email,
                role: user.role,
            },
            message: "Volunteer application submitted successfully. You have been logged in.",
            volunteer,
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.applyVolunteer = async (req, res) => {
    try {
        const {
            profession,
            skills,
            availability,
            message
        } = req.body;

        const userId = req.user.id;

        // 1. Check if user is already a volunteer
        let existingVol = await Volunteer.findOne({ user: userId });
        if (existingVol && existingVol.status !== "rejected") {
            return res.status(400).json({ success: false, message: "You have already applied for volunteering." });
        }

        // Prevent Members from applying as Volunteers
        if (req.user.role === "member") {
            return res.status(400).json({ success: false, message: "You are already a Member. Members cannot apply for volunteering." });
        }

        // Handle ID proof upload
        let idProof = { public_id: "", url: "" };
        const idFile = req.files && req.files["idProof"] ? req.files["idProof"][0] : null;
        if (idFile) {
            const uploadResult = await uploadLocalFile(idFile.path);
            if (uploadResult) {
                idProof = { public_id: uploadResult.public_id, url: uploadResult.url };
            }
        }
        
        let profileImage = { public_id: "", url: "" };
        const profileFile = req.files && req.files["profileImage"] ? req.files["profileImage"][0] : null;
        if (profileFile) {
            const uploadResult = await uploadLocalFile(profileFile.path);
            if (uploadResult) {
                profileImage = { public_id: uploadResult.public_id, url: uploadResult.url };
            }
        }

        const volunteer = await Volunteer.create({
            user: userId,
            fullName: req.user.fullName,
            email: req.user.email,
            phone: req.user.mobile,
            profession,
            skills,
            availability,
            message,
            idProof,
            profileImage,
            status: "pending",
        });

        res.status(201).json({
            success: true,
            message: "Volunteer application submitted successfully.",
            volunteer,
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.createVolunteerDirectly = async (req, res) => {
    try {
        const {
            fullName,
            email,
            phone,
            password,
            profession,
            skills,
            availability,
            message
        } = req.body;

        if (!fullName || !email || !phone) {
            return res.status(400).json({ success: false, message: "Please provide Full Name, Email, and Phone" });
        }

        let user = await User.findOne({ $or: [{ email }, { mobile: phone }] });
        if (!user) {
            if (!password) {
                return res.status(400).json({ success: false, message: "Please provide a password for the new user account" });
            }
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);
            user = await User.create({
                fullName,
                email,
                mobile: phone,
                password: hashedPassword,
                role: "volunteer",
            });
        } else {
            if (user.role === "member") {
                return res.status(400).json({ success: false, message: "This Email or Phone is already registered as a Member. A Member cannot be created as a Volunteer." });
            }
            if (user.email !== email || user.mobile !== phone) {
                return res.status(400).json({ success: false, message: `User found but Email or Phone doesn't match completely. Existing Email: ${user.email}, Phone: ${user.mobile}` });
            }
            user.role = "volunteer";
            await user.save();
        }

        const existingVol = await Volunteer.findOne({ user: user._id });
        if (existingVol) {
            return res.status(400).json({ success: false, message: "This user is already a volunteer" });
        }

        const volunteerId = generateVolunteerId();
        const verificationLink = `${process.env.FRONTEND_URL || "https://rabbiassociation.org/"}/verify-volunteer/${volunteerId}`;
        const qrCodeData = await QRCode.toDataURL(verificationLink);

        const volunteer = await Volunteer.create({
            user: user._id,
            volunteerId,
            qrCode: qrCodeData,
            fullName,
            email,
            phone,
            profession,
            skills,
            availability,
            message,
            status: "approved",
        });

        res.status(201).json({
            success: true,
            message: "Volunteer created successfully",
            volunteer,
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.getVolunteerById = async (req, res) => {
    try {
        const volunteer = await Volunteer.findById(req.params.id).populate("user", "fullName email mobile role dob address state district profileImage");
        if (!volunteer) {
            return res.status(404).json({ success: false, message: "Volunteer not found" });
        }
        res.status(200).json({
            success: true,
            volunteer,
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.getAllVolunteers = async (req, res) => {
    try {
        const volunteers = await Volunteer.find().populate("user", "fullName email mobile role dob address state district profileImage").sort("-createdAt");
        res.status(200).json({
            success: true,
            count: volunteers.length,
            volunteers,
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.approveVolunteer = async (req, res) => {
    try {
        const volunteer = await Volunteer.findById(req.params.id).populate("user", "fullName email dob address state district profileImage");
        if (!volunteer) {
            return res.status(404).json({ success: false, message: "Volunteer not found" });
        }

        volunteer.status = "approved";
        
        if (!volunteer.volunteerId) {
            volunteer.volunteerId = generateVolunteerId();
        }

        const verificationLink = `${process.env.FRONTEND_URL || "https://rabbiassociation.org/"}/verify-volunteer/${volunteer.volunteerId}`;
        volunteer.qrCode = await QRCode.toDataURL(verificationLink);

        await volunteer.save();

        // Update User Role to volunteer
        const User = require("../models/User");
        if (volunteer.user) {
            await User.findByIdAndUpdate(volunteer.user._id, { role: "volunteer" });
        }


        // Send Email Notification
        if (volunteer.user && volunteer.user.email) {
            const userEmail = volunteer.user.email;
            const userName = volunteer.user.fullName;
            const siteName = await getSiteName();
            try {
                SendVerificationCode(
                    userEmail,
                    `<p>Dear ${userName},</p><p>Congratulations! Your volunteer application has been approved.</p><p>Your unique Volunteer ID is: <strong>${volunteer.volunteerId}</strong></p><p>You can now log in to the Volunteer Dashboard to access your profile and ID card.</p><br/><p><strong>Your Login Credentials:</strong><br/>Email: <strong>${userEmail}</strong><br/>Password: <strong>(The password you created during registration)</strong></p><br/><p>Welcome to the team!</p><p>Best Regards,<br/>${siteName} Team</p>`,
                    `Volunteer Application Approved - ${siteName}`,
                    `Dear ${userName},\n\nCongratulations! Your volunteer application has been approved.\nYour unique Volunteer ID is: ${volunteer.volunteerId}\n\nYou can now log in to the Volunteer Dashboard to access your profile and ID card.\n\nYour Login Credentials:\nEmail: ${userEmail}\nPassword: (The password you created during registration)\n\nWelcome to the team!\n\nBest Regards,\n${siteName} Team`
                );
            } catch (emailError) {
                console.error("Error sending approval email:", emailError);
            }
        }

        res.status(200).json({ success: true, message: "Volunteer approved", volunteer });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.rejectVolunteer = async (req, res) => {
    try {
        const { reason } = req.body;
        const volunteer = await Volunteer.findById(req.params.id).populate("user", "fullName email dob address state district profileImage");
        if (!volunteer) {
            return res.status(404).json({ success: false, message: "Volunteer not found" });
        }

        volunteer.status = "rejected";
        volunteer.rejectionReason = reason || "No reason provided by administration.";
        await volunteer.save();

        // Revert User Role to user
        const User = require("../models/User");
        if (volunteer.user) {
            await User.findByIdAndUpdate(volunteer.user._id, { role: "user" });
        }

        if (volunteer.user && volunteer.user.email) {
            const userEmail = volunteer.user.email;
            const userName = volunteer.user.fullName;
            const siteName = await getSiteName();
            try {
                SendVerificationCode(
                    userEmail,
                    `<p>Dear ${userName},</p><p>We regret to inform you that your volunteer application has been rejected at this time.</p><p><strong>Reason:</strong><br/>${reason || "No reason provided."}</p><p>Best Regards,<br/>${siteName} Team</p>`,
                    `Volunteer Application Status - ${siteName}`,
                    `Dear ${userName},\n\nWe regret to inform you that your volunteer application has been rejected at this time.\n\nReason: ${reason || "No reason provided."}\n\nBest Regards,\n${siteName} Team`
                );
            } catch (emailError) {
                console.error("Error sending rejection email:", emailError);
            }
        }

        res.status(200).json({ success: true, message: "Volunteer application rejected", volunteer });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.deleteVolunteer = async (req, res) => {
    try {
        const volunteer = await Volunteer.findById(req.params.id);
        if (!volunteer) {
            return res.status(404).json({ success: false, message: "Volunteer not found" });
        }
        await volunteer.deleteOne();
        res.status(200).json({ success: true, message: "Volunteer application deleted" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.getMyProfile = async (req, res) => {
    try {
        const volunteer = await Volunteer.findOne({ user: req.user.id }).populate("user", "fullName email mobile profileImage");
        if (!volunteer) return res.status(404).json({ success: false, message: "Volunteer profile not found" });

        res.status(200).json({ success: true, volunteer });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.updateVolunteerProfile = async (req, res) => {
    try {
        const { profession, skills, availability, message } = req.body;
        const volunteer = await Volunteer.findOne({ user: req.user.id });
        
        const User = require("../models/User");
        const user = await User.findById(req.user.id);

        const { fullName, mobile, dob, address, state, district } = req.body;
        if (fullName) user.fullName = fullName;
        if (mobile) user.mobile = mobile;
        if (dob) user.dob = dob;
        if (address) user.address = address;
        if (state) user.state = state;
        if (district) user.district = district;

        if (!volunteer) {
            if (req.file) {
                const { uploadLocalFile, deleteLocalFile } = require("../utils/fileUpload");
                const uploadResult = await uploadLocalFile(req.file.path);
                if (uploadResult) {
                    if (user.profileImage && user.profileImage.public_id) {
                        await deleteLocalFile(user.profileImage.public_id);
                    }
                    user.profileImage = { public_id: uploadResult.public_id, url: uploadResult.url };
                }
            }
            await user.save();
            return res.status(200).json({ success: true, message: "Profile updated successfully", volunteer: null, user });
        }

        await user.save();

        if (profession) volunteer.profession = profession;
        if (skills) volunteer.skills = skills;
        if (availability) volunteer.availability = availability;
        if (message) volunteer.message = message;

        if (req.file) {
            const uploadResult = await uploadLocalFile(req.file.path);
            if (uploadResult) {
                if (volunteer.profileImage && volunteer.profileImage.public_id) {
                    await deleteLocalFile(volunteer.profileImage.public_id);
                }
                volunteer.profileImage = { public_id: uploadResult.public_id, url: uploadResult.url };
            }
        }

        await volunteer.save();
        res.status(200).json({ success: true, message: "Profile updated successfully", volunteer });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
