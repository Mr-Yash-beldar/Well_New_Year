# WellNewYear API Documentation

Base URL: `http://localhost:5000/api`

## Authentication

All protected endpoints require a JWT token in the Authorization header:

```
Authorization: Bearer <your_jwt_token>
```

---

## Endpoints

### 🔐 Authentication Routes

#### POST /auth/signup

Create a new user account.

**Request Body:**

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "SecurePass123"
}
```

**Response (201):**

```json
{
  "status": "success",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user"
  }
}
```

**Errors:**

- `400` - Validation error or email already exists

---

#### POST /auth/login

Login with email and password.

**Request Body:**

```json
{
  "email": "john@example.com",
  "password": "SecurePass123"
}
```

**Response (200):**

```json
{
  "status": "success",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user"
  }
}
```

**Errors:**

- `401` - Invalid credentials

---

#### GET /auth/me

Get current user information. 🔒 Protected

**Response (200):**

```json
{
  "status": "success",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user",
    "createdAt": "2025-01-01T00:00:00.000Z"
  }
}
```

---

#### PUT /auth/profile

Update user profile. 🔒 Protected

**Request Body:**

```json
{
  "name": "John Updated",
  "email": "john.new@example.com"
}
```

**Response (200):**

```json
{
  "status": "success",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Updated",
    "email": "john.new@example.com",
    "role": "user"
  }
}
```

---

### 📚 Article Routes

#### GET /articles

Get all articles with pagination and filtering.

**Query Parameters:**

- `page` (number, default: 1) - Page number
- `limit` (number, default: 10) - Items per page
- `search` (string) - Search in title, excerpt, body
- `tag` (string) - Filter by tag

**Example:** `/articles?page=1&limit=10&search=nutrition&tag=diet`

**Response (200):**

```json
{
  "status": "success",
  "results": 10,
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 50,
    "pages": 5
  },
  "data": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "title": "10 Superfoods to Kickstart Your New Year",
      "slug": "10-superfoods-to-kickstart-your-new-year",
      "excerpt": "Discover the most nutrient-dense foods...",
      "tags": ["nutrition", "superfoods", "health"],
      "author": "Dr. Sarah Johnson",
      "coverImageUrl": "https://example.com/image.jpg",
      "createdAt": "2025-01-01T00:00:00.000Z"
    }
  ]
}
```

---

#### GET /articles/featured

Get featured articles (latest 3).

**Response (200):**

```json
{
  "status": "success",
  "results": 3,
  "data": [...]
}
```

---

#### GET /articles/:id

Get single article by ID.

**Response (200):**

```json
{
  "status": "success",
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "title": "10 Superfoods to Kickstart Your New Year",
    "slug": "10-superfoods-to-kickstart-your-new-year",
    "excerpt": "Discover the most nutrient-dense foods...",
    "body": "Full article content here...",
    "tags": ["nutrition", "superfoods", "health"],
    "author": "Dr. Sarah Johnson",
    "coverImageUrl": "https://example.com/image.jpg",
    "published": true,
    "createdAt": "2025-01-01T00:00:00.000Z",
    "updatedAt": "2025-01-01T00:00:00.000Z"
  }
}
```

**Errors:**

- `404` - Article not found

---

#### POST /articles

Create a new article. 🔒 Protected (Admin/Dietician only)

**Request Body:**

```json
{
  "title": "New Article Title",
  "excerpt": "Brief description of the article",
  "body": "Full article content...",
  "tags": ["nutrition", "health"],
  "author": "Dr. Sarah Johnson",
  "coverImageUrl": "https://example.com/image.jpg"
}
```

**Response (201):**

```json
{
  "status": "success",
  "data": {...}
}
```

---

### 📅 Consultation Routes

#### POST /consultations

Book a new consultation. 🔒 Protected

**Request Body:**

```json
{
  "date": "2025-01-15T10:00:00Z",
  "type": "Initial Consultation",
  "notes": "Looking to lose weight and improve nutrition"
}
```

**Valid consultation types:**

- "Initial Consultation"
- "Follow-up"
- "Nutrition Plan Review"
- "Weight Management"
- "Sports Nutrition"
- "Other"

**Response (201):**

```json
{
  "status": "success",
  "message": "Consultation booked successfully",
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "user": {
      "_id": "507f1f77bcf86cd799439012",
      "name": "John Doe",
      "email": "john@example.com"
    },
    "date": "2025-01-15T10:00:00.000Z",
    "type": "Initial Consultation",
    "notes": "Looking to lose weight and improve nutrition",
    "status": "pending",
    "createdAt": "2025-01-01T00:00:00.000Z"
  }
}
```

**Errors:**

- `400` - Time slot already booked or validation error

---

#### GET /consultations

Get all consultations for logged-in user. 🔒 Protected

**Response (200):**

```json
{
  "status": "success",
  "results": 5,
  "data": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "user": {...},
      "date": "2025-01-15T10:00:00.000Z",
      "type": "Initial Consultation",
      "notes": "Looking to lose weight",
      "status": "pending",
      "createdAt": "2025-01-01T00:00:00.000Z"
    }
  ]
}
```

---

#### GET /consultations/all

Get all consultations (Admin/Dietician only). 🔒 Protected

**Query Parameters:**

- `page` (number)
- `limit` (number)
- `status` (string) - Filter by status

**Response (200):**

```json
{
  "status": "success",
  "results": 20,
  "pagination": {...},
  "data": [...]
}
```

---

#### GET /consultations/:id

Get single consultation by ID. 🔒 Protected

**Response (200):**

```json
{
  "status": "success",
  "data": {...}
}
```

**Errors:**

- `403` - Not authorized
- `404` - Consultation not found

---

#### PUT /consultations/:id

Update consultation status. 🔒 Protected

**Request Body:**

```json
{
  "status": "confirmed",
  "notes": "Updated notes"
}
```

**Valid statuses:**

- "pending"
- "confirmed"
- "completed"
- "cancelled"

**Response (200):**

```json
{
  "status": "success",
  "data": {...}
}
```

---

#### DELETE /consultations/:id

Delete consultation. 🔒 Protected

**Response (200):**

```json
{
  "status": "success",
  "message": "Consultation deleted successfully"
}
```

---

### 🎯 Goal Routes

All goal routes require authentication. 🔒

#### POST /goals

Create a new goal.

**Request Body:**

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

**Valid goal types:**

- "weight"
- "water"
- "steps"
- "calories"
- "exercise"
- "custom" (requires `title` field)

**Response (201):**

```json
{
  "status": "success",
  "message": "Goal created successfully",
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "user": "507f1f77bcf86cd799439012",
    "type": "weight",
    "title": "Weight Goal",
    "target": 70,
    "unit": "kg",
    "current": 80,
    "startDate": "2025-01-01T00:00:00.000Z",
    "endDate": "2025-12-31T00:00:00.000Z",
    "status": "active",
    "progressPercentage": 0,
    "progressHistory": []
  }
}
```

---

#### GET /goals

Get all goals for logged-in user.

**Query Parameters:**

- `status` (string) - Filter by status (active, completed, paused, cancelled)
- `type` (string) - Filter by type

**Response (200):**

```json
{
  "status": "success",
  "results": 5,
  "data": [...]
}
```

---

#### GET /goals/stats

Get goal statistics for user.

**Response (200):**

```json
{
  "status": "success",
  "data": {
    "total": 10,
    "active": 5,
    "completed": 3,
    "paused": 2,
    "byType": {
      "weight": 3,
      "water": 2,
      "steps": 5
    }
  }
}
```

---

#### GET /goals/:id

Get single goal by ID.

**Response (200):**

```json
{
  "status": "success",
  "data": {...}
}
```

---

#### PUT /goals/:id

Update goal progress or status.

**Request Body:**

```json
{
  "current": 75,
  "target": 70,
  "status": "active"
}
```

**Response (200):**

```json
{
  "status": "success",
  "message": "Goal updated successfully",
  "data": {...}
}
```

**Note:** Goal automatically changes to "completed" when current >= target

---

#### DELETE /goals/:id

Delete a goal.

**Response (200):**

```json
{
  "status": "success",
  "message": "Goal deleted successfully"
}
```

---

## Error Responses

All errors follow this format:

```json
{
  "status": "error",
  "message": "Error description"
}
```

### Common HTTP Status Codes

- `200` - Success
- `201` - Created
- `400` - Bad Request (validation error)
- `401` - Unauthorized (not authenticated)
- `403` - Forbidden (not authorized)
- `404` - Not Found
- `500` - Internal Server Error
- `505` - HTTP Version Not Supported

### Validation Errors

Validation errors include details:

```json
{
  "status": "error",
  "message": "Validation failed",
  "details": [
    {
      "field": "email",
      "message": "Please provide a valid email"
    },
    {
      "field": "password",
      "message": "Password must be at least 6 characters"
    }
  ]
}
```

---

## Rate Limiting

Currently, no rate limiting is implemented. In production, consider adding rate limiting to prevent abuse.

**Recommended:**

- 100 requests per 15 minutes for general endpoints
- 5 login attempts per 15 minutes

---

## CORS

The API is configured to accept requests from the frontend origin specified in the environment variable `FRONTEND_URL` (default: `http://localhost:5173`).

---

## Health Check

#### GET /health

Check if the API is running.

**Response (200):**

```json
{
  "status": "ok",
  "timestamp": "2025-01-01T00:00:00.000Z"
}
```

---

## Testing with cURL

### Example: Signup

```bash
curl -X POST http://localhost:5000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "SecurePass123"
  }'
```

### Example: Get Articles

```bash
curl http://localhost:5000/api/articles?page=1&limit=10
```

### Example: Protected Request

```bash
curl http://localhost:5000/api/auth/me \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

---

## Postman Collection

Import these endpoints into Postman for easy testing. Save the token from login/signup and use it in the Authorization tab for protected routes.

---

**Last Updated:** January 2025
