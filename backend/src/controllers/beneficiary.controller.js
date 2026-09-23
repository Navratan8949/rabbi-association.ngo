const Beneficiary = require("../models/Beneficiary");
const { uploadLocalFile } = require("../utils/fileUpload");

exports.createBeneficiary = async (req, res) => {
    try {
        let image = { public_id: "", url: "" };
        if (req.file) {
            const uploadResult = await uploadLocalFile(req.file.path);
            if (uploadResult) {
                image = { public_id: uploadResult.public_id, url: uploadResult.url };
            }
        }

        const beneficiary = await Beneficiary.create({
            ...req.body,
            image,
        });

        res.status(201).json({ success: true, beneficiary });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

exports.getAllBeneficiaries = async (req, res) => {
    try {
        const beneficiaries = await Beneficiary.find().populate("projectAssisted", "title").sort("-createdAt");
        res.status(200).json({ success: true, count: beneficiaries.length, beneficiaries });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.getBeneficiary = async (req, res) => {
    try {
        const beneficiary = await Beneficiary.findById(req.params.id).populate("projectAssisted", "title");
        if (!beneficiary) return res.status(404).json({ success: false, message: "Beneficiary not found" });
        res.status(200).json({ success: true, beneficiary });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.updateBeneficiary = async (req, res) => {
    try {
        let beneficiary = await Beneficiary.findById(req.params.id);
        if (!beneficiary) return res.status(404).json({ success: false, message: "Beneficiary not found" });

        let image = beneficiary.image;
        if (req.file) {
            const uploadResult = await uploadLocalFile(req.file.path);
            if (uploadResult) {
                image = { public_id: uploadResult.public_id, url: uploadResult.url };
            }
        }

        beneficiary = await Beneficiary.findByIdAndUpdate(
            req.params.id,
            { ...req.body, image },
            { new: true, runValidators: true }
        );

        res.status(200).json({ success: true, beneficiary });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.deleteBeneficiary = async (req, res) => {
    try {
        const beneficiary = await Beneficiary.findById(req.params.id);
        if (!beneficiary) return res.status(404).json({ success: false, message: "Beneficiary not found" });

        await beneficiary.deleteOne();
        res.status(200).json({ success: true, message: "Beneficiary deleted" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
