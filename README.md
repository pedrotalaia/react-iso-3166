# iso2to3

Tiny ISO 3166-1 alpha-2 ↔ alpha-3 ↔ numeric code converter with smart aliases, powered by the official ISO CSV.

## Features
- Fast lookups between ISO 3166-1 alpha-2, alpha-3, and numeric codes
- Handles common aliases (e.g., UK → GBR, XK → XKX, EL → GRC)
- Auto-generated from the official ISO CSV for accuracy
- ESM and CJS support

## Install
```sh
npm install iso2to3
```

## Usage
```js
import { toISO3, toISO2, ISO2_TO_3, ISO2_TO_N3, N3_TO_2 } from 'iso2to3';

toISO3('pt'); // 'PRT'
toISO2('FRA'); // 'FR'
ISO2_TO_N3['FR']; // '250'
N3_TO_2['250']; // 'FR'
```

## CLI Generation
If you want to update the mappings:
```sh
node scripts/generate-from-csv.mjs
```

## License
MIT
