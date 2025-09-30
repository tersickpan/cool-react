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

export async function fetchBaseKeys(mediaType) {
  const { data, error } = await supabase.from(mediaType).select("base_key");

  if (error) {
    console.error("Error fetching base keys:", error);
    throw error;
  }
  return data;
}

export async function fetchEntryKeys(mediaType, base_key) {
  const { data, error } = await supabase
    .from(mediaType)
    .select("public_id")
    .eq("base_key", base_key)
    .order("public_id", { ascending: true });

  if (error) {
    console.error("Error fetching entry keys:", error);
    throw error;
  }
  return data;
}

export async function fetchSingleEntry(mediaType, public_id) {
  const { data, error } = await supabase
    .from(mediaType)
    .select("*")
    .eq("public_id", public_id)
    .single();

  if (error) {
    console.error("Error fetching single entry:", error);
    throw error;
  }
  return data;
}

export async function fetchSingleRandomEntry(mediaType, base_key) {
  // First get count
  const { count, error: countError } = await supabase
    .from(mediaType)
    .select("*", { count: "exact", head: true })
    .eq("base_key", base_key);

  if (countError) {
    console.error("Error fetching count for random entry:", countError);
    throw countError;
  }

  // Pick random offset
  const randomOffset = Math.floor(Math.random() * count);

  const { data, error } = await supabase
    .from(mediaType)
    .select("*")
    .eq("base_key", base_key)
    .range(randomOffset, randomOffset) // fetch 1 row at that offset
    .single();

  if (error) {
    console.error("Error fetching single random entry:", error);
    throw error;
  }
  return data;
}

export async function fetchSingleEntryWithSort(mediaType, sortMode) {
  const { data, error } = await supabase
    .from(mediaType)
    .select("*")
    .order("timestamp", { ascending: sortMode === "asc" })
    .limit(1)
    .single();

  if (error) {
    console.error("Error fetching single entry with sort:", error);
    throw error;
  }
  return data;
}

export async function updateSingleEntryVolume(mediaType, public_id, newVolume) {
  const { data, error } = await supabase
    .from(mediaType)
    .update({ volume: newVolume })
    .eq("public_id", public_id);

  if (error) {
    console.error("Error updating entry volume:", error);
    throw error;
  }
  return data;
}

export async function deleteSingleEntry(mediaType, public_id) {
  const { data, error } = await supabase
    .from(mediaType)
    .delete()
    .eq("public_id", public_id);

  if (error) {
    console.error("Error deleting single entry:", error);
    throw error;
  }
  return data;
}

export default supabase;
