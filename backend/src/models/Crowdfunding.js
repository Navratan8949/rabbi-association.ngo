const mongoose = require("mongoose");

const crowdfundingSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
        },

        description: {
            type: String,
            required: true,
            trim: true,
        },

        story: {
            type: String,
            trim: true,
            default: "",
        },

        category: {
            type: String,
            trim: true,
            default: "General Welfare",
        },

        beneficiary: {
            type: String,
            trim: true,
            default: "",
        },

        organizer: {
            type: String,
            trim: true,
            default: "",
        },

        image: {
            public_id: {
                type: String,
                default: "",
            },
            url: {
                type: String,
                default: "",
            },
        },

        targetAmount: {
            type: Number,
            required: true,
        },

        raisedAmount: {
            type: Number,
            default: 0,
        },

        startDate: {
            type: Date,
        },

        endDate: {
            type: Date,
        },

        status: {
            type: String,
            enum: ["active", "completed", "closed"],
            default: "active",
        },

        translations: {
            type: mongoose.Schema.Types.Mixed,
            default: {},
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Crowdfunding", crowdfundingSchema);
