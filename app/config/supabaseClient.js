import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://necsftdazwfszvyasjhz.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5lY3NmdGRhendmc3p2eWFzamh6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjM1NTE3MzMsImV4cCI6MjAzOTEyNzczM30.GpcPrJvI7TDoJO8KrWxFQHiE4Ztn2nHs4KBulyGCcvs";

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
