import getUploadSign from "./getUploadSign";

export default async function uploadNewFile(file, fileType) {
  if (!file) {
    throw new Error("No file provided for upload.");
  }

  try {
    const { signature, timestamp } = await getUploadSign();
    const formData = new FormData();

    formData.append("file", file);
    formData.append("api_key", import.meta.env.VITE_CLOUDINARY_API_KEY);
    formData.append("timestamp", timestamp);
    formData.append("signature", signature);
    formData.append("folder", "baddies/temp");
    if (fileType === "picture") {
      formData.append("resource_type", "image");
    } else if (fileType === "video") {
      formData.append("resource_type", "video");
    }

    const cloudinaryResponse = await fetch(
      `https://api.cloudinary.com/v1_1/${
        import.meta.env.VITE_CLOUDINARY_CLOUD_NAME
      }/auto/upload`,
      {
        method: "POST",
        body: formData,
      }
    );

    if (!cloudinaryResponse.ok) {
      throw new Error("Cloudinary upload failed.");
    }

    const data = await cloudinaryResponse.json();
    return data;
  } catch (error) {
    console.error("Upload error:", error);
    throw error;
  }
}
