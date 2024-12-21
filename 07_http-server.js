const http = require("node:http");

const data = [
  "Bathers",
  "Sunnies",
  "His blood's worth bottling",
  "Buckley's chance",
  "No dramas",
  "Bikkie",
  "Big Smoke",
  "Cleanskin",
  "Bog standard",
  "Ugg",
  "",
];
const server = http.createServer((_req, res) => {
  const stringifiedData = JSON.stringify(data);
  const chunks = splitIntoChunks(stringifiedData, 10);

  res.writeHead(200, { "Content-Type": "application/json" });

  chunks.forEach((chunk, index) => {
    setTimeout(() => {
      res.write(chunk);
      if (index === chunks.length - 1) {
        res.end();
      }
    }, index * 50);
  });
});

const PORT = 8080;
server.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

/**
 * Helper function to split a string into smaller chunks
 * @param {string} str - The string to split
 * @param {number} chunkSize - The size of each chunk
 * @returns {string[]} - Array of string chunks
 */
function splitIntoChunks(str, chunkSize) {
  const chunks = [];
  for (let i = 0; i < str.length; i += chunkSize) {
    chunks.push(str.slice(i, i + chunkSize));
  }
  return chunks;
}
