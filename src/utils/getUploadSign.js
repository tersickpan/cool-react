export default async function getUploadSign() {
  try {
    const response = await fetch(
      "https://cool-express.vercel.app/api/signuploadform"
    );
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
