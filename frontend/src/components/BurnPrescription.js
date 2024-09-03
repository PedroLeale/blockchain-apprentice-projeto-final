import React, { useState } from 'react';
import Button from './Button';
import { burnPrescription } from '../contracts/contractInteraction';
import { useContract } from '../hooks/useContract';

const BurnPrescription = () => {
    const [prescriptionId, setPrescriptionId] = useState('');
    const [amount, setAmount] = useState('');
    const [showForm, setShowForm] = useState(false);

    const {signer} = useContract();

    const handleBurn = async (e) => {
        e.preventDefault();
        try {
            await burnPrescription(signer, prescriptionId, amount);
            alert('Prescription burned successfully!');
        } catch (error) {
            alert('Error burning prescription');
        }
    };

    return (
        <div>
            <Button onClick={() => setShowForm(!showForm)}>Burn Prescription</Button>
            {showForm && (
                <form onSubmit={handleBurn}>
                    <label>
                        Prescription ID:
                        <input
                            type="number"
                            value={prescriptionId}
                            onChange={(e) => setPrescriptionId(e.target.value)}
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

export default BurnPrescription;