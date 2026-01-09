#!/usr/bin/env node

const fs = require("fs");
const { safeTryJson } = require("../src/index.js");

// ANSI color codes
const COLORS = {
    reset: "\x1b[0m",
    red: "\x1b[31m",
    green: "\x1b[32m",
    blue: "\x1b[34m",
    white: "\x1b[37m"
};

const green = (text) => COLORS.green + text + COLORS.reset;
const red = (text) => COLORS.red + text + COLORS.reset;
const blue = (text) => COLORS.blue + text + COLORS.reset;
const white = (text) => COLORS.white + text + COLORS.reset;

// CLI Args
const args = process.argv.slice(2);
const analyze = args.includes("--analyze");

// Check if stdin or file
if (args.includes("--stdin")) {
    let input = "";
    process.stdin.setEncoding("utf8");
    process.stdin.on("data", chunk => input += chunk);
    process.stdin.on("end", () => {
        const [err] = safeTryJson(() => input, { analyze });
        if (err) {
            console.log(red("✖ Invalid JSON"));
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
    });
} else if (args[0]) {
    const filePath = args[0];
    const [err] = safeTryJson(() => fs.readFileSync(filePath, "utf8"), { analyze });
    if (err) {
        console.log(red("✖ Cannot read or invalid JSON"));
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
} else {
    console.log(red("✖ No file specified"));
    console.log("Usage: safe-try-with-ai <file.json> [--analyze]");
    console.log("       cat <file.json> | safe-try-with-ai --stdin [--analyze]");
    process.exit(1);
}