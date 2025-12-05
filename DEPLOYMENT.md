# Deployment Configuration

## Environment Variables

### Frontend (.env)

```env
VITE_API_URL=https://your-backend-url.onrender.com/api
```

### Backend (.env)

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
NODE_ENV=production
```

## Render Deployment Notes

### Backend (Render Web Service)

1. **Free Tier Cold Start**: Render's free tier spins down after 15 minutes of inactivity
2. **Wake-up Time**: Can take 50+ seconds to wake up from sleep
3. **Solution**: Frontend has built-in health check with retries and exponential backoff

### Frontend Initial Load

- Shows branded loading screen while waiting for backend
- Automatically retries connection (up to 5 attempts)
- Uses exponential backoff (5s, 10s, 15s, 20s, 25s)
- Total wait time: up to ~75 seconds for cold starts
- Redirects to /500 error page if server unreachable after all retries

### Health Check Configuration

Located in: `frontend/src/utils/serverHealth.js`

```javascript
// Current settings (optimized for Render)
maxRetries: 5; // Number of connection attempts
retryDelay: 5000; // Base delay (5 seconds)
timeout: 15000; // Per-request timeout (15 seconds)
exponentialBackoff: true; // Increases delay each retry
```

## Testing Deployment

### Test Cold Start Locally

1. Stop backend server
2. Start frontend
3. Should see WellNewYear loading screen
4. After ~5 seconds, should redirect to /500 error page

### Test Normal Operation

1. Both servers running
2. Should load immediately after quick health check
3. No error pages

## Production Checklist

- [ ] Update VITE_API_URL in frontend .env
- [ ] Set all backend environment variables on Render
- [ ] Test cold start behavior
- [ ] Verify error handling (stop backend and test)
- [ ] Check MongoDB connection
- [ ] Verify CORS settings for production domain

## Performance Optimization

### Keep Backend Warm (Optional)

Use a service like UptimeRobot to ping your backend every 5 minutes:

- Ping URL: `https://your-backend.onrender.com/api/auth/me`
- Interval: 5 minutes
- This prevents cold starts for better user experience

### Alternative: Paid Render Plan

- No cold starts
- Always-on instances
- Better performance
