#!/bin/bash

# Digital Voting System - Startup Script
# This script starts all services with docker-compose

set -e

echo "🗳️  Starting Digital Voting System..."
echo ""

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
    echo "❌ Error: Docker is not running"
    echo "Please start Docker and try again"
    exit 1
fi

# Check if docker-compose is available
if ! command -v docker-compose &> /dev/null; then
    echo "❌ Error: docker-compose is not installed"
    echo "Please install docker-compose and try again"
    exit 1
fi

# Start services
echo "📦 Starting services..."
docker-compose up -d

# Wait for services to be healthy
echo ""
echo "⏳ Waiting for services to be ready..."
sleep 5

# Check backend health
echo "🔍 Checking backend..."
for i in {1..30}; do
    if curl -f http://localhost:3000/health > /dev/null 2>&1; then
        echo "✅ Backend is ready"
        break
    fi
    if [ $i -eq 30 ]; then
        echo "❌ Backend failed to start"
        docker-compose logs backend
        exit 1
    fi
    sleep 2
done

# Check frontend
echo "🔍 Checking frontend..."
for i in {1..30}; do
    if curl -f http://localhost:8080 > /dev/null 2>&1; then
        echo "✅ Frontend is ready"
        break
    fi
    if [ $i -eq 30 ]; then
        echo "❌ Frontend failed to start"
        docker-compose logs frontend
        exit 1
    fi
    sleep 2
done

echo ""
echo "✅ Digital Voting System is running!"
echo ""
echo "📍 Access points:"
echo "   - Frontend (via Caddy): http://localhost"
echo "   - Frontend (direct):    http://localhost:8080"
echo "   - Backend API:          http://localhost:3000"
echo "   - PostgreSQL:           localhost:5432"
echo "   - Redis:                localhost:6379"
echo ""
echo "📝 To view logs:"
echo "   docker-compose logs -f"
echo ""
echo "🛑 To stop:"
echo "   docker-compose down"
echo ""
