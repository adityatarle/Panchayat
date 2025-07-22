import { NextResponse } from 'next/server';
import prisma from '../../../../lib/prisma';
import { dbOperations } from '../../../../lib/db-helpers';

export async function POST(request) {
  try {
    const data = await request.json();
    
    // Prepare data using helper functions
    const createData = dbOperations.prepareResidenceCertificateData(data);
    
    // Create new residence certificate application
    const residenceCertificate = await prisma.residenceCertificate.create({
      data: createData
    });
    
    return NextResponse.json({
      success: true,
      message: 'Residence certificate application submitted successfully',
      applicationId: residenceCertificate.applicationId,
      data: residenceCertificate
    }, { status: 201 });
    
  } catch (error) {
    console.error('Residence certificate submission error:', error);
    return NextResponse.json({
      success: false,
      message: 'Failed to submit residence certificate application',
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
      const application = await prisma.residenceCertificate.findUnique({
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
      const applications = await prisma.residenceCertificate.findMany({
        where,
        orderBy: { submissionDate: 'desc' },
        skip,
        take: limit
      });
      
      const total = await prisma.residenceCertificate.count({ where });
      
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
    console.error('Residence certificate fetch error:', error);
    return NextResponse.json({
      success: false,
      message: 'Failed to fetch residence certificate applications',
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
    if (updateData.paymentStatus) {
      updateData.paymentStatus = updateData.paymentStatus.toUpperCase();
    }
    if (updateData.gender) {
      updateData.gender = updateData.gender.toUpperCase();
    }
    if (updateData.caste) {
      updateData.caste = updateData.caste.toUpperCase();
    }
    if (updateData.maritalStatus) {
      updateData.maritalStatus = updateData.maritalStatus.toUpperCase();
    }
    
    // Convert date fields if present
    if (updateData.dateOfBirth) {
      updateData.dateOfBirth = new Date(updateData.dateOfBirth);
    }
    if (updateData.residenceSince) {
      updateData.residenceSince = new Date(updateData.residenceSince);
    }
    if (updateData.processingDate) {
      updateData.processingDate = new Date(updateData.processingDate);
    }
    if (updateData.approvalDate) {
      updateData.approvalDate = new Date(updateData.approvalDate);
    }
    
    // Convert numeric fields if present
    if (updateData.age) {
      updateData.age = parseInt(updateData.age);
    }
    if (updateData.residenceYears) {
      updateData.residenceYears = parseInt(updateData.residenceYears);
    }
    if (updateData.income) {
      updateData.income = parseFloat(updateData.income);
    }
    if (updateData.paymentAmount) {
      updateData.paymentAmount = parseFloat(updateData.paymentAmount);
    }
    
    const updatedApplication = await prisma.residenceCertificate.update({
      where: { applicationId },
      data: updateData
    });
    
    return NextResponse.json({
      success: true,
      message: 'Application updated successfully',
      data: updatedApplication
    });
    
  } catch (error) {
    console.error('Residence certificate update error:', error);
    return NextResponse.json({
      success: false,
      message: 'Failed to update residence certificate application',
      error: error.message
    }, { status: 500 });
  }
}