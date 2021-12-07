import { useState, useEffect } from "react"
import { nanoid } from "nanoid"
import mockData from "../assets/mockData"
import Question from "./Question";

function Quiz() {
  // state: hasFinished, questions + answers, responses
  const [questions, setQuestions] = useState([])

  useEffect(() => {
    setQuestions(mockData.results.map(item => ({
      id: nanoid(),
      question: item.question,
      correctAnswer: item.correct_answer,
      answers: [...item.incorrect_answers, item.correct_answer]
        .sort(() => Math.random() - 0.5)
        .map(answer => ({id: nanoid(), value: answer})),
      selected: null,
    })))
  }, []);

  function handleAnswerSelected(questionId, answer) {
    setQuestions(prevQuestions => (
      prevQuestions.map(question => question.id === questionId ? {...question, selected: answer} : question)
    ))
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
        />
      ))}

      <div className="quiz--actions">
        <button className="quiz--button">
          Check Answers
        </button>
      </div>
    </div>
  );
}

export default Quiz;
