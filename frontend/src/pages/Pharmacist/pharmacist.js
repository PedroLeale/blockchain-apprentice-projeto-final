import React, {useState} from 'react';
import MintPrescriptionForm from '../../components/MintPrescriptionForm';
import ApprovePrescription from '../../components/ApprovePrescription';
import RejectPrescription from '../../components/RejectPrescription';
import DeliverPrescription from '../../components/DeliverPrescription';
import BurnPrescription from '../../components/BurnPrescription';
import ManageDoctor from '../../components/manageDoctor';
import AddPharmacist from '../../components/addPharmacist';
import ListPrescriptions from '../../components/listPrescriptions';
import Button from '../../components/Button';
import CheckPrescription from '../../components/checkPrescription';
import CheckPatientBalance from '../../components/checkPatientBalance';

const Pharmacist = () => {
  const [showPrescriptions, setShowPrescriptions] = useState(false);
  const [showCheckPrescription, setShowCheckPrescription] = useState(false);
  const [showCheckPatientBalance, setShowCheckPatientBalance] = useState(false);

  return (
    <div>
      <h1>Pharmacist Page</h1>
      <MintPrescriptionForm />
      <BurnPrescription />
      <ApprovePrescription />
      <RejectPrescription />
      <DeliverPrescription />
      <Button onClick={() => setShowCheckPatientBalance(!showCheckPatientBalance)}>
        {showCheckPatientBalance ? 'Hide Check Patient Balance' : 'Show Check Patient Balance'}
      </Button>
      {showCheckPatientBalance && <CheckPatientBalance />}
      <ManageDoctor />
      <Button onClick={() => setShowCheckPrescription(!showCheckPrescription)}>
        {showCheckPrescription ? 'Hide Check Prescription' : 'Show Check Prescription'}
      </Button>
      {showCheckPrescription && <CheckPrescription />}
      <AddPharmacist />
      <Button onClick={() => setShowPrescriptions(!showPrescriptions)}>
        {showPrescriptions ? 'Hide Prescriptions' : 'Show Prescriptions'}
      </Button>
      {showPrescriptions && <ListPrescriptions />}
    </div>
  );
};

export default Pharmacist;