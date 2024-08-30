// src/contracts/contractInteraction.js
import { ethers } from "ethers";
import PharmacyDAO from "./PharmacyDAO.json";
import Prescription from "./Prescription.json";

const PHARMACY_DAO_ADDRESS = "0x...";
const PRESCRIPTION_ADDRESS = "0x...";

export const getPharmacyDAOContract = (provider) => {
  return new ethers.Contract(PHARMACY_DAO_ADDRESS, PharmacyDAO.abi, provider.getSigner());
};

export const getPrescriptionContract = (provider) => {
  return new ethers.Contract(PRESCRIPTION_ADDRESS, Prescription.abi, provider.getSigner());
};

export const ProposePrescription = async (provider, patient, id, amount, data) => {
  const contract = getPharmacyDAOContract(provider);
  return await contract.ProposePrescription(patient, id, amount, data);
};

export const mintPrescriptionTokens = async (provider, amount, cid) => {
  const contract = getPharmacyDAOContract(provider);
  return await contract.mintPrescriptionTokens(amount, cid);
};

export const setPrescriptionToken = async (tokenData) => {
    const contract = await getPrescriptionContract();
    const tx = await contract.setToken(tokenData); 
    await tx.wait();
};
