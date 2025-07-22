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
