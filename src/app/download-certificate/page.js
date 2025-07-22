'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';

export default function DownloadCertificate() {
  const [searchCriteria, setSearchCriteria] = useState('application');
  const [searchValue, setSearchValue] = useState('');
  const [searchResult, setSearchResult] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const certificateRef = useRef();

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Enhanced sample certificate data with more realistic details
  const sampleCertificates = {
    'BC123456': {
      type: 'Birth Certificate',
      typeHindi: 'जन्म प्रमाणपत्र',
      applicantName: 'राम कुमार शर्मा',
      applicantNameEnglish: 'Ram Kumar Sharma',
      applicationNumber: 'BC123456',
      certificateNumber: 'GP/BC/2024/001234',
      issueDate: '2024-01-20',
      issuedBy: 'ग्राम पंचायत नांदूर मधमेश्वर',
      issuedByEnglish: 'Gram Panchayat Nandur Madhmeshwar',
      status: 'Available',
      validUpto: '2029-01-20',
      details: {
        dateOfBirth: '15-03-1995',
        placeOfBirth: 'नांदूर मधमेश्वर, महाराष्ट्र',
        fatherName: 'श्री गोपाल कुमार शर्मा',
        motherName: 'श्रीमती सुनीता शर्मा',
        registrationNumber: 'BR/2024/001234',
        registrarName: 'श्री संदीप पाटिल',
        district: 'पुणे',
        state: 'महाराष्ट्र'
      }
    },
    'RC789012': {
      type: 'Residence Certificate',
      typeHindi: 'निवास प्रमाणपत्र',
      applicantName: 'सुनीता देवी पाटिल',
      applicantNameEnglish: 'Sunita Devi Patil',
      applicationNumber: 'RC789012',
      certificateNumber: 'GP/RC/2024/007890',
      issueDate: '2024-01-18',
      issuedBy: 'ग्राम पंचायत नांदूर मधमेश्वर',
      issuedByEnglish: 'Gram Panchayat Nandur Madhmeshwar',
      status: 'Available',
      validUpto: '2027-01-18',
      details: {
        address: 'गांव नांदूर मधमेश्वर, तहसील इंदापूर, जिला पुणे',
        pincode: '413106',
        residingSince: '1985',
        fatherName: 'श्री रामचंद्र पाटिल',
        occupation: 'कृषक',
        registrarName: 'श्री संदीप पाटिल',
        district: 'पुणे',
        state: 'महाराष्ट्र'
      }
    },
    'IC456789': {
      type: 'Income Certificate',
      typeHindi: 'आय प्रमाणपत्र',
      applicantName: 'अजय कुमार वर्मा',
      applicantNameEnglish: 'Ajay Kumar Verma',
      applicationNumber: 'IC456789',
      certificateNumber: 'GP/IC/2024/004567',
      issueDate: '2024-01-15',
      issuedBy: 'ग्राम पंचायत नांदूर मधमेश्वर',
      issuedByEnglish: 'Gram Panchayat Nandur Madhmeshwar',
      status: 'Available',
      validUpto: '2025-01-15',
      details: {
        annualIncome: '₹ 2,50,000',
        incomeSource: 'कृषि एवं पशुपालन',
        address: 'गांव नांदूर मधमेश्वर, तहसील इंदापूर',
        fatherName: 'श्री राजेश कुमार वर्मा',
        occupation: 'किसान',
        registrarName: 'श्री संदीप पाटिल',
        district: 'पुणे',
        state: 'महाराष्ट्र'
      }
    },
    'MC567890': {
      type: 'Marriage Certificate',
      typeHindi: 'विवाह प्रमाणपत्र',
      applicantName: 'राहुल शर्मा एवं प्रिया पाटिल',
      applicantNameEnglish: 'Rahul Sharma & Priya Patil',
      applicationNumber: 'MC567890',
      certificateNumber: 'GP/MC/2024/005678',
      issueDate: '2024-01-10',
      issuedBy: 'ग्राम पंचायत नांदूर मधमेश्वर',
      issuedByEnglish: 'Gram Panchayat Nandur Madhmeshwar',
      status: 'Available',
      validUpto: 'आजीवन वैध',
      details: {
        dateOfMarriage: '05-12-2023',
        placeOfMarriage: 'नांदूर मधमेश्वर, महाराष्ट्र',
        groomName: 'राहुल शर्मा',
        groomFather: 'श्री विकास शर्मा',
        brideName: 'प्रिया पाटिल',
        brideFather: 'श्री सुनील पाटिल',
        registrarName: 'श्री संदीप पाटिल',
        district: 'पुणे',
        state: 'महाराष्ट्र'
      }
    },
    'CC234567': {
      type: 'Caste Certificate',
      typeHindi: 'जाति प्रमाणपत्र',
      applicantName: 'विकास रामचंद्र जाधव',
      applicantNameEnglish: 'Vikas Ramchandra Jadhav',
      applicationNumber: 'CC234567',
      certificateNumber: 'GP/CC/2024/002345',
      issueDate: '2024-01-12',
      issuedBy: 'ग्राम पंचायत नांदूर मधमेश्वर',
      issuedByEnglish: 'Gram Panchayat Nandur Madhmeshwar',
      status: 'Available',
      validUpto: 'आजीवन वैध',
      details: {
        caste: 'मराठा',
        category: 'अनुसूचित जाति (SC)',
        fatherName: 'श्री रामचंद्र जाधव',
        address: 'गांव नांदूर मधमेश्वर, तहसील इंदापूर',
        registrarName: 'श्री संदीप पाटिल',
        district: 'पुणे',
        state: 'महाराष्ट्र'
      }
    }
  };

  const handleSearch = () => {
    if (sampleCertificates[searchValue]) {
      setSearchResult(sampleCertificates[searchValue]);
    } else {
      setSearchResult(null);
      alert('कोई प्रमाणपत्र नहीं मिला। कृपया सही जानकारी डालें।\nउदाहरण: BC123456, RC789012, IC456789, MC567890, CC234567');
    }
  };

  const generateCertificatePDF = async (certificate) => {
    if (!isClient) {
      alert('कृपया थोड़ा इंतजार करें...');
      return;
    }

    setIsGenerating(true);
    try {
      // Dynamically import the PDF libraries only on client side
      const { default: jsPDF } = await import('jspdf');
      const { default: html2canvas } = await import('html2canvas');

      // Create certificate content
      const certificateElement = document.createElement('div');
      certificateElement.innerHTML = getCertificateHTML(certificate);
      certificateElement.style.position = 'absolute';
      certificateElement.style.left = '-9999px';
      certificateElement.style.width = '794px'; // A4 width in pixels at 96 DPI
      certificateElement.style.backgroundColor = 'white';
      certificateElement.style.fontFamily = 'Arial, sans-serif';
      document.body.appendChild(certificateElement);

      // Wait a bit for fonts to load
      await new Promise(resolve => setTimeout(resolve, 100));

      // Convert to canvas
      const canvas = await html2canvas(certificateElement, {
        scale: 2,
        useCORS: true,
        backgroundColor: '#ffffff',
        logging: false,
        allowTaint: true
      });

      // Remove temporary element
      document.body.removeChild(certificateElement);

      // Create PDF
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgData = canvas.toDataURL('image/png');
      const imgWidth = 210; // A4 width in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      
      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
      
      // Download PDF
      const filename = `${certificate.certificateNumber.replace(/\//g, '_')}_${certificate.applicantNameEnglish.replace(/\s+/g, '_')}.pdf`;
      pdf.save(filename);
      
      alert('✅ PDF सफलतापूर्वक डाउनलोड हो गया!');
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('PDF जेनरेट करने में त्रुटि हुई। कृपया पुनः प्रयास करें।\n\nError: ' + error.message);
    } finally {
      setIsGenerating(false);
    }
  };

  const getCertificateHTML = (certificate) => {
    const today = new Date().toLocaleDateString('hi-IN');
    
    if (certificate.type === 'Birth Certificate') {
      return `
        <div style="font-family: 'Noto Sans Devanagari', Arial, sans-serif; padding: 40px; background: white; width: 794px; min-height: 1123px;">
          <!-- Header -->
          <div style="text-align: center; border-bottom: 3px solid #FF6B35; padding-bottom: 20px; margin-bottom: 30px;">
            <div style="display: flex; align-items: center; justify-content: center; gap: 20px; margin-bottom: 15px;">
              <div style="width: 60px; height: 60px; background: #1e40af; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 30px; color: white;">🏛️</div>
              <div>
                <h1 style="margin: 0; color: #1e40af; font-size: 24px; font-weight: bold;">भारत सरकार</h1>
                <h2 style="margin: 5px 0; color: #1e40af; font-size: 20px;">Government of India</h2>
                <h3 style="margin: 0; color: #6b7280; font-size: 16px;">महाराष्ट्र राज्य | State of Maharashtra</h3>
              </div>
            </div>
            <h2 style="margin: 15px 0 5px 0; color: #1e40af; font-size: 28px; font-weight: bold;">जन्म प्रमाणपत्र</h2>
            <h3 style="margin: 0; color: #374151; font-size: 22px;">BIRTH CERTIFICATE</h3>
          </div>

          <!-- Certificate Content -->
          <div style="line-height: 1.8; font-size: 16px; color: #374151;">
            <p style="text-align: center; font-size: 18px; font-weight: bold; color: #1e40af; margin-bottom: 25px;">
              प्रमाणपत्र संख्या: ${certificate.certificateNumber}
            </p>
            
            <p style="margin-bottom: 20px; text-align: justify;">
              यह प्रमाणित किया जाता है कि <strong>${certificate.applicantName}</strong> का जन्म दिनांक 
              <strong>${certificate.details.dateOfBirth}</strong> को <strong>${certificate.details.placeOfBirth}</strong> 
              में हुआ था। इनके पिता का नाम <strong>${certificate.details.fatherName}</strong> तथा माता का नाम 
              <strong>${certificate.details.motherName}</strong> है।
            </p>
            
            <p style="margin-bottom: 20px; text-align: justify;">
              This is to certify that <strong>${certificate.applicantNameEnglish}</strong> was born on 
              <strong>${certificate.details.dateOfBirth}</strong> at <strong>${certificate.details.placeOfBirth}</strong>. 
              Father's name is <strong>${certificate.details.fatherName}</strong> and Mother's name is 
              <strong>${certificate.details.motherName}</strong>.
            </p>

            <div style="margin: 30px 0;">
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 8px; border: 1px solid #d1d5db; background: #f9fafb; font-weight: bold;">पंजीकरण संख्या / Registration No.</td>
                  <td style="padding: 8px; border: 1px solid #d1d5db;">${certificate.details.registrationNumber}</td>
                </tr>
                <tr>
                  <td style="padding: 8px; border: 1px solid #d1d5db; background: #f9fafb; font-weight: bold;">जिला / District</td>
                  <td style="padding: 8px; border: 1px solid #d1d5db;">${certificate.details.district}</td>
                </tr>
                <tr>
                  <td style="padding: 8px; border: 1px solid #d1d5db; background: #f9fafb; font-weight: bold;">राज्य / State</td>
                  <td style="padding: 8px; border: 1px solid #d1d5db;">${certificate.details.state}</td>
                </tr>
              </table>
            </div>
          </div>

          <!-- Footer -->
          <div style="margin-top: 50px;">
            <div style="display: flex; justify-content: space-between; align-items: end;">
              <div>
                <p style="margin: 0; font-size: 14px; color: #6b7280;">जारी करने की तारीख: ${certificate.issueDate}</p>
                <p style="margin: 0; font-size: 14px; color: #6b7280;">Issue Date: ${certificate.issueDate}</p>
                <p style="margin: 10px 0 0 0; font-size: 14px; color: #6b7280;">
                  यह प्रमाणपत्र डिजिटल रूप से सत्यापित है | This certificate is digitally verified
                </p>
              </div>
              <div style="text-align: center;">
                <div style="border-top: 2px solid #374151; width: 200px; margin-bottom: 5px;"></div>
                <p style="margin: 0; font-weight: bold;">${certificate.details.registrarName}</p>
                <p style="margin: 0; font-size: 14px;">पंजीयक / Registrar</p>
                <p style="margin: 0; font-size: 14px;">${certificate.issuedBy}</p>
              </div>
            </div>
            
            <!-- QR Code Placeholder -->
            <div style="text-align: center; margin-top: 30px; padding: 20px; border: 2px dashed #d1d5db;">
              <div style="width: 80px; height: 80px; background: #f3f4f6; margin: 0 auto; display: flex; align-items: center; justify-content: center; font-size: 12px; color: #6b7280;">
                QR Code<br/>for<br/>Verification
              </div>
              <p style="margin: 10px 0 0 0; font-size: 12px; color: #6b7280;">
                सत्यापन के लिए QR कोड स्कैन करें | Scan QR Code for Verification
              </p>
            </div>
          </div>
        </div>
      `;
    } else if (certificate.type === 'Residence Certificate') {
      return `
        <div style="font-family: 'Noto Sans Devanagari', Arial, sans-serif; padding: 40px; background: white; width: 794px; min-height: 1123px;">
          <!-- Header -->
          <div style="text-align: center; border-bottom: 3px solid #10B981; padding-bottom: 20px; margin-bottom: 30px;">
            <div style="display: flex; align-items: center; justify-content: center; gap: 20px; margin-bottom: 15px;">
              <div style="width: 60px; height: 60px; background: #1e40af; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 30px; color: white;">🏛️</div>
              <div>
                <h1 style="margin: 0; color: #1e40af; font-size: 24px; font-weight: bold;">भारत सरकार</h1>
                <h2 style="margin: 5px 0; color: #1e40af; font-size: 20px;">Government of India</h2>
                <h3 style="margin: 0; color: #6b7280; font-size: 16px;">महाराष्ट्र राज्य | State of Maharashtra</h3>
              </div>
            </div>
            <h2 style="margin: 15px 0 5px 0; color: #1e40af; font-size: 28px; font-weight: bold;">निवास प्रमाणपत्र</h2>
            <h3 style="margin: 0; color: #374151; font-size: 22px;">RESIDENCE CERTIFICATE</h3>
          </div>

          <!-- Certificate Content -->
          <div style="line-height: 1.8; font-size: 16px; color: #374151;">
            <p style="text-align: center; font-size: 18px; font-weight: bold; color: #1e40af; margin-bottom: 25px;">
              प्रमाणपत्र संख्या: ${certificate.certificateNumber}
            </p>
            
            <p style="margin-bottom: 20px; text-align: justify;">
              यह प्रमाणित किया जाता है कि <strong>${certificate.applicantName}</strong> पुत्री/पुत्र 
              <strong>${certificate.details.fatherName}</strong> निवासी <strong>${certificate.details.address}</strong> 
              पिनकोड <strong>${certificate.details.pincode}</strong> पिछले <strong>${certificate.details.residingSince}</strong> 
              वर्षों से यहाँ निरंतर निवास कर रहे/रही हैं।
            </p>
            
            <p style="margin-bottom: 20px; text-align: justify;">
              This is to certify that <strong>${certificate.applicantNameEnglish}</strong> son/daughter of 
              <strong>${certificate.details.fatherName}</strong> resident of <strong>${certificate.details.address}</strong> 
              PIN Code <strong>${certificate.details.pincode}</strong> has been continuously residing here since 
              <strong>${certificate.details.residingSince}</strong>.
            </p>

            <div style="margin: 30px 0;">
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 8px; border: 1px solid #d1d5db; background: #f9fafb; font-weight: bold;">व्यवसाय / Occupation</td>
                  <td style="padding: 8px; border: 1px solid #d1d5db;">${certificate.details.occupation}</td>
                </tr>
                <tr>
                  <td style="padding: 8px; border: 1px solid #d1d5db; background: #f9fafb; font-weight: bold;">जिला / District</td>
                  <td style="padding: 8px; border: 1px solid #d1d5db;">${certificate.details.district}</td>
                </tr>
                <tr>
                  <td style="padding: 8px; border: 1px solid #d1d5db; background: #f9fafb; font-weight: bold;">राज्य / State</td>
                  <td style="padding: 8px; border: 1px solid #d1d5db;">${certificate.details.state}</td>
                </tr>
              </table>
            </div>
          </div>

          <!-- Footer -->
          <div style="margin-top: 50px;">
            <div style="display: flex; justify-content: space-between; align-items: end;">
              <div>
                <p style="margin: 0; font-size: 14px; color: #6b7280;">जारी करने की तारीख: ${certificate.issueDate}</p>
                <p style="margin: 0; font-size: 14px; color: #6b7280;">वैध तक: ${certificate.validUpto}</p>
                <p style="margin: 10px 0 0 0; font-size: 14px; color: #6b7280;">
                  यह प्रमाणपत्र डिजिटल रूप से सत्यापित है | This certificate is digitally verified
                </p>
              </div>
              <div style="text-align: center;">
                <div style="border-top: 2px solid #374151; width: 200px; margin-bottom: 5px;"></div>
                <p style="margin: 0; font-weight: bold;">${certificate.details.registrarName}</p>
                <p style="margin: 0; font-size: 14px;">पंजीयक / Registrar</p>
                <p style="margin: 0; font-size: 14px;">${certificate.issuedBy}</p>
              </div>
            </div>
            
            <!-- QR Code Placeholder -->
            <div style="text-align: center; margin-top: 30px; padding: 20px; border: 2px dashed #d1d5db;">
              <div style="width: 80px; height: 80px; background: #f3f4f6; margin: 0 auto; display: flex; align-items: center; justify-content: center; font-size: 12px; color: #6b7280;">
                QR Code<br/>for<br/>Verification
              </div>
              <p style="margin: 10px 0 0 0; font-size: 12px; color: #6b7280;">
                सत्यापन के लिए QR कोड स्कैन करें | Scan QR Code for Verification
              </p>
            </div>
          </div>
        </div>
      `;
    } else if (certificate.type === 'Income Certificate') {
      return `
        <div style="font-family: 'Noto Sans Devanagari', Arial, sans-serif; padding: 40px; background: white; width: 794px; min-height: 1123px;">
          <!-- Header -->
          <div style="text-align: center; border-bottom: 3px solid #8B5CF6; padding-bottom: 20px; margin-bottom: 30px;">
            <div style="display: flex; align-items: center; justify-content: center; gap: 20px; margin-bottom: 15px;">
              <div style="width: 60px; height: 60px; background: #1e40af; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 30px; color: white;">🏛️</div>
              <div>
                <h1 style="margin: 0; color: #1e40af; font-size: 24px; font-weight: bold;">भारत सरकार</h1>
                <h2 style="margin: 5px 0; color: #1e40af; font-size: 20px;">Government of India</h2>
                <h3 style="margin: 0; color: #6b7280; font-size: 16px;">महाराष्ट्र राज्य | State of Maharashtra</h3>
              </div>
            </div>
            <h2 style="margin: 15px 0 5px 0; color: #1e40af; font-size: 28px; font-weight: bold;">आय प्रमाणपत्र</h2>
            <h3 style="margin: 0; color: #374151; font-size: 22px;">INCOME CERTIFICATE</h3>
          </div>

          <!-- Certificate Content -->
          <div style="line-height: 1.8; font-size: 16px; color: #374151;">
            <p style="text-align: center; font-size: 18px; font-weight: bold; color: #1e40af; margin-bottom: 25px;">
              प्रमाणपत्र संख्या: ${certificate.certificateNumber}
            </p>
            
            <p style="margin-bottom: 20px; text-align: justify;">
              यह प्रमाणित किया जाता है कि <strong>${certificate.applicantName}</strong> पुत्र 
              <strong>${certificate.details.fatherName}</strong> निवासी <strong>${certificate.details.address}</strong> 
              की वार्षिक आय <strong>${certificate.details.annualIncome}</strong> है। इनकी आय का मुख्य स्रोत 
              <strong>${certificate.details.incomeSource}</strong> है।
            </p>
            
            <p style="margin-bottom: 20px; text-align: justify;">
              This is to certify that <strong>${certificate.applicantNameEnglish}</strong> son of 
              <strong>${certificate.details.fatherName}</strong> resident of <strong>${certificate.details.address}</strong> 
              has an annual income of <strong>${certificate.details.annualIncome}</strong>. The main source of income is 
              <strong>${certificate.details.incomeSource}</strong>.
            </p>

            <div style="margin: 30px 0;">
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 8px; border: 1px solid #d1d5db; background: #f9fafb; font-weight: bold;">व्यवसाय / Occupation</td>
                  <td style="padding: 8px; border: 1px solid #d1d5db;">${certificate.details.occupation}</td>
                </tr>
                <tr>
                  <td style="padding: 8px; border: 1px solid #d1d5db; background: #f9fafb; font-weight: bold;">आय स्रोत / Income Source</td>
                  <td style="padding: 8px; border: 1px solid #d1d5db;">${certificate.details.incomeSource}</td>
                </tr>
                <tr>
                  <td style="padding: 8px; border: 1px solid #d1d5db; background: #f9fafb; font-weight: bold;">जिला / District</td>
                  <td style="padding: 8px; border: 1px solid #d1d5db;">${certificate.details.district}</td>
                </tr>
                <tr>
                  <td style="padding: 8px; border: 1px solid #d1d5db; background: #f9fafb; font-weight: bold;">राज्य / State</td>
                  <td style="padding: 8px; border: 1px solid #d1d5db;">${certificate.details.state}</td>
                </tr>
              </table>
            </div>
            
            <p style="margin-top: 25px; text-align: justify; font-style: italic; color: #6b7280;">
              यह प्रमाणपत्र केवल ${certificate.validUpto} तक वैध है। This certificate is valid only till ${certificate.validUpto}.
            </p>
          </div>

          <!-- Footer -->
          <div style="margin-top: 50px;">
            <div style="display: flex; justify-content: space-between; align-items: end;">
              <div>
                <p style="margin: 0; font-size: 14px; color: #6b7280;">जारी करने की तारीख: ${certificate.issueDate}</p>
                <p style="margin: 0; font-size: 14px; color: #6b7280;">वैध तक: ${certificate.validUpto}</p>
                <p style="margin: 10px 0 0 0; font-size: 14px; color: #6b7280;">
                  यह प्रमाणपत्र डिजिटल रूप से सत्यापित है | This certificate is digitally verified
                </p>
              </div>
              <div style="text-align: center;">
                <div style="border-top: 2px solid #374151; width: 200px; margin-bottom: 5px;"></div>
                <p style="margin: 0; font-weight: bold;">${certificate.details.registrarName}</p>
                <p style="margin: 0; font-size: 14px;">पंजीयक / Registrar</p>
                <p style="margin: 0; font-size: 14px;">${certificate.issuedBy}</p>
              </div>
            </div>
            
            <!-- QR Code Placeholder -->
            <div style="text-align: center; margin-top: 30px; padding: 20px; border: 2px dashed #d1d5db;">
              <div style="width: 80px; height: 80px; background: #f3f4f6; margin: 0 auto; display: flex; align-items: center; justify-content: center; font-size: 12px; color: #6b7280;">
                QR Code<br/>for<br/>Verification
              </div>
              <p style="margin: 10px 0 0 0; font-size: 12px; color: #6b7280;">
                सत्यापन के लिए QR कोड स्कैन करें | Scan QR Code for Verification
              </p>
            </div>
          </div>
        </div>
      `;
    }
    
    // Default template for other certificate types
    return `
      <div style="font-family: 'Noto Sans Devanagari', Arial, sans-serif; padding: 40px; background: white; width: 794px; min-height: 1123px;">
        <!-- Header -->
        <div style="text-align: center; border-bottom: 3px solid #EF4444; padding-bottom: 20px; margin-bottom: 30px;">
          <div style="display: flex; align-items: center; justify-content: center; gap: 20px; margin-bottom: 15px;">
            <div style="width: 60px; height: 60px; background: #1e40af; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 30px; color: white;">🏛️</div>
            <div>
              <h1 style="margin: 0; color: #1e40af; font-size: 24px; font-weight: bold;">भारत सरकार</h1>
              <h2 style="margin: 5px 0; color: #1e40af; font-size: 20px;">Government of India</h2>
              <h3 style="margin: 0; color: #6b7280; font-size: 16px;">महाराष्ट्र राज्य | State of Maharashtra</h3>
            </div>
          </div>
          <h2 style="margin: 15px 0 5px 0; color: #1e40af; font-size: 28px; font-weight: bold;">${certificate.typeHindi}</h2>
          <h3 style="margin: 0; color: #374151; font-size: 22px;">${certificate.type.toUpperCase()}</h3>
        </div>

        <!-- Certificate Content -->
        <div style="line-height: 1.8; font-size: 16px; color: #374151;">
          <p style="text-align: center; font-size: 18px; font-weight: bold; color: #1e40af; margin-bottom: 25px;">
            प्रमाणपत्र संख्या: ${certificate.certificateNumber}
          </p>
          
          <p style="margin-bottom: 20px; text-align: justify;">
            यह प्रमाणित किया जाता है कि <strong>${certificate.applicantName}</strong> के संबंध में यह ${certificate.typeHindi} 
            सत्यापित जानकारी के आधार पर जारी किया गया है।
          </p>
          
          <p style="margin-bottom: 20px; text-align: justify;">
            This is to certify that this ${certificate.type} for <strong>${certificate.applicantNameEnglish}</strong> 
            has been issued based on verified information.
          </p>
        </div>

        <!-- Footer -->
        <div style="margin-top: 50px;">
          <div style="display: flex; justify-content: space-between; align-items: end;">
            <div>
              <p style="margin: 0; font-size: 14px; color: #6b7280;">जारी करने की तारीख: ${certificate.issueDate}</p>
              <p style="margin: 0; font-size: 14px; color: #6b7280;">वैध तक: ${certificate.validUpto}</p>
              <p style="margin: 10px 0 0 0; font-size: 14px; color: #6b7280;">
                यह प्रमाणपत्र डिजिटल रूप से सत्यापित है | This certificate is digitally verified
              </p>
            </div>
            <div style="text-align: center;">
              <div style="border-top: 2px solid #374151; width: 200px; margin-bottom: 5px;"></div>
              <p style="margin: 0; font-weight: bold;">${certificate.details?.registrarName || 'श्री संदीप पाटिल'}</p>
              <p style="margin: 0; font-size: 14px;">पंजीयक / Registrar</p>
              <p style="margin: 0; font-size: 14px;">${certificate.issuedBy}</p>
            </div>
          </div>
          
          <!-- QR Code Placeholder -->
          <div style="text-align: center; margin-top: 30px; padding: 20px; border: 2px dashed #d1d5db;">
            <div style="width: 80px; height: 80px; background: #f3f4f6; margin: 0 auto; display: flex; align-items: center; justify-content: center; font-size: 12px; color: #6b7280;">
              QR Code<br/>for<br/>Verification
            </div>
            <p style="margin: 10px 0 0 0; font-size: 12px; color: #6b7280;">
              सत्यापन के लिए QR कोड स्कैन करें | Scan QR Code for Verification
            </p>
          </div>
        </div>
      </div>
    `;
  };

  const handleShare = (certificate) => {
    if (navigator.share) {
      navigator.share({
        title: `${certificate.type} - ${certificate.applicantName}`,
        text: `Certificate Number: ${certificate.certificateNumber}`,
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(`Certificate: ${certificate.certificateNumber}\nIssued to: ${certificate.applicantName}`);
      alert('प्रमाणपत्र की जानकारी क्लिपबोर्ड में कॉपी हो गई है।');
    }
  };

  const handleVerify = (certificate) => {
    alert(`प्रमाणपत्र संख्या ${certificate.certificateNumber} सत्यापित है ✅\n\nजारी करने की तारीख: ${certificate.issueDate}\nजारीकर्ता: ${certificate.issuedBy}\nस्थिति: वैध`);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-8 border border-gray-100">
        <Link href="/" className="text-blue-600 hover:text-blue-700 flex items-center mb-4">
          ← वापस होम पर जाएं
        </Link>
        <h1 className="text-3xl font-bold text-black mb-2">प्रमाणपत्र डाउनलोड</h1>
        <p className="text-black">Download Your Certificates | अपने प्रमाणपत्र डाउनलोड करें</p>
      </div>

      {/* Sample Certificates Info */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
        <h2 className="text-lg font-bold text-blue-800 mb-3">🎯 डेमो के लिए उपलब्ध प्रमाणपत्र | Available Sample Certificates</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded border shadow-sm">
            <p className="font-medium text-black">जन्म प्रमाणपत्र | Birth Certificate</p>
            <p className="text-blue-600 font-bold">BC123456</p>
            <p className="text-sm text-black">राम कुमार शर्मा</p>
          </div>
          <div className="bg-white p-4 rounded border shadow-sm">
            <p className="font-medium text-black">निवास प्रमाणपत्र | Residence Certificate</p>
            <p className="text-green-600 font-bold">RC789012</p>
            <p className="text-sm text-black">सुनीता देवी पाटिल</p>
          </div>
          <div className="bg-white p-4 rounded border shadow-sm">
            <p className="font-medium text-black">आय प्रमाणपत्र | Income Certificate</p>
            <p className="text-purple-600 font-bold">IC456789</p>
            <p className="text-sm text-black">अजय कुमार वर्मा</p>
          </div>
          <div className="bg-white p-4 rounded border shadow-sm">
            <p className="font-medium text-black">विवाह प्रमाणपत्र | Marriage Certificate</p>
            <p className="text-pink-600 font-bold">MC567890</p>
            <p className="text-sm text-black">राहुल शर्मा एवं प्रिया पाटिल</p>
          </div>
          <div className="bg-white p-4 rounded border shadow-sm">
            <p className="font-medium text-black">जाति प्रमाणपत्र | Caste Certificate</p>
            <p className="text-orange-600 font-bold">CC234567</p>
            <p className="text-sm text-black">विकास रामचंद्र जाधव</p>
          </div>
        </div>
      </div>

      {/* Search Form */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-8 border border-gray-100">
        <h2 className="text-xl font-bold text-black mb-6">प्रमाणपत्र खोजें | Search Certificate</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-black mb-2">
              खोज का प्रकार | Search Type
            </label>
            <select
              value={searchCriteria}
              onChange={(e) => setSearchCriteria(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="application">आवेदन संख्या | Application Number</option>
              <option value="certificate">प्रमाणपत्र संख्या | Certificate Number</option>
              <option value="mobile">मोबाइल नंबर | Mobile Number</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-black mb-2">
              {searchCriteria === 'application' && 'आवेदन संख्या | Application Number'}
              {searchCriteria === 'certificate' && 'प्रमाणपत्र संख्या | Certificate Number'}
              {searchCriteria === 'mobile' && 'मोबाइल नंबर | Mobile Number'}
            </label>
            <input
              type="text"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              placeholder={searchCriteria === 'application' ? 'BC123456' : searchCriteria === 'certificate' ? 'GP/BC/2024/001234' : '+91-XXXXXXXXXX'}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          
          <div className="flex items-end">
            <button
              onClick={handleSearch}
              className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              🔍 खोजें | Search
            </button>
          </div>
        </div>
        
        <div className="text-sm text-black bg-gray-50 p-3 rounded">
          <strong>उदाहरण:</strong> BC123456, RC789012, IC456789, MC567890, CC234567
        </div>
      </div>

      {/* Search Results */}
      {searchResult && (
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
          <h3 className="text-xl font-bold text-black mb-6">📄 प्रमाणपत्र विवरण | Certificate Details</h3>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Certificate Info */}
            <div>
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                <div className="flex items-center space-x-2 mb-3">
                  <span className="text-2xl">✅</span>
                  <span className="text-green-800 font-bold">प्रमाणपत्र उपलब्ध है | Certificate Available</span>
                </div>
                <h4 className="text-lg font-bold text-black mb-2">{searchResult.typeHindi}</h4>
                <p className="text-black font-medium">{searchResult.type}</p>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-black font-medium">आवेदक का नाम:</span>
                  <span className="text-black">{searchResult.applicantName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-black font-medium">आवेदन संख्या:</span>
                  <span className="text-blue-600 font-mono">{searchResult.applicationNumber}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-black font-medium">प्रमाणपत्र संख्या:</span>
                  <span className="text-green-600 font-mono">{searchResult.certificateNumber}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-black font-medium">जारी करने की तारीख:</span>
                  <span className="text-black">{searchResult.issueDate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-black font-medium">जारीकर्ता:</span>
                  <span className="text-black">{searchResult.issuedBy}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-black font-medium">वैधता:</span>
                  <span className="text-black">{searchResult.validUpto}</span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div>
              <h4 className="text-lg font-bold text-black mb-4">🎯 कार्य | Actions</h4>
              
              <div className="space-y-4">
                                 <button
                   onClick={() => generateCertificatePDF(searchResult)}
                   disabled={isGenerating || !isClient}
                   className="w-full bg-green-600 text-white px-6 py-4 rounded-lg hover:bg-green-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                 >
                   {!isClient ? (
                     <>
                       <span>⏳</span>
                       <span>लोड हो रहा है...</span>
                     </>
                   ) : isGenerating ? (
                     <>
                       <span className="animate-spin">⏳</span>
                       <span>PDF जेनरेट हो रहा है...</span>
                     </>
                   ) : (
                     <>
                       <span>📥</span>
                       <span>PDF डाउनलोड करें | Download PDF</span>
                     </>
                   )}
                 </button>

                <button
                  onClick={() => handleVerify(searchResult)}
                  className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center justify-center space-x-2"
                >
                  <span>🔍</span>
                  <span>सत्यापित करें | Verify</span>
                </button>

                <button
                  onClick={() => handleShare(searchResult)}
                  className="w-full bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors font-medium flex items-center justify-center space-x-2"
                >
                  <span>📤</span>
                  <span>साझा करें | Share</span>
                </button>

                <button
                  onClick={() => window.print()}
                  className="w-full bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition-colors font-medium flex items-center justify-center space-x-2"
                >
                  <span>🖨️</span>
                  <span>प्रिंट करें | Print</span>
                </button>
              </div>

              {/* Certificate Preview */}
              <div className="mt-6 p-4 border-2 border-dashed border-gray-300 rounded-lg text-center">
                <div className="text-4xl mb-2">📄</div>
                <p className="text-sm text-black font-medium">Certificate Preview</p>
                <p className="text-xs text-black">प्रमाणपत्र पूर्वावलोकन</p>
              </div>
            </div>
          </div>

          {/* Security Features */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <h4 className="text-lg font-bold text-black mb-4">🔒 सुरक्षा विशेषताएं | Security Features</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center space-x-2 text-sm">
                <span className="text-green-600">✅</span>
                <span className="text-black">डिजिटल हस्ताक्षर | Digital Signature</span>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <span className="text-green-600">✅</span>
                <span className="text-black">QR कोड सत्यापन | QR Code Verification</span>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <span className="text-green-600">✅</span>
                <span className="text-black">सरकारी मुहर | Government Seal</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Help Section */}
      <div className="mt-8 bg-gray-50 rounded-lg p-6 border border-gray-200">
        <h3 className="text-lg font-bold text-black mb-4">❓ सहायता | Help</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-medium text-black mb-2">प्रमाणपत्र नहीं मिल रहा?</h4>
            <ul className="text-sm text-black space-y-1">
              <li>• सही आवेदन संख्या डालें</li>
              <li>• 24-48 घंटे बाद पुनः प्रयास करें</li>
              <li>• हेल्पलाइन: 1800-XXX-XXXX</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium text-black mb-2">तकनीकी सहायता</h4>
            <ul className="text-sm text-black space-y-1">
              <li>• PDF डाउनलोड न हो तो popup blocker disable करें</li>
              <li>• Chrome/Firefox browser उपयोग करें</li>
              <li>• Email: help@grampanchayat.gov.in</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}