const http = require("node:http");

//main
const PORT = process.argv[2];

http
  .createServer((req, res) => {
    if (isPostMethod(req.method)) {
      let body = "";

      req
        .on("data", (chunk) => {
          body += chunk.toString();
        })
        .on("end", () => {
          res
            .writeHead(200, { "content-type": "text/plain" })
            .end(body.toUpperCase());
        })
        .on("error", (err) => {
          console.error("Error receiving data:", err);
          res.statusCode = 500;
          res.end("Internal Server Error");
        });
    }
  })
  .listen(PORT, () => {
    console.log(`🚀 server running on port ${PORT}`);
  })
  .on("error", (err) => {
    console.error("Error starting server:", err);
  });

const HTTP_METHOD = {
  POST: "POST",
};

/**
 * Checks if the given HTTP method is a POST request.
 *
 * @param {string} method - The HTTP method to check.
 * @returns {boolean} True if the method is POST, otherwise false.
 */
const isPostMethod = (method) => method === HTTP_METHOD.POST;
