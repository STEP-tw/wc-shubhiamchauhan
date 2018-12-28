const wholeOptions = { "l": "lineCount", "w": "wordCount", "c": "byteCount" };
const usage = "usage: wc [-clmw] [file ...]";

const optionError = function (option) {
  return "wc: illegal option -- " + option + "\n" + usage;
}

const getError = function (options) {
  const hasError = options.some(option =>
    !Object.keys(wholeOptions).includes(option)
  );
  const wrongOption = options.filter(option =>
    !Object.keys(wholeOptions).includes(option)
  ).shift();
  const message = optionError(wrongOption);
  return { message, hasError };
}

module.exports = { getError };