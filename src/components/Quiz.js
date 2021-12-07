import { useState, useEffect } from "react"
import { nanoid } from "nanoid"
import Question from "./Question";

function Quiz() {
  const [questions, setQuestions] = useState([])
  const [hasFinished, setHasFinished] = useState(false);

  useEffect(() => {
    if (!hasFinished) {
      fetch("https://opentdb.com/api.php?amount=5&type=multiple")
        .then(res => res.json())
        .then(data => (
          setQuestions(data.results.map(item => ({
            id: nanoid(),
            question: item.question,
            correctAnswer: item.correct_answer,
            answers: [...item.incorrect_answers, item.correct_answer]
              .sort(() => Math.random() - 0.5)
              .map(answer => ({id: nanoid(), value: answer})),
            selected: null,
          })))
        ))
    }
  }, [hasFinished])

  function handleAnswerSelected(questionId, answer) {
    setQuestions(prevQuestions => (
      prevQuestions.map(question => question.id === questionId ? {...question, selected: answer} : question)
    ))
  }
  
  function handleSubmit() {
    setHasFinished(prevHasFinished => !prevHasFinished);
  }

  return (
    <div className="quiz">
      { questions.map(item => (
        <Question 
          key={item.id}
          id={item.id}
          question={item.question} 
          answers={item.answers}
          selected={item.selected}
          onAnswerSelected={handleAnswerSelected}
          showAnswers={hasFinished}
          answer={item.correctAnswer}
        />
      ))}

      <div className="quiz--actions">
        { hasFinished &&
          <div className="quiz--results">
            You scored&nbsp;
            {questions.reduce((count, question) => count + (question.selected === question.correctAnswer), 0)}/{questions.length} 
            &nbsp;correct answers
          </div>
        }
        <button className="quiz--button" onClick={handleSubmit} disabled={questions.some(question => question.selected === null)}>
          { hasFinished ? "Play Again" : "Check Answers" }
        </button>
      </div>
    </div>
  );
}

export default Quiz;
