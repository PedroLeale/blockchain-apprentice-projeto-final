// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;

import "./Prescription.sol";

/**
    @title PharmacyDAO
    @notice Esse contrato gerencia receitas/prescrições médicas, usando o contrato Prescription como token ERC1155.
    A gerência é feita de seguinte maneira em que o dono do contrato é o dono da farmácia, que pode adicionar e remover médicos e farmacêuticos.
    Os médicos podem propor prescrições e os farmacêuticos podem aprovar ou rejeitar prescrições.
    Quando uma prescrição é proposta, ela é "mintada" usando o contrato Prescription e seu estado é definido como PENDING.
    Os farmacêuticos podem aprovar ou rejeitar a prescrição, alterando seu estado para APPROVED ou REJECTED, respectivamente.
    Os farmacêuticos podem queimar o token da prescrição.
    @author Pedro Leale
    @author Pedro Henrique Rossetto Natal
    @author Valter Fellype Ferreira Netto
*/

contract PharmacyDAO {
    enum Roles {
        NONE,
        DOCTOR,
        PHARMACIST,
        OWNER
    }

    string public pharmacyIdentifier;
    Prescription public prescriptionToken;
    address public owner;
    mapping(address => Roles) public doctors;
    mapping(address => Roles) public pharmacists;

    modifier OnlyDoctor() {
        require(doctors[msg.sender] == Roles.DOCTOR || owner == msg.sender, "Caller is not a doctor");
        _;
    }

    modifier OnlyPharmacist() {
        require(pharmacists[msg.sender] == Roles.PHARMACIST || owner == msg.sender, "Caller is not a pharmacist");
        _;
    }

    modifier OnlyOwner() {
        require(owner == msg.sender, "Caller is not the owner");
        _;
    }

    constructor (string memory _pharmacyIdentifier) {
        pharmacyIdentifier = _pharmacyIdentifier;
        owner = msg.sender;
    }

    function addDoctor(address doctor) public OnlyPharmacist() {
        doctors[doctor] = Roles.DOCTOR;
    }

    function addPharmacist(address pharmacist) public OnlyPharmacist() {
        pharmacists[pharmacist] = Roles.PHARMACIST;
    }

    function removeDoctor(address doctor) public OnlyPharmacist() {
        doctors[doctor] = Roles.NONE;
    }

    function removePharmacist(address pharmacist) public OnlyOwner() {
        pharmacists[pharmacist] = Roles.NONE;
    }

    /**
    @param amount Quantidade de tokens a serem mintados
    @param patient Paciente que receberá a prescrição
    @param uri URI da prescrição
    @return id ID da prescrição mintada
    */
    function proposePrescription(uint256 amount, address patient, bytes memory uri) public OnlyDoctor() returns (uint256) {
        uint256 id = prescriptionToken.mint(amount, patient, uri);
        return id;
    }

    function approvePrescription(uint256 id) public OnlyPharmacist() {
        prescriptionToken.approvePrescription(id);
    }

    function rejectPrescription(uint256 id) public OnlyPharmacist() {
        prescriptionToken.rejectPrescription(id);
    }

    function burnPrescription(address patient, uint256 id) public OnlyPharmacist() {
        prescriptionToken.burn(patient, id);
    }

}