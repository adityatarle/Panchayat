import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client with service role key for server operations
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export async function POST(request) {
  try {
    const data = await request.json();
    
    // Validate required fields
    if (!data.propertyNumber || !data.ownerName || !data.newOwnerName) {
      return NextResponse.json({
        success: false,
        message: 'Property number, current owner name, and new owner name are required'
      }, { status: 400 });
    }

    // Prepare data for database insertion
    const applicationData = {
      // Property Details
      property_number: data.propertyNumber,
      survey_number: data.surveyNumber,
      plot_number: data.plotNumber,
      village: data.village,
      taluka: data.taluka,
      district: data.district || 'Maharashtra',
      property_type: data.propertyType,
      total_area: data.totalArea ? parseFloat(data.totalArea) : null,
      
      // Current Owner Details
      owner_name: data.ownerName,
      owner_name_marathi: data.ownerNameMarathi,
      father_name: data.fatherName,
      aadhar_number: data.aadharNumber,
      mobile_number: data.mobileNumber,
      
      // New Owner Details
      new_owner_name: data.newOwnerName,
      new_owner_father_name: data.newOwnerFatherName,
      new_owner_aadhar: data.newOwnerAadhar,
      new_owner_mobile: data.newOwnerMobile,
      new_owner_address: data.newOwnerAddress,
      
      // Transfer Details
      transfer_reason: data.transferReason,
      transfer_date: data.transferDate ? new Date(data.transferDate).toISOString().split('T')[0] : null,
      transfer_amount: data.transferAmount ? parseFloat(data.transferAmount) : null,
      
      // Service Details
      service_type: data.serviceType || 'property-transfer',
      purpose: data.purpose || 'Property Transfer',
      
      // Status
      status: 'SUBMITTED',
      payment_status: 'PENDING',
      payment_amount: 200
    };

    // Insert into database
    const { data: result, error } = await supabase
      .from('malmatta_mahiti_applications')
      .insert([applicationData])
      .select()
      .single();

    if (error) {
      console.error('Database error:', error);
      return NextResponse.json({
        success: false,
        message: 'Failed to save application to database',
        error: error.message
      }, { status: 500 });
    }

    // TODO: Handle file uploads for documents
    // For now, we'll just acknowledge that documents need to be processed separately
    
    return NextResponse.json({
      success: true,
      message: 'मालमत्ता फेरफार अर्ज यशस्वीरित्या जमा झाला!',
      applicationId: result.application_id,
      data: {
        applicationId: result.application_id,
        propertyNumber: result.property_number,
        ownerName: result.owner_name,
        newOwnerName: result.new_owner_name,
        status: result.status,
        submissionDate: result.submission_date,
        paymentAmount: result.payment_amount
      }
    }, { status: 201 });
    
  } catch (error) {
    console.error('Malmatta Mahiti submission error:', error);
    return NextResponse.json({
      success: false,
      message: 'अर्ज जमा करण्यात त्रुटी झाली',
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
    
    if (applicationId) {
      // Get specific application
      const { data: application, error } = await supabase
        .from('malmatta_mahiti_applications')
        .select('*')
        .eq('application_id', applicationId)
        .single();
      
      if (error || !application) {
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
      // Build query for filtered results
      let query = supabase
        .from('malmatta_mahiti_applications')
        .select('*', { count: 'exact' });
      
      if (status) {
        query = query.eq('status', status.toUpperCase());
      }
      
      if (serviceType) {
        query = query.eq('service_type', serviceType);
      }
      
      // Add pagination
      const from = (page - 1) * limit;
      const to = from + limit - 1;
      
      const { data: applications, error, count } = await query
        .order('submission_date', { ascending: false })
        .range(from, to);
      
      if (error) {
        console.error('Database query error:', error);
        return NextResponse.json({
          success: false,
          message: 'Failed to fetch applications',
          error: error.message
        }, { status: 500 });
      }
      
      return NextResponse.json({
        success: true,
        data: applications,
        pagination: {
          page,
          limit,
          total: count,
          pages: Math.ceil(count / limit)
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
    
    // Prepare update data with proper field mapping
    const updateFields = {};
    
    // Convert enum fields if present
    if (updateData.status) {
      updateFields.status = updateData.status.toUpperCase();
    }
    if (updateData.paymentStatus) {
      updateFields.payment_status = updateData.paymentStatus.toUpperCase();
    }
    
    // Convert date fields if present
    if (updateData.transferDate) {
      updateFields.transfer_date = new Date(updateData.transferDate).toISOString().split('T')[0];
    }
    if (updateData.processingDate) {
      updateFields.processing_date = new Date(updateData.processingDate).toISOString();
    }
    if (updateData.approvalDate) {
      updateFields.approval_date = new Date(updateData.approvalDate).toISOString();
    }
    if (updateData.completionDate) {
      updateFields.completion_date = new Date(updateData.completionDate).toISOString();
    }
    
    // Convert numeric fields if present
    if (updateData.transferAmount) {
      updateFields.transfer_amount = parseFloat(updateData.transferAmount);
    }
    if (updateData.totalArea) {
      updateFields.total_area = parseFloat(updateData.totalArea);
    }
    if (updateData.paymentAmount) {
      updateFields.payment_amount = parseFloat(updateData.paymentAmount);
    }
    
    // String fields
    if (updateData.notes) {
      updateFields.notes = updateData.notes;
    }
    if (updateData.processedBy) {
      updateFields.processed_by = updateData.processedBy;
    }
    
    // Add updated_at timestamp
    updateFields.updated_at = new Date().toISOString();
    
    const { data: updatedApplication, error } = await supabase
      .from('malmatta_mahiti_applications')
      .update(updateFields)
      .eq('application_id', applicationId)
      .select()
      .single();
    
    if (error) {
      console.error('Database update error:', error);
      return NextResponse.json({
        success: false,
        message: 'Failed to update application',
        error: error.message
      }, { status: 500 });
    }
    
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