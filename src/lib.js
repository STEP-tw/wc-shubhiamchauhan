const NEWLINE = "\n";
const SPACE = " ";

const addSameIndexValues = function (firstList, secondList) {
    const sum = [];
    for (let index in firstList) {
        sum[index] = firstList[index] + secondList[index];
    }
    return sum;
}

const getLineCount = function (contents) {
    return contents.split(NEWLINE).length - 1;
}

const getEachLineWordCount = function (count, line) {
    return count + line.split(SPACE).filter(word => word != "").length;
}

const getWordCount = function (contents) {
    const lines = contents.trim().split(NEWLINE);
    return lines.reduce(getEachLineWordCount, 0);
}

const getByteCount = function (contents) {
    return contents.length;
}

const justify = (count) => {
    const numOfSpaces = 8 - ("" + count).length;
    const spaces = new Array(numOfSpaces).fill(SPACE).join('');
    return spaces + count;
}

const formatOutput = function ({ counts, file }) {
    const justifiedCounts = counts.map(count => justify(count));
    return justifiedCounts.join('') + SPACE + file;
}

const getContentCounts = function (options, fs, file) {
    if (!fs.existsSync(file)) {
        return { isNotExists: true, message: getErrorMessage(file) };
    }
    const contents = fs.readFileSync(file, "utf8");
    const counter = {
        lineCount: getLineCount,
        wordCount: getWordCount,
        byteCount: getByteCount
    }
    const counts = options.map(type => counter[type](contents));
    return { counts, file };
}

const multipleFileFormatter = function (countsAndFilenames, options) {
    const length = options.length;
    const total = new Array(length).fill(0);
    const totalCount = countsAndFilenames.reduce((total, countsAndFilename) => {
        if (countsAndFilename.isNotExists) return total;
        return addSameIndexValues(total, countsAndFilename.counts);
    }, total);
    const totalContents = { counts: totalCount, file: "total" };
    return countsAndFilenames.concat(totalContents).map(countsAndFile => {
        if (countsAndFile.isNotExists) return countsAndFile.message;
        return formatOutput(countsAndFile);
    });
}

const getErrorMessage = function (file) {
    return "wc: " + file + ": open: No such file or directory";
}

const singleFileFormatter = function (file, options, fs) {
    if (!fs.existsSync(file)) return getErrorMessage(file);
    return formatOutput(getContentCounts(options, fs, file));
}

const contentCount = function (args, fs) {
    const { options, files } = args;
    if (files.length < 2) return singleFileFormatter(files[0], options, fs);
    const getAllCounts = getContentCounts.bind(null, options, fs);
    const result = files.map(file => getAllCounts(file));
    return multipleFileFormatter(result, options).join(NEWLINE);
}

module.exports = {
    contentCount,
    getLineCount,
    getWordCount,
    getByteCount
};