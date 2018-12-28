const fs = require('fs');
const { contentCount } = require('./src/lib.js');
const { parse } = require('./src/parseInput.js');

const main = function () {
  const userArgs = process.argv.slice(2);
  const args = parse(userArgs);
  if (args["hasError"]) {
    console.log(args["message"]);
    return;
  }
  console.log(contentCount(args, fs));
}

main();
