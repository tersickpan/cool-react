import { useSelector } from "react-redux";

import BaseImagePreview from "./base/BaseImagePreview";
import BaseVideoPreview from "./base/BaseVideoPreview";
import SectionCard from "./base/SectionCard";
import sortByTimestamp from "../utils/sortByTimestamp";
import BaseLabel from "./base/BaseLabel";

function LastUpdated() {
  const mediaJson = useSelector((state) => state.mediaData.mediaJson);
  const sortedMediaJson = sortByTimestamp(mediaJson, "desc");

  const picLabel = Object.keys(sortedMediaJson.pictures)[0];
  const vidLabel = Object.keys(sortedMediaJson.videos)[0];
  const latestPic = Object.values(sortedMediaJson.pictures)[0];
  const latestVid = Object.values(sortedMediaJson.videos)[0];

  return (
    <div className="grid md:grid-cols-2 gap-6">
      <SectionCard className={"flex flex-col items-center"}>
        <BaseLabel>{picLabel}</BaseLabel>
        <BaseImagePreview src={latestPic.url} />
      </SectionCard>
      <SectionCard className={"flex flex-col items-center"}>
        <BaseLabel>{vidLabel}</BaseLabel>
        <BaseVideoPreview
          src={latestVid.url}
          volume={latestVid?.volume}
        />
      </SectionCard>
    </div>
  );
}

export default LastUpdated;
