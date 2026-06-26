# OpenTrek

**A full-stack platform that centralizes trekking discovery — connecting trekkers with verified trek leaders in one place.**

[![React](https://img.shields.io/badge/React-18-blue?logo=react)](https://react.dev)
[![Node.js](https://img.shields.io/badge/Node.js-Express-green?logo=node.js)](https://nodejs.org)
[![MongoDB](https://img.shields.io/badge/Database-MongoDB-green?logo=mongodb)](https://mongodb.com)
[![JWT](https://img.shields.io/badge/Auth-JWT-orange)](https://jwt.io)

---

## Overview

Trekking communities today rely on scattered channels — WhatsApp groups, Instagram pages, Telegram communities, and outdated blogs. There is no single reliable source of truth for discovering upcoming treks, comparing options, or reaching verified organizers.

**OpenTrek solves this.** It provides a centralized platform where trekkers can search, filter, and connect with trek organizers, while trek leaders get a dedicated dashboard to manage and publish their expeditions.

---

## Live Demo

[> _Add deployment link here (e.g., Vercel / Render / Railway)_]
(https://open-trek-platform-4.onrender.com/)

---

## Key Features

**For Trekkers**
- Browse and search treks by name or location
- Filter by month and difficulty level
- View detailed trek information
- Contact organizers directly via WhatsApp

**For Trek Leaders**
- Secure signup and login
- Create, edit, and delete trek listings
- Upload trek images via Cloudinary
- Manage all listings from a personal dashboard

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React.js, Vite, Tailwind CSS, React Router, Axios |
| Backend | Node.js, Express.js |
| Database | MongoDB, Mongoose |
| Auth | JWT (JSON Web Tokens) |
| Media | Multer, Cloudinary |

---

## Architecture

```
OpenTrek/
├── Backend/
│   ├── Controllers/       # Business logic
│   ├── Routes/            # API endpoint definitions
│   ├── Models/            # Mongoose schemas
│   ├── Middlewares/       # Auth, error handling
│   ├── Config/            # DB and environment config
│   └── Utils/             # Helper functions
│
└── Frontend/
    ├── Components/        # Reusable UI components
    ├── Pages/             # Route-level views
    ├── API Services/      # Axios API calls
    └── Assets/            # Static files
```

---

## Getting Started

### Prerequisites
- Node.js v18+
- MongoDB (local or Atlas)
- Cloudinary account (for image uploads)

### Installation

```bash
# Clone the repository
git clone https://github.com/yadnyesh23/open-trek-platform.git
cd open-trek-platform
```

**Backend**
```bash
cd Backend
npm install
```

Create a `.env` file in the `Backend/` directory:
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

```bash
npm run dev
```

**Frontend**
```bash
cd Frontend
npm install
npm run dev
```

---

## Screenshots

> _Add screenshots here_

| Page | Description |
|---|---|
| Home | Landing page with featured treks |
| Trek Listing | Searchable and filterable trek directory |
| Trek Details | Full expedition info and organizer contact |
| Dashboard | Trek leader's management panel |
| Create Trek | Form to publish a new trek listing |

---

## Roadmap

- [ ] Google Maps integration for route visualization
- [ ] Online booking and payment gateway
- [ ] User reviews and ratings
- [ ] Wishlist / saved treks
- [ ] AI-based trek recommendations
- [ ] Weather forecast integration
- [ ] Push notifications
- [ ] Admin dashboard

---

## What I Built and Learned

This project was built end-to-end as a solo full-stack project. Key areas covered:

- Designed and implemented a REST API with role-based access (trekker vs. trek leader)
- Built JWT-based authentication and protected route middleware
- Handled image uploads with Multer and Cloudinary integration
- Modeled MongoDB schemas for users, treks, and leaders using Mongoose
- Built a responsive frontend in React with filtering, search, and conditional rendering based on auth state
- Managed deployment and environment configuration across frontend and backend

---

## Contributing

Contributions and feature suggestions are welcome.

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/your-feature`)
3. Commit your changes
4. Open a Pull Request

---

## License

MIT License — see [LICENSE](LICENSE) for details.
