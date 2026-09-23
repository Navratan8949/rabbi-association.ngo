const mongoose = require("mongoose");

const beneficiarySchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Name is required"],
            trim: true,
        },
        age: {
            type: Number,
        },
        gender: {
            type: String,
            enum: ["Male", "Female", "Other", "Unknown"],
            default: "Unknown",
        },
        contactNumber: {
            type: String,
            trim: true,
        },
        address: {
            type: String,
            trim: true,
        },
        projectAssisted: {
            type: mongoose.Schema.ObjectId,
            ref: "Project",
        },
        assistanceType: {
            type: String,
            required: [true, "Assistance type is required"],
            trim: true,
        },
        assistanceDate: {
            type: Date,
            default: Date.now,
        },
        notes: {
            type: String,
        },
        image: {
            public_id: { type: String, default: "" },
            url: { type: String, default: "" },
        },
        status: {
            type: String,
            enum: ["active", "completed"],
            default: "active",
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Beneficiary", beneficiarySchema);
