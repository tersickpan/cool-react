import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

// Function to insert media upload record
export async function insertSingleMediaUpload({
  mediaType,
  base_key,
  public_id,
  url,
  timestamp,
  volume,
}) {
  const insertObj = {
    base_key,
    public_id,
    url,
    timestamp,
  };

  if (volume !== undefined) {
    insertObj.volume = volume;
  }

  const { data, error } = await supabase.from(mediaType).insert(insertObj);

  if (error) {
    console.error("Error inserting media upload:", error);
    throw error;
  }
  return data;
}

export async function fetchAllMedia(mediaType) {
  const { data, error } = await supabase
    .from(mediaType)
    .select("*")
    .order("timestamp", { ascending: false });

  if (error) {
    console.error("Error fetching media:", error);
    throw error;
  }
  return data;
}

export default supabase;
