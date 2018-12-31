const assert = require('assert');
const {
    contentCount,
    getLineCount,
    getWordCount,
    getByteCount } = require('../src/lib.js');

const mockReader = function (expectedFiles) {
    return function (actualPath) {
        return expectedFiles[actualPath];
    };
};

const mockValidator = function (expectedFiles) {
    return function (actualPath) {
        if (expectedFiles[actualPath] != undefined) {
            return true;
        }
        return false;
    };
};

describe("contentCount", () => {
    let files = {};
    let fs = {};
    let getSpaces;
    beforeEach(() => {
        files.alphabets = "a\nb\nc\nd\ne";
        files.numbers = "1\n2\n3\n4\n5";
        files.empty = "";
        fs.existsSync = mockValidator(files);
        fs.readFileSync = mockReader(files);
        getSpaces = length => new Array(length).fill(" ").join('');
    })
    it('should return number of lines, words and chars with filename', () => {
        let args = { options: ["lineCount", "wordCount", "byteCount"], files: ["alphabets"] }
        let expectedOutput = getSpaces(7) + 4;
        expectedOutput += getSpaces(7) + 5;
        expectedOutput += getSpaces(7) + 9;
        expectedOutput += " " + "alphabets";
        assert.equal(contentCount(args, fs), expectedOutput);
    })

    it('should return every content count 0 and filename for empty file', () => {
        let args = { options: ["lineCount", "wordCount", "byteCount"], files: ["empty"] }
        let expectedOutput = getSpaces(7) + 0;
        expectedOutput += getSpaces(7) + 0;
        expectedOutput += getSpaces(7) + 0;
        expectedOutput += " " + "empty";
        assert.equal(contentCount(args, fs), expectedOutput);
    })

    it('should return number of lines, words and chars with filename for every file', () => {
        let args = { options: ["lineCount", "wordCount", "byteCount"], files: ["alphabets", "numbers"] }
        let expectedOutput = getSpaces(7) + 4;
        expectedOutput += getSpaces(7) + 5;
        expectedOutput += getSpaces(7) + 9;
        expectedOutput += " " + "alphabets" + "\n" + expectedOutput + " " + "numbers";
        expectedOutput += "\n" + getSpaces(7) + 8;
        expectedOutput += getSpaces(6) + 10;
        expectedOutput += getSpaces(6) + 18;
        expectedOutput += " " + "total";
        assert.equal(contentCount(args, fs), expectedOutput);
    })

    it('should return error for non existing file', () => {
        let args = { options: ["lineCount", "wordCount", "byteCount"], files: ["vowels"] }
        let expectedOutput = "wc: vowels: open: No such file or directory";
        assert.equal(contentCount(args, fs), expectedOutput);
    })
})

describe('getLineCount', function () {
    it('should return 0 for empty file', () => {
        const emptyFile = "0";
        assert.equal(getLineCount(emptyFile), 0);
    })

    it('should return 4 for alphbets file', () => {
        const alphabets = "a\nb\nc\nd\ne";
        assert.equal(getLineCount(alphabets), 4);
    })
})

describe('getWordCount', function () {
    it('should return 0 for empty file', () => {
        const emptyFile = "";
        assert.equal(getWordCount(emptyFile), 0);
    })

    it('should return 5 for alphbets file', () => {
        const alphabets = "a\nb\nc\nd\ne";
        assert.equal(getWordCount(alphabets), 5);
    })
})

describe('getByteCount', function () {
    it('should return 0 for empty file', () => {
        const emptyFile = "";
        assert.equal(getByteCount(emptyFile), 0);
    })

    it('should return 9 for alphbets file', () => {
        const alphabets = "a\nb\nc\nd\ne";
        assert.equal(getByteCount(alphabets), 9);
    })
})