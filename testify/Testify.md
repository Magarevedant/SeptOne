

# Testify.js Documentation

## Overview
**Testify.js** is a JavaScript library designed to create and evaluate tests in a user-friendly web interface. It processes a test JSON object, renders the test in the browser, and evaluates user responses to display a score and review.

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
Include the **Testify.js** script in your HTML file to make the `createTest` function globally available.

```html
<script src="path/to/testify.js"></script>
```

---

Usage

1. Create a base64-encoded test JSON object.


2. Pass the encoded string to the createTest function.



Example

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


---

Test JSON Schema

The test JSON should follow this structure:

Main Schema

title: string - Test title to display. (Default: "Test")

time: number - Test duration in minutes. (Default: 30)

bg: string - Background color of the test interface (CSS color value). (Default: "#fff")

note: string - Additional notes for the pre-test screen. (Default: "")

mark: array - General marking scheme [correct, incorrect]. (Default: [1, 0])

question: array - List of questions in the test.


Question Schema

Each question object should follow this structure:

text: string - Question text. (Default: "Untitled")

img: string - Optional image URL for the question. (Default: null)

type: string - Question type ("single" or "multiple"). (Default: "single")

Opt: array - List of answer options. (Default: [])

ans: array - Correct answers. (Default: [])

score: array - Custom marking scheme [correct, incorrect]. (Default: null)



---

Features

Pre-test screen: Displays a ready prompt and notes.

Timer: Automatically counts down and submits the test when time runs out.

Single/Multiple choice questions: Supports both types.

Dynamic styling: Customizable interface using JSON properties.

Post-test analysis: Displays score, correct answers, and a review.



---

API Reference

createTest(test)

Creates and displays a test interface.

Parameters

test: string - Base64-encoded JSON string containing the test data.



---

Customization

Change background color using the bg property in the JSON.

Set custom notes for the pre-test screen with the note property.

Define your marking scheme using the mark or score properties.



---

Examples

Example 1: Basic Test

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

Example 2: Multiple Choice Question

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

