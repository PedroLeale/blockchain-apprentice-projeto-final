import React, { useState } from "react";
import { proposePrescription } from "../contracts/contractInteraction";
import { useContract } from "../hooks/useContract";
import Button from "./Button";

const PrescriptionForm = () => {
    const [patient, setPatient] = useState("");
    const [id, setId] = useState("");
    const [amount, setAmount] = useState("");

    const { signer } = useContract();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await proposePrescription(signer, patient, id, amount, "0x0");
            alert("Prescription proposed successfully!");
        } catch (error) {
            alert("Error proposing prescription");
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Patient Address"
                value={patient}
                onChange={(e) => setPatient(e.target.value)}
            />
            <input
                type="number"
                placeholder="Prescription ID"
                value={id}
                onChange={(e) => setId(e.target.value)}
            />
            <input
                type="number"
                placeholder="Amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
            />
            <Button type="submit">Propose Prescription</Button>
        </form>
    );
};

export default PrescriptionForm;