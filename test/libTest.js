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

describe("contentCount", () => {
    let files = {};
    let fs = {};
    beforeEach(() => {
        files.alphabets = "a\nb\nc\nd\ne";
        files.numbers = "1\nb\nc\nd\ne";
        files.empty = "";
        fs.readFileSync = mockReader(files);
    })
    it('should return number of lines, words and chars with filename', () => {
        let args = { options:["lineCount", "wordCount", "byteCount"], files:["alphabets"] }
        let expectedOutput = new Array(7).fill(" ").join('') + 4;
        expectedOutput += new Array(7).fill(" ").join('') + 5;
        expectedOutput += new Array(7).fill(" ").join('') + 9;
        expectedOutput += " " + "alphabets";
        assert.equal(contentCount(args, fs), expectedOutput);
    })
    
    it('should return every content count 0 and filename for empty file', () => {
        let args = { options:["lineCount", "wordCount", "byteCount"], files:["empty"] }
        let expectedOutput = new Array(7).fill(" ").join('') + 0;
        expectedOutput += new Array(7).fill(" ").join('') + 0;
        expectedOutput += new Array(7).fill(" ").join('') + 0;
        expectedOutput += " " + "empty";
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