import React, { useState } from "react";
import Button from "./Button";
import { addPharmacist } from "../contracts/contractInteraction";
import { useContract } from "../hooks/useContract";

const AddPharmacist = () => {
  const [pharmacistAddress, setPharmacistAddress] = useState('');
  const [showForm, setShowForm] = useState(false);

  const {signer} = useContract();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addPharmacist(signer, pharmacistAddress);
      alert('Pharmacist added successfully!');
    } catch (error) {
      alert('Error adding pharmacist: ' + error);
    }
  };

  return (
    <div>
      <Button onClick={() => setShowForm(!showForm)}>Add Pharmacist</Button>
      {showForm && (
        <form onSubmit={handleSubmit}>
          <label>
            Pharmacist Address:
            <input
              type="text"
              value={pharmacistAddress}
              onChange={(e) => setPharmacistAddress(e.target.value)}
              required
            />
          </label>
          <Button type="submit">Submit</Button>
        </form>
      )}
    </div>
  );
};

export default AddPharmacist;