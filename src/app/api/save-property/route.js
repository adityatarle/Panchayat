// app/api/save-property/route.js

import { Pool } from 'pg';
import { NextResponse } from 'next/server';

// It's safer to define the pool outside but check its existence inside the handler.
let pool;

// Check if the environment variable exists before creating the pool.
if (process.env.POSTGRES_URL) {
    try {
        pool = new Pool({
            connectionString: process.env.POSTGRES_URL,
            ssl: {
                rejectUnauthorized: false, // Essential for most cloud databases
            },
        });
    } catch (error) {
        console.error("CRITICAL: Failed to create a database pool on initial load.", error);
    }
} else {
    console.error("CRITICAL: POSTGRES_URL environment variable is not set.");
}


export async function POST(request) {
    if (!pool) {
        console.error("API call failed because database pool is not available.");
        return NextResponse.json({
            success: false,
            message: 'Database connection is not configured. Please check server logs.'
        }, { status: 500 });
    }

    let client;
    try {
        const { mainData, descriptions } = await request.json();

        // Attempt to connect to the database
        client = await pool.connect();

        // The rest of your transaction logic (BEGIN, INSERTs, COMMIT) goes here...
        await client.query('BEGIN');
        // ...
        // holder insert
        // ...
        // descriptions insert loop
        // ...
        await client.query('COMMIT');

        return NextResponse.json({
            success: true,
            message: 'Property saved successfully!',
            applicationId: 'SOME_ID_FROM_DB' // Replace with actual ID
        }, { status: 201 });

    } catch (error) {
        if (client) {
            await client.query('ROLLBACK');
        }
        console.error('API Route Error:', error);
        return NextResponse.json({
            success: false,
            message: 'An internal server error occurred.',
            error: error.message, // For debugging
        }, { status: 500 });

    } finally {
        if (client) {
            client.release();
        }
    }
}