const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting seed...');

  // Create system settings
  const settings = await prisma.systemSettings.createMany({
    data: [
      {
        key: 'APP_NAME',
        value: 'Digital Gram Panchayat',
        description: 'Application name',
        category: 'general'
      },
      {
        key: 'APP_VERSION',
        value: '1.0.0',
        description: 'Application version',
        category: 'general'
      },
      {
        key: 'CONTACT_EMAIL',
        value: 'contact@grampanchayat.gov.in',
        description: 'Contact email for support',
        category: 'contact'
      },
      {
        key: 'CONTACT_PHONE',
        value: '+91-XXXXXXXXXX',
        description: 'Contact phone number',
        category: 'contact'
      },
      {
        key: 'OFFICE_ADDRESS',
        value: 'Gram Panchayat Office, Maharashtra',
        description: 'Office address',
        category: 'contact'
      },
      {
        key: 'WORKING_HOURS',
        value: '10:00 AM - 5:00 PM',
        description: 'Office working hours',
        category: 'general'
      },
      {
        key: 'PROCESSING_TIME_RESIDENCE',
        value: '7-15',
        description: 'Processing time for residence certificate in days',
        category: 'processing'
      },
      {
        key: 'PROCESSING_TIME_BIRTH',
        value: '3-7',
        description: 'Processing time for birth certificate in days',
        category: 'processing'
      },
      {
        key: 'PROCESSING_TIME_PROPERTY',
        value: '15-30',
        description: 'Processing time for property services in days',
        category: 'processing'
      },
      {
        key: 'MAX_FILE_SIZE',
        value: '5242880',
        description: 'Maximum file upload size in bytes (5MB)',
        category: 'upload'
      },
      {
        key: 'ALLOWED_FILE_TYPES',
        value: 'pdf,jpg,jpeg,png',
        description: 'Allowed file types for upload',
        category: 'upload'
      }
    ],
    skipDuplicates: true
  });

  console.log(`✅ Created ${settings.count} system settings`);

  // Create admin user
  const bcrypt = require('bcryptjs');
  const hashedPassword = await bcrypt.hash('admin123', 10);

  const adminUser = await prisma.user.upsert({
    where: { email: 'admin@grampanchayat.gov.in' },
    update: {},
    create: {
      username: 'admin',
      email: 'admin@grampanchayat.gov.in',
      passwordHash: hashedPassword,
      firstName: 'System',
      lastName: 'Administrator',
      role: 'admin',
      mobileNumber: '9999999999',
      employeeId: 'ADM001',
      department: 'Administration',
      designation: 'System Administrator'
    }
  });

  console.log(`✅ Created admin user: ${adminUser.email}`);

  // Create sample officer user
  const officerUser = await prisma.user.upsert({
    where: { email: 'officer@grampanchayat.gov.in' },
    update: {},
    create: {
      username: 'officer1',
      email: 'officer@grampanchayat.gov.in',
      passwordHash: hashedPassword,
      firstName: 'Revenue',
      lastName: 'Officer',
      role: 'officer',
      mobileNumber: '9888888888',
      employeeId: 'OFF001',
      department: 'Revenue',
      designation: 'Revenue Officer'
    }
  });

  console.log(`✅ Created officer user: ${officerUser.email}`);

  // Create sample Malmatta Mahiti applications for testing
  const sampleApplications = await prisma.malmattaMahiti.createMany({
    data: [
      {
        applicationId: 'PMI123456',
        serviceType: 'PROPERTY_INFORMATION',
        propertyNumber: 'PROP001',
        surveyNumber: 'SUR123',
        village: 'Sample Village',
        taluka: 'Sample Taluka',
        district: 'Maharashtra',
        state: 'Maharashtra',
        pincode: '413001',
        ownerName: 'Sample Owner',
        ownerNameMarathi: 'नमुना मालक',
        fatherName: 'Sample Father',
        aadharNumber: '123456789012',
        mobileNumber: '9876543210',
        purpose: 'BANK_LOAN',
        paymentAmount: 50,
        status: 'SUBMITTED',
        documents: {
          aadharCard: 'sample_aadhar.pdf',
          propertyCard: 'sample_property.pdf'
        }
      },
      {
        applicationId: 'NNR789012',
        serviceType: 'NEW_NAME_REGISTRATION',
        propertyNumber: 'PROP002',
        surveyNumber: 'SUR456',
        village: 'Test Village',
        taluka: 'Test Taluka',
        district: 'Maharashtra',
        state: 'Maharashtra',
        pincode: '413002',
        ownerName: 'Current Owner',
        fatherName: 'Current Father',
        aadharNumber: '987654321098',
        mobileNumber: '9876543211',
        newOwnerName: 'New Owner',
        newOwnerFatherName: 'New Father',
        newOwnerAadhar: '456789012345',
        newOwnerMobile: '9876543212',
        transferReason: 'SALE',
        purpose: 'REGISTRATION',
        paymentAmount: 100,
        status: 'UNDER_REVIEW',
        documents: {
          currentOwnerAadhar: 'current_aadhar.pdf',
          newOwnerAadhar: 'new_aadhar.pdf',
          sevenTwelve: 'seven_twelve.pdf'
        }
      }
    ],
    skipDuplicates: true
  });

  console.log(`✅ Created ${sampleApplications.count} sample applications`);

  // Create sample residence certificate
  const sampleResidence = await prisma.residenceCertificate.createMany({
    data: [
      {
        applicationId: 'RC123456',
        applicantName: 'Sample Resident',
        applicantNameMarathi: 'नमुना निवासी',
        fatherName: 'Sample Father',
        motherName: 'Sample Mother',
        dateOfBirth: new Date('1990-01-01'),
        age: 34,
        gender: 'MALE',
        currentAddress: 'Sample Address, Sample Village',
        permanentAddress: 'Sample Permanent Address',
        pincode: '413001',
        taluka: 'Sample Taluka',
        district: 'Maharashtra',
        state: 'Maharashtra',
        residenceSince: new Date('2020-01-01'),
        residenceYears: 4,
        caste: 'GENERAL',
        occupation: 'Farmer',
        income: 50000,
        maritalStatus: 'MARRIED',
        mobileNumber: '9876543213',
        email: 'sample@example.com',
        aadharNumber: '234567890123',
        purpose: 'BANK_LOAN',
        paymentAmount: 30,
        status: 'APPROVED',
        documents: {
          aadharCard: 'aadhar.pdf',
          electricityBill: 'electricity.pdf'
        }
      }
    ],
    skipDuplicates: true
  });

  console.log(`✅ Created ${sampleResidence.count} sample residence certificates`);

  console.log('🎉 Seed completed successfully!');
  console.log('\n📝 Default Login Credentials:');
  console.log('Admin: admin@grampanchayat.gov.in / admin123');
  console.log('Officer: officer@grampanchayat.gov.in / admin123');
  console.log('\n⚠️  Remember to change default passwords in production!');
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });