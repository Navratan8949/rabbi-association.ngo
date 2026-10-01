const Contact = require("../models/Contact");

const { getTransporter } = require("../utils/sendMail");

exports.submitContactEnquiry = async (req, res) => {
    try {
        const { name, email, mobile, subject, message } = req.body;

        const enquiry = await Contact.create({
            name,
            email,
            mobile,
            subject,
            message
        });

        // Send email notification to admin
        try {
            const { transporter, settings } = await getTransporter();
            const adminEmail = process.env.ADMIN_EMAIL || "admin@rabbi.co.in";
            
            await transporter.sendMail({
                from: `"${settings.fromName}" <${settings.fromEmail || settings.user}>`,
                to: adminEmail,
                subject: `New Contact Enquiry: ${subject || 'No Subject'}`,
                html: `
                    <h3>New Enquiry from Website</h3>
                    <p><strong>Name:</strong> ${name}</p>
                    <p><strong>Email:</strong> ${email}</p>
                    <p><strong>Mobile:</strong> ${mobile}</p>
                    <p><strong>Subject:</strong> ${subject}</p>
                    <p><strong>Message:</strong><br/>${message}</p>
                `
            });
        } catch (emailErr) {
            console.error("Failed to send admin notification for enquiry:", emailErr);
        }

        res.status(201).json({ success: true, message: "Enquiry submitted successfully. We will get back to you soon.", enquiry });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.getAllEnquiries = async (req, res) => {
    try {
        const enquiries = await Contact.find().sort("-createdAt");
        res.status(200).json({ success: true, count: enquiries.length, enquiries });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.getEnquiryById = async (req, res) => {
    try {
        const enquiry = await Contact.findById(req.params.id);
        if (!enquiry) return res.status(404).json({ success: false, message: "Enquiry not found" });
        res.status(200).json({ success: true, enquiry });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.updateEnquiry = async (req, res) => {
    try {
        const enquiry = await Contact.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!enquiry) return res.status(404).json({ success: false, message: "Enquiry not found" });

        res.status(200).json({ success: true, message: "Enquiry updated", enquiry });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.deleteEnquiry = async (req, res) => {
    try {
        const enquiry = await Contact.findByIdAndDelete(req.params.id);
        if (!enquiry) return res.status(404).json({ success: false, message: "Enquiry not found" });
        res.status(200).json({ success: true, message: "Enquiry deleted" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
