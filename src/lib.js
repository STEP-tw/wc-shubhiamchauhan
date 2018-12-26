class Contents {
    constructor(contents) {
        this.contents = contents;
    }

    getLineCount() {
        return this.contents.split('\n').length - 1;
    }

    getEachLineWordCount (count, line) {
        return count + line.split(' ').filter(word => word != "").length
    }

    getWordCount() {
        const lines = this.contents.trim().split('\n');
        return lines.reduce(this.getEachLineWordCount, 0);
    }

    getByteCount() {
        return this.contents.length;
    }
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
    const fileContents = fs.readFileSync(file, "utf8")
    const contents = new Contents(fileContents, fs);
    const lineCount = contents.getLineCount();
    const wordCount = contents.getWordCount();
    const byteCount = contents.getByteCount();
    return formatOutput({ lineCount, wordCount, byteCount }, file);
}

module.exports = { contentCount };