import React from "react";
import { Row, Col, Button } from "reactstrap";

const cards = [
  { name: "kobe", rank: 2 },
  { name: "wade", rank: 4 },
  { name: "jordan", rank: 0 },
  { name: "barkley", rank: 3 },
  { name: "lebron", rank: 1 }
];

const NBA = props => {
  return (
    <div>
      <Row className="justify-content-center">
        <h1>{props.message}</h1>
      </Row>
      <Row className="mt-2">
        <Col lg="9">
          {cards.map(card => (
            <Button
              key={card.rank}
              onClick={props.onClick}
              className={`${
                props[`card${card.rank}`]
                  ? "matched p-1 mr-1 mb-1 p-button nba"
                  : "p-1 mr-1 mb-1 p-button nba"
              }`}
              id="btn-brd"
            >
              <img
                src={`../../images/nba/${card.name}.jpg`}
                data-rank={card.rank}
                alt={card.name}
              />
            </Button>
          ))}
        </Col>
        <Col lg="3">
          <Row className="mb-2">
            <Button
              className="mr-1"
              id="ans-submit"
              disabled={props.disabled}
              onClick={props.onClickSubmit}
            >
              Am I Right?
            </Button>
            <Button id="ans-submit" onClick={props.onClickClear}>
              Start Over
            </Button>
          </Row>
          <Row>
            {props.selected.map(player => (
              <img
                key={player}
                src={`../../images/nba/${player}.jpg`}
                className="mini-nba mr-1"
                alt={player}
              />
            ))}
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default NBA;
