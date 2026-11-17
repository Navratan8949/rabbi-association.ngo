const Project = require("../models/Project");
const { uploadLocalFile, deleteLocalFile } = require("../utils/fileUpload");

exports.createProject = async (req, res) => {
    try {
        const { title, description, goalAmount, raisedAmount, status, startDate, endDate, isFeatured, translations } = req.body;
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

        const project = await Project.create({
            title,
            description,
            goalAmount,
            raisedAmount,
            status,
            startDate,
            endDate,
            isFeatured,
            image,
            translations: parsedTranslations,
            createdBy: req.user.id
        });

        res.status(201).json({ success: true, project });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.getAllProjects = async (req, res) => {
    try {
        const projects = await Project.find().sort("-createdAt");
        res.status(200).json({ success: true, count: projects.length, projects });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.getProjectById = async (req, res) => {
    try {
        const project = await Project.findById(req.params.id);
        if (!project) return res.status(404).json({ success: false, message: "Project not found" });
        res.status(200).json({ success: true, project });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.updateProject = async (req, res) => {
    try {
        let project = await Project.findById(req.params.id);
        if (!project) return res.status(404).json({ success: false, message: "Project not found" });

        const updatedData = { ...req.body };
        if (typeof updatedData.translations === "string") {
            try { updatedData.translations = JSON.parse(updatedData.translations); } catch (e) {}
        }
        if (req.file) {
            const uploadResult = await uploadLocalFile(req.file.path);
            if (uploadResult) {
                updatedData.image = { public_id: uploadResult.public_id, url: uploadResult.url };
                if (project.image && project.image.public_id) {
                    await deleteLocalFile(project.image.public_id);
                }
            }
        }

        project = await Project.findByIdAndUpdate(req.params.id, updatedData, { new: true, runValidators: true });
        res.status(200).json({ success: true, project });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.deleteProject = async (req, res) => {
    try {
        const project = await Project.findById(req.params.id);
        if (!project) return res.status(404).json({ success: false, message: "Project not found" });
        if (project.image && project.image.public_id) {
            await deleteLocalFile(project.image.public_id);
        }
        await project.deleteOne();
        res.status(200).json({ success: true, message: "Project deleted" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
