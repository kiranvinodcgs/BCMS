import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Navbar from "../../SharedComponents/Navbar";
import CaseStatus from "./CaseStatus";
import { getAllCases } from "../../orbit";

const Homepage = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getAllCases();
      setData(data);
    };

    fetchData();
  }, []);

  return (
    <>
      <Navbar />
      <Container className="mt-5">
        <Row>
          <Col>
            <h2 className="text-center mt-3 font-weight-bold">List Cases</h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md={6}>
            {data.map((data) => (
              <CaseStatus title={data.name} _id={data._id} />
            ))}
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Homepage;
