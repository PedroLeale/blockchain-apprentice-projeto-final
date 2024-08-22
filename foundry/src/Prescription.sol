// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Prescription is ERC1155, Ownable {
    uint256 private _currentTokenID = 0;

    constructor(address pharmacyDAO) ERC1155("") Ownable(pharmacyDAO) {}

    event Minted(address indexed patient, uint256 id);
    event Burned(address indexed patient, uint256 id);

    function mint(
        string memory uri,
        uint256 amount,
        address patient,
        bytes memory data
    ) public onlyOwner returns (uint256) {
        _currentTokenID++;
        uint256 newItemId = _currentTokenID;

        _mint(patient, newItemId, amount, data);
        _setURI(uri);
        emit Minted(patient, newItemId);
        return newItemId;
    }

    function setURI(string memory newuri) public onlyOwner {
        _setURI(newuri);
    }
}