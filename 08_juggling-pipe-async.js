const http = require("node:http");
const bl = require("bl");

const urlsToFetch = process.argv.slice(2);
const totalUrlsToFetch = urlsToFetch.length;

const INITIAL_VALUE = "";
const responses = new Array(totalUrlsToFetch).fill(INITIAL_VALUE);
let fulfilledResponseCounter = 0;

urlsToFetch.forEach((urlToFetch, index) => {
  http.get(urlToFetch, (res) => {
    res.setEncoding("utf-8");
    res.pipe(
      bl((error, data) => {
        if (error) {
          console.error(`🚨 bufferList 🚨`, error.message);
          return;
        }

        updateResponsesBy(index).withData(data);
        fulfilledResponseCounter++;

        const areRequestsfulfilled = checkRequestsAreFulfilled(
          fulfilledResponseCounter,
          totalUrlsToFetch
        );

        if (areRequestsfulfilled) {
          printResponses(responses);
        }
      })
    );
  });
});

/**
 * A handler for updating responses with data.
 *
 * @typedef {Object} ResponseUpdater
 * @property {function(Buffer|string): void} withData - Updates the response at the specified index with the given data.
 */

/**
 * Creates an object with methods to update the response at a specific index.
 *
 * @param {number} index - The index of the response to update.
 * @returns {ResponseUpdater} An object with a method to update the response with data.
 */
function updateResponsesBy(index) {
  function withData(data) {
    responses[index] = data.toString();
  }

  return { withData };
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
