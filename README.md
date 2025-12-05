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

### Option 1: Run Both Services Separately

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

### Option 2: Run Concurrently (Recommended)

First, install concurrently in the root:

```bash
npm install -g concurrently
```

Then from the root directory:

```bash
concurrently "cd backend && npm run dev" "cd frontend && npm run dev"
```

## 📚 API Endpoints

### Authentication

- `POST /api/auth/signup` - Register a new user

  ```json
  {
    "name": "John Doe",
    "email": "john@example.com",
    "password": "SecurePass123!"
  }
  ```

  Response: `{ token, user: { id, name, email, role } }`

- `POST /api/auth/login` - Login user

  ```json
  {
    "email": "john@example.com",
    "password": "SecurePass123!"
  }
  ```

  Response: `{ token, user: { id, name, email, role } }`

- `GET /api/auth/me` - Get current user (Protected)
  Headers: `Authorization: Bearer <token>`

### Articles

- `GET /api/articles` - List all articles
  Query params: `?page=1&limit=10&search=nutrition&tag=diet`
- `GET /api/articles/:id` - Get article by ID

- `POST /api/articles` - Create article (Admin only)

### Consultations

- `POST /api/consultations` - Book consultation (Protected)

  ```json
  {
    "date": "2025-01-15T10:00:00Z",
    "type": "Initial Consultation",
    "notes": "Looking to lose weight"
  }
  ```

- `GET /api/consultations` - Get user's consultations (Protected)

- `PUT /api/consultations/:id` - Update consultation status

### Goals

- `POST /api/goals` - Create goal (Protected)

  ```json
  {
    "type": "weight",
    "target": 70,
    "unit": "kg",
    "current": 80,
    "startDate": "2025-01-01",
    "endDate": "2025-12-31"
  }
  ```

- `GET /api/goals` - Get user's goals (Protected)

- `PUT /api/goals/:id` - Update goal progress (Protected)

## 🧪 Testing

Run backend tests:

```bash
cd backend
npm test
```

## 📦 Building for Production

### Backend

```bash
cd backend
npm start
```

### Frontend

```bash
cd frontend
npm run build
npm run preview
```

The build output will be in `frontend/dist/`.

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

### UI/UX

- Fully responsive design (mobile-first)
- Dark mode toggle
- Accessible components (ARIA labels)
- Toast notifications for user feedback
- Modal dialogs for booking
- Form validation (client & server)
- Loading states and spinners
- Custom error pages (404, 500, 505)

## 🛣️ Routes

- `/` - Home page with hero and featured articles
- `/articles` - Browse all articles
- `/articles/:id` - View article details
- `/signup` - User registration
- `/login` - User login
- `/profile` - User profile (Protected)
- `/book` - Book consultation (Protected)
- `/dashboard` - User dashboard (Protected)
- `/404` - Not found page
- `/500` - Server error page
- `/505` - HTTP version not supported page

## 📝 Environment Variables

### Backend (.env)

| Variable       | Description                | Example                                 |
| -------------- | -------------------------- | --------------------------------------- |
| `MONGO_URI`    | MongoDB connection string  | `mongodb://localhost:27017/wellnewyear` |
| `JWT_SECRET`   | Secret key for JWT signing | `your_secret_key_here`                  |
| `PORT`         | Server port                | `5000`                                  |
| `NODE_ENV`     | Environment                | `development` or `production`           |
| `FRONTEND_URL` | Frontend URL for CORS      | `http://localhost:5173`                 |

### Frontend (.env)

| Variable       | Description     | Example                     |
| -------------- | --------------- | --------------------------- |
| `VITE_API_URL` | Backend API URL | `http://localhost:5000/api` |

## 🚧 TODOs for Production

- [ ] Set up email service for consultation confirmations
- [ ] Implement forgot password functionality
- [ ] Add rate limiting for API endpoints
- [ ] Set up proper logging service (Winston + external service)
- [ ] Implement refresh tokens
- [ ] Add comprehensive test coverage
- [ ] Set up CI/CD pipeline
- [ ] Configure CDN for static assets
- [ ] Add monitoring and analytics
- [ ] Implement proper backup strategy for MongoDB

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 👥 Authors

- Your Name - Initial work

## 🙏 Acknowledgments

- TailwindCSS for the amazing utility-first CSS framework
- The React team for the excellent library
- MongoDB team for the flexible database solution

---

**Happy New Year! Here's to a healthier you! 🎊🥗💪**
