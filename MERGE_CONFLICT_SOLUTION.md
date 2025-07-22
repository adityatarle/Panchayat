# 🔧 Package.json Merge Conflict Solution

## 🚨 Problem
When you see this error:
```
Error parsing package.json file
> 14 | <<<<<<< HEAD
package.json is not parseable: invalid JSON: key must be a string at line 14 column 1
```

## ⚡ Quick Fix (Use this every time)
```bash
./fix-package.sh
```

## 🛠️ Manual Fix (if script doesn't work)
```bash
# 1. Remove corrupted file
rm package.json

# 2. Create clean version
cat > package.json << 'EOF'
{
  "name": "nextapp",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev --turbopack",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
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
