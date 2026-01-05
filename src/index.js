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

function analyzeError(error) {
  if (/undefined/.test(error.message)) {
    return {
      name: error.name,
      message: error.message,
      suggestion: "Check if the variable exists before access",
      fix: "Use optional chaining or input validation"
    };
  }

  return {
    name: error.name,
    message: error.message,
    suggestion: "Check stack trace and input values"
  };
}

module.exports = { safeTry, safeTryAsync };
