// pages/api/get-signature.js
import crypto from "crypto";

export default function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const timestamp = Math.round(new Date().getTime() / 1000);

    // Create the signature using your API secret
    const signature = crypto
      .createHash("sha1")
      .update(`timestamp=${timestamp}${process.env.CLOUDINARY_API_SECRET}`)
      .digest("hex");

    res.status(200).json({
      timestamp,
      signature,
    });
  } catch (err) {
    console.error("Signature generation failed:", err);
    res.status(500).json({ error: "Failed to generate signature" });
  }
}
