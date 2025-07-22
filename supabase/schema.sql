-- Property Information Tables for Grampanchayat System

-- Property Holder Information Table
CREATE TABLE property_holders (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    serial_no VARCHAR(50),
    period VARCHAR(100),
    village_name VARCHAR(200),
    property_group_economic_category VARCHAR(200),
    property_no VARCHAR(100),
    ward_no_group_no VARCHAR(100),
    property_activity_no VARCHAR(100),
    street_name_lane_no VARCHAR(200),
    address TEXT,
    property_holder_name VARCHAR(200),
    property_holder_name_english VARCHAR(200),
    aadhar_no VARCHAR(12),
    mobile_no VARCHAR(10),
    water_supply VARCHAR(50),
    permanent_account_no VARCHAR(100),
    tap_number VARCHAR(50),
    group_no_resident_no VARCHAR(100),
    toilet VARCHAR(50),
    plan_tax BOOLEAN DEFAULT FALSE,
    diwali_tax BOOLEAN DEFAULT FALSE,
    diwan_agam BOOLEAN DEFAULT FALSE,
    working_in_defense_area BOOLEAN DEFAULT FALSE,
    midc BOOLEAN DEFAULT FALSE,
    special_property_registration BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Property Description Table
CREATE TABLE property_descriptions (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    property_holder_id UUID REFERENCES property_holders(id) ON DELETE CASCADE,
    property_type VARCHAR(100),
    other_property_info TEXT,
    floor VARCHAR(50),
    area_for_person NUMERIC,
    tank VARCHAR(100),
    width NUMERIC,
    area NUMERIC,
    usage VARCHAR(100),
    property_assessment_category VARCHAR(200),
    assessment_year INTEGER,
    land_assessment_rate_per_sqm NUMERIC,
    land_rate NUMERIC,
    rate_type_category VARCHAR(100),
    shop_rate_per_sqft NUMERIC,
    shop_rate_per_sqm NUMERIC,
    tax_assessment_type_subdivision VARCHAR(200),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes for better performance
CREATE INDEX idx_property_holders_property_no ON property_holders(property_no);
CREATE INDEX idx_property_holders_aadhar_no ON property_holders(aadhar_no);
CREATE INDEX idx_property_holders_village_name ON property_holders(village_name);
CREATE INDEX idx_property_descriptions_property_holder_id ON property_descriptions(property_holder_id);

-- Enable Row Level Security (RLS)
ALTER TABLE property_holders ENABLE ROW LEVEL SECURITY;
ALTER TABLE property_descriptions ENABLE ROW LEVEL SECURITY;

-- Basic RLS policies (you can modify these based on your authentication requirements)
CREATE POLICY "Enable read access for all users" ON property_holders FOR SELECT USING (true);
CREATE POLICY "Enable insert for all users" ON property_holders FOR INSERT WITH CHECK (true);
CREATE POLICY "Enable update for all users" ON property_holders FOR UPDATE USING (true);
CREATE POLICY "Enable delete for all users" ON property_holders FOR DELETE USING (true);

CREATE POLICY "Enable read access for all users" ON property_descriptions FOR SELECT USING (true);
CREATE POLICY "Enable insert for all users" ON property_descriptions FOR INSERT WITH CHECK (true);
CREATE POLICY "Enable update for all users" ON property_descriptions FOR UPDATE USING (true);
CREATE POLICY "Enable delete for all users" ON property_descriptions FOR DELETE USING (true);

-- Malmatta Mahiti (Property Transfer) Table
CREATE TABLE malmatta_mahiti_applications (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    application_id VARCHAR(100) UNIQUE NOT NULL,
    
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
    
    -- Document Upload Paths (store file paths/URLs)
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

-- Indexes for malmatta_mahiti_applications
CREATE INDEX idx_malmatta_application_id ON malmatta_mahiti_applications(application_id);
CREATE INDEX idx_malmatta_property_number ON malmatta_mahiti_applications(property_number);
CREATE INDEX idx_malmatta_aadhar_number ON malmatta_mahiti_applications(aadhar_number);
CREATE INDEX idx_malmatta_new_owner_aadhar ON malmatta_mahiti_applications(new_owner_aadhar);
CREATE INDEX idx_malmatta_status ON malmatta_mahiti_applications(status);
CREATE INDEX idx_malmatta_submission_date ON malmatta_mahiti_applications(submission_date);
CREATE INDEX idx_malmatta_village ON malmatta_mahiti_applications(village);

-- Enable Row Level Security for malmatta_mahiti_applications
ALTER TABLE malmatta_mahiti_applications ENABLE ROW LEVEL SECURITY;

-- RLS policies for malmatta_mahiti_applications
CREATE POLICY "Enable read access for all users" ON malmatta_mahiti_applications FOR SELECT USING (true);
CREATE POLICY "Enable insert for all users" ON malmatta_mahiti_applications FOR INSERT WITH CHECK (true);
CREATE POLICY "Enable update for all users" ON malmatta_mahiti_applications FOR UPDATE USING (true);
CREATE POLICY "Enable delete for all users" ON malmatta_mahiti_applications FOR DELETE USING (true);

-- Function to generate application ID
CREATE OR REPLACE FUNCTION generate_malmatta_application_id()
RETURNS TEXT AS $$
DECLARE
    new_id TEXT;
    count_today INTEGER;
BEGIN
    -- Get count of applications created today
    SELECT COUNT(*) INTO count_today
    FROM malmatta_mahiti_applications 
    WHERE DATE(created_at) = CURRENT_DATE;
    
    -- Generate application ID in format: MMA-YYYYMMDD-XXXX
    new_id := 'MMA-' || TO_CHAR(CURRENT_DATE, 'YYYYMMDD') || '-' || LPAD((count_today + 1)::TEXT, 4, '0');
    
    RETURN new_id;
END;
$$ LANGUAGE plpgsql;

-- Trigger to auto-generate application_id
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

CREATE TRIGGER trigger_malmatta_application_id
    BEFORE INSERT OR UPDATE ON malmatta_mahiti_applications
    FOR EACH ROW
    EXECUTE FUNCTION set_malmatta_application_id();
