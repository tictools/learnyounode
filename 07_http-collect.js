const http = require("node:http");
const bl = require("bl");

//main
const defaultUrlToFetch = "http://localhost:8080";
const urlToFetch = process.argv[2] ?? defaultUrlToFetch;

http
  .get(urlToFetch, (res) => {
    let stream = "";

    res
      .pipe(
        bl((error, data) => {
          if (error) {
            console.error(`🚨 bufferList 🚨`, error.message);
            return;
          }
          stream = data.toString();
        })
      )
      .on("error", (error) => {
        console.error(`🚨 pipe 🚨`, error.message);
      });

    res.on("end", () => {
      console.log(stream.split("").length);
      console.log(stream);
    });
  })
  .on("error", (error) => {
    console.error(`🚨 res 🚨`, error.message);
  });
