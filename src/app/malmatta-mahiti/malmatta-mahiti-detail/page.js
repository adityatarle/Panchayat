'use client';

import { useState, useEffect } from 'react';

// --- ALL CONSTANTS AND INITIAL STATE ARE UNCHANGED ---
const VILLAGE_OPTIONS = ['शिरगाव', 'कोळगाव', 'पांडेगाव'];
const FINANCIAL_YEAR_OPTIONS = ['--निवडा--', '2023 - 2027', '2022 - 2026', '2021 - 2025'];
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

const initialMainData = {
    serialNo: '', period: '2023 - 2027', village: 'शिरगाव', financialYear: '--निवडा--',
    propertyNoFull: '', wardNo: '', prabhagNo: '', propertyNo: '',
    street: 'घर नंबर चेचडी वस्ती पर्यंत', holderName: '', patniName: '', aadharNo: '',
    bhogvataDharakName: '', mobileNo: '', holderNameEnglish: '', waterSupplyType: 'निरंक',
    tapCount: '0', flatNo: '', notes: '',
    arogyaTax: false, diwabattiTax: true, divyangTax: false,
    inDefenseArea: false, isMIDC: false, isSpecialWater: false,
    isKamijastaPatrak: false,
};

const initialDescription = {
    id: null, propertyType: 'अर्ध पक्के घरासाठी भिटीचे मातीचे घर', floor: 'Ground Floor',
    unit: 'sqft', length: '', width: '', area: '', usage: '',
    constructionYear: '', rebate: '', propertyTaxRateType: '', dependentTaxType: '',
    otherInfo: '', authorization: 'अधिकृत', landConstructionRate: '',
    previousTaxSurcharge: '', landRate: '', oldValue: '',
};


// --- Reusable Components (Unchanged) ---
const FormField = ({ id, label, children, className = '' }) => (
    <div className={className}>
        <label htmlFor={id} className="block text-xs font-medium text-gray-600 mb-0.5">{label}</label>
        {children}
    </div>
);

const CheckboxField = ({ name, checked, onChange, label }) => (
    <div className="flex items-center">
        <input id={name} name={name} type="checkbox" checked={checked} onChange={onChange} className="h-4 w-4 text-indigo-600 border-gray-400 rounded focus:ring-indigo-500" />
        <label htmlFor={name} className="ml-2 block text-sm text-gray-800">{label}</label>
    </div>
);


export default function ModernMalmattaForm() {
    // --- ALL STATE AND LOGIC (useState, useEffect, handlers) ARE UNCHANGED ---
    const [mainData, setMainData] = useState(initialMainData);
    const [currentDescription, setCurrentDescription] = useState(initialDescription);
    const [descriptions, setDescriptions] = useState([]);
    const [editingId, setEditingId] = useState(null);
    const [isSerialLoading, setIsSerialLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errors, setErrors] = useState({});
    const [dependentOptions, setDependentOptions] = useState(DEPENDENT_TAX_OPTIONS.default);
    
    const isHolderInfoFilled = mainData.holderName.trim() !== '';

    const fetchNextSerial = async () => {
        try {setIsSerialLoading(true); const response = await fetch('/api/get-next-serial'); if (!response.ok) throw new Error('Could not fetch serial number'); const data = await response.json(); setMainData(prev => ({ ...prev, serialNo: data.nextSerialNumber.toString() })); } catch (error) { console.error("Failed to fetch serial number:", error); setMainData(prev => ({ ...prev, serialNo: 'Error' })); } finally { setIsSerialLoading(false); }
    };
    useEffect(() => { fetchNextSerial(); }, []);
    useEffect(() => { const { length, width } = currentDescription; if (length && width && !isNaN(length) && !isNaN(width)) { setCurrentDescription(prev => ({ ...prev, area: (parseFloat(length) * parseFloat(width)).toFixed(2) })); } else { setCurrentDescription(prev => ({ ...prev, area: '' })); } }, [currentDescription.length, currentDescription.width]);
    useEffect(() => { const options = DEPENDENT_TAX_OPTIONS[currentDescription.propertyTaxRateType] || DEPENDENT_TAX_OPTIONS.default; setDependentOptions(options); setCurrentDescription(prev => ({...prev, dependentTaxType: options[0] || ''})); }, [currentDescription.propertyTaxRateType]);
    const handleMainChange = (e) => { const { name, value, type, checked } = e.target; const updatedValue = type === 'checkbox' ? checked : value; setMainData(prev => ({ ...prev, [name]: updatedValue })); };
    const handleDescriptionChange = (e) => { const { name, value } = e.target; setCurrentDescription(prev => ({ ...prev, [name]: value })); };
    const handleSaveDescription = () => { if (!currentDescription.area || !currentDescription.usage) { alert('कृपया क्षेत्रफळ आणि वापर ही माहिती भरा.'); return; } if (editingId !== null) { setDescriptions(descriptions.map(d => d.id === editingId ? { ...currentDescription, id: editingId } : d)); } else { setDescriptions([...descriptions, { ...currentDescription, id: Date.now() }]); } handleNewDescription(); };
    const handleNewDescription = () => { setEditingId(null); setCurrentDescription(initialDescription); };
    const handleEditDescription = (id) => { const descToEdit = descriptions.find(d => d.id === id); if (descToEdit) { setEditingId(id); setCurrentDescription(descToEdit); } };
    const handleDeleteDescription = (id) => { if (confirm('तुम्ही ही नोंदणी काढून टाकू इच्छिता?')) { setDescriptions(descriptions.filter(d => d.id !== id)); if(id === editingId) handleNewDescription(); } };
    const resetForm = () => { setMainData(initialMainData); setDescriptions([]); setErrors({}); handleNewDescription(); fetchNextSerial(); }
    const handleSubmit = async (e) => { e.preventDefault(); if (!mainData.holderName.trim()) { alert('धारकाचे नाव आवश्यक आहे.'); return; } if (descriptions.length === 0) { alert('कृपया अर्ज जतन करण्यापूर्वी किमान एक मालमत्ता वर्णन जोडा.'); return; } setIsSubmitting(true); try { const response = await fetch('/api/save-property', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ mainData, descriptions }) }); const result = await response.json(); if (!response.ok) throw new Error(result.message || 'Server error'); alert(`अर्ज यशस्वीरित्या जतन झाला! तुमचा अर्ज क्रमांक आहे: ${result.applicationId}`); resetForm(); } catch (error) { alert(`अर्ज जतन करताना त्रुटी आली: ${error.message}`); } finally { setIsSubmitting(false); } };

    // Leverage the fonts from your RootLayout
    const inputClass = "w-full p-1 border border-gray-400 rounded-sm shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-sm font-devanagari";
    const readOnlyClass = "bg-gray-200 cursor-not-allowed";
    const compactButtonClass = "px-4 py-1 text-sm font-semibold border border-gray-400 rounded-sm shadow-sm font-devanagari";

    return (
        // THIS IS THE KEY CHANGE: A centered white container for the form content.
        <div className="container mx-auto px-4">
            <div className="bg-white p-4 sm:p-6 border border-gray-300 shadow-lg max-w-7xl mx-auto font-devanagari">
                <h1 className="text-xl font-bold text-center mb-4 text-govBlue-800">मालमत्ता माहिती</h1>
                
                <form onSubmit={handleSubmit} className="space-y-4">
                    <fieldset className="p-2 border border-gray-300">
                        <legend className="px-2 text-sm font-semibold">मालमत्ता धारकाची माहिती</legend>
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-4 gap-y-2">
                            <div className="lg:col-span-9 space-y-2">
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-2">
                                    <FormField id="serialNo" label="अ.क्र :"><input type="text" value={isSerialLoading ? '...' : mainData.serialNo} className={`${inputClass} ${readOnlyClass}`} readOnly /></FormField>
                                    <FormField id="period" label="कालावधी :"><input type="text" name="period" value={mainData.period} onChange={handleMainChange} className={inputClass} /></FormField>
                                    <FormField id="village" label="गावाचे नाव :"><select name="village" value={mainData.village} onChange={handleMainChange} className={inputClass}>{VILLAGE_OPTIONS.map(opt => <option key={opt}>{opt}</option>)}</select></FormField>
                                    <FormField id="financialYear" label="मालमत्ता नोंद आर्थिक वर्ष :"><select name="financialYear" value={mainData.financialYear} onChange={handleMainChange} className={inputClass}>{FINANCIAL_YEAR_OPTIONS.map(opt => <option key={opt}>{opt}</option>)}</select></FormField>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-2">
                                    <FormField id="propertyNoFull" label="मालमत्ता क्रमांक(जुना नमुना नं.८ नुसार) :"><input type="text" name="propertyNoFull" value={mainData.propertyNoFull} onChange={handleMainChange} className={inputClass} /></FormField>
                                    <FormField id="wardNo" label="2 Ward प्रभाग क्र. ?"><input type="text" name="wardNo" value={mainData.wardNo} onChange={handleMainChange} className={inputClass} /></FormField>
                                    <FormField id="prabhagNo" label="वॉर्ड नंबर :"><input type="text" name="prabhagNo" value={mainData.prabhagNo} onChange={handleMainChange} className={inputClass} /></FormField>
                                    <FormField id="propertyNo" label="प्रभाग क्र. ?"><input type="text" name="propertyNo" value={mainData.propertyNo} onChange={handleMainChange} className={inputClass} /></FormField>
                                </div>
                                <div className="grid grid-cols-1 lg:grid-cols-4 gap-x-4 gap-y-2">
                                    <FormField id="street" label="रस्त्याचे नाव / गल्लीचा क्रमांक :" className="lg:col-span-3"><select name="street" value={mainData.street} onChange={handleMainChange} className={inputClass}>{STREET_OPTIONS.map(opt => <option key={opt}>{opt}</option>)}</select></FormField>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2">
                                    <FormField id="holderName" label="१.मालमत्ता धारकाचे नाव :"><input type="text" name="holderName" value={mainData.holderName} onChange={handleMainChange} className={inputClass} required/></FormField>
                                    <FormField id="patniName" label="पत्नीचे नाव :"><input type="text" name="patniName" value={mainData.patniName} onChange={handleMainChange} className={inputClass} /></FormField>
                                    <FormField id="bhogvataDharakName" label="भोगवटा धारकाचे नाव :"><input type="text" name="bhogvataDharakName" value={mainData.bhogvataDharakName} onChange={handleMainChange} className={inputClass} /></FormField>
                                    <FormField id="aadharNo" label="आधार क्रमांक :"><input type="text" name="aadharNo" value={mainData.aadharNo} onChange={handleMainChange} className={`${inputClass} font-sans`} maxLength="12" /></FormField>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2">
                                    <FormField id="holderNameEnglish" label="२.मालमत्ता धारकाचे नाव (ENGLISH) :"><input type="text" name="holderNameEnglish" value={mainData.holderNameEnglish} onChange={handleMainChange} className={`${inputClass} font-sans`} /></FormField>
                                    <FormField id="mobileNo" label="मोबाईल नंबर :"><input type="tel" name="mobileNo" value={mainData.mobileNo} onChange={handleMainChange} className={`${inputClass} font-sans`} maxLength="10" /></FormField>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-x-4 gap-y-2">
                                    <FormField id="flatNo" label="फ्लॅट क्रमांक :"><input type="text" name="flatNo" value={mainData.flatNo} onChange={handleMainChange} className={inputClass} /></FormField>
                                    <FormField id="waterSupplyType" label="पाणीवापर प्रकार :"><input type="text" name="waterSupplyType" value={mainData.waterSupplyType} onChange={handleMainChange} className={inputClass} /></FormField>
                                    <FormField id="tapCount" label="नळ संख्या :"><input type="number" name="tapCount" value={mainData.tapCount} onChange={handleMainChange} className={`${inputClass} font-sans`} /></FormField>
                                </div>
                            </div>
                            <div className="lg:col-span-3 pt-2 lg:pt-0 lg:border-l-2 lg:border-gray-300 lg:pl-4 space-y-2">
                                <CheckboxField name="arogyaTax" label="आरोग्य कर" checked={mainData.arogyaTax} onChange={handleMainChange} />
                                <CheckboxField name="diwabattiTax" label="दिवाबत्ती कर" checked={mainData.diwabattiTax} onChange={handleMainChange} />
                                <CheckboxField name="divyangTax" label="दिव्यांग/अपंग" checked={mainData.divyangTax} onChange={handleMainChange} />
                                <CheckboxField name="inDefenseArea" label="संरक्षण क्षेत्रात काम करत असलेस" checked={mainData.inDefenseArea} onChange={handleMainChange} />
                                <CheckboxField name="isMIDC" label="महाराष्ट्र औद्योगिक विकास महामंडळ (MIDC)" checked={mainData.isMIDC} onChange={handleMainChange} />
                                <CheckboxField name="isSpecialWater" label="विशेष पाणीपट्टी साठी स्वतंत्र नोंदणी करण्यासाठी" checked={mainData.isSpecialWater} onChange={handleMainChange} />
                                <FormField id="notes" label="Notes :" className="mt-4"><textarea name="notes" value={mainData.notes} onChange={handleMainChange} className={inputClass} rows="2"></textarea></FormField>
                            </div>
                        </div>
                    </fieldset>

                    <fieldset className="p-2 border border-gray-300 relative" disabled={!isHolderInfoFilled}>
                        {!isHolderInfoFilled && (
                            <div className="absolute inset-0 bg-gray-100/80 flex items-center justify-center rounded-sm z-10 cursor-not-allowed"><p className="text-gray-700 font-bold p-4 bg-yellow-200 border border-yellow-400 rounded">कृपया आधी मालमत्ता धारकाची माहिती भरा</p></div>
                        )}
                        <legend className="px-2 text-sm font-semibold">मालमत्तेचे वर्णन</legend>
                        <div className="space-y-2">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2">
                                <FormField id="propertyType" label="मि.प्रकार :"><select name="propertyType" value={currentDescription.propertyType} onChange={handleDescriptionChange} className={inputClass}>{PROPERTY_TYPES.map(opt => <option key={opt}>{opt}</option>)}</select></FormField>
                                <FormField id="floor" label="मजला :"><select name="floor" value={currentDescription.floor} onChange={handleDescriptionChange} className={inputClass}>{FLOOR_OPTIONS.map(opt => <option key={opt}>{opt}</option>)}</select></FormField>
                            </div>
                            <fieldset className="p-2 border border-gray-300">
                                <legend className="px-2 text-xs font-semibold">इमारतीचे क्षेत्रफळ</legend>
                                <div className="flex flex-wrap items-end gap-x-4 gap-y-2">
                                    <div className="flex items-center space-x-4">
                                        <label className="flex items-center"><input type="radio" name="unit" value="sqft" checked={currentDescription.unit === 'sqft'} onChange={handleDescriptionChange} className="mr-1"/> चौ. फू.</label>
                                        <label className="flex items-center"><input type="radio" name="unit" value="sqm" checked={currentDescription.unit === 'sqm'} onChange={handleDescriptionChange} className="mr-1"/> चौ. मी.</label>
                                    </div>
                                    <FormField id="length" label="लांबी"><input type="number" step="0.01" name="length" value={currentDescription.length} onChange={handleDescriptionChange} className={`${inputClass} font-sans`} style={{width: '100px'}}/></FormField>
                                    <FormField id="width" label="रुंदी"><input type="number" step="0.01" name="width" value={currentDescription.width} onChange={handleDescriptionChange} className={`${inputClass} font-sans`} style={{width: '100px'}}/></FormField>
                                    <FormField id="area" label="क्षेत्रफळ"><input type="text" name="area" value={currentDescription.area} className={`${inputClass} ${readOnlyClass} font-sans`} readOnly style={{width: '100px'}}/></FormField>
                                    <FormField id="usage" label="वापर"><input type="text" name="usage" value={currentDescription.usage} onChange={handleDescriptionChange} className={inputClass} style={{width: '120px'}}/></FormField>
                                </div>
                            </fieldset>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-2">
                                <FormField id="constructionYear" label="बांधकाम वर्ष"><input type="number" name="constructionYear" value={currentDescription.constructionYear} onChange={handleDescriptionChange} className={`${inputClass} font-sans`} /></FormField>
                                <FormField id="rebate" label="कर सूट प्रकार"><input type="text" name="rebate" value={currentDescription.rebate} onChange={handleDescriptionChange} className={inputClass} /></FormField>
                                <FormField id="propertyTaxRateType" label="६. मालमत्ता कर दर प्रकार"><select name="propertyTaxRateType" value={currentDescription.propertyTaxRateType} onChange={handleDescriptionChange} className={inputClass}><option value="">-- निवडा --</option>{TAX_RATE_TYPES.map(opt => <option key={opt}>{opt}</option>)}</select></FormField>
                                <FormField id="dependentTaxType" label="७. रेडिरेकनर प्रमाणे भाग/उपविभाग"><select name="dependentTaxType" value={currentDescription.dependentTaxType} onChange={handleDescriptionChange} className={inputClass}>{dependentOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}</select></FormField>
                            </div>
                        </div>
                        <div className="mt-2 pt-2 border-t flex flex-wrap items-center gap-2">
                             <button type="button" onClick={handleNewDescription} className={`${compactButtonClass} bg-gray-200 hover:bg-gray-300`}>नवीन</button>
                             <button type="button" onClick={handleSaveDescription} className={`${compactButtonClass} bg-blue-600 text-white hover:bg-blue-700`}>{editingId ? 'अपडेट करा' : 'साठवणे'}</button>
                             <button type="button" onClick={() => setCurrentDescription(initialDescription)} className={`${compactButtonClass} bg-gray-200 hover:bg-gray-300`}>रद्द करणे</button>
                             <button type="button" disabled={!editingId} onClick={handleSaveDescription} className={`${compactButtonClass} bg-gray-200 hover:bg-gray-300 disabled:opacity-50`}>बदल</button>
                             <button type="button" disabled={!editingId} onClick={() => handleDeleteDescription(editingId)} className={`${compactButtonClass} bg-red-500 text-white hover:bg-red-600 disabled:opacity-50`}>काढणे</button>
                        </div>
                    </fieldset>

                    {descriptions.length > 0 && (
                        <div className="overflow-x-auto border border-gray-400">
                            <table className="min-w-full text-sm text-center">
                                <thead className="bg-gray-200"><tr>{['मि नं.', 'मि.प्रकार', 'मजला', 'लांबी', 'रुंदी', 'क्षेत्रफळ', 'वापर', 'बांधकाम वर्ष', 'कर सूट प्रकार', 'Action'].map(h =><th key={h} className="p-1 border border-gray-300 font-semibold text-gray-700">{h}</th>)}</tr></thead>
                                <tbody>{descriptions.map((d, index) => (<tr key={d.id} className="bg-white"><td className="p-1 border border-gray-300">{index + 1}</td><td className="p-1 border border-gray-300 text-left">{d.propertyType}</td><td className="p-1 border border-gray-300">{d.floor}</td><td className="p-1 border border-gray-300 font-sans">{d.length}</td><td className="p-1 border border-gray-300 font-sans">{d.width}</td><td className="p-1 border border-gray-300 font-sans">{d.area}</td><td className="p-1 border border-gray-300">{d.usage}</td><td className="p-1 border border-gray-300 font-sans">{d.constructionYear}</td><td className="p-1 border border-gray-300">{d.rebate}</td><td className="p-1 border border-gray-300"><button type="button" onClick={() => handleEditDescription(d.id)} className="font-medium text-indigo-600 hover:underline">Edit</button></td></tr>))}</tbody>
                            </table>
                        </div>
                    )}
                    
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        <CheckboxField name="isKamijastaPatrak" label="सदर मालमत्तेची नोंद कमी-जास्त पत्रक मध्ये करणे" checked={mainData.isKamijastaPatrak} onChange={handleMainChange} />
                        <button type="submit" disabled={isSubmitting || isSerialLoading} className="w-full md:w-auto px-6 py-2 bg-green-600 text-white font-bold rounded-md shadow-sm hover:bg-green-700 disabled:bg-gray-400">
                            {isSubmitting ? 'जतन करत आहे...' : 'संपूर्ण अर्ज जतन करा'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}