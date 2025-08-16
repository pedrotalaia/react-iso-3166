const test = require("node:test");
const assert = require("node:assert/strict");
let mod;

try {
    mod = require("../dist/index.cjs");
} catch (e) {
    // If build isn't present, skip the CJS suite.
    test("CJS build missing — skipping CJS tests", (t) => {
        t.skip("dist/index.cjs not found");
    });
    return;
}

const { toISO3, toISO2, mustISO3, mustISO2, ISO2_TO_DIAL, DIAL_TO_2 } = mod;

test("CJS: maps ISO-2 to ISO-3", (t) => {
    assert.equal(toISO3("us"), "USA");
    assert.equal(toISO3("PT"), "PRT");
    t.diagnostic("PASS: CJS maps ISO-2 to ISO-3 (us->USA, PT->PRT)");
});

test("CJS: maps ISO-3 to ISO-2", (t) => {
    assert.equal(toISO2("DEU"), "DE");
    t.diagnostic("PASS: CJS maps ISO-3 to ISO-2 (DEU->DE)");
});

test("CJS: aliases", (t) => {
    assert.equal(toISO3("uk"), "GBR");
    assert.equal(toISO3("xk"), "XKX");
    t.diagnostic("PASS: CJS aliases (uk->GBR, xk->XKX)");
});

test("CJS: strict throw", (t) => {
    assert.throws(() => mustISO3("??"));
    assert.throws(() => mustISO2("???"));
    t.diagnostic("PASS: CJS strict throw for unknown codes");
});

test("CJS: dial codes mapping", (t) => {
    assert.equal(ISO2_TO_DIAL.US, "1");
    assert.equal(ISO2_TO_DIAL.GB, "44");
    assert.equal(ISO2_TO_DIAL.UK, "44");
    assert.equal(ISO2_TO_DIAL.BS, "1-242");
    assert.equal(DIAL_TO_2["1-242"], "BS");
    assert.equal(DIAL_TO_2["44"], "GB");
    t.diagnostic("PASS: CJS dial codes (US->1, GB/UK->44, 1-242->BS, 44->GB)");
});