import { supabase } from '../../../../lib/supabase'
import { NextResponse } from 'next/server'

export async function GET(request) {
  try {
    const { data, error } = await supabase
      .from('property_holders')
      .select(`
        *,
        property_descriptions (*)
      `)
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching properties:', error)
      return NextResponse.json({ error: 'Failed to fetch properties' }, { status: 500 })
    }

    return NextResponse.json({ success: true, data })
  } catch (error) {
    console.error('Error in GET /api/property:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function POST(request) {
  try {
    const body = await request.json()
    const { propertyHolderData, propertyDescriptions } = body

    // Insert property holder
    const { data: propertyHolder, error: holderError } = await supabase
      .from('property_holders')
      .insert([{
        serial_no: propertyHolderData.serialNo,
        period: propertyHolderData.period,
        village_name: propertyHolderData.villageName,
        property_group_economic_category: propertyHolderData.propertyGroupEconomicCategory,
        property_no: propertyHolderData.propertyNo,
        ward_no_group_no: propertyHolderData.wardNoGroupNo,
        property_activity_no: propertyHolderData.propertyActivityNo,
        street_name_lane_no: propertyHolderData.streetNameLaneNo,
        address: propertyHolderData.address,
        property_holder_name: propertyHolderData.propertyHolderName,
        property_holder_name_english: propertyHolderData.propertyHolderNameEnglish,
        aadhar_no: propertyHolderData.aadharNo,
        mobile_no: propertyHolderData.mobileNo,
        water_supply: propertyHolderData.waterSupply,
        permanent_account_no: propertyHolderData.permanentAccountNo,
        tap_number: propertyHolderData.tapNumber,
        group_no_resident_no: propertyHolderData.groupNoResidentNo,
        toilet: propertyHolderData.toilet,
        plan_tax: propertyHolderData.planTax,
        diwali_tax: propertyHolderData.diwaliTax,
        diwan_agam: propertyHolderData.diwanAgam,
        working_in_defense_area: propertyHolderData.workingInDefenseArea,
        midc: propertyHolderData.midc,
        special_property_registration: propertyHolderData.specialPropertyRegistration
      }])
      .select()
      .single()

    if (holderError) {
      console.error('Error inserting property holder:', holderError)
      return NextResponse.json({ error: 'Failed to create property holder' }, { status: 500 })
    }

    // Insert property descriptions if any
    if (propertyDescriptions && propertyDescriptions.length > 0) {
      const descriptionsData = propertyDescriptions.map(desc => ({
        property_holder_id: propertyHolder.id,
        property_type: desc.propertyType,
        other_property_info: desc.otherPropertyInfo,
        floor: desc.floor,
        area_for_person: desc.areaForPerson,
        tank: desc.tank,
        width: desc.width,
        area: desc.area,
        usage: desc.usage,
        property_assessment_category: desc.propertyAssessmentCategory,
        assessment_year: desc.assessmentYear,
        land_assessment_rate_per_sqm: desc.landAssessmentRatePerSqM,
        land_rate: desc.landRate,
        rate_type_category: desc.rateTypeCategory,
        shop_rate_per_sqft: desc.shopRatePerSqFt,
        shop_rate_per_sqm: desc.shopRatePerSqM,
        tax_assessment_type_subdivision: desc.taxAssessmentTypeSubdivision
      }))

      const { error: descriptionsError } = await supabase
        .from('property_descriptions')
        .insert(descriptionsData)

      if (descriptionsError) {
        console.error('Error inserting property descriptions:', descriptionsError)
        return NextResponse.json({ error: 'Failed to create property descriptions' }, { status: 500 })
      }
    }

    return NextResponse.json({ 
      success: true, 
      message: 'Property information saved successfully',
      propertyId: propertyHolder.id
    })
  } catch (error) {
    console.error('Error in POST /api/property:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
