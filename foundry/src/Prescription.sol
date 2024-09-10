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
        DELIVERED
    }

    mapping (uint256 => PrescriptionState) public prescriptionState;

    constructor(address pharmacyDAO) ERC1155("") Ownable(pharmacyDAO) {}

    event Minted(uint256 indexed id, uint256 amount, uint256 timestamp);
    event Burned(uint256 indexed id, uint256 amount, uint256 timestamp);
    event PrescriptionApproved(uint256 indexed id, uint256 timestamp);
    event PrescriptionRejected(uint256 indexed id, uint256 amount, uint256 timestamp);
    event PrescriptionDelivered(uint256 indexed id, uint256 timestamp);

   /**
   * @param cid ipfs content identifier
   */
    function mint(
        uint256 id,
        uint256 amount,
        bytes memory cid
    ) public onlyOwner {
        _mint(owner(), id, amount, cid);
        prescriptionState[id] = PrescriptionState.PENDING;
        emit Minted(id, amount, block.timestamp);
    }

    function burn(uint256 id, uint256 amount) public onlyOwner {
        _burn(owner(), id, amount);
        emit Burned(id, amount, block.timestamp);
    }

    function approvePrescription(uint256 id) public onlyOwner {
        require(prescriptionState[id] == PrescriptionState.PENDING, "Prescription is not pending");
        prescriptionState[id] = PrescriptionState.APPROVED;
        emit PrescriptionApproved(id, block.timestamp);
    }

    function rejectPrescription(address patient, uint256 id, uint256 amount) public onlyOwner {
        require(prescriptionState[id] == PrescriptionState.PENDING, "Prescription is not pending");
        _safeTransferFrom(patient, owner(), id, amount, "");
        emit PrescriptionRejected(id, amount, block.timestamp);
    }

    function deliverPrescription(uint256 id) public onlyOwner {
        require(prescriptionState[id] == PrescriptionState.APPROVED, "Prescription is not approved");
        prescriptionState[id] = PrescriptionState.DELIVERED;
        emit PrescriptionDelivered(id, block.timestamp);
    }

    function checkPrescriptionState(uint256 id) public onlyOwner view returns (PrescriptionState) {
        return prescriptionState[id];
    }
}