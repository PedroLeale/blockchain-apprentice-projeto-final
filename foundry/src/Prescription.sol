// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
    @title Prescription
    @notice Este contrato gerencia prescrições médicas de uma dada farmácia que usa o contrato PharmacyDAO como dono.
    @author Pedro Leale
    @author Pedro Henrique Rossetto Natal
    @author Valter Fellype Ferreira Netto
*/

contract Prescription is ERC1155, Ownable {
    uint256 private _currentTokenID = 0;

    enum PrescriptionState {
        PENDING,
        APPROVED,
        REJECTED
    }

    mapping (uint256 => PrescriptionState) public prescriptionState;

    constructor(address pharmacyDAO) ERC1155("") Ownable(pharmacyDAO) {}

    event Minted(address indexed patient, uint256 id);
    event Burned(address indexed patient, uint256 id);
    event PrescriptionApproved(uint256 indexed id);
    event PrescriptionRejected(uint256 indexed id);

    function mint(
        string memory uri,
        uint256 amount,
        address patient,
        bytes memory data
    ) public onlyOwner returns (uint256) {
        _currentTokenID++;
        uint256 newItemId = _currentTokenID;

        _mint(patient, newItemId, amount, data);
        prescriptionState[newItemId] = PrescriptionState.PENDING;
        _setURI(uri);
        emit Minted(patient, newItemId);
        return newItemId;
    }

    function approvePrescription(uint256 id) public onlyOwner {
        require(prescriptionState[id] == PrescriptionState.PENDING, "Prescription is not pending");
        prescriptionState[id] = PrescriptionState.APPROVED;
        emit PrescriptionApproved(id);
    }

    function rejectPrescription(uint256 id) public onlyOwner {
        require(prescriptionState[id] == PrescriptionState.PENDING, "Prescription is not pending");
        prescriptionState[id] = PrescriptionState.REJECTED;
        emit PrescriptionRejected(id);
    }

    function burn(address patient, uint256 id) public onlyOwner {
        _burn(patient, id, 1);
        emit Burned(patient, id);
    }

    function setURI(string memory newuri) public onlyOwner {
        _setURI(newuri);
    }
}