const assert = require("assert");
const { getError } = require("../src/errorLib.js");

describe("getError", function() {
  it("should return hasError true and error message in an object for invalid option", () => {
    const excpectedOutput = {
      hasError: true,
      message: "wc: illegal option -- n\nusage: wc [-clmw] [file ...]"
    };
    assert.deepEqual(getError(["l", "c", "n"]), excpectedOutput);
  });

  it("should return hasError false in an object for valid option", () => {
    const excpectedOutput = {
      hasError: false,
      message: "wc: illegal option -- undefined\nusage: wc [-clmw] [file ...]"
    };
    assert.deepEqual(getError(["l", "c", "w"]), excpectedOutput);
  });
});
