import axios from "axios";

import getDestroySign from "./getDestroySign";
import { deleteSingleEntry } from "./supabase";

export default async function deleteSingleMedia(mediaType, public_id) {
  console.log("Deleting entry:", { mediaType, public_id });

  if (!mediaType || !public_id) {
    alert("Delete failed: Missing fields");
    return;
  }

  const resourceType = mediaType === "video" ? "video" : "image";

  try {
    // 🔹 Ask backend signature
    const { signature, timestamp } = await getDestroySign({
      entryKey: public_id,
    });
    const formData = new FormData();
    formData.append("api_key", import.meta.env.VITE_CLOUDINARY_API_KEY);
    formData.append("timestamp", timestamp);
    formData.append("signature", signature);
    formData.append("public_id", public_id);

    // Delete from Cloudinary
    await axios
      .post(
        `https://api.cloudinary.com/v1_1/${
          import.meta.env.VITE_CLOUDINARY_CLOUD_NAME
        }/${resourceType}/destroy`,
        formData
      )
      .then(() => {
        deleteSingleEntry(mediaType, public_id).then(() => {
          alert(`Deleted ${public_id} successfully!`);
        });
      });
  } catch (error) {
    alert("Cloudinary delete failed: " + error.message);
    return;
  }
}
