// Import the required Supabase client library
const { createClient } = require('@supabase/supabase-js');

// Load environment variables (if using .env file)
require('dotenv').config();

// Create the Supabase client with your Supabase URL and Service Role Key
const supabase = createClient(
  process.env.SUPABASE_URL,          // Your Supabase URL
  process.env.SUPABASE_SERVICE_ROLE_KEY  // Your Service Role Key (Admin level access)
);


// Export the Supabase client to use in other files
module.exports = supabase;
