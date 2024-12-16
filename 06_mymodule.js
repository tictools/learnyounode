const fs = require("node:fs");
const path = require("node:path");

function filterBy(formattedExtension) {
  return function (file) {
    const currentFileExtension = path.extname(file);
    return currentFileExtension === formattedExtension;
  };
}

function myModule(dirPath, extension, callback) {
  const formattedExtension = `.${extension}`;

  fs.readdir(dirPath, { encoding: "utf-8" }, function (error, files) {
    if (error) {
      return callback(error);
    }

    const filteredFilesByEstension = files.filter(filterBy(formattedExtension));

    callback(null, filteredFilesByEstension);
  });
}

module.exports = myModule;
