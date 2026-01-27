# Production Deployment Guide

## API Configuration

### Production API URL
```
https://phong-production-backend.vercel.app
```

### Frontend Configuration

The frontend is now configured to use the production API by default. You can override this by creating a `.env` file:

```bash
# Copy the example file
cp .env.example .env

# Edit the .env file if needed
REACT_APP_API_BASE_URL=https://phong-production-backend.vercel.app
REACT_APP_WS_URL=https://phong-production-backend.vercel.app
```

### Testing Production API

#### Test API connectivity:
```bash
# Test with Vietnamese
node test-i18n-api.js

# Test QR forms
node test-qr-forms.js
```

#### Manual API testing:
```bash
# Test products endpoint
curl -H "X-Language: vi" https://phong-production-backend.vercel.app/products

# Test create product form
curl -H "X-Language: ja" https://phong-production-backend.vercel.app/create-product-form
```

### CORS Configuration

The backend is configured to accept requests from:
- `http://localhost:3000` (development)
- `http://localhost:3001` (development)
- `https://phong-production-frontend.vercel.app` (production)
- Any `.vercel.app` subdomain

### Environment Variables

#### Frontend (.env):
```
REACT_APP_API_BASE_URL=https://phong-production-backend.vercel.app
REACT_APP_WS_URL=https://phong-production-backend.vercel.app
REACT_APP_NETWORK_IP=192.168.0.100
REACT_APP_API_PORT=3002
```

#### Backend (Vercel environment):
```
NODE_ENV=production
MONGODB_URI=your_mongodb_connection_string
```

### Deployment Checklist

#### Frontend:
- ✅ API URL updated to production
- ✅ CORS headers configured
- ✅ Environment variables set
- ✅ Build and deploy to Vercel

#### Backend:
- ✅ CORS configured for production domains
- ✅ Socket.IO CORS updated
- ✅ Environment variables set on Vercel
- ✅ Database connection configured

### Development vs Production

#### Development:
```javascript
// Uses localhost
const API_BASE_URL = 'http://localhost:3002';
```

#### Production:
```javascript
// Uses Vercel deployment
const API_BASE_URL = 'https://phong-production-backend.vercel.app';
```

### Troubleshooting

#### Common Issues:

1. **CORS Error**: Make sure frontend domain is added to CORS configuration
2. **API Not Found**: Verify the Vercel deployment URL
3. **Database Connection**: Check MongoDB connection string in Vercel environment
4. **Socket.IO Issues**: Ensure WebSocket support is enabled

#### Debug Commands:
```bash
# Check API status
curl https://phong-production-backend.vercel.app/

# Test with different languages
curl -H "X-Language: vi" https://phong-production-backend.vercel.app/products
curl -H "X-Language: ja" https://phong-production-backend.vercel.app/products
```

### Performance Considerations

- **CDN**: Vercel automatically provides CDN for static assets
- **Caching**: API responses can be cached based on language headers
- **Compression**: Vercel automatically compresses responses
- **SSL**: HTTPS is enabled by default on Vercel

### Monitoring

Monitor your application using:
- Vercel Analytics
- Vercel Logs
- Browser DevTools Network tab
- API response times

---

**Note**: Make sure to test all functionality after switching to production API, especially:
- Language switching
- QR code forms
- Real-time updates via Socket.IO
- Mobile QR scanning