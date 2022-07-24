const fs = require('fs/promises')
const path = require('path')
const isLearnYouNodeEnv = true


const readAsyncNumberOfNewLines = () => {
  const filePath = isLearnYouNodeEnv ? process.argv[2] : path.resolve('./first-io.txt')

  fs.readFile(filePath, 'utf8')
    .then(data => {
      const lines = data.split('\n').length - 1
      console.log(lines)
    })
    .catch(console.log)
}


const readAsyncAwaitNumberOfNewLines = async () => {
  const filePath = isLearnYouNodeEnv ? process.argv[2] : path.resolve('./first-io.txt')

  try {
    const data = await fs.readFile(filePath, 'utf8')
    const lines = data.split('\n').length - 1
    console.log(lines)
  } catch (error) {
    (console.log(error))
  }
}

readAsyncAwaitNumberOfNewLines()