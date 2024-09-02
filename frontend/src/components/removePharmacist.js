import React, { useState } from "react";
import Button from "./Button";
import { removePharmacist } from "../contracts/contractInteraction";
import { useContract } from "../hooks/useContract";

const RemovePharmacist = () => {
    const [pharmacistAddress, setPharmacistAddress] = useState('');
    const [showForm, setShowForm] = useState(false);

    const provider = useContract();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await removePharmacist(provider, pharmacistAddress);
            alert('Pharmacist removed successfully!');
        } catch (error) {
            alert('Error removing pharmacist');
        }
    };

    return (
        <div>
            <Button onClick={() => setShowForm(!showForm)}>Remove Pharmacist</Button>
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

export default RemovePharmacist;