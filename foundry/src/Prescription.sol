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

    enum PrescriptionState {
        PENDING,
        APPROVED,
        REJECTED
    }

    mapping (uint256 => PrescriptionState) public prescriptionState;
    mapping (uint256 => bytes ) public prescriptionURI;

    constructor(address pharmacyDAO) ERC1155("") Ownable(pharmacyDAO) {}

    event Minted(address indexed patient, uint256 id);
    event Burned(address indexed patient, uint256 id);
    event PrescriptionApproved(uint256 indexed id);
    event PrescriptionRejected(uint256 indexed id);


   /**
   * @param uri ipfs content id
   * @dev Essa função recebe o cid do ipfs e faz um mapeamento
   * dele para um valor de keccak256 dentro do contrato. Usamos uma conversão
   * de uma hash de bytes32 para um inteiro para manter a compatibilidade
   * com o padrão ERC1155 além de permitir a checagem de valores já !"mintados".
   */
    function mint(
        uint256 amount,
        address patient,
        bytes memory uri
    ) public onlyOwner returns (uint256) {
        uint256 newItemId = uint256(keccak256(abi.encodePacked(uri)));

        _mint(patient, newItemId, amount, uri);
        prescriptionState[newItemId] = PrescriptionState.PENDING;
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
}