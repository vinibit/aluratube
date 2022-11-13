import { createClient } from "@supabase/supabase-js";

const PROCECT_URL = "https://gresnnouummwjfiopjww.supabase.co";
const PUBLIC_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdyZXNubm91dW1td2pmaW9wand3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjgyNjM1MTMsImV4cCI6MTk4MzgzOTUxM30.qOFQqhCkwgVgsrbF_WOr5fEbHnNwdIEo4-Bri4dId58";
const supabase = createClient(PROCECT_URL, PUBLIC_KEY);

export function videoService(params) {
    return {
        getAllVideos() {
            return supabase
                    .from("video")
                    .select("*");
                    
        }
    }
}