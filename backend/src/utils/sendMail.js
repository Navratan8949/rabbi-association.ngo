const nodemailer = require("nodemailer");
const SiteContent = require("../models/SiteContent");

async function getTransporter() {
    let settings = {
        host: process.env.SMTP_HOST || "smtp.gmail.com",
        port: process.env.SMTP_PORT || 587,
        user: process.env.SMTP_USER || "navratan0443@gmail.com",
        pass: process.env.SMTP_PASS || "vddi lgvz ieby hlmk",
        fromName: "Rabbi Association",
        fromEmail: "navratan0443@gmail.com"
    };

    try {
        const siteContent = await SiteContent.findOne({ key: "email_settings" });
        if (siteContent && siteContent.content) {
            const parsed = JSON.parse(siteContent.content);
            if (parsed.host && parsed.user && parsed.pass) {
                settings = parsed;
            }
        }
    } catch (e) {
        console.error("Error fetching email settings:", e);
    }

    const transporter = nodemailer.createTransport({
        host: settings.host,
        port: settings.port,
        secure: Number(settings.port) === 465, // true for 465, false for other ports
        auth: {
            user: settings.user,
            pass: settings.pass,
        },
    });

    return { transporter, settings };
}

exports.SendVerificationCode = async (email, html, subject, text) => {
    try {
        const { transporter, settings } = await getTransporter();
        const fromString = `"${settings.fromName}" <${settings.fromEmail || settings.user}>`;
        
        const response = await transporter.sendMail({
            from: fromString,
            to: email,
            subject: `${subject}`,
            text: `${text}`,
            html: `${html}`,
        });

        // console.log("Verification email sent:", response);
    } catch (error) {
        console.error("Error sending email:", error);
    }
};

exports.SendMassEmail = async (bccEmails, subject, html) => {
    try {
        const { transporter, settings } = await getTransporter();
        const fromString = `"${settings.fromName}" <${settings.fromEmail || settings.user}>`;

        const response = await transporter.sendMail({
            from: fromString,
            bcc: bccEmails, // Send to everyone as BCC
            subject: subject,
            html: html,
        });
        return response;
    } catch (error) {
        console.error("Error sending mass email:", error);
        throw error;
    }
};