# Gram Panchayat Portal Setup Guide

## Overview
This is a comprehensive digital platform for Gram Panchayat services in Maharashtra, India, built with Next.js 15, React 19, and MongoDB.

## Features Implemented

### 🏛️ Certificate Services
- **Birth Certificate** - Complete application with MongoDB backend
- **Residence Certificate** - With field verification workflow
- **Death Certificate** - Application framework
- **Income Certificate** - Application framework  
- **Caste Certificate** - Application framework
- **Non-Availability Certificate** - Application framework

### 💧 Water Tax Department
- New water connection applications
- Bill generation and payment processing
- Meter reading management
- Payment history tracking
- Connection status management

### 🏠 House Tax Department
- Property registration and management
- Tax calculation with exemptions
- Assessment history
- Payment processing
- Property transfer records

### 📋 Additional Services
- **Application Tracking** - Real-time status across all departments
- **Certificate Download** - Digital certificate access
- **Complaint System** - Framework for grievance redressal

## Technology Stack

- **Frontend**: Next.js 15, React 19, Tailwind CSS
- **Backend**: Next.js API Routes, MongoDB with Mongoose
- **Database**: MongoDB (Local or Atlas)
- **UI Components**: Headless UI, Heroicons, Lucide React

## Prerequisites

1. **Node.js** (version 18 or higher)
   ```bash
   node --version
   ```

2. **MongoDB** (Local installation or MongoDB Atlas)
   
   **Option A: Local MongoDB**
   ```bash
   # On Ubuntu/Debian
   sudo apt update
   sudo apt install mongodb
   sudo systemctl start mongodb
   sudo systemctl enable mongodb
   
   # On macOS (using Homebrew)
   brew tap mongodb/brew
   brew install mongodb-community
   brew services start mongodb-community
   
   # On Windows
   # Download MongoDB Community Server from https://www.mongodb.com/try/download/community
   ```

   **Option B: MongoDB Atlas (Cloud)**
   - Sign up at https://www.mongodb.com/atlas
   - Create a free cluster
   - Get your connection string

## Installation Steps

### 1. Install Dependencies
```bash
npm install
```

### 2. Environment Configuration
Create `.env.local` file (already created):
```bash
# MongoDB Configuration
MONGODB_URI=mongodb://localhost:27017/grampanchayat
# OR for MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/grampanchayat

# Application Settings
NEXT_PUBLIC_APP_NAME=Gram Panchayat Portal
NEXT_PUBLIC_APP_URL=http://localhost:3000

# JWT Secret for session management
JWT_SECRET=your-super-secret-jwt-key-change-in-production

# Admin Configuration
ADMIN_EMAIL=admin@grampanchayat.gov.in
ADMIN_PHONE=1800-XXX-XXXX
```

### 3. Database Setup

**For Local MongoDB:**
```bash
# Start MongoDB service
sudo systemctl start mongodb  # Linux
brew services start mongodb-community  # macOS

# MongoDB will automatically create the database when first accessed
```

**For MongoDB Atlas:**
1. Create account at MongoDB Atlas
2. Create a new cluster (free tier available)
3. Create database user
4. Whitelist your IP address
5. Get connection string and update `.env.local`

### 4. Start the Application
```bash
# Development mode
npm run dev

# Production build
npm run build
npm start
```

### 5. Access the Application
Open your browser and navigate to:
```
http://localhost:3000
```

## Database Schema

### Collections Created Automatically:

1. **birthcertificates** - Birth certificate applications
2. **residencecertificates** - Residence certificate applications  
3. **waterconnections** - Water tax department records
4. **properties** - House tax department records

### Sample Data

The application will work without any initial data. When you submit applications, they will be automatically stored in MongoDB.

## API Endpoints

### Birth Certificate
- `POST /api/birth-certificate` - Submit new application
- `GET /api/birth-certificate` - Get applications (with filters)
- `PUT /api/birth-certificate` - Update application status

### Residence Certificate
- `POST /api/residence-certificate` - Submit new application
- `GET /api/residence-certificate` - Get applications
- `PUT /api/residence-certificate` - Update application

### Water Tax
- `POST /api/water-tax` - New connection, payment, meter reading
- `GET /api/water-tax` - Get connections and bills
- `PUT /api/water-tax` - Update connection details

### House Tax
- `POST /api/house-tax` - Register property, pay tax, assessment
- `GET /api/house-tax` - Get properties and tax records
- `PUT /api/house-tax` - Update property details

### Application Tracking
- `GET /api/track-application` - Track application by ID or mobile
- `POST /api/track-application` - Update application status

## Testing the Application

### 1. Submit Birth Certificate
1. Go to Birth Certificate page
2. Fill out the form with sample data
3. Submit the application
4. Note the application ID (e.g., BC123456)

### 2. Track Application
1. Go to Track Application page
2. Enter the application ID
3. View the application status and progress

### 3. Test Sample Data
Use these sample application IDs for demo (fallback data):
- **BC123456** - Birth Certificate (Under Review)
- **RC789012** - Residence Certificate (Approved)
- **WA345678** - Water Connection (Rejected)

## Features for Maharashtra State Compliance

### Caste Categories
- General, OBC (Other Backward Class)
- SC (Scheduled Caste), ST (Scheduled Tribe) 
- NT (Nomadic Tribes) - Maharashtra specific

### Language Support
- Hindi and Marathi names supported
- Bilingual interface (Hindi/English)
- Maharashtra government theme colors

### State-Specific Fields
- Ready Reckoner rates for property assessment
- Maharashtra district and taluka fields
- State-specific tax rates and exemptions

## Security Features

- Input validation and sanitization
- MongoDB injection protection
- Environment variable protection
- Secure file upload handling
- Rate limiting ready for implementation

## Production Deployment

### 1. Environment Variables
Update `.env.local` for production:
```bash
MONGODB_URI=your-production-mongodb-uri
JWT_SECRET=your-strong-production-secret
NEXT_PUBLIC_APP_URL=https://yourdomain.com
```

### 2. Build and Deploy
```bash
npm run build
npm start
```

### 3. Recommended Hosting
- **Vercel** (recommended for Next.js)
- **Netlify**
- **AWS/DigitalOcean/Heroku**

### 4. Database Hosting
- **MongoDB Atlas** (recommended)
- **AWS DocumentDB**
- **Self-hosted MongoDB**

## Troubleshooting

### Common Issues

1. **MongoDB Connection Error**
   ```bash
   # Check if MongoDB is running
   sudo systemctl status mongodb  # Linux
   brew services list | grep mongodb  # macOS
   ```

2. **Port Already in Use**
   ```bash
   # Kill process on port 3000
   lsof -ti:3000 | xargs kill -9
   ```

3. **Module Not Found Errors**
   ```bash
   # Clear node_modules and reinstall
   rm -rf node_modules package-lock.json
   npm install
   ```

4. **Database Access Issues**
   - Verify MongoDB URI in `.env.local`
   - Check MongoDB Atlas IP whitelist
   - Ensure database user has proper permissions

## Future Enhancements

### Phase 2 Features
- [ ] File upload and document management
- [ ] SMS/Email notifications
- [ ] Payment gateway integration (Razorpay/UPI)
- [ ] Admin dashboard for officers
- [ ] Digital signature integration

### Phase 3 Features
- [ ] Mobile application (React Native)
- [ ] Offline PWA capabilities
- [ ] Biometric authentication
- [ ] Blockchain certificate verification
- [ ] AI chatbot for citizen assistance

## Support

For technical support or questions:
- Create an issue in the repository
- Contact: tech-support@grampanchayat.gov.in
- Phone: 1800-XXX-XXXX

## License

This project is developed for Maharashtra Government and follows government software licensing policies.

---

**Developed for Digital Transformation of Rural Governance in Maharashtra**