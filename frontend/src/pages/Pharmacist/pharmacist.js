import React from 'react';
import MintPrescriptionForm from '../../components/MintPrescriptionForm';
import ApprovePrescription from '../../components/ApprovePrescription';
import RejectPrescription from '../../components/RejectPrescription';
import DeliverPrescription from '../../components/DeliverPrescription';
import BurnPrescription from '../../components/BurnPrescription';
import ManageDoctor from '../../components/manageDoctor';
import AddPharmacist from '../../components/addPharmacist';

const Pharmacist = () => {
  return (
    <div>
      <h1>Pharmacist Page</h1>
      <MintPrescriptionForm />
      <ApprovePrescription />
      <RejectPrescription />
      <DeliverPrescription />
      <BurnPrescription />
      <ManageDoctor />
      <AddPharmacist />
    </div>
  );
};

export default Pharmacist;