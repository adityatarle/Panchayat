import mongoose from 'mongoose';

const MalmattaMahitiSchema = new mongoose.Schema({
  applicationId: {
    type: String,
    unique: true,
    required: true
  },
  
  // Service Type (to differentiate between different sub-modules)
  serviceType: {
    type: String,
    required: true,
    enum: [
      'property-information',
      'new-name-registration',
      'property-transfer',
      'property-number-change',
      'revenue-record-verification',
      'deficit-surplus-statement',
      'gp-property-registration',
      'gp-property-correction',
      'gp-property-division',
      'road-registration',
      'road-correction',
      'land-registration',
      'land-disposal',
      'disability-record',
      'property-verification',
      'organ-donation',
      'military-records'
    ]
  },
  
  // Property Details
  propertyNumber: String,
  surveyNumber: String,
  subdividedNumber: String,
  plotNumber: String,
  
  // Property Location
  village: String,
  taluka: String,
  district: {
    type: String,
    default: 'Maharashtra'
  },
  state: {
    type: String,
    default: 'Maharashtra'
  },
  pincode: String,
  
  // Owner Details (Current)
  ownerName: String,
  ownerNameMarathi: String,
  fatherName: String,
  motherName: String,
  aadharNumber: String,
  mobileNumber: String,
  email: String,
  
  // New Owner Details (for name registration/transfer services)
  newOwnerName: String,
  newOwnerNameMarathi: String,
  newOwnerFatherName: String,
  newOwnerMotherName: String,
  newOwnerDateOfBirth: Date,
  newOwnerAadhar: String,
  newOwnerMobile: String,
  newOwnerEmail: String,
  newOwnerAddress: String,
  city: String,
  
  // Transfer Details
  transferReason: {
    type: String,
    enum: ['Sale', 'Gift', 'Inheritance', 'Will', 'Court Order', 'Family Settlement', 'Other']
  },
  transferDate: Date,
  transferAmount: Number,
  stampDutyPaid: Number,
  registrationFee: Number,
  relationWithCurrentOwner: {
    type: String,
    enum: ['Son', 'Daughter', 'Wife', 'Husband', 'Brother', 'Sister', 'Father', 'Mother', 'Buyer', 'Other']
  },
  
  // Property Information
  propertyType: {
    type: String,
    enum: ['Residential', 'Commercial', 'Agricultural', 'Industrial', 'Plot']
  },
  propertyUsage: {
    type: String,
    enum: ['Self Occupied', 'Rented', 'Vacant', 'Under Construction']
  },
  totalArea: Number,
  builtUpArea: Number,
  yearOfConstruction: Number,
  
  // Revenue Details
  classOfLand: String,
  typeOfTenure: String,
  revenueRecordNumber: String,
  
  // Personal Information
  maritalStatus: {
    type: String,
    enum: ['Single', 'Married', 'Divorced', 'Widow']
  },
  occupation: String,
  monthlyIncome: Number,
  
  // Purpose
  purpose: {
    type: String,
    required: true,
    enum: ['Bank Loan', 'Legal Matters', 'Sale/Purchase', 'Tax Assessment', 'Property Verification', 'Registration', 'Other']
  },
  purposeDescription: String,
  
  // Documents
  documents: {
    aadharCard: String,
    currentOwnerAadhar: String,
    newOwnerAadhar: String,
    propertyCard: String,
    sevenTwelve: String,
    eightA: String,
    salesDeed: String,
    giftDeed: String,
    willDocument: String,
    courtOrder: String,
    noObjectionCertificate: String,
    stampPaper: String,
    identityProof: String,
    addressProof: String,
    occupancyCertificate: String,
    taxReceipt: String
  },
  
  // Application Status
  status: {
    type: String,
    enum: ['submitted', 'under_review', 'field_verification', 'document_verification', 'approved', 'rejected', 'completed'],
    default: 'submitted'
  },
  
  // Verification Details
  fieldVerification: {
    required: {
      type: Boolean,
      default: true
    },
    scheduledDate: Date,
    completedDate: Date,
    verifiedBy: String,
    verificationStatus: {
      type: String,
      enum: ['pending', 'completed', 'failed']
    },
    verificationNotes: String,
    propertyVisited: Boolean,
    documentsVerified: Boolean
  },
  
  // Document Verification
  documentVerification: {
    status: {
      type: String,
      enum: ['pending', 'in_progress', 'completed', 'additional_docs_required'],
      default: 'pending'
    },
    verifiedBy: String,
    verificationDate: Date,
    notes: String,
    additionalDocsRequired: [String]
  },
  
  // Administrative Fields
  submissionDate: {
    type: Date,
    default: Date.now
  },
  processingDate: Date,
  approvalDate: Date,
  completionDate: Date,
  rejectionReason: String,
  reviewedBy: String,
  
  // Fee and Payment
  paymentStatus: {
    type: String,
    enum: ['pending', 'paid', 'failed'],
    default: 'pending'
  },
  paymentAmount: Number,
  paymentId: String,
  paymentDate: Date,
  
  // Output Documents/Certificates
  certificateNumber: String,
  certificateIssueDate: Date,
  certificateValidTill: Date,
  outputDocuments: {
    propertyDocument: String,
    verificationCertificate: String,
    registrationCertificate: String,
    correctionCertificate: String
  },
  
  // Tahsildar Office Details
  tahsildarOffice: String,
  assignedOfficer: String,
  officerContactNumber: String,
  
  // Remarks and Notes
  remarks: String,
  internalNotes: String,
  citizenNotes: String,
  
  // Priority and Urgency
  priority: {
    type: String,
    enum: ['normal', 'urgent', 'very_urgent'],
    default: 'normal'
  },
  
  // Communication History
  communicationHistory: [{
    date: {
      type: Date,
      default: Date.now
    },
    type: {
      type: String,
      enum: ['sms', 'email', 'call', 'letter', 'visit']
    },
    message: String,
    sentBy: String,
    status: {
      type: String,
      enum: ['sent', 'delivered', 'failed']
    }
  }]
}, {
  timestamps: true
});

// Generate application ID based on service type
MalmattaMahitiSchema.pre('save', function(next) {
  if (!this.applicationId) {
    const servicePrefix = {
      'property-information': 'PMI',
      'new-name-registration': 'NNR',
      'property-transfer': 'PTR',
      'property-number-change': 'PNC',
      'revenue-record-verification': 'RRV',
      'deficit-surplus-statement': 'DSS',
      'gp-property-registration': 'GPR',
      'gp-property-correction': 'GPC',
      'gp-property-division': 'GPD',
      'road-registration': 'RRG',
      'road-correction': 'RCR',
      'land-registration': 'LRG',
      'land-disposal': 'LDS',
      'disability-record': 'DRD',
      'property-verification': 'PVR',
      'organ-donation': 'ODN',
      'military-records': 'MRD'
    };
    
    const prefix = servicePrefix[this.serviceType] || 'MMH';
    this.applicationId = prefix + Date.now().toString().slice(-6);
  }
  
  // Set payment amount based on service type
  if (!this.paymentAmount) {
    const serviceCharges = {
      'property-information': 50,
      'new-name-registration': 100,
      'property-transfer': 200,
      'property-number-change': 75,
      'revenue-record-verification': 30,
      'deficit-surplus-statement': 40,
      'gp-property-registration': 150,
      'gp-property-correction': 75,
      'gp-property-division': 100,
      'road-registration': 50,
      'road-correction': 30,
      'land-registration': 100,
      'land-disposal': 80,
      'disability-record': 25,
      'property-verification': 50,
      'organ-donation': 0,
      'military-records': 25
    };
    
    this.paymentAmount = serviceCharges[this.serviceType] || 50;
  }
  
  next();
});

// Add indexes for better query performance
MalmattaMahitiSchema.index({ applicationId: 1 });
MalmattaMahitiSchema.index({ serviceType: 1 });
MalmattaMahitiSchema.index({ status: 1 });
MalmattaMahitiSchema.index({ submissionDate: -1 });
MalmattaMahitiSchema.index({ surveyNumber: 1, village: 1 });
MalmattaMahitiSchema.index({ aadharNumber: 1 });
MalmattaMahitiSchema.index({ mobileNumber: 1 });

export default mongoose.models.MalmattaMahiti || mongoose.model('MalmattaMahiti', MalmattaMahitiSchema);