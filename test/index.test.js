import test from "node:test";
import assert from "node:assert/strict";
import { toISO3, toISO2, mustISO3, mustISO2, ISO2_TO_DIAL, DIAL_TO_2 } from "../src/index.js";

test("maps ISO-2 to ISO-3", (t) => {
    assert.equal(toISO3("us"), "USA");
    assert.equal(toISO3("PT"), "PRT");
    t.diagnostic("PASS: maps ISO-2 to ISO-3 (us->USA, PT->PRT)");
});
test("maps ISO-3 to ISO-2", (t) => {
    assert.equal(toISO2("DEU"), "DE");
    t.diagnostic("PASS: maps ISO-3 to ISO-2 (DEU->DE)");
});
test("aliases", (t) => {
    assert.equal(toISO3("uk"), "GBR");
    assert.equal(toISO3("xk"), "XKX");
    t.diagnostic("PASS: aliases (uk->GBR, xk->XKX)");
});
test("strict throw", (t) => {
    assert.throws(() => mustISO3("??"));
    assert.throws(() => mustISO2("???"));
    t.diagnostic("PASS: strict throw for unknown codes");
});

test("dial codes mapping", (t) => {
    // Spot checks based on CSV
    assert.equal(ISO2_TO_DIAL.US, "1");
    assert.equal(ISO2_TO_DIAL.GB, "44");
    assert.equal(ISO2_TO_DIAL.UK, "44");
    assert.equal(ISO2_TO_DIAL.BS, "1-242");
    assert.equal(DIAL_TO_2["1-242"], "BS");
    assert.equal(DIAL_TO_2["44"], "GB");
    t.diagnostic("PASS: dial codes (US->1, GB/UK->44, 1-242->BS, 44->GB)");
});