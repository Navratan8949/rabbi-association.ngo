const Crowdfunding = require("../models/Crowdfunding");
const { uploadLocalFile, deleteLocalFile } = require("../utils/fileUpload");

exports.createCampaign = async (req, res) => {
    try {
        const { 
            title, 
            description, 
            story,
            category,
            beneficiary,
            organizer,
            targetAmount, 
            raisedAmount,
            startDate, 
            endDate, 
            status, 
            translations 
        } = req.body;

        let image = { public_id: "", url: "" };
        if (req.file) {
            const uploadResult = await uploadLocalFile(req.file.path);
            if (uploadResult) {
                image = { public_id: uploadResult.public_id, url: uploadResult.url };
            }
        }

        let parsedTranslations = {};
        if (typeof translations === "string") {
            try { parsedTranslations = JSON.parse(translations); } catch (e) {}
        } else if (typeof translations === "object" && translations !== null) {
            parsedTranslations = translations;
        }

        const campaign = await Crowdfunding.create({
            title,
            description,
            story: story || "",
            category: category || "General Welfare",
            beneficiary: beneficiary || "",
            organizer: organizer || "",
            targetAmount: Number(targetAmount) || 0,
            raisedAmount: Number(raisedAmount) || 0,
            startDate,
            endDate,
            status: status || "active",
            image,
            translations: parsedTranslations
        });

        res.status(201).json({ success: true, campaign });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.getAllCampaigns = async (req, res) => {
    try {
        const campaigns = await Crowdfunding.find();
        res.status(200).json({ success: true, count: campaigns.length, campaigns });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.getCampaignById = async (req, res) => {
    try {
        const campaign = await Crowdfunding.findById(req.params.id);
        if (!campaign) return res.status(404).json({ success: false, message: "Campaign not found" });
        res.status(200).json({ success: true, campaign });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.updateCampaign = async (req, res) => {
    try {
        let campaign = await Crowdfunding.findById(req.params.id);
        if (!campaign) return res.status(404).json({ success: false, message: "Campaign not found" });

        const updatedData = { ...req.body };
        if (typeof updatedData.translations === "string") {
            try { updatedData.translations = JSON.parse(updatedData.translations); } catch (e) {}
        }
        if (req.file) {
            const uploadResult = await uploadLocalFile(req.file.path);
            if (uploadResult) {
                updatedData.image = { public_id: uploadResult.public_id, url: uploadResult.url };
                if (campaign.image && campaign.image.public_id) {
                    await deleteLocalFile(campaign.image.public_id);
                }
            }
        }

        campaign = await Crowdfunding.findByIdAndUpdate(req.params.id, updatedData, { new: true, runValidators: true });
        res.status(200).json({ success: true, campaign });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.deleteCampaign = async (req, res) => {
    try {
        const campaign = await Crowdfunding.findById(req.params.id);
        if (!campaign) return res.status(404).json({ success: false, message: "Campaign not found" });

        if (campaign.image && campaign.image.public_id) {
            await deleteLocalFile(campaign.image.public_id);
        }
        await campaign.deleteOne();
        res.status(200).json({ success: true, message: "Campaign deleted" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
