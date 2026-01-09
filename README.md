
---

# safe-try-with-ai

A lightweight JavaScript utility for **clean error handling** with optional **AI-style runtime suggestions**, without repetitive try/catch blocks.

---

## Installation

```bash
npm install safe-try-with-ai
````

---

## Usage

### Synchronous example

```js
const { safeTry } = require("safe-try-with-ai");

const [err, result] = safeTry(() => JSON.parse('{"x":1}'));

if (err) {
  console.error(err);
} else {
  console.log(result); // { x: 1 }
}
```

---

### Asynchronous example

```js
const { safeTryAsync } = require("safe-try-with-ai");

const [err, data] = await safeTryAsync(async () => {
  return await fetchData();
});

if (err) {
  console.error(err);
}
```

---

## Optional AI Runtime Suggestions

Enable AI-style runtime suggestions by passing `{ analyze: true }` as the second argument.

```js
const { safeTry } = require("safe-try-with-ai");

const [err] = safeTry(() => JSON.parse("invalid"), { analyze: true });

if (err) {
  console.error("Error:", err.message);
  console.log("Suggestion:", err.suggestion);
  console.log("Fix:", err.fix);
}
```

> AI-style suggestions are **rule-based and local**.
> No real AI model, no network calls, no data collection.

---

## Default Fallback Value

Use `safeTryDefault` to return a fallback value when an error occurs.

```js
const { safeTryDefault } = require("safe-try-with-ai");

const result = safeTryDefault(
  () => JSON.parse("invalid"),
  {},
  { analyze: true }
);

console.log(result); // {}
```

---

## Safe JSON Parsing

```js
const { safeTryJson } = require("safe-try-with-ai");

const [err, data] = safeTryJson('{"x":1}', { analyze: true });

if (err) {
  console.error(err);
}
```

---

## CLI Usage

Validate JSON files from the terminal:

```bash
npx safe-try-with-ai example.json
npx safe-try-with-ai example.json --analyze
```

### Pipe JSON via stdin

```bash
cat example.json | npx safe-try-with-ai --stdin
cat bad.json | npx safe-try-with-ai --stdin --analyze
```

### CLI Output Legend

* ✔ JSON valid (green)
* ✖ JSON invalid (red)
* Suggestions (blue)
* Fix (green)

### Exit Codes

* `0` = valid JSON
* `1` = invalid JSON or runtime error

---

## TypeScript Support

Built-in TypeScript definitions included:

```ts
import { safeTry } from "safe-try-with-ai";

const [err, result] = safeTry(() => JSON.parse(data));
```

No configuration required.

---

## Features

* Works with synchronous and asynchronous functions
* Eliminates repetitive try/catch blocks
* Optional AI-style runtime suggestions
* Default fallback handling
* Safe JSON parsing helper
* CLI support via `npx` and `--stdin`
* Built-in TypeScript definitions
* Zero dependencies
* Lightweight and fast

---

## Changelog

### v1.5.0

* Added `--stdin` support for piping JSON to CLI
* CLI improvements for clearer output with colors and symbols

### v1.4.0

* Enhanced CLI with colors and symbols for valid/invalid JSON
* Improved AI-style suggestions formatting

### v1.3.2

* Bug fixes and small improvements

### v1.3.1

* Minor CLI fixes

### v1.3.0

* Added TypeScript definitions
* Added CLI support
* Documentation improvements

### v1.2.0

* Added `safeTryDefault`
* Added `safeTryJson`
* Improved AI-style suggestions

### v1.1.1

* Improved JSON error suggestions

---

## License

MIT

```

---



