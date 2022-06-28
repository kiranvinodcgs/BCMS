import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Navbar from "../../SharedComponents/Navbar";
import LoginForm from "./LoginForm";

const Homepage = () => {
  return (
    <>
      <Navbar />
      <Container className="mt-5">
        <Row>
          <Col>
            <h1 className="text-center mt-3 font-weight-bold">
              Create User
            </h1>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md={6}>
            <LoginForm />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Homepage;
