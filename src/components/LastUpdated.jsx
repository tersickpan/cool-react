import { useEffect, useState } from "react";

import BaseImagePreview from "./base/BaseImagePreview";
import BaseVideoPreview from "./base/BaseVideoPreview";
import SectionCard from "./base/SectionCard";
import BaseLabel from "./base/BaseLabel";
import { fetchSingleEntryWithSort } from "../utils/supabase";

function LastUpdated() {
  const [latestPic, setLatestPic] = useState({});
  const [latestVid, setLatestVid] = useState({});

  useEffect(() => {
    fetchSingleEntryWithSort("pictures", "latest")
      .then((entry) => {
        setLatestPic(entry);
      })
      .catch((err) => {
        console.error(
          "Failed to fetch latest picture entry from Supabase",
          err
        );
      });
    fetchSingleEntryWithSort("videos", "latest")
      .then((entry) => {
        setLatestVid(entry);
      })
      .catch((err) => {
        console.error("Failed to fetch latest video entry from Supabase", err);
      });
  }, []);

  return (
    <div className="grid md:grid-cols-2 gap-6">
      <SectionCard className={"flex flex-col items-center"}>
        <BaseLabel>{latestPic.public_id}</BaseLabel>
        <BaseImagePreview src={latestPic.url} />
      </SectionCard>
      <SectionCard className={"flex flex-col items-center"}>
        <BaseLabel>{latestVid.public_id}</BaseLabel>
        <BaseVideoPreview
          src={latestVid.url}
          volume={latestVid?.volume}
        />
      </SectionCard>
    </div>
  );
}

export default LastUpdated;
