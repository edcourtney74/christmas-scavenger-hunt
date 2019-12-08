import React from "react";
import { Button } from "reactstrap";

const PlayerStart = props => {
  return (
    <div className="text-center">
      <h1>{props.player}</h1>
      <p className="lead">{props.message}</p>
      <Button onClick={props.onClick} size="lg" id="ans-submit">
        I'm Ready!
      </Button>
    </div>
  );
};

export default PlayerStart;
