// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Prescription is ERC1155, Ownable {
    constructor(address pharmacyDAO) ERC1155("") Ownable(pharmacyDAO) {}

    event Minted(address patient, uint256 id);
    event Burned(address patient, uint256 id);

    function mint(
        string memory uri,
        uint256 amount,
        address patient,
        bytes memory data
    ) public onlyOwner returns (uint256) {
        _currentTokenID++;
        uint256 newItemId = _currentTokenID;

        _mint(msg.sender, newItemId, amount, data);
        emit Minted(patient, newItemId);
        return newItemId;
    }

    function setURI(string memory newuri) public onlyOwner {
        _setURI(newuri);
    }

    function burn(
        address patient,
        uint256 id,
        uint256 value
    ) public onlyOwner {
       _burn(patient, id, value);
        emit Burned(patient, id);
    }
}