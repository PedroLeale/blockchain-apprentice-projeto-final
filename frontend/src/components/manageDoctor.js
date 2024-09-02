import React, { useState } from 'react';
import Button from './Button';
import { addDoctor, removeDoctor } from '../contracts/contractInteraction';
import { useContract } from '../hooks/useContract';

const ManageDoctor = () => {
    const [doctor, setDoctor] = useState('');
    const [showForm, setShowForm] = useState(false);

    const provider = useContract();

    const handleAddDoctor = async (e) => {
        e.preventDefault();
        try {
            await addDoctor(provider, doctor);
            alert('Doctor added successfully!');
        } catch (error) {
            alert('Error adding doctor');
        }
    };

    const handleRemoveDoctor = async (e) => {
        e.preventDefault();
        try {
            await removeDoctor(provider, doctor);
            alert('Doctor removed successfully!');
        } catch (error) {
            alert('Error removing doctor');
        }
    };

    const handleInputChange = (e) => {
        setDoctor(e.target.value);
    };

    return (
        <div>
            <Button onClick={() => setShowForm(!showForm)}>Manage Doctor</Button>
            {showForm && (
                <form onSubmit={handleAddDoctor}>
                    <label>
                        Doctor Address:
                        <input
                            type="text"
                            value={doctor}
                            onChange={handleInputChange}
                            required
                        />
                    </label>
                    <Button type="submit">Add Doctor</Button>
                    <Button onClick={handleRemoveDoctor}>Remove Doctor</Button>
                </form>
            )}
        </div>
    );
}

export default ManageDoctor;