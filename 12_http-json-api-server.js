const http = require("node:http");

//main
const PORT = process.argv[2];

http
  .createServer((req, res) => {
    const url = new URL(req.url, `http://${req.headers.host}`);
    const pathName = getPathNameFrom(url);
    const isoString = url.searchParams.get("iso");

    if (isParseTimePath(pathName)) {
      const timeComponents = extractTimeComponentsFrom(isoString);
      const timeDTO = JSON.stringify(timeComponents);

      res.writeHead(200, { "content-type": "application/json" }).end(timeDTO);
    }

    if (isUnixTimePath(pathName)) {
      const unixTime = extractUnixTimeFrom(isoString);
      const unixTimeDTO = JSON.stringify(unixTime);

      res
        .writeHead(200, { "content-type": "application/json" })
        .end(unixTimeDTO);
    }
  })
  .listen(PORT, () => {
    console.log(`🚀 server running on port ${PORT}`);
  })
  .on("error", (err) => {
    console.error("Error starting server:", err);
  });

const PATHNAME = {
  PARSETIME: "parsetime",
  UNIXTIME: "unixtime",
};

/**
 * Checks if the given path name matches the PARSETIME path.
 *
 * @param {string} pathName - The path name to check.
 * @returns {boolean} True if the path name matches PARSETIME, otherwise false.
 */
const isParseTimePath = (pathName) => pathName === PATHNAME.PARSETIME;

/**
 * Checks if the given path name matches the UNIX time path.
 *
 * @param {string} pathName - The path name to check.
 * @returns {boolean} True if the path name matches the UNIX time path, otherwise false.
 */
const isUnixTimePath = (pathName) => pathName === PATHNAME.UNIXTIME;

/**
 * Extracts the last segment of the pathname from a given URL object.
 *
 * @param {URL} url - The URL object from which to extract the pathname segment.
 * @returns {string} The last segment of the pathname.
 */
const getPathNameFrom = (url) => url.pathname.split("/").at(-1);

/**
 * @typedef {Object} TimeComponents
 * @property {number} hour - The hour component.
 * @property {number} minute - The minute component.
 * @property {number} second - The second component.
 */
/**
 * Extracts the hour, minute, and second components from an ISO date string.
 *
 * @param {string} isoString - The ISO date string to extract time components from.
 * @returns {TimeComponents} An object containing the hour, minute, and second components.
 */
const extractTimeComponentsFrom = (isoString) => {
  const date = new Date(isoString);

  return {
    hour: date.getHours(),
    minute: date.getMinutes(),
    second: date.getSeconds(),
  };
};

/**
 * @typedef {Object} UnixTime
 * @property {number} unixtime - The Unix time in milliseconds.
 */
/**
 * Extracts the Unix time from an ISO date string.
 *
 * @param {string} isoString - The ISO date string to extract the Unix time from.
 * @returns {UnixTime} An object containing the Unix time.
 */

const extractUnixTimeFrom = (isoString) => {
  const date = new Date(isoString);

  return {
    unixtime: date.getTime(),
  };
};
