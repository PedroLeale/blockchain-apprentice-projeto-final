
import React, { useState } from "react";
import ProposePrescription from "../../components/ProposePrescription";
import Button from "../../components/Button";
import ListPrescriptions from "../../components/listPrescriptions";

const Doctor = () => {
  const [showPrescriptions, setShowPrescriptions] = useState(false);

  return (
    <div>
      <h1>Doctor Page</h1>
      <ProposePrescription />
      <Button onClick={() => setShowPrescriptions(!showPrescriptions)}>
        {showPrescriptions ? 'Hide Prescriptions' : 'Show Prescriptions'}
      </Button>
      {showPrescriptions && <ListPrescriptions />}
    </div>
  );
};

export default Doctor;
