#!/bin/bash

# Development Environment Setup Script for PostgreSQL Migration
# This script sets up a complete development environment

echo "🚀 Setting up Gram Panchayat Development Environment with PostgreSQL..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${GREEN}✅ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

print_error() {
    echo -e "${RED}❌ $1${NC}"
}

print_info() {
    echo -e "${BLUE}ℹ️  $1${NC}"
}

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    print_error "Docker is not installed. Please install Docker first."
    exit 1
fi

# Check if Docker Compose is installed
if ! command -v docker-compose &> /dev/null; then
    print_error "Docker Compose is not installed. Please install Docker Compose first."
    exit 1
fi

# Check if .env file exists
if [ ! -f .env ]; then
    print_warning ".env file not found. Creating from .env.example..."
    if [ -f .env.example ]; then
        cp .env.example .env
        # Update the DATABASE_URL for Docker setup
        sed -i 's|DATABASE_URL="postgresql://username:password@localhost:5432/grampanchayat_db?schema=public"|DATABASE_URL="postgresql://gram_user:gram_password_2024@localhost:5432/grampanchayat_db?schema=public"|' .env
        print_status "Created .env file with Docker PostgreSQL configuration"
    else
        print_error ".env.example file not found!"
        exit 1
    fi
else
    print_status ".env file already exists"
fi

# Install Node.js dependencies
print_info "Installing Node.js dependencies..."
npm install
if [ $? -eq 0 ]; then
    print_status "Node.js dependencies installed successfully"
else
    print_error "Failed to install Node.js dependencies"
    exit 1
fi

# Start PostgreSQL with Docker Compose
print_info "Starting PostgreSQL database with Docker Compose..."
docker-compose up -d postgres
if [ $? -eq 0 ]; then
    print_status "PostgreSQL database started successfully"
else
    print_error "Failed to start PostgreSQL database"
    exit 1
fi

# Wait for PostgreSQL to be ready
print_info "Waiting for PostgreSQL to be ready..."
sleep 10

# Check if PostgreSQL is ready
max_attempts=30
attempt=1
while [ $attempt -le $max_attempts ]; do
    if docker-compose exec -T postgres pg_isready -U gram_user -d grampanchayat_db &> /dev/null; then
        print_status "PostgreSQL is ready!"
        break
    fi
    
    if [ $attempt -eq $max_attempts ]; then
        print_error "PostgreSQL failed to start within the expected time"
        exit 1
    fi
    
    print_info "Waiting for PostgreSQL... (attempt $attempt/$max_attempts)"
    sleep 2
    ((attempt++))
done

# Generate Prisma Client
print_info "Generating Prisma Client..."
npm run db:generate
if [ $? -eq 0 ]; then
    print_status "Prisma Client generated successfully"
else
    print_error "Failed to generate Prisma Client"
    exit 1
fi

# Push database schema
print_info "Applying database schema..."
npm run db:push
if [ $? -eq 0 ]; then
    print_status "Database schema applied successfully"
else
    print_error "Failed to apply database schema"
    exit 1
fi

# Seed database with initial data
print_info "Seeding database with initial data..."
npm run db:seed
if [ $? -eq 0 ]; then
    print_status "Database seeded successfully"
else
    print_warning "Database seeding failed, but setup can continue"
fi

# Start Adminer (Database GUI) if not already running
if ! docker-compose ps adminer | grep -q "Up"; then
    print_info "Starting Adminer (Database GUI)..."
    docker-compose up -d adminer
    if [ $? -eq 0 ]; then
        print_status "Adminer started successfully"
    else
        print_warning "Failed to start Adminer, but setup can continue"
    fi
fi

echo ""
echo "🎉 Development environment setup completed successfully!"
echo ""
echo "📋 Quick Access Information:"
echo "=================================="
echo "🌐 Application URL: http://localhost:3000"
echo "🗄️  Database Admin (Adminer): http://localhost:8080"
echo "🔧 Prisma Studio: npm run db:studio"
echo ""
echo "📊 Database Connection Details:"
echo "=================================="
echo "Host: localhost"
echo "Port: 5432"
echo "Database: grampanchayat_db"
echo "Username: gram_user"
echo "Password: gram_password_2024"
echo ""
echo "🚀 To start the development server:"
echo "npm run dev"
echo ""
echo "📝 Default Admin Credentials:"
echo "=================================="
echo "Email: admin@grampanchayat.gov.in"
echo "Password: admin123"
echo ""
echo "⚠️  Remember to change default passwords in production!"
echo ""
echo "🛠️  Useful Commands:"
echo "=================================="
echo "npm run db:studio     - Open Prisma Studio (Database GUI)"
echo "npm run db:generate   - Regenerate Prisma Client"
echo "npm run db:push       - Apply schema changes"
echo "npm run db:seed       - Seed database with sample data"
echo "docker-compose logs postgres - View database logs"
echo "docker-compose down   - Stop all services"
echo ""

# Check if the application can start (optional)
read -p "🤔 Would you like to start the development server now? (y/n): " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    print_info "Starting development server..."
    npm run dev
fi