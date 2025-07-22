# MongoDB to PostgreSQL Migration Guide

This guide explains how to migrate your Gram Panchayat project from MongoDB to PostgreSQL using Prisma.

## ✅ **Migration Overview**

### **What's Changed:**
- Database: MongoDB → PostgreSQL
- ORM: Mongoose → Prisma
- Schema: Converted to Prisma schema with proper relations and enums
- API Routes: Updated to use Prisma client
- Type Safety: Improved with Prisma's type generation

### **What's Improved:**
- Better type safety and IDE support
- Faster queries with optimized joins
- Built-in migrations system
- Admin panel with Prisma Studio
- Better data validation with enums
- Cleaner database schema

---

## 🚀 **Installation & Setup**

### **1. Install Dependencies**

The package.json has already been updated. Install the new dependencies:

```bash
npm install
```

This will install:
- `@prisma/client` - Prisma client for database operations
- `prisma` - Prisma CLI for migrations and schema management

### **2. PostgreSQL Database Setup**

#### **Option A: Local PostgreSQL**
```bash
# Install PostgreSQL (Ubuntu/Debian)
sudo apt update
sudo apt install postgresql postgresql-contrib

# Start PostgreSQL service
sudo systemctl start postgresql
sudo systemctl enable postgresql

# Create database and user
sudo -u postgres psql
CREATE DATABASE grampanchayat_db;
CREATE USER gram_user WITH ENCRYPTED PASSWORD 'your_password';
GRANT ALL PRIVILEGES ON DATABASE grampanchayat_db TO gram_user;
\q
```

#### **Option B: Docker PostgreSQL**
```bash
# Create docker-compose.yml
version: '3.8'
services:
  postgres:
    image: postgres:15
    restart: always
    environment:
      POSTGRES_DB: grampanchayat_db
      POSTGRES_USER: gram_user
      POSTGRES_PASSWORD: your_password
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data

volumes:
  postgres_data:

# Start the database
docker-compose up -d
```

#### **Option C: Cloud PostgreSQL (Recommended for Production)**
- [Neon](https://neon.tech/) - Free tier available
- [Supabase](https://supabase.com/) - Free tier available
- [Railway](https://railway.app/) - Simple deployment
- [Digital Ocean Managed Database](https://www.digitalocean.com/products/managed-databases/)

### **3. Environment Configuration**

Create a `.env` file (copy from `.env.example`):

```bash
cp .env.example .env
```

Update the DATABASE_URL in `.env`:

```env
# Local PostgreSQL
DATABASE_URL="postgresql://gram_user:your_password@localhost:5432/grampanchayat_db?schema=public"

# Or for cloud database, use the connection string provided by your provider
```

### **4. Database Migration**

```bash
# Generate Prisma client
npm run db:generate

# Apply database schema
npm run db:push

# Seed initial data (admin users, settings, sample data)
npm run db:seed
```

---

## 📊 **Database Schema Changes**

### **Key Improvements:**

#### **1. Proper Enums (Type Safety)**
```prisma
enum ApplicationStatus {
  SUBMITTED
  UNDER_REVIEW
  FIELD_VERIFICATION
  DOCUMENT_VERIFICATION
  APPROVED
  REJECTED
  COMPLETED
}

enum ServiceType {
  PROPERTY_INFORMATION
  NEW_NAME_REGISTRATION
  PROPERTY_TRANSFER
  // ... all 17 malmatta mahiti services
}
```

#### **2. Better Relationships**
```prisma
model MalmattaMahiti {
  id                    String               @id @default(cuid())
  applicationId         String               @unique
  serviceType           ServiceType
  communicationHistory  CommunicationLog[]
  // ... other fields
}

model CommunicationLog {
  id               String          @id @default(cuid())
  malmattaMahitiId String?
  malmattaMahiti   MalmattaMahiti? @relation(fields: [malmattaMahitiId], references: [id])
  // ... other fields
}
```

#### **3. Optimized Indexes**
```prisma
@@map("malmatta_mahiti")
@@index([applicationId])
@@index([serviceType])
@@index([status])
@@index([submissionDate])
```

---

## 🔄 **Code Changes Required**

### **1. API Routes (Already Updated)**
- `src/app/api/malmatta-mahiti/route.js` - Updated to use Prisma
- `src/app/api/residence-certificate/route.js` - Updated to use Prisma

### **2. Database Helpers**
- `lib/prisma.js` - New Prisma connection
- `lib/db-helpers.js` - Utility functions for data conversion

### **3. Remove Old MongoDB Files** (Optional)
```bash
# Remove old MongoDB configuration
rm lib/mongodb.js

# Remove old Mongoose models
rm -rf models/
```

---

## 🗃️ **Data Migration (If you have existing data)**

### **Option A: Export/Import Script**

Create a migration script to transfer existing MongoDB data:

```javascript
// scripts/migrate-data.js
const { MongoClient } = require('mongodb');
const { PrismaClient } = require('@prisma/client');

const mongo = new MongoClient('your-mongodb-url');
const prisma = new PrismaClient();

async function migrateData() {
  await mongo.connect();
  const db = mongo.db('grampanchayat');
  
  // Migrate residence certificates
  const residenceCerts = await db.collection('residencecertificates').find({}).toArray();
  
  for (const cert of residenceCerts) {
    await prisma.residenceCertificate.create({
      data: {
        applicationId: cert.applicationId,
        applicantName: cert.applicantName,
        // ... convert other fields
        status: cert.status.toUpperCase(),
        submissionDate: cert.submissionDate
      }
    });
  }
  
  // Migrate malmatta mahiti records
  // ... similar process
  
  console.log('Migration completed!');
}

migrateData().finally(() => {
  mongo.close();
  prisma.$disconnect();
});
```

### **Option B: Manual Export/Import**

1. Export data from MongoDB:
```bash
mongoexport --db grampanchayat --collection residencecertificates --out residence_data.json
```

2. Create import script to load into PostgreSQL

---

## 🛠️ **Development Workflow**

### **Database Commands**
```bash
# Generate Prisma client after schema changes
npm run db:generate

# Push schema changes to database (development)
npm run db:push

# Create and apply migrations (production)
npm run db:migrate

# Open database admin panel
npm run db:studio

# Reset database (caution: deletes all data)
npm run db:reset

# Seed database with initial data
npm run db:seed
```

### **Schema Updates**
1. Edit `prisma/schema.prisma`
2. Run `npm run db:generate`
3. Run `npm run db:push` (development) or `npm run db:migrate` (production)

---

## 🔍 **Database Administration**

### **Prisma Studio (Database GUI)**
```bash
npm run db:studio
```
Opens a web interface at `http://localhost:5555` to view and edit data.

### **Direct PostgreSQL Access**
```bash
# Connect to PostgreSQL
psql -h localhost -U gram_user -d grampanchayat_db

# Common queries
\dt              # List tables
\d malmatta_mahiti  # Describe table
SELECT * FROM malmatta_mahiti LIMIT 5;
```

---

## 🚀 **Deployment**

### **Production Deployment Steps:**

1. **Set up Production Database**
   - Use managed PostgreSQL service (recommended)
   - Update `DATABASE_URL` in production environment

2. **Deploy Application**
   ```bash
   # Build application (includes Prisma generation)
   npm run build
   
   # Deploy to your hosting platform
   # The build process automatically runs `prisma generate`
   ```

3. **Run Migrations**
   ```bash
   # On first deployment
   npx prisma db push
   
   # Or use migrations for production
   npx prisma migrate deploy
   ```

4. **Seed Production Data**
   ```bash
   npm run db:seed
   ```

### **Environment Variables for Production:**
```env
DATABASE_URL="your-production-postgresql-url"
NEXTAUTH_SECRET="your-production-secret"
NEXTAUTH_URL="https://yourdomain.com"
```

---

## 📈 **Performance Benefits**

### **Query Performance:**
- **Joins**: Native SQL joins instead of application-level lookups
- **Indexes**: Proper database indexes for faster queries
- **Type Safety**: Compile-time type checking prevents runtime errors

### **Development Experience:**
- **IntelliSense**: Full autocomplete for database queries
- **Type Safety**: Prevents data type mismatches
- **Migrations**: Version-controlled database changes
- **Admin Panel**: Built-in database administration

### **Scalability:**
- **Connection Pooling**: Built-in connection management
- **Query Optimization**: Automatic query optimization
- **Horizontal Scaling**: Better support for read replicas

---

## 🔧 **Troubleshooting**

### **Common Issues:**

#### **Connection Issues**
```bash
# Test database connection
npx prisma db pull
```

#### **Migration Issues**
```bash
# Reset and recreate database
npm run db:reset
npm run db:seed
```

#### **Type Issues**
```bash
# Regenerate Prisma client
npm run db:generate
```

#### **Port Issues**
```bash
# Check if PostgreSQL is running
sudo systemctl status postgresql

# Check if port 5432 is in use
sudo netstat -tulpn | grep :5432
```

---

## 📋 **Testing**

### **Test the Migration:**

1. **Start the application:**
   ```bash
   npm run dev
   ```

2. **Test the malmatta mahiti module:**
   - Navigate to `/malmatta-mahiti`
   - Submit a test application
   - Check database in Prisma Studio

3. **Test existing features:**
   - Residence certificate application
   - Application tracking
   - Admin panel functionality

---

## 🎯 **Next Steps**

After successful migration:

1. **Remove MongoDB dependencies** (if no longer needed)
2. **Update backup strategies** for PostgreSQL
3. **Set up monitoring** for the new database
4. **Train team** on Prisma Studio and new commands
5. **Update documentation** to reflect PostgreSQL usage

---

## 📞 **Support**

If you encounter issues during migration:

1. Check the [Prisma Documentation](https://www.prisma.io/docs)
2. Review PostgreSQL logs for connection issues
3. Use Prisma Studio to verify data integrity
4. Test API endpoints to ensure proper data flow

---

## 🎉 **Congratulations!**

You've successfully migrated from MongoDB to PostgreSQL! Your application now benefits from:
- ✅ Better type safety
- ✅ Improved performance  
- ✅ Professional database management
- ✅ Scalable architecture
- ✅ Modern development tools

The malmatta mahiti module is now fully functional with PostgreSQL backend!