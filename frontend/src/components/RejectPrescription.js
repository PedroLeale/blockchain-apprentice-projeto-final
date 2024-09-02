import React, { useState } from 'react';
import Button from './Button';
import { rejectPrescription } from '../contracts/contractInteraction';
import { useContract } from '../hooks/useContract';

const RejectPrescription = () => {
    const [patient, setPatient] = useState('');
    const [id, setId] = useState('');
    const [amount, setAmount] = useState('');
    const [showForm, setShowForm] = useState(false);

    const provider = useContract();

    const handleReject = async (e) => {
        e.preventDefault();
        try {
            await rejectPrescription(provider, patient, id, amount);
            alert('Prescription rejected successfully!');
        } catch (error) {
            alert('Error rejecting prescription');
        }
    };

    return (
        <div>
            <Button onClick={() => setShowForm(!showForm)}>Reject Prescription</Button>
            {showForm && (
                <form onSubmit={handleReject}>
                    <label>
                        Patient Address:
                        <input
                            type="text"
                            value={patient}
                            onChange={(e) => setPatient(e.target.value)}
                            required
                        />
                    </label>
                    <label>
                        Prescription ID:
                        <input
                            type="number"
                            value={id}
                            onChange={(e) => setId(e.target.value)}
                            required
                        />
                    </label>
                    <label>
                        Amount:
                        <input
                            type="number"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            required
                        />
                    </label>
                    <Button type="submit">Submit</Button>
                </form>
            )}
        </div>
    );
};

export default RejectPrescription;
