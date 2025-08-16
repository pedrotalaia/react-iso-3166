import { ISO2_TO_3, ISO3_TO_2, ISO2_TO_N3, N3_TO_2, ISO2_TO_DIAL, DIAL_TO_2 } from "./data.js";

/** Normalize ' us ' -> 'US' */
const norm = s => (s ?? "").trim().toUpperCase();

/** ISO-2/alias -> ISO-3 (e.g., 'pt' -> 'PRT', 'uk' -> 'GBR') */
export function toISO3(code) {
    return ISO2_TO_3[norm(code)];
}

/** ISO-3 -> ISO-2 (e.g., 'FRA' -> 'FR') */
export function toISO2(code) {
    return ISO3_TO_2[norm(code)];
}

/** Strict variants that throw (handy in pipelines) */
export function mustISO3(code) {
    const out = toISO3(code);
    if (!out) throw new Error(`Unknown ISO-2/alias: ${code}`);
    return out;
}
export function mustISO2(code) {
    const out = toISO2(code);
    if (!out) throw new Error(`Unknown ISO-3: ${code}`);
    return out;
}


// Also export the maps for power users
export { ISO2_TO_3, ISO3_TO_2, ISO2_TO_N3, N3_TO_2, ISO2_TO_DIAL, DIAL_TO_2 };