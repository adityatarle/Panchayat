import { NextResponse } from 'next/server';
// TODO: Migrate to Supabase
// import connectDB from '../../../../lib/mongodb';
// import BirthCertificate from '../../../../models/BirthCertificate';
// import ResidenceCertificate from '../../../../models/ResidenceCertificate';
// import WaterConnection from '../../../../models/WaterTax';
// import Property from '../../../../models/HouseTax';

export async function GET(request) {
  try {
    // TODO: Migrate to Supabase
    return NextResponse.json({ 
      error: 'This API is being migrated to Supabase. Please use the new property API.' 
    }, { status: 503 });
    
    // await connectDB();
    
    const { searchParams } = new URL(request.url);
    const applicationId = searchParams.get('applicationId');
    const mobileNumber = searchParams.get('mobileNumber');
    
    if (!applicationId && !mobileNumber) {
      return NextResponse.json({
        success: false,
        message: 'Application ID or Mobile Number is required'
      }, { status: 400 });
    }
    
    let results = [];
    
    // Search in Birth Certificates
    try {
      let query = {};
      if (applicationId) {
        query.applicationId = applicationId;
      } else if (mobileNumber) {
        query.applicantContact = mobileNumber;
      }
      
      const birthCerts = await BirthCertificate.find(query).lean();
      results.push(...birthCerts.map(cert => ({
        ...cert,
        type: 'Birth Certificate',
        department: 'Certificate Services'
      })));
    } catch (error) {
      console.error('Birth certificate search error:', error);
    }
    
    // Search in Residence Certificates
    try {
      let query = {};
      if (applicationId) {
        query.applicationId = applicationId;
      } else if (mobileNumber) {
        query.mobileNumber = mobileNumber;
      }
      
      const residenceCerts = await ResidenceCertificate.find(query).lean();
      results.push(...residenceCerts.map(cert => ({
        ...cert,
        type: 'Residence Certificate',
        department: 'Certificate Services'
      })));
    } catch (error) {
      console.error('Residence certificate search error:', error);
    }
    
    // Search in Water Connections
    try {
      let query = {};
      if (applicationId) {
        query.connectionId = applicationId;
      } else if (mobileNumber) {
        query.mobileNumber = mobileNumber;
      }
      
      const waterConnections = await WaterConnection.find(query).lean();
      results.push(...waterConnections.map(conn => ({
        ...conn,
        applicationId: conn.connectionId,
        status: conn.applicationStatus || conn.status,
        type: 'Water Connection',
        department: 'Water Tax Department'
      })));
    } catch (error) {
      console.error('Water connection search error:', error);
    }
    
    // Search in Property Records
    try {
      let query = {};
      if (applicationId) {
        query.propertyId = applicationId;
      } else if (mobileNumber) {
        query.mobileNumber = mobileNumber;
      }
      
      const properties = await Property.find(query).lean();
      results.push(...properties.map(prop => ({
        ...prop,
        applicationId: prop.propertyId,
        type: 'Property Registration',
        department: 'House Tax Department'
      })));
    } catch (error) {
      console.error('Property search error:', error);
    }
    
    if (results.length === 0) {
      return NextResponse.json({
        success: false,
        message: 'No applications found with the provided details'
      }, { status: 404 });
    }
    
    // Sort by submission/registration date
    results.sort((a, b) => {
      const dateA = a.submissionDate || a.registrationDate || a.applicationDate || a.createdAt;
      const dateB = b.submissionDate || b.registrationDate || b.applicationDate || b.createdAt;
      return new Date(dateB) - new Date(dateA);
    });
    
    return NextResponse.json({
      success: true,
      data: results,
      count: results.length
    });
    
  } catch (error) {
    console.error('Application tracking error:', error);
    return NextResponse.json({
      success: false,
      message: 'Failed to track applications',
      error: error.message
    }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    await connectDB();
    
    const { applicationId, status, remarks, reviewedBy } = await request.json();
    
    if (!applicationId || !status) {
      return NextResponse.json({
        success: false,
        message: 'Application ID and status are required'
      }, { status: 400 });
    }
    
    let updated = false;
    let result = null;
    
    // Try to update in Birth Certificates
    try {
      const birthCert = await BirthCertificate.findOneAndUpdate(
        { applicationId },
        { 
          status, 
          remarks,
          reviewedBy,
          processingDate: new Date()
        },
        { new: true }
      );
      if (birthCert) {
        updated = true;
        result = { ...birthCert.toObject(), type: 'Birth Certificate' };
      }
    } catch (error) {
      console.error('Birth certificate update error:', error);
    }
    
    // Try to update in Residence Certificates
    if (!updated) {
      try {
        const residenceCert = await ResidenceCertificate.findOneAndUpdate(
          { applicationId },
          { 
            status, 
            remarks,
            reviewedBy,
            processingDate: new Date()
          },
          { new: true }
        );
        if (residenceCert) {
          updated = true;
          result = { ...residenceCert.toObject(), type: 'Residence Certificate' };
        }
      } catch (error) {
        console.error('Residence certificate update error:', error);
      }
    }
    
    // Try to update in Water Connections
    if (!updated) {
      try {
        const waterConnection = await WaterConnection.findOneAndUpdate(
          { connectionId: applicationId },
          { 
            applicationStatus: status,
            remarks,
            lastUpdated: new Date()
          },
          { new: true }
        );
        if (waterConnection) {
          updated = true;
          result = { ...waterConnection.toObject(), type: 'Water Connection' };
        }
      } catch (error) {
        console.error('Water connection update error:', error);
      }
    }
    
    // Try to update in Property Records
    if (!updated) {
      try {
        const property = await Property.findOneAndUpdate(
          { propertyId: applicationId },
          { 
            status,
            remarks,
            updatedBy: reviewedBy,
            lastUpdated: new Date()
          },
          { new: true }
        );
        if (property) {
          updated = true;
          result = { ...property.toObject(), type: 'Property Registration' };
        }
      } catch (error) {
        console.error('Property update error:', error);
      }
    }
    
    if (!updated) {
      return NextResponse.json({
        success: false,
        message: 'Application not found'
      }, { status: 404 });
    }
    
    return NextResponse.json({
      success: true,
      message: 'Application status updated successfully',
      data: result
    });
    
  } catch (error) {
    console.error('Application status update error:', error);
    return NextResponse.json({
      success: false,
      message: 'Failed to update application status',
      error: error.message
    }, { status: 500 });
  }
}