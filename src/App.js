import { useState } from "react"
import Quiz from "./components/Quiz";

function App() {
  const [hasStarted, setHasStarted] = useState(true);

  function startQuiz() {
    setHasStarted(true);
  }

  return (
    <main className="app-wrapper">
      {
        hasStarted ?
          <Quiz /> :
          <div className="start">
            <h1 className="start--title">Quizzical</h1>
            <h3 className="start--description">Challenge yourself with five question trivia quizzes!</h3>
            <button className="start--button" onClick={startQuiz}>Start Quiz</button>
          </div>
      }
    </main>
  );
}

export default App;
