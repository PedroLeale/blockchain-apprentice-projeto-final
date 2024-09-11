import React, { useState } from "react";
import ProposePrescription from "../../components/ProposePrescription";
import Button from "../../components/Button";
import ListPrescriptions from "../../components/listPrescriptions";
import CheckPatientBalance from "../../components/checkPatientBalance";

const Doctor = () => {
  const [showPrescriptions, setShowPrescriptions] = useState(false);
  const [showPrescriptionForm, setShowPrescriptionForm] = useState(false);
  const [showCheckPatientBalance, setShowCheckPatientBalance] = useState(false);
  return (
    <div>
      <h1>Doctor Page</h1>
      <Button
        onClick={() => setShowCheckPatientBalance(!showCheckPatientBalance)}
      >
        {showCheckPatientBalance
          ? "Hide Check Patient Balance"
          : "Show Check Patient Balance"}
      </Button>
      {showCheckPatientBalance && <CheckPatientBalance />}
      <Button onClick={() => setShowPrescriptionForm(!showPrescriptionForm)}>
        {showPrescriptionForm ? "Hide Proposal Form" : "Show Proposal Form"}
      </Button>
      {showPrescriptionForm && <ProposePrescription />}
      <Button onClick={() => setShowPrescriptions(!showPrescriptions)}>
        {showPrescriptions ? "Hide Prescriptions" : "Show Prescriptions"}
      </Button>
      {showPrescriptions && <ListPrescriptions />}
    </div>
  );
};

export default Doctor;
