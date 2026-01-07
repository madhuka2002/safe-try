#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const { safeTryJson } = require("../src/index.js");

// ANSI color codes
const COLORS = {
    reset: "\x1b[0m",
    green: "\x1b[32m",
    red: "\x1b[31m",
    blue: "\x1b[34m",
    white: "\x1b[37m",
};

const green = (text) => COLORS.green + text + COLORS.reset;
const red = (text) => COLORS.red + text + COLORS.reset;
const blue = (text) => COLORS.blue + text + COLORS.reset;
const white = (text) => COLORS.white + text + COLORS.reset;

// CLI Args
const args = process.argv.slice(2);
if (args.length === 0) {
    console.log(red("✖ No file specified"));
    console.log("Usage: npx safe-try-with-ai <file.json> [--analyze]");
    process.exit(1);
}

const filePath = path.resolve(args[0]);
const analyze = args.includes("--analyze");

// Read and validate JSON
const [err] = safeTryJson(() => fs.readFileSync(filePath, "utf8"), { analyze });

if (err) {
    console.log(red("✖ JSON is invalid"));
    console.log(white(`  └─ Error: ${err.message}`));
    if (analyze && err.suggestion) {
        console.log(blue(`  ├─ Suggestion: ${err.suggestion}`));
        if (err.fix) console.log(green(`  └─ Fix: ${err.fix}`));
    }
    process.exit(1);
} else {
    console.log(green("✔ JSON is valid"));
    process.exit(0);
}