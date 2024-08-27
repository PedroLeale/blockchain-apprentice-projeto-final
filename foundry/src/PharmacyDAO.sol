// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;

import "./Prescription.sol";
import "@openzeppelin/contracts/token/ERC1155/utils/ERC1155Holder.sol";

/**
    @title PharmacyDAO
    @notice Esse contrato gerencia receitas/prescrições médicas, usando o contrato Prescription como token ERC1155.
    A gerência é feita de seguinte maneira em que o dono do contrato é o dono da farmácia, que pode adicionar e remover médicos e farmacêuticos.
    Os médicos podem propor prescrições e os farmacêuticos podem aprovar ou rejeitar prescrições.
    Os farmacêuticos também podem adicionar e remover tokens de prescrição ao estoque.
    Quando uma prescrição é proposta, ela é transferida para um paciente no estado PENDING. Funciona como uma "reserva do estoque".
    Quando a prescrição é aprovada, o estado é definido como APPROVED e o paciente pode retirar o remédio.
    Ao retirar o remédio da farmácia o estado é alterado para DELIVERED.
    Quando uma prescrição é rejeitada o token é transferido devolta para o estoque, ou seja, para este contrato.
    Prescrições podem ser rejeitadas em caso de incoerência ou falta de estoque físico.
    @author Pedro Leale
    @author Pedro Henrique Rossetto Natal
    @author Valter Fellype Ferreira Netto
*/

contract PharmacyDAO is ERC1155Holder {
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

    event DoctorAdded(address doctor, uint256 timestamp);
    event PharmacistAdded(address pharmacist, uint256 timestamp);
    event DoctorRemoved(address doctor, uint256 timestamp);
    event PharmacistRemoved(address pharmacist, uint256 timestamp);
    event PrescriptionProposed(uint256 id, uint256 timestamp);

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
        emit DoctorAdded(doctor, block.timestamp);
    }

    function addPharmacist(address pharmacist) public OnlyPharmacist() {
        pharmacists[pharmacist] = Roles.PHARMACIST;
        emit PharmacistAdded(pharmacist, block.timestamp);
    }

    function removeDoctor(address doctor) public OnlyPharmacist() {
        doctors[doctor] = Roles.NONE;
        emit DoctorRemoved(doctor, block.timestamp);
    }

    function removePharmacist(address pharmacist) public OnlyOwner() {
        pharmacists[pharmacist] = Roles.NONE;
        emit PharmacistRemoved(pharmacist, block.timestamp);
    }

    /**
    * @param cid IPFS content identifier
    * @dev Minta tokens de prescrição e os distribui para este contrato.
    * Este contrato guardar estes tokens tem como objetivo servir de estoque de prescrições.
    */
    function mintPrescriptionTokens(uint256 amount, bytes memory cid) public OnlyPharmacist() {
        prescriptionToken.mint(amount, cid);
    }

    /**
    * @param amount Quantidade de tokens a serem mintados
    * @param patient Paciente que receberá a prescrição
    * @dev Ao propor uma prescrição para o paciente, o token é transferido para seu endereço
    * no estado PENDING.
    */
    function proposePrescription( address patient, uint256 id, uint256 amount, bytes memory data) public OnlyDoctor() {
        prescriptionToken.safeTransferFrom(address(this), patient, id, amount, data);
        emit PrescriptionProposed(id, block.timestamp);
    }

    /**
    * @param id ID da prescrição a ser aprovada
    * @dev Aprova uma prescrição, alterando seu estado para APPROVED.
    * Pode ser feito apenas por farmacêuticos e a qualquer momento após a prescrição ser proposta.
    * Ou seja, não precisa do paciente apresentar a prescrição para ser aprovada.
    */
    function approvePrescription(uint256 id) public OnlyPharmacist() {
        prescriptionToken.approvePrescription(id);
    }

    /**
    * @param patient Paciente que teve a prescrição rejeitada
    * @param id ID da prescrição a ser rejeitada
    * @dev Rejeita uma prescrição, transferindo o token de volta para o estoque/este contrato.
    * Pode ser chamada caso tenha uma incoerência na prescrição ou caso o estoque físico do remédio tenha acabado.
    */
    function rejectPrescription(address patient, uint256 id) public OnlyPharmacist() {
        prescriptionToken.rejectPrescription(patient, id);
    }

    /**
    * @param id ID da prescrição aprovada a ser entregue
    * @dev Deve ser chamada quando a prescrição for aprovada e o(s) remédio(s) fisicamente entregue(s) ao paciente.
    */
    function deliverPrescription(uint256 id) public OnlyPharmacist() {
        prescriptionToken.deliverPrescription(id);
    }

    function burnPrescription(uint256 id, uint256 amount) public OnlyPharmacist() {
        prescriptionToken.burn(id, amount);
    }

}