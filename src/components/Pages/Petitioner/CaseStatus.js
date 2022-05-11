import React from "react";
import { Form, Button, Badge } from "react-bootstrap";

const PetitionerForm = () => {
  return (
    <>
      <div className="rounded border m-3 p-4 shadow">
        <h3>This is the case title</h3>
        <Badge bg="success" className="text-white">
          Upload Vakalatnama
        </Badge>
        <Form.Group className="mt-2 mb-3">
          <Form.Label>Upload Vakalatnama</Form.Label>
          <Form.Control type="file" placeholder="Enter email" />
        </Form.Group>

        <Badge bg="danger" className="text-white">
          Re-upload Case Files 
        </Badge>
        <Form.Group className="mt-2 mb-3">
          <Form.Label>Upload Case Files</Form.Label>
          <Form.Control type="file" multiple />
        </Form.Group>

        <Button variant={"success"} className="w-100 mb-3">View Statement</Button>
        
        <Badge bg="danger" className="text-white">
          Re-upload Case Files 
        </Badge>
        <Form.Group className="mt-2 mb-3">
          <Form.Label>Upload Replication</Form.Label>
          <Form.Control type="file" />
        </Form.Group>

      </div>
    </>
  );
};

export default PetitionerForm;
