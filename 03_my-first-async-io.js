const fs = require("fs");
const path = require("path");

countNumberOfNewLinesASync = () => {
  const filePath = process.argv[2];

  fs.readFile(filePath, { encoding: "utf-8" }, function (error, content) {
    if (error) throw new Error(error);

    console.log(content.split("\n").length - 1);
  });
};

countNumberOfNewLinesASync();
