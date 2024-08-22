// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;

import "./Prescription.sol";

contract PharmacyDAO {
    enum Roles {
        NONE,
        DOCTOR,
        PHARMACIST
    }

    struct PrescriptionProposal {
        address patient;
        address doctor;
        string medication;
        string dosage;
    }

    uint256 private _currentProposalID = 0;
    string public pharmacyIdentifier;
    Prescription public prescriptionToken;
    mapping (uint256 => PrescriptionProposal) public prescriptions;
    mapping(address => Roles) public doctors;
    mapping(address => Roles) public pharmacists;

    modifier OnlyDoctor() {
        require(doctors[msg.sender] == Roles.DOCTOR, "Caller is not a doctor");
        _;
    }

    modifier OnlyPharmacist() {
        require(pharmacists[msg.sender] == Roles.PHARMACIST, "Caller is not a pharmacist");
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
        _currentProposalID++;
        prescriptions[_currentProposalID] = PrescriptionProposal(patient, msg.sender, medication, dosage);
    }

    function approvePrescription(uint256 proposalID, string memory uri, bytes memory data) public OnlyPharmacist() {
        // Approve prescription and mint NFT using Prescription contract
        PrescriptionProposal memory proposal = prescriptions[proposalID];
        prescriptionToken.mint(uri, 1, proposal.patient, data);
    }

    function burnPrescription() public OnlyPharmacist() {
        // Dispense prescription, burn it
    }

}