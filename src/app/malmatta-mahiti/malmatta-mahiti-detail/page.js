'use client';

import { useState, useEffect } from 'react';

// --- Hardcoded Dropdown Options and Initial States ---
const VILLAGE_OPTIONS = ['शिरगाव', 'कोळगाव', 'पांडेगाव'];
const FINANCIAL_YEAR_OPTIONS = ['2023 - 2027', '2022 - 2026', '2021 - 2025'];
const STREET_OPTIONS = ['घर नंबर चेचडी वस्ती पर्यंत', 'मुख्य रस्ता', 'छत्रपती शिवाजी मार्ग', 'डॉ. आंबेडकर पथ'];
const PROPERTY_TYPES = [
  'अर्ध पक्के घरासाठी भिटीचे मातीचे घर', 'आर सी सी पद्धतीचे बांधकाम',
  'नवीन पक्के दगड विटांचे मातीचे घर', 'पक्की खुली जागा', 'नळ कनेक्शन',
  'नवीन नळ कनेक्शन', 'मोकळी जागा', 'पक्की खुली जागा (मालकी हक्क नसलेले)'
];
const FLOOR_OPTIONS = ['Ground Floor', 'पहिला मजला', 'दुसरा मजला', 'तिसरा मजला'];
const TAX_RATE_TYPES = [
    '१-मालमत्ता किंमत खाली', '२-वार्षिक भाड्याचे उत्पन्नावर कर पात्र',
    '३-वार्षिक भाड्याचे कर पात्र', '४-औद्योगिक प्रयोजन कर पात्र',
    '५-औद्योगिक प्रयोजन कर सवलत', '६-शैक्षणिक संस्था कर पात्र',
    '७-धार्मिक संस्था कर पात्र', '८-भाड्याने घेतलेल्या किंवा दिलेल्या भाड्याच्या जागेसाठी सेवाशुल्क (किंवा त्याचा भाग)',
    '९-USTCO नियंत्रण क्षेत्रात मालमत्ता असणाऱ्यांसाठी', '१०-भाड्याने घेतलेल्या जमिनीवरील औद्योगिक, हॉटेल, पर्यटन किंवा निवासी इमारती',
    '९९-संरक्षण क्षेत्रात काम करणाऱ्यांसाठी'
];
const DEPENDENT_TAX_OPTIONS = {
    'default': ['तळमजला दर प्रती चौ.मी.', 'पहिला मजला दर प्रती चौ.मी.'],
    '१-मालमत्ता किंमत खाली': ['किंमतीवर आधारित कर'],
    '२-वार्षिक भाड्याचे उत्पन्नावर कर पात्र': ['भाड्याच्या उत्पन्नावर आधारित कर'],
};
const AUTHORIZATION_OPTIONS = ['अधिकृत', 'अनधिकृत'];
const UNIT_OPTIONS = ['sqft', 'sqm'];
const TOILET_OPTIONS = ['आहे', 'नाही'];

const initialMainData = {
    serialNo: '', period: '2023 - 2027', village: 'शिरगाव', financialYear: '2023 - 2027',
    propertyNoFull: '', wardNo: '', prabhagNo: '', propertyNo: '',
    street: 'घर नंबर चेचडी वस्ती पर्यंत', holderName: '', aadharNo: '',
    mobileNo: '', holderNameEnglish: '', atticInfo: '', waterSupplyType: 'निरंक',
    tapCount: '0', flatNo: '', meterSurveyNo: '', gatNo: '', toilet: 'आहे',
    notes: '',
    planTax: true, diwaliTax: false, diwanAgam: false, inDefenseArea: false, isMIDC: false, specialProperty: false
};

const initialDescription = {
    id: null, propertyType: 'अर्ध पक्के घरासाठी भिटीचे मातीचे घर', floor: 'Ground Floor', otherInfo: '',
    unit: 'sqft', length: '', width: '', area: '', usage: 'रहिवासी', authorization: 'अधिकृत',
    constructionYear: '', landConstructionRate: '2023 - 2024', previousTaxSurcharge: '0',
    landRate: '', rebate: '', oldValue: '0', propertyTaxRateType: '',
    dependentTaxType: 'तळमजला दर प्रती चौ.मी.'
};

// Reusable component for consistent form fields
const FormField = ({ id, label, children }) => (
    <div>
        <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
        {children}
    </div>
);

// Reusable component for checkboxes
const CheckboxField = ({ name, checked, onChange, label }) => (
    <div className="flex items-center">
        <input id={name} name={name} type="checkbox" checked={checked} onChange={onChange} className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500" />
        <label htmlFor={name} className="ml-2 block text-sm text-gray-900">{label}</label>
    </div>
);


export default function ModernMalmattaForm() {
    const [mainData, setMainData] = useState(initialMainData);
    const [currentDescription, setCurrentDescription] = useState(initialDescription);
    const [descriptions, setDescriptions] = useState([]);
    const [editingId, setEditingId] = useState(null);
    const [dependentOptions, setDependentOptions] = useState(DEPENDENT_TAX_OPTIONS.default);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errors, setErrors] = useState({});
    const [isSerialLoading, setIsSerialLoading] = useState(true);

    // Function to fetch the next serial number from the API
    const fetchNextSerial = async () => {
        try {
            setIsSerialLoading(true);
            const response = await fetch('/api/get-next-serial');
            if (!response.ok) {
                throw new Error('Could not fetch serial number');
            }
            const data = await response.json();
            // Update the serialNo in the mainData state
            setMainData(prev => ({ ...prev, serialNo: data.nextSerialNumber.toString() }));
        } catch (error) {
            console.error("Failed to fetch serial number:", error);
            setMainData(prev => ({ ...prev, serialNo: 'Error' }));
        } finally {
            setIsSerialLoading(false);
        }
    };

    // Fetch the serial number when the component first loads
    useEffect(() => {
        fetchNextSerial();
    }, []); // Empty dependency array ensures this runs only once on mount

    // Calculate area automatically
    useEffect(() => {
        const { length, width } = currentDescription;
        if (length && width && !isNaN(length) && !isNaN(width)) {
            setCurrentDescription(prev => ({ ...prev, area: (parseFloat(length) * parseFloat(width)).toFixed(2) }));
        } else {
            setCurrentDescription(prev => ({ ...prev, area: '' }));
        }
    }, [currentDescription.length, currentDescription.width]);

    // Update dependent tax options based on the main tax type
    useEffect(() => {
        const options = DEPENDENT_TAX_OPTIONS[currentDescription.propertyTaxRateType] || DEPENDENT_TAX_OPTIONS.default;
        setDependentOptions(options);
        setCurrentDescription(prev => ({...prev, dependentTaxType: options[0] || ''}));
    }, [currentDescription.propertyTaxRateType]);

    const validateField = (name, value) => {
        const tempErrors = { ...errors };
        switch (name) {
            case 'holderName':
                if (!value.trim()) tempErrors.holderName = 'धारकाचे नाव आवश्यक आहे.';
                else delete tempErrors.holderName;
                break;
            case 'mobileNo':
                if (value && !/^\d{10}$/.test(value)) tempErrors.mobileNo = 'मोबाईल नंबर १० अंकी असावा.';
                else delete tempErrors.mobileNo;
                break;
            case 'aadharNo':
                if (value && !/^\d{12}$/.test(value)) tempErrors.aadharNo = 'आधार क्रमांक १२ अंकी असावा.';
                else delete tempErrors.aadharNo;
                break;
            default:
                break;
        }
        setErrors(tempErrors);
    };

    const handleMainChange = (e) => {
        const { name, value, type, checked } = e.target;
        if ((name === "mobileNo" || name === "aadharNo") && value && !/^\d*$/.test(value)) return;
        const updatedValue = type === 'checkbox' ? checked : value;
        setMainData(prev => ({ ...prev, [name]: updatedValue }));
        validateField(name, updatedValue);
    };

    const handleDescriptionChange = (e) => {
        const { name, value } = e.target;
        setCurrentDescription(prev => ({ ...prev, [name]: value }));
    };

    const handleSaveDescription = () => {
        if (!currentDescription.area || !currentDescription.usage) {
            alert('कृपया क्षेत्रफळ आणि वापर ही माहिती भरा.'); return;
        }
        if (editingId !== null) {
            setDescriptions(descriptions.map(d => d.id === editingId ? { ...currentDescription, id: editingId } : d));
        } else {
            setDescriptions([...descriptions, { ...currentDescription, id: Date.now() }]);
        }
        handleNewDescription();
    };

    const handleNewDescription = () => {
        setEditingId(null);
        setCurrentDescription(initialDescription);
    };

    const handleEditDescription = (id) => {
        const descToEdit = descriptions.find(d => d.id === id);
        if (descToEdit) {
            const descriptionSection = document.getElementById('description-section');
            if(descriptionSection) descriptionSection.scrollIntoView({ behavior: 'smooth' });
            setEditingId(id);
            setCurrentDescription(descToEdit);
        }
    };

    const handleDeleteDescription = (id) => {
        if (confirm('तुम्ही ही नोंदणी काढून टाकू इच्छिता?')) {
            setDescriptions(descriptions.filter(d => d.id !== id));
            if(id === editingId) handleNewDescription();
        }
    };
    
    // Function to completely reset the form state after successful submission
    const resetForm = () => {
        setMainData(initialMainData);
        setDescriptions([]);
        setErrors({});
        handleNewDescription();
        // Fetch the next serial number for the new form
        fetchNextSerial();
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formErrors = { ...errors };
        if (!mainData.holderName.trim()) formErrors.holderName = 'धारकाचे नाव आवश्यक आहे.';
        if (mainData.mobileNo && !/^\d{10}$/.test(mainData.mobileNo)) formErrors.mobileNo = 'मोबाईल नंबर १० अंकी असावा.';
        if (mainData.aadharNo && !/^\d{12}$/.test(mainData.aadharNo)) formErrors.aadharNo = 'आधार क्रमांक १२ अंकी असावा.';
        
        Object.keys(formErrors).forEach(key => !formErrors[key] && delete formErrors[key]);

        if (Object.keys(formErrors).length > 0) {
            setErrors(formErrors);
            alert('कृपया अर्ज सबमिट करण्यापूर्वी फॉर्ममधील त्रुटी तपासा आणि दुरुस्त करा.');
            return;
        }
        if (descriptions.length === 0) {
            alert('कृपया अर्ज जतन करण्यापूर्वी किमान एक मालमत्ता वर्णन जोडा.');
            return;
        }
        setIsSubmitting(true);
        try {
            const response = await fetch('/api/save-property', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ mainData, descriptions })
            });
            const result = await response.json();
            if (!response.ok) throw new Error(result.message || 'Server error');
            alert(`अर्ज यशस्वीरित्या जतन झाला! तुमचा अर्ज क्रमांक आहे: ${result.applicationId}`);
            resetForm(); // Reset the form completely
        } catch (error) {
            alert(`अर्ज जतन करताना त्रुटी आली: ${error.message}`);
        } finally {
            setIsSubmitting(false);
        }
    };

    const inputClass = "w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-sm";
    const errorInputClass = "border-red-500";
    const readOnlyClass = "bg-gray-100 cursor-not-allowed";

    return (
        <div className="bg-gray-50 min-h-screen">
            <div className="container mx-auto px-4 py-6">
                <header className="mb-6">
                    <h1 className="text-2xl font-bold text-gray-900">मालमत्ता माहिती व कर आकारणी</h1>
                    <p className="text-gray-600 mt-1 text-sm">नवीन मालमत्ता नोंदणी करण्यासाठी खालील माहिती भरा.</p>
                </header>

                <form onSubmit={handleSubmit} className="space-y-6">

                    {/* Section 1: Holder's Details */}
                    <div className="bg-white p-4 rounded-lg shadow-md border border-gray-200">
                        <h2 className="text-lg font-semibold text-gray-800 mb-4">१. मालमत्ता धारकाची माहिती</h2>
                        <div className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                                <FormField id="serialNo" label="सिरियल नंबर">
                                    <input 
                                        type="text" 
                                        name="serialNo" 
                                        value={isSerialLoading ? 'Loading...' : mainData.serialNo} 
                                        className={`${inputClass} ${readOnlyClass}`} 
                                        readOnly 
                                    />
                                </FormField>
                                <FormField id="period" label="कालावधी"><input type="text" name="period" value={mainData.period} onChange={handleMainChange} className={inputClass} /></FormField>
                                <FormField id="village" label="गाव"><select name="village" value={mainData.village} onChange={handleMainChange} className={inputClass}>{VILLAGE_OPTIONS.map(opt => <option key={opt}>{opt}</option>)}</select></FormField>
                                <FormField id="financialYear" label="आर्थिक वर्ष"><select name="financialYear" value={mainData.financialYear} onChange={handleMainChange} className={inputClass}>{FINANCIAL_YEAR_OPTIONS.map(opt => <option key={opt}>{opt}</option>)}</select></FormField>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                                <FormField id="propertyNoFull" label="मालमत्ता क्र. (नमुना ८)"><input type="text" name="propertyNoFull" value={mainData.propertyNoFull} onChange={handleMainChange} className={inputClass} /></FormField>
                                <FormField id="wardNo" label="Ward प्रभाग क्र."><input type="text" name="wardNo" value={mainData.wardNo} onChange={handleMainChange} className={inputClass} /></FormField>
                                <FormField id="prabhagNo" label="प्रभाग क्र."><input type="text" name="prabhagNo" value={mainData.prabhagNo} onChange={handleMainChange} className={inputClass} /></FormField>
                                <FormField id="propertyNo" label="मालमत्ता क्रमांक"><input type="text" name="propertyNo" value={mainData.propertyNo} onChange={handleMainChange} className={inputClass} /></FormField>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <FormField id="street" label="रस्त्याचे नाव / गल्ली"><select name="street" value={mainData.street} onChange={handleMainChange} className={inputClass}>{STREET_OPTIONS.map(opt => <option key={opt}>{opt}</option>)}</select></FormField>
                                <FormField id="holderName" label="धारकाचे नाव (मराठी)">
                                    <input type="text" name="holderName" value={mainData.holderName} onChange={handleMainChange} className={`${inputClass} ${errors.holderName ? errorInputClass : ''}`} required />
                                    {errors.holderName && <p className="text-red-500 text-xs mt-1">{errors.holderName}</p>}
                                </FormField>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                                <FormField id="aadharNo" label="आधार क्रमांक">
                                    <input type="text" name="aadharNo" value={mainData.aadharNo} onChange={handleMainChange} className={`${inputClass} ${errors.aadharNo ? errorInputClass : ''}`} placeholder="12-digit number" maxLength="12" />
                                    {errors.aadharNo && <p className="text-red-500 text-xs mt-1">{errors.aadharNo}</p>}
                                </FormField>
                                <FormField id="mobileNo" label="मोबाईल नंबर">
                                    <input type="tel" name="mobileNo" value={mainData.mobileNo} onChange={handleMainChange} className={`${inputClass} ${errors.mobileNo ? errorInputClass : ''}`} placeholder="10-digit number" maxLength="10" />
                                    {errors.mobileNo && <p className="text-red-500 text-xs mt-1">{errors.mobileNo}</p>}
                                </FormField>
                                <FormField id="holderNameEnglish" label="धारकाचे नाव (English)"><input type="text" name="holderNameEnglish" value={mainData.holderNameEnglish} onChange={handleMainChange} className={inputClass} /></FormField>
                                <FormField id="atticInfo" label="माळ्याची माहिती"><input type="text" name="atticInfo" value={mainData.atticInfo} onChange={handleMainChange} className={inputClass} /></FormField>
                            </div>
                        </div>
                    </div>

                    {/* Section 2: Water Supply Info */}
                    <div className="bg-white p-4 rounded-lg shadow-md border border-gray-200">
                        <h2 className="text-lg font-semibold text-gray-800 mb-4">२. पाणीपुरवठा विषयक माहिती</h2>
                         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                            <FormField id="waterSupplyType" label="पाणीपुरवठा प्रकार"><input type="text" name="waterSupplyType" value={mainData.waterSupplyType} onChange={handleMainChange} className={inputClass} /></FormField>
                            <FormField id="tapCount" label="नळ संख्या"><input type="number" name="tapCount" value={mainData.tapCount} onChange={handleMainChange} className={inputClass} /></FormField>
                            <FormField id="flatNo" label="फ्लॅट क्रमांक"><input type="text" name="flatNo" value={mainData.flatNo} onChange={handleMainChange} className={inputClass} /></FormField>
                            <FormField id="meterSurveyNo" label="मीटर सर्व्हे नंबर"><input type="text" name="meterSurveyNo" value={mainData.meterSurveyNo} onChange={handleMainChange} className={inputClass} /></FormField>
                            <FormField id="gatNo" label="गट नंबर"><input type="text" name="gatNo" value={mainData.gatNo} onChange={handleMainChange} className={inputClass} /></FormField>
                            <FormField id="toilet" label="शौचालय"><select name="toilet" value={mainData.toilet} onChange={handleMainChange} className={inputClass}>{TOILET_OPTIONS.map(opt => <option key={opt}>{opt}</option>)}</select></FormField>
                        </div>
                    </div>

                    {/* Section 3: Other Info */}
                    <div className="bg-white p-4 rounded-lg shadow-md border border-gray-200">
                         <h2 className="text-lg font-semibold text-gray-800 mb-4">३. इतर माहिती</h2>
                         <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                            <FormField id="notes" label="शेरा (Notes)">
                                <textarea name="notes" value={mainData.notes} onChange={handleMainChange} className={inputClass} rows="5"></textarea>
                            </FormField>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">इतर कर:</label>
                                <div className="space-y-2 p-2 border rounded-md">
                                    <CheckboxField name="planTax" label="प्लॅन टॅक्स" checked={mainData.planTax} onChange={handleMainChange} />
                                    <CheckboxField name="diwaliTax" label="दिवाळी कर" checked={mainData.diwaliTax} onChange={handleMainChange} />
                                    <CheckboxField name="diwanAgam" label="दिवाण अगम" checked={mainData.diwanAgam} onChange={handleMainChange} />
                                    <CheckboxField name="inDefenseArea" label="In Defence Area" checked={mainData.inDefenseArea} onChange={handleMainChange} />
                                    <CheckboxField name="isMIDC" label="Is MIDC" checked={mainData.isMIDC} onChange={handleMainChange} />
                                    <CheckboxField name="specialProperty" label="विशेष मालमत्ता" checked={mainData.specialProperty} onChange={handleMainChange} />
                                </div>
                            </div>
                         </div>
                    </div>

                    {/* Section 4: Add Property Description */}
                    <div id="description-section" className="bg-white p-4 rounded-lg shadow-md border border-gray-200 scroll-mt-20">
                        <h2 className="text-lg font-semibold text-gray-800 mb-4">४. मालमत्तेचे वर्णन {editingId ? '(नोंदणी बदलत आहे)' : '(नवीन नोंदणी)'}</h2>
                        <div className="space-y-4">
                             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                                <FormField id="propertyType" label="मालमत्तेचा प्रकार"><select name="propertyType" value={currentDescription.propertyType} onChange={handleDescriptionChange} className={inputClass}>{PROPERTY_TYPES.map(opt => <option key={opt}>{opt}</option>)}</select></FormField>
                                <FormField id="floor" label="मजला"><select name="floor" value={currentDescription.floor} onChange={handleDescriptionChange} className={inputClass}>{FLOOR_OPTIONS.map(opt => <option key={opt}>{opt}</option>)}</select></FormField>
                                <FormField id="otherInfo" label="इतर माहिती"><input type="text" name="otherInfo" value={currentDescription.otherInfo} onChange={handleDescriptionChange} className={inputClass} /></FormField>
                                <FormField id="unit" label="Unit"><select name="unit" value={currentDescription.unit} onChange={handleDescriptionChange} className={inputClass}>{UNIT_OPTIONS.map(opt => <option key={opt}>{opt}</option>)}</select></FormField>
                             </div>
                             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
                                <FormField id="length" label="लांबी (फूट)"><input type="number" step="0.01" name="length" value={currentDescription.length} onChange={handleDescriptionChange} className={inputClass} placeholder="e.g., 30" /></FormField>
                                <FormField id="width" label="रुंदी (फूट)"><input type="number" step="0.01" name="width" value={currentDescription.width} onChange={handleDescriptionChange} className={inputClass} placeholder="e.g., 48" /></FormField>
                                <FormField id="area" label="एकूण क्षेत्रफळ (चौ.फू.)"><input type="text" name="area" value={currentDescription.area} className={`${inputClass} ${readOnlyClass}`} readOnly /></FormField>
                                <FormField id="usage" label="वापर"><input type="text" name="usage" value={currentDescription.usage} onChange={handleDescriptionChange} className={inputClass} placeholder="e.g., रहिवासी" /></FormField>
                            </div>
                             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                                <FormField id="authorization" label="बांधकाम प्रकार"><select name="authorization" value={currentDescription.authorization} onChange={handleDescriptionChange} className={inputClass}>{AUTHORIZATION_OPTIONS.map(opt => <option key={opt}>{opt}</option>)}</select></FormField>
                                <FormField id="constructionYear" label="बांधकाम वर्ष"><input type="number" name="constructionYear" value={currentDescription.constructionYear} onChange={handleDescriptionChange} className={inputClass} placeholder="e.g., 1995" /></FormField>
                                <FormField id="landConstructionRate" label="जमीन बांधकाम दर"><input type="text" name="landConstructionRate" value={currentDescription.landConstructionRate} onChange={handleDescriptionChange} className={inputClass} /></FormField>
                                <FormField id="previousTaxSurcharge" label="मागील कर वाढ"><input type="number" step="0.01" name="previousTaxSurcharge" value={currentDescription.previousTaxSurcharge} onChange={handleDescriptionChange} className={inputClass} /></FormField>
                            </div>
                             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                                <FormField id="landRate" label="जमीन दर"><input type="number" step="0.01" name="landRate" value={currentDescription.landRate} onChange={handleDescriptionChange} className={inputClass} /></FormField>
                                <FormField id="rebate" label="सूट"><input type="text" name="rebate" value={currentDescription.rebate} onChange={handleDescriptionChange} className={inputClass} /></FormField>
                                <FormField id="oldValue" label="जुनी किंमत"><input type="text" name="oldValue" value={currentDescription.oldValue} onChange={handleDescriptionChange} className={inputClass} /></FormField>
                            </div>
                             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <FormField id="propertyTaxRateType" label="मालमत्ता कर दर प्रकार">
                                     <select name="propertyTaxRateType" value={currentDescription.propertyTaxRateType} onChange={handleDescriptionChange} className={inputClass}>
                                        <option value="">-- निवडा --</option>{TAX_RATE_TYPES.map(opt => <option key={opt}>{opt}</option>)}
                                    </select>
                                </FormField>
                                <FormField id="dependentTaxType" label="प्रभाग उपविभाग (स्वयंचलित)">
                                    <select name="dependentTaxType" value={currentDescription.dependentTaxType} onChange={handleDescriptionChange} className={inputClass}>
                                        {dependentOptions.map(opt => <option key={opt}>{opt}</option>)}
                                    </select>
                                </FormField>
                             </div>
                        </div>
                         <div className="mt-4 pt-4 border-t flex items-center gap-4">
                            <button type="button" onClick={handleSaveDescription} className="px-6 py-2 bg-indigo-600 text-white font-semibold rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                {editingId ? 'वर्णन अपडेट करा' : 'वर्णन जोडा'}
                            </button>
                             <button type="button" onClick={handleNewDescription} className="px-6 py-2 bg-gray-200 text-gray-700 font-semibold rounded-md hover:bg-gray-300">
                                साफ करा
                            </button>
                        </div>
                    </div>

                    {/* Section 5: List of Added Descriptions */}
                    {descriptions.length > 0 && (
                        <div className="bg-white p-4 rounded-lg shadow-md border border-gray-200">
                            <h2 className="text-lg font-semibold text-gray-800 mb-4">५. जोडलेल्या मालमत्तेची यादी</h2>
                            <div className="overflow-x-auto border rounded-lg">
                                <table className="min-w-full text-sm">
                                    <thead className="bg-gray-100">
                                        <tr>
                                            {['प्रकार', 'मजला', 'क्षेत्रफळ', 'वापर', 'बांधकाम वर्ष', 'Actions'].map(h =>
                                                <th key={h} className="p-3 text-left font-semibold text-gray-600 tracking-wider">{h}</th>)}
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200">
                                        {descriptions.map((d, index) => (
                                            <tr key={d.id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}>
                                                <td className="p-3 text-gray-800">{d.propertyType}</td>
                                                <td className="p-3 text-gray-800">{d.floor}</td>
                                                <td className="p-3 text-gray-800">{d.area} {d.unit}</td>
                                                <td className="p-3 text-gray-800">{d.usage}</td>
                                                <td className="p-3 text-gray-800">{d.constructionYear}</td>
                                                <td className="p-3 space-x-4 whitespace-nowrap">
                                                    <button type="button" onClick={() => handleEditDescription(d.id)} className="font-medium text-indigo-600 hover:text-indigo-800">बदल</button>
                                                    <button type="button" onClick={() => handleDeleteDescription(d.id)} className="font-medium text-red-600 hover:text-red-800">काढा</button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}

                    {/* Final Submission Section */}
                    <div className="bg-white p-4 rounded-lg shadow-md border border-gray-200">
                        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                            <p className="text-gray-600 text-sm">कृपया सबमिट करण्यापूर्वी सर्व माहिती तपासा.</p>
                            <button type="submit" disabled={isSubmitting || isSerialLoading} className="w-full md:w-auto px-8 py-2.5 bg-green-600 text-white font-bold rounded-md shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 bg-gray-400">
                                {isSubmitting ? 'जतन करत आहे...' : 'संपूर्ण अर्ज जतन करा'}
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}