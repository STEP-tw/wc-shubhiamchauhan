const assert = require('assert');
const { contentCount } = require('../src/lib.js');

const mockReader = function (expectedFiles) {
    return function (actualPath) {
        return expectedFiles[actualPath];
    };
};

describe("contentCount", () => {
    it('should return number of lines, words and chars with filename', () => {
        const file = { alphabets:"a\nb\nc\nd\ne" };
        let fs = { readFileSync: mockReader(file)};
        let expectedOutput = new Array(7).fill(" ").join('') + 5;
         expectedOutput += new Array(7).fill(" ").join('') + 5;
         expectedOutput += new Array(7).fill(" ").join('') + 9;
         expectedOutput += " " + "alphabets";
        assert.equal(contentCount("alphabets", fs), expectedOutput); 
    })
})