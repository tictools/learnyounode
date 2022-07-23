const sumArgs = () => {
  const args = process.argv.slice(2)
  let total = 0

  args.forEach(arg => {
    total = total + parseInt(arg, 10)
  })

  console.log(total)
}

sumArgs()
