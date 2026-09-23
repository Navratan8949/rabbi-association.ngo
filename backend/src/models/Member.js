const mongoose = require("mongoose");

const memberSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
            unique: true,
        },
        memberId: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },
        profileImage: {
            public_id: { type: String, default: "" },
            url: { type: String, default: "" },
        },
        idProof: {
            public_id: { type: String, default: "" },
            url: { type: String, default: "" },
        },
        otherDoc: {
            public_id: { type: String, default: "" },
            url: { type: String, default: "" },
        },
        paymentScreenshot: {
            public_id: { type: String, default: "" },
            url: { type: String, default: "" },
        },
        
        guardianName: { type: String, trim: true, default: "" },
        guardianMobile: { type: String, trim: true, default: "" },
        bloodGroup: { type: String, trim: true, default: "" },
        profession: { type: String, trim: true, default: "" },
        aadharNo: { type: String, trim: true, default: "" },
        idProofType: { type: String, trim: true, default: "" },
        
        roleApplied: { type: String, trim: true, default: "" },
        paymentAmount: { type: Number, default: 0 },
        transactionId: { type: String, trim: true, default: "" },

        joiningDate: {
            type: Date,
            default: Date.now,
        },
        membershipStatus: {
            type: String,
            enum: ["pending", "approved", "rejected", "cancelled"],
            default: "pending",
        },
        rejectionReason: {
            type: String,
            default: "",
            trim: true
        },
        qrCode: {
            type: String,
            default: "",
        },
        appointmentLetter: {
            type: String,
            default: "",
        },
        certificate: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Certificate",
            },
        ],
        referredBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            default: null,
        },
        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Member", memberSchema);
