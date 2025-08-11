# React ISO 3166

Tiny ISO 3166-1 alpha-2 ↔ alpha-3 ↔ numeric code converter with smart aliases, powered by the official ISO CSV.

## Features

## Install
```sh
npm install react-iso-3166
```

## Usage

```js

## Usage

### Importing

#### ESM (modern Node.js, Vite, etc):
```js
import { toISO3, toISO2, mustISO3, mustISO2, ISO2_TO_3, ISO2_TO_N3, N3_TO_2 } from 'react-iso-3166';
```

#### CommonJS (require):
```js
const { toISO3, toISO2, mustISO3, mustISO2, ISO2_TO_3, ISO2_TO_N3, N3_TO_2 } = require('react-iso-3166');
```

### API

- `toISO3(code)` — Convert ISO alpha-2 or alias to alpha-3. Returns `undefined` if not found.
- `toISO2(code)` — Convert ISO alpha-3 to alpha-2. Returns `undefined` if not found.
- `mustISO3(code)` — Like `toISO3`, but throws if not found.
- `mustISO2(code)` — Like `toISO2`, but throws if not found.
- `ISO2_TO_3` — Object map: alpha-2 → alpha-3 (e.g., `ISO2_TO_3['FR'] // 'FRA'`).
- `ISO2_TO_N3` — Object map: alpha-2 → numeric code (string, e.g., `ISO2_TO_N3['FR'] // '250'`).
- `N3_TO_2` — Object map: numeric code (string) → alpha-2 (e.g., `N3_TO_2['250'] // 'FR'`).

### Examples

```js
import { toISO3, toISO2, mustISO3, mustISO2, ISO2_TO_3, ISO2_TO_N3, N3_TO_2 } from 'react-iso-3166';

import { toISO3, toISO2, ISO2_TO_3, ISO2_TO_N3, N3_TO_2 } from 'react-iso-3166';

toISO3('pt'); // 'PRT'
toISO2('FRA'); // 'FR'
ISO2_TO_3['DE'];  // 'DEU'
ISO2_TO_N3['DE']; // '276'
N3_TO_2['276'];   // 'DE'
```

### Aliases

Some common aliases are supported:
- `'UK'` → `'GBR'` (United Kingdom)
- `'EL'` → `'GRC'` (Greece, EU context)
- `'XK'` → `'XKX'` (Kosovo, user-assigned)

### Updating the Mappings
If you want to update the mappings from the official ISO CSV:
```sh
node scripts/generate-from-csv.mjs
```
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
