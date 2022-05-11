import React from "react";
import { Form, Button } from "react-bootstrap";

const Homepage = () => {
  return (
    <>
      <div className="rounded border m-3 p-4 shadow">
        <Form className="">
          <h5 className="text-center w-100">Judge Login</h5>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Form.Check type="checkbox" label="Remember me" />
          </Form.Group>
          <Button variant="primary w-100" type="submit">
            Submit
          </Button>
        </Form>
      </div>
    </>
  );
};

export default Homepage;
