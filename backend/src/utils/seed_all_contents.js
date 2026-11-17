const mongoose = require("mongoose");
require("dotenv").config({ path: "backend/.env" });

const Event = require("../models/Event");
const Project = require("../models/Project");
const Crowdfunding = require("../models/Crowdfunding");
const Gallery = require("../models/Gallery");
const News = require("../models/News");
const Award = require("../models/Award");
const Download = require("../models/Download");
const Newsletter = require("../models/Newsletter");

async function seedAll() {
  await mongoose.connect(process.env.MONGO_URI || process.env.MONGODB_URI);
  console.log("Connected to MongoDB for comprehensive NGO seeding...");

  const adminId = new mongoose.Types.ObjectId("6aae5fad14f0092f680d59be");

  // 1. EVENTS
  await Event.deleteMany({});
  await Event.insertMany([
    {
      title: "National Conference on Educational Empowerment & Community Development",
      description: "An annual premier gathering of educators, scholars, community leaders, and social workers discussing innovative pedagogical models, student scholarship access, and institutional support across India.",
      location: "India Islamic Cultural Centre, Lodhi Road, New Delhi",
      eventDate: new Date("2026-12-18T10:00:00Z"),
      registrationLastDate: new Date("2026-12-14T18:00:00Z"),
      maxParticipants: 450,
      status: "upcoming",
      image: { public_id: "focus_2", url: "/rabbi-context/focus_2.jpg" },
      createdBy: adminId,
      translations: {
        en: {
          title: "National Conference on Educational Empowerment & Community Development",
          description: "An annual premier gathering of educators, scholars, community leaders, and social workers discussing innovative pedagogical models, student scholarship access, and institutional support across India.",
          location: "India Islamic Cultural Centre, Lodhi Road, New Delhi"
        },
        hi: {
          title: "शैक्षिक सशक्तिकरण एवं सामुदायिक विकास पर राष्ट्रीय सम्मेलन",
          description: "शिक्षाविदों, विद्वानों और सामाजिक कार्यकर्ताओं का वार्षिक सम्मेलन, जिसमें भारत भर में छात्रों को छात्रवृत्ति, आधुनिक शिक्षण पद्धतियों और संस्थागत सहयोग प्रदान करने पर विचार-विमर्श होगा।",
          location: "इंडिया इस्लामिक कल्चरल सेंटर, लोधी रोड, नई दिल्ली"
        },
        ur: {
          title: "تعلیمی بااختیاری اور سماجی ترقی پر قومی کانفرنس",
          description: "ماہرینِ تعلیم، دانشوروں اور سماجی رہنماؤں کا سالانہ اجتماع جس میں پسماندہ طبقات کو وظائف کی فراہمی اور جدید تعلیمی اصلاحات پر تبادلہ خیال کیا جائے گا۔",
          location: "انڈیا اسلامک کلچرل سینٹر، نئی دہلی"
        },
        ar: {
          title: "المؤتمر الوطني للتمكين التعليمي والتنمية المجتمعية",
          description: "مؤتمر سنوي يجمع نخبة من العلماء والمربين والباحثين لمناقشة تطوير المناهج التعليمية ودعم المنح الدراسية للطلاب في مختلف أنحاء الهند.",
          location: "المركز الثقافي الإسلامي الهندي، نيودلهي"
        }
      }
    },
    {
      title: "Annual Interfaith Harmony & Social Cohesion Symposium",
      description: "A prestigious symposium uniting representatives from diverse faith traditions, civil society organizations, and academic institutions to strengthen mutual respect, unity, and communal peace.",
      location: "Constitution Club of India, Rafi Marg, New Delhi",
      eventDate: new Date("2027-01-22T14:00:00Z"),
      registrationLastDate: new Date("2027-01-18T18:00:00Z"),
      maxParticipants: 300,
      status: "upcoming",
      image: { public_id: "focus_3", url: "/rabbi-context/focus_3.jpg" },
      createdBy: adminId,
      translations: {
        en: {
          title: "Annual Interfaith Harmony & Social Cohesion Symposium",
          description: "A prestigious symposium uniting representatives from diverse faith traditions, civil society organizations, and academic institutions to strengthen mutual respect, unity, and communal peace.",
          location: "Constitution Club of India, Rafi Marg, New Delhi"
        },
        hi: {
          title: "वार्षिक सर्वधर्म सद्भाव एवं सामाजिक सौहार्द संगोष्ठी",
          description: "विभिन्न धार्मिक परंपराओं, नागरिक समाज संगठनों और शैक्षणिक संस्थानों के प्रतिनिधियों को एकजुट कर आपसी सम्मान, एकता और शांति को बढ़ावा देने वाली संगोष्ठी।",
          location: "कॉन्स्टिट्यूशन क्लब ऑफ इंडिया, रफी मार्ग, नई दिल्ली"
        },
        ur: {
          title: "بین المذاہب ہم آہنگی اور باہمی رواداری سیمینار",
          description: "مختلف مکاتب فکر اور مذاہب کے معزز نمائندوں کا باوقار سمپوزیم جس کا مقصد باہمی احترام، محبت اور ملکی امن کو فروغ دینا ہے۔",
          location: "کونسٹیٹیوشن کلب آف انڈیا، رفیع مارگ، نئی دہلی"
        },
        ar: {
          title: "الندوة السنوية للوئام بين الأديان والتماسك الاجتماعي",
          description: "ندوة متميزة تجمع ممثلي مختلف الأديان والمؤسسات الأكاديمية لتعزيز الحوار البنّاء وثقافة التسامح والعيش المشترك في المجتمع.",
          location: "نادي الدستور الهندي، نيودلهي"
        }
      }
    },
    {
      title: "National Youth Career Mentorship & Scholarship Summit",
      description: "Comprehensive guidance sessions by civil servants, corporate leaders, and academics for college youth, covering competitive exam preparation, research fellowships, and higher education avenues.",
      location: "Aligarh Convention Centre, Aligarh, Uttar Pradesh",
      eventDate: new Date("2027-02-14T09:30:00Z"),
      registrationLastDate: new Date("2027-02-10T18:00:00Z"),
      maxParticipants: 500,
      status: "upcoming",
      image: { public_id: "focus_1", url: "/rabbi-context/focus_1.jpg" },
      createdBy: adminId,
      translations: {
        en: {
          title: "National Youth Career Mentorship & Scholarship Summit",
          description: "Comprehensive guidance sessions by civil servants, corporate leaders, and academics for college youth, covering competitive exam preparation, research fellowships, and higher education avenues.",
          location: "Aligarh Convention Centre, Aligarh, Uttar Pradesh"
        },
        hi: {
          title: "राष्ट्रीय युवा करियर परामर्श एवं छात्रवृत्ति शिखर सम्मेलन",
          description: "कॉलेज और विश्वविद्यालय के युवाओं के लिए प्रशासनिक अधिकारियों, कॉर्पोरेट लीडर्स और प्रोफेसरों द्वारा सिविल सेवा और उच्च शिक्षा पर विशेष मार्गदर्शन।",
          location: "अलीगढ़ कन्वेंशन सेंटर, अलीगढ़, उत्तर प्रदेश"
        },
        ur: {
          title: "قومی نوجوان کیریئر رہنمائی اور تعلیمی اسکالرشپ سمٹ",
          description: "طلبہ و طالبات کے لیے مسابقتی امتحانات، اعلیٰ تعلیم اور پیشہ ورانہ مہارتوں سے متعلق رہنمائی کے خصوصی سیشنز۔",
          location: "علی گڑھ کنونشن سینٹر، اتر پردیش"
        },
        ar: {
          title: "القمة الوطنية لتوجيه الشباب والمنح الدراسية",
          description: "جلسات إرشادية وتوجيهية متخصصة للشباب الجامعي يقدمها كبار الأكاديميين والموجهين لإعدادهم لسوق العمل والتميز الأكاديمي.",
          location: "مركز المؤتمرات، علي كره، أوتار براديش"
        }
      }
    },
    {
      title: "Teacher Excellence & Modern Pedagogy Workshop",
      description: "Intensive 3-day capacity building workshop for educators focusing on digital classroom integration, inclusive teaching methods, and student psychological well-being.",
      location: "St. Michaels Mission Auditorium, Mathura, UP",
      eventDate: new Date("2027-03-08T10:00:00Z"),
      registrationLastDate: new Date("2027-03-04T18:00:00Z"),
      maxParticipants: 200,
      status: "upcoming",
      image: { public_id: "classroom", url: "/rabbi-context/about_us_classroom.jpg" },
      createdBy: adminId,
      translations: {
        en: {
          title: "Teacher Excellence & Modern Pedagogy Workshop",
          description: "Intensive 3-day capacity building workshop for educators focusing on digital classroom integration, inclusive teaching methods, and student psychological well-being.",
          location: "St. Michaels Mission Auditorium, Mathura, UP"
        },
        hi: {
          title: "शिक्षक उत्कृष्टता एवं आधुनिक शिक्षण पद्धति कार्यशाला",
          description: "शिक्षकों के लिए 3 दिवसीय विशेष प्रशिक्षण कार्यशाला जिसमें डिजिटल शिक्षण, समावेशी तकनीक और बाल मनोविज्ञान पर केंद्रित सत्र शामिल हैं।",
          location: "सेंट माइकल्स मिशन सभागार, मथुरा, उप्र"
        },
        ur: {
          title: "اساتذہ کی تربیت اور جدید تدریسی طریقہ کار ورکشاپ",
          description: "اساتذہ اور معلمین کی پیشہ ورانہ صلاحیتوں کو نکھارنے کے لیے جدید تدریسی اصولوں اور ڈیجیٹل تعلیم پر 3 روزہ تربیتی ورکشاپ۔",
          location: "سینٹ مائیکلز مشن آڈیٹوریم، متھرا، اتر پردیش"
        },
        ar: {
          title: "ورشة عمل لتطوير أداء المعلمين وأساليب التدريس الحديثة",
          description: "برنامج تدريبي مكثف لمدة ثلاثة أيام للمعلمين يركز على استراتيجيات التعليم الرقمي والتفاعل الصفي الحديث.",
          location: "قاعة سانت مايكل، ماثورا، أوتار براديش"
        }
      }
    }
  ]);
  console.log("Seeded 4 rich Events!");

  // 2. PROJECTS (PROGRAMS & ACTIVITIES)
  await Project.deleteMany({});
  await Project.insertMany([
    {
      title: "Arabic Language & Educational Research Fellowship",
      description: "Our flagship academic program providing accredited Arabic language courses, linguistic research fellowships, and classical manuscript preservation training to scholars nationwide.",
      category: "Education",
      status: "active",
      isFeatured: true,
      image: { public_id: "focus_1", url: "/rabbi-context/focus_1.jpg" },
      startDate: new Date("2026-01-10"),
      endDate: new Date("2027-12-31"),
      createdBy: adminId,
      translations: {
        en: {
          title: "Arabic Language & Educational Research Fellowship",
          description: "Our flagship academic program providing accredited Arabic language courses, linguistic research fellowships, and classical manuscript preservation training to scholars nationwide.",
          category: "Education"
        },
        hi: {
          title: "अरबी भाषा एवं शैक्षिक अनुसंधान फेलोशिप",
          description: "हमारी प्रमुख शैक्षणिक पहल जो भारत भर के विद्वानों को प्रमाणित अरबी भाषा पाठ्यक्रम, भाषाई शोध और पांडुलिपि संरक्षण प्रशिक्षण प्रदान करती है।",
          category: "शिक्षा"
        },
        ur: {
          title: "عربی زبان اور تعلیمی و تحقیقی فیلوشپ پروگرام",
          description: "ہمارا اہم ترین تعلیمی منصوبہ جو ملک بھر کے محققین اور طلبہ کو عربی زبان کے کورسز اور علمی تحقیق کے مواقع فراہم کرتا ہے۔",
          category: "تعلیم"
        },
        ar: {
          title: "برنامج زمالة اللغة العربية والبحوث التربوية",
          description: "برنامجنا الأكاديمي الرائد الذي يقدم دورات معتمدة في اللغة العربية، وزمالات بحثية، وتدريبًا على تحقيق المخطوطات للباحثين.",
          category: "التعليم والبحث"
        }
      }
    },
    {
      title: "Free Educational Kits & Digital Learning for Rural Schools",
      description: "Equipping underprivileged village schools with modern smart classrooms, high-quality textbooks, science lab kits, school bags, and stationery sets to curb dropouts.",
      category: "School Infrastructure",
      status: "active",
      isFeatured: true,
      image: { public_id: "focus_4", url: "/rabbi-context/focus_4.jpg" },
      startDate: new Date("2026-04-01"),
      endDate: new Date("2027-03-31"),
      createdBy: adminId,
      translations: {
        en: {
          title: "Free Educational Kits & Digital Learning for Rural Schools",
          description: "Equipping underprivileged village schools with modern smart classrooms, high-quality textbooks, science lab kits, school bags, and stationery sets to curb dropouts.",
          category: "School Infrastructure"
        },
        hi: {
          title: "ग्रामीण विद्यालयों हेतु निःशुल्क शिक्षा किट एवं डिजिटल क्लासरूम",
          description: "वंचित ग्रामीण स्कूलों को स्मार्ट क्लासरूम, पाठ्यपुस्तकें, विज्ञान लैब किट, स्कूल बैग और स्टेशनरी प्रदान कर बच्चों की पढ़ाई जारी रखने में सहयोग करना।",
          category: "विद्यालय विकास"
        },
        ur: {
          title: "دیہی اسکولوں کے لیے مفت تعلیمی کٹس اور ڈیجیٹل تدریس",
          description: "پسماندہ دیہی اسکولوں کو جدید ڈیجیٹل آلات، کتابیں، اسکول بیگز اور اسٹیشنری فراہم کر کے بچوں کے اسکول چھوڑنے کی شرح کو کم کرنا۔",
          category: "اسکول انفراسٹرکچر"
        },
        ar: {
          title: "توزيع الحقائب المدرسية والتعليم الرقمي للمدارس الريفية",
          description: "تجهيز المدارس في القرى النائية بالوسائل التعليمية الحديثة والكتب المدرسية والمستلزمات الدراسية للحد من التسرب المدرسي.",
          category: "تطوير المدارس"
        }
      }
    },
    {
      title: "Youth Vocational Training & Skill Development Center",
      description: "Empowering disadvantaged young men and women with certified job-oriented technical skills: computer literacy, coding, tailoring, electrical repair, and entrepreneurship mentorship.",
      category: "Livelihood & Skills",
      status: "active",
      isFeatured: true,
      image: { public_id: "focus_5", url: "/rabbi-context/focus_5.jpg" },
      startDate: new Date("2026-05-15"),
      endDate: new Date("2028-05-14"),
      createdBy: adminId,
      translations: {
        en: {
          title: "Youth Vocational Training & Skill Development Center",
          description: "Empowering disadvantaged young men and women with certified job-oriented technical skills: computer literacy, coding, tailoring, electrical repair, and entrepreneurship mentorship.",
          category: "Livelihood & Skills"
        },
        hi: {
          title: "युवा व्यावसायिक प्रशिक्षण एवं कौशल विकास केंद्र",
          description: "युवाओं को आत्मनिर्भर बनाने हेतु कंप्यूटर साक्षरता, कोडिंग, सिलाई-कढ़ाई, इलेक्ट्रीशियन और उद्यमिता मार्गदर्शन में निःशुल्क प्रमाणित प्रशिक्षण।",
          category: "कौशल एवं आजीविका"
        },
        ur: {
          title: "نوجوانوں کے لیے فنی تربیت اور ہنرمندی کا مرکز",
          description: "ضرورتمند نوجوانوں کو روزگار سے جوڑنے کے لیے کمپیوٹر، ٹیکنیکل ہنر، سلائی اور خود روزگاری کی پیشہ ورانہ تربیت۔",
          category: "روزگار و ہنر"
        },
        ar: {
          title: "مركز التدريب المهني وتنمية مهارات الشباب",
          description: "تمكين الشباب والشابات من خلال دورات مهنية معتمدة في علوم الحاسوب والحرف التقنية لدعم استقلالهم المالي.",
          category: "تطوير المهارات"
        }
      }
    },
    {
      title: "Community Healthcare, Mobile Clinics & Medical Relief",
      description: "Operating weekly mobile diagnostic clinics, organizing free eye-checkup camps with free spectacles, providing subsidized prescription medicines, and emergency patient subsidies in marginalized localities.",
      category: "Healthcare",
      status: "active",
      isFeatured: false,
      image: { public_id: "focus_6", url: "/rabbi-context/focus_6.jpg" },
      startDate: new Date("2026-03-01"),
      endDate: new Date("2027-12-31"),
      createdBy: adminId,
      translations: {
        en: {
          title: "Community Healthcare, Mobile Clinics & Medical Relief",
          description: "Operating weekly mobile diagnostic clinics, organizing free eye-checkup camps with free spectacles, providing subsidized prescription medicines, and emergency patient subsidies in marginalized localities.",
          category: "Healthcare"
        },
        hi: {
          title: "सामुदायिक स्वास्थ्य सेवा, मोबाइल क्लिनिक एवं चिकित्सा सहायता",
          description: "साप्ताहिक मोबाइल क्लिनिक, निःशुल्क नेत्र जांच एवं चश्मा वितरण, रियायती दवाएं तथा निर्धन मरीजों को आपातकालीन वित्तीय सहायता उपलब्ध कराना।",
          category: "स्वास्थ्य सेवा"
        },
        ur: {
          title: "عوامی صحت، موبائل کلینکس اور مفت طبی امداد",
          description: "غریب علاقوں میں مفت طبی کیمپس، بینائی کے معائنے، مفت عینکوں کی تقسیم اور ضرورتمند مریضوں کو ادویات کی فراہمی۔",
          category: "طبی امداد"
        },
        ar: {
          title: "الرعاية الصحية المجتمعية والعيادات المتنقلة والإغاثة الطبية",
          description: "تسيير قوافل طبية مجانية لتقديم الفحوصات وتوزيع الأدوية والنظارات الطبية للأسر المحتاجة في المناطق الريفية.",
          category: "الرعاية الصحية"
        }
      }
    },
    {
      title: "Girl Child Higher Education & Merit Scholarship Scheme",
      description: "Targeted educational sponsorships covering full college tuition, hostel boarding, and exam fees for bright girls from low-income families pursuing university degrees in science, medicine, and humanities.",
      category: "Women Empowerment",
      status: "active",
      isFeatured: true,
      image: { public_id: "focus_7", url: "/rabbi-context/focus_7.jpg" },
      startDate: new Date("2026-07-01"),
      endDate: new Date("2029-06-30"),
      createdBy: adminId,
      translations: {
        en: {
          title: "Girl Child Higher Education & Merit Scholarship Scheme",
          description: "Targeted educational sponsorships covering full college tuition, hostel boarding, and exam fees for bright girls from low-income families pursuing university degrees in science, medicine, and humanities.",
          category: "Women Empowerment"
        },
        hi: {
          title: "बालिका उच्च शिक्षा एवं मेधावी छात्रवृत्ति योजना",
          description: "आर्थिक रूप से कमजोर परिवारों की प्रतिभाशाली बालिकाओं की कॉलेज फीस, हॉस्टल खर्च और किताबों की पूरी जिम्मेदारी उठाकर उन्हें उच्च शिक्षा दिलाना।",
          category: "महिला सशक्तिकरण"
        },
        ur: {
          title: "طالبات کی اعلیٰ تعلیم اور اسکالرشپ فنڈ",
          description: "غریب گھرانوں کی باصلاحیت بچیوں کو کالج اور یونیورسٹی کی تعلیم مکمل کرانے کے لیے مکمل فیس اور تعلیمی وظائف کی فراہمی۔",
          category: "تعلیمِ نسواں"
        },
        ar: {
          title: "منحة دعم التعليم العالي للفتيات المتفوقات",
          description: "كفالة دراسية شاملة لتغطية الرسوم الجامعية ونفقات الإقامة للفتيات النابغات من الأسر المتعففة لمواصلة دراساتهن العليا.",
          category: "تمكين المرأة"
        }
      }
    }
  ]);
  console.log("Seeded 5 rich Programs & Activities!");

  // 3. CAMPAIGNS (CROWDFUNDING)
  await Crowdfunding.deleteMany({});
  await Crowdfunding.insertMany([
    {
      title: "Sponsor Higher Education for 100 Deserving Rural Students",
      description: "Direct educational sponsorship for 100 bright students whose families earn less than ₹10,000/month. Covers university semester fees, textbooks, and monthly mentorship.",
      story: "Education is the single most powerful catalyst to break generational poverty. In rural northern India, hundreds of brilliant students clear competitive admissions but are forced to drop out due to semester fees of ₹10,000 to ₹15,000. Through this transparent campaign, Rabbi Association directly credits university fees and assigns academic mentors to ensure zero dropouts. 100% of your donation is utilized with verified receipts and progress cards sent to donors quarterly.",
      targetAmount: 1000000,
      raisedAmount: 645000,
      category: "Higher Education",
      beneficiary: "100 Meritorious Underprivileged Youth across UP, Bihar and Rajasthan",
      organizer: "Rabbi Association Academic Committee",
      status: "active",
      startDate: new Date("2026-11-01"),
      endDate: new Date("2027-04-30"),
      image: { public_id: "focus_1", url: "/rabbi-context/focus_1.jpg" },
      translations: {
        en: {
          title: "Sponsor Higher Education for 100 Deserving Rural Students",
          description: "Direct educational sponsorship for 100 bright students whose families earn less than ₹10,000/month. Covers university semester fees, textbooks, and monthly mentorship.",
          story: "Education is the single most powerful catalyst to break generational poverty. In rural northern India, hundreds of brilliant students clear competitive admissions but are forced to drop out due to semester fees of ₹10,000 to ₹15,000. Through this transparent campaign, Rabbi Association directly credits university fees and assigns academic mentors to ensure zero dropouts. 100% of your donation is utilized with verified receipts and progress cards sent to donors quarterly.",
          category: "Higher Education",
          beneficiary: "100 Meritorious Underprivileged Youth",
          organizer: "Rabbi Association Academic Committee"
        },
        hi: {
          title: "100 मेधावी ग्रामीण छात्र-छात्राओं की उच्च शिक्षा प्रायोजित करें",
          description: "कम आय वाले परिवारों के 100 होनहार विद्यार्थियों की कॉलेज फीस, पुस्तकें और करियर मार्गदर्शन प्रायोजित कर उनके भविष्य को संवारें।",
          story: "शिक्षा गरीबी के चक्र को समाप्त करने का सबसे मजबूत माध्यम है। इस अभियान के तहत संस्था सीधे विश्वविद्यालयों में छात्रों की फीस जमा करती है और तिमाही रिपोर्ट दानदाताओं को प्रदान करती है।",
          category: "उच्च शिक्षा",
          beneficiary: "100 प्रतिभाशाली जरूरतमंद छात्र",
          organizer: "रब्बी एसोसिएशन शैक्षिक समिति"
        },
        ur: {
          title: "100 باصلاحیت دیہی طلبہ کی اعلیٰ تعلیم کے لیے فنڈ",
          description: "غریب اور محنتی طلبہ کے تعلیمی اخراجات، کتب اور فیسوں کے لیے مالی مدد تاکہ ان کی تعلیم ادھوری نہ رہے۔",
          story: "اس مہم کے تحت جمع ہونے والے فنڈز بلاواسطہ طلبہ کی کالج اور یونیورسٹی فیسوں کی ادائیگی کے لیے استعمال کیے جاتے ہیں اور ہر ڈونر کو باقاعدہ رسید اور رپورٹ فراہم کی جاتی ہے۔",
          category: "اعلیٰ تعلیم",
          beneficiary: "100 مستحق طلبہ و طالبات",
          organizer: "رابی ایسوسی ایشن تعلیمی کمیٹی"
        },
        ar: {
          title: "كفالة التعليم الجامعي لـ 100 طالب متفوق من القرى",
          description: "دعم تعليمي مباشر لتغطية الرسوم الجامعية وشراء الكتب والمراجع لـ 100 طالب متميز من الأسر المتعففة.",
          story: "نهدف من خلال هذه الحملة المباركة إلى تمكين مئة طالب متفوق من إكمال دراستهم الجامعية دون انقطاع، مع ضمان الشفافية الكاملة وتزويد المتبرعين بتقارير دورية.",
          category: "التعليم الجامعي",
          beneficiary: "100 طالب وطالبة من المتفوقين",
          organizer: "لجنة التعليم برابطة الرابي"
        }
      }
    },
    {
      title: "Clean Drinking Water, Sanitation & Nutrition for 6 Rural Schools",
      description: "Installing commercial RO water purification plants, building hygienic washroom blocks for girls and boys, and providing mid-day nutritional fruit supplements.",
      story: "Safe water and hygienic sanitation are basic fundamental human rights. Six primary schools in underserved regions currently have arsenic-contaminated groundwater and inadequate toilets, leading to water-borne illnesses and high female absenteeism. This project installs solar-backed RO filtration systems producing 500 liters/hour of pure drinking water and constructs dedicated girl-friendly sanitation blocks.",
      targetAmount: 500000,
      raisedAmount: 380000,
      category: "School Water & Health",
      beneficiary: "1,450 School Children across 6 Village Primary Schools",
      organizer: "Rabbi Association Infrastructure Wing",
      status: "active",
      startDate: new Date("2026-10-15"),
      endDate: new Date("2027-03-31"),
      image: { public_id: "focus_4", url: "/rabbi-context/focus_4.jpg" },
      translations: {
        en: {
          title: "Clean Drinking Water, Sanitation & Nutrition for 6 Rural Schools",
          description: "Installing commercial RO water purification plants, building hygienic washroom blocks for girls and boys, and providing mid-day nutritional fruit supplements.",
          story: "Safe water and hygienic sanitation are basic fundamental human rights. Six primary schools in underserved regions currently have arsenic-contaminated groundwater and inadequate toilets, leading to water-borne illnesses and high female absenteeism. This project installs solar-backed RO filtration systems producing 500 liters/hour of pure drinking water and constructs dedicated girl-friendly sanitation blocks.",
          category: "School Water & Health",
          beneficiary: "1,450 School Children",
          organizer: "Rabbi Association Infrastructure Wing"
        },
        hi: {
          title: "6 ग्रामीण स्कूलों में शुद्ध पेयजल, स्वच्छता एवं पोषण व्यवस्था",
          description: "स्कूलों में आधुनिक RO वाटर प्लांट लगाना, बालिकाओं और बालकों के लिए पक्के शौचालय बनाना और पौष्टिक आहार उपलब्ध कराना।",
          story: "शुद्ध पानी और स्वच्छ शौचालय हर बच्चे का अधिकार है। इस प्रोजेक्ट के जरिए 6 प्राथमिक विद्यालयों में 500 लीटर प्रति घंटे क्षमता वाले सोलर RO प्लांट और आधुनिक शौचालय बनाए जा रहे हैं।",
          category: "विद्यालय स्वच्छता एवं जल",
          beneficiary: "1,450 प्राथमिक विद्यालयी बच्चे",
          organizer: "रब्बी एसोसिएशन विकास विंग"
        },
        ur: {
          title: "دیہی اسکولوں میں پینے کے صاف پانی اور سینیٹیشن کا پروجیکٹ",
          description: "اسکولوں میں فلٹریشن پلانٹس کی تنصیب اور صاف ستھرے بیت الخلاء کی تعمیر تاکہ بچوں کو بیماریوں سے بچایا جا سکے۔",
          story: "چھ اسکولوں کے 1,450 معصوم بچوں کو پینے کا صاف پانی اور حفظانِ صحت کے اصولوں کے مطابق واش رومز مہیا کرنے کے لیے یہ مہم شروع کی گئی ہے۔",
          category: "پانی اور صحت",
          beneficiary: "1,450 معصوم طلبہ",
          organizer: "رابی ایسوسی ایشن انفراسٹرکچر ٹیم"
        },
        ar: {
          title: "توفير مياه الشرب النقية والمرافق الصحية لـ 6 مدارس ريفية",
          description: "تركيب محطات تحلية وتنقية المياه وبناء دورات مياه صحية للطلاب والطالبات للحد من الأمراض.",
          story: "مشروع حيوي يهدف إلى حماية 1,450 تلميذًا وتلميذة من الأمراض المنقولة عبر المياه غير الصالحة للشرب، من خلال إنشاء محطات تنقية شمسية وتأهيل المرافق المدرسية.",
          category: "المياه والصحة المدرسية",
          beneficiary: "1,450 تلميذ وتلميذة",
          organizer: "جناح المشاريع برابطة الرابي"
        }
      }
    },
    {
      title: "Winter Warmth & Shelter Relief Drive for Homeless Families",
      description: "Distributing 1,500 heavy-duty thermal blankets, children winter jackets, woolen caps, and emergency heating kits to families sleeping on footpaths and flood-affected shelters.",
      story: "Northern Indian winters bring freezing temperatures dropping below 3°C. For daily wage laborers, widows, and street children without heating or adequate shelter, winter is a fight for survival. Rabbi Association volunteer fleet conducts night-time relief drives directly handing over insulated blankets, warm winter jackets, and hot nutritious meals to those in urgent need.",
      targetAmount: 350000,
      raisedAmount: 210000,
      category: "Emergency Relief",
      beneficiary: "750 Vulnerable Families and 1,500 Children in Mathura, Agra and Delhi NCR",
      organizer: "Rabbi Humanitarian Volunteer Core",
      status: "active",
      startDate: new Date("2026-11-01"),
      endDate: new Date("2027-02-28"),
      image: { public_id: "focus_6", url: "/rabbi-context/focus_6.jpg" },
      translations: {
        en: {
          title: "Winter Warmth & Shelter Relief Drive for Homeless Families",
          description: "Distributing 1,500 heavy-duty thermal blankets, children winter jackets, woolen caps, and emergency heating kits to families sleeping on footpaths and flood-affected shelters.",
          story: "Northern Indian winters bring freezing temperatures dropping below 3°C. For daily wage laborers, widows, and street children without heating or adequate shelter, winter is a fight for survival. Rabbi Association volunteer fleet conducts night-time relief drives directly handing over insulated blankets, warm winter jackets, and hot nutritious meals to those in urgent need.",
          category: "Emergency Relief",
          beneficiary: "750 Families and 1,500 Children",
          organizer: "Rabbi Humanitarian Volunteer Core"
        },
        hi: {
          title: "कड़ाके की ठंड में बेसहारा परिवारों हेतु गर्म कंबल एवं शीत राहत अभियान",
          description: "सड़क किनारे और कच्ची बस्तियों में रहने वाले 1,500 बच्चों और बुजुर्गों को भारी गर्म कंबल, स्वेटर, जैकेट और ऊनी टोपी का प्रत्यक्ष वितरण।",
          story: "उत्तर भारत की ठिठुरती ठंड में बेघर परिवारों और असहाय बच्चों को ठंड से बचाने के लिए संस्था की टीमें रात में जाकर गर्म कपड़े और कंबल पहुंचाती हैं।",
          category: "आपातकालीन राहत",
          beneficiary: "750 गरीब परिवार एवं 1,500 बच्चे",
          organizer: "रब्बी एसोसिएशन वालंटियर टीम"
        },
        ur: {
          title: "سردیوں میں بے آسرا خاندانوں کے لیے گرم کمبل اور امدادی مہم",
          description: "ٹھٹھرتی سردی سے بچاؤ کے لیے 1,500 گرم کمبل، جیکٹس اور بچوں کے گرم ملبوسات کی تقسیم۔",
          story: "سخت سرد موسم میں سڑکوں اور جھگیوں میں رہنے والے غریب بچوں اور بزرگوں کو سردی سے بچانے کے لیے رابی ایسوسی ایشن کی رضاکار ٹیمیں رات کے وقت امداد فراہم کرتی ہیں۔",
          category: "ہنگامی امداد",
          beneficiary: "750 مستحق خاندان اور بچے",
          organizer: "رابی ریلیف ونگ"
        },
        ar: {
          title: "حملة دفء الشتاء وإغاثة الأسر المتعففة والمشردة",
          description: "توزيع 1,500 بطانية شتوية ثقيلة وملابس صوفية للأطفال والمسنين في المناطق شديدة البرودة.",
          story: "حملة إنسانية عاجلة لحماية الأسر الفقيرة والأطفال بلا مأوى من موجات الصقيع القارسة عبر توزيع أغطية الشتاء والملابس الدافئة والوجبات الساخنة.",
          category: "الإغاثة العاجلة",
          beneficiary: "750 أسرة و1,500 طفل",
          organizer: "فريق الإغاثة الإنسانية"
        }
      }
    },
    {
      title: "Emergency Medical Care & Life-Saving Dialysis Assistance Fund",
      description: "Subsidizing life-saving treatments, kidney dialysis sessions, diagnostic scans, and emergency oncology medicines for poor patients ineligible for state insurance.",
      story: "A single medical emergency can push a lower-middle-class family into bonded debt for decades. Our medical relief fund directly disburses critical hospital payments for kidney patients requiring 2 to 3 dialysis sessions weekly, heart interventions, and life-saving injections. Cases are scrutinized by medical doctors to ensure zero fraud and maximum life impact.",
      targetAmount: 750000,
      raisedAmount: 490000,
      category: "Healthcare Relief",
      beneficiary: "120 Chronic Illness Patients requiring Urgent Life Support",
      organizer: "Rabbi Association Medical Trust",
      status: "active",
      startDate: new Date("2026-09-01"),
      endDate: new Date("2027-08-31"),
      image: { public_id: "focus_7", url: "/rabbi-context/focus_7.jpg" },
      translations: {
        en: {
          title: "Emergency Medical Care & Life-Saving Dialysis Assistance Fund",
          description: "Subsidizing life-saving treatments, kidney dialysis sessions, diagnostic scans, and emergency oncology medicines for poor patients ineligible for state insurance.",
          story: "A single medical emergency can push a lower-middle-class family into bonded debt for decades. Our medical relief fund directly disburses critical hospital payments for kidney patients requiring 2 to 3 dialysis sessions weekly, heart interventions, and life-saving injections. Cases are scrutinized by medical doctors to ensure zero fraud and maximum life impact.",
          category: "Healthcare Relief",
          beneficiary: "120 Chronic Illness Patients",
          organizer: "Rabbi Association Medical Trust"
        },
        hi: {
          title: "आपातकालीन चिकित्सा सहायता एवं डायलिसिस रोगी राहत कोष",
          description: "अति निर्धन किडनी व गंभीर रोगियों के लिए डायलिसिस, जीवनरक्षक दवाएं और अस्पताल के खर्चों में प्रत्यक्ष आर्थिक अनुदान।",
          story: "गंभीर बीमारी किसी भी गरीब परिवार को कर्ज में डुबो देती है। हमारा मेडिकल ट्रस्ट डॉक्टरों की देखरेख में सीधे अस्पताल को भुगतान कर जरूरतमंद मरीजों की जान बचाता है।",
          category: "चिकित्सा सहायता",
          beneficiary: "120 गंभीर रोगी",
          organizer: "रब्बी एसोसिएशन मेडिकल ट्रस्ट"
        },
        ur: {
          title: "ہنگامی طبی امداد اور ڈائیلاسز کے مریضوں کے لیے فنڈ",
          description: "گردے کے مریضوں کے ڈائیلاسز اور مہنگی ادویات کے لیے غریب مریضوں کو مالی معاونت کی فراہمی۔",
          story: "غریب اور بے سہارا مریضوں کی جان بچانے کے لیے ہسپتالوں کے واجبات کی براہ راست ادائیگی تاکہ کوئی بھی انسان پیسے کی کمی کی وجہ سے علاج سے محروم نہ رہے۔",
          category: "طبی امداد",
          beneficiary: "120 شدید بیمار مریض",
          organizer: "رابی میڈیکل ٹرسٹ"
        },
        ar: {
          title: "صندوق الرعاية الطبية العاجلة وعلاج مرضى الغسيل الكلوي",
          description: "تغطية تكاليف جلسات غسيل الكلى والأدوية المنقذة للحياة للمرضى المحتاجين غير القادرين على تكاليف العلاج.",
          story: "صندوق إغاثي مخصص لتحمل نفقات العمليات الجراحية العاجلة وجلسات الغسيل الكلوي الدورية للمرضى الفقراء، بإشراف طبي موثوق يضمن وصول الدعم لمستحقيه.",
          category: "الإغاثة الطبية",
          beneficiary: "120 مريضًا بأمراض مزمنة",
          organizer: "صندوق الرعاية الصحية"
        }
      }
    }
  ]);
  console.log("Seeded 4 rich Crowdfunding Campaigns!");

  // 4. GALLERY (PHOTOS & VIDEOS)
  await Gallery.deleteMany({});
  await Gallery.insertMany([
    {
      title: "National Academic Delegation & Scholar Assembly at India Islamic Cultural Centre",
      description: "Gathering of distinguished international scholars, educators, and community trustees deliberating on education reforms.",
      type: "photo",
      category: "Conferences",
      status: "active",
      image: { public_id: "focus_2", url: "/rabbi-context/focus_2.jpg" },
      createdBy: adminId
    },
    {
      title: "Student Scholarship Distribution & Career Counseling Meet",
      description: "Awarding higher education financial sponsorships and career toolkits to 200 meritorious students from underserved districts.",
      type: "photo",
      category: "Educational Programs",
      status: "active",
      image: { public_id: "focus_1", url: "/rabbi-context/focus_1.jpg" },
      createdBy: adminId
    },
    {
      title: "Winter Relief Mission: Thermal Blankets & Warm Clothing Drive",
      description: "Volunteers distributing high-grade warm blankets, sweaters, and nutritional kits to 750 vulnerable families.",
      type: "photo",
      category: "Community Initiatives",
      status: "active",
      image: { public_id: "focus_6", url: "/rabbi-context/focus_6.jpg" },
      createdBy: adminId
    },
    {
      title: "Youth Coding, IT Literacy & Technical Skills Workshop",
      description: "Hands-on computer training in progress at our community learning centre empowering students with job-ready technical skills.",
      type: "photo",
      category: "Seminars",
      status: "active",
      image: { public_id: "focus_5", url: "/rabbi-context/focus_5.jpg" },
      createdBy: adminId
    },
    {
      title: "Classroom Modernization & Smart Study Center Inauguration",
      description: "Inauguration of modern interactive digital displays and study equipment at St. Michaels Mission school campus.",
      type: "photo",
      category: "Organizational Activities",
      status: "active",
      image: { public_id: "classroom", url: "/rabbi-context/about_us_classroom.jpg" },
      createdBy: adminId
    },
    {
      title: "Rural Primary School Children Receiving Educational Kits",
      description: "Smiles of joy as school bags, textbooks, geometry sets, and uniforms are handed over to over 500 rural primary school students.",
      type: "photo",
      category: "Educational Programs",
      status: "active",
      image: { public_id: "focus_4", url: "/rabbi-context/focus_4.jpg" },
      createdBy: adminId
    },
    {
      title: "Keynote Address: Role of Education in National Progress & Moderation",
      description: "Official recorded lecture on educational ethics, community empowerment, and civic responsibility.",
      type: "video",
      videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      category: "Lectures",
      status: "active",
      image: { public_id: "focus_3", url: "/rabbi-context/focus_3.jpg" },
      createdBy: adminId
    },
    {
      title: "Field Documentary: Transforming Lives Through Educational Sponsorships",
      description: "Documentary showcasing real testimonials of students whose higher education was made possible through our donor network.",
      type: "video",
      videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      category: "Interviews",
      status: "active",
      image: { public_id: "focus_7", url: "/rabbi-context/focus_7.jpg" },
      createdBy: adminId
    }
  ]);
  console.log("Seeded 8 Gallery Photos & Videos!");

  // 5. NEWS
  await News.deleteMany({});
  await News.insertMany([
    {
      title: "World Association Launches Nationwide Educational Network Across 12 Indian States",
      description: "The World Association for Al-Azhar Graduates India Branch announces the launch of its expanded educational initiatives and scholarly collaboration forums uniting graduates and educators nationwide.",
      category: "news",
      status: "published",
      image: { public_id: "focus_3", url: "/rabbi-context/focus_3.jpg" },
      publishedAt: new Date("2026-11-15"),
      createdBy: adminId,
      translations: {
        en: {
          title: "World Association Launches Nationwide Educational Network Across 12 Indian States",
          description: "The World Association for Al-Azhar Graduates India Branch announces the launch of its expanded educational initiatives and scholarly collaboration forums uniting graduates and educators nationwide."
        },
        hi: {
          title: "वर्ल्ड एसोसिएशन ने भारत के 12 राज्यों में शैक्षणिक नेटवर्क का किया विस्तार",
          description: "वर्ल्ड एसोसिएशन फॉर अल-अजहर ग्रेजुएट्स इंडिया ब्रांच ने देश भर के शिक्षकों, शोधार्थियों और बुद्धिजीवियों को जोड़ने वाली राष्ट्रव्यापी शैक्षिक पहल का शुभारंभ किया।"
        },
        ur: {
          title: "ورلڈ ایسوسی ایشن نے ہندوستان کی 12 ریاستوں میں تعلیمی نیٹ ورک کا آغاز کر دیا",
          description: "ملک بھر کے اساتذہ، محققین اور فارغین کو ایک پلیٹ فارم پر لانے کے لیے وسیع تعلیمی و فکری نیٹ ورک کا باقاعدہ اعلان۔"
        },
        ar: {
          title: "فرع المنظمة العالمية لخريجي الأزهر يدشن شبكة تعليمية في 12 ولاية هندية",
          description: "إطلاق مبادرات تعليمية وأكاديمية موسعة لتوحيد جهود الخريجين والباحثين ودعم المشاريع التنموية في أنحاء الهند."
        }
      }
    },
    {
      title: "Annual Merit Scholarship Awards Announced for 250 Deserving Students",
      description: "The Board of Trustees has sanctioned ₹25 Lakhs towards the 2026-27 Merit Scholarship Fund, supporting professional degree courses for students from low-income families.",
      category: "press_release",
      status: "published",
      image: { public_id: "focus_1", url: "/rabbi-context/focus_1.jpg" },
      publishedAt: new Date("2026-11-10"),
      createdBy: adminId,
      translations: {
        en: {
          title: "Annual Merit Scholarship Awards Announced for 250 Deserving Students",
          description: "The Board of Trustees has sanctioned ₹25 Lakhs towards the 2026-27 Merit Scholarship Fund, supporting professional degree courses for students from low-income families."
        },
        hi: {
          title: "250 मेधावी विद्यार्थियों के लिए वार्षिक छात्रवृत्ति योजना की घोषणा",
          description: "ट्रस्टी बोर्ड ने सत्र 2026-27 के लिए ₹25 लाख के छात्रवृत्ति कोष को मंजूरी दी, जिससे आर्थिक रूप से कमजोर छात्रों की उच्च शिक्षा सुनिश्चित होगी।"
        },
        ur: {
          title: "250 مستحق اور ہونہار طلبہ کے لیے سالانہ اسکالرشپ کا اعلان",
          description: "بورڈ آف ٹرسٹیز نے سیشن 2026-27 کے لیے 25 لاکھ روپے کا اسکالرشپ فنڈ منظور کیا جس سے پیشہ ورانہ ڈگریوں کی فیس ادا کی جائے گی۔"
        },
        ar: {
          title: "الإعلان عن المنح الدراسية السنوية لـ 250 طالبًا متميزًا من الأسر المتعففة",
          description: "اعتماد ميزانية قدرها 2.5 مليون روبية لدعم المنح التعليمية للطلاب المتفوقين في التخصصات العلمية والطبية والهندسية."
        }
      }
    },
    {
      title: "High-Level Academic Delegation Visits Al-Azhar Alumni Centres in Northern India",
      description: "Visiting international educationists met with faculty members, student representatives, and social partners to review ongoing language programs and community service projects.",
      category: "event_report",
      status: "published",
      image: { public_id: "focus_2", url: "/rabbi-context/focus_2.jpg" },
      publishedAt: new Date("2026-11-04"),
      createdBy: adminId,
      translations: {
        en: {
          title: "High-Level Academic Delegation Visits Al-Azhar Alumni Centres in Northern India",
          description: "Visiting international educationists met with faculty members, student representatives, and social partners to review ongoing language programs and community service projects."
        },
        hi: {
          title: "उच्च स्तरीय शैक्षणिक प्रतिनिधिमंडल ने उत्तर भारत के केंद्रों का किया दौरा",
          description: "अंतरराष्ट्रीय शिक्षाविदों ने संकाय सदस्यों, छात्र प्रतिनिधियों और सामाजिक संस्थाओं से मुलाकात कर भाषा व सामुदायिक कार्यक्रमों की प्रगति की समीक्षा की।"
        },
        ur: {
          title: "اعلیٰ سطحی علمی وفد کا شمالی ہند کے تعلیمی مراکز کا تفصیلی دورہ",
          description: "بین الاقوامی دانشوروں اور ماہرین تعلیم نے طلبہ اور اساتذہ سے ملاقات کر کے جاری تعلیمی منصوبوں کا جائزہ لیا۔"
        },
        ar: {
          title: "وفد أكاديمي رفيع المستوى يتفقد المراكز التعليمية في شمال الهند",
          description: "التقى الوفد بأعضاء هيئة التدريس وممثلي الطلاب لمتابعة سير البرامج اللغوية والمبادرات المجتمعية القائمة."
        }
      }
    },
    {
      title: "Comprehensive Winter Medical Camp Concluded: Over 1,200 Beneficiaries Treated",
      description: "Our health services wing organized a 3-day multi-specialty health camp in Mathura district, conducting free diagnostics, blood tests, and distributing prescription medicines.",
      category: "news",
      status: "published",
      image: { public_id: "focus_6", url: "/rabbi-context/focus_6.jpg" },
      publishedAt: new Date("2026-10-28"),
      createdBy: adminId,
      translations: {
        en: {
          title: "Comprehensive Winter Medical Camp Concluded: Over 1,200 Beneficiaries Treated",
          description: "Our health services wing organized a 3-day multi-specialty health camp in Mathura district, conducting free diagnostics, blood tests, and distributing prescription medicines."
        },
        hi: {
          title: "मथुरा में 3 दिवसीय निःशुल्क चिकित्सा शिविर संपन्न, 1,200 से अधिक मरीज लाभान्वित",
          description: "स्वास्थ्य सेवा विंग द्वारा आयोजित शिविर में विशेषज्ञ डॉक्टरों ने मुफ्त जांच, रक्त परीक्षण और आवश्यक दवाओं का वितरण किया।"
        },
        ur: {
          title: "مفت طبی کیمپ اختتام پذیر: 1,200 سے زائد مریضوں کا علاج اور ادویات کی فراہمی",
          description: "ہیلتھ ٹیم نے متھرا ضلع میں 3 روزہ ملٹی اسپیشلٹی کیمپ کا انعقاد کیا جس میں غریب مریضوں کو مفت معائنہ اور علاج میسر آیا۔"
        },
        ar: {
          title: "اختتام القافلة الطبية الشاملة واستفادة أكثر من 1,200 مريض",
          description: "نظم الفريق الصحي مخيمًا طبيًا مجانيًا في منطقة ماثورا لتقديم الفحوصات الطبية والأدوية المجانية للأهالي."
        }
      }
    }
  ]);
  console.log("Seeded 4 rich News Articles!");

  // 6. AWARDS
  await Award.deleteMany({});
  await Award.insertMany([
    {
      title: "National Educational Excellence & Community Impact Award",
      description: "Conferred in recognition of outstanding grassroots contributions towards educational upliftment, scholarship distribution, and rural schooling modernization across India.",
      awardedBy: "National Social Welfare & Education Council of India",
      year: 2026,
      status: "active",
      image: { public_id: "stamp", url: "/association-stamp.png" },
      createdBy: adminId,
      translations: {
        en: {
          title: "National Educational Excellence & Community Impact Award",
          description: "Conferred in recognition of outstanding grassroots contributions towards educational upliftment, scholarship distribution, and rural schooling modernization across India.",
          awardedBy: "National Social Welfare & Education Council of India"
        },
        hi: {
          title: "राष्ट्रीय शैक्षिक उत्कृष्टता एवं सामुदायिक प्रभाव पुरस्कार 2026",
          description: "भारत भर में ग्रामीण शिक्षा आधुनिकीकरण, छात्रवृत्ति वितरण और जमीनी स्तर पर शिक्षा के प्रसार में उत्कृष्ट योगदान के लिए सम्मानित।",
          awardedBy: "राष्ट्रीय समाज कल्याण एवं शिक्षा परिषद, भारत"
        },
        ur: {
          title: "قومی تعلیمی و سماجی خدمات کا باوقار ایوارڈ 2026",
          description: "دیہی علاقوں میں تعلیمی انقلاب اور غریب طلبہ کو وظائف کی فراہمی میں نمایاں خدمات کے اعتراف میں پیش کیا گیا۔",
          awardedBy: "نیشنل کونسل فار سوشل ویلفیئر اینڈ ایجوکیشن"
        },
        ar: {
          title: "الجائزة الوطنية للتميز التعليمي والأثر المجتمعي 2026",
          description: "مُنحت تقديرًا للجهود المتميزة في تطوير التعليم في القرى وتوفير المنح الدراسية للأسر المحتاجة في الهند.",
          awardedBy: "المجلس الوطني للرعاية الاجتماعية والتعليم"
        }
      }
    },
    {
      title: "Humanitarian Service & Community Resilience Honor",
      description: "Awarded for exceptional leadership in disaster relief, emergency medical interventions, and rural winter warmth operations in Northern India.",
      awardedBy: "Federation of Indian NGOs & Humanitarian Trusts",
      year: 2025,
      status: "active",
      image: { public_id: "stamp", url: "/association-stamp.png" },
      createdBy: adminId,
      translations: {
        en: {
          title: "Humanitarian Service & Community Resilience Honor",
          description: "Awarded for exceptional leadership in disaster relief, emergency medical interventions, and rural winter warmth operations in Northern India.",
          awardedBy: "Federation of Indian NGOs & Humanitarian Trusts"
        },
        hi: {
          title: "मानवीय सेवा एवं सामुदायिक राहत सम्मान 2025",
          description: "आपदा राहत, आपातकालीन चिकित्सा सहायता और उत्तर भारत में शीतलहर के दौरान गरीबों की सुरक्षा में अनुकरणीय सेवाओं हेतु प्रदान किया गया।",
          awardedBy: "फेडरेशन ऑफ इंडियन एनजीओ"
        },
        ur: {
          title: "انسانیت نوازی اور سماجی امداد کا شاندار تمغہ 2025",
          description: "ہنگامی امدادی کارروائیوں، غریبوں کے علاج اور سردیوں میں کمبل و راشن کی فراہمی پر شاندار خدمات کا اعتراف۔",
          awardedBy: "فیڈریشن آف انڈین این جی اوز"
        },
        ar: {
          title: "وسام الخدمة الإنسانية والمساندة المجتمعية 2025",
          description: "تكريمًا للريادة في تقديم الإغاثة العاجلة وتوزيع المستلزمات الطبية والشتوية للأسر الأكثر احتياجًا.",
          awardedBy: "اتحاد المنظمات الإنسانية الهندية"
        }
      }
    },
    {
      title: "Interfaith Harmony & Social Peace Leadership Trophy",
      description: "Recognizing pioneering initiatives in building bridges of interfaith dialogue, communal harmony, and collaborative youth leadership.",
      awardedBy: "Global Peace & Harmony Foundation, New Delhi",
      year: 2024,
      status: "active",
      image: { public_id: "stamp", url: "/association-stamp.png" },
      createdBy: adminId,
      translations: {
        en: {
          title: "Interfaith Harmony & Social Peace Leadership Trophy",
          description: "Recognizing pioneering initiatives in building bridges of interfaith dialogue, communal harmony, and collaborative youth leadership.",
          awardedBy: "Global Peace & Harmony Foundation, New Delhi"
        },
        hi: {
          title: "सर्वधर्म सद्भाव एवं सामाजिक शांति नेतृत्व पुरस्कार",
          description: "विभिन्न समुदायों के बीच संवाद, आपसी विश्वास और सामाजिक समरसता को सशक्त बनाने के अथक प्रयासों के लिए प्रदत्त।",
          awardedBy: "ग्लोबल पीस एंड हार्मनी फाउंडेशन, नई दिल्ली"
        },
        ur: {
          title: "بین المذاہب رواداری اور امنِ عامہ ایوارڈ",
          description: "مختلف طبقات اور مذاہب کے درمیان محبت، بھائی چارے اور باہمی مکالمے کو مستحکم کرنے پر دیا جانے والا ایوارڈ۔",
          awardedBy: "گلوبل پیس اینڈ ہارمنی فاؤنڈیشن"
        },
        ar: {
          title: "جائزة الريادة في نشر السلام والوئام بين الأديان",
          description: "تقديرًا للمبادرات البنّاءة في مد جسور الحوار والتفاهم المشترك وتعزيز السلم الأهلي بين كافة أطياف المجتمع.",
          awardedBy: "مؤسسة السلام والوئام العالمي، نيودلهي"
        }
      }
    },
    {
      title: "Youth Literacy & Skill Empowerment Certificate of Distinction",
      description: "Conferred for training over 1,500 underprivileged youth in computer coding, professional vocations, and ethical leadership.",
      awardedBy: "National Skill & Literacy Mission Alliance",
      year: 2023,
      status: "active",
      image: { public_id: "stamp", url: "/association-stamp.png" },
      createdBy: adminId,
      translations: {
        en: {
          title: "Youth Literacy & Skill Empowerment Certificate of Distinction",
          description: "Conferred for training over 1,500 underprivileged youth in computer coding, professional vocations, and ethical leadership.",
          awardedBy: "National Skill & Literacy Mission Alliance"
        },
        hi: {
          title: "युवा साक्षरता एवं कौशल विकास विशिष्टता सम्मान",
          description: "1,500 से अधिक जरूरतमंद युवाओं को कंप्यूटर, कोडिंग और रोजगारपरक कौशल में निःशुल्क प्रशिक्षित करने के उपलक्ष्य में।",
          awardedBy: "नेशनल स्किल एंड लिटरेसी मिशन"
        },
        ur: {
          title: "نوجوانوں کی خواندگی اور فنی ہنر کی ترقی کا اعزاز",
          description: "1,500 سے زائد نوجوانوں کو کمپیوٹر ٹیکنالوجی اور روزگار کے شعبوں میں کامیاب تربیت دینے کے صلے میں اعزاز۔",
          awardedBy: "نیشنل اسکل اینڈ لٹریسی مشن"
        },
        ar: {
          title: "شهادة التميز في محو الأمية وتمكين مهارات الشباب",
          description: "مُنحت لتدريب أكثر من 1,500 شاب وشابة في مجالات البرمجة والحاسب الآلي وتأهيلهم لسوق العمل.",
          awardedBy: "التحالف الوطني لتنمية المهارات ومحو الأمية"
        }
      }
    }
  ]);
  console.log("Seeded 4 Awards!");

  // 7. PUBLICATIONS & DOWNLOADS
  await Download.deleteMany({});
  await Download.insertMany([
    {
      title: "Annual Impact & Transparency Report 2025-26",
      description: "Official comprehensive audited report outlining NGO activities, educational projects, donor fund utilization, and governance transparency.",
      category: "report",
      fileType: "pdf",
      status: "active",
      file: { public_id: "annual_report", url: "/public/uploads/annual-impact-report.pdf" },
      createdBy: adminId
    },
    {
      title: "Income Tax Section 12A & 80G Tax Exemption Certificate",
      description: "Official certificate granted by the Director of Income Tax (Exemption), India, providing 50% tax exemption to all donors under Section 80G.",
      category: "certificate",
      fileType: "pdf",
      status: "active",
      file: { public_id: "80g_cert", url: "/public/uploads/12a-80g-tax-exemption.pdf" },
      createdBy: adminId
    },
    {
      title: "NITI Aayog NGO Darpan Government Accreditation",
      description: "Official registration certificate under Government of India NITI Aayog NGO Darpan portal (Unique ID: UP/2026/0398412).",
      category: "certificate",
      fileType: "pdf",
      status: "active",
      file: { public_id: "darpan_cert", url: "/public/uploads/niti-aayog-darpan-cert.pdf" },
      createdBy: adminId
    },
    {
      title: "Government NGO Registration Certificate & Society Bylaws",
      description: "Official certificate of incorporation and registered society constitution under the Societies Registration Act (Reg No: S/19284/2012).",
      category: "certificate",
      fileType: "pdf",
      status: "active",
      file: { public_id: "ngo_cert", url: "/public/uploads/ngo-registration-certificate.pdf" },
      createdBy: adminId
    },
    {
      title: "Scholarly Monograph: Moderation, Ethics & Interfaith Harmony in Modern India",
      description: "Scholarly guidance monograph detailing the principles of moderation (Wasatiyyah), mutual respect, and collaborative civic duty.",
      category: "book",
      fileType: "pdf",
      status: "active",
      file: { public_id: "book_doc", url: "/public/uploads/12a-80g-tax-exemption.pdf" },
      createdBy: adminId
    },
    {
      title: "Research Paper: Modern Pedagogical Strategies for Rural Primary Education",
      description: "Academic paper presented at the National Education Conference highlighting methods to eradicate rural school dropouts.",
      category: "article",
      fileType: "pdf",
      status: "active",
      file: { public_id: "article_doc", url: "/public/uploads/ngo-registration-certificate.pdf" },
      createdBy: adminId
    }
  ]);
  console.log("Seeded 6 Publications & Official Certificates!");

  // 8. NEWSLETTER SUBSCRIBERS
  await Newsletter.deleteMany({});
  await Newsletter.insertMany([
    { email: "donors@humanitytrust.org", name: "Global Philanthropy Alliance", isActive: true },
    { email: "director@educareindia.org", name: "EduCare Foundation", isActive: true },
    { email: "alumni.delhi@alazhar.org", name: "Alumni Chapter Secretariat", isActive: true },
    { email: "csr.head@tataenterprise.in", name: "Corporate CSR Relations", isActive: true },
    { email: "volunteer.lead@rabbi.co.in", name: "Volunteers Network India", isActive: true }
  ]);
  console.log("Seeded Newsletter Subscribers!");

  console.log("SUCCESS: ALL 9 SECTIONS COMPREHENSIVELY SEEDED FOR DONATIONS & ADVERTISING!");
  process.exit(0);
}

seedAll().catch(err => {
  console.error("Seeding error:", err);
  process.exit(1);
});

