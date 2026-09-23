const mongoose = require("mongoose");

const volunteerSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
            unique: true,
        },
        volunteerId: {
            type: String,
            unique: true,
            sparse: true, // Only generated when approved
        },
        qrCode: {
            type: String,
        },
        profileImage: {
            public_id: { type: String, default: "" },
            url: { type: String, default: "" },
        },
        idProof: {
            public_id: { type: String, default: "" },
            url: { type: String, default: "" },
        },
        fullName: {
            type: String,
            required: [true, "Full name is required"],
            trim: true,
        },
        email: {
            type: String,
            required: [true, "Email is required"],
            lowercase: true,
            match: [
                /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                "Please add a valid email",
            ],
        },
        phone: {
            type: String,
            required: [true, "Phone number is required"],
        },
        profession: {
            type: String,
            trim: true,
            default: ""
        },
        skills: {
            type: String,
            default: ""
        },
        availability: {
            type: String,
            default: ""
        },
        message: {
            type: String,
        },
        status: {
            type: String,
            enum: ["pending", "approved", "rejected"],
            default: "pending",
        },
        rejectionReason: {
            type: String,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Volunteer", volunteerSchema);
