const myModule = require("./06_mymodule");

function callback(error, files) {
  if (error) {
    return console.error("There was an error:", err);
  }

  files.forEach(function (file) {
    console.log(file);
  });
}

//main
const dirPath = process.argv[2];
const extension = process.argv[3];

myModule(dirPath, extension, callback);
