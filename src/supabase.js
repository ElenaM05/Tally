import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://bbrvkzswjcmxbkxeqycm.supabase.co"; 
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJicnZrenN3amNteGJreGVxeWNtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDAyMTAyMDgsImV4cCI6MjA1NTc4NjIwOH0.8tL00RcSw5HJEiqr89e6N9R4u88wLURYV0-AWhjv8ag";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
