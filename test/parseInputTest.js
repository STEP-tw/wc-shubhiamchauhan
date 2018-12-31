const assert = require("assert");
const { parse } = require("../src/parseInput");

describe("parse", function() {
  it("should return all options and files in an object for only files list", () => {
    const actualOutput = parse(["alphabets", "numbers"]);
    const exceptedOutput = {
      options: ["lineCount", "wordCount", "byteCount"],
      files: ["alphabets", "numbers"]
    };
    assert.deepEqual(actualOutput, exceptedOutput);
  });

  it("should return only lineCount option and files in an object for only files list", () => {
    const actualOutput = parse(["-l", "alphabets", "numbers"]);
    const exceptedOutput = {
      options: ["lineCount"],
      files: ["alphabets", "numbers"]
    };
    assert.deepEqual(actualOutput, exceptedOutput);
  });

  it("should return only wordCount option and files in an object for only files list", () => {
    const actualOutput = parse(["-w", "alphabets", "numbers"]);
    const exceptedOutput = {
      options: ["wordCount"],
      files: ["alphabets", "numbers"]
    };
    assert.deepEqual(actualOutput, exceptedOutput);
  });

  it("should return only byteCount option and files in an object for only files list", () => {
    const actualOutput = parse(["-c", "alphabets", "numbers"]);
    const exceptedOutput = {
      options: ["byteCount"],
      files: ["alphabets", "numbers"]
    };
    assert.deepEqual(actualOutput, exceptedOutput);
  });

  it("should return hasError and option error message an object for invalid option", () => {
    const actualOutput = parse(["-n", "alphabets", "numbers"]);
    const exceptedOutput = {
      hasError: true,
      message: "wc: illegal option -- n\nusage: wc [-clmw] [file ...]"
    };
    assert.deepEqual(actualOutput, exceptedOutput);
  });
});
