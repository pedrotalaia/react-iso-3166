import test from "node:test";
import assert from "node:assert/strict";
import { toISO3, toISO2, mustISO3, mustISO2 } from "../src/index.js";

test("maps ISO-2 to ISO-3", () => {
    assert.equal(toISO3("us"), "USA");
    assert.equal(toISO3("PT"), "PRT");
});
test("maps ISO-3 to ISO-2", () => {
    assert.equal(toISO2("DEU"), "DE");
});
test("aliases", () => {
    assert.equal(toISO3("uk"), "GBR");
    assert.equal(toISO3("xk"), "XKX");
});
test("strict throw", () => {
    assert.throws(() => mustISO3("??"));
    assert.throws(() => mustISO2("???"));
});