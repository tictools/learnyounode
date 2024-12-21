const http = require("node:http");

const server = http.createServer((_req, res) => {
  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(
    JSON.stringify({
      data: "Hello World!",
    })
  );
});

const PORT = 8080;
server.listen(PORT, function () {
  console.log(`🚀 server running on port ${PORT}`);
});
