// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Script, console} from "forge-std/Script.sol";
import {PharmacyDAO} from "src/PharmacyDAO.sol";
import {Prescription} from "src/Prescription.sol";

contract DeployScript is Script {
    function run() external {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        vm.startBroadcast(deployerPrivateKey);
        PharmacyDAO pharmacyDAO = new PharmacyDAO("CryptoPharma");
        Prescription prescription = new Prescription(address(pharmacyDAO));
        pharmacyDAO.setPrescriptionToken(address(prescription));
        vm.stopBroadcast();

        console.log("PharmacyDAO deployed at address: ", address(pharmacyDAO));
        console.log("Prescription deployed at address: ", address(prescription));
    }
}
