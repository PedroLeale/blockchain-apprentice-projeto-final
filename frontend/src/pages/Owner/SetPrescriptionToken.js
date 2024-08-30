import React, { useState } from "react";
import { setPrescriptionToken } from "../../contracts/contractInteraction";
import { useContract } from "../../hooks/useContract";

const SetPrescriptionToken = () => {
  const [tokenAddress, setTokenAddress] = useState("");

  const provider = useContract();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await setPrescriptionToken(provider, tokenAddress);
      alert("Token address set successfully!");
    } catch (error) {
      alert("Error setting token address");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Token Contract Address"
        value={tokenAddress}
        onChange={(e) => setTokenAddress(e.target.value)}
      />
      <button type="submit">Set Token Address</button>
    </form>
  );
};

export default SetPrescriptionToken;
