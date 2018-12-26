const assert = require('assert');
const { contentCount } = require('../src/lib.js');

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
        let expectedOutput = new Array(7).fill(" ").join('') + 4;
         expectedOutput += new Array(7).fill(" ").join('') + 5;
         expectedOutput += new Array(7).fill(" ").join('') + 9;
         expectedOutput += " " + "alphabets";
        assert.equal(contentCount("alphabets", fs), expectedOutput); 
    })

    it('should return every content count 0 and filename for empty file', () => {
        let expectedOutput = new Array(7).fill(" ").join('') + 0;
         expectedOutput += new Array(7).fill(" ").join('') + 0;
         expectedOutput += new Array(7).fill(" ").join('') + 0;
         expectedOutput += " " + "empty";
        assert.equal(contentCount("empty", fs), expectedOutput); 
    })
})