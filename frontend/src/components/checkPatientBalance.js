import React, { useState } from "react";
import { checkPatientPrescriptionBalance } from "../contracts/contractInteraction";
import { useContract } from "../hooks/useContract";
import Button from "./Button";

const CheckPatientBalance = () => {
  const [prescriptionId, setPrescriptionId] = useState("");
  const [patientAddress, setPatientAddress] = useState("");
  const [balance, setBalance] = useState(null);
  const [error, setError] = useState(null);
  const { provider } = useContract();

  const handleCheckBalance = async () => {
    try {
      const state = await checkPatientPrescriptionBalance(
        provider,
        patientAddress,
        prescriptionId
      );
      let patient_balance = state.toString();
      console.log(patient_balance);
      setBalance(patient_balance);
      setError(null);
    } catch (err) {
      setError("Error checking prescription");
      console.log(err);
      setBalance(null);
    }
  };

  return (
    <div className="check-prescription-container">
      <h1>Check Patient Balance</h1>
      <input
        type="number"
        value={prescriptionId}
        onChange={(e) => setPrescriptionId(e.target.value)}
        placeholder="Enter Prescription ID"
      />
      <input
        type="text"
        value={patientAddress}
        onChange={(e) => setPatientAddress(e.target.value)}
        placeholder="Enter Patient Address"
      />
      <Button onClick={handleCheckBalance}>Check</Button>
      {error && <p className="error">{error}</p>}
      {balance !== null && (
        <p className="prescription-state">Patient Balance: {balance}</p>
      )}
    </div>
  );
};

export default CheckPatientBalance;
