// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Test, console} from "forge-std/Test.sol";
import {PharmacyDAO} from "../src/PharmacyDAO.sol";
import {Prescription} from "../src/Prescription.sol";

contract PharmacyTest is Test {
    PharmacyDAO pharmacyDAO;
    Prescription prescription;
    address pharmacyOwner = address(0x1);
    address doctor = address(0x2);
    address pharmacist = address(0x3);
    address patient = address(0x4);

    function setUp() public {
        vm.deal(pharmacyOwner, 100 ether);
        vm.deal(doctor, 100 ether);
        vm.deal(pharmacist, 100 ether);
        vm.deal(patient, 100 ether);
        vm.startPrank(pharmacyOwner);
        pharmacyDAO = new PharmacyDAO("CryptoPharma");
        prescription = new Prescription(address(pharmacyDAO));
        pharmacyDAO.setPrescriptionToken(address(prescription));
        pharmacyDAO.addDoctor(doctor);
        pharmacyDAO.addPharmacist(pharmacist);
        vm.stopPrank();
    }

    function testPharmacyDAOInitialization() public view {
        assertEq(address(pharmacyDAO.prescriptionToken()), address(prescription), "Prescription contract address is not set correctly in PharmacyDAO");
    }

    function testMinting() public {
        vm.startPrank(pharmacist);
        pharmacyDAO.mintPrescriptionTokens(100, bytes(""));
        uint256 balance = prescription.balanceOf(address(pharmacyDAO), 1);
        assertEq(balance, 100);

        pharmacyDAO.mintPrescriptionTokens(50, bytes(""));
        balance = prescription.balanceOf(address(pharmacyDAO), 2);
        assertEq(balance, 50);

        pharmacyDAO.mintPrescriptionTokens(25, bytes(""));
        balance = prescription.balanceOf(address(pharmacyDAO), 3);
        assertEq(balance, 25);

        vm.stopPrank();
    }

    function testProposal() public {
    vm.prank(pharmacist);
    pharmacyDAO.mintPrescriptionTokens(100, bytes(""));

    vm.startPrank(doctor);
    
    vm.expectEmit(true, true, true, true);
    emit PrescriptionProposed(patient, 1, block.timestamp);
    
    pharmacyDAO.proposePrescription(patient, 1, 50, bytes("aaa"));
    
    uint256 contractBalance = prescription.balanceOf(address(pharmacyDAO), 1);
    assertEq(contractBalance, 50, "Contract balance is not 50");
    uint256 patientBalance = prescription.balanceOf(patient, 1);
    assertEq(patientBalance, 50, "Patient balance is not 50");

    Prescription.PrescriptionState state = prescription.prescriptionState(1);
    assertEq(uint(state), 0, "Prescription state is not PENDING");

    vm.stopPrank(); // Mova isso para o final do teste
}



    function testApprovalAndDeliverance() public {
        vm.prank(pharmacist);
        pharmacyDAO.mintPrescriptionTokens(100, bytes(""));

        vm.prank(doctor);
        pharmacyDAO.proposePrescription(patient, 1, 50, bytes("aaa"));

        vm.startPrank(pharmacist);
        pharmacyDAO.approvePrescription(1);
        
        Prescription.PrescriptionState state = prescription.prescriptionState(1);
        assertEq(uint(state), 1, "Prescription state is not APPROVED");

        pharmacyDAO.deliverPrescription(1);

        vm.stopPrank();

        state = prescription.prescriptionState(1);
        assertEq(uint(state), 2, "Prescription state is not DELIVERED");
    }

    function testReject() public {
        vm.prank(pharmacist);
        pharmacyDAO.mintPrescriptionTokens(100, bytes(""));

        vm.prank(doctor);
        pharmacyDAO.proposePrescription(patient, 1, 50, bytes("aaa"));

        vm.prank(pharmacist);
        pharmacyDAO.rejectPrescription(patient, 1, 50);

        uint256 contractBalance = prescription.balanceOf(address(pharmacyDAO), 1);
        assertEq(contractBalance, 100, "Contract balance is not 100");
        uint256 patientBalance = prescription.balanceOf(patient, 1);
        assertEq(patientBalance, 0, "Patient balance is not 0");
    }

    function testPartialReject() public {
        vm.prank(pharmacist);
        pharmacyDAO.mintPrescriptionTokens(100, bytes(""));

        vm.prank(doctor);
        pharmacyDAO.proposePrescription(patient, 1, 50, bytes("aaa"));

        vm.prank(pharmacist);
        pharmacyDAO.rejectPrescription(patient, 1, 25);

        uint256 contractBalance = prescription.balanceOf(address(pharmacyDAO), 1);
        assertEq(contractBalance, 75, "Contract balance is not 75");

        uint256 patientBalance = prescription.balanceOf(patient, 1);
        assertEq(patientBalance, 25, "Patient balance is not 25");

        Prescription.PrescriptionState state = prescription.prescriptionState(1);
        assertEq(uint(state), 0, "Prescription state is not PENDING");

        vm.startPrank(pharmacist);
        pharmacyDAO.approvePrescription(1);
        state = prescription.prescriptionState(1);
        assertEq(uint(state), 1, "Prescription state is not APPROVED");

        pharmacyDAO.deliverPrescription(1);
        state = prescription.prescriptionState(1);
        assertEq(uint(state), 2, "Prescription state is not DELIVERED");

        contractBalance = prescription.balanceOf(address(pharmacyDAO), 1);
        assertEq(contractBalance, 75, "Contract balance is not 75");

        patientBalance = prescription.balanceOf(patient, 1);
        assertEq(patientBalance, 25, "Patient balance is not 25");

        vm.stopPrank();
    }

    function testBurn() public {
        vm.startPrank(pharmacyOwner);
        pharmacyDAO.mintPrescriptionTokens(100, bytes(""));
        pharmacyDAO.mintPrescriptionTokens(50, bytes(""));
        pharmacyDAO.mintPrescriptionTokens(25, bytes(""));

        pharmacyDAO.burnPrescription(1, 50);
        uint256 balance = prescription.balanceOf(address(pharmacyDAO), 1);
        assertEq(balance, 50, "Contract balance is not 50");

        pharmacyDAO.burnPrescription(2, 25);
        balance = prescription.balanceOf(address(pharmacyDAO), 2);
        assertEq(balance, 25, "Contract balance is not 25");

        pharmacyDAO.burnPrescription(3, 25);
        balance = prescription.balanceOf(address(pharmacyDAO), 3);
        assertEq(balance, 0, "Contract balance is not 0");

        pharmacyDAO.proposePrescription(patient, 1, 50, "aaa");
        balance = prescription.balanceOf(patient, 1);
        assertEq(balance, 50, "Patient balance is not 50");

        pharmacyDAO.rejectPrescription(patient, 1, 49);
        balance = prescription.balanceOf(patient, 1);
        assertEq(balance, 1, "Patient balance is not 1");

        pharmacyDAO.burnPrescription(1, 49);
        balance = prescription.balanceOf(address(pharmacyDAO), 1);
        assertEq(balance, 0, "PharmacyDAO balance is not 0");

        pharmacyDAO.rejectPrescription(patient, 1, 1);
        balance = prescription.balanceOf(patient, 1);
        assertEq(balance, 0, "Patient balance is not 0");

        pharmacyDAO.burnPrescription(1, 1);
        balance = prescription.balanceOf(address(pharmacyDAO), 1);
        assertEq(balance, 0, "PharmacyDAO balance is not 0");
    
        vm.stopPrank();
    }
}
