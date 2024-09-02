import AWS from 'aws-sdk';
import React, { useState } from 'react';
import Button from './Button';
import { mintPrescriptionTokens } from '../contracts/contractInteraction';
import { useContract } from '../hooks/useContract';
import '../styles/Button.css';

const MintPrescriptionForm = () => {
  const [showForm, setShowForm] = useState(false);
  const [prescription, setPrescription] = useState({
    prescriptionId: '',
    patient: { address: '' },
    doctor: { address: '', licenseNumber: '' },
    amount: 0,
    medication: [{ name: '', dosage: '', frequency: '', duration: '' }],
    issueDate: '',
    expiryDate: '',
    notes: ''
  });

  const provider = useContract();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const keys = name.split('.');
    if (keys.length === 1) {
      setPrescription({ ...prescription, [name]: value });
    } else {
      const [parent, child] = keys;
      setPrescription({
        ...prescription,
        [parent]: { ...prescription[parent], [child]: value }
      });
    }
  };

  const handleMedicationChange = (index, e) => {
    const { name, value } = e.target;
    const newMedication = [...prescription.medication];
    newMedication[index][name] = value;
    setPrescription({ ...prescription, medication: newMedication });
  };

  const addMedication = () => {
    setPrescription({
      ...prescription,
      medication: [...prescription.medication, { name: '', dosage: '', frequency: '', duration: '' }]
    });
  };

  const removeMedication = (index) => {
    const newMedication = prescription.medication.filter((_, i) => i !== index);
    setPrescription({ ...prescription, medication: newMedication });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Configure AWS SDK
    AWS.config.update({
      accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY,
      region: process.env.REACT_APP_AWS_REGION,
    });

    const s3 = new AWS.S3();
    const params = {
      Bucket: process.env.REACT_APP_S3_BUCKET_NAME,
      Key: `prescriptions/${Date.now()}.json`,
      Body: JSON.stringify(prescription),
      ContentType: 'application/json',
    };

    try {
      // Upload prescription JSON to S3
      const data = await s3.upload(params).promise();
      const prescriptionId = data.Key;

      // Call mintPrescriptionTokens with the prescription ID
      await mintPrescriptionTokens(provider, prescription.amount, prescriptionId);
      alert('Prescription(s) minted successfully!');
    } catch (error) {
      alert('Error minting prescription(s)');
    }
  };

  return (
    <div>
      <Button onClick={() => setShowForm(!showForm)}>Mint Prescription</Button>
      {showForm && (
        <form onSubmit={handleSubmit}>
          <input
            type="number"
            name="prescriptionId"
            placeholder="Prescription ID"
            value={prescription.prescriptionId}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="patient.address"
            placeholder="Patient Address"
            value={prescription.patient.address}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="doctor.address"
            placeholder="Doctor Address"
            value={prescription.doctor.address}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="doctor.licenseNumber"
            placeholder="Doctor License Number"
            value={prescription.doctor.licenseNumber}
            onChange={handleInputChange}
          />
          <input
            type="number"
            name="amount"
            placeholder="Amount of Units"
            value={prescription.amount}
            onChange={handleInputChange}
          />
          {prescription.medication.map((med, index) => (
            <div key={index}>
              <input
                type="text"
                name="name"
                placeholder="Medication Name"
                value={med.name}
                onChange={(e) => handleMedicationChange(index, e)}
              />
              <input
                type="text"
                name="dosage"
                placeholder="Dosage"
                value={med.dosage}
                onChange={(e) => handleMedicationChange(index, e)}
              />
              <input
                type="text"
                name="frequency"
                placeholder="Frequency"
                value={med.frequency}
                onChange={(e) => handleMedicationChange(index, e)}
              />
              <input
                type="text"
                name="duration"
                placeholder="Duration"
                value={med.duration}
                onChange={(e) => handleMedicationChange(index, e)}
              />
              {prescription.medication.length > 1 && (
                <button type="button" onClick={() => removeMedication(index)}>Remove Medication</button>
              )}
            </div>
          ))}
          <button type="button" onClick={addMedication}>Add Medication</button>
          <input
            type="date"
            name="issueDate"
            placeholder="Issue Date"
            value={prescription.issueDate}
            onChange={handleInputChange}
          />
          <input
            type="date"
            name="expiryDate"
            placeholder="Expiry Date"
            value={prescription.expiryDate}
            onChange={handleInputChange}
          />
          <textarea
            name="notes"
            placeholder="Notes"
            value={prescription.notes}
            onChange={handleInputChange}
          />
          <button type="submit">Submit</button>
        </form>
      )}
    </div>
  );
};

export default MintPrescriptionForm;