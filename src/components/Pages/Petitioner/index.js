import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Navbar from "../../SharedComponents/Navbar";
import CaseStatus from "./CaseStatus";

const Homepage = () => {
  return (
    <>
      <Navbar />
      <Container className="mt-5">
        <Row>
          <Col>
            <h2 className="text-center mt-3 font-weight-bold">File Case</h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md={6}>
            <CaseStatus />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Homepage;
