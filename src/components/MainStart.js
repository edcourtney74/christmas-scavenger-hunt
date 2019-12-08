import React from "react";
import { Button } from "reactstrap";

const MainStart = props => {
  return (
    <div className="text-center">
      <h1>Welcome to Christmas Scavenger Hunt!</h1>
      <p className="lead mt-3">
        You'll use your secret decoder ring to find the hidden clues and move on
        to your next mission.
      </p>
      <p className="lead">Click the candy cane to start.</p> <br />
      <Button
        onClick={props.onClickMain}
        size="lg"
        className="mt-n4"
        id="main-btn"
      >
        <i className="fas fa-candy-cane"></i>
      </Button>
    </div>
  );
};

export default MainStart;
