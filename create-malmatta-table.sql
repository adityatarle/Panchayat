-- Malmatta Mahiti (Property Transfer) Table Creation Script
-- Execute this in Supabase SQL Editor

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
