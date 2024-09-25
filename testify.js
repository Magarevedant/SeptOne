function createTest(testJson) {
  const container = document.getElementById('test-container'); // Assume we have a container in HTML
  const title = document.createElement('h2');
  title.textContent = testJson.title;
  container.appendChild(title);

  const timeLimit = testJson.time * 60; // Convert minutes to seconds
  const generalMarkingScheme = testJson.mark; // [positiveMark, negativeMark]

  let score = 0;
  
  // Render each question
  testJson.question.forEach((q, index) => {
    const questionDiv = document.createElement('div');
    const questionTitle = document.createElement('p');
    questionTitle.textContent = `Q${index + 1}: ${q.text}`;
    questionDiv.appendChild(questionTitle);

    if (q.img) {
      const img = document.createElement('img');
      img.src = q.img;
      questionDiv.appendChild(img);
    }

    // Render options (for single/multiple choice questions)
    q.Opt.forEach((option, optIndex) => {
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

  // Timer logic
  let timeRemaining = timeLimit;
  const timerDiv = document.createElement('div');
  container.appendChild(timerDiv);

  const timerInterval = setInterval(() => {
    timeRemaining--;
    const minutes = Math.floor(timeRemaining / 60);
    const seconds = timeRemaining % 60;
    timerDiv.textContent = `Time left: ${minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
    
    if (timeRemaining <= 0) {
      clearInterval(timerInterval);
      evaluateTest(testJson);
    }
  }, 1000);

  // Evaluation function
  function evaluateTest(testJson) {
    let totalScore = 0;

    testJson.question.forEach((q, index) => {
      const selectedOptions = document.querySelectorAll(`input[name="question${index}"]:checked`);
      const selectedValues = Array.from(selectedOptions).map(option => option.value);

      const isCorrect = JSON.stringify(selectedValues) === JSON.stringify(q.ans);
      const markingScheme = q.score || generalMarkingScheme;

      totalScore += isCorrect ? markingScheme[0] : markingScheme[1];
    });

    // Show final score
    alert(`Test completed! Your score is: ${totalScore}`);
  }
}
