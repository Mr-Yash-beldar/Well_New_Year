# WellNewYear 🎉

A full-stack dietician-focused platform to promote New Year's health resolutions. Users can browse nutrition content, sign up/log in, book consultations, and track wellness goals.

## 🚀 Tech Stack

### Frontend

- **React 18** with Vite
- **React Router v6** for routing
- **TailwindCSS** for styling
- **Headless UI** for accessible components
- **TanStack Query** for server state management
- **Axios** for HTTP requests
- **React Toastify** for notifications

### Backend

- **Node.js** + **Express**
- **MongoDB** with Mongoose
- **JWT** authentication
- **bcryptjs** for password hashing
- Input validation with **Joi**
- Security with **helmet** and **CORS**

## 📁 Project Structure

```
WellNewYear/
├── frontend/          # React + Vite application
│   ├── src/
│   │   ├── pages/    # Route components
│   │   ├── components/  # Reusable components
│   │   ├── context/  # React context (Auth)
│   │   ├── hooks/    # Custom hooks
│   │   └── api/      # Axios configuration
│   └── package.json
├── backend/          # Express API server
│   ├── models/       # Mongoose schemas
│   ├── routes/       # API routes
│   ├── controllers/  # Route handlers
│   ├── middleware/   # Custom middleware
│   ├── config/       # Database config
│   ├── utils/        # Utilities & seed script
│   └── package.json
└── README.md
```

## 🔒 Security Features

- ✅ JWT-based authentication
- ✅ Password hashing with bcryptjs (10 salt rounds)
- ✅ CORS protection (configured for specific origin)
- ✅ Helmet security headers
- ✅ Input validation with Joi
- ✅ Protected routes on frontend and backend
- ✅ NoSQL injection prevention
- ✅ HTTP-only cookies support (configurable)

## 🎨 Features

### User Features

- Browse nutrition articles with search and filtering
- User registration and login
- Profile management
- Book consultations with dieticians
- Track wellness goals (weight, water intake, steps)
- View dashboard with goal progress

## 🛠️ Installation & Setup

### Prerequisites

- Node.js (v16 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### 1. Clone the repository

```bash
git clone <your-repo-url>
cd WellNewYear
```

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in the `backend` directory:

```env
# MongoDB Connection
MONGO_URI=mongodb://localhost:27017/wellnewyear
# Or use MongoDB Atlas:
# MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/wellnewyear

# JWT Secret (use a strong random string)
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production

# Server Port
PORT=5000

# Environment
NODE_ENV=development

# Frontend URL (for CORS)
FRONTEND_URL=http://localhost:5173
```

### 3. Frontend Setup

```bash
cd ../frontend
npm install
```

Create a `.env` file in the `frontend` directory:

```env
VITE_API_URL=http://localhost:5000/api
```

### 4. Seed the Database (Optional but Recommended)

This creates sample articles and a demo user:

```bash
cd backend
npm run seed
```

## 🚀 Running the Application

###   Run Both Services Separately

**Terminal 1 - Backend:**

```bash
cd backend
npm run dev
```

Backend runs on http://localhost:5000

**Terminal 2 - Frontend:**

```bash
cd frontend
npm run dev
```

Frontend runs on http://localhost:5173

```

**Happy New Year! Here's to a healthier you! 🎊🥗💪**
