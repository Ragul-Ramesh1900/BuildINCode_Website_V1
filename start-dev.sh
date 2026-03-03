#!/bin/bash

echo "🚀 Starting Development Servers..."
echo ""

# Check if MongoDB is running
if ! pgrep -x "mongod" > /dev/null; then
    echo "⚠️  MongoDB is not running. Please start MongoDB first:"
    echo "   mongod"
    echo ""
    exit 1
fi

# Start backend in background
echo "📦 Starting Backend Server..."
cd server
npm run dev &
BACKEND_PID=$!
cd ..

# Wait a bit for backend to start
sleep 3

# Start frontend
echo "🎨 Starting Frontend Server..."
npm run dev

# Cleanup on exit
trap "kill $BACKEND_PID" EXIT
