export default async function getDestroySign({ entryKey }) {
  try {
    const params = new URLSearchParams({
      entryKey,
    });

    const url = `${
      import.meta.env.VITE_CLOUDINARY_API_URL
    }/signdestroyform?${params.toString()}`;

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
    // You can use the data here (e.g., set state, show UI, etc.)
  } catch (error) {
    console.error("Failed to fetch signature:", error);
    throw error;
  }
}
