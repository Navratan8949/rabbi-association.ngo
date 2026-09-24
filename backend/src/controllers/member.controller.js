const Member = require("../models/Member");
const User = require("../models/User");
const QRCode = require("qrcode");
const { uploadLocalFile, deleteLocalFile } = require("../utils/fileUpload");
const { SendVerificationCode } = require("../utils/sendMail");
const { getSiteName } = require("../utils/siteSettings");
const {
  generateAndSaveAppointmentLetter,
} = require("../utils/appointmentLetterGenerator");

const generateMemberId = () => {
  return "RAM" + Math.floor(100000 + Math.random() * 900000);
};

exports.applyMembership = async (req, res) => {
  try {
    let {
      guardianName,
      guardianMobile,
      bloodGroup,
      profession,
      aadharNo,
      idProofType,
      roleApplied,
      paymentAmount,
      transactionId,
      state,
      district,
      dob,
      address,
      gender,
    } = req.body;

    const userId = req.user.id;

    let existingMember = await Member.findOne({ user: userId });
    if (existingMember && existingMember.membershipStatus !== "rejected") {
      return res
        .status(400)
        .json({ success: false, message: "Membership already applied." });
    }

    // Prevent Volunteers from applying as Members
    if (req.user.role === "volunteer") {
      return res.status(400).json({ success: false, message: "You are already a Volunteer. Volunteers cannot apply for membership." });
    }

    const memberId = existingMember
      ? existingMember.memberId
      : generateMemberId();

    // Handle profileImage upload (for ID card — can differ from login profile pic)
    let profileImage = existingMember
      ? existingMember.profileImage
      : { public_id: "", url: "" };
    const profileFile =
      req.files && req.files["profileImage"]
        ? req.files["profileImage"][0]
        : null;
    if (profileFile) {
      const uploadResult = await uploadLocalFile(profileFile.path);
      if (uploadResult) {
        profileImage = {
          public_id: uploadResult.public_id,
          url: uploadResult.url,
        };
      }
    }

    // Handle idProof upload (Aadhar / PAN / Voter ID)
    let idProof = existingMember
      ? existingMember.idProof
      : { public_id: "", url: "" };
    const idProofFile =
      req.files && req.files["idProof"] ? req.files["idProof"][0] : null;
    if (idProofFile) {
      const uploadResult = await uploadLocalFile(idProofFile.path);
      if (uploadResult) {
        idProof = { public_id: uploadResult.public_id, url: uploadResult.url };
      }
    }

    // Handle otherDoc upload
    let otherDoc = existingMember
      ? existingMember.otherDoc
      : { public_id: "", url: "" };
    const otherDocFile =
      req.files && req.files["otherDoc"]
        ? req.files["otherDoc"][0]
        : null;
    if (otherDocFile) {
      const uploadResult = await uploadLocalFile(otherDocFile.path);
      if (uploadResult) {
        otherDoc = {
          public_id: uploadResult.public_id,
          url: uploadResult.url,
        };
      }
    }

    // Handle paymentScreenshot upload
    let paymentScreenshot = existingMember
      ? existingMember.paymentScreenshot
      : { public_id: "", url: "" };
    const paymentFile =
      req.files && req.files["paymentScreenshot"]
        ? req.files["paymentScreenshot"][0]
        : null;
    if (paymentFile) {
      const uploadResult = await uploadLocalFile(paymentFile.path);
      if (uploadResult) {
        paymentScreenshot = {
          public_id: uploadResult.public_id,
          url: uploadResult.url,
        };
      }
    }

    // Update User's additional details
    if (state || district || dob || address || gender) {
      await User.findByIdAndUpdate(userId, {
        ...(state && { state }),
        ...(district && { district }),
        ...(dob && { dob }),
        ...(address && { address }),
        ...(gender && { gender }),
      });
    }

    let member;
    if (existingMember) {
      existingMember.guardianName = guardianName || "";
      existingMember.guardianMobile = guardianMobile || "";
      existingMember.bloodGroup = bloodGroup || "";
      existingMember.profession = profession || "";
      existingMember.aadharNo = aadharNo || "";
      existingMember.idProofType = idProofType || "";
      existingMember.roleApplied = roleApplied || "";
      existingMember.paymentAmount = paymentAmount ? Number(paymentAmount) : 0;
      existingMember.transactionId = transactionId || "";
      
      existingMember.profileImage = profileImage;
      existingMember.idProof = idProof;
      existingMember.otherDoc = otherDoc;
      existingMember.paymentScreenshot = paymentScreenshot;
      
      existingMember.membershipStatus = "pending";
      existingMember.rejectionReason = "";
      existingMember.referredBy = null;
      await existingMember.save();
      member = existingMember;
    } else {
      member = await Member.create({
        user: userId,
        memberId,
        guardianName: guardianName || "",
        guardianMobile: guardianMobile || "",
        bloodGroup: bloodGroup || "",
        profession: profession || "",
        aadharNo: aadharNo || "",
        idProofType: idProofType || "",
        roleApplied: roleApplied || "",
        paymentAmount: paymentAmount ? Number(paymentAmount) : 0,
        transactionId: transactionId || "",
        
        profileImage,
        idProof,
        otherDoc,
        paymentScreenshot,
        
        membershipStatus: "pending",
      });
    }

    res
      .status(201)
      .json({
        success: true,
        message: "Membership application submitted successfully.",
        member,
      });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getAllMembers = async (req, res) => {
  try {
    const members = await Member.find()
      .populate(
        "user",
        "fullName email mobile role profileImage dob address state district gender",
      )
      .populate("referredBy", "fullName email profileImage")
      .sort("-createdAt")
      .lean();

    const AppointmentLetter = require("../models/AppointmentLetter");
    const letters = await AppointmentLetter.find({ member: { $in: members.map(m => m._id) } }).lean();

    const lettersMap = {};
    letters.forEach(l => {
      lettersMap[l.member.toString()] = l.pdf?.url;
    });

    const membersWithLetters = members.map(m => ({
      ...m,
      appointmentLetterUrl: lettersMap[m._id.toString()] || null
    }));

    res.status(200).json({ success: true, count: membersWithLetters.length, members: membersWithLetters });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.approveMember = async (req, res) => {
  try {
    const member = await Member.findById(req.params.id).populate(
      "user",
      "fullName email dob address state district",
    );
    if (!member) {
      return res
        .status(404)
        .json({ success: false, message: "Member not found" });
    }

    member.membershipStatus = "approved";

    // Generate QR Code containing member verification link
    const verificationLink = `${process.env.FRONTEND_URL || "https://rabbi.co.in/"}/verify-member/${member.memberId}`;
    const qrCodeData = await QRCode.toDataURL(verificationLink);

    member.qrCode = qrCodeData;

    await member.save();

    // Update User Role to member
    const User = require("../models/User");
    if (member.user) {
      await User.findByIdAndUpdate(member.user._id, { role: "member" });
    }


    // Auto-generate Appointment Letter
    try {
      await generateAndSaveAppointmentLetter({
        memberId: member._id,
        designation: req.body.designation || "Member",
        department: req.body.department || "General",
        joiningDate: Date.now(),
        protocol: req.protocol,
        host: req.get("host"),
      });
    } catch (letterErr) {
      console.error("Failed to generate appointment letter:", letterErr);
    }

    // Send Email Notification
    if (member.user && member.user.email) {
      const userEmail = member.user.email;
      const userName = member.user.fullName;
      const siteName = await getSiteName();
      try {
        SendVerificationCode(
          userEmail,
          `<p>Dear ${userName},</p><p>Congratulations! Your membership application has been approved.</p><p>Your unique Member ID is: <strong>${member.memberId}</strong></p><p>You can now log in to the Member Dashboard to access your profile, ID card, and exclusive features.</p><br/><p><strong>Your Login Credentials:</strong><br/>Email: <strong>${userEmail}</strong><br/>Password: <strong>(The password you created during registration)</strong></p><br/><p>Welcome to the team!</p><p>Best Regards,<br/>${siteName} Team</p>`,
          `Membership Approved - ${siteName}`,
          `Dear ${userName},\n\nCongratulations! Your membership application has been approved.\nYour unique Member ID is: ${member.memberId}\n\nYou can now log in to the Member Dashboard to access your profile, ID card, and exclusive features.\n\nYour Login Credentials:\nEmail: ${userEmail}\nPassword: (The password you created during registration)\n\nWelcome to the team!\n\nBest Regards,\n${siteName} Team`,
        );
      } catch (emailError) {
        console.error("Error sending approval email:", emailError);
      }
    }

    res
      .status(200)
      .json({
        success: true,
        message: "Member approved and QR Code generated",
        member,
      });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.rejectMember = async (req, res) => {
  try {
    const { reason } = req.body;
    const member = await Member.findById(req.params.id).populate(
      "user",
      "fullName email dob address state district",
    );
    if (!member) {
      return res
        .status(404)
        .json({ success: false, message: "Member not found" });
    }

    member.membershipStatus = "rejected";
    member.rejectionReason = reason || "No reason provided by administration.";
    await member.save();

    // Revert User Role to user
    const User = require("../models/User");
    if (member.user) {
      await User.findByIdAndUpdate(member.user._id, { role: "user" });
    }


    // Send Email Notification
    if (member.user && member.user.email) {
      const userEmail = member.user.email;
      const userName = member.user.fullName;
      const siteName = await getSiteName();
      try {
        SendVerificationCode(
          userEmail,
          `<p>Dear ${userName},</p><p>We regret to inform you that your membership application has been rejected at this time.</p><p><strong>Reason provided by administration:</strong><br/>${reason || "No reason provided by administration."}</p><p>If you have any questions, please contact our support team.</p><p>Best Regards,<br/>${siteName} Team</p>`,
          `Membership Application Status - ${siteName}`,
          `Dear ${userName},\n\nWe regret to inform you that your membership application has been rejected at this time.\n\nReason provided by administration:\n${reason || "No reason provided by administration."}\n\nIf you have any questions, please contact our support team.\n\nBest Regards,\n${siteName} Team`,
        );
      } catch (emailError) {
        console.error("Error sending rejection email:", emailError);
      }
    }

    res
      .status(200)
      .json({ success: true, message: "Member application rejected", member });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getMyProfile = async (req, res) => {
  try {
    const member = await Member.findOne({ user: req.user.id }).populate(
      "user",
      "fullName email mobile dob address state district profileImage",
    );
    if (!member)
      return res
        .status(404)
        .json({ success: false, message: "Member profile not found" });

    res.status(200).json({ success: true, member });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.updateMemberProfile = async (req, res) => {
  try {
    const {
      fullName,
      mobile,
      dob,
      address,
      state,
      district,
      gender,
      guardianName,
      guardianMobile,
      bloodGroup,
      profession,
      aadharNo,
      idProofType,
      roleApplied,
      paymentAmount,
      transactionId,
    } = req.body;

    const User = require("../models/User");
    const user = await User.findById(req.user.id);

    if (fullName) user.fullName = fullName;
    if (mobile) user.mobile = mobile;
    if (dob) user.dob = dob;
    if (address) user.address = address;
    if (state) user.state = state;
    if (district) user.district = district;
    if (gender) user.gender = gender;
    
    // If no member exists, just update user and return
    const member = await Member.findOne({ user: req.user.id });
    if (!member) {
      if (req.file) {
        const { uploadLocalFile, deleteLocalFile } = require("../utils/fileUpload");
        const uploadResult = await uploadLocalFile(req.file.path);
        if (uploadResult) {
          if (user.profileImage && user.profileImage.public_id) {
            await deleteLocalFile(user.profileImage.public_id);
          }
          user.profileImage = {
            public_id: uploadResult.public_id,
            url: uploadResult.url,
          };
        }
      }
      await user.save();
      return res.status(200).json({
        success: true,
        message: "Profile updated successfully",
        member: null,
        user
      });
    }

    await user.save();

    if (guardianName) member.guardianName = guardianName;
    if (guardianMobile) member.guardianMobile = guardianMobile;
    
    if (profession) member.profession = profession;
    if (aadharNo) member.aadharNo = aadharNo;
    if (idProofType) member.idProofType = idProofType;
    if (roleApplied) member.roleApplied = roleApplied;
    if (paymentAmount) member.paymentAmount = paymentAmount;
    if (transactionId) member.transactionId = transactionId;
    
    

    if (req.file) {
      const uploadResult = await uploadLocalFile(req.file.path);
      if (uploadResult) {
        if (member.profileImage && member.profileImage.public_id) {
          await deleteLocalFile(member.profileImage.public_id);
        }
        member.profileImage = {
          public_id: uploadResult.public_id,
          url: uploadResult.url,
        };
      }
    }

    await member.save();

    const updatedMember = await Member.findById(member._id).populate(
      "user",
      "fullName email mobile dob address state district profileImage gender",
    );

    res
      .status(200)
      .json({
        success: true,
        message: "Profile updated successfully",
        member: updatedMember,
      });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.createMemberDirectly = async (req, res) => {
  try {
    const {
      fullName,
      email,
      mobile,
      password,
      guardianName,
      guardianMobile,
      bloodGroup,
      profession,
      aadharNo,
      idProofType,
      roleApplied,
      paymentAmount,
      transactionId,
    } = req.body;
    const bcrypt = require("bcryptjs");

    if (!fullName || !email || !mobile) {
      return res
        .status(400)
        .json({
          success: false,
          message: "Please provide fullName, email, and mobile",
        });
    }

    // 1. Check if user exists
    let user = await User.findOne({ $or: [{ email }, { mobile }] });
    if (!user) {
      // Create user
      if (!password) {
        return res
          .status(400)
          .json({
            success: false,
            message: "Please provide a password for the new user account",
          });
      }
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      user = await User.create({
        fullName,
        email,
        mobile,
        password: hashedPassword,
        role: "member",
      });
    } else {
      if (user.role === "volunteer") {
        return res.status(400).json({ success: false, message: "This Email or Phone is already registered as a Volunteer. A Volunteer cannot be created as a Member." });
      }
      if (user.email !== email || user.mobile !== mobile) {
        return res.status(400).json({ success: false, message: `User found but Email or Phone doesn't match completely. Existing Email: ${user.email}, Phone: ${user.mobile}` });
      }
      user.role = "member";
      await user.save();
    }

    // 2. Check if member already exists for this user
    const existingMember = await Member.findOne({ user: user._id });
    if (existingMember) {
      return res
        .status(400)
        .json({ success: false, message: "This user is already a member" });
    }

    const memberId = generateMemberId();

    // 3. Create member (auto-approved since admin is adding)
    const member = await Member.create({
      user: user._id,
      memberId,
      arabicName: arabicName || "",
      fathersName: fathersName || "",
      whatsappNumber: whatsappNumber || "",
      bloodGroup: bloodGroup || "",
      faculty: faculty || "",
      degree: degree || "",
      specialization: specialization || "",
      graduationYear: graduationYear || "",
      
      currentInstitution: currentInstitution || "",
      city: city || "",
      postalCode: postalCode || "",
      createdBy: req.user.id,
      membershipStatus: "approved",
    });

    // 4. Generate QR Code
    const verificationLink = `${process.env.FRONTEND_URL || "https://rabbi.co.in/"}/verify-member/${member.memberId}`;
    member.qrCode = await QRCode.toDataURL(verificationLink);
    await member.save();

    // Auto-generate Appointment Letter
    try {
      await generateAndSaveAppointmentLetter({
        memberId: member._id,
        designation: "Member",
        department: "General",
        joiningDate: Date.now(),
        protocol: req.protocol,
        host: req.get("host"),
      });
    } catch (letterErr) {
      console.error("Failed to generate appointment letter:", letterErr);
    }

    const populatedMember = await Member.findById(member._id).populate(
      "user",
      "fullName email mobile role",
    );

    // Send Email Notification
    if (populatedMember.user && populatedMember.user.email) {
      const userEmail = populatedMember.user.email;
      const userName = populatedMember.user.fullName;
      const siteName = await getSiteName();
      const loginInfo = !password
        ? ""
        : `\nYour account has been created with this email. Password: ${password}\n`;
      const loginInfoHtml = !password
        ? ""
        : `<p>Your account has been created with this email. Password: <strong>${password}</strong></p>`;
      try {
        SendVerificationCode(
          userEmail,
          `<p>Dear ${userName},</p><p>Your membership has been successfully created by the administration.</p><p>Your unique Member ID is: <strong>${member.memberId}</strong></p>${loginInfoHtml}<p>You can log in to the Member Dashboard to access your profile, ID card, and exclusive features.</p><p>Welcome to the team!</p><p>Best Regards,<br/>${siteName} Team</p>`,
          `Welcome to ${siteName} - Membership Created`,
          `Dear ${userName},\n\nYour membership has been successfully created by the administration.\nYour unique Member ID is: ${member.memberId}\n${loginInfo}\nYou can log in to the Member Dashboard to access your profile, ID card, and exclusive features.\n\nWelcome to the team!\n\nBest Regards,\n${siteName} Team`,
        );
      } catch (emailError) {
        console.error("Error sending creation email:", emailError);
      }
    }

    res
      .status(201)
      .json({
        success: true,
        message: "Member created successfully",
        member: populatedMember,
      });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.verifyPublicMember = async (req, res) => {
  try {
    const { memberId } = req.params;
    const member = await Member.findOne({
      memberId: { $regex: new RegExp(`^${memberId.trim()}$`, "i") },
    }).populate("user", "fullName email mobile profileImage");

    if (!member) {
      return res
        .status(404)
        .json({ success: false, message: "Member record not found" });
    }

    res.status(200).json({
      success: true,
      verified: member.membershipStatus === "approved",
      member: {
        memberId: member.memberId,
        fullName: member.user?.fullName || "N/A",
        guardianName: member.guardianName,
        profileImage: member.profileImage?.url || member.user?.profileImage?.url || "",
        profession: member.profession,
        roleApplied: member.roleApplied,
        joiningDate: member.joiningDate,
        membershipStatus: member.membershipStatus,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.deleteMemberAdmin = async (req, res) => {
  try {
    const member = await Member.findById(req.params.id);
    if (!member)
      return res
        .status(404)
        .json({ success: false, message: "Member not found" });

    await Member.findByIdAndDelete(req.params.id);

    res
      .status(200)
      .json({ success: true, message: "Member deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.updateMemberAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    const member = await Member.findById(id).populate("user");
    if (!member)
      return res
        .status(404)
        .json({ success: false, message: "Member not found" });

    const {
      fullName,
      email,
      mobile,
      password,
      guardianName,
      guardianMobile,
      bloodGroup,
      profession,
      aadharNo,
      idProofType,
      roleApplied,
      paymentAmount,
      transactionId,
      state,
      district,
      dob,
      address,
    } = req.body;

    const memberUpdate = {
      ...(guardianName !== undefined && { guardianName }),
      ...(guardianMobile !== undefined && { guardianMobile }),
      ...(bloodGroup !== undefined && { bloodGroup }),
      ...(profession !== undefined && { profession }),
      ...(aadharNo !== undefined && { aadharNo }),
      ...(idProofType !== undefined && { idProofType }),
      ...(roleApplied !== undefined && { roleApplied }),
      ...(paymentAmount !== undefined && { paymentAmount }),
      ...(transactionId !== undefined && { transactionId }),
    };

    if (Object.keys(memberUpdate).length > 0) {
      await Member.findByIdAndUpdate(id, memberUpdate);
    }

    const userUpdate = {
      ...(fullName !== undefined && { fullName }),
      ...(email !== undefined && { email }),
      ...(mobile !== undefined && { mobile }),
      ...(state !== undefined && { state }),
      ...(district !== undefined && { district }),
      ...(dob !== undefined && { dob }),
      ...(address !== undefined && { address }),
    };

    if (password) {
      const bcrypt = require("bcryptjs");
      userUpdate.password = await bcrypt.hash(password, 10);
    }

    if (Object.keys(userUpdate).length > 0) {
      const mongoose = require("mongoose");
      const User = mongoose.model("User");
      await User.findByIdAndUpdate(member.user._id, userUpdate);
    }

    res
      .status(200)
      .json({ success: true, message: "Member updated successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.publicApplyMembership = async (req, res) => {
  try {
    const {
      fullName,
      email,
      mobile,
      password,
      guardianName,
      guardianMobile,
      bloodGroup,
      profession,
      aadharNo,
      idProofType,
      roleApplied,
      paymentAmount,
      transactionId,
      state,
      district,
      dob,
      address,
      gender,
    } = req.body;
    const bcrypt = require("bcryptjs");
    const User = require("../models/User");
    const jwt = require("jsonwebtoken");

    const generateToken = (id) => {
      return jwt.sign({ id }, process.env.JWT_SECRET || 'secret123', {
          expiresIn: "30d",
      });
    };

    if (!fullName || !email || !mobile || !password) {
      return res
        .status(400)
        .json({
          success: false,
          message: "Please provide Full Name, Email, Mobile, and Password",
        });
    }

    // 1. Check if user exists
    let user = await User.findOne({ $or: [{ email }, { mobile }] });
    if (!user) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      user = await User.create({
        fullName,
        email,
        mobile,
        password: hashedPassword,
        role: "member",
        state,
        district,
        dob,
        address,
        gender,
      });
    } else {
      return res.status(400).json({ success: false, message: "An account with this Email or Mobile already exists. Please login to apply." });
    }

    // 2. Check if member already exists for this user
    const existingMember = await Member.findOne({ user: user._id });
    if (existingMember && existingMember.membershipStatus !== "rejected") {
      return res
        .status(400)
        .json({ success: false, message: "This user has already applied for membership" });
    }

    const memberId = generateMemberId();

    const { uploadLocalFile } = require("../utils/fileUpload");
    // Handle profileImage upload
    let profileImage = { public_id: "", url: "" };
    const profileFile = req.files && req.files["profileImage"] ? req.files["profileImage"][0] : null;
    if (profileFile) {
      const uploadResult = await uploadLocalFile(profileFile.path);
      if (uploadResult) {
        profileImage = { public_id: uploadResult.public_id, url: uploadResult.url };
      }
    }

    // Handle idProof upload
    let idProof = { public_id: "", url: "" };
    const idProofFile = req.files && req.files["idProof"] ? req.files["idProof"][0] : null;
    if (idProofFile) {
      const uploadResult = await uploadLocalFile(idProofFile.path);
      if (uploadResult) {
        idProof = { public_id: uploadResult.public_id, url: uploadResult.url };
      }
    }

    
    let otherDoc = { public_id: "", url: "" };
    const otherDocFile = req.files && req.files["otherDoc"] ? req.files["otherDoc"][0] : null;
    if (otherDocFile) {
      const uploadResult = await uploadLocalFile(otherDocFile.path);
      if (uploadResult) {
        otherDoc = { public_id: uploadResult.public_id, url: uploadResult.url };
      }
    }
    let paymentScreenshot = { public_id: "", url: "" };
    const paymentFile = req.files && req.files["paymentScreenshot"] ? req.files["paymentScreenshot"][0] : null;
    if (paymentFile) {
      const uploadResult = await uploadLocalFile(paymentFile.path);
      if (uploadResult) {
        paymentScreenshot = { public_id: uploadResult.public_id, url: uploadResult.url };
      }
    }


    let member;
    if (existingMember) {
      existingMember.guardianName = guardianName || "";
      existingMember.guardianMobile = guardianMobile || "";
      existingMember.bloodGroup = bloodGroup || "";
      existingMember.profession = profession || "";
      existingMember.aadharNo = aadharNo || "";
      existingMember.idProofType = idProofType || "";
      existingMember.roleApplied = roleApplied || "";
      existingMember.paymentAmount = paymentAmount ? Number(paymentAmount) : 0;
      existingMember.transactionId = transactionId || "";
      if(profileImage.url) existingMember.profileImage = profileImage;
      if(idProof.url) existingMember.idProof = idProof;
      if(otherDoc.url) existingMember.otherDoc = otherDoc;
      if(paymentScreenshot.url) existingMember.paymentScreenshot = paymentScreenshot;
      existingMember.membershipStatus = "pending";
      existingMember.rejectionReason = "";
      await existingMember.save();
      member = existingMember;
    } else {
      member = await Member.create({
        user: user._id,
        memberId,
        guardianName: guardianName || "",
      guardianMobile: guardianMobile || "",
      bloodGroup: bloodGroup || "",
      profession: profession || "",
      aadharNo: aadharNo || "",
      idProofType: idProofType || "",
      roleApplied: roleApplied || "",
      paymentAmount: paymentAmount ? Number(paymentAmount) : 0,
      transactionId: transactionId || "",
        profileImage,
        idProof,
        otherDoc,
        paymentScreenshot,
        membershipStatus: "pending",
      });
    }

    const token = generateToken(user._id);

    const options = {
      expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      httpOnly: true,
    };

    res.status(201).cookie("token", token, options).json({
      success: true,
      token,
      user: {
        _id: user._id,
        fullName: user.fullName,
        email: user.email,
        role: user.role,
      },
      message: "Membership application submitted successfully. You have been logged in.",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
