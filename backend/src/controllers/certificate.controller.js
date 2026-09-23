const Certificate = require("../models/Certificate");
const Member = require("../models/Member");
const Volunteer = require("../models/Volunteer");
const { generateCertificatePDF } = require("../utils/generatePDF");
const { SendVerificationCode } = require("../utils/sendMail");
const { getSiteName, getSiteLogoDetails } = require("../utils/siteSettings");
const path = require("path");
const fs = require("fs");

exports.createCertificate = async (req, res) => {
    try {
        const { member, volunteer, certificateNo, title, description, status } = req.body;
        
        let targetDoc = null;
        let userName = "Recipient";
        let isVolunteer = false;

        if (member) {
            targetDoc = await Member.findById(member).populate("user");
            if (!targetDoc) return res.status(404).json({ success: false, message: "Member not found" });
            userName = targetDoc.user ? targetDoc.user.fullName : "Member";
        } else if (volunteer) {
            targetDoc = await Volunteer.findById(volunteer).populate("user");
            if (!targetDoc) return res.status(404).json({ success: false, message: "Volunteer not found" });
            userName = targetDoc.user ? targetDoc.user.fullName : "Volunteer";
            isVolunteer = true;
        } else {
            return res.status(400).json({ success: false, message: "Either member or volunteer ID must be provided" });
        }

        const siteName = await getSiteName();
        const siteLogoDetails = await getSiteLogoDetails();

        let pdf = { public_id: "", url: "" };
        const pdfPath = await generateCertificatePDF({ certificateNo, title, description }, userName, siteName, siteLogoDetails);
        
        if (pdfPath) {
            const fileName = path.basename(pdfPath);
            const localUrl = `${req.protocol}://${req.get("host")}/public/certificates/${fileName}`;
            pdf = { public_id: fileName, url: localUrl };
        }

        const certificate = await Certificate.create({
            member: isVolunteer ? undefined : targetDoc._id,
            volunteer: isVolunteer ? targetDoc._id : undefined,
            certificateNo,
            title,
            description,
            status,
            pdf
        });

        if (isVolunteer) {
            targetDoc.certificate.push(certificate._id);
        } else {
            targetDoc.certificate.push(certificate._id);
        }
        await targetDoc.save();

        const populatedCertificate = await Certificate.findById(certificate._id)
            .populate({ path: "member", populate: { path: "user", select: "fullName email" } })
            .populate({ path: "volunteer", populate: { path: "user", select: "fullName email" } });

        // Send Email Notification
        if (targetDoc.user && targetDoc.user.email) {
            const userEmail = targetDoc.user.email;
            SendVerificationCode(
                userEmail,
                `<p>Dear ${userName},</p><p>We are delighted to inform you that you have been awarded a new certificate: "<strong>${title}</strong>".</p><p>Description: ${description}</p><p>You can view and download your certificate from your Portal.</p><p>Thank you for your continuous support!</p><p>Best Regards,<br/>${siteName} Team</p>`,
                `Congratulations! You have received a new Certificate - ${siteName}`,
                `Dear ${userName},\n\nWe are delighted to inform you that you have been awarded a new certificate: "${title}".\n\nDescription: ${description}\n\nYou can view and download your certificate from your Portal.\n\nThank you for your continuous support!\n\nBest Regards,\n${siteName} Team`
            );
        }

        res.status(201).json({ success: true, certificate: populatedCertificate });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.getAllCertificates = async (req, res) => {
    try {
        const certificates = await Certificate.find()
            .populate({ path: "member", populate: { path: "user", select: "fullName email" } })
            .populate({ path: "volunteer", populate: { path: "user", select: "fullName email" } })
            .sort("-issueDate");
        res.status(200).json({ success: true, count: certificates.length, certificates });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.getMyCertificates = async (req, res) => {
    try {
        const member = await Member.findOne({ user: req.user.id });
        const volunteer = await Volunteer.findOne({ user: req.user.id });

        let certificates = [];
        if (member) {
            const memberCerts = await Certificate.find({ member: member._id }).sort("-issueDate");
            certificates = [...certificates, ...memberCerts];
        }
        if (volunteer) {
            const volunteerCerts = await Certificate.find({ volunteer: volunteer._id }).sort("-issueDate");
            certificates = [...certificates, ...volunteerCerts];
        }

        certificates.sort((a, b) => b.issueDate - a.issueDate);

        res.status(200).json({ success: true, count: certificates.length, certificates });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.updateCertificate = async (req, res) => {
    try {
        const certificate = await Certificate.findById(req.params.id);
        if (!certificate) return res.status(404).json({ success: false, message: "Certificate not found" });

        const { member, volunteer, certificateNo, title, description, status } = req.body;
        
        let targetDoc = null;
        let userName = "Recipient";
        let isVolunteer = false;

        const activeRef = member || volunteer || certificate.member || certificate.volunteer;
        
        if (member || certificate.member && !volunteer) {
            targetDoc = await Member.findById(member || certificate.member).populate("user");
            userName = targetDoc && targetDoc.user ? targetDoc.user.fullName : "Member";
        } else if (volunteer || certificate.volunteer && !member) {
            targetDoc = await Volunteer.findById(volunteer || certificate.volunteer).populate("user");
            userName = targetDoc && targetDoc.user ? targetDoc.user.fullName : "Volunteer";
            isVolunteer = true;
        }

        const siteName = await getSiteName();
        const siteLogoDetails = await getSiteLogoDetails();
        
        let pdf = certificate.pdf;
        // Generate new PDF
        const pdfPath = await generateCertificatePDF({ certificateNo, title, description }, userName, siteName, siteLogoDetails);
        if (pdfPath) {
            const fileName = path.basename(pdfPath);
            const localUrl = `${req.protocol}://${req.get("host")}/public/certificates/${fileName}`;
            
            // Delete old PDF from local storage if exists
            if (pdf && pdf.public_id) {
                const oldPath = path.join(__dirname, "..", "..", "public", "certificates", pdf.public_id);
                if (fs.existsSync(oldPath)) {
                    fs.unlinkSync(oldPath);
                }
            }
            pdf = { public_id: fileName, url: localUrl };
        }

        const updatedData = { 
            certificateNo, title, description, status, pdf,
        };
        if (member) {
            updatedData.member = member;
            updatedData.$unset = { volunteer: 1 };
        } else if (volunteer) {
            updatedData.volunteer = volunteer;
            updatedData.$unset = { member: 1 };
        }

        const updatedCertificate = await Certificate.findByIdAndUpdate(
            req.params.id,
            updatedData,
            { new: true }
        );

        const populatedCertificate = await Certificate.findById(updatedCertificate._id)
            .populate({ path: "member", populate: { path: "user", select: "fullName email" } })
            .populate({ path: "volunteer", populate: { path: "user", select: "fullName email" } });

        res.status(200).json({ success: true, certificate: populatedCertificate });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.deleteCertificate = async (req, res) => {
    try {
        const certificate = await Certificate.findById(req.params.id);
        if (!certificate) return res.status(404).json({ success: false, message: "Certificate not found" });

        if (certificate.member) {
            await Member.updateOne({ _id: certificate.member }, { $pull: { certificate: certificate._id } });
        }
        if (certificate.volunteer) {
            await Volunteer.updateOne({ _id: certificate.volunteer }, { $pull: { certificate: certificate._id } });
        }

        // Delete the local PDF file
        if (certificate.pdf && certificate.pdf.public_id) {
            const oldPath = path.join(__dirname, "..", "..", "public", "certificates", certificate.pdf.public_id);
            if (fs.existsSync(oldPath)) {
                fs.unlinkSync(oldPath);
            }
        }

        await certificate.deleteOne();
        res.status(200).json({ success: true, message: "Certificate deleted successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
