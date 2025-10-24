import { FaTiktok, FaInstagram } from "react-icons/fa6";

import BaseLabel from "./BaseLabel";

export default function SocialLinks({ socials }) {
  if (!socials || socials.length === 0) return null;

  const { tiktok, instagram } = socials;

  return (
    <div className="flex space-x-4 justify-center mb-6">
      {tiktok && (
        <BaseLabel>
          <a
            href={tiktok}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-2"
          >
            <FaTiktok />
            <span>{tiktok.split("@")[1]}</span>
          </a>
        </BaseLabel>
      )}
      {instagram && (
        <BaseLabel>
          <a
            href={instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-2"
          >
            <FaInstagram />
            <span>{instagram.split("/")[3]}</span>
          </a>
        </BaseLabel>
      )}
    </div>
  );
}
