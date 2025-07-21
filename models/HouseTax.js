import mongoose from 'mongoose';

const PropertySchema = new mongoose.Schema({
  propertyId: {
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
  
  // Property Details
  propertyAddress: {
    type: String,
    required: true
  },
  plotNumber: {
    type: String,
    required: true
  },
  surveyNumber: String,
  ward: String,
  zone: String,
  
  // Property Specifications
  propertyType: {
    type: String,
    required: true,
    enum: ['Residential', 'Commercial', 'Industrial', 'Mixed', 'Institutional']
  },
  propertyCategory: {
    type: String,
    enum: ['Flat', 'Bungalow', 'Row House', 'Tenement', 'Shop', 'Office', 'Warehouse', 'Factory']
  },
  constructionType: {
    type: String,
    enum: ['RCC', 'Semi-RCC', 'Load Bearing', 'Wooden', 'Kutcha']
  },
  
  // Area Details
  plotArea: {
    type: Number,
    required: true // in sq ft
  },
  builtUpArea: {
    type: Number,
    required: true // in sq ft
  },
  numberOfFloors: {
    type: Number,
    default: 1
  },
  age: Number, // years since construction
  
  // Valuation Details
  readyReckonerRate: Number, // per sq ft
  assessedValue: Number,
  annualRentalValue: Number,
  
  // Tax Calculation
  currentTax: {
    assessmentYear: String,
    taxableValue: Number,
    taxRate: {
      type: Number,
      default: 0.012 // 1.2% for residential
    },
    basicTax: Number,
    
    // Additional Charges
    waterTax: {
      type: Number,
      default: 0
    },
    sewageTax: {
      type: Number,
      default: 0
    },
    streetLightTax: {
      type: Number,
      default: 100
    },
    conservancyTax: {
      type: Number,
      default: 200
    },
    educationCess: {
      type: Number,
      default: 0
    },
    
    totalTax: Number,
    dueDate: Date,
    paymentStatus: {
      type: String,
      enum: ['pending', 'paid', 'overdue', 'partial'],
      default: 'pending'
    },
    paidAmount: {
      type: Number,
      default: 0
    },
    pendingAmount: Number,
    
    // Penalties and Interest
    penalty: {
      type: Number,
      default: 0
    },
    interest: {
      type: Number,
      default: 0
    }
  },
  
  // Exemptions
  exemptions: {
    seniorCitizen: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    ews: {
      type: Boolean,
      default: false
    },
    exServiceman: {
      type: Boolean,
      default: false
    },
    exemptionAmount: {
      type: Number,
      default: 0
    }
  },
  
  // Property Status
  status: {
    type: String,
    enum: ['active', 'inactive', 'demolished', 'under_construction', 'vacant'],
    default: 'active'
  },
  
  // Assessment History
  assessmentHistory: [{
    year: String,
    assessedValue: Number,
    taxAmount: Number,
    assessmentDate: Date,
    assessedBy: String
  }],
  
  // Payment History
  paymentHistory: [{
    receiptNumber: String,
    paymentDate: Date,
    amount: Number,
    paymentMode: String,
    transactionId: String,
    forYear: String
  }],
  
  // Documents
  documents: {
    propertyCard: String,
    titleDeed: String,
    buildingPlan: String,
    occupancyCert: String,
    aadharCard: String,
    taxReceipts: [String]
  },
  
  // Ownership Transfer
  transferHistory: [{
    previousOwner: String,
    transferDate: Date,
    transferType: String, // Sale, Gift, Inheritance
    registrationNumber: String,
    stampDuty: Number
  }],
  
  // Administrative Fields
  registrationDate: {
    type: Date,
    default: Date.now
  },
  lastAssessmentDate: Date,
  lastPaymentDate: Date,
  createdBy: String,
  updatedBy: String,
  remarks: String
}, {
  timestamps: true
});

// Generate property ID
PropertySchema.pre('save', function(next) {
  if (!this.propertyId) {
    const prefix = this.propertyType === 'Commercial' ? 'HC' : 'HR';
    this.propertyId = prefix + Date.now().toString().slice(-6);
  }
  
  // Calculate tax amounts
  if (this.currentTax && this.currentTax.taxableValue && this.currentTax.taxRate) {
    this.currentTax.basicTax = this.currentTax.taxableValue * this.currentTax.taxRate;
    
    // Apply exemptions
    let exemptionAmount = 0;
    if (this.exemptions.seniorCitizen) exemptionAmount += this.currentTax.basicTax * 0.5;
    if (this.exemptions.disabled) exemptionAmount += this.currentTax.basicTax * 0.75;
    if (this.exemptions.ews) exemptionAmount += this.currentTax.basicTax * 0.3;
    
    this.exemptions.exemptionAmount = Math.min(exemptionAmount, this.currentTax.basicTax);
    
    // Calculate total tax
    this.currentTax.totalTax = 
      (this.currentTax.basicTax - this.exemptions.exemptionAmount) +
      (this.currentTax.waterTax || 0) +
      (this.currentTax.sewageTax || 0) +
      (this.currentTax.streetLightTax || 0) +
      (this.currentTax.conservancyTax || 0) +
      (this.currentTax.educationCess || 0) +
      (this.currentTax.penalty || 0) +
      (this.currentTax.interest || 0);
    
    this.currentTax.pendingAmount = this.currentTax.totalTax - (this.currentTax.paidAmount || 0);
  }
  
  next();
});

export default mongoose.models.Property || mongoose.model('Property', PropertySchema);