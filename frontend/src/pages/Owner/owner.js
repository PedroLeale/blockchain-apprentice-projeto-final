import React from 'react';
import AddPharmacist from '../../components/addPharmacist';
import RemovePharmacist from '../../components/removePharmacist';

const owner = () => {
  return (<div>
    <h1>Owner Page</h1>
    <AddPharmacist />;
    <RemovePharmacist />

  </div>
  );
};

export default owner;
