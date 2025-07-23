// src/app/api/save-property/route.js

import { NextResponse } from 'next/server';
// Use the path to your server-side Supabase client.
// The name `supabaseAdmin` is a good convention for the service role client.
import supabaseAdmin from '../../../lib/supabase-server'; 

export async function POST(request) {
  try {
    const { mainData, descriptions } = await request.json();

    // --- Backend Validation ---
    // It's good practice to validate the most critical data on the server.
    if (!mainData || !mainData.holderName) {
      return NextResponse.json({ 
        success: false, 
        message: 'Invalid data: Holder name is required.' 
      }, { status: 400 });
    }
    if (!descriptions || !Array.isArray(descriptions) || descriptions.length === 0) {
      return NextResponse.json({ 
        success: false, 
        message: 'Invalid data: At least one property description is required.' 
      }, { status: 400 });
    }

    // --- Call the Supabase RPC Function ---
    // This single call executes the entire transaction on the database server.
    // It's atomic: either everything succeeds, or everything is rolled back.
    const { data: newHolderId, error } = await supabaseAdmin.rpc('create_property_with_descriptions', {
      main_data: mainData,
      descriptions_data: descriptions
    });

    // If the RPC function itself returns an error, Supabase will forward it.
    if (error) {
      // The error object from Supabase is detailed, so we throw it to be caught below.
      // This gives us great logs for debugging.
      throw error;
    }

    // --- Success Response ---
    // If we reach here, the transaction was successful.
    return NextResponse.json({
      success: true,
      message: 'Property saved successfully!',
      applicationId: newHolderId, // The ID returned from our SQL function
    }, { status: 201 });

  } catch (error) {
    // --- Centralized Error Handling ---
    // Log the detailed error on the server for debugging.
    console.error('Supabase Transaction Error:', error);
    
    // Return a clean, user-friendly error message to the client.
    return NextResponse.json({
      success: false,
      message: error.message || 'Failed to save property due to an internal server error.',
    }, { status: 500 });
  }
}