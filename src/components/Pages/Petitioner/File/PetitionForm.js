import React from "react";
import { Form, Button } from "react-bootstrap";

const PetitionerForm = () => {
  return (
    <>
      <div className="rounded border m-3 p-4 shadow">
        <Form className="">
          <h5 className="text-center w-100">Info</h5>
          <Form.Group className="mb-3">
            <Form.Label>Case Name</Form.Label>
            <Form.Control type="text" placeholder="Enter the case name" />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Court</Form.Label>
            <Form.Control type="text" placeholder="Enter the court name" />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Nature of Complaint</Form.Label>
            <Form.Control type="text" placeholder="Enter the name of complaint" />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Defendants Name</Form.Label>
            <Form.Control type="text" placeholder="Enter the name of dependant" />
          </Form.Group>

          <Button variant="primary w-100 mt-4" type="submit">
            Submit
          </Button>
        </Form>
      </div>
    </>
  );
};

export default PetitionerForm;
