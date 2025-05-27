// Replace with your actual Supabase project credentials
const SUPABASE_URL = 'https://astzrmtwowullujlknyq.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFzdHpybXR3b3d1bGx1amxrbnlxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDgzMDY2MTYsImV4cCI6MjA2Mzg4MjYxNn0.h3o6PusB_qRsNpf3KTFkeMii4vpqKmACB7S7HaplKlM';

// Make sure the Supabase library is loaded before running this
window.supabase = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

// ✅ Test connection with a sample SELECT query
async function testSupabaseConnection() {
  try {
    const { data, error } = await window.supabase
      .from('Registered_Chefs') 
      .select('*')
      .limit(1);

    if (error) {
      console.error('❌ Supabase connection error:', error.message);
    } else {
      console.log('✅ Supabase connected. Sample data:', data);
    }
  } catch (err) {
    console.error('❌ Unexpected error:', err);
  }
}

// Run test after DOM is ready
document.addEventListener('DOMContentLoaded', testSupabaseConnection);
