import React from "react";
import { Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const Homepage = () => {
  const register = () => {};
  
  return (
    <>
      <div className="rounded border m-3 p-4 shadow">
        <Form className="">
          <h5 className="text-center w-100">Petitioner Register</h5>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Full Name</Form.Label>
            <Form.Control type="text" placeholder="Enter full name" />
          </Form.Group>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" />
          </Form.Group>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Phone Number</Form.Label>
            <Form.Control type="text" placeholder="Enter phone number" />
          </Form.Group>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Address</Form.Label>
            <Form.Control type="text" placeholder="Enter address" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control type="password" placeholder="Confirm Password" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Form.Check type="checkbox" label="Remember me" />
          </Form.Group>
          <Button onClick={register} variant="primary w-100" type="submit">
            Submit
          </Button>
        </Form>
      </div>
    </>
  );
};

export default Homepage;
