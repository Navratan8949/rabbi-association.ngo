# RABBI ASSOCIATION — Official Website & Management System

> **Motto:** Love & Service | Love God and Serve Humanity  
> **Vision:** Educate with Purpose. Empower with Values. Serve with Love.  
> **Mission:** Making Life Better Through Education.

---

## 📖 Overview
Rabbi Association is an educational consultancy, institutional development, and social welfare non-profit organisation committed to advancing quality education, human empowerment, institutional excellence, and sustainable community development.

## 🚀 Tech Stack
- **Frontend:** Next.js 15 (App Router), React, Tailwind CSS, Redux Toolkit, Lucide Icons, Sonner.
- **Backend:** Node.js, Express.js, MongoDB (Mongoose), JWT, Multer, Nodemailer, PDFKit.
- **Production Server:** aaPanel Linux Server (Nginx Reverse Proxy, Node PM2, MongoDB).
- **Domains:**
  - Frontend: `https://rabbi.co.in`
  - Backend API: `https://api.rabbi.co.in`

---

## 🛠️ Project Structure
```
├── frontend/             # Next.js App Router Frontend
│   ├── app/              # Routes: Public, Admin, Member, Volunteer
│   ├── components/       # Reusable UI & Layout Components
│   ├── service/          # API Clients & Service Endpoints
│   └── public/           # Static assets, logos, and placeholders
└── backend/              # Express API Backend
    ├── src/
    │   ├── controllers/  # API Controllers
    │   ├── models/       # Mongoose Data Models
    │   ├── routes/       # Express Route Definitions
    │   └── utils/        # Seed scripts, utilities, and helpers
    └── public/uploads/   # User uploaded files and documents
```

---

## 📜 Official Content Sync
To populate or refresh official Rabbi Association content in MongoDB:
```bash
cd backend
node src/utils/seed_rabbi_official_content.js
```

---

## ⚖️ License & Copyright
© 2026 Rabbi Association. All Rights Reserved.  
Registered Charitable Trust • 80G & 12A Certified.
