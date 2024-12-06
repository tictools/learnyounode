const fs = require("node:fs");
const path = require("node:path");

const filterFilesByExtension = () => {
  const dirPath = process.argv[2];
  const extension = process.argv[3];

  const files = fs.readdir(
    dirPath,
    { encoding: "utf-8" },
    function (error, files) {
      if (error) throw new Error(error);

      const filteredFiles = files.filter((file) => {
        const currentFileExtension = path.extname(file).split(".").at(-1);
        return currentFileExtension === extension;
      });

      console.log(filteredFiles.join("\n"));
    }
  );
};

filterFilesByExtension();
