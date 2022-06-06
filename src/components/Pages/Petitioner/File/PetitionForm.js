import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import Securex from "../../../../artifacts/src/contracts/Securex.sol/Securex.json";
import { Link, useNavigate } from "react-router-dom";
import { createCase } from "../../../orbit";
import Web3 from "web3";

const PetitionerForm = () => {
  const [name, setName] = useState("");
  const [court, setCourt] = useState("");
  const [nature, setNature] = useState("");
  const [defendant, setDefendant] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [securex, setSecurex] = useState();
  const [accounts, setAccounts] = useState();

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      await loadWeb3();
      await loadBlockchainData();
    };

    fetchData();
  }, []);

  const loadWeb3 = async () => {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.enable();
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
    } else {
      window.alert(
        "Non-Ethereum browser detected. You should consider trying MetaMask!",
      );
    }
  };

  const loadBlockchainData = async () => {
    const web3 = window.web3;
    const accounts = await web3.eth.getAccounts();
    setAccounts(accounts[0]);
    const networkAddress = "0xA2Fd25d2d667b4efCFf01A35D0984e98984405F9";
    if (networkAddress) {
      const securex = new web3.eth.Contract(Securex.abi, networkAddress);
      setSecurex(securex);
    } else {
      window.alert("Securex contract not deployed to detected network.");
    }
  };

  const register = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await securex.methods
        .registerCase(court, description, new Date().toISOString())
        .send({ from: accounts })
        .on("transactionHash", (hash) => {
          file(hash);
        });

      console.log({ res });
    } catch (err) {
      console.log(err);
      setError(true);
      setLoading(false);
    }
  };

  const file = async (hash) => {
    const caseCount = await securex.methods.totalCases().call();
    console.log(caseCount);
    const userId = localStorage.getItem("user_id");
    try {
      await createCase({
        caseCount: caseCount.toNumber(),
        hash,
        userId,
        name,
        court,
        nature,
        defendant,
        description,
      });
    } catch (err) {}
    setLoading(false);
    navigate("/petitioner");
  };

  return (
    <>
      <div onSubmit={register} className="rounded border m-3 p-4 shadow">
        <Form className="">
          <h5 className="text-center w-100">Info</h5>
          <Form.Group className="mb-3">
            <Form.Label>Case Name</Form.Label>
            <Form.Control
              onChange={(e) => setName(e.target.value)}
              type="text"
              placeholder="Enter the case name"
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Court</Form.Label>
            <Form.Control
              onChange={(e) => setCourt(e.target.value)}
              type="text"
              placeholder="Enter the court name"
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control
              onChange={(e) => setDescription(e.target.value)}
              type="text"
              placeholder="Enter description"
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Nature of Complaint</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter the name of complaint"
              onChange={(e) => setNature(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Defendants Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter the name of defendant"
              onChange={(e) => setDefendant(e.target.value)}
            />
          </Form.Group>

          <Button
            onClick={register}
            disabled={loading}
            variant="primary w-100 mt-4"
            type="submit"
          >
            Submit
          </Button>
        </Form>
      </div>
    </>
  );
};

export default PetitionerForm;
