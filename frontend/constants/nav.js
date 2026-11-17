export const isGroup = (item) => item.children !== undefined;

export const MAIN_NAV = [
  { label: "Home", key: "nav.home", href: "/" },
  {
    label: "About Us",
    key: "nav.about",
    children: [
      { label: "About Organization", key: "nav.about_org", href: "/about" },
      { label: "Mission & Vision", key: "nav.vision_mission", href: "/vision-mission" },
      { label: "Our Approach", key: "nav.approach", href: "/approach" },
      { label: "President & Trustees", key: "nav.founder_trustees", href: "/founder" },
      { label: "Team Members", key: "nav.team", href: "/team" },
      { label: "Certificates & Documents", key: "nav.certificates", href: "/certificates" },
      { label: "Awards & Recognition", key: "nav.awards", href: "/awards" },
      { label: "Registration & Legal", key: "nav.legal", href: "/legal" },
      { label: "12A & 80G Info", key: "nav.tax_info", href: "/80g-12a" },
    ],
  },
  {
    label: "Our Work",
    key: "nav.our_work",
    children: [
      { label: "What We Do", key: "nav.services", href: "/services" },
      { label: "Projects & Activities", key: "nav.projects", href: "/projects" },
      { label: "Support & Relief", key: "nav.crowdfunding", href: "/crowdfunding" },
      { label: "Success Stories", key: "nav.success_stories", href: "/success-stories" },
      { label: "Events & Conferences", key: "nav.events", href: "/events" },
    ],
  },
  {
    label: "Media & Reports",
    key: "nav.media_reports",
    children: [
      { label: "News & Articles", key: "nav.news", href: "/news" },
      { label: "Photo & Video Gallery", key: "nav.gallery", href: "/gallery" },
      { label: "Publications", key: "nav.publications", href: "/publications" },
      { label: "Annual Reports", key: "nav.reports_annual", href: "/reports/annual" },
      { label: "Financial Transparency", key: "nav.reports_financial", href: "/reports/financial" },
    ],
  },
  {
    label: "Get Involved",
    key: "nav.get_involved",
    children: [
      { label: "Become a Member", key: "nav.membership", href: "/membership" },
      { label: "Volunteer With Us", key: "nav.volunteer", href: "/volunteer" },
      { label: "CSR Partnership", key: "nav.csr", href: "/csr" },
    ],
  },
  { label: "Contact Us", key: "nav.contact", href: "/contact" },
];

export const FOOTER_QUICK_LINKS = [
  { label: "Home", key: "nav.home", href: "/" },
  { label: "About Us", key: "nav.about", href: "/about" },
  { label: "What We Do", key: "nav.services", href: "/services" },
  { label: "Projects & Activities", key: "nav.projects", href: "/projects" },
  { label: "Contact Us", key: "nav.contact", href: "/contact" },
  { label: "Donate", key: "nav.donate", href: "/donate" },
];

export const FOOTER_RESOURCE_LINKS = [
  { label: "Mission & Vision", key: "nav.vision_mission", href: "/vision-mission" },
  { label: "Our Approach", key: "nav.approach", href: "/approach" },
  { label: "CSR Partnership", key: "nav.csr", href: "/csr" },
  { label: "Volunteer With Us", key: "nav.volunteer", href: "/volunteer" },
  { label: "Membership", key: "nav.membership", href: "/membership" },
];
