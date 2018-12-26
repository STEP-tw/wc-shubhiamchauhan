const fs = require('fs');
const { contentCount } = require('./src/lib.js');

const main = function() {
  let file = process.argv[2];
  console.log(contentCount(file,fs));
}

main();
