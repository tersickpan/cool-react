import getUploadSign from "./getUploadSign";

export default async function uploadNewFile(file, fileType, baseKey, entryKey) {
  if (!file) {
    throw new Error("No file provided for upload.");
  }

  if (!baseKey) {
    throw new Error("No baseKey provided for upload.");
  }

  if (!entryKey) {
    throw new Error("No entryKey provided for upload.");
  }

  const folder = `baddies/${baseKey}`;

  try {
    const { signature, timestamp } = await getUploadSign({ folder });
    const formData = new FormData();

    formData.append("file", file);
    formData.append("api_key", import.meta.env.VITE_CLOUDINARY_API_KEY);
    formData.append("timestamp", timestamp);
    formData.append("signature", signature);
    formData.append("public_id", entryKey);
    formData.append("asset_folder", folder);
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
