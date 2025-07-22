import { NextResponse } from 'next/server';
// TODO: Migrate to Supabase
// import connectDB from '../../../../lib/mongodb';
// import WaterConnection from '../../../../models/WaterTax';

export async function POST(request) {
  try {
    // TODO: Migrate to Supabase
    return NextResponse.json({ 
      error: 'This API is being migrated to Supabase. Please use the new property API.' 
    }, { status: 503 });
    
    // await connectDB();
    
    const data = await request.json();
    const { action, ...connectionData } = data;
    
    if (action === 'new_connection') {
      // Create new water connection application
      const waterConnection = new WaterConnection({
        ...connectionData,
        applicationDate: new Date(),
        applicationStatus: 'pending'
      });
      
      await waterConnection.save();
      
      return NextResponse.json({
        success: true,
        message: 'Water connection application submitted successfully',
        connectionId: waterConnection.connectionId,
        data: waterConnection
      }, { status: 201 });
      
    } else if (action === 'pay_bill') {
      // Process bill payment
      const { connectionId, paymentAmount, paymentMode, transactionId } = connectionData;
      
      const connection = await WaterConnection.findOne({ connectionId });
      if (!connection) {
        return NextResponse.json({
          success: false,
          message: 'Connection not found'
        }, { status: 404 });
      }
      
      // Update payment status
      connection.currentBill.paymentStatus = 'paid';
      connection.currentBill.paymentDate = new Date();
      connection.currentBill.paymentId = transactionId;
      
      // Add to payment history
      connection.paymentHistory.push({
        billNumber: connection.currentBill.billNumber,
        paymentDate: new Date(),
        amount: paymentAmount,
        paymentMode,
        transactionId
      });
      
      await connection.save();
      
      return NextResponse.json({
        success: true,
        message: 'Payment processed successfully',
        data: connection
      });
      
    } else if (action === 'update_reading') {
      // Update meter reading
      const { connectionId, currentReading, readBy } = connectionData;
      
      const connection = await WaterConnection.findOne({ connectionId });
      if (!connection) {
        return NextResponse.json({
          success: false,
          message: 'Connection not found'
        }, { status: 404 });
      }
      
      // Update readings
      const previousReading = connection.currentBill.currentReading || 0;
      connection.currentBill.previousReading = previousReading;
      connection.currentBill.currentReading = currentReading;
      connection.currentBill.consumption = currentReading - previousReading;
      
      // Generate new bill
      const billNumber = 'WB' + Date.now().toString().slice(-6);
      connection.currentBill.billNumber = billNumber;
      connection.currentBill.billDate = new Date();
      connection.currentBill.dueDate = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000); // 30 days
      connection.currentBill.paymentStatus = 'pending';
      
      // Add reading to history
      connection.readings.push({
        readingDate: new Date(),
        reading: currentReading,
        consumption: connection.currentBill.consumption,
        readBy
      });
      
      await connection.save();
      
      return NextResponse.json({
        success: true,
        message: 'Meter reading updated successfully',
        data: connection
      });
    }
    
  } catch (error) {
    console.error('Water tax operation error:', error);
    return NextResponse.json({
      success: false,
      message: 'Failed to process water tax operation',
      error: error.message
    }, { status: 500 });
  }
}

export async function GET(request) {
  try {
    await connectDB();
    
    const { searchParams } = new URL(request.url);
    const connectionId = searchParams.get('connectionId');
    const status = searchParams.get('status');
    const propertyType = searchParams.get('propertyType');
    const page = parseInt(searchParams.get('page')) || 1;
    const limit = parseInt(searchParams.get('limit')) || 10;
    
    let query = {};
    
    if (connectionId) {
      query.connectionId = connectionId;
    }
    
    if (status) {
      query.status = status;
    }
    
    if (propertyType) {
      query.propertyType = propertyType;
    }
    
    const skip = (page - 1) * limit;
    
    if (connectionId) {
      // Get specific connection
      const connection = await WaterConnection.findOne(query);
      if (!connection) {
        return NextResponse.json({
          success: false,
          message: 'Connection not found'
        }, { status: 404 });
      }
      
      return NextResponse.json({
        success: true,
        data: connection
      });
    } else {
      // Get all connections with pagination
      const connections = await WaterConnection.find(query)
        .sort({ connectionDate: -1 })
        .skip(skip)
        .limit(limit)
        .lean();
      
      const total = await WaterConnection.countDocuments(query);
      
      return NextResponse.json({
        success: true,
        data: connections,
        pagination: {
          page,
          limit,
          total,
          pages: Math.ceil(total / limit)
        }
      });
    }
    
  } catch (error) {
    console.error('Water tax fetch error:', error);
    return NextResponse.json({
      success: false,
      message: 'Failed to fetch water tax data',
      error: error.message
    }, { status: 500 });
  }
}

export async function PUT(request) {
  try {
    await connectDB();
    
    const data = await request.json();
    const { connectionId, ...updateData } = data;
    
    if (!connectionId) {
      return NextResponse.json({
        success: false,
        message: 'Connection ID is required'
      }, { status: 400 });
    }
    
    const updatedConnection = await WaterConnection.findOneAndUpdate(
      { connectionId },
      updateData,
      { new: true }
    );
    
    if (!updatedConnection) {
      return NextResponse.json({
        success: false,
        message: 'Connection not found'
      }, { status: 404 });
    }
    
    return NextResponse.json({
      success: true,
      message: 'Connection updated successfully',
      data: updatedConnection
    });
    
  } catch (error) {
    console.error('Water tax update error:', error);
    return NextResponse.json({
      success: false,
      message: 'Failed to update water connection',
      error: error.message
    }, { status: 500 });
  }
}