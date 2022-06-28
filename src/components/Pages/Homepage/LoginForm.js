import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../../orbit";

const Homepage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const register = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(false);
    try {
      await loginUser({ email, password });
      setLoading(false);
      navigate("/petitioner");
    } catch (err) {
      setError(true);
      setLoading(false);
    }
  };

  return (
    <>
      <div className="rounded border m-3 p-4 shadow">
        <Form onSubmit={register} className="">
          <h5 className="text-center w-100">Petitioner Login</h5>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="Enter email"
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="Password"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Form.Check type="checkbox" label="Remember me" />
          </Form.Group>

          {error && (
            <Form.Text className="text-danger">
              Error! Invalid Credentials
            </Form.Text>
          )}
          <Button onClick={register} variant="primary w-100" type="submit">
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
