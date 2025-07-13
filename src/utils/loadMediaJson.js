export async function loadMediaJson() {
  const url =
    "https://res.cloudinary.com/dt4e5hwvo/raw/upload/cloudinary-media_v8lbbc.json";

  const res = await fetch(url);
  if (!res.ok) throw new Error("Failed to fetch media.json");

  return res.json(); // returns { pictures: {}, videos: {} }
}
