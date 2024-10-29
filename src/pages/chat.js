// App.js
import React, { useState } from 'react';
import MonacoEditor from '@monaco-editor/react';

// Define challenges with test cases
const challenges = [
  {
    title: "Reverse a String",
    description: "Write a function that takes a string and returns it reversed.",
    tests: [
      { input: ["hello"], output: "olleh" },
      { input: ["world"], output: "dlrow" },
      { input: ["React"], output: "tcaeR" }
    ]
  }
];

// Dynamic test runner function
const runTests = (userFunction, tests) => {
  let results = [];
  tests.forEach(({ input, output }, index) => {
    try {
      const result = userFunction(...input); // Call the user's function with input
      const passed = JSON.stringify(result) === JSON.stringify(output);
      results.push({ passed, input, expected: output, received: result });
    } catch (error) {
      results.push({ passed: false, error: error.message });
    }
  });
  return results;
};

const App = () => {
  const [code, setCode] = useState(
    `function reverseString(str) {
  return str.split('').reverse().join('');
}`
  );
  const [testResults, setTestResults] = useState([]);

  // Run the code dynamically using eval
  const runUserCode = () => {
    try {
      // Evaluate the user's code to define the function in the global scope
      const userFunction = eval(`(${code})`);

      // Run the tests for the first challenge
      const results = runTests(userFunction, challenges[0].tests);
      setTestResults(results);
    } catch (error) {
      setTestResults([{ passed: false, error: `Code Error: ${error.message}` }]);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>{challenges[0].title}</h1>
      <p>{challenges[0].description}</p>

      <MonacoEditor
        height="300px"
        language="javascript"
        theme="vs-dark"
        value={code}
        onChange={(value) => setCode(value)}
      />

      <button onClick={runUserCode} style={{ marginTop: "10px" }}>
        Run Code
      </button>

      <div style={{ marginTop: "20px" }}>
        <h3>Test Results:</h3>
        <pre>
          {testResults.map((result, index) =>
            result.passed ? (
              <p key={index} style={{ color: "green" }}>
                ✅ Test {index + 1} passed
              </p>
            ) : (
              <p key={index} style={{ color: "red" }}>
                ❌ Test {index + 1} failed: Expected {JSON.stringify(result.expected)} but got {JSON.stringify(result.received)}
                {result.error && ` - Error: ${result.error}`}
              </p>
            )
          )}
        </pre>
      </div>
    </div>
  );
};

export default App;
