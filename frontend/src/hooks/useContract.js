import { useState, useEffect } from "react";
import { ethers } from "ethers";

export const useContract = () => {
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);

  useEffect(() => {
    const initProvider = async () => {
      const rpcUrl = process.env.REACT_APP_RPC_URL;
      if (rpcUrl) {
        const _provider = new ethers.JsonRpcProvider(rpcUrl);
        setProvider(_provider);
      } else if (window.ethereum) {
        const _provider = new ethers.BrowserProvider(window.ethereum);
        await _provider.send("eth_requestAccounts", []);
        setProvider(_provider);
        const _signer = _provider.getSigner();
        setSigner(_signer);
      }
    };
    initProvider();
  }, []);

  return { provider, signer };
};