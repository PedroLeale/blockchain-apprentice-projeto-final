import React, { useState } from "react";
import { checkPrescription } from "../contracts/contractInteraction";
import { useContract } from "../hooks/useContract";

const CheckPrescription = () => {
  const [prescriptionId, setPrescriptionId] = useState("");
  const [prescriptionState, setPrescriptionState] = useState(null);
  const [error, setError] = useState(null);
  const { provider } = useContract();

  const handleCheckPrescription = async () => {
    try {
      console.log("prescriptionId: ", prescriptionId);
      console.log("Prescription id type: ", typeof prescriptionId);
      const state = await checkPrescription(provider, prescriptionId);
      setPrescriptionState(state);
      setError(null);
    } catch (err) {
      setError("Error checking prescription");
      console.log("Contract: ", process.env.REACT_APP_PRESCRIPTION_ADDRESS);
      console.log(err);
      setPrescriptionState(null);
    }
  };

  const renderPrescriptionState = (state) => {
    switch (state) {
      case 0n:
        return "PENDING";
      case 1n:
        return "APPROVED";
      case 2n:
        return "DELIVERED";
      default:
        return "UNKNOWN";
    }
  };

  return (
    <div className="check-prescription-container">
      <h1>Check Prescription</h1>
      <input
        type="number"
        value={prescriptionId}
        onChange={(e) => setPrescriptionId(e.target.value)}
        placeholder="Enter Prescription ID"
      />
      <button onClick={handleCheckPrescription}>Check</button>
      {error && <p className="error">{error}</p>}
      {prescriptionState !== null && (
        <p className="prescription-state">
          Prescription State: {renderPrescriptionState(prescriptionState)}
        </p>
      )}
    </div>
  );
};

export default CheckPrescription;
