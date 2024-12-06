const sumArgs = () => {
  let total = 0;

  const args = process.argv.slice(2);
  const argsLength = args.length;

  for (let index = 0; index < argsLength; index++) {
    total += parseInt(args[index], 10);
  }

  return total;
};

console.log(sumArgs());
