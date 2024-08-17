// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract Prescription is ERC721, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    struct Prescription {
        string name;
        string description;
        address doctor;
        address patient;
        string date;
        boolean approved;
    }

    mapping(uint256 => Prescription) private _prescriptions;
    address public pharmacyDAO;

    event PrescriptionProposed(uint256 prescriptionId);

    modifier onlyPharmacyDAO() {
        require(msg.sender == pharmacyDAO, "Caller is not the PharmacyDAO");
        _;
    }

    constructor(address _pharmacyDAO) ERC721("Prescription", "RX") {
        pharmacyDAO = _pharmacyDAO;
    }

    function setPharmacyDAO(address _pharmacyDAO) external onlyOwner {
        pharmacyDAO = _pharmacyDAO;
    }

    function proposePrescription(
        string memory name,
        string memory description,
        address patient,
        string memory date
    ) public onlyPharmacyDAO returns (uint256) {
        _tokenIds.increment();
        uint256 newPrescriptionId = _tokenIds.current();
        _prescriptions[newPrescriptionId] = Prescription(
            name,
            description,
            msg.sender,
            patient,
            date,
            false
        );
        emit PrescriptionProposed(newPrescriptionId);
        return newPrescriptionId;
    }

    function approvePrescription(uint256 prescriptionId) public onlyPharmacyDAO {
        _prescriptions[prescriptionId].approved = true;
        _mint(_prescriptions[prescriptionId].patient, prescriptionId);
    }

    function getPrescription(uint256 prescriptionId)
        public
        view
        returns (
            string memory name,
            string memory description,
            address doctor,
            address patient,
            string memory date,
            boolean approved
        )
    {
        Prescription memory prescription = _prescriptions[prescriptionId];
        return (
            prescription.name,
            prescription.description,
            prescription.doctor,
            prescription.patient,
            prescription.date,
            prescription.approved
        );
    }

    function isPrescriptionBurnt(uint256 prescriptionId) public view returns (boolean) {
        return _exists(prescriptionId);
    }
}
