# Backend README

## WellNewYear Backend API

This is the backend API server for the WellNewYear platform, built with Node.js, Express, and MongoDB.

## Features

- RESTful API architecture
- JWT-based authentication
- MongoDB with Mongoose ORM
- Input validation with Joi
- Security with Helmet and CORS
- Error handling middleware
- Request logging with Morgan
- Unit tests with Jest and Supertest

## Getting Started

### Prerequisites

- Node.js (v16+)
- MongoDB (local or Atlas)
- npm or yarn

### Installation

```bash
npm install
```

### Environment Variables

Create a `.env` file based on `.env.example`:

```env
MONGO_URI=mongodb://localhost:27017/wellnewyear
JWT_SECRET=your_secret_key_here
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
```

### Running the Server

**Development mode:**

```bash
npm run dev
```

**Production mode:**

```bash
npm start
```

### Seeding the Database

To populate the database with sample data:

```bash
npm run seed
```

This creates:

- Demo user: `demo@wellnewyear.com` / `Demo123!`
- Dietician: `sarah@wellnewyear.com` / `Dietician123!`
- 6 sample articles

### Running Tests

```bash
npm test
```

## API Documentation

### Base URL

```
http://localhost:5000/api
```

### Endpoints

#### Authentication

- `POST /auth/signup` - Register new user
- `POST /auth/login` - Login user
- `GET /auth/me` - Get current user (protected)
- `PUT /auth/profile` - Update profile (protected)

#### Articles

- `GET /articles` - List articles (with pagination, search, filters)
- `GET /articles/featured` - Get featured articles
- `GET /articles/:id` - Get article by ID
- `POST /articles` - Create article (admin/dietician)
- `PUT /articles/:id` - Update article (admin/dietician)
- `DELETE /articles/:id` - Delete article (admin)

#### Consultations

- `POST /consultations` - Book consultation (protected)
- `GET /consultations` - Get user's consultations (protected)
- `GET /consultations/all` - Get all consultations (admin/dietician)
- `GET /consultations/:id` - Get consultation by ID (protected)
- `PUT /consultations/:id` - Update consultation (protected)
- `DELETE /consultations/:id` - Delete consultation (protected)

#### Goals

- `POST /goals` - Create goal (protected)
- `GET /goals` - Get user's goals (protected)
- `GET /goals/stats` - Get goal statistics (protected)
- `GET /goals/:id` - Get goal by ID (protected)
- `PUT /goals/:id` - Update goal (protected)
- `DELETE /goals/:id` - Delete goal (protected)

## Project Structure

```
backend/
├── config/          # Configuration files
│   └── db.js       # Database connection
├── controllers/     # Route controllers
├── middleware/      # Custom middleware
├── models/         # Mongoose models
├── routes/         # API routes
├── utils/          # Utility functions
├── __tests__/      # Test files
├── server.js       # Entry point
└── package.json
```

## License

MIT
