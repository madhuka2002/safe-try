#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const { safeTryJson } = require("../src/index.js");

/* ANSI colors (NO dependencies) */
const COLORS = {
    reset: "\x1b[0m",
    red: "\x1b[31m",
    green: "\x1b[32m",
    blue: "\x1b[34m",
    white: "\x1b[37m"
};

const SYMBOLS = {
    success: "✔",
    error: "✖",
    info: "ℹ"
};

const green = (t) => COLORS.green + t + COLORS.reset;
const red = (t) => COLORS.red + t + COLORS.reset;
const blue = (t) => COLORS.blue + t + COLORS.reset;
const white = (t) => COLORS.white + t + COLORS.reset;

/* CLI args */
const args = process.argv.slice(2);

if (args.length === 0) {
    console.log(red(`${SYMBOLS.error} No file specified`));
    console.log("Usage: safe-try-with-ai <file.json> [--analyze]");
    process.exit(1);
}

const filePath = path.resolve(args[0]);
const analyze = args.includes("--analyze");

/* Read file */
let jsonText;
try {
    jsonText = fs.readFileSync(filePath, "utf8");
} catch (e) {
    console.log(red(`${SYMBOLS.error} Cannot read file`));
    console.log(white(`  └─ ${e.message}`));
    process.exit(1);
}

/* Validate JSON */
const [err] = safeTryJson(jsonText, { analyze });

if (err) {
    console.log(red(`${SYMBOLS.error} Invalid JSON`));
    console.log(white(`  └─ Error: ${err.message}`));

    if (analyze && err.suggestion) {
        console.log(blue(`  ├─ Suggestion: ${err.suggestion}`));
        if (err.fix) {
            console.log(green(`  └─ Fix: ${err.fix}`));
        }
    }

    process.exit(1);
}

console.log(green(`${SYMBOLS.success} JSON is valid`));
process.exit(0);