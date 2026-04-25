<p align="center">
  <img src="https://img.shields.io/badge/🕌-Karima_Ahle--Bait_Travels-D4AF37?style=for-the-badge&labelColor=1a362f&color=d4af37" alt="Logo" />
</p>

<h1 align="center">🕋 Karima Ahle-Bait Travels</h1>

<p align="center">
  <strong>A Premium, Elite-Tier Spiritual Travel Platform for Umrah, Hajj & Ziyarat</strong>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React-18.3-61DAFB?style=flat-square&logo=react&logoColor=white" />
  <img src="https://img.shields.io/badge/Vite-5.4-646CFF?style=flat-square&logo=vite&logoColor=white" />
  <img src="https://img.shields.io/badge/TypeScript-5.8-3178C6?style=flat-square&logo=typescript&logoColor=white" />
  <img src="https://img.shields.io/badge/Three.js-3D-000000?style=flat-square&logo=three.js&logoColor=white" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-3.4-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white" />
  <img src="https://img.shields.io/badge/Node.js-Express-339933?style=flat-square&logo=node.js&logoColor=white" />
  <img src="https://img.shields.io/badge/MongoDB-Atlas-47A248?style=flat-square&logo=mongodb&logoColor=white" />
  <img src="https://img.shields.io/badge/Framer_Motion-Animations-FF0050?style=flat-square&logo=framer&logoColor=white" />
</p>

<p align="center">
  <a href="#-features">Features</a> •
  <a href="#-tech-stack">Tech Stack</a> •
  <a href="#-quick-start">Quick Start</a> •
  <a href="#-project-structure">Structure</a> •
  <a href="#-api-endpoints">API</a> •
  <a href="#-deployment">Deployment</a>
</p>

---

## 🌟 Overview

**Karima Ahle-Bait Travels** is a luxury-grade, full-stack web application built for a spiritual travel agency specializing in **Umrah**, **Hajj**, and **Ziyarat** pilgrimage packages. The platform features a visually stunning frontend with interactive 3D elements, cinematic animations, glassmorphic design, and a fully functional backend powered by Node.js, Express, and MongoDB Atlas.

> 💡 This is not a basic website — it is designed to feel like a **million-dollar**, elite-class digital experience.

---

## ✨ Features

### 🎨 Frontend — Stunning UI/UX
| Feature | Description |
|---------|-------------|
| 🕋 **Cinematic Hero Section** | Ken Burns animated Kaaba background with deep emerald & gold overlays |
| 🌐 **Interactive 3D Particles** | Golden particle cloud & floating Icosahedron that follow your mouse cursor in real-time |
| 🧊 **Glassmorphism Design** | Frosted-glass cards, panels, and navigation with `backdrop-blur` effects |
| 🎭 **Framer Motion Animations** | Smooth scroll-reveal, page transitions, and hover micro-interactions |
| 🌙 **Luxury Color Palette** | Cream whites, deep emeralds, and regal gold — cohesive across every component |
| 📱 **Fully Responsive** | Optimized layouts for desktop, tablet, and mobile devices |
| 🔀 **Dynamic Navbar** | Transparent over hero → frosted glass on scroll, with animated underline indicators |
| 🃏 **Category Cards** | Umrah, Hajj, Ziyarat cards with desaturation-to-color hover reveals and glowing gold borders |
| 💳 **Premium Package Cards** | Ultra-glassy cards with inset images, golden badges, and smooth lift animations |
| 📋 **Multi-Step Booking Wizard** | Two-step animated booking form with glassmorphic order summary sidebar |
| 🔐 **Auth System** | Full login/register with JWT authentication and role-based access |
| 👤 **Customer Portal** | Users can view their bookings and account details |
| 🛡️ **Admin Dashboard** | Manage all bookings, users, and view analytics |

### ⚙️ Backend — Robust API
| Feature | Description |
|---------|-------------|
| 🔑 **JWT Authentication** | Secure token-based login & registration |
| 🔒 **Password Hashing** | Bcrypt encryption for all user passwords |
| 📦 **Booking Management** | Full CRUD operations for pilgrimage bookings |
| 👥 **User Management** | User registration, login, and profile management |
| 🗄️ **MongoDB Atlas** | Cloud-hosted database for reliable, scalable data storage |
| ✅ **Data Verification** | Built-in endpoint to verify database connectivity and data integrity |

---

## 🛠️ Tech Stack

### Frontend
```
⚛️  React 18          — UI library
⚡  Vite 5            — Lightning-fast build tool
📘  TypeScript        — Type-safe development
🎨  Tailwind CSS 3    — Utility-first styling
🎭  Framer Motion     — Fluid animations
🌐  Three.js          — 3D graphics (react-three-fiber + drei)
🧩  Shadcn/UI         — Accessible component primitives
🔗  React Router 6    — Client-side routing
📊  React Query       — Server state management
🔔  Sonner            — Beautiful toast notifications
💎  Lucide React      — Premium icon library
```

### Backend
```
🟢  Node.js           — Runtime environment
🚀  Express.js 5      — Web framework
🍃  MongoDB + Mongoose — Database & ODM
🔐  JWT               — Authentication tokens
🔒  Bcrypt            — Password hashing
🔄  CORS              — Cross-origin resource sharing
📁  Dotenv            — Environment configuration
🔁  Nodemon           — Hot-reload development
```

---

## 🚀 Quick Start

### 📋 Prerequisites

Make sure you have the following installed on your machine:

| Tool | Version | Download |
|------|---------|----------|
| **Node.js** | v18+ | [nodejs.org](https://nodejs.org/) |
| **npm** | v9+ | Comes with Node.js |
| **Git** | Latest | [git-scm.com](https://git-scm.com/) |
| **MongoDB** | Atlas (cloud) or Local | [mongodb.com](https://www.mongodb.com/) |

### 📥 Step 1: Clone the Repository

```bash
git clone https://github.com/biophys116-cell/karima-lovable-updated_2.0.git
cd karima-lovable-updated_2.0
```

### 📦 Step 2: Install Frontend Dependencies

```bash
npm install
```

### 📦 Step 3: Install Backend Dependencies

```bash
cd backend
npm install
cd ..
```

### 🔧 Step 4: Configure Environment Variables

#### Backend (`backend/.env`)

Create a `.env` file inside the `backend/` folder:

```env
PORT=5000
MONGO_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/karima-travels
JWT_SECRET=your_super_secret_jwt_key_here
```

> 💡 **Using Local MongoDB?** Replace `MONGO_URI` with:
> ```
> MONGO_URI=mongodb://127.0.0.1:27017/karima-travels
> ```

#### Frontend (`.env` in root)

Create a `.env` file in the project root:

```env
VITE_API_URL=http://localhost:5000/api
VITE_APP_NAME=Karima Ahle-Bait Travels
```

### ▶️ Step 5: Start the Backend Server

```bash
cd backend
npm run dev
```

You should see:
```
✅ Server running on port 5000
✅ MongoDB Connected ✅
```

### ▶️ Step 6: Start the Frontend Dev Server

Open a **new terminal** and run:

```bash
npm run dev
```

You should see:
```
VITE v5.4.19  ready in 463 ms

➜  Local:   http://localhost:8080/
```

### 🎉 Done!

Open **http://localhost:8080** in your browser and enjoy the elite experience! 🕌✨

---

## 📁 Project Structure

```
karima-lovable-updated_2.0/
│
├── 📂 backend/                    # 🟢 Express.js Backend
│   ├── 📂 models/
│   │   ├── Booking.js             # 📦 Booking schema (MongoDB)
│   │   └── User.js                # 👤 User schema (MongoDB)
│   ├── 📂 routes/
│   │   ├── authRoutes.js          # 🔐 Login & Register endpoints
│   │   ├── bookingRoutes.js       # 📋 Booking CRUD endpoints
│   │   └── userRoutes.js          # 👥 User management endpoints
│   ├── server.js                  # 🚀 Main Express server
│   ├── package.json               # 📦 Backend dependencies
│   └── .env                       # 🔒 Backend secrets (not in git)
│
├── 📂 src/                        # ⚛️ React Frontend
│   ├── 📂 assets/                 # 🖼️ Images (Kaaba, Madinah, Ziyarat)
│   ├── 📂 components/
│   │   ├── Hero3D.tsx             # 🌐 Interactive 3D particles & shapes
│   │   ├── Navbar.tsx             # 🧭 Dynamic transparent/frosted navbar
│   │   ├── PackageCard.tsx        # 💳 Glassmorphic package cards
│   │   ├── ScrollReveal.tsx       # 🎭 Scroll-triggered animations
│   │   ├── Footer.tsx             # 🦶 Site footer
│   │   ├── ErrorBoundary.tsx      # 🛡️ Error handling wrapper
│   │   ├── ProtectedRoute.tsx     # 🔐 Auth-gated route wrapper
│   │   └── 📂 ui/                 # 🧩 Shadcn/UI primitives
│   ├── 📂 contexts/
│   │   └── AuthContext.tsx        # 🔑 Authentication state management
│   ├── 📂 lib/
│   │   ├── api-client.ts          # 🔗 Axios API client
│   │   ├── data-store.ts          # 📊 Package data & utilities
│   │   └── utils.ts               # 🔧 Helper functions
│   ├── 📂 pages/
│   │   ├── Index.tsx              # 🏠 Home — Hero, Categories, Packages
│   │   ├── Packages.tsx           # 📦 All packages listing
│   │   ├── PackageDetail.tsx      # 📋 Single package view
│   │   ├── Booking.tsx            # 🎫 Multi-step booking wizard
│   │   ├── Login.tsx              # 🔐 Login & Register forms
│   │   ├── CustomerPortal.tsx     # 👤 User dashboard
│   │   ├── AdminDashboard.tsx     # 🛡️ Admin management panel
│   │   ├── Contact.tsx            # 📞 Contact form
│   │   ├── About.tsx              # ℹ️ About us page
│   │   └── NotFound.tsx           # 404 error page
│   ├── App.tsx                    # 🔀 Router & providers setup
│   ├── main.tsx                   # 📌 App entry point
│   └── index.css                  # 🎨 Global styles & theme variables
│
├── index.html                     # 📄 HTML entry
├── vite.config.ts                 # ⚡ Vite configuration
├── tailwind.config.ts             # 🎨 Tailwind theme & colors
├── tsconfig.json                  # 📘 TypeScript configuration
├── package.json                   # 📦 Frontend dependencies
├── .env.example                   # 📝 Environment template
├── .gitignore                     # 🚫 Ignored files
└── README.md                      # 📖 You are here!
```

---

## 🔌 API Endpoints

### 🔐 Authentication — `/api/auth`

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|:---:|
| `POST` | `/api/auth/register` | Register a new user | ❌ |
| `POST` | `/api/auth/login` | Login & receive JWT token | ❌ |

### 📦 Bookings — `/api/bookings`

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|:---:|
| `POST` | `/api/bookings` | Create a new booking | ✅ |
| `GET` | `/api/bookings` | Get all bookings (Admin) | ✅ Admin |
| `GET` | `/api/bookings/my` | Get logged-in user's bookings | ✅ |
| `PATCH` | `/api/bookings/:id` | Update booking status | ✅ Admin |

### 👥 Users — `/api/users`

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|:---:|
| `GET` | `/api/users` | Get all users (Admin) | ✅ Admin |

### 🔍 Verification

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/verify-data` | Check DB connectivity & data summary |

---

## 🎨 Design System

### Color Palette

| Color | Hex | Usage |
|-------|-----|-------|
| 🟡 **Gold** | `#D4AF37` | Primary accent, buttons, highlights |
| 🟢 **Emerald** | `#1A362F` | Primary backgrounds, headers |
| 🤍 **Cream** | `#FAF8F5` | Page backgrounds |
| ⚫ **Charcoal** | `#1C1C1E` | Text, dark sections |

### Design Principles

```
✦ Glassmorphism      → Frosted glass panels with backdrop-blur
✦ Ken Burns Effect   → Slow cinematic pan/zoom on hero images
✦ Micro-Animations   → Hover lifts, underline reveals, scale effects
✦ Scroll Reveals     → Elements animate into view on scroll
✦ 3D Interactivity   → Mouse-tracking particle fields & shapes
✦ Soft Luxury        → Creams + gold + emerald = elite aesthetic
```

---

## 🌐 Deployment

### Frontend → Vercel

1. Go to [vercel.com](https://vercel.com) → Import GitHub repo
2. **Framework Preset**: `Vite`
3. **Environment Variables**:
   - `VITE_API_URL` = `https://your-backend-url.onrender.com/api`
4. Click **Deploy** 🚀

### Backend → Render.com

1. Go to [render.com](https://render.com) → New Web Service
2. Connect your GitHub repo
3. **Settings**:
   - Root Directory: `backend`
   - Build Command: `npm install`
   - Start Command: `node server.js`
4. **Environment Variables**:
   - `MONGO_URI` = Your MongoDB Atlas connection string
   - `JWT_SECRET` = Your secret key
5. Click **Deploy** 🚀

---

## 🧪 Available Scripts

### Frontend

| Command | Description |
|---------|-------------|
| `npm run dev` | 🔥 Start development server |
| `npm run build` | 📦 Build for production |
| `npm run preview` | 👁️ Preview production build |
| `npm run lint` | 🔍 Run ESLint |
| `npm run test` | 🧪 Run Vitest tests |

### Backend

| Command | Description |
|---------|-------------|
| `npm run dev` | 🔥 Start with Nodemon (hot-reload) |
| `npm start` | 🚀 Start production server |

---

## 🔒 Security Notes

- 🔐 All passwords are hashed with **bcrypt** before storage
- 🎫 Authentication uses **JWT tokens** with configurable secrets
- 🚫 `.env` files are excluded from version control via `.gitignore`
- 🛡️ Admin routes are protected with role-based middleware
- 🌐 CORS is configured for cross-origin API access

---

## 📸 Page Routes

| Route | Page | Access |
|-------|------|--------|
| `/` | 🏠 Home | Public |
| `/packages` | 📦 All Packages | Public |
| `/packages/:id` | 📋 Package Details | Public |
| `/booking` | 🎫 Booking Wizard | 🔐 Logged In |
| `/login` | 🔑 Login / Register | Public |
| `/portal` | 👤 Customer Portal | 🔐 Logged In |
| `/admin` | 🛡️ Admin Dashboard | 🔐 Admin Only |
| `/contact` | 📞 Contact Us | Public |
| `/about` | ℹ️ About Us | Public |

---

## 🤝 Contributing

Contributions are welcome! Here's how:

1. 🍴 Fork the repository
2. 🌿 Create a feature branch: `git checkout -b feature/amazing-feature`
3. 💾 Commit your changes: `git commit -m 'Add amazing feature'`
4. 📤 Push to the branch: `git push origin feature/amazing-feature`
5. 🔃 Open a Pull Request

---

## 📄 License

This project is licensed under the **ISC License**.

---

<p align="center">
  <strong>Built with 💛 and devotion for the spiritual traveler</strong>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Made_with-React_+_Node.js_+_MongoDB-1a362f?style=for-the-badge&labelColor=d4af37&color=1a362f" />
</p>

<p align="center">
  ⭐ If you found this useful, please give the repo a star! ⭐
</p>
