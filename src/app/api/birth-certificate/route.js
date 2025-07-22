import { NextResponse } from 'next/server';
import prisma from '../../../../lib/prisma';
import { sanitizeData, enumConverters } from '../../../../lib/db-helpers';

export async function POST(request) {
  try {
    const data = await request.json();
    
    // Generate application ID
    const applicationId = 'BC' + Date.now().toString().slice(-6);
    
    // Prepare data for database
    const createData = {
      applicationId,
      childName: sanitizeData.toString(data.childName),
      childNameMarathi: sanitizeData.toString(data.childNameMarathi),
      dateOfBirth: sanitizeData.toDate(data.dateOfBirth),
      placeOfBirth: sanitizeData.toString(data.placeOfBirth),
      gender: enumConverters.genderToEnum(data.gender),
      weight: sanitizeData.toFloat(data.weight),
      fatherName: sanitizeData.toString(data.fatherName),
      fatherNameMarathi: sanitizeData.toString(data.fatherNameMarathi),
      fatherOccupation: sanitizeData.toString(data.fatherOccupation),
      motherName: sanitizeData.toString(data.motherName),
      motherNameMarathi: sanitizeData.toString(data.motherNameMarathi),
      motherOccupation: sanitizeData.toString(data.motherOccupation),
      address: sanitizeData.toString(data.address),
      city: sanitizeData.toString(data.city),
      district: sanitizeData.toString(data.district) || 'Maharashtra',
      state: sanitizeData.toString(data.state) || 'Maharashtra',
      pincode: sanitizeData.toPincode(data.pincode),
      mobileNumber: sanitizeData.toPhoneNumber(data.mobileNumber),
      email: sanitizeData.toString(data.email),
      hospitalName: sanitizeData.toString(data.hospitalName),
      doctorName: sanitizeData.toString(data.doctorName),
      registrationNumber: sanitizeData.toString(data.registrationNumber),
      documents: data.documents || {},
      remarks: sanitizeData.toString(data.remarks)
    };
    
    // Create new birth certificate application
    const birthCertificate = await prisma.birthCertificate.create({
      data: createData
    });
    
    return NextResponse.json({
      success: true,
      message: 'Birth certificate application submitted successfully',
      applicationId: birthCertificate.applicationId,
      data: birthCertificate
    }, { status: 201 });
    
  } catch (error) {
    console.error('Birth certificate submission error:', error);
    return NextResponse.json({
      success: false,
      message: 'Failed to submit birth certificate application',
      error: error.message
    }, { status: 500 });
  }
}

export async function GET(request) {
  try {
    
    const { searchParams } = new URL(request.url);
    const applicationId = searchParams.get('applicationId');
    const status = searchParams.get('status');
    const page = parseInt(searchParams.get('page')) || 1;
    const limit = parseInt(searchParams.get('limit')) || 10;
    
    let where = {};
    
    if (applicationId) {
      where.applicationId = applicationId;
    }
    
    if (status) {
      where.status = status.toUpperCase();
    }
    
    const skip = (page - 1) * limit;
    
    if (applicationId) {
      // Get specific application
      const application = await prisma.birthCertificate.findUnique({
        where: { applicationId }
      });
      
      if (!application) {
        return NextResponse.json({
          success: false,
          message: 'Application not found'
        }, { status: 404 });
      }
      
      return NextResponse.json({
        success: true,
        data: application
      });
    } else {
      // Get all applications with pagination
      const applications = await prisma.birthCertificate.findMany({
        where,
        orderBy: { submissionDate: 'desc' },
        skip,
        take: limit
      });
      
      const total = await prisma.birthCertificate.count({ where });
      
      return NextResponse.json({
        success: true,
        data: applications,
        pagination: {
          page,
          limit,
          total,
          pages: Math.ceil(total / limit)
        }
      });
    }
    
  } catch (error) {
    console.error('Birth certificate fetch error:', error);
    return NextResponse.json({
      success: false,
      message: 'Failed to fetch birth certificate applications',
      error: error.message
    }, { status: 500 });
  }
}

export async function PUT(request) {
  try {
    
    const data = await request.json();
    const { applicationId, ...updateData } = data;
    
    if (!applicationId) {
      return NextResponse.json({
        success: false,
        message: 'Application ID is required'
      }, { status: 400 });
    }
    
    // Convert enum fields if present
    if (updateData.status) {
      updateData.status = updateData.status.toUpperCase();
    }
    if (updateData.gender) {
      updateData.gender = updateData.gender.toUpperCase();
    }
    if (updateData.dateOfBirth) {
      updateData.dateOfBirth = new Date(updateData.dateOfBirth);
    }
    
    const updatedApplication = await prisma.birthCertificate.update({
      where: { applicationId },
      data: updateData
    });
    
    return NextResponse.json({
      success: true,
      message: 'Application updated successfully',
      data: updatedApplication
    });
    
  } catch (error) {
    console.error('Birth certificate update error:', error);
    return NextResponse.json({
      success: false,
      message: 'Failed to update birth certificate application',
      error: error.message
    }, { status: 500 });
  }
}