import parse from "html-react-parser"

function Question(props) {
  return (
    <div className="question">
      <h4>{parse(props.question)}</h4>
      <div className="answers">
        { props.answers.map(answer => (
          <span className="answer" key={answer.id}>
            <input
              id={answer.id}
              name={props.id}
              type="radio" 
              value={answer.value}
              onChange={() => props.onAnswerSelected(props.id, answer.value)}
              checked={props.selected === answer.value}
            />
            <label htmlFor={answer.id}>{parse(answer.value)}</label>
          </span>
        ))}
      </div>
    </div>
  );
}

export default Question;
