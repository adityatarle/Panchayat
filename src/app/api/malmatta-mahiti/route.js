import { NextResponse } from 'next/server';
import prisma from '../../../../lib/prisma';
import { dbOperations } from '../../../../lib/db-helpers';

export async function POST(request) {
  try {
    const data = await request.json();
    
    // Prepare main application data
    const createData = dbOperations.prepareMalmattaMahitiData(data);
    
    // Create new malmatta mahiti application
    const malmattaApplication = await prisma.malmattaMahiti.create({
      data: createData
    });
    
    // Handle property descriptions if provided
    if (data.propertyDescriptions && Array.isArray(data.propertyDescriptions) && data.propertyDescriptions.length > 0) {
      const propertyDescriptionsData = dbOperations.preparePropertyDescriptionData(
        data.propertyDescriptions, 
        malmattaApplication.id
      );
      
      if (propertyDescriptionsData.length > 0) {
        await prisma.propertyDescription.createMany({
          data: propertyDescriptionsData
        });
      }
    }
    
    // Fetch the complete application with property descriptions
    const completeApplication = await prisma.malmattaMahiti.findUnique({
      where: { id: malmattaApplication.id },
      include: {
        propertyDescriptions: {
          orderBy: { serialNo: 'asc' }
        }
      }
    });
    
    return NextResponse.json({
      success: true,
      message: 'Malmatta Mahiti application submitted successfully',
      applicationId: malmattaApplication.applicationId,
      data: completeApplication
    }, { status: 201 });
    
  } catch (error) {
    console.error('Malmatta Mahiti submission error:', error);
    return NextResponse.json({
      success: false,
      message: 'Failed to submit malmatta mahiti application',
      error: error.message
    }, { status: 500 });
  }
}

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const applicationId = searchParams.get('applicationId');
    const status = searchParams.get('status');
    const serviceType = searchParams.get('serviceType');
    const page = parseInt(searchParams.get('page')) || 1;
    const limit = parseInt(searchParams.get('limit')) || 10;
    
    let where = {};
    
    if (applicationId) {
      where.applicationId = applicationId;
    }
    
    if (status) {
      where.status = status.toUpperCase();
    }
    
    if (serviceType) {
      where.serviceType = serviceType.toUpperCase().replace(/[^A-Z_]/g, '_');
    }
    
    const skip = (page - 1) * limit;
    
    if (applicationId) {
      // Get specific application
      const application = await prisma.malmattaMahiti.findUnique({
        where: { applicationId },
        include: {
          propertyDescriptions: {
            orderBy: { serialNo: 'asc' }
          },
          communicationHistory: {
            orderBy: { createdAt: 'desc' }
          }
        }
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
      const applications = await prisma.malmattaMahiti.findMany({
        where,
        orderBy: { submissionDate: 'desc' },
        skip,
        take: limit,
        include: {
          propertyDescriptions: {
            orderBy: { serialNo: 'asc' }
          },
          communicationHistory: {
            take: 1,
            orderBy: { createdAt: 'desc' }
          }
        }
      });
      
      const total = await prisma.malmattaMahiti.count({ where });
      
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
    console.error('Malmatta Mahiti fetch error:', error);
    return NextResponse.json({
      success: false,
      message: 'Failed to fetch malmatta mahiti applications',
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
    if (updateData.priority) {
      updateData.priority = updateData.priority.toUpperCase();
    }
    
    // Convert date fields if present
    if (updateData.transferDate) {
      updateData.transferDate = new Date(updateData.transferDate);
    }
    if (updateData.newOwnerDateOfBirth) {
      updateData.newOwnerDateOfBirth = new Date(updateData.newOwnerDateOfBirth);
    }
    if (updateData.processingDate) {
      updateData.processingDate = new Date(updateData.processingDate);
    }
    if (updateData.approvalDate) {
      updateData.approvalDate = new Date(updateData.approvalDate);
    }
    if (updateData.completionDate) {
      updateData.completionDate = new Date(updateData.completionDate);
    }
    if (updateData.paymentDate) {
      updateData.paymentDate = new Date(updateData.paymentDate);
    }
    if (updateData.certificateIssueDate) {
      updateData.certificateIssueDate = new Date(updateData.certificateIssueDate);
    }
    if (updateData.certificateValidTill) {
      updateData.certificateValidTill = new Date(updateData.certificateValidTill);
    }
    
    // Convert numeric fields if present
    if (updateData.transferAmount) {
      updateData.transferAmount = parseFloat(updateData.transferAmount);
    }
    if (updateData.stampDutyPaid) {
      updateData.stampDutyPaid = parseFloat(updateData.stampDutyPaid);
    }
    if (updateData.registrationFee) {
      updateData.registrationFee = parseFloat(updateData.registrationFee);
    }
    if (updateData.totalArea) {
      updateData.totalArea = parseFloat(updateData.totalArea);
    }
    if (updateData.builtUpArea) {
      updateData.builtUpArea = parseFloat(updateData.builtUpArea);
    }
    if (updateData.yearOfConstruction) {
      updateData.yearOfConstruction = parseInt(updateData.yearOfConstruction);
    }
    if (updateData.monthlyIncome) {
      updateData.monthlyIncome = parseFloat(updateData.monthlyIncome);
    }
    if (updateData.paymentAmount) {
      updateData.paymentAmount = parseFloat(updateData.paymentAmount);
    }
    
    // Handle property descriptions update if provided
    if (updateData.propertyDescriptions && Array.isArray(updateData.propertyDescriptions)) {
      // First get the application to get its ID
      const existingApp = await prisma.malmattaMahiti.findUnique({
        where: { applicationId }
      });
      
      if (existingApp) {
        // Delete existing property descriptions
        await prisma.propertyDescription.deleteMany({
          where: { malmattaMahitiId: existingApp.id }
        });
        
        // Create new property descriptions
        if (updateData.propertyDescriptions.length > 0) {
          const propertyDescriptionsData = dbOperations.preparePropertyDescriptionData(
            updateData.propertyDescriptions, 
            existingApp.id
          );
          
          if (propertyDescriptionsData.length > 0) {
            await prisma.propertyDescription.createMany({
              data: propertyDescriptionsData
            });
          }
        }
      }
      
      // Remove propertyDescriptions from updateData as it's not a direct field
      delete updateData.propertyDescriptions;
    }

    const updatedApplication = await prisma.malmattaMahiti.update({
      where: { applicationId },
      data: updateData,
      include: {
        propertyDescriptions: {
          orderBy: { serialNo: 'asc' }
        },
        communicationHistory: {
          orderBy: { createdAt: 'desc' }
        }
      }
    });
    
    return NextResponse.json({
      success: true,
      message: 'Application updated successfully',
      data: updatedApplication
    });
    
  } catch (error) {
    console.error('Malmatta Mahiti update error:', error);
    return NextResponse.json({
      success: false,
      message: 'Failed to update malmatta mahiti application',
      error: error.message
    }, { status: 500 });
  }
}