import React from "react";
import { Row, Button } from "reactstrap";

const Match = props => {
  return (
    <div>
      <Row className="justify-content-center">
        <h1>{props.message}</h1>
      </Row>
      <Row className="justify-content-center mt-2">
        {props.princesses.map(princess => (
          <Button
            onClick={props.onClick}
            key={princess.id}
            className={`${
              props[`group${princess.group}`]
                ? "matched p-1 mr-1 mb-1 p-button"
                : "p-1 mr-1 mb-1 p-button"
            }`}
            id="btn-brd"
            disabled={props[`card${princess.id}`]}
          >
            <img
              src={`${
                props[`card${princess.id}`]
                  ? `../../images/princesses/${princess.name}`
                  : "../../images/princesses/cardcover.png"
              }`}
              className="princess"
              alt=""
              data-card={princess.id}
              data-group={princess.group}
            />
          </Button>
        ))}
      </Row>
    </div>
  );
};

export default Match;
