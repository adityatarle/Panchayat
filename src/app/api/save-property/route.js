// src/app/api/save-property/route.js

import { NextResponse } from 'next/server';
// Make sure this import path is correct for your project structure.
// If '@/lib/supabase-server' gives an error, use the relative path.
import supabaseAdmin from '../../../lib/supabase-server'; 

// --- START: Correct and Complete Helper Functions ---

// This function maps the 'mainData' object from your form
// to the column names in your 'property_holders' database table.
const mapMainDataToDb = (data) => ({
  csc_serial_no: data.serialNo,
  period: data.period,
  village_name: data.village,
  financial_year: data.financialYear,
  property_no_full: data.propertyNoFull,
  ward_no: data.wardNo,
  prabhag_no: data.prabhagNo,
  property_no: data.propertyNo,
  street_name: data.street,
  aadhar_no: data.aadharNo,
  holder_name_marathi: data.holderName, // This was the key field causing the 'not-null' error
  holder_name_english: data.holderNameEnglish,
  attic_info: data.atticInfo,
  mobile_no: data.mobileNo,
  water_supply_type: data.waterSupplyType,
  tap_count: data.tapCount,
  flat_no: data.flatNo,
  meter_survey_no: data.meterSurveyNo,
  gat_no: data.gatNo,
  has_toilet: data.toilet === 'आहे', // Converts the string to a boolean
  notes: data.notes,
  has_plan_tax: data.planTax,
  has_diwali_tax: data.diwaliTax,
  has_diwan_agam: data.diwanAgam,
  is_defense_area: data.inDefenseArea,
  is_midc: data.isMIDC,
  is_special_property: data.specialProperty,
});

// This function maps an item from the 'descriptions' array from your form
// to the column names in your 'property_descriptions' database table.
const mapDescriptionToDb = (desc, holderId) => ({
  holder_id: holderId, // The ID from the newly created holder record
  property_type: desc.propertyType,
  floor_level: desc.floor,
  other_info: desc.otherInfo,
  measurement_unit: desc.unit,
  length: desc.length,
  width: desc.width,
  area: desc.area,
  usage_type: desc.usage,
  is_authorized: desc.authorization === 'authorized', // Converts string to boolean
  construction_year: desc.constructionYear,
  land_rate_year: desc.landConstructionRate,
  previous_tax_surcharge: desc.previousTaxSurcharge,
  land_rate: desc.landRate,
  rebate_info: desc.rebate,
  property_tax_rate_type: desc.propertyTaxRateType,
  dependent_tax_type: desc.dependentTaxType,
  old_value: desc.oldValue,
});

// --- END: Correct and Complete Helper Functions ---


export async function POST(request) {
  try {
    const { mainData, descriptions } = await request.json();

    // Basic validation to ensure we have data
    if (!mainData || !descriptions) {
        return NextResponse.json({ success: false, message: "Invalid data received." }, { status: 400 });
    }

    // Step 1: Insert into 'property_holders' using Supabase
    const holderDataForDb = mapMainDataToDb(mainData);
    
    const { data: holderResult, error: holderError } = await supabaseAdmin
      .from('property_holders')
      .insert([holderDataForDb])
      .select('id') // This is crucial to get the ID for the next step
      .single(); // Use .single() as we are inserting one record and expect one back

    // If there was an error inserting the main holder, throw it to the catch block
    if (holderError) {
        // Provide more context to the error for better debugging
        holderError.message = `Failed to insert property holder: ${holderError.message}`;
        throw holderError;
    }
    
    const newHolderId = holderResult.id;

    // Step 2: Insert into 'property_descriptions' using Supabase
    if (descriptions && descriptions.length > 0) {
      const descriptionsForDb = descriptions.map(desc => mapDescriptionToDb(desc, newHolderId));
      
      const { error: descError } = await supabaseAdmin
        .from('property_descriptions')
        .insert(descriptionsForDb);

      // If there was an error inserting the descriptions, throw it
      if (descError) {
          descError.message = `Failed to insert property descriptions: ${descError.message}`;
          throw descError;
      }
    }

    // If everything was successful, return the success response
    return NextResponse.json({
      success: true,
      message: 'Property saved successfully!',
      applicationId: newHolderId,
    }, { status: 201 });

  } catch (error) {
    // Log the detailed error on the server
    console.error('Supabase API Error:', error);
    
    // Return a user-friendly error message to the client
    return NextResponse.json({
      success: false,
      message: error.message || 'Failed to save property due to an internal error.',
    }, { status: 500 });
  }
}