# pattern-collector-routesjs-import-extract 🔍

> **A high-performance ESM import statement analyzer that extracts Express router imports specifically from `routes.js` files.**

[![npm version](https://img.shields.io/npm/v/pattern-collector-routesjs-import-extract.svg?style=flat-square&color=38bdf8)](https://www.npmjs.com/package/pattern-collector-routesjs-import-extract)
[![license](https://img.shields.io/npm/l/pattern-collector-routesjs-import-extract.svg?style=flat-square&color=34d399)](LICENSE)

🔗 **Quick Links:**
*   📦 **NPM Registry**: [npmjs.com/package/pattern-collector-routesjs-import-extract](https://www.npmjs.com/package/pattern-collector-routesjs-import-extract)
*   💻 **GitHub Repo**: [github.com/keshavsoft/pattern-collector-routesjs-import-extract](https://github.com/keshavsoft/pattern-collector-routesjs-import-extract)
*   📄 **Interactive Docs**: [keshavsoft.github.io/pattern-collector-routesjs-import-extract](https://keshavsoft.github.io/pattern-collector-routesjs-import-extract/)

---

## 📖 Overview

`pattern-collector-routesjs-import-extract` is a lightweight utility to parse and extract structured information from ESM import statements. It scans file contents and locates named Express router imports structured like:

```javascript
import { router as routerFromv1 } from "./v1/routes.js";
```

> [!IMPORTANT]
> **Parser Regex Contract**
> The current parser is intentionally regex-based. In `bin/v7/index.js`, `parseRegex` captures only named imports with `router as <alias>` from a one-level relative folder path:
>
> ```javascript
> /import\s*\{[^}]*router\s+as\s+(\w+)[^}]*\}\s*from\s*['"]\.\/([^/]+)\/.*['"]/
> ```
>
> This means the import must start with `./`, must include one folder after `./`, and must contain `router as alias` inside `{ ... }`. The parser captures the alias as `variable` and the first folder as `folderName`. Package imports such as `from "express"` are not handled here.

---

## ✨ Features

*   **⚡ Zero Dependencies**: Light, fast, and secure.
*   **📂 Focused Relative Route Extraction**: Extracts router imports pointing to `./<folder>/...`.
*   **📦 ESM Native**: Built for modern ES module environments.
*   **🏷️ Structured Outputs**: Returns variables, folders, line contents, and matching line numbers.

---

## 🚀 Installation

```bash
npm install pattern-collector-routesjs-import-extract
```

---

## 🔗 Dependency Chain

This package depends on the route-import collector below. If parser behavior changes upstream, check this dependency first:

*   [`pattern-collector-routesjs-import`](https://www.npmjs.com/package/pattern-collector-routesjs-import) - listed in [`package.json`](package.json) as `^1.4.7`.

---

## 🛠️ API Reference

### How Matching Works

The collector has two important stages:

1. [`pattern-collector-routesjs-import`](https://www.npmjs.com/package/pattern-collector-routesjs-import) first finds relative import lines.
2. This package then applies `parseRegex` to keep only imports shaped like:

```javascript
import { router as routerFromv1 } from "./v1/routes.js";
import { router as routerFromdoctors } from "./doctors/end-points.js";
```

Both lines match the current v7 parser because the path starts with `./<folder>/`. The filename after that folder is not restricted by `parseRegex`.

These do not match:

```javascript
import express from "express";                         // npm/package import
import routerFromv1 from "./v1/routes.js";             // default import, no router as alias
import { router } from "./v1/routes.js";               // no alias
import { router as routerFromv1 } from "../v1/routes.js"; // starts with ../, not ./
```

### `default(options)`

#### Parameters

An options object containing:

*   **`fileContent`** `(string)`: The raw JavaScript file/code content to analyze.
*   **`inShowLog`** `(boolean)` (optional): Set to `true` to log collected matches to the console.

#### Returns

*   `(Object[])`: An array of matches, where each match has the structure:
    *   `variable` `(string)`: The imported router alias (e.g. `routerFromv1`).
    *   `folderName` `(string)`: The subdirectory name (e.g. `v1`).
    *   `line` `(string)`: The complete matching import line.
    *   `lineNumber` `(number)`: The line number in the source file.

---

## 💻 Usage Example

```javascript
import routeImportExtract from 'pattern-collector-routesjs-import-extract';

const code = `
import express from 'express';

import { router as routerFromv1 } from "./v1/routes.js";
import { router as routerFromv2 } from "./v2/routes.js";
import { router as routerFromdoctors } from "./doctors/end-points.js";
`;

const results = routeImportExtract({
  fileContent: code,
  inShowLog: false
});

console.log(results);
/*
Output:
[
  {
    variable: 'routerFromv1',
    folderName: 'v1',
    line: 'import { router as routerFromv1 } from "./v1/routes.js";',
    lineNumber: 4
  },
  {
    variable: 'routerFromv2',
    folderName: 'v2',
    line: 'import { router as routerFromv2 } from "./v2/routes.js";',
    lineNumber: 5
  },
  {
    variable: 'routerFromdoctors',
    folderName: 'doctors',
    line: 'import { router as routerFromdoctors } from "./doctors/end-points.js";',
    lineNumber: 6
  }
]
*/
```

---

## ⚖️ License

MIT License. Designed with ❤️ by [KeshavSoft](https://github.com/keshavsoft).
