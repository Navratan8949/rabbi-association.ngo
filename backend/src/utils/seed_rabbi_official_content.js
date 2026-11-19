const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "../../.env") });

const Project = require("../models/Project");
const Crowdfunding = require("../models/Crowdfunding");
const Event = require("../models/Event");
const News = require("../models/News");
const Award = require("../models/Award");
const Download = require("../models/Download");
const Gallery = require("../models/Gallery");
const Newsletter = require("../models/Newsletter");

async function seedRabbiOfficial() {
  try {
    console.log("=================================================");
    console.log("RABBI ASSOCIATION — OFFICIAL CONTENT SYNC SCRIPT");
    console.log("=================================================");
    console.log("Connecting to MongoDB via MONGODB_URI...");
    await mongoose.connect(process.env.MONGODB_URI);
    console.log(`Connected to Database: [${mongoose.connection.name}] successfully!\n`);

    // STEP 1: SAFETY BACKUP OF AFFECTED COLLECTIONS
    const backupDir = path.join(__dirname, "../../backups");
    if (!fs.existsSync(backupDir)) fs.mkdirSync(backupDir, { recursive: true });
    
    const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
    const backupFile = path.join(backupDir, `content_backup_${timestamp}.json`);

    console.log("Creating safety backup of existing marketing/content records...");
    const oldBackup = {
      projects: await Project.find({}).lean(),
      crowdfundings: await Crowdfunding.find({}).lean(),
      events: await Event.find({}).lean(),
      news: await News.find({}).lean(),
      awards: await Award.find({}).lean(),
      downloads: await Download.find({}).lean(),
      gallery: await Gallery.find({}).lean()
    };
    fs.writeFileSync(backupFile, JSON.stringify(oldBackup, null, 2));
    console.log(`Backup safely saved at: ${backupFile}`);
    console.log(`NOTE: Users, Members, Donations, Volunteers, and Appointments are UNTOUCHED!\n`);

    // 1. PROJECTS / PROGRAMMES & SERVICES (Brochure & Docx Section 3)
    console.log("Syncing Projects / Programmes & Services...");
    await Project.deleteMany({});
    const projectsData = [
      {
        title: "School Transformation Mission: Infrastructure, Digital Labs & Smart Classrooms",
        description: "Transforming schools serving poor and marginalized communities through classroom modernization, safe drinking water, smart digital learning facilities, libraries, and inclusive learning environments.",
        image: { public_id: "classroom", url: "/rabbi-context/focus_1.jpg" },
        status: "active",
        isFeatured: true,
        startDate: new Date("2026-01-15"),
        translations: {
          en: {
            title: "School Transformation Mission: Infrastructure, Digital Labs & Smart Classrooms",
            description: "Transforming schools serving poor and marginalized communities through classroom modernization, safe drinking water, smart digital learning facilities, libraries, and inclusive learning environments."
          },
          hi: {
            title: "स्कूल रूपांतरण मिशन: बुनियादी ढांचा, डिजिटल लैब और स्मार्ट कक्षाएं",
            description: "कमजोर और वंचित समुदायों के स्कूलों का आधुनिकीकरण, सुरक्षित पेयजल, स्मार्ट डिजिटल शिक्षण सुविधाएं, पुस्तकालय और समावेशी सीखने का माहौल तैयार करना।"
          },
          ur: {
            title: "اسکول ٹرانسفارمیشن مشن: بنیادی ڈھانچہ، ڈیجیٹل لیبز اور سمارٹ کلاس رومز",
            description: "پسماندہ طبقات کے اسکولوں کی جدید کاری، پینے کے صاف پانی کی فراہمی، سمارٹ ڈیجیٹل تعلیمی سہولیات اور جامع تعلیمی ماحول کا قیام۔"
          },
          ar: {
            title: "مهمة تحويل المدارس: البنية التحتية، المختبرات الرقمية والفصول الذكية",
            description: "تطوير وتحديث المدارس التي تخدم المجتمعات المحرومة من خلال الفصول الذكية، المياه الصالحة للشرب، والمكتبات والبيئات التعليمية الشاملة."
          }
        }
      },
      {
        title: "Government Schemes to Citizens: Direct Welfare Guidance & Helpdesk",
        description: "Connecting eligible citizens from SC, ST, Dalit, Minority, and economically weaker households with central and state government welfare schemes, scholarships, and social security entitlements.",
        image: { public_id: "govt_schemes", url: "/rabbi-context/focus_2.jpg" },
        status: "active",
        isFeatured: true,
        startDate: new Date("2026-02-01"),
        translations: {
          en: {
            title: "Government Schemes to Citizens: Direct Welfare Guidance & Helpdesk",
            description: "Connecting eligible citizens from SC, ST, Dalit, Minority, and economically weaker households with central and state government welfare schemes, scholarships, and social security entitlements."
          },
          hi: {
            title: "नागरिकों तक सरकारी योजनाएं: प्रत्यक्ष कल्याणकारी मार्गदर्शन और हेल्पडेस्क",
            description: "अनुसूचित जाति, अनुसूचित जनजाति, दलित, अल्पसंख्यक और आर्थिक रूप से कमजोर परिवारों को केंद्र और राज्य सरकार की कल्याणकारी योजनाओं, छात्रवृत्तियों और सामाजिक सुरक्षा से जोड़ना।"
          },
          ur: {
            title: "شہریوں کے لیے حکومتی اسکیمیں: براہ راست رہنمائی اور ہیلپ ڈیسک",
            description: "پسماندہ اور کمزور طبقات کو مرکزی و ریاستی حکومت کی فلاحی اسکیموں، وظائف اور سماجی تحفظ سے جوڑنے کی باقاعدہ رہنمائی۔"
          },
          ar: {
            title: "المبادرات الحكومية للمواطنين: التوجيه المباشر ومكتب المساعدة",
            description: "ربط المواطنين المؤهلين من الفئات الأشد احتياجاً بالبرامج الحكومية، المنح الدراسية وحزم الضمان الاجتماعي الرسمية."
          }
        }
      },
      {
        title: "Legal Assistance, Child Protection & Access to Justice Initiative",
        description: "Promoting legal awareness, referrals to legal services authorities, protection against exploitation, prevention of child labour and child marriage, and standing for human dignity.",
        image: { public_id: "legal_aid", url: "/rabbi-context/focus_3.jpg" },
        status: "active",
        isFeatured: true,
        startDate: new Date("2026-03-01"),
        translations: {
          en: {
            title: "Legal Assistance, Child Protection & Access to Justice Initiative",
            description: "Promoting legal awareness, referrals to legal services authorities, protection against exploitation, prevention of child labour and child marriage, and standing for human dignity."
          },
          hi: {
            title: "कानूनी सहायता, बाल संरक्षण और न्याय तक पहुंच पहल",
            description: "कानूनी जागरूकता, विधिक सेवा प्राधिकरणों को रेफरल, शोषण से सुरक्षा, बाल श्रम व बाल विवाह की रोकथाम और मानवीय गरिमा की रक्षा करना।"
          },
          ur: {
            title: "قانونی امداد، بچوں کا تحفظ اور انصاف تک رسائی کی مہم",
            description: "قانونی آگاہی، مفت قانونی خدمات کے اداروں تک رسائی، بچوں کے استحصال، چائلڈ لیبر اور کم عمری کی شادی کی روک تھام۔"
          },
          ar: {
            title: "المساعدة القانونية، حماية الطفل والوصول إلى العدالة",
            description: "تعزيز الوعي القانوني، الإحالة إلى هيئات المعونة القانونية، حماية الأطفال من عمالة الأطفال والزواج المبكر وصون الكرامة الإنسانية."
          }
        }
      },
      {
        title: "Educational Institution Development & Board Affiliation Guidance",
        description: "Providing professional guidance, administrative capacity-building, documentation support, and quality improvement for schools seeking CBSE, ICSE, State Board, or Minority status recognition.",
        image: { public_id: "inst_dev", url: "/rabbi-context/focus_4.jpg" },
        status: "active",
        isFeatured: false,
        startDate: new Date("2026-02-15"),
        translations: {
          en: {
            title: "Educational Institution Development & Board Affiliation Guidance",
            description: "Providing professional guidance, administrative capacity-building, documentation support, and quality improvement for schools seeking CBSE, ICSE, State Board, or Minority status recognition."
          },
          hi: {
            title: "शैक्षणिक संस्थान विकास और बोर्ड संबद्धता मार्गदर्शन",
            description: "सीबीएसई, आईसीएसई, स्टेट बोर्ड या अल्पसंख्यक मान्यता चाहने वाले स्कूलों को पेशेवर मार्गदर्शन, प्रशासनिक क्षमता निर्माण और प्रलेखन सहायता प्रदान करना।"
          },
          ur: {
            title: "تعلیمی اداروں کی ترقی اور الحاق کی رہنمائی",
            description: "سی بی ایس ای، آئی سی ایس ای اور ریاستی بورڈز سے الحاق و تسلیم کے عمل کے لیے اسکولوں کو انتظامی رہنمائی اور کاغذی کارروائی میں مدد۔"
          },
          ar: {
            title: "تطوير المؤسسات التعليمية والتوجيه للاعتماد الأكاديمي",
            description: "تقديم الاستشارات المهنية، وبناء القدرات الإدارية، ودعم الوثائق للمدارس الساعية للحصول على الاعتمادات الرسمية."
          }
        }
      },
      {
        title: "Youth Vocational Training, IT Literacy & Employment Skills",
        description: "Equipping young men and women with computer literacy, job-oriented technical skills, vocational certifications, and career counseling to foster self-reliance and sustainable livelihoods.",
        image: { public_id: "vocational", url: "/rabbi-context/focus_5.jpg" },
        status: "active",
        isFeatured: false,
        startDate: new Date("2026-01-20"),
        translations: {
          en: {
            title: "Youth Vocational Training, IT Literacy & Employment Skills",
            description: "Equipping young men and women with computer literacy, job-oriented technical skills, vocational certifications, and career counseling to foster self-reliance and sustainable livelihoods."
          },
          hi: {
            title: "युवा व्यावसायिक प्रशिक्षण, आईटी साक्षरता और रोजगार कौशल",
            description: "युवाओं को कंप्यूटर साक्षरता, रोजगारपरक तकनीकी कौशल, व्यावसायिक प्रमाणन और करियर काउंसलिंग से सशक्त बनाकर आत्मनिर्भर बनाना।"
          },
          ur: {
            title: "نوجوانوں کی پیشہ ورانہ تربیت، آئی ٹی خواندگی اور روزگار کے مواقع",
            description: "نوجوانوں کو کمپیوٹر لٹریسی، تکنیکی مہارت اور پیشہ ورانہ تربیت فراہم کر کے روزگار اور خود کفالت کے قابل بنانا۔"
          },
          ar: {
            title: "التدريب المهني للشباب، محو الأمية الرقمية والمهارات الوظيفية",
            description: "تزويد الشباب بالمهارات التقنية والمعلوماتية، والشهادات المهنية والتوجيه المهني لتعزيز الاستقلال المالي والتنمية المستدامة."
          }
        }
      },
      {
        title: "Community Healthcare Awareness, Mobile Medical Relief & Preventive Care",
        description: "Organizing free health education camps, preventive medical screening, eye-care, nutrition support for children and mothers, and referrals for advanced healthcare treatments.",
        image: { public_id: "healthcare", url: "/rabbi-context/focus_6.jpg" },
        status: "active",
        isFeatured: false,
        startDate: new Date("2026-03-10"),
        translations: {
          en: {
            title: "Community Healthcare Awareness, Mobile Medical Relief & Preventive Care",
            description: "Organizing free health education camps, preventive medical screening, eye-care, nutrition support for children and mothers, and referrals for advanced healthcare treatments."
          },
          hi: {
            title: "सामुदायिक स्वास्थ्य जागरूकता, सचल चिकित्सा राहत और निवारक देखभाल",
            description: "निःशुल्क स्वास्थ्य शिक्षा शिविर, निवारक चिकित्सा जांच, नेत्र जांच, बच्चों व माताओं के लिए पोषण सहायता और उन्नत उपचार के लिए मार्गदर्शन।"
          },
          ur: {
            title: "کمیونٹی ہیلتھ کیئر بیداری اور موبائل میڈیکل ریلیف کیمپ",
            description: "مفت طبی کیمپوں کا انعقاد، بنیادی صحت کی دیکھ بھال، غذائی امداد اور ضرورت مندوں کے لیے ہسپتالوں میں علاج کی رہنمائی۔"
          },
          ar: {
            title: "التوعية الصحية المجتمعية، الإغاثة الطبية المتنقلة والرعاية الوقائية",
            description: "تنظيم مخيمات صحية مجانية، وفحوصات وقائية ودعم التغذية للأطفال والأمهات والإحالة للعلاج التخصصي."
          }
        }
      }
    ];
    await Project.insertMany(projectsData);
    console.log(`✓ Seeded ${projectsData.length} projects successfully!`);

    // 2. CROWDFUNDING / CAMPAIGNS (Docx Section 8 & Section 9)
    console.log("Syncing Crowdfunding Campaigns...");
    await Crowdfunding.deleteMany({});
    const campaignsData = [
      {
        title: "School Transformation Mission: Smart Classrooms, Science Labs & Clean Sanitation",
        description: "Help us modernize 10 rural and disadvantaged schools with safe drinking water, gender-segregated toilets, STEM science kits, smart classroom projectors, and dynamic libraries.",
        story: "Under our flagship School Transformation Mission, Rabbi Association works directly with under-resourced schools to create safe, dignified, and joyful learning environments. In many rural localities, schools lack functional toilets, safe drinking water, and basic digital learning resources, causing high dropout rates. Your contribution provides classroom repairs, science laboratory kits, solar backup, clean water filtration units, and child-friendly furniture, transforming the daily learning experience of over 1,500 children.",
        category: "School Transformation",
        beneficiary: "1,500+ Rural School Children & Teachers across 10 Schools",
        organizer: "Rabbi Association - Education Infrastructure Committee",
        image: { public_id: "cf_schools", url: "/rabbi-context/focus_1.jpg" },
        targetAmount: 1000000,
        raisedAmount: 680000,
        donorsCount: 142,
        status: "active",
        isFeatured: true,
        translations: {
          en: {
            title: "School Transformation Mission: Smart Classrooms, Science Labs & Clean Sanitation",
            description: "Help us modernize 10 rural and disadvantaged schools with safe drinking water, gender-segregated toilets, STEM science kits, smart classroom projectors, and dynamic libraries.",
            story: "Under our flagship School Transformation Mission, Rabbi Association works directly with under-resourced schools to create safe, dignified, and joyful learning environments. In many rural localities, schools lack functional toilets, safe drinking water, and basic digital learning resources, causing high dropout rates. Your contribution provides classroom repairs, science laboratory kits, solar backup, clean water filtration units, and child-friendly furniture, transforming the daily learning experience of over 1,500 children."
          },
          hi: {
            title: "स्कूल रूपांतरण मिशन: स्मार्ट कक्षाएं, विज्ञान प्रयोगशालाएं और स्वच्छ स्वच्छता",
            description: "10 ग्रामीण और वंचित स्कूलों को सुरक्षित पेयजल, बालिकाओं के लिए पृथक शौचालय, एसटीईएम विज्ञान किट और स्मार्ट डिजिटल कक्षाओं से आधुनिक बनाने में सहयोग करें।",
            story: "रब्बी एसोसिएशन का स्कूल रूपांतरण मिशन कमजोर स्कूलों में सुरक्षित, गरिमापूर्ण और प्रभावी शिक्षण वातावरण बनाने के लिए समर्पित है। आपका दान 1,500 से अधिक बच्चों के भविष्य को संवारने में मदद करता है।"
          },
          ur: {
            title: "اسکول ٹرانسفارمیشن مشن: سمارٹ کلاس رومز، سائنس لیبز اور صاف ستھرا ماحول",
            description: "10 دیہی اسکولوں کو پینے کے صاف پانی، سائنسی کٹس، سمارٹ کلاس رومز اور ڈیجیٹل لائبریریوں سے آراستہ کرنے کے لیے تعاون کریں۔"
          },
          ar: {
            title: "مهمة تحويل المدارس: فصول ذكية، مختبرات علمية ومرافق صحية نظيفة",
            description: "ساعدنا في تطوير وتحديث 10 مدارس ريفية بالمياه النقية، والمختبرات العلمية وأجهزة العرض الرقمية والمكتبات الحديثة."
          }
        }
      },
      {
        title: "Digital Learning & Educational Resources Drive for Disadvantaged Students",
        description: "Bridging the digital divide by equipping rural classrooms with desktop computers, educational software, interactive displays, and curated reading libraries.",
        story: "In an era of rapid digital evolution, children from underprivileged backgrounds risk falling behind due to lack of technology access. This campaign delivers 50 desktop computers, licensed e-learning content, offline educational servers, and over 2,500 curriculum and story books across 12 community study centers, opening doors of global knowledge and career readiness.",
        category: "Digital Learning",
        beneficiary: "800+ Students across 12 Community Centers",
        organizer: "Rabbi Association - Digital Empowerment Wing",
        image: { public_id: "cf_digital", url: "/rabbi-context/focus_4.jpg" },
        targetAmount: 500000,
        raisedAmount: 375000,
        donorsCount: 96,
        status: "active",
        isFeatured: true,
        translations: {
          en: {
            title: "Digital Learning & Educational Resources Drive for Disadvantaged Students",
            description: "Bridging the digital divide by equipping rural classrooms with desktop computers, educational software, interactive displays, and curated reading libraries."
          },
          hi: {
            title: "वंचित विद्यार्थियों के लिए डिजिटल शिक्षा और शैक्षिक संसाधन अभियान",
            description: "ग्रामीण कक्षाओं को कंप्यूटर, इंटरैक्टिव डिस्प्ले और समृद्ध पुस्तकालयों से लैस करके डिजिटल खाई को पाटना।"
          },
          ur: {
            title: "ضرورت مند طلبہ کے لیے ڈیجیٹل لرننگ اور تعلیمی وسائل کی فراہمی",
            description: "دیہی اور پسماندہ طلبہ کو کمپیوٹر، ڈیجیٹل اسکرینز اور کتابوں سے آراستہ کر کے جدید تعلیم سے روشناس کرانا۔"
          },
          ar: {
            title: "حملة التعليم الرقمي والموارد التعليمية للطلاب المحرومين",
            description: "سد الفجوة الرقمية من خلال تزويد المدارس بأجهزة الكمبيوتر، والبرمجيات التعليمية والمكتبات الغنية بالكتب."
          }
        }
      },
      {
        title: "Child Protection & Retention Fund: Ending Child Labour & Child Marriage",
        description: "Supporting at-risk children with full school kits, uniforms, tuition support, and family counseling to ensure school retention and protect childhood dignity.",
        story: "Economic hardship often forces children into child labour or early marriage. Through this targeted fund, Rabbi Association identifies vulnerable families in distress, covers complete educational expenses (uniforms, bags, books, shoes, nutrition), and provides legal awareness and parental counseling to keep children safely inside formal schools.",
        category: "Child Protection",
        beneficiary: "250 Vulnerable Children & Single-Parent Families",
        organizer: "Rabbi Association - Social Justice & Welfare Division",
        image: { public_id: "cf_child", url: "/rabbi-context/about_us_classroom.jpg" },
        targetAmount: 450000,
        raisedAmount: 290000,
        donorsCount: 88,
        status: "active",
        isFeatured: false,
        translations: {
          en: {
            title: "Child Protection & Retention Fund: Ending Child Labour & Child Marriage",
            description: "Supporting at-risk children with full school kits, uniforms, tuition support, and family counseling to ensure school retention and protect childhood dignity."
          },
          hi: {
            title: "बाल संरक्षण एवं शिक्षा निरंतरता कोष: बाल श्रम और बाल विवाह की रोकथाम",
            description: "जोखिम वाले बच्चों को पूर्ण शैक्षिक किट, वर्दी, शिक्षण सहायता और परिवार परामर्श प्रदान कर स्कूल में बनाए रखना।"
          },
          ur: {
            title: "چائلڈ پروٹیکشن فنڈ: چائلڈ لیبر اور کم عمری کی شادی کا خاتمہ",
            description: "غریب بچوں کو یونیفارم، کتابیں اور وظائف فراہم کر کے اسکول میں برقرار رکھنا اور استحصال سے تحفظ دینا۔"
          },
          ar: {
            title: "صندوق حماية الطفل واستمرار التعليم: القضاء على عمالة الأطفال والزواج المبكر",
            description: "دعم الأطفال الأكثر عرضة للخطر بالحقائب المدرسية، والزي المدرسي والإرشاد الأسري لضمان استمرارهم في التعليم."
          }
        }
      },
      {
        title: "Community Healthcare Awareness, Mobile Medical Relief & Preventive Screening",
        description: "Funding regular mobile healthcare clinics, free diagnostic tests, critical medicines, and doctor consultations for elderly and low-income families in rural villages.",
        story: "Quality primary healthcare remains inaccessible for thousands of rural families. This initiative deploys qualified doctors, medical volunteers, and essential diagnostic gear to conduct monthly screening camps, distribute free prescribed medicines, test for hypertension and diabetes, and refer acute patients to tertiary charitable hospitals.",
        category: "Healthcare & Relief",
        beneficiary: "3,000+ Villagers, Women & Senior Citizens",
        organizer: "Rabbi Association - Health & Humanitarian Assistance Wing",
        image: { public_id: "cf_health", url: "/rabbi-context/focus_6.jpg" },
        targetAmount: 600000,
        raisedAmount: 420000,
        donorsCount: 115,
        status: "active",
        isFeatured: false,
        translations: {
          en: {
            title: "Community Healthcare Awareness, Mobile Medical Relief & Preventive Screening",
            description: "Funding regular mobile healthcare clinics, free diagnostic tests, critical medicines, and doctor consultations for elderly and low-income families in rural villages."
          },
          hi: {
            title: "सामुदायिक स्वास्थ्य जागरूकता, सचल चिकित्सा राहत और निवारक जांच अभियान",
            description: "ग्रामीण गांवों में बुजुर्गों और कमजोर परिवारों के लिए नियमित सचल चिकित्सा क्लिनिक, मुफ्त जांच और दवा वितरण।"
          },
          ur: {
            title: "کمیونٹی ہیلتھ کیئر اور موبائل میڈیکل ریلیف مہم",
            description: "دیہی علاقوں میں بزرگوں اور غریب خاندانوں کے لیے مفت طبی معائنہ، ادویات کی فراہمی اور موبائل کلینک کا قیام۔"
          },
          ar: {
            title: "التوعية الصحية المجتمعية، الإغاثة الطبية المتنقلة والفحص الوقائي",
            description: "تمويل العيادات الطبية المتنقلة، والفحوصات التشخيصية المجانية وتوزيع الأدوية الأساسية لكبار السن والأسر الفقيرة."
          }
        }
      }
    ];
    await Crowdfunding.insertMany(campaignsData);
    console.log(`✓ Seeded ${campaignsData.length} crowdfunding campaigns successfully!`);

    // 3. EVENTS (Docx Sections)
    console.log("Syncing Events...");
    await Event.deleteMany({});
    const eventsData = [
      {
        title: "National Conference on School Transformation & Inclusive Education",
        description: "A premier national assembly bringing together educators, school trustees, policy advisors, and CSR leaders to deliberate on modernizing rural schools, digital learning infrastructure, and child-friendly learning environments.",
        location: "India International Centre, New Delhi",
        eventDate: new Date("2026-12-10T09:30:00Z"),
        registrationLastDate: new Date("2026-12-05T18:00:00Z"),
        maxParticipants: 350,
        status: "upcoming",
        image: { public_id: "evt_conf", url: "/rabbi-context/focus_1.jpg" },
        translations: {
          en: {
            title: "National Conference on School Transformation & Inclusive Education",
            description: "A premier national assembly bringing together educators, school trustees, policy advisors, and CSR leaders to deliberate on modernizing rural schools, digital learning infrastructure, and child-friendly learning environments."
          },
          hi: {
            title: "स्कूल रूपांतरण और समावेशी शिक्षा पर राष्ट्रीय सम्मेलन",
            description: "ग्रामीण स्कूलों के आधुनिकीकरण, डिजिटल बुनियादी ढांचे और समावेशी शिक्षा पर विचार-विमर्श करने हेतु शिक्षाविदों, ट्रस्टियों और सीएसआर प्रतिनिधियों का राष्ट्रीय सम्मेलन।"
          },
          ur: {
            title: "اسکول ٹرانسفارمیشن اور جامع تعلیم پر قومی کانفرنس",
            description: "دیہی اسکولوں کی جدید کاری اور ڈیجیٹل تعلیمی انفراسٹرکچر پر مبنی تعلیمی ماہرین اور ٹرسٹیز کی قومی کانفرنس۔"
          },
          ar: {
            title: "المؤتمر الوطني لتحويل المدارس والتعليم الشامل",
            description: "مؤتمر وطني يجمع قادة التعليم، أمناء المدارس وممثلي المسؤولية المجتمعية لمناقشة تطوير المدارس الريفية والتعليم الرقمي."
          }
        }
      },
      {
        title: "Symposium on Legal Assistance, Human Rights & Citizen Protections",
        description: "Empowering disadvantaged communities with clear knowledge of legal aid entitlements, constitutional rights, grievance redressal mechanisms, and child protection frameworks.",
        location: "Constitution Club of India, New Delhi",
        eventDate: new Date("2026-11-28T10:00:00Z"),
        registrationLastDate: new Date("2026-11-24T18:00:00Z"),
        maxParticipants: 200,
        status: "upcoming",
        image: { public_id: "evt_legal", url: "/rabbi-context/focus_3.jpg" },
        translations: {
          en: {
            title: "Symposium on Legal Assistance, Human Rights & Citizen Protections",
            description: "Empowering disadvantaged communities with clear knowledge of legal aid entitlements, constitutional rights, grievance redressal mechanisms, and child protection frameworks."
          },
          hi: {
            title: "कानूनी सहायता, मानवाधिकार और नागरिक संरक्षण पर संगोष्ठी",
            description: "वंचित समुदायों को मुफ्त कानूनी सहायता, संवैधानिक अधिकारों, शिकायत निवारण और बाल संरक्षण तंत्र की सटीक जानकारी देना।"
          },
          ur: {
            title: "قانونی امداد، انسانی حقوق اور شہری تحفظات پر سمپوزیم",
            description: "پسماندہ طبقات کو مفت قانونی امداد کے حقوق، آئینی تحفظات اور انسانی وقار کی پاسداری سے آگاہ کرنے کی نشست۔"
          },
          ar: {
            title: "ندوة حول المساعدة القانونية، حقوق الإنسان وحماية المواطنين",
            description: "تمكين المجتمعات الضعيفة بالمعرفة القانونية وحقوق الإنسان وآليات الحماية القانونية الرسمية."
          }
        }
      },
      {
        title: "State Workshop on Government Schemes Awareness & Citizen Guidance",
        description: "Hands-on orientation workshop for community volunteers on guiding SC/ST, Dalit, Minority, and EWS families in applying for state welfare schemes and educational scholarships.",
        location: "Rabbi Association Regional Training Centre, Uttar Pradesh",
        eventDate: new Date("2026-12-22T10:00:00Z"),
        registrationLastDate: new Date("2026-12-18T18:00:00Z"),
        maxParticipants: 150,
        status: "upcoming",
        image: { public_id: "evt_schemes", url: "/rabbi-context/focus_2.jpg" },
        translations: {
          en: {
            title: "State Workshop on Government Schemes Awareness & Citizen Guidance",
            description: "Hands-on orientation workshop for community volunteers on guiding SC/ST, Dalit, Minority, and EWS families in applying for state welfare schemes and educational scholarships."
          },
          hi: {
            title: "सरकारी योजनाएं जागरूकता एवं नागरिक मार्गदर्शन राज्य कार्यशाला",
            description: "समुदायिक स्वयंसेवकों के लिए एससी/एसटी, अल्पसंख्यक और कमजोर परिवारों को सरकारी कल्याणकारी योजनाओं व छात्रवृत्तियों से जोड़ने हेतु व्यावहारिक कार्यशाला।"
          },
          ur: {
            title: "حکومتی فلاحی اسکیموں کی بیداری اور رہنمائی پر ریاستی ورکشاپ",
            description: "کمیونٹی ورکرز کے لیے حکومتی اسکالرشپس اور سماجی تحفظ کی اسکیموں کے لیے شہریوں کی رہنمائی کی تربیتی ورکشاپ۔"
          },
          ar: {
            title: "ورشة عمل حول التوعية بالمبادرات الحكومية وإرشاد المواطنين",
            description: "ورشة عمل تدريبية للمتطوعين حول كيفية إرشاد الأسر المستحقة للتقديم على المنح الدراسية والمبادرات الحكومية."
          }
        }
      },
      {
        title: "Teacher Capacity Building & Modern Pedagogy Workshop",
        description: "Professional development seminar equipping educators with student-centric teaching methodologies, remedial learning approaches, and digital classroom integration techniques.",
        location: "Educational Excellence Hall, Agra",
        eventDate: new Date("2026-12-30T09:00:00Z"),
        registrationLastDate: new Date("2026-12-25T18:00:00Z"),
        maxParticipants: 120,
        status: "upcoming",
        image: { public_id: "evt_teacher", url: "/rabbi-context/about_us_classroom.jpg" },
        translations: {
          en: {
            title: "Teacher Capacity Building & Modern Pedagogy Workshop",
            description: "Professional development seminar equipping educators with student-centric teaching methodologies, remedial learning approaches, and digital classroom integration techniques."
          },
          hi: {
            title: "शिक्षक क्षमता निर्माण और आधुनिक शिक्षण पद्धति कार्यशाला",
            description: "शिक्षकों को छात्र-केंद्रित शिक्षण विधियों, उपचारात्मक शिक्षण और डिजिटल कक्षा तकनीकों से समृद्ध करने वाला व्यावसायिक विकास सेमिनार।"
          },
          ur: {
            title: "اساتذہ کی صلاحیت سازی اور جدید تدریسی طریقوں پر ورکشاپ",
            description: "اساتذہ کو جدید تدریسی طریقوں اور ڈیجیٹل لرننگ ٹولز سے آراستہ کرنے والی خصوصی تربیتی ورکشاپ۔"
          },
          ar: {
            title: "ورشة عمل لبناء قدرات المعلمين وطرق التدريس الحديثة",
            description: "ندوة التطوير المهني لتزويد المعلمين باستراتيجيات التدريس المتطورة ودمج التكنولوجيا في الفصول الدراسية."
          }
        }
      }
    ];
    await Event.insertMany(eventsData);
    console.log(`✓ Seeded ${eventsData.length} events successfully!`);

    // 4. NEWS & PRESS RELEASES
    console.log("Syncing News...");
    await News.deleteMany({});
    const newsData = [
      {
        title: "Rabbi Association Unveils Nationwide School Transformation Mission for 2026-27",
        description: "Rabbi Association has formally announced its multi-state School Transformation Mission aiming to upgrade learning infrastructure, digital laboratories, and sanitation across 25 rural and underserved schools.\n\nSpeaking at the inauguration, the Founder emphasized that educational transformation must begin where the need is most acute. The Mission combines infrastructure upgrades, smart class technology, clean water filtration, and teacher orientation.",
        image: { public_id: "news_1", url: "/rabbi-context/focus_1.jpg" },
        category: "press_release",
        status: "published",
        publishedAt: new Date("2026-11-18"),
        translations: {
          en: {
            title: "Rabbi Association Unveils Nationwide School Transformation Mission for 2026-27",
            description: "Rabbi Association has formally announced its multi-state School Transformation Mission aiming to upgrade learning infrastructure, digital laboratories, and sanitation across 25 rural and underserved schools."
          },
          hi: {
            title: "रब्बी एसोसिएशन ने 2026-27 के लिए राष्ट्रव्यापी स्कूल रूपांतरण मिशन की घोषणा की",
            description: "रब्बी एसोसिएशन ने 25 ग्रामीण और वंचित स्कूलों के बुनियादी ढांचे, डिजिटल लैब और स्वच्छता सुविधाओं के उन्नयन हेतु राष्ट्रव्यापी स्कूल रूपांतरण मिशन की शुरुआत की।"
          },
          ur: {
            title: "ربی ایسوسی ایشن نے 2026-27 کے لیے ملک گیر اسکول ٹرانسفارمیشن مشن کا اعلان کر دیا",
            description: "ربی ایسوسی ایشن نے 25 دیہی اسکولوں میں بنیادی ڈھانچے اور ڈیجیٹل لیبز کی اپ گریڈیشن کے لیے اپنے اہم مشن کا آغاز کیا۔"
          },
          ar: {
            title: "جمعية ربي تكشف عن مهمة تحويل المدارس على مستوى البلاد لعام 2026-2027",
            description: "أعلنت جمعية ربي رسمياً عن مهمتها لتطوير البنية التحتية والمختبرات الرقمية في 25 مدرسة ريفية ومحرومة."
          }
        }
      },
      {
        title: "Dedicated Citizen Welfare & Government Schemes Helpdesk Launched",
        description: "To bridge the gap between government welfare entitlements and eligible citizens, Rabbi Association has operationalized a dedicated guidance desk assisting SC/ST, Dalit, Minority, and low-income families with scheme applications, document verification, and official portal access.",
        image: { public_id: "news_2", url: "/rabbi-context/focus_2.jpg" },
        category: "news",
        status: "published",
        publishedAt: new Date("2026-11-15"),
        translations: {
          en: {
            title: "Dedicated Citizen Welfare & Government Schemes Helpdesk Launched",
            description: "To bridge the gap between government welfare entitlements and eligible citizens, Rabbi Association has operationalized a dedicated guidance desk assisting SC/ST, Dalit, Minority, and low-income families with scheme applications, document verification, and official portal access."
          },
          hi: {
            title: "समर्पित नागरिक कल्याण एवं सरकारी योजनाएं हेल्पडेस्क का शुभारंभ",
            description: "सरकारी कल्याणकारी योजनाओं और पात्र नागरिकों के बीच की दूरी को पाटने के लिए रब्बी एसोसिएशन ने समर्पित हेल्पडेस्क शुरू किया है।"
          },
          ur: {
            title: "شہری فلاح و بہبود اور حکومتی اسکیموں کے لیے وقف ہیلپ ڈیسک کا افتتاح",
            description: "مستحق شہریوں کو فلاحی اسکیموں کے فوائد پہنچانے کے لیے ربی ایسوسی ایشن کی جانب سے رہنمائی ڈیسک کا قیام۔"
          },
          ar: {
            title: "إطلاق مكتب مساعدة مخصص لرعاية المواطنين والمبادرات الحكومية",
            description: "لسد الفجوة بين المبادرات الحكومية والمواطنين المؤهلين، أطلقت جمعية ربي مكتباً متخصصاً للإرشاد والمساعدة."
          }
        }
      },
      {
        title: "CSR Partnership Dialogue: Corporate Leaders Collaborate for Rural Education",
        description: "Corporate CSR leaders, philanthropy representatives, and institutional heads convened at a high-level roundtable organized by Rabbi Association to discuss structured CSR collaboration models in school infrastructure, digital literacy, and vocational skill centers.",
        image: { public_id: "news_3", url: "/rabbi-context/focus_5.jpg" },
        category: "article",
        status: "published",
        publishedAt: new Date("2026-11-10"),
        translations: {
          en: {
            title: "CSR Partnership Dialogue: Corporate Leaders Collaborate for Rural Education",
            description: "Corporate CSR leaders, philanthropy representatives, and institutional heads convened at a high-level roundtable organized by Rabbi Association to discuss structured CSR collaboration models in school infrastructure, digital literacy, and vocational skill centers."
          },
          hi: {
            title: "सीएसआर साझेदारी संवाद: ग्रामीण शिक्षा के लिए कॉर्पोरेट अगुआ जुटे",
            description: "रब्बी एसोसिएशन द्वारा आयोजित उच्च-स्तरीय बैठक में स्कूल बुनियादी ढांचे और कौशल केंद्रों में संरचित सीएसआर सहयोग पर विचार-विमर्श हुआ।"
          },
          ur: {
            title: "سی ایس آر پارٹنرشپ ڈائیلاگ: دیہی تعلیم کے لیے کارپوریٹ لیڈروں کا تعاون",
            description: "دیہی اسکولوں کی بہتری اور فنی تربیت کے لیے کارپوریٹ اداروں اور ربی ایسوسی ایشن کے مابین اہم مشاورتی نشست۔"
          },
          ar: {
            title: "حوار شراكة المسؤولية المجتمعية: قادة الشركات يتعاونون للتعليم الريفي",
            description: "اجتماع رفيع المستوى بين قادة المسؤولية المجتمعية بالشركات وممثلي جمعية ربي لبحث نماذج التعاون في البنية التحتية التعليمية."
          }
        }
      },
      {
        title: "Comprehensive Community Health Camp Benefitted Over 1,200 Families",
        description: "A successful two-day community health outreach organized by Rabbi Association provided free medical consultations, essential diagnostic screenings, eye examinations, and pediatric nutrition kits to over 1,200 rural families.",
        image: { public_id: "news_4", url: "/rabbi-context/focus_6.jpg" },
        category: "event_report",
        status: "published",
        publishedAt: new Date("2026-11-05"),
        translations: {
          en: {
            title: "Comprehensive Community Health Camp Benefitted Over 1,200 Families",
            description: "A successful two-day community health outreach organized by Rabbi Association provided free medical consultations, essential diagnostic screenings, eye examinations, and pediatric nutrition kits to over 1,200 rural families."
          },
          hi: {
            title: "व्यापक सामुदायिक स्वास्थ्य शिविर से 1,200 से अधिक परिवारों को मिला लाभ",
            description: "रब्बी एसोसिएशन द्वारा आयोजित दो दिवसीय स्वास्थ्य शिविर में 1,200 से अधिक ग्रामीण परिवारों को मुफ्त परामर्श, जांच और दवाइयां प्रदान की गईं।"
          },
          ur: {
            title: "جامع کمیونٹی ہیلتھ کیمپ: 1,200 سے زائد خاندان مستفید",
            description: "ربی ایسوسی ایشن کے زیر اہتمام منعقدہ میڈیکل کیمپ میں بارہ سو سے زائد پسماندہ خاندانوں کو مفت علاج اور ادویات فراہم کی گئیں۔"
          },
          ar: {
            title: "مخيم صحي مجتمعي شامل يستفيد منه أكثر من 1200 أسرة",
            description: "قدمت القافلة الطبية التي نظمتها جمعية ربي استشارات وفحوصات مجانية وأدوية وقائية لأكثر من 1200 أسرة محتاجة."
          }
        }
      }
    ];
    await News.insertMany(newsData);
    console.log(`✓ Seeded ${newsData.length} news items successfully!`);

    // 5. AWARDS
    console.log("Syncing Awards...");
    await Award.deleteMany({});
    const awardsData = [
      {
        title: "National Educational Excellence & School Transformation Award 2026",
        description: "Honoring outstanding dedication to transforming school learning environments, advancing digital literacy, and fostering inclusive educational opportunities in underserved areas.",
        awardedBy: "Confederation of Educational & Social Institutions (India)",
        year: 2026,
        image: { public_id: "awd_1", url: "/rabbi-context/about_us_classroom.jpg" },
        status: "active"
      },
      {
        title: "Humanitarian Service & Child Welfare Leadership Citation 2025",
        description: "Conferred in recognition of exemplary service in child protection, prevention of child labour, promotion of girls' schooling, and community welfare.",
        awardedBy: "Social Development & Child Rights Forum",
        year: 2025,
        image: { public_id: "awd_2", url: "/rabbi-context/focus_3.jpg" },
        status: "active"
      },
      {
        title: "Social Justice & Citizen Empowerment Honor 2024",
        description: "Presented for sustained advocacy of constitutional rights, legal aid facilitation, and empowering marginalized citizens with government welfare schemes.",
        awardedBy: "National Legal Awareness & Justice Initiative",
        year: 2024,
        image: { public_id: "awd_3", url: "/rabbi-context/focus_2.jpg" },
        status: "active"
      },
      {
        title: "Community Literacy & Rural Skill Development Distinction 2023",
        description: "Recognizing impactful initiatives in youth IT literacy, teacher capacity building, and vocational empowerment.",
        awardedBy: "Indian Literacy & Vocational Education Council",
        year: 2023,
        image: { public_id: "awd_4", url: "/rabbi-context/focus_5.jpg" },
        status: "active"
      }
    ];
    await Award.insertMany(awardsData);
    console.log(`✓ Seeded ${awardsData.length} awards successfully!`);

    // 6. PUBLICATIONS & CERTIFICATES (Downloads)
    console.log("Syncing Publications & Legal Certificates...");
    await Download.deleteMany({});
    const downloadsData = [
      {
        title: "Rabbi Association Annual Impact & Accountability Report 2025-26",
        description: "Comprehensive transparency report documenting our School Transformation projects, citizen welfare outreach, financial disclosures, and verified community outcomes.",
        category: "report",
        file: { public_id: "rep_annual", url: "/public/uploads/annual-impact-report.pdf" },
        fileType: "pdf",
        status: "active"
      },
      {
        title: "Certificate of Incorporation — Section 8 Company (Govt. of India)",
        description: "Official Certificate of Incorporation granted under Section 8 of the Companies Act, 2013 by the Ministry of Corporate Affairs (MCA), Government of India.",
        category: "certificate",
        file: { public_id: "cert_sec8", url: "/public/uploads/section-8-incorporation-certificate.pdf" },
        fileType: "pdf",
        status: "active"
      },
      {
        title: "Income Tax Section 12A & 80G Tax Exemption Certificates",
        description: "Statutory tax exemption certification issued by the Income Tax Department, Government of India, entitling eligible donor contributions to applicable tax exemptions.",
        category: "certificate",
        file: { public_id: "cert_12a_80g", url: "/public/uploads/income-tax-12a-80g-certificate.pdf" },
        fileType: "pdf",
        status: "active"
      },
      {
        title: "NITI Aayog NGO Darpan Government Accreditation",
        description: "Official registration and unique accreditation identifier on NGO Darpan, Government of India (NITI Aayog), confirming compliant non-profit standing.",
        category: "certificate",
        file: { public_id: "cert_darpan", url: "/public/uploads/niti-aayog-darpan-certificate.pdf" },
        fileType: "pdf",
        status: "active"
      },
      {
        title: "Memorandum & Articles of Association (MOA & AOA) of Rabbi Association",
        description: "The official constitutional governing documents and legal bylaws defining the non-profit, charitable, and social welfare objectives of Rabbi Association.",
        category: "certificate",
        file: { public_id: "cert_moa_aoa", url: "/public/uploads/memorandum-articles-of-association.pdf" },
        fileType: "pdf",
        status: "active"
      },
      {
        title: "Citizen Welfare Handbook: Comprehensive Guide to Central & State Schemes",
        description: "A practical guide for citizens, volunteers, and educators detailing eligibility criteria, documentation checklists, and application procedures for welfare schemes.",
        category: "book",
        file: { public_id: "pub_handbook", url: "/public/uploads/citizen-welfare-schemes-handbook.pdf" },
        fileType: "pdf",
        status: "active"
      },
      {
        title: "Research Paper: Modern Strategies for School Transformation in Rural India",
        description: "An evidence-based study highlighting the impact of child-friendly infrastructure, smart digital learning tools, and community involvement on reducing school dropouts.",
        category: "article",
        file: { public_id: "pub_research", url: "/public/uploads/school-transformation-research-paper.pdf" },
        fileType: "pdf",
        status: "active"
      }
    ];
    await Download.insertMany(downloadsData);
    console.log(`✓ Seeded ${downloadsData.length} downloads (publications & certificates) successfully!`);

    // 7. GALLERY
    console.log("Syncing Gallery...");
    await Gallery.deleteMany({});
    const galleryData = [
      {
        title: "School Transformation Mission: Modern Classroom & Smart Study Facilities",
        description: "Interactive smart learning classrooms and child-friendly educational spaces inaugurated under Rabbi Association's School Transformation Mission.",
        type: "photo",
        category: "School Transformation",
        image: { public_id: "gal_1", url: "/rabbi-context/focus_1.jpg" },
        status: "active"
      },
      {
        title: "Citizen Welfare & Government Schemes Awareness Session",
        description: "Community outreach session assisting rural families, women, and youth in discovering welfare schemes and preparing necessary documentation.",
        type: "photo",
        category: "Citizen Welfare",
        image: { public_id: "gal_2", url: "/rabbi-context/focus_2.jpg" },
        status: "active"
      },
      {
        title: "Legal Assistance, Child Protection & Human Rights Seminar",
        description: "Community dialogue with legal experts on access to justice, protection against discrimination, and stopping child labour.",
        type: "photo",
        category: "Legal & Human Rights",
        image: { public_id: "gal_3", url: "/rabbi-context/focus_3.jpg" },
        status: "active"
      },
      {
        title: "Educational Resources & Digital Library Distribution for Students",
        description: "Distributing books, computers, STEM science toolkits, and academic kits to enthusiastic rural primary students.",
        type: "photo",
        category: "Educational Programs",
        image: { public_id: "gal_4", url: "/rabbi-context/focus_4.jpg" },
        status: "active"
      },
      {
        title: "Youth Vocational Training & IT Literacy Center",
        description: "Practical computer training, coding workshops, and employment skill development sessions for local youth.",
        type: "photo",
        category: "Skill Development",
        image: { public_id: "gal_5", url: "/rabbi-context/focus_5.jpg" },
        status: "active"
      },
      {
        title: "Community Health Outreach, Preventive Care & Medical Assistance",
        description: "Free medical examinations, vital health screenings, and prescribed medication distribution for elderly and vulnerable villagers.",
        type: "photo",
        category: "Healthcare & Relief",
        image: { public_id: "gal_6", url: "/rabbi-context/focus_6.jpg" },
        status: "active"
      },
      {
        title: "Documentary: Rabbi Association — Love, Service & Education in Action",
        description: "A comprehensive video overview of Rabbi Association's grassroots work in school transformation, citizen empowerment, and humanitarian service.",
        type: "video",
        category: "Documentary",
        image: { public_id: "vid_1", url: "/rabbi-context/about_us_classroom.jpg" },
        videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
        status: "active"
      },
      {
        title: "Classroom Modernization Impact: Transforming Learning for Rural Children",
        description: "Inspiring video feature showing how smart classrooms, clean drinking water, and vibrant libraries change children's learning experience.",
        type: "video",
        category: "Impact Story",
        image: { public_id: "vid_2", url: "/rabbi-context/focus_4.jpg" },
        videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
        status: "active"
      }
    ];
    await Gallery.insertMany(galleryData);
    console.log(`✓ Seeded ${galleryData.length} gallery items successfully!`);

    // 8. NEWSLETTER
    console.log("Syncing Newsletter...");
    await Newsletter.deleteMany({});
    const newsletterData = [
      { email: "info@rabbi.co.in", isActive: true },
      { email: "contact@rabbi.co.in", isActive: true },
      { email: "csr.partnerships@rabbi.co.in", isActive: true },
      { email: "volunteers@rabbi.co.in", isActive: true },
      { email: "education.mission@rabbi.co.in", isActive: true }
    ];
    await Newsletter.insertMany(newsletterData);
    console.log(`✓ Seeded ${newsletterData.length} newsletter subscribers successfully!`);

    console.log("\n=================================================");
    console.log("RABBI ASSOCIATION OFFICIAL DATA SYNC COMPLETE!");
    console.log("=================================================");
    await mongoose.disconnect();
    process.exit(0);
  } catch (err) {
    console.error("Seeding failed with error:", err);
    process.exit(1);
  }
}

seedRabbiOfficial();
