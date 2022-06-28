import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { createUser } from "../../orbit";

function isNumeric(value) {
  return /^\d+$/.test(value);
}

const Homepage = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorText, setErrorText] = useState("");
  const navigate = useNavigate();

  const register = async (e) => {
    e.preventDefault();
    setErrorText("");

    if (
      !fullName ||
      !email ||
      !phone ||
      !address ||
      !password ||
      !passwordConfirm
    ) {
      setError(true);
      setLoading(false);
    } else {
      setLoading(true);
      setError(false);

      try {
        await createUser({ fullName, email, phone, address, password });
        setLoading(false);
        navigate("/");
      } catch (err) {
        setError(true);
        setLoading(false);
        setErrorText("User already exists");
      }
    }
  };

  return (
    <>
      <div className="rounded border m-3 p-4 shadow">
        <Form onSubmit={register} className="">
          <h5 className="text-center w-100">Petitioner Register</h5>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Full Name</Form.Label>
            <Form.Control
              onChange={(e) => setFullName(e.target.value)}
              type="text"
              placeholder="Enter full name"
            />
            {error && !fullName && (
              <Form.Text className="text-danger">Enter Name</Form.Text>
            )}
          </Form.Group>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="Enter email"
            />
          </Form.Group>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Phone Number</Form.Label>
            <Form.Control
              onChange={(e) => setPhone(e.target.value)}
              type="number"
              placeholder="Enter phone number"
            />
            {error && (phone.length !== 10 || !isNumeric(phone)) && (
              <Form.Text className="text-danger">
                Phone should be 10 digits
              </Form.Text>
            )}
          </Form.Group>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Address</Form.Label>
            <Form.Control
              onChange={(e) => setAddress(e.target.value)}
              type="text"
              placeholder="Enter address"
            />
            {error && !address && (
              <Form.Text className="text-danger">Enter Address</Form.Text>
            )}
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="Password"
            />
            {error && password.length < 8 && (
              <Form.Text className="text-danger">
                Minimum password length must be 8
              </Form.Text>
            )}
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              onChange={(e) => setPasswordConfirm(e.target.value)}
              type="password"
              placeholder="Confirm Password"
            />
            {error && password !== passwordConfirm && (
              <Form.Text className="text-danger">
                Passwords don't match
              </Form.Text>
            )}
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Form.Check type="checkbox" label="Remember me" />
          </Form.Group>
          <Button
            disabled={loading}
            onClick={register}
            variant="primary w-100"
            type="submit"
          >
            Submit
          </Button>
          {error && errorText && (
            <Form.Text className="text-danger">{errorText}</Form.Text>
          )}
        </Form>
      </div>
    </>
  );
};

export default Homepage;
