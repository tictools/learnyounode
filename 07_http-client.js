const http = require("node:http");

//main
const defaultUrlToFetch = "http://localhost:8080";
const urlToFetch = process.argv[2] ?? defaultUrlToFetch;

http.get(urlToFetch, responseController).on("error", logError);

/**
 *
 * @param {http.IncomingMessage} res
 * @returns {http.ClientRequest}
 */
function responseController(res) {
  const { statusCode } = res;

  if (statusCode !== 200) {
    const error = new Error(`failed resquest with status code ${statusCode}`);
    logError(error);

    res.resume();
    return;
  }

  let stream = [];

  res.setEncoding("utf-8");
  res.on("data", (chunk) => stream.push(chunk));
  res.on("end", () => {
    try {
      stream.forEach((item) => console.log(item));
    } catch (error) {
      logError(error);
    }
  });
}

/**
 *
 * @param {Error} error
 * @returns {void}
 */
function logError(error) {
  console.log(`🚨 ${error.message}`);
}
