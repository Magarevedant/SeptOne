// Expose createTest globally
window.createTest = function(test) {
  var testJson = JSON.parse(atob(test));
  // Create main container
  const container = document.createElement('div');
  container.id = 'test-container';
  document.body.appendChild(container);

  // Apply basic styling through JavaScript
  const styles = `
    body {
      background-color: ${testJson.bg || "#fff"}
    }
    #test-container {
      margin: 20px auto;
      padding: 20px;
      width: 90%;
      height: 90vh;
      border: 1px solid #ccc;
      border-radius: 10px;
      background-color: #f9f9f9;
      font-family: Arial, sans-serif;
    }
    h2 {
      text-align: center;
      font-size: 24px;
      margin-bottom: 20px;
    }
    .question {
      margin-bottom: 20px;
      padding: 10px;
      border-bottom: 1px solid #ccc;
    }
    label {
      display: block;
      margin-bottom: 5px;
    }
    .timer {
      position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    background-color: #ffeb3b;
    color: red;
    font-size: 18px;
    text-align: center;
    font-weight: bold;
    padding: 10px;
    z-index: 9999;
    }
    .submit-button {
      display: block;
      margin: 20px auto;
      padding: 10px 20px;
      font-size: 16px;
      background-color: #28a745;
      color: white;
      border: none;
      border-radius: 5px;
      cursor: pointer;
    }
    .submit-button:hover {
      background-color: #218838;
    }
  `;
  const styleSheet = document.createElement('style');
  styleSheet.type = 'text/css';
  styleSheet.innerText = styles;
  document.head.appendChild(styleSheet);

  // Display the pre-test screen asking if the user is ready
  container.innerHTML = `
    <h2>${testJson.title || "Test"}</h2>
    <p>• Note that if you leave this tab during test, the test will be auto submitted</p>
    ${testJson.note}
    <p>Are you ready to start the test?</p>
    <button id="start-test-btn" class="submit-button">Start Test</button>
  `;

  // Start the test when the user clicks the start button
  document.getElementById('start-test-btn').addEventListener('click', () => {
    startTest();
  });

  function startTest() {
    container.innerHTML = ''; // Clear the container

    const timeLimit = (testJson.time || 30) * 60; // Default to 30 minutes if not provided
    const generalMarkingScheme = testJson.mark || [1, 0]; // Default marking: 1 for correct, 0 for wrong
    let timeRemaining = timeLimit;

    // Timer logic
    const timerDiv = document.createElement('div');
    timerDiv.classList.add('timer');
    container.appendChild(timerDiv);

    const timerInterval = setInterval(() => {
      timeRemaining--;
      const minutes = Math.floor(timeRemaining / 60);
      const seconds = timeRemaining % 60;
      timerDiv.textContent = `Time left: ${minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
      
      if (timeRemaining <= 0) {
        clearInterval(timerInterval);
        evaluateTest();
      }
    }, 1000);

    // Render each question
    testJson.question.forEach((q, index) => {
      const questionDiv = document.createElement('div');
      questionDiv.classList.add('question');
      
      const questionTitle = document.createElement('p');
      questionTitle.textContent = `Q${index + 1}: ${q.text || "Untitled Question"}`;
      questionDiv.appendChild(questionTitle);

      if (q.img) {
        const img = document.createElement('img');
        img.src = q.img;
        questionDiv.appendChild(img);
      }

      // Render options (for single/multiple choice questions)
      (q.Opt || []).forEach((option) => {
        const label = document.createElement('label');
        const input = document.createElement('input');
        input.type = q.type === 'single' ? 'radio' : 'checkbox';
        input.name = `question${index}`;
        input.value = option;
        label.appendChild(input);
        label.appendChild(document.createTextNode(option));
        questionDiv.appendChild(label);
      });

      container.appendChild(questionDiv);
    });

    // Add Submit Button
    const submitButton = document.createElement('button');
    submitButton.textContent = "Submit Test";
    submitButton.classList.add('submit-button');
    container.appendChild(submitButton);

    // Submit button logic
    submitButton.addEventListener('click', () => {
      clearInterval(timerInterval); // Stop timer when the test is submitted
      evaluateTest();
    });

    // Automatically submit the test if the user minimizes or changes the tab
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'hidden') {
        clearInterval(timerInterval);
        evaluateTest();
      }
    });

    // Function to evaluate the test
    function evaluateTest() {
      let totalScore = 0;
      let correctAnswers = 0;
      let wrongAnswers = 0;

      testJson.question.forEach((q, index) => {
        const selectedOptions = document.querySelectorAll(`input[name="question${index}"]:checked`);
        const selectedValues = Array.from(selectedOptions).map(option => option.value);

        const isCorrect = JSON.stringify(selectedValues) === JSON.stringify(q.ans || []);
        const markingScheme = q.score || generalMarkingScheme;

        totalScore += isCorrect ? markingScheme[0] : markingScheme[1];
        if (isCorrect) correctAnswers++;
        else wrongAnswers++;
      });

      showPostTestScreen(totalScore, correctAnswers, wrongAnswers);
    }
  }

  // Show post-test analysis
  function showPostTestScreen(totalScore, correctAnswers, wrongAnswers) {
    container.innerHTML = `
      <h2>Test Completed!</h2>
      <p>Your Score: ${totalScore}</p>
      <p>Correct Answers: ${correctAnswers}</p>
      <p>Wrong Answers: ${wrongAnswers}</p>
      <button class="submit-button" onclick="location.reload()">Take Again</button>
    `;
  }
};
