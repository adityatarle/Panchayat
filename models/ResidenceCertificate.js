import mongoose from 'mongoose';

const ResidenceCertificateSchema = new mongoose.Schema({
  applicationId: {
    type: String,
    unique: true,
    required: true
  },
  
  // Applicant Information
  applicantName: {
    type: String,
    required: true
  },
  applicantNameMarathi: String,
  fatherName: {
    type: String,
    required: true
  },
  motherName: String,
  dateOfBirth: {
    type: Date,
    required: true
  },
  age: Number,
  sex: {
    type: String,
    required: true,
    enum: ['Male', 'Female', 'Transgender']
  },
  
  // Address Information
  currentAddress: {
    type: String,
    required: true
  },
  permanentAddress: String,
  pincode: {
    type: String,
    required: true
  },
  taluka: String,
  district: {
    type: String,
    default: 'Maharashtra'
  },
  state: {
    type: String,
    default: 'Maharashtra'
  },
  
  // Residence Details
  residenceSince: {
    type: Date,
    required: true
  },
  residenceYears: Number,
  residenceType: {
    type: String,
    enum: ['Own House', 'Rented', 'Parental', 'Government Quarters', 'Other']
  },
  
  // Personal Information
  caste: {
    type: String,
    required: true,
    enum: ['General', 'OBC', 'SC', 'ST', 'NT']
  },
  religion: String,
  occupation: String,
  income: Number,
  maritalStatus: {
    type: String,
    enum: ['Single', 'Married', 'Divorced', 'Widowed']
  },
  
  // Contact Information
  mobileNumber: {
    type: String,
    required: true
  },
  email: String,
  aadharNumber: String,
  
  // Purpose of Certificate
  purpose: {
    type: String,
    required: true,
    enum: ['Education', 'Employment', 'Bank Account', 'Passport', 'Legal', 'Other']
  },
  purposeDescription: String,
  
  // Documents
  documents: {
    aadharCard: String,
    rationCard: String,
    voterID: String,
    electricityBill: String,
    waterBill: String,
    schoolTC: String,
    employmentProof: String,
    affidavit: String
  },
  
  // Application Status
  status: {
    type: String,
    enum: ['submitted', 'under_review', 'field_verification', 'approved', 'rejected', 'certificate_ready'],
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
    verificationNotes: String
  },
  
  // Administrative Fields
  submissionDate: {
    type: Date,
    default: Date.now
  },
  processingDate: Date,
  approvalDate: Date,
  rejectionReason: String,
  reviewedBy: String,
  certificateNumber: String,
  paymentStatus: {
    type: String,
    enum: ['pending', 'paid', 'failed'],
    default: 'pending'
  },
  paymentAmount: {
    type: Number,
    default: 30
  },
  paymentId: String,
  
  // Remarks and Notes
  remarks: String,
  internalNotes: String
}, {
  timestamps: true
});

// Generate application ID
ResidenceCertificateSchema.pre('save', function(next) {
  if (!this.applicationId) {
    this.applicationId = 'RC' + Date.now().toString().slice(-6);
  }
  
  // Calculate residence years
  if (this.residenceSince && !this.residenceYears) {
    const now = new Date();
    const diff = now - this.residenceSince;
    this.residenceYears = Math.floor(diff / (1000 * 60 * 60 * 24 * 365));
  }
  
  next();
});

export default mongoose.models.ResidenceCertificate || mongoose.model('ResidenceCertificate', ResidenceCertificateSchema);