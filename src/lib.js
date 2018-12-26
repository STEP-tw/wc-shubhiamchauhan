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


const formatOutput = function (counts, file) {
    const { lineCount, wordCount, byteCount } = counts;
    const noOfLineCountSpaces = 8 - ("" + lineCount).length;
    const noOfWordCountSpaces = 8 - ("" + wordCount).length;
    const noOfByteCountSpaces = 8 - ("" + byteCount).length;
    const lineCountSpaces = new Array(noOfLineCountSpaces).fill(" ").join('');
    const wordCountSpaces = new Array(noOfWordCountSpaces).fill(" ").join('');
    const byteCountSpaces = new Array(noOfByteCountSpaces).fill(" ").join('');
    let result = lineCountSpaces + lineCount + wordCountSpaces + wordCount;
    return result + byteCountSpaces + byteCount + " " + file;
}

const contentCount = function (file, fs) {
    const fileContents = fs.readFileSync(file, "utf8");
    const lineCount = getLineCount(fileContents);
    const wordCount = getWordCount(fileContents);
    const byteCount = getByteCount(fileContents);
    return formatOutput({ lineCount, wordCount, byteCount }, file);
}

module.exports = {
    contentCount,
    getLineCount,
    getWordCount,
    getByteCount
};