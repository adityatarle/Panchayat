# Supabase Setup for Grampanchayat Property Information System

## Prerequisites
1. Create a Supabase account at [supabase.com](https://supabase.com)
2. Create a new project in Supabase

## Setup Steps

### 1. Environment Variables
Create a `.env.local` file in your project root with the following variables:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_URL=your_supabase_project_url
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
```

### 2. Database Schema Setup
1. Go to your Supabase dashboard
2. Navigate to the SQL Editor
3. Copy and paste the contents of `supabase/schema.sql`
4. Run the SQL to create the tables

### 3. API Keys Location
In your Supabase dashboard:
- **Project URL**: Settings → API → Project URL
- **Anon Key**: Settings → API → anon/public key
- **Service Role Key**: Settings → API → service_role key (keep this secret!)

### 4. Install Dependencies
```bash
npm install
```

### 5. Run the Application
```bash
npm run dev
```

## Database Tables Created

### property_holders
- Contains all property holder information
- Includes checkboxes for various taxes and registrations
- Uses UUID as primary key

### property_descriptions
- Contains property description details
- Links to property_holders via foreign key
- Supports multiple descriptions per property holder

## API Endpoints

### GET /api/property
- Fetches all property information with related descriptions
- Returns combined data from both tables

### POST /api/property
- Creates new property holder and associated descriptions
- Accepts propertyHolderData and propertyDescriptions in request body
- Returns success message and property ID

## Security Notes
- Row Level Security (RLS) is enabled on both tables
- Basic policies are set up (modify as needed for your authentication system)
- Service role key should only be used on the server side
- Anon key is safe to use on the client side

## Next Steps
1. Set up proper authentication
2. Implement user-specific RLS policies
3. Add data validation
4. Set up backup strategies
