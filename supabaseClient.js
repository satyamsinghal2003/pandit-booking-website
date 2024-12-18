import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://bicasmdzdaneciiocsel.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJpY2FzbWR6ZGFuZWNpaW9jc2VsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzM1OTExOTQsImV4cCI6MjA0OTE2NzE5NH0.XZ7kxl3zu-L7xr61eiMnUlQR5VuQ9dLbZm5qXcUSGdI"; 
export const supabase = createClient(supabaseUrl, supabaseKey);
