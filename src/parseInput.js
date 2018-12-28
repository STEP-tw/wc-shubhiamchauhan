const { getError } = require('./error.js');

const wholeOptions = { "l": "lineCount", "w": "wordCount", "c": "byteCount" };

const organizeOptions = function (options) {
    const symbols = Object.keys(wholeOptions).filter(option =>
        options.includes(option)
    );
    return symbols.map(symbol => wholeOptions[symbol]);
}

const parse = function (args) {
    let index = 0;
    let options = [];
    while (args[index].startsWith('-')) {
        let option = args[index].slice(1).split("");
        let { message, hasError } = getError(option);
        if (hasError) return { hasError, message };
        options = options.concat(option);
        index++;
    }
    if (options.length == 0) options = ["l", "w", "c"];
    return { options: organizeOptions(options), files: args.slice(index) };
}

exports.parse = parse;