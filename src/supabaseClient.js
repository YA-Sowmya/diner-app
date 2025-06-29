import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://qccpcmeffzusyavknrtg.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFjY3BjbWVmZnp1c3lhdmtucnRnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA5NjQxNjUsImV4cCI6MjA2NjU0MDE2NX0.6uOX8_LIGtE_yAszb-aRq9SrkRwsB_O2bp7CU56-Mn4'


export const supabase = createClient(supabaseUrl, supabaseKey)
