const fs = require('fs')

const countNumberOfNewLines = () => {
  const filePath = process.argv[2]
  const splitText = fs
    .readFileSync(filePath, { encoding: 'utf8' })
    .split('\n')

  // console.log(splitText)

  return splitText.length - 1
}

console.log(countNumberOfNewLines())
