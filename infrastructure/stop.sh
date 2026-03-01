#!/bin/bash

# Digital Voting System - Stop Script
# This script stops all services

set -e

echo "🛑 Stopping Digital Voting System..."
echo ""

docker-compose down

echo ""
echo "✅ All services stopped"
echo ""
echo "💡 To remove all data (including database):"
echo "   docker-compose down -v"
echo ""
