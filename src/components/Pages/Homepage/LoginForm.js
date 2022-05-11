import React from "react";
import { Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const Homepage = () => {
  return (
    <>
      <div className="rounded border m-3 p-4 shadow">
        <Form className="">
          <h5 className="text-center w-100">Petitioner Login</h5>
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
          <div className="pt-2 d-block text-center w-100">
            <Link to="/register">New user? Register here.</Link>
          </div>
        </Form>
        <div className="pt-2 d-block text-center w-100">or</div>
        <div className="row mt-3">
          <div className="col">
            <Link className="btn btn-secondary w-100" to="/login/judge">
              Judge
            </Link>
          </div>
          <div className="col">
            <Link className="btn btn-secondary w-100" to="/login/court">
              Official
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Homepage;
