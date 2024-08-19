// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155Burnable.sol";
import "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155Supply.sol";

contract Prescription is ERC1155, Ownable {
    constructor(address pharmacyDAO) ERC1155("") Ownable(pharmacyDAO) {}

    function mint(
        string memory uri,
        uint256 amount,
        address patient,
        bytes memory data
    ) public onlyOwner returns (uint256) {
        _currentTokenID++;
        uint256 newItemId = _currentTokenID;

        _mint(msg.sender, newItemId, amount, data);

        return newItemId;
    }

    function mintBatch(
        string memory uri,
        uint256[] memory amounts,
        address patient,
        bytes memory data
    ) public onlyOwner returns (uint256[] memory) {
        uint256[] memory newItemIds = new uint256[](amounts.length);

        _mintBatch(patient, newItemIds, amounts, data);

        return newItemIds;
    }

    function setURI(string memory newuri) public onlyOwner {
        _setURI(newuri);
    }

    function _update(address from, address to, uint256[] memory ids, uint256[] memory values)
        internal
        override(ERC1155, ERC1155Supply)
    {
        super._update(from, to, ids, values);
    }
}