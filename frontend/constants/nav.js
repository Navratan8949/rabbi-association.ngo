export const isGroup = (item) => item.children !== undefined

export const MAIN_NAV = [
  { label: "Home", href: "/" },
  {
    label: "About Us",
    children: [
      { label: "About Organization", href: "/about" },
      { label: "Mission & Vision", href: "/vision-mission" },
      { label: "Founder & Trustees", href: "/founder" },
      { label: "Team Members", href: "/team" },
      { label: "Registration & Legal", href: "/legal" },
      { label: "12A & 80G Info", href: "/80g-12a" },
    ],
  },
  {
    label: "Our Work",
    children: [
      { label: "Projects & Activities", href: "/projects" },
      { label: "Success Stories", href: "/success-stories" },
      { label: "Events", href: "/events" },
    ],
  },
  {
    label: "Media & Reports",
    children: [
      { label: "Photo & Video Gallery", href: "/gallery" },
      { label: "News & Blog", href: "/news" },
      { label: "Annual Reports", href: "/reports/annual" },
      { label: "Financial Transparency", href: "/reports/financial" },
    ],
  },
  {
    label: "Get Involved",
    children: [
      { label: "CSR Partnership", href: "/csr" },
      { label: "Volunteer With Us", href: "/volunteer" },
      { label: "Become a Member", href: "/membership" },
    ],
  },
  { label: "Contact Us", href: "/contact" },
];

export const FOOTER_QUICK_LINKS = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "What We Do", href: "/services/school-setup" },
  { label: "Programmes", href: "/programmes" },
  { label: "Contact Us", href: "/contact" },
  { label: "Donate", href: "/donate" },
]

export const FOOTER_RESOURCE_LINKS = [
  { label: "Vision & Mission", href: "/vision-mission" },
  { label: "Our Approach", href: "/approach" },
  { label: "CSR Support", href: "/csr" },
  { label: "Volunteer", href: "/volunteer" },
  { label: "Membership", href: "/membership" },
]
