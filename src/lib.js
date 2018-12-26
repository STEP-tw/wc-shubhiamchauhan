const getLineCount = function (contents) {
    return contents.split('\n').length - 1;
}

const getEachLineWordCount = function (count, line) {
    return count + line.split(' ').filter(word => word != "").length;
}

const getWordCount = function (contents) {
    const lines = contents.trim().split('\n');
    return lines.reduce(getEachLineWordCount, 0);
}

const getByteCount = function (contents) {
    return contents.length;
}

const justify = (count) => {
    const numOfSpaces = 8 - ("" + count).length;
    const spaces = new Array(numOfSpaces).fill(" ").join('');
    return spaces + count;
}
const formatOutput = function (counts, file) {
    const justifiedCounts = counts.map(count => justify(count));
    return justifiedCounts.join('') + " " + file;
}

const getContentCounts = function(options, fs, file){
    const contents = fs.readFileSync(file, "utf8"); 
    const counter = {
        lineCount: getLineCount,
        wordCount: getWordCount,
        byteCount: getByteCount
    }
    const counts = options.map(type => counter[type](contents));
    return formatOutput(counts, file);
}

const contentCount = function (args, fs) {
    const { options, files } = args;
    const getAllCounts = getContentCounts.bind(null, options, fs);
    return files.map(file => getAllCounts(file)).join('\n');
}

module.exports = {
    contentCount,
    getLineCount,
    getWordCount,
    getByteCount
};