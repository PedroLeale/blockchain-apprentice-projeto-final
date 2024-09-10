import { ethers } from "ethers";
import PharmacyDAO from "./PharmacyDAO.json";
import Prescription from "./Prescription.json";

const PHARMACY_DAO_ADDRESS = process.env.REACT_APP_PHARMACY_DAO_ADDRESS;
let PRESCRIPTION_ADDRESS = process.env.REACT_APP_PRESCRIPTION_ADDRESS;

export const getPharmacyDAOContract = (provider, signer) => {
  return new ethers.Contract(PHARMACY_DAO_ADDRESS, PharmacyDAO.abi, signer || provider);
};

export const getPrescriptionContract = (provider, signer) => {
  return new ethers.Contract(PRESCRIPTION_ADDRESS, Prescription.abi, provider || signer);
};

export const setPrescriptionToken = async (signer, prescriptionAddress) => {
  PRESCRIPTION_ADDRESS = prescriptionAddress;
  const contract = await getPrescriptionContract();
  const contractWithSigner = contract.connect(signer);
  const tx = await contractWithSigner.SetPrescriptionToken(prescriptionAddress, { gasPrice: 0 });
  await tx.wait();
};

export const mintPrescriptionTokens = async (signer, id, amount, cid) => {
  const contract = getPharmacyDAOContract(null, signer);
  const contractWithSigner = contract.connect(signer);
  return await contractWithSigner.mintPrescriptionTokens(id, amount, cid, { gasPrice: 0 });
};

export const proposePrescription = async (signer, patient, id, amount) => {
  const contract = getPharmacyDAOContract(null, signer);
  const contractWithSigner = contract.connect(signer);
  let data = "Proposal";
  data = ethers.toUtf8Bytes(data);
  return await contractWithSigner.proposePrescription(patient, id, amount, data, { gasPrice: 0 });
};

export const approvePrescription = async (signer, prescriptionId) => {
  const contract = getPharmacyDAOContract(null, signer);
  const contractWithSigner = contract.connect(signer);
  return await contractWithSigner.approvePrescription(prescriptionId, { gasPrice: 0 });
};

export const rejectPrescription = async (signer, patientAddress, prescriptionId, ammount) => {
  const contract = getPharmacyDAOContract(null, signer);
  const contractWithSigner = contract.connect(signer);
  return await contractWithSigner.rejectPrescription(patientAddress, prescriptionId, ammount, { gasPrice: 0 });
}

export const deliverPrescription = async (signer, prescriptionId) => {
  const contract = getPharmacyDAOContract(null, signer);
  const contractWithSigner = contract.connect(signer);
  return await contractWithSigner.deliverPrescription(prescriptionId, { gasPrice: 0 });
}

export const burnPrescription = async (signer, prescriptionId, amount) => {
  const contract = getPharmacyDAOContract(null, signer);
  const contractWithSigner = contract.connect(signer);
  return await contractWithSigner.burnPrescription(prescriptionId, amount, { gasPrice: 0 });
}

export const addDoctor = async (signer, doctorAddress) => {
  const contract = getPharmacyDAOContract(null, signer);
  const contractWithSigner = contract.connect(signer);
  return await contractWithSigner.addDoctor(doctorAddress, { gasPrice: 0 });
}

export const removeDoctor = async (signer, doctorAddress) => {
  const contract = getPharmacyDAOContract(null, signer);
  const contractWithSigner = contract.connect(signer);
  return await contractWithSigner.removeDoctor(doctorAddress, { gasPrice: 0 });
}

export const addPharmacist = async (signer, pharmacistAddress) => {
  const contract = getPharmacyDAOContract(null, signer);
  const contractWithSigner = contract.connect(signer);
  return await contractWithSigner.addPharmacist(pharmacistAddress, { gasPrice: 0 });
}

export const removePharmacist = async (signer, pharmacistAddress) => {
  const contract = getPharmacyDAOContract(null, signer);
  const contractWithSigner = contract.connect(signer);
  return await contractWithSigner.removePharmacist(pharmacistAddress, { gasPrice: 0 });
}

export const checkPrescription = async (provider, prescriptionId) => {
  const contract = getPharmacyDAOContract(provider, null);
  const contractWithSigner = contract.connect(provider);
  return await contractWithSigner.checkPrescriptionState(prescriptionId, { gasPrice: 0 });
}