// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;

import "./Prescription.sol";

contract PharmacyDAO {
    enum Roles {
        DOCTOR,
        PHARMACIST
    }

    struct PrescriptionProposal {
        address patient;
        address doctor;
        string medication;
        string dosage;
    }

    string public pharmacyIdentifier;
    Prescription public prescriptionToken;
    mapping (uint256 => PrescriptionProposal) public prescriptions;
    mapping(address => Roles.DOCTOR) public doctors;
    mapping(address => Roles.PHARMACIST) public pharmacists;

    modifier OnlyDoctor() {
        require(roles[msg.sender] == Roles.DOCTOR, "Caller is not a doctor");
        _;
    }

    modifier OnlyPharmacist() {
        require(roles[msg.sender] == Roles.PHARMACIST, "Caller is not a pharmacist");
        _;
    }

    constructor (string memory _pharmacyIdentifier) {
        pharmacyIdentifier = _pharmacyIdentifier;
        pharmacists[msg.sender] = Roles.PHARMACIST;
    }

    function addDoctor(address doctor) public OnlyPharmacist() {
        doctors[doctor] = Roles.DOCTOR;
    }

    function addPharmacist(address pharmacist) public OnlyPharmacist() {
        pharmacists[pharmacist] = Roles.PHARMACIST;
    }

    function proposePrescription(
        address patient,
        string memory medication,
        string memory dosage
    ) public OnlyDoctor {
        require(medication != "", "Medication cannot be empty");
        require(dosage != "", "Dosage cannot be empty");
        uint256 proposalId = prescriptions.length;
        prescriptions[proposalId] = PrescriptionProposal(patient, msg.sender, medication, dosage);
    }

    function approvePrescription(uint256 proposalID) public OnlyPharmacist() {
        // Approve prescription and mint NFT using Prescription contract
        PrescriptionProposal memory proposal = prescriptions[proposalID];
        
    }

    function burnPrescription() public OnlyPharmacist() {
        // Dispense prescription, burn it
    }

}