// Database helper functions for PostgreSQL/Prisma operations

// Enum conversion utilities
export const enumConverters = {
  // Service Type conversion
  serviceTypeToEnum: (serviceType) => {
    const map = {
      'property-information': 'PROPERTY_INFORMATION',
      'new-name-registration': 'NEW_NAME_REGISTRATION',
      'property-transfer': 'PROPERTY_TRANSFER',
      'property-number-change': 'PROPERTY_NUMBER_CHANGE',
      'revenue-record-verification': 'REVENUE_RECORD_VERIFICATION',
      'deficit-surplus-statement': 'DEFICIT_SURPLUS_STATEMENT',
      'gp-property-registration': 'GP_PROPERTY_REGISTRATION',
      'gp-property-correction': 'GP_PROPERTY_CORRECTION',
      'gp-property-division': 'GP_PROPERTY_DIVISION',
      'road-registration': 'ROAD_REGISTRATION',
      'road-correction': 'ROAD_CORRECTION',
      'land-registration': 'LAND_REGISTRATION',
      'land-disposal': 'LAND_DISPOSAL',
      'disability-record': 'DISABILITY_RECORD',
      'property-verification': 'PROPERTY_VERIFICATION',
      'organ-donation': 'ORGAN_DONATION',
      'military-records': 'MILITARY_RECORDS'
    };
    return map[serviceType] || 'PROPERTY_INFORMATION';
  },

  // Application ID prefixes
  serviceTypePrefixes: {
    'PROPERTY_INFORMATION': 'PMI',
    'NEW_NAME_REGISTRATION': 'NNR',
    'PROPERTY_TRANSFER': 'PTR',
    'PROPERTY_NUMBER_CHANGE': 'PNC',
    'REVENUE_RECORD_VERIFICATION': 'RRV',
    'DEFICIT_SURPLUS_STATEMENT': 'DSS',
    'GP_PROPERTY_REGISTRATION': 'GPR',
    'GP_PROPERTY_CORRECTION': 'GPC',
    'GP_PROPERTY_DIVISION': 'GPD',
    'ROAD_REGISTRATION': 'RRG',
    'ROAD_CORRECTION': 'RCR',
    'LAND_REGISTRATION': 'LRG',
    'LAND_DISPOSAL': 'LDS',
    'DISABILITY_RECORD': 'DRD',
    'PROPERTY_VERIFICATION': 'PVR',
    'ORGAN_DONATION': 'ODN',
    'MILITARY_RECORDS': 'MRD'
  },

  // Service charges
  serviceCharges: {
    'PROPERTY_INFORMATION': 50,
    'NEW_NAME_REGISTRATION': 100,
    'PROPERTY_TRANSFER': 200,
    'PROPERTY_NUMBER_CHANGE': 75,
    'REVENUE_RECORD_VERIFICATION': 30,
    'DEFICIT_SURPLUS_STATEMENT': 40,
    'GP_PROPERTY_REGISTRATION': 150,
    'GP_PROPERTY_CORRECTION': 75,
    'GP_PROPERTY_DIVISION': 100,
    'ROAD_REGISTRATION': 50,
    'ROAD_CORRECTION': 30,
    'LAND_REGISTRATION': 100,
    'LAND_DISPOSAL': 80,
    'DISABILITY_RECORD': 25,
    'PROPERTY_VERIFICATION': 50,
    'ORGAN_DONATION': 0,
    'MILITARY_RECORDS': 25
  },

  // Convert various string values to proper enum format
  toEnumFormat: (value) => {
    if (!value) return null;
    return value.toString().toUpperCase().replace(/[^A-Z0-9]/g, '_');
  },

  // Convert purpose strings to enum
  purposeToEnum: (purpose) => {
    const map = {
      'Bank Loan': 'BANK_LOAN',
      'Legal Matters': 'LEGAL_MATTERS',
      'Sale/Purchase': 'SALE_PURCHASE',
      'Tax Assessment': 'TAX_ASSESSMENT',
      'Property Verification': 'PROPERTY_VERIFICATION',
      'Registration': 'REGISTRATION',
      'Education': 'EDUCATION',
      'Employment': 'EMPLOYMENT',
      'Passport': 'PASSPORT',
      'Job Application': 'EMPLOYMENT',
      'Bank Account': 'BANK_LOAN',
      'Scholarship': 'EDUCATION',
      'Educational Admission': 'EDUCATION',
      'Government Scheme': 'OTHER'
    };
    return map[purpose] || 'OTHER';
  },

  // Convert caste strings to enum
  casteToEnum: (caste) => {
    const map = {
      'General': 'GENERAL',
      'OBC': 'OBC',
      'SC': 'SC',
      'ST': 'ST',
      'NT': 'NT'
    };
    return map[caste] || 'GENERAL';
  },

  // Convert marital status to enum
  maritalStatusToEnum: (status) => {
    const map = {
      'Single': 'SINGLE',
      'Married': 'MARRIED',
      'Divorced': 'DIVORCED',
      'Widow': 'WIDOWED',
      'Widower': 'WIDOWED'
    };
    return map[status] || 'SINGLE';
  },

  // Convert gender to enum
  genderToEnum: (gender) => {
    const map = {
      'Male': 'MALE',
      'Female': 'FEMALE',
      'Transgender': 'TRANSGENDER',
      'M': 'MALE',
      'F': 'FEMALE',
      'T': 'TRANSGENDER'
    };
    return map[gender] || 'MALE';
  }
};

// Application ID generators
export const generateApplicationId = (serviceType) => {
  const serviceTypeEnum = enumConverters.serviceTypeToEnum(serviceType);
  const prefix = enumConverters.serviceTypePrefixes[serviceTypeEnum] || 'APP';
  return prefix + Date.now().toString().slice(-6);
};

// Data sanitization helpers
export const sanitizeData = {
  // Convert and validate dates
  toDate: (dateString) => {
    if (!dateString) return null;
    const date = new Date(dateString);
    return isNaN(date.getTime()) ? null : date;
  },

  // Convert and validate numbers
  toFloat: (value) => {
    if (value === null || value === undefined || value === '') return null;
    const num = parseFloat(value);
    return isNaN(num) ? null : num;
  },

  toInt: (value) => {
    if (value === null || value === undefined || value === '') return null;
    const num = parseInt(value);
    return isNaN(num) ? null : num;
  },

  // Sanitize strings
  toString: (value) => {
    if (value === null || value === undefined) return null;
    return value.toString().trim() || null;
  },

  // Sanitize phone numbers
  toPhoneNumber: (phone) => {
    if (!phone) return null;
    const cleaned = phone.toString().replace(/\D/g, '');
    return cleaned.length === 10 ? cleaned : null;
  },

  // Sanitize Aadhar numbers
  toAadharNumber: (aadhar) => {
    if (!aadhar) return null;
    const cleaned = aadhar.toString().replace(/\D/g, '');
    return cleaned.length === 12 ? cleaned : null;
  },

  // Sanitize pincode
  toPincode: (pincode) => {
    if (!pincode) return null;
    const cleaned = pincode.toString().replace(/\D/g, '');
    return cleaned.length === 6 ? cleaned : null;
  }
};

// Common database operations
export const dbOperations = {
  // Prepare Malmatta Mahiti data for database insertion
  prepareMalmattaMahitiData: (formData) => {
    const serviceTypeEnum = enumConverters.serviceTypeToEnum(formData.serviceType);
    const applicationId = generateApplicationId(formData.serviceType);
    const paymentAmount = enumConverters.serviceCharges[serviceTypeEnum] || 50;

    return {
      applicationId,
      serviceType: serviceTypeEnum,
      paymentAmount,
      // Convert enum fields
      purpose: enumConverters.purposeToEnum(formData.purpose),
      propertyType: enumConverters.toEnumFormat(formData.propertyType),
      propertyUsage: enumConverters.toEnumFormat(formData.propertyUsage),
      transferReason: enumConverters.toEnumFormat(formData.transferReason),
      relationWithCurrentOwner: enumConverters.toEnumFormat(formData.relationWithCurrentOwner),
      maritalStatus: enumConverters.maritalStatusToEnum(formData.maritalStatus),
      // Basic string fields
      propertyNumber: sanitizeData.toString(formData.propertyNumber),
      surveyNumber: sanitizeData.toString(formData.surveyNumber),
      subdividedNumber: sanitizeData.toString(formData.subdividedNumber),
      plotNumber: sanitizeData.toString(formData.plotNumber),
      village: sanitizeData.toString(formData.village),
      taluka: sanitizeData.toString(formData.taluka),
      district: sanitizeData.toString(formData.district) || 'Maharashtra',
      state: sanitizeData.toString(formData.state) || 'Maharashtra',
      pincode: sanitizeData.toPincode(formData.pincode),
      ownerName: sanitizeData.toString(formData.ownerName),
      ownerNameMarathi: sanitizeData.toString(formData.ownerNameMarathi),
      fatherName: sanitizeData.toString(formData.fatherName),
      motherName: sanitizeData.toString(formData.motherName),
      aadharNumber: sanitizeData.toAadharNumber(formData.aadharNumber),
      mobileNumber: sanitizeData.toPhoneNumber(formData.mobileNumber),
      email: sanitizeData.toString(formData.email),
      // New owner fields
      newOwnerName: sanitizeData.toString(formData.newOwnerName),
      newOwnerNameMarathi: sanitizeData.toString(formData.newOwnerNameMarathi),
      newOwnerFatherName: sanitizeData.toString(formData.newOwnerFatherName),
      newOwnerMotherName: sanitizeData.toString(formData.newOwnerMotherName),
      newOwnerDateOfBirth: sanitizeData.toDate(formData.newOwnerDateOfBirth),
      newOwnerAadhar: sanitizeData.toAadharNumber(formData.newOwnerAadhar),
      newOwnerMobile: sanitizeData.toPhoneNumber(formData.newOwnerMobile),
      newOwnerEmail: sanitizeData.toString(formData.newOwnerEmail),
      newOwnerAddress: sanitizeData.toString(formData.newOwnerAddress),
      city: sanitizeData.toString(formData.city),
      // Date fields
      transferDate: sanitizeData.toDate(formData.transferDate),
      // Numeric fields
      transferAmount: sanitizeData.toFloat(formData.transferAmount),
      stampDutyPaid: sanitizeData.toFloat(formData.stampDutyPaid),
      registrationFee: sanitizeData.toFloat(formData.registrationFee),
      totalArea: sanitizeData.toFloat(formData.totalArea),
      builtUpArea: sanitizeData.toFloat(formData.builtUpArea),
      yearOfConstruction: sanitizeData.toInt(formData.yearOfConstruction),
      monthlyIncome: sanitizeData.toFloat(formData.monthlyIncome),
      // Other fields
      classOfLand: sanitizeData.toString(formData.classOfLand),
      typeOfTenure: sanitizeData.toString(formData.typeOfTenure),
      revenueRecordNumber: sanitizeData.toString(formData.revenueRecordNumber),
      occupation: sanitizeData.toString(formData.occupation),
      purposeDescription: sanitizeData.toString(formData.purposeDescription),
      documents: formData.documents || {},
      tahsildarOffice: sanitizeData.toString(formData.tahsildarOffice),
      assignedOfficer: sanitizeData.toString(formData.assignedOfficer),
      officerContactNumber: sanitizeData.toPhoneNumber(formData.officerContactNumber),
      remarks: sanitizeData.toString(formData.remarks),
      internalNotes: sanitizeData.toString(formData.internalNotes),
      citizenNotes: sanitizeData.toString(formData.citizenNotes)
    };
  },

  // Prepare Residence Certificate data for database insertion
  prepareResidenceCertificateData: (formData) => {
    const applicationId = 'RC' + Date.now().toString().slice(-6);

    return {
      applicationId,
      applicantName: sanitizeData.toString(formData.applicantName),
      applicantNameMarathi: sanitizeData.toString(formData.applicantNameMarathi),
      fatherName: sanitizeData.toString(formData.fatherName),
      motherName: sanitizeData.toString(formData.motherName),
      dateOfBirth: sanitizeData.toDate(formData.dateOfBirth),
      age: sanitizeData.toInt(formData.age),
      gender: enumConverters.genderToEnum(formData.gender),
      currentAddress: sanitizeData.toString(formData.currentAddress),
      permanentAddress: sanitizeData.toString(formData.permanentAddress),
      pincode: sanitizeData.toPincode(formData.pincode),
      taluka: sanitizeData.toString(formData.taluka),
      district: sanitizeData.toString(formData.district) || 'Maharashtra',
      state: sanitizeData.toString(formData.state) || 'Maharashtra',
      residenceSince: sanitizeData.toDate(formData.residingSince) || new Date('2020-01-01'),
      residenceYears: sanitizeData.toInt(formData.residenceYears),
      residenceType: sanitizeData.toString(formData.residenceType),
      caste: enumConverters.casteToEnum(formData.caste),
      religion: sanitizeData.toString(formData.religion),
      occupation: sanitizeData.toString(formData.occupation),
      income: sanitizeData.toFloat(formData.monthlyIncome),
      maritalStatus: enumConverters.maritalStatusToEnum(formData.maritalStatus),
      mobileNumber: sanitizeData.toPhoneNumber(formData.mobileNumber),
      email: sanitizeData.toString(formData.email),
      aadharNumber: sanitizeData.toAadharNumber(formData.aadharNumber),
      purpose: enumConverters.purposeToEnum(formData.purpose),
      purposeDescription: sanitizeData.toString(formData.purposeDescription),
      documents: formData.documents || {},
      remarks: sanitizeData.toString(formData.remarks)
    };
  }
};

// Query helpers
export const queryHelpers = {
  // Build where clause for filtering
  buildWhereClause: (filters) => {
    const where = {};

    if (filters.applicationId) {
      where.applicationId = filters.applicationId;
    }

    if (filters.status) {
      where.status = filters.status.toUpperCase();
    }

    if (filters.serviceType) {
      where.serviceType = enumConverters.serviceTypeToEnum(filters.serviceType);
    }

    if (filters.paymentStatus) {
      where.paymentStatus = filters.paymentStatus.toUpperCase();
    }

    if (filters.mobileNumber) {
      where.mobileNumber = filters.mobileNumber;
    }

    if (filters.aadharNumber) {
      where.aadharNumber = filters.aadharNumber;
    }

    if (filters.surveyNumber) {
      where.surveyNumber = filters.surveyNumber;
    }

    if (filters.village) {
      where.village = {
        contains: filters.village,
        mode: 'insensitive'
      };
    }

    if (filters.dateFrom || filters.dateTo) {
      where.submissionDate = {};
      if (filters.dateFrom) {
        where.submissionDate.gte = new Date(filters.dateFrom);
      }
      if (filters.dateTo) {
        where.submissionDate.lte = new Date(filters.dateTo);
      }
    }

    return where;
  },

  // Standard pagination
  buildPagination: (page = 1, limit = 10) => {
    const skip = (page - 1) * limit;
    return { skip, take: limit };
  }
};

export default {
  enumConverters,
  generateApplicationId,
  sanitizeData,
  dbOperations,
  queryHelpers
};