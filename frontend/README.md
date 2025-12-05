# Frontend README

## WellNewYear Frontend

A modern, responsive React application for the WellNewYear platform built with Vite, TailwindCSS, and React Query.

## Features

- ⚡ Fast development with Vite
- 🎨 Beautiful UI with TailwindCSS
- 🌙 Dark mode support
- 📱 Fully responsive design
- 🔐 JWT authentication
- 🔄 Optimistic updates with React Query
- 🎉 Toast notifications
- ♿ Accessible components with Headless UI
- 🎯 Protected routes

## Getting Started

### Prerequisites

- Node.js (v16+)
- npm or yarn

### Installation

```bash
npm install
```

### Environment Variables

Create a `.env` file based on `.env.example`:

```env
VITE_API_URL=http://localhost:5000/api
```

### Running the App

**Development mode:**
```bash
npm run dev
```

The app will run on http://localhost:5173

**Build for production:**
```bash
npm run build
```

**Preview production build:**
```bash
npm run preview
```

**Lint code:**
```bash
npm run lint
```

**Format code:**
```bash
npm run format
```

## Project Structure

```
frontend/
├── public/             # Static assets
├── src/
│   ├── api/           # Axios configuration
│   ├── components/    # Reusable components
│   ├── context/       # React context providers
│   ├── hooks/         # Custom hooks
│   ├── pages/         # Page components
│   ├── App.jsx        # Main app component
│   ├── main.jsx       # Entry point
│   └── index.css      # Global styles
├── index.html         # HTML template
├── vite.config.js     # Vite configuration
├── tailwind.config.js # Tailwind configuration
└── package.json
```

## Key Technologies

- **React 18** - UI library
- **Vite** - Build tool and dev server
- **React Router v6** - Client-side routing
- **TanStack Query** - Server state management
- **Axios** - HTTP client
- **TailwindCSS** - Utility-first CSS
- **Headless UI** - Unstyled accessible components
- **Heroicons** - Beautiful icons
- **React Toastify** - Toast notifications

## Authentication

The app uses JWT-based authentication with tokens stored in localStorage. The axios instance automatically attaches the token to all requests and handles 401 errors by redirecting to login.

### Auth Context

The `AuthContext` provides:
- `user` - Current user object
- `isAuthenticated` - Boolean authentication status
- `login(email, password)` - Login function
- `signup(name, email, password)` - Signup function
- `logout()` - Logout function
- `updateProfile(name, email)` - Update profile function

## Routes

### Public Routes
- `/` - Home page
- `/articles` - Articles listing
- `/articles/:id` - Article detail
- `/signup` - User registration
- `/login` - User login

### Protected Routes
- `/profile` - User profile
- `/dashboard` - User dashboard
- `/book` - Book consultation

### Error Pages
- `/404` - Not found
- `/500` - Server error
- `/505` - HTTP version not supported

## Components

### Layout Components
- `Header` - Navigation bar with mobile menu
- `Footer` - Site footer with links

### Shared Components
- `ArticleCard` - Article preview card
- `Spinner` - Loading spinner
- `ProtectedRoute` - Route wrapper for auth

## Custom Hooks

### useArticles
Fetch and manage articles with filtering and pagination.

### useConsultations
Manage consultation bookings and history.

### useGoals
Track and update user wellness goals.

## Styling

The app uses TailwindCSS with a custom configuration:

- Primary color: Green (`primary-*`)
- Dark mode support via `class` strategy
- Custom utility classes for buttons, inputs, cards
- Responsive breakpoints: sm, md, lg, xl

## State Management

- **Local State**: React useState for component-specific state
- **Auth State**: React Context for user authentication
- **Server State**: React Query for API data caching and synchronization

## API Integration

All API calls go through the configured axios instance in `src/api/axios.js` which:
- Attaches JWT tokens automatically
- Handles errors globally
- Shows toast notifications for errors
- Redirects on 401 (unauthorized)

## Development Tips

### Adding a New Page

1. Create component in `src/pages/`
2. Add route in `App.jsx`
3. Link to it from navigation

### Adding a New API Hook

1. Create hook in `src/hooks/`
2. Use React Query's `useQuery` or `useMutation`
3. Import and use in components

### Styling Guidelines

- Use Tailwind utility classes
- Follow mobile-first approach
- Use dark mode variants (`dark:`)
- Maintain consistent spacing

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

MIT
