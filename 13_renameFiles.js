const fs = require("node:fs");
const path = require("node:path");

const dirName = process.cwd();

fs.readdir(dirName, (error, files) => {
  if (error) {
    console.log(`Error: ${error.message}`);
  }

  const oldAllowedPaths = files.filter((file) => path.extname(file) === ".js");

  oldAllowedPaths.forEach((oldPath) => {
    const [oldIndex, restOfThePath] = oldPath.split("_");

    const newPath = (Number(oldIndex) - 1)
      .toString()
      .padStart(2, "0")
      .concat("_")
      .concat(restOfThePath);

    console.log(`🚀 `);

    fs.rename(oldPath, newPath, (error) => {
      if (error) console.log("File renamed successfully");
    });
  });
});
