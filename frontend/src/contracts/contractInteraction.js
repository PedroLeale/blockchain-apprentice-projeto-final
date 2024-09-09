import { ethers } from "ethers";
import PharmacyDAO from "./PharmacyDAO.json";
import Prescription from "./Prescription.json";

const PHARMACY_DAO_ADDRESS = process.env.REACT_APP_PHARMACY_DAO_ADDRESS;
let PRESCRIPTION_ADDRESS = process.env.REACT_APP_PRESCRIPTION_ADDRESS;

export const getPharmacyDAOContract = (provider, signer) => {
  console.log("process.env.REACT_APP_PHARMACY_DAO_ADDRESS", process.env.REACT_APP_PHARMACY_DAO_ADDRESS);
  return new ethers.Contract(PHARMACY_DAO_ADDRESS, PharmacyDAO.abi, signer || provider);
};

export const getPrescriptionContract = (provider, signer) => {
  return new ethers.Contract(PRESCRIPTION_ADDRESS, Prescription.abi, provider || signer);
};

export const setPrescriptionToken = async (signer, prescriptionAddress) => {
  PRESCRIPTION_ADDRESS = prescriptionAddress;
  const contract = await getPrescriptionContract();
  const contractWithSigner = contract.connect(signer);
  const tx = await contractWithSigner.SetPrescriptionToken(prescriptionAddress);
  await tx.wait();
};

export const mintPrescriptionTokens = async (signer, amount, cid) => {
  const contract = getPharmacyDAOContract(null, signer);
  const contractWithSigner = contract.connect(signer);
  return await contractWithSigner.mintPrescriptionTokens(amount, cid);
};

export const proposePrescription = async (signer, patient, id, amount) => {
  const contract = getPharmacyDAOContract(null, signer);
  const contractWithSigner = contract.connect(signer);
  let data = "Proposal";
  data = ethers.toUtf8Bytes(data);
  return await contractWithSigner.proposePrescription(patient, id, amount, data);
};

export const approvePrescription = async (signer, prescriptionId) => {
  const contract = getPharmacyDAOContract(null, signer);
  const contractWithSigner = contract.connect(signer);
  return await contractWithSigner.approvePrescription(prescriptionId);
};

export const rejectPrescription = async (signer, patientAddress, prescriptionId, ammount) => {
  const contract = getPharmacyDAOContract(null, signer);
  const contractWithSigner = contract.connect(signer);
  return await contractWithSigner.rejectPrescription(patientAddress, prescriptionId, ammount);
}

export const deliverPrescription = async (signer, prescriptionId) => {
  const contract = getPharmacyDAOContract(null, signer);
  const contractWithSigner = contract.connect(signer);
  return await contractWithSigner.deliverPrescription(prescriptionId);
}

export const burnPrescription = async (signer, prescriptionId, amount) => {
  const contract = getPharmacyDAOContract(null, signer);
  const contractWithSigner = contract.connect(signer);
  return await contractWithSigner.burnPrescription(prescriptionId, amount);
}

export const addDoctor = async (signer, doctorAddress) => {
  const contract = getPharmacyDAOContract(null, signer);
  const contractWithSigner = contract.connect(signer);
  return await contractWithSigner.addDoctor(doctorAddress);
}

export const removeDoctor = async (signer, doctorAddress) => {
  const contract = getPharmacyDAOContract(null, signer);
  const contractWithSigner = contract.connect(signer);
  return await contractWithSigner.removeDoctor(doctorAddress);
}

export const addPharmacist = async (signer, pharmacistAddress) => {
  console.log('addPharmacist', signer, pharmacistAddress)
  console.log('Contract address is', PHARMACY_DAO_ADDRESS)
  const contract = getPharmacyDAOContract(null, signer);
  const contractWithSigner = contract.connect(signer);
  return await contractWithSigner.addPharmacist(pharmacistAddress);
}

export const removePharmacist = async (signer, pharmacistAddress) => {
  const contract = getPharmacyDAOContract(null, signer);
  const contractWithSigner = contract.connect(signer);
  return await contractWithSigner.removePharmacist(pharmacistAddress);
}