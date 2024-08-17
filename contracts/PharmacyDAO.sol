// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;

contract PharmacyDAO {
    enum Roles {
        DOCTOR,
        PHARMACIST
    }

    string public pharmacyIdentifier;
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

    function proposePrescription() public OnlyDoctor() {
        // Propose prescription
    }

    function approvePrescription() public OnlyPharmacist() {
        // Approve prescription and mint NFT using Prescription contract
    }

    function burnPrescription() public OnlyPharmacist() {
        // Dispense prescription, burn it
    }

}