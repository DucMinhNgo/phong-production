# Inventory Management System - Docker Setup (Alternative)

> **Note**: This is an alternative setup. For local MongoDB installation, see
> [README.md](README.md)

## Prerequisites

- Docker and Docker Compose installed
- Node.js (for development)

## Quick Start with Docker

### 1. Clone the repository

```bash
git clone <repository-url>
cd con-l-n
```

### 2. Start MongoDB with Docker Compose

```bash
docker-compose up -d
```

This will start:

- **MongoDB**: `localhost:27017` with admin/password123
- **Mongo Express**: `localhost:8081` (web UI for MongoDB) with admin/pass123

### 3. Configure Environment Variables

Create `.env` file in the Backend directory:

```bash
cd Backend
cp .env.example .env  # if exists, or create manually
```

Content of `.env`:

```
# MongoDB Configuration
MONGO_URI=mongodb://admin:password123@localhost:27017/IMS?authSource=admin

# Server Configuration
PORT=3002
NODE_ENV=development
```

### 4. Install Dependencies and Start Services

#### Backend:

```bash
cd Backend
npm install
npm start
# or for development:
# npm run server
```

#### Frontend:

```bash
cd Frontend/inventory_management_system
npm install
npm start
```

### 5. Access the Application

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:3002
- **MongoDB Web UI**: http://localhost:8081 (admin/pass123)

## Docker Commands

```bash
# Start services
docker-compose up -d

# Stop services
docker-compose down

# View logs
docker-compose logs -f

# View MongoDB logs
docker-compose logs -f mongodb

# Access MongoDB container
docker exec -it ims-mongodb mongo -u admin -p password123 --authenticationDatabase admin IMS

# Reset database
docker-compose down
docker volume rm con-l-n_mongodb_data
docker-compose up -d
```

## Environment Variables

### Backend (.env)

- `MONGO_URI`: MongoDB connection string
- `PORT`: Server port (default: 3002)
- `NODE_ENV`: Environment mode

### Frontend (.env)

- `REACT_APP_NETWORK_IP`: IP of backend server
- `REACT_APP_API_PORT`: Port of backend server

## Database Schema

The application uses MongoDB with the following collections:

- **Products**: Product inventory with delivery/receipt tracking
- **Users**: System users with device IP tracking

## Troubleshooting

### MongoDB Connection Issues

1. Ensure Docker containers are running: `docker-compose ps`
2. Check MongoDB logs: `docker-compose logs mongodb`
3. Verify .env file has correct MONGO_URI

### Port Conflicts

- MongoDB: 27017
- Mongo Express: 8081
- Backend: 3002
- Frontend: 3000

Change ports in docker-compose.yml if needed.

### Reset Everything

```bash
docker-compose down
docker system prune -a
docker volume prune
docker-compose up -d
```
