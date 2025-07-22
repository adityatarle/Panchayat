#!/bin/bash

# Script to fix package.json merge conflicts
echo "🔧 Fixing package.json merge conflicts..."

# Check if package.json has merge conflicts
if grep -q "<<<<<<< HEAD\|=======\|>>>>>>> " package.json 2>/dev/null; then
    echo "❌ Merge conflicts detected in package.json!"
    
    # Create clean package.json
    cat > package.json << 'PACKAGE_EOF'
{
  "name": "nextapp",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev --turbopack",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "check-package": "node check-package.js"
  },
  "dependencies": {
    "@headlessui/react": "^2.2.4",
    "@heroicons/react": "^2.2.0",
    "@supabase/supabase-js": "^2.52.0",
    "bcryptjs": "^2.4.3",
    "date-fns": "^2.30.0",
    "html2canvas": "^1.4.1",
    "jsonwebtoken": "^9.0.2",
    "jspdf": "^3.0.1",
    "lucide-react": "^0.525.0",
    "multer": "^2.0.0",
    "next": "15.4.2",
    "nodemailer": "^6.9.7",
    "react": "19.1.0",
    "react-dom": "19.1.0",
    "uuid": "^9.0.1"
  },
  "devDependencies": {
    "autoprefixer": "^10.4.21",
    "postcss": "^8.5.6",
    "tailwindcss": "^3.4.17"
  }
}
PACKAGE_EOF
    
    echo "✅ package.json fixed!"
    echo "🧹 Cleaning up cache files..."
    rm -rf .next node_modules package-lock.json
    
    echo "📦 Installing dependencies..."
    npm install
    
    echo "🎉 Ready to build!"
else
    echo "✅ No merge conflicts detected in package.json"
fi
