import { NextResponse } from 'next/server';
import connectDB from '../../../../lib/mongodb';
import BirthCertificate from '../../../../models/BirthCertificate';

export async function POST(request) {
  try {
    await connectDB();
    
    const data = await request.json();
    
    // Create new birth certificate application
    const birthCertificate = new BirthCertificate({
      ...data,
      submissionDate: new Date(),
      status: 'submitted'
    });
    
    await birthCertificate.save();
    
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
    await connectDB();
    
    const { searchParams } = new URL(request.url);
    const applicationId = searchParams.get('applicationId');
    const status = searchParams.get('status');
    const page = parseInt(searchParams.get('page')) || 1;
    const limit = parseInt(searchParams.get('limit')) || 10;
    
    let query = {};
    
    if (applicationId) {
      query.applicationId = applicationId;
    }
    
    if (status) {
      query.status = status;
    }
    
    const skip = (page - 1) * limit;
    
    if (applicationId) {
      // Get specific application
      const application = await BirthCertificate.findOne(query);
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
      const applications = await BirthCertificate.find(query)
        .sort({ submissionDate: -1 })
        .skip(skip)
        .limit(limit)
        .lean();
      
      const total = await BirthCertificate.countDocuments(query);
      
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
    await connectDB();
    
    const data = await request.json();
    const { applicationId, ...updateData } = data;
    
    if (!applicationId) {
      return NextResponse.json({
        success: false,
        message: 'Application ID is required'
      }, { status: 400 });
    }
    
    const updatedApplication = await BirthCertificate.findOneAndUpdate(
      { applicationId },
      updateData,
      { new: true }
    );
    
    if (!updatedApplication) {
      return NextResponse.json({
        success: false,
        message: 'Application not found'
      }, { status: 404 });
    }
    
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