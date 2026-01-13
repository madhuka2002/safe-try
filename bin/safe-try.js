#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const { safeTryJson } = require("../src/index.js");

// ANSI color codes
const COLORS = {
    reset: "\x1b[0m",
    red: "\x1b[31m",
    green: "\x1b[32m",
    blue: "\x1b[34m",
    white: "\x1b[37m"
};

const green = (t) => COLORS.green + t + COLORS.reset;
const red = (t) => COLORS.red + t + COLORS.reset;
const blue = (t) => COLORS.blue + t + COLORS.reset;
const white = (t) => COLORS.white + t + COLORS.reset;

// CLI args
const args = process.argv.slice(2);
const analyze = args.includes("--analyze") || args.includes("-a");

// ---------- STDIN MODE ----------
if (args.includes("--stdin")) {
    let input = "";

    process.stdin.setEncoding("utf8");
    process.stdin.on("data", chunk => input += chunk);
    process.stdin.on("end", () => {
        const [err] = safeTryJson(input, { analyze });

        if (err) {
            console.log(red("✖ Invalid JSON"));
            console.log(white(`  └─ Error: ${err.message}`));
            if (analyze && err.suggestion) {
                console.log(blue(`  ├─ Suggestion: ${err.suggestion}`));
                if (err.fix) console.log(green(`  └─ Fix: ${err.fix}`));
            }
            process.exit(1);
        }

        console.log(green("✔ JSON is valid"));
        process.exit(0);
    });

    return;
}

// ---------- FILE MODE ----------
if (!args[0]) {
    console.log(red("✖ No file specified"));
    console.log("Usage:");
    console.log("  safe-try-with-ai file.json [--analyze]");
    console.log("  cat file.json | safe-try-with-ai --stdin [--analyze]");
    process.exit(1);
}

const filePath = path.resolve(args[0]);

let fileContent;
try {
    fileContent = fs.readFileSync(filePath, "utf8");
} catch (e) {
    console.log(red("✖ Cannot read file"));
    console.log(white(`  └─ Error: ${e.message}`));
    process.exit(1);
}

const [err] = safeTryJson(fileContent, { analyze });

if (err) {
    console.log(red("✖ Invalid JSON"));
    console.log(white(`  └─ Error: ${err.message}`));
    if (analyze && err.suggestion) {
        console.log(blue(`  ├─ Suggestion: ${err.suggestion}`));
        if (err.fix) console.log(green(`  └─ Fix: ${err.fix}`));
    }
    process.exit(1);
}

console.log(green("✔ JSON is valid"));
process.exit(0);