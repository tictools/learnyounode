const fs = require("node:fs");
const http = require("node:http");

//main
const [PORT, pathFile] = process.argv.slice(2);

http
  .createServer((_req, res) => {
    res.writeHead(200, { "content-type": "text/plain" });

    fs.createReadStream(pathFile, { encoding: "utf-8" })
      .pipe(res)
      .on("error", (error) => {
        res.statusCode = 500;
        res.end(`Error reading file: ${error.message}`);
      });
  })
  .listen(PORT, () => {
    console.log(`🚀 server running at port ${PORT}`);
  })
  .on("error", (err) => {
    console.error("Error starting server:", err);
  });
