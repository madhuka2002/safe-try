# safe-try-with-ai

A lightweight JavaScript utility for **clean error handling** with optional **AI-style runtime suggestions**, without repetitive try/catch blocks.

---

## Installation

```bash
npm install safe-try-with-ai


## Usage

### Synchronous example

```js
const { safeTry } = require("safe-try-with-ai");

const [err, result] = safeTry(() => JSON.parse('{"x":1}'));

if (err) {
  console.error(err); // Original error
} else {
  console.log(result); // { x: 1 }
}

## Optional AI Runtime Suggestions

Enable AI-style runtime suggestions by passing `{ analyze: true }` as the second argument.

### Synchronous example

```js
const [err, result] = safeTry(() => JSON.parse("invalid"), { analyze: true });

if (err) {
  console.error("Error:", err.message);       // Original error
  console.log("Suggestion:", err.suggestion); // AI suggestion
  console.log("Fix:", err.fix);               // Suggested fix
}

## Features

- Works with synchronous and asynchronous functions  
- Eliminates repetitive try/catch blocks  
- Optional AI-style runtime error suggestions  
- Zero dependencies  
- Lightweight and fast
