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
    const contents = fs.readFileSync(file, "utf8");
    const counter = {
        lineCount: getLineCount,
        wordCount: getWordCount,
        byteCount: getByteCount
    }
    const counts = options.map(type => counter[type](contents));
    return { counts, file };
}

const multipleFileFormatter = function (countsAndFilenames) {
    const length = countsAndFilenames[0].counts.length;
    const total = new Array(length).fill(0);
    const totalCount = countsAndFilenames.reduce((total, { counts }) => {
        return addSameIndexValues(total, counts);
    }, total);
    const totalContents = { counts: totalCount, file: "total" };
    return countsAndFilenames.concat(totalContents).map(countsAndfile =>
        formatOutput(countsAndfile)
    );
}

const singleFileFormatter = function (countsAndFilenames) {
    return countsAndFilenames.map(data => formatOutput(data));
}

const contentCount = function (args, fs) {
    const { options, files } = args;
    let formatter = multipleFileFormatter;
    if (files.length < 2) formatter = singleFileFormatter;
    const getAllCounts = getContentCounts.bind(null, options, fs);
    const result = files.map(file => getAllCounts(file));
    return formatter(result).join(NEWLINE);
}

module.exports = {
    contentCount,
    getLineCount,
    getWordCount,
    getByteCount
};