#!/bin/bash

# Setup script for MongoDB Local Installation

echo "🚀 Setting up Inventory Management System with Local MongoDB"
echo "==========================================================="

# Check if MongoDB is installed
if ! command -v mongod &> /dev/null; then
    echo "❌ MongoDB is not installed. Please install MongoDB first:"
    echo "   - macOS: brew install mongodb-community"
    echo "   - Ubuntu: sudo apt-get install mongodb"
    echo "   - CentOS: sudo yum install mongodb"
    echo "   - Windows: Download from https://www.mongodb.com/try/download/community"
    exit 1
fi

echo "✅ MongoDB is installed"

# Start MongoDB service
echo "🔄 Starting MongoDB service..."
if [[ "$OSTYPE" == "darwin"* ]]; then
    # macOS
    brew services start mongodb-community
elif [[ "$OSTYPE" == "linux-gnu"* ]]; then
    # Linux
    sudo systemctl start mongod
elif [[ "$OSTYPE" == "msys" ]]; then
    # Windows
    net start MongoDB
fi

# Wait for MongoDB to start
sleep 3

# Test connection
echo "🔍 Testing MongoDB connection..."
if mongosh --eval "db.adminCommand('ping')" --quiet; then
    echo "✅ MongoDB is running and accessible"
else
    echo "❌ Cannot connect to MongoDB. Please check if it's running on port 27017"
    exit 1
fi

# Create database and collection
echo "📦 Setting up database..."
mongosh --eval "
  use IMS;
  db.createCollection('products');
  db.createCollection('users');
  print('✅ Database IMS created with collections: products, users');
"

echo ""
echo "🎉 Setup complete! MongoDB is ready."
echo ""
echo "Next steps:"
echo "1. Copy environment file: cp env-example.txt Backend/.env"
echo "2. Install dependencies: cd Backend && npm install"
echo "3. Start backend: cd Backend && npm run server"
echo "4. Start frontend: cd Frontend/inventory_management_system && npm install && npm start"
echo ""
echo "Access the application at: http://localhost:3000"