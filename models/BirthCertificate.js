import mongoose from 'mongoose';

const BirthCertificateSchema = new mongoose.Schema({
  applicationId: {
    type: String,
    unique: true,
    required: true
  },
  
  // Child Information
  childName: {
    type: String,
    required: true
  },
  childNameMarathi: String,
  dateOfBirth: {
    type: Date,
    required: true
  },
  timeOfBirth: String,
  placeOfBirth: {
    type: String,
    required: true
  },
  sex: {
    type: String,
    required: true,
    enum: ['Male', 'Female', 'Transgender']
  },
  weight: Number,
  
  // Parents Information
  fatherName: {
    type: String,
    required: true
  },
  fatherNameMarathi: String,
  motherName: {
    type: String,
    required: true
  },
  motherNameMarathi: String,
  fatherOccupation: String,
  motherOccupation: String,
  fatherEducation: String,
  motherEducation: String,
  
  // Additional Information
  caste: {
    type: String,
    required: true,
    enum: ['General', 'OBC', 'SC', 'ST', 'NT']
  },
  religion: {
    type: String,
    required: true
  },
  nationality: {
    type: String,
    default: 'Indian'
  },
  hospitalName: String,
  doctorName: String,
  permanentAddress: {
    type: String,
    required: true
  },
  
  // Documents
  documents: {
    hospitalDischarge: String,
    parentsAadhar: String,
    parentsMarriageCert: String,
    affidavit: String,
    addressProof: String
  },
  
  // Application Status
  status: {
    type: String,
    enum: ['submitted', 'under_review', 'approved', 'rejected', 'certificate_ready'],
    default: 'submitted'
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
    default: 50
  },
  paymentId: String,
  
  // Contact Information
  applicantName: String,
  applicantRelation: String,
  applicantContact: String,
  applicantEmail: String,
  
  // Remarks and Notes
  remarks: String,
  internalNotes: String
}, {
  timestamps: true
});

// Generate application ID
BirthCertificateSchema.pre('save', function(next) {
  if (!this.applicationId) {
    this.applicationId = 'BC' + Date.now().toString().slice(-6);
  }
  next();
});

export default mongoose.models.BirthCertificate || mongoose.model('BirthCertificate', BirthCertificateSchema);