import { PageHero } from "@/components/pages/page-hero";
import { BookOpen, GraduationCap, Building2, Lightbulb, Users, LineChart, Building, HeartHandshake } from "lucide-react";
import { Reveal } from "@/components/shared/reveal";

export const metadata = {
  title: "What We Do | Rabbi Association",
  description: "Our Educational Solutions: From new school setup to academic excellence and institutional development.",
};

const services = [
  {
    id: "01",
    title: "NEW SCHOOL SETUP CONSULTANCY",
    subtitle: "From Vision to Institution",
    desc: "We provide strategic guidance for establishing new educational institutions—from initial concept to commencement.",
    bullets: [
      "School concept development",
      "Feasibility and planning",
      "Infrastructure guidance",
      "Academic planning",
      "Administrative systems",
      "Staffing and recruitment",
      "Pre-launch planning",
      "Institutional development"
    ],
    icon: Building2
  },
  {
    id: "02",
    title: "AFFILIATION & UPGRADATION SUPPORT",
    subtitle: "Professional Guidance & Documentation",
    desc: "We provide professional consultancy, guidance, and documentation support to institutions seeking appropriate educational board affiliation, recognition, or upgradation.",
    bullets: [
      "CBSE",
      "CISCE / ICSE",
      "IB",
      "Cambridge",
      "State Boards",
      "Documentation support",
      "Compliance preparation",
      "Institutional readiness",
      "Upgradation planning"
    ],
    icon: BookOpen
  },
  {
    id: "03",
    title: "SCHOOL MANAGEMENT & ADMINISTRATION",
    subtitle: "Building Efficient Educational Systems",
    desc: "We help educational institutions develop effective systems for day-to-day administration and long-term institutional growth.",
    bullets: [
      "Academic administration",
      "School policies and procedures",
      "HR systems",
      "Operational planning",
      "Performance monitoring",
      "Institutional development",
      "Administrative systems",
      "Leadership support"
    ],
    icon: LineChart
  },
  {
    id: "04",
    title: "ACADEMIC EXCELLENCE",
    subtitle: "Strengthening Teaching and Learning",
    desc: "We support schools in developing effective teaching-learning practices and academic systems.",
    bullets: [
      "Academic planning",
      "Curriculum support",
      "Teacher development",
      "Assessment systems",
      "Remedial programmes",
      "Student development initiatives",
      "Academic monitoring",
      "Learning improvement strategies"
    ],
    icon: GraduationCap
  },
  {
    id: "05",
    title: "TEACHER TRAINING & CAPACITY BUILDING",
    subtitle: "Empowering Educators to Inspire",
    desc: "We support the professional development of educators through training, orientation, and capacity-building programmes.",
    bullets: [
      "Teacher orientation",
      "Training workshops",
      "Classroom management",
      "Leadership development",
      "Communication skills",
      "Modern teaching methodologies",
      "Student-centred learning",
      "Continuous professional development"
    ],
    icon: Users
  },
  {
    id: "06",
    title: "SCHOOL BRANDING & MARKETING",
    subtitle: "Helping Institutions Communicate Their Identity",
    desc: "We help educational institutions build a clear, professional, and meaningful identity.",
    bullets: [
      "School branding",
      "Logo and visual identity",
      "Website content",
      "Social media strategy",
      "Admission campaigns",
      "Prospectus and brochures",
      "Digital communication",
      "Institutional profile development"
    ],
    icon: Lightbulb
  },
  {
    id: "07",
    title: "INFRASTRUCTURE & CAMPUS DEVELOPMENT",
    subtitle: "Creating Better Learning Environments",
    desc: "We provide planning and development guidance for safe, functional, modern, and inspiring educational spaces.",
    bullets: [
      "School campus development",
      "Classrooms",
      "Laboratories",
      "Libraries",
      "Smart classrooms",
      "Activity rooms",
      "Sports facilities",
      "Administrative areas",
      "Student-friendly environments"
    ],
    icon: Building
  },
  {
    id: "08",
    title: "RECRUITMENT & MANPOWER SOLUTIONS",
    subtitle: "The Right People Build the Right Institution",
    desc: "We support educational institutions with manpower planning, recruitment, and staff development.",
    bullets: [
      "Principals",
      "Vice Principals",
      "Coordinators",
      "Teachers",
      "Administrators",
      "Counsellors",
      "Office staff",
      "Support staff"
    ],
    icon: HeartHandshake
  }
];

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      <PageHero
        eyebrow="What We Do"
        title="Our Educational Solutions"
        description="Providing strategic guidance and support to educational institutions for sustainable growth."
        breadcrumbItems={[
          { label: "Home", href: "/" },
          { label: "Our Work", href: "/projects" },
          { label: "What We Do", href: "/services" },
        ]}
      />

      <section className="py-24">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-2">
            {services.map((svc, idx) => {
              const Icon = svc.icon;
              return (
                <Reveal key={svc.id} delay={idx * 0.05}>
                  <div className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-100 shadow-sm hover:shadow-md transition-shadow h-full flex flex-col relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-8 opacity-[0.03] pointer-events-none">
                      <span className="text-8xl font-black text-navy">{svc.id}</span>
                    </div>
                    
                    <div className="flex items-center gap-4 mb-6">
                      <div className="size-14 rounded-2xl bg-accent/10 flex items-center justify-center shrink-0">
                        <Icon className="size-7 text-accent" />
                      </div>
                      <div>
                        <span className="text-xs font-bold text-slate-400 mb-1 block">{svc.id}</span>
                        <h2 className="text-xl font-bold text-navy leading-tight">{svc.title}</h2>
                      </div>
                    </div>
                    
                    <h3 className="text-accent font-bold mb-4">{svc.subtitle}</h3>
                    <p className="text-slate-600 font-medium leading-relaxed mb-8">{svc.desc}</p>
                    
                    <div className="mt-auto pt-6 border-t border-slate-100">
                      <ul className="grid sm:grid-cols-2 gap-y-3 gap-x-6">
                        {svc.bullets.map((bullet, bIdx) => (
                          <li key={bIdx} className="flex items-start gap-2">
                            <div className="size-1.5 rounded-full bg-accent mt-2 shrink-0"></div>
                            <span className="text-sm font-medium text-slate-600 leading-tight">{bullet}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
}
