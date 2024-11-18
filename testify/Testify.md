Here’s a refined and clearer version of the documentation in Markdown format:

```markdown
# Testify.js Documentation

## Overview
**Testify.js** is a JavaScript library designed to create and evaluate interactive tests in a browser. It renders tests based on a JSON input, handles user interactions, and provides post-test analysis with scores and answer reviews.

---

## Table of Contents
1. [Installation](#installation)
2. [Usage](#usage)
3. [Test JSON Schema](#test-json-schema)
4. [Features](#features)
5. [API Reference](#api-reference)
6. [Customization](#customization)
7. [Examples](#examples)

---

## Installation
To use **Testify.js**, include the script in your HTML file:

```html
<script src="path/to/testify.js"></script>
```

---

## Usage
1. Create a JSON object that defines the test structure.
2. Convert the JSON object to a Base64 string.
3. Pass the encoded string to the `createTest` function.

### Example Usage
```javascript
const testJSON = {
  title: "Sample Test",
  time: 10,
  question: [
    {
      text: "What is 2 + 2?",
      type: "single",
      Opt: ["3", "4", "5"],
      ans: ["4"]
    }
  ]
};

const encodedTest = btoa(JSON.stringify(testJSON));
createTest(encodedTest);
```

---

## Test JSON Schema
The test JSON must follow the structure below:

### Main Schema
| Field      | Type     | Description                                       | Default   |
|------------|----------|---------------------------------------------------|-----------|
| `title`    | `string` | The title of the test.                            | `"Test"`  |
| `time`     | `number` | Duration of the test in minutes.                  | `30`      |
| `bg`       | `string` | Background color of the test interface (CSS value). | `"#fff"`  |
| `note`     | `string` | Notes displayed on the pre-test screen.           | `""`      |
| `mark`     | `array`  | General marking scheme `[correct, incorrect]`.    | `[1, 0]`  |
| `question` | `array`  | List of questions. See the question schema below. | `[]`      |

### Question Schema
| Field     | Type     | Description                                        | Default     |
|-----------|----------|----------------------------------------------------|-------------|
| `text`    | `string` | The text of the question.                          | `"Untitled"`|
| `img`     | `string` | Optional URL of an image for the question.         | `null`      |
| `type`    | `string` | The type of question (`"single"` or `"multiple"`). | `"single"`  |
| `Opt`     | `array`  | The list of answer options.                        | `[]`        |
| `ans`     | `array`  | The correct answers.                               | `[]`        |
| `score`   | `array`  | Custom marking scheme `[correct, incorrect]`.      | `null`      |

---

## Features
- **Pre-Test Screen:** Displays instructions and a start button.
- **Timer:** Automatically counts down and submits the test when time runs out.
- **Dynamic Questions:** Supports single-choice and multiple-choice questions.
- **Post-Test Analysis:** Displays score, correct answers, and user answers.
- **Custom Styling:** Allows for custom background colors and notes via JSON.

---

## API Reference

### `createTest(test)`
Creates and displays a test interface.

#### Parameters
- **`test`**: A Base64-encoded string containing the test JSON.

---

## Customization
- Set a custom background color using the `bg` property in the JSON.
- Add notes to the pre-test screen using the `note` property.
- Adjust the marking scheme globally with `mark` or per question with `score`.

---

## Examples

### Example 1: Simple Test
```javascript
const testJSON = {
  title: "Math Quiz",
  time: 15,
  bg: "#e0f7fa",
  question: [
    {
      text: "What is 5 + 3?",
      type: "single",
      Opt: ["6", "8", "10"],
      ans: ["8"]
    }
  ]
};

const encodedTest = btoa(JSON.stringify(testJSON));
createTest(encodedTest);
```

### Example 2: Multiple Choice Test
```javascript
const testJSON = {
  title: "General Knowledge Quiz",
  time: 20,
  question: [
    {
      text: "Select all prime numbers.",
      type: "multiple",
      Opt: ["2", "3", "4", "5"],
      ans: ["2", "3", "5"]
    }
  ]
};

const encodedTest = btoa(JSON.stringify(testJSON));
createTest(encodedTest);
```

---

## Notes
- The `createTest` function will automatically handle tab changes by submitting the test if the user minimizes or switches tabs.
- Ensure the test JSON is properly structured to avoid runtime errors.

---

This documentation provides everything you need to get started with **Testify.js**.
```

This version is clean, well-structured, and easy to copy into a GitHub repository or Markdown editor. Let me know if you need further changes!
