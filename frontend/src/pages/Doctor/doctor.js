import React, { useState } from "react";
import { proposePrescription } from "../../contracts/contractInteraction";
import { useContract } from "../../hooks/useContract";

const Doctor = () => {
  const [patient, setPatient] = useState("");
  const [id, setId] = useState("");
  const [amount, setAmount] = useState("");
  const [data, setData] = useState("");

  const provider = useContract();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await proposePrescription(provider, patient, id, amount, data);
      alert("Prescription proposed successfully!");
    } catch (error) {
      alert("Error proposing prescription");
    }
  };

  return (
    <div>
      <h1>Doctor Page</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Patient Address"
          value={patient}
          onChange={(e) => setPatient(e.target.value)}
        />
        <input
          type="number"
          placeholder="Prescription ID"
          value={id}
          onChange={(e) => setId(e.target.value)}
        />
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <button type="submit">Propose Prescription</button>
      </form>
    </div>
  );
};

export default Doctor;
