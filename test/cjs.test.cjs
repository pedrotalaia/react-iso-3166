const test = require("node:test");
const assert = require("node:assert/strict");
const { toISO3, toISO2 } = require("../dist/index.cjs");

test("CJS require works", () => {
    assert.equal(toISO2("DEU"), "DE");
    assert.equal(toISO3("US"), "USA");
});