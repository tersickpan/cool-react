export default function getRandomEntry(selectedJson, base) {
  const keys = Object.keys(selectedJson);
  const options = keys.filter((k) => k.startsWith(base + "-"));
  const randomBabe = options[Math.floor(Math.random() * options.length)];

  return selectedJson[randomBabe];
}
