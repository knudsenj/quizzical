import { useState, useEffect } from "react"
import { nanoid } from "nanoid"
import mockData from "../assets/mockData"
import Question from "./Question";

function Quiz() {
  // state: hasFinished, questions + answers, responses
  const [questions, setQuestions] = useState([])

  useEffect(() => {
    setQuestions(mockData.results.map((item) => {
      const index = Math.random() * item.incorrect_answers.length;
      const answers = item.incorrect_answers.slice().sort(() => Math.random() - 0.5);
      answers.splice(index, 0, item.answer)
      return {
        id: nanoid(),
        question: item.question,
        correctIndex: index,
        answers: answers,
      }
    }))
  }, []);

  return (
    <div className="quiz">
      { questions.map(item => (
        <Question 
          key={item.id}
          question={item.question} 
          answers={item.answers}
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
