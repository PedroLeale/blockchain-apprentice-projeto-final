import { useState, useEffect } from "react";
import { ethers } from "ethers";

export const useContract = () => {
  const [provider, setProvider] = useState(null);

  useEffect(() => {
    const initProvider = async () => {
      if (window.ethereum) {
        const _provider = new ethers.BrowserProvider(window.ethereum);
        await _provider.send("eth_requestAccounts", []);
        setProvider(_provider);
      }
    };
    initProvider();
  }, []);

  return provider;
};
