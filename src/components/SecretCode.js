import React from "react";
import { Row, Form, FormGroup, Input, Button } from "reactstrap";

// Display code or display response
const SecretCode = props => {
  if (!props.guess) {
    return (
      <div>
        <h1>{props.json.clue}</h1>
        <Row className="justify-content-center mt-4">
          {props.json.images.map(image => (
            <img
              src={`../../images/code/${image}.png`}
              className="code-img"
              alt={`${image}`}
            />
          ))}
        </Row>
        <Row className="justify-content-center mt-4">
          <Form inline>
            <FormGroup>
              <Input
                name="letter"
                id="letter"
                placeholder="Co"
                onChange={props.onChange}
                className="code-input"
              />
            </FormGroup>
            <FormGroup>
              <Input
                name="number"
                id="number"
                placeholder="de"
                className="ml-4"
                onChange={props.onChange}
              />
            </FormGroup>
          </Form>
        </Row>
        <Row className="justify-content-center mt-2">
          <Button onClick={props.onClickCode} id="code-submit">
            Here's my code!
          </Button>
        </Row>
      </div>
    );
  } else {
    return <h1 className="text-center">{props.message}</h1>;
  }
};

export default SecretCode;
