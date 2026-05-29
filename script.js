const quizForm = document.getElementById('quiz-form');
const resultsElement = document.getElementById('results');

const correctAnswers = {
  q1: 'b',
  q2: 'b',
  q3: 'b',
  q4: 'b',
  q5: 'b',
};

const feedback = score => {
  if (score >= 4) {
    return 'Parabéns! Você acertou muitas questões. Continue assim!';
  }
  if (score >= 2) {
    return 'Bom trabalho, mas vale a pena praticar mais para acertar todas.';
  }
  return 'Continue praticando! Com mais estudo você vai melhorar bastante.';
};

quizForm.addEventListener('submit', event => {
  event.preventDefault();

  const formData = new FormData(quizForm);
  const answered = Object.keys(correctAnswers).filter(key => formData.has(key));

  if (answered.length < Object.keys(correctAnswers).length) {
    alert('Por favor, responda todas as perguntas antes de enviar.');
    return;
  }

  const correctQuestions = [];
  const wrongQuestions = [];
  let score = 0;

  for (const [question, answer] of Object.entries(correctAnswers)) {
    const userAnswer = formData.get(question);
    if (userAnswer === answer) {
      score += 1;
      correctQuestions.push(question);
    } else {
      wrongQuestions.push(question);
    }
  }

  const scoreMessage = `Você acertou ${score} de ${Object.keys(correctAnswers).length} perguntas.`;
  const encouragement = feedback(score);

  resultsElement.innerHTML = `
    <p><strong>${scoreMessage}</strong></p>
    <p>${encouragement}</p>
    <ul>
      <li class="correct">Questões corretas: ${correctQuestions.length ? correctQuestions.join(', ') : 'nenhuma'}</li>
      <li class="wrong">Questões erradas: ${wrongQuestions.length ? wrongQuestions.join(', ') : 'nenhuma'}</li>
    </ul>
  `;

  resultsElement.classList.remove('hidden');
});
