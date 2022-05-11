import React from "react";
import { Form, Button } from "react-bootstrap";

const Homepage = () => {
  return (
    <>
      <div className="rounded border m-3 p-4 shadow">
        <Form className="">
          <h5 className="text-center w-100">Edit</h5>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Name</Form.Label>
            <Form.Control
              defaultValue="Kim Abel Thomas"
              type="text"
              placeholder="Enter Name"
            />
          </Form.Group>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              defaultValue="kim@gmail.com"
              type="email"
              placeholder="Enter email"
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Type</Form.Label>
            <br />
            <Form.Select className="mb-3 w-100">
              <option>Court official</option>
              <option>Judge</option>
              <option>Petitioner</option>
            </Form.Select>
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
