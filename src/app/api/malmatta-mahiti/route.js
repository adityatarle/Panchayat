import { NextResponse } from 'next/server';
import connectDB from '../../../../lib/mongodb';
import MalmattaMahiti from '../../../../models/MalmattaMahiti';

export async function POST(request) {
  try {
    await connectDB();
    
    const data = await request.json();
    
    // Create new malmatta mahiti application
    const malmattaApplication = new MalmattaMahiti({
      ...data,
      submissionDate: new Date(),
      status: 'submitted'
    });
    
    await malmattaApplication.save();
    
    return NextResponse.json({
      success: true,
      message: 'Malmatta Mahiti application submitted successfully',
      applicationId: malmattaApplication.applicationId,
      data: malmattaApplication
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
    await connectDB();
    
    const { searchParams } = new URL(request.url);
    const applicationId = searchParams.get('applicationId');
    const status = searchParams.get('status');
    const serviceType = searchParams.get('serviceType');
    const page = parseInt(searchParams.get('page')) || 1;
    const limit = parseInt(searchParams.get('limit')) || 10;
    
    let query = {};
    
    if (applicationId) {
      query.applicationId = applicationId;
    }
    
    if (status) {
      query.status = status;
    }
    
    if (serviceType) {
      query.serviceType = serviceType;
    }
    
    const skip = (page - 1) * limit;
    
    if (applicationId) {
      // Get specific application
      const application = await MalmattaMahiti.findOne(query);
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
      const applications = await MalmattaMahiti.find(query)
        .sort({ submissionDate: -1 })
        .skip(skip)
        .limit(limit)
        .lean();
      
      const total = await MalmattaMahiti.countDocuments(query);
      
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
    await connectDB();
    
    const data = await request.json();
    const { applicationId, ...updateData } = data;
    
    if (!applicationId) {
      return NextResponse.json({
        success: false,
        message: 'Application ID is required'
      }, { status: 400 });
    }
    
    const updatedApplication = await MalmattaMahiti.findOneAndUpdate(
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
    console.error('Malmatta Mahiti update error:', error);
    return NextResponse.json({
      success: false,
      message: 'Failed to update malmatta mahiti application',
      error: error.message
    }, { status: 500 });
  }
}