const wholeOptions = { "l": "lineCount", "w": "wordCount", "c": "byteCount" };
const usage = "usage: wc [-clmw] [file ...]";

const organizeOptions = function (options) {
    let symbols = Object.keys(wholeOptions).filter(option =>
        options.includes(option)
    );
    return symbols.map(symbol => wholeOptions[symbol]);
}

const optionError = function (option) {
    return "wc: illegal option -- " + option + "\n" + usage;
}

const getError = function (options) {
    const message = options.some(option => !Object.keys(wholeOptions).includes(option));
    const wrongOption = options.filter(option => !Object.keys(wholeOptions).includes(option))[0];
    return { message, wrongOption };
}

const parse = function (args) {
    let index = 0;
    let options = [];
    while (args[index].startsWith('-')) {
        let option = args[index].slice(1).split("");
        let { message, wrongOption } = getError(option);
        if (message) {
            return { hasError: true, message: optionError(wrongOption) };
        }
        options = options.concat(option);
        index++;
    }
    if(options.length == 0) options = ["l", "w", "c"];
    return { options: organizeOptions(options), files: args.slice(index) };
}

exports.parse = parse;