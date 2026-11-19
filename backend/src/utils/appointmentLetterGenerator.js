const AppointmentLetter = require("../models/AppointmentLetter");
const Member = require("../models/Member");
require("../models/User");
const pdf = require("pdfkit");
const fs = require("fs");
const path = require("path");
const { getSiteName, getSiteLogoDetails } = require("./siteSettings");

function resolveLocalImagePath(imageUrl, defaultRelativePath) {
    if (imageUrl) {
        const cleanUrl = String(imageUrl).split("?")[0];
        const filename = cleanUrl.split("/").pop();

        if (filename) {
            // 1. Check in backend uploads
            const inUploads = path.join(__dirname, "..", "..", "public", "uploads", filename);
            if (fs.existsSync(inUploads) && !inUploads.endsWith(".svg")) return inUploads;

            // 2. Check in backend images
            const inImages = path.join(__dirname, "..", "..", "public", "images", filename);
            if (fs.existsSync(inImages) && !inImages.endsWith(".svg")) return inImages;

            // 3. Check in frontend public
            const inFrontend = path.join(__dirname, "..", "..", "..", "frontend", "public", filename);
            if (fs.existsSync(inFrontend) && !inFrontend.endsWith(".svg")) return inFrontend;
        }
    }

    if (defaultRelativePath) {
        const defaultPath = path.join(__dirname, "..", "..", defaultRelativePath);
        if (fs.existsSync(defaultPath) && !defaultPath.endsWith(".svg")) {
            return defaultPath;
        }
    }
    return null;
}

const generateLetterNo = () => {
    return "RA-AL-" + Date.now().toString().slice(-6);
};

exports.generateAndSaveAppointmentLetter = async ({ 
    memberId, 
    designation, 
    department, 
    joiningDate, 
    protocol, 
    host,
    existingLetterNo = null 
}) => {
    return new Promise(async (resolve, reject) => {
        try {
            const member = await Member.findById(memberId).populate("user");
            if (!member) {
                return reject(new Error("Member not found"));
            }

            const letterNo = existingLetterNo || generateLetterNo();
            const siteName = await getSiteName();
            const siteLogoDetails = await getSiteLogoDetails();
            const dynamicSignatureUrl = siteLogoDetails.signature;
            const dynamicStampUrl = siteLogoDetails.stamp;
            const dynamicLogoUrl = siteLogoDetails.logo;

            // 1. Generate PDF
            const pdfFileName = `${letterNo}.pdf`;
            const localPdfPath = path.join(__dirname, "..", "..", "public", "uploads", "appointments", pdfFileName);

            // Ensure directory exists
            const dirPath = path.dirname(localPdfPath);
            if (!fs.existsSync(dirPath)) {
                fs.mkdirSync(dirPath, { recursive: true });
            }

            const doc = new pdf({ margin: 50, size: 'A4' });
            const writeStream = fs.createWriteStream(localPdfPath);
            doc.pipe(writeStream);

            const navyColor = '#002114'; // Navy blue
            const goldColor = '#b45309'; // Richer gold/amber
            const textColor = '#334155';
            const headingColor = '#0f172a';

            // Add a decorative double border
            doc.rect(20, 20, doc.page.width - 40, doc.page.height - 40).lineWidth(1).stroke(goldColor);
            doc.rect(24, 24, doc.page.width - 48, doc.page.height - 48).lineWidth(2).stroke(navyColor);

            // 2. Resolve Dynamic Logo
            const logoPath = resolveLocalImagePath(dynamicLogoUrl, path.join("public", "images", "logo.png"));

            // Watermark
            if (logoPath && fs.existsSync(logoPath)) {
                try {
                    doc.save();
                    doc.opacity(0.04);
                    doc.image(logoPath, (doc.page.width - 320) / 2, (doc.page.height - 320) / 2, { width: 320 });
                    doc.restore();
                } catch (e) {
                    console.error("Watermark render error:", e.message);
                }
            }

            // Header Section
            if (logoPath && fs.existsSync(logoPath)) {
                try {
                    doc.image(logoPath, (doc.page.width - 70) / 2, 45, { width: 70 });
                    doc.y = 125;
                } catch (e) {
                    doc.y = 60;
                }
            } else {
                doc.y = 60;
            }

            const siteNameParts = siteName.split(" ");
            const firstHalf = siteNameParts.slice(0, Math.ceil(siteNameParts.length / 2)).join(" ").toUpperCase();
            const secondHalf = siteNameParts.slice(Math.ceil(siteNameParts.length / 2)).join(" ").toUpperCase();

            doc.font('Times-Bold').fontSize(22).fillColor(navyColor).text(firstHalf, { align: "center" });
            if (secondHalf) {
                doc.font('Times-Bold').fontSize(22).fillColor(navyColor).text(secondHalf, { align: "center" });
            }
            
            doc.moveDown(0.3);
            doc.font('Helvetica-Bold').fontSize(9).fillColor(goldColor).text("GOVT. REGD. NGO | EMPOWERING THE COMMUNITY", { align: "center", characterSpacing: 2 });
            
            doc.moveDown(1.5);
            
            // Title Line
            doc.rect(50, doc.y, doc.page.width - 100, 1).fill(goldColor);
            doc.moveDown(1);
            
            doc.font('Times-Bold').fontSize(15).fillColor(headingColor).text("APPOINTMENT LETTER", { align: "center", underline: true, characterSpacing: 1 });
            
            doc.moveDown(1.5);

            // Date and Letter No
            doc.font('Helvetica').fontSize(10).fillColor(textColor);
            const currentY = doc.y;
            doc.text(`Ref No: `, 50, currentY, { continued: true }).font('Helvetica-Bold').text(letterNo);
            doc.font('Helvetica').text(`Date: ${new Date().toLocaleDateString()}`, doc.page.width - 200, currentY, { align: 'right' });
            
            doc.moveDown(2);

            // Recipient Info
            doc.x = 50;
            doc.font('Helvetica').fontSize(10).fillColor(textColor).text(`To,`);
            doc.moveDown(0.2);
            doc.font('Helvetica-Bold').fontSize(13).fillColor(headingColor).text(`${member.user.fullName}`);
            doc.font('Helvetica').fontSize(10).fillColor(textColor).text(`Member ID: ${member.memberId}`);
            doc.text(`Email: ${member.user.email}`);
            doc.moveDown(1.5);

            // Subject
            doc.font('Helvetica-Bold').fontSize(10).fillColor(navyColor).text(`Subject: Appointment for the position of ${designation}`, { underline: false });
            doc.moveDown(1);

            // Body
            doc.font('Helvetica').fontSize(10).fillColor(textColor).text(`Dear ${member.user.fullName},`, { align: 'left' });
            doc.moveDown(0.8);
            
            doc.text(`We are pleased to appoint you as `, { continued: true })
               .font('Helvetica-Bold').text(`${designation}`, { continued: true })
               .font('Helvetica').text(` in the `, { continued: true })
               .font('Helvetica-Bold').text(`${department || "General"}`, { continued: true })
               .font('Helvetica').text(` department at `)
               .font('Helvetica-Bold').text(`${siteName}`, { continued: true })
               .font('Helvetica').text(`.`);
               
            doc.moveDown(0.6);
            doc.text(`Your effective joining date is `, { continued: true })
               .font('Helvetica-Bold').text(`${new Date(joiningDate).toLocaleDateString()}`, { continued: true })
               .font('Helvetica').text(`.`);
               
            doc.moveDown(0.8);
            doc.text("We believe your skills and experience will be an excellent match for our organization. We look forward to your positive impact on our NGO's mission and continuous dedication to community service. We expect you to uphold the values and code of conduct of the organization at all times.", { align: 'justify', lineGap: 4 });
            
            doc.moveDown(2.5);

            // --- SIGNATURE & OFFICIAL STAMP SECTION ---
            const sigY = Math.min(doc.y, doc.page.height - 180);

            // Resolve Signature & Official Stamp dynamically
            const signaturePath = resolveLocalImagePath(dynamicSignatureUrl, path.join("public", "images", "signature.png"));
            const stampPath = resolveLocalImagePath(dynamicStampUrl, path.join("public", "images", "association-stamp.png"));

            // "Sincerely,"
            doc.font('Helvetica').fontSize(10).fillColor(textColor).text("Sincerely,", 50, sigY);

            // Official Association Stamp placed right WITH the signature
            const stampWidth = 95;
            const stampX = 180;
            const stampY = sigY + 10;

            if (stampPath && fs.existsSync(stampPath)) {
                try {
                    doc.save();
                    doc.opacity(0.92);
                    doc.image(stampPath, stampX, stampY, { width: stampWidth });
                    doc.restore();
                } catch (stampErr) {
                    console.error("Error drawing stamp in PDF:", stampErr.message);
                }
            }

            // Draw Authorized Signature on Left
            if (signaturePath && fs.existsSync(signaturePath)) {
                try {
                    doc.image(signaturePath, 50, sigY + 20, { width: 125 });
                } catch (sigErr) {
                    doc.font('Helvetica-Oblique').fontSize(16).fillColor(navyColor).text("Tushar Kumar", 50, sigY + 30);
                }
            } else {
                doc.font('Helvetica-Oblique').fontSize(16).fillColor(navyColor).text("Tushar Kumar", 50, sigY + 30);
            }

            doc.font('Helvetica-Bold').fontSize(10).fillColor(headingColor).text("Authorized Signatory", 50, sigY + 74);
            doc.font('Helvetica').fontSize(8).fillColor(goldColor).text(siteName, 50, sigY + 88);

            // Footer line
            doc.rect(50, doc.page.height - 60, doc.page.width - 100, 1).fill(goldColor);

            doc.end();

            // 3. Save to database when PDF is completely written
            writeStream.on("finish", async () => {
                try {
                    const proto = protocol || "http";
                    const h = host || "localhost:8000";
                    let pdfUrl;
                    if (process.env.BACKEND_URL) {
                        pdfUrl = `${process.env.BACKEND_URL.replace(/\/+$/, "")}/public/uploads/appointments/${pdfFileName}`;
                    } else if (h.includes("rabbi.co.in") || (process.env.FRONTEND_URL && process.env.FRONTEND_URL.includes("rabbi.co.in"))) {
                        pdfUrl = `https://api.rabbi.co.in/public/uploads/appointments/${pdfFileName}`;
                    } else {
                        pdfUrl = `${proto}://${h}/public/uploads/appointments/${pdfFileName}`;
                    }

                    let appointmentLetter = await AppointmentLetter.findOne({ letterNo });

                    if (appointmentLetter) {
                        appointmentLetter.designation = designation;
                        appointmentLetter.department = department;
                        appointmentLetter.joiningDate = joiningDate;
                        appointmentLetter.pdf = { public_id: pdfFileName, url: pdfUrl };
                        await appointmentLetter.save();
                    } else {
                        appointmentLetter = await AppointmentLetter.create({
                            member: memberId,
                            letterNo,
                            designation,
                            department,
                            joiningDate,
                            pdf: { public_id: pdfFileName, url: pdfUrl }
                        });
                    }

                    const populatedLetter = await AppointmentLetter.findById(appointmentLetter._id).populate({
                        path: "member",
                        populate: { path: "user", select: "fullName email" }
                    });

                    resolve(populatedLetter);
                } catch (saveError) {
                    reject(saveError);
                }
            });

            writeStream.on("error", (err) => {
                reject(err);
            });

        } catch (error) {
            reject(error);
        }
    });
};
