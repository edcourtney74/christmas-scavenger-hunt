import React from "react";
import { Row, Col, Form, Button } from "reactstrap";

const Rock = props => {
  return (
    <div>
      <Row className="mt-2">
        <Col lg="2">
          <img
            src={`../../images/nba/ethan.jpg`}
            className="players"
            alt="Ethan"
          />
          <h5 className="score text-center">{props.wins}</h5>
          <p className="rock-choice text-center">{props.user}</p>
        </Col>
        <Col lg={{ size: 8 }}>
          <div id="rock-msg">
            <h1 className="text-center">{props.message}</h1>
            <h4 className="text-center">{props.subInstructions}</h4>
          </div>
          <Row className="justify-content-center mt-3">
            <Form>
              <Button
                id="ans-rock"
                data-choice="Rock"
                className="mr-3"
                onClick={props.onClick}
              >
                Rock
              </Button>
              <Button
                id="ans-rock"
                data-choice="Paper"
                className="mr-3"
                onClick={props.onClick}
              >
                Paper
              </Button>
              <Button
                id="ans-rock"
                data-choice="Scissors"
                className="mr-1"
                onClick={props.onClick}
              >
                Scissors
              </Button>
            </Form>
          </Row>
        </Col>
        <Col lg="2">
          <img
            src={`../../images/nba/mpj.png`}
            className="players pr-2"
            alt="MPJ"
          />
          <h5 className="score text-center">{props.losses}</h5>
          <p className="rock-choice text-center">{props.mpj}</p>
        </Col>
      </Row>
    </div>
  );
};

export default Rock;
