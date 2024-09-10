import React from 'react';
import AddPharmacist from '../../components/addPharmacist';
import RemovePharmacist from '../../components/removePharmacist';
import SetPrescriptionToken from '../../components/SetPrescriptionToken';

const owner = () => {
  return (<div>
    <h1>Owner Page</h1>
    <AddPharmacist />
    <RemovePharmacist />
    <SetPrescriptionToken />
  </div>
  );
};

export default owner;
