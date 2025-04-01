import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://gucmbwhympkqovurpzoe.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd1Y21id2h5bXBrcW92dXJwem9lIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM0OTY3NDksImV4cCI6MjA1OTA3Mjc0OX0.llFDU3NgSQAF7MXBZ0id2Rj-zIj2VVjqO3RKRLFlIio';

export const supabase = createClient(supabaseUrl, supabaseKey);