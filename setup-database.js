// Setup script to create malmatta mahiti table in Supabase
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function setupDatabase() {
  console.log('🚀 Setting up Malmatta Mahiti database table...\n');

  try {
    // First, try to create the table using Supabase RPC
    console.log('1. Creating malmatta_mahiti_applications table...');
    
    const createTableSQL = `
      CREATE TABLE IF NOT EXISTS malmatta_mahiti_applications (
        id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
        application_id VARCHAR(100) UNIQUE,
        property_number VARCHAR(100),
        survey_number VARCHAR(100),
        plot_number VARCHAR(100),
        village VARCHAR(100),
        taluka VARCHAR(100),
        district VARCHAR(100) DEFAULT 'Maharashtra',
        property_type VARCHAR(100),
        total_area NUMERIC,
        owner_name VARCHAR(200),
        owner_name_marathi VARCHAR(200),
        father_name VARCHAR(200),
        aadhar_number VARCHAR(12),
        mobile_number VARCHAR(10),
        new_owner_name VARCHAR(200),
        new_owner_father_name VARCHAR(200),
        new_owner_aadhar VARCHAR(12),
        new_owner_mobile VARCHAR(10),
        new_owner_address TEXT,
        transfer_reason VARCHAR(100),
        transfer_date DATE,
        transfer_amount NUMERIC,
        aadhar_card_path VARCHAR(500),
        new_owner_aadhar_path VARCHAR(500),
        seven_twelve_path VARCHAR(500),
        sales_deed_path VARCHAR(500),
        no_objection_certificate_path VARCHAR(500),
        status VARCHAR(50) DEFAULT 'SUBMITTED',
        service_type VARCHAR(100) DEFAULT 'property-transfer',
        purpose VARCHAR(200) DEFAULT 'Property Transfer',
        payment_status VARCHAR(50) DEFAULT 'PENDING',
        payment_amount NUMERIC DEFAULT 200,
        submission_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        processing_date TIMESTAMP WITH TIME ZONE,
        approval_date TIMESTAMP WITH TIME ZONE,
        completion_date TIMESTAMP WITH TIME ZONE,
        notes TEXT,
        processed_by VARCHAR(200),
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      );
    `;

    const { data, error } = await supabase.rpc('exec', { query: createTableSQL });
    
    if (error) {
      console.log('⚠️  Table creation via RPC failed. This is normal for security reasons.');
      console.log('📋 Please manually execute the SQL in Supabase dashboard:');
      console.log('🔗 https://fmkpwkkqzqbeydgvlhsj.supabase.co/project/default/sql\n');
      console.log('Copy and paste the contents of create-malmatta-table.sql file\n');
    } else {
      console.log('✅ Table created successfully!');
    }

    // Test if we can access the table
    console.log('2. Testing table access...');
    const { data: testData, error: testError } = await supabase
      .from('malmatta_mahiti_applications')
      .select('count');

    if (testError) {
      console.log('❌ Table not accessible yet. Please create it manually using the SQL script.');
      console.log('📂 Run the create-malmatta-table.sql file in Supabase SQL editor');
      return false;
    } else {
      console.log('✅ Table is accessible!');
      
      // Test insert
      console.log('3. Testing insert operation...');
      const testInsert = {
        property_number: 'SETUP-TEST-001',
        village: 'शिरगाव',
        owner_name: 'Setup Test Owner',
        new_owner_name: 'Setup New Owner',
        aadhar_number: '123456789999',
        new_owner_aadhar: '999987654321',
        mobile_number: '9999999999',
        new_owner_mobile: '8888888888',
        new_owner_address: 'Setup Test Address',
        transfer_reason: 'Test'
      };

      const { data: insertData, error: insertError } = await supabase
        .from('malmatta_mahiti_applications')
        .insert([testInsert])
        .select()
        .single();

      if (insertError) {
        console.log('❌ Insert test failed:', insertError.message);
      } else {
        console.log('✅ Insert test successful!');
        console.log('📄 Application ID generated:', insertData.application_id);
        
        // Clean up test data
        await supabase
          .from('malmatta_mahiti_applications')
          .delete()
          .eq('application_id', insertData.application_id);
        console.log('🧹 Test data cleaned up');
      }
      
      return true;
    }

  } catch (error) {
    console.error('❌ Setup failed:', error.message);
    return false;
  }
}

setupDatabase().then(success => {
  if (success) {
    console.log('\n🎉 Database setup completed successfully!');
    console.log('✨ You can now use the Malmatta Mahiti form to save data to PostgreSQL');
  } else {
    console.log('\n⚠️  Manual setup required. Please:');
    console.log('1. Open https://fmkpwkkqzqbeydgvlhsj.supabase.co/project/default/sql');
    console.log('2. Copy and paste the contents of create-malmatta-table.sql');
    console.log('3. Run the script');
    console.log('4. Then run this setup script again to verify');
  }
  process.exit(0);
});
