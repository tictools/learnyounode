const fs = require("node:fs");
const path = require("node:path");

const filterFilesByExtension = () => {
  const dirPath = process.argv[2];
  const extension = `.${process.argv[3]}`;

  fs.readdir(dirPath, { encoding: "utf-8" }, function (error, files) {
    if (error) throw new Error(error);

    files.forEach((file) => {
      const currentFileExtension = path.extname(file);

      if (currentFileExtension === extension) {
        console.log(file);
      }
    });
  });
};

filterFilesByExtension();
