# WellNewYear - Quick Start Guide 🚀

Welcome to WellNewYear! This guide will help you get the application running on your local machine in just a few minutes.

## Prerequisites Checklist

Before you begin, make sure you have:

- ✅ Node.js (v16 or higher) - [Download here](https://nodejs.org/)
- ✅ MongoDB installed and running - [Download here](https://www.mongodb.com/try/download/community)
  - Alternative: Use [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) (free tier available)
- ✅ A code editor (VS Code recommended)
- ✅ Terminal/Command Prompt

## Installation Steps

### Step 1: Navigate to Project Directory

```bash
cd e:\Assignments\Ano
```

### Step 2: Set Up Backend

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create .env file (copy from .env.example)
copy .env.example .env

# Edit .env file with your settings
# For local MongoDB: MONGO_URI=mongodb://localhost:27017/wellnewyear
# For MongoDB Atlas: MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/wellnewyear

# Seed the database with sample data
npm run seed

# Start the backend server
npm run dev
```

Backend will run on: **http://localhost:5000**

### Step 3: Set Up Frontend (New Terminal)

Open a new terminal window:

```bash
# Navigate to frontend directory
cd e:\Assignments\Ano\frontend

# Install dependencies
npm install

# Create .env file (copy from .env.example)
copy .env.example .env

# The default settings should work (.env content):
# VITE_API_URL=http://localhost:5000/api

# Start the frontend server
npm run dev
```

Frontend will run on: **http://localhost:5173**

### Step 4: Access the Application

Open your browser and visit: **http://localhost:5173**

## Demo Credentials

After running the seed script, you can login with:

**Regular User:**

- Email: `demo@wellnewyear.com`
- Password: `Demo123!`

**Dietician Account:**

- Email: `sarah@wellnewyear.com`
- Password: `Dietician123!`

## Verification Checklist

Verify your installation is working:

1. ✅ Backend server running without errors
2. ✅ Frontend loads in browser
3. ✅ Can navigate to different pages
4. ✅ Can login with demo credentials
5. ✅ Dashboard displays after login
6. ✅ Can view articles
7. ✅ Can book a consultation

## Common Issues & Solutions

### Issue: "Cannot connect to MongoDB"

**Solution:**

- Make sure MongoDB is running
- Check your MONGO_URI in backend/.env
- For local MongoDB: Start MongoDB service
- For Atlas: Verify connection string and whitelist your IP

### Issue: "Port already in use"

**Solution:**

- Backend (5000): Change PORT in backend/.env
- Frontend (5173): Change port in frontend/vite.config.js

### Issue: "Module not found"

**Solution:**

```bash
# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Issue: "CORS errors in browser"

**Solution:**

- Verify FRONTEND_URL in backend/.env matches your frontend URL
- Usually: `http://localhost:5173`

## Project Structure Overview

```
WellNewYear/
├── backend/           # Express API server
│   ├── models/       # MongoDB schemas
│   ├── routes/       # API routes
│   ├── controllers/  # Business logic
│   ├── middleware/   # Custom middleware
│   └── server.js     # Entry point
│
├── frontend/         # React application
│   ├── src/
│   │   ├── pages/   # Route pages
│   │   ├── components/ # Reusable components
│   │   ├── hooks/   # Custom React hooks
│   │   └── context/ # Auth context
│   └── index.html
│
└── README.md         # Main documentation
```

## Development Workflow

### Running Both Servers

**Option 1: Two Terminals**

- Terminal 1: `cd backend && npm run dev`
- Terminal 2: `cd frontend && npm run dev`

**Option 2: Concurrently (Recommended)**

```bash
# Install concurrently globally
npm install -g concurrently

# From project root
concurrently "cd backend && npm run dev" "cd frontend && npm run dev"
```

### Making Changes

**Backend Changes:**

- Models: `backend/models/`
- Routes: `backend/routes/`
- Controllers: `backend/controllers/`
- Server auto-restarts with nodemon

**Frontend Changes:**

- Pages: `frontend/src/pages/`
- Components: `frontend/src/components/`
- Hot reload enabled

## Testing the Application

### Backend Tests

```bash
cd backend
npm test
```

### Manual Testing Checklist

1. **Authentication:**

   - [ ] Sign up new user
   - [ ] Login with credentials
   - [ ] Logout
   - [ ] Protected routes redirect when not authenticated

2. **Articles:**

   - [ ] View articles list
   - [ ] Search articles
   - [ ] Filter by tags
   - [ ] View article detail

3. **Consultations:**

   - [ ] Book a consultation
   - [ ] View upcoming consultations
   - [ ] Cancel consultation

4. **Goals:**

   - [ ] Create a new goal
   - [ ] Update goal progress
   - [ ] View goal statistics

5. **Profile:**
   - [ ] View profile
   - [ ] Edit profile information

## API Endpoints Reference

### Authentication

- `POST /api/auth/signup` - Register
- `POST /api/auth/login` - Login
- `GET /api/auth/me` - Get current user

### Articles

- `GET /api/articles` - List articles
- `GET /api/articles/:id` - Get article

### Consultations

- `POST /api/consultations` - Book consultation
- `GET /api/consultations` - Get user consultations

### Goals

- `POST /api/goals` - Create goal
- `GET /api/goals` - Get user goals
- `PUT /api/goals/:id` - Update goal

## Next Steps

1. **Explore the Code:**

   - Read through the main README.md
   - Check backend/README.md for API details
   - Check frontend/README.md for UI details

2. **Customize:**

   - Change colors in tailwind.config.js
   - Add new features
   - Modify existing components

3. **Deploy:**
   - Backend: Heroku, Railway, Render
   - Frontend: Vercel, Netlify
   - Database: MongoDB Atlas

## Getting Help

If you run into issues:

1. Check the error messages in the terminal
2. Review the README files in backend/ and frontend/
3. Verify environment variables are set correctly
4. Check MongoDB connection
5. Ensure all dependencies are installed

## Resources

- [React Documentation](https://react.dev/)
- [Express Documentation](https://expressjs.com/)
- [MongoDB Documentation](https://docs.mongodb.com/)
- [TailwindCSS Documentation](https://tailwindcss.com/)
- [Vite Documentation](https://vitejs.dev/)

---

**Happy Coding! 🎉**

For detailed information, refer to the main README.md file.
