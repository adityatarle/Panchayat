// src/app/api/get-next-serial/route.js

import { NextResponse } from 'next/server';
import supabaseAdmin from '../../../lib/supabase-server';

export async function GET() {
  try {
    // Call the SQL function we created in Supabase
    const { data: nextSerialNumber, error } = await supabaseAdmin.rpc('get_next_serial_number');

    if (error) {
      // If the function call fails, throw an error
      throw error;
    }

    // Return the result in a JSON object
    return NextResponse.json({ nextSerialNumber }, { status: 200 });

  } catch (error) {
    console.error('Error fetching next serial number:', error);
    return NextResponse.json(
      { message: 'Failed to fetch next serial number.', error: error.message },
      { status: 500 }
    );
  }
}