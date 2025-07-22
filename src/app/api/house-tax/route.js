import { NextResponse } from 'next/server';
// TODO: Migrate to Supabase
// import connectDB from '../../../../lib/mongodb';
// import Property from '../../../../models/HouseTax';

export async function POST(request) {
  try {
    // TODO: Migrate to Supabase
    return NextResponse.json({ 
      error: 'This API is being migrated to Supabase. Please use the new property API.' 
    }, { status: 503 });
    
    // await connectDB();
    
    const data = await request.json();
    const { action, ...propertyData } = data;
    
    if (action === 'register_property') {
      // Register new property
      const property = new Property({
        ...propertyData,
        registrationDate: new Date(),
        status: 'active',
        currentTax: {
          assessmentYear: new Date().getFullYear().toString(),
          ...propertyData.currentTax
        }
      });
      
      await property.save();
      
      return NextResponse.json({
        success: true,
        message: 'Property registered successfully',
        propertyId: property.propertyId,
        data: property
      }, { status: 201 });
      
    } else if (action === 'pay_tax') {
      // Process tax payment
      const { propertyId, paymentAmount, paymentMode, transactionId, forYear } = propertyData;
      
      const property = await Property.findOne({ propertyId });
      if (!property) {
        return NextResponse.json({
          success: false,
          message: 'Property not found'
        }, { status: 404 });
      }
      
      // Update payment status
      property.currentTax.paidAmount += paymentAmount;
      property.currentTax.pendingAmount = property.currentTax.totalTax - property.currentTax.paidAmount;
      
      if (property.currentTax.pendingAmount <= 0) {
        property.currentTax.paymentStatus = 'paid';
      } else {
        property.currentTax.paymentStatus = 'partial';
      }
      
      property.lastPaymentDate = new Date();
      
      // Generate receipt number
      const receiptNumber = 'HR' + Date.now().toString().slice(-6);
      
      // Add to payment history
      property.paymentHistory.push({
        receiptNumber,
        paymentDate: new Date(),
        amount: paymentAmount,
        paymentMode,
        transactionId,
        forYear: forYear || property.currentTax.assessmentYear
      });
      
      await property.save();
      
      return NextResponse.json({
        success: true,
        message: 'Tax payment processed successfully',
        receiptNumber,
        data: property
      });
      
    } else if (action === 'assess_property') {
      // Property assessment
      const { propertyId, assessedValue, assessmentYear, assessedBy } = propertyData;
      
      const property = await Property.findOne({ propertyId });
      if (!property) {
        return NextResponse.json({
          success: false,
          message: 'Property not found'
        }, { status: 404 });
      }
      
      // Update assessment
      property.assessedValue = assessedValue;
      property.currentTax.taxableValue = assessedValue;
      property.lastAssessmentDate = new Date();
      
      // Add to assessment history
      property.assessmentHistory.push({
        year: assessmentYear,
        assessedValue,
        taxAmount: property.currentTax.totalTax,
        assessmentDate: new Date(),
        assessedBy
      });
      
      await property.save();
      
      return NextResponse.json({
        success: true,
        message: 'Property assessed successfully',
        data: property
      });
      
    } else if (action === 'apply_exemption') {
      // Apply tax exemption
      const { propertyId, exemptionType, exemptionReason } = propertyData;
      
      const property = await Property.findOne({ propertyId });
      if (!property) {
        return NextResponse.json({
          success: false,
          message: 'Property not found'
        }, { status: 404 });
      }
      
      // Apply exemption
      if (exemptionType === 'senior_citizen') {
        property.exemptions.seniorCitizen = true;
      } else if (exemptionType === 'disabled') {
        property.exemptions.disabled = true;
      } else if (exemptionType === 'ews') {
        property.exemptions.ews = true;
      } else if (exemptionType === 'ex_serviceman') {
        property.exemptions.exServiceman = true;
      }
      
      await property.save();
      
      return NextResponse.json({
        success: true,
        message: 'Exemption applied successfully',
        data: property
      });
    }
    
  } catch (error) {
    console.error('House tax operation error:', error);
    return NextResponse.json({
      success: false,
      message: 'Failed to process house tax operation',
      error: error.message
    }, { status: 500 });
  }
}

export async function GET(request) {
  try {
    await connectDB();
    
    const { searchParams } = new URL(request.url);
    const propertyId = searchParams.get('propertyId');
    const status = searchParams.get('status');
    const propertyType = searchParams.get('propertyType');
    const paymentStatus = searchParams.get('paymentStatus');
    const page = parseInt(searchParams.get('page')) || 1;
    const limit = parseInt(searchParams.get('limit')) || 10;
    
    let query = {};
    
    if (propertyId) {
      query.propertyId = propertyId;
    }
    
    if (status) {
      query.status = status;
    }
    
    if (propertyType) {
      query.propertyType = propertyType;
    }
    
    if (paymentStatus) {
      query['currentTax.paymentStatus'] = paymentStatus;
    }
    
    const skip = (page - 1) * limit;
    
    if (propertyId) {
      // Get specific property
      const property = await Property.findOne(query);
      if (!property) {
        return NextResponse.json({
          success: false,
          message: 'Property not found'
        }, { status: 404 });
      }
      
      return NextResponse.json({
        success: true,
        data: property
      });
    } else {
      // Get all properties with pagination
      const properties = await Property.find(query)
        .sort({ registrationDate: -1 })
        .skip(skip)
        .limit(limit)
        .lean();
      
      const total = await Property.countDocuments(query);
      
      // Calculate summary statistics
      const totalProperties = await Property.countDocuments({ status: 'active' });
      const totalTaxDue = await Property.aggregate([
        { $match: { status: 'active', 'currentTax.paymentStatus': { $ne: 'paid' } } },
        { $group: { _id: null, total: { $sum: '$currentTax.pendingAmount' } } }
      ]);
      
      const totalTaxCollected = await Property.aggregate([
        { $match: { status: 'active' } },
        { $group: { _id: null, total: { $sum: '$currentTax.paidAmount' } } }
      ]);
      
      return NextResponse.json({
        success: true,
        data: properties,
        pagination: {
          page,
          limit,
          total,
          pages: Math.ceil(total / limit)
        },
        summary: {
          totalProperties,
          totalTaxDue: totalTaxDue[0]?.total || 0,
          totalTaxCollected: totalTaxCollected[0]?.total || 0
        }
      });
    }
    
  } catch (error) {
    console.error('House tax fetch error:', error);
    return NextResponse.json({
      success: false,
      message: 'Failed to fetch house tax data',
      error: error.message
    }, { status: 500 });
  }
}

export async function PUT(request) {
  try {
    await connectDB();
    
    const data = await request.json();
    const { propertyId, ...updateData } = data;
    
    if (!propertyId) {
      return NextResponse.json({
        success: false,
        message: 'Property ID is required'
      }, { status: 400 });
    }
    
    const updatedProperty = await Property.findOneAndUpdate(
      { propertyId },
      { ...updateData, updatedBy: 'system', lastUpdated: new Date() },
      { new: true }
    );
    
    if (!updatedProperty) {
      return NextResponse.json({
        success: false,
        message: 'Property not found'
      }, { status: 404 });
    }
    
    return NextResponse.json({
      success: true,
      message: 'Property updated successfully',
      data: updatedProperty
    });
    
  } catch (error) {
    console.error('House tax update error:', error);
    return NextResponse.json({
      success: false,
      message: 'Failed to update property',
      error: error.message
    }, { status: 500 });
  }
}