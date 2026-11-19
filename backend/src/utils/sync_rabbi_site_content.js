const mongoose = require("mongoose");
const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "../../.env") });

const SiteContent = require("../models/SiteContent");
const Trustee = require("../models/Trustee");

async function syncSiteContent() {
  try {
    console.log("=================================================");
    console.log("RABBI ASSOCIATION — SITE CONTENT & BRANDING SYNC");
    console.log("=================================================");
    console.log("Connecting to MongoDB via MONGODB_URI...");
    await mongoose.connect(process.env.MONGODB_URI);
    console.log(`Connected to Database: [${mongoose.connection.name}] successfully!\n`);

    // 1. Purge any legacy records containing 'azhar' or 'mubeen'
    console.log("Sanitizing legacy Al-Azhar / Dr. Mubeen records...");
    const allContents = await SiteContent.find({});
    for (const item of allContents) {
      const serialized = JSON.stringify(item).toLowerCase();
      if (serialized.includes("azhar") || serialized.includes("mubeen")) {
        console.log(`Removing legacy record with key: [${item.key}]`);
        await SiteContent.deleteOne({ _id: item._id });
      }
    }

    // 2. Official Site Logo & Favicon
    console.log("Setting official Rabbi Association Logo & Favicon...");
    await SiteContent.findOneAndUpdate(
      { key: "site_logo" },
      {
        key: "site_logo",
        title: "Site Logo & Brand",
        content: JSON.stringify({
          logo: "/logo.png",
          favicon: "/favicon.ico",
          siteName: "RABBI ASSOCIATION"
        })
      },
      { upsert: true, new: true }
    );
    console.log("✓ Site Logo & Favicon updated to Rabbi Association!");

    // 3. Official SEO Settings
    console.log("Setting official Rabbi Association SEO Settings...");
    await SiteContent.findOneAndUpdate(
      { key: "site_seo" },
      {
        key: "site_seo",
        title: "SEO Settings",
        content: JSON.stringify({
          title: "RABBI ASSOCIATION | Education, Social Welfare & Empowerment",
          description: "Rabbi Association is committed to strengthening education through professional consultancy, institutional development, academic excellence, and sustainable educational initiatives.",
          keywords: "Rabbi Association, School Setup Consultancy, Educational Consultancy, Teacher Training, Institutional Development, Education NGO, Social Welfare"
        })
      },
      { upsert: true, new: true }
    );
    console.log("✓ SEO metadata updated to Rabbi Association!");

    // 4. Official Founder's Message (Ajay Paul)
    console.log("Setting official Founder's Message (Ajay Paul)...");
    const founderMessageText =
      "Dear Friends, Well-Wishers and Partners,\n\n" +
      "Every community has people who need opportunities, support and someone willing to stand beside them. Education may change the future of a child, timely information may help a family access a welfare benefit, and appropriate legal assistance may help a person seek justice.\n\n" +
      "These realities inspire the mission of RABBI ASSOCIATION.\n\n" +
      "Our vision is to build an organisation that responds to the genuine needs of poor and marginalised communities through education, social welfare, institutional development, citizen empowerment and humanitarian service.\n\n" +
      "We aspire to support the transformation of schools, strengthen educational institutions, promote skill development, improve awareness of government schemes, facilitate access to appropriate legal services and stand for the dignity and rights of vulnerable people.\n\n" +
      "We also seek to work with government authorities, corporate organisations, charitable foundations, educational institutions, healthcare institutions, NGOs and individuals who share our commitment to social development.\n\n" +
      "We understand that lasting change requires sincerity, responsible leadership, professional collaboration and accountability. We therefore aim to develop our programmes carefully, use resources for their intended charitable purposes and measure our progress through meaningful outcomes.\n\n" +
      "I invite institutions, organisations, professionals, volunteers and well-wishers to join us in this mission.\n\n" +
      "Together, let us turn compassion into action, opportunities into progress and service into lasting social change.\n\n" +
      "With gratitude and commitment.";

    await SiteContent.findOneAndUpdate(
      { key: "founder_message" },
      {
        key: "founder_message",
        title: "Founder & CEO",
        content: JSON.stringify({
          name: "AJAY PAUL",
          designation: "Founder & CEO",
          message: founderMessageText,
          image: {
            url: "/founder-ajay-paul.jpg",
            public_id: "founder_ajay_paul"
          }
        }),
        image: {
          url: "/founder-ajay-paul.jpg",
          public_id: "founder_ajay_paul"
        }
      },
      { upsert: true, new: true }
    );
    console.log("✓ Founder's Message updated to Ajay Paul!");

    // 5. Official Vision & Mission
    console.log("Setting official Vision & Mission...");
    await SiteContent.findOneAndUpdate(
      { key: "vision_mission" },
      {
        key: "vision_mission",
        title: "Vision & Mission",
        content: JSON.stringify({
          vision: "Rabbi Association exists to witness to the teachings of Christ the Rabbi—our Teacher, Model, and Guide, led by the Holy Spirit, the Advocate.\n\nWe envision a society where education forms minds, shapes character, inspires responsible leadership, upholds human dignity, and transforms lives through love, truth, justice, compassion, and service.\n\n\"Making Life Better Through Education.\"",
          mission: "Rabbi Association exists to serve humanity through Christ-centred education, guided by Christ the Rabbi—our Teacher, Model, and Guide—and led by the Holy Spirit, the Advocate.\n\nWe are committed to making life better through quality education, empowering people, strengthening educational institutions, creating equal opportunities, and supporting sustainable social development.\n\nThrough professional consultancy, institutional development, capacity building, and meaningful partnerships, we strive to transform lives, build stronger communities, and create lasting positive impact—rooted in faith, love, integrity, excellence, and service.\n\n\"Educate with Purpose. Empower with Values. Serve with Love.\""
        })
      },
      { upsert: true, new: true }
    );
    console.log("✓ Vision & Mission updated!");

    // 6. Official About Us
    console.log("Setting official About Us content...");
    const aboutHtml =
      "<p>Rabbi Association is an education consultancy and institutional development organisation committed to advancing quality education, human empowerment, institutional excellence, and sustainable social development.</p>" +
      "<p>Founded on 5 September 2026, Rabbi Association was established with a vision to make a meaningful contribution to individuals, educational institutions, and communities through professional expertise guided by strong human, ethical, and social values.</p>" +
      "<p>We believe that education is more than the transmission of knowledge. True education forms the mind, shapes character, strengthens values, develops leadership, and inspires people to serve humanity.</p>" +
      "<p>Our inspiration comes from the life and teachings of Christ the Rabbi—our Teacher, Model, and Guide, and from the legacy of our beloved father, Late Shri Chandra Pal Singh, a dedicated teacher whose life reflected a deep commitment to education and service.</p>" +
      "<p>At Rabbi Association, we seek to combine professional excellence with compassion, integrity, responsibility, and service—helping institutions and individuals realise their potential and create lasting positive impact.</p>";

    await SiteContent.findOneAndUpdate(
      { key: "about_us" },
      {
        key: "about_us",
        title: "About Rabbi Association",
        content: aboutHtml,
        image: {
          url: "/rabbi-context/about_us_classroom.jpg",
          public_id: "about_us_classroom"
        }
      },
      { upsert: true, new: true }
    );
    console.log("✓ About Us content updated!");

    // 7. Official Contact Info
    console.log("Setting official Contact Info...");
    await SiteContent.findOneAndUpdate(
      { key: "contact_info" },
      {
        key: "contact_info",
        title: "Contact Information",
        content: JSON.stringify({
          address: "St. Michael's Mission, Mathura (Uttar Pradesh)",
          email: "info@rabbi.co.in",
          phones: [
            { number: "+919193827321", showInNavbar: true, showInFooter: true, showInContact: true }
          ],
          facebook: "https://facebook.com",
          instagram: "https://instagram.com",
          twitter: "https://twitter.com",
          youtube: "https://youtube.com"
        })
      },
      { upsert: true, new: true }
    );
    console.log("✓ Contact information updated!");

    // 8. Ensure Trustees / Inspiration are seeded
    console.log("Checking Trustees & Inspiration...");
    const existingTrustees = await Trustee.find({});
    if (existingTrustees.length === 0) {
      await Trustee.insertMany([
        {
          name: "Late Shri Chandra Pal Singh",
          category: "inspirational_person",
          designation: "Inspiration & Guiding Light",
          description: "A dedicated teacher whose life reflected a deep commitment to education, ethical values, and service. Our organizational philosophy and commitment to humanity are inspired by his enduring legacy.",
          photo: { url: "/placeholder-user.png" },
          status: "active"
        },
        {
          name: "Board of Trustees",
          category: "trustee",
          designation: "Managing Trustee",
          description: "Stewarding the strategic direction, ethical governance, and social initiatives of the Rabbi Association with integrity and dedication to community upliftment.",
          photo: { url: "/placeholder-user.png" },
          status: "active"
        }
      ]);
      console.log("✓ Default Inspiration & Trustees created!");
    } else {
      console.log(`Found ${existingTrustees.length} existing trustees in database.`);
    }

    console.log("\n=================================================");
    console.log("ALL SITE CONTENT & BRANDING SANITIZED & SYNCED!");
    console.log("=================================================");
    await mongoose.disconnect();
    process.exit(0);
  } catch (err) {
    console.error("Site content sync failed with error:", err);
    process.exit(1);
  }
}

syncSiteContent();

