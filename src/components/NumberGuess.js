import React from "react";
import { Row, Col, Form, Input, Button } from "reactstrap";

const NumberGuess = props => {
  return (
    <div>
      <Row>
        <Col lg={{ size: 9 }}>
          <h1 className="text-center">{props.message}</h1>
          <Form>
            <Row className="justify-content-center">
              <Input
                name="number"
                id="number"
                placeholder=""
                className="mb-2"
                onChange={props.onChange}
              />
            </Row>
            <Row className="justify-content-center">
              <Button id="ans-submit" onClick={props.onClick}>
                Here's my guess!
              </Button>
            </Row>
          </Form>
        </Col>
        <Col lg="3">
          <Row className="mb-2">
            <h3>
              <u>Your guesses</u>
            </h3>
            <ul>
              {props.guesses.length > 0 &&
                props.guesses.map((guess, index) => (
                  <li key={index}>{guess}</li>
                ))}
            </ul>
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default NumberGuess;
