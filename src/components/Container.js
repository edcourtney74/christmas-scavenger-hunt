import React from "react";
import { Row, Col, Container } from "reactstrap";

const MainContainer = ({ children }) => {
  return (
    <Container>
      <Row>
        <Col>
          <div className="game-area m-5 p-3">{children}</div>
        </Col>
      </Row>
    </Container>
  );
};

export default MainContainer;
