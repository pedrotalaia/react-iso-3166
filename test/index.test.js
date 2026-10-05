import test from "node:test";
import assert from "node:assert/strict";
import {
    toISO3,
    toISO2,
    mustISO3,
    mustISO2,
    ISO2_TO_DIAL,
    DIAL_TO_2,
    ISO2_TO_3,
    ISO3_TO_2,
    ISO2_TO_N3,
    N3_TO_2
} from "../src/index.js";

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

test("countries with commas in their CSV name", (t) => {
    assert.deepEqual([ISO2_TO_3.PS, ISO2_TO_N3.PS, ISO2_TO_DIAL.PS], ["PSE", "275", "970"]);
    assert.deepEqual([ISO2_TO_3.SH, ISO2_TO_N3.SH, ISO2_TO_DIAL.SH], ["SHN", "654", "290"]);
    assert.deepEqual([ISO2_TO_3.TZ, ISO2_TO_N3.TZ, ISO2_TO_DIAL.TZ], ["TZA", "834", "255"]);
    t.diagnostic("PASS: PS, SH, TZ present");
});

test("reverse lookups return canonical codes, not aliases", (t) => {
    assert.equal(toISO2("GBR"), "GB");
    assert.equal(toISO2("GRC"), "GR");
    assert.equal(N3_TO_2["826"], "GB");
    assert.equal(N3_TO_2["300"], "GR");
    t.diagnostic("PASS: GBR->GB, GRC->GR, 826->GB, 300->GR");
});

test("every code round-trips", (t) => {
    const codes = Object.keys(ISO2_TO_3).filter(a2 => a2 !== "UK" && a2 !== "EL");
    assert.equal(codes.length, 250); // 249 ISO 3166-1 codes + XK
    for (const a2 of codes) {
        assert.equal(ISO3_TO_2[ISO2_TO_3[a2]], a2, `alpha-3 round-trip for ${a2}`);
        assert.equal(N3_TO_2[ISO2_TO_N3[a2]], a2, `numeric round-trip for ${a2}`);
    }
    t.diagnostic("PASS: alpha-3 and numeric round-trip for all 250 codes");
});

test("dial codes", (t) => {
    assert.equal(ISO2_TO_DIAL.MK, "389");
    assert.equal(DIAL_TO_2["389"], "MK");
    assert.equal(DIAL_TO_2["380"], "UA");
    // Shared codes resolve to the main country
    const shared = { "1": "US", "7": "RU", "47": "NO", "61": "AU", "64": "NZ", "212": "MA",
        "262": "RE", "358": "FI", "500": "FK", "590": "GP", "599": "CW", "672": "NF" };
    for (const [dial, a2] of Object.entries(shared)) assert.equal(DIAL_TO_2[dial], a2, `dial ${dial}`);
    t.diagnostic("PASS: MK->389, shared dial codes resolve to the main country");
});

test("slice of dataset output", (t) => {
    const slice = Object.entries(ISO2_TO_3)
        .slice(0, 5)
        .map(([a2, a3]) => ({
            a2,
            a3,
            n3: ISO2_TO_N3[a2] || "",
            dial: ISO2_TO_DIAL[a2] ? `+${ISO2_TO_DIAL[a2]}` : ""
        }));
    t.diagnostic(`Slice: ${JSON.stringify(slice, null, 2)}`);
});