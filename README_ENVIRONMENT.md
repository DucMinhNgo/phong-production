# Environment Configuration Guide

## Quick Start

### Switch Environment
```bash
# Use production API (Vercel)
npm run env:production

# Use local network IP
npm run env:local

# Use localhost (development)
npm run env:development
```

### Start with Specific Environment
```bash
# Start with production API
npm run start:production

# Start with local network
npm run start:local

# Start with development (localhost)
npm run start:dev
```

## Environment Options

### 1. Production (Default)
```bash
npm run env:production
npm start
```
- **API URL**: `https://phong-production-backend.vercel.app`
- **Use Case**: Production deployment, testing with live data
- **QR Codes**: Work from any device with internet

### 2. Local Network
```bash
npm run env:local
npm start
```
- **API URL**: `http://192.168.0.100:3002` (or your network IP)
- **Use Case**: Development with local backend, QR scanning from mobile
- **QR Codes**: Work from devices on same network

### 3. Development (Localhost)
```bash
npm run env:development
npm start
```
- **API URL**: `http://localhost:3002`
- **Use Case**: Local development, debugging
- **QR Codes**: Only work from same device

## Environment Variables

### Available Variables

```bash
# Mode Selection
REACT_APP_USE_PRODUCTION=true|false
REACT_APP_USE_CUSTOM_URL=true|false

# Network Configuration (when USE_PRODUCTION=false)
REACT_APP_NETWORK_IP=192.168.0.100
REACT_APP_API_PORT=3002

# Custom URL (when USE_CUSTOM_URL=true)
REACT_APP_CUSTOM_API_URL=https://your-api.com
REACT_APP_CUSTOM_WS_URL=https://your-api.com

# Legacy Support (still works)
REACT_APP_API_BASE_URL=https://your-api.com
REACT_APP_WS_URL=https://your-api.com
```

### Environment Files

- **`.env`** - Current active environment
- **`.env.production`** - Production settings
- **`.env.local`** - Local network settings  
- **`.env.development`** - Development settings
- **`.env.example`** - Template with all options

## Manual Configuration

### Create Custom .env
```bash
# Copy example
cp .env.example .env

# Edit with your settings
nano .env
```

### Example Configurations

#### Production
```bash
REACT_APP_USE_PRODUCTION=true
```

#### Local Network
```bash
REACT_APP_USE_PRODUCTION=false
REACT_APP_NETWORK_IP=192.168.1.100
REACT_APP_API_PORT=3002
```

#### Custom URL
```bash
REACT_APP_USE_CUSTOM_URL=true
REACT_APP_CUSTOM_API_URL=https://my-backend.herokuapp.com
REACT_APP_CUSTOM_WS_URL=https://my-backend.herokuapp.com
```

## API Status Indicator

The app shows current API status in bottom-left corner:
- 🟢 **Online** - API is reachable
- 🔴 **Offline** - API is not reachable  
- ⏳ **Checking** - Testing connection

Status shows:
- **Production** - Using Vercel API
- **Local Network** - Using network IP
- **Development** - Using localhost

## Scripts Reference

### Environment Switching
```bash
npm run env:production    # Switch to production
npm run env:local        # Switch to local network
npm run env:development  # Switch to development
```

### Start with Environment
```bash
npm run start:production  # Start with production API
npm run start:local      # Start with local network API
npm run start:dev        # Start with localhost API
```

### Build with Environment
```bash
npm run build:production # Build for production
npm run build:local     # Build for local deployment
```

### Manual Environment Switch
```bash
node switch-env.js production
node switch-env.js local
node switch-env.js development
```

## Troubleshooting

### Common Issues

1. **API Not Found**
   ```bash
   # Check current environment
   cat .env
   
   # Switch to production
   npm run env:production
   ```

2. **QR Codes Not Working**
   - **Local Network**: Ensure devices on same WiFi
   - **Production**: Check internet connection
   - **Development**: QR codes only work on same device

3. **CORS Errors**
   - Make sure backend CORS includes your domain
   - Check browser console for specific errors

### Debug Commands

```bash
# Check current API URL
node -e "console.log(require('./src/config.js').API_BASE_URL)"

# Test API connectivity
curl $(node -e "console.log(require('./src/config.js').API_BASE_URL)")

# View current environment
cat .env
```

## Best Practices

### Development Workflow
1. **Local Development**: Use `npm run start:dev`
2. **Network Testing**: Use `npm run start:local` 
3. **Production Testing**: Use `npm run start:production`
4. **Build for Production**: Use `npm run build:production`

### QR Code Testing
- **Development**: Test basic functionality
- **Local Network**: Test mobile scanning
- **Production**: Test real-world usage

### Environment Management
- Keep `.env` in `.gitignore`
- Use environment-specific files for team sharing
- Document custom configurations in README

---

**Note**: The API status indicator helps you verify which environment you're currently using. Always check this when switching between environments.