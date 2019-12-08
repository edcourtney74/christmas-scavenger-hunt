import React from "react";
import { Button } from "reactstrap";

// Display trivia question or display response
const Trivia = props => {
  if (!props.guess) {
    return (
      <div>
        <h3>{props.json.question}</h3>
        {props.json.answers.map((answer, index) => (
          <Button
            key={index}
            onClick={props.onClickTrivia}
            size="lg"
            className="my-3 text-left"
            block
            id="ans-submit"
            data-rank={index}
          >
            {answer}
          </Button>
        ))}
      </div>
    );
  } else {
    return <h1 className="text-center">{props.message}</h1>;
  }
};

export default Trivia;
