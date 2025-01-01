const fs = require("node:fs");

const countNumberOfNewLinesSync = () => {
  const filePath = process.argv[2];

  const content = fs.readFileSync(filePath, { encoding: "utf8" });

  return content.split("\n").length - 1;
};

console.log(countNumberOfNewLinesSync());
