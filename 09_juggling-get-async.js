const http = require("node:http");

const urlsToFetch = process.argv.slice(2);
const totalUrlsToFetch = urlsToFetch.length;

const INITIAL_VALUE = "";
const responses = new Array(totalUrlsToFetch).fill(INITIAL_VALUE);
let fulfilledResponseCounter = 0;

urlsToFetch.forEach((urlToFetch, index) => {
  http
    .get(urlToFetch, (res) => {
      res.setEncoding("utf-8");

      res
        .on("data", updateChunkBy(index))
        .on("error", (error) => console.error(`🚨 data 🚨`, error.message));

      res.on("end", () => {
        fulfilledResponseCounter++;

        const areAllRequestsFulfilled = checkRequestsAreFulfilled(
          fulfilledResponseCounter,
          totalUrlsToFetch
        );

        if (areAllRequestsFulfilled) {
          printResponses(responses);
        }
      });
    })
    .on("error", (error) => console.error(`🚨 res 🚨`, error.message));
});

/**
 * Returns a function that appends a chunk of data to the response at the specified index.
 *
 * @callback ChunkUpdater
 * @param {string} chunk - A piece of data to append to the response.
 * @returns {void}
 */

/**
 * Creates a function to update the response at the specified index with data chunks.
 *
 * @param {number} index - The index of the response to update.
 * @returns {ChunkUpdater} A callback function to handle chunked data.
 */
function updateChunkBy(index) {
  return function (chunk) {
    responses[index] += chunk;
  };
}

/**
 * Checks if the number of fulfilled responses matches the total responses to fulfill.
 *
 * @param {number} numberOfFulfilledResponses - The number of responses that have been fulfilled.
 * @param {number} totalResponsesToFulfill - The total number of responses that need to be fulfilled.
 * @returns {boolean} - Returns true if the number of fulfilled responses equals the total responses to fulfill, otherwise false.
 */
function checkRequestsAreFulfilled(
  numberOfFulfilledResponses,
  totalResponsesToFulfill
) {
  return numberOfFulfilledResponses === totalResponsesToFulfill;
}

/**
 * Prints each response from the provided array of responses.
 *
 * @param {string[]} responses - An array of response strings to be printed.
 */
function printResponses(responses) {
  responses.forEach((response) => {
    console.log(response);
  });
}
