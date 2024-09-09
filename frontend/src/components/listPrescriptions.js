import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ListPrescriptions = () => {
    const [files, setFiles] = useState([]);

    useEffect(() => {
        const fetchPrescriptions = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/list-prescriptions`);
                setFiles(response.data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchPrescriptions();
    }, []);

    return (
        <div>
            <h1>Prescriptions</h1>
            <ul>
                {files.map((file, index) => (
                    <li key={index}>{file}</li>
                ))}
            </ul>
        </div>
    );
};

export default ListPrescriptions;