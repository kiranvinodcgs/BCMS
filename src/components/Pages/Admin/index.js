import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import Navbar from "../../SharedComponents/Navbar";
import { Link } from "react-router-dom";
import { getJudges, getUsers, getCourtUsers } from "../../orbit";

const Homepage = () => {
  const [data, setData] = useState([]);
  const [dataJ, setDataJ] = useState([]);
  const [dataC, setDataC] = useState([]);
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [judges, setJudges] = useState([]);
  const [court, setCourt] = useState([]);

  useEffect(() => {
    const filteredData = users.filter(
      (user) =>
        user.fullname &&
        user.fullname.toLowerCase().includes(search.toLowerCase()),
    );

    setData(filteredData);
  }, [search, users]);

  useEffect(() => {
    const filteredData = judges.filter(
      (user) =>
        user.fullname &&
        user.fullname.toLowerCase().includes(search.toLowerCase()),
    );

    setDataJ(filteredData);
  }, [search, judges]);

  useEffect(() => {
    const filteredData = court.filter(
      (user) =>
        user.fullname &&
        user.fullname.toLowerCase().includes(search.toLowerCase()),
    );

    setDataC(filteredData);
  }, [search, court]);

  useEffect(() => {
    const load = async () => {
      const courtOfficial = await getCourtUsers();
      setCourt(courtOfficial);
      const users = await getUsers();
      setUsers(users);
      const judges = await getJudges();
      setJudges(judges);
    };
    load();
  }, []);

  return (
    <>
      <Navbar />
      <Container className="mt-4 pt-1 mb-4">
        <h2 className="text-center mt-5">Admin Panel</h2>
        <Row className="justify-content-center">
          <Col md={7} className="row">
            <Form className={"d-flex flex-grow-1"}>
              <Form.Group
                className="w-100"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Control
                  type="email"
                  placeholder="Search"
                  className="w-100"
                  onChange={(e) => setSearch(e.target.value)}
                  value={search}
                />
              </Form.Group>
            </Form>

            <Link
              className={"d-block"}
              to="/admin/create"
              className="btn btn-primary "
            >
              Create User
            </Link>
          </Col>
        </Row>
        {data.map((user) => (
          <Row className="justify-content-center ">
            <Col className="m-2 p-2 border border-dark rounded" md={4}>
              <div>Name: {user.fullname}</div>
              <div>Email: {user.email}</div>
              <div>Type: petitioner</div>
            </Col>
          </Row>
        ))}
        {dataC.map((user) => (
          <Row className="justify-content-center ">
            <Col className="m-2 p-2 border border-dark rounded" md={4}>
              <div>Name: {user.fullname}</div>
              <div>Email: {user.email}</div>
              <div>Type: Court Official</div>
            </Col>
          </Row>
        ))}
        {dataJ.map((user) => (
          <Row className="justify-content-center ">
            <Col className="m-2 p-2 border border-dark rounded" md={4}>
              <div>Name: {user.fullname}</div>
              <div>Email: {user.email}</div>
              <div>Type: Judge</div>
            </Col>
          </Row>
        ))}
      </Container>
    </>
  );
};

export default Homepage;
