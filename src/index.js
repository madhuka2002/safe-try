function safeTry(fn, options = {}) {
    try {
        const result = fn();
        return [null, result];
    } catch (error) {
        if (options.analyze) {
            return [analyzeError(error), null];
        }
        return [error, null];
    }
}

async function safeTryAsync(fn, options = {}) {
    try {
        const result = await fn();
        return [null, result];
    } catch (error) {
        if (options.analyze) {
            return [analyzeError(error), null];
        }
        return [error, null];
    }
}


function safeTryDefault(fn, defaultValue, options = {}) {
    try {
        const result = fn();
        return [null, result];
    } catch (error) {
        if (options.analyze) {
            return [analyzeError(error), defaultValue];
        }
        return [error, defaultValue];
    }
}


function safeTryJson(jsonString, options = {}) {
    return safeTry(() => JSON.parse(jsonString), options);
}


function analyzeError(error) {
    const message = error.message || "";

    if (/undefined/.test(message)) {
        return {
            name: error.name,
            message,
            suggestion: "Check if the variable exists before accessing it",
            fix: "Use optional chaining or input validation"
        };
    }

    if (/Unexpected token|Expected.*position/.test(message)) {
        return {
            name: error.name,
            message,
            suggestion: "Your JSON appears to be invalid",
            fix: "Check for missing commas, quotes, or brackets"
        };
    }

    if (error instanceof TypeError) {
        return {
            name: error.name,
            message,
            suggestion: "A value is being used with the wrong type",
            fix: "Verify variable types before using them"
        };
    }

    if (error instanceof ReferenceError) {
        return {
            name: error.name,
            message,
            suggestion: "A variable is not defined",
            fix: "Declare the variable before using it"
        };
    }

    return {
        name: error.name,
        message,
        suggestion: "Check stack trace and input values"
    };
}

module.exports = {
    safeTry,
    safeTryAsync,
    safeTryDefault,
    safeTryJson
};