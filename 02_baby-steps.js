const sumArgs = () => {
  const args = process.argv.slice(2)
  let total = 0

  args.forEach(arg => {
    total = total + Number(arg)
  })

  console.log(total)
}

sumArgs()
