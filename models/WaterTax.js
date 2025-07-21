import mongoose from 'mongoose';

const WaterConnectionSchema = new mongoose.Schema({
  connectionId: {
    type: String,
    unique: true,
    required: true
  },
  
  // Owner Information
  ownerName: {
    type: String,
    required: true
  },
  ownerNameMarathi: String,
  fatherName: String,
  mobileNumber: {
    type: String,
    required: true
  },
  email: String,
  aadharNumber: String,
  
  // Property Information
  propertyAddress: {
    type: String,
    required: true
  },
  propertyType: {
    type: String,
    required: true,
    enum: ['Residential', 'Commercial', 'Industrial', 'Institutional']
  },
  plotNumber: String,
  surveyNumber: String,
  area: Number, // in sq ft
  
  // Connection Details
  connectionType: {
    type: String,
    required: true,
    enum: ['New', 'Temporary', 'Permanent']
  },
  connectionSize: {
    type: String,
    enum: ['15mm', '20mm', '25mm', '32mm', '40mm', '50mm']
  },
  connectionDate: {
    type: Date,
    default: Date.now
  },
  meterNumber: String,
  
  // Billing Information
  currentBill: {
    billNumber: String,
    billDate: Date,
    dueDate: Date,
    previousReading: {
      type: Number,
      default: 0
    },
    currentReading: {
      type: Number,
      default: 0
    },
    consumption: {
      type: Number,
      default: 0
    },
    ratePerUnit: {
      type: Number,
      default: 3
    },
    basicAmount: Number,
    additionalCharges: {
      type: Number,
      default: 0
    },
    totalAmount: Number,
    paymentStatus: {
      type: String,
      enum: ['pending', 'paid', 'overdue'],
      default: 'pending'
    },
    paymentDate: Date,
    paymentId: String
  },
  
  // Connection Status
  status: {
    type: String,
    enum: ['active', 'inactive', 'suspended', 'disconnected'],
    default: 'active'
  },
  
  // Application Details (for new connections)
  applicationDate: Date,
  applicationStatus: {
    type: String,
    enum: ['pending', 'under_review', 'approved', 'rejected', 'connected'],
    default: 'pending'
  },
  approvalDate: Date,
  connectionFee: {
    type: Number,
    default: 500
  },
  securityDeposit: {
    type: Number,
    default: 1000
  },
  
  // Documents
  documents: {
    aadharCard: String,
    propertyTax: String,
    buildingPlan: String,
    occupancyCert: String,
    plumbingCert: String
  },
  
  // Payment History
  paymentHistory: [{
    billNumber: String,
    paymentDate: Date,
    amount: Number,
    paymentMode: String,
    transactionId: String
  }],
  
  // Meter Readings History
  readings: [{
    readingDate: Date,
    reading: Number,
    consumption: Number,
    readBy: String
  }],
  
  // Administrative Fields
  createdBy: String,
  lastUpdated: {
    type: Date,
    default: Date.now
  },
  remarks: String
}, {
  timestamps: true
});

// Generate connection ID
WaterConnectionSchema.pre('save', function(next) {
  if (!this.connectionId) {
    const prefix = this.propertyType === 'Commercial' ? 'WCC' : 'WCR';
    this.connectionId = prefix + Date.now().toString().slice(-6);
  }
  
  // Calculate consumption and bill amount
  if (this.currentBill && this.currentBill.currentReading && this.currentBill.previousReading) {
    this.currentBill.consumption = this.currentBill.currentReading - this.currentBill.previousReading;
    this.currentBill.basicAmount = this.currentBill.consumption * this.currentBill.ratePerUnit;
    this.currentBill.totalAmount = this.currentBill.basicAmount + (this.currentBill.additionalCharges || 0);
  }
  
  next();
});

export default mongoose.models.WaterConnection || mongoose.model('WaterConnection', WaterConnectionSchema);