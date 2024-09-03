import React, { useState } from 'react';
import Button from './Button';
import { approvePrescription } from '../contracts/contractInteraction';
import { useContract } from '../hooks/useContract';

const ApprovePrescription = () => {
    const [prescriptionId, setPrescriptionId] = useState('');
    const [showForm, setShowForm] = useState(false);

    const {signer} = useContract();

    const handleApprove = async (e) => {
        e.preventDefault();
        try {
            await approvePrescription(signer, prescriptionId);
            alert('Prescription approved successfully!');
        } catch (error) {
            alert('Error approving prescription');
        }
    };

    const handleInputChange = (e) => {
        setPrescriptionId(e.target.value);
    };

    return (
        <div>
            <Button onClick={() => setShowForm(!showForm)}>Approve Prescription</Button>
            {showForm && (
                <form onSubmit={handleApprove}>
                    <label>
                        Prescription ID:
                        <input
                            type="number"
                            value={prescriptionId}
                            onChange={handleInputChange}
                            required
                        />
                    </label>
                    <Button type="submit">Submit</Button>
                </form>
            )}
        </div>
    );
};

export default ApprovePrescription;