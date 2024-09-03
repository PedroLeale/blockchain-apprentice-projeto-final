import React, { useState } from 'react';
import Button from './Button';
import { deliverPrescription } from '../contracts/contractInteraction';
import { useContract } from '../hooks/useContract';

const DeliverPrescription = () => {
    const [prescriptionId, setPrescriptionId] = useState('');
    const [showForm, setShowForm] = useState(false);

    const {signer} = useContract();

    const handleDeliver = async (e) => {
        e.preventDefault();
        try {
            await deliverPrescription(signer, prescriptionId);
            alert('Prescription delivered successfully!');
        } catch (error) {
            alert('Error delivering prescription');
        }
    };

    const handleInputChange = (e) => {
        setPrescriptionId(e.target.value);
    };

    return (
        <div>
            <Button onClick={() => setShowForm(!showForm)}>Deliver Prescription</Button>
            {showForm && (
                <form onSubmit={handleDeliver}>
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
}

export default DeliverPrescription;