function sortByTimestamp(jsonData, order = "asc") {
  // Step 1: Convert to array of [key, value] pairs
  const entriesPics = Object.entries(jsonData.pictures);
  const entriesVids = Object.entries(jsonData.videos);

  // Step 2: Sort based on timestamp
  entriesPics.sort((a, b) => {
    const t1 = new Date(a[1].timestamp);
    const t2 = new Date(b[1].timestamp);
    return order === "asc" ? t1 - t2 : t2 - t1;
  });

  // Step 2: Sort based on timestamp
  entriesVids.sort((a, b) => {
    const t1 = new Date(a[1].timestamp);
    const t2 = new Date(b[1].timestamp);
    return order === "asc" ? t1 - t2 : t2 - t1;
  });

  const sortedJson = {
    pictures: Object.fromEntries(entriesPics),
    videos: Object.fromEntries(entriesVids),
  };

  // Step 3: Return reconstructed object
  return sortedJson;
}

export default sortByTimestamp;
