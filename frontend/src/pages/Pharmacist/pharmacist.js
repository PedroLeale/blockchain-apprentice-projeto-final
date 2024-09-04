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

const Pharmacist = () => {
  const [showPrescriptions, setShowPrescriptions] = useState(false);
  return (
    <div>
      <h1>Pharmacist Page</h1>
      <MintPrescriptionForm />
      <BurnPrescription />
      <ApprovePrescription />
      <RejectPrescription />
      <DeliverPrescription />
      <ManageDoctor />
      <AddPharmacist />
      <Button onClick={() => setShowPrescriptions(!showPrescriptions)}>
        {showPrescriptions ? 'Hide Prescriptions' : 'Show Prescriptions'}
      </Button>
      {showPrescriptions && <ListPrescriptions />}
    </div>
  );
};

export default Pharmacist;