// src/contracts/contractInteraction.js
import { ethers } from "ethers";
import PharmacyDAO from "./PharmacyDAO.json";
import Prescription from "./Prescription.json";

const PHARMACY_DAO_ADDRESS = "0x...";
let PRESCRIPTION_ADDRESS;

export const getPharmacyDAOContract = (provider) => {
  return new ethers.Contract(PHARMACY_DAO_ADDRESS, PharmacyDAO.abi, provider.getSigner());
};

export const getPrescriptionContract = (provider) => {
  return new ethers.Contract(PRESCRIPTION_ADDRESS, Prescription.abi, provider.getSigner());
};

export const setPrescriptionToken = async (prescriptionAddress) => {
  PRESCRIPTION_ADDRESS = prescriptionAddress;
  const contract = await getPrescriptionContract();
  const tx = await contract.SetPrescriptionToken(prescriptionAddress); 
  await tx.wait();
};

export const mintPrescriptionTokens = async (provider, amount, cid) => {
  const contract = getPharmacyDAOContract(provider);
  return await contract.mintPrescriptionTokens(amount, cid);
};

export const proposePrescription = async (provider, patient, id, amount, data) => {
  const contract = getPharmacyDAOContract(provider);
  return await contract.proposePrescription(patient, id, amount, data);
};

export const approvePrescription = async (provider, prescriptionId) => {
  const contract = getPharmacyDAOContract(provider);
  return await contract.approvePrescription(prescriptionId);
};

export const rejectPrescription = async (provider, patientAddress, prescriptionId, ammount) => {
  const contract = getPharmacyDAOContract(provider);
  return await contract.rejectPrescription(patientAddress, prescriptionId, ammount);
}

export const deliverPrescription = async (provider, prescriptionId) => {
  const contract = getPharmacyDAOContract(provider);
  return await contract.deliverPrescription(prescriptionId);
}

export const burnPrescription = async (provider, prescriptionId, amount) => {
  const contract = getPharmacyDAOContract(provider);
  return await contract.burnPrescription(prescriptionId, amount);
}

export const addDoctor = async (provider, doctorAddress) => {
  const contract = getPharmacyDAOContract(provider);
  return await contract.addDoctor(doctorAddress);
}

export const removeDoctor = async (provider, doctorAddress) => {
  const contract = getPharmacyDAOContract(provider);
  return await contract.removeDoctor(doctorAddress);
}

export const addPharmacist = async (provider, pharmacistAddress) => {
  const contract = getPharmacyDAOContract(provider);
  return await contract.addPharmacist(pharmacistAddress);
}

export const removePharmacist = async (provider, pharmacistAddress) => {
  const contract = getPharmacyDAOContract(provider);
  return await contract.removePharmacist(pharmacistAddress);
}