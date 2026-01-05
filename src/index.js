// src/index.js

/**
 * Rule-based AI-style error analyzer
 * Returns enriched error object with suggestion and optional fix
 */
function analyzeError(error) {
  // Handle undefined variable
  if (/undefined/.test(error.message)) {
    return {
      name: error.name,
      message: error.message,
      suggestion: "Check if the variable exists before accessing it",
      fix: "Use optional chaining (?.) or input validation"
    };
  }

  // Handle property access errors
  if (/Cannot read property/.test(error.message)) {
    return {
      name: error.name,
      message: error.message,
      suggestion: "Verify the object exists before accessing its property",
      fix: "Use optional chaining (?.) or null checks"
    };
  }

  // Handle JSON parsing errors
  if (/JSON/.test(error.message)) {
    return {
      name: error.name,
      message: error.message,
      suggestion: "Check your JSON syntax",
      fix: "Use JSON validators or wrap JSON.parse in safeTry"
    };
  }

  // Handle fetch/network errors
  if (/fetch/.test(error.message)) {
    return {
      name: error.name,
      message: error.message,
      suggestion: "Check network connection and URL validity",
      fix: "Ensure network is online and URL is correct"
    };
  }

  // Default fallback
  return {
    name: error.name,
    message: error.message,
    suggestion: "Check stack trace and input values",
  };
}

/**
 * Safe synchronous try wrapper
 * @param {Function} fn - Function to execute
 * @param {Object} options - { analyze: boolean } optional runtime suggestions
 * @returns {[Error|null, any]} tuple of error and result
 */
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

/**
 * Safe asynchronous try wrapper
 * @param {Function} fn - Async function to execute
 * @param {Object} options - { analyze: boolean } optional runtime suggestions
 * @returns {Promise<[Error|null, any]>} tuple of error and result
 */
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

module.exports = { safeTry, safeTryAsync };
