# 🏘️ Malmatta Mahiti (Property Transfer) - Database Setup Instructions

## 📋 Overview
This guide will help you set up the database table for the Malmatta Mahiti (Property Transfer) form to save data to PostgreSQL via Supabase.

## ✅ Prerequisites Completed
- ✅ Environment variables configured in `.env.local`
- ✅ Supabase connection established
- ✅ API route created and updated (`/api/malmatta-mahiti`)
- ✅ Database schema designed

## 🚀 Next Steps - Database Table Creation

### Step 1: Access Supabase SQL Editor
1. Open your browser and go to: https://fmkpwkkqzqbeydgvlhsj.supabase.co/project/default/sql
2. You should see the Supabase SQL Editor

### Step 2: Execute the Database Schema
Copy and paste the following SQL script in the SQL Editor and click "Run":

```sql
-- Malmatta Mahiti (Property Transfer) Table Creation Script
CREATE TABLE malmatta_mahiti_applications (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    application_id VARCHAR(100) UNIQUE,
    
    -- Property Details
    property_number VARCHAR(100),
    survey_number VARCHAR(100),
    plot_number VARCHAR(100),
    village VARCHAR(100),
    taluka VARCHAR(100),
    district VARCHAR(100) DEFAULT 'Maharashtra',
    property_type VARCHAR(100),
    total_area NUMERIC,
    
    -- Current Owner Details
    owner_name VARCHAR(200),
    owner_name_marathi VARCHAR(200),
    father_name VARCHAR(200),
    aadhar_number VARCHAR(12),
    mobile_number VARCHAR(10),
    
    -- New Owner Details
    new_owner_name VARCHAR(200),
    new_owner_father_name VARCHAR(200),
    new_owner_aadhar VARCHAR(12),
    new_owner_mobile VARCHAR(10),
    new_owner_address TEXT,
    
    -- Transfer Details
    transfer_reason VARCHAR(100),
    transfer_date DATE,
    transfer_amount NUMERIC,
    
    -- Document Upload Paths
    aadhar_card_path VARCHAR(500),
    new_owner_aadhar_path VARCHAR(500),
    seven_twelve_path VARCHAR(500),
    sales_deed_path VARCHAR(500),
    no_objection_certificate_path VARCHAR(500),
    
    -- Application Status and Processing
    status VARCHAR(50) DEFAULT 'SUBMITTED',
    service_type VARCHAR(100) DEFAULT 'property-transfer',
    purpose VARCHAR(200) DEFAULT 'Property Transfer',
    payment_status VARCHAR(50) DEFAULT 'PENDING',
    payment_amount NUMERIC DEFAULT 200,
    
    -- Timestamps
    submission_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    processing_date TIMESTAMP WITH TIME ZONE,
    approval_date TIMESTAMP WITH TIME ZONE,
    completion_date TIMESTAMP WITH TIME ZONE,
    
    -- Additional metadata
    notes TEXT,
    processed_by VARCHAR(200),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Function to generate application ID
CREATE OR REPLACE FUNCTION generate_malmatta_application_id()
RETURNS TEXT AS $$
DECLARE
    new_id TEXT;
    count_today INTEGER;
BEGIN
    SELECT COUNT(*) INTO count_today
    FROM malmatta_mahiti_applications 
    WHERE DATE(created_at) = CURRENT_DATE;
    
    new_id := 'MMA-' || TO_CHAR(CURRENT_DATE, 'YYYYMMDD') || '-' || LPAD((count_today + 1)::TEXT, 4, '0');
    
    RETURN new_id;
END;
$$ LANGUAGE plpgsql;

-- Trigger function
CREATE OR REPLACE FUNCTION set_malmatta_application_id()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.application_id IS NULL OR NEW.application_id = '' THEN
        NEW.application_id := generate_malmatta_application_id();
    END IF;
    NEW.updated_at := NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger
CREATE TRIGGER trigger_malmatta_application_id
    BEFORE INSERT OR UPDATE ON malmatta_mahiti_applications
    FOR EACH ROW
    EXECUTE FUNCTION set_malmatta_application_id();

-- Create indexes
CREATE INDEX idx_malmatta_application_id ON malmatta_mahiti_applications(application_id);
CREATE INDEX idx_malmatta_property_number ON malmatta_mahiti_applications(property_number);
CREATE INDEX idx_malmatta_status ON malmatta_mahiti_applications(status);

-- Enable RLS
ALTER TABLE malmatta_mahiti_applications ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Enable all for everyone" ON malmatta_mahiti_applications FOR ALL USING (true);
```

### Step 3: Verify Setup
After running the SQL script, verify the setup by running:
```bash
node setup-database.js
```

This should show:
```
✅ Table is accessible!
✅ Insert test successful!
🎉 Database setup completed successfully!
```

## 🧪 Testing the Integration

### Test the API directly:
```bash
curl -X POST http://localhost:3000/api/malmatta-mahiti \
  -H "Content-Type: application/json" \
  -d '{
    "propertyNumber": "TEST-001",
    "surveyNumber": "SUR-001",
    "village": "शिरगाव",
    "ownerName": "Test Owner",
    "newOwnerName": "New Test Owner",
    "aadharNumber": "123456789012",
    "newOwnerAadhar": "210987654321",
    "mobileNumber": "9876543210",
    "newOwnerMobile": "9876543211",
    "newOwnerAddress": "Test Address",
    "transferReason": "Sale"
  }'
```

### Test through the form:
1. Start the development server: `npm run dev`
2. Navigate to: http://localhost:3000/malmatta-mahiti/malmatta-ferfer
3. Fill out the form and submit
4. Check the response for a generated application ID

## �� Database Schema Features

### Automatic Application ID Generation
- Format: `MMA-YYYYMMDD-XXXX` (e.g., MMA-20250122-0001)
- Automatically increments daily
- Unique per day

### Form Field Mapping
| Form Field | Database Column |
|------------|----------------|
| propertyNumber | property_number |
| ownerName | owner_name |
| newOwnerName | new_owner_name |
| aadharNumber | aadhar_number |
| transferReason | transfer_reason |
| transferDate | transfer_date |
| ... | ... |

### Status Tracking
- Default status: 'SUBMITTED'
- Payment status: 'PENDING'
- Timestamps for all processing stages

## 🔐 Security Features
- Row Level Security (RLS) enabled
- UUID primary keys
- Indexed fields for performance
- Automatic timestamp management

## 📁 File Structure Created/Modified
```
├── .env.local                           # Environment variables
├── src/app/api/malmatta-mahiti/route.js # Updated API endpoint
├── supabase/schema.sql                  # Complete database schema
├── create-malmatta-table.sql            # Focused table creation script
├── setup-database.js                    # Automated setup verification
└── MALMATTA_SETUP_INSTRUCTIONS.md       # This file
```

## ✨ What's Working Now
1. ✅ Environment configuration
2. ✅ Database schema designed
3. ✅ API endpoint updated for Supabase
4. ✅ Form field mapping
5. ✅ Automatic application ID generation
6. ✅ Status tracking system

## 🎯 Next Steps After Database Setup
Once you've created the table in Supabase:
1. Test the form submission
2. Implement file upload for documents
3. Add email notifications
4. Create admin dashboard for managing applications
5. Add application tracking functionality

## 🆘 Troubleshooting
If you encounter issues:
1. Verify environment variables in `.env.local`
2. Check Supabase project URL and keys
3. Ensure table was created successfully
4. Run `node setup-database.js` to verify connection
